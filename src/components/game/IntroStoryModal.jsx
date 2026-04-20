import { useEffect, useRef, useState } from "react";

const STORY_LINES = [
  "Hearken well, good lord... for what I am about to tell thee is no mere fancy nor fireside tale.",
  "There was once a kingdom — Eldenmoor, they called it. Green hills, honest folk, children laughing in the lanes. A good place. A real place.",
  "Thou wert its lord and its shield. Lord Aldric Stoneheart. Aye, the very last of that bloodline.",
  "But trouble, as it always does... came a-creeping. From beyond the Ashenmoor mountains, something ancient stirred. The Warlord Malgrath — gods forgive us — had woken.",
  "His host was vast, my lord. Vast beyond all reckoning. Peasants turned to rot, knights twisted by darkness, demons that had no name in any tongue I know.",
  "They did not merely march. They poured forth like a black tide — burning, breaking, howling with a hunger that fair chilled the blood.",
  "The villages fell first. Then the outer walls. Then the gates themselves, iron and all, were sundered like dry timber.",
  "And yet... thou didst not flee. Thou stood at the rampart — sword drawn, jaw set — as thy people wept behind thee.",
  "They look to thee now, lord. Every man, woman, and bairn in that castle is counting on thy will and thy wit.",
  "So build thy towers tall. Marshal every archer, every cannon, every blade thou canst spare. And do not yield — not one blessed inch.",
  "For Eldenmoor. For thy blood. For everything that is worth a damn in this wretched and beautiful world.",
];

function speakLine(text, onEnd) {
  if (!window.speechSynthesis) { onEnd(); return; }
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.rate = 0.68;
  utt.pitch = 0.55;
  utt.volume = 1;

  // Try to find a deep British/English voice
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v =>
    (v.lang === "en-GB" || v.lang.startsWith("en")) &&
    (v.name.toLowerCase().includes("male") || v.name.toLowerCase().includes("daniel") ||
     v.name.toLowerCase().includes("george") || v.name.toLowerCase().includes("arthur") ||
     v.name.toLowerCase().includes("oliver") || v.name.toLowerCase().includes("reed"))
  ) || voices.find(v => v.lang === "en-GB") || voices.find(v => v.lang.startsWith("en"));
  if (preferred) utt.voice = preferred;

  utt.onend = onEnd;
  utt.onerror = onEnd;
  window.speechSynthesis.speak(utt);
}

