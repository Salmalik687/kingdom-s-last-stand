import { useState } from "react";
import { ACHIEVEMENTS, RARITY_STYLE } from "../../lib/achievements";
import { X, Trophy, Lock } from "lucide-react";

const RARITY_ORDER = ["legendary", "epic", "rare", "uncommon", "common"];

export default function HallOfHeroesModal({ show, onClose, unlockedIds = [], stats = {} }) {
  const [filter, setFilter] = useState("all");

  if (!show) return null;

  const sorted = [...ACHIEVEMENTS].sort((a, b) => {
    const ri = RARITY_ORDER.indexOf(a.rarity);
    const rj = RARITY_ORDER.indexOf(b.rarity);
    const au = unlockedIds.includes(a.id) ? 0 : 1;
    const bu = unlockedIds.includes(b.id) ? 0 : 1;
    if (au !== bu) return au - bu;
    return ri - rj;
  });

  const filtered = filter === "all" ? sorted : filter === "unlocked"
    ? sorted.filter(a => unlockedIds.includes(a.id))
    : sorted.filter(a => !unlockedIds.includes(a.id));

  const total = ACHIEVEMENTS.length;
  const unlocked = unlockedIds.length;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(6px)" }}>

      <div className="relative w-full max-w-2xl mx-4 rounded-2xl overflow-hidden flex flex-col"
        style={{
          background: "linear-gradient(160deg, #0e0a1e 0%, #08051a 100%)",
          border: "3px solid #4a2d8a",
          boxShadow: "0 0 80px rgba(139,92,246,0.3), 0 8px 0 #000",
          maxHeight: "90vh",
        }}>

        {/* Gold top bar */}
        <div style={{ height: 4, background: "linear-gradient(90deg, transparent, #f59e0b, transparent)" }} />

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4"
          style={{ borderBottom: "1px solid rgba(139,92,246,0.25)" }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl"
              style={{ background: "linear-gradient(160deg, #7c3aed, #4c1d95)", border: "2px solid #a78bfa" }}>
              🏛️
            </div>
            <div>
              <h2 className="text-lg font-black uppercase tracking-[0.15em]"
                style={{ fontFamily: "'Cinzel Decorative', serif", color: "#e9d5ff", textShadow: "0 0 20px rgba(167,139,250,0.5)" }}>
                Hall of Heroes
              </h2>
              <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#6b5fa0" }}>
                {unlocked} / {total} achievements unlocked
              </p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10"
            style={{ color: "#6b5fa0" }}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="px-6 py-3" style={{ borderBottom: "1px solid rgba(139,92,246,0.15)" }}>
          <div className="flex items-center justify-between text-[10px] font-bold mb-1.5 uppercase tracking-widest" style={{ color: "#6b5fa0" }}>
            <span>Progress</span>
            <span style={{ color: "#a78bfa" }}>{Math.round((unlocked / total) * 100)}%</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(139,92,246,0.15)" }}>
            <div className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${(unlocked / total) * 100}%`,
                background: "linear-gradient(90deg, #7c3aed, #f59e0b)",
                boxShadow: "0 0 8px rgba(167,139,250,0.6)",
              }} />
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 px-6 py-3" style={{ borderBottom: "1px solid rgba(139,92,246,0.15)" }}>
          {["all", "unlocked", "locked"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all"
              style={{
                background: filter === f ? "linear-gradient(180deg, #7c3aed, #4c1d95)" : "rgba(139,92,246,0.1)",
                border: `1px solid ${filter === f ? "#a78bfa" : "rgba(139,92,246,0.25)"}`,
                color: filter === f ? "#e9d5ff" : "#6b5fa0",
                boxShadow: filter === f ? "0 2px 0 #1e0a4a" : "none",
              }}>
              {f === "all" ? `All (${total})` : f === "unlocked" ? `Unlocked (${unlocked})` : `Locked (${total - unlocked})`}
            </button>
          ))}
        </div>

        {/* Achievement grid */}
        <div className="overflow-y-auto px-4 py-4 grid grid-cols-1 sm:grid-cols-2 gap-2" style={{ flex: 1 }}>
          {filtered.map(achievement => {
            const isUnlocked = unlockedIds.includes(achievement.id);
            const style = RARITY_STYLE[achievement.rarity];

            return (
              <div key={achievement.id}
                className="flex items-center gap-3 rounded-xl p-3 transition-all"
                style={{
                  background: isUnlocked ? style.bg : "rgba(10,8,20,0.8)",
                  border: `2px solid ${isUnlocked ? style.border : "rgba(40,30,60,0.6)"}`,
                  boxShadow: isUnlocked ? `0 0 16px ${style.glow}33` : "none",
                  opacity: isUnlocked ? 1 : 0.5,
                }}>

                {/* Icon */}
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{
                    background: isUnlocked ? `${style.glow}22` : "rgba(255,255,255,0.04)",
                    border: `1.5px solid ${isUnlocked ? style.border : "rgba(60,50,80,0.5)"}`,
                    filter: isUnlocked ? "none" : "grayscale(1)",
                  }}>
                  {isUnlocked ? achievement.icon : <Lock className="w-4 h-4" style={{ color: "#3a3060" }} />}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-black truncate" style={{ color: isUnlocked ? "#fff" : "#3a3060" }}>
                      {achievement.title}
                    </span>
                    <span className="text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full flex-shrink-0"
                      style={{
                        background: isUnlocked ? style.badge : "rgba(40,30,60,0.6)",
                        color: isUnlocked ? style.text : "#3a3060",
                      }}>
                      {style.label}
                    </span>
                  </div>
                  <p className="text-[10px] leading-tight" style={{ color: isUnlocked ? "#6b5fa0" : "#2a2050" }}>
                    {achievement.desc}
                  </p>
                </div>

                {/* Unlocked checkmark */}
                {isUnlocked && (
                  <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: style.glow, boxShadow: `0 0 8px ${style.glow}` }}>
                    <span className="text-[10px]">✓</span>
                  </div>
                )}
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="col-span-2 text-center py-12" style={{ color: "#3a3060" }}>
              <Trophy className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm font-bold">No achievements here yet</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 flex items-center justify-center"
          style={{ borderTop: "1px solid rgba(139,92,246,0.15)" }}>
          <button onClick={onClose}
            className="px-6 py-2 rounded-xl font-black text-xs uppercase tracking-widest"
            style={{
              background: "linear-gradient(180deg, #7c3aed, #4c1d95)",
              border: "2px solid #a78bfa",
              boxShadow: "0 3px 0 #1e0a4a",
              color: "#e9d5ff",
            }}>
            ⚔ Back to Battle
          </button>
        </div>
      </div>
    </div>
  );
}