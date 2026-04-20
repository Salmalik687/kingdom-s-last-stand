import { useState } from "react";
import { ChevronDown, ChevronUp, Lightbulb } from "lucide-react";

const COMBOS = [
  // Cannon tree
  { towers: ["🧝","💣"],   name: "🎯 Siege Ballista",      desc: "Archer + Cannon",              color: "text-amber-300",  border: "border-amber-600/60",  bg: "bg-amber-950/30",  tier: "MERGE" },
  { towers: ["💣","💣"],   name: "🔴 War Cannon",           desc: "Cannon + Cannon",              color: "text-red-400",    border: "border-red-700/60",    bg: "bg-red-950/30",    tier: "MERGE" },
  { towers: ["🔴","🎯"],   name: "💥 Doomsday Cannon",      desc: "War Cannon + Ballista",        color: "text-rose-300",   border: "border-rose-600/60",   bg: "bg-rose-950/30",   tier: "MEGA"  },
  // Archer tree
  { towers: ["🧝","🧝"],   name: "⚡ Storm Archer",         desc: "Archer + Archer",              color: "text-yellow-300", border: "border-yellow-600/60", bg: "bg-yellow-950/30", tier: "MERGE" },
  { towers: ["🏹","🧝"],   name: "🏹⚡ Arrow Storm",        desc: "Crossbow + Archer",            color: "text-yellow-300", border: "border-yellow-600/60", bg: "bg-yellow-950/30", tier: "MERGE" },
  // Mage tree
  { towers: ["🔮","🔮"],   name: "🌀 Spellcaster",          desc: "Mage + Mage",                  color: "text-violet-300", border: "border-violet-600/60", bg: "bg-violet-950/30", tier: "MERGE" },
  { towers: ["🔮","❄️"],   name: "🧊 Frozen Mage",          desc: "Mage + Frost",                 color: "text-cyan-300",   border: "border-cyan-600/60",   bg: "bg-cyan-950/30",   tier: "MERGE" },
  { towers: ["🔮","💣"],   name: "🔯 Arcane Cannoneer",      desc: "Mage + Cannon",                color: "text-purple-300", border: "border-purple-600/60", bg: "bg-purple-950/30", tier: "MERGE" },
  { towers: ["🔮","🧝"],   name: "🌑🔮 Shadow Mage",        desc: "Mage + Archer",                color: "text-indigo-300", border: "border-indigo-600/60", bg: "bg-indigo-950/30", tier: "NEW"   },
  { towers: ["🔮","🔴"],   name: "🌀💣 Void Cannon",        desc: "Mage + War Cannon",            color: "text-purple-400", border: "border-purple-700/60", bg: "bg-purple-950/30", tier: "NEW"   },
  { towers: ["⚡","🔮"],   name: "⚡🧝 Thunder Archer",      desc: "Storm Archer + Mage",          color: "text-yellow-400", border: "border-yellow-700/60", bg: "bg-yellow-950/30", tier: "NEW"   },
  { towers: ["🔮","🏹"],   name: "☠️🏹 Venom Crossbow",     desc: "Crossbow + Mage",              color: "text-green-300",  border: "border-green-600/60",  bg: "bg-green-950/30",  tier: "NEW"   },
  { towers: ["🌀","⚙️"],   name: "🔯⚙️ Arcane Siege",       desc: "Spellcaster + Trebuchet",      color: "text-fuchsia-300",border: "border-fuchsia-600/60",bg: "bg-fuchsia-950/30",tier: "NEW"   },
  // Siege tree
  { towers: ["💣","⚙️"],   name: "⚙️🪨 Siege Engine",       desc: "Cannon + Trebuchet",           color: "text-orange-300", border: "border-orange-600/60", bg: "bg-orange-950/30", tier: "MERGE" },
  { towers: ["💣","🪨"],   name: "💣🪨 War Machine",         desc: "Cannon + Catapult",            color: "text-amber-300",  border: "border-amber-700/60",  bg: "bg-amber-950/30",  tier: "MERGE" },
  { towers: ["⚙️","🪨"],   name: "🔥⚙️ Inferno Trebuchet",  desc: "Trebuchet + Catapult",         color: "text-red-300",    border: "border-red-600/60",    bg: "bg-red-950/30",    tier: "NEW"   },
  { towers: ["💥","⚙️🪨"], name: "💥⚙️ Doom Siege",         desc: "Siege Engine + Doomsday Cannon",color:"text-rose-400",  border: "border-rose-700/60",   bg: "bg-rose-950/30",   tier: "ULTRA" },
  // Frost tree
  { towers: ["❄️","❄️"],   name: "❄️🌀 Blizzard Tower",     desc: "Frost + Frost",                color: "text-sky-300",    border: "border-sky-600/60",    bg: "bg-sky-950/30",    tier: "MERGE" },
  { towers: ["❄️","💣"],   name: "🧊💣 Frost Cannoneer",     desc: "Frost + Cannon",               color: "text-blue-300",   border: "border-blue-600/60",   bg: "bg-blue-950/30",   tier: "MERGE" },
  { towers: ["❄️","🎯"],   name: "🧊🎯 Glacial Ballista",    desc: "Frost + Ballista",             color: "text-cyan-400",   border: "border-cyan-700/60",   bg: "bg-cyan-950/30",   tier: "NEW"   },
  { towers: ["❄️🌀","🧝⚡"],name: "❄️⚡ Frost Storm",        desc: "Blizzard Tower + Arrow Storm", color: "text-sky-400",    border: "border-sky-700/60",    bg: "bg-sky-950/30",    tier: "NEW"   },
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
                <span className={`text-[10px] font-bold ${combo.color} truncate`}>→ {combo.name}</span>
                <span className={`ml-auto text-[8px] font-black whitespace-nowrap px-1.5 py-0.5 rounded-full ${
                  combo.tier === "ULTRA" ? "bg-rose-900/60 text-rose-300" :
                  combo.tier === "MEGA"  ? "bg-red-900/60 text-red-300" :
                  combo.tier === "NEW"   ? "bg-indigo-900/60 text-indigo-300" :
                  "text-stone-600"
                }`}>{combo.tier}</span>
              </div>
              <p className="text-[9px] text-stone-500 leading-relaxed">{combo.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}