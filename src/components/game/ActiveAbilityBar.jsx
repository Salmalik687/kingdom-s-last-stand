import { useEffect, useState } from "react";
import { ABILITY_TREE } from "./AbilityTree";
import AbilityVisualEffect from "./AbilityVisualEffect";

export default function ActiveAbilityBar({ unlockedAbilities, onActivate, disabled }) {
  const [cooldowns, setCooldowns] = useState({});
  const [activating, setActivating] = useState(null);
  const [activeEffect, setActiveEffect] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCooldowns(prev => {
        const next = { ...prev };
        let changed = false;
        Object.keys(next).forEach(id => {
          if (next[id] > 0) {
            next[id] = Math.max(0, next[id] - 0.1);
            changed = true;
          }
        });
        return changed ? next : prev;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const abilities = ABILITY_TREE.filter(a => unlockedAbilities.includes(a.id));

  if (abilities.length === 0) return null;

  const handleClick = (ability) => {
    if (disabled) return;
    const cd = cooldowns[ability.id] ?? 0;
    if (cd > 0) return;
    setActivating(ability.id);
    setActiveEffect(ability.id);
    setCooldowns(prev => ({ ...prev, [ability.id]: ability.cooldown }));
    onActivate(ability.id);
    setTimeout(() => setActivating(null), 600);
  };

  return (
    <div className="flex items-center justify-center gap-2 flex-wrap mt-2">
      <div style={{ fontSize: 9, fontWeight: 900, color: "#5a4880", letterSpacing: "0.2em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
        ⚡ Abilities
      </div>
      {abilities.map(ability => {
        const cd = cooldowns[ability.id] ?? 0;
        const pct = cd / ability.cooldown;
        const isReady = cd <= 0;
        const isActivating = activating === ability.id;

        return (
          <button
            key={ability.id}
            onClick={() => handleClick(ability)}
            title={`${ability.name} — ${ability.desc}`}
            style={{
              position: "relative",
              width: 48,
              height: 48,
              borderRadius: 12,
              border: `2px solid ${isReady ? ability.color : "rgba(80,60,120,0.4)"}`,
              background: isReady
                ? `linear-gradient(160deg,rgba(${ability.colorRgb},0.25),rgba(${ability.colorRgb},0.08))`
                : "linear-gradient(160deg,#0a0814,#060510)",
              boxShadow: isReady
                ? `0 0 14px rgba(${ability.colorRgb},0.4), 0 3px 0 #000`
                : "0 3px 0 #000",
              cursor: isReady && !disabled ? "pointer" : "default",
              opacity: disabled ? 0.5 : 1,
              transform: isActivating ? "scale(1.2)" : isReady ? "scale(1)" : "scale(0.95)",
              transition: "all 0.15s",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}>

            {/* Cooldown overlay */}
            {!isReady && (
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: `${pct * 100}%`,
                background: "rgba(0,0,0,0.65)",
                borderRadius: "0 0 10px 10px",
                transition: "height 0.1s linear",
              }} />
            )}

            {/* Emoji */}
            <div style={{
              fontSize: 22,
              filter: isReady ? `drop-shadow(0 0 6px ${ability.color})` : "grayscale(0.8)",
              position: "relative",
              zIndex: 1,
            }}>{ability.emoji}</div>

            {/* Cooldown text */}
            {!isReady && (
              <div style={{
                position: "absolute",
                bottom: 2,
                fontSize: 8,
                fontWeight: 900,
                color: "#fff",
                zIndex: 2,
                textShadow: "0 0 4px #000",
              }}>{Math.ceil(cd)}s</div>
            )}

            {/* Ready flash */}
            {isActivating && (
              <div style={{
                position: "absolute",
                inset: 0,
                borderRadius: 10,
                background: `rgba(${ability.colorRgb},0.6)`,
                animation: "abilityFlash 0.5s ease-out forwards",
              }} />
            )}
          </button>
        );
      })}
      {activeEffect && (
        <AbilityVisualEffect
          abilityId={activeEffect}
          onDone={() => setActiveEffect(null)}
        />
      )}
      <style>{`
        @keyframes abilityFlash {
          0%   { opacity: 0.8; transform: scale(1); }
          100% { opacity: 0;   transform: scale(1.5); }
        }
      `}</style>
    </div>
  );
}