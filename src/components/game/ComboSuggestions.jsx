import { useState } from "react";
import { ChevronDown, ChevronUp, Swords } from "lucide-react";

const TIER_STYLES = {
  MERGE: { bg: "rgba(60,40,10,0.5)",   border: "rgba(180,120,40,0.35)",  label: "bg-amber-900/60 text-amber-300",   dot: "#d97706" },
  NEW:   { bg: "rgba(20,10,60,0.5)",   border: "rgba(120,80,220,0.4)",   label: "bg-indigo-900/60 text-indigo-300", dot: "#818cf8" },
  EPIC:  { bg: "rgba(10,30,60,0.6)",   border: "rgba(56,189,248,0.45)",  label: "bg-sky-900/60 text-sky-200",       dot: "#38bdf8" },
  MEGA:  { bg: "rgba(60,10,10,0.5)",   border: "rgba(200,40,40,0.4)",    label: "bg-red-900/60 text-red-300",       dot: "#f87171" },
  ULTRA: { bg: "rgba(80,5,80,0.6)",    border: "rgba(200,60,240,0.55)",  label: "bg-purple-900/60 text-purple-200", dot: "#e879f9" },
  LEGEND:{ bg: "rgba(30,0,60,0.7)",    border: "rgba(255,214,10,0.6)",   label: "bg-yellow-900/60 text-yellow-200", dot: "#ffd60a" },
};

