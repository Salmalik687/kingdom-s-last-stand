import { useState } from "react";
import { X, Lock, BookOpen, Swords, Shield, Zap, Star } from "lucide-react";

// Full codex data for every enemy type
const CODEX_ENTRIES = {
  // ── Land 1: Verdant Meadow ──────────────────────────────────────────
  peasant: {
    name: "Peasant", emoji: "🧑‍🌾", land: 1, landName: "Verdant Meadow",
    landEmoji: "🌿", rarity: "common",
    hp: 30, speed: 1.2, reward: 10,
    lore: "Once simple farmers of the Eldenmoor valleys, these wretched souls were pressed into Malgrath's service by threat of fire and blade. They carry rusted scythes and broken courage — dangerous only in numbers.",
    weakness: "Any tower at all. A single arrow suffices.",
    tip: "Use 🏹 Archers freely — Peasants die before reaching your second tower. Save your gold; don't over-invest this early.",
    counters: ["archer", "cannon"],
    threat: 1,
  },
  soldier: {
    name: "Soldier", emoji: "⚔️", land: 1, landName: "Verdant Meadow",
    landEmoji: "🌿", rarity: "common",
    hp: 60, speed: 1.0, reward: 15,
    lore: "Trained conscripts bearing cheap iron swords and leather jerkins. They march in disciplined rows but break quickly under sustained fire. Their greatest strength is their numbers.",
    weakness: "Area damage. Clustered movement makes them AoE bait.",
    tip: "A 💣 Cannon with splash damage tears through soldier columns. Place it at a chokepoint bend in the path.",
    counters: ["cannon", "trebuchet", "catapult"],
    threat: 1,
  },
  horseman: {
    name: "Horseman", emoji: "🐴", land: 1, landName: "Verdant Meadow",
    landEmoji: "🌿", rarity: "uncommon",
    hp: 80, speed: 1.8, reward: 20,
    lore: "Cavalry outriders who race ahead of the main host, testing your defences for weak points. Lightly armoured but blindingly fast — they will outrun a slow tower's rotation.",
    weakness: "Slowing effects and fast-firing towers.",
    tip: "❄️ Frost towers are essential here. Slow horsemen to a crawl before they slip past your firing arcs. Crossbows also work well.",
    counters: ["frost", "crossbow", "stormArcher"],
    threat: 2,
  },
  knight: {
    name: "Knight", emoji: "🛡️", land: 1, landName: "Verdant Meadow",
    landEmoji: "🌿", rarity: "uncommon",
    hp: 120, speed: 0.8, reward: 25,
    lore: "Fallen paladins stripped of their vows and reforged in Malgrath's image. Their plate armour is thick, their resolve iron. They ignore lesser projectiles entirely.",
    weakness: "High single-target damage.",
    tip: "Upgrade your 💣 Cannon to level 2+ before wave 5. Knights shrug off basic arrows — concentrate fire with a Ballista (Archer + Cannon merge).",
    counters: ["cannon", "ballista", "warcannon"],
    threat: 2,
  },

  // ── Land 2: Dark Dungeon ─────────────────────────────────────────────
  skeleton: {
    name: "Skeleton", emoji: "💀", land: 2, landName: "Dark Dungeon",
    landEmoji: "🪨", rarity: "common",
    hp: 90, speed: 1.6, reward: 22,
    lore: "Animated by the Dungeon Overlord's necromantic will, these rattling warriors feel no pain and require no sustenance. They are brittle but relentless, crumbling only when their binding magic is disrupted.",
    weakness: "Splash damage breaks their brittle frames.",
    tip: "💣 Cannons with splash ability tear through skeleton swarms. Consider merging two Cannons into a War Cannon before wave 6.",
    counters: ["cannon", "warcannon", "trebuchet"],
    threat: 2,
  },
  wraith: {
    name: "Wraith", emoji: "👻", land: 2, landName: "Dark Dungeon",
    landEmoji: "🪨", rarity: "uncommon",
    hp: 200, speed: 1.4, reward: 40,
    lore: "The restless dead, bound between worlds. Wraiths phase in and out of visibility as they glide through your defences. Their semi-corporeal form partially deflects physical projectiles.",
    weakness: "Magic damage bypasses their ethereal resistance.",
    tip: "🔮 Mage towers deal arcane damage that hits Wraiths full force. Place a Mage at the longest path segment for maximum exposure time.",
    counters: ["mage", "spellcaster", "frozenMage"],
    threat: 3,
  },
  necromancer: {
    name: "Necromancer", emoji: "🧙", land: 2, landName: "Dark Dungeon",
    landEmoji: "🪨", rarity: "rare",
    hp: 170, speed: 0.9, reward: 55,
    lore: "Robed scholars of death who walk unhurried through the carnage, weaving spells to bolster allies. Their true danger is the aura they project — enemies nearby regenerate HP.",
    weakness: "Burst damage before their aura activates.",
    tip: "Prioritise killing Necromancers immediately. A high-level 🔮 Mage or 💣 Warcannon with rapid fire will burst them before they can sustain the wave.",
    counters: ["mage", "warcannon", "doomcannon"],
    threat: 3,
  },
  king: {
    name: "King", emoji: "👑", land: 2, landName: "Dark Dungeon",
    landEmoji: "🪨", rarity: "rare",
    hp: 300, speed: 0.6, reward: 100,
    lore: "A deposed monarch who pledged his soul to Malgrath in exchange for eternal rule. Clad in cursed regalia, he moves slowly but absorbs punishment that would fell lesser beings.",
    weakness: "Armour-breaking projectiles and sustained burn.",
    tip: "Use a 💣 Cannon with Armorbreak ability or a Warcannon (level 3+). Then apply burn with a Fire tower to deal damage over time while other enemies distract him.",
    counters: ["warcannon", "doomcannon", "cannon"],
    threat: 4,
  },

  // ── Land 3: Volcanic Wastes ──────────────────────────────────────────
  lavaSpawn: {
    name: "Lava Spawn", emoji: "🔥", land: 3, landName: "Volcanic Wastes",
    landEmoji: "🌋", rarity: "common",
    hp: 220, speed: 1.5, reward: 45,
    lore: "Elemental constructs birthed from the volcano's core, Lava Spawns burn so hot that frost effects evaporate on contact. They move swiftly and spread fire wherever they step.",
    weakness: "Physical impact damage — they have no armour.",
    tip: "❄️ Frost towers are ineffective against Lava Spawns. Use 🏹 Arrow Storm or 🎯 Ballista for physical, rapid damage instead.",
    counters: ["ballista", "arrowStorm", "stormArcher"],
    threat: 3,
  },
  firedrake: {
    name: "Firedrake", emoji: "🐲", land: 3, landName: "Volcanic Wastes",
    landEmoji: "🌋", rarity: "uncommon",
    hp: 280, speed: 1.3, reward: 65,
    lore: "Young cousins of the great dragons, Firedrakes are winged but ground-bound, their wings scorched by centuries of volcanic fumes. Fast and dangerous, they exhale jets of searing flame.",
    weakness: "Multi-projectile attacks that track their movement.",
    tip: "🔮 Mage chains (chain lightning ability) jump between Firedrakes perfectly. A Spellcaster placed mid-path chains through the entire flight.",
    counters: ["mage", "spellcaster", "arcaneCannoneer"],
    threat: 3,
  },
  demon: {
    name: "Demon", emoji: "😈", land: 3, landName: "Volcanic Wastes",
    landEmoji: "🌋", rarity: "rare",
    hp: 350, speed: 1.0, reward: 60,
    lore: "Infernal servants of Malgrath's inner circle. Demons bear thick hide hardened by aeons in the Nether, and their wounds close alarmingly fast. Only relentless, overwhelming firepower keeps them down.",
    weakness: "Poison or burn DoT (damage over time) that bypasses regeneration.",
    tip: "Apply burn (🔮 Mage Lv3+ or Doomcannon) to nullify their regeneration. Combine with a 💣 Cannon barrage for a lethal DoT-DPS combo.",
    counters: ["mage", "doomcannon", "venomCrossbow"],
    threat: 4,
  },
  golem: {
    name: "Golem", emoji: "🪨", land: 3, landName: "Volcanic Wastes",
    landEmoji: "🌋", rarity: "rare",
    hp: 500, speed: 0.5, reward: 80,
    lore: "Living fortresses assembled from volcanic basalt, Golems trudge forward impervious to most conventional weapons. Their stone skin deflects arrows. Their only weakness: the glowing lava core visible in their chest.",
    weakness: "Armour-breaking weapons and siege-class splash.",
    tip: "Deploy your heaviest siege: ⚙️ Siege Engine or 💥 Doomsday Cannon. The Armorbreak ability is mandatory — without it, you barely scratch a Golem.",
    counters: ["doomcannon", "siegeEngine", "warMachine"],
    threat: 5,
  },

  // ── Land 4: Frozen Abyss ─────────────────────────────────────────────
  iceWalker: {
    name: "Ice Walker", emoji: "❄️", land: 4, landName: "Frozen Abyss",
    landEmoji: "❄️", rarity: "common",
    hp: 180, speed: 1.7, reward: 48,
    lore: "Humanoid creatures adapted to the perpetual blizzard of the Frozen Abyss. They skate across ice at dangerous speeds and carry enchanted spears that pierce through tower barriers.",
    weakness: "Fire-based and rapid-fire towers.",
    tip: "Ice Walkers are fast but fragile. A 🏹 Arrow Storm or upgraded ⚡ Storm Archer with rapid fire can intercept them before they pass your cluster.",
    counters: ["arrowStorm", "stormArcher", "thunderArcher"],
    threat: 3,
  },
  specter: {
    name: "Specter", emoji: "🌫️", land: 4, landName: "Frozen Abyss",
    landEmoji: "❄️", rarity: "uncommon",
    hp: 150, speed: 2.0, reward: 45,
    lore: "The fastest entity in Malgrath's army. Specters are barely visible — a shimmer of cold air and a faint shriek. They blow through gaps in your defences before towers can even track them.",
    weakness: "Area denial and freeze effects.",
    tip: "This is where ❄️ Blizzard Tower earns its keep. A freeze (Frost Lv4 ability) or the Frost Nova active ability stops Specters dead. Pair with a fast-firing crossbow.",
    counters: ["blizzardTower", "frost", "frostStorm"],
    threat: 4,
  },
  shadow: {
    name: "Shadow", emoji: "🌑", land: 4, landName: "Frozen Abyss",
    landEmoji: "❄️", rarity: "rare",
    hp: 400, speed: 1.3, reward: 70,
    lore: "Manifestations of pure darkness given terrible purpose. Shadows absorb light and hope alike. Their semi-material form makes physical strikes feel like fighting smoke — you must destroy the darkness within.",
    weakness: "Magical and arcane damage.",
    tip: "🔮 Mage and its merges (Shadow Mage, Void Cannon) deal arcane damage that cuts through Shadows' physical resistance. Void Cannon is the ideal counter.",
    counters: ["mage", "shadowMage", "voidCannon"],
    threat: 4,
  },
  frostGiant: {
    name: "Frost Giant", emoji: "🧊", land: 4, landName: "Frozen Abyss",
    landEmoji: "❄️", rarity: "epic",
    hp: 650, speed: 0.55, reward: 95,
    lore: "Ancient giants entombed in glacial ice for millennia, now thawed and furious. A Frost Giant's hide is reinforced with natural permafrost armour six feet thick. Even siege engines bounce off at first.",
    weakness: "Armour-break + sustained DPS over multiple towers.",
    tip: "Stagger your damage: one 💥 Doomcannon strips the armour, then a 🔮 Arcane Siege or ⚙️ Siege Engine deals the real damage. Never rely on a single tower.",
    counters: ["doomcannon", "arcaneSiege", "siegeEngine"],
    threat: 5,
  },

  // ── Land 5: Shadow Realm ─────────────────────────────────────────────
  voidling: {
    name: "Voidling", emoji: "🕳️", land: 5, landName: "Shadow Realm",
    landEmoji: "💀", rarity: "rare",
    hp: 300, speed: 1.6, reward: 75,
    lore: "Spawn of the void itself. Voidlings are the Shadow Sovereign's foot soldiers — birthed in their thousands from the tears in reality that scar the Shadow Realm. They hunger for life energy above all else.",
    weakness: "AoE splash and rapid fire.",
    tip: "They come in huge numbers. Pre-build your ⚙️ Siege Engine + 💥 Doomcannon combo before wave 21. Active abilities like Rain of Arrows clear entire screens of Voidlings.",
    counters: ["doomcannon", "siegeEngine", "arcaneSiege"],
    threat: 4,
  },
  soulReaper: {
    name: "Soul Reaper", emoji: "⛓️", land: 5, landName: "Shadow Realm",
    landEmoji: "💀", rarity: "epic",
    hp: 500, speed: 1.1, reward: 110,
    lore: "The executioners of the Shadow Sovereign, Soul Reapers drag chains of bound spirits behind them. Each chain counts as additional HP — the spirits scream when struck, absorbing damage meant for their master.",
    weakness: "Chain-lightning and multi-hit attacks strip their spirit shields.",
    tip: "🔮 Spellcaster with chain lightning hits both the Reaper AND its spirit chains simultaneously. Void Cannon's AoE burst is also highly effective.",
    counters: ["spellcaster", "voidCannon", "arcaneCannoneer"],
    threat: 5,
  },
  doomKnight: {
    name: "Doom Knight", emoji: "🏚️", land: 5, landName: "Shadow Realm",
    landEmoji: "💀", rarity: "epic",
    hp: 800, speed: 0.85, reward: 140,
    lore: "Once the greatest paladins of Eldenmoor — now utterly corrupted. Their former holy armour has fused with void-metal, becoming a shell that absorbs damage and reflects a portion back as despair.",
    weakness: "Void-type and magical damage bypasses reflected damage.",
    tip: "🌀 Void Cannon is the direct counter — void damage ignores the reflection. Supplement with a 🔮 Arcane Siege. Activate Void Wrath ability for triple damage if you have it.",
    counters: ["voidCannon", "arcaneSiege", "mage"],
    threat: 5,
  },
  abyssLord: {
    name: "Abyss Lord", emoji: "🌀", land: 5, landName: "Shadow Realm",
    landEmoji: "💀", rarity: "legendary",
    hp: 1000, speed: 0.7, reward: 180,
    lore: "Sub-commanders of the Shadow Sovereign, Abyss Lords command entire legions through sheer psychic dominance. Their physical form is a nexus of void energy — destroying them requires sustained assault from multiple angles.",
    weakness: "Sustained multi-tower cross-fire.",
    tip: "No single tower kills an Abyss Lord quickly enough. Build overlapping kill zones with your entire arsenal. Use Earthquake ability to freeze them, then unload everything. This is the ultimate test of your layout.",
    counters: ["doomcannon", "voidCannon", "arcaneSiege", "doomSiege"],
    threat: 5,
  },

  // ── Bosses ───────────────────────────────────────────────────────────
  boss_meadow: {
    name: "Forest Drake", emoji: "🐉", land: 1, landName: "Verdant Meadow",
    landEmoji: "🌿", rarity: "boss",
    hp: 1200, speed: 0.7, reward: 300,
    lore: "The ancient guardian of the Verdant Meadow, the Forest Drake was old when Eldenmoor was young. Malgrath's corruption twisted its noble nature into feral fury. Its scales are three inches thick and still hold the memory of sunlight.",
    weakness: "Concentrated single-target DPS. It enrages at 50% HP — prepare your best towers before it crosses half health.",
    tip: "Save upgraded Cannons (Lv3+) for the Drake. When it enrages, activate Tower Overcharge ability if you have it. A Ballista or Warcannon placed at the longest straight path segment maximises damage windows.",
    counters: ["warcannon", "doomcannon", "ballista"],
    threat: 5, isBoss: true,
  },
  boss_dungeon: {
    name: "Dungeon Overlord", emoji: "🧟", land: 2, landName: "Dark Dungeon",
    landEmoji: "🪨", rarity: "boss",
    hp: 2200, speed: 0.6, reward: 550,
    lore: "The Dungeon Overlord has ruled the deep dark for ten thousand years. It is not truly alive — it is an accumulation of necromantic will given physical form. Every warrior it has ever slain walks in its wake as memory.",
    weakness: "Magical damage and burn DoT. The Overlord's necrotic form is sustained by dark energy — fire disrupts the binding.",
    tip: "🔮 Mage towers at max level or a Void Cannon deal massive damage. Burn effects (Doomcannon Lv3) stack beautifully. Enrages twice — at 60% and 30% HP. Use active abilities (Meteor Strike) on the second rage.",
    counters: ["voidCannon", "doomcannon", "spellcaster"],
    threat: 5, isBoss: true,
  },
  boss_volcano: {
    name: "Flame Titan", emoji: "🔥", land: 3, landName: "Volcanic Wastes",
    landEmoji: "🌋", rarity: "boss",
    hp: 4000, speed: 0.5, reward: 900,
    lore: "Born in the birth-cry of the world's youngest volcano, the Flame Titan is geology made wrathful. Its footsteps melt stone. Its breath is a river of magma. It has never been wounded — until today.",
    weakness: "Armour-breaking siege weapons that penetrate its volcanic hide. Physical damage bypasses fire resistance.",
    tip: "Avoid Frost towers (evaporate on contact). Stack 💥 Doomcannons with Armorbreak. Use Siege Engine + War Machine overlapping kill zone. Activate Void Wrath at 50% HP for triple-damage burst.",
    counters: ["doomcannon", "siegeEngine", "warMachine"],
    threat: 5, isBoss: true,
  },
  boss_abyss: {
    name: "Frost Colossus", emoji: "❄️", land: 4, landName: "Frozen Abyss",
    landEmoji: "❄️", rarity: "boss",
    hp: 6500, speed: 0.45, reward: 1500,
    lore: "A colossus of living glacial ice, the Frost Colossus predates recorded history. It moves with the unhurried confidence of something that has never known defeat. Its touch flash-freezes anything it contacts.",
    weakness: "Magical, arcane, and void damage. Physical projectiles shatter on its ice shell without penetrating.",
    tip: "This is Mage territory. 🔮 Arcane Siege, Void Cannon, and Spellcaster (chain lightning hits the colossus AND nearby ice shards). Use Frost Nova active ability — ironically, it slows the Colossus further. Enrages 3 times.",
    counters: ["arcaneSiege", "voidCannon", "spellcaster"],
    threat: 5, isBoss: true,
  },
  boss_shadow: {
    name: "Shadow Sovereign", emoji: "💀", land: 5, landName: "Shadow Realm",
    landEmoji: "💀", rarity: "boss",
    hp: 10000, speed: 0.4, reward: 2500,
    lore: "The Shadow Sovereign is not Malgrath — it is what Malgrath worships. An ancient entity older than light, it arrived at the boundary of reality and found it… thin. It will not stop until all warmth and memory are extinguished.",
    weakness: "Everything, at once, without pause. The Sovereign has no elemental weakness — only overwhelming, sustained firepower from all towers simultaneously.",
    tip: "Activate ALL active abilities at once. Void Wrath + Tower Overcharge + Meteor Strike in rapid succession. Use Earthquake to freeze it during the 70%, 50%, 30%, and 10% rage thresholds. Your entire army must fire without pause.",
    counters: ["doomSiege", "voidCannon", "arcaneSiege", "doomcannon"],
    threat: 5, isBoss: true,
  },
};

