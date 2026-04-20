const ARMORS = [
  {
    id: "crimson_knight",
    name: "Crimson Knight",
    title: "Lord of the Scarlet Vow",
    emoji: "🛡️",
    preview: "⚔️",
    description: "Forged in dragonfire, bound by oath. The crimson plate of Eldenmoor's finest.",
    rarity: "Legendary",
    rarityColor: "#ff4444",
    accentColor: "#dc2626",
    glowColor: "#ff2222",
    borderColor: "#991b1b",
    bg: "linear-gradient(160deg, #3d0000, #1a0000)",
    badge: "🔥",
    stats: { defense: 5, speed: 3, power: 5 },
    parts: {
      helm: "🪖",
      chest: "🛡️",
      pauldrons: "⚔️",
      trim: "#dc2626",
      baseColor: "#7f1d1d",
      shineColor: "#ef4444",
    },
  },
  {
    id: "obsidian_warden",
    name: "Obsidian Warden",
    title: "Shadow of the Keep",
    emoji: "🌑",
    preview: "🗡️",
    description: "Carved from the black stone of Ashenmoor. Silent. Cold. Absolute.",
    rarity: "Epic",
    rarityColor: "#a855f7",
    accentColor: "#7c3aed",
    glowColor: "#9333ea",
    borderColor: "#4c1d95",
    bg: "linear-gradient(160deg, #0d0015, #050008)",
    badge: "💀",
    stats: { defense: 5, speed: 2, power: 4 },
    parts: {
      helm: "⛑️",
      chest: "🌑",
      pauldrons: "🗡️",
      trim: "#7c3aed",
      baseColor: "#1e1b4b",
      shineColor: "#6d28d9",
    },
  },
  {
    id: "ironclad",
    name: "Ironclad Marshal",
    title: "Champion of the Rampart",
    emoji: "⚙️",
    preview: "🔩",
    description: "Heavy. Unyielding. The armour of a man who has never taken a step backwards.",
    rarity: "Rare",
    rarityColor: "#60a5fa",
    accentColor: "#2563eb",
    glowColor: "#3b82f6",
    borderColor: "#1d4ed8",
    bg: "linear-gradient(160deg, #0a1628, #050e1a)",
    badge: "🔩",
    stats: { defense: 5, speed: 1, power: 3 },
    parts: {
      helm: "🪖",
      chest: "⚙️",
      pauldrons: "🔩",
      trim: "#2563eb",
      baseColor: "#1e3a5f",
      shineColor: "#60a5fa",
    },
  },
  {
    id: "ashen_reaper",
    name: "Ashen Reaper",
    title: "Wraith of the Battlefield",
    emoji: "💨",
    preview: "🌫️",
    description: "Light as smoke, deadly as plague. The armour of those who strike before being seen.",
    rarity: "Epic",
    rarityColor: "#94a3b8",
    accentColor: "#64748b",
    glowColor: "#94a3b8",
    borderColor: "#475569",
    bg: "linear-gradient(160deg, #0f1215, #080a0c)",
    badge: "🌫️",
    stats: { defense: 2, speed: 5, power: 4 },
    parts: {
      helm: "😤",
      chest: "💨",
      pauldrons: "🌫️",
      trim: "#64748b",
      baseColor: "#1e293b",
      shineColor: "#94a3b8",
    },
  },
  {
    id: "golden_sovereign",
    name: "Golden Sovereign",
    title: "The Undying Light",
    emoji: "✨",
    preview: "👑",
    description: "Gilded in the last gold of Eldenmoor's treasury. Every enemy will know your name.",
    rarity: "Legendary",
    rarityColor: "#ffd60a",
    accentColor: "#d97706",
    glowColor: "#fbbf24",
    borderColor: "#92400e",
    bg: "linear-gradient(160deg, #2a1a00, #150d00)",
    badge: "👑",
    stats: { defense: 4, speed: 3, power: 5 },
    parts: {
      helm: "👑",
      chest: "✨",
      pauldrons: "⭐",
      trim: "#d97706",
      baseColor: "#78350f",
      shineColor: "#fbbf24",
    },
  },
  {
    id: "frost_sentinel",
    name: "Frost Sentinel",
    title: "Keeper of the Frozen Gate",
    emoji: "❄️",
    preview: "🧊",
    description: "Tempered in the glaciers of the Frozen Abyss. As cold and resolute as winter itself.",
    rarity: "Rare",
    rarityColor: "#7dd3fc",
    accentColor: "#0ea5e9",
    glowColor: "#38bdf8",
    borderColor: "#0369a1",
    bg: "linear-gradient(160deg, #021020, #010810)",
    badge: "🧊",
    stats: { defense: 4, speed: 3, power: 3 },
    parts: {
      helm: "🪖",
      chest: "❄️",
      pauldrons: "🧊",
      trim: "#0ea5e9",
      baseColor: "#082f49",
      shineColor: "#7dd3fc",
    },
  },
];

