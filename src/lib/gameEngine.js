// Medieval Tower Defense Game Engine

export const CELL_SIZE = 48;
export const GRID_COLS = 16;
export const GRID_ROWS = 10;

// 15 Lands — each has 5 waves (boss on final wave of each land)
// Waves 1–5 to 71–75
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
  demonRealm: {
    name: "The Demon's Throne",
    waveRange: [26, 30],
    bg: "#0a0005",
    grassA: "#15000f",
    grassB: "#0f000a",
    pathA: "#2a0010",
    pathB: "#240008",
    pathBorder: "rgba(180,0,80,0.5)",
    gridLine: "rgba(100,0,50,0.08)",
    borderColor: "#6a001a",
    label: "Land 6 · Waves 26–30",
    emoji: "👑",
  },
  // New lands 7-15
  shatteredGates: {
    name: "The Shattered Gates",
    waveRange: [31, 35],
    bg: "#0f0810",
    grassA: "#1a1620",
    grassB: "#141018",
    pathA: "#2a2535",
    pathB: "#242038",
    pathBorder: "rgba(120,80,160,0.45)",
    gridLine: "rgba(100,80,140,0.08)",
    borderColor: "#3a2a5a",
    label: "Land 7 · Waves 31–35",
    emoji: "⚔️",
  },
  corruptedGrove: {
    name: "The Corrupted Grove",
    waveRange: [36, 40],
    bg: "#0a150a",
    grassA: "#0f2a0f",
    grassB: "#0c200c",
    pathA: "#4a3a1a",
    pathB: "#403510",
    pathBorder: "rgba(100,120,40,0.5)",
    gridLine: "rgba(80,100,30,0.08)",
    borderColor: "#2a4a1a",
    label: "Land 8 · Waves 36–40",
    emoji: "🍂",
  },
  plaguelands: {
    name: "The Plaguelands",
    waveRange: [41, 45],
    bg: "#0a0a05",
    grassA: "#1a1a0f",
    grassB: "#0f0f08",
    pathA: "#3a3a20",
    pathB: "#303018",
    pathBorder: "rgba(100,100,40,0.4)",
    gridLine: "rgba(80,80,20,0.08)",
    borderColor: "#4a4a1a",
    label: "Land 9 · Waves 41–45",
    emoji: "☠️",
  },
  crystallicScar: {
    name: "The Crystallic Scar",
    waveRange: [46, 50],
    bg: "#080a0f",
    grassA: "#0f1420",
    grassB: "#0a0f18",
    pathA: "#2a3a5a",
    pathB: "#202a45",
    pathBorder: "rgba(100,140,220,0.4)",
    gridLine: "rgba(80,120,200,0.08)",
    borderColor: "#1a3a7a",
    label: "Land 10 · Waves 46–50",
    emoji: "💎",
  },
  stormpeakPass: {
    name: "Stormbreak Pass",
    waveRange: [51, 55],
    bg: "#0a0a10",
    grassA: "#15151f",
    grassB: "#0f0f18",
    pathA: "#3a3a4a",
    pathB: "#303038",
    pathBorder: "rgba(200,200,100,0.4)",
    gridLine: "rgba(150,150,80,0.08)",
    borderColor: "#5a5a2a",
    label: "Land 11 · Waves 51–55",
    emoji: "⚡",
  },
  infernalChasms: {
    name: "The Infernal Chasms",
    waveRange: [56, 60],
    bg: "#1a0a05",
    grassA: "#2a1a0f",
    grassB: "#1f0f08",
    pathA: "#4a2a10",
    pathB: "#3a2008",
    pathBorder: "rgba(200,80,20,0.5)",
    gridLine: "rgba(150,60,10,0.08)",
    borderColor: "#6a2a00",
    label: "Land 12 · Waves 56–60",
    emoji: "🔥",
  },
  voidEdges: {
    name: "The Void's Edges",
    waveRange: [61, 65],
    bg: "#05000a",
    grassA: "#0a0010",
    grassB: "#08000c",
    pathA: "#200040",
    pathB: "#180035",
    pathBorder: "rgba(180,80,255,0.5)",
    gridLine: "rgba(150,60,200,0.08)",
    borderColor: "#5a1a8a",
    label: "Land 13 · Waves 61–65",
    emoji: "🌀",
  },
  celestialSpire: {
    name: "The Celestial Spire",
    waveRange: [66, 70],
    bg: "#0f080a",
    grassA: "#2a1a30",
    grassB: "#1f0f25",
    pathA: "#4a3a6a",
    pathB: "#3a2a55",
    pathBorder: "rgba(200,150,255,0.45)",
    gridLine: "rgba(180,130,220,0.08)",
    borderColor: "#5a3a8a",
    label: "Land 14 · Waves 66–70",
    emoji: "✨",
  },
  malgrath_Throne: {
    name: "Malgrath's Throne",
    waveRange: [71, 75],
    bg: "#0a0005",
    grassA: "#15000f",
    grassB: "#0f000a",
    pathA: "#3a0015",
    pathB: "#2e000f",
    pathBorder: "rgba(255,0,100,0.6)",
    gridLine: "rgba(200,0,80,0.10)",
    borderColor: "#8a001a",
    label: "Land 15 · Waves 71–75",
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
  shadowMage: {
    2: { id: "poison",    label: "Dark Venom",    desc: "Bolts apply 3s poison DoT",             icon: "☠️" },
    3: { id: "slow",      label: "Shadow Slow",   desc: "Slows enemies with dark magic",         icon: "🌀" },
    4: { id: "rangeup",   label: "+Range",        desc: "Range increased by 30%",                icon: "📡" },
    5: { id: "chain",     label: "Void Chain",    desc: "Each hit chains to 1 nearby enemy",     icon: "⚡" },
  },
  voidCannon: {
    2: { id: "splash",    label: "Void Blast",    desc: "Shots deal 70% splash damage",          icon: "💥" },
    3: { id: "armorbreak",label: "Void Pierce",   desc: "Ignores 50% of enemy armor",            icon: "🔨" },
    4: { id: "slow",      label: "Gravity Pull",  desc: "Slows enemies on impact",               icon: "🌀" },
    5: { id: "barrage",   label: "Void Storm",    desc: "Every 5th shot fires 4 shells at once", icon: "🔥" },
  },
  glacialBallista: {
    2: { id: "pierce",    label: "Ice Piercer",   desc: "Bolts pierce through first target",     icon: "🏹" },
    3: { id: "freeze",    label: "Deep Freeze",   desc: "Bolts fully freeze enemies for 1.5s",   icon: "🧊" },
    4: { id: "rangeup",   label: "+Range",        desc: "Range increased by 30%",                icon: "📡" },
    5: { id: "rapidfire", label: "Glacial Salvo", desc: "Fire rate increased by 40%",            icon: "⚡" },
  },
  thunderArcher: {
    2: { id: "multishot", label: "Thunder Volley", desc: "Fires at 3 enemies simultaneously",   icon: "🎯" },
    3: { id: "rapidfire", label: "Storm Speed",    desc: "Fire rate increased by 40%",           icon: "⚡" },
    4: { id: "chain",     label: "Chain Lightning",desc: "Each hit chains to 1 nearby enemy",   icon: "⚡" },
    5: { id: "rangeup",   label: "+Range",         desc: "Range increased by 35%",               icon: "📡" },
  },
  infernoTrebuchet: {
    2: { id: "splash",    label: "Fire Splash",   desc: "Shots deal 65% splash AoE",             icon: "💥" },
    3: { id: "burn",      label: "Hellfire",      desc: "Shots apply 5s burn DoT",               icon: "🔥" },
    4: { id: "rangeup",   label: "+Range",        desc: "Range increased by 35%",                icon: "📡" },
    5: { id: "siege",     label: "Inferno Mode",  desc: "Damage +80%, fire rate –15%",           icon: "🏰" },
  },
  venomCrossbow: {
    2: { id: "poison",    label: "Venom Tip",     desc: "Bolts apply 4s poison DoT",             icon: "☠️" },
    3: { id: "rapidfire", label: "Swift Reload",  desc: "Fire rate increased by 35%",            icon: "⚡" },
    4: { id: "multishot", label: "Venom Spray",   desc: "Fires at 2 enemies simultaneously",     icon: "🎯" },
    5: { id: "rangeup",   label: "+Range",        desc: "Range increased by 35%",                icon: "📡" },
  },
  doomSiege: {
    2: { id: "splash",    label: "Cataclysm",     desc: "Shots deal 85% splash AoE",             icon: "💥" },
    3: { id: "armorbreak",label: "Total Ruin",    desc: "Ignores 70% of enemy armor",            icon: "🔨" },
    4: { id: "burn",      label: "Apocalypse Fire",desc: "Shots apply 5s burn DoT",             icon: "🔥" },
    5: { id: "barrage",   label: "Doom Barrage",  desc: "Every 5th shot fires 6 shells at once", icon: "☄️" },
  },
  frostStorm: {
    2: { id: "multishot", label: "Ice Volley",    desc: "Fires at 3 enemies simultaneously",     icon: "🎯" },
    3: { id: "freeze",    label: "Blizzard",      desc: "Shots fully freeze enemies for 1.5s",   icon: "🧊" },
    4: { id: "rangeup",   label: "+Range",        desc: "Range increased by 30%",                icon: "📡" },
    5: { id: "rapidfire", label: "Storm Speed",   desc: "Fire rate increased by 50%",            icon: "⚡" },
  },
  arcaneSiege: {
    2: { id: "splash",    label: "Arcane Blast",  desc: "Shots deal 70% splash AoE",             icon: "💥" },
    3: { id: "slow",      label: "Arcane Slow",   desc: "Slows enemies with arcane magic",       icon: "🌀" },
    4: { id: "chain",     label: "Chain Spell",   desc: "Each hit chains to 1 nearby enemy",    icon: "⚡" },
    5: { id: "siege",     label: "Arcane Siege",  desc: "Damage +75%, fire rate –10%",           icon: "🏰" },
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
    emoji: "🧝",
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
    emoji: "🧝⚡",
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
  // NEW merges
  shadowMage: {
    name: "Shadow Mage",
    cost: 0,
    damage: 55,
    range: 5,
    fireRate: 1000,
    color: "#7c3aed",
    emoji: "🌑🔮",
    description: "Mage + Archer merge. Dark bolts with poison & slow",
    upgradeCost: 140,
    comboType: "magic",
    isMerged: true,
    appliesSlow: true,
  },
  voidCannon: {
    name: "Void Cannon",
    cost: 0,
    damage: 110,
    range: 4.5,
    fireRate: 1300,
    color: "#4c1d95",
    emoji: "🌀💣",
    description: "Mage + War Cannon merge. Arcane void explosions",
    upgradeCost: 220,
    comboType: "doom",
    isMerged: true,
  },
  glacialBallista: {
    name: "Glacial Ballista",
    cost: 0,
    damage: 60,
    range: 5,
    fireRate: 700,
    color: "#0ea5e9",
    emoji: "🧊🎯",
    description: "Frost + Ballista merge. Freezing piercing bolts",
    upgradeCost: 160,
    comboType: "heavy",
    isMerged: true,
    appliesSlow: true,
  },
  thunderArcher: {
    name: "Thunder Archer",
    cost: 0,
    damage: 28,
    range: 5,
    fireRate: 350,
    color: "#eab308",
    emoji: "⚡🏹",
    description: "Storm Archer + Mage merge. Lightning volley",
    upgradeCost: 160,
    comboType: "speed",
    isMerged: true,
  },
  infernoTrebuchet: {
    name: "Inferno Trebuchet",
    cost: 0,
    damage: 200,
    range: 7,
    fireRate: 3000,
    color: "#b91c1c",
    emoji: "🔥⚙️",
    description: "Trebuchet + Catapult merge. Volcanic long-range siege",
    upgradeCost: 240,
    comboType: "heavy",
    isMerged: true,
  },
  venomCrossbow: {
    name: "Venom Crossbow",
    cost: 0,
    damage: 20,
    range: 4,
    fireRate: 500,
    color: "#16a34a",
    emoji: "☠️🏹",
    description: "Crossbow + Mage merge. Rapid poison-tipped arcane bolts",
    upgradeCost: 120,
    comboType: "speed",
    isMerged: true,
  },
  doomSiege: {
    name: "Doom Siege",
    cost: 0,
    damage: 280,
    range: 7.5,
    fireRate: 2500,
    color: "#7f1d1d",
    emoji: "💥⚙️",
    description: "Siege Engine + Doomsday Cannon. Total annihilation",
    upgradeCost: 350,
    comboType: "doom",
    isMerged: true,
  },
  frostStorm: {
    name: "Frost Storm",
    cost: 0,
    damage: 22,
    range: 4.5,
    fireRate: 400,
    color: "#67e8f9",
    emoji: "❄️⚡",
    description: "Blizzard Tower + Arrow Storm merge. Freezing rapid volley",
    upgradeCost: 180,
    comboType: "support",
    isMerged: true,
    appliesSlow: true,
  },
  arcaneSiege: {
    name: "Arcane Siege",
    cost: 0,
    damage: 175,
    range: 6.5,
    fireRate: 2200,
    color: "#a855f7",
    emoji: "🔯⚙️",
    description: "Spellcaster + Trebuchet merge. Arcane boulders with AoE",
    upgradeCost: 260,
    comboType: "magic",
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
  // Land 1 — Verdant Meadow
  peasant:     { hp: 30,   speed: 1.2,  reward: 10,   emoji: "🧑‍🌾", name: "Peasant"        },
  soldier:     { hp: 60,   speed: 1.0,  reward: 15,   emoji: "⚔️",   name: "Soldier"        },
  knight:      { hp: 120,  speed: 0.8,  reward: 25,   emoji: "🛡️",   name: "Knight"         },
  horseman:    { hp: 80,   speed: 1.8,  reward: 20,   emoji: "🐴",   name: "Horseman"       },
  // Land 2 — Dark Dungeon
  king:        { hp: 300,  speed: 0.6,  reward: 100,  emoji: "👑",   name: "King"           },
  wraith:      { hp: 200,  speed: 1.4,  reward: 40,   emoji: "👻",   name: "Wraith"         },
  skeleton:    { hp: 90,   speed: 1.6,  reward: 22,   emoji: "💀",   name: "Skeleton"       },
  necromancer: { hp: 170,  speed: 0.9,  reward: 55,   emoji: "🧙",   name: "Necromancer"    },
  // Land 3 — Volcanic Wastes
  demon:       { hp: 350,  speed: 1.0,  reward: 60,   emoji: "😈",   name: "Demon"          },
  golem:       { hp: 500,  speed: 0.5,  reward: 80,   emoji: "🪨",   name: "Golem"          },
  lavaSpawn:   { hp: 220,  speed: 1.5,  reward: 45,   emoji: "🔥",   name: "Lava Spawn"     },
  firedrake:   { hp: 280,  speed: 1.3,  reward: 65,   emoji: "🐲",   name: "Firedrake"      },
  // Land 4 — Frozen Abyss
  specter:     { hp: 150,  speed: 2.0,  reward: 45,   emoji: "🌫️",   name: "Specter"        },
  shadow:      { hp: 400,  speed: 1.3,  reward: 70,   emoji: "🌑",   name: "Shadow"         },
  frostGiant:  { hp: 650,  speed: 0.55, reward: 95,   emoji: "🧊",   name: "Frost Giant"    },
  iceWalker:   { hp: 180,  speed: 1.7,  reward: 48,   emoji: "❄️",   name: "Ice Walker"     },
  // Land 5 — Shadow Realm
  voidling:    { hp: 300,  speed: 1.6,  reward: 75,   emoji: "🕳️",   name: "Voidling"       },
  soulReaper:  { hp: 500,  speed: 1.1,  reward: 110,  emoji: "⛓️",   name: "Soul Reaper"    },
  doomKnight:  { hp: 800,  speed: 0.85, reward: 140,  emoji: "🏚️",   name: "Doom Knight"    },
  abyssLord:   { hp: 1000, speed: 0.7,  reward: 180,  emoji: "🌀",   name: "Abyss Lord"     },
  // Land bosses — one boss per land (on wave 5, 10, 15, 20, 25)
  boss_meadow:  { hp: 1800,  speed: 0.7,  reward: 300,  emoji: "🐉",   name: "Forest Drake",     isBoss: true,
    cinematicTitle: "THE FOREST AWAKENS",
    cinematicDesc: "Ancient scales forged from a thousand years of darkness. It has devoured armies whole.",
    phaseShifts: [0.5],
    rageMultiplier: 1.6,
  },
  boss_dungeon: { hp: 3300,  speed: 0.6,  reward: 550,  emoji: "🧟",   name: "Dungeon Overlord", isBoss: true,
    cinematicTitle: "DEATH RISES FROM THE DEEP",
    cinematicDesc: "Rotted sinew bound by fell magic. It has ruled the dark for ten thousand years.",
    phaseShifts: [0.6, 0.3],
    rageMultiplier: 1.8,
  },
  boss_volcano: { hp: 6000,  speed: 0.5,  reward: 900,  emoji: "🔥",   name: "Flame Titan",      isBoss: true,
    cinematicTitle: "THE MOUNTAIN UNLEASHES ITS WRATH",
    cinematicDesc: "Born from the volcano's core. Every step scorches the earth beneath its feet.",
    phaseShifts: [0.5, 0.25],
    rageMultiplier: 2.0,
  },
  boss_abyss:   { hp: 9750,  speed: 0.45, reward: 1500, emoji: "❄️",   name: "Frost Colossus",   isBoss: true,
    cinematicTitle: "THE ETERNAL WINTER DESCENDS",
    cinematicDesc: "A colossus of living ice whose breath extinguishes stars. Cold beyond all reckoning.",
    phaseShifts: [0.6, 0.35, 0.15],
    rageMultiplier: 2.2,
  },
  boss_shadow:  { hp: 15000, speed: 0.4,  reward: 2500, emoji: "💀",   name: "Shadow Sovereign", isBoss: true,
    cinematicTitle: "THE END OF ALL THINGS ARRIVES",
    cinematicDesc: "It is not a creature. It is an inevitability. The void given form. The last darkness.",
    phaseShifts: [0.7, 0.5, 0.3, 0.1],
    rageMultiplier: 2.5,
  },
  boss_demon: { hp: 22500, speed: 0.35, reward: 5000, emoji: "👑",   name: "Demon Lord Malgrath", isBoss: true,
    cinematicTitle: "THE DEMON LORD FALLS — PEACE RETURNS",
    cinematicDesc: "The ancient evil that plagued the realm for ten thousand years has been vanquished. By thy hand, Eldenmoor is FOREVER FREE.",
    phaseShifts: [0.8, 0.6, 0.4, 0.2],
    rageMultiplier: 3.0,
  },
  // Extended lands 7-15
  boss_gates: { hp: 12000, speed: 0.6, reward: 2000, emoji: "⚔️", name: "Guardian of the Gates", isBoss: true,
    cinematicTitle: "THE GATES SHATTER",
    cinematicDesc: "An ancient construct that has sealed away primordial evil for eons. Its fall reveals that the true darkness has yet to be awakened.",
    phaseShifts: [0.7, 0.4],
    rageMultiplier: 2.0,
  },
  boss_corruption: { hp: 9750, speed: 0.5, reward: 1800, emoji: "🍂", name: "The Corrupted Bloom", isBoss: true,
    cinematicTitle: "NATURE CLEANSED",
    cinematicDesc: "A living forest warped by ancient malice. To save nature, you must destroy nature itself.",
    phaseShifts: [0.6, 0.3],
    rageMultiplier: 1.8,
  },
  boss_plague: { hp: 8250, speed: 0.7, reward: 1600, emoji: "☠️", name: "The Plague Mother", isBoss: true,
    cinematicTitle: "THE SICKNESS ENDS",
    cinematicDesc: "A sentient pestilence that has ravaged kingdoms for millennia. Her hunger is endless.",
    phaseShifts: [0.65, 0.35],
    rageMultiplier: 1.9,
  },
  boss_crystal: { hp: 10800, speed: 0.4, reward: 2100, emoji: "💎", name: "The Crystalline Titan", isBoss: true,
    cinematicTitle: "THE SCAR SEALED",
    cinematicDesc: "A being of living crystal that grows from the wound in reality itself. Its very existence defies the laws of nature.",
    phaseShifts: [0.7, 0.45, 0.2],
    rageMultiplier: 2.1,
  },
  boss_storm: { hp: 12750, speed: 0.5, reward: 2300, emoji: "⚡", name: "The Storm Sovereign", isBoss: true,
    cinematicTitle: "THE HEAVENS CALM",
    cinematicDesc: "An entity born from the fury of nature itself. Command of sky, wind, and lightning.",
    phaseShifts: [0.75, 0.5, 0.25],
    rageMultiplier: 2.2,
  },
  boss_inferno: { hp: 15000, speed: 0.45, reward: 2700, emoji: "🔥", name: "The Infernal Patriarch", isBoss: true,
    cinematicTitle: "THE DEPTHS SEALED",
    cinematicDesc: "An ancient lord of the underworld. Its mere presence warps reality with heat and pain.",
    phaseShifts: [0.8, 0.6, 0.4, 0.2],
    rageMultiplier: 2.5,
  },
  boss_void: { hp: 18000, speed: 0.35, reward: 3500, emoji: "🌀", name: "The Void Warden", isBoss: true,
    cinematicTitle: "THE VOID RECEDES",
    cinematicDesc: "A being that exists between dimensions. It speaks in the language of nothing and entropy.",
    phaseShifts: [0.85, 0.65, 0.45, 0.25],
    rageMultiplier: 2.8,
  },
  boss_spire: { hp: 14250, speed: 0.5, reward: 2600, emoji: "✨", name: "The Celestial Sentinel", isBoss: true,
    cinematicTitle: "THE SPIRE CROWNED",
    cinematicDesc: "A guardian of the highest realms. It alone knows the truth of creation and destruction.",
    phaseShifts: [0.7, 0.45, 0.2],
    rageMultiplier: 2.3,
  },
  boss_origin: { hp: 30000, speed: 0.3, reward: 10000, emoji: "💀", name: "The Origin of All Darkness", isBoss: true,
    cinematicTitle: "THE CYCLE BREAKS",
    cinematicDesc: "The first darkness. The primordial evil. The reason all darkness returns. To defeat it is to heal the universe itself.",
    phaseShifts: [0.9, 0.75, 0.6, 0.45, 0.3, 0.15],
    rageMultiplier: 3.5,
  },
};

// Boss spawns on the final wave of each land (all 15 lands)
export const STAGE_BOSS_WAVES = {
  5:  "boss_meadow",
  10: "boss_dungeon",
  15: "boss_volcano",
  20: "boss_abyss",
  25: "boss_shadow",
  30: "boss_demon",
  35: "boss_gates",
  40: "boss_corruption",
  45: "boss_plague",
  50: "boss_crystal",
  55: "boss_storm",
  60: "boss_inferno",
  65: "boss_void",
  70: "boss_spire",
  75: "boss_origin",
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
    const types = ["peasant", "soldier", "horseman", "knight"];
    for (let i = 0; i < count; i++)
      enemies.push({ type: types[i % types.length], delay: i * spawnInterval });

  // Land 2: Dark Dungeon (waves 6–10)
  } else if (waveNumber <= 7) {
    const types = ["soldier", "skeleton", "horseman", "wraith", "necromancer"];
    for (let i = 0; i < count; i++)
      enemies.push({ type: types[i % types.length], delay: i * spawnInterval });
  } else if (waveNumber <= 10) {
    const types = ["knight", "wraith", "skeleton", "king", "necromancer", "wraith"];
    for (let i = 0; i < count; i++)
      enemies.push({ type: types[i % types.length], delay: i * spawnInterval });

  // Land 3: Volcanic Wastes (waves 11–15)
  } else if (waveNumber <= 12) {
    const types = ["lavaSpawn", "firedrake", "demon", "golem", "lavaSpawn"];
    for (let i = 0; i < count; i++)
      enemies.push({ type: types[i % types.length], delay: i * spawnInterval });
  } else if (waveNumber <= 15) {
    const types = ["demon", "golem", "firedrake", "king", "lavaSpawn", "demon"];
    for (let i = 0; i < count; i++)
      enemies.push({ type: types[i % types.length], delay: i * spawnInterval });
    if (!isBossWave && waveNumber % 2 === 0) {
      enemies.push({ type: "golem", delay: count * spawnInterval + 800 });
      enemies.push({ type: "firedrake", delay: count * spawnInterval + 1600 });
    }

  // Land 4: Frozen Abyss (waves 16–20)
  } else if (waveNumber <= 17) {
    const types = ["iceWalker", "specter", "frostGiant", "shadow", "specter", "iceWalker"];
    for (let i = 0; i < count; i++)
      enemies.push({ type: types[i % types.length], delay: i * spawnInterval });
  } else if (waveNumber <= 20) {
    const types = ["specter", "shadow", "frostGiant", "iceWalker", "shadow", "specter"];
    for (let i = 0; i < count; i++)
      enemies.push({ type: types[i % types.length], delay: i * spawnInterval });
    if (!isBossWave)
      for (let k = 0; k < 3; k++)
        enemies.push({ type: k % 2 === 0 ? "frostGiant" : "shadow", delay: count * spawnInterval + 800 + k * 600 });

  // Land 5: Shadow Realm (waves 21–25)
  } else if (waveNumber <= 22) {
    const types = ["voidling", "soulReaper", "shadow", "doomKnight", "voidling", "specter"];
    for (let i = 0; i < count; i++)
      enemies.push({ type: types[i % types.length], delay: i * spawnInterval });
  } else if (waveNumber <= 25) {
    const types = ["abyssLord", "doomKnight", "soulReaper", "voidling", "shadow", "abyssLord", "doomKnight"];
    for (let i = 0; i < count; i++)
      enemies.push({ type: types[i % types.length], delay: i * spawnInterval });
    if (!isBossWave)
      for (let k = 0; k < 4; k++)
        enemies.push({ type: k % 2 === 0 ? "abyssLord" : "doomKnight", delay: count * spawnInterval + 800 + k * 500 });
  
  // Land 6: Demon's Throne (waves 26–30)
  } else if (waveNumber <= 27) {
    const types = ["doomKnight", "abyssLord", "soulReaper", "voidling"];
    for (let i = 0; i < count; i++)
      enemies.push({ type: types[i % types.length], delay: i * spawnInterval });
  } else if (waveNumber <= 30) {
    const types = ["abyssLord", "soulReaper", "doomKnight", "voidling", "abyssLord", "soulReaper"];
    for (let i = 0; i < count; i++)
      enemies.push({ type: types[i % types.length], delay: i * spawnInterval });
    if (!isBossWave)
      for (let k = 0; k < 5; k++)
        enemies.push({ type: k % 2 === 0 ? "abyssLord" : "soulReaper", delay: count * spawnInterval + 800 + k * 400 });

  // Land 7: Shattered Gates (waves 31-35)
  } else if (waveNumber <= 32) {
    const types = ["voidling", "doomKnight", "abyssLord", "soulReaper"];
    for (let i = 0; i < count; i++)
      enemies.push({ type: types[i % types.length], delay: i * spawnInterval });
  } else if (waveNumber <= 35) {
    const types = ["abyssLord", "soulReaper", "doomKnight", "voidling", "abyssLord"];
    for (let i = 0; i < count; i++)
      enemies.push({ type: types[i % types.length], delay: i * spawnInterval });

  // Land 8: Corrupted Grove (waves 36-40)
  } else if (waveNumber <= 37) {
    const types = ["peasant", "soldier", "horseman", "knight", "firedrake"];
    for (let i = 0; i < count; i++)
      enemies.push({ type: types[i % types.length], delay: i * spawnInterval });
  } else if (waveNumber <= 40) {
    const types = ["firedrake", "demon", "lavaSpawn", "golem", "firedrake"];
    for (let i = 0; i < count; i++)
      enemies.push({ type: types[i % types.length], delay: i * spawnInterval });

  // Land 9: Plaguelands (waves 41-45)
  } else if (waveNumber <= 42) {
    const types = ["skeleton", "wraith", "necromancer", "king"];
    for (let i = 0; i < count; i++)
      enemies.push({ type: types[i % types.length], delay: i * spawnInterval });
  } else if (waveNumber <= 45) {
    const types = ["wraith", "necromancer", "king", "skeleton", "wraith"];
    for (let i = 0; i < count; i++)
      enemies.push({ type: types[i % types.length], delay: i * spawnInterval });

  // Land 10: Crystallic Scar (waves 46-50)
  } else if (waveNumber <= 47) {
    const types = ["specter", "shadow", "frostGiant", "iceWalker"];
    for (let i = 0; i < count; i++)
      enemies.push({ type: types[i % types.length], delay: i * spawnInterval });
  } else if (waveNumber <= 50) {
    const types = ["shadow", "frostGiant", "specter", "iceWalker", "shadow"];
    for (let i = 0; i < count; i++)
      enemies.push({ type: types[i % types.length], delay: i * spawnInterval });

  // Land 11: Stormbreak Pass (waves 51-55)
  } else if (waveNumber <= 52) {
    const types = ["voidling", "soulReaper", "doomKnight"];
    for (let i = 0; i < count; i++)
      enemies.push({ type: types[i % types.length], delay: i * spawnInterval });
  } else if (waveNumber <= 55) {
    const types = ["doomKnight", "soulReaper", "voidling", "abyssLord"];
    for (let i = 0; i < count; i++)
      enemies.push({ type: types[i % types.length], delay: i * spawnInterval });

  // Land 12: Infernal Chasms (waves 56-60)
  } else if (waveNumber <= 57) {
    const types = ["lavaSpawn", "demon", "firedrake", "golem"];
    for (let i = 0; i < count; i++)
      enemies.push({ type: types[i % types.length], delay: i * spawnInterval });
  } else if (waveNumber <= 60) {
    const types = ["demon", "golem", "firedrake", "lavaSpawn", "demon"];
    for (let i = 0; i < count; i++)
      enemies.push({ type: types[i % types.length], delay: i * spawnInterval });

  // Land 13: Void's Edges (waves 61-65)
  } else if (waveNumber <= 62) {
    const types = ["voidling", "soulReaper", "shadow", "doomKnight"];
    for (let i = 0; i < count; i++)
      enemies.push({ type: types[i % types.length], delay: i * spawnInterval });
  } else if (waveNumber <= 65) {
    const types = ["abyssLord", "doomKnight", "voidling", "soulReaper", "shadow"];
    for (let i = 0; i < count; i++)
      enemies.push({ type: types[i % types.length], delay: i * spawnInterval });

  // Land 14: Celestial Spire (waves 66-70)
  } else if (waveNumber <= 67) {
    const types = ["specter", "shadow", "frostGiant", "iceWalker", "voidling"];
    for (let i = 0; i < count; i++)
      enemies.push({ type: types[i % types.length], delay: i * spawnInterval });
  } else if (waveNumber <= 70) {
    const types = ["doomKnight", "abyssLord", "soulReaper", "voidling", "shadow"];
    for (let i = 0; i < count; i++)
      enemies.push({ type: types[i % types.length], delay: i * spawnInterval });

  // Land 15: Malgrath's Throne (waves 71-75)
  } else if (waveNumber <= 72) {
    const types = ["abyssLord", "soulReaper", "doomKnight", "voidling"];
    for (let i = 0; i < count; i++)
      enemies.push({ type: types[i % types.length], delay: i * spawnInterval });
  } else {
    const types = ["abyssLord", "soulReaper", "doomKnight", "voidling", "shadow"];
    for (let i = 0; i < count; i++)
      enemies.push({ type: types[i % types.length], delay: i * spawnInterval });
    if (!isBossWave)
      for (let k = 0; k < 6; k++)
        enemies.push({ type: k % 2 === 0 ? "abyssLord" : "soulReaper", delay: count * spawnInterval + 800 + k * 300 });
  }

  // Boss at end of boss wave
  if (isBossWave) {
    const lastDelay = enemies.length > 0 ? enemies[enemies.length - 1].delay + 1500 : 1500;
    enemies.push({ type: STAGE_BOSS_WAVES[waveNumber], delay: lastDelay, isBoss: true });
  }

  // HP scaling — steeper curve with 5-wave land bonuses
  const landNumber = Math.floor((waveNumber - 1) / 5) + 1;
  const landScaling = 1 + (landNumber - 1) * 0.55; // +55% per land (was 35%)
  
  const hpMultiplier = landScaling * (waveNumber <= 10
    ? 1 + (waveNumber - 1) * 0.40           // +40% per wave early (was 25%)
    : 1 + (waveNumber - 1) * 0.40 + Math.pow(waveNumber - 10, 1.6) * 0.18); // steeper late curve

  // Speed scaling — +12% per land (was 8%)
  const speedMultiplier = 1 + (landNumber - 1) * 0.12;

  return enemies.map((e) => ({
    ...e,
    hpMultiplier,
    speedMultiplier,
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
    damageReduction: 0.4,
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
  phantom: {
    label: "Phantom",
    emoji: "👁️",
    hpMult: 1.0,
    speedMult: 1.5,
    rewardMult: 2,
    damageReduction: 0.25,
    color: "#c084fc",
    // Flickers — hard to target
  },
  cursed: {
    label: "Cursed",
    emoji: "☠️",
    hpMult: 2.5,
    speedMult: 1.1,
    rewardMult: 3,
    damageReduction: 0.35,
    color: "#4ade80",
  },
  titan: {
    label: "Titan",
    emoji: "💪",
    hpMult: 5.0,
    speedMult: 0.55,
    rewardMult: 4,
    damageReduction: 0.65,
    color: "#f43f5e",
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
  if (waveNumber >= 14) pool.push("phantom");
  if (waveNumber >= 17) pool.push("cursed");
  if (waveNumber >= 21) pool.push("titan");
  // Chance increases with wave
  const chance = Math.min(0.88, 0.28 + (waveNumber - 3) * 0.045);
  if (Math.random() > chance) return null;
  // In later waves, bias towards harder modifiers
  if (waveNumber >= 20 && Math.random() < 0.4) {
    const hard = pool.filter(m => ["titan","cursed","armored"].includes(m));
    if (hard.length) return hard[Math.floor(Math.random() * hard.length)];
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

export function createEnemy(type, hpMultiplier = 1, modifier = null, speedMultiplier = 1) {
  const base = ENEMY_TYPES[type];
  const mod = modifier ? ENEMY_MODIFIERS[modifier] : null;
  const hp = Math.floor(base.hp * hpMultiplier * (mod?.hpMult ?? 1));
  return {
    id: Math.random().toString(36).substr(2, 9),
    type,
    modifier,
    hp,
    maxHp: hp,
    speed: base.speed * (mod?.speedMult ?? 1) * speedMultiplier,
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
    towerId: tower.id,
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

  // ── Branching upgrade path flags ────────────────────────────────────────
  if (tower.upgradePath_splash) {
    proj.splashRadius = tower.upgradePath_splashRadius ?? CELL_SIZE * 1.5;
    proj.splashDamage = Math.floor(proj.damage * 0.55);
  }
  if (tower.upgradePath_burn) {
    proj.burnDuration = tower.upgradePath_burnDuration ?? 3000;
  }
  if (tower.upgradePath_poison || tower.upgradePath_deepPoison) {
    proj.poisonDuration = tower.upgradePath_deepPoison ? 6000 : 3000;
  }
  if (tower.upgradePath_armorBreak) {
    proj.armorBreak = Math.max(proj.armorBreak ?? 0, tower.upgradePath_armorBreak);
  }
  if (tower.upgradePath_slow) {
    proj.appliesSlow = true;
  }
  if (tower.upgradePath_slowDuration) {
    proj.slowDuration = tower.upgradePath_slowDuration;
  }
  if (tower.upgradePath_freeze) {
    proj.appliesFreeze = true;
    proj.freezeDuration = tower.upgradePath_freezeDuration ?? 1500;
  }
  if (tower.upgradePath_chain) {
    proj.chain = true;
  }
  if (tower.upgradePath_pierce) {
    proj.pierce = true;
  }
  if (tower.upgradePath_freezeChance && Math.random() < tower.upgradePath_freezeChance) {
    proj.appliesFreeze = true;
    proj.freezeDuration = 1500;
  }
  if (tower.upgradePath_slowField) {
    proj.slowField = true;
    proj.appliesSlow = true;
  }
  if (tower.upgradePath_aoeSlowField) {
    proj.appliesSlow = true;
  }
  // Stun on hit
  if (tower.upgradePath_stunChance && Math.random() < tower.upgradePath_stunChance) {
    proj.appliesStun = true;
    proj.stunDuration = tower.upgradePath_stunDuration ?? 1000;
  }

  return proj;
}

// Check if two grid positions are within merge range (2 cells)
export function areAdjacent(t1, t2) {
  return Math.abs(t1.gridX - t2.gridX) <= 2 && Math.abs(t1.gridY - t2.gridY) <= 2
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
  { a: "frost",      b: "frost",      result: "blizzardTower"    },
  { a: "frost",      b: "cannon",     result: "frostCannoneer"   },
  // NEW merges
  { a: "mage",       b: "archer",     result: "shadowMage"       },
  { a: "mage",       b: "warcannon",  result: "voidCannon"       },
  { a: "frost",      b: "ballista",   result: "glacialBallista"  },
  { a: "stormArcher",b: "mage",       result: "thunderArcher"    },
  { a: "trebuchet",  b: "catapult",   result: "infernoTrebuchet" },
  { a: "crossbow",   b: "mage",       result: "venomCrossbow"    },
  { a: "siegeEngine",b: "doomcannon", result: "doomSiege"        },
  { a: "blizzardTower",b:"arrowStorm",result: "frostStorm"       },
  { a: "spellcaster",b: "trebuchet",  result: "arcaneSiege"      },
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