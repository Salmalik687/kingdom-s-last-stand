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
import VictoryModal from "../components/game/VictoryModal";
import LandCompleteModal from "../components/game/LandCompleteModal";
import PerkShop from "../components/game/PerkShop";
import IntroStoryModal from "../components/game/IntroStoryModal";
import HallOfHeroesModal from "../components/game/HallOfHeroesModal";
import AchievementToast from "../components/game/AchievementToast";
import ArmorUpgradeScreen from "../components/game/ArmorUpgradeScreen";
import BossKillReward from "../components/game/BossKillReward";
import AbilityTree from "../components/game/AbilityTree";
import ActiveAbilityBar from "../components/game/ActiveAbilityBar";
import CodexModal from "../components/game/CodexModal";
import { checkNewAchievements } from "../lib/achievements";
import { playKillSound, playDamageSound, playWaveSuccessSound, playVictoryShout, playMergeSound } from "../lib/sounds";


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
  const [landComplete, setLandComplete] = useState(null); // 1-5 or null
  const [victory, setVictory] = useState(false);
  const [perkShop, setPerkShop] = useState(false);
  const [perksOwned, setPerksOwned] = useState({});
  const [showIntro, setShowIntro] = useState(true);
  const [hallOfHeroes, setHallOfHeroes] = useState(false);
  const [armorUpgrade, setArmorUpgrade] = useState(null); // chapter number 2-5
  const [bossKillReward, setBossKillReward] = useState(null); // bossType string
  const [showAbilityTree, setShowAbilityTree] = useState(false);
  const [showCodex, setShowCodex] = useState(false);
  const [seenEnemies, setSeenEnemies] = useState(new Set());
  const [gloryPoints, setGloryPoints] = useState(0);
  const [unlockedAbilities, setUnlockedAbilities] = useState([]);
  const [divineShieldActive, setDivineShieldActive] = useState(false);
  const [voidWrathActive, setVoidWrathActive] = useState(false);
  const tempBuffsRef = useRef({}); // { damageBonus, fireRateBonus, rangeBonus, wavesLeft }
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [newlyUnlocked, setNewlyUnlocked] = useState([]);

  // Achievement stats ref — updated continuously
  const achStatsRef = useRef({
    totalKills: 0, bossesDefeated: [], flawlessLands: 0, maxCombo: 0,
    maxGold: 0, totalMerges: 0, mergedTypes: [], score: 0,
    victory: false, finalLives: 20, livesAtLandStart: 20,
  });
  const checkAchievements = useCallback((stats) => {
    setUnlockedAchievements(prev => {
      const newly = checkNewAchievements(stats, prev);
      if (newly.length > 0) {
        setNewlyUnlocked(newly);
        setTimeout(() => setNewlyUnlocked([]), 100);
        return [...prev, ...newly];
      }
      return prev;
    });
  }, []);

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
        // Track merges for achievements
        achStatsRef.current.totalMerges = (achStatsRef.current.totalMerges ?? 0) + 1;
        if (!achStatsRef.current.mergedTypes.includes(resultType)) {
          achStatsRef.current.mergedTypes = [...achStatsRef.current.mergedTypes, resultType];
        }
        checkAchievements({ ...achStatsRef.current });
        playMergeSound(resultType);
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
          // Track for Codex
          setSeenEnemies(prev => prev.has(nextEnemy.type) ? prev : new Set([...prev, nextEnemy.type]));
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

      if (livesLost > 0 && !divineShieldActive) {
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
            const voidMult = voidWrathActive ? 3 : 1;
            const dmg = Math.floor(proj.damage * (1 - effectiveDR) * voidMult);
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
              if (target.type?.startsWith("boss_")) {
                setBossKillReward(target.type);
                setGloryPoints(gp => gp + 2); // +2 glory per boss kill
              }
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
          // Track max combo
          if (next > (achStatsRef.current.maxCombo ?? 0)) {
            achStatsRef.current.maxCombo = next;
          }
          setGold(g => {
            const ng = g + Math.floor(goldEarned * totalMult);
            if (ng > (achStatsRef.current.maxGold ?? 0)) achStatsRef.current.maxGold = ng;
            return ng;
          });
          return next;
        });
      }
      if (killCount > 0) {
        achStatsRef.current.totalKills = (achStatsRef.current.totalKills ?? 0) + killCount;
      }
      if (scoreEarned > 0) setScore(prev => {
        const ns = prev + scoreEarned * (combo < 5 ? 1 : combo < 10 ? 2 : combo < 20 ? 3 : 5);
        achStatsRef.current.score = ns;
        return ns;
      });

      // Check wave complete
      if (waveQueueRef.current.length === 0 && enemiesRef.current.length === 0) {
        setWaveActive(prev => {
          if (prev) {
            setWave(w => {
              const next = w + 1;
              // Show land complete scene after each land boss (waves 5,10,15,20,25)
              const landBossWaves = { 5: 1, 10: 2, 15: 3, 20: 4, 25: 5 };
              const bossByWave = { 5: "boss_meadow", 10: "boss_dungeon", 15: "boss_volcano", 20: "boss_abyss", 25: "boss_shadow" };
              if (landBossWaves[w]) {
                // Track boss defeat
                const bossType = bossByWave[w];
                if (bossType && !achStatsRef.current.bossesDefeated.includes(bossType)) {
                  achStatsRef.current.bossesDefeated = [...achStatsRef.current.bossesDefeated, bossType];
                }
                // Track flawless land
                setLives(currentLives => {
                  if (currentLives === achStatsRef.current.livesAtLandStart) {
                    achStatsRef.current.flawlessLands = (achStatsRef.current.flawlessLands ?? 0) + 1;
                  }
                  achStatsRef.current.livesAtLandStart = currentLives;
                  return currentLives;
                });
                setTimeout(() => setLandComplete(landBossWaves[w]), 800);
              }
              return next;
            });
            // Wave bonus scales with wave number
            setGold(g => {
              const ng = g + 25 + wave * 5;
              if (ng > (achStatsRef.current.maxGold ?? 0)) achStatsRef.current.maxGold = ng;
              return ng;
            });
            playWaveSuccessSound();
            playVictoryShout();
            setWaveSuccess(s => !s);
            // Check achievements after each wave
            checkAchievements({ ...achStatsRef.current });
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

  const handleActivateAbility = useCallback((abilityId) => {
    if (abilityId === "rain_of_arrows") {
      // Deal 150 damage to all enemies on screen
      enemiesRef.current.forEach(e => { e.hp -= 150; });
      enemiesRef.current = enemiesRef.current.filter(e => e.hp > 0);
      forceRender(n => n + 1);
    }
    if (abilityId === "healing_aura") {
      setLives(l => l + 3);
    }
    if (abilityId === "gold_surge") {
      setGold(g => g + 80);
    }
    if (abilityId === "earthquake") {
      // Freeze all enemies for 3s
      enemiesRef.current.forEach(e => { e.frozenTimer = 3000; e.slowTimer = 3000; });
    }
    if (abilityId === "frost_nova") {
      // Slow all enemies 70% for 5s
      enemiesRef.current.forEach(e => { e.slowTimer = 5000; });
    }
    if (abilityId === "tower_overcharge") {
      // Triple fire rate for 8 seconds
      const originalRates = towersRef.current.map(t => t.fireRate);
      towersRef.current.forEach(t => { t.fireRate = Math.max(50, Math.floor(t.fireRate / 3)); });
      setTimeout(() => {
        towersRef.current.forEach((t, i) => { t.fireRate = originalRates[i] ?? t.fireRate; });
        forceRender(n => n + 1);
      }, 8000);
    }
    if (abilityId === "meteor_strike") {
      // Kill all non-boss enemies, deal 2000 damage to bosses
      enemiesRef.current.forEach(e => {
        if (e.type?.startsWith("boss_")) { e.hp -= 2000; }
        else { e.hp = 0; }
      });
      enemiesRef.current = enemiesRef.current.filter(e => e.hp > 0);
      forceRender(n => n + 1);
    }
    if (abilityId === "divine_shield") {
      setDivineShieldActive(true);
      setTimeout(() => setDivineShieldActive(false), 10000);
    }
    if (abilityId === "void_wrath") {
      setVoidWrathActive(true);
      setTimeout(() => setVoidWrathActive(false), 6000);
    }
  }, []);

  const handleBossRewardClaim = useCallback((reward) => {
    if (!reward) { setBossKillReward(null); return; }
    if (reward.type === "gold") setGold(g => g + reward.value);
    if (reward.type === "lives") setLives(l => l + reward.value);
    if (reward.type === "perm_projspeed") {
      perkMultRef.current.projSpeedBonus = (perkMultRef.current.projSpeedBonus ?? 1) * (1 + reward.value);
    }
    if (reward.type === "perm_firerate") {
      const fr = 1 - reward.value;
      perkMultRef.current.fireRateBonus *= fr;
      towersRef.current.forEach(t => { t.fireRate = Math.max(150, Math.floor(t.fireRate * fr)); });
    }
    if (reward.type === "temp_damage") {
      perkMultRef.current.damageBonus *= (1 + reward.value);
      towersRef.current.forEach(t => { t.damage = Math.floor(t.damage * (1 + reward.value)); });
      tempBuffsRef.current.damageDebuff = reward.value;
      tempBuffsRef.current.damageWaves = reward.waves;
    }
    if (reward.type === "temp_firerate") {
      const fr = 1 - reward.value;
      towersRef.current.forEach(t => { t.fireRate = Math.max(150, Math.floor(t.fireRate * fr)); });
      tempBuffsRef.current.fireRateWaves = reward.waves;
      tempBuffsRef.current.fireRateDebuff = reward.value;
    }
    if (reward.type === "temp_range") {
      towersRef.current.forEach(t => { t.range *= (1 + reward.value); });
      tempBuffsRef.current.rangeWaves = reward.waves;
      tempBuffsRef.current.rangeDebuff = reward.value;
    }
    if (reward.type === "combo_life_dmg") {
      const [livesV, dmgV] = reward.value;
      setLives(l => l + livesV);
      perkMultRef.current.damageBonus *= (1 + dmgV);
      towersRef.current.forEach(t => { t.damage = Math.floor(t.damage * (1 + dmgV)); });
    }
    if (reward.type === "combo_gold_life") {
      const [goldV, livesV] = reward.value;
      setGold(g => g + goldV);
      setLives(l => l + livesV);
    }
    if (reward.type === "pact") {
      const [dmgV, livesV] = reward.value;
      perkMultRef.current.damageBonus *= (1 + dmgV);
      towersRef.current.forEach(t => { t.damage = Math.floor(t.damage * (1 + dmgV)); });
      setLives(l => Math.max(1, l + livesV));
    }
    if (reward.type === "kill_gold") {
      tempBuffsRef.current.killGoldBonus = reward.value;
      tempBuffsRef.current.killGoldWaves = reward.waves;
    }
    setBossKillReward(null);
    forceRender(n => n + 1);
  }, []);

  const handleUnlockAbility = useCallback((ability) => {
    setGloryPoints(gp => {
      if (gp < ability.cost) return gp;
      setUnlockedAbilities(prev => [...prev, ability.id]);
      return gp - ability.cost;
    });
  }, []);

  const handleArmorUpgrade = useCallback((upgradeId) => {
    // Apply upgrade effects
    if (upgradeId === "iron_fist" || upgradeId === "storm_mantle") {
      const pct = upgradeId === "storm_mantle" ? 1.20 : 1.15;
      perkMultRef.current.damageBonus *= pct;
      towersRef.current.forEach(t => { t.damage = Math.floor(t.damage * pct); });
    }
    if (upgradeId === "swift_grip") {
      perkMultRef.current.fireRateBonus *= 0.88;
      towersRef.current.forEach(t => { t.fireRate = Math.max(150, Math.floor(t.fireRate * 0.88)); });
    }
    if (upgradeId === "golden_palm") {
      setGold(g => g + 20);
      perkMultRef.current.goldBonus = (perkMultRef.current.goldBonus ?? 1) * 1.10;
    }
    if (upgradeId === "ember_cloak") {
      perkMultRef.current.projSpeedBonus = (perkMultRef.current.projSpeedBonus ?? 1) * 1.20;
    }
    if (upgradeId === "forge_mantle") {
      towersRef.current.forEach(t => { t.range *= 1.10; });
    }
    if (upgradeId === "cinder_shroud") {
      setLives(l => l + 1);
    }
    if (upgradeId === "titan_shoulders") {
      setLives(l => l + 3);
    }
    if (upgradeId === "kings_resolve") {
      setLives(l => l + 10);
      setGold(g => g + 200);
    }
    if (upgradeId === "eternal_flame") {
      perkMultRef.current.damageBonus *= 1.40;
      perkMultRef.current.fireRateBonus *= 0.75;
      towersRef.current.forEach(t => {
        t.damage = Math.floor(t.damage * 1.40);
        t.fireRate = Math.max(150, Math.floor(t.fireRate * 0.75));
      });
    }
    if (upgradeId === "soul_aegis") {
      perkMultRef.current.damageBonus *= 2;
      perkMultRef.current.fireRateBonus = Math.min(perkMultRef.current.fireRateBonus, 0.5);
      perkMultRef.current.goldBonus *= 2;
    }
    if (upgradeId === "dungeon_ward") {
      setLives(l => l + 4);
    }
    if (upgradeId === "titan_core") {
      perkMultRef.current.damageBonus *= 1.20;
      towersRef.current.forEach(t => { t.damage = Math.floor(t.damage * 1.20); });
    }
    if (upgradeId === "blizzard_heart") {
      towersRef.current.forEach(t => { t.range *= 1.15; t.fireRate = Math.max(150, Math.floor(t.fireRate * 0.90)); });
    }
    if (upgradeId === "void_mantle") {
      perkMultRef.current.damageBonus *= 1.30;
      towersRef.current.forEach(t => { t.range *= 1.50; t.damage = Math.floor(t.damage * 1.30); });
    }

    const wasChapter5 = armorUpgrade === 5;
    setArmorUpgrade(null);
    if (wasChapter5) setTimeout(() => setVictory(true), 600);
    forceRender(n => n + 1);
  }, [armorUpgrade]);

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
    setLandComplete(null);
    setVictory(false);
    setPerkShop(false);
    setPerksOwned({});
    setShowIntro(true);
    setArmorUpgrade(null);
    setGloryPoints(0);
    setUnlockedAbilities([]);
    setDivineShieldActive(false);
    setVoidWrathActive(false);
    setShowAbilityTree(false);
    setShowCodex(false);
    setSeenEnemies(new Set());
    setUnlockedAchievements([]);
    setNewlyUnlocked([]);
    achStatsRef.current = {
      totalKills: 0, bossesDefeated: [], flawlessLands: 0, maxCombo: 0,
      maxGold: 0, totalMerges: 0, mergedTypes: [], score: 0,
      victory: false, finalLives: 20, livesAtLandStart: 20,
    };
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
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAbilityTree(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-black text-xs uppercase tracking-wider transition-all hover:scale-105"
              style={{
                background: "linear-gradient(180deg, #7c3aed, #4c1d95)",
                border: "2px solid #a78bfa",
                boxShadow: "0 2px 0 #1e0a4a, 0 0 10px rgba(139,92,246,0.4)",
                color: "#e9d5ff",
              }}>
              ✨ <span className="hidden sm:inline">Abilities</span>
              {gloryPoints > 0 && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full text-[9px] font-black"
                  style={{ background: "#ffd60a", color: "#3a2000" }}>
                  {gloryPoints}✨
                </span>
              )}
            </button>
            <button
              onClick={() => setShowCodex(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-black text-xs uppercase tracking-wider transition-all hover:scale-105"
              style={{
                background: "linear-gradient(180deg, #0e7490, #155e75)",
                border: "2px solid #22d3ee",
                boxShadow: "0 2px 0 #042f2e, 0 0 10px rgba(34,211,238,0.3)",
                color: "#cffafe",
              }}>
              📖 <span className="hidden sm:inline">Codex</span>
              {seenEnemies.size > 0 && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full text-[9px] font-black"
                  style={{ background: "#22d3ee", color: "#042f2e" }}>
                  {seenEnemies.size}
                </span>
              )}
            </button>
            <button
              onClick={() => setHallOfHeroes(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-black text-xs uppercase tracking-wider transition-all hover:scale-105"
              style={{
                background: "linear-gradient(180deg, #f59e0b, #d97706)",
                border: "2px solid #fcd34d",
                boxShadow: "0 2px 0 #78350f, 0 0 10px rgba(245,158,11,0.3)",
                color: "#1c0a00",
              }}>
              🏛️ <span className="hidden sm:inline">Heroes</span>
              {unlockedAchievements.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full text-[9px] font-black"
                  style={{ background: "#7c3aed", color: "#e9d5ff" }}>
                  {unlockedAchievements.length}
                </span>
              )}
            </button>
            <GameHUD lives={lives} gold={gold} wave={wave} score={score} />
          </div>
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
            {/* Active ability status badges */}
            <div className="flex items-center justify-center gap-2 mt-1 flex-wrap">
              {divineShieldActive && (
                <div className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-black animate-pulse"
                  style={{ background: "rgba(167,139,250,0.2)", border: "1px solid #a78bfa", color: "#e9d5ff" }}>
                  🛡️ Divine Shield Active
                </div>
              )}
              {voidWrathActive && (
                <div className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-black animate-pulse"
                  style={{ background: "rgba(192,132,252,0.2)", border: "1px solid #c084fc", color: "#f0d0ff" }}>
                  🌀 Void Wrath — 3× Damage
                </div>
              )}
            </div>
            <ActiveAbilityBar
              unlockedAbilities={unlockedAbilities}
              onActivate={handleActivateAbility}
              disabled={!waveActive}
            />
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
      <LandCompleteModal
        landNumber={landComplete}
        show={!!landComplete}
        onContinue={() => {
          const LAND_REWARDS = { 1: 300, 2: 500, 3: 750, 4: 1000, 5: 2000 };
          setGold(g => g + (LAND_REWARDS[landComplete] ?? 300));
          const completedLand = landComplete;
          setLandComplete(null);
          if (completedLand === 5) {
            setLives(currentLives => {
              achStatsRef.current.victory = true;
              achStatsRef.current.finalLives = currentLives;
              checkAchievements({ ...achStatsRef.current });
              return currentLives;
            });
            setArmorUpgrade(5);
          } else if (completedLand >= 1 && completedLand <= 4) {
            // Chapters 2-5 show upgrade after land 1-4 respectively
            setTimeout(() => setArmorUpgrade(completedLand + 1), 400);
          }
        }}
      />
      <VictoryModal
        show={victory}
        score={score}
        wave={wave}
        onRestart={() => { setVictory(false); handleRestart(); }}
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

      <CodexModal show={showCodex} onClose={() => setShowCodex(false)} seenEnemies={seenEnemies} />
      <IntroStoryModal show={showIntro} onBegin={(armorId) => setShowIntro(false)} />

      <AbilityTree
        show={showAbilityTree}
        gloryPoints={gloryPoints}
        unlockedAbilities={unlockedAbilities}
        onUnlock={handleUnlockAbility}
        onClose={() => setShowAbilityTree(false)}
      />

      <BossKillReward
        bossType={bossKillReward}
        show={!!bossKillReward}
        onClaim={handleBossRewardClaim}
      />

      {armorUpgrade && (
        <ArmorUpgradeScreen
          chapter={armorUpgrade}
          onConfirm={handleArmorUpgrade}
        />
      )}

      <HallOfHeroesModal
        show={hallOfHeroes}
        onClose={() => setHallOfHeroes(false)}
        unlockedIds={unlockedAchievements}
        stats={achStatsRef.current}
      />
      <AchievementToast newlyUnlocked={newlyUnlocked} />
    </div>
  );
}