/**
 * Forge Upgrades — permanent passive bonuses purchased in the Forge Shop.
 * These are global buffs applied to ALL towers of a given type.
 * Each upgrade can be purchased multiple times up to its `maxRank`.
 */

export const FORGE_UPGRADES = [
  // ── Archer ──────────────────────────────────────────────────────────────
  {
    id: "forge_archer_dmg",
    towerType: "archer",
    name: "Sharpened Arrows",
    desc: "+20% damage for all Archer towers",
    icon: "🏹",
    color: "#f59e0b",
    cost: 80,
    maxRank: 5,
    effect: { damageMult: 0.20 },
  },
  {
    id: "forge_archer_speed",
    towerType: "archer",
    name: "Swift Draw",
    desc: "-15% fire rate (faster) for all Archer towers",
    icon: "⚡",
    color: "#f59e0b",
    cost: 90,
    maxRank: 4,
    effect: { fireRateMult: -0.15 },
  },
  {
    id: "forge_archer_range",
    towerType: "archer",
    name: "Eagle Eye",
    desc: "+20% range for all Archer towers",
    icon: "📡",
    color: "#f59e0b",
    cost: 70,
    maxRank: 4,
    effect: { rangeMult: 0.20 },
  },

  // ── Cannon ──────────────────────────────────────────────────────────────
  {
    id: "forge_cannon_dmg",
    towerType: "cannon",
    name: "Heavy Ordnance",
    desc: "+25% damage for all Cannon towers",
    icon: "💣",
    color: "#ef4444",
    cost: 100,
    maxRank: 5,
    effect: { damageMult: 0.25 },
  },
  {
    id: "forge_cannon_splash",
    towerType: "cannon",
    name: "Wider Blast",
    desc: "+20% splash radius for all Cannon towers",
    icon: "💥",
    color: "#ef4444",
    cost: 85,
    maxRank: 3,
    effect: { splashMult: 0.20 },
  },
  {
    id: "forge_cannon_reload",
    towerType: "cannon",
    name: "Faster Reload",
    desc: "-15% fire rate (faster) for all Cannon towers",
    icon: "⚡",
    color: "#ef4444",
    cost: 95,
    maxRank: 4,
    effect: { fireRateMult: -0.15 },
  },

  // ── Mage ────────────────────────────────────────────────────────────────
  {
    id: "forge_mage_dmg",
    towerType: "mage",
    name: "Arcane Power",
    desc: "+25% damage for all Mage towers",
    icon: "🔮",
    color: "#a855f7",
    cost: 90,
    maxRank: 5,
    effect: { damageMult: 0.25 },
  },
  {
    id: "forge_mage_range",
    towerType: "mage",
    name: "Far Sight",
    desc: "+20% range for all Mage towers",
    icon: "📡",
    color: "#a855f7",
    cost: 80,
    maxRank: 4,
    effect: { rangeMult: 0.20 },
  },
  {
    id: "forge_mage_speed",
    towerType: "mage",
    name: "Spell Haste",
    desc: "-15% cast time for all Mage towers",
    icon: "⚡",
    color: "#a855f7",
    cost: 95,
    maxRank: 4,
    effect: { fireRateMult: -0.15 },
  },

  // ── Frost ────────────────────────────────────────────────────────────────
  {
    id: "forge_frost_slow",
    towerType: "frost",
    name: "Deep Chill",
    desc: "+1s slow duration for all Frost towers",
    icon: "❄️",
    color: "#38bdf8",
    cost: 75,
    maxRank: 4,
    effect: { slowDurationBonus: 1000 },
  },
  {
    id: "forge_frost_dmg",
    towerType: "frost",
    name: "Frostbite",
    desc: "+25% damage for all Frost towers",
    icon: "🧊",
    color: "#38bdf8",
    cost: 80,
    maxRank: 5,
    effect: { damageMult: 0.25 },
  },

  // ── Trebuchet ────────────────────────────────────────────────────────────
  {
    id: "forge_treb_dmg",
    towerType: "trebuchet",
    name: "Titan Boulder",
    desc: "+30% damage for all Trebuchet towers",
    icon: "⚙️",
    color: "#78716c",
    cost: 110,
    maxRank: 5,
    effect: { damageMult: 0.30 },
  },
  {
    id: "forge_treb_range",
    towerType: "trebuchet",
    name: "Extended Arm",
    desc: "+25% range for all Trebuchet towers",
    icon: "📡",
    color: "#78716c",
    cost: 100,
    maxRank: 4,
    effect: { rangeMult: 0.25 },
  },

  // ── Crossbow ────────────────────────────────────────────────────────────
  {
    id: "forge_xbow_speed",
    towerType: "crossbow",
    name: "Hair Trigger",
    desc: "-20% fire rate (faster) for all Crossbow towers",
    icon: "⚡",
    color: "#16a34a",
    cost: 80,
    maxRank: 5,
    effect: { fireRateMult: -0.20 },
  },
  {
    id: "forge_xbow_dmg",
    towerType: "crossbow",
    name: "Steel Tips",
    desc: "+20% damage for all Crossbow towers",
    icon: "🏹",
    color: "#16a34a",
    cost: 75,
    maxRank: 5,
    effect: { damageMult: 0.20 },
  },

  // ── Catapult ────────────────────────────────────────────────────────────
  {
    id: "forge_cat_dmg",
    towerType: "catapult",
    name: "Heavy Load",
    desc: "+25% damage for all Catapult towers",
    icon: "🪨",
    color: "#a16207",
    cost: 90,
    maxRank: 5,
    effect: { damageMult: 0.25 },
  },
];

/**
 * Returns the cumulative stat multipliers for a given tower type
 * based on what the player has purchased in forgeRanks.
 * forgeRanks: { [upgradeId]: rank }
 */
export function getForgeBonus(towerType, forgeRanks) {
  let damageMult = 1;
  let fireRateMult = 1;
  let rangeMult = 1;
  let splashMult = 1;
  let slowDurationBonus = 0;

  FORGE_UPGRADES.forEach(upg => {
    if (upg.towerType !== towerType) return;
    const rank = forgeRanks[upg.id] ?? 0;
    if (rank === 0) return;

    if (upg.effect.damageMult)       damageMult       *= Math.pow(1 + upg.effect.damageMult,       rank);
    if (upg.effect.fireRateMult)     fireRateMult     *= Math.pow(1 + upg.effect.fireRateMult,     rank);
    if (upg.effect.rangeMult)        rangeMult        *= Math.pow(1 + upg.effect.rangeMult,        rank);
    if (upg.effect.splashMult)       splashMult       *= Math.pow(1 + upg.effect.splashMult,       rank);
    if (upg.effect.slowDurationBonus) slowDurationBonus += upg.effect.slowDurationBonus * rank;
  });

  return { damageMult, fireRateMult, rangeMult, splashMult, slowDurationBonus };
}

/**
 * Apply forge bonuses to a tower object (mutates in-place).
 * Call this when placing or updating a tower.
 */
export function applyForgeBonusToTower(tower, forgeRanks) {
  const bonus = getForgeBonus(tower.type, forgeRanks);
  if (bonus.damageMult !== 1)   tower.damage   = Math.floor(tower.damage   * bonus.damageMult);
  if (bonus.fireRateMult !== 1) tower.fireRate  = Math.max(60, Math.floor(tower.fireRate * bonus.fireRateMult));
  if (bonus.rangeMult !== 1)    tower.range    *= bonus.rangeMult;
  if (bonus.slowDurationBonus)  tower.forgeSlow = (tower.forgeSlow ?? 0) + bonus.slowDurationBonus;
}