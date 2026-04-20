import { useEffect, useState } from "react";
import { DemonLord } from "./CharacterSprites";

export default function BossArrivalModal({ boss, onDismiss }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (boss) {
      setVisible(true);
      const t = setTimeout(() => {
        setVisible(false);
        setTimeout(onDismiss, 400);
      }, 3200);
      return () => clearTimeout(t);
    }
  }, [boss]);

  if (!boss) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none transition-opacity duration-400 ${visible ? "opacity-100" : "opacity-0"}`}
      style={{ background: "rgba(0,0,0,0.75)" }}
    >
      {/* Dramatic vignette flash */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, ${boss.glowColor}22 0%, transparent 70%)`,
          animation: "pulse 1s ease-in-out infinite alternate",
        }}
      />

      <div
        className="relative text-center px-10 py-8 rounded-2xl border max-w-sm mx-4"
        style={{
          background: "rgba(5,2,2,0.97)",
          borderColor: boss.glowColor + "55",
          boxShadow: `0 0 80px ${boss.glowColor}44, inset 0 1px 0 rgba(255,255,255,0.03)`,
        }}
      >
        {/* Top line */}
        <div
          className="absolute top-0 left-10 right-10 h-px"
          style={{ background: `linear-gradient(to right, transparent, ${boss.glowColor}99, transparent)` }}
        />

        {boss.bossType === "boss_shadow" ? (
          <div className="flex justify-center mb-1">
            <DemonLord size={100} />
          </div>
        ) : (
          <div className="text-5xl mb-3">{boss.emoji}</div>
        )}

        <p className="text-[10px] uppercase tracking-[0.35em] mb-1" style={{ color: boss.glowColor + "aa" }}>
          {boss.stageLabel} — Boss Arrives
        </p>

        <h2
          className="text-2xl font-black mb-1 tracking-widest uppercase"
          style={{
            fontFamily: "'Cinzel Decorative', serif",
            color: boss.glowColor,
            textShadow: `0 0 30px ${boss.glowColor}88`,
          }}
        >
          {boss.name}
        </h2>

        <p className="text-xs text-stone-500 mt-3 italic">"{boss.taunt}"</p>

        {/* Bottom line */}
        <div
          className="absolute bottom-0 left-10 right-10 h-px"
          style={{ background: `linear-gradient(to right, transparent, ${boss.glowColor}55, transparent)` }}
        />
      </div>
    </div>
  );
}