// All names match exactly what appears in the game (tower names from gameEngine.js TOWER_TYPES)
const COMBOS = [
  // ── Basic Merges (base towers only) ────────────────────────────────────
  { a: "🧝 Archer Tower",   b: "💣 Cannon Tower",    result: "🎯 Siege Ballista",     resultDesc: "Fast & devastating",             color: "#fbbf24", tier: "MERGE" },
  { a: "💣 Cannon Tower",   b: "💣 Cannon Tower",    result: "🔴 War Cannon",          resultDesc: "Brutal heavy fire",              color: "#f87171", tier: "MERGE" },
  { a: "🧝 Archer Tower",   b: "🧝 Archer Tower",   result: "🧝⚡ Storm Archer",       resultDesc: "Lightning-fast volley",          color: "#fde68a", tier: "MERGE" },
  { a: "🏹 Crossbow Tower", b: "🧝 Archer Tower",   result: "🏹⚡ Arrow Storm",        resultDesc: "Rapid bolt volley",              color: "#fde68a", tier: "MERGE" },
  { a: "🏹 Crossbow Tower", b: "🏹 Crossbow Tower", result: "🏹🏹 Twin Crossbow",      resultDesc: "Double rapid-fire poison bolts", color: "#84cc16", tier: "MERGE" },
  { a: "💣 Cannon Tower",   b: "⚙️ Trebuchet",      result: "⚙️ Siege Engine",        resultDesc: "Ultimate siege power",           color: "#fdba74", tier: "MERGE" },
  { a: "💣 Cannon Tower",   b: "🪨 Catapult",       result: "💣🪨 War Machine",        resultDesc: "Heavy barrage",                  color: "#fcd34d", tier: "MERGE" },
  { a: "🔮 Mage Tower",     b: "🔮 Mage Tower",     result: "🌀 Spellcaster",          resultDesc: "Arcane barrage",                 color: "#c4b5fd", tier: "MERGE" },
  { a: "🔮 Mage Tower",     b: "❄️ Frost Tower",    result: "🧊 Frozen Mage",          resultDesc: "Slows & deals magic dmg",        color: "#67e8f9", tier: "MERGE" },
  { a: "🔮 Mage Tower",     b: "💣 Cannon Tower",   result: "🔵 Arcane Cannoneer",     resultDesc: "Heavy arcane shells",            color: "#d8b4fe", tier: "MERGE" },
  { a: "❄️ Frost Tower",    b: "❄️ Frost Tower",    result: "❄️🌀 Blizzard Tower",    resultDesc: "Powerful AoE slow",              color: "#7dd3fc", tier: "MERGE" },
  { a: "❄️ Frost Tower",    b: "💣 Cannon Tower",   result: "🧊💣 Frost Cannoneer",    resultDesc: "Freezing heavy shells",          color: "#93c5fd", tier: "MERGE" },

  // ── Advanced Merges ─────────────────────────────────────────────────────
  { a: "⚙️ Trebuchet",      b: "🪨 Catapult",        result: "🔥⚙️ Inferno Trebuchet", resultDesc: "Volcanic long-range siege",      color: "#fca5a5", tier: "NEW"   },
  { a: "🔮 Mage Tower",     b: "🧝 Archer Tower",    result: "🌑🔮 Shadow Mage",        resultDesc: "Poison & slow bolts",            color: "#a5b4fc", tier: "NEW"   },
  { a: "🔮 Mage Tower",     b: "🔴 War Cannon",      result: "🌀💣 Void Cannon",        resultDesc: "Arcane void explosions",         color: "#c084fc", tier: "NEW"   },
  { a: "🧝⚡ Storm Archer",  b: "🔮 Mage Tower",     result: "⚡🏹 Thunder Archer",     resultDesc: "Lightning chain volley",         color: "#fef08a", tier: "NEW"   },
  { a: "🏹 Crossbow Tower", b: "🔮 Mage Tower",      result: "☠️🏹 Venom Crossbow",    resultDesc: "Rapid arcane poison bolts",      color: "#86efac", tier: "NEW"   },
  { a: "🌀 Spellcaster",    b: "⚙️ Trebuchet",       result: "🌀⚙️ Arcane Siege",      resultDesc: "Arcane boulders with AoE",      color: "#e879f9", tier: "NEW"   },
  { a: "❄️ Frost Tower",    b: "🎯 Siege Ballista",  result: "🧊🎯 Glacial Ballista",   resultDesc: "Freezing piercing bolts",        color: "#a5f3fc", tier: "NEW"   },
  { a: "❄️🌀 Blizzard Tower",b: "🏹⚡ Arrow Storm",   result: "❄️⚡ Frost Storm",        resultDesc: "Freezing rapid volley",         color: "#bae6fd", tier: "NEW"   },

  // ── Epic Merges ─────────────────────────────────────────────────────────
  { a: "🧝⚡ Storm Archer",  b: "❄️ Frost Tower",    result: "👻🏹 Phantom Archer",     resultDesc: "Ghost arrows phasing armor",     color: "#c084fc", tier: "EPIC"  },
  { a: "☠️🏹 Venom Crossbow",b: "🎯 Siege Ballista", result: "☠️🎯 Plague Ballista",    resultDesc: "Plague-tipped piercing bolts",   color: "#4ade80", tier: "EPIC"  },
  { a: "🧊💣 Frost Cannoneer",b:"💣🪨 War Machine",  result: "🧊🔥 Frostfire Cannon",   resultDesc: "Alternates freeze and burn",     color: "#38bdf8", tier: "EPIC"  },
  { a: "🔵 Arcane Cannoneer",b: "🌑🔮 Shadow Mage",  result: "💀🔮 Soul Reaper Tower",  resultDesc: "Harvests souls for bonus dmg",   color: "#fb7185", tier: "EPIC"  },
  { a: "⚙️ Siege Engine",   b: "⚡🏹 Thunder Archer", result: "⚡⚙️ Tempest Engine",    resultDesc: "Thunderstorm siege weapon",      color: "#facc15", tier: "EPIC"  },
  { a: "🌑🔮 Shadow Mage",   b: "🌀💣 Void Cannon",  result: "🕳️🔮 Abyssal Mage",      resultDesc: "Dark matter obliteration blasts",color: "#6d28d9", tier: "EPIC"  },
  { a: "🧊🎯 Glacial Ballista",b:"⚡🏹 Thunder Archer",result: "✨🎯 Celestial Ballista", resultDesc: "Divine light piercing bolts",    color: "#fde68a", tier: "EPIC"  },

  // ── Mega Merges ─────────────────────────────────────────────────────────
  { a: "🔴 War Cannon",     b: "🎯 Siege Ballista",  result: "💥 Homelander",           resultDesc: "The ultimate destroyer",         color: "#fca5a5", tier: "MEGA"  },
  { a: "💥 Homelander",     b: "💣🪨 War Machine",   result: "💀💣 Ruin Cannon",         resultDesc: "Catastrophic ground devastation",color: "#f43f5e", tier: "MEGA"  },
  { a: "🌀💣 Void Cannon",  b: "💥 Homelander",      result: "🔴🔮 Crimson Spire",       resultDesc: "Crimson void destruction",       color: "#dc2626", tier: "MEGA"  },
  { a: "🔥⚙️ Inferno Trebuchet",b:"❄️⚡ Frost Storm", result: "⚡🪨 Storm Siege",        resultDesc: "Blizzard and lightning siege",   color: "#e0f2fe", tier: "MEGA"  },

  // ── Ultra / Legend Merges ───────────────────────────────────────────────
  { a: "⚙️ Siege Engine",   b: "💥 Homelander",      result: "💥⚙️ Doom Siege",         resultDesc: "Total annihilation engine",      color: "#fda4af", tier: "ULTRA" },
  { a: "💥⚙️ Doom Siege",   b: "🌀⚙️ Arcane Siege",  result: "🌀⚙️ Void Siege",         resultDesc: "Ultimate arcane siege behemoth", color: "#e879f9", tier: "LEGEND"},
];

