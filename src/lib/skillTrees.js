// Per-character skill trees — passive upgrades + active ability modifiers
// waveRequired: wave player must have reached to unlock the node

export const CHARACTER_SKILL_TREES = {

  // ─── LORD ALDRIC ──────────────────────────────────────────────────────────
  aldric: {
    color: "#c9915a",
    colorRgb: "201,145,90",
    nodes: [
      // Tier 1 — unlocked from wave 1
      {
        id: "aldric_iron_will",
        name: "Iron Will",
        emoji: "🛡️",
        desc: "+3 starting lives. The general's resolve shields the kingdom.",
        type: "passive",
        effect: { lives: 3 },
        tier: 1, col: 0, waveRequired: 1, requires: [],
      },
      {
        id: "aldric_war_training",
        name: "War Training",
        emoji: "⚔️",
        desc: "+10% damage to all towers. Decades of battlefield experience.",
        type: "passive",
        effect: { damageMult: 0.10 },
        tier: 1, col: 1, waveRequired: 1, requires: [],
      },
      {
        id: "aldric_steady_aim",
        name: "Steady Aim",
        emoji: "🎯",
        desc: "+8% range on all towers. Aldric positions every battery with precision.",
        type: "passive",
        effect: { rangeMult: 0.08 },
        tier: 1, col: 2, waveRequired: 1, requires: [],
      },
      // Tier 2 — unlocked from wave 6
      {
        id: "aldric_fortress_mind",
        name: "Fortress Mind",
        emoji: "🏰",
        desc: "+5 lives. Aldric's unbreakable will fortifies the whole garrison.",
        type: "passive",
        effect: { lives: 5 },
        tier: 2, col: 0, waveRequired: 6, requires: ["aldric_iron_will"],
      },
      {
        id: "aldric_siege_master",
        name: "Siege Master",
        emoji: "💥",
        desc: "+15% damage. Aldric optimises every cannon and catapult personally.",
        type: "passive",
        effect: { damageMult: 0.15 },
        tier: 2, col: 1, waveRequired: 6, requires: ["aldric_war_training"],
      },
      {
        id: "aldric_rapid_salvo",
        name: "Rapid Salvo",
        emoji: "🔥",
        desc: "-10% tower fire rate (faster). Drilled reload discipline.",
        type: "passive",
        effect: { fireRateMult: -0.10 },
        tier: 2, col: 2, waveRequired: 6, requires: ["aldric_steady_aim"],
      },
      // Tier 3 — unlocked from wave 11
      {
        id: "aldric_last_stand",
        name: "Last Stand",
        emoji: "⚡",
        desc: "Active: Rain of Arrows deals +50% extra damage. The general's final gambit.",
        type: "ability_mod",
        effect: { abilityMod: "rain_of_arrows_power" },
        tier: 3, col: 0, waveRequired: 11, requires: ["aldric_fortress_mind"],
      },
      {
        id: "aldric_veteran_gold",
        name: "Veteran's Spoils",
        emoji: "💰",
        desc: "+20% gold from enemies. Veterans know where the real treasure is.",
        type: "passive",
        effect: { goldMult: 0.20 },
        tier: 3, col: 1, waveRequired: 11, requires: ["aldric_siege_master"],
      },
      {
        id: "aldric_steel_phalanx",
        name: "Steel Phalanx",
        emoji: "🛡️",
        desc: "+20% damage AND +10% range. The general unifies every line of defence.",
        type: "passive",
        effect: { damageMult: 0.20, rangeMult: 0.10 },
        tier: 3, col: 2, waveRequired: 11, requires: ["aldric_rapid_salvo"],
      },
    ],
  },

  // ─── QUEEN SERAPHINE ──────────────────────────────────────────────────────
  seraphine: {
    color: "#5a9a7a",
    colorRgb: "90,154,122",
    nodes: [
      {
        id: "sera_grove_blessing",
        name: "Grove Blessing",
        emoji: "🌿",
        desc: "+12% range on all towers. The grove extends its reach.",
        type: "passive",
        effect: { rangeMult: 0.12 },
        tier: 1, col: 0, waveRequired: 1, requires: [],
      },
      {
        id: "sera_life_spring",
        name: "Life Spring",
        emoji: "💚",
        desc: "+4 lives. Nature's bounty sustains the defenders.",
        type: "passive",
        effect: { lives: 4 },
        tier: 1, col: 1, waveRequired: 1, requires: [],
      },
      {
        id: "sera_natures_coin",
        name: "Nature's Coin",
        emoji: "🪙",
        desc: "+15% gold income. The queen's lands are bountiful.",
        type: "passive",
        effect: { goldMult: 0.15 },
        tier: 1, col: 2, waveRequired: 1, requires: [],
      },
      {
        id: "sera_ancient_bark",
        name: "Ancient Bark",
        emoji: "🌳",
        desc: "+8 lives. Ancient tree spirits guard the castle walls.",
        type: "passive",
        effect: { lives: 8 },
        tier: 2, col: 0, waveRequired: 6, requires: ["sera_grove_blessing"],
      },
      {
        id: "sera_verdant_wrath",
        name: "Verdant Wrath",
        emoji: "🍃",
        desc: "+12% damage. Nature fights alongside its queen.",
        type: "passive",
        effect: { damageMult: 0.12 },
        tier: 2, col: 1, waveRequired: 6, requires: ["sera_life_spring"],
      },
      {
        id: "sera_forest_haste",
        name: "Forest Haste",
        emoji: "🌪️",
        desc: "-12% fire rate (faster). Wind of the forest speeds all projectiles.",
        type: "passive",
        effect: { fireRateMult: -0.12 },
        tier: 2, col: 2, waveRequired: 6, requires: ["sera_natures_coin"],
      },
      {
        id: "sera_healing_surge",
        name: "Healing Surge",
        emoji: "✨",
        desc: "Active: Healing Aura restores +6 lives instead of 3.",
        type: "ability_mod",
        effect: { abilityMod: "healing_aura_double" },
        tier: 3, col: 0, waveRequired: 11, requires: ["sera_ancient_bark"],
      },
      {
        id: "sera_queens_ransom",
        name: "Queen's Ransom",
        emoji: "👑",
        desc: "+25% gold AND +15% range. The queen's treasury and forests both blossom.",
        type: "passive",
        effect: { goldMult: 0.25, rangeMult: 0.15 },
        tier: 3, col: 1, waveRequired: 11, requires: ["sera_verdant_wrath"],
      },
      {
        id: "sera_eternal_grove",
        name: "Eternal Grove",
        emoji: "🌲",
        desc: "+20% damage AND +10 lives. The ancient grove rises to defend its queen.",
        type: "passive",
        effect: { damageMult: 0.20, lives: 10 },
        tier: 3, col: 2, waveRequired: 11, requires: ["sera_forest_haste"],
      },
    ],
  },

  // ─── MORRIGAN ─────────────────────────────────────────────────────────────
  morrigan: {
    color: "#a78bfa",
    colorRgb: "167,139,250",
    nodes: [
      {
        id: "mor_dark_scholarship",
        name: "Dark Scholarship",
        emoji: "📚",
        desc: "-12% tower costs. Morrigan's knowledge unlocks hidden efficiencies.",
        type: "passive",
        effect: { costReduction: 0.12 },
        tier: 1, col: 0, waveRequired: 1, requires: [],
      },
      {
        id: "mor_arcane_fury",
        name: "Arcane Fury",
        emoji: "🔮",
        desc: "+18% damage. Morrigan channels raw arcane power into every shot.",
        type: "passive",
        effect: { damageMult: 0.18 },
        tier: 1, col: 1, waveRequired: 1, requires: [],
      },
      {
        id: "mor_shadow_step",
        name: "Shadow Step",
        emoji: "🌑",
        desc: "-15% fire rate (faster). Shadows hasten every projectile.",
        type: "passive",
        effect: { fireRateMult: -0.15 },
        tier: 1, col: 2, waveRequired: 1, requires: [],
      },
      {
        id: "mor_forbidden_tomes",
        name: "Forbidden Tomes",
        emoji: "📖",
        desc: "-20% tower costs. Morrigan unlocks knowledge they tried to bury.",
        type: "passive",
        effect: { costReduction: 0.20 },
        tier: 2, col: 0, waveRequired: 6, requires: ["mor_dark_scholarship"],
      },
      {
        id: "mor_void_infusion",
        name: "Void Infusion",
        emoji: "💜",
        desc: "+22% damage. Void energy courses through every tower's core.",
        type: "passive",
        effect: { damageMult: 0.22 },
        tier: 2, col: 1, waveRequired: 6, requires: ["mor_arcane_fury"],
      },
      {
        id: "mor_hex_bolt",
        name: "Hex Bolt",
        emoji: "⚡",
        desc: "+10% range. Morrigan's hexes extend the reach of her towers.",
        type: "passive",
        effect: { rangeMult: 0.10 },
        tier: 2, col: 2, waveRequired: 6, requires: ["mor_shadow_step"],
      },
      {
        id: "mor_eternal_frost",
        name: "Eternal Frost",
        emoji: "❄️",
        desc: "Active: Frost Nova lasts 8s instead of 5s. Morrigan's chill is endless.",
        type: "ability_mod",
        effect: { abilityMod: "frost_nova_extend" },
        tier: 3, col: 0, waveRequired: 11, requires: ["mor_forbidden_tomes"],
      },
      {
        id: "mor_chaos_gold",
        name: "Chaos Markets",
        emoji: "💰",
        desc: "+20% gold. Morrigan knows how to profit from chaos.",
        type: "passive",
        effect: { goldMult: 0.20 },
        tier: 3, col: 1, waveRequired: 11, requires: ["mor_void_infusion"],
      },
      {
        id: "mor_dark_pact",
        name: "Dark Pact",
        emoji: "🌀",
        desc: "+30% damage AND -25% fire rate. Morrigan seals a terrible bargain.",
        type: "passive",
        effect: { damageMult: 0.30, fireRateMult: -0.25 },
        tier: 3, col: 2, waveRequired: 11, requires: ["mor_hex_bolt"],
      },
    ],
  },

  // ─── KAEL IRONBOW ─────────────────────────────────────────────────────────
  kael: {
    color: "#38bdf8",
    colorRgb: "56,189,248",
    nodes: [
      {
        id: "kael_eagle_eye",
        name: "Eagle Eye",
        emoji: "🦅",
        desc: "+15% range. Kael's ranger eyes see further than any man alive.",
        type: "passive",
        effect: { rangeMult: 0.15 },
        tier: 1, col: 0, waveRequired: 1, requires: [],
      },
      {
        id: "kael_swift_quiver",
        name: "Swift Quiver",
        emoji: "🏹",
        desc: "-12% fire rate (faster). Years of drilling arrow speed into muscle memory.",
        type: "passive",
        effect: { fireRateMult: -0.12 },
        tier: 1, col: 1, waveRequired: 1, requires: [],
      },
      {
        id: "kael_tracker_gold",
        name: "Tracker's Eye",
        emoji: "💎",
        desc: "+12% gold. Kael never misses loot, not just enemies.",
        type: "passive",
        effect: { goldMult: 0.12 },
        tier: 1, col: 2, waveRequired: 1, requires: [],
      },
      {
        id: "kael_hunters_instinct",
        name: "Hunter's Instinct",
        emoji: "🐺",
        desc: "+20% range. Predator instinct extends every tower's detection.",
        type: "passive",
        effect: { rangeMult: 0.20 },
        tier: 2, col: 0, waveRequired: 6, requires: ["kael_eagle_eye"],
      },
      {
        id: "kael_barbed_arrows",
        name: "Barbed Arrows",
        emoji: "🗡️",
        desc: "+15% damage. Every arrow drawn from Kael's knowledge of anatomy.",
        type: "passive",
        effect: { damageMult: 0.15 },
        tier: 2, col: 1, waveRequired: 6, requires: ["kael_swift_quiver"],
      },
      {
        id: "kael_bounty_hunter",
        name: "Bounty Hunter",
        emoji: "💰",
        desc: "+20% gold. Kael claims every bounty on the field.",
        type: "passive",
        effect: { goldMult: 0.20 },
        tier: 2, col: 2, waveRequired: 6, requires: ["kael_tracker_gold"],
      },
      {
        id: "kael_storm_volley",
        name: "Storm Volley",
        emoji: "🌩️",
        desc: "Active: Rain of Arrows fires twice in quick succession.",
        type: "ability_mod",
        effect: { abilityMod: "rain_of_arrows_double" },
        tier: 3, col: 0, waveRequired: 11, requires: ["kael_hunters_instinct"],
      },
      {
        id: "kael_apex_predator",
        name: "Apex Predator",
        emoji: "🔱",
        desc: "+25% damage AND -15% fire rate. The apex of Kael's fighting skill.",
        type: "passive",
        effect: { damageMult: 0.25, fireRateMult: -0.15 },
        tier: 3, col: 1, waveRequired: 11, requires: ["kael_barbed_arrows"],
      },
      {
        id: "kael_farsight",
        name: "Farsight",
        emoji: "🌟",
        desc: "+30% range AND +15% gold. The borderlands teach patience and profit.",
        type: "passive",
        effect: { rangeMult: 0.30, goldMult: 0.15 },
        tier: 3, col: 2, waveRequired: 11, requires: ["kael_bounty_hunter"],
      },
    ],
  },

  // ─── AURORA ───────────────────────────────────────────────────────────────
  aurora: {
    color: "#fbbf24",
    colorRgb: "251,191,36",
    nodes: [
      {
        id: "aurora_holy_light",
        name: "Holy Light",
        emoji: "✨",
        desc: "+12% damage. Aurora's divine light empowers every tower's strike.",
        type: "passive",
        effect: { damageMult: 0.12 },
        tier: 1, col: 0, waveRequired: 1, requires: [],
      },
      {
        id: "aurora_sacred_oath",
        name: "Sacred Oath",
        emoji: "🌟",
        desc: "+5 lives. Sworn by the Sun Temple to protect life at all costs.",
        type: "passive",
        effect: { lives: 5 },
        tier: 1, col: 1, waveRequired: 1, requires: [],
      },
      {
        id: "aurora_sun_tithe",
        name: "Sun Tithe",
        emoji: "☀️",
        desc: "+10% gold. The Sun Temple's blessing flows through all commerce.",
        type: "passive",
        effect: { goldMult: 0.10 },
        tier: 1, col: 2, waveRequired: 1, requires: [],
      },
      {
        id: "aurora_radiant_strike",
        name: "Radiant Strike",
        emoji: "💫",
        desc: "+18% damage. The paladin's conviction flows through every cannon.",
        type: "passive",
        effect: { damageMult: 0.18 },
        tier: 2, col: 0, waveRequired: 6, requires: ["aurora_holy_light"],
      },
      {
        id: "aurora_martyrs_resolve",
        name: "Martyr's Resolve",
        emoji: "🛡️",
        desc: "+8 lives. Aurora's willingness to sacrifice inspires superhuman courage.",
        type: "passive",
        effect: { lives: 8 },
        tier: 2, col: 1, waveRequired: 6, requires: ["aurora_sacred_oath"],
      },
      {
        id: "aurora_blessing_speed",
        name: "Blessed Haste",
        emoji: "⚡",
        desc: "-12% fire rate (faster). The Sun blesses speed of will and hand.",
        type: "passive",
        effect: { fireRateMult: -0.12 },
        tier: 2, col: 2, waveRequired: 6, requires: ["aurora_sun_tithe"],
      },
      {
        id: "aurora_eternal_shield",
        name: "Eternal Shield",
        emoji: "🛡️",
        desc: "Active: Divine Shield lasts 20s instead of 10s. Unyielding holy ward.",
        type: "ability_mod",
        effect: { abilityMod: "divine_shield_extend" },
        tier: 3, col: 0, waveRequired: 11, requires: ["aurora_radiant_strike"],
      },
      {
        id: "aurora_solar_wrath",
        name: "Solar Wrath",
        emoji: "🔆",
        desc: "+25% damage AND +8% range. The full fury of the sun channelled.",
        type: "passive",
        effect: { damageMult: 0.25, rangeMult: 0.08 },
        tier: 3, col: 1, waveRequired: 11, requires: ["aurora_martyrs_resolve"],
      },
      {
        id: "aurora_divine_bounty",
        name: "Divine Bounty",
        emoji: "💛",
        desc: "+25% gold AND +10 lives. The Sun Temple's full blessing upon Eldenmoor.",
        type: "passive",
        effect: { goldMult: 0.25, lives: 10 },
        tier: 3, col: 2, waveRequired: 11, requires: ["aurora_blessing_speed"],
      },
    ],
  },
};

