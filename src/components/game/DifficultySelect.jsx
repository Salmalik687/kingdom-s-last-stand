import { useState } from "react";

const DIFFICULTIES = [
  {
    id: "easy",
    name: "Easy",
    emoji: "🌱",
    desc: "Relaxed pace. More gold, slower enemies",
    goldMult: 1.5,
    hpMult: 0.7,
    speedMult: 0.8,
    dmgMult: 0.7,
    color: "#10b981",
  },
  {
    id: "normal",
    name: "Normal",
    emoji: "⚔️",
    desc: "Balanced challenge. Standard difficulty",
    goldMult: 1.0,
    hpMult: 1.0,
    speedMult: 1.0,
    dmgMult: 1.0,
    color: "#3b82f6",
  },
  {
    id: "hard",
    name: "Hard",
    emoji: "🔥",
    desc: "Intense. Tougher enemies, less gold",
    goldMult: 0.75,
    hpMult: 1.4,
    speedMult: 1.15,
    dmgMult: 1.5,
    color: "#f97316",
  },
  {
    id: "nightmare",
    name: "Nightmare",
    emoji: "💀",
    desc: "Insane. Enemies deal 2x damage (3 hearts). Very hard to win",
    goldMult: 0.5,
    hpMult: 1.8,
    speedMult: 1.3,
    dmgMult: 2.0,
    color: "#dc2626",
  },
];

export default function DifficultySelect({ onSelect }) {
  const [selected, setSelected] = useState("normal");

  const handleSelect = () => {
    const diff = DIFFICULTIES.find(d => d.id === selected);
    onSelect(diff);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, rgba(10,4,20,0.98) 0%, rgba(20,10,40,0.98) 50%, rgba(10,4,20,0.98) 100%)",
      }}>

      {/* Background stars */}
      {Array.from({ length: 40 }).map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${(i * 37 + 5) % 100}%`,
          top: `${(i * 23 + 2) % 100}%`,
          width: i % 3 === 0 ? 2 : 1,
          height: i % 3 === 0 ? 2 : 1,
          borderRadius: "50%",
          background: `rgba(200,180,255,${0.3 + (i % 5) * 0.12})`,
          animation: `twinkle ${1.2 + (i % 5) * 0.4}s ease-in-out ${(i % 3) * 0.3}s infinite`,
        }} />
      ))}

      <div className="relative max-w-2xl w-full mx-4" style={{ zIndex: 10 }}>
        {/* Title */}
        <div style={{
          textAlign: "center",
          marginBottom: 40,
          fontSize: "clamp(24px, 5vw, 42px)",
          fontFamily: "'Cinzel Decorative', serif",
          fontWeight: 900,
          color: "#e9d5ff",
          letterSpacing: "0.08em",
          textShadow: "0 0 30px rgba(168,85,247,0.5)",
        }}>
          ⚔️ CHOOSE YOUR DIFFICULTY ⚔️
        </div>

        {/* Difficulty cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 32,
        }} className="w-full">
          {DIFFICULTIES.map((diff) => (
            <button
              key={diff.id}
              onClick={() => setSelected(diff.id)}
              style={{
                padding: 20,
                borderRadius: 12,
                border: selected === diff.id ? `3px solid ${diff.color}` : `2px solid ${diff.color}40`,
                background: selected === diff.id
                  ? `linear-gradient(160deg, ${diff.color}30, ${diff.color}10)`
                  : `linear-gradient(160deg, ${diff.color}15, ${diff.color}05)`,
                cursor: "pointer",
                transition: "all 0.3s",
                boxShadow: selected === diff.id ? `0 0 30px ${diff.color}50` : "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = `0 0 20px ${diff.color}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                if (selected !== diff.id) e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{
                fontSize: 32,
                marginBottom: 8,
                filter: selected === diff.id ? `drop-shadow(0 0 12px ${diff.color})` : "none",
              }}>
                {diff.emoji}
              </div>
              <h3 style={{
                fontSize: 16,
                fontWeight: 900,
                color: diff.color,
                marginBottom: 6,
                fontFamily: "'Cinzel', serif",
                letterSpacing: "0.05em",
              }}>
                {diff.name}
              </h3>
              <p style={{
                fontSize: 11,
                color: "rgba(240,230,255,0.6)",
                fontFamily: "'Cinzel', serif",
                lineHeight: 1.4,
                marginBottom: 10,
              }}>
                {diff.desc}
              </p>

              {/* Modifier badges */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 6,
                fontSize: 9,
                fontFamily: "'Cinzel', serif",
              }}>
                <div style={{
                  padding: 6,
                  borderRadius: 4,
                  background: `${diff.color}20`,
                  color: diff.color,
                  fontWeight: 700,
                }}>
                  💰 {(diff.goldMult * 100).toFixed(0)}% Gold
                </div>
                <div style={{
                  padding: 6,
                  borderRadius: 4,
                  background: `${diff.color}20`,
                  color: diff.color,
                  fontWeight: 700,
                }}>
                  {diff.hpMult > 1 ? "📈" : "📉"} {(diff.hpMult * 100).toFixed(0)}% HP
                </div>
                <div style={{
                  padding: 6,
                  borderRadius: 4,
                  background: `${diff.color}20`,
                  color: diff.color,
                  fontWeight: 700,
                  gridColumn: "1 / -1",
                }}>
                  {diff.speedMult > 1 ? "⚡" : "🐢"} {(diff.speedMult * 100).toFixed(0)}% Speed
                </div>
                <div style={{
                  padding: 6,
                  borderRadius: 4,
                  background: `${diff.color}20`,
                  color: diff.color,
                  fontWeight: 700,
                  gridColumn: "1 / -1",
                }}>
                  {diff.dmgMult > 1 ? "⚔️" : "🛡️"} {(diff.dmgMult * 100).toFixed(0)}% Damage
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Start button */}
        <button
          onClick={handleSelect}
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 900,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontFamily: "'Cinzel', serif",
            background: "linear-gradient(180deg, #7c3aed, #5b21b6)",
            border: "3px solid #a78bfa",
            color: "#e9d5ff",
            cursor: "pointer",
            boxShadow: "0 8px 0 #2a1a4a, 0 0 30px rgba(168,85,250,0.6)",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow = "0 10px 0 #2a1a4a, 0 0 40px rgba(168,85,250,0.8)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 8px 0 #2a1a4a, 0 0 30px rgba(168,85,250,0.6)";
          }}
        >
          🎮 Begin Adventure
        </button>
      </div>

      <style>{`
        @keyframes twinkle {
          0%,100%{opacity:0.3;transform:scale(0.8)}
          50%{opacity:1;transform:scale(1.2)}
        }
      `}</style>
    </div>
  );
}