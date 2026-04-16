// Medieval Tower Defense Game Engine

export const CELL_SIZE = 48;
export const GRID_COLS = 16;
export const GRID_ROWS = 10;

// Stage themes — wave ranges map to a visual theme
export const STAGE_THEMES = {
  meadow: {
    name: "The Meadow",
    waveRange: [1, 5],
    bg: "#071a07",
    grassA: "#0e2b0e",
    grassB: "#0c270c",
    pathA: "#3b2a14",
    pathB: "#342515",
    pathBorder: "rgba(60,40,10,0.45)",
    gridLine: "rgba(20,60,20,0.07)",
    borderColor: "#1a4a1a",
    label: "Waves 1–5",
    emoji: "🌿",
  },
  dungeon: {
    name: "The Dark Dungeon",
    waveRange: [6, 12],
    bg: "#080810",
    grassA: "#0d0d18",
    grassB: "#0a0a14",
    pathA: "#1c1c14",
    pathB: "#181810",
    pathBorder: "rgba(60,60,20,0.4)",
    gridLine: "rgba(40,40,80,0.07)",
    borderColor: "#1a1a40",
    label: "Waves 6–12",
    emoji: "🪨",
  },
  volcano: {
    name: "Volcanic Wastes",
    waveRange: [13, 20],
    bg: "#100303",
    grassA: "#1a0505",
    grassB: "#160404",
    pathA: "#2a1000",
    pathB: "#240d00",
    pathBorder: "rgba(150,40,0,0.45)",
    gridLine: "rgba(120,20,0,0.07)",
    borderColor: "#5a1a00",
    label: "Waves 13–20",
    emoji: "🌋",
  },
  abyss: {
    name: "The Abyss",
    waveRange: [21, 999],
    bg: "#020208",
    grassA: "#05050f",
    grassB: "#040410",
    pathA: "#0e0e20",
    pathB: "#0c0c1c",
    pathBorder: "rgba(80,0,150,0.4)",
    gridLine: "rgba(60,0,120,0.08)",
    borderColor: "#1a0044",
    label: "Wave 21+",
    emoji: "💀",
  },
};

export function getStageTheme(wave) {
  for (const theme of Object.values(STAGE_THEMES)) {
    if (wave >= theme.waveRange[0] && wave <= theme.waveRange[1]) return theme;
  }
  return STAGE_THEMES.abyss;
}

export const PATH = [
  [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [4, 3], [4, 2], [4, 1],
  [5, 1], [6, 1], [7, 1], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5],
  [8, 6], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [12, 6], [12, 5],
  [12, 4], [12, 3], [13, 3], [14, 3], [15, 3]
];

export const PATH_SET = new Set(PATH.map(([x, y]) => `${x},${y}`));

export const TOWER_TYPES = {
  archer: {
    name: "Archer Tower",
    cost: 50,
    damage: 8,
    range: 3,
    fireRate: 800,
    color: "#8B4513",
    emoji: "🏹",
    description: "Fast attack, medium range",
    upgradeCost: 40,
    comboType: "speed",
  },
  cannon: {
    name: "Cannon Tower",
    cost: 100,
    damage: 25,
    range: 2.5,
    fireRate: 1800,
    color: "#4A4A4A",
    emoji: "💣",
    description: "High damage, slow fire",
    upgradeCost: 75,
    comboType: "heavy",
  },
  ballista: {
    name: "Siege Ballista",
    cost: 0,
    damage: 45,
    range: 4,
    fireRate: 600,
    color: "#b45309",
    emoji: "🎯",
    description: "Archer + Cannon merge. Fast & devastating",
    upgradeCost: 100,
    comboType: "siege",
    isMerged: true,
  },
  warcannon: {
    name: "War Cannon",
    cost: 0,
    damage: 80,
    range: 3.5,
    fireRate: 1400,
    color: "#7f1d1d",
    emoji: "🔴",
    description: "Cannon + Cannon merge. Brutal heavy fire",
    upgradeCost: 150,
    comboType: "heavy",
    isMerged: true,
  },
  doomcannon: {
    name: "Doomsday Cannon",
    cost: 0,
    damage: 160,
    range: 5,
    fireRate: 1000,
    color: "#450a0a",
    emoji: "💥",
    description: "War Cannon + Ballista. The ultimate destroyer",
    upgradeCost: 250,
    comboType: "doom",
    isMerged: true,
  },
  mage: {
    name: "Mage Tower",
    cost: 80,
    damage: 15,
    range: 3.5,
    fireRate: 1200,
    color: "#4B0082",
    emoji: "🔮",
    description: "Long range, magic damage",
    upgradeCost: 60,
    comboType: "magic",
  },
  frost: {
    name: "Frost Tower",
    cost: 70,
    damage: 5,
    range: 2.5,
    fireRate: 1000,
    color: "#4682B4",
    emoji: "❄️",
    description: "Slows enemies",
    upgradeCost: 50,
    comboType: "support",
  },
};

