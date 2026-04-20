import { useEffect, useState, useRef } from "react";
import { DemonLord } from "./CharacterSprites";

// Cinematic data per boss
const BOSS_CINEMATIC = {
  boss_meadow: {
    title: "FOREST DRAKE",
    subtitle: "Guardian of the Ancient Wilds",
    cinematicTitle: "THE FOREST AWAKENS",
    lore: "Ancient scales forged from a thousand years of darkness.\nIt has devoured armies whole.",
    tauntLines: [
      "The forest answers my call!",
      "Your walls crumble like autumn leaves!",
      "No arrow shall pierce these ancient scales!",
    ],
    glow: "#22c55e",
    rgb: "34,197,94",
    bg: "linear-gradient(180deg,#000800,#001200,#000500)",
    emoji: "🐉",
    screenShake: true,
    particles: ["🌿","🍃","🌑","💚","🌲"],
    rageWarning: "THE DRAKE ENTERS ITS BLOOD FRENZY",
    phaseLabel: "ENRAGED",
    phaseColor: "#86efac",
  },
  boss_dungeon: {
    title: "DUNGEON OVERLORD",
    subtitle: "Master of the Endless Dark",
    cinematicTitle: "DEATH RISES FROM THE DEEP",
    lore: "Rotted sinew bound by fell magic.\nIt has ruled the dark for ten thousand years.",
    tauntLines: [
      "The darkness obeys only me.",
      "Your torches will not save you.",
      "I have waited centuries for this feast.",
    ],
    glow: "#6366f1",
    rgb: "99,102,241",
    bg: "linear-gradient(180deg,#020008,#04001a,#020010)",
    emoji: "🧟",
    screenShake: true,
    particles: ["💀","🦴","🕯️","🪦","⛓️"],
    rageWarning: "THE OVERLORD BREAKS ITS SHACKLES",
    phaseLabel: "UNBOUND",
    phaseColor: "#a5b4fc",
  },
  boss_volcano: {
    title: "FLAME TITAN",
    subtitle: "Born of the Mountain's Wrath",
    cinematicTitle: "THE MOUNTAIN UNLEASHES ITS WRATH",
    lore: "Born from the volcano's molten core.\nEvery step scorches the earth to ash.",
    tauntLines: [
      "I am born of the mountain's eternal wrath!",
      "Your kingdom will burn like dry kindling!",
      "The earth itself is my weapon, little lord!",
    ],
    glow: "#f97316",
    rgb: "249,115,22",
    bg: "linear-gradient(180deg,#100100,#280800,#100300)",
    emoji: "🔥",
    screenShake: true,
    particles: ["🔥","🌋","💥","⚡","🌑"],
    rageWarning: "THE TITAN IGNITES ITS INFERNAL CORE",
    phaseLabel: "VOLCANIC",
    phaseColor: "#fdba74",
  },
  boss_abyss: {
    title: "FROST COLOSSUS",
    subtitle: "The Eternal Winter Incarnate",
    cinematicTitle: "THE ETERNAL WINTER DESCENDS",
    lore: "A colossus of living glacial ice.\nIts breath extinguishes stars.",
    tauntLines: [
      "The cold shall claim your souls today.",
      "No warmth survives my eternal embrace.",
      "I am the winter that never ends.",
    ],
    glow: "#60a5fa",
    rgb: "96,165,250",
    bg: "linear-gradient(180deg,#000510,#001030,#000818)",
    emoji: "❄️",
    screenShake: true,
    particles: ["❄️","🧊","💠","⭐","🌊"],
    rageWarning: "THE COLOSSUS UNLEASHES THE BLIZZARD",
    phaseLabel: "BLIZZARD",
    phaseColor: "#bae6fd",
  },
  boss_shadow: {
    title: "SHADOW SOVEREIGN",
    subtitle: "The End of All Things",
    cinematicTitle: "THE VOID ITSELF ARRIVES",
    lore: "It is not a creature. It is an inevitability.\nThe void given form. The last darkness.",
    tauntLines: [
      "Nothing escapes the void, little lord.",
      "Your very hope is fuel for my hunger.",
      "I am inevitable. I am the end. I am YOU.",
    ],
    glow: "#a855f7",
    rgb: "168,85,247",
    bg: "linear-gradient(180deg,#050005,#100020,#080012)",
    emoji: "💀",
    screenShake: true,
    particles: ["👑","✨","🌑","💜","🕳️"],
    rageWarning: "THE SOVEREIGN ENTERS ITS FINAL FORM",
    phaseLabel: "FINAL FORM",
    phaseColor: "#e879f9",
  },
  boss_demon: {
    title: "DEMON LORD MALGRATH",
    subtitle: "The Ancient Evil",
    cinematicTitle: "THE DEMON LORD FALLS — PEACE RETURNS",
    lore: "The ancient evil that plagued the realm for ten thousand years\nhas been vanquished. By thy hand, Eldenmoor is FOREVER FREE.",
    tauntLines: [
      "Impossible! How dare a mortal defy me!",
      "I shall drag thy soul to the abyss with me!",
      "But... no... my reign... ENDS HERE...",
    ],
    glow: "#ff1744",
    rgb: "255,23,68",
    bg: "linear-gradient(180deg,#0a0005,#1a000a,#0d0005)",
    emoji: "👑",
    screenShake: true,
    particles: ["👑","🔥","⚔️","💥","✨"],
    rageWarning: "THE DEMON LORD UNLEASHES TOTAL ANNIHILATION",
    phaseLabel: "APOCALYPSE",
    phaseColor: "#ff5252",
  },
};

