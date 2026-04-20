// Achievement definitions and checker

export const ACHIEVEMENTS = [
  // Kill milestones
  { id: "first_blood",    icon: "🗡️",  title: "First Blood",        desc: "Kill your first enemy",                   rarity: "common",    check: (s) => s.totalKills >= 1 },
  { id: "slayer_50",      icon: "⚔️",  title: "Slayer",             desc: "Defeat 50 enemies",                       rarity: "common",    check: (s) => s.totalKills >= 50 },
  { id: "centurion",      icon: "🛡️",  title: "Centurion",          desc: "Defeat 100 enemies",                      rarity: "uncommon",  check: (s) => s.totalKills >= 100 },
  { id: "reaper_250",     icon: "💀",  title: "Reaper",             desc: "Defeat 250 enemies",                      rarity: "rare",      check: (s) => s.totalKills >= 250 },
  { id: "warlord_500",    icon: "👑",  title: "Warlord",            desc: "Defeat 500 enemies",                      rarity: "epic",      check: (s) => s.totalKills >= 500 },
  { id: "legend_1000",    icon: "🌟",  title: "Legend",             desc: "Defeat 1000 enemies",                     rarity: "legendary", check: (s) => s.totalKills >= 1000 },

  // Boss kills
  { id: "boss_slayer",    icon: "🐉",  title: "Dragon Slayer",      desc: "Defeat the Forest Drake",                 rarity: "uncommon",  check: (s) => s.bossesDefeated.includes("boss_meadow") },
  { id: "dungeon_lord",   icon: "🧟",  title: "Dungeon Lord",       desc: "Defeat the Dungeon Overlord",             rarity: "uncommon",  check: (s) => s.bossesDefeated.includes("boss_dungeon") },
  { id: "volcano_vanq",   icon: "🌋",  title: "Volcano Vanquisher", desc: "Defeat the Flame Titan",                  rarity: "rare",      check: (s) => s.bossesDefeated.includes("boss_volcano") },
  { id: "frost_breaker",  icon: "❄️",  title: "Frost Breaker",      desc: "Defeat the Frost Colossus",               rarity: "epic",      check: (s) => s.bossesDefeated.includes("boss_abyss") },
  { id: "shadow_vanq",    icon: "💜",  title: "Shadow Vanquisher",  desc: "Defeat the Shadow Sovereign",             rarity: "legendary", check: (s) => s.bossesDefeated.includes("boss_shadow") },

  // Flawless / skill
  { id: "flawless_land",  icon: "✨",  title: "Flawless Victory",   desc: "Complete a land without losing any lives",rarity: "rare",      check: (s) => s.flawlessLands >= 1 },
  { id: "iron_wall",      icon: "🏰",  title: "Iron Wall",          desc: "Complete 3 lands without losing a life",  rarity: "epic",      check: (s) => s.flawlessLands >= 3 },
  { id: "untouchable",    icon: "👼",  title: "Untouchable",        desc: "Complete the full game with 20 lives",    rarity: "legendary", check: (s) => s.victory && s.finalLives === 20 },

  // Combo
  { id: "combo_5",        icon: "⚡",  title: "On Fire",            desc: "Reach a 5x kill combo",                   rarity: "common",    check: (s) => s.maxCombo >= 5 },
  { id: "combo_15",       icon: "🔥",  title: "Inferno",            desc: "Reach a 15x kill combo",                  rarity: "uncommon",  check: (s) => s.maxCombo >= 15 },
  { id: "combo_30",       icon: "☄️",  title: "Unstoppable",        desc: "Reach a 30x kill combo",                  rarity: "epic",      check: (s) => s.maxCombo >= 30 },

  // Economy
  { id: "rich_500",       icon: "💰",  title: "Treasure Hoarder",   desc: "Accumulate 500 gold at once",             rarity: "common",    check: (s) => s.maxGold >= 500 },
  { id: "rich_1000",      icon: "💎",  title: "Gold Baron",         desc: "Accumulate 1000 gold at once",            rarity: "uncommon",  check: (s) => s.maxGold >= 1000 },
  { id: "rich_2500",      icon: "🏆",  title: "Royal Treasury",     desc: "Accumulate 2500 gold at once",            rarity: "epic",      check: (s) => s.maxGold >= 2500 },

  // Tower / merging
  { id: "first_merge",    icon: "🔮",  title: "Alchemist",          desc: "Create your first merged tower",          rarity: "common",    check: (s) => s.totalMerges >= 1 },
  { id: "merger_5",       icon: "🧪",  title: "Master Forge",       desc: "Create 5 merged towers",                  rarity: "uncommon",  check: (s) => s.totalMerges >= 5 },
  { id: "doom_forged",    icon: "💥",  title: "Doomsday Forger",    desc: "Build a Doomsday Cannon",                 rarity: "epic",      check: (s) => s.mergedTypes.includes("doomcannon") },

  // Score
  { id: "score_5k",       icon: "📜",  title: "Chronicled",         desc: "Reach 5,000 score",                       rarity: "common",    check: (s) => s.score >= 5000 },
  { id: "score_20k",      icon: "📖",  title: "Epic Tale",          desc: "Reach 20,000 score",                      rarity: "uncommon",  check: (s) => s.score >= 20000 },
  { id: "score_50k",      icon: "📚",  title: "Living Legend",      desc: "Reach 50,000 score",                      rarity: "legendary", check: (s) => s.score >= 50000 },

  // Victory
  { id: "champion",       icon: "🎖️",  title: "Champion of Eldenmoor", desc: "Complete all 5 lands",              rarity: "legendary", check: (s) => s.victory },
];

export const RARITY_STYLE = {
  common:    { label: "Common",    bg: "#1a1a1a", border: "#555",    glow: "#888",    text: "#ccc",    badge: "#444"    },
  uncommon:  { label: "Uncommon",  bg: "#0d1a0d", border: "#2d6a2d", glow: "#22c55e", text: "#86efac", badge: "#166534" },
  rare:      { label: "Rare",      bg: "#0d0d1a", border: "#2d2d8a", glow: "#6366f1", text: "#a5b4fc", badge: "#3730a3" },
  epic:      { label: "Epic",      bg: "#1a0d1a", border: "#6a2d8a", glow: "#a855f7", text: "#d8b4fe", badge: "#7e22ce" },
  legendary: { label: "Legendary", bg: "#1a1000", border: "#8a6a00", glow: "#f59e0b", text: "#fcd34d", badge: "#92400e" },
};

// Returns array of newly-unlocked achievement ids given old vs new stats
export function checkNewAchievements(stats, prevUnlocked) {
  return ACHIEVEMENTS
    .filter(a => !prevUnlocked.includes(a.id) && a.check(stats))
    .map(a => a.id);
}