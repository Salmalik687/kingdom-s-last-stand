const BOSS_STYLES = {
  boss_meadow:  { glow: "#22c55e", rgb: "34,197,94",   bg: "linear-gradient(90deg,#052e16,#14532d)", border: "#166534", label: "Forest Drake",     emoji: "🐉" },
  boss_dungeon: { glow: "#818cf8", rgb: "129,140,248",  bg: "linear-gradient(90deg,#1e1b4b,#312e81)", border: "#3730a3", label: "Dungeon Overlord", emoji: "🧟" },
  boss_volcano: { glow: "#f97316", rgb: "249,115,22",   bg: "linear-gradient(90deg,#431407,#7c2d12)", border: "#c2410c", label: "Flame Titan",      emoji: "🔥" },
  boss_abyss:   { glow: "#60a5fa", rgb: "96,165,250",   bg: "linear-gradient(90deg,#082f49,#0c4a6e)", border: "#0369a1", label: "Frost Colossus",  emoji: "❄️" },
  boss_shadow:  { glow: "#c084fc", rgb: "192,132,252",  bg: "linear-gradient(90deg,#2e1065,#4c1d95)", border: "#7c3aed", label: "Shadow Sovereign",emoji: "💀" },
};

export default function BossHealthBar({ enemies }) {
  const boss = enemies.find(e => e.type?.startsWith("boss_"));
  if (!boss) return null;

  const style = BOSS_STYLES[boss.type] ?? BOSS_STYLES.boss_shadow;
  const pct = Math.max(0, Math.min(1, boss.hp / boss.maxHp));
  const isEnraged = pct <= 0.5;

  // Bar colour transitions: green → yellow → red as HP drops
  const barColor = pct > 0.6
    ? style.glow
    : pct > 0.3
    ? "#facc15"
    : "#ef4444";

  return (
    <div
      className="fixed top-0 left-0 right-0 z-40 pointer-events-none"
      style={{ paddingTop: "58px" }} // sit just below the game header
    >
      <div
        className="mx-auto max-w-2xl px-3"
        style={{
          animation: "slideDownFade 0.4s ease-out both",
        }}
      >
        <div
          className="rounded-b-2xl px-4 py-2.5"
          style={{
            background: style.bg,
            border: `1.5px solid ${style.border}`,
            borderTop: "none",
            boxShadow: `0 6px 24px rgba(${style.rgb},0.35), 0 2px 0 #000`,
          }}
        >
          {/* Name row */}
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <span
                className="text-lg"
                style={{ filter: `drop-shadow(0 0 8px ${style.glow})` }}
              >
                {style.emoji}
              </span>
              <span
                className="text-xs font-black uppercase tracking-widest"
                style={{
                  fontFamily: "'Cinzel', serif",
                  color: "#fff",
                  textShadow: `0 0 10px ${style.glow}`,
                }}
              >
                {boss.name || style.label}
              </span>
              {isEnraged && (
                <span
                  className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full animate-pulse"
                  style={{
                    background: `rgba(${style.rgb},0.25)`,
                    border: `1px solid ${style.glow}`,
                    color: style.glow,
                  }}
                >
                  ⚠ ENRAGED
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] font-black tabular-nums"
                style={{ color: barColor, textShadow: `0 0 8px ${barColor}` }}
              >
                {Math.round(pct * 100)}%
              </span>
              <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                {Math.max(0, Math.floor(boss.hp)).toLocaleString()} / {boss.maxHp.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Health bar track */}
          <div
            className="w-full rounded-full overflow-hidden"
            style={{
              height: 10,
              background: "rgba(0,0,0,0.5)",
              border: `1px solid rgba(${style.rgb},0.3)`,
            }}
          >
            <div
              className="h-full rounded-full transition-all duration-100"
              style={{
                width: `${pct * 100}%`,
                background: `linear-gradient(90deg, ${barColor}cc, ${barColor})`,
                boxShadow: `0 0 10px ${barColor}`,
              }}
            />
          </div>

          {/* Phase markers at 50% / 30% / etc */}
          <div className="relative mt-1" style={{ height: 4 }}>
            {[0.5, 0.3, 0.15].map(marker => (
              <div
                key={marker}
                className="absolute top-0 w-0.5 h-3 -mt-1 rounded-full"
                style={{
                  left: `${marker * 100}%`,
                  background: pct > marker ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.08)",
                  boxShadow: pct > marker ? "0 0 4px rgba(255,255,255,0.4)" : "none",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideDownFade {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}