import { useState, useRef, useCallback, useEffect } from "react";
import {
  TOWER_TYPES, PATH_SET, CELL_SIZE,
  generateWaves, createEnemy, createTower, createProjectile,
  distanceBetween, moveEnemy, moveProjectile,
} from "../lib/gameEngine";
import GameBoard from "../components/game/GameBoard";
import GameHUD from "../components/game/GameHUD";
import TowerPanel from "../components/game/TowerPanel";
import TowerInfoPanel from "../components/game/TowerInfoPanel";
import WaveButton from "../components/game/WaveButton";
import GameOverModal from "../components/game/GameOverModal";
import { Shield } from "lucide-react";

const INITIAL_GOLD = 150;
const INITIAL_LIVES = 20;

export default function Game() {
  const [gold, setGold] = useState(INITIAL_GOLD);
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [score, setScore] = useState(0);
  const [wave, setWave] = useState(1);
  const [waveActive, setWaveActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [selectedTowerType, setSelectedTowerType] = useState(null);
  const [selectedTowerId, setSelectedTowerId] = useState(null);

  const towersRef = useRef([]);
  const enemiesRef = useRef([]);
  const projectilesRef = useRef([]);
  const towerMapRef = useRef(new Map());
  const waveQueueRef = useRef([]);
  const waveTimerRef = useRef(0);
  const gameLoopRef = useRef(null);
  const lastTimeRef = useRef(0);

  // Force re-render state
  const [, forceRender] = useState(0);

  const getSelectedTower = () => {
    if (!selectedTowerId) return null;
    return towersRef.current.find(t => t.id === selectedTowerId) || null;
  };

  const handleCellClick = useCallback((gx, gy) => {
    const key = `${gx},${gy}`;

    // Check if clicking on an existing tower
    if (towerMapRef.current.has(key)) {
      const towerId = towerMapRef.current.get(key);
      setSelectedTowerId(prev => prev === towerId ? null : towerId);
      setSelectedTowerType(null);
      return;
    }

    // Place new tower
    if (!selectedTowerType) {
      setSelectedTowerId(null);
      return;
    }

    if (PATH_SET.has(key)) return;

    const cost = TOWER_TYPES[selectedTowerType].cost;
    setGold(prev => {
      if (prev < cost) return prev;
      const tower = createTower(selectedTowerType, gx, gy);
      towersRef.current = [...towersRef.current, tower];
      towerMapRef.current.set(key, tower.id);
      forceRender(n => n + 1);
      return prev - cost;
    });
  }, [selectedTowerType]);

  const handleUpgrade = useCallback((tower) => {
    const base = TOWER_TYPES[tower.type];
    const cost = Math.floor(base.upgradeCost * tower.level);
    setGold(prev => {
      if (prev < cost || tower.level >= 5) return prev;
      tower.level += 1;
      tower.damage = Math.floor(base.damage * (1 + (tower.level - 1) * 0.4));
      tower.range = base.range * CELL_SIZE * (1 + (tower.level - 1) * 0.1);
      tower.fireRate = Math.max(200, base.fireRate * (1 - (tower.level - 1) * 0.08));
      forceRender(n => n + 1);
      return prev - cost;
    });
  }, []);

  const handleSell = useCallback((tower) => {
    const base = TOWER_TYPES[tower.type];
    const value = Math.floor(base.cost * 0.6 * tower.level);
    towersRef.current = towersRef.current.filter(t => t.id !== tower.id);
    towerMapRef.current.delete(`${tower.gridX},${tower.gridY}`);
    setGold(prev => prev + value);
    setSelectedTowerId(null);
    forceRender(n => n + 1);
  }, []);

  const startWave = useCallback(() => {
    if (waveActive || gameOver) return;
    const waveData = generateWaves(wave);
    waveQueueRef.current = waveData;
    waveTimerRef.current = 0;
    setWaveActive(true);
  }, [wave, waveActive, gameOver]);

  // Game loop
  useEffect(() => {
    const gameLoop = (timestamp) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = timestamp;

      // Spawn enemies from queue
      if (waveQueueRef.current.length > 0) {
        waveTimerRef.current += dt * 1000;
        const nextEnemy = waveQueueRef.current[0];
        if (waveTimerRef.current >= nextEnemy.delay) {
          const enemy = createEnemy(nextEnemy.type, nextEnemy.hpMultiplier);
          enemiesRef.current = [...enemiesRef.current, enemy];
          waveQueueRef.current = waveQueueRef.current.slice(1);
        }
      }

      // Move enemies
      let livesLost = 0;
      let newEnemies = [];
      enemiesRef.current.forEach(enemy => {
        const reached = moveEnemy(enemy, dt);
        if (reached) {
          livesLost++;
        } else if (enemy.hp > 0) {
          newEnemies.push(enemy);
        }
      });
      enemiesRef.current = newEnemies;

      if (livesLost > 0) {
        setLives(prev => {
          const newLives = prev - livesLost;
          if (newLives <= 0) {
            setGameOver(true);
          }
          return Math.max(0, newLives);
        });
      }

      // Tower firing
      const now = timestamp;
      towersRef.current.forEach(tower => {
        if (now - tower.lastFire < tower.fireRate) return;

        // Find closest enemy in range
        let closest = null;
        let closestDist = Infinity;
        enemiesRef.current.forEach(enemy => {
          const d = distanceBetween(tower, enemy);
          if (d <= tower.range && d < closestDist) {
            closest = enemy;
            closestDist = d;
          }
        });

        if (closest) {
          tower.lastFire = now;
          const proj = createProjectile(tower, closest);
          projectilesRef.current = [...projectilesRef.current, proj];
        }
      });

      // Move projectiles
      let goldEarned = 0;
      let scoreEarned = 0;
      let newProjectiles = [];
      projectilesRef.current.forEach(proj => {
        const result = moveProjectile(proj, enemiesRef.current);
        if (result.hit) {
          const target = enemiesRef.current.find(e => e.id === result.targetId);
          if (target) {
            target.hp -= proj.damage;
            if (proj.towerType === "frost") {
              target.slowTimer = 2000;
            }
            if (target.hp <= 0) {
              goldEarned += target.reward;
              scoreEarned += target.reward * 2;
              enemiesRef.current = enemiesRef.current.filter(e => e.id !== target.id);
            }
          }
        } else {
          newProjectiles.push(proj);
        }
      });
      projectilesRef.current = newProjectiles;

      if (goldEarned > 0) setGold(prev => prev + goldEarned);
      if (scoreEarned > 0) setScore(prev => prev + scoreEarned);

      // Check wave complete
      if (waveQueueRef.current.length === 0 && enemiesRef.current.length === 0) {
        setWaveActive(prev => {
          if (prev) {
            setWave(w => w + 1);
            setGold(g => g + 25); // Wave completion bonus
            return false;
          }
          return prev;
        });
      }

      forceRender(n => n + 1);
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    if (!gameOver) {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }

    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [gameOver]);

  const handleRestart = () => {
    towersRef.current = [];
    enemiesRef.current = [];
    projectilesRef.current = [];
    towerMapRef.current = new Map();
    waveQueueRef.current = [];
    setGold(INITIAL_GOLD);
    setLives(INITIAL_LIVES);
    setScore(0);
    setWave(1);
    setWaveActive(false);
    setGameOver(false);
    setSelectedTowerType(null);
    setSelectedTowerId(null);
    lastTimeRef.current = 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950">
      {/* Header */}
      <div className="border-b border-stone-800/60 bg-stone-950/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-900/40 border border-amber-700/40 flex items-center justify-center">
              <Shield className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-amber-100 font-serif tracking-wide">
                Kingdom&apos;s Last Stand
              </h1>
              <p className="text-[10px] text-stone-500 uppercase tracking-widest">
                Medieval Tower Defense
              </p>
            </div>
          </div>
          <GameHUD lives={lives} gold={gold} wave={wave} score={score} />
        </div>
      </div>

      {/* Game Area */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Board */}
          <div className="flex-1">
            <GameBoard
              towers={towersRef.current}
              enemies={enemiesRef.current}
              projectiles={projectilesRef.current}
              selectedTowerType={selectedTowerType}
              towerMap={towerMapRef.current}
              onCellClick={handleCellClick}
              selectedTowerId={selectedTowerId}
            />
            {selectedTowerType && (
              <p className="text-center text-xs text-amber-400/60 mt-2 font-serif">
                Click on a green tile to place your {TOWER_TYPES[selectedTowerType].name}
              </p>
            )}
          </div>

          {/* Side Panel */}
          <div className="w-full lg:w-56 shrink-0">
            <div className="bg-stone-900/80 border border-stone-700/40 rounded-xl p-4">
              <TowerPanel
                selectedTower={selectedTowerType}
                onSelect={(type) => {
                  setSelectedTowerType(type);
                  setSelectedTowerId(null);
                }}
                gold={gold}
              />
              <TowerInfoPanel
                tower={getSelectedTower()}
                gold={gold}
                onUpgrade={handleUpgrade}
                onSell={handleSell}
              />
              <WaveButton
                waveActive={waveActive}
                onStartWave={startWave}
                wave={wave}
              />
              <div className="mt-4 text-[10px] text-stone-600 space-y-1">
                <p>• Click tower then click board to place</p>
                <p>• Click placed towers to upgrade/sell</p>
                <p>• Bonus gold each wave cleared</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {gameOver && (
        <GameOverModal score={score} wave={wave} onRestart={handleRestart} />
      )}
    </div>
  );
}