const RARITY_STYLES = {
  common:    { label: "Common",    bg: "rgba(100,100,100,0.2)",  border: "#555",   text: "#aaa",   glow: "rgba(150,150,150,0.3)" },
  uncommon:  { label: "Uncommon",  bg: "rgba(34,197,94,0.12)",   border: "#166534",text: "#4ade80", glow: "rgba(34,197,94,0.3)"  },
  rare:      { label: "Rare",      bg: "rgba(59,130,246,0.12)",  border: "#1e3a8a",text: "#60a5fa", glow: "rgba(59,130,246,0.3)" },
  epic:      { label: "Epic",      bg: "rgba(168,85,247,0.15)",  border: "#4c1d95",text: "#c084fc", glow: "rgba(168,85,247,0.4)" },
  legendary: { label: "Legendary", bg: "rgba(251,191,36,0.15)",  border: "#78350f",text: "#fbbf24", glow: "rgba(251,191,36,0.5)" },
  boss:      { label: "Boss",      bg: "rgba(239,68,68,0.15)",   border: "#7f1d1d",text: "#f87171", glow: "rgba(239,68,68,0.5)"  },
};

const LAND_GROUPS = [
  { id: 1, name: "Verdant Meadow", emoji: "🌿", color: "#22c55e", waves: "1–5" },
  { id: 2, name: "Dark Dungeon",   emoji: "🪨", color: "#6366f1", waves: "6–10" },
  { id: 3, name: "Volcanic Wastes",emoji: "🌋", color: "#f97316", waves: "11–15" },
  { id: 4, name: "Frozen Abyss",   emoji: "❄️", color: "#60a5fa", waves: "16–20" },
  { id: 5, name: "Shadow Realm",   emoji: "💀", color: "#a855f7", waves: "21–25" },
];

