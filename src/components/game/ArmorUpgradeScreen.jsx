import { useState, useEffect, useRef } from "react";
import { QueenSeraphine, LordAldric } from "./CharacterSprites";

const CHAPTER_DATA = {
  2: {
    chapterLabel: "Chapter II — The Dungeon Yields",
    victoryShout: "THE DUNGEON FALLS!",
    queenLines: [
      "My Lord Aldric... the Dungeon Overlord is SLAIN. I watched from the tower — and I wept tears of pure pride.",
      "Our blacksmiths hammered through the night, fuelled by glory and by your name. What they have forged... is worthy of a legend.",
      "Come forward. Choose the gauntlets that shall crush our enemies in the battles ahead. The kingdom watches. Choose BOLDLY.",
    ],
    slotLabel: "Forge Thy Gauntlets",
    slotEmoji: "🧤",
    glow: "#818cf8",
    glowRgb: "129,140,248",
    bg: "linear-gradient(180deg, #050318 0%, #0a0630 60%, #120a45 100%)",
    queenBg: "linear-gradient(180deg, #a855f7, #6d28d9)",
    bgParticles: ["⚔️","🗡️","💫","⭐","✦"],
    upgrades: [
      { id: "iron_fist",     emoji: "🔩", name: "Iron Fist",     desc: "Reinforced iron plates. All towers deal +15% damage.", statLabel: "Tower Damage", statVal: "+15%", color: "#60a5fa", colorRgb: "96,165,250" },
      { id: "swift_grip",    emoji: "⚡", name: "Swift Grip",    desc: "Lightweight alloy wraps. Tower fire rate +12%.",       statLabel: "Fire Rate",    statVal: "+12%", color: "#facc15", colorRgb: "250,204,21" },
      { id: "golden_palm",   emoji: "💰", name: "Golden Palm",   desc: "Blessed by the treasury. +20 gold per wave.",         statLabel: "Wave Gold",    statVal: "+20g",  color: "#fbbf24", colorRgb: "251,191,36" },
      { id: "dungeon_ward",  emoji: "🛡️", name: "Dungeon Ward",  desc: "Bone-steel shield. Restore +4 lives immediately.",    statLabel: "Lives",        statVal: "+4",    color: "#a78bfa", colorRgb: "167,139,250" },
    ],
  },
  3: {
    chapterLabel: "Chapter III — The Volcano's Blessing",
    victoryShout: "THE FLAME TITAN BURNS!",
    queenLines: [
      "The Flame Titan is DEAD. The mountains stopped shaking. Eldenmoor breathes free for the first time in an age!",
      "From the titan's own pyre — our weavers pulled threads of pure dragonfire. They have crafted something... extraordinary.",
      "A cloak no flame can touch, no blade can pierce. Choose wisely, my lord. This mantle will guard thy back forever.",
    ],
    slotLabel: "Don The Cloak",
    slotEmoji: "🧣",
    glow: "#fb923c",
    glowRgb: "251,146,60",
    bg: "linear-gradient(180deg, #1a0200 0%, #330500 60%, #4a0800 100%)",
    queenBg: "linear-gradient(180deg, #f97316, #b45309)",
    bgParticles: ["🔥","🌋","💥","⚡","🌟"],
    upgrades: [
      { id: "ember_cloak",   emoji: "🔥", name: "Ember Cloak",   desc: "Wreathed in volcanic ash. Projectile speed +20%.", statLabel: "Proj. Speed",  statVal: "+20%", color: "#f97316", colorRgb: "249,115,22" },
      { id: "forge_mantle",  emoji: "⚒️", name: "Forge Mantle",  desc: "Heat-tempered weave. All tower range +10%.",       statLabel: "Tower Range",  statVal: "+10%", color: "#fb923c", colorRgb: "251,146,60" },
      { id: "cinder_shroud", emoji: "🌋", name: "Cinder Shroud", desc: "Lava-dust infused. +1 life restored immediately.", statLabel: "Lives",        statVal: "+1",   color: "#ef4444", colorRgb: "239,68,68"  },
      { id: "titan_core",    emoji: "💎", name: "Titan Core",    desc: "Forged in the titan's heart. Tower damage +20%.",  statLabel: "Tower Damage", statVal: "+20%", color: "#fb923c", colorRgb: "251,146,60"  },
    ],
  },
  4: {
    chapterLabel: "Chapter IV — The Abyss Surrenders",
    victoryShout: "THE FROST COLOSSUS SHATTERS!",
    queenLines: [
      "My lord... I feared the frozen dark had swallowed thee whole. But here thou standst — bloodied, unbroken, VICTORIOUS.",
      "The Frost Colossus shattered into a thousand crystals. Its glacial soul — power beyond reckoning — is now OURS to command.",
      "These pauldrons bear its might. Place them upon thy shoulders and march into the Shadow Realm with the fury of a glacier.",
    ],
    slotLabel: "Claim The Pauldrons",
    slotEmoji: "🦾",
    glow: "#7dd3fc",
    glowRgb: "125,211,252",
    bg: "linear-gradient(180deg, #010210 0%, #030420 60%, #050835 100%)",
    queenBg: "linear-gradient(180deg, #60a5fa, #1d4ed8)",
    bgParticles: ["❄️","🧊","💠","⭐","🌊"],
    upgrades: [
      { id: "frost_guard",     emoji: "🧊", name: "Frost Guard",     desc: "Glacial gauntlets. Frost slow lasts 10% longer.",    statLabel: "Slow Duration", statVal: "+10%", color: "#7dd3fc", colorRgb: "125,211,252" },
      { id: "storm_mantle",    emoji: "⛈️", name: "Storm Mantle",    desc: "Crackling with abyss energy. Tower damage +20%.",   statLabel: "Tower Damage",  statVal: "+20%", color: "#818cf8", colorRgb: "129,140,248" },
      { id: "titan_shoulders", emoji: "💪", name: "Titan Shoulders", desc: "Colossal plating. +3 lives granted immediately.",   statLabel: "Lives Granted", statVal: "+3",   color: "#a78bfa", colorRgb: "167,139,250" },
      { id: "blizzard_heart",  emoji: "❄️", name: "Blizzard Heart",  desc: "Shard of the colossus. All range +15%, speed +10%.",statLabel: "Range+Speed",   statVal: "+15/+10%", color: "#bae6fd", colorRgb: "186,230,253" },
    ],
  },
  5: {
    chapterLabel: "Chapter V — The Final Ascension",
    victoryShout: "ELDENMOOR IS FREE — FOREVER!",
    queenLines: [
      "It is... over. The Shadow Sovereign is NO MORE. All five lands. All five horrors. Vanquished. By YOUR hand.",
      "Thou hast carried an entire kingdom on thy shoulders — and thou never once faltered. I have no words worthy of thee, my champion.",
      "Then let this be my final gift. Choose the mantle of thy legend. And let the stars themselves remember thy name — FOREVER.",
    ],
    slotLabel: "The Final Blessing",
    slotEmoji: "✨",
    glow: "#e879f9",
    glowRgb: "232,121,249",
    bg: "linear-gradient(180deg, #0a0010 0%, #160030 60%, #25005a 100%)",
    queenBg: "linear-gradient(180deg, #e879f9, #7c3aed)",
    bgParticles: ["👑","✨","🌟","💜","🕊️"],
    upgrades: [
      { id: "soul_aegis",    emoji: "🌟", name: "Soul Aegis",    desc: "Armour fused with thy very soul. All bonuses DOUBLED.",           statLabel: "All Bonuses",  statVal: "×2",        color: "#e879f9", colorRgb: "232,121,249" },
      { id: "eternal_flame", emoji: "🔱", name: "Eternal Flame", desc: "Undying dragonfire. Tower damage +40%, fire rate +25%.",          statLabel: "DMG + Speed",  statVal: "+40%/+25%", color: "#ff4d6d", colorRgb: "255,77,109"  },
      { id: "kings_resolve", emoji: "👑", name: "King's Resolve", desc: "The crown of Eldenmoor descends. +10 lives, +200 gold.",         statLabel: "Lives + Gold", statVal: "+10/+200g", color: "#ffd60a", colorRgb: "255,214,10"  },
      { id: "void_mantle",   emoji: "🌀", name: "Void Mantle",   desc: "Sovereign's own cloak. All towers +50% range & damage +30%.",    statLabel: "Range+Damage", statVal: "+50/+30%",  color: "#c084fc", colorRgb: "192,132,252" },
    ],
  },
  6: {
    chapterLabel: "Chapter VI — The Demon Lord's Fall & Eternal Peace",
    victoryShout: "THE DEMON LORD IS SLAIN — THE REALM IS SAVED!",
    queenLines: [
      "My lord... what I have witnessed shall echo through the ages. The Demon Lord Malgrath — HE WHO PLAGUED US FOR TEN THOUSAND YEARS — is NO MORE.",
      "By thy blade, by thy will, by thy UNBREAKABLE SPIRIT, thou hast brought light back to a world consumed by darkness.",
      "Now, the greatest honor: accept the Crown of Eldenmoor. Rule not as a mere lord, but as the LEGENDARY SAVIOUR who delivered us from eternal damnation.",
    ],
    slotLabel: "The Crown of Eldenmoor",
    slotEmoji: "👑",
    glow: "#ffd60a",
    glowRgb: "255,214,10",
    bg: "linear-gradient(180deg, #0a0805 0%, #1a1008 60%, #2a1f10 100%)",
    queenBg: "linear-gradient(180deg, #ffd60a, #b8860b)",
    bgParticles: ["👑","✨","🌟","🕊️","⚔️"],
    upgrades: [
      { id: "legend_crown",     emoji: "👑", name: "Legend's Crown",     desc: "The crown of ages past. All towers +60% damage, +40% range.",      statLabel: "DMG + Range", statVal: "+60/+40%", color: "#ffd60a", colorRgb: "255,214,10" },
      { id: "peace_aegis",      emoji: "🕊️", name: "Peace Aegis",       desc: "The realm's blessing. +15 lives, +500 gold, all bonuses ×1.5.",   statLabel: "Lives + Mult", statVal: "+15/×1.5", color: "#86efac", colorRgb: "134,239,172" },
      { id: "saviour_mantle",   emoji: "⚔️", name: "Saviour's Mantle",   desc: "The hero's final cloak. All towers +75% damage, +35% fire rate.", statLabel: "DMG + Speed",  statVal: "+75/+35%", color: "#ff4d6d", colorRgb: "255,77,109"  },
      { id: "eternal_victory",  emoji: "✨", name: "Eternal Victory",    desc: "The symbol of triumph. ALL BONUSES TRIPLED — A TRUE LEGEND.", statLabel: "All Bonuses",  statVal: "×3",        color: "#ffd60a", colorRgb: "255,214,10" },
    ],
  },
};



export default function ArmorUpgradeScreen({ chapter, onConfirm }) {
  const data = CHAPTER_DATA[chapter];
  const [phase, setPhase] = useState("shout");   // shout → dialogue → choose
  const [lineIdx, setLineIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selected, setSelected] = useState(null);

  const [bgParticles, setBgParticles] = useState([]);
  const [cardVisible, setCardVisible] = useState([false, false, false, false]);
  const [shoutScale, setShoutScale] = useState(0);
  const typeRef = useRef(null);

  // Reset + start shout animation on chapter change
  useEffect(() => {
    if (!data) return;
    setPhase("shout");
    setLineIdx(0);
    setTyped("");
    setIsTyping(false);
    setSelected(null);
    setBgParticles([]);
    setCardVisible([false, false, false]);
    setShoutScale(0);

    // Animate shout in
    requestAnimationFrame(() => {
      setTimeout(() => setShoutScale(1), 50);
      setTimeout(() => setPhase("dialogue"), 2200);
    });
  }, [chapter]);

  // Start typing when dialogue begins
  useEffect(() => {
    if (phase === "dialogue") {
      setTyped("");
      setIsTyping(true);
    }
  }, [phase]);

  // Typewriter
  useEffect(() => {
    if (phase !== "dialogue" || !data) return;
    const line = data.queenLines[lineIdx] || "";
    if (typed.length < line.length) {
      typeRef.current = setTimeout(() => {
        setTyped(line.slice(0, typed.length + 1));
      }, 22);
      return () => clearTimeout(typeRef.current);
    } else {
      setIsTyping(false);
    }
  }, [typed, lineIdx, phase, data]);



  // Continuous bg particles
  useEffect(() => {
    if (!data) return;
    const t = setInterval(() => {
      setBgParticles(p => [
        ...p.slice(-14),
        {
          id: Math.random(),
          x: 5 + Math.random() * 90,
          size: 12 + Math.random() * 16,
          dur: 3 + Math.random() * 3,
          delay: Math.random() * 0.5,
          emoji: data.bgParticles[Math.floor(Math.random() * data.bgParticles.length)],
        },
      ]);
    }, 400);
    return () => clearInterval(t);
  }, [data]);

  // Stagger card reveal when entering choose phase
  useEffect(() => {
    if (phase !== "choose") return;
    setCardVisible([false, false, false, false]);
    [0, 1, 2, 3].forEach(i => setTimeout(() => setCardVisible(v => { const n = [...v]; n[i] = true; return n; }), 120 * i + 80));
  }, [phase]);

  const advanceLine = () => {
    if (isTyping) {
      clearTimeout(typeRef.current);
      setTyped(data.queenLines[lineIdx]);
      setIsTyping(false);
      return;
    }
    if (lineIdx < data.queenLines.length - 1) {
      setLineIdx(i => i + 1);
      setTyped("");
      setIsTyping(true);
    } else {
      setPhase("choose");
    }
  };

  if (!data) return null;

  const chosen = data.upgrades.find(u => u.id === selected);
  const isLastLine = lineIdx === data.queenLines.length - 1 && !isTyping;

  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-center overflow-hidden"
      style={{ background: "#000" }}>

      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: data.bg }} />
        {/* Radial glow center */}
        <div style={{
          position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)",
          width: 340, height: 400,
          background: `radial-gradient(ellipse, rgba(${data.glowRgb},0.18) 0%, rgba(${data.glowRgb},0.05) 50%, transparent 80%)`,
          borderRadius: "50% 50% 0 0",
        }} />
        {/* Side candles */}
        {[8, 92].map((pct, i) => (
          <div key={i} style={{
            position: "absolute", bottom: "20%", left: `${pct}%`,
            width: 90, height: 220,
            background: `radial-gradient(ellipse, rgba(255,180,60,0.18) 0%, transparent 70%)`,
            animation: `candleFlicker ${1.8 + i * 0.4}s ease-in-out infinite alternate`,
          }} />
        ))}
        {/* Floating particles */}
        {bgParticles.map(p => (
          <div key={p.id} style={{
            position: "absolute", left: `${p.x}%`, bottom: "-5%",
            fontSize: p.size, opacity: 0.18,
            animation: `riseFade ${p.dur}s ease-out ${p.delay}s forwards`,
            pointerEvents: "none",
          }}>{p.emoji}</div>
        ))}
        {/* Twinkling stars */}
        {Array.from({ length: 28 }).map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${(i * 37 + 5) % 100}%`,
            top: `${(i * 23 + 2) % 45}%`,
            width: i % 3 === 0 ? 3 : 2,
            height: i % 3 === 0 ? 3 : 2,
            borderRadius: "50%",
            background: `rgba(${data.glowRgb},${0.4 + (i % 4) * 0.15})`,
            animation: `starPulse ${1.2 + (i % 5) * 0.4}s ease-in-out ${(i % 3) * 0.3}s infinite alternate`,
          }} />
        ))}
      </div>

      {/* ── Chapter badge + progress ── */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none" style={{ zIndex: 5 }}>
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em]"
          style={{ background: `rgba(${data.glowRgb},0.15)`, border: `1px solid rgba(${data.glowRgb},0.4)`, color: data.glow, backdropFilter: "blur(6px)" }}>
          {data.slotEmoji}&nbsp;&nbsp;{data.chapterLabel}
        </div>
        <div className="flex items-center gap-1.5">
          {[1,2,3,4,5].map(c => (
            <div key={c} className="flex items-center gap-1.5">
              <div style={{
                width: 22, height: 22, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 9, fontWeight: 900,
                background: c < chapter ? data.glow : c === chapter ? `linear-gradient(180deg,${data.glow},rgba(0,0,0,0.6))` : "rgba(30,20,50,0.7)",
                border: `2px solid ${c <= chapter ? data.glow : "rgba(80,60,100,0.25)"}`,
                boxShadow: c === chapter ? `0 0 14px ${data.glow}, 0 0 4px ${data.glow}` : "none",
                color: c <= chapter ? "#fff" : "#3a2a50",
                transition: "all 0.3s",
              }}>{c < chapter ? "✓" : c}</div>
              {c < 5 && <div style={{ width: 16, height: 2, borderRadius: 9, background: c < chapter ? data.glow : "rgba(80,60,100,0.2)" }} />}
            </div>
          ))}
        </div>
      </div>

      {/* ── VICTORY SHOUT phase ── */}
      {phase === "shout" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ zIndex: 20 }}>
          <div style={{
            fontSize: "clamp(28px, 6vw, 56px)",
            fontFamily: "'Cinzel Decorative', serif",
            fontWeight: 900,
            textAlign: "center",
            padding: "0 16px",
            background: `linear-gradient(135deg, #fff, ${data.glow}, #fff)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: `drop-shadow(0 0 30px ${data.glow})`,
            transform: `scale(${shoutScale})`,
            transition: "transform 0.45s cubic-bezier(0.34,1.56,0.64,1)",
            letterSpacing: "0.08em",
          }}>
            {data.victoryShout}
          </div>
          <div style={{
            marginTop: 18,
            fontSize: 48,
            opacity: shoutScale,
            transition: "opacity 0.5s 0.3s",
            filter: `drop-shadow(0 0 20px ${data.glow})`,
          }}>
            {data.bgParticles[0]}
          </div>
          {/* Shockwave rings */}
          {[0,1,2].map(i => (
            <div key={i} style={{
              position: "absolute",
              width: 80, height: 80,
              borderRadius: "50%",
              border: `3px solid ${data.glow}`,
              animation: `shockwave 1.8s ease-out ${i * 0.3}s infinite`,
              opacity: 0,
            }} />
          ))}
        </div>
      )}

      {/* ── Queen Seraphine ── */}
      {phase !== "shout" && (
        <div className="absolute flex flex-col items-center pointer-events-none"
          style={{
            bottom: phase === "choose" ? "44%" : "24%",
            left: "50%",
            transform: "translateX(-230px)",
            transition: "bottom 0.7s cubic-bezier(0.34,1.3,0.64,1)",
            zIndex: 5,
          }}>
          <div style={{ animation: "charFloat 2.6s ease-in-out infinite" }}>
            <QueenSeraphine size={110} glowColor={data.glow} glowRgb={data.glowRgb} />
          </div>
          <div style={{
            marginTop: 6, fontSize: 11, fontWeight: 700,
            letterSpacing: "0.25em", textTransform: "uppercase",
            color: data.glow, fontFamily: "'Cinzel', serif",
            textShadow: `0 0 12px ${data.glow}`,
            animation: "twinkle 2s ease-in-out infinite",
          }}>Queen Seraphine</div>
        </div>
      )}

      {/* ── Lord Aldric ── */}
      {phase !== "shout" && (
        <div className="absolute flex flex-col items-center pointer-events-none"
          style={{
            bottom: phase === "choose" ? "44%" : "24%",
            left: "50%",
            transform: "translateX(80px)",
            transition: "bottom 0.7s cubic-bezier(0.34,1.3,0.64,1)",
            zIndex: 5,
          }}>
          <div style={{ animation: "charFloat 2.4s ease-in-out infinite", animationDelay: "0.3s" }}>
            <LordAldric size={100} bobOffset={0.4} />
          </div>
          <div style={{
            marginTop: 6, fontSize: 11, fontWeight: 700,
            letterSpacing: "0.25em", textTransform: "uppercase",
            color: "#d4af70", fontFamily: "'Cinzel', serif",
            textShadow: "0 0 12px rgba(212,175,112,0.6)",
            animation: "twinkle 2.2s ease-in-out infinite",
            animationDelay: "0.2s",
          }}>Lord Aldric</div>
        </div>
      )}

      {/* ── DIALOGUE phase ── */}
      {phase === "dialogue" && (
        <div className="relative w-full max-w-2xl mx-3 mb-0" style={{ zIndex: 10 }}>
          {/* Glow border top accent */}
          <div style={{ height: 3, background: `linear-gradient(90deg, transparent, ${data.glow}, transparent)`, borderRadius: "4px 4px 0 0" }} />
          <div style={{
            background: "linear-gradient(160deg, rgba(8,4,20,0.98) 0%, rgba(14,6,12,0.98) 100%)",
            border: `1.5px solid rgba(${data.glowRgb},0.5)`,
            borderBottom: "none",
            borderTop: "none",
            borderRadius: "0 0 0 0",
            padding: "20px 24px 20px",
            boxShadow: `0 -12px 60px rgba(${data.glowRgb},0.25), inset 0 1px 0 rgba(${data.glowRgb},0.1)`,
          }}>
            {/* Speaker + progress */}
            <div className="flex items-center gap-3 mb-3">
              <div style={{
                background: data.queenBg,
                borderRadius: 999, padding: "3px 16px",
                fontSize: 11, fontWeight: 900, color: "#fff",
                letterSpacing: "0.18em", textTransform: "uppercase",
                fontFamily: "'Cinzel', serif",
                boxShadow: `0 0 12px rgba(${data.glowRgb},0.4)`,
              }}>
                ♛ Queen Seraphine
              </div>
              <div className="flex gap-1.5 ml-auto">
                {data.queenLines.map((_, i) => (
                  <div key={i} style={{
                    width: i === lineIdx ? 18 : 6,
                    height: 6,
                    borderRadius: 9,
                    background: i <= lineIdx ? data.glow : "rgba(80,60,100,0.3)",
                    transition: "all 0.3s",
                    boxShadow: i === lineIdx ? `0 0 8px ${data.glow}` : "none",
                  }} />
                ))}
              </div>
            </div>

            {/* Dialogue text */}
            <p style={{
              fontSize: 15, color: "#f0e6ff", lineHeight: 1.8,
              minHeight: 56, fontFamily: "'Cinzel', serif",
              letterSpacing: "0.03em",
            }}>
              {typed}
              {isTyping && <span style={{ opacity: 0.7, animation: "blink 0.6s ease-in-out infinite" }}>▌</span>}
            </p>

            {/* Continue button */}
            <div className="flex justify-between items-center mt-4">
              <span style={{ fontSize: 10, color: `rgba(${data.glowRgb},0.4)`, fontFamily: "'Cinzel', serif" }}>
                {isTyping ? "Tap to skip..." : "Tap to continue..."}
              </span>
              <button
                onClick={advanceLine}
                style={{
                  background: isLastLine
                    ? `linear-gradient(135deg, ${data.glow}, rgba(${data.glowRgb},0.5))`
                    : "linear-gradient(135deg, #2d1a4a, #4c1d95)",
                  border: `1.5px solid ${data.glow}`,
                  borderRadius: 999,
                  padding: "8px 24px",
                  fontSize: 11, fontWeight: 900, color: "#fff",
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  fontFamily: "'Cinzel', serif",
                  boxShadow: isLastLine ? `0 0 20px rgba(${data.glowRgb},0.6), 0 4px 0 #000` : "0 3px 0 #000",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  animation: isLastLine ? "pulseBtn 1.5s ease-in-out infinite" : "none",
                }}>
                {isTyping ? "Skip ▶▶" : isLastLine ? `${data.slotEmoji} Choose Thine Blessing` : "Continue ▶"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── CHOOSE phase ── */}
      {phase === "choose" && (
        <div className="relative w-full max-w-2xl mx-3 mb-0" style={{ zIndex: 10 }}>
          <div style={{ height: 3, background: `linear-gradient(90deg, transparent, ${data.glow}, transparent)` }} />
          <div style={{
            background: "linear-gradient(160deg, rgba(8,4,20,0.99) 0%, rgba(14,6,12,0.99) 100%)",
            border: `1.5px solid rgba(${data.glowRgb},0.5)`,
            borderBottom: "none",
            borderTop: "none",
            padding: "18px 20px 20px",
            boxShadow: `0 -16px 70px rgba(${data.glowRgb},0.3), inset 0 1px 0 rgba(${data.glowRgb},0.1)`,
          }}>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span style={{ fontSize: 22 }}>{data.slotEmoji}</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 900, color: data.glow, fontFamily: "'Cinzel', serif", letterSpacing: "0.15em", textTransform: "uppercase", textShadow: `0 0 10px ${data.glow}` }}>
                    {data.slotLabel}
                  </div>
                  <div style={{ fontSize: 9, color: `rgba(${data.glowRgb},0.5)` }}>Choose one — this power is bound to thee forever</div>
                </div>
              </div>
              <div style={{ fontSize: 10, color: `rgba(${data.glowRgb},0.4)`, fontFamily: "'Cinzel', serif" }}>
                Chapter {chapter} / 5
              </div>
            </div>

            {/* Upgrade cards */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {data.upgrades.map((u, i) => (
                <button
                  key={u.id}
                  onClick={() => setSelected(u.id)}
                  style={{
                    position: "relative",
                    textAlign: "left",
                    borderRadius: 14,
                    padding: "14px 12px 12px",
                    cursor: "pointer",
                    background: selected === u.id
                      ? `linear-gradient(160deg, rgba(${u.colorRgb},0.22), rgba(${u.colorRgb},0.06))`
                      : "linear-gradient(160deg, #0e0a18, #080610)",
                    border: `2px solid ${selected === u.id ? u.color : "rgba(80,60,100,0.2)"}`,
                    boxShadow: selected === u.id
                      ? `0 0 28px rgba(${u.colorRgb},0.5), 0 6px 0 #000, inset 0 0 20px rgba(${u.colorRgb},0.05)`
                      : "0 4px 0 #000",
                    transform: cardVisible[i]
                      ? (selected === u.id ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)")
                      : "translateY(24px) scale(0.95)",
                    opacity: cardVisible[i] ? 1 : 0,
                    transition: `transform 0.35s cubic-bezier(0.34,1.4,0.64,1) ${i * 0.08}s, opacity 0.3s ${i * 0.08}s, box-shadow 0.2s, border-color 0.2s`,
                  }}>

                  {/* Selected checkmark */}
                  {selected === u.id && (
                    <div style={{
                      position: "absolute", top: 8, right: 8,
                      width: 18, height: 18, borderRadius: "50%",
                      background: u.color, boxShadow: `0 0 12px ${u.color}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 9, fontWeight: 900, color: "#fff",
                    }}>✓</div>
                  )}

                  {/* Emoji with glow */}
                  <div style={{
                    fontSize: 28, marginBottom: 8,
                    filter: selected === u.id ? `drop-shadow(0 0 10px ${u.color})` : "none",
                    transition: "filter 0.2s",
                  }}>{u.emoji}</div>

                  {/* Name */}
                  <div style={{
                    fontSize: 12, fontWeight: 900, marginBottom: 4,
                    color: selected === u.id ? "#fff" : "#c0b0d8",
                    fontFamily: "'Cinzel', serif",
                    textShadow: selected === u.id ? `0 0 10px rgba(${u.colorRgb},0.6)` : "none",
                  }}>{u.name}</div>

                  {/* Desc */}
                  <p style={{
                    fontSize: 9, lineHeight: 1.5, marginBottom: 10,
                    color: selected === u.id ? "#a898c0" : "#4a3a60",
                  }}>{u.desc}</p>

                  {/* Stat pill */}
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "5px 8px", borderRadius: 8,
                    background: `rgba(${u.colorRgb},0.12)`,
                    border: `1px solid rgba(${u.colorRgb},0.3)`,
                  }}>
                    <span style={{ fontSize: 9, fontWeight: 700, color: u.color }}>{u.statLabel}</span>
                    <span style={{
                      fontSize: 13, fontWeight: 900, color: u.color,
                      textShadow: `0 0 8px rgba(${u.colorRgb},0.6)`,
                    }}>{u.statVal}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Confirm */}
            <button
              disabled={!selected}
              onClick={() => onConfirm(selected)}
              style={{
                width: "100%", borderRadius: 12,
                padding: "14px 0",
                fontFamily: "'Cinzel Decorative', serif",
                fontSize: 13, fontWeight: 900,
                letterSpacing: "0.18em", textTransform: "uppercase",
                cursor: selected ? "pointer" : "not-allowed",
                background: selected
                  ? `linear-gradient(180deg, ${chosen?.color ?? data.glow}, rgba(0,0,0,0.4))`
                  : "linear-gradient(180deg, #1a1225, #0d0a18)",
                border: `2.5px solid ${selected ? (chosen?.color ?? data.glow) : "rgba(80,60,100,0.25)"}`,
                boxShadow: selected
                  ? `0 6px 0 #000, 0 0 35px rgba(${chosen ? chosen.colorRgb : data.glowRgb},0.5)`
                  : "0 4px 0 #000",
                color: selected ? "#fff" : "#3a2a50",
                textShadow: selected ? "0 2px 6px rgba(0,0,0,0.8)" : "none",
                transition: "all 0.25s",
                animation: selected ? "pulseBtn 1.8s ease-in-out infinite" : "none",
              }}>
              {selected
                ? `${chosen?.emoji}  Bind the ${chosen?.name} to My Soul  ${chosen?.emoji}`
                : "— Select a Blessing First —"}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes riseFade {
          0%   { transform: translateY(0)   scale(1);    opacity: 0.18; }
          80%  { opacity: 0.12; }
          100% { transform: translateY(-80vh) scale(0.6); opacity: 0; }
        }
        @keyframes shockwave {
          0%   { transform: scale(0.5); opacity: 0.9; }
          100% { transform: scale(8);   opacity: 0; }
        }
        @keyframes blink       { 0%,100% { opacity: 0.2; } 50% { opacity: 1; } }
        @keyframes spin        { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes starPulse   { from { opacity: 0.2; transform: scale(0.8); } to { opacity: 1; transform: scale(1.3); } }
        @keyframes queenBob    { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes candleFlicker { from { opacity: 0.7; } to { opacity: 1; } }
        @keyframes pulseBtn    {
          0%,100% { box-shadow: 0 6px 0 #000, 0 0 20px rgba(255,255,255,0.1); }
          50%     { box-shadow: 0 6px 0 #000, 0 0 40px rgba(255,255,255,0.25); }
        }
        @keyframes titleSlam {
          0%   { transform: scale(4) translateY(-60px); opacity: 0; filter: blur(20px); }
          60%  { transform: scale(0.95); opacity: 1; filter: blur(0); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes cardGlow {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(255,255,255,0.1)); }
          50% { filter: drop-shadow(0 0 40px rgba(255,255,255,0.2)); }
        }
        @keyframes charFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes cardPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
      `}</style>
    </div>
  );
}