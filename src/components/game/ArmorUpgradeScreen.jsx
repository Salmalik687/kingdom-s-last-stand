import { useState, useEffect, useRef } from "react";

const CHAPTER_DATA = {
  2: {
    chapterLabel: "Chapter II — The Dungeon Yields",
    queenLine1: "My Lord Aldric... the Dungeon Overlord is slain. I watched from the tower, and I wept with pride.",
    queenLine2: "The blacksmiths of Eldenmoor have laboured through the night. They have forged something worthy of thee.",
    queenLine3: "Come. Choose the gauntlets that shall guide thy hand in the battles ahead.",
    slotLabel: "Forge Thy Gauntlets",
    slotEmoji: "🧤",
    glow: "#6366f1",
    bg: "linear-gradient(180deg, #0a0820 0%, #120a30 50%, #1a0f40 100%)",
    queenBg: "linear-gradient(180deg, #a855f7, #6d28d9)",
    upgrades: [
      { id: "iron_fist",   emoji: "🔩", name: "Iron Fist",   desc: "Reinforced iron plates. Towers deal +15% damage.",    statLabel: "Tower Damage", statVal: "+15%", color: "#60a5fa" },
      { id: "swift_grip",  emoji: "⚡", name: "Swift Grip",  desc: "Lightweight alloy. Tower fire rate improved by 12%.", statLabel: "Fire Rate",    statVal: "+12%", color: "#facc15" },
      { id: "golden_palm", emoji: "💰", name: "Golden Palm", desc: "Blessed by the treasury. +20 gold per wave bonus.",   statLabel: "Wave Gold",   statVal: "+20g",  color: "#fbbf24" },
    ],
  },
  3: {
    chapterLabel: "Chapter III — The Volcano's Blessing",
    queenLine1: "The Flame Titan is dead. The earth has stopped trembling. Eldenmoor breathes again.",
    queenLine2: "The pyres of the Volcanic Wastes burned through the night — but our weavers salvaged something extraordinary.",
    queenLine3: "A cloak forged in dragonfire and ash. Choose wisely, my lord — it shall guard thy back forevermore.",
    slotLabel: "Don The Cloak",
    slotEmoji: "🧣",
    glow: "#f97316",
    bg: "linear-gradient(180deg, #150302 0%, #250500 50%, #3d0800 100%)",
    queenBg: "linear-gradient(180deg, #f97316, #b45309)",
    upgrades: [
      { id: "ember_cloak",  emoji: "🔥", name: "Ember Cloak",  desc: "Wreathed in volcanic ash. Projectile speed +20%.", statLabel: "Proj. Speed", statVal: "+20%", color: "#f97316" },
      { id: "forge_mantle", emoji: "⚒️", name: "Forge Mantle", desc: "Heat-tempered weave. All tower range +10%.",       statLabel: "Tower Range", statVal: "+10%", color: "#fb923c" },
      { id: "cinder_shroud",emoji: "🌋", name: "Cinder Shroud",desc: "Lava-dust infused. Restores +1 life immediately.", statLabel: "Lives",       statVal: "+1",   color: "#ef4444" },
    ],
  },
  4: {
    chapterLabel: "Chapter IV — The Abyss Surrenders",
    queenLine1: "My lord... I feared the frozen dark had taken thee. But here thou standst — victorious.",
    queenLine2: "The Frost Colossus shattered. Its glacial essence — power unlike anything our smiths have ever seen.",
    queenLine3: "These pauldrons carry its might. Place them upon thy shoulders and face the Shadow Realm with confidence.",
    slotLabel: "Claim The Pauldrons",
    slotEmoji: "🦾",
    glow: "#60a5fa",
    bg: "linear-gradient(180deg, #020210 0%, #04041e 50%, #060630 100%)",
    queenBg: "linear-gradient(180deg, #60a5fa, #1d4ed8)",
    upgrades: [
      { id: "frost_guard",    emoji: "🧊", name: "Frost Guard",    desc: "Enemies stay slowed 10% longer from frost towers.", statLabel: "Slow Duration", statVal: "+10%", color: "#7dd3fc" },
      { id: "storm_mantle",   emoji: "⛈️", name: "Storm Mantle",   desc: "Crackling with energy. All tower damage +20%.",      statLabel: "Tower Damage",  statVal: "+20%", color: "#818cf8" },
      { id: "titan_shoulders",emoji: "💪", name: "Titan Shoulders", desc: "Colossal plating. +3 lives granted immediately.",    statLabel: "Lives Granted", statVal: "+3",   color: "#a78bfa" },
    ],
  },
  5: {
    chapterLabel: "Chapter V — The Final Ascension",
    queenLine1: "It is over. The Shadow Sovereign... is no more. Eldenmoor is free. All five lands — free.",
    queenLine2: "Thou hast carried a kingdom on thy shoulders and never once faltered. I have no words worthy of thee.",
    queenLine3: "Then let this be my last gift to thee, champion. Choose the mantle of thy legend — and let history remember thy name.",
    slotLabel: "The Final Blessing",
    slotEmoji: "✨",
    glow: "#e879f9",
    bg: "linear-gradient(180deg, #0a0010 0%, #160030 50%, #220050 100%)",
    queenBg: "linear-gradient(180deg, #e879f9, #7c3aed)",
    upgrades: [
      { id: "soul_aegis",   emoji: "🌟", name: "Soul Aegis",   desc: "Armour fused with thy soul. All bonuses doubled.",         statLabel: "All Bonuses",   statVal: "×2",          color: "#e879f9" },
      { id: "eternal_flame",emoji: "🔱", name: "Eternal Flame", desc: "Tower damage +40% and fire rate +25% permanently.",       statLabel: "DMG + Speed",   statVal: "+40%/+25%",   color: "#ff4d6d" },
      { id: "kings_resolve", emoji: "👑", name: "King's Resolve",desc: "The crown descends upon thee. +10 lives and +200 gold.", statLabel: "Lives + Gold",  statVal: "+10 / +200g", color: "#ffd60a" },
    ],
  },
};

