import { useEffect, useState } from "react";

const DEFEAT_LINES = [
  "The darkness consumes all...",
  "Eldenmoor weeps for its fallen champion.",
  "The realm crumbles beneath shadow and flame.",
  "Even legends can fall. Rise and try again.",
  "The enemy rejoices. Will you let them win?",
];

export default function GameOverModal({ score, wave, onRestart }) {
  const [visible, setVisible] = useState(false);
  const [particles, setParticles] = useState([]);
  const [defeatLine] = useState(() => DEFEAT_LINES[Math.floor(Math.random() * DEFEAT_LINES.length)]);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);

    // Falling embers
    const interval = setInterval(() => {
      setParticles(prev => [
        ...prev.slice(-24),
        {
          id: Math.random(),
          x: Math.random() * 100,
          size: 10 + Math.random() * 14,
          dur: 2.5 + Math.random() * 2,
          delay: Math.random() * 0.4,
          emoji: ["🔥", "💀", "⚔️", "🩸", "🌑"][Math.floor(Math.random() * 5)],
        },
      ]);
    }, 300);

    return () => { clearTimeout(t); clearInterval(interval); };
  }, []);

  const lands = Math.ceil(wave / 5);
  const rank =
    wave >= 50 ? { label: "LEGEND", color: "#ffd60a", emoji: "👑" } :
    wave >= 30 ? { label: "CHAMPION", color: "#a78bfa", emoji: "🏆" } :
    wave >= 20 ? { label: "WARRIOR", color: "#60a5fa", emoji: "⚔️" } :
    wave >= 10 ? { label: "SOLDIER", color: "#86efac", emoji: "🛡️" } :
                 { label: "RECRUIT", color: "#f97316", emoji: "🪖" };

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center overflow-hidden"
      style={{
        background: "rgba(0,0,0,0.94)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    >
      {/* Falling ember particles */}
      {particles.map(p => (
        <div key={p.id} style={{
          position: "absolute",
          left: `${p.x}%`,
          top: "-40px",
          fontSize: p.size,
          opacity: 0.35,
          animation: `emberFall ${p.dur}s ease-in ${p.delay}s forwards`,
          pointerEvents: "none",
        }}>{p.emoji}</div>
      ))}

      {/* Radial red glow */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse at center, rgba(180,10,10,0.18) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      {/* Vignette borders */}
      <div style={{
        position: "absolute",
        inset: 0,
        border: "6px solid rgba(180,10,10,0.25)",
        boxShadow: "inset 0 0 120px rgba(180,10,10,0.25)",
        pointerEvents: "none",
      }} />

      {/* Main card */}
      <div style={{
        position: "relative",
        maxWidth: 420,
        width: "100%",
        margin: "0 16px",
        borderRadius: 20,
        background: "linear-gradient(160deg, #0d0505 0%, #180a0a 50%, #0d0505 100%)",
        border: "2px solid rgba(200,30,30,0.45)",
        boxShadow: "0 0 80px rgba(180,10,10,0.4), 0 12px 0 #000",
        animation: visible ? "cardSlam 0.5s cubic-bezier(0.34,1.3,0.64,1) forwards" : "none",
        overflow: "hidden",
      }}>
        {/* Top accent bar */}
        <div style={{ height: 4, background: "linear-gradient(90deg, transparent, #dc2626, transparent)" }} />

        <div style={{ padding: "32px 28px 28px", textAlign: "center" }}>
          {/* Big defeat icon */}
          <div style={{
            fontSize: 72,
            marginBottom: 12,
            filter: "drop-shadow(0 0 30px rgba(220,38,38,0.6))",
            animation: "iconPulse 2s ease-in-out infinite",
          }}>💀</div>

          {/* Title */}
          <h1 style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: "clamp(22px, 5vw, 36px)",
            fontWeight: 900,
            color: "#fff",
            letterSpacing: "0.08em",
            textShadow: "0 0 40px rgba(220,38,38,0.7)",
            marginBottom: 6,
          }}>
            KINGDOM LOST
          </h1>

          <p style={{
            fontSize: 11,
            color: "rgba(200,150,150,0.6)",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            marginBottom: 24,
            fontFamily: "'Cinzel', serif",
          }}>
            {defeatLine}
          </p>

          {/* Rank badge */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 20px",
            borderRadius: 999,
            background: `rgba(${rank.color === "#ffd60a" ? "255,214,10" : rank.color === "#a78bfa" ? "167,139,250" : rank.color === "#60a5fa" ? "96,165,250" : rank.color === "#86efac" ? "134,239,172" : "249,115,22"},0.12)`,
            border: `1.5px solid ${rank.color}55`,
            marginBottom: 24,
          }}>
            <span style={{ fontSize: 18 }}>{rank.emoji}</span>
            <span style={{
              fontSize: 12,
              fontWeight: 900,
              color: rank.color,
              letterSpacing: "0.2em",
              fontFamily: "'Cinzel', serif",
              textTransform: "uppercase",
              textShadow: `0 0 10px ${rank.color}`,
            }}>{rank.label}</span>
          </div>

          {/* Stats grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 12,
            marginBottom: 28,
          }}>
            {[
              { emoji: "🌊", label: "Waves", value: wave },
              { emoji: "🏅", label: "Score", value: score.toLocaleString() },
              { emoji: "⚔️", label: "Lands", value: Math.max(1, lands - 1) },
            ].map(stat => (
              <div key={stat.label} style={{
                padding: "12px 8px",
                borderRadius: 12,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(200,30,30,0.2)",
              }}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>{stat.emoji}</div>
                <div style={{
                  fontSize: 20,
                  fontWeight: 900,
                  color: "#fff",
                  fontFamily: "'Cinzel', serif",
                  lineHeight: 1,
                  marginBottom: 4,
                }}>{stat.value}</div>
                <div style={{
                  fontSize: 9,
                  fontWeight: 700,
                  color: "rgba(180,120,120,0.6)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(200,30,30,0.35), transparent)",
            marginBottom: 24,
          }} />

          {/* Play Again button */}
          <button
            onClick={onRestart}
            style={{
              width: "100%",
              padding: "16px 0",
              borderRadius: 12,
              fontFamily: "'Cinzel Decorative', serif",
              fontSize: 14,
              fontWeight: 900,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#fff",
              background: "linear-gradient(180deg, #dc2626, #991b1b)",
              border: "2.5px solid rgba(239,68,68,0.6)",
              boxShadow: "0 6px 0 #3f0808, 0 0 30px rgba(220,38,38,0.4)",
              cursor: "pointer",
              transition: "all 0.15s",
              animation: "pulseBtn 2s ease-in-out infinite",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 0 #3f0808, 0 0 50px rgba(220,38,38,0.6)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 0 #3f0808, 0 0 30px rgba(220,38,38,0.4)";
            }}
          >
            ⚔ Play Again ⚔
          </button>

          <p style={{
            fontSize: 9,
            color: "rgba(150,100,100,0.4)",
            marginTop: 12,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}>Your legend is not over yet</p>
        </div>
      </div>

      <style>{`
        @keyframes emberFall {
          0%   { transform: translateY(0) rotate(0deg); opacity: 0.35; }
          100% { transform: translateY(110vh) rotate(180deg); opacity: 0; }
        }
        @keyframes cardSlam {
          0%   { transform: scale(0.5) translateY(-60px); opacity: 0; }
          70%  { transform: scale(1.03) translateY(4px); opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes iconPulse {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(220,38,38,0.5)); transform: scale(1); }
          50%       { filter: drop-shadow(0 0 45px rgba(220,38,38,0.9)); transform: scale(1.06); }
        }
        @keyframes pulseBtn {
          0%, 100% { box-shadow: 0 6px 0 #3f0808, 0 0 20px rgba(220,38,38,0.3); }
          50%       { box-shadow: 0 6px 0 #3f0808, 0 0 45px rgba(220,38,38,0.6); }
        }
      `}</style>
    </div>
  );
}