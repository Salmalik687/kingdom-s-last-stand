import { useState } from "react";
import { TOWER_TYPES, TOWER_ABILITIES, getUnlockedAbilities } from "../../lib/gameEngine";
import { ArrowUp, Trash2, Lock, Palette } from "lucide-react";
import TowerCustomizationMenu from "./TowerCustomizationMenu";

export default function TowerInfoPanel({ tower, gold, onUpgrade, onSell, onCustomize }) {
  const [showCustomize, setShowCustomize] = useState(false);
  if (!tower) return null;

  const base = TOWER_TYPES[tower.type];
  const upgradeCost = Math.floor(base.upgradeCost * tower.level);
  const sellValue = Math.floor(base.cost * 0.6 * tower.level);
  const canUpgrade = gold >= upgradeCost && tower.level < 5;
  const stars = Array.from({ length: 5 }, (_, i) => i < tower.level);

  const unlockedAbilities = getUnlockedAbilities(tower);
  const allAbilities = TOWER_ABILITIES[tower.type] ?? {};
  const nextAbility = tower.level < 5 ? allAbilities[tower.level + 1] : null;

  return (
    <div className="mt-3 rounded-xl overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #1a1535, #100e22)",
        border: "2px solid rgba(139,92,246,0.4)",
        boxShadow: "0 4px 0 #05030f, 0 0 20px rgba(139,92,246,0.15)",
      }}>

      {/* Header */}
      <div className="flex items-center gap-2 px-3 pt-3 pb-2"
        style={{ borderBottom: "1px solid rgba(139,92,246,0.2)" }}>
        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-2xl flex-shrink-0"
          style={{ background: "rgba(139,92,246,0.2)", border: "1.5px solid rgba(167,139,250,0.4)" }}>
          {tower.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-black text-white truncate">{base.name}</div>
          <div className="flex gap-0.5 mt-0.5">
            {stars.map((filled, i) => (
              <span key={i} className="text-[10px]" style={{ color: filled ? "#fbbf24" : "#2d2750" }}>★</span>
            ))}
          </div>
        </div>
        <div className="text-[10px] font-black px-1.5 py-0.5 rounded-full"
          style={{
            background: "linear-gradient(180deg, #a78bfa, #7c3aed)",
            color: "#fff",
            boxShadow: "0 2px 0 #3b0764",
          }}>
          Lv.{tower.level}
        </div>
      </div>

      {/* Stats */}
      <div className="px-3 py-2 grid grid-cols-3 gap-1 text-center">
        {[
          { label: "DMG", value: tower.damage, icon: "⚔️" },
          { label: "RNG", value: `${(tower.range / 48).toFixed(1)}`, icon: "🎯" },
          { label: "SPD", value: `${(1000 / tower.fireRate).toFixed(1)}`, icon: "⚡" },
        ].map(s => (
          <div key={s.label} className="rounded-lg py-1.5"
            style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)" }}>
            <div className="text-[9px] mb-0.5" style={{ color: "#7c6faa" }}>{s.icon} {s.label}</div>
            <div className="text-xs font-black text-white">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Unlocked Abilities */}
      {unlockedAbilities.length > 0 && (
        <div className="px-3 pb-2">
          <div className="text-[9px] font-bold uppercase tracking-widest mb-1.5" style={{ color: "#6b5fa0" }}>
            ✨ Abilities
          </div>
          <div className="flex flex-col gap-1">
            {unlockedAbilities.map((ab) => (
              <div key={ab.id} className="flex items-center gap-1.5 px-2 py-1 rounded-lg"
                style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)" }}>
                <span className="text-sm">{ab.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-black text-purple-200 truncate">{ab.label}</div>
                  <div className="text-[8px] leading-tight" style={{ color: "#7c6faa" }}>{ab.desc}</div>
                </div>
                <div className="text-[8px] font-bold px-1 rounded" style={{ background: "rgba(139,92,246,0.3)", color: "#c4b5fd" }}>
                  Lv{ab.level}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next ability preview */}
      {nextAbility && tower.level < 5 && (
        <div className="px-3 pb-2">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg"
            style={{ background: "rgba(50,40,80,0.4)", border: "1px dashed rgba(100,80,160,0.3)" }}>
            <Lock className="w-3 h-3 flex-shrink-0" style={{ color: "#4a4070" }} />
            <div className="flex-1 min-w-0">
              <div className="text-[9px] font-bold" style={{ color: "#4a4070" }}>
                Lv{tower.level + 1}: {nextAbility.icon} {nextAbility.label}
              </div>
              <div className="text-[8px] leading-tight" style={{ color: "#3a3060" }}>{nextAbility.desc}</div>
            </div>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-2 px-3 pb-2">
        <button
          disabled={!canUpgrade}
          onClick={() => onUpgrade(tower)}
          className="flex-1 flex items-center justify-center gap-1 rounded-lg py-2 font-black text-xs transition-all"
          style={{
            background: canUpgrade
              ? "linear-gradient(180deg, #ffd60a, #e09c00)"
              : "linear-gradient(180deg, #2d2a3e, #1e1b2e)",
            border: `2px solid ${canUpgrade ? "#ffe566" : "#3d3960"}`,
            boxShadow: canUpgrade ? "0 3px 0 #7a5200" : "0 3px 0 #0a0814",
            color: canUpgrade ? "#3a2000" : "#4a4670",
            cursor: canUpgrade ? "pointer" : "not-allowed",
          }}>
          <ArrowUp className="w-3 h-3" />
          {tower.level >= 5 ? "MAX" : `💰${upgradeCost}`}
        </button>

        <button
          onClick={() => onSell(tower)}
          className="flex items-center justify-center gap-1 rounded-lg py-2 px-3 font-black text-xs transition-all"
          style={{
            background: "linear-gradient(180deg, #ef4444, #b91c1c)",
            border: "2px solid #fca5a5",
            boxShadow: "0 3px 0 #450a0a",
            color: "#fff",
            cursor: "pointer",
          }}>
          <Trash2 className="w-3 h-3" />
          {sellValue}g
        </button>
      </div>

      {/* Customize button */}
      <div className="px-3 pb-3">
        <button
          onClick={() => setShowCustomize(true)}
          className="w-full flex items-center justify-center gap-2 rounded-lg py-2 font-black text-xs uppercase tracking-wider transition-all hover:scale-[1.02]"
          style={{
            background: "linear-gradient(180deg, #1e163a, #150f2e)",
            border: "2px solid rgba(167,139,250,0.5)",
            boxShadow: "0 2px 0 #04020a, 0 0 10px rgba(139,92,246,0.2)",
            color: "#c4b5fd",
          }}>
          <Palette className="w-3 h-3" />
          🎨 Customize Tower
        </button>
      </div>

      {showCustomize && (
        <TowerCustomizationMenu
          tower={tower}
          onApply={(id, opts) => onCustomize && onCustomize(id, opts)}
          onClose={() => setShowCustomize(false)}
        />
      )}
    </div>
  );
}