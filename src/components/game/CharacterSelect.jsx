import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CHARACTERS, getAllCharacters } from "../../lib/characters";
import { LordAldric, QueenSeraphine, Morrigan, Kael, Aurora } from "./CharacterSprites";
import CharacterStatsPanel from "./CharacterStatsPanel";

export default function CharacterSelect({ onSelect, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [selectedCharForStats, setSelectedCharForStats] = useState(null);
  const typeRef = useRef(null);
  const [typedText, setTypedText] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [speechBubble, setSpeechBubble] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechRef = useRef(null);

  const characters = getAllCharacters();
  const current = characters[currentIndex];

  useEffect(() => {
    if (!isVisible || showDetails) return;
    setTypedText("");
    let idx = 0;
    const fullText = current.story;

    typeRef.current = setInterval(() => {
      if (idx >= fullText.length) {
        clearInterval(typeRef.current);
        setShowDetails(true);
        return;
      }
      idx++;
      setTypedText(fullText.slice(0, idx));
    }, 28);

    return () => clearInterval(typeRef.current);
  }, [currentIndex, isVisible, current.story, showDetails]);

  // Speak the motivation quote when showDetails becomes true
  useEffect(() => {
    if (!showDetails) {
      setSpeechBubble("");
      setIsSpeaking(false);
      if (speechRef.current) clearTimeout(speechRef.current);
      window.speechSynthesis?.cancel();
      return;
    }

    // Typewriter the motivation quote in the speech bubble
    const quote = current.motivation;
    setSpeechBubble("");
    setIsSpeaking(true);
    let idx = 0;
    const timer = setInterval(() => {
      idx++;
      setSpeechBubble(quote.slice(0, idx));
      if (idx >= quote.length) {
        clearInterval(timer);
        setIsSpeaking(false);
      }
    }, 32);

    // Speak it with Web Speech API
    try {
      window.speechSynthesis?.cancel();
      const utter = new SpeechSynthesisUtterance(quote);
      const voices = window.speechSynthesis.getVoices();

      // Per-character voice profiles
      const voiceProfiles = {
        aldric:    { pitch: 0.6,  rate: 0.78, volume: 1.0,  keywords: ["daniel", "arthur", "alex", "male"] },
        kael:      { pitch: 0.9,  rate: 1.05, volume: 0.85, keywords: ["alex", "oliver", "thomas", "male"] },
        seraphine: { pitch: 1.3,  rate: 0.88, volume: 0.9,  keywords: ["samantha", "karen", "victoria", "female"] },
        aurora:    { pitch: 1.6,  rate: 1.0,  volume: 0.9,  keywords: ["fiona", "moira", "tessa", "female"] },
        morrigan:  { pitch: 1.1,  rate: 0.82, volume: 1.0,  keywords: ["serena", "zoe", "ava", "female"] },
      };

      const profile = voiceProfiles[current.id] || voiceProfiles.aldric;
      utter.pitch = profile.pitch;
      utter.rate = profile.rate;
      utter.volume = profile.volume;

      // Try to find a matching voice by keyword
      const matched = profile.keywords.reduce((found, kw) => {
        if (found) return found;
        return voices.find(v => v.lang.startsWith("en") && v.name.toLowerCase().includes(kw)) || null;
      }, null);
      if (matched) utter.voice = matched;

      window.speechSynthesis.speak(utter);
    } catch (e) {}

    return () => {
      clearInterval(timer);
      window.speechSynthesis?.cancel();
    };
  }, [showDetails, current.id, current.motivation]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % characters.length);
    setShowDetails(false);
    setSpeechBubble("");
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + characters.length) % characters.length);
    setShowDetails(false);
    setSpeechBubble("");
  };

  const handleSelect = () => {
    onSelect(current.id);
    setIsVisible(false);
  };

  // Tap to skip the per-character story typewriter — was a forced ~3-5s wait
  // before the "Become X" button became available.
  const skipTypewriter = () => {
    if (showDetails) return;
    if (typeRef.current) clearInterval(typeRef.current);
    setTypedText(current.story);
    setShowDetails(true);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, rgba(10,4,20,0.98) 0%, rgba(20,10,40,0.98) 50%, rgba(10,4,20,0.98) 100%)",
      }}>

      {/* Background stars */}
      {Array.from({ length: 50 }).map((_, i) => (
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

      <div className="relative max-w-4xl w-full mx-4" style={{ zIndex: 10 }}>
        {/* Back button — fixed top-left of the viewport so it never covers
            the title on narrow screens. */}
        {onBack && (
          <button
            onClick={() => { window.speechSynthesis?.cancel(); onBack(); }}
            style={{
              position: "fixed",
              top: 16,
              left: 16,
              padding: "8px 14px",
              borderRadius: 8,
              background: "rgba(20,10,40,0.85)",
              border: "1px solid rgba(167,139,250,0.5)",
              color: "#a78bfa",
              fontSize: 12,
              fontFamily: "'Cinzel', serif",
              letterSpacing: "0.15em",
              cursor: "pointer",
              zIndex: 30,
              backdropFilter: "blur(6px)",
            }}>
            ← Back
          </button>
        )}
        {/* Top title */}
        <div style={{
          textAlign: "center",
          marginBottom: 8,
          fontSize: "clamp(20px, 5vw, 36px)",
          fontFamily: "'Cinzel Decorative', serif",
          fontWeight: 900,
          color: "#e9d5ff",
          letterSpacing: "0.08em",
          textShadow: "0 0 30px rgba(168,85,247,0.5)",
        }}>
          ⚔️ CHOOSE THY CHAMPION ⚔️
        </div>
        {/* Character counter — gives players an immediate signal that there
            are multiple characters and the chevrons navigate between them. */}
        <div style={{
          textAlign: "center",
          marginBottom: 24,
          fontSize: 12,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgba(167,139,250,0.7)",
          fontFamily: "'Cinzel', serif",
        }}>
          ← Swipe through {characters.length} champions →&nbsp;&nbsp;<span style={{ color: current.color, fontWeight: 900 }}>{currentIndex + 1} / {characters.length}</span>
        </div>

        <div style={{
          display: "flex",
          gap: 24,
          alignItems: "center",
          justifyContent: "center",
        }}>
          {/* Left arrow — animated pulse so it's obviously interactive. */}
          <button
            onClick={handlePrev}
            title="Previous champion"
            aria-label="Previous champion"
            style={{
              background: "linear-gradient(180deg, #7c3aed, #4c1d95)",
              border: "3px solid #a78bfa",
              color: "#e9d5ff",
              width: 64, height: 64,
              borderRadius: 14,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s",
              flexShrink: 0,
              boxShadow: "0 0 24px rgba(167,139,250,0.45), 0 4px 0 #2a1a5a",
              animation: "navPulse 2.2s ease-in-out infinite",
              zIndex: 25,
            }}>
            <ChevronLeft size={32} />
          </button>

          {/* Character card */}
          <div style={{
            background: "linear-gradient(160deg, rgba(10,4,20,0.95) 0%, rgba(30,10,50,0.95) 100%)",
            border: `2px solid ${current.color}`,
            borderRadius: 16,
            padding: "40px 32px",
            maxWidth: 500,
            textAlign: "center",
            boxShadow: `0 0 60px ${current.color}40, inset 0 1px 0 rgba(138,85,200,0.1)`,
            backdropFilter: "blur(10px)",
          }}>
            {/* Character sprite + speech bubble */}
            <div style={{ position: "relative", marginBottom: 16, display: "flex", justifyContent: "center" }}>
              {/* Speech bubble */}
              {speechBubble && (
                <div style={{
                  position: "absolute",
                  top: -10,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "min(320px, 90vw)",
                  background: "linear-gradient(135deg, rgba(10,4,20,0.97), rgba(30,10,50,0.97))",
                  border: `2px solid ${current.color}`,
                  borderRadius: 12,
                  padding: "10px 14px",
                  fontSize: 12,
                  fontFamily: "'Cinzel', serif",
                  fontStyle: "italic",
                  color: "#f0e6ff",
                  lineHeight: 1.6,
                  textAlign: "left",
                  boxShadow: `0 0 20px ${current.color}50`,
                  zIndex: 20,
                  animation: "fadeSlideUp 0.3s both",
                  pointerEvents: "none",
                }}>
                  <span style={{ color: current.color, fontWeight: 900, fontStyle: "normal", marginRight: 4 }}>
                    {current.name}:
                  </span>
                  "{speechBubble}
                  {isSpeaking && <span style={{ opacity: 0.7, animation: "blink 0.5s ease-in-out infinite" }}>▌</span>}"
                  {/* Bubble tail pointing down toward character */}
                  <div style={{
                    position: "absolute",
                    bottom: -10,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 0,
                    height: 0,
                    borderLeft: "10px solid transparent",
                    borderRight: "10px solid transparent",
                    borderTop: `10px solid ${current.color}`,
                  }}/>
                </div>
              )}

              <div
                style={{
                  marginTop: speechBubble ? 80 : 0,
                  filter: `drop-shadow(0 0 20px ${current.color})`,
                  display: "flex",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                onClick={() => setSelectedCharForStats(current)}
              >
                {current.id === "aldric" && <LordAldric size={100} />}
                {current.id === "seraphine" && <QueenSeraphine size={100} />}
                {current.id === "morrigan" && <Morrigan size={100} />}
                {current.id === "kael" && <Kael size={100} />}
                {current.id === "aurora" && <Aurora size={100} />}
              </div>
            </div>

            {/* Character name and title */}
            <h2 style={{
              fontSize: 28,
              fontFamily: "'Cinzel', serif",
              fontWeight: 700,
              color: current.color,
              marginBottom: 4,
              letterSpacing: "0.05em",
              textShadow: `0 0 15px ${current.color}`,
            }}>
              {current.name}
            </h2>
            <p style={{
              fontSize: 12,
              fontFamily: "'Cinzel', serif",
              color: "#aaa",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}>
              {current.title}
            </p>

            {/* Story text with typewriter — tap anywhere on the block to skip.
                The "tap to skip" hint sits in a fixed-height area below the
                text so it can fade in/out without shifting the layout. */}
            <div
              onClick={skipTypewriter}
              role={!showDetails ? "button" : undefined}
              title={!showDetails ? "Tap to skip" : undefined}
              style={{
                fontSize: 14,
                color: "#f0e6ff",
                lineHeight: 1.8,
                fontFamily: "'Cinzel', serif",
                minHeight: 140,
                marginBottom: 0,
                textAlign: "left",
                cursor: showDetails ? "default" : "pointer",
              }}>
              {typedText}
              {!showDetails && <span style={{ opacity: 0.7, animation: "blink 0.6s ease-in-out infinite" }}>▌</span>}
            </div>
            <div style={{
              height: 22,
              marginTop: 6,
              marginBottom: 14,
              textAlign: "center",
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(167,139,250,0.55)",
              opacity: showDetails ? 0 : 1,
              transition: "opacity 0.25s ease",
              pointerEvents: showDetails ? "none" : "auto",
            }}>
              <button
                onClick={skipTypewriter}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "inherit",
                  fontSize: "inherit",
                  letterSpacing: "inherit",
                  textTransform: "inherit",
                  fontFamily: "'Cinzel', serif",
                  cursor: "pointer",
                }}>
                ▶ Tap to skip
              </button>
            </div>

            {/* Motivation quote */}
            {showDetails && (
              <div style={{
                background: `${current.color}20`,
                border: `1px solid ${current.color}60`,
                borderRadius: 8,
                padding: "12px 16px",
                marginTop: 20,
                fontSize: 13,
                fontStyle: "italic",
                color: "#f0e6ff",
                fontFamily: "'Cinzel', serif",
                animation: "fadeSlideUp 0.4s both",
              }}>
                "{current.motivation}"
              </div>
            )}

            {/* Stats display */}
            {showDetails && (
              <div style={{
                marginTop: 20,
                paddingTop: 20,
                borderTop: `1px solid ${current.color}40`,
                animation: "fadeSlideUp 0.5s 0.1s both",
              }}>
                <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#aaa", marginBottom: 12 }}>BONUSES</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {current.stats.healthBonus > 0 && (
                    <div style={{ fontSize: 12, color: "#ff6b6b" }}>
                      ❤️ Health <span style={{ color: current.color }}>+{Math.round(current.stats.healthBonus * 100)}%</span>
                    </div>
                  )}
                  {current.stats.damageBonus > 0 && (
                    <div style={{ fontSize: 12, color: "#ffd60a" }}>
                      ⚔️ Damage <span style={{ color: current.color }}>+{Math.round(current.stats.damageBonus * 100)}%</span>
                    </div>
                  )}
                  {current.stats.rangeBonus > 0 && (
                    <div style={{ fontSize: 12, color: "#60a5fa" }}>
                      📡 Range <span style={{ color: current.color }}>+{Math.round(current.stats.rangeBonus * 100)}%</span>
                    </div>
                  )}
                  {current.stats.costReduction > 0 && (
                    <div style={{ fontSize: 12, color: "#10b981" }}>
                      💰 Cost <span style={{ color: current.color }}>-{Math.round(current.stats.costReduction * 100)}%</span>
                    </div>
                  )}
                  {current.abilityUnlocked && (
                    <div style={{ fontSize: 12, color: "#a78bfa", gridColumn: "1 / -1" }}>
                      ✨ Unique Ability: <span style={{ color: current.color, fontWeight: "bold" }}>Unlocked</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right arrow — animated pulse so it's obviously interactive. */}
          <button
            onClick={handleNext}
            title="Next champion"
            aria-label="Next champion"
            style={{
              background: "linear-gradient(180deg, #7c3aed, #4c1d95)",
              border: "3px solid #a78bfa",
              color: "#e9d5ff",
              width: 64, height: 64,
              borderRadius: 14,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s",
              flexShrink: 0,
              boxShadow: "0 0 24px rgba(167,139,250,0.45), 0 4px 0 #2a1a5a",
              animation: "navPulse 2.2s ease-in-out infinite",
              animationDelay: "1.1s",
              zIndex: 25,
            }}>
            <ChevronRight size={32} />
          </button>
        </div>

        {/* Select button */}
        {showDetails && (
          <button
            onClick={handleSelect}
            style={{
              marginTop: 32,
              width: "100%",
              padding: "14px 0",
              borderRadius: 10,
              fontSize: 13, fontWeight: 900,
              letterSpacing: "0.18em", textTransform: "uppercase",
              fontFamily: "'Cinzel', serif",
              background: `linear-gradient(180deg, ${current.color}dd, ${current.color}aa)`,
              border: `2px solid ${current.color}`,
              color: "#fff",
              cursor: "pointer",
              boxShadow: `0 6px 0 ${current.color}44, 0 0 30px ${current.color}60`,
              transition: "all 0.3s",
              animation: "pulseBtn 1.8s ease-in-out infinite",
            }}>
            ⚔ Become {current.name} ⚔
          </button>
        )}

        {/* Character indicator dots — clickable to jump directly. */}
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 24 }}>
          {characters.map((c, i) => (
            <button
              key={i}
              onClick={() => {
                if (i === currentIndex) return;
                setCurrentIndex(i);
                setShowDetails(false);
                setSpeechBubble("");
              }}
              title={c.name}
              aria-label={`Jump to ${c.name}`}
              style={{
                width: i === currentIndex ? 22 : 12,
                height: 12,
                borderRadius: 9,
                background: i === currentIndex ? current.color : "rgba(255,255,255,0.18)",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes twinkle { 0%,100%{opacity:0.3;transform:scale(0.8)} 50%{opacity:1;transform:scale(1.2)} }
        @keyframes blink { 0%,100% { opacity: 0.2; } 50% { opacity: 1; } }
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulseBtn {
          0%,100% { box-shadow: 0 6px 0 ${current.color}44, 0 0 20px ${current.color}50; }
          50% { box-shadow: 0 6px 0 ${current.color}44, 0 0 40px ${current.color}80; }
        }
        @keyframes navPulse {
          0%,100% { transform: scale(1); box-shadow: 0 0 24px rgba(167,139,250,0.45), 0 4px 0 #2a1a5a; }
          50%     { transform: scale(1.08); box-shadow: 0 0 36px rgba(167,139,250,0.85), 0 4px 0 #2a1a5a; }
        }
      `}</style>

      <CharacterStatsPanel
        character={selectedCharForStats}
        onClose={() => setSelectedCharForStats(null)}
      />
    </div>
  );
}