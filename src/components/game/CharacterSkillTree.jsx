import { useState } from "react";
import { getSkillTree } from "../../lib/skillTrees";

const TIER_LABELS = { 1: "Apprentice", 2: "Champion", 3: "Legend" };

function effectLabel(effect) {
  const parts = [];
  if (effect.damageMult)    parts.push(`+${Math.round(effect.damageMult * 100)}% dmg`);
  if (effect.rangeMult)     parts.push(`+${Math.round(effect.rangeMult * 100)}% range`);
  if (effect.fireRateMult)  parts.push(`${Math.round(effect.fireRateMult * 100)}% fire rate`);
  if (effect.goldMult)      parts.push(`+${Math.round(effect.goldMult * 100)}% gold`);
  if (effect.lives)         parts.push(`+${effect.lives} lives`);
  if (effect.costReduction) parts.push(`-${Math.round(effect.costReduction * 100)}% costs`);
  if (effect.abilityMod)    parts.push("Active modifier");
  return parts.join(" · ");
}

export default function CharacterSkillTree({
  show,
  characterId,
  character,
  wave,
  unlockedSkills,
  skillPoints,
  onUnlock,
  onClose,
}) {
  const [hovered, setHovered] = useState(null);

  if (!show) return null;

  const tree = getSkillTree(characterId);
  const charColor = tree.color;
  const charColorRgb = tree.colorRgb;

  const canUnlock = (node) => {
    if (unlockedSkills.includes(node.id)) return false;
    if (skillPoints < 1) return false;
    if (wave < node.waveRequired) return false;
    return node.requires.every(r => unlockedSkills.includes(r));
  };

  const isLocked = (node) => {
    if (unlockedSkills.includes(node.id)) return false;
    if (wave < node.waveRequired) return true;
    return !node.requires.every(r => unlockedSkills.includes(r));
  };

  const tiers = [1, 2, 3].map(t => tree.nodes.filter(n => n.tier === t));

  return (
    <div
      className="fixed inset-0 z-[185] flex items-center justify-center overflow-hidden"
      style={{ background: "rgba(0,0,0,0.96)" }}
    >
      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          background: `radial-gradient(ellipse at 50% 0%, rgba(${charColorRgb},0.10) 0%, transparent 65%)`,
          position: "absolute", inset: 0,
        }} />
        {Array.from({ length: 36 }).map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${(i * 53 + 5) % 100}%`,
            top: `${(i * 37 + 3) % 90}%`,
            width: i % 4 === 0 ? 3 : 2,
            height: i % 4 === 0 ? 3 : 2,
            borderRadius: "50%",
            background: `rgba(${charColorRgb},${0.15 + (i % 5) * 0.1})`,
            animation: `skTwinkle ${1.4 + (i % 6) * 0.35}s ease-in-out ${(i % 4) * 0.25}s infinite alternate`,
          }} />
        ))}
      </div>

      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: "fixed", top: 16, right: 16, zIndex: 10,
          width: 44, height: 44, borderRadius: "50%",
          background: `linear-gradient(180deg,${charColor}99,${charColor}44)`,
          border: `2px solid ${charColor}`,
          color: "#fff", fontSize: 18, fontWeight: 900,
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        }}>
        ✕
      </button>

      <div className="relative w-full max-w-3xl mx-4 overflow-y-auto" style={{ zIndex: 2, maxHeight: "90vh" }}>
        {/* Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-2"
            style={{ background: `rgba(${charColorRgb},0.12)`, border: `1px solid rgba(${charColorRgb},0.4)` }}>
            <span style={{ fontSize: 16 }}>{character.emoji}</span>
            <span style={{
              fontSize: 9, fontWeight: 900, letterSpacing: "0.3em",
              color: charColor, fontFamily: "'Cinzel', serif", textTransform: "uppercase",
            }}>
              {character.name} — Skill Tree
            </span>
            <span style={{ fontSize: 16 }}>{character.emoji}</span>
          </div>
          <h2 style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: "clamp(16px,3.5vw,24px)",
            fontWeight: 900,
            color: charColor,
            filter: `drop-shadow(0 0 12px rgba(${charColorRgb},0.5))`,
            margin: 0,
          }}>
            Mastery Paths
          </h2>

          {/* Skill points display */}
          <div className="flex items-center justify-center gap-3 mt-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl"
              style={{
                background: `linear-gradient(135deg,rgba(${charColorRgb},0.18),rgba(${charColorRgb},0.06))`,
                border: `1.5px solid rgba(${charColorRgb},0.45)`,
              }}>
              <span style={{ fontSize: 18 }}>🔮</span>
              <div>
                <div style={{ fontSize: 9, color: charColor, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>Skill Points</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", lineHeight: 1, textShadow: `0 0 12px rgba(${charColorRgb},0.6)` }}>
                  {skillPoints}
                </div>
              </div>
            </div>
            <div style={{ fontSize: 10, color: "#4a4070", maxWidth: 190, lineHeight: 1.5 }}>
              Earned every 5 waves.<br />Locked tiers require higher wave progress.
            </div>
          </div>
        </div>

        {/* Tier rows */}
        <div className="flex flex-col gap-3">
          {tiers.map((row, tierIdx) => {
            const tierNum = tierIdx + 1;
            const waveNeeded = tierNum === 1 ? 1 : tierNum === 2 ? 6 : 11;
            const tierReached = wave >= waveNeeded;

            return (
              <div key={tierIdx}>
                {/* Tier label */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg,transparent,rgba(${charColorRgb},0.3))` }} />
                  <div className="flex items-center gap-2">
                    <span style={{
                      fontSize: 9, fontWeight: 900, letterSpacing: "0.3em",
                      color: tierReached ? charColor : "#3a3060",
                      fontFamily: "'Cinzel', serif", textTransform: "uppercase",
                    }}>
                      Tier {tierNum} — {TIER_LABELS[tierNum]}
                    </span>
                    {!tierReached && (
                      <span style={{
                        fontSize: 8, padding: "1px 6px", borderRadius: 999,
                        background: "rgba(60,50,100,0.4)", color: "#4a3a80",
                        border: "1px solid rgba(60,50,100,0.4)",
                      }}>
                        Wave {waveNeeded}+
                      </span>
                    )}
                  </div>
                  <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg,rgba(${charColorRgb},0.3),transparent)` }} />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {row.map(node => {
                    const unlocked = unlockedSkills.includes(node.id);
                    const affordable = canUnlock(node);
                    const locked = isLocked(node);
                    const isHov = hovered === node.id;

                    return (
                      <button
                        key={node.id}
                        onClick={() => affordable && onUnlock(node)}
                        onMouseEnter={() => setHovered(node.id)}
                        onMouseLeave={() => setHovered(null)}
                        disabled={!affordable && !unlocked}
                        style={{
                          position: "relative",
                          textAlign: "left",
                          borderRadius: 14,
                          padding: "12px 12px",
                          cursor: affordable ? "pointer" : "default",
                          background: unlocked
                            ? `linear-gradient(160deg,rgba(${charColorRgb},0.28),rgba(${charColorRgb},0.08))`
                            : locked
                            ? "linear-gradient(160deg,#0a0814,#060510)"
                            : isHov
                            ? `linear-gradient(160deg,rgba(${charColorRgb},0.12),rgba(${charColorRgb},0.04))`
                            : "linear-gradient(160deg,#110d20,#0c0a18)",
                          border: `2px solid ${
                            unlocked
                              ? charColor
                              : locked
                              ? "rgba(40,30,70,0.4)"
                              : isHov && affordable
                              ? charColor
                              : `rgba(${charColorRgb},0.25)`
                          }`,
                          boxShadow: unlocked
                            ? `0 0 20px rgba(${charColorRgb},0.35), 0 4px 0 #000`
                            : "0 3px 0 #000",
                          opacity: locked ? 0.38 : 1,
                          transition: "all 0.18s",
                          transform: isHov && affordable ? "translateY(-3px)" : "none",
                        }}
                      >
                        {/* Unlocked badge */}
                        {unlocked && (
                          <div style={{
                            position: "absolute", top: 8, right: 8,
                            width: 18, height: 18, borderRadius: "50%",
                            background: charColor,
                            boxShadow: `0 0 8px ${charColor}`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 9, fontWeight: 900, color: "#fff",
                          }}>✓</div>
                        )}
                        {/* Lock badge */}
                        {locked && (
                          <div style={{ position: "absolute", top: 8, right: 8, fontSize: 13, opacity: 0.5 }}>🔒</div>
                        )}

                        {/* Type badge */}
                        <div style={{
                          position: "absolute", top: 8, left: 10,
                          fontSize: 7, fontWeight: 900, letterSpacing: "0.15em", textTransform: "uppercase",
                          color: node.type === "passive"
                            ? (unlocked ? charColor : locked ? "#2a2050" : `rgba(${charColorRgb},0.6)`)
                            : (unlocked ? "#fbbf24" : locked ? "#2a2050" : "#a07820"),
                          fontFamily: "'Cinzel', serif",
                        }}>
                          {node.type === "passive" ? "Passive" : "⚡ Active"}
                        </div>

                        {/* Emoji */}
                        <div style={{
                          fontSize: 28, marginTop: 14, marginBottom: 6,
                          filter: unlocked
                            ? `drop-shadow(0 0 8px ${charColor})`
                            : locked ? "grayscale(1)" : "none",
                          transition: "filter 0.2s",
                        }}>{node.emoji}</div>

                        {/* Name */}
                        <div style={{
                          fontSize: 11, fontWeight: 900, marginBottom: 3,
                          color: unlocked ? "#fff" : locked ? "#3a3060" : "#c0b0e0",
                          fontFamily: "'Cinzel', serif",
                          textShadow: unlocked ? `0 0 8px rgba(${charColorRgb},0.6)` : "none",
                        }}>{node.name}</div>

                        {/* Desc */}
                        <p style={{
                          fontSize: 9, lineHeight: 1.5, marginBottom: 8,
                          color: unlocked ? "#a898c8" : locked ? "#2a2050" : "#4a3a70",
                          margin: "0 0 8px",
                        }}>{node.desc}</p>

                        {/* Effect tags */}
                        <div style={{
                          fontSize: 8, fontWeight: 700, letterSpacing: "0.05em",
                          padding: "3px 7px", borderRadius: 6, display: "inline-block",
                          background: unlocked
                            ? `rgba(${charColorRgb},0.18)`
                            : "rgba(60,50,90,0.3)",
                          border: `1px solid rgba(${charColorRgb},${unlocked ? 0.5 : 0.15})`,
                          color: unlocked ? charColor : "#4a3a70",
                        }}>
                          {effectLabel(node.effect)}
                        </div>

                        {/* Wave requirement */}
                        {!unlocked && wave < node.waveRequired && (
                          <div style={{ marginTop: 6, fontSize: 8, color: "#3a2860" }}>
                            Unlocks at wave {node.waveRequired}
                          </div>
                        )}

                        {/* Requires */}
                        {!unlocked && node.requires.length > 0 && wave >= node.waveRequired && (
                          <div style={{ marginTop: 4, fontSize: 8, color: "#3a2060", letterSpacing: "0.05em" }}>
                            Requires: {node.requires.map(r =>
                              tree.nodes.find(n => n.id === r)?.name
                            ).join(", ")}
                          </div>
                        )}

                        {/* Cost pill */}
                        {!unlocked && !locked && (
                          <div style={{
                            marginTop: 8,
                            display: "inline-flex", alignItems: "center", gap: 4,
                            padding: "3px 8px", borderRadius: 8,
                            background: `rgba(${charColorRgb},0.12)`,
                            border: `1px solid rgba(${charColorRgb},0.35)`,
                          }}>
                            <span style={{ fontSize: 9 }}>🔮</span>
                            <span style={{ fontSize: 10, fontWeight: 900, color: charColor }}>1 skill pt</span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Connector arrows */}
                {tierIdx < 2 && (
                  <div className="flex justify-around mt-2 mb-1">
                    {[0, 1, 2].map(col => (
                      <div key={col} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, opacity: 0.35 }}>
                        <div style={{ width: 1, height: 8, background: `rgba(${charColorRgb},0.5)` }} />
                        <div style={{ fontSize: 9, color: charColor }}>▼</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Close */}
        <div className="flex justify-center mt-6 mb-2">
          <button
            onClick={onClose}
            style={{
              padding: "12px 40px",
              borderRadius: 12,
              fontFamily: "'Cinzel Decorative', serif",
              fontSize: 12,
              fontWeight: 900,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              background: `linear-gradient(180deg,${charColor},${charColor}88)`,
              border: `2.5px solid ${charColor}`,
              boxShadow: `0 5px 0 #000, 0 0 20px rgba(${charColorRgb},0.4)`,
              color: "#fff",
              cursor: "pointer",
            }}>
            ⚔ &nbsp; Return to Battle &nbsp; ⚔
          </button>
        </div>
      </div>

      <style>{`
        @keyframes skTwinkle {
          from { opacity: 0.1; transform: scale(0.7); }
          to   { opacity: 0.9; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}