const THREAT_BAR = (n) => (
  <div className="flex gap-0.5">
    {[1,2,3,4,5].map(i => (
      <div key={i} className="w-3 h-2 rounded-sm" style={{
        background: i <= n ? (n >= 5 ? "#ef4444" : n >= 4 ? "#f97316" : n >= 3 ? "#eab308" : "#22c55e") : "#1f1a30",
      }} />
    ))}
  </div>
);

function EntryCard({ entry, onClick, unlocked }) {
  const r = RARITY_STYLES[entry.rarity];
  return (
    <button
      onClick={() => unlocked && onClick(entry)}
      className="relative flex flex-col items-center gap-1 p-2 rounded-xl transition-all text-center"
      style={{
        background: unlocked ? r.bg : "rgba(10,8,20,0.6)",
        border: `1.5px solid ${unlocked ? r.border : "#1a1530"}`,
        boxShadow: unlocked ? `0 0 12px ${r.glow}` : "none",
        cursor: unlocked ? "pointer" : "default",
        opacity: unlocked ? 1 : 0.4,
      }}>
      <div className="text-2xl" style={{ filter: unlocked ? `drop-shadow(0 0 6px ${r.glow})` : "grayscale(1) brightness(0.3)" }}>
        {unlocked ? entry.emoji : "❓"}
      </div>
      <div className="text-[9px] font-bold leading-tight" style={{ color: unlocked ? r.text : "#2a2040" }}>
        {unlocked ? entry.name : "???"}
      </div>
      {unlocked && entry.isBoss && (
        <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center"
          style={{ background: "#ef4444", fontSize: 7, fontWeight: 900 }}>👑</div>
      )}
      {!unlocked && (
        <Lock className="w-3 h-3 absolute top-1.5 right-1.5" style={{ color: "#2a2040" }} />
      )}
    </button>
  );
}

