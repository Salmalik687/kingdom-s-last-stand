/**
 * Branching upgrade paths for each tower type.
 *
 * Each tower has two distinct paths (A and B) with up to 3 tiers each.
 * A player may only follow ONE path per tower (choosing locks the other).
 *
 * Each tier node:
 *   { id, name, desc, cost, icon, apply(tower) }
 *   `apply` receives the tower object and mutates it in-place.
 */

import { CELL_SIZE } from "./gameEngine";

const PATHS = {
  // ── Archer ────────────────────────────────────────────────────────────────
  archer: {
    A: {
      label: "Rapid Volley",
      icon: "⚡",
      color: "#f59e0b",
      desc: "Speed-focused: fire faster and hit multiple targets",
      tiers: [
        { id: "archer_A1", name: "Swift Nock", desc: "Fire rate +25%", cost: 60, icon: "⚡",
          apply: t => { t.fireRate = Math.max(150, Math.floor(t.fireRate * 0.75)); } },
        { id: "archer_A2", name: "Double Volley", desc: "Fires at 2 enemies simultaneously", cost: 100, icon: "🎯",
          apply: t => { t.upgradePath_multishot = true; } },
        { id: "archer_A3", name: "Storm of Arrows", desc: "Fire rate +40% more & fires at 3 targets", cost: 160, icon: "🌪️",
          apply: t => { t.fireRate = Math.max(100, Math.floor(t.fireRate * 0.60)); t.upgradePath_trishot = true; } },
      ],
    },
    B: {
      label: "Deadeye",
      icon: "📡",
      color: "#10b981",
      desc: "Range & damage: long-range sniper with poison",
      tiers: [
        { id: "archer_B1", name: "Keen Eye", desc: "Range +30% & damage +20%", cost: 70, icon: "📡",
          apply: t => { t.range *= 1.30; t.damage = Math.floor(t.damage * 1.20); } },
        { id: "archer_B2", name: "Poison Tip", desc: "Arrows apply 4s poison DoT", cost: 110, icon: "☠️",
          apply: t => { t.upgradePath_poison = true; } },
        { id: "archer_B3", name: "Sniper's Mark", desc: "Damage +60% more & range +20%", cost: 180, icon: "🎯",
          apply: t => { t.damage = Math.floor(t.damage * 1.60); t.range *= 1.20; } },
      ],
    },
  },

  // ── Cannon ────────────────────────────────────────────────────────────────
  cannon: {
    A: {
      label: "Explosive Shell",
      icon: "💥",
      color: "#ef4444",
      desc: "AoE specialist: massive splash damage",
      tiers: [
        { id: "cannon_A1", name: "Heavy Charge", desc: "Damage +35% & adds splash AoE", cost: 90, icon: "💥",
          apply: t => { t.damage = Math.floor(t.damage * 1.35); t.upgradePath_splash = true; t.upgradePath_splashRadius = CELL_SIZE * 1.4; } },
        { id: "cannon_A2", name: "Incendiary Round", desc: "Splash shots apply 3s burn", cost: 140, icon: "🔥",
          apply: t => { t.upgradePath_burn = true; t.damage = Math.floor(t.damage * 1.15); } },
        { id: "cannon_A3", name: "Devastator", desc: "Splash radius +50% & damage +40%", cost: 220, icon: "☄️",
          apply: t => { t.damage = Math.floor(t.damage * 1.40); t.upgradePath_splashRadius = (t.upgradePath_splashRadius ?? CELL_SIZE * 1.4) * 1.5; } },
      ],
    },
    B: {
      label: "Rapid Fire",
      icon: "⚡",
      color: "#f59e0b",
      desc: "Speed specialist: rapid barrage of shots",
      tiers: [
        { id: "cannon_B1", name: "Quick Loader", desc: "Fire rate +30%", cost: 80, icon: "⚡",
          apply: t => { t.fireRate = Math.max(400, Math.floor(t.fireRate * 0.70)); } },
        { id: "cannon_B2", name: "Armor Pierce", desc: "Ignores 40% of enemy armor", cost: 130, icon: "🔨",
          apply: t => { t.upgradePath_armorBreak = 0.40; } },
        { id: "cannon_B3", name: "Gatling Cannon", desc: "Fire rate +40% more, fires at 2 targets", cost: 210, icon: "🌀",
          apply: t => { t.fireRate = Math.max(250, Math.floor(t.fireRate * 0.60)); t.upgradePath_multishot = true; } },
      ],
    },
  },

  // ── Trebuchet ────────────────────────────────────────────────────────────
  trebuchet: {
    A: {
      label: "Siege Master",
      icon: "🏰",
      color: "#ef4444",
      desc: "Brute force: maximum damage per boulder",
      tiers: [
        { id: "treb_A1", name: "Heavier Boulder", desc: "Damage +45%", cost: 100, icon: "🪨",
          apply: t => { t.damage = Math.floor(t.damage * 1.45); } },
        { id: "treb_A2", name: "Quake Impact", desc: "Impacts slow all nearby enemies for 2s", cost: 150, icon: "🌍",
          apply: t => { t.upgradePath_slowField = true; } },
        { id: "treb_A3", name: "Cataclysm", desc: "Damage +60% & massive AoE splash", cost: 240, icon: "☄️",
          apply: t => { t.damage = Math.floor(t.damage * 1.60); t.upgradePath_splash = true; t.upgradePath_splashRadius = CELL_SIZE * 2.5; } },
      ],
    },
    B: {
      label: "Long Reach",
      icon: "📡",
      color: "#3b82f6",
      desc: "Range specialist: covers the entire battlefield",
      tiers: [
        { id: "treb_B1", name: "Extended Arm", desc: "Range +40%", cost: 90, icon: "📡",
          apply: t => { t.range *= 1.40; } },
        { id: "treb_B2", name: "Rapid Reload", desc: "Fire rate +25%", cost: 140, icon: "⚡",
          apply: t => { t.fireRate = Math.max(800, Math.floor(t.fireRate * 0.75)); } },
        { id: "treb_B3", name: "Horizon Shot", desc: "Range +30% more & damage +30%", cost: 220, icon: "🎯",
          apply: t => { t.range *= 1.30; t.damage = Math.floor(t.damage * 1.30); } },
      ],
    },
  },

  // ── Crossbow ─────────────────────────────────────────────────────────────
  crossbow: {
    A: {
      label: "Rapid Bolt",
      icon: "⚡",
      color: "#f59e0b",
      desc: "Extreme fire rate — shred enemies with bolts",
      tiers: [
        { id: "xbow_A1", name: "Swift Reload", desc: "Fire rate +35%", cost: 70, icon: "⚡",
          apply: t => { t.fireRate = Math.max(100, Math.floor(t.fireRate * 0.65)); } },
        { id: "xbow_A2", name: "Hair Trigger", desc: "Fire rate +25% more", cost: 110, icon: "⚡",
          apply: t => { t.fireRate = Math.max(80, Math.floor(t.fireRate * 0.75)); } },
        { id: "xbow_A3", name: "Hurricane Bolts", desc: "Fires at 2 targets & fire rate +20%", cost: 180, icon: "🌪️",
          apply: t => { t.fireRate = Math.max(60, Math.floor(t.fireRate * 0.80)); t.upgradePath_multishot = true; } },
      ],
    },
    B: {
      label: "Venom Bolt",
      icon: "☠️",
      color: "#10b981",
      desc: "DoT specialist: poison and damage over time",
      tiers: [
        { id: "xbow_B1", name: "Poison Tip", desc: "Bolts apply 3s poison", cost: 75, icon: "☠️",
          apply: t => { t.upgradePath_poison = true; } },
        { id: "xbow_B2", name: "Deep Venom", desc: "Poison duration +3s & damage +25%", cost: 120, icon: "🐍",
          apply: t => { t.upgradePath_deepPoison = true; t.damage = Math.floor(t.damage * 1.25); } },
        { id: "xbow_B3", name: "Pierce & Infect", desc: "Bolts pierce first enemy & damage +35%", cost: 190, icon: "🏹",
          apply: t => { t.upgradePath_pierce = true; t.damage = Math.floor(t.damage * 1.35); } },
      ],
    },
  },

  // ── Mage ─────────────────────────────────────────────────────────────────
  mage: {
    A: {
      label: "Arcane Storm",
      icon: "💥",
      color: "#a855f7",
      desc: "AoE magic: massive splash and chain lightning",
      tiers: [
        { id: "mage_A1", name: "Arcane Burst", desc: "Spells deal 50% splash AoE", cost: 80, icon: "💥",
          apply: t => { t.upgradePath_splash = true; t.upgradePath_splashRadius = CELL_SIZE * 1.6; } },
        { id: "mage_A2", name: "Chain Spark", desc: "Each hit chains to 1 nearby enemy", cost: 130, icon: "⚡",
          apply: t => { t.upgradePath_chain = true; } },
        { id: "mage_A3", name: "Arcane Maelstrom", desc: "Damage +50% & splash radius +40%", cost: 210, icon: "🌀",
          apply: t => { t.damage = Math.floor(t.damage * 1.50); t.upgradePath_splashRadius = (t.upgradePath_splashRadius ?? CELL_SIZE * 1.6) * 1.40; } },
      ],
    },
    B: {
      label: "Time Warp",
      icon: "🌀",
      color: "#06b6d4",
      desc: "Control specialist: slow and freeze enemies",
      tiers: [
        { id: "mage_B1", name: "Arcane Slow", desc: "All spells slow enemies for 2s", cost: 75, icon: "🌀",
          apply: t => { t.upgradePath_slow = true; } },
        { id: "mage_B2", name: "Deep Freeze", desc: "30% chance to fully freeze for 1.5s", cost: 125, icon: "🧊",
          apply: t => { t.upgradePath_freezeChance = 0.30; } },
        { id: "mage_B3", name: "Temporal Rift", desc: "Slow lasts 5s & range +30%", cost: 200, icon: "⏳",
          apply: t => { t.upgradePath_slowDuration = 5000; t.range *= 1.30; } },
      ],
    },
  },

  // ── Frost ─────────────────────────────────────────────────────────────────
  frost: {
    A: {
      label: "Blizzard",
      icon: "❄️",
      color: "#38bdf8",
      desc: "AoE freeze: slow and freeze entire groups",
      tiers: [
        { id: "frost_A1", name: "Frost Field", desc: "Slows all enemies in range passively", cost: 65, icon: "❄️",
          apply: t => { t.upgradePath_aoeSlowField = true; } },
        { id: "frost_A2", name: "Deep Freeze", desc: "Shots freeze enemies solid for 1.5s", cost: 110, icon: "🧊",
          apply: t => { t.upgradePath_freeze = true; } },
        { id: "frost_A3", name: "Blizzard Aura", desc: "Freeze duration +1s & AoE slow field radius +50%", cost: 180, icon: "🌨️",
          apply: t => { t.upgradePath_freezeDuration = 2500; t.range *= 1.20; } },
      ],
    },
    B: {
      label: "Ice Lance",
      icon: "🏹",
      color: "#818cf8",
      desc: "Damage specialist: pierce and heavy frost bolts",
      tiers: [
        { id: "frost_B1", name: "Sharpened Ice", desc: "Damage +40% & range +20%", cost: 70, icon: "🏹",
          apply: t => { t.damage = Math.floor(t.damage * 1.40); t.range *= 1.20; } },
        { id: "frost_B2", name: "Piercing Lance", desc: "Bolts pierce through the first enemy", cost: 115, icon: "🎯",
          apply: t => { t.upgradePath_pierce = true; } },
        { id: "frost_B3", name: "Glacial Sniper", desc: "Damage +60% & fire rate +25%", cost: 185, icon: "💎",
          apply: t => { t.damage = Math.floor(t.damage * 1.60); t.fireRate = Math.max(200, Math.floor(t.fireRate * 0.75)); } },
      ],
    },
  },

  // ── Catapult ──────────────────────────────────────────────────────────────
  catapult: {
    A: {
      label: "Fire Pots",
      icon: "🔥",
      color: "#f97316",
      desc: "Burn specialist: rocks that ignite enemies",
      tiers: [
        { id: "cat_A1", name: "Flaming Rock", desc: "Rocks apply 4s burn DoT", cost: 85, icon: "🔥",
          apply: t => { t.upgradePath_burn = true; } },
        { id: "cat_A2", name: "Inferno Pot", desc: "Burn duration +3s & damage +25%", cost: 130, icon: "🌋",
          apply: t => { t.upgradePath_burnDuration = 7000; t.damage = Math.floor(t.damage * 1.25); } },
        { id: "cat_A3", name: "Hellfire Rain", desc: "Adds splash AoE & burn spreads", cost: 210, icon: "☄️",
          apply: t => { t.upgradePath_splash = true; t.upgradePath_splashRadius = CELL_SIZE * 1.8; t.damage = Math.floor(t.damage * 1.30); } },
      ],
    },
    B: {
      label: "Boulder Crush",
      icon: "🪨",
      color: "#78716c",
      desc: "Stun specialist: rocks that stagger enemies",
      tiers: [
        { id: "cat_B1", name: "Heavy Stone", desc: "Damage +40% & 20% stun chance", cost: 90, icon: "🪨",
          apply: t => { t.damage = Math.floor(t.damage * 1.40); t.upgradePath_stunChance = 0.20; } },
        { id: "cat_B2", name: "Concussive Impact", desc: "Stun chance +30% & stun duration 1.5s", cost: 140, icon: "💫",
          apply: t => { t.upgradePath_stunChance = (t.upgradePath_stunChance ?? 0) + 0.30; t.upgradePath_stunDuration = 1500; } },
        { id: "cat_B3", name: "Earthshaker", desc: "Damage +50% & AoE stun radius", cost: 220, icon: "🌍",
          apply: t => { t.damage = Math.floor(t.damage * 1.50); t.upgradePath_aoeStun = true; } },
      ],
    },
  },
};