export function getSkillTree(characterId) {
  return CHARACTER_SKILL_TREES[characterId] || CHARACTER_SKILL_TREES.aldric;
}

// Returns a summary of all passive bonuses from an array of unlocked skill IDs
export function computeSkillBonuses(characterId, unlockedSkillIds) {
  const tree = getSkillTree(characterId);
  const bonuses = { damageMult: 0, rangeMult: 0, fireRateMult: 0, goldMult: 0, lives: 0, costReduction: 0 };
  tree.nodes.forEach(node => {
    if (!unlockedSkillIds.includes(node.id)) return;
    if (node.type === "passive") {
      if (node.effect.damageMult)   bonuses.damageMult   += node.effect.damageMult;
      if (node.effect.rangeMult)    bonuses.rangeMult    += node.effect.rangeMult;
      if (node.effect.fireRateMult) bonuses.fireRateMult += node.effect.fireRateMult;
      if (node.effect.goldMult)     bonuses.goldMult     += node.effect.goldMult;
      if (node.effect.lives)        bonuses.lives        += node.effect.lives;
      if (node.effect.costReduction) bonuses.costReduction += node.effect.costReduction;
    }
  });
  return bonuses;
}

// Returns active ability mods for a character's unlocked skills
export function getAbilityMods(characterId, unlockedSkillIds) {
  const tree = getSkillTree(characterId);
  const mods = new Set();
  tree.nodes.forEach(node => {
    if (unlockedSkillIds.includes(node.id) && node.type === "ability_mod") {
      mods.add(node.effect.abilityMod);
    }
  });
  return mods;
}