function playBossRoar(bossType, glow) {
  try {
    const ac = new (window.AudioContext || window.webkitAudioContext)();
    // Low booming roar
    const freqs = {
      boss_meadow:  [55, 80, 110],
      boss_dungeon: [40, 60, 80],
      boss_volcano: [45, 70, 100],
      boss_abyss:   [50, 65, 90],
      boss_shadow:  [30, 45, 60],
    }[bossType] || [50, 70, 100];

    freqs.forEach((freq, i) => {
      const osc = ac.createOscillator();
      const g = ac.createGain();
      osc.connect(g);
      g.connect(ac.destination);
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, ac.currentTime + i * 0.08);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.3, ac.currentTime + 1.5);
      g.gain.setValueAtTime(0.5 - i * 0.1, ac.currentTime + i * 0.08);
      g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 2.0);
      osc.start(ac.currentTime + i * 0.08);
      osc.stop(ac.currentTime + 2.2);
    });

    // High pitched shriek overtone
    const shriek = ac.createOscillator();
    const sg = ac.createGain();
    shriek.connect(sg); sg.connect(ac.destination);
    shriek.type = "sine";
    shriek.frequency.setValueAtTime(800, ac.currentTime + 0.1);
    shriek.frequency.exponentialRampToValueAtTime(200, ac.currentTime + 1.2);
    sg.gain.setValueAtTime(0.15, ac.currentTime + 0.1);
    sg.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 1.5);
    shriek.start(ac.currentTime + 0.1);
    shriek.stop(ac.currentTime + 1.8);
  } catch (e) {}
}

