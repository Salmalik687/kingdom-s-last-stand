import { useEffect, useState } from "react";

// Per-ability visual effect config
const ABILITY_EFFECTS = {
  rain_of_arrows: {
    label: "RAIN OF ARROWS",
    color: "#b8824a",
    rgb: "184,130,74",
    particles: Array.from({ length: 20 }, (_, i) => ({
      left: `${4 + i * 4.8}%`,
      delay: `${(i % 5) * 0.06}s`,
      duration: `${0.45 + (i % 3) * 0.1}s`,
      size: 18 + (i % 3) * 6,
      rotate: "rotate(170deg)",
    })),
    renderParticle: (p, i) => (
      <div key={i} style={{
        position: "absolute",
        left: p.left,
        top: "-40px",
        fontSize: p.size,
        transform: p.rotate,
        animation: `arrowRain ${p.duration} ease-in ${p.delay} forwards`,
        filter: "drop-shadow(0 0 8px #b8824a)",
      }}>🏹</div>
    ),
    centerFx: null,
    bg: "rgba(100,60,10,0.18)",
    borderColor: "#b8824a",
  },
  healing_aura: {
    label: "HEALING AURA",
    color: "#22c55e",
    rgb: "34,197,94",
    particles: Array.from({ length: 12 }, (_, i) => ({
      angle: (i / 12) * 360,
      delay: `${i * 0.05}s`,
    })),
    renderParticle: (p, i) => (
      <div key={i} style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        fontSize: 20,
        transform: `rotate(${p.angle}deg) translateY(-90px)`,
        transformOrigin: "0 0",
        animation: `pulseOut 0.7s ease-out ${p.delay} forwards`,
        opacity: 0,
        filter: "drop-shadow(0 0 10px #22c55e)",
      }}>💚</div>
    ),
    centerFx: { emoji: "✚", size: 80, color: "#22c55e" },
    bg: "rgba(10,80,30,0.18)",
    borderColor: "#22c55e",
  },
  gold_surge: {
    label: "GOLD SURGE",
    color: "#ffd60a",
    rgb: "255,214,10",
    particles: Array.from({ length: 16 }, (_, i) => ({
      left: `${3 + i * 6}%`,
      delay: `${(i % 4) * 0.07}s`,
      size: 16 + (i % 4) * 5,
    })),
    renderParticle: (p, i) => (
      <div key={i} style={{
        position: "absolute",
        left: p.left,
        bottom: "-40px",
        fontSize: p.size,
        animation: `goldRise 0.7s ease-out ${p.delay} forwards`,
        filter: "drop-shadow(0 0 10px #ffd60a)",
      }}>💰</div>
    ),
    centerFx: { emoji: "💰", size: 72, color: "#ffd60a" },
    bg: "rgba(80,60,0,0.18)",
    borderColor: "#ffd60a",
  },
  earthquake: {
    label: "EARTHQUAKE",
    color: "#a16207",
    rgb: "161,98,7",
    particles: Array.from({ length: 8 }, (_, i) => ({
      left: `${10 + i * 10}%`,
      delay: `${i * 0.06}s`,
    })),
    renderParticle: (p, i) => (
      <div key={i} style={{
        position: "absolute",
        left: p.left,
        top: "60%",
        fontSize: 30,
        animation: `quakeShake 0.5s ease-out ${p.delay} forwards`,
        filter: "drop-shadow(0 0 12px #a16207)",
      }}>🪨</div>
    ),
    centerFx: { emoji: "🌍", size: 80, color: "#a16207" },
    bg: "rgba(80,40,0,0.22)",
    borderColor: "#a16207",
  },
  frost_nova: {
    label: "FROST NOVA",
    color: "#60a5fa",
    rgb: "96,165,250",
    particles: Array.from({ length: 12 }, (_, i) => ({
      angle: (i / 12) * 360,
      delay: `${i * 0.04}s`,
    })),
    renderParticle: (p, i) => (
      <div key={i} style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        fontSize: 22,
        transform: `rotate(${p.angle}deg) translateY(-110px)`,
        transformOrigin: "0 0",
        animation: `frostBlast 0.6s ease-out ${p.delay} forwards`,
        opacity: 0,
        filter: "drop-shadow(0 0 12px #60a5fa)",
      }}>❄️</div>
    ),
    centerFx: { emoji: "🌀", size: 76, color: "#60a5fa" },
    bg: "rgba(10,40,100,0.2)",
    borderColor: "#60a5fa",
  },
  tower_overcharge: {
    label: "TOWER OVERCHARGE",
    color: "#f59e0b",
    rgb: "245,158,11",
    particles: Array.from({ length: 10 }, (_, i) => ({
      left: `${5 + i * 9}%`,
      delay: `${i * 0.05}s`,
    })),
    renderParticle: (p, i) => (
      <div key={i} style={{
        position: "absolute",
        left: p.left,
        top: "40%",
        fontSize: 26,
        animation: `zapIn 0.5s ease-out ${p.delay} forwards`,
        filter: "drop-shadow(0 0 14px #f59e0b)",
      }}>⚡</div>
    ),
    centerFx: { emoji: "⚡", size: 80, color: "#f59e0b" },
    bg: "rgba(90,50,0,0.2)",
    borderColor: "#f59e0b",
  },
  meteor_strike: {
    label: "METEOR STRIKE",
    color: "#ef4444",
    rgb: "239,68,68",
    particles: Array.from({ length: 8 }, (_, i) => ({
      left: `${8 + i * 11}%`,
      delay: `${i * 0.07}s`,
      size: 24 + (i % 3) * 10,
    })),
    renderParticle: (p, i) => (
      <div key={i} style={{
        position: "absolute",
        left: p.left,
        top: "-60px",
        fontSize: p.size,
        animation: `meteorFall 0.55s ease-in ${p.delay} forwards`,
        filter: "drop-shadow(0 0 18px #ef4444)",
      }}>☄️</div>
    ),
    centerFx: { emoji: "💥", size: 90, color: "#ef4444" },
    bg: "rgba(100,10,10,0.22)",
    borderColor: "#ef4444",
  },
  divine_shield: {
    label: "DIVINE SHIELD",
    color: "#a78bfa",
    rgb: "167,139,250",
    particles: Array.from({ length: 10 }, (_, i) => ({
      angle: (i / 10) * 360,
      delay: `${i * 0.05}s`,
    })),
    renderParticle: (p, i) => (
      <div key={i} style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        fontSize: 20,
        transform: `rotate(${p.angle}deg) translateY(-100px)`,
        transformOrigin: "0 0",
        animation: `shieldBurst 0.65s ease-out ${p.delay} forwards`,
        opacity: 0,
        filter: "drop-shadow(0 0 12px #a78bfa)",
      }}>✨</div>
    ),
    centerFx: { emoji: "🛡️", size: 80, color: "#a78bfa" },
    bg: "rgba(60,30,120,0.2)",
    borderColor: "#a78bfa",
  },
  void_wrath: {
    label: "VOID WRATH",
    color: "#c084fc",
    rgb: "192,132,252",
    particles: Array.from({ length: 12 }, (_, i) => ({
      angle: (i / 12) * 360,
      delay: `${i * 0.04}s`,
    })),
    renderParticle: (p, i) => (
      <div key={i} style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        fontSize: 22,
        transform: `rotate(${p.angle}deg) translateY(-115px)`,
        transformOrigin: "0 0",
        animation: `voidPulse 0.65s ease-out ${p.delay} forwards`,
        opacity: 0,
        filter: "drop-shadow(0 0 14px #c084fc)",
      }}>🌀</div>
    ),
    centerFx: { emoji: "🌀", size: 80, color: "#c084fc" },
    bg: "rgba(70,20,120,0.22)",
    borderColor: "#c084fc",
  },
};

