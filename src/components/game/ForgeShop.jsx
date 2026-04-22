import { useState } from "react";
import { X, ChevronUp, Lock } from "lucide-react";
import { FORGE_UPGRADES } from "../../lib/forgeUpgrades";
import { TOWER_TYPES } from "../../lib/gameEngine";

const TOWER_FILTER_TYPES = ["archer", "cannon", "mage", "frost", "trebuchet", "crossbow", "catapult"];

const TOWER_LABELS = {
  archer: "Archer", cannon: "Cannon", mage: "Mage",
  frost: "Frost", trebuchet: "Trebuchet", crossbow: "Crossbow", catapult: "Catapult",
};

export default function ForgeShop({ show, gold, forgeRanks, onBuy, onClose }) {
  const [filter, setFilter] = useState("all");
  const [hoveredId, setHoveredId] = useState(null);

  if (!show) return null;

  const visible = filter === "all"
    ? FORGE_UPGRADES
    : FORGE_UPGRADES.filter(u => u.towerType === filter);

  const totalSpent = Object.entries(forgeRanks).reduce((acc, [id, rank]) => {
    const upg = FORGE_UPGRADES.find(u => u.id === id);
    if (!upg) return acc;
    // cost per rank scales slightly
    for (let r = 0; r < rank; r++) acc += Math.floor(upg.cost * (1 + r * 0.3));
    return acc;
  }, 0);

  return (
    <div
      className="fixed inset-0 z-[160] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl mx-3 rounded-2xl overflow-hidden flex flex-col"
        style={{
          background: "linear-gradient(160deg,#0f0a1e,#080514)",
          border: "2px solid rgba(251,191,36,0.4)",
          boxShadow: "0 0 60px rgba(251,191,36,0.12), 0 20px 40px rgba(0,0,0,0.8)",
          maxHeight: "88vh",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(251,191,36,0.18)", background: "rgba(251,191,36,0.04)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: "linear-gradient(160deg,#78350f,#451a03)", border: "2px solid #f59e0b", boxShadow: "0 3px 0 #78350f, 0 0 16px rgba(251,191,36,0.3)" }}
            >
              🔨
            </div>
            <div>
              <h2 style={{ fontFamily: "'Cinzel Decorative',serif", fontSize: 18, fontWeight: 900, color: "#fef3c7" }}>
                The Forge
              </h2>
              <p style={{ fontSize: 10, color: "#78350f", fontFamily: "'Cinzel',serif", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 2 }}>
                Permanent Tower Upgrades
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Gold */}
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
              style={{ background: "linear-gradient(180deg,rgba(251,191,36,0.18),rgba(251,191,36,0.06))", border: "1.5px solid rgba(251,191,36,0.4)" }}
            >
              <span style={{ fontSize: 16 }}>💰</span>
              <span style={{ fontWeight: 900, color: "#fbbf24", fontSize: 16 }}>{gold}</span>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:bg-white/10"
              style={{ color: "#78350f", border: "1px solid rgba(251,191,36,0.3)", cursor: "pointer" }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter tabs */}
        <div
          className="flex gap-1.5 px-5 py-3 flex-shrink-0 overflow-x-auto"
          style={{ borderBottom: "1px solid rgba(251,191,36,0.12)" }}
        >
          {["all", ...TOWER_FILTER_TYPES].map(type => {
            const active = filter === type;
            const emoji = type === "all" ? "⚔️" : TOWER_TYPES[type]?.emoji ?? "?";
            return (
              <button
                key={type}
                onClick={() => setFilter(type)}
                style={{
                  flexShrink: 0,
                  padding: "5px 12px",
                  borderRadius: 999,
                  fontSize: 10,
                  fontWeight: 900,
                  fontFamily: "'Cinzel',serif",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  background: active ? "linear-gradient(180deg,#f59e0b,#b45309)" : "rgba(251,191,36,0.06)",
                  border: active ? "1.5px solid #fcd34d" : "1.5px solid rgba(251,191,36,0.2)",
                  color: active ? "#1c0a00" : "#78350f",
                  boxShadow: active ? "0 2px 0 #78350f" : "none",
                  transition: "all 0.15s",
                }}
              >
                {emoji} {type === "all" ? "All" : TOWER_LABELS[type]}
              </button>
            );
          })}
        </div>

        {/* Upgrade grid */}
        <div className="overflow-y-auto flex-1 p-5">
          {visible.length === 0 ? (
            <p className="text-center py-8" style={{ color: "#4a3010", fontFamily: "'Cinzel',serif", fontSize: 13 }}>
              No upgrades available for this filter.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {visible.map(upg => {
                const rank = forgeRanks[upg.id] ?? 0;
                const maxed = rank >= upg.maxRank;
                const rankCost = Math.floor(upg.cost * (1 + rank * 0.3));
                const canAfford = gold >= rankCost;
                const hovered = hoveredId === upg.id;

                return (
                  <div
                    key={upg.id}
                    onMouseEnter={() => setHoveredId(upg.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{
                      borderRadius: 14,
                      border: maxed
                        ? `2px solid ${upg.color}88`
                        : hovered && canAfford
                        ? `2px solid ${upg.color}`
                        : `2px solid ${upg.color}33`,
                      background: maxed
                        ? `${upg.color}14`
                        : hovered
                        ? `${upg.color}0e`
                        : "rgba(15,10,30,0.6)",
                      padding: "14px",
                      transition: "all 0.15s",
                      transform: hovered && !maxed ? "translateY(-2px)" : "none",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                        style={{
                          background: `${upg.color}22`,
                          border: `1.5px solid ${upg.color}55`,
                          fontSize: 20,
                        }}
                      >
                        {upg.icon}
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Name + tower badge */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <span style={{ fontSize: 12, fontWeight: 900, color: "#fef3c7", fontFamily: "'Cinzel',serif" }}>
                            {upg.name}
                          </span>
                          <span
                            style={{
                              fontSize: 8, fontWeight: 700, padding: "1px 6px", borderRadius: 999,
                              background: `${upg.color}22`, border: `1px solid ${upg.color}44`,
                              color: upg.color, textTransform: "uppercase", letterSpacing: "0.1em",
                            }}
                          >
                            {TOWER_TYPES[upg.towerType]?.emoji} {TOWER_LABELS[upg.towerType]}
                          </span>
                        </div>

                        {/* Desc */}
                        <p style={{ fontSize: 10, color: "#7a5a30", marginTop: 3, lineHeight: 1.5 }}>
                          {upg.desc}
                        </p>

                        {/* Rank pips + cost row */}
                        <div className="flex items-center justify-between mt-3 gap-2">
                          {/* Rank pips */}
                          <div className="flex items-center gap-1">
                            {Array.from({ length: upg.maxRank }, (_, i) => (
                              <div
                                key={i}
                                style={{
                                  width: 14, height: 6, borderRadius: 3,
                                  background: i < rank ? upg.color : "rgba(60,40,10,0.4)",
                                  border: `1px solid ${i < rank ? upg.color : "rgba(80,50,15,0.3)"}`,
                                  transition: "background 0.2s",
                                  boxShadow: i < rank ? `0 0 4px ${upg.color}88` : "none",
                                }}
                              />
                            ))}
                            <span style={{ fontSize: 9, color: maxed ? upg.color : "#5a3a10", fontWeight: 700, marginLeft: 4 }}>
                              {rank}/{upg.maxRank}
                            </span>
                          </div>

                          {/* Buy button */}
                          {maxed ? (
                            <div
                              style={{
                                padding: "4px 12px", borderRadius: 999, fontSize: 9, fontWeight: 900,
                                background: `${upg.color}22`, border: `1px solid ${upg.color}55`,
                                color: upg.color, letterSpacing: "0.1em",
                              }}
                            >
                              ✓ MAXED
                            </div>
                          ) : (
                            <button
                              onClick={() => canAfford && onBuy(upg, rankCost)}
                              disabled={!canAfford}
                              style={{
                                display: "flex", alignItems: "center", gap: 5,
                                padding: "5px 12px", borderRadius: 999, fontSize: 10, fontWeight: 900,
                                cursor: canAfford ? "pointer" : "not-allowed",
                                background: canAfford
                                  ? `linear-gradient(180deg,${upg.color},${upg.color}bb)`
                                  : "rgba(40,25,10,0.5)",
                                border: canAfford
                                  ? `1.5px solid ${upg.color}cc`
                                  : "1.5px solid rgba(80,50,20,0.3)",
                                color: canAfford ? "#000" : "#4a2a10",
                                boxShadow: canAfford ? `0 2px 0 ${upg.color}55` : "none",
                                transition: "all 0.15s",
                              }}
                            >
                              {canAfford ? (
                                <>
                                  <ChevronUp className="w-3 h-3" />
                                  💰 {rankCost}
                                </>
                              ) : (
                                <>
                                  <Lock className="w-3 h-3" />
                                  {rankCost}
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="px-5 py-3 flex items-center justify-between flex-shrink-0"
          style={{ borderTop: "1px solid rgba(251,191,36,0.12)", background: "rgba(251,191,36,0.03)" }}
        >
          <p style={{ fontSize: 9, color: "#4a2a10", fontFamily: "'Cinzel',serif", letterSpacing: "0.1em" }}>
            🔨 Forge upgrades apply permanently to ALL towers of that type &nbsp;·&nbsp; 💰 {totalSpent} gold invested
          </p>
          <button
            onClick={onClose}
            style={{
              padding: "8px 22px", borderRadius: 10, fontSize: 10, fontWeight: 900,
              fontFamily: "'Cinzel',serif", letterSpacing: "0.12em", textTransform: "uppercase",
              background: "linear-gradient(180deg,#b45309,#78350f)",
              border: "1.5px solid #f59e0b",
              boxShadow: "0 3px 0 #78350f",
              color: "#fef3c7",
              cursor: "pointer",
            }}
          >
            ⚔ Return to Battle
          </button>
        </div>
      </div>
    </div>
  );
}