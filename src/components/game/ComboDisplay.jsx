import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

export default function ComboDisplay({ combo, multiplier }) {
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (combo >= 2) {
      setVisible(true);
      setAnimate(true);
      const t = setTimeout(() => setAnimate(false), 300);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
  }, [combo]);

  if (!visible) return null;

  const color =
    multiplier >= 5 ? "text-red-400 border-red-600/70 bg-red-950/80" :
    multiplier >= 3 ? "text-orange-400 border-orange-700/60 bg-orange-950/70" :
    "text-yellow-400 border-yellow-800/50 bg-yellow-950/60";

  const glowColor = 
    multiplier >= 5 ? "rgba(240, 82, 82, 0.8)" :
    multiplier >= 3 ? "rgba(255, 124, 31, 0.7)" :
    "rgba(255, 193, 7, 0.6)";

  return (
    <div
      className={`fixed top-20 right-6 z-40 flex items-center gap-2 px-4 py-2 rounded-lg border font-bold tracking-widest uppercase text-sm transition-all duration-150 ${color} ${animate ? "scale-125" : "scale-100"}`}
      style={{
        boxShadow: multiplier >= 3 
          ? `0 0 30px ${glowColor}, 0 0 60px ${glowColor}88, inset 0 1px 0 rgba(255,255,255,0.1)`
          : `0 0 20px ${glowColor}, inset 0 1px 0 rgba(255,255,255,0.04)`,
        animation: multiplier >= 3 ? "glowPulse 0.9s ease-in-out infinite" : "none",
        textShadow: "0 0 12px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6)",
      }}
    >
      <Zap className="w-5 h-5 fill-current drop-shadow-lg" />
      <span style={{ textShadow: "0 2px 4px rgba(0,0,0,0.6)" }}>{combo}x</span>
      {multiplier > 1 && (
        <span className="opacity-80 text-xs font-normal ml-1">+{multiplier}× GOLD 💰</span>
      )}
    </div>
  );
}