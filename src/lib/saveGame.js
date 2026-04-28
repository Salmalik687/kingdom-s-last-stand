// Save/Load game progress using localStorage.
//
// v2 schema (current): tower upgrade flags collapse into a generic
// `upgrades: { [pathKey]: bool }` map, so adding a new `upgradePath_*` flag
// to a tower in towerUpgradePaths.js auto-persists without editing this file.
// v1 saves are migrated forward on load.
//
// Forward-compat note: a v2 save loaded by an old v1 build will not crash —
// the v1 loader copies known fields and skips the unknown `upgrades` key,
// resulting in towers that visually appear at base stats. Core game state
// (gold/lives/wave/score) is preserved. The next save from the v2 build
// re-writes the canonical shape.

const SAVE_KEY = 'kingdoms_last_stand_save';
const CURRENT_VERSION = 2;

// Runtime tower-property keys that should NOT be persisted (transient).
const TRANSIENT_TOWER_KEYS = new Set(['lastFire']);

// Pull all `upgradePath_*` keys off a tower into a generic map.
// Returns { rest, upgrades } so the caller can spread `rest` and store
// `upgrades` separately.
function splitUpgrades(tower) {
  const upgrades = {};
  const rest = {};
  for (const k of Object.keys(tower)) {
    if (TRANSIENT_TOWER_KEYS.has(k)) continue;
    if (k.startsWith('upgradePath_')) {
      // Coerce to plain values (booleans for flags, numbers for durations/radii).
      upgrades[k] = tower[k];
    } else {
      rest[k] = tower[k];
    }
  }
  return { rest, upgrades };
}

// Inverse of splitUpgrades — flatten { upgrades: {...} } back onto the tower.
function mergeUpgrades(savedTower) {
  const { upgrades, ...rest } = savedTower;
  if (upgrades && typeof upgrades === 'object') {
    Object.assign(rest, upgrades);
  }
  return rest;
}

export function saveGame(state) {
  try {
    const save = {
      version: CURRENT_VERSION,
      savedAt: new Date().toISOString(),
      // Core progress
      wave: state.wave,
      gold: state.gold,
      lives: state.lives,
      score: state.score,
      // Character & settings
      selectedCharacter: state.selectedCharacter,
      difficulty: state.difficulty,
      gameMode: state.gameMode,
      // Towers — generic upgrade serialization
      towers: state.towers.map(t => {
        const { rest, upgrades } = splitUpgrades(t);
        return {
          ...rest,
          upgradePurchased: t.upgradePurchased ? [...t.upgradePurchased] : [],
          shotCount: t.shotCount,
          upgrades,
        };
      }),
      towerMap: [...state.towerMap.entries()],
      // Perks & upgrades
      perksOwned: state.perksOwned,
      forgeRanks: state.forgeRanks,
      unlockedTowers: state.unlockedTowers,
      unlockedSkills: state.unlockedSkills,
      unlockedAbilities: state.unlockedAbilities,
      skillPoints: state.skillPoints,
      gloryPoints: state.gloryPoints,
      // Achievements
      unlockedAchievements: state.unlockedAchievements,
      seenEnemies: [...state.seenEnemies],
      // Perk multipliers
      perkMult: state.perkMult,
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(save));
    return true;
  } catch (e) {
    console.error('Save failed:', e);
    return false;
  }
}

// Migrate a v1 save (flat upgradePath_* keys on each tower, no `upgrades` map)
// into the v2 shape. v1 saves are produced by builds prior to the schema
// rework. The migration is idempotent — running it on a v2 save is a no-op.
function migrateV1toV2(save) {
  if (!save || typeof save !== 'object') return save;
  if (save.version === CURRENT_VERSION) return save;
  if (Array.isArray(save.towers)) {
    save.towers = save.towers.map(t => {
      // Already migrated.
      if (t && typeof t === 'object' && t.upgrades && typeof t.upgrades === 'object') return t;
      const upgrades = {};
      const rest = {};
      for (const k of Object.keys(t)) {
        if (k.startsWith('upgradePath_')) upgrades[k] = t[k];
        else rest[k] = t[k];
      }
      return { ...rest, upgrades };
    });
  }
  save.version = CURRENT_VERSION;
  return save;
}

export function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    let save = JSON.parse(raw);
    if (!save) return null;
    // Forward-compat: a save written by a NEWER build than this one. Don't
    // throw — try to load defensively. Unknown keys flow through.
    if (typeof save.version !== 'number') return null;
    // Migrate v1 -> v2 if needed.
    save = migrateV1toV2(save);
    // Restore Set / Map types
    save.seenEnemies = new Set(save.seenEnemies || []);
    save.towers = save.towers.map(t => {
      const merged = mergeUpgrades(t);
      return {
        ...merged,
        upgradePurchased: merged.upgradePurchased ? new Set(merged.upgradePurchased) : new Set(),
        lastFire: 0,
      };
    });
    save.towerMap = new Map(save.towerMap || []);
    return save;
  } catch (e) {
    console.error('Load failed:', e);
    return null;
  }
}

export function hasSave() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return false;
    const save = JSON.parse(raw);
    return save && typeof save.version === 'number';
  } catch {
    return false;
  }
}

export function deleteSave() {
  localStorage.removeItem(SAVE_KEY);
}

export function getSaveSummary() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const save = JSON.parse(raw);
    if (!save) return null;
    return {
      wave: save.wave,
      score: save.score,
      character: save.selectedCharacter,
      savedAt: save.savedAt,
      difficulty: save.difficulty,
    };
  } catch {
    return null;
  }
}
