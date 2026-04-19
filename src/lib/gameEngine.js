// Medieval Tower Defense Game Engine

export const CELL_SIZE = 48;
export const GRID_COLS = 16;
export const GRID_ROWS = 10;

// 5 Lands — each has 5 waves (boss on final wave of each land)
// Land 1: Waves 1–5   | Land 2: 6–10 | Land 3: 11–15 | Land 4: 16–20 | Land 5: 21–25
export const STAGE_THEMES = {
  meadow: {
    name: "The Verdant Meadow",
    waveRange: [1, 5],
    bg: "#071a07",
    grassA: "#0e2b0e",
    grassB: "#0c270c",
    pathA: "#3b2a14",
    pathB: "#342515",
    pathBorder: "rgba(60,40,10,0.45)",
    gridLine: "rgba(20,60,20,0.07)",
    borderColor: "#1a4a1a",
    label: "Land 1 · Waves 1–5",
    emoji: "🌿",
  },
  dungeon: {
    name: "The Dark Dungeon",
    waveRange: [6, 10],
    bg: "#080810",
    grassA: "#0d0d18",
    grassB: "#0a0a14",
    pathA: "#1c1c14",
    pathB: "#181810",
    pathBorder: "rgba(60,60,20,0.4)",
    gridLine: "rgba(40,40,80,0.07)",
    borderColor: "#1a1a40",
    label: "Land 2 · Waves 6–10",
    emoji: "🪨",
  },
  volcano: {
    name: "Volcanic Wastes",
    waveRange: [11, 15],
    bg: "#100303",
    grassA: "#1a0505",
    grassB: "#160404",
    pathA: "#2a1000",
    pathB: "#240d00",
    pathBorder: "rgba(150,40,0,0.45)",
    gridLine: "rgba(120,20,0,0.07)",
    borderColor: "#5a1a00",
    label: "Land 3 · Waves 11–15",
    emoji: "🌋",
  },
  abyss: {
    name: "The Frozen Abyss",
    waveRange: [16, 20],
    bg: "#020210",
    grassA: "#03031a",
    grassB: "#020215",
    pathA: "#0a0a30",
    pathB: "#080825",
    pathBorder: "rgba(80,80,200,0.4)",
    gridLine: "rgba(60,60,180,0.08)",
    borderColor: "#0a0a60",
    label: "Land 4 · Waves 16–20",
    emoji: "❄️",
  },
  shadowRealm: {
    name: "The Shadow Realm",
    waveRange: [21, 25],
    bg: "#08000f",
    grassA: "#120020",
    grassB: "#0e001a",
    pathA: "#1e0030",
    pathB: "#180025",
    pathBorder: "rgba(150,0,200,0.5)",
    gridLine: "rgba(120,0,180,0.10)",
    borderColor: "#4a0080",
    label: "Land 5 · Waves 21–25",
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

// Tower level-up abilities: keyed by tower type, each level (2-5) unlocks one ability
export const TOWER_ABILITIES = {
  archer: {
    2: { id: "multishot",   label: "Multi-Shot",      desc: "Fires at 2 enemies simultaneously",    icon: "🎯" },
    3: { id: "rangeup",     label: "+Range",           desc: "Range increased by 25%",               icon: "📡" },
    4: { id: "poison",      label: "Poison Arrow",     desc: "Arrows apply 3s poison DoT",           icon: "☠️" },
    5: { id: "rapidfire",   label: "Rapid Fire",       desc: "Fire rate increased by 40%",           icon: "⚡" },
  },
  cannon: {
    2: { id: "splash",      label: "Explosive Shell",  desc: "Shots deal 50% splash damage nearby",  icon: "💥" },
    3: { id: "rangeup",     label: "+Range",           desc: "Range increased by 20%",               icon: "📡" },
    4: { id: "armorbreak",  label: "Armor Break",      desc: "Ignores 30% of enemy armor",           icon: "🔨" },
    5: { id: "barrage",     label: "Barrage",          desc: "Every 5th shot fires 3 shells at once",icon: "🔥" },
  },
  trebuchet: {
    2: { id: "rangeup",     label: "+Range",           desc: "Range increased by 30%",               icon: "📡" },
    3: { id: "splash",      label: "Boulder Splash",   desc: "Boulders deal 60% splash AoE damage",  icon: "💥" },
    4: { id: "slowfield",   label: "Slow Field",       desc: "Impact creates a 2s slow zone",        icon: "🌀" },
    5: { id: "siege",       label: "Siege Mode",       desc: "Damage +60%, fire rate –20%",          icon: "🏰" },
  },
  catapult: {
    2: { id: "splash",      label: "Rock Shower",      desc: "Rocks deal 40% splash to nearby foes", icon: "💥" },
    3: { id: "burn",        label: "Flaming Rock",     desc: "Rocks apply 3s burn DoT",              icon: "🔥" },
    4: { id: "rangeup",     label: "+Range",           desc: "Range increased by 25%",               icon: "📡" },
    5: { id: "heavystrike", label: "Heavy Strike",     desc: "50% chance to stun enemy for 1s",      icon: "⚒️" },
  },
  crossbow: {
    2: { id: "rapidfire",   label: "Swift Reload",     desc: "Fire rate increased by 30%",           icon: "⚡" },
    3: { id: "pierce",      label: "Piercing Bolt",    desc: "Bolts pierce through first enemy",     icon: "🏹" },
    4: { id: "poison",      label: "Poison Tip",       desc: "Bolts apply 3s poison DoT",            icon: "☠️" },
    5: { id: "rangeup",     label: "+Range",           desc: "Range increased by 35%",               icon: "📡" },
  },
  mage: {
    2: { id: "splash",      label: "Arcane Burst",     desc: "Spells deal 45% splash damage",        icon: "💥" },
    3: { id: "slow",        label: "Arcane Slow",      desc: "All spells slow enemies by 2s",        icon: "🌀" },
    4: { id: "rangeup",     label: "+Range",           desc: "Range increased by 25%",               icon: "📡" },
    5: { id: "chain",       label: "Chain Lightning",  desc: "Each hit chains to 1 nearby enemy",    icon: "⚡" },
  },
  frost: {
    2: { id: "slowfield",   label: "Frost Field",      desc: "Slows all nearby enemies passively",   icon: "🌀" },
    3: { id: "rangeup",     label: "+Range",           desc: "Range increased by 30%",               icon: "📡" },
    4: { id: "freeze",      label: "Deep Freeze",      desc: "Fully stops enemies for 1.5s on hit",  icon: "🧊" },
    5: { id: "blizzard",    label: "Blizzard Aura",    desc: "AoE slow field around tower always",   icon: "❄️" },
  },
  // Merged towers get abilities too
  ballista: {
    2: { id: "pierce",      label: "Piercing Shot",    desc: "Bolts pierce through first target",    icon: "🏹" },
    3: { id: "rangeup",     label: "+Range",           desc: "Range increased by 25%",               icon: "📡" },
    4: { id: "rapidfire",   label: "Rapid Salvo",      desc: "Fire rate increased by 35%",           icon: "⚡" },
    5: { id: "splash",      label: "Explosive Tip",    desc: "Shots deal 50% splash damage",         icon: "💥" },
  },
  warcannon: {
    2: { id: "splash",      label: "Massive Shell",    desc: "Shots deal 70% splash damage",         icon: "💥" },
    3: { id: "armorbreak",  label: "Armor Break",      desc: "Ignores 40% of enemy armor",           icon: "🔨" },
    4: { id: "rangeup",     label: "+Range",           desc: "Range increased by 20%",               icon: "📡" },
    5: { id: "barrage",     label: "War Barrage",      desc: "Every 5th shot fires 4 shells",        icon: "🔥" },
  },
  doomcannon: {
    2: { id: "splash",      label: "Doom Blast",       desc: "Shots deal 80% splash damage",         icon: "💥" },
    3: { id: "armorbreak",  label: "Total Penetration",desc: "Ignores 60% of enemy armor",           icon: "🔨" },
    4: { id: "burn",        label: "Hellfire",         desc: "Shots apply 4s burn DoT",              icon: "🔥" },
    5: { id: "barrage",     label: "Apocalypse",       desc: "Every 5th shot fires 5 shells at once",icon: "☄️" },
  },
  siegeEngine: {
    2: { id: "splash",      label: "Siege Blast",      desc: "Shots deal 65% splash AoE",            icon: "💥" },
    3: { id: "rangeup",     label: "+Range",           desc: "Range increased by 30%",               icon: "📡" },
    4: { id: "slowfield",   label: "Quake",            desc: "Impacts slow all nearby enemies",      icon: "🌀" },
    5: { id: "siege",       label: "Total Siege",      desc: "Damage +80%, fire rate –10%",          icon: "🏰" },
  },
  warMachine: {
    2: { id: "splash",      label: "Stone Barrage",    desc: "Shots deal 55% splash AoE",            icon: "💥" },
    3: { id: "burn",        label: "Fire Pots",        desc: "Shots apply 3s burn DoT",              icon: "🔥" },
    4: { id: "armorbreak",  label: "Armor Crush",      desc: "Ignores 35% of enemy armor",           icon: "🔨" },
    5: { id: "rangeup",     label: "+Range",           desc: "Range increased by 30%",               icon: "📡" },
  },
  arrowStorm: {
    2: { id: "multishot",   label: "Storm Volley",     desc: "Fires at 3 enemies simultaneously",    icon: "🎯" },
    3: { id: "poison",      label: "Venom Storm",      desc: "All arrows apply 3s poison DoT",       icon: "☠️" },
    4: { id: "rapidfire",   label: "Gale Force",       desc: "Fire rate increased by 50%",           icon: "⚡" },
    5: { id: "rangeup",     label: "+Range",           desc: "Range increased by 35%",               icon: "📡" },
  },
};

// Get all unlocked abilities for a tower at its current level
export function getUnlockedAbilities(tower) {
  const abilities = TOWER_ABILITIES[tower.type] || {};
  return Object.entries(abilities)
    .filter(([lvl]) => tower.level >= parseInt(lvl))
    .map(([lvl, ab]) => ({ ...ab, level: parseInt(lvl) }));
}

// Check if a tower has a specific ability unlocked
export function towerHasAbility(tower, abilityId) {
  const unlocked = getUnlockedAbilities(tower);
  return unlocked.some(a => a.id === abilityId);
}

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
  trebuchet: {
    name: "Trebuchet",
    cost: 120,
    damage: 45,
    range: 5.5,
    fireRate: 3200,
    color: "#7c4f1a",
    emoji: "⚙️",
    description: "Long range siege, massive boulders",
    upgradeCost: 90,
    comboType: "heavy",
  },
  catapult: {
    name: "Catapult",
    cost: 90,
    damage: 30,
    range: 4,
    fireRate: 2200,
    color: "#a16207",
    emoji: "🪨",
    description: "Lobs heavy stones, good range",
    upgradeCost: 70,
    comboType: "heavy",
  },
  crossbow: {
    name: "Crossbow Tower",
    cost: 80,
    damage: 14,
    range: 3.5,
    fireRate: 600,
    color: "#78350f",
    emoji: "🏹",
    description: "Fast bolts, medium damage",
    upgradeCost: 60,
    comboType: "speed",
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
  // New medieval siege merges
  siegeEngine: {
    name: "Siege Engine",
    cost: 0,
    damage: 140,
    range: 6,
    fireRate: 2800,
    color: "#b45309",
    emoji: "⚙️🪨",
    description: "Cannon + Trebuchet merge. Ultimate siege power",
    upgradeCost: 180,
    comboType: "heavy",
    isMerged: true,
  },
  warMachine: {
    name: "War Machine",
    cost: 0,
    damage: 85,
    range: 4.5,
    fireRate: 1600,
    color: "#92400e",
    emoji: "💣🪨",
    description: "Cannon + Catapult merge. Heavy barrage",
    upgradeCost: 150,
    comboType: "heavy",
    isMerged: true,
  },
  arrowStorm: {
    name: "Arrow Storm",
    cost: 0,
    damage: 20,
    range: 4,
    fireRate: 300,
    color: "#78350f",
    emoji: "🏹⚡",
    description: "Crossbow + Archer merge. Lightning bolt volley",
    upgradeCost: 120,
    comboType: "speed",
    isMerged: true,
  },
  // Mage merges
  spellcaster: {
    name: "Spellcaster",
    cost: 0,
    damage: 35,
    range: 4.5,
    fireRate: 900,
    color: "#7c3aed",
    emoji: "🌀",
    description: "Mage + Mage merge. Amplified arcane barrage",
    upgradeCost: 120,
    comboType: "magic",
    isMerged: true,
  },
  frozenMage: {
    name: "Frozen Mage",
    cost: 0,
    damage: 20,
    range: 4,
    fireRate: 800,
    color: "#0ea5e9",
    emoji: "🧊",
    description: "Mage + Frost merge. Slows & deals magic damage",
    upgradeCost: 110,
    comboType: "magic",
    isMerged: true,
    appliesSlow: true,
  },
  arcaneCannoneer: {
    name: "Arcane Cannoneer",
    cost: 0,
    damage: 70,
    range: 4,
    fireRate: 1200,
    color: "#9333ea",
    emoji: "🔯",
    description: "Mage + Cannon merge. Heavy arcane shells",
    upgradeCost: 160,
    comboType: "magic",
    isMerged: true,
  },
  stormArcher: {
    name: "Storm Archer",
    cost: 0,
    damage: 18,
    range: 4.5,
    fireRate: 400,
    color: "#f59e0b",
    emoji: "⚡",
    description: "Archer + Archer merge. Lightning-fast volley",
    upgradeCost: 90,
    comboType: "speed",
    isMerged: true,
  },
  // Frost merges
  blizzardTower: {
    name: "Blizzard Tower",
    cost: 0,
    damage: 12,
    range: 3.5,
    fireRate: 700,
    color: "#38bdf8",
    emoji: "❄️🌀",
    description: "Frost + Frost merge. Powerful AOE slow",
    upgradeCost: 100,
    comboType: "support",
    isMerged: true,
    appliesSlow: true,
  },
  frostCannoneer: {
    name: "Frost Cannoneer",
    cost: 0,
    damage: 55,
    range: 3,
    fireRate: 1600,
    color: "#0284c7",
    emoji: "🧊💣",
    description: "Frost + Cannon merge. Freezing heavy shells",
    upgradeCost: 130,
    comboType: "heavy",
    isMerged: true,
    appliesSlow: true,
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
  peasant:  { hp: 30,  speed: 1.2,  reward: 10,   emoji: "🧑‍🌾", name: "Peasant"   },
  soldier:  { hp: 60,  speed: 1,    reward: 15,   emoji: "⚔️",   name: "Soldier"   },
  knight:   { hp: 120, speed: 0.8,  reward: 25,   emoji: "🛡️",   name: "Knight"    },
  horseman: { hp: 80,  speed: 1.8,  reward: 20,   emoji: "🐴",   name: "Horseman"  },
  king:     { hp: 300, speed: 0.6,  reward: 100,  emoji: "👑",   name: "King"      },
  wraith:   { hp: 200, speed: 1.4,  reward: 40,   emoji: "👻",   name: "Wraith"    },
  demon:    { hp: 350, speed: 1.0,  reward: 60,   emoji: "😈",   name: "Demon"     },
  golem:    { hp: 500, speed: 0.5,  reward: 80,   emoji: "🪨",   name: "Golem"     },
  specter:  { hp: 150, speed: 2.0,  reward: 45,   emoji: "🌫️",   name: "Specter"   },
  shadow:   { hp: 400, speed: 1.3,  reward: 70,   emoji: "🌑",   name: "Shadow"    },
  // Land bosses — one boss per land (on wave 5, 10, 15, 20, 25)
  boss_meadow:  { hp: 800,   speed: 0.7,  reward: 250,  emoji: "🐉",   name: "Forest Drake",     isBoss: true },
  boss_dungeon: { hp: 1500,  speed: 0.6,  reward: 450,  emoji: "🧟",   name: "Dungeon Overlord", isBoss: true },
  boss_volcano: { hp: 2800,  speed: 0.5,  reward: 750,  emoji: "🔥",   name: "Flame Titan",      isBoss: true },
  boss_abyss:   { hp: 4500,  speed: 0.45, reward: 1200, emoji: "❄️",   name: "Frost Colossus",   isBoss: true },
  boss_shadow:  { hp: 7000,  speed: 0.4,  reward: 2000, emoji: "💀",   name: "Shadow Sovereign", isBoss: true },
};

// Boss spawns on the final wave of each land
export const STAGE_BOSS_WAVES = {
  5:  "boss_meadow",
  10: "boss_dungeon",
  15: "boss_volcano",
  20: "boss_abyss",
  25: "boss_shadow",
};

const BOSS_NAME_PARTS = {
  prefix:  ["Lord", "Dread", "Dark", "Iron", "Blood", "Cursed", "Shadow", "Grim", "Wicked", "Fell"],
  meadow:  ["Briar", "Thorn", "Grove", "Root", "Verdant", "Fen", "Wilder", "Bough"],
  dungeon: ["Crypt", "Bone", "Rotten", "Hollow", "Murk", "Bile", "Dusk", "Vile"],
  volcano: ["Ember", "Char", "Sear", "Cinder", "Scorch", "Forge", "Blaze", "Ash"],
  abyss:   ["Frost", "Glacial", "Blizzard", "Frozen", "Arctic", "Rime", "Chill", "Permafrost"],
  shadow:  ["Void", "Null", "Abysm", "Ruin", "Doom", "Nether", "Oblivion", "Rift"],
  suffix:  ["the Undying", "of Ruin", "the Betrayer", "the Eternal", "Bloodfang", "Deathbringer", "the Merciless", "Soulreaper"],
};

const BOSS_TAUNT = {
  boss_meadow:  ["The forest answers my call!", "Your walls crumble like leaves!", "No arrow shall pierce my scales!"],
  boss_dungeon: ["The darkness obeys only me.", "Your torches will not save you.", "I have waited centuries for this."],
  boss_volcano: ["I am born of the mountain's wrath!", "Your kingdom will burn like kindling!", "The earth itself is my weapon!"],
  boss_abyss:   ["The cold shall claim your souls.", "No warmth survives my embrace.", "I am the eternal winter."],
  boss_shadow:  ["Nothing escapes the void.", "Your very hope is fuel for me.", "I am inevitable. I am the end."],
};

const BOSS_GLOW = {
  boss_meadow:  "#22c55e",
  boss_dungeon: "#6366f1",
  boss_volcano: "#f97316",
  boss_abyss:   "#60a5fa",
  boss_shadow:  "#a855f7",
};

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

export function generateBossInfo(bossType) {
  const stageKey = bossType.replace("boss_", "");
  const nameParts = BOSS_NAME_PARTS[stageKey] || BOSS_NAME_PARTS.shadow;
  const name = `${pick(BOSS_NAME_PARTS.prefix)} ${pick(nameParts)} ${pick(BOSS_NAME_PARTS.suffix)}`;
  const taunt = pick(BOSS_TAUNT[bossType] || BOSS_TAUNT.boss_shadow);
  const glowColor = BOSS_GLOW[bossType] || "#ef4444";
  const stageLabel = {
    boss_meadow:  "🌿 The Verdant Meadow",
    boss_dungeon: "🪨 The Dark Dungeon",
    boss_volcano: "🌋 Volcanic Wastes",
    boss_abyss:   "❄️ The Frozen Abyss",
    boss_shadow:  "💀 The Shadow Realm",
  }[bossType] || "Stage Boss";
  const emoji = ENEMY_TYPES[bossType]?.emoji || "👹";
  return { name, taunt, glowColor, stageLabel, emoji, bossType };
}

export function generateWaves(waveNumber) {
  const enemies = [];
  const isBossWave = !!STAGE_BOSS_WAVES[waveNumber];

  const spawnInterval = Math.max(160, 750 - waveNumber * 24);
  const count = Math.min(6 + Math.floor(waveNumber * 2.4), 60);

  // Land 1: Verdant Meadow (waves 1–5)
  if (waveNumber <= 2) {
    for (let i = 0; i < count; i++)
      enemies.push({ type: "peasant", delay: i * spawnInterval });
  } else if (waveNumber <= 5) {
    const types = ["peasant", "soldier", "peasant", "horseman"];
    for (let i = 0; i < count; i++)
      enemies.push({ type: types[i % types.length], delay: i * spawnInterval });

  // Land 2: Dark Dungeon (waves 6–10)
  } else if (waveNumber <= 7) {
    const types = ["soldier", "knight", "horseman", "wraith"];
    for (let i = 0; i < count; i++)
      enemies.push({ type: types[i % types.length], delay: i * spawnInterval });
  } else if (waveNumber <= 10) {
    const types = ["knight", "wraith", "horseman", "king", "wraith"];
    for (let i = 0; i < count; i++)
      enemies.push({ type: types[i % types.length], delay: i * spawnInterval });

  // Land 3: Volcanic Wastes (waves 11–15)
  } else if (waveNumber <= 12) {
    const types = ["soldier", "knight", "demon", "horseman", "golem"];
    for (let i = 0; i < count; i++)
      enemies.push({ type: types[i % types.length], delay: i * spawnInterval });
  } else if (waveNumber <= 15) {
    const types = ["demon", "golem", "king", "knight", "demon", "golem"];
    for (let i = 0; i < count; i++)
      enemies.push({ type: types[i % types.length], delay: i * spawnInterval });
    if (!isBossWave && waveNumber % 2 === 0)
      enemies.push({ type: "golem", delay: count * spawnInterval + 800 });

  // Land 4: Frozen Abyss (waves 16–20)
  } else if (waveNumber <= 17) {
    const types = ["wraith", "specter", "knight", "demon", "specter", "golem"];
    for (let i = 0; i < count; i++)
      enemies.push({ type: types[i % types.length], delay: i * spawnInterval });
  } else if (waveNumber <= 20) {
    const types = ["specter", "shadow", "demon", "golem", "king", "specter"];
    for (let i = 0; i < count; i++)
      enemies.push({ type: types[i % types.length], delay: i * spawnInterval });
    if (!isBossWave)
      for (let k = 0; k < 2; k++)
        enemies.push({ type: "shadow", delay: count * spawnInterval + 800 + k * 600 });

  // Land 5: Shadow Realm (waves 21–25)
  } else if (waveNumber <= 22) {
    const types = ["shadow", "demon", "specter", "golem", "shadow", "king"];
    for (let i = 0; i < count; i++)
      enemies.push({ type: types[i % types.length], delay: i * spawnInterval });
  } else {
    const types = ["shadow", "demon", "golem", "specter", "king", "shadow", "demon"];
    for (let i = 0; i < count; i++)
      enemies.push({ type: types[i % types.length], delay: i * spawnInterval });
    if (!isBossWave)
      for (let k = 0; k < 3; k++)
        enemies.push({ type: "shadow", delay: count * spawnInterval + 800 + k * 500 });
  }

  // Boss at end of boss wave
  if (isBossWave) {
    const lastDelay = enemies.length > 0 ? enemies[enemies.length - 1].delay + 1500 : 1500;
    enemies.push({ type: STAGE_BOSS_WAVES[waveNumber], delay: lastDelay, isBoss: true });
  }

  // HP scaling — steeper curve
  const hpMultiplier = waveNumber <= 10
    ? 1 + (waveNumber - 1) * 0.25
    : 1 + (waveNumber - 1) * 0.25 + Math.pow(waveNumber - 10, 1.5) * 0.10;

  return enemies.map((e) => ({
    ...e,
    hpMultiplier,
    modifier: e.isBoss ? null : rollModifier(waveNumber),
  }));
}

// Special modifiers applied to enemies in later waves
export const ENEMY_MODIFIERS = {
  shielded: {
    label: "Shielded",
    emoji: "🛡",
    hpMult: 2.2,
    speedMult: 0.85,
    rewardMult: 2,
    damageReduction: 0.4, // absorbs 40% of each hit
    color: "#60a5fa",
  },
  fast: {
    label: "Fast",
    emoji: "💨",
    hpMult: 0.7,
    speedMult: 2.2,
    rewardMult: 1.5,
    damageReduction: 0,
    color: "#facc15",
  },
  armored: {
    label: "Armored",
    emoji: "⚙️",
    hpMult: 3.0,
    speedMult: 0.7,
    rewardMult: 2.5,
    damageReduction: 0.55,
    color: "#94a3b8",
  },
  berserker: {
    label: "Berserker",
    emoji: "🔥",
    hpMult: 1.4,
    speedMult: 1.8,
    rewardMult: 2,
    damageReduction: 0,
    color: "#f97316",
  },
};

// Pick a random modifier for a wave, or null if wave too early
function rollModifier(waveNumber) {
  if (waveNumber < 3) return null;
  const pool = [];
  if (waveNumber >= 3)  pool.push("fast");
  if (waveNumber >= 5)  pool.push("shielded");
  if (waveNumber >= 8)  pool.push("armored");
  if (waveNumber >= 11) pool.push("berserker");
  // Chance increases with wave: 30% at wave 3, up to 80% late game
  const chance = Math.min(0.80, 0.30 + (waveNumber - 3) * 0.04);
  if (Math.random() > chance) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function createEnemy(type, hpMultiplier = 1, modifier = null) {
  const base = ENEMY_TYPES[type];
  const mod = modifier ? ENEMY_MODIFIERS[modifier] : null;
  const hp = Math.floor(base.hp * hpMultiplier * (mod?.hpMult ?? 1));
  return {
    id: Math.random().toString(36).substr(2, 9),
    type,
    modifier,
    hp,
    maxHp: hp,
    speed: base.speed * (mod?.speedMult ?? 1),
    reward: Math.floor(base.reward * (mod?.rewardMult ?? 1)),
    damageReduction: mod?.damageReduction ?? 0,
    emoji: base.emoji,
    modEmoji: mod?.emoji ?? null,
    modColor: mod?.color ?? null,
    pathIndex: 0,
    x: PATH[0][0] * CELL_SIZE + CELL_SIZE / 2,
    y: PATH[0][1] * CELL_SIZE + CELL_SIZE / 2,
    slowTimer: 0,
    spawnTime: performance.now(),
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

export function createProjectile(tower, enemy, overrideDamage = null) {
  const proj = {
    id: Math.random().toString(36).substr(2, 9),
    x: tower.x,
    y: tower.y,
    targetId: enemy.id,
    targetX: enemy.x,
    targetY: enemy.y,
    speed: 5,
    damage: overrideDamage ?? tower.damage,
    towerType: tower.type,
    color: tower.color,
  };

  // Embed ability flags based on unlocked abilities
  if (towerHasAbility(tower, "splash")) {
    const splashPct = { cannon: 0.5, trebuchet: 0.6, catapult: 0.4, warcannon: 0.7, doomcannon: 0.8, siegeEngine: 0.65, warMachine: 0.55, ballista: 0.5 }[tower.type] ?? 0.45;
    proj.splashRadius = CELL_SIZE * 1.5;
    proj.splashDamage = Math.floor(proj.damage * splashPct);
  }
  if (towerHasAbility(tower, "burn")) {
    proj.burnDuration = tower.type === "doomcannon" ? 4000 : 3000;
  }
  if (towerHasAbility(tower, "poison")) {
    proj.poisonDuration = 3000;
  }
  if (towerHasAbility(tower, "armorbreak")) {
    proj.armorBreak = { cannon: 0.3, warcannon: 0.4, doomcannon: 0.6, warMachine: 0.35 }[tower.type] ?? 0.3;
  }
  if (towerHasAbility(tower, "slowfield")) {
    proj.slowField = true;
    proj.appliesSlow = true;
  }
  if (towerHasAbility(tower, "slow")) {
    proj.appliesSlow = true;
  }
  if (towerHasAbility(tower, "freeze")) {
    proj.appliesFreeze = true;
    proj.freezeDuration = 1500;
  }
  if (towerHasAbility(tower, "blizzard")) {
    proj.appliesSlow = true;
  }
  if (towerHasAbility(tower, "chain")) {
    proj.chain = true;
  }
  if (TOWER_TYPES[tower.type]?.appliesSlow) {
    proj.appliesSlow = true;
  }

  return proj;
}

// Check if two grid positions are adjacent (including diagonals)
export function areAdjacent(t1, t2) {
  return Math.abs(t1.gridX - t2.gridX) <= 1 && Math.abs(t1.gridY - t2.gridY) <= 1
    && !(t1.gridX === t2.gridX && t1.gridY === t2.gridY);
}

// Merge recipes: [typeA, typeB] → resultType (order-insensitive)
const MERGE_RECIPES = [
  // Existing cannon tree
  { a: "warcannon",  b: "ballista", result: "doomcannon"     },
  { a: "cannon",     b: "cannon",   result: "warcannon"      },
  { a: "archer",     b: "cannon",   result: "ballista"       },
  // New medieval siege merges
  { a: "cannon",     b: "trebuchet", result: "siegeEngine"   },
  { a: "cannon",     b: "catapult",  result: "warMachine"    },
  { a: "crossbow",   b: "archer",    result: "arrowStorm"    },
  // Archer tree
  { a: "archer",     b: "archer",   result: "stormArcher"    },
  // Mage tree
  { a: "mage",       b: "mage",     result: "spellcaster"    },
  { a: "mage",       b: "frost",    result: "frozenMage"     },
  { a: "mage",       b: "cannon",   result: "arcaneCannoneer"},
  // Frost tree
  { a: "frost",      b: "frost",    result: "blizzardTower"  },
  { a: "frost",      b: "cannon",   result: "frostCannoneer" },
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

  const speedMod = (enemy.frozenTimer ?? 0) > 0 ? 0 : (enemy.slowTimer > 0 ? 0.4 : 1);
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

  if (enemy.slowTimer > 0) enemy.slowTimer -= dt * 1000;
  if ((enemy.frozenTimer ?? 0) > 0) enemy.frozenTimer -= dt * 1000;

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