// For merged towers — use the base that best fits their archetype
const MERGED_FALLBACKS = {
  ballista:        PATHS.crossbow,
  warcannon:       PATHS.cannon,
  doomcannon:      PATHS.cannon,
  siegeEngine:     PATHS.trebuchet,
  warMachine:      PATHS.cannon,
  arrowStorm:      PATHS.archer,
  spellcaster:     PATHS.mage,
  frozenMage:      PATHS.mage,
  arcaneCannoneer: PATHS.cannon,
  stormArcher:     PATHS.archer,
  blizzardTower:   PATHS.frost,
  frostCannoneer:  PATHS.frost,
  shadowMage:      PATHS.mage,
  voidCannon:      PATHS.cannon,
  glacialBallista: PATHS.frost,
  thunderArcher:   PATHS.archer,
  infernoTrebuchet:PATHS.trebuchet,
  venomCrossbow:   PATHS.crossbow,
  doomSiege:       PATHS.trebuchet,
  frostStorm:      PATHS.frost,
  arcaneSiege:     PATHS.mage,
};

export function getUpgradePaths(towerType) {
  return PATHS[towerType] || MERGED_FALLBACKS[towerType] || null;
}

/**
 * Returns which tiers have been purchased on a given path (A or B).
 * tower.upgradePurchased = Set of tier IDs
 */