function StatBar({ value, max = 5, color }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <div key={i} className="w-3 h-1.5 rounded-sm"
          style={{
            background: i < value ? color : "rgba(255,255,255,0.08)",
            boxShadow: i < value ? `0 0 4px ${color}88` : "none",
          }} />
      ))}
    </div>
  );
}

function ArmorCard({ armor, selected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(armor.id)}
      className="relative text-left rounded-xl transition-all duration-200 hover:scale-[1.02]"
      style={{
        background: selected ? armor.bg : "linear-gradient(160deg, #0d0a14, #08060f)",
        border: `2px solid ${selected ? armor.accentColor : "rgba(80,60,100,0.3)"}`,
        boxShadow: selected
          ? `0 0 24px ${armor.glowColor}55, 0 6px 0 #000`
          : "0 4px 0 #000",
        padding: "14px",
      }}>

      {/* Rarity badge */}
      <div className="absolute top-2 right-2 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full"
        style={{ background: `${armor.rarityColor}22`, border: `1px solid ${armor.rarityColor}55`, color: armor.rarityColor }}>
        {armor.rarity}
      </div>

      {/* Selected indicator */}
      {selected && (
        <div className="absolute top-2 left-2 w-4 h-4 rounded-full flex items-center justify-center"
          style={{ background: armor.accentColor, boxShadow: `0 0 8px ${armor.glowColor}` }}>
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
        </div>
      )}

      {/* Armor visual */}
      <div className="flex items-center gap-3 mb-3 mt-1">
        {/* Character silhouette */}
        <div className="relative w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{
            background: `radial-gradient(circle, ${armor.glowColor}22 0%, transparent 70%)`,
            border: `1px solid ${armor.accentColor}44`,
          }}>
          {/* layered armor display */}
          <div className="relative">
            <div className="text-3xl leading-none">{armor.parts.chest}</div>
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-sm">{armor.parts.helm}</div>
            <div className="absolute top-1 -left-2 text-xs opacity-70">{armor.parts.pauldrons}</div>
            <div className="absolute top-1 -right-2 text-xs opacity-70">{armor.parts.pauldrons}</div>
          </div>
          {/* glow pulse */}
          {selected && (
            <div className="absolute inset-0 rounded-lg animate-pulse"
              style={{ background: `radial-gradient(circle, ${armor.glowColor}15 0%, transparent 70%)` }} />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-xs font-black truncate" style={{ color: selected ? "#fff" : "#b0a0c0" }}>
            {armor.name}
          </div>
          <div className="text-[9px] truncate mb-2" style={{ color: armor.accentColor }}>
            {armor.title}
          </div>
          {/* Stats */}
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className="text-[8px] w-10" style={{ color: "#5a4870" }}>DEF</span>
              <StatBar value={armor.stats.defense} color={armor.accentColor} />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[8px] w-10" style={{ color: "#5a4870" }}>SPD</span>
              <StatBar value={armor.stats.speed} color={armor.accentColor} />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[8px] w-10" style={{ color: "#5a4870" }}>PWR</span>
              <StatBar value={armor.stats.power} color={armor.accentColor} />
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-[9px] leading-relaxed italic" style={{ color: selected ? "#9a8ab0" : "#4a3a60" }}>
        "{armor.description}"
      </p>
    </button>
  );
}

