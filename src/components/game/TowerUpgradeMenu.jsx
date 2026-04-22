import { useState } from "react";
import { X, Lock, CheckCircle2, ChevronRight } from "lucide-react";
import { TOWER_TYPES } from "../../lib/gameEngine";
import { getUpgradePaths, getPurchasedTiers } from "../../lib/towerUpgradePaths";

export default function TowerUpgradeMenu({ tower, gold, onBuyUpgrade, onClose }) {
  const [hoveredTier, setHoveredTier] = useState(null);

  if (!tower) return null;

  const base = TOWER_TYPES[tower.type];
  const paths = getUpgradePaths(tower.type);
  const chosenPath = tower.chosenUpgradePath ?? null;

  if (!paths) {
    return (
      <div className="fixed inset-0 z-[140] flex items-center justify-center" onClick={onClose}
        style={{ background: "rgba(0,0,0,0.75)" }}>
        <div className="max-w-sm mx-4 rounded-xl p-6 text-center" onClick={e => e.stopPropagation()}
          style={{ background: "linear-gradient(160deg,#0e0a1e,#08060f)", border: "2px solid rgba(100,60,180,0.4)" }}>
          <div className="text-4xl mb-4">{tower.emoji}</div>
          <p style={{ color: "#a78bfa", fontFamily: "'Cinzel', serif", fontSize: 13 }}>
            No upgrade paths available for this tower yet.
          </p>
          <button onClick={onClose} className="mt-4 px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest"
            style={{ background: "rgba(100,60,180,0.2)", border: "1px solid rgba(167,139,250,0.4)", color: "#a78bfa", cursor: "pointer" }}>
            Close
          </button>
        </div>
      </div>
    );
  }

  const pathData = {
    A: { ...paths.A, tiers: getPurchasedTiers(tower, "A") },
    B: { ...paths.B, tiers: getPurchasedTiers(tower, "B") },
  };

  const isPathLocked = (pathKey) => chosenPath !== null && chosenPath !== pathKey;

  return (
    <div className="fixed inset-0 z-[140] flex items-center justify-center"
      onClick={onClose}
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(4px)" }}>

      <div className="w-full max-w-xl mx-3 rounded-2xl overflow-hidden pointer-events-auto"
        onClick={e => e.stopPropagation()}
        style={{
          background: "linear-gradient(160deg, #0e0a1e 0%, #08060f 100%)",
          border: "2px solid rgba(139,92,246,0.5)",
          boxShadow: "0 0 60px rgba(139,92,246,0.2), 0 20px 40px rgba(0,0,0,0.8)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4"
          style={{ borderBottom: "1px solid rgba(139,92,246,0.2)" }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: "rgba(139,92,246,0.2)", border: "1.5px solid rgba(167,139,250,0.4)" }}>
              {tower.emoji}
            </div>
            <div>
              <h2 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 16, fontWeight: 900, color: "#e9d5ff" }}>
                {base.name}
              </h2>
              <div className="flex items-center gap-3 mt-1">
                <span style={{ fontSize: 10, color: "#7c6faa", fontWeight: 700 }}>
                  ⚔ {tower.damage} DMG &nbsp;·&nbsp; 🎯 {(tower.range / 48).toFixed(1)} RNG &nbsp;·&nbsp; ⚡ {(1000 / tower.fireRate).toFixed(1)}/s
                </span>
              </div>
            </div>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-white/10"
            style={{ color: "#7c6faa", cursor: "pointer" }}>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Gold */}
        <div className="px-5 py-3 flex items-center gap-2"
          style={{ borderBottom: "1px solid rgba(139,92,246,0.12)" }}>
          <span className="text-lg">💰</span>
          <span style={{ fontWeight: 900, color: "#ffd60a", fontSize: 15 }}>{gold}</span>
          <span style={{ color: "#5a4880", fontSize: 11 }}>gold available</span>
          {chosenPath && (
            <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black"
              style={{
                background: `rgba(${chosenPath === "A" ? "245,158,11" : "59,130,246"},0.15)`,
                border: `1px solid ${chosenPath === "A" ? "#f59e0b" : "#3b82f6"}44`,
                color: chosenPath === "A" ? "#f59e0b" : "#60a5fa",
              }}>
              {paths[chosenPath].icon} Path {chosenPath} — {paths[chosenPath].label}
            </div>
          )}
        </div>

        {/* Path info banner — when no path chosen */}
        {!chosenPath && (
          <div className="mx-5 mt-4 px-4 py-2.5 rounded-xl text-center"
            style={{ background: "rgba(139,92,246,0.08)", border: "1px dashed rgba(139,92,246,0.3)" }}>
            <p style={{ fontSize: 10, color: "#7c6faa", fontFamily: "'Cinzel', serif", letterSpacing: "0.1em" }}>
              ⚔ Choose a specialization path — once chosen, the other path is locked forever
            </p>
          </div>
        )}

        {/* Two-column paths */}
        <div className="grid grid-cols-2 gap-4 p-5">
          {(["A", "B"]).map(pathKey => {
            const pd = pathData[pathKey];
            const locked = isPathLocked(pathKey);
            const chosen = chosenPath === pathKey;

            return (
              <div key={pathKey}
                style={{
                  borderRadius: 16,
                  border: chosen
                    ? `2px solid ${pd.color}88`
                    : locked
                    ? "2px solid rgba(40,30,70,0.4)"
                    : `2px solid ${pd.color}33`,
                  background: locked
                    ? "rgba(10,8,20,0.6)"
                    : chosen
                    ? `rgba(${pd.color === "#f59e0b" ? "245,158,11" : pd.color === "#10b981" ? "16,185,129" : pd.color === "#a855f7" ? "168,85,247" : pd.color === "#ef4444" ? "239,68,68" : pd.color === "#38bdf8" ? "56,189,248" : pd.color === "#06b6d4" ? "6,182,212" : pd.color === "#3b82f6" ? "59,130,246" : pd.color === "#f97316" ? "249,115,22" : pd.color === "#78716c" ? "120,113,108" : pd.color === "#818cf8" ? "129,140,248" : "139,92,246"},0.08)`
                    : "rgba(15,10,30,0.8)",
                  opacity: locked ? 0.45 : 1,
                  transition: "all 0.2s",
                  overflow: "hidden",
                }}>

                {/* Path Header */}
                <div className="flex items-center gap-2 px-4 py-3"
                  style={{ borderBottom: `1px solid ${locked ? "rgba(40,30,70,0.3)" : pd.color + "22"}` }}>
                  <span style={{ fontSize: 18 }}>{pd.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div style={{
                      fontSize: 11, fontWeight: 900, fontFamily: "'Cinzel', serif",
                      color: locked ? "#3a2a60" : pd.color,
                      letterSpacing: "0.05em",
                    }}>
                      {pd.label}
                    </div>
                    <div style={{ fontSize: 9, color: locked ? "#2a1a50" : "#5a4880", marginTop: 1 }}>
                      {pd.desc}
                    </div>
                  </div>
                  {locked && <Lock className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#3a2a60" }} />}
                  {chosen && (
                    <div className="text-[8px] font-black px-1.5 py-0.5 rounded-full"
                      style={{ background: pd.color, color: "#000" }}>ACTIVE</div>
                  )}
                </div>

                {/* Tiers */}
                <div className="px-3 py-3 flex flex-col gap-2">
                  {pd.tiers.map((tier, idx) => {
                    const canAfford = gold >= tier.cost;
                    const isHovered = hoveredTier === tier.id;

                    return (
                      <button
                        key={tier.id}
                        disabled={!tier.available || tier.purchased || locked}
                        onClick={() => tier.available && !tier.purchased && !locked && onBuyUpgrade(tier.id, tier.cost)}
                        onMouseEnter={() => setHoveredTier(tier.id)}
                        onMouseLeave={() => setHoveredTier(null)}
                        style={{
                          width: "100%",
                          borderRadius: 10,
                          padding: "10px",
                          textAlign: "left",
                          cursor: tier.purchased ? "default" : tier.available && !locked ? "pointer" : "not-allowed",
                          background: tier.purchased
                            ? `${pd.color}22`
                            : tier.available && !locked
                            ? isHovered && canAfford
                              ? `${pd.color}18`
                              : "rgba(20,15,40,0.6)"
                            : "rgba(10,8,20,0.4)",
                          border: tier.purchased
                            ? `1.5px solid ${pd.color}66`
                            : tier.available && !locked
                            ? isHovered
                              ? `1.5px solid ${pd.color}88`
                              : `1.5px solid ${pd.color}22`
                            : "1.5px solid rgba(30,20,60,0.4)",
                          transform: isHovered && tier.available && !locked && !tier.purchased ? "translateY(-1px)" : "none",
                          transition: "all 0.15s",
                        }}>

                        {/* Tier row */}
                        <div className="flex items-start gap-2">
                          {/* Status icon */}
                          <div style={{
                            width: 22, height: 22, borderRadius: "50%", flexShrink: 0, marginTop: 1,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            background: tier.purchased
                              ? pd.color
                              : tier.available && !locked
                              ? `${pd.color}22`
                              : "rgba(20,15,40,0.5)",
                            border: tier.purchased
                              ? "none"
                              : `1px solid ${tier.available && !locked ? pd.color + "44" : "rgba(30,20,60,0.3)"}`,
                          }}>
                            {tier.purchased
                              ? <CheckCircle2 className="w-3.5 h-3.5" style={{ color: "#fff" }} />
                              : tier.available && !locked
                              ? <span style={{ fontSize: 10 }}>{tier.icon}</span>
                              : <Lock className="w-2.5 h-2.5" style={{ color: "#3a2a60" }} />
                            }
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div style={{
                              fontSize: 11, fontWeight: 900,
                              color: tier.purchased ? pd.color : tier.available && !locked ? "#e9d5ff" : "#3a2a60",
                              fontFamily: "'Cinzel', serif",
                            }}>
                              {tier.name}
                            </div>
                            <div style={{
                              fontSize: 9, lineHeight: 1.4, marginTop: 2,
                              color: tier.purchased ? pd.color + "aa" : tier.available && !locked ? "#7c6faa" : "#2a1a50",
                            }}>
                              {tier.desc}
                            </div>

                            {/* Cost badge / Purchased / Can't afford */}
                            {!tier.purchased && (
                              <div className="mt-2 flex items-center gap-1.5">
                                {tier.available && !locked ? (
                                  <div style={{
                                    display: "inline-flex", alignItems: "center", gap: 4,
                                    padding: "2px 8px", borderRadius: 999, fontSize: 10, fontWeight: 900,
                                    background: canAfford ? `${pd.color}22` : "rgba(80,20,20,0.4)",
                                    border: `1px solid ${canAfford ? pd.color + "66" : "rgba(200,50,50,0.4)"}`,
                                    color: canAfford ? pd.color : "#ef4444",
                                  }}>
                                    💰 {tier.cost}
                                    {!canAfford && <span style={{ fontSize: 8 }}>— need {tier.cost - gold} more</span>}
                                  </div>
                                ) : (
                                  <div style={{ fontSize: 8, color: "#2a1a50" }}>
                                    {locked ? "Path locked" : "Unlock tier " + idx + " first"}
                                  </div>
                                )}
                              </div>
                            )}
                            {tier.purchased && (
                              <div style={{ fontSize: 8, color: pd.color, fontWeight: 700, marginTop: 2 }}>
                                ✓ Upgraded
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Connector arrow to next tier */}
                        {idx < pd.tiers.length - 1 && !tier.purchased && (
                          <div className="flex justify-center mt-2">
                            <ChevronRight className="w-3 h-3 rotate-90" style={{ color: pd.color + "44" }} />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-5 pb-5">
          <button onClick={onClose}
            className="w-full py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all hover:scale-[1.01]"
            style={{
              background: "rgba(139,92,246,0.1)",
              border: "1.5px solid rgba(139,92,246,0.3)",
              color: "#a78bfa",
              cursor: "pointer",
            }}>
            ⚔ Return to Battle
          </button>
        </div>
      </div>
    </div>
  );
}