import { X } from "lucide-react";

export default function CharacterStatsPanel({ character, onClose }) {
  if (!character) return null;

  const stats = [
    { label: "Health", value: character.stats.healthBonus, icon: "❤️", color: "#ff6b6b" },
    { label: "Agility", value: character.stats.rangeBonus, icon: "⚡", color: "#ffd60a" },
    { label: "Power", value: character.stats.damageBonus, icon: "⚔️", color: "#f97316" },
  ];

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center" onClick={onClose}>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
      
      <div
        className="relative w-96 rounded-2xl p-8 border-2 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "linear-gradient(160deg, rgba(10,4,20,0.98) 0%, rgba(20,10,40,0.98) 100%)",
          borderColor: character.color,
          boxShadow: `0 0 40px ${character.color}80, 0 0 80px ${character.color}40`,
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-white/10 rounded transition-all"
        >
          <X size={20} color="#e9d5ff" />
        </button>

        {/* Character name and emoji */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">{character.emoji}</div>
          <h2
            className="text-2xl font-black tracking-widest uppercase mb-1"
            style={{
              color: character.color,
              textShadow: `0 0 15px ${character.color}`,
            }}
          >
            {character.name}
          </h2>
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest">
            {character.title}
          </p>
        </div>

        {/* Stats grid */}
        <div className="space-y-4">
          {stats.map((stat, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold uppercase tracking-wider text-gray-300">
                  {stat.icon} {stat.label}
                </label>
                <span
                  className="text-lg font-black"
                  style={{ color: stat.color }}
                >
                  +{Math.round(stat.value * 100)}%
                </span>
              </div>
              <div
                className="h-3 rounded-full overflow-hidden"
                style={{
                  background: "rgba(0,0,0,0.3)",
                  border: `1px solid ${stat.color}40`,
                }}
              >
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${Math.min(stat.value * 100, 100)}%`,
                    background: `linear-gradient(90deg, ${stat.color}60, ${stat.color})`,
                    boxShadow: `0 0 10px ${stat.color}`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Ability unlock indicator */}
        {character.abilityUnlocked && (
          <div
            className="mt-6 p-3 rounded-lg text-center border"
            style={{
              background: `${character.color}15`,
              borderColor: `${character.color}60`,
            }}
          >
            <p className="text-sm font-bold text-purple-300">
              ✨ Unique Ability: <span style={{ color: character.color }}>Unlocked</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}