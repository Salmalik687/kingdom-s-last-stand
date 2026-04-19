import { useState } from "react";
import { ChevronDown, ChevronUp, Lightbulb } from "lucide-react";

const COMBOS = [
  // Cannon tree
  {
    towers: ["🏹", "💣"],
    name: "⚡ MERGE → 🎯 Siege Ballista",
    desc: "Archer + Cannon → fast fire + heavy damage.",
    bonus: "MERGE",
    color: "text-amber-300",
    border: "border-amber-600/60",
    bg: "bg-amber-950/30",
  },
  {
    towers: ["💣", "💣"],
    name: "⚡ MERGE → 🔴 War Cannon",
    desc: "Cannon + Cannon → brutal double-heavy fire.",
    bonus: "MERGE",
    color: "text-red-400",
    border: "border-red-700/60",
    bg: "bg-red-950/30",
  },
  {
    towers: ["🔴", "🎯"],
    name: "⚡ MERGE → 💥 Doomsday Cannon",
    desc: "War Cannon + Ballista → ultimate destroyer.",
    bonus: "MEGA",
    color: "text-rose-300",
    border: "border-rose-600/60",
    bg: "bg-rose-950/30",
  },
  // Archer tree
  {
    towers: ["🏹", "🏹"],
    name: "⚡ MERGE → ⚡ Storm Archer",
    desc: "Archer + Archer → lightning-fast volley.",
    bonus: "MERGE",
    color: "text-yellow-300",
    border: "border-yellow-600/60",
    bg: "bg-yellow-950/30",
  },
  // Mage tree
  {
    towers: ["🔮", "🔮"],
    name: "⚡ MERGE → 🌀 Spellcaster",
    desc: "Mage + Mage → amplified arcane barrage with massive range.",
    bonus: "MERGE",
    color: "text-violet-300",
    border: "border-violet-600/60",
    bg: "bg-violet-950/30",
  },
  {
    towers: ["🔮", "❄️"],
    name: "⚡ MERGE → 🧊 Frozen Mage",
    desc: "Mage + Frost → slows and drains with magic ice.",
    bonus: "MERGE",
    color: "text-cyan-300",
    border: "border-cyan-600/60",
    bg: "bg-cyan-950/30",
  },
  {
    towers: ["🔮", "💣"],
    name: "⚡ MERGE → 🔯 Arcane Cannoneer",
    desc: "Mage + Cannon → heavy arcane shells with huge damage.",
    bonus: "MERGE",
    color: "text-purple-300",
    border: "border-purple-600/60",
    bg: "bg-purple-950/30",
  },
  // Medieval siege merges
  {
    towers: ["💣", "⚙️"],
    name: "⚡ MERGE → ⚙️🪨 Siege Engine",
    desc: "Cannon + Trebuchet → ultimate medieval siege power.",
    bonus: "MERGE",
    color: "text-orange-300",
    border: "border-orange-600/60",
    bg: "bg-orange-950/30",
  },
  {
    towers: ["💣", "🪨"],
    name: "⚡ MERGE → 💣🪨 War Machine",
    desc: "Cannon + Catapult → heavy stone barrage.",
    bonus: "MERGE",
    color: "text-amber-300",
    border: "border-amber-700/60",
    bg: "bg-amber-950/30",
  },
  {
    towers: ["🏹", "🏹"],
    name: "⚡ MERGE → 🏹⚡ Arrow Storm",
    desc: "Crossbow + Archer → lightning bolt volley.",
    bonus: "MERGE",
    color: "text-yellow-300",
    border: "border-yellow-600/60",
    bg: "bg-yellow-950/30",
  },
  // Frost tree
  {
    towers: ["❄️", "❄️"],
    name: "⚡ MERGE → ❄️🌀 Blizzard Tower",
    desc: "Frost + Frost → powerful AOE slow field.",
    bonus: "MERGE",
    color: "text-sky-300",
    border: "border-sky-600/60",
    bg: "bg-sky-950/30",
  },
  {
    towers: ["❄️", "💣"],
    name: "⚡ MERGE → 🧊💣 Frost Cannoneer",
    desc: "Frost + Cannon → heavy freezing shells.",
    bonus: "MERGE",
    color: "text-blue-300",
    border: "border-blue-600/60",
    bg: "bg-blue-950/30",
  },
];

export default function ComboSuggestions() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-3 py-2 rounded border border-stone-800/60 bg-stone-950/60 hover:bg-stone-900/60 transition-all text-left"
      >
        <div className="flex items-center gap-2">
          <Lightbulb className="w-3.5 h-3.5 text-yellow-600" />
          <span className="text-xs font-semibold text-stone-300 uppercase tracking-widest">Merge Recipes</span>
        </div>
        {open ? <ChevronUp className="w-3.5 h-3.5 text-stone-500" /> : <ChevronDown className="w-3.5 h-3.5 text-stone-500" />}
      </button>

      {open && (
        <div className="mt-2 flex flex-col gap-1.5 max-h-72 overflow-y-auto pr-0.5">
          {COMBOS.map((combo, i) => (
            <div key={i} className={`rounded border ${combo.border} ${combo.bg} p-2`}>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm">{combo.towers.join(" + ")}</span>
                <span className={`text-[10px] font-bold ${combo.color} truncate`}>{combo.name}</span>
                <span className="ml-auto text-[9px] text-stone-500 whitespace-nowrap">{combo.bonus}</span>
              </div>
              <p className="text-[9px] text-stone-500 leading-relaxed">{combo.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}