export const ENEMY_TYPES = {
  peasant: { hp: 30, speed: 1.2, reward: 10, emoji: "🧑‍🌾", name: "Peasant" },
  soldier: { hp: 60, speed: 1, reward: 15, emoji: "⚔️", name: "Soldier" },
  knight: { hp: 120, speed: 0.8, reward: 25, emoji: "🛡️", name: "Knight" },
  horseman: { hp: 80, speed: 1.8, reward: 20, emoji: "🐴", name: "Horseman" },
  king: { hp: 300, speed: 0.6, reward: 100, emoji: "👑", name: "King" },
  // Stage bosses
  boss_meadow:  { hp: 600,  speed: 0.7, reward: 200, emoji: "🌲", name: "Forest Warden",   isBoss: true },
  boss_dungeon: { hp: 1000, speed: 0.55, reward: 350, emoji: "🧟", name: "Dungeon Wraith",  isBoss: true },
  boss_volcano: { hp: 1800, speed: 0.5, reward: 600, emoji: "🔥", name: "Flame Colossus",  isBoss: true },
  boss_abyss:   { hp: 3000, speed: 0.45, reward: 1000, emoji: "💀", name: "Void Sovereign", isBoss: true },
};

// Stage boss waves: the final wave of each stage triggers a boss
export const STAGE_BOSS_WAVES = { 5: "boss_meadow", 12: "boss_dungeon", 20: "boss_volcano", 30: "boss_abyss" };

const BOSS_NAME_PARTS = {
  prefix: ["Lord", "Dread", "Dark", "Iron", "Blood", "Cursed", "Shadow", "Grim", "Wicked", "Fell"],
  meadow:  ["Briar", "Thorn", "Grove", "Root", "Verdant", "Fen", "Wilder", "Bough"],
  dungeon: ["Crypt", "Bone", "Rotten", "Hollow", "Murk", "Bile", "Dusk", "Vile"],
  volcano: ["Ember", "Char", "Sear", "Cinder", "Scorch", "Forge", "Blaze", "Ash"],
  abyss:   ["Void", "Null", "Abysm", "Ruin", "Doom", "Nether", "Oblivion", "Rift"],
  suffix:  ["the Undying", "of Ruin", "the Betrayer", "the Eternal", "Bloodfang", "Deathbringer", "the Merciless", "Soulreaper"],
};

const BOSS_TAUNT = {
  boss_meadow:  ["Your walls crumble like leaves in autumn.", "The forest reclaims what is mine.", "No arrow can pierce my bark."],
  boss_dungeon: ["The darkness obeys only me.", "Your torches will not save you.", "I have waited centuries for this."],
  boss_volcano: ["I am born of the mountain's wrath.", "Your kingdom will burn like kindling.", "The earth itself is my weapon."],
  boss_abyss:   ["Nothing escapes the void.", "Your very hope is fuel for me.", "I am inevitable."],
};