export default function IntroStoryModal({ show, onBegin }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [phase, setPhase] = useState("typing"); // typing | waiting | done
  const [skipped, setSkipped] = useState(false);
  const typeRef = useRef(null);
  const lineRef = useRef(0);

  // Reset when shown
  useEffect(() => {
    if (!show) return;
    setLineIndex(0);
    setDisplayedText("");
    setPhase("typing");
    setSkipped(false);
    lineRef.current = 0;
  }, [show]);

  // Typewriter + voice per line
  useEffect(() => {
    if (!show || skipped) return;

    const line = STORY_LINES[lineIndex];
    if (!line) { setPhase("done"); return; }

    setDisplayedText("");
    setPhase("typing");

    let charIdx = 0;
    typeRef.current = setInterval(() => {
      charIdx++;
      setDisplayedText(line.slice(0, charIdx));
      if (charIdx >= line.length) {
        clearInterval(typeRef.current);
        setPhase("waiting");
      }
    }, 32);

    // Speak the line
    // Wait for voices to load
    const trySpeak = () => {
      speakLine(line, () => {
        // After speech ends, auto-advance after short pause
        setTimeout(() => {
          const next = lineIndex + 1;
          if (next < STORY_LINES.length) {
            setLineIndex(next);
          } else {
            setPhase("done");
          }
        }, 600);
      });
    };

    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = trySpeak;
    } else {
      trySpeak();
    }

    return () => {
      clearInterval(typeRef.current);
      window.speechSynthesis.cancel();
    };
  }, [lineIndex, show, skipped]);

  const handleSkip = () => {
    clearInterval(typeRef.current);
    window.speechSynthesis.cancel();
    setSkipped(true);
    setPhase("done");
  };

  if (!show) return null;

  const progress = (lineIndex / STORY_LINES.length) * 100;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.96)" }}>

      {/* Parchment-style background texture */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(180,130,60,0.3) 30px, rgba(180,130,60,0.3) 31px)`,
        }} />

      {/* Vignette */}
      <div className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%)" }} />

      <div className="relative max-w-2xl w-full mx-4">
        {/* Crown header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-3 animate-pulse">👑</div>
          <h2 className="text-2xl font-black uppercase tracking-[0.3em]"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              background: "linear-gradient(135deg, #ffd60a, #b8860b, #ffd60a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "none",
              filter: "drop-shadow(0 0 12px rgba(255,214,10,0.4))",
            }}>
            Kingdom's Last Stand
          </h2>
          <p className="text-xs uppercase tracking-[0.4em] mt-1" style={{ color: "#5a4030" }}>
            ⚔ &nbsp; A Tale of Blood & Honour &nbsp; ⚔
          </p>
        </div>

        {/* Story scroll */}
        <div className="relative rounded-2xl p-8 mx-2"
          style={{
            background: "linear-gradient(160deg, #1a1208, #0d0b05)",
            border: "2px solid #5a3a10",
            boxShadow: "0 0 60px rgba(180,130,40,0.15), inset 0 0 40px rgba(0,0,0,0.6)",
          }}>

          {/* Decorative corner ornaments */}
          <div className="absolute top-3 left-3 text-lg opacity-30" style={{ color: "#b8860b" }}>✦</div>
          <div className="absolute top-3 right-3 text-lg opacity-30" style={{ color: "#b8860b" }}>✦</div>
          <div className="absolute bottom-3 left-3 text-lg opacity-30" style={{ color: "#b8860b" }}>✦</div>
          <div className="absolute bottom-3 right-3 text-lg opacity-30" style={{ color: "#b8860b" }}>✦</div>

          {/* Line counter */}
          <div className="text-center mb-1">
            <span className="text-[9px] uppercase tracking-[0.3em]" style={{ color: "#5a4030" }}>
              Chapter {lineIndex + 1} of {STORY_LINES.length}
            </span>
          </div>

          {/* Progress bar */}
          <div className="mb-6 h-0.5 rounded-full overflow-hidden" style={{ background: "#2a1a05" }}>
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: "linear-gradient(90deg, #b8860b, #ffd60a)" }} />
          </div>

          {/* Story text */}
          <div className="min-h-[100px] flex items-center justify-center">
            {skipped ? (
              <p className="text-center text-lg leading-relaxed italic"
                style={{
                  fontFamily: "'Cinzel', serif",
                  color: "#d4af70",
                  textShadow: "0 0 20px rgba(212,175,112,0.3)",
                }}>
                "The realm awaits thy command, my lord."
              </p>
            ) : (
              <p className="text-center text-lg leading-relaxed italic"
                style={{
                  fontFamily: "'Cinzel', serif",
                  color: "#d4af70",
                  textShadow: "0 0 20px rgba(212,175,112,0.3)",
                  minHeight: "3rem",
                }}>
                {displayedText}
                {phase === "typing" && (
                  <span className="inline-block w-0.5 h-5 ml-0.5 align-middle animate-pulse"
                    style={{ background: "#d4af70" }} />
                )}
              </p>
            )}
          </div>

          {/* Speaker label */}
          {!skipped && phase !== "done" && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#ffd60a" }} />
              <span className="text-[10px] uppercase tracking-[0.35em]" style={{ color: "#6a4a20" }}>
                The Royal Chronicler speaks...
              </span>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#ffd60a" }} />
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6 justify-center">
          {phase !== "done" && !skipped && (
            <button
              onClick={handleSkip}
              className="px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all hover:opacity-80"
              style={{
                background: "rgba(60,40,10,0.8)",
                border: "1px solid #5a3a10",
                color: "#6a5030",
              }}>
              Skip Tale
            </button>
          )}

          {(phase === "done" || skipped) && (
            <button
              onClick={onBegin}
              className="px-10 py-4 rounded-xl font-black text-base uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
              style={{
                fontFamily: "'Cinzel Decorative', serif",
                background: "linear-gradient(180deg, #b8860b, #7a5500)",
                border: "3px solid #ffd60a",
                boxShadow: "0 6px 0 #3a2200, 0 0 30px rgba(255,214,10,0.4)",
                color: "#fff8dc",
                textShadow: "0 2px 4px rgba(0,0,0,0.6)",
              }}>
              ⚔ &nbsp; Defend the Kingdom! &nbsp; ⚔
            </button>
          )}
        </div>

        {/* Mute hint */}
        <p className="text-center mt-3 text-[9px] uppercase tracking-widest" style={{ color: "#3a2810" }}>
          🔊 Narrated by The Royal Chronicler — ensure thy sound is enabled
        </p>
      </div>
    </div>
  );
}