function EntryDetail({ entry, onClose }) {
  const r = RARITY_STYLES[entry.rarity];
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4 pb-4" style={{ borderBottom: `1px solid ${r.border}` }}>
        <div className="text-5xl flex-shrink-0" style={{ filter: `drop-shadow(0 0 14px ${r.glow})` }}>
          {entry.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h2 className="text-lg font-black" style={{ fontFamily: "'Cinzel', serif", color: "#fff" }}>{entry.name}</h2>
            <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
              style={{ background: r.bg, border: `1px solid ${r.border}`, color: r.text }}>
              {r.label}
            </span>
          </div>
          <div className="text-xs font-semibold mb-2" style={{ color: r.text }}>
            {entry.landEmoji} {entry.landName} · Waves {["","1–5","6–10","11–15","16–20","21–25"][entry.land]}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-500">Threat:</span>
            {THREAT_BAR(entry.threat)}
          </div>
        </div>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/5">
          <X className="w-4 h-4 text-slate-500" />
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { icon: "❤️", label: "Base HP", value: entry.hp.toLocaleString() },
          { icon: "💨", label: "Speed", value: `${entry.speed}×` },
          { icon: "💰", label: "Reward", value: `${entry.reward}g` },
        ].map(s => (
          <div key={s.label} className="rounded-xl p-2 text-center"
            style={{ background: "rgba(30,20,50,0.6)", border: "1px solid rgba(100,80,160,0.25)" }}>
            <div className="text-base mb-0.5">{s.icon}</div>
            <div className="text-xs font-black text-white">{s.value}</div>
            <div className="text-[9px]" style={{ color: "#5a4880" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Lore */}
      <div className="rounded-xl p-3 mb-3"
        style={{ background: "rgba(15,10,30,0.7)", border: `1px solid ${r.border}` }}>
        <div className="flex items-center gap-1.5 mb-2">
          <BookOpen className="w-3 h-3" style={{ color: r.text }} />
          <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: r.text }}>Lore</span>
        </div>
        <p className="text-xs leading-relaxed italic" style={{ color: "#c0b0d8", fontFamily: "'Cinzel', serif" }}>
          "{entry.lore}"
        </p>
      </div>

      {/* Weakness */}
      <div className="rounded-xl p-3 mb-3"
        style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)" }}>
        <div className="flex items-center gap-1.5 mb-1">
          <Swords className="w-3 h-3 text-red-400" />
          <span className="text-[10px] font-black uppercase tracking-widest text-red-400">Weakness</span>
        </div>
        <p className="text-xs" style={{ color: "#fca5a5" }}>{entry.weakness}</p>
      </div>

      {/* Strategy Tip */}
      <div className="rounded-xl p-3"
        style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.25)" }}>
        <div className="flex items-center gap-1.5 mb-1">
          <Star className="w-3 h-3 text-yellow-400" />
          <span className="text-[10px] font-black uppercase tracking-widest text-yellow-400">Strategy Tip</span>
        </div>
        <p className="text-xs leading-relaxed" style={{ color: "#fde68a" }}>{entry.tip}</p>
      </div>
    </div>
  );
}

