// Hand-crafted CSS/SVG animated character sprites — no emojis

// ─── LORD ALDRIC ────────────────────────────────────────────────────────────
export function LordAldric({ size = 120, bobOffset = 0 }) {
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 80 120" style={{ overflow: "visible", filter: "drop-shadow(0 4px 18px rgba(255,180,60,0.45))" }}>
      <style>{`
        @keyframes aldricBob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        @keyframes cloakSway { 0%,100% { transform: skewX(0deg); } 50% { transform: skewX(2deg); } }
        @keyframes eyeGlow { 0%,100% { opacity:0.8; } 50% { opacity:1; } }
        @keyframes swordGleam { 0%,100% { opacity:0; } 50% { opacity:0.9; } }
        .aldric-body { animation: aldricBob 2.4s ease-in-out ${bobOffset}s infinite; transform-origin: 40px 110px; }
        .aldric-cloak { animation: cloakSway 3s ease-in-out ${bobOffset}s infinite; transform-origin: 40px 80px; }
      `}</style>

      <g className="aldric-body">
        {/* ── Boots ── */}
        <rect x="24" y="104" width="13" height="12" rx="3" fill="#2a1a0a" />
        <rect x="43" y="104" width="13" height="12" rx="3" fill="#2a1a0a" />
        <rect x="22" y="108" width="16" height="7" rx="2" fill="#1a0e05" />
        <rect x="42" y="108" width="16" height="7" rx="2" fill="#1a0e05" />

        {/* ── Legs ── */}
        <rect x="26" y="87" width="12" height="20" rx="3" fill="#3a2510" />
        <rect x="42" y="87" width="12" height="20" rx="3" fill="#3a2510" />

        {/* ── Tabard / cloak ── */}
        <g className="aldric-cloak">
          <path d="M18 60 Q16 90 20 108 Q30 112 40 110 Q50 112 60 108 Q64 90 62 60 Z" fill="#8b1a1a" opacity="0.95" />
          <path d="M20 60 Q22 90 26 105 Q34 108 40 107 Z" fill="#a02020" opacity="0.5" />
          {/* Gold trim */}
          <path d="M18 60 Q16 90 20 108" stroke="#d4af37" strokeWidth="1.5" fill="none" opacity="0.8" />
          <path d="M62 60 Q64 90 60 108" stroke="#d4af37" strokeWidth="1.5" fill="none" opacity="0.8" />
          {/* Eldenmoor crest on tabard */}
          <path d="M36 72 L40 65 L44 72 L40 78 Z" fill="#d4af37" opacity="0.9" />
        </g>

        {/* ── Chainmail / torso ── */}
        <rect x="22" y="52" width="36" height="26" rx="6" fill="#5a5a6a" />
        {/* Chain pattern */}
        {[0,1,2,3].map(row => [0,1,2,3,4].map(col => (
          <circle key={`c${row}${col}`} cx={25 + col * 7} cy={55 + row * 6} r="2" fill="none" stroke="#7a7a8a" strokeWidth="0.7" />
        )))}

        {/* ── Pauldrons (shoulder armour) ── */}
        <ellipse cx="19" cy="56" rx="8" ry="5" fill="#7a7a8a" />
        <ellipse cx="61" cy="56" rx="8" ry="5" fill="#7a7a8a" />
        <ellipse cx="19" cy="55" rx="6" ry="3.5" fill="#5a5a6a" />
        <ellipse cx="61" cy="55" rx="6" ry="3.5" fill="#5a5a6a" />

        {/* ── Left arm (sword arm) ── */}
        <rect x="10" y="55" width="10" height="26" rx="4" fill="#5a5a6a" />
        {/* Sword */}
        <rect x="4" y="30" width="4" height="42" rx="1" fill="#c0c0d0" />
        <rect x="1" y="52" width="10" height="3" rx="1" fill="#d4af37" />
        <path d="M6 28 L6 31" stroke="#e8e8f0" strokeWidth="3" strokeLinecap="round" />
        {/* Sword gleam */}
        <path d="M5 32 L5 48" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0" style={{ animation: "swordGleam 3s ease-in-out 1s infinite" }} />

        {/* ── Right arm ── */}
        <rect x="60" y="55" width="10" height="26" rx="4" fill="#5a5a6a" />
        {/* Shield */}
        <path d="M68 52 Q76 52 76 60 Q76 70 68 76 Q60 70 60 60 Q60 52 68 52 Z" fill="#8b1a1a" stroke="#d4af37" strokeWidth="1.5" />
        <path d="M68 56 L68 72" stroke="#d4af37" strokeWidth="1" />
        <path d="M62 60 L74 60" stroke="#d4af37" strokeWidth="1" />

        {/* ── Neck ── */}
        <rect x="34" y="43" width="12" height="12" rx="4" fill="#c8956a" />

        {/* ── Head ── */}
        <ellipse cx="40" cy="34" rx="14" ry="16" fill="#d4956a" />
        {/* Jaw shadow */}
        <ellipse cx="40" cy="42" rx="10" ry="5" fill="#b87050" opacity="0.4" />
        {/* Battle scar */}
        <path d="M32 30 L36 34" stroke="#a06040" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
        {/* Eyes */}
        <ellipse cx="34" cy="31" rx="3.5" ry="3" fill="white" />
        <ellipse cx="46" cy="31" rx="3.5" ry="3" fill="white" />
        <circle cx="34.5" cy="31.5" r="2" fill="#2a4a80" />
        <circle cx="46.5" cy="31.5" r="2" fill="#2a4a80" />
        <circle cx="35" cy="31" r="0.8" fill="black" />
        <circle cx="47" cy="31" r="0.8" fill="black" />
        <circle cx="35.8" cy="30.4" r="0.5" fill="white" />
        <circle cx="47.8" cy="30.4" r="0.5" fill="white" />
        {/* Eye glow */}
        <circle cx="34.5" cy="31.5" r="2" fill="#4a7aff" opacity="0.2" style={{ animation: "eyeGlow 2s infinite" }} />
        {/* Brows */}
        <path d="M31 27.5 Q34 26 37 27.5" stroke="#4a2a10" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M43 27.5 Q46 26 49 27.5" stroke="#4a2a10" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Nose */}
        <path d="M39 34 L38 38 L42 38" stroke="#a06040" strokeWidth="1" fill="none" strokeLinecap="round" />
        {/* Mouth — determined grimace */}
        <path d="M34 42 Q40 44 46 42" stroke="#7a4030" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Stubble */}
        {[33,35,37,39,41,43,45,47].map((x,i) => (
          <line key={i} x1={x} y1="41" x2={x} y2="43" stroke="#7a4030" strokeWidth="0.7" opacity="0.5" />
        ))}

        {/* ── Helmet ── */}
        <path d="M26 28 Q26 14 40 12 Q54 14 54 28 Z" fill="#6a6a7a" />
        <path d="M26 28 Q26 14 40 12 Q54 14 54 28" stroke="#9a9aaa" strokeWidth="1.5" fill="none" />
        {/* Nose guard */}
        <rect x="38" y="20" width="4" height="18" rx="1" fill="#5a5a6a" />
        {/* Crown on helmet */}
        <path d="M28 22 L31 17 L34 20 L37 15 L40 18 L43 15 L46 20 L49 17 L52 22" stroke="#d4af37" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Helmet plume */}
        <path d="M40 12 Q38 4 36 2 Q40 1 44 2 Q42 4 40 12" fill="#8b1a1a" opacity="0.9" />
      </g>
    </svg>
  );
}