const TIER_GROUPS = ["LEGEND", "ULTRA", "MEGA", "EPIC", "NEW", "MERGE"];
const GROUP_LABELS = {
  LEGEND: "👑 Legend Merges",
  ULTRA:  "⚠ Ultra Merges",
  MEGA:   "💥 Mega Merges",
  EPIC:   "🌟 Epic Merges",
  NEW:    "✨ Advanced Merges",
  MERGE:  "⚙ Basic Merges",
};

export default function ComboSuggestions() {
  const [open, setOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState("MERGE");

  const filtered = COMBOS.filter(c => c.tier === activeGroup);

  return (
    <div className="mt-4">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg border transition-all text-left"
        style={{ background: "rgba(30,15,5,0.7)", border: "1px solid rgba(180,120,40,0.3)" }}
      >
        <div className="flex items-center gap-2">
          <Swords className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-black text-amber-200 uppercase tracking-widest">Merge Recipes</span>
          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-900/50 text-amber-400 font-bold">{COMBOS.length}</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-amber-600" /> : <ChevronDown className="w-4 h-4 text-amber-600" />}
      </button>

      {open && (
        <div className="mt-2" style={{ background: "rgba(8,4,2,0.9)", border: "1px solid rgba(100,60,20,0.4)", borderRadius: 10, overflow: "hidden" }}>
          {/* Tier tabs */}
          <div className="flex border-b" style={{ borderColor: "rgba(80,50,10,0.4)" }}>
            {TIER_GROUPS.map(tier => {
              const ts = TIER_STYLES[tier];
              const isActive = activeGroup === tier;
              return (
                <button
                  key={tier}
                  onClick={() => setActiveGroup(tier)}
                  className="flex-1 py-1.5 text-[9px] font-black uppercase tracking-wider transition-all"
                  style={{
                    background: isActive ? ts.bg : "transparent",
                    borderBottom: isActive ? `2px solid ${ts.dot}` : "2px solid transparent",
                    color: isActive ? ts.dot : "rgba(120,100,80,0.7)",
                  }}
                >
                  {tier}
                </button>
              );
            })}
          </div>

          {/* Group label */}
          <div className="px-3 pt-2.5 pb-1">
            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: TIER_STYLES[activeGroup].dot, opacity: 0.7 }}>
              {GROUP_LABELS[activeGroup]}
            </p>
          </div>

          {/* Recipe list */}
          <div className="px-2 pb-2 flex flex-col gap-1.5 max-h-64 overflow-y-auto">
            {filtered.map((combo, i) => {
              const ts = TIER_STYLES[combo.tier];
              return (
                <div key={i} className="rounded-lg p-2.5" style={{ background: ts.bg, border: `1px solid ${ts.border}` }}>
                  {/* Ingredients row */}
                  <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                    <span className="text-xs font-bold text-stone-200 whitespace-nowrap">{combo.a}</span>
                    <span className="text-[10px] text-stone-500 font-black">+</span>
                    <span className="text-xs font-bold text-stone-200 whitespace-nowrap">{combo.b}</span>
                  </div>
                  {/* Arrow + result */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-black" style={{ color: ts.dot }}>→</span>
                    <span className="text-xs font-black whitespace-nowrap" style={{ color: combo.color }}>{combo.result}</span>
                  </div>
                  {/* Description */}
                  <p className="text-[10px] mt-1 leading-relaxed" style={{ color: "rgba(180,160,140,0.7)" }}>{combo.resultDesc}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}