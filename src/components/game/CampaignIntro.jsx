import { useState, useEffect, useRef } from "react";
import { QueenSeraphine, LordAldric } from "./CharacterSprites";

const CAMPAIGN_STORY = `
For a thousand years, Eldenmoor has stood as a beacon of hope.
But that light now flickers.

From the depths of the shadow realm, a demon horde has awakened—
led by the ancient evil, Malgrath, who seeks to devour our world.

Queen Seraphine has called upon Lord Aldric, the kingdom's greatest champion,
to defend the Five Lands of Eldenmoor.

The fate of the realm rests upon thy shoulders, brave hero.

Will you answer the call and save Eldenmoor from eternal darkness?
`;

export default function CampaignIntro({ show, onBegin }) {
  const [typed, setTyped] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const typeRef = useRef(null);

  useEffect(() => {
    if (!show) return;
    setTyped("");
    setIsTyping(true);
  }, [show]);

  useEffect(() => {
    if (!isTyping || typed.length >= CAMPAIGN_STORY.length) {
      setIsTyping(false);
      return;
    }

    typeRef.current = setTimeout(() => {
      setTyped(CAMPAIGN_STORY.slice(0, typed.length + 1));
    }, 25);

    return () => clearTimeout(typeRef.current);
  }, [typed, isTyping]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[180] flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0a0410 0%, #1a0a2a 50%, #0a0410 100%)" }}>

      {/* Atmospheric stars */}
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

      {/* Characters */}
      <div className="absolute flex gap-24 pointer-events-none bottom-16">
        <div className="flex flex-col items-center">
          <div style={{ animation: "charFloat 2.4s ease-in-out infinite" }}>
            <LordAldric size={120} />
          </div>
          <div style={{
            marginTop: 12, fontSize: 12, fontWeight: 700,
            letterSpacing: "0.25em", textTransform: "uppercase",
            color: "#d4af70", fontFamily: "'Cinzel', serif",
            textShadow: "0 0 12px rgba(212,175,112,0.6)",
          }}>Lord Aldric</div>
        </div>

        <div className="flex flex-col items-center">
          <div style={{ animation: "charFloat 2.6s ease-in-out infinite" }}>
            <QueenSeraphine size={140} />
          </div>
          <div style={{
            marginTop: 12, fontSize: 12, fontWeight: 700,
            letterSpacing: "0.25em", textTransform: "uppercase",
            color: "#5a9a7a", fontFamily: "'Cinzel', serif",
            textShadow: "0 0 12px rgba(90,154,122,0.6)",
          }}>Queen Seraphine</div>
        </div>
      </div>

      {/* Story box */}
      <div className="relative max-w-2xl mx-4" style={{ zIndex: 10 }}>
        <div style={{
          background: "linear-gradient(160deg, rgba(10,4,20,0.98) 0%, rgba(20,10,30,0.98) 100%)",
          border: "2px solid rgba(138,85,200,0.5)",
          borderRadius: 16,
          padding: "32px 40px",
          boxShadow: "0 0 60px rgba(138,85,200,0.3), inset 0 1px 0 rgba(138,85,200,0.1)",
          backdropFilter: "blur(10px)",
        }}>
          {/* Title */}
          <div style={{
            fontSize: "clamp(18px, 4vw, 28px)",
            fontFamily: "'Cinzel Decorative', serif",
            fontWeight: 900,
            color: "#e9d5ff",
            textAlign: "center",
            marginBottom: 24,
            letterSpacing: "0.08em",
            textShadow: "0 0 20px rgba(168,85,247,0.5)",
          }}>
            🏰 THE KINGDOM'S LAST STAND 🏰
          </div>

          {/* Story text */}
          <p style={{
            fontSize: 15, color: "#f0e6ff", lineHeight: 1.9,
            fontFamily: "'Cinzel', serif",
            letterSpacing: "0.02em",
            minHeight: 240,
            whiteSpace: "pre-wrap",
            textAlign: "center",
          }}>
            {typed}
            {isTyping && <span style={{ opacity: 0.7, animation: "blink 0.6s ease-in-out infinite" }}>▌</span>}
          </p>

          {/* Begin button */}
          <button
            onClick={onBegin}
            disabled={isTyping}
            style={{
              width: "100%",
              marginTop: 24,
              padding: "14px 0",
              borderRadius: 10,
              fontSize: 13, fontWeight: 900,
              letterSpacing: "0.18em", textTransform: "uppercase",
              fontFamily: "'Cinzel', serif",
              background: isTyping
                ? "linear-gradient(180deg, #3a2a5a, #2a1a4a)"
                : "linear-gradient(180deg, #a855f7, #7c3aed)",
              border: `2px solid ${isTyping ? "rgba(138,85,200,0.3)" : "#a78bfa"}`,
              color: "#fff",
              cursor: isTyping ? "not-allowed" : "pointer",
              opacity: isTyping ? 0.6 : 1,
              boxShadow: isTyping ? "none" : "0 6px 0 #2a1a4a, 0 0 30px rgba(168,85,247,0.6)",
              transition: "all 0.3s",
              animation: !isTyping ? "pulseBtn 1.8s ease-in-out infinite" : "none",
            }}>
            {isTyping ? "Story unfolding..." : "⚔ BEGIN THY QUEST ⚔"}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes charFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes blink { 0%,100% { opacity: 0.2; } 50% { opacity: 1; } }
        @keyframes twinkle { 0%,100%{opacity:0.3;transform:scale(0.8)} 50%{opacity:1;transform:scale(1.2)} }
        @keyframes pulseBtn {
          0%,100% { box-shadow: 0 6px 0 #2a1a4a, 0 0 20px rgba(168,85,247,0.5); }
          50% { box-shadow: 0 6px 0 #2a1a4a, 0 0 40px rgba(168,85,247,0.8); }
        }
      `}</style>
    </div>
  );
}