// ─── QUEEN SERAPHINE ────────────────────────────────────────────────────────
export function QueenSeraphine({ size = 120, glowColor = "#e879f9", glowRgb = "232,121,249" }) {
  return (
    <svg width={size} height={size * 1.7} viewBox="0 0 80 136" style={{ overflow: "visible", filter: `drop-shadow(0 4px 22px rgba(${glowRgb},0.55))` }}>
      <style>{`
        @keyframes queenBobSvg { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        @keyframes dressFlow { 0%,100% { d: path("M14 72 Q10 110 16 130 Q40 136 64 130 Q70 110 66 72 Z"); } 50% { d: path("M14 72 Q8 110 15 130 Q40 138 65 130 Q72 110 66 72 Z"); } }
        @keyframes hairFlow { 0%,100% { transform: translateX(0); } 50% { transform: translateX(2px); } }
        @keyframes jewelPulse { 0%,100% { opacity:0.7; r:3; } 50% { opacity:1; r:3.8; } }
        @keyframes crownGlow { 0%,100% { filter: drop-shadow(0 0 4px ${glowColor}); } 50% { filter: drop-shadow(0 0 12px ${glowColor}); } }
        .queen-body { animation: queenBobSvg 2s ease-in-out infinite; transform-origin: 40px 120px; }
        .queen-hair { animation: hairFlow 2.5s ease-in-out infinite; transform-origin: 40px 40px; }
        .queen-crown { animation: crownGlow 2s ease-in-out infinite; }
      `}</style>

      <g className="queen-body">
        {/* ── Dress / gown ── */}
        <path d="M14 72 Q8 110 14 130 Q40 138 66 130 Q72 110 66 72 Z" fill="#4a0e6e" />
        {/* Dress gradient layers */}
        <path d="M18 72 Q14 105 18 126 Q40 133 62 126 Q66 105 62 72 Z" fill="#6b21a8" opacity="0.6" />
        <path d="M24 72 Q22 100 24 122 Q40 128 56 122 Q58 100 56 72 Z" fill="#9333ea" opacity="0.3" />
        {/* Gold trim at hem */}
        <path d="M14 130 Q40 138 66 130" stroke={glowColor} strokeWidth="2" fill="none" opacity="0.8" />
        {/* Dress shimmer lines */}
        <path d="M30 80 Q28 110 30 126" stroke={glowColor} strokeWidth="0.7" fill="none" opacity="0.25" />
        <path d="M40 78 Q40 112 40 128" stroke={glowColor} strokeWidth="0.7" fill="none" opacity="0.2" />
        <path d="M50 80 Q52 110 50 126" stroke={glowColor} strokeWidth="0.7" fill="none" opacity="0.25" />
        {/* Stars on dress */}
        {[[22,92],[50,88],[34,105],[55,108],[26,118],[48,120]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="1.2" fill={glowColor} opacity={0.5 + (i%3)*0.15} />
        ))}

        {/* ── Corset / bodice ── */}
        <rect x="22" y="52" width="36" height="24" rx="8" fill="#7c3aed" />
        <rect x="24" y="54" width="32" height="20" rx="6" fill="#9333ea" opacity="0.5" />
        {/* Bodice lacing */}
        {[0,1,2].map(i => (
          <g key={i}>
            <line x1="34" y1={57 + i*6} x2="38" y2={59 + i*6} stroke={glowColor} strokeWidth="0.8" opacity="0.7" />
            <line x1="42" y1={59 + i*6} x2="46" y2={57 + i*6} stroke={glowColor} strokeWidth="0.8" opacity="0.7" />
          </g>
        ))}
        {/* Center jewel */}
        <circle cx="40" cy="58" r="3.5" fill={glowColor} style={{ animation: "jewelPulse 2s ease-in-out infinite" }} />
        <circle cx="40" cy="58" r="2" fill="white" opacity="0.6" />

        {/* ── Sleeves ── */}
        <path d="M22 53 Q10 58 8 72 Q12 78 18 74 Q20 62 26 58 Z" fill="#7c3aed" />
        <path d="M58 53 Q70 58 72 72 Q68 78 62 74 Q60 62 54 58 Z" fill="#7c3aed" />
        {/* Sleeve trim */}
        <path d="M8 72 Q12 78 18 74" stroke={glowColor} strokeWidth="1" fill="none" opacity="0.7" />
        <path d="M72 72 Q68 78 62 74" stroke={glowColor} strokeWidth="1" fill="none" opacity="0.7" />
        {/* Hands */}
        <ellipse cx="10" cy="75" rx="5" ry="4" fill="#e8c4a0" />
        <ellipse cx="70" cy="75" rx="5" ry="4" fill="#e8c4a0" />
        {/* Ring */}
        <circle cx="72" cy="74" r="1.5" fill={glowColor} opacity="0.9" />

        {/* ── Neck ── */}
        <rect x="33" y="44" width="14" height="12" rx="5" fill="#e8c4a0" />
        {/* Necklace */}
        <path d="M30 52 Q40 57 50 52" stroke={glowColor} strokeWidth="1" fill="none" opacity="0.9" />
        {[34,40,46].map((x,i) => (
          <circle key={i} cx={x} cy={i===1?56:54} r={i===1?2:1.5} fill={glowColor} opacity={i===1?1:0.8} />
        ))}

        {/* ── Head / face ── */}
        <ellipse cx="40" cy="34" rx="13" ry="15" fill="#f0d0a8" />
        {/* Cheeks */}
        <ellipse cx="30" cy="37" rx="5" ry="3" fill="#f9a8d4" opacity="0.35" />
        <ellipse cx="50" cy="37" rx="5" ry="3" fill="#f9a8d4" opacity="0.35" />
        {/* Jaw */}
        <ellipse cx="40" cy="44" rx="9" ry="4" fill="#e8c090" opacity="0.4" />
        {/* Eyes — large, expressive */}
        <ellipse cx="33" cy="31" rx="4.5" ry="4" fill="white" />
        <ellipse cx="47" cy="31" rx="4.5" ry="4" fill="white" />
        {/* Iris */}
        <circle cx="33" cy="32" r="3" fill="#1a6a4a" />
        <circle cx="47" cy="32" r="3" fill="#1a6a4a" />
        <circle cx="33" cy="32" r="1.8" fill="#0d3a28" />
        <circle cx="47" cy="32" r="1.8" fill="#0d3a28" />
        {/* Pupil shine */}
        <circle cx="34.2" cy="30.8" r="0.9" fill="white" />
        <circle cx="48.2" cy="30.8" r="0.9" fill="white" />
        {/* Eyelashes */}
        <path d="M28.5 28 Q30 26.5 31.5 27" stroke="#1a0a10" strokeWidth="1" fill="none" strokeLinecap="round" />
        <path d="M34.5 27 Q36 26 37.5 27.5" stroke="#1a0a10" strokeWidth="1" fill="none" strokeLinecap="round" />
        <path d="M42.5 27.5 Q44 26 45.5 27" stroke="#1a0a10" strokeWidth="1" fill="none" strokeLinecap="round" />
        <path d="M48.5 27 Q50 26.5 51.5 28" stroke="#1a0a10" strokeWidth="1" fill="none" strokeLinecap="round" />
        {/* Brows — elegant arched */}
        <path d="M29 26 Q33 23.5 37 25.5" stroke="#5a3020" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M43 25.5 Q47 23.5 51 26" stroke="#5a3020" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Nose */}
        <path d="M39 35 Q38 38 39.5 39 Q41 38 40 35" stroke="#c09070" strokeWidth="1" fill="none" strokeLinecap="round" />
        {/* Lips */}
        <path d="M34 43 Q37 41.5 40 42 Q43 41.5 46 43" fill="#d4607a" stroke="#b84060" strokeWidth="0.5" />
        <path d="M36 43 Q40 45 44 43" fill="#d4607a" stroke="#b84060" strokeWidth="0.5" />
        {/* Lip highlight */}
        <path d="M37 42.5 Q40 41.5 43 42.5" stroke="rgba(255,200,200,0.5)" strokeWidth="0.8" fill="none" />

        {/* ── Hair ── */}
        <g className="queen-hair">
          {/* Base hair */}
          <path d="M27 24 Q24 18 26 10 Q40 6 54 10 Q56 18 53 24" fill="#1a0a30" />
          <path d="M27 24 Q20 30 18 40 Q16 50 20 58" stroke="#1a0a30" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M53 24 Q60 30 62 40 Q64 50 60 58" stroke="#1a0a30" strokeWidth="8" fill="none" strokeLinecap="round" />
          {/* Hair waves */}
          <path d="M20 42 Q18 50 20 58" stroke="#2d1050" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M60 42 Q62 50 60 58" stroke="#2d1050" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Hair sheen */}
          <path d="M30 14 Q32 20 30 28" stroke="rgba(180,120,255,0.3)" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Long trailing locks */}
          <path d="M20 58 Q16 70 18 84" stroke="#1a0a30" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M60 58 Q64 70 62 84" stroke="#1a0a30" strokeWidth="6" fill="none" strokeLinecap="round" />
        </g>

        {/* ── Crown ── */}
        <g className="queen-crown">
          <path d="M26 18 L26 10 L32 15 L37 6 L40 12 L43 6 L48 15 L54 10 L54 18 Z" fill="#d4af37" />
          <path d="M26 18 L54 18" stroke="#b8860b" strokeWidth="1.5" fill="none" />
          {/* Crown gems */}
          <circle cx="40" cy="8" r="3" fill={glowColor} style={{ animation: "jewelPulse 1.8s ease-in-out 0.2s infinite" }} />
          <circle cx="31" cy="13" r="2" fill="#ef4444" />
          <circle cx="49" cy="13" r="2" fill="#22c55e" />
          {/* Crown gold highlights */}
          <path d="M28 18 L28 12" stroke="#ffe566" strokeWidth="0.8" opacity="0.6" />
          <path d="M52 18 L52 12" stroke="#ffe566" strokeWidth="0.8" opacity="0.6" />
        </g>
      </g>
    </svg>
  );
}

