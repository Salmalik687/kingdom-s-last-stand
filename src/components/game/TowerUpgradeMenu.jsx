import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { TOWER_TYPES } from "../../lib/gameEngine";

export default function TowerUpgradeMenu({ tower, gold, onUpgrade, onClose }) {
  const [expanded, setExpanded] = useState(null);

  if (!tower) return null;

  const base = TOWER_TYPES[tower.type];
  const upgradeCost = Math.floor(base.upgradeCost * tower.level);
  const canUpgrade = gold >= upgradeCost && tower.level < 5;

  const upgrades = [
    {
      id: "damage",
      name: "Damage",
      icon: "⚔️",
      desc: `Increase attack power. Next: ${(Math.floor(base.damage * (1 + tower.level * 0.4)) + Math.floor(base.damage * 0.4)).toString()}`,
      bonus: `+${Math.floor(base.damage * 0.4)} dmg`,
      color: "#ef4444",
    },
    {
      id: "range",
      icon: "📡",
      name: "Range",
      desc: "Extend attack range by 10%",
      bonus: "+10% range",
      color: "#3b82f6",
    },
    {
      id: "firerate",
      icon: "⚡",
      name: "Attack Speed",
      desc: "Reduce fire rate by 8%",
      bonus: "8% faster",
      color: "#f59e0b",
    },
  ];

  const handleUpgrade = () => {
    if (canUpgrade) {
      onUpgrade(tower);
    }
  };

  return (
    <div className="fixed inset-0 z-[140] flex items-center justify-center" onClick={onClose}
      style={{ background: "rgba(0,0,0,0.7)" }}>

      <div className="w-full max-w-sm mx-4 rounded-xl p-6 pointer-events-auto"
        style={{
          background: "linear-gradient(160deg, rgba(10,4,20,0.98) 0%, rgba(20,10,30,0.98) 100%)",
          border: "2px solid rgba(138,85,200,0.5)",
          boxShadow: "0 0 60px rgba(138,85,200,0.3), inset 0 1px 0 rgba(138,85,200,0.1)",
          backdropFilter: "blur(10px)",
        }}
        onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div style={{ fontSize: 28 }}>{base.emoji}</div>
            <button onClick={onClose} className="text-stone-400 hover:text-stone-200 text-xl font-bold">✕</button>
          </div>
          <h2 style={{
            fontSize: 18, fontWeight: 900, color: "#e9d5ff",
            fontFamily: "'Cinzel', serif", letterSpacing: "0.05em", marginBottom: 2
          }}>
            {base.name}
          </h2>
          <p style={{ fontSize: 11, color: "rgba(240,230,255,0.6)", fontFamily: "'Cinzel', serif" }}>
            Level {tower.level}/5
          </p>
        </div>

        {/* Level progress bar */}
        <div className="mb-6">
          <div style={{
            display: "flex", gap: 4, marginBottom: 8
          }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} style={{
                flex: 1, height: 4, borderRadius: 2,
                background: i < tower.level ? "#7c3aed" : "rgba(100,60,180,0.2)",
                boxShadow: i < tower.level ? "0 0 8px #7c3aed" : "none"
              }} />
            ))}
          </div>
          <div style={{
            fontSize: 11, color: "rgba(240,230,255,0.7)", textAlign: "center",
            fontFamily: "'Cinzel', serif"
          }}>
            Upgrade Cost: {canUpgrade ? `💰 ${upgradeCost}` : tower.level === 5 ? "✓ MAX LEVEL" : `❌ Need ${upgradeCost - gold} more gold`}
          </div>
        </div>

        {/* Current stats */}
        <div className="mb-6 p-3 rounded-lg" style={{ background: "rgba(100,60,180,0.1)", border: "1px solid rgba(100,60,180,0.2)" }}>
          <p style={{ fontSize: 10, color: "#a78bfa", fontWeight: 700, marginBottom: 6, letterSpacing: "0.2em" }}>CURRENT STATS</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <div>
              <div style={{ fontSize: 9, color: "rgba(240,230,255,0.5)", marginBottom: 2 }}>Damage</div>
              <div style={{ fontSize: 14, fontWeight: 900, color: "#ef4444" }}>{tower.damage}</div>
            </div>
            <div>
              <div style={{ fontSize: 9, color: "rgba(240,230,255,0.5)", marginBottom: 2 }}>Fire Rate</div>
              <div style={{ fontSize: 14, fontWeight: 900, color: "#f59e0b" }}>{Math.round(tower.fireRate)}ms</div>
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <div style={{ fontSize: 9, color: "rgba(240,230,255,0.5)", marginBottom: 2 }}>Range</div>
              <div style={{ fontSize: 14, fontWeight: 900, color: "#3b82f6" }}>{(tower.range / 48).toFixed(1)} tiles</div>
            </div>
          </div>
        </div>

        {/* Upgrade benefits - collapsible */}
        <div className="space-y-2 mb-6">
          {upgrades.map((upg) => (
            <div key={upg.id} style={{
              border: `1px solid ${upg.color}40`,
              borderRadius: 8,
              overflow: "hidden",
              background: `${upg.color}15`
            }}>
              <button
                onClick={() => setExpanded(expanded === upg.id ? null : upg.id)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  background: "transparent", border: "none", cursor: "pointer",
                  color: upg.color
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ fontSize: 16 }}>{upg.icon}</div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: upg.color }}>{upg.name}</div>
                    <div style={{ fontSize: 9, color: `${upg.color}aa` }}>{upg.bonus}</div>
                  </div>
                </div>
                {expanded === upg.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {expanded === upg.id && (
                <div style={{
                  padding: "0 12px 10px 12px",
                  borderTop: `1px solid ${upg.color}40`,
                  fontSize: 11,
                  color: "rgba(240,230,255,0.7)",
                  fontFamily: "'Cinzel', serif"
                }}>
                  {upg.desc}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Upgrade button */}
        <button
          onClick={handleUpgrade}
          disabled={!canUpgrade}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 900,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontFamily: "'Cinzel', serif",
            background: canUpgrade
              ? "linear-gradient(180deg, #7c3aed, #5b21b6)"
              : "linear-gradient(180deg, #3a2a5a, #2a1a4a)",
            border: canUpgrade ? "2px solid #a78bfa" : "2px solid rgba(100,60,180,0.3)",
            color: canUpgrade ? "#e9d5ff" : "#8a6fb5",
            cursor: canUpgrade ? "pointer" : "not-allowed",
            boxShadow: canUpgrade ? "0 6px 0 #2a1a4a, 0 0 20px rgba(168,85,250,0.5)" : "none",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => {
            if (canUpgrade) e.target.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
          }}
        >
          {canUpgrade ? `⬆ Upgrade for ${upgradeCost} Gold` : tower.level === 5 ? "✓ MAX LEVEL" : "❌ Not Enough Gold"}
        </button>

        {/* Sell option */}
        <button
          onClick={onClose}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: 8,
            borderRadius: 6,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            background: "transparent",
            border: "1px solid rgba(100,60,180,0.3)",
            color: "#a78bfa",
            cursor: "pointer",
            fontFamily: "'Cinzel', serif",
            transition: "all 0.3s"
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(100,60,180,0.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "transparent";
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}