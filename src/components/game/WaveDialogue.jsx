import { useState, useEffect, useRef } from "react";

const WAVE_DIALOGUES = {
  1: { speaker: "Queen Seraphine", text: "The first wave approaches, Lord Aldric! Steel thy resolve—Eldenmoor's fate begins now!" },
  5: { speaker: "Queen Seraphine", text: "The Forest Drake has fallen! Thy courage burns bright as a thousand torches, brave hero!" },
  6: { speaker: "Queen Seraphine", text: "We move now into the Dark Dungeon. Ancient evil stirs in its depths. Remain vigilant!" },
  10: { speaker: "Queen Seraphine", text: "The Dungeon Overlord is vanquished! Two lands are now free from darkness. Half our quest remains!" },
  11: { speaker: "Queen Seraphine", text: "Before us lies the Volcanic Wastes—a hellscape of fire and ruin. The Flame Titan awaits." },
  15: { speaker: "Queen Seraphine", text: "The Flame Titan burns no more! Three lands reclaimed. The shadow realm next..." },
  16: { speaker: "Queen Seraphine", text: "The Frozen Abyss looms ahead, where even light itself turns to ice. Hold thy faith, hero." },
  20: { speaker: "Queen Seraphine", text: "The Frost Colossus shatters into eternal snow. Four lands are saved! Only one darkness remains!" },
  21: { speaker: "Queen Seraphine", text: "This is it, Lord Aldric. The Shadow Realm—the very heart of Malgrath's power. For Eldenmoor!" },
  25: { speaker: "Queen Seraphine", text: "The Shadow Sovereign falls! Malgrath's grip loosens. One final battle stands between us and true peace..." },
  26: { speaker: "Queen Seraphine", text: "The Demon Lord himself descends! This is our final stand, hero. Save Eldenmoor. SAVE US ALL!" },
  30: { speaker: "Queen Seraphine", text: "VICTORY! The Demon Lord Malgrath is NO MORE! Eldenmoor is FOREVER FREE! Thou art our eternal savior, Lord Aldric!" },
};

export default function WaveDialogue({ wave, show }) {
  const [typed, setTyped] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const typeRef = useRef(null);
  const dialogue = WAVE_DIALOGUES[wave];

  useEffect(() => {
    if (!show || !dialogue) {
      setTyped("");
      setIsTyping(false);
      return;
    }

    setTyped("");
    setIsTyping(true);

    const timeout = setTimeout(() => {
      setIsTyping(false);
      setTimeout(() => setIsTyping(false), 4000);
    }, dialogue.text.length * 35 + 500);

    return () => clearTimeout(timeout);
  }, [wave, show, dialogue]);

  useEffect(() => {
    if (!isTyping || !dialogue) return;
    if (typed.length >= dialogue.text.length) {
      setIsTyping(false);
      return;
    }

    typeRef.current = setTimeout(() => {
      setTyped(dialogue.text.slice(0, typed.length + 1));
    }, 35);

    return () => clearTimeout(typeRef.current);
  }, [typed, isTyping, dialogue]);

  if (!show || !dialogue) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 max-w-lg mx-4"
      style={{
        animation: "slideUp 0.4s cubic-bezier(0.34,1.3,0.64,1) forwards",
      }}>

      <div style={{
        background: "linear-gradient(160deg, rgba(10,4,20,0.96) 0%, rgba(20,10,30,0.96) 100%)",
        border: "2px solid rgba(90,154,122,0.6)",
        borderRadius: 12,
        padding: "16px 20px",
        boxShadow: "0 0 40px rgba(90,154,122,0.3), 0 8px 24px rgba(0,0,0,0.6)",
        backdropFilter: "blur(8px)",
      }}>
        {/* Speaker name */}
        <div style={{
          fontSize: 10,
          fontWeight: 900,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#5a9a7a",
          fontFamily: "'Cinzel', serif",
          marginBottom: 6,
          textShadow: "0 0 10px rgba(90,154,122,0.5)",
        }}>
          ♛ {dialogue.speaker}
        </div>

        {/* Dialogue text */}
        <p style={{
          fontSize: 13,
          color: "#f0e6ff",
          lineHeight: 1.6,
          fontFamily: "'Cinzel', serif",
          letterSpacing: "0.01em",
          margin: 0,
        }}>
          "{typed}
          {isTyping && <span style={{ opacity: 0.7, animation: "blink 0.6s ease-in-out infinite" }}>▌</span>}"
        </p>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateX(-50%) translateY(40px); opacity: 0; }
          to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
        @keyframes blink { 0%,100% { opacity: 0.2; } 50% { opacity: 1; } }
      `}</style>
    </div>
  );
}