// ─── DEMON LORD MALGRATH ────────────────────────────────────────────────────
export function DemonLord({ size = 160 }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 100 140" style={{ overflow: "visible", filter: "drop-shadow(0 0 30px rgba(180,0,0,0.7)) drop-shadow(0 0 60px rgba(100,0,0,0.4))" }}>
      <style>{`
        @keyframes demonFloat  { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes demonBreath { 0%,100% { transform: scaleX(1); } 50% { transform: scaleX(1.04); } }
        @keyframes eyeFlare    { 0%,100% { opacity:0.6; r:5; } 40% { opacity:1; r:6.5; } 80% { opacity:0.7; r:4.5; } }
        @keyframes eyeFlareL   { 0%,100% { opacity:0.6; r:5; } 60% { opacity:1; r:6.5; } }
        @keyframes wingFlap    { 0%,100% { transform: rotate(-5deg) scaleY(1);   } 50% { transform: rotate(8deg) scaleY(0.88); } }
        @keyframes wingFlapR   { 0%,100% { transform: rotate(5deg) scaleY(1);    } 50% { transform: rotate(-8deg) scaleY(0.88); } }
        @keyframes fireFlicker { 0%,100% { transform: scaleY(1) skewX(0deg);  opacity:0.9; } 50%  { transform: scaleY(1.15) skewX(3deg); opacity:1; } 75% { transform: scaleY(0.9) skewX(-2deg); opacity:0.85; } }
        @keyframes auraBreath  { 0%,100% { opacity:0.15; } 50% { opacity:0.35; } }
        @keyframes smokeRise   { 0% { transform: translateY(0) scale(1); opacity:0.6; } 100% { transform: translateY(-40px) scale(2); opacity:0; } }
        @keyframes tailSway    { 0%,100% { d: path("M50 115 Q60 122 72 118 Q78 125 70 132"); } 50% { d: path("M50 115 Q62 120 75 115 Q82 122 74 130"); } }
        @keyframes chainRattle { 0%,100% { transform: rotate(0deg); } 25% { transform: rotate(3deg); } 75% { transform: rotate(-3deg); } }
        .demon-body  { animation: demonFloat 3s ease-in-out infinite; transform-origin: 50px 100px; }
        .demon-torso { animation: demonBreath 2s ease-in-out infinite; transform-origin: 50px 80px; }
        .wing-left   { animation: wingFlap  2.2s ease-in-out infinite; transform-origin: 22px 65px; }
        .wing-right  { animation: wingFlapR 2.2s ease-in-out 0.2s infinite; transform-origin: 78px 65px; }
        .fire-main   { animation: fireFlicker 0.8s ease-in-out infinite; transform-origin: 50px 30px; }
        .fire-l      { animation: fireFlicker 0.9s ease-in-out 0.2s infinite; transform-origin: 33px 35px; }
        .fire-r      { animation: fireFlicker 0.75s ease-in-out 0.1s infinite; transform-origin: 67px 35px; }
        .aura        { animation: auraBreath 2.5s ease-in-out infinite; }
        .chains      { animation: chainRattle 1.5s ease-in-out infinite; }
      `}</style>

      {/* ── Hell aura glow ── */}
      <ellipse cx="50" cy="90" rx="48" ry="55" fill="url(#hellGrad)" className="aura" />
      <defs>
        <radialGradient id="hellGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7f0000" stopOpacity="0" />
          <stop offset="100%" stopColor="#7f0000" stopOpacity="0.35" />
        </radialGradient>
        <radialGradient id="eyeGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ff4400" />
          <stop offset="100%" stopColor="#aa0000" />
        </radialGradient>
      </defs>

      <g className="demon-body">
        {/* ── Wings ── */}
        <g className="wing-left">
          <path d="M22 65 Q-8 40 -6 10 Q2 20 8 35 Q12 20 10 5 Q20 18 18 35 Q24 18 26 8 Q32 22 28 40 Q28 52 22 65 Z" fill="#1a0010" stroke="#4a0020" strokeWidth="1" />
          <path d="M22 65 Q8 52 6 35" stroke="#3a0018" strokeWidth="0.8" fill="none" opacity="0.6" />
          <path d="M22 65 Q14 48 12 30" stroke="#3a0018" strokeWidth="0.8" fill="none" opacity="0.5" />
          <path d="M22 65 Q20 50 18 35" stroke="#3a0018" strokeWidth="0.8" fill="none" opacity="0.5" />
        </g>
        <g className="wing-right">
          <path d="M78 65 Q108 40 106 10 Q98 20 92 35 Q88 20 90 5 Q80 18 82 35 Q76 18 74 8 Q68 22 72 40 Q72 52 78 65 Z" fill="#1a0010" stroke="#4a0020" strokeWidth="1" />
          <path d="M78 65 Q92 52 94 35" stroke="#3a0018" strokeWidth="0.8" fill="none" opacity="0.6" />
          <path d="M78 65 Q86 48 88 30" stroke="#3a0018" strokeWidth="0.8" fill="none" opacity="0.5" />
          <path d="M78 65 Q80 50 82 35" stroke="#3a0018" strokeWidth="0.8" fill="none" opacity="0.5" />
        </g>

        <g className="demon-torso">
          {/* ── Loin cloth / armour ── */}
          <path d="M30 100 Q26 118 30 130 Q50 136 70 130 Q74 118 70 100 Z" fill="#1a0808" />
          <path d="M34 100 Q32 115 35 128 Q50 132 65 128 Q68 115 66 100 Z" fill="#2a1010" opacity="0.7" />
          {/* Armour plate belt */}
          <rect x="28" y="95" width="44" height="10" rx="3" fill="#3a1818" stroke="#6a2020" strokeWidth="1" />
          {/* Belt spikes */}
          {[32,40,50,60,68].map((x,i) => (
            <path key={i} d={`M${x} 95 L${x+2} 89 L${x+4} 95`} fill="#8a0000" stroke="#c00000" strokeWidth="0.5" />
          ))}

          {/* ── Legs ── */}
          <rect x="30" y="105" width="16" height="24" rx="4" fill="#2a0808" />
          <rect x="54" y="105" width="16" height="24" rx="4" fill="#2a0808" />
          {/* Knee spikes */}
          <path d="M33 112 L35 106 L37 112" fill="#8a0000" />
          <path d="M57 112 L59 106 L61 112" fill="#8a0000" />
          {/* Hooves */}
          <ellipse cx="38" cy="130" rx="9" ry="5" fill="#0d0d0d" />
          <ellipse cx="62" cy="130" rx="9" ry="5" fill="#0d0d0d" />
          <path d="M30 128 Q38 135 46 128" fill="#1a0808" stroke="#0d0d0d" strokeWidth="1" />
          <path d="M54 128 Q62 135 70 128" fill="#1a0808" stroke="#0d0d0d" strokeWidth="1" />

          {/* ── Tail ── */}
          <path d="M50 115 Q60 122 72 118 Q78 125 70 132" stroke="#3a0808" strokeWidth="5" fill="none" strokeLinecap="round" style={{ animation: "tailSway 2s ease-in-out infinite" }} />
          <path d="M69 131 L76 128 L72 136 Z" fill="#8a0000" />

          {/* ── Torso / abs ── */}
          <ellipse cx="50" cy="82" rx="24" ry="26" fill="#1e0a0a" />
          {/* Muscle definition */}
          <path d="M40 68 Q36 75 38 82" stroke="#3a1010" strokeWidth="2" fill="none" opacity="0.7" />
          <path d="M60 68 Q64 75 62 82" stroke="#3a1010" strokeWidth="2" fill="none" opacity="0.7" />
          <path d="M44 76 Q50 78 56 76" stroke="#4a1818" strokeWidth="1.5" fill="none" />
          <path d="M44 82 Q50 84 56 82" stroke="#4a1818" strokeWidth="1.5" fill="none" />
          <path d="M44 88 Q50 90 56 88" stroke="#4a1818" strokeWidth="1.5" fill="none" />
          {/* Hell runes on chest */}
          <path d="M46 70 L48 66 L50 70 L52 66 L54 70" stroke="#c00000" strokeWidth="0.8" fill="none" opacity="0.7" />
          <circle cx="50" cy="75" r="4" fill="none" stroke="#c00000" strokeWidth="0.8" opacity="0.5" />

          {/* ── Chains ── */}
          <g className="chains">
            {[0,1,2,3,4].map(i => (
              <ellipse key={i} cx={32} cy={72 + i*6} rx="3" ry="2" fill="none" stroke="#5a3020" strokeWidth="1.2" opacity="0.8" />
            ))}
            {[0,1,2,3,4].map(i => (
              <ellipse key={i} cx={68} cy={72 + i*6} rx="3" ry="2" fill="none" stroke="#5a3020" strokeWidth="1.2" opacity="0.8" />
            ))}
          </g>

          {/* ── Arms ── */}
          <path d="M26 68 Q14 72 8 85 Q10 96 18 92 Q22 80 30 76 Z" fill="#1e0a0a" />
          <path d="M74 68 Q86 72 92 85 Q90 96 82 92 Q78 80 70 76 Z" fill="#1e0a0a" />
          {/* Claws */}
          <path d="M6 86 L4 80 M8 87 L6 80 M10 88 L9 81 M12 87 L12 80 M14 86 L15 79" stroke="#c8a080" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M94 86 L96 80 M92 87 L94 80 M90 88 L91 81 M88 87 L88 80 M86 86 L85 79" stroke="#c8a080" strokeWidth="1.5" strokeLinecap="round" />

          {/* ── Shoulder spikes ── */}
          {[-8,-2,4].map((dy, i) => (
            <path key={i} d={`M${26+dy} ${58+i*2} L${22+dy} 48 L${30+dy} ${54+i*2}`} fill="#8a0000" stroke="#c00000" strokeWidth="0.5" />
          ))}
          {[8,2,-4].map((dy, i) => (
            <path key={i} d={`M${74-dy} ${58+i*2} L${78-dy} 48 L${70-dy} ${54+i*2}`} fill="#8a0000" stroke="#c00000" strokeWidth="0.5" />
          ))}
        </g>

        {/* ── Neck ── */}
        <rect x="36" y="48" width="28" height="16" rx="6" fill="#1e0a0a" />
        {/* Neck veins */}
        <path d="M38 50 Q36 56 38 62" stroke="#5a0000" strokeWidth="1" fill="none" opacity="0.7" />
        <path d="M62 50 Q64 56 62 62" stroke="#5a0000" strokeWidth="1" fill="none" opacity="0.7" />

        {/* ── Head ── */}
        <ellipse cx="50" cy="36" rx="22" ry="24" fill="#1a0505" />
        {/* Face shadow / structure */}
        <ellipse cx="50" cy="46" rx="16" ry="8" fill="#0d0000" opacity="0.5" />
        {/* Brow ridge */}
        <path d="M28 30 Q50 24 72 30" fill="#0d0000" stroke="#0d0000" strokeWidth="6" strokeLinecap="round" />
        {/* Forehead veins */}
        <path d="M40 22 Q38 26 40 30" stroke="#5a0000" strokeWidth="0.8" fill="none" opacity="0.6" />
        <path d="M60 22 Q62 26 60 30" stroke="#5a0000" strokeWidth="0.8" fill="none" opacity="0.6" />

        {/* ── Eyes — burning ── */}
        <ellipse cx="36" cy="33" rx="8" ry="6" fill="#0d0000" />
        <ellipse cx="64" cy="33" rx="8" ry="6" fill="#0d0000" />
        {/* Eye inner glow */}
        <circle cx="36" cy="33" r="5" fill="url(#eyeGrad)" style={{ animation: "eyeFlare 1.8s ease-in-out infinite" }} />
        <circle cx="64" cy="33" r="5" fill="url(#eyeGrad)" style={{ animation: "eyeFlareL 1.8s ease-in-out 0.4s infinite" }} />
        {/* Pupil slit */}
        <ellipse cx="36" cy="33" rx="1.5" ry="4" fill="#000" />
        <ellipse cx="64" cy="33" rx="1.5" ry="4" fill="#000" />
        {/* Eye corona */}
        <circle cx="36" cy="33" r="7" fill="none" stroke="#ff4400" strokeWidth="1" opacity="0.4" style={{ animation: "eyeFlare 1.8s ease-in-out infinite" }} />
        <circle cx="64" cy="33" r="7" fill="none" stroke="#ff4400" strokeWidth="1" opacity="0.4" style={{ animation: "eyeFlareL 1.8s ease-in-out 0.4s infinite" }} />

        {/* ── Nose ── */}
        <path d="M46 40 Q44 46 46 48 L50 49 L54 48 Q56 46 54 40" fill="#0d0000" />
        <circle cx="46" cy="47" r="2" fill="#0a0000" />
        <circle cx="54" cy="47" r="2" fill="#0a0000" />

        {/* ── Mouth — jagged fangs ── */}
        <path d="M32 52 Q50 58 68 52 Q66 62 50 64 Q34 62 32 52 Z" fill="#0d0000" />
        {/* Upper fangs */}
        {[35,41,47,53,59,65].map((x,i) => (
          <path key={i} d={`M${x} 53 L${x+2} 62 L${x+4} 53`} fill={i===1||i===4?"#fff":"#ddd"} stroke="#bbb" strokeWidth="0.3" />
        ))}
        {/* Tongue */}
        <path d="M44 62 Q50 66 56 62 Q54 70 50 68 Q46 70 44 62 Z" fill="#c00000" />
        <path d="M50 64 L50 70" stroke="#8a0000" strokeWidth="0.8" />
        {/* Lower glow from mouth */}
        <ellipse cx="50" cy="64" rx="12" ry="4" fill="#ff2200" opacity="0.15" />

        {/* ── Horns ── */}
        <path d="M28 18 Q20 2 14 -6 Q22 0 30 12 Z" fill="#1a0808" stroke="#3a1010" strokeWidth="1" />
        <path d="M72 18 Q80 2 86 -6 Q78 0 70 12 Z" fill="#1a0808" stroke="#3a1010" strokeWidth="1" />
        {/* Horn ridges */}
        <path d="M26 16 Q20 6 16 -2" stroke="#2a0808" strokeWidth="1.5" fill="none" />
        <path d="M74 16 Q80 6 84 -2" stroke="#2a0808" strokeWidth="1.5" fill="none" />
        {/* Horn tips glow */}
        <circle cx="14" cy="-6" r="3" fill="#ff2200" opacity="0.5" />
        <circle cx="86" cy="-6" r="3" fill="#ff2200" opacity="0.5" />

        {/* ── Hellfire crown (floating flames) ── */}
        <g className="fire-main" style={{ transformOrigin: "50px 14px" }}>
          <path d="M44 14 Q42 6 45 0 Q48 6 50 2 Q52 8 50 14 Z" fill="#ff4400" opacity="0.9" />
          <path d="M44 14 Q42 6 45 0 Q48 6 50 2 Q52 8 50 14 Z" fill="#ffaa00" opacity="0.5" />
        </g>
        <g className="fire-l" style={{ transformOrigin: "33px 20px" }}>
          <path d="M30 20 Q28 13 31 8 Q34 13 33 20 Z" fill="#ff4400" opacity="0.75" />
        </g>
        <g className="fire-r" style={{ transformOrigin: "67px 20px" }}>
          <path d="M70 20 Q72 13 69 8 Q66 13 67 20 Z" fill="#ff4400" opacity="0.75" />
        </g>

        {/* ── Rising smoke wisps ── */}
        {[[32,22],[50,18],[68,22]].map(([x,y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="4" ry="8" fill="#1a0000" opacity="0.3"
            style={{ animation: `smokeRise ${1.5 + i*0.3}s ease-out ${i*0.4}s infinite` }} />
        ))}
      </g>
    </svg>
  );
}