export function getPurchasedTiers(tower, path) {
  const paths = getUpgradePaths(tower.type);
  if (!paths) return [];
  const purchased = tower.upgradePurchased ?? new Set();
  return paths[path].tiers.map((tier, idx) => ({
    ...tier,
    purchased: purchased.has(tier.id),
    // Can purchase if: previous tier bought (or idx===0) AND this path is not locked out
    available: idx === 0
      ? (tower.chosenUpgradePath == null || tower.chosenUpgradePath === path)
      : purchased.has(paths[path].tiers[idx - 1]?.id) && (tower.chosenUpgradePath === path),
  }));
}

/**
 * Apply a tier upgrade to a tower (mutates in-place).
 * Returns the gold cost, or 0 if not applicable.
 */
export function applyUpgradeTier(tower, tierId) {
  const paths = getUpgradePaths(tower.type);
  if (!paths) return 0;

  for (const pathKey of ["A", "B"]) {
    const tierIdx = paths[pathKey].tiers.findIndex(t => t.id === tierId);
    if (tierIdx === -1) continue;

    const tier = paths[pathKey].tiers[tierIdx];
    if (!tower.upgradePurchased) tower.upgradePurchased = new Set();
    if (tower.upgradePurchased.has(tierId)) return 0;

    // Enforce path lock
    if (tower.chosenUpgradePath && tower.chosenUpgradePath !== pathKey) return 0;

    // Enforce sequential purchase
    if (tierIdx > 0) {
      const prevId = paths[pathKey].tiers[tierIdx - 1].id;
      if (!tower.upgradePurchased.has(prevId)) return 0;
    }

    tier.apply(tower);
    tower.upgradePurchased.add(tierId);
    tower.chosenUpgradePath = pathKey;
    return tier.cost;
  }
  return 0;
}