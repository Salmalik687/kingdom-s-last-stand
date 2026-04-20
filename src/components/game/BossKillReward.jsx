import { useState, useEffect } from "react";

// Pool of random rewards the player can get from killing a boss
export const BOSS_REWARDS = [
  { id: "rampage",       emoji: "⚔️",  name: "Rampage",          desc: "All towers +25% damage for next 3 waves",  type: "temp_damage",   value: 0.25, waves: 3,  color: "#ef4444", colorRgb: "239,68,68"   },
  { id: "gold_flood",    emoji: "💰",  name: "Gold Flood",        desc: "+150 gold bonus",                           type: "gold",          value: 150,             color: "#fbbf24", colorRgb: "251,191,36"  },
  { id: "iron_will",     emoji: "🛡️",  name: "Iron Will",         desc: "+5 lives restored",                        type: "lives",         value: 5,               color: "#60a5fa", colorRgb: "96,165,250"  },
  { id: "death_rush",    emoji: "💀",  name: "Death Rush",        desc: "Fire rate +30% for next 3 waves",          type: "temp_firerate", value: 0.30, waves: 3,  color: "#a855f7", colorRgb: "168,85,247"  },
  { id: "bloodlust",     emoji: "🩸",  name: "Bloodlust",         desc: "Every kill grants +2 gold for 3 waves",   type: "kill_gold",     value: 2,    waves: 3,  color: "#dc2626", colorRgb: "220,38,38"   },
  { id: "titan_heart",   emoji: "💪",  name: "Titan Heart",       desc: "+8 lives + all tower damage +10%",        type: "combo_life_dmg",value: [8, 0.10],       color: "#f97316", colorRgb: "249,115,22"  },
  { id: "void_surge",    emoji: "🌀",  name: "Void Surge",        desc: "All towers +50% range for next 2 waves",  type: "temp_range",    value: 0.50, waves: 2,  color: "#8b5cf6", colorRgb: "139,92,246"  },
  { id: "phoenix",       emoji: "🔥",  name: "Phoenix Blessing",  desc: "+200 gold + +3 lives",                    type: "combo_gold_life",value: [200, 3],       color: "#f59e0b", colorRgb: "245,158,11"  },
  { id: "cursed_relic",  emoji: "💎",  name: "Cursed Relic",      desc: "Projectile speed +40% permanently",       type: "perm_projspeed",value: 0.40,            color: "#ec4899", colorRgb: "236,72,153"  },
  { id: "kings_plunder", emoji: "👑",  name: "King's Plunder",    desc: "+300 gold",                               type: "gold",          value: 300,             color: "#ffd60a", colorRgb: "255,214,10"  },
  { id: "shadow_pact",   emoji: "🌑",  name: "Shadow Pact",       desc: "All damage +35%, lose 2 lives",           type: "pact",          value: [0.35, -2],      color: "#6d28d9", colorRgb: "109,40,217"  },
  { id: "war_drums",     emoji: "🥁",  name: "War Drums",         desc: "All tower fire rate +20% permanently",   type: "perm_firerate", value: 0.20,            color: "#fb923c", colorRgb: "251,146,60"  },
];

