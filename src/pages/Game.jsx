import { useState, useRef, useCallback, useEffect } from "react";
import {
  TOWER_TYPES, PATH_SET, CELL_SIZE,
  generateWaves, createEnemy, createTower, createProjectile,
  distanceBetween, moveEnemy, moveProjectile, generateBossInfo,
  findMergePair, mergeTowers,
} from "../lib/gameEngine";
import GameBoard from "../components/game/GameBoard";
import GameHUD from "../components/game/GameHUD";
import TowerPanel from "../components/game/TowerPanel";
import TowerInfoPanel from "../components/game/TowerInfoPanel";
import WaveButton from "../components/game/WaveButton";
import GameOverModal from "../components/game/GameOverModal";
import ComboDisplay from "../components/game/ComboDisplay";
import ComboSuggestions from "../components/game/ComboSuggestions";
import BossArrivalModal from "../components/game/BossArrivalModal";
import WaveSuccessBanner from "../components/game/WaveSuccessBanner";
import RoyalRewardModal from "../components/game/RoyalRewardModal";
import { playKillSound, playDamageSound, playWaveSuccessSound } from "../lib/sounds";
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
  const [combo, setCombo] = useState(0);
  const [bossArrival, setBossArrival] = useState(null);
  const [mergeFlash, setMergeFlash] = useState(false);
  const [waveSuccess, setWaveSuccess] = useState(false);
  const [royalReward, setRoyalReward] = useState(false);
  const comboTimerRef = useRef(null);
  const COMBO_WINDOW = 3000; // ms between kills to maintain combo

  const comboMultiplier = combo < 5 ? 1 : combo < 10 ? 2 : combo < 20 ? 3 : 5;

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
      const newTowers = [...towersRef.current, tower];
      towerMapRef.current.set(key, tower.id);

      // Check for any merge
      const pair = findMergePair(newTowers);
      if (pair) {
        const [t1, t2, resultType] = pair;
        const merged2 = mergeTowers(t1, t2, resultType);
        const merged = newTowers.filter(t => t.id !== t1.id && t.id !== t2.id);
        merged.push(merged2);
        towerMapRef.current.delete(`${t1.gridX},${t1.gridY}`);
        towerMapRef.current.delete(`${t2.gridX},${t2.gridY}`);
        towerMapRef.current.set(`${merged2.gridX},${merged2.gridY}`, merged2.id);
        towersRef.current = merged;
        setMergeFlash(TOWER_TYPES[resultType]);
        setTimeout(() => setMergeFlash(false), 1800);
      } else {
        towersRef.current = newTowers;
      }

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
          const enemy = createEnemy(nextEnemy.type, nextEnemy.hpMultiplier, nextEnemy.modifier);
          enemiesRef.current = [...enemiesRef.current, enemy];
          if (nextEnemy.isBoss) {
            setBossArrival(generateBossInfo(nextEnemy.type));
          }
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
        playDamageSound();
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
      let killCount = 0;
      let newProjectiles = [];
      projectilesRef.current.forEach(proj => {
        const result = moveProjectile(proj, enemiesRef.current);
        if (result.hit) {
          const target = enemiesRef.current.find(e => e.id === result.targetId);
          if (target) {
            const dmg = Math.floor(proj.damage * (1 - (target.damageReduction ?? 0)));
            target.hp -= dmg;
            if (proj.towerType === "frost" || TOWER_TYPES[proj.towerType]?.appliesSlow) {
              target.slowTimer = 2000;
            }
            if (target.hp <= 0) {
              goldEarned += target.reward;
              scoreEarned += target.reward * 2;
              killCount++;
              playKillSound();
              enemiesRef.current = enemiesRef.current.filter(e => e.id !== target.id);
            }
          }
        } else {
          newProjectiles.push(proj);
        }
      });
      projectilesRef.current = newProjectiles;

      if (goldEarned > 0) {
        setCombo(prev => {
          const next = prev + killCount;
          if (comboTimerRef.current) clearTimeout(comboTimerRef.current);
          comboTimerRef.current = setTimeout(() => setCombo(0), COMBO_WINDOW);
          const mult = next < 5 ? 1 : next < 10 ? 2 : next < 20 ? 3 : 5;
          setGold(g => g + goldEarned * mult);
          return next;
        });
      }
      if (scoreEarned > 0) setScore(prev => prev + scoreEarned * (combo < 5 ? 1 : combo < 10 ? 2 : combo < 20 ? 3 : 5));

      // Check wave complete
      if (waveQueueRef.current.length === 0 && enemiesRef.current.length === 0) {
        setWaveActive(prev => {
          if (prev) {
            setWave(w => {
              const next = w + 1;
              // After meadow stage (wave 5), show royal reward
              if (w === 5) setTimeout(() => setRoyalReward(true), 800);
              return next;
            });
            setGold(g => g + 25); // Wave completion bonus
            playWaveSuccessSound();
            setWaveSuccess(s => !s); // toggle to always re-trigger
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
    setCombo(0);
    if (comboTimerRef.current) clearTimeout(comboTimerRef.current);
    lastTimeRef.current = 0;
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #0d0505 0%, #0a0303 40%, #0d0606 100%)' }}>
      {/* Header */}
      <div className="border-b border-red-950/60 backdrop-blur-sm" style={{ background: 'rgba(8,3,3,0.95)', boxShadow: '0 1px 0 rgba(120,20,20,0.2)' }}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-950/80 border border-red-900/50 flex items-center justify-center"
              style={{ boxShadow: '0 0 12px rgba(153,27,27,0.3)' }}
            >
              <Shield className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h1 className="text-lg font-black text-red-100 tracking-[0.2em] uppercase"
                style={{ fontFamily: "'Cinzel Decorative', serif", textShadow: '0 0 20px rgba(200,40,40,0.4)' }}
              >
                Kingdom's Last Stand
              </h1>
              <p className="text-[10px] text-red-900/80 uppercase tracking-[0.3em]">
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
              wave={wave}
            />
            {selectedTowerType && (
              <p className="text-center text-xs text-red-900/60 mt-2 tracking-wide">
                Click on a valid tile to place your {TOWER_TYPES[selectedTowerType].name}
              </p>
            )}
          </div>

          {/* Side Panel */}
          <div className="w-full lg:w-56 shrink-0">
            <div className="rounded-xl p-4 border border-red-950/40" style={{ background: 'rgba(10,4,4,0.9)' }}>
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
              <ComboSuggestions />
              <div className="mt-4 text-[10px] text-stone-700 space-y-1">
                <p>• Click tower then click board to place</p>
                <p>• Click placed towers to upgrade/sell</p>
                <p>• Bonus gold each wave cleared</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {mergeFlash && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3 rounded-xl border border-amber-600/70 bg-amber-950/90 text-amber-300 font-bold tracking-widest uppercase text-sm shadow-2xl shadow-amber-900/60 animate-bounce">
          {mergeFlash.emoji} {mergeFlash.name} Forged!
        </div>
      )}
      <ComboDisplay combo={combo} multiplier={comboMultiplier} />

      <BossArrivalModal boss={bossArrival} onDismiss={() => setBossArrival(null)} />
      <WaveSuccessBanner wave={wave} show={waveSuccess} />
      <RoyalRewardModal
        show={royalReward}
        wave={wave}
        onContinue={() => {
          setRoyalReward(false);
          setGold(g => g + 200); // Royal reward bonus gold
        }}
      />

      {gameOver && (
        <GameOverModal score={score} wave={wave} onRestart={handleRestart} />
      )}
    </div>
  );
}