const BOSS_GLOW = {
  boss_meadow: "#22c55e",
  boss_dungeon: "#6366f1",
  boss_volcano: "#f97316",
  boss_abyss: "#a855f7",
};

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

export function generateBossInfo(bossType) {
  const stageKey = bossType.replace("boss_", "");
  const nameParts = BOSS_NAME_PARTS[stageKey] || BOSS_NAME_PARTS.abyss;
  const name = `${pick(BOSS_NAME_PARTS.prefix)} ${pick(nameParts)} ${pick(BOSS_NAME_PARTS.suffix)}`;
  const taunt = pick(BOSS_TAUNT[bossType]);
  const glowColor = BOSS_GLOW[bossType] || "#ef4444";
  const stageLabel = {
    boss_meadow: "🌿 The Meadow",
    boss_dungeon: "🪨 The Dark Dungeon",
    boss_volcano: "🌋 Volcanic Wastes",
    boss_abyss: "💀 The Abyss",
  }[bossType] || "Stage Boss";
  const emoji = ENEMY_TYPES[bossType]?.emoji || "👹";
  return { name, taunt, glowColor, stageLabel, emoji, bossType };
}

export function generateWaves(waveNumber) {
  const enemies = [];
  const base = Math.min(waveNumber, 20);
  const isBossWave = !!STAGE_BOSS_WAVES[waveNumber];

  if (waveNumber <= 3) {
    for (let i = 0; i < 3 + waveNumber * 2; i++) {
      enemies.push({ type: "peasant", delay: i * 800 });
    }
  } else if (waveNumber <= 6) {
    for (let i = 0; i < 4 + waveNumber; i++) {
      enemies.push({ type: i % 3 === 0 ? "soldier" : "peasant", delay: i * 700 });
    }
  } else if (waveNumber <= 10) {
    for (let i = 0; i < 5 + waveNumber; i++) {
      const types = ["peasant", "soldier", "knight", "horseman"];
      enemies.push({ type: types[i % types.length], delay: i * 600 });
    }
  } else {
    for (let i = 0; i < base + 5; i++) {
      const types = ["soldier", "knight", "horseman"];
      enemies.push({ type: types[i % types.length], delay: i * 500 });
    }
    if (waveNumber % 5 === 0 && !isBossWave) {
      enemies.push({ type: "king", delay: (base + 5) * 500 + 1000 });
    }
  }

  // Spawn stage boss at the end of the wave
  if (isBossWave) {
    const lastDelay = enemies.length > 0 ? enemies[enemies.length - 1].delay + 1500 : 1500;
    enemies.push({ type: STAGE_BOSS_WAVES[waveNumber], delay: lastDelay, isBoss: true });
  }

  // Scale HP with wave number
  const hpMultiplier = 1 + (waveNumber - 1) * 0.15;
  return enemies.map(e => ({
    ...e,
    hpMultiplier,
  }));
}

export function createEnemy(type, hpMultiplier = 1) {
  const base = ENEMY_TYPES[type];
  return {
    id: Math.random().toString(36).substr(2, 9),
    type,
    hp: Math.floor(base.hp * hpMultiplier),
    maxHp: Math.floor(base.hp * hpMultiplier),
    speed: base.speed,
    reward: base.reward,
    emoji: base.emoji,
    pathIndex: 0,
    x: PATH[0][0] * CELL_SIZE + CELL_SIZE / 2,
    y: PATH[0][1] * CELL_SIZE + CELL_SIZE / 2,
    slowTimer: 0,
  };
}

export function createTower(type, gridX, gridY) {
  const base = TOWER_TYPES[type];
  return {
    id: Math.random().toString(36).substr(2, 9),
    type,
    gridX,
    gridY,
    x: gridX * CELL_SIZE + CELL_SIZE / 2,
    y: gridY * CELL_SIZE + CELL_SIZE / 2,
    damage: base.damage,
    range: base.range * CELL_SIZE,
    fireRate: base.fireRate,
    lastFire: 0,
    level: 1,
    color: base.color,
    emoji: base.emoji,
  };
}