function getRandomRewards(count = 3) {
  const shuffled = [...BOSS_REWARDS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default function BossKillReward({ bossType, show, onClaim }) {
  const [rewards, setRewards] = useState([]);
  const [selected, setSelected] = useState(null);
  const [phase, setPhase] = useState("hidden"); // hidden → slam → choose

  useEffect(() => {
    if (show && bossType) {
      setRewards(getRandomRewards(3));
      setSelected(null);
      setPhase("slam");
      setTimeout(() => setPhase("choose"), 1800);
    } else {
      setPhase("hidden");
    }
  }, [show, bossType]);

  if (phase === "hidden") return null;

  const bossColors = {
    boss_meadow:  { glow: "#22c55e", rgb: "34,197,94",   bg: "linear-gradient(160deg,#020f02,#041a04)" },
    boss_dungeon: { glow: "#6366f1", rgb: "99,102,241",  bg: "linear-gradient(160deg,#020212,#060618)" },
    boss_volcano: { glow: "#f97316", rgb: "249,115,22",  bg: "linear-gradient(160deg,#120200,#240800)" },
    boss_abyss:   { glow: "#60a5fa", rgb: "96,165,250",  bg: "linear-gradient(160deg,#010210,#020520)" },
    boss_shadow:  { glow: "#a855f7", rgb: "168,85,247",  bg: "linear-gradient(160deg,#0a0010,#160030)" },
  };
  const bc = bossColors[bossType] || bossColors.boss_shadow;
  const chosen = rewards.find(r => r.id === selected);

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.92)" }}>

      {/* Slam phase */}
      {phase === "slam" && (
        <div className="flex flex-col items-center gap-6 pointer-events-none">
          <div style={{
            fontSize: "clamp(32px,7vw,64px)",
            fontFamily: "'Cinzel Decorative', serif",
            fontWeight: 900,
            color: bc.glow,
            textShadow: `0 0 40px ${bc.glow}, 0 0 80px ${bc.glow}`,
            animation: "slamIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards",
            letterSpacing: "0.06em",
            textAlign: "center",
            padding: "0 16px",
          }}>
            BOSS SLAIN!
          </div>
          <div style={{ fontSize: 64, animation: "spinGrow 1.5s ease-out forwards" }}>💀</div>
          <div style={{
            fontSize: 18, color: "#fff", fontFamily: "'Cinzel', serif",
            opacity: 0, animation: "fadeIn 0.6s 0.8s forwards",
          }}>
            Choose your spoils, Champion...
          </div>
        </div>
      )}

      {/* Choose phase */}
      {phase === "choose" && (
        <div className="relative max-w-lg w-full mx-4">
          <div style={{
            background: bc.bg,
            border: `2px solid rgba(${bc.rgb},0.6)`,
            borderRadius: 20,
            boxShadow: `0 0 80px rgba(${bc.rgb},0.3), 0 8px 0 #000`,
            overflow: "hidden",
          }}>
            {/* Top glow bar */}
            <div style={{ height: 3, background: `linear-gradient(90deg,transparent,${bc.glow},transparent)` }} />

            <div className="p-6">
              <div className="text-center mb-5">
                <div style={{
                  fontSize: 11, fontWeight: 900, letterSpacing: "0.35em",
                  textTransform: "uppercase", color: bc.glow, fontFamily: "'Cinzel', serif",
                  textShadow: `0 0 12px ${bc.glow}`,
                }}>
                  ⚔ Boss Spoils ⚔
                </div>
                <div style={{
                  fontSize: 20, fontWeight: 900, color: "#fff",
                  fontFamily: "'Cinzel Decorative', serif",
                  marginTop: 4, letterSpacing: "0.05em",
                }}>
                  Choose One Boon
                </div>
                <div style={{ fontSize: 10, color: `rgba(${bc.rgb},0.5)`, marginTop: 2 }}>
                  This power is bound to thee for the battles ahead
                </div>
              </div>

              {/* Reward cards */}
              <div className="flex flex-col gap-3 mb-5">
                {rewards.map((r, i) => (
                  <button
                    key={r.id}
                    onClick={() => setSelected(r.id)}
                    style={{
                      display: "flex", alignItems: "center", gap: 14,
                      padding: "14px 16px", borderRadius: 14, textAlign: "left",
                      cursor: "pointer",
                      background: selected === r.id
                        ? `linear-gradient(135deg,rgba(${r.colorRgb},0.25),rgba(${r.colorRgb},0.08))`
                        : "linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))",
                      border: `2px solid ${selected === r.id ? r.color : "rgba(255,255,255,0.08)"}`,
                      boxShadow: selected === r.id
                        ? `0 0 24px rgba(${r.colorRgb},0.4), 0 4px 0 #000`
                        : "0 3px 0 #000",
                      transform: selected === r.id ? "translateY(-2px) scale(1.01)" : "translateY(0)",
                      transition: "all 0.2s cubic-bezier(0.34,1.4,0.64,1)",
                      animation: `slideIn 0.4s ${i * 0.1}s both`,
                    }}>
                    <div style={{
                      fontSize: 32, flexShrink: 0,
                      filter: selected === r.id ? `drop-shadow(0 0 10px ${r.color})` : "none",
                      transition: "filter 0.2s",
                    }}>{r.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: 13, fontWeight: 900, color: selected === r.id ? "#fff" : "#d4c0f0",
                        fontFamily: "'Cinzel', serif", marginBottom: 2,
                      }}>{r.name}</div>
                      <div style={{ fontSize: 10, color: selected === r.id ? "#a090c0" : "#5a4870", lineHeight: 1.4 }}>
                        {r.desc}
                      </div>
                    </div>
                    {selected === r.id && (
                      <div style={{
                        width: 22, height: 22, borderRadius: "50%",
                        background: r.color, flexShrink: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 10, fontWeight: 900, color: "#fff",
                        boxShadow: `0 0 12px ${r.color}`,
                      }}>✓</div>
                    )}
                  </button>
                ))}
              </div>

              {/* Claim button */}
              <button
                disabled={!selected}
                onClick={() => onClaim(chosen)}
                style={{
                  width: "100%", padding: "14px 0", borderRadius: 12,
                  fontFamily: "'Cinzel Decorative', serif",
                  fontSize: 12, fontWeight: 900, letterSpacing: "0.15em",
                  textTransform: "uppercase", cursor: selected ? "pointer" : "not-allowed",
                  background: selected
                    ? `linear-gradient(180deg,${chosen?.color},rgba(0,0,0,0.5))`
                    : "linear-gradient(180deg,#1a1225,#0d0a18)",
                  border: `2px solid ${selected ? (chosen?.color || bc.glow) : "rgba(80,60,100,0.25)"}`,
                  boxShadow: selected
                    ? `0 5px 0 #000,0 0 30px rgba(${chosen?.colorRgb || bc.rgb},0.4)`
                    : "0 4px 0 #000",
                  color: selected ? "#fff" : "#3a2a50",
                  transition: "all 0.2s",
                }}>
                {selected ? `${chosen?.emoji}  Claim the ${chosen?.name}  ${chosen?.emoji}` : "— Select a Boon —"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slamIn {
          0%   { transform: scale(3) translateY(-40px); opacity: 0; }
          60%  { transform: scale(0.95); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes spinGrow {
          0%   { transform: scale(0) rotate(-180deg); opacity: 0; }
          70%  { transform: scale(1.2) rotate(10deg); opacity: 1; }
          100% { transform: scale(1) rotate(0); opacity: 1; }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideIn {
          from { transform: translateX(-30px); opacity: 0; }
          to   { transform: translateX(0);     opacity: 1; }
        }
      `}</style>
    </div>
  );
}