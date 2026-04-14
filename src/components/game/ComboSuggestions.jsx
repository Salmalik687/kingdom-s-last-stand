import { useState } from "react";
import { ChevronDown, ChevronUp, Lightbulb } from "lucide-react";

const COMBOS = [
  {
    towers: ["🏹", "💣"],
    name: "Explosive Arrows",
    desc: "Archer + Cannon — rapid fire with heavy impact. Archers weaken armor, cannon finishes off clusters.",
    bonus: "+burst damage",
    color: "text-orange-400",
    border: "border-orange-900/40",
    bg: "bg-orange-950/20",
  },
  {
    towers: ["❄️", "🏹"],
    name: "Frozen Volley",
    desc: "Frost + Archer — freeze enemies in place, then shred them with arrows before they recover.",
    bonus: "+easy kills",
    color: "text-blue-400",
    border: "border-blue-900/40",
    bg: "bg-blue-950/20",
  },
  {
    towers: ["🔮", "💣"],
    name: "Arcane Bombardment",
    desc: "Mage + Cannon — magic debuffs reduce enemy defence, cannon deals maximum bonus damage.",
    bonus: "+magic burst",
    color: "text-purple-400",
    border: "border-purple-900/40",
    bg: "bg-purple-950/20",
  },
  {
    towers: ["❄️", "🔮"],
    name: "Glacial Curse",
    desc: "Frost + Mage — frost slows while mage continuously drains. Enemies rarely escape this lane.",
    bonus: "+zone control",
    color: "text-cyan-400",
    border: "border-cyan-900/40",
    bg: "bg-cyan-950/20",
  },
  {
    towers: ["🏹", "🔮", "💣"],
    name: "Trinity Siege",
    desc: "Archer + Mage + Cannon — the ultimate trio. Cover all damage types, no enemy type is safe.",
    bonus: "+full coverage",
    color: "text-yellow-400",
    border: "border-yellow-800/40",
    bg: "bg-yellow-950/20",
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
          <span className="text-xs font-semibold text-stone-300 uppercase tracking-widest">Combo Synergies</span>
        </div>
        {open ? <ChevronUp className="w-3.5 h-3.5 text-stone-500" /> : <ChevronDown className="w-3.5 h-3.5 text-stone-500" />}
      </button>

      {open && (
        <div className="mt-2 flex flex-col gap-2">
          {COMBOS.map((combo, i) => (
            <div key={i} className={`rounded border ${combo.border} ${combo.bg} p-2.5`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base">{combo.towers.join(" + ")}</span>
                <span className={`text-xs font-bold ${combo.color} truncate`}>{combo.name}</span>
                <span className="ml-auto text-[9px] text-stone-500 whitespace-nowrap">{combo.bonus}</span>
              </div>
              <p className="text-[10px] text-stone-500 leading-relaxed">{combo.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}