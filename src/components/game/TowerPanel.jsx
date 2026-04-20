import { TOWER_TYPES } from "../../lib/gameEngine";

const TOWER_COLORS = {
  archer:  { from: "#b45309", to: "#78350f", border: "#fbbf24", shadow: "#451a03" },
  cannon:  { from: "#374151", to: "#1f2937", border: "#9ca3af", shadow: "#111827" },
  mage:    { from: "#6d28d9", to: "#4c1d95", border: "#a78bfa", shadow: "#2e1065" },
  frost:   { from: "#0ea5e9", to: "#0369a1", border: "#7dd3fc", shadow: "#082f49" },
  trebuchet: { from: "#92400e", to: "#78350f", border: "#fb923c", shadow: "#431407" },
  catapult:  { from: "#a16207", to: "#854d0e", border: "#fcd34d", shadow: "#3f2005" },
  crossbow:  { from: "#78350f", to: "#57230a", border: "#d97706", shadow: "#2c1004" },
};

export default function TowerPanel({ selectedTower, onSelect, gold }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-center mb-2">
        <span className="text-[10px] font-black uppercase tracking-[0.25em]"
          style={{ color: "#c9b4f7", textShadow: "0 0 10px rgba(168,85,247,0.5)" }}>
          ⚔ Deploy Troops ⚔
        </span>
      </div>

      {Object.entries(TOWER_TYPES).filter(([, t]) => !t.isMerged).map(([key, tower]) => {
        const canAfford = gold >= tower.cost;
        const isSelected = selectedTower === key;
        const colors = TOWER_COLORS[key] || TOWER_COLORS.cannon;

        return (
          <button
            key={key}
            onClick={() => onSelect(isSelected ? null : key)}
            disabled={!canAfford}
            className="relative flex items-center gap-2.5 text-left transition-all duration-150 rounded-xl"
            style={{
              padding: "8px 10px",
              background: isSelected
                ? `linear-gradient(160deg, ${colors.from}, ${colors.to})`
                : "linear-gradient(160deg, #1e1b2e, #13101f)",
              border: `2px solid ${isSelected ? colors.border : "rgba(100,80,140,0.35)"}`,
              boxShadow: isSelected
                ? `0 4px 0 ${colors.shadow}, 0 0 20px ${colors.border}, 0 0 40px ${colors.border}66`
                : "0 3px 0 #0a0814, 0 0 10px rgba(100,80,140,0.2)",
              opacity: canAfford ? 1 : 0.38,
              cursor: canAfford ? "pointer" : "not-allowed",
              transform: isSelected ? "translateY(2px) scale(1.02)" : "translateY(0) scale(1)",
              transition: "all 0.2s",
            }}
          >
            {/* Tower icon bubble */}
            <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-xl"
              style={{
                background: isSelected
                  ? "rgba(255,255,255,0.15)"
                  : `linear-gradient(160deg, ${colors.from}88, ${colors.to}88)`,
                border: `1.5px solid ${colors.border}66`,
              }}>
              {tower.emoji}
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-xs font-black truncate" style={{ color: isSelected ? "#fff" : "#d4c9f0" }}>
                {tower.name}
              </div>
              <div className="text-[9px]" style={{ color: isSelected ? "rgba(255,255,255,0.6)" : "#6b5fa0" }}>
                {tower.description}
              </div>
            </div>

            {/* Cost badge */}
            <div className="flex-shrink-0 flex items-center gap-0.5 px-2 py-0.5 rounded-full font-black text-[10px]"
              style={{
                background: "linear-gradient(180deg, #ffd60a, #e09c00)",
                color: "#3a2000",
                boxShadow: "0 2px 0 #7a5200",
              }}>
              💰{tower.cost}
            </div>
          </button>
        );
      })}
    </div>
  );
}