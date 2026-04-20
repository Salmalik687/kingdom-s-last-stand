import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CHARACTERS, getAllCharacters } from "../../lib/characters";
import { LordAldric, QueenSeraphine, Morrigan, Kael, Aurora } from "./CharacterSprites";

export default function CharacterSelect({ onSelect }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const typeRef = useRef(null);
  const [typedText, setTypedText] = useState("");
  const [showDetails, setShowDetails] = useState(false);

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

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % characters.length);
    setShowDetails(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + characters.length) % characters.length);
    setShowDetails(false);
  };

  const handleSelect = () => {
    onSelect(current.id);
    setIsVisible(false);
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
        {/* Top title */}
        <div style={{
          textAlign: "center",
          marginBottom: 32,
          fontSize: "clamp(20px, 5vw, 36px)",
          fontFamily: "'Cinzel Decorative', serif",
          fontWeight: 900,
          color: "#e9d5ff",
          letterSpacing: "0.08em",
          textShadow: "0 0 30px rgba(168,85,247,0.5)",
        }}>
          ⚔️ CHOOSE THY CHAMPION ⚔️
        </div>

        <div style={{
          display: "flex",
          gap: 24,
          alignItems: "center",
          justifyContent: "center",
        }}>
          {/* Left arrow */}
          <button
            onClick={handlePrev}
            style={{
              background: "linear-gradient(180deg, #7c3aed, #4c1d95)",
              border: "2px solid #a78bfa",
              color: "#e9d5ff",
              width: 50, height: 50,
              borderRadius: 12,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.3s",
            }}>
            <ChevronLeft size={24} />
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
            {/* Character sprite */}
            <div style={{
              marginBottom: 16,
              filter: `drop-shadow(0 0 20px ${current.color})`,
              display: "flex",
              justifyContent: "center",
            }}>
              {current.id === "aldric" && <LordAldric size={100} />}
              {current.id === "seraphine" && <QueenSeraphine size={100} />}
              {current.id === "morrigan" && <Morrigan size={100} />}
              {current.id === "kael" && <Kael size={100} />}
              {current.id === "aurora" && <Aurora size={100} />}
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

            {/* Story text with typewriter */}
            <div style={{
              fontSize: 14,
              color: "#f0e6ff",
              lineHeight: 1.8,
              fontFamily: "'Cinzel', serif",
              minHeight: 140,
              marginBottom: 20,
              textAlign: "left",
            }}>
              {typedText}
              {!showDetails && <span style={{ opacity: 0.7, animation: "blink 0.6s ease-in-out infinite" }}>▌</span>}
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

          {/* Right arrow */}
          <button
            onClick={handleNext}
            style={{
              background: "linear-gradient(180deg, #7c3aed, #4c1d95)",
              border: "2px solid #a78bfa",
              color: "#e9d5ff",
              width: 50, height: 50,
              borderRadius: 12,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.3s",
            }}>
            <ChevronRight size={24} />
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

        {/* Character indicator dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>
          {characters.map((_, i) => (
            <div key={i} style={{
              width: i === currentIndex ? 16 : 6,
              height: 6, borderRadius: 9,
              background: i === currentIndex ? current.color : "rgba(255,255,255,0.1)",
              transition: "all 0.3s",
            }} />
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
      `}</style>
    </div>
  );
}