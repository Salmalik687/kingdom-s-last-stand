import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${5 + (i * 5.2) % 90}%`,
  delay: `${(i * 0.18) % 2}s`,
  duration: `${2.2 + (i * 0.3) % 1.5}s`,
  emoji: ["🌸", "✨", "⭐", "🌟", "🕊️", "🌿", "💫"][i % 7],
}));

export default function VictoryModal({ show, score, wave, onRestart }) {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState(0); // 0=fade in, 1=main, 2=fade out

  useEffect(() => {
    if (show) {
      setPhase(0);
      setVisible(true);
      setTimeout(() => setPhase(1), 80);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: "rgba(0,0,0,0.82)",
        backdropFilter: "blur(8px)",
        transition: "opacity 0.5s",
        opacity: phase >= 1 ? 1 : 0,
      }}
    >
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map(p => (
          <span
            key={p.id}
            className="absolute text-lg"
            style={{
              left: p.left,
              bottom: "-10%",
              animation: `floatUp ${p.duration} ${p.delay} infinite ease-in-out`,
            }}
          >
            {p.emoji}
          </span>
        ))}
      </div>

      {/* Modal */}
      <div
        className="relative max-w-md w-full mx-4 rounded-2xl text-center overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #0f2a0f 0%, #071407 50%, #0a1f0a 100%)",
          border: "1.5px solid rgba(100,200,80,0.35)",
          boxShadow: "0 0 80px rgba(80,200,80,0.18), 0 0 200px rgba(40,120,40,0.1), inset 0 1px 0 rgba(120,255,80,0.06)",
        }}
      >
        {/* Top glow line */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(100,220,80,0.6), transparent)" }} />

        {/* Sky scene */}
        <div className="relative pt-8 pb-4 px-6"
          style={{ background: "linear-gradient(180deg, rgba(100,200,255,0.07) 0%, transparent 100%)" }}>
          <div className="text-6xl mb-2" style={{ filter: "drop-shadow(0 0 16px rgba(255,220,80,0.5))" }}>
            🌅
          </div>
          <div className="flex justify-center gap-2 mb-4 text-2xl">
            <span>🏰</span><span>🌿</span><span>🕊️</span><span>🌿</span><span>🏰</span>
          </div>
        </div>

        <div className="px-8 pb-8">
          {/* Title */}
          <h2
            className="text-3xl font-black mb-1 tracking-widest uppercase"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              background: "linear-gradient(135deg, #a8e063, #ffe066, #a8e063)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "none",
              filter: "drop-shadow(0 0 12px rgba(160,220,80,0.4))",
            }}
          >
            Victory!
          </h2>

          {/* Tagline */}
          <p
            className="text-base mb-1 font-semibold tracking-wide"
            style={{ color: "#c8e8a0", fontFamily: "'Cinzel', serif" }}
          >
            The Land Has Been Peaceful
          </p>
          <p className="text-xs mb-6" style={{ color: "rgba(140,200,100,0.55)", letterSpacing: "0.15em" }}>
            — The kingdom rests in hard-won tranquility —
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold mb-0.5" style={{ color: "#ffe066" }}>{score}</div>
              <div className="text-[10px] uppercase tracking-widest" style={{ color: "rgba(200,220,100,0.5)" }}>Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-0.5" style={{ color: "#a8e063" }}>{wave - 1}</div>
              <div className="text-[10px] uppercase tracking-widest" style={{ color: "rgba(200,220,100,0.5)" }}>Waves Survived</div>
            </div>
          </div>

          <Button
            onClick={onRestart}
            className="w-full font-semibold py-3 gap-2 tracking-widest uppercase text-xs"
            style={{
              background: "linear-gradient(135deg, #2d6a1a, #3d8c28)",
              border: "1px solid rgba(100,200,60,0.4)",
              color: "#d4f4a0",
              boxShadow: "0 0 16px rgba(80,180,40,0.25)",
            }}
          >
            <RotateCcw className="w-4 h-4" />
            Play Again
          </Button>
        </div>

        {/* Bottom glow line */}
        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(100,220,80,0.4), transparent)" }} />
      </div>

      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(0) rotate(0deg); opacity: 0.7; }
          50%  { opacity: 1; }
          100% { transform: translateY(-110vh) rotate(20deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}