export default function ArmorSelectScreen({ onConfirm }) {
  const [selected, setSelected] = useState("crimson_knight");

  const armor = ARMORS.find(a => a.id === selected);

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.97)" }}>

      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #8b0000 0px, #8b0000 1px, transparent 1px, transparent 50%)`,
          backgroundSize: "20px 20px",
        }} />

      <div className="relative w-full max-w-3xl mx-4 flex flex-col max-h-[95vh]">

        {/* Header */}
        <div className="text-center mb-5">
          <div className="text-4xl mb-2">⚔️</div>
          <h2 className="text-xl font-black uppercase tracking-[0.25em]"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              background: "linear-gradient(135deg, #ffd60a, #dc2626, #ffd60a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 10px rgba(220,38,38,0.5))",
            }}>
            Choose Thine Armour
          </h2>
          <p className="text-[10px] uppercase tracking-[0.35em] mt-1" style={{ color: "#5a3040" }}>
            ⚔ &nbsp; This is the mantle thou shalt carry into battle &nbsp; ⚔
          </p>
        </div>

        {/* Selected armor large preview */}
        {armor && (
          <div className="mx-2 mb-4 rounded-xl px-5 py-4 flex items-center gap-5"
            style={{
              background: armor.bg,
              border: `2px solid ${armor.accentColor}`,
              boxShadow: `0 0 40px ${armor.glowColor}33, 0 4px 0 #000`,
            }}>
            {/* Large character display */}
            <div className="relative w-20 h-20 flex-shrink-0 rounded-xl flex items-center justify-center"
              style={{
                background: `radial-gradient(circle, ${armor.glowColor}30 0%, transparent 70%)`,
                border: `2px solid ${armor.accentColor}66`,
              }}>
              <div className="relative text-center">
                <div className="text-5xl leading-none">{armor.parts.chest}</div>
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl">{armor.parts.helm}</div>
                <div className="absolute top-1 -left-5 text-xl opacity-80">{armor.parts.pauldrons}</div>
                <div className="absolute top-1 -right-5 text-xl opacity-80">{armor.parts.pauldrons}</div>
              </div>
              <div className="absolute inset-0 rounded-xl animate-pulse"
                style={{ background: `radial-gradient(circle, ${armor.glowColor}10 0%, transparent 60%)` }} />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{armor.badge}</span>
                <div>
                  <div className="text-base font-black" style={{ color: "#fff", fontFamily: "'Cinzel', serif" }}>
                    {armor.name}
                  </div>
                  <div className="text-[10px] font-bold" style={{ color: armor.accentColor }}>
                    {armor.title}
                  </div>
                </div>
                <div className="ml-auto text-xs font-black px-2 py-0.5 rounded-full"
                  style={{ background: `${armor.rarityColor}22`, border: `1px solid ${armor.rarityColor}66`, color: armor.rarityColor }}>
                  {armor.rarity}
                </div>
              </div>
              <p className="text-xs italic leading-relaxed mb-3" style={{ color: "#7a6a8a" }}>
                "{armor.description}"
              </p>
              <div className="flex gap-4">
                {[["⚔ PWR", armor.stats.power], ["🛡 DEF", armor.stats.defense], ["💨 SPD", armor.stats.speed]].map(([label, val]) => (
                  <div key={label} className="flex flex-col items-center gap-1">
                    <span className="text-[9px] font-bold" style={{ color: "#5a4870" }}>{label}</span>
                    <StatBar value={val} color={armor.accentColor} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Armor grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mx-2 overflow-y-auto flex-1 pb-1 pr-1"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#3d1a3a transparent" }}>
          {ARMORS.map(a => (
            <ArmorCard key={a.id} armor={a} selected={selected === a.id} onSelect={setSelected} />
          ))}
        </div>

        {/* Confirm button */}
        <div className="mt-4 mx-2">
          <button
            onClick={() => onConfirm(selected)}
            className="w-full rounded-xl py-4 font-black text-base uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              background: armor ? `linear-gradient(180deg, ${armor.accentColor}, ${armor.borderColor})` : "linear-gradient(180deg, #dc2626, #7f1d1d)",
              border: `3px solid ${armor?.glowColor ?? "#ff4444"}`,
              boxShadow: `0 6px 0 #000, 0 0 30px ${armor?.glowColor ?? "#ff4444"}44`,
              color: "#fff",
              textShadow: "0 2px 4px rgba(0,0,0,0.7)",
            }}>
            {armor?.badge} &nbsp; Don the {armor?.name} &nbsp; {armor?.badge}
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";