const QUEEN_FRAMES = ["👸", "👸🏻", "👸"];

export default function ArmorUpgradeScreen({ chapter, onConfirm }) {
  const data = CHAPTER_DATA[chapter];
  const [phase, setPhase] = useState("dialogue"); // "dialogue" | "choose"
  const [lineIdx, setLineIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [selected, setSelected] = useState(null);
  const [queenFrame, setQueenFrame] = useState(0);
  const [particles, setParticles] = useState([]);
  const typeRef = useRef(null);

  const LINES = data ? [data.queenLine1, data.queenLine2, data.queenLine3] : [];

  // Reset on chapter change
  useEffect(() => {
    if (!data) return;
    setPhase("dialogue");
    setLineIdx(0);
    setTyped("");
    setIsTyping(true);
    setSelected(null);
    setParticles([]);
  }, [chapter]);

  // Typewriter
  useEffect(() => {
    if (phase !== "dialogue" || !data) return;
    const line = LINES[lineIdx] || "";
    if (typed.length < line.length) {
      typeRef.current = setTimeout(() => {
        setTyped(line.slice(0, typed.length + 1));
      }, 28);
      return () => clearTimeout(typeRef.current);
    } else {
      setIsTyping(false);
    }
  }, [typed, lineIdx, phase, data]);

  // Queen animation
  useEffect(() => {
    const t = setInterval(() => setQueenFrame(f => (f + 1) % QUEEN_FRAMES.length), 900);
    return () => clearInterval(t);
  }, []);

  // Particle sparkles when in choose phase
  useEffect(() => {
    if (phase !== "choose") return;
    const t = setInterval(() => {
      setParticles(p => [
        ...p.slice(-10),
        { id: Math.random(), x: 20 + Math.random() * 60, delay: Math.random() * 0.3 },
      ]);
    }, 500);
    return () => clearInterval(t);
  }, [phase]);

  const advanceLine = () => {
    if (isTyping) {
      clearTimeout(typeRef.current);
      setTyped(LINES[lineIdx]);
      setIsTyping(false);
      return;
    }
    if (lineIdx < LINES.length - 1) {
      setLineIdx(i => i + 1);
      setTyped("");
      setIsTyping(true);
    } else {
      setPhase("choose");
    }
  };

  if (!data) return null;

  const chosen = data.upgrades.find(u => u.id === selected);
  const isLastLine = lineIdx === LINES.length - 1 && !isTyping;

  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-center"
      style={{ background: "rgba(0,0,0,0.95)" }}>

      {/* Scene background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0" style={{ background: data.bg }} />
        {/* Stained glass glow */}
        <div style={{
          position: "absolute", top: "6%", left: "50%", transform: "translateX(-50%)",
          width: 260, height: 320,
          background: `radial-gradient(ellipse, ${data.glow}22 0%, ${data.glow}08 50%, transparent 80%)`,
          borderRadius: "50% 50% 0 0",
        }} />
        {/* Candle glows */}
        {[12, 88].map((pct, i) => (
          <div key={i} style={{
            position: "absolute", bottom: "28%", left: `${pct}%`,
            width: 70, height: 180,
            background: `radial-gradient(ellipse, rgba(255,180,60,0.15) 0%, transparent 70%)`,
          }} />
        ))}
        {/* Stars */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${(i * 41 + 7) % 100}%`,
            top: `${(i * 19 + 3) % 40}%`,
            width: 2, height: 2, borderRadius: "50%",
            background: "rgba(255,255,255,0.55)",
            animation: `starPulse ${1.5 + (i % 3) * 0.5}s ease-in-out infinite alternate`,
          }} />
        ))}
      </div>

      {/* Sparkle particles (choose phase) */}
      {phase === "choose" && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map(p => (
            <div key={p.id} style={{
              position: "absolute",
              left: `${p.x}%`, bottom: "52%",
              fontSize: 16,
              animation: `floatUp 2s ease-out ${p.delay}s forwards`,
              opacity: 0,
            }}>✨</div>
          ))}
        </div>
      )}

      {/* Chapter badge top */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em]"
          style={{ background: `${data.glow}22`, border: `1px solid ${data.glow}55`, color: data.glow, backdropFilter: "blur(4px)" }}>
          {data.slotEmoji} {data.chapterLabel}
        </div>
      </div>

      {/* Chapter progress dots */}
      <div className="absolute top-14 left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-none">
        {[1, 2, 3, 4, 5].map(c => (
          <div key={c} className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black"
              style={{
                background: c < chapter ? data.glow : c === chapter ? `linear-gradient(180deg, ${data.glow}, rgba(0,0,0,0.5))` : "rgba(40,30,60,0.5)",
                border: `2px solid ${c <= chapter ? data.glow : "rgba(80,60,100,0.3)"}`,
                boxShadow: c === chapter ? `0 0 10px ${data.glow}` : "none",
                color: c <= chapter ? "#fff" : "#3a2a50",
              }}>
              {c < chapter ? "✓" : c}
            </div>
            {c < 5 && <div className="w-4 h-0.5 rounded-full" style={{ background: c < chapter ? data.glow : "rgba(80,60,100,0.2)" }} />}
          </div>
        ))}
      </div>

      {/* Queen character */}
      <div className="absolute flex flex-col items-center pointer-events-none"
        style={{ bottom: phase === "choose" ? "38%" : "22%", left: "50%", transform: "translateX(-180px)", transition: "bottom 0.6s ease" }}>
        <div className="text-base mb-1" style={{ animation: "spin 4s linear infinite", display: "inline-block" }}>✨</div>
        <div style={{
          fontSize: 88, lineHeight: 1,
          filter: `drop-shadow(0 0 28px ${data.glow}99)`,
        }}>
          {QUEEN_FRAMES[queenFrame]}
        </div>
        <div style={{
          width: 76, height: 32, marginTop: -6,
          background: data.queenBg,
          borderRadius: "50% 50% 10px 10px",
          boxShadow: `0 0 18px ${data.glow}66`,
        }} />
        <div className="text-xs mt-2 font-semibold tracking-widest uppercase"
          style={{ color: data.glow, fontFamily: "'Cinzel', serif" }}>
          Queen Seraphine
        </div>
      </div>

      {/* Player/Lord Aldric */}
      <div className="absolute flex flex-col items-center pointer-events-none"
        style={{ bottom: phase === "choose" ? "38%" : "22%", left: "50%", transform: "translateX(70px)", transition: "bottom 0.6s ease" }}>
        <div style={{ fontSize: 76, lineHeight: 1, filter: "drop-shadow(0 0 16px rgba(255,180,60,0.5))" }}>⚔️</div>
        <div className="text-xs mt-2 font-semibold tracking-widest uppercase"
          style={{ color: "#d4af70", fontFamily: "'Cinzel', serif" }}>
          Lord Aldric
        </div>
      </div>

      {/* === DIALOGUE PHASE === */}
      {phase === "dialogue" && (
        <div className="relative w-full max-w-2xl mx-4 mb-0" style={{ zIndex: 10 }}>
          <div style={{
            background: "linear-gradient(135deg, rgba(10,5,25,0.97) 0%, rgba(20,8,15,0.97) 100%)",
            border: `2px solid ${data.glow}66`,
            borderBottom: "none",
            borderRadius: "16px 16px 0 0",
            padding: "22px 26px 18px",
            boxShadow: `0 -8px 40px ${data.glow}33`,
          }}>
            {/* Speaker */}
            <div className="flex items-center gap-2 mb-3">
              <span style={{
                background: data.queenBg,
                borderRadius: 999, padding: "2px 14px",
                fontSize: 11, fontWeight: "bold", color: "#fff",
                letterSpacing: "0.15em", textTransform: "uppercase",
                fontFamily: "'Cinzel', serif",
              }}>
                Queen Seraphine
              </span>
              {/* line dots */}
              <div className="flex gap-1 ml-auto">
                {LINES.map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full"
                    style={{ background: i <= lineIdx ? data.glow : "rgba(80,60,100,0.3)" }} />
                ))}
              </div>
            </div>

            {/* Text */}
            <p style={{
              fontSize: 15, color: "#e9d5ff", lineHeight: 1.75,
              minHeight: 52, fontFamily: "'Cinzel', serif",
              letterSpacing: "0.02em",
            }}>
              {typed}
              {isTyping && <span style={{ opacity: 0.6, animation: "blink 0.8s infinite" }}>▌</span>}
            </p>

            {/* Action */}
            <div className="flex justify-end mt-4">
              <button
                onClick={advanceLine}
                className="px-7 py-2 rounded-full font-black text-xs uppercase tracking-widest transition-all hover:scale-105"
                style={{
                  background: isLastLine
                    ? `linear-gradient(90deg, ${data.glow}, ${data.queenBg.includes("#") ? data.glow : data.glow})`
                    : "linear-gradient(90deg, #2d1a4a, #4c1d95)",
                  border: `1px solid ${data.glow}`,
                  color: "#fff",
                  fontFamily: "'Cinzel', serif",
                  boxShadow: isLastLine ? `0 0 16px ${data.glow}55` : "none",
                }}>
                {isTyping ? "Skip ▶" : isLastLine ? `${data.slotEmoji} Choose Thine Upgrade` : "Continue ▶"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === CHOOSE PHASE === */}
      {phase === "choose" && (
        <div className="relative w-full max-w-2xl mx-4 mb-0" style={{ zIndex: 10 }}>
          <div style={{
            background: "linear-gradient(135deg, rgba(10,5,25,0.98) 0%, rgba(20,8,15,0.98) 100%)",
            border: `2px solid ${data.glow}66`,
            borderBottom: "none",
            borderRadius: "16px 16px 0 0",
            padding: "20px 22px 18px",
            boxShadow: `0 -8px 40px ${data.glow}44`,
          }}>
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">{data.slotEmoji}</span>
              <div>
                <div className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: data.glow, fontFamily: "'Cinzel', serif" }}>
                  {data.slotLabel}
                </div>
                <div className="text-[9px]" style={{ color: "#5a4070" }}>Choose one — this blessing is permanent</div>
              </div>
            </div>

            {/* Upgrade cards */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {data.upgrades.map(u => (
                <button
                  key={u.id}
                  onClick={() => setSelected(u.id)}
                  className="relative rounded-xl p-3 text-left transition-all duration-150 hover:scale-[1.03]"
                  style={{
                    background: selected === u.id
                      ? `linear-gradient(160deg, ${u.color}20, ${u.color}08)`
                      : "linear-gradient(160deg, #0d0a14, #08060f)",
                    border: `2px solid ${selected === u.id ? u.color : "rgba(80,60,100,0.25)"}`,
                    boxShadow: selected === u.id ? `0 0 20px ${u.color}44, 0 4px 0 #000` : "0 3px 0 #000",
                  }}>
                  {selected === u.id && (
                    <div className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center"
                      style={{ background: u.color, boxShadow: `0 0 8px ${u.color}` }}>
                      <span className="text-[8px] font-black text-white">✓</span>
                    </div>
                  )}
                  <div className="text-2xl mb-2">{u.emoji}</div>
                  <div className="text-[11px] font-black mb-1" style={{ color: selected === u.id ? "#fff" : "#b0a0c0", fontFamily: "'Cinzel', serif" }}>
                    {u.name}
                  </div>
                  <p className="text-[9px] leading-relaxed mb-2" style={{ color: selected === u.id ? "#9a8ab0" : "#4a3a60" }}>
                    {u.desc}
                  </p>
                  <div className="flex items-center justify-between px-2 py-1 rounded-lg"
                    style={{ background: `${u.color}15`, border: `1px solid ${u.color}33` }}>
                    <span className="text-[9px] font-bold" style={{ color: u.color }}>{u.statLabel}</span>
                    <span className="text-xs font-black" style={{ color: u.color }}>{u.statVal}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Confirm */}
            <button
              disabled={!selected}
              onClick={() => onConfirm(selected)}
              className="w-full rounded-xl py-3 font-black text-sm uppercase tracking-widest transition-all hover:scale-[1.01]"
              style={{
                fontFamily: "'Cinzel Decorative', serif",
                background: selected
                  ? `linear-gradient(180deg, ${chosen?.color ?? data.glow}, rgba(0,0,0,0.5))`
                  : "linear-gradient(180deg, #1a1225, #0d0a18)",
                border: `2px solid ${selected ? (chosen?.color ?? data.glow) : "rgba(80,60,100,0.3)"}`,
                boxShadow: selected ? `0 5px 0 #000, 0 0 25px ${chosen?.color ?? data.glow}44` : "0 3px 0 #000",
                color: selected ? "#fff" : "#3a2a50",
                textShadow: selected ? "0 2px 4px rgba(0,0,0,0.7)" : "none",
                cursor: selected ? "pointer" : "not-allowed",
              }}>
              {selected ? `${chosen?.emoji} Forge the ${chosen?.name}` : "Choose an Upgrade to Continue"}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(0) scale(1);      opacity: 1; }
          100% { transform: translateY(-140px) scale(0.5); opacity: 0; }
        }
        @keyframes blink  { from { opacity: 0.4; } to { opacity: 1; } }
        @keyframes spin   { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes starPulse { from { opacity: 0.3; } to { opacity: 0.9; } }
      `}</style>
    </div>
  );
}