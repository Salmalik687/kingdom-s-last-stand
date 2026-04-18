import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const DIALOGUE = [
  { speaker: "Princess Elara", text: "Brave warrior! You have defended our meadow from the forces of darkness. The kingdom owes you a great debt.", mood: "grateful" },
  { speaker: "Princess Elara", text: "I have watched from the tower as you stood firm against every wave. You are unlike any champion I have ever seen.", mood: "admiring" },
  { speaker: "Princess Elara", text: "My father, the King, has granted me the right to choose my own champion. And I choose... you.", mood: "blushing" },
  { speaker: "You", text: "Princess... I am honored beyond words.", mood: "player" },
  { speaker: "Princess Elara", text: "Then kneel, brave hero. Rise as the Champion of the Meadow — and know that my heart rides with you into every battle ahead. 💍", mood: "loving" },
];

const PRINCESS_FRAMES = ["👸", "👸🏻", "👸"];

export default function RoyalRewardModal({ show, wave, onContinue }) {
  const [visible, setVisible] = useState(false);
  const [dialogueIdx, setDialogueIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(false);
  const [princessFrame, setPrincessFrame] = useState(0);
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    if (show) {
      setVisible(true);
      setDialogueIdx(0);
      setDisplayed("");
      setTyping(true);
      setHearts([]);
    }
  }, [show]);

  // Typewriter effect
  useEffect(() => {
    if (!visible || !typing) return;
    const line = DIALOGUE[dialogueIdx]?.text || "";
    if (displayed.length < line.length) {
      const t = setTimeout(() => setDisplayed(line.slice(0, displayed.length + 1)), 28);
      return () => clearTimeout(t);
    } else {
      setTyping(false);
    }
  }, [visible, typing, displayed, dialogueIdx]);

  // Princess animation
  useEffect(() => {
    if (!visible) return;
    const t = setInterval(() => setPrincessFrame(f => (f + 1) % PRINCESS_FRAMES.length), 900);
    return () => clearInterval(t);
  }, [visible]);

  // Spawn floating hearts when blushing/loving
  useEffect(() => {
    const mood = DIALOGUE[dialogueIdx]?.mood;
    if (!visible || (mood !== "blushing" && mood !== "loving")) return;
    const t = setInterval(() => {
      setHearts(h => [
        ...h.slice(-8),
        { id: Math.random(), x: 30 + Math.random() * 120, delay: Math.random() * 0.4 }
      ]);
    }, 600);
    return () => clearInterval(t);
  }, [dialogueIdx, visible]);

  const advance = () => {
    if (typing) {
      // Skip to end of current line
      setDisplayed(DIALOGUE[dialogueIdx].text);
      setTyping(false);
      return;
    }
    if (dialogueIdx < DIALOGUE.length - 1) {
      setDialogueIdx(i => i + 1);
      setDisplayed("");
      setTyping(true);
      setHearts([]);
    } else {
      setVisible(false);
      onContinue();
    }
  };

  if (!visible) return null;

  const current = DIALOGUE[dialogueIdx];
  const isPlayer = current.speaker === "You";
  const isLast = dialogueIdx === DIALOGUE.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center pb-0"
      style={{ background: "rgba(0,0,0,0.82)", backdropFilter: "blur(6px)" }}>

      {/* Scene background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Castle hall gradient */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, #1a0a2e 0%, #2d1044 40%, #3d1a00 100%)"
        }} />
        {/* Stained glass window glow */}
        <div style={{
          position: "absolute", top: "8%", left: "50%", transform: "translateX(-50%)",
          width: 220, height: 280,
          background: "radial-gradient(ellipse, rgba(180,100,255,0.18) 0%, rgba(255,180,60,0.10) 50%, transparent 80%)",
          borderRadius: "50% 50% 0 0",
        }} />
        {/* Candle glows */}
        {[15, 85].map((pct, i) => (
          <div key={i} style={{
            position: "absolute", bottom: "30%", left: `${pct}%`,
            width: 60, height: 160,
            background: `radial-gradient(ellipse, rgba(255,180,60,0.18) 0%, transparent 70%)`,
          }} />
        ))}
        {/* Stars */}
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${(i * 37 + 11) % 100}%`,
            top: `${(i * 23 + 5) % 38}%`,
            width: 2, height: 2,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.6)",
            animation: `pulse ${1.5 + (i % 3) * 0.5}s ease-in-out infinite alternate`,
          }} />
        ))}
      </div>

      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {hearts.map(h => (
          <div key={h.id} style={{
            position: "absolute",
            left: `calc(50% - 80px + ${h.x}px)`,
            bottom: "45%",
            fontSize: 18,
            animationName: "floatUp",
            animationDuration: "2.2s",
            animationDelay: `${h.delay}s`,
            animationFillMode: "forwards",
            animationTimingFunction: "ease-out",
            opacity: 0,
          }}>💕</div>
        ))}
      </div>

      {/* Princess character */}
      <div className="absolute flex flex-col items-center pointer-events-none"
        style={{ bottom: "22%", left: "50%", transform: "translateX(-160px)" }}>
        {/* Crown sparkles */}
        <div className="text-lg mb-1" style={{ animation: "spin 4s linear infinite", display: "inline-block" }}>✨</div>
        {/* Princess figure */}
        <div style={{ fontSize: 96, lineHeight: 1, filter: "drop-shadow(0 0 24px rgba(200,120,255,0.7))", transition: "transform 0.3s" }}>
          {PRINCESS_FRAMES[princessFrame]}
        </div>
        {/* Gown/dress base */}
        <div style={{
          width: 80, height: 36, marginTop: -8,
          background: "linear-gradient(180deg, #c084fc 0%, #7c3aed 60%, #4c1d95 100%)",
          borderRadius: "50% 50% 10px 10px",
          boxShadow: "0 0 20px rgba(168,85,247,0.5)",
        }} />
        <div className="text-xs text-purple-300 mt-2 font-semibold tracking-widest uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
          Princess Elara
        </div>
      </div>

      {/* Player silhouette */}
      <div className="absolute flex flex-col items-center pointer-events-none"
        style={{ bottom: "22%", left: "50%", transform: "translateX(60px)" }}>
        <div style={{ fontSize: 80, lineHeight: 1, filter: "drop-shadow(0 0 16px rgba(255,180,60,0.5))" }}>🧙</div>
        <div className="text-xs text-amber-300 mt-2 font-semibold tracking-widest uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
          You
        </div>
      </div>

      {/* Award ribbon */}
      {dialogueIdx >= 2 && (
        <div className="absolute pointer-events-none"
          style={{ top: "12%", left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
          <div style={{
            background: "linear-gradient(90deg, #7c3aed, #db2777, #7c3aed)",
            padding: "6px 28px", borderRadius: 999,
            fontSize: 13, fontWeight: "bold", color: "#fff",
            letterSpacing: "0.18em", textTransform: "uppercase",
            boxShadow: "0 0 24px rgba(168,85,247,0.6)",
            fontFamily: "'Cinzel', serif",
          }}>
            🏅 Champion of the Meadow
          </div>
        </div>
      )}

      {/* Dialogue box */}
      <div className="relative w-full max-w-2xl mx-4 mb-0" style={{ zIndex: 10 }}>
        <div style={{
          background: "linear-gradient(135deg, rgba(20,10,40,0.97) 0%, rgba(40,15,10,0.97) 100%)",
          border: "2px solid rgba(168,85,247,0.5)",
          borderBottom: "none",
          borderRadius: "16px 16px 0 0",
          padding: "24px 28px 20px",
          boxShadow: "0 -8px 40px rgba(168,85,247,0.25)",
        }}>
          {/* Speaker name */}
          <div className="flex items-center gap-2 mb-3">
            <span style={{
              background: isPlayer
                ? "linear-gradient(90deg,#f59e0b,#d97706)"
                : "linear-gradient(90deg,#a855f7,#db2777)",
              borderRadius: 999, padding: "2px 14px",
              fontSize: 11, fontWeight: "bold", color: "#fff",
              letterSpacing: "0.15em", textTransform: "uppercase",
              fontFamily: "'Cinzel', serif",
            }}>
              {current.speaker}
            </span>
          </div>

          {/* Dialogue text */}
          <p style={{
            fontSize: 16, color: "#e9d5ff", lineHeight: 1.7,
            minHeight: 52, fontFamily: "'Cinzel', serif",
            letterSpacing: "0.02em",
          }}>
            {displayed}
            {typing && <span style={{ opacity: 0.6, animation: "pulse 0.8s infinite" }}>▌</span>}
          </p>

          {/* Action button */}
          <div className="flex justify-end mt-4">
            <Button
              onClick={advance}
              style={{
                background: isLast && !typing
                  ? "linear-gradient(90deg,#7c3aed,#db2777)"
                  : "linear-gradient(90deg,#4c1d95,#7c3aed)",
                border: "none", color: "#fff",
                fontFamily: "'Cinzel', serif",
                letterSpacing: "0.12em",
                padding: "8px 28px",
                fontSize: 13,
              }}
            >
              {typing ? "Skip ▶" : isLast ? "🏅 Accept the Honor" : "Continue ▶"}
            </Button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(0) scale(1);   opacity: 1; }
          100% { transform: translateY(-160px) scale(0.5); opacity: 0; }
        }
        @keyframes pulse {
          from { opacity: 0.4; } to { opacity: 1; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); } to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}