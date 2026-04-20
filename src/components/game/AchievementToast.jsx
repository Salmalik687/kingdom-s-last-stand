import { useEffect, useState } from "react";
import { ACHIEVEMENTS, RARITY_STYLE } from "../../lib/achievements";

export default function AchievementToast({ newlyUnlocked = [] }) {
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    if (newlyUnlocked.length === 0) return;
    // Queue toasts one by one, each visible for 3.5s
    newlyUnlocked.forEach((id, i) => {
      const ach = ACHIEVEMENTS.find(a => a.id === id);
      if (!ach) return;
      const key = `${id}_${Date.now()}_${i}`;
      setTimeout(() => {
        setVisible(v => [...v, { ...ach, key }]);
        setTimeout(() => setVisible(v => v.filter(x => x.key !== key)), 3500);
      }, i * 600);
    });
  }, [newlyUnlocked]);

  if (visible.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[400] flex flex-col gap-2 pointer-events-none">
      {visible.map(ach => {
        const style = RARITY_STYLE[ach.rarity];
        return (
          <div key={ach.key}
            className="flex items-center gap-3 px-4 py-3 rounded-xl animate-bounce"
            style={{
              background: style.bg,
              border: `2px solid ${style.border}`,
              boxShadow: `0 0 24px ${style.glow}55, 0 4px 0 #000`,
              minWidth: 240,
              animation: "slideIn 0.35s ease-out",
            }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: `${style.glow}22`, border: `1.5px solid ${style.border}` }}>
              {ach.icon}
            </div>
            <div>
              <div className="text-[9px] font-black uppercase tracking-widest mb-0.5" style={{ color: style.glow }}>
                🏆 Achievement Unlocked!
              </div>
              <div className="text-xs font-black" style={{ color: "#fff" }}>{ach.title}</div>
              <div className="text-[9px]" style={{ color: style.text }}>{ach.desc}</div>
            </div>
          </div>
        );
      })}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(120%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
      `}</style>
    </div>
  );
}