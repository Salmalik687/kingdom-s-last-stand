import { X } from "lucide-react";
import { TOWER_TYPES } from "../../lib/gameEngine";

const PURCHASABLE_TOWERS = [
  { id: "mage", unlock: true, cost: 500, category: "Magic" },
  { id: "frost", unlock: true, cost: 600, category: "Magic" },
  { id: "trebuchet", unlock: true, cost: 400, category: "Siege" },
  { id: "crossbow", unlock: true, cost: 350, category: "Precision" },
  { id: "archer", unlock: false, cost: 200, category: "Basic" },
];

export default function TowerShop({ show, gold, unlockedTowers, onPurchase, onClose }) {
  if (!show) return null;

  const handlePurchase = (towerId, cost) => {
    if (gold >= cost && !unlockedTowers.includes(towerId)) {
      onPurchase(towerId, cost);
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.8)" }}>

      <div className="relative max-w-lg w-full mx-4 rounded-2xl p-8"
        style={{
          background: "linear-gradient(160deg, #1a1535, #100e22)",
          border: "2px solid rgba(100,60,180,0.5)",
          boxShadow: "0 6px 0 #05030f, 0 0 30px rgba(100,60,200,0.15)",
        }}>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl hover:opacity-70 transition-opacity"
        >
          <X className="w-6 h-6" style={{ color: "#a78bfa" }} />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-black uppercase tracking-[0.15em] mb-2"
          style={{
            fontFamily: "'Cinzel Decorative', serif",
            background: "linear-gradient(135deg, #a78bfa, #ffd60a)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
          Tower Arsenal
        </h2>
        <p className="text-xs uppercase tracking-widest mb-6" style={{ color: "#7c5fa0" }}>
          Unlock powerful new towers
        </p>

        {/* Gold display */}
        <div className="mb-6 flex items-center gap-2 px-4 py-2 rounded-lg"
          style={{ background: "rgba(255,214,10,0.1)", border: "1px solid rgba(255,214,10,0.3)" }}>
          <span className="text-2xl">💰</span>
          <span style={{ color: "#ffd60a", fontWeight: 900 }}>{gold} Gold</span>
        </div>

        {/* Tower grid */}
        <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
          {PURCHASABLE_TOWERS.map(item => {
            const tower = TOWER_TYPES[item.id];
            const isUnlocked = unlockedTowers.includes(item.id);
            const canAfford = gold >= item.cost;

            return (
              <div
                key={item.id}
                className="rounded-lg p-4 transition-all"
                style={{
                  background: isUnlocked
                    ? "rgba(50,100,50,0.15)"
                    : canAfford
                      ? "rgba(100,60,180,0.15)"
                      : "rgba(60,40,60,0.1)",
                  border: isUnlocked
                    ? "1px solid rgba(100,200,100,0.4)"
                    : canAfford
                      ? "1px solid rgba(167,139,250,0.4)"
                      : "1px solid rgba(100,100,100,0.2)",
                  cursor: !isUnlocked && canAfford ? "pointer" : "default",
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="text-3xl">{tower.emoji}</div>
                    <div>
                      <h3 style={{ color: "#f0e6ff", fontWeight: 700, marginBottom: 2 }}>
                        {tower.name}
                      </h3>
                      <p style={{ color: "#a0a0c8", fontSize: 12, marginBottom: 4 }}>
                        {item.category} • Damage: {tower.damage}, Range: {tower.range.toFixed(1)}
                      </p>
                      <p style={{ color: "#7c5fa0", fontSize: 11 }}>
                        {tower.description}
                      </p>
                    </div>
                  </div>

                  {/* Purchase button */}
                  <div className="ml-3">
                    {isUnlocked ? (
                      <div className="px-3 py-1 rounded-lg text-xs font-bold uppercase"
                        style={{ background: "rgba(100,200,100,0.3)", color: "#86efac" }}>
                        ✓ Unlocked
                      </div>
                    ) : (
                      <button
                        onClick={() => handlePurchase(item.id, item.cost)}
                        disabled={!canAfford}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all"
                        style={{
                          background: canAfford
                            ? "linear-gradient(180deg, #7c3aed, #4c1d95)"
                            : "linear-gradient(180deg, #374151, #1f2937)",
                          color: canAfford ? "#e9d5ff" : "#6b7280",
                          border: canAfford ? "1px solid #a78bfa" : "1px solid #4b5563",
                          cursor: canAfford ? "pointer" : "not-allowed",
                          opacity: canAfford ? 1 : 0.6,
                        }}
                      >
                        {item.cost}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-rgba(100,60,180,0.2)"
          style={{ borderColor: "rgba(100,60,180,0.2)" }}>
          <button
            onClick={onClose}
            className="w-full py-2 rounded-lg font-bold uppercase text-sm transition-all"
            style={{
              background: "rgba(100,60,180,0.2)",
              border: "1px solid rgba(100,60,180,0.4)",
              color: "#a78bfa",
            }}
          >
            Close Shop
          </button>
        </div>
      </div>
    </div>
  );
}