export function createProjectile(tower, enemy) {
  return {
    id: Math.random().toString(36).substr(2, 9),
    x: tower.x,
    y: tower.y,
    targetId: enemy.id,
    targetX: enemy.x,
    targetY: enemy.y,
    speed: 5,
    damage: tower.damage,
    towerType: tower.type,
    color: tower.color,
  };
}

// Check if two grid positions are adjacent (including diagonals)
export function areAdjacent(t1, t2) {
  return Math.abs(t1.gridX - t2.gridX) <= 1 && Math.abs(t1.gridY - t2.gridY) <= 1
    && !(t1.gridX === t2.gridX && t1.gridY === t2.gridY);
}

// Merge recipes: [typeA, typeB] → resultType (order-insensitive)
const MERGE_RECIPES = [
  { a: "warcannon", b: "ballista", result: "doomcannon" },
  { a: "cannon",    b: "cannon",   result: "warcannon"  },
  { a: "archer",    b: "cannon",   result: "ballista"   },
];

// Returns [t1, t2, resultType] for the first mergeable adjacent pair, or null
export function findMergePair(towers) {
  for (const recipe of MERGE_RECIPES) {
    for (const t1 of towers) {
      if (t1.type !== recipe.a && t1.type !== recipe.b) continue;
      for (const t2 of towers) {
        if (t2.id === t1.id) continue;
        if (!areAdjacent(t1, t2)) continue;
        const match =
          (t1.type === recipe.a && t2.type === recipe.b) ||
          (t1.type === recipe.b && t2.type === recipe.a);
        if (match) return [t1, t2, recipe.result];
      }
    }
  }
  return null;
}

// Merge two towers into the result type, placed at t2's position
export function mergeTowers(t1, t2, resultType) {
  const base = TOWER_TYPES[resultType];
  return {
    id: Math.random().toString(36).substr(2, 9),
    type: resultType,
    gridX: t2.gridX,
    gridY: t2.gridY,
    x: t2.x,
    y: t2.y,
    damage: base.damage,
    range: base.range * CELL_SIZE,
    fireRate: base.fireRate,
    lastFire: 0,
    level: 1,
    color: base.color,
    emoji: base.emoji,
  };
}

export function distanceBetween(a, b) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

export function moveEnemy(enemy, dt) {
  if (enemy.pathIndex >= PATH.length - 1) return true; // reached end

  const targetCell = PATH[enemy.pathIndex + 1];
  const targetX = targetCell[0] * CELL_SIZE + CELL_SIZE / 2;
  const targetY = targetCell[1] * CELL_SIZE + CELL_SIZE / 2;

  const dx = targetX - enemy.x;
  const dy = targetY - enemy.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  const speedMod = enemy.slowTimer > 0 ? 0.4 : 1;
  const moveSpeed = enemy.speed * speedMod * dt * 60;

  if (dist < moveSpeed) {
    enemy.x = targetX;
    enemy.y = targetY;
    enemy.pathIndex++;
    if (enemy.pathIndex >= PATH.length - 1) return true;
  } else {
    enemy.x += (dx / dist) * moveSpeed;
    enemy.y += (dy / dist) * moveSpeed;
  }

  if (enemy.slowTimer > 0) {
    enemy.slowTimer -= dt * 1000;
  }

  return false;
}

export function moveProjectile(proj, enemies) {
  const target = enemies.find(e => e.id === proj.targetId);
  if (target) {
    proj.targetX = target.x;
    proj.targetY = target.y;
  }

  const dx = proj.targetX - proj.x;
  const dy = proj.targetY - proj.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < 8) return { hit: true, targetId: proj.targetId };

  proj.x += (dx / dist) * proj.speed * 3;
  proj.y += (dy / dist) * proj.speed * 3;

  return { hit: false };
}