export default function BossArrivalModal({ boss, onDismiss }) {
  const [phase, setPhase] = useState("hidden"); // hidden → black → slam → reveal → taunt → done
  const [tauntIndex, setTauntIndex] = useState(0);
  const [typedTaunt, setTypedTaunt] = useState("");
  const [shake, setShake] = useState(false);
  const [particles, setParticles] = useState([]);
  const typeRef = useRef(null);
  const particleRef = useRef(null);

  const cinematic = boss ? BOSS_CINEMATIC[boss.bossType] : null;

  useEffect(() => {
    if (!boss || !cinematic) return;

    setPhase("black");
    setTauntIndex(0);
    setTypedTaunt("");
    setShake(false);

    // Phase timeline
    const t1 = setTimeout(() => {
      setPhase("slam");
      playBossRoar(boss.bossType, cinematic.glow);
      setShake(true);
      setTimeout(() => setShake(false), 800);
    }, 400);

    const t2 = setTimeout(() => setPhase("reveal"), 1400);
    const t3 = setTimeout(() => setPhase("taunt"), 2800);
    const t4 = setTimeout(() => {
      setPhase("done");
      setTimeout(onDismiss, 600);
    }, 6000);

    // Particles
    particleRef.current = setInterval(() => {
      setParticles(p => [
        ...p.slice(-20),
        {
          id: Math.random(),
          x: 5 + Math.random() * 90,
          size: 14 + Math.random() * 20,
          dur: 2.5 + Math.random() * 2,
          emoji: cinematic.particles[Math.floor(Math.random() * cinematic.particles.length)],
        },
      ]);
    }, 200);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
      clearInterval(particleRef.current);
    };
  }, [boss]);

  // Typewriter for taunt
  useEffect(() => {
    if (phase !== "taunt" || !cinematic) return;
    const line = cinematic.tauntLines[tauntIndex] || "";
    setTypedTaunt("");
    let idx = 0;
    typeRef.current = setInterval(() => {
      idx++;
      setTypedTaunt(line.slice(0, idx));
      if (idx >= line.length) clearInterval(typeRef.current);
    }, 38);
    return () => clearInterval(typeRef.current);
  }, [phase, tauntIndex]);

  if (phase === "hidden" || !boss || !cinematic) return null;

  const isShadowBoss = boss.bossType === "boss_shadow";

  return (
    <div
      className={`fixed inset-0 z-[150] flex items-center justify-center overflow-hidden`}
      style={{
        background: phase === "black" ? "#000" : "rgba(0,0,0,0.88)",
        transition: "background 0.3s",
        animation: shake ? "screenShake 0.08s ease-in-out 8 alternate" : "none",
      }}>

      {/* Floating particles */}
      {particles.map(p => (
        <div key={p.id} style={{
          position: "absolute", left: `${p.x}%`, bottom: "-5%",
          fontSize: p.size, opacity: 0.4,
          animation: `riseUp ${p.dur}s ease-out forwards`,
          pointerEvents: "none",
        }}>{p.emoji}</div>
      ))}

      {/* Radial glow bg */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at center, rgba(${cinematic.rgb},0.15) 0%, transparent 65%)`,
        pointerEvents: "none",
        opacity: phase === "black" ? 0 : 1,
        transition: "opacity 0.6s",
      }} />

      {/* ── SLAM phase — title crashes in ── */}
      {phase === "slam" && (
        <div className="flex flex-col items-center pointer-events-none" style={{ zIndex: 10 }}>
          <div style={{
            fontSize: "clamp(28px,7vw,72px)",
            fontFamily: "'Cinzel Decorative', serif",
            fontWeight: 900,
            textAlign: "center",
            color: cinematic.glow,
            textShadow: `0 0 60px ${cinematic.glow}, 0 0 120px rgba(${cinematic.rgb},0.5)`,
            animation: "titleSlam 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards",
            letterSpacing: "0.06em",
            padding: "0 20px",
          }}>
            {cinematic.cinematicTitle}
          </div>
          {/* Shockwave rings */}
          {[0,1,2,3].map(i => (
            <div key={i} style={{
              position: "absolute",
              width: 60, height: 60, borderRadius: "50%",
              border: `4px solid ${cinematic.glow}`,
              animation: `shockwave 1.5s ease-out ${i*0.2}s forwards`,
              opacity: 0,
            }} />
          ))}
        </div>
      )}

      {/* ── REVEAL phase — boss portrait + lore ── */}
      {(phase === "reveal" || phase === "taunt" || phase === "done") && (
        <div className="relative flex flex-col items-center pointer-events-none" style={{ zIndex: 10 }}>

          {/* Top cinematic stripe */}
          <div style={{
            position: "fixed", top: 0, left: 0, right: 0,
            height: 60,
            background: "linear-gradient(180deg,#000,rgba(0,0,0,0.7))",
            borderBottom: `2px solid rgba(${cinematic.rgb},0.3)`,
          }}>
            <div style={{
              position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)",
              fontSize: 9, fontWeight: 900, letterSpacing: "0.45em",
              textTransform: "uppercase", color: `rgba(${cinematic.rgb},0.7)`,
              fontFamily: "'Cinzel', serif",
            }}>
              ⚔ &nbsp; {cinematic.cinematicTitle} &nbsp; ⚔
            </div>
          </div>

          {/* Boss portrait */}
          <div style={{
            animation: "bossReveal 0.8s cubic-bezier(0.34,1.3,0.64,1) forwards",
            marginBottom: 8,
            position: "relative",
          }}>
            {/* Pulsing glow ring around boss */}
            <div style={{
              position: "absolute", inset: "-30px",
              borderRadius: "50%", border: `3px solid ${cinematic.glow}`,
              opacity: 0.4, animation: "pulseGlow 2s ease-in-out infinite",
            }} />
            {isShadowBoss ? (
              <DemonLord size={160} />
            ) : (
              <div style={{
                fontSize: "clamp(80px,18vw,160px)",
                filter: `drop-shadow(0 0 40px ${cinematic.glow}) drop-shadow(0 0 80px rgba(${cinematic.rgb},0.4))`,
                animation: "bossFloat 2.8s ease-in-out infinite",
                display: "block", textAlign: "center",
              }}>
                {cinematic.emoji}
              </div>
            )}
          </div>

          {/* Boss name */}
          <div style={{
            textAlign: "center",
            animation: "fadeSlideUp 0.5s 0.2s both",
          }}>
            <div style={{
              fontSize: "clamp(22px,5vw,42px)",
              fontFamily: "'Cinzel Decorative', serif",
              fontWeight: 900,
              color: "#fff",
              letterSpacing: "0.08em",
              textShadow: `0 0 30px ${cinematic.glow}, 0 0 60px rgba(${cinematic.rgb},0.4)`,
            }}>
              {boss.name}
            </div>
            <div style={{
              fontSize: 11, letterSpacing: "0.35em",
              textTransform: "uppercase", marginTop: 4,
              color: cinematic.glow, fontFamily: "'Cinzel', serif",
              textShadow: `0 0 12px ${cinematic.glow}`,
            }}>
              {cinematic.subtitle}
            </div>
          </div>

          {/* Lore lines */}
          {phase !== "taunt" && phase !== "done" && (
            <div style={{
              marginTop: 20, textAlign: "center", maxWidth: 420,
              padding: "0 20px",
              animation: "fadeSlideUp 0.5s 0.4s both",
            }}>
              {cinematic.lore.split("\n").map((line, i) => (
                <div key={i} style={{
                  fontSize: 13, color: "rgba(255,255,255,0.6)",
                  fontFamily: "'Cinzel', serif", lineHeight: 1.8,
                  fontStyle: "italic",
                }}>{line}</div>
              ))}
            </div>
          )}

          {/* Taunt box */}
          {(phase === "taunt" || phase === "done") && (
            <div style={{
              marginTop: 20, maxWidth: 460, width: "100%",
              padding: "16px 24px",
              background: `linear-gradient(135deg,rgba(${cinematic.rgb},0.1),rgba(0,0,0,0.6))`,
              border: `1px solid rgba(${cinematic.rgb},0.4)`,
              borderRadius: 12,
              animation: "fadeSlideUp 0.4s both",
              backdropFilter: "blur(8px)",
            }}>
              <div style={{
                fontSize: 9, letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: cinematic.glow, fontFamily: "'Cinzel', serif",
                marginBottom: 8, fontWeight: 900,
              }}>
                💬 &nbsp; The Boss Speaks
              </div>
              <div style={{
                fontSize: 14, color: "#fff",
                fontFamily: "'Cinzel', serif",
                lineHeight: 1.7, fontStyle: "italic",
                minHeight: 50,
              }}>
                "{typedTaunt}
                <span style={{ opacity: 0.7, animation: "blink 0.5s infinite" }}>▌</span>"
              </div>
              {/* Dot navigation */}
              <div className="flex justify-center gap-2 mt-3">
                {cinematic.tauntLines.map((_, i) => (
                  <div key={i} style={{
                    width: i === tauntIndex ? 16 : 6,
                    height: 6, borderRadius: 9,
                    background: i <= tauntIndex ? cinematic.glow : "rgba(255,255,255,0.1)",
                    transition: "all 0.3s",
                  }} />
                ))}
              </div>
            </div>
          )}

          {/* HP bar preview */}
          <div style={{
            marginTop: 16, width: "min(460px,85vw)",
            animation: "fadeSlideUp 0.5s 0.5s both",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 9, color: `rgba(${cinematic.rgb},0.6)`, letterSpacing: "0.2em", fontFamily: "'Cinzel', serif" }}>BOSS HP</span>
              <span style={{ fontSize: 9, color: `rgba(${cinematic.rgb},0.6)`, letterSpacing: "0.1em" }}>CHALLENGING</span>
            </div>
            <div style={{ height: 8, borderRadius: 9, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
              <div style={{
                height: "100%", borderRadius: 9,
                background: `linear-gradient(90deg,${cinematic.glow},rgba(${cinematic.rgb},0.5))`,
                animation: "hpFill 1s ease-out forwards",
                boxShadow: `0 0 12px ${cinematic.glow}`,
              }} />
            </div>
          </div>

          {/* Bottom cinema stripe */}
          <div style={{
            position: "fixed", bottom: 0, left: 0, right: 0,
            height: 50,
            background: "linear-gradient(0deg,#000,rgba(0,0,0,0.7))",
            borderTop: `2px solid rgba(${cinematic.rgb},0.3)`,
          }} />
        </div>
      )}

      <style>{`
        @keyframes titleSlam {
          0%   { transform: scale(4) translateY(-60px); opacity: 0; filter: blur(20px); }
          60%  { transform: scale(0.95); opacity: 1; filter: blur(0); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes shockwave {
          0%   { transform: scale(0.2); opacity: 1; }
          100% { transform: scale(12);  opacity: 0; }
        }
        @keyframes bossReveal {
          0%   { transform: scale(0.3) translateY(60px); opacity: 0; filter: blur(20px); }
          70%  { transform: scale(1.05) translateY(-5px); opacity: 1; filter: blur(0); }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes bossFloat {
          0%,100% { transform: translateY(0) scale(1); }
          50%     { transform: translateY(-10px) scale(1.02); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hpFill {
          from { width: 0; }
          to   { width: 100%; }
        }
        @keyframes riseUp {
          0%   { transform: translateY(0); opacity: 0.4; }
          100% { transform: translateY(-90vh); opacity: 0; }
        }
        @keyframes screenShake {
          0%   { transform: translate(-4px,-2px) rotate(-0.5deg); }
          25%  { transform: translate(4px,2px) rotate(0.5deg); }
          50%  { transform: translate(-3px,3px) rotate(-0.3deg); }
          75%  { transform: translate(3px,-3px) rotate(0.3deg); }
          100% { transform: translate(0,0) rotate(0); }
        }
        @keyframes blink { 0%,100%{opacity:0.2} 50%{opacity:1} }
        @keyframes pulseGlow {
          0%,100% { filter: drop-shadow(0 0 20px currentColor); }
          50% { filter: drop-shadow(0 0 50px currentColor); }
        }
        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes twinkle { 0%,100%{opacity:0.3} 50%{opacity:1} }
      `}</style>
    </div>
  );
}