export default function CodexModal({ show, onClose, seenEnemies }) {
  const [selectedLand, setSelectedLand] = useState(1);
  const [selectedEntry, setSelectedEntry] = useState(null);

  if (!show) return null;

  const allKeys = Object.keys(CODEX_ENTRIES);
  const landKeys = allKeys.filter(k => CODEX_ENTRIES[k].land === selectedLand);
  const bossKeys = allKeys.filter(k => CODEX_ENTRIES[k].isBoss && CODEX_ENTRIES[k].land === selectedLand);
  const regularKeys = landKeys.filter(k => !CODEX_ENTRIES[k].isBoss);

  const totalUnlocked = allKeys.filter(k => seenEnemies.has(k)).length;
  const totalEntries = allKeys.length;

  return (
    <div className="fixed inset-0 z-[180] flex items-center justify-center p-3"
      style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(6px)" }}>
      <div className="w-full max-w-3xl h-[90vh] max-h-[680px] flex flex-col rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #0d0a1e, #08050f)",
          border: "2px solid rgba(100,60,200,0.5)",
          boxShadow: "0 0 60px rgba(100,60,200,0.2), 0 8px 0 #020108",
        }}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(100,60,200,0.3)", background: "rgba(20,10,40,0.8)" }}>
          <div className="flex items-center gap-3">
            <div className="text-2xl">📖</div>
            <div>
              <h1 className="text-base font-black uppercase tracking-widest" style={{ fontFamily: "'Cinzel Decorative', serif", color: "#c4b5fd" }}>
                Monster Codex
              </h1>
              <p className="text-[9px] uppercase tracking-widest" style={{ color: "#4a3870" }}>
                {totalUnlocked} / {totalEntries} Entries Unlocked
              </p>
            </div>
          </div>
          {/* Progress bar */}
          <div className="flex-1 mx-6 hidden sm:block">
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#1a1030" }}>
              <div className="h-full rounded-full transition-all duration-500"
                style={{ width: `${(totalUnlocked / totalEntries) * 100}%`, background: "linear-gradient(90deg, #7c3aed, #c084fc)" }} />
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-white/5 transition-all">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Land selector sidebar */}
          <div className="w-28 flex-shrink-0 flex flex-col gap-1 p-2 overflow-y-auto"
            style={{ borderRight: "1px solid rgba(100,60,200,0.2)", background: "rgba(10,6,20,0.6)" }}>
            {LAND_GROUPS.map(land => {
              const landTotal = allKeys.filter(k => CODEX_ENTRIES[k].land === land.id).length;
              const landUnlocked = allKeys.filter(k => CODEX_ENTRIES[k].land === land.id && seenEnemies.has(k)).length;
              const isActive = selectedLand === land.id;
              return (
                <button key={land.id} onClick={() => { setSelectedLand(land.id); setSelectedEntry(null); }}
                  className="flex flex-col items-center gap-1 p-2 rounded-xl transition-all text-center"
                  style={{
                    background: isActive ? `rgba(${land.color.slice(1).match(/../g).map(x=>parseInt(x,16)).join(",")},0.15)` : "transparent",
                    border: `1.5px solid ${isActive ? land.color + "66" : "transparent"}`,
                  }}>
                  <span className="text-xl">{land.emoji}</span>
                  <span className="text-[8px] font-bold leading-tight" style={{ color: isActive ? land.color : "#4a3870" }}>
                    {land.name}
                  </span>
                  <span className="text-[8px]" style={{ color: "#3a2860" }}>{landUnlocked}/{landTotal}</span>
                </button>
              );
            })}
          </div>

          {/* Main content */}
          <div className="flex-1 flex overflow-hidden">
            {/* Entry grid */}
            <div className="w-48 flex-shrink-0 p-3 overflow-y-auto" style={{ borderRight: "1px solid rgba(100,60,200,0.15)" }}>
              {/* Regular enemies */}
              <div className="text-[9px] font-black uppercase tracking-widest mb-2" style={{ color: "#4a3870" }}>Enemies</div>
              <div className="grid grid-cols-3 gap-1.5 mb-4">
                {regularKeys.map(k => (
                  <EntryCard key={k} entry={CODEX_ENTRIES[k]}
                    unlocked={seenEnemies.has(k)}
                    onClick={setSelectedEntry} />
                ))}
              </div>
              {/* Bosses */}
              {bossKeys.length > 0 && (
                <>
                  <div className="text-[9px] font-black uppercase tracking-widest mb-2" style={{ color: "#7f1d1d" }}>Boss</div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {bossKeys.map(k => (
                      <EntryCard key={k} entry={CODEX_ENTRIES[k]}
                        unlocked={seenEnemies.has(k)}
                        onClick={setSelectedEntry} />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Detail panel */}
            <div className="flex-1 p-4 overflow-y-auto">
              {selectedEntry ? (
                <EntryDetail entry={selectedEntry} onClose={() => setSelectedEntry(null)} />
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center gap-3">
                  <div className="text-4xl opacity-20">📖</div>
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#3a2860" }}>
                    Select an entry to read its lore
                  </p>
                  <p className="text-[9px]" style={{ color: "#2a1850" }}>
                    Encounter enemies in battle to unlock their secrets
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export the full entry list so Game.jsx can track keys
export { CODEX_ENTRIES };