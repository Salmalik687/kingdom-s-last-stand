import { useState, useEffect } from "react";
import { hasSave, getSaveSummary, deleteSave } from "../../lib/saveGame";
import { getCharacter } from "../../lib/characters";

const STAR_COUNT = 80;
const stars = Array.from({ length: STAR_COUNT }, (_, i) => ({
  left: `${(i * 37 + 5) % 100}%`,
  top: `${(i * 23 + 2) % 100}%`,
  size: i % 5 === 0 ? 3 : i % 3 === 0 ? 2 : 1,
  opacity: 0.2 + (i % 7) * 0.1,
  dur: `${1.5 + (i % 7) * 0.35}s`,
  delay: `${(i % 5) * 0.25}s`,
}));

// Floating ember particles
const EMBERS = Array.from({ length: 20 }, (_, i) => ({
  left: `${(i * 19 + 10) % 90}%`,
  size: 2 + (i % 3),
  dur: `${4 + (i % 5) * 1.2}s`,
  delay: `${(i % 7) * 0.6}s`,
  color: i % 2 === 0 ? "#a78bfa" : "#d4af70",
}));

export default function ModeSelect({ onSelect, onContinue, onReplayIntro }) {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [saveInfo, setSaveInfo] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    setSaveInfo(getSaveSummary());
    return () => clearTimeout(t);
  }, []);

  const handleContinue = () => {
    setLeaving(true);
    setTimeout(() => onContinue(), 420);
  };

  const handleDeleteSave = () => {
    deleteSave();
    setSaveInfo(null);
    setShowDeleteConfirm(false);
  };

  const formatSaveDate = (iso) => {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch { return ''; }
  };

  const handleSelect = (mode) => {
    setLeaving(true);
    setTimeout(() => onSelect(mode), 420);
  };

  const modes = [
    {
      id: "story",
      icon: "📖",
      label: "Story Mode",
      desc: "Battle through 10 lands with epic boss encounters. Unlock armor upgrades and face Malgrath!",
      color: "#5a9a7a",
      glow: "rgba(90,154,122,0.5)",
      border: "#5a9a7a",
      shadow: "rgba(90,154,122,0.35)",
    },
    {
      id: "endless",
      icon: "∞",
      label: "Endless Mode",
      desc: "Challenge yourself in infinite waves. No story, no limits — pure tower defense!",
      color: "#d4af70",
      glow: "rgba(212,175,112,0.5)",
      border: "#d4af70",
      shadow: "rgba(212,175,112,0.35)",
    },
  ];

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #080412 0%, #100820 50%, #080412 100%)",
        opacity: visible && !leaving ? 1 : 0,
        transform: leaving ? "scale(1.04)" : visible ? "scale(1)" : "scale(0.97)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}
    >
      {/* Stars */}
      {stars.map((s, i) => (
        <div key={i} style={{
          position: "absolute",
          left: s.left, top: s.top,
          width: s.size, height: s.size,
          borderRadius: "50%",
          background: `rgba(200,180,255,${s.opacity})`,
          animation: `modeStarTwinkle ${s.dur} ease-in-out ${s.delay} infinite`,
          pointerEvents: "none",
        }} />
      ))}

      {/* Floating embers */}
      {EMBERS.map((e, i) => (
        <div key={i} style={{
          position: "absolute",
          left: e.left,
          bottom: "-10px",
          width: e.size,
          height: e.size,
          borderRadius: "50%",
          background: e.color,
          boxShadow: `0 0 6px ${e.color}`,
          animation: `emberFloat ${e.dur} ease-in-out ${e.delay} infinite`,
          pointerEvents: "none",
          opacity: 0,
        }} />
      ))}

      {/* Large ambient glow orbs */}
      <div style={{
        position: "absolute", top: "15%", left: "10%",
        width: 300, height: 300, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(90,154,122,0.07) 0%, transparent 70%)",
        animation: "orbFloat 8s ease-in-out infinite",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", right: "8%",
        width: 350, height: 350, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(212,175,112,0.07) 0%, transparent 70%)",
        animation: "orbFloat 10s ease-in-out 2s infinite reverse",
        pointerEvents: "none",
      }} />

      <div className="relative max-w-2xl w-full mx-4" style={{ zIndex: 10 }}>
        {/* Title */}
        <div style={{
          textAlign: "center",
          marginBottom: 52,
          animation: "titleDrop 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.1s both",
        }}>
          <div style={{
            fontSize: "clamp(22px, 5vw, 38px)",
            fontFamily: "'Cinzel Decorative', serif",
            fontWeight: 900,
            background: "linear-gradient(135deg, #e9d5ff 0%, #ffd60a 50%, #e9d5ff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 20px rgba(168,85,247,0.5))",
            letterSpacing: "0.1em",
            animation: "shimmer 4s linear infinite",
            backgroundSize: "200% 100%",
          }}>
            ⚔️ CHOOSE THY PATH ⚔️
          </div>
          <p style={{
            fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase",
            color: "rgba(130,100,180,0.7)", marginTop: 8, fontFamily: "'Cinzel', serif",
          }}>
            Story awaits — or endless glory
          </p>
        </div>

        {/* Mode cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {modes.map((mode, idx) => {
            const isHov = hovered === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => handleSelect(mode.id)}
                onMouseEnter={() => setHovered(mode.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: isHov
                    ? `linear-gradient(160deg, rgba(20,8,35,0.98) 0%, rgba(35,15,55,0.98) 100%)`
                    : "linear-gradient(160deg, rgba(10,4,20,0.95) 0%, rgba(22,10,40,0.95) 100%)",
                  border: `2px solid ${isHov ? mode.color : mode.border + "88"}`,
                  borderRadius: 18,
                  padding: "36px 28px",
                  textAlign: "center",
                  boxShadow: isHov
                    ? `0 0 80px ${mode.glow}, 0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)`
                    : `0 0 40px ${mode.shadow}, 0 8px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)`,
                  backdropFilter: "blur(12px)",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.34,1.3,0.64,1)",
                  transform: isHov ? "translateY(-10px) scale(1.02)" : "translateY(0) scale(1)",
                  animation: `cardEnter 0.6s cubic-bezier(0.34,1.3,0.64,1) ${0.2 + idx * 0.1}s both`,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Hover shimmer overlay */}
                {isHov && (
                  <div style={{
                    position: "absolute", inset: 0, borderRadius: 16,
                    background: `linear-gradient(135deg, ${mode.color}08 0%, transparent 50%, ${mode.color}06 100%)`,
                    pointerEvents: "none",
                  }} />
                )}

                {/* Icon */}
                <div style={{
                  fontSize: 44,
                  marginBottom: 16,
                  display: "block",
                  filter: isHov ? `drop-shadow(0 0 16px ${mode.color})` : "none",
                  transition: "filter 0.3s ease, transform 0.3s ease",
                  transform: isHov ? "scale(1.15)" : "scale(1)",
                  lineHeight: 1,
                }}>
                  {mode.icon}
                </div>

                {/* Title */}
                <h2 style={{
                  fontSize: 22,
                  fontFamily: "'Cinzel', serif",
                  fontWeight: 700,
                  color: mode.color,
                  marginBottom: 10,
                  letterSpacing: "0.06em",
                  textShadow: isHov ? `0 0 20px ${mode.color}` : `0 0 8px ${mode.color}66`,
                  transition: "text-shadow 0.3s ease",
                }}>
                  {mode.label}
                </h2>

                {/* Divider */}
                <div style={{
                  width: isHov ? "60%" : "30%",
                  height: 1,
                  background: `linear-gradient(90deg, transparent, ${mode.color}, transparent)`,
                  margin: "10px auto 12px",
                  transition: "width 0.4s ease",
                }} />

                {/* Description */}
                <p style={{
                  fontSize: 12.5,
                  color: isHov ? "#f0e6ff" : "#b0a0c8",
                  lineHeight: 1.7,
                  fontFamily: "'Cinzel', serif",
                  transition: "color 0.3s ease",
                }}>
                  {mode.desc}
                </p>

                {/* Bottom CTA arrow */}
                <div style={{
                  marginTop: 18,
                  fontSize: 12,
                  color: mode.color,
                  fontWeight: 900,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  opacity: isHov ? 1 : 0,
                  transform: isHov ? "translateY(0)" : "translateY(6px)",
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                }}>
                  ▶ Select
                </div>
              </button>
            );
          })}
        </div>

        {/* Continue saved game */}
        {saveInfo && (
          <div style={{
            marginTop: 28,
            padding: "16px 20px",
            borderRadius: 14,
            background: "linear-gradient(160deg, rgba(15,10,40,0.97), rgba(25,15,60,0.97))",
            border: "2px solid rgba(167,139,250,0.6)",
            boxShadow: "0 0 40px rgba(139,92,246,0.25)",
            animation: "fadeInUp 0.6s ease 0.4s both",
          }}>
            {!showDeleteConfirm ? (
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <div style={{ fontSize: 11, color: "#a78bfa", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 4 }}>
                    💾 Saved Progress
                  </div>
                  <div style={{ fontSize: 13, color: "#e2d9f3", fontFamily: "'Cinzel', serif" }}>
                    {(() => {
                      const ch = saveInfo.character ? getCharacter(saveInfo.character) : null;
                      return ch ? <span style={{ color: ch.color }}>{ch.name} · </span> : null;
                    })()}
                    Wave {saveInfo.wave} · Score {saveInfo.score?.toLocaleString() ?? 0}
                    {saveInfo.difficulty && <span style={{ color: "#a78bfa" }}> · {saveInfo.difficulty.name}</span>}
                  </div>
                  <div style={{ fontSize: 10, color: "rgba(130,100,180,0.6)", marginTop: 2 }}>
                    {formatSaveDate(saveInfo.savedAt)}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleContinue}
                    style={{
                      padding: "10px 20px",
                      borderRadius: 10,
                      background: "linear-gradient(180deg, #7c3aed, #4c1d95)",
                      border: "2px solid #a78bfa",
                      color: "#e9d5ff",
                      fontWeight: 900,
                      fontSize: 13,
                      cursor: "pointer",
                      boxShadow: "0 4px 0 #1e0a4a, 0 0 20px rgba(139,92,246,0.4)",
                      whiteSpace: "nowrap",
                    }}>
                    ▶ Continue
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    style={{
                      padding: "10px 14px",
                      borderRadius: 10,
                      background: "rgba(80,20,20,0.8)",
                      border: "2px solid rgba(200,60,60,0.4)",
                      color: "#f87171",
                      fontSize: 13,
                      cursor: "pointer",
                    }}>
                    🗑
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p style={{ color: "#f87171", fontSize: 13, marginBottom: 12, fontFamily: "'Cinzel', serif" }}>
                  Delete saved progress?
                </p>
                <div className="flex gap-2 justify-center">
                  <button onClick={handleDeleteSave} style={{ padding: "8px 18px", borderRadius: 8, background: "#7f1d1d", border: "2px solid #f87171", color: "#fff", fontWeight: 700, cursor: "pointer" }}>
                    Yes, Delete
                  </button>
                  <button onClick={() => setShowDeleteConfirm(false)} style={{ padding: "8px 18px", borderRadius: 8, background: "rgba(60,40,100,0.8)", border: "2px solid #a78bfa", color: "#e9d5ff", fontWeight: 700, cursor: "pointer" }}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Bottom hint */}
        <p style={{
          textAlign: "center", marginTop: 20,
          fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase",
          color: "rgba(100,80,140,0.5)", fontFamily: "'Cinzel', serif",
          animation: "fadeInUp 0.8s ease 0.5s both",
        }}>
          ✦ &nbsp; Your legend begins with one choice &nbsp; ✦
        </p>
        {/* Replay-intro link — gives returning players a way to see the
            Royal Chronicler intro again without clearing localStorage. */}
        {onReplayIntro && (
          <div style={{ textAlign: "center", marginTop: 6, animation: "fadeInUp 1s ease 0.7s both" }}>
            <button
              onClick={onReplayIntro}
              style={{
                background: "transparent",
                border: "none",
                color: "rgba(167,139,250,0.65)",
                fontSize: 10,
                fontFamily: "'Cinzel', serif",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                cursor: "pointer",
                textDecoration: "underline",
                textUnderlineOffset: 4,
              }}>
              📖 Replay intro
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes modeStarTwinkle { 0%,100%{opacity:0.15;transform:scale(0.7)} 50%{opacity:0.9;transform:scale(1.3)} }
        @keyframes emberFloat {
          0%   { transform:translateY(0) scale(1);   opacity:0; }
          10%  { opacity:0.8; }
          90%  { opacity:0.4; }
          100% { transform:translateY(-100vh) scale(0.3); opacity:0; }
        }
        @keyframes orbFloat { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,-20px)} }
        @keyframes titleDrop { from{opacity:0;transform:translateY(-30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @keyframes cardEnter { from{opacity:0;transform:translateY(40px) scale(0.95)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}