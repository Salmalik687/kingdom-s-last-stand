import { useEffect, useState } from "react";

export default function DamagePopup({ damage, x, y, critical = false, isHeal = false }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const color = isHeal ? "#10b981" : critical ? "#ef4444" : "#fbbf24";
  const icon = isHeal ? "💚" : critical ? "💢" : "💥";

  return (
    <div
      className="fixed pointer-events-none font-black text-sm"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: "translate(-50%, -50%)",
        animation: `damageFloat ${critical ? "0.8s" : "1s"} ease-out forwards`,
        fontSize: critical ? "18px" : "16px",
        textShadow: `0 0 8px ${color}`,
      }}
    >
      <span style={{ color }}>{icon} {damage}</span>
    </div>
  );
}