export default function AbilityVisualEffect({ abilityId, onDone }) {
  const [phase, setPhase] = useState("in"); // in → out → done

  const fx = ABILITY_EFFECTS[abilityId];

  useEffect(() => {
    if (!fx) { onDone?.(); return; }
    const t1 = setTimeout(() => setPhase("out"), 600);
    const t2 = setTimeout(() => { setPhase("done"); onDone?.(); }, 900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [abilityId]);

  if (!fx || phase === "done") return null;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 180,
      pointerEvents: "none",
      overflow: "hidden",
      background: phase === "in" ? fx.bg : "transparent",
      transition: "background 0.3s",
    }}>
      {/* Border flash */}
      <div style={{
        position: "absolute",
        inset: 0,
        border: `4px solid ${fx.color}`,
        opacity: phase === "in" ? 0.8 : 0,
        transition: "opacity 0.3s",
        borderRadius: 0,
        boxShadow: `inset 0 0 60px rgba(${fx.rgb},0.3)`,
      }} />

      {/* Particles */}
      {fx.particles.map((p, i) => fx.renderParticle(p, i))}

      {/* Center radial burst */}
      <div style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: 200,
        height: 200,
        borderRadius: "50%",
        background: `radial-gradient(circle, rgba(${fx.rgb},0.35) 0%, transparent 70%)`,
        animation: "radialBurst 0.6s ease-out forwards",
        opacity: phase === "in" ? 1 : 0,
        transition: "opacity 0.3s",
      }} />

      {/* Center emoji */}
      {fx.centerFx && (
        <div style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: fx.centerFx.size,
          filter: `drop-shadow(0 0 30px ${fx.centerFx.color})`,
          animation: "centerPop 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards",
          opacity: phase === "in" ? 1 : 0,
          transition: "opacity 0.25s",
        }}>{fx.centerFx.emoji}</div>
      )}

      {/* Label */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, 60px)",
        fontFamily: "'Cinzel Decorative', serif",
        fontSize: "clamp(14px,3vw,28px)",
        fontWeight: 900,
        color: fx.color,
        letterSpacing: "0.2em",
        textShadow: `0 0 30px ${fx.color}, 0 0 60px rgba(${fx.rgb},0.5)`,
        whiteSpace: "nowrap",
        animation: "labelSlam 0.4s cubic-bezier(0.34,1.3,0.64,1) forwards",
        opacity: phase === "in" ? 1 : 0,
        transition: "opacity 0.3s",
      }}>
        {fx.label}
      </div>

      <style>{`
        @keyframes arrowRain  { 0%{transform:rotate(170deg) translateY(0);opacity:1} 100%{transform:rotate(170deg) translateY(110vh);opacity:0.6} }
        @keyframes pulseOut   { 0%{opacity:0;transform:rotate(var(--a,0deg)) translateY(-50px)} 60%{opacity:1} 100%{opacity:0;transform:rotate(var(--a,0deg)) translateY(-110px)} }
        @keyframes goldRise   { 0%{transform:translateY(0);opacity:1} 100%{transform:translateY(-80vh);opacity:0} }
        @keyframes quakeShake { 0%{transform:translateX(0) scale(1);opacity:1} 40%{transform:translateX(-8px) scale(1.15)} 70%{transform:translateX(8px) scale(1.1)} 100%{transform:translateX(0) scale(1);opacity:0} }
        @keyframes frostBlast { 0%{opacity:0;transform:rotate(var(--a,0deg)) translateY(-30px) scale(0.5)} 60%{opacity:1;transform:rotate(var(--a,0deg)) translateY(-110px) scale(1.1)} 100%{opacity:0;transform:rotate(var(--a,0deg)) translateY(-130px) scale(0.8)} }
        @keyframes zapIn      { 0%{opacity:0;transform:scale(0.3) rotate(-20deg)} 50%{opacity:1;transform:scale(1.3) rotate(10deg)} 100%{opacity:0;transform:scale(0.8) rotate(0deg)} }
        @keyframes meteorFall { 0%{transform:translateY(0) rotate(-45deg);opacity:1} 100%{transform:translateY(110vh) rotate(-45deg);opacity:0.5} }
        @keyframes shieldBurst{ 0%{opacity:0;transform:rotate(var(--a,0deg)) translateY(-40px) scale(0.6)} 55%{opacity:1;transform:rotate(var(--a,0deg)) translateY(-100px) scale(1)} 100%{opacity:0;transform:rotate(var(--a,0deg)) translateY(-120px) scale(0.7)} }
        @keyframes voidPulse  { 0%{opacity:0;transform:rotate(var(--a,0deg)) translateY(-40px) scale(0.4)} 55%{opacity:1;transform:rotate(var(--a,0deg)) translateY(-115px) scale(1.1)} 100%{opacity:0;transform:rotate(var(--a,0deg)) translateY(-130px) scale(0.7)} }
        @keyframes radialBurst{ 0%{transform:translate(-50%,-50%) scale(0.2);opacity:1} 100%{transform:translate(-50%,-50%) scale(3);opacity:0} }
        @keyframes centerPop  { 0%{transform:translate(-50%,-50%) scale(0.3);opacity:0} 50%{transform:translate(-50%,-50%) scale(1.15);opacity:1} 100%{transform:translate(-50%,-50%) scale(1);opacity:1} }
        @keyframes labelSlam  { 0%{transform:translate(-50%,80px) scale(1.5);opacity:0} 60%{transform:translate(-50%,58px) scale(1);opacity:1} 100%{transform:translate(-50%,60px);opacity:1} }
      `}</style>
    </div>
  );
}