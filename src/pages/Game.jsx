import { useState, useRef, useCallback, useEffect } from "react";
import {
  TOWER_TYPES, PATH_SET, CELL_SIZE,
  generateWaves, createEnemy, createTower, createProjectile,
  distanceBetween, moveEnemy, moveProjectile, generateBossInfo,
  findMergePair, mergeTowers, towerHasAbility,
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
import DarkLordModal from "../components/game/DarkLordModal";
import VictoryModal from "../components/game/VictoryModal";
import PerkShop from "../components/game/PerkShop";
import IntroStoryModal from "../components/game/IntroStoryModal";
import { playKillSound, playDamageSound, playWaveSuccessSound, playVictoryShout } from "../lib/sounds";


const INITIAL_GOLD = 150;
const INITIAL_LIVES = 20;

// Pre-placed cannon positions at game start
const INITIAL_CANNON_POSITIONS = [[3, 6], [6, 3], [10, 5], [13, 6]];

function makeInitialState() {
  const towers = [];
  const map = new Map();
  INITIAL_CANNON_POSITIONS.forEach(([gx, gy]) => {
    if (!PATH_SET.has(`${gx},${gy}`)) {
      const t = createTower("cannon", gx, gy);
      towers.push(t);
      map.set(`${gx},${gy}`, t.id);
    }
  });
  return { towers, map };
}

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
  const [darkLordDefeated, setDarkLordDefeated] = useState(false);
  const [victory, setVictory] = useState(false);
  const [perkShop, setPerkShop] = useState(false);
  const [perksOwned, setPerksOwned] = useState({});
  const [showIntro, setShowIntro] = useState(true);
  // Persistent multipliers from perks
  const perkMultRef = useRef({ goldBonus: 1, damageBonus: 1, fireRateBonus: 1, projSpeedBonus: 1 });
  const comboTimerRef = useRef(null);
  const COMBO_WINDOW = 3000; // ms between kills to maintain combo

  const comboMultiplier = combo < 5 ? 1 : combo < 10 ? 2 : combo < 20 ? 3 : 5;

  const { towers: _initTowers, map: _initMap } = makeInitialState();
  const towersRef = useRef(_initTowers);
  const enemiesRef = useRef([]);
  const projectilesRef = useRef([]);
  const towerMapRef = useRef(_initMap);
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

      // Base stat scaling
      tower.damage = Math.floor(base.damage * (1 + (tower.level - 1) * 0.4));
      tower.range = base.range * CELL_SIZE * (1 + (tower.level - 1) * 0.1);
      tower.fireRate = Math.max(200, base.fireRate * (1 - (tower.level - 1) * 0.08));

      // Apply ability bonuses unlocked at this new level
      if (towerHasAbility(tower, "rangeup")) {
        const rangeBonus = { trebuchet: 0.30, frost: 0.30, crossbow: 0.35, arrowStorm: 0.35, siegeEngine: 0.30, warMachine: 0.30 }[tower.type] ?? 0.25;
        tower.range *= (1 + rangeBonus);
      }
      if (towerHasAbility(tower, "rapidfire")) {
        const rfBonus = { crossbow: 0.30, arrowStorm: 0.50, ballista: 0.35 }[tower.type] ?? 0.40;
        tower.fireRate = Math.max(150, tower.fireRate * (1 - rfBonus));
      }
      if (towerHasAbility(tower, "siege")) {
        tower.damage = Math.floor(tower.damage * (tower.type === "siegeEngine" ? 1.8 : 1.6));
        tower.fireRate = Math.floor(tower.fireRate * (tower.type === "siegeEngine" ? 0.90 : 0.80));
      }

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

  const handleBuyPerk = useCallback((perk) => {
    if (perk.cost > 0) {
      setGold(prev => {
        if (prev < perk.cost) return prev;
        return prev - perk.cost;
      });
    }
    // Apply immediate rewards
    if (perk.id === "extra_life") setLives(l => l + 3);
    if (perk.id === "wave_gold") setGold(g => g + (perk.reward ?? 75));

    // Apply persistent multipliers to towers
    if (perk.id === "tower_power") {
      perkMultRef.current.damageBonus *= 1.15;
      towersRef.current.forEach(t => { t.damage = Math.floor(t.damage * 1.15); });
    }
    if (perk.id === "swift_reload") {
      perkMultRef.current.fireRateBonus *= 0.90;
      towersRef.current.forEach(t => { t.fireRate = Math.max(150, Math.floor(t.fireRate * 0.90)); });
    }
    if (perk.id === "wide_range") {
      towersRef.current.forEach(t => { t.range *= 1.10; });
    }
    if (perk.id === "gold_rush") {
      perkMultRef.current.goldBonus *= 1.25;
    }
    if (perk.id === "whirlwind") {
      perkMultRef.current.projSpeedBonus = (perkMultRef.current.projSpeedBonus ?? 1) * 1.20;
    }

    setPerksOwned(prev => ({ ...prev, [perk.id]: (prev[perk.id] ?? 0) + 1 }));
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

        // Find enemies in range, sorted by path progress
        const inRange = enemiesRef.current
          .filter(e => distanceBetween(tower, e) <= tower.range)
          .sort((a, b) => b.pathIndex - a.pathIndex);

        if (inRange.length === 0) return;

        tower.lastFire = now;
        tower.shotCount = (tower.shotCount ?? 0) + 1;

        const newProjs = [];

        // Multi-shot: fire at multiple enemies
        const multiCount = towerHasAbility(tower, "multishot")
          ? (tower.type === "arrowStorm" ? 3 : 2)
          : 1;
        const targets = inRange.slice(0, multiCount);
        targets.forEach(t => newProjs.push(createProjectile(tower, t)));

        // Barrage: every 5th shot fires extra shells at random enemies in range
        if (towerHasAbility(tower, "barrage") && tower.shotCount % 5 === 0) {
          const extraCount = { doomcannon: 4, warcannon: 3, cannon: 2 }[tower.type] ?? 2;
          const extras = [...inRange].sort(() => Math.random() - 0.5).slice(0, extraCount);
          extras.forEach(t => newProjs.push(createProjectile(tower, t, Math.floor(tower.damage * 0.7))));
        }

        projectilesRef.current = [...projectilesRef.current, ...newProjs];
      });

      // Move projectiles
      let goldEarned = 0;
      let scoreEarned = 0;
      let killCount = 0;
      let newProjectiles = [];
      const projSpeedMult = perkMultRef.current.projSpeedBonus ?? 1;
      projectilesRef.current.forEach(proj => {
        proj.speed = 5 * projSpeedMult;
        const result = moveProjectile(proj, enemiesRef.current);
        if (result.hit) {
          const target = enemiesRef.current.find(e => e.id === result.targetId);
          if (target) {
            // Armor break: reduce effective armor
            const armorReduction = proj.armorBreak ?? 0;
            const effectiveDR = Math.max(0, (target.damageReduction ?? 0) - armorReduction);
            const dmg = Math.floor(proj.damage * (1 - effectiveDR));
            target.hp -= dmg;

            // Slow / freeze effects
            if (proj.towerType === "frost" || TOWER_TYPES[proj.towerType]?.appliesSlow || proj.appliesSlow) {
              target.slowTimer = proj.freezeDuration ?? 2000;
            }
            if (proj.appliesFreeze) {
              target.slowTimer = 1500;
              target.frozenTimer = 1500; // full stop
            }

            // Burn / poison DoT
            if (proj.burnDuration) {
              target.burnTimer = proj.burnDuration;
              target.burnDmg = Math.max(1, Math.floor(proj.damage * 0.12));
            }
            if (proj.poisonDuration) {
              target.poisonTimer = proj.poisonDuration;
              target.poisonDmg = Math.max(1, Math.floor(proj.damage * 0.08));
            }

            // Slow field on impact (trebuchet L4, siegeEngine L4)
            if (proj.slowField) {
              const splashR = CELL_SIZE * 1.8;
              enemiesRef.current.forEach(e => {
                if (e.id !== target.id && Math.sqrt((e.x - target.x) ** 2 + (e.y - target.y) ** 2) <= splashR) {
                  e.slowTimer = 2000;
                }
              });
            }

            // AoE Splash damage
            if (proj.splashRadius && proj.splashDamage) {
              enemiesRef.current.forEach(e => {
                if (e.id !== target.id) {
                  const d = Math.sqrt((e.x - target.x) ** 2 + (e.y - target.y) ** 2);
                  if (d <= proj.splashRadius) {
                    const splashDmg = Math.floor(proj.splashDamage * (1 - Math.max(0, (e.damageReduction ?? 0) - armorReduction)));
                    e.hp -= splashDmg;
                    if (proj.burnDuration) { e.burnTimer = proj.burnDuration; e.burnDmg = Math.max(1, Math.floor(proj.splashDamage * 0.1)); }
                    if (proj.appliesSlow) e.slowTimer = 2000;
                    if (e.hp <= 0) {
                      goldEarned += e.reward;
                      scoreEarned += e.reward * 2;
                      killCount++;
                      playKillSound();
                    }
                  }
                }
              });
              enemiesRef.current = enemiesRef.current.filter(e => e.hp > 0);
            }

            // Chain lightning (mage L5): jump to nearest other enemy
            if (proj.chain) {
              let nearest = null, nearestD = Infinity;
              enemiesRef.current.forEach(e => {
                if (e.id !== target.id) {
                  const d = Math.sqrt((e.x - target.x) ** 2 + (e.y - target.y) ** 2);
                  if (d < nearestD && d < CELL_SIZE * 3) { nearest = e; nearestD = d; }
                }
              });
              if (nearest) {
                const chainDmg = Math.floor(proj.damage * 0.6 * (1 - (nearest.damageReduction ?? 0)));
                nearest.hp -= chainDmg;
                if (nearest.hp <= 0) {
                  goldEarned += nearest.reward; scoreEarned += nearest.reward * 2; killCount++; playKillSound();
                  enemiesRef.current = enemiesRef.current.filter(e => e.id !== nearest.id);
                }
              }
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

      // Apply DoT (burn & poison) and frozen timers
      enemiesRef.current.forEach(enemy => {
        if (enemy.burnTimer > 0) {
          enemy.burnTimer -= dt * 1000;
          enemy.hp -= (enemy.burnDmg ?? 1) * dt * 3;
        }
        if (enemy.poisonTimer > 0) {
          enemy.poisonTimer -= dt * 1000;
          enemy.hp -= (enemy.poisonDmg ?? 1) * dt * 2;
        }
        if (enemy.frozenTimer > 0) {
          enemy.frozenTimer -= dt * 1000;
        }
      });
      // Remove enemies killed by DoT
      const dotKilled = enemiesRef.current.filter(e => e.hp <= 0);
      dotKilled.forEach(e => { goldEarned += e.reward; scoreEarned += e.reward * 2; killCount++; });
      if (dotKilled.length > 0) enemiesRef.current = enemiesRef.current.filter(e => e.hp > 0);

      if (goldEarned > 0) {
        setCombo(prev => {
          const next = prev + killCount;
          if (comboTimerRef.current) clearTimeout(comboTimerRef.current);
          comboTimerRef.current = setTimeout(() => setCombo(0), COMBO_WINDOW);
          const comboMult = next < 5 ? 1 : next < 10 ? 2 : next < 20 ? 3 : 5;
          const totalMult = comboMult * (perkMultRef.current.goldBonus ?? 1);
          setGold(g => g + Math.floor(goldEarned * totalMult));
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
              // After dark fortress stage (wave 10), show Dark Lord defeated scene
              if (w === 10) setTimeout(() => setDarkLordDefeated(true), 800);
              return next;
            });
            // Wave bonus scales with wave number
            setGold(g => g + 25 + wave * 5);
            playWaveSuccessSound();
            playVictoryShout();
            setWaveSuccess(s => !s);
            // Show perk shop every 2 waves
            if (wave % 2 === 0) setTimeout(() => setPerkShop(true), 900);
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
    const { towers: rt, map: rm } = makeInitialState();
    towersRef.current = rt;
    enemiesRef.current = [];
    projectilesRef.current = [];
    towerMapRef.current = rm;
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
    setRoyalReward(false);
    setDarkLordDefeated(false);
    setVictory(false);
      setPerkShop(false);
      setPerksOwned({});
      setShowIntro(true);
    perkMultRef.current = { goldBonus: 1, damageBonus: 1, fireRateBonus: 1, projSpeedBonus: 1 };
    if (comboTimerRef.current) clearTimeout(comboTimerRef.current);
    lastTimeRef.current = 0;
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #0d0a1a 0%, #08051a 40%, #0d0a1f 100%)' }}>
      {/* Header — Clash Royale royal banner style */}
      <div style={{
        background: 'linear-gradient(180deg, #1a0f3a 0%, #0f0a2a 100%)',
        borderBottom: '3px solid #4a2d8a',
        boxShadow: '0 4px 0 #06030f, 0 0 30px rgba(100,60,200,0.2)',
      }}>
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Crown icon */}
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{
                background: 'linear-gradient(160deg, #7c3aed, #4c1d95)',
                border: '2px solid #a78bfa',
                boxShadow: '0 3px 0 #1e0a4a, 0 0 16px rgba(139,92,246,0.4)',
              }}>
              👑
            </div>
            <div>
              <h1 className="text-base font-black uppercase tracking-[0.15em]"
                style={{
                  fontFamily: "'Cinzel Decorative', serif",
                  background: 'linear-gradient(135deg, #e9d5ff, #ffd60a, #e9d5ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 8px rgba(199,125,255,0.5))',
                }}>
                Kingdom's Last Stand
              </h1>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em]" style={{ color: '#7c5fa0' }}>
                ⚔ Medieval Tower Defense ⚔
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
            <div className="rounded-2xl p-4" style={{
              background: 'linear-gradient(160deg, #1a1535, #100e22)',
              border: '2px solid rgba(100,60,180,0.5)',
              boxShadow: '0 6px 0 #05030f, 0 0 30px rgba(100,60,200,0.12)',
            }}>
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
              <div className="mt-4 rounded-xl px-3 py-2 space-y-1 text-[9px] font-semibold"
                style={{ background: 'rgba(100,60,180,0.08)', border: '1px solid rgba(100,60,180,0.2)', color: '#5a4880' }}>
                <p>⚔ Select tower → click board to place</p>
                <p>🔧 Tap a tower to upgrade or sell</p>
                <p>💰 Bonus gold after each wave</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {mergeFlash && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3 rounded-2xl font-black tracking-widest uppercase text-sm animate-bounce"
          style={{
            background: 'linear-gradient(160deg, #7c3aed, #4c1d95)',
            border: '2px solid #a78bfa',
            boxShadow: '0 5px 0 #1e0a4a, 0 0 30px rgba(139,92,246,0.5)',
            color: '#e9d5ff',
            textShadow: '0 1px 3px rgba(0,0,0,0.5)',
          }}>
          ✨ {mergeFlash.emoji} {mergeFlash.name} Forged!
        </div>
      )}
      <ComboDisplay combo={combo} multiplier={comboMultiplier} />

      <BossArrivalModal boss={bossArrival} onDismiss={() => setBossArrival(null)} />
      <WaveSuccessBanner wave={wave} show={waveSuccess} />
      <DarkLordModal
        show={darkLordDefeated}
        onContinue={() => {
          setDarkLordDefeated(false);
          setGold(g => g + 500);
          setTimeout(() => setVictory(true), 600);
        }}
      />
      <VictoryModal
        show={victory}
        score={score}
        wave={wave}
        onRestart={() => { setVictory(false); handleRestart(); }}
      />
      <RoyalRewardModal
        show={royalReward}
        wave={wave}
        onContinue={() => {
          setRoyalReward(false);
          setGold(g => g + 200); // Royal reward bonus gold
        }}
      />

      <PerkShop
        show={perkShop}
        wave={wave}
        gold={gold}
        perksOwned={perksOwned}
        onBuy={handleBuyPerk}
        onClose={() => setPerkShop(false)}
      />

      {gameOver && (
        <GameOverModal score={score} wave={wave} onRestart={handleRestart} />
      )}

      <IntroStoryModal show={showIntro} onBegin={() => setShowIntro(false)} />
    </div>
  );
}