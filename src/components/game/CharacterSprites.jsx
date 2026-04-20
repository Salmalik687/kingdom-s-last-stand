// Hand-crafted CSS/SVG animated character sprites — no emojis

// ─── LORD ALDRIC ────────────────────────────────────────────────────────────
export function LordAldric({ size = 120, bobOffset = 0 }) {
  return (
    <svg width={size} height={size * 1.55} viewBox="0 0 90 140" style={{ overflow: "visible", filter: "drop-shadow(0 4px 22px rgba(200,160,60,0.5)) drop-shadow(0 0 40px rgba(180,120,40,0.2))" }}>
      <defs>
        <radialGradient id="aldricSkin" cx="45%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#e8b888" />
          <stop offset="60%" stopColor="#c89060" />
          <stop offset="100%" stopColor="#a06840" />
        </radialGradient>
        <linearGradient id="aldricArmor" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7a8090" />
          <stop offset="50%" stopColor="#4a5060" />
          <stop offset="100%" stopColor="#2a3040" />
        </linearGradient>
        <linearGradient id="aldricSword" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8e8f8" />
          <stop offset="40%" stopColor="#b0b8d0" />
          <stop offset="100%" stopColor="#6070a0" />
        </linearGradient>
        <radialGradient id="aldricShield" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#a02828" />
          <stop offset="100%" stopColor="#4a0808" />
        </radialGradient>
      </defs>
      <style>{`
        @keyframes aBob     { 0%,100%{transform:translateY(0)}     50%{transform:translateY(-4px)} }
        @keyframes aCloak   { 0%,100%{transform:skewX(0deg)}       50%{transform:skewX(1.5deg)} }
        @keyframes aGleam   { 0%,100%{opacity:0;transform:translateY(0)}   40%{opacity:0.9;transform:translateY(-4px)}  80%{opacity:0} }
        @keyframes aEye     { 0%,100%{opacity:0.7} 50%{opacity:1} }
        @keyframes aCape    { 0%,100%{transform:skewX(0) scaleX(1)} 50%{transform:skewX(2deg) scaleX(1.02)} }
        @keyframes aBreath  { 0%,100%{transform:scaleY(1)}          50%{transform:scaleY(1.02)} }
        .a-body   { animation: aBob     2.4s ease-in-out ${bobOffset}s infinite; transform-origin: 45px 128px; }
        .a-cloak  { animation: aCape    3.2s ease-in-out ${bobOffset}s infinite; transform-origin: 45px 85px; }
        .a-torso  { animation: aBreath  3s   ease-in-out ${bobOffset}s infinite; transform-origin: 45px 75px; }
      `}</style>

      <g className="a-body">

        {/* ══ BOOTS ══ — armoured sabatons */}
        <path d="M28 120 Q26 128 24 134 Q32 136 38 134 Q38 128 36 120 Z" fill="#1e1410" />
        <path d="M22 130 Q30 136 38 134" stroke="#3a2818" strokeWidth="1.5" fill="none" />
        <path d="M52 120 Q50 128 48 134 Q56 136 62 134 Q64 128 62 120 Z" fill="#1e1410" />
        <path d="M48 130 Q56 136 64 134" stroke="#3a2818" strokeWidth="1.5" fill="none" />
        {/* Sabaton plate lines */}
        <path d="M24 132 L38 134" stroke="#4a3820" strokeWidth="0.8" opacity="0.7" />
        <path d="M48 132 L64 134" stroke="#4a3820" strokeWidth="0.8" opacity="0.7" />

        {/* ══ GREAVES / LEGS ══ */}
        <path d="M28 96 Q26 112 28 120 L38 120 Q40 112 38 96 Z" fill="url(#aldricArmor)" />
        <path d="M52 96 Q50 112 52 120 L62 120 Q64 112 62 96 Z" fill="url(#aldricArmor)" />
        {/* Greave highlight */}
        <path d="M30 98 Q29 112 30 118" stroke="#8090a8" strokeWidth="1" fill="none" opacity="0.5" />
        <path d="M54 98 Q53 112 54 118" stroke="#8090a8" strokeWidth="1" fill="none" opacity="0.5" />
        {/* Knee cap */}
        <ellipse cx="33" cy="96" rx="6" ry="4" fill="#5a6070" />
        <ellipse cx="57" cy="96" rx="6" ry="4" fill="#5a6070" />
        <ellipse cx="33" cy="95" rx="4" ry="2.5" fill="#6a7080" />
        <ellipse cx="57" cy="95" rx="4" ry="2.5" fill="#6a7080" />

        {/* ══ CAPE / TABARD ══ */}
        <g className="a-cloak">
          <path d="M20 65 Q15 95 16 118 Q22 122 32 120 Q36 114 36 96 L36 65 Z" fill="#7a1010" opacity="0.9" />
          <path d="M70 65 Q75 95 74 118 Q68 122 58 120 Q54 114 54 96 L54 65 Z" fill="#7a1010" opacity="0.9" />
          {/* Gold trim */}
          <path d="M20 65 Q15 95 16 118" stroke="#d4af37" strokeWidth="1.5" fill="none" opacity="0.85" />
          <path d="M70 65 Q75 95 74 118" stroke="#d4af37" strokeWidth="1.5" fill="none" opacity="0.85" />
          <path d="M16 118 Q22 122 32 120" stroke="#d4af37" strokeWidth="1.2" fill="none" opacity="0.7" />
          <path d="M74 118 Q68 122 58 120" stroke="#d4af37" strokeWidth="1.2" fill="none" opacity="0.7" />
          {/* Crest / sigil */}
          <path d="M41 78 L45 70 L49 78 L45 85 Z" fill="#d4af37" opacity="0.9" />
          <circle cx="45" cy="77" r="2" fill="#c8000a" opacity="0.8" />
        </g>

        {/* ══ TORSO / PLATE ARMOUR ══ */}
        <g className="a-torso">
          {/* Breastplate */}
          <path d="M24 62 Q22 78 24 90 Q36 96 45 95 Q54 96 66 90 Q68 78 66 62 Q56 56 45 55 Q34 56 24 62 Z" fill="url(#aldricArmor)" />
          {/* Breastplate highlight */}
          <path d="M30 64 Q28 78 30 88" stroke="#8090a8" strokeWidth="1.5" fill="none" opacity="0.5" />
          <path d="M38 58 Q36 78 38 90" stroke="#9098b0" strokeWidth="0.8" fill="none" opacity="0.3" />
          {/* Center line */}
          <path d="M45 58 L45 92" stroke="#6070a0" strokeWidth="0.8" fill="none" opacity="0.5" />
          {/* Plate detailing */}
          <path d="M30 72 Q45 76 60 72" stroke="#5a6070" strokeWidth="1" fill="none" opacity="0.6" />
          <path d="M28 80 Q45 84 62 80" stroke="#5a6070" strokeWidth="1" fill="none" opacity="0.5" />
          {/* Battle-worn scrapes */}
          <path d="M35 66 Q37 68 36 71" stroke="#3a4050" strokeWidth="0.8" fill="none" opacity="0.6" />
          <path d="M50 60 Q52 63 51 67" stroke="#3a4050" strokeWidth="0.8" fill="none" opacity="0.5" />

          {/* Pauldrons — heavy plate shoulders */}
          {/* Left pauldron */}
          <path d="M14 58 Q10 62 10 70 Q14 76 22 74 Q26 68 24 60 Z" fill="#4a5060" />
          <path d="M14 58 Q10 64 10 70" stroke="#7a8090" strokeWidth="1" fill="none" opacity="0.7" />
          <path d="M10 70 Q14 76 22 74" stroke="#6a7080" strokeWidth="1" fill="none" opacity="0.5" />
          {/* Right pauldron */}
          <path d="M76 58 Q80 62 80 70 Q76 76 68 74 Q64 68 66 60 Z" fill="#4a5060" />
          <path d="M76 58 Q80 64 80 70" stroke="#7a8090" strokeWidth="1" fill="none" opacity="0.7" />
          <path d="M80 70 Q76 76 68 74" stroke="#6a7080" strokeWidth="1" fill="none" opacity="0.5" />
          {/* Shoulder spikes — subtle */}
          <path d="M12 58 L9 50 L15 56 Z" fill="#3a4050" stroke="#6a7080" strokeWidth="0.5" />
          <path d="M78 58 L81 50 L75 56 Z" fill="#3a4050" stroke="#6a7080" strokeWidth="0.5" />

          {/* ══ SWORD ARM (LEFT) ══ */}
          <path d="M10 70 Q6 76 6 88 Q8 96 14 94 Q20 90 20 80 Q18 72 14 68 Z" fill="#4a5060" />
          <path d="M8 76 Q6 84 8 92" stroke="#7a8090" strokeWidth="1" fill="none" opacity="0.5" />
          {/* Gauntlet left */}
          <path d="M7 92 Q5 98 7 104 Q12 106 16 104 Q18 98 16 92 Z" fill="#3a4050" />
          {/* Fingers */}
          <path d="M7 104 Q9 108 10 104" stroke="#5a6070" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M10 105 Q12 110 13 105" stroke="#5a6070" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* ══ SHIELD ARM (RIGHT) ══ */}
          <path d="M80 70 Q84 76 84 88 Q82 96 76 94 Q70 90 70 80 Q72 72 76 68 Z" fill="#4a5060" />
          <path d="M82 76 Q84 84 82 92" stroke="#7a8090" strokeWidth="1" fill="none" opacity="0.5" />
          {/* Shield */}
          <path d="M82 64 Q92 66 94 76 Q94 90 82 98 Q70 90 70 76 Q70 66 82 64 Z" fill="url(#aldricShield)" />
          <path d="M82 64 Q92 66 94 76 Q94 90 82 98 Q70 90 70 76 Q70 66 82 64" stroke="#d4af37" strokeWidth="1.5" fill="none" />
          {/* Shield cross */}
          <path d="M82 66 L82 96" stroke="#d4af37" strokeWidth="1.2" opacity="0.8" />
          <path d="M72 81 L92 81" stroke="#d4af37" strokeWidth="1.2" opacity="0.8" />
          {/* Shield boss */}
          <circle cx="82" cy="81" r="4" fill="#d4af37" opacity="0.9" />
          <circle cx="82" cy="81" r="2" fill="#c8000a" opacity="0.8" />
        </g>

        {/* ══ SWORD ══ — great Elden Ring longsword */}
        {/* Blade */}
        <path d="M6 18 L3 22 L6 108 L8 108 L11 22 Z" fill="url(#aldricSword)" />
        <path d="M6 18 L6 108" stroke="#d0d8e8" strokeWidth="0.5" fill="none" opacity="0.6" />
        {/* Crossguard */}
        <path d="M0 54 Q9 52 18 54" fill="#d4af37" />
        <path d="M0 54 Q9 52 18 54" stroke="#b8860b" strokeWidth="0.8" fill="none" />
        {/* Grip */}
        <rect x="5.5" y="54" width="3" height="18" rx="1" fill="#5a3010" />
        {[0,1,2,3].map(i => <path key={i} d={`M5 ${57+i*4} Q7 ${58+i*4} 9 ${57+i*4}`} stroke="#d4af37" strokeWidth="0.6" fill="none" opacity="0.6" />)}
        {/* Pommel */}
        <ellipse cx="7" cy="74" rx="4" ry="3" fill="#d4af37" />
        <circle cx="7" cy="73" r="1.5" fill="#ffe566" opacity="0.7" />
        {/* Blade gleam animation */}
        <path d="M7 22 L7 52" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0" style={{ animation: "aGleam 4s ease-in-out 1.5s infinite" }} />
        {/* Blade rune glow */}
        <path d="M7 32 Q6 40 7 48" stroke="#4a7aff" strokeWidth="0.8" fill="none" opacity="0.3" style={{ animation: "aEye 2s ease-in-out infinite" }} />

        {/* ══ NECK ══ */}
        <path d="M38 44 Q36 52 36 58 L54 58 Q54 52 52 44 Q48 40 45 40 Q42 40 38 44 Z" fill="url(#aldricSkin)" />
        {/* Gorget (neck armor) */}
        <path d="M33 56 Q36 60 45 62 Q54 60 57 56 Q54 54 45 54 Q36 54 33 56 Z" fill="#4a5060" />
        <path d="M33 56 Q45 62 57 56" stroke="#6a7080" strokeWidth="0.8" fill="none" opacity="0.6" />

        {/* ══ HEAD / FACE ══ */}
        <ellipse cx="45" cy="32" rx="16" ry="18" fill="url(#aldricSkin)" />
        {/* Jaw definition */}
        <path d="M31 38 Q32 46 45 50 Q58 46 59 38" stroke="#a07050" strokeWidth="0.8" fill="none" opacity="0.4" />
        {/* Jaw shadow */}
        <ellipse cx="45" cy="46" rx="11" ry="5" fill="#a06840" opacity="0.25" />
        {/* Battle scar — across cheek */}
        <path d="M34 30 L38 35" stroke="#804828" strokeWidth="1.2" strokeLinecap="round" opacity="0.65" />
        <path d="M35 30 L39 35" stroke="#c07858" strokeWidth="0.5" strokeLinecap="round" opacity="0.3" />

        {/* ══ EYES ══ — intense, determined */}
        <ellipse cx="38" cy="29" rx="5" ry="3.8" fill="white" />
        <ellipse cx="52" cy="29" rx="5" ry="3.8" fill="white" />
        {/* Iris */}
        <circle cx="38" cy="30" r="3.2" fill="#2a4a90" />
        <circle cx="52" cy="30" r="3.2" fill="#2a4a90" />
        <circle cx="38" cy="30" r="2" fill="#0d1f50" />
        <circle cx="52" cy="30" r="2" fill="#0d1f50" />
        {/* Shine */}
        <circle cx="39.5" cy="28.5" r="1" fill="white" opacity="0.9" />
        <circle cx="53.5" cy="28.5" r="1" fill="white" opacity="0.9" />
        <circle cx="37" cy="31" r="0.5" fill="white" opacity="0.4" />
        <circle cx="51" cy="31" r="0.5" fill="white" opacity="0.4" />
        {/* Eye glow — heroic blue */}
        <circle cx="38" cy="30" r="3.5" fill="#4a7aff" opacity="0.18" style={{ animation: "aEye 2.5s ease-in-out infinite" }} />
        <circle cx="52" cy="30" r="3.5" fill="#4a7aff" opacity="0.18" style={{ animation: "aEye 2.5s ease-in-out 0.5s infinite" }} />
        {/* Heavy brow — furrowed, battle-set */}
        <path d="M33 24 Q38 21.5 43 23.5" stroke="#3a2010" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d="M47 23.5 Q52 21.5 57 24" stroke="#3a2010" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        {/* Brow furrow */}
        <path d="M42 23 Q43 22 44 23" stroke="#5a3020" strokeWidth="1" fill="none" opacity="0.6" />
        {/* Eyelid line */}
        <path d="M33 26 Q38 24.5 43 26" stroke="#2a1810" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M47 26 Q52 24.5 57 26" stroke="#2a1810" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* ══ NOSE ══ — strong, masculine */}
        <path d="M44 33 Q43 38 44 41 Q45 42.5 46 41 Q47 38 46 33" stroke="#a07050" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7" />
        <ellipse cx="43.5" cy="41" rx="2" ry="1.2" fill="#906040" opacity="0.35" />
        <ellipse cx="46.5" cy="41" rx="2" ry="1.2" fill="#906040" opacity="0.35" />

        {/* ══ MOUTH ══ — determined set jaw */}
        <path d="M37 46 Q42 44 45 45 Q48 44 53 46" stroke="#7a4030" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M39 47 Q45 49 51 47" stroke="#6a3825" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.5" />
        {/* Stubble shadow */}
        <ellipse cx="45" cy="46" rx="10" ry="4" fill="#7a4030" opacity="0.08" />
        {[36,38,40,42,44,46,48,50,52,54].map((x,i) => (
          <line key={i} x1={x} y1="44" x2={x + (i%2?0.5:-0.5)} y2="47" stroke="#5a3020" strokeWidth="0.7" opacity="0.35" />
        ))}

        {/* ══ HELMET ══ — great helm with visor */}
        {/* Main helm body */}
        <path d="M29 28 Q29 10 45 8 Q61 10 61 28 Z" fill="#4a5060" />
        <path d="M29 28 Q29 10 45 8 Q61 10 61 28" stroke="#7a8090" strokeWidth="1.5" fill="none" />
        {/* Helm detail — banded plates */}
        <path d="M30 24 Q45 22 60 24" stroke="#6a7080" strokeWidth="1" fill="none" opacity="0.7" />
        <path d="M30 18 Q45 16 60 18" stroke="#5a6070" strokeWidth="0.8" fill="none" opacity="0.5" />
        {/* Nose/face guard */}
        <rect x="43" y="16" width="4" height="18" rx="1.5" fill="#3a4050" />
        <rect x="43.5" y="17" width="1.5" height="16" rx="0.8" fill="#5a6070" opacity="0.5" />
        {/* Visor slot */}
        <path d="M32 26 Q38 24 43 25" stroke="#1a2030" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.8" />
        <path d="M47 25 Q52 24 58 26" stroke="#1a2030" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.8" />
        {/* Crown on helmet */}
        <path d="M31 20 L34 14 L37 18 L40 11 L43 16 L47 16 L50 11 L53 18 L56 14 L59 20"
          stroke="#d4af37" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {/* Crown gems */}
        <circle cx="45" cy="12" r="2" fill="#ef4444" opacity="0.9" />
        <circle cx="36" cy="15" r="1.5" fill="#d4af37" opacity="0.8" />
        <circle cx="54" cy="15" r="1.5" fill="#d4af37" opacity="0.8" />
        {/* Helm plume */}
        <path d="M45 8 Q42 0 38 -4 Q42 -5 46 -5 Q48 -1 45 8" fill="#8b1a1a" opacity="0.9" />
        <path d="M45 8 Q48 2 50 -2" stroke="#a02020" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
        {/* Plume shimmer */}
        <path d="M44 2 Q43 0 42 -2" stroke="#c03030" strokeWidth="1" fill="none" opacity="0.5" />
      </g>
    </svg>
  );
}

// ─── QUEEN SERAPHINE ────────────────────────────────────────────────────────
export function QueenSeraphine({ size = 120, glowColor = "#e879f9", glowRgb = "232,121,249" }) {
  return (
    <svg width={size} height={size * 1.8} viewBox="0 0 100 180" style={{ overflow: "visible", filter: `drop-shadow(0 6px 28px rgba(${glowRgb},0.65)) drop-shadow(0 0 60px rgba(${glowRgb},0.25))` }}>
      <defs>
        <radialGradient id="skinGrad" cx="45%" cy="38%" r="55%">
          <stop offset="0%" stopColor="#fce4d0" />
          <stop offset="60%" stopColor="#f0c8a8" />
          <stop offset="100%" stopColor="#d4a080" />
        </radialGradient>
        <radialGradient id="irisGrad" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#9de4d4" />
          <stop offset="50%" stopColor="#2a9a7a" />
          <stop offset="100%" stopColor="#0d4a38" />
        </radialGradient>
        <radialGradient id="dressGrad" cx="50%" cy="20%" r="80%">
          <stop offset="0%" stopColor="#8b2fc9" />
          <stop offset="50%" stopColor="#5a0e8a" />
          <stop offset="100%" stopColor="#2d0548" />
        </radialGradient>
        <radialGradient id="crownGrad" cx="50%" cy="0%" r="100%">
          <stop offset="0%" stopColor="#ffe97a" />
          <stop offset="100%" stopColor="#b8860b" />
        </radialGradient>
        <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3d1060" />
          <stop offset="40%" stopColor="#1a0535" />
          <stop offset="100%" stopColor="#0a0020" />
        </linearGradient>
        <filter id="queenGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <style>{`
        @keyframes qBob      { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes qBreath   { 0%,100%{transform:scaleX(1)}    50%{transform:scaleX(1.015)} }
        @keyframes qHairSway { 0%,100%{transform:skewX(0deg) translateX(0)} 50%{transform:skewX(1.5deg) translateX(1px)} }
        @keyframes qJewel    { 0%,100%{opacity:0.8;filter:drop-shadow(0 0 3px ${glowColor})} 50%{opacity:1;filter:drop-shadow(0 0 10px ${glowColor})} }
        @keyframes qCrown    { 0%,100%{filter:drop-shadow(0 0 5px #ffd700)} 50%{filter:drop-shadow(0 0 16px #ffd700) drop-shadow(0 0 30px ${glowColor})} }
        @keyframes qEye      { 0%,100%{opacity:0.6} 50%{opacity:1} }
        @keyframes qVeil     { 0%,100%{transform:translateX(0) skewY(0)} 50%{transform:translateX(2px) skewY(0.5deg)} }
        .q-body  { animation: qBob 2.6s ease-in-out infinite; transform-origin: 50px 160px; }
        .q-torso { animation: qBreath 3s ease-in-out infinite; transform-origin: 50px 90px; }
        .q-hair  { animation: qHairSway 3.2s ease-in-out infinite; transform-origin: 50px 50px; }
        .q-crown { animation: qCrown 2.4s ease-in-out infinite; }
        .q-veil  { animation: qVeil 3.5s ease-in-out infinite; transform-origin: 50px 60px; }
      `}</style>

      <g className="q-body">

        {/* ══ GOWN ══ */}
        {/* Outer gown — deep violet */}
        <path d="M28 88 Q14 118 10 150 Q8 168 50 174 Q92 168 90 150 Q86 118 72 88 Z" fill="url(#dressGrad)" />
        {/* Inner layer highlight */}
        <path d="M33 88 Q22 115 20 148 Q22 162 50 167 Q78 162 80 148 Q78 115 67 88 Z" fill="#7c3aed" opacity="0.4" />
        {/* Central panel — lighter */}
        <path d="M40 88 Q36 115 36 148 Q43 155 50 155 Q57 155 64 148 Q64 115 60 88 Z" fill="#9333ea" opacity="0.25" />
        {/* Gold hem trim */}
        <path d="M10 150 Q50 174 90 150" stroke="#d4af37" strokeWidth="2.5" fill="none" opacity="0.9" />
        <path d="M12 155 Q50 178 88 155" stroke="#ffd700" strokeWidth="1" fill="none" opacity="0.4" />
        {/* Intricate gown embroidery lines */}
        {[0,1,2,3].map(i => (
          <path key={i} d={`M${38+i*5} 95 Q${36+i*5} 140 ${37+i*5} 162`} stroke={glowColor} strokeWidth="0.5" fill="none" opacity={0.12 + i*0.04} />
        ))}
        {/* Starfield on dress */}
        {[[20,105],[72,98],[30,125],[65,118],[25,148],[75,142],[50,132],[42,112],[58,128]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r={i%3===0?1.5:0.9} fill={glowColor} opacity={0.3 + (i%4)*0.12} />
        ))}
        {/* Layered petticoat peek at hem */}
        <path d="M15 158 Q50 170 85 158 Q80 166 50 172 Q20 166 15 158 Z" fill="#5a0e8a" opacity="0.5" />

        {/* ══ BODICE / CORSET ══ */}
        <g className="q-torso">
          {/* Main bodice */}
          <path d="M30 70 Q26 88 28 96 L72 96 Q74 88 70 70 Q60 64 50 63 Q40 64 30 70 Z" fill="#6d28d9" />
          <path d="M33 72 Q30 88 32 94 L68 94 Q70 88 67 72 Q58 66 50 65 Q42 66 33 72 Z" fill="#8b3cf7" opacity="0.5" />
          {/* Bodice lacing — golden cord */}
          <path d="M46 70 Q44 80 46 90" stroke="#d4af37" strokeWidth="0.8" fill="none" opacity="0.8" />
          <path d="M54 70 Q56 80 54 90" stroke="#d4af37" strokeWidth="0.8" fill="none" opacity="0.8" />
          {[0,1,2,3].map(i => (
            <path key={i} d={`M46 ${72+i*6} Q50 ${74+i*6} 54 ${72+i*6}`} stroke="#ffd700" strokeWidth="0.8" fill="none" opacity="0.7" />
          ))}
          {/* Central brooch / sigil */}
          <circle cx="50" cy="76" r="5" fill="#1a0035" stroke={glowColor} strokeWidth="1.2" />
          <circle cx="50" cy="76" r="3" fill={glowColor} opacity="0.9" style={{ animation: "qJewel 2s ease-in-out infinite" }} />
          <circle cx="50" cy="76" r="1.5" fill="white" opacity="0.8" />
          {/* Gold side accents */}
          <path d="M30 78 Q27 82 30 86" stroke="#d4af37" strokeWidth="1.5" fill="none" opacity="0.7" strokeLinecap="round" />
          <path d="M70 78 Q73 82 70 86" stroke="#d4af37" strokeWidth="1.5" fill="none" opacity="0.7" strokeLinecap="round" />

          {/* ══ SLEEVES ══ — flowing, Elden Ring style */}
          {/* Left sleeve */}
          <path d="M30 70 Q18 72 12 82 Q8 92 12 98 Q18 102 24 96 Q22 86 28 80 Z" fill="#6d28d9" />
          <path d="M30 70 Q20 74 15 84 Q12 92 15 97" stroke="#8b3cf7" strokeWidth="1" fill="none" opacity="0.5" />
          {/* Left sleeve trim — flowing hem */}
          <path d="M12 98 Q18 102 24 96" stroke="#d4af37" strokeWidth="1.5" fill="none" opacity="0.8" />
          {/* Right sleeve */}
          <path d="M70 70 Q82 72 88 82 Q92 92 88 98 Q82 102 76 96 Q78 86 72 80 Z" fill="#6d28d9" />
          <path d="M70 70 Q80 74 85 84 Q88 92 85 97" stroke="#8b3cf7" strokeWidth="1" fill="none" opacity="0.5" />
          <path d="M88 98 Q82 102 76 96" stroke="#d4af37" strokeWidth="1.5" fill="none" opacity="0.8" />

          {/* ══ HANDS ══ — elegant, slender */}
          {/* Left hand */}
          <path d="M11 97 Q8 101 9 106 Q11 108 14 107 Q16 103 14 98 Z" fill="url(#skinGrad)" />
          <path d="M10 102 Q8 100 7 104" stroke="#e8c0a0" strokeWidth="1" fill="none" strokeLinecap="round" />
          <path d="M12 104 Q10 102 9 106" stroke="#e8c0a0" strokeWidth="0.8" fill="none" strokeLinecap="round" />
          {/* Right hand */}
          <path d="M89 97 Q92 101 91 106 Q89 108 86 107 Q84 103 86 98 Z" fill="url(#skinGrad)" />
          <path d="M90 102 Q92 100 93 104" stroke="#e8c0a0" strokeWidth="1" fill="none" strokeLinecap="round" />
          <path d="M88 104 Q90 102 91 106" stroke="#e8c0a0" strokeWidth="0.8" fill="none" strokeLinecap="round" />
          {/* Rings */}
          <circle cx="90" cy="103" r="2" fill="none" stroke={glowColor} strokeWidth="1.2" opacity="0.9" />
          <circle cx="10" cy="104" r="2" fill="none" stroke="#d4af37" strokeWidth="1.2" opacity="0.9" />
        </g>

        {/* ══ NECK ══ */}
        <path d="M41 52 Q38 60 38 68 L62 68 Q62 60 59 52 Q54 48 50 48 Q46 48 41 52 Z" fill="url(#skinGrad)" />
        {/* Collarbone shadow */}
        <path d="M38 66 Q50 70 62 66" stroke="#c09878" strokeWidth="0.8" fill="none" opacity="0.5" />
        {/* Necklace — layered gold & jewels */}
        <path d="M32 66 Q40 72 50 70 Q60 72 68 66" stroke="#d4af37" strokeWidth="1.5" fill="none" opacity="0.9" />
        <path d="M34 68 Q40 75 50 73 Q60 75 66 68" stroke={glowColor} strokeWidth="0.8" fill="none" opacity="0.6" />
        {/* Pendant jewels */}
        {[36,43,50,57,64].map((x,i) => (
          <circle key={i} cx={x} cy={i===2?73:70} r={i===2?2.5:1.5} fill={i===2?glowColor:i%2===0?"#d4af37":"#ef4444"} opacity={i===2?1:0.85} />
        ))}

        {/* ══ HEAD / FACE ══ */}
        {/* Head shape — elegant oval */}
        <ellipse cx="50" cy="38" rx="17" ry="19" fill="url(#skinGrad)" />
        {/* Facial structure shadow */}
        <ellipse cx="50" cy="50" rx="11" ry="5" fill="#c09070" opacity="0.25" />
        <ellipse cx="44" cy="36" rx="4" ry="6" fill="#c09070" opacity="0.08" />
        <ellipse cx="56" cy="36" rx="4" ry="6" fill="#c09070" opacity="0.08" />
        {/* Cheeks — soft rose */}
        <ellipse cx="36" cy="42" rx="6" ry="4" fill="#f472b6" opacity="0.22" />
        <ellipse cx="64" cy="42" rx="6" ry="4" fill="#f472b6" opacity="0.22" />

        {/* ══ EYES ══ — large, luminous, Elden Ring goddess */}
        {/* Eye whites */}
        <ellipse cx="39" cy="36" rx="6" ry="4.5" fill="white" />
        <ellipse cx="61" cy="36" rx="6" ry="4.5" fill="white" />
        {/* Iris — teal-green with gradient */}
        <circle cx="39" cy="37" r="3.8" fill="url(#irisGrad)" />
        <circle cx="61" cy="37" r="3.8" fill="url(#irisGrad)" />
        {/* Inner pupil */}
        <circle cx="39" cy="37" r="2.2" fill="#081f18" />
        <circle cx="61" cy="37" r="2.2" fill="#081f18" />
        {/* Pupil shine — multi-point */}
        <circle cx="40.5" cy="35.5" r="1.1" fill="white" opacity="0.95" />
        <circle cx="62.5" cy="35.5" r="1.1" fill="white" opacity="0.95" />
        <circle cx="38.2" cy="38.5" r="0.5" fill="white" opacity="0.5" />
        <circle cx="60.2" cy="38.5" r="0.5" fill="white" opacity="0.5" />
        {/* Eye glow — magical */}
        <circle cx="39" cy="37" r="4" fill={glowColor} opacity="0.15" style={{ animation: "qEye 3s ease-in-out infinite" }} />
        <circle cx="61" cy="37" r="4" fill={glowColor} opacity="0.15" style={{ animation: "qEye 3s ease-in-out 0.5s infinite" }} />
        {/* Upper eyelid / lash line */}
        <path d="M33 33 Q39 31 45 33" stroke="#1a0820" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M55 33 Q61 31 67 33" stroke="#1a0820" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        {/* Lashes — individual strands */}
        {[33,36,39,42,45].map((x,i) => <line key={i} x1={x} y1="33" x2={x-0.5+i*0.3} y2={29+i%2} stroke="#1a0820" strokeWidth="0.9" strokeLinecap="round" />)}
        {[55,58,61,64,67].map((x,i) => <line key={i} x1={x} y1="33" x2={x-0.5+i*0.3} y2={29+i%2} stroke="#1a0820" strokeWidth="0.9" strokeLinecap="round" />)}
        {/* Lower lash line */}
        <path d="M33 40 Q39 41.5 45 40" stroke="#3a1030" strokeWidth="0.6" fill="none" strokeLinecap="round" opacity="0.6" />
        <path d="M55 40 Q61 41.5 67 40" stroke="#3a1030" strokeWidth="0.6" fill="none" strokeLinecap="round" opacity="0.6" />
        {/* Eyebrows — high arched, thin, Elden Ring style */}
        <path d="M31 28 Q36 24.5 42 27" stroke="#2a1020" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M58 27 Q64 24.5 69 28" stroke="#2a1020" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        {/* Brow highlight */}
        <path d="M32 28 Q36 25 41 27" stroke="#6a3050" strokeWidth="0.6" fill="none" strokeLinecap="round" opacity="0.5" />

        {/* ══ NOSE ══ — delicate, refined */}
        <path d="M49 40 Q47 45 48 47 Q50 48.5 52 47 Q53 45 51 40" stroke="#c09070" strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.7" />
        <ellipse cx="48" cy="47" rx="1.5" ry="1" fill="#b07858" opacity="0.4" />
        <ellipse cx="52" cy="47" rx="1.5" ry="1" fill="#b07858" opacity="0.4" />

        {/* ══ LIPS ══ — full, elegant */}
        {/* Upper lip */}
        <path d="M40 51 Q43 49 46 50 Q48 48.5 50 49 Q52 48.5 54 50 Q57 49 60 51" fill="#c0405a" stroke="none" />
        <path d="M40 51 Q45 49.5 50 50 Q55 49.5 60 51" fill="#d4506a" opacity="0.6" />
        {/* Cupid's bow */}
        <path d="M44 50 Q47 48.5 50 49.5 Q53 48.5 56 50" stroke="#e8607a" strokeWidth="0.6" fill="none" strokeLinecap="round" />
        {/* Lower lip */}
        <path d="M40 51 Q43 54 50 55 Q57 54 60 51" fill="#d4506a" />
        <path d="M40 51 Q50 56 60 51" fill="#e8607a" opacity="0.3" />
        {/* Lip highlight */}
        <path d="M44 52.5 Q50 54.5 56 52.5" stroke="rgba(255,180,200,0.6)" strokeWidth="0.8" fill="none" strokeLinecap="round" />

        {/* ══ HAIR ══ — flowing dark violet tresses */}
        <g className="q-hair">
          {/* Back hair mass */}
          <path d="M33 22 Q26 18 24 10 Q36 4 50 3 Q64 4 76 10 Q74 18 67 22" fill="#1a0535" />
          {/* Side volume — left */}
          <path d="M33 22 Q22 28 18 42 Q15 56 17 72 Q14 80 16 92" stroke="url(#hairGrad)" strokeWidth="11" fill="none" strokeLinecap="round" />
          {/* Side volume — right */}
          <path d="M67 22 Q78 28 82 42 Q85 56 83 72 Q86 80 84 92" stroke="url(#hairGrad)" strokeWidth="11" fill="none" strokeLinecap="round" />
          {/* Inner hair flow left */}
          <path d="M33 22 Q24 32 22 48 Q20 62 22 78" stroke="#2d0850" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.7" />
          {/* Inner hair flow right */}
          <path d="M67 22 Q76 32 78 48 Q80 62 78 78" stroke="#2d0850" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.7" />
          {/* Hair sheen highlights */}
          <path d="M38 8 Q37 18 36 28" stroke="rgba(180,100,255,0.35)" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M55 7 Q56 17 57 27" stroke="rgba(180,100,255,0.2)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Long trailing tresses */}
          <path d="M17 90 Q13 110 16 130 Q18 140 20 150" stroke="#1a0535" strokeWidth="7" fill="none" strokeLinecap="round" />
          <path d="M83 90 Q87 110 84 130 Q82 140 80 150" stroke="#1a0535" strokeWidth="7" fill="none" strokeLinecap="round" />
          {/* Wisp tendrils */}
          <path d="M20 100 Q15 115 18 128" stroke="#3d1060" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
          <path d="M80 100 Q85 115 82 128" stroke="#3d1060" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
          {/* Small face-framing wisps */}
          <path d="M34 32 Q30 36 31 42" stroke="#3d1060" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.8" />
          <path d="M66 32 Q70 36 69 42" stroke="#3d1060" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.8" />
        </g>

        {/* ══ VEIL ══ — translucent gossamer flowing veil */}
        <g className="q-veil" opacity="0.35">
          <path d="M28 18 Q20 30 16 55 Q14 72 16 90" stroke={glowColor} strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M72 18 Q80 30 84 55 Q86 72 84 90" stroke={glowColor} strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M28 18 Q30 35 26 60 Q24 75 22 90" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>

        {/* ══ CROWN ══ — ornate, Elden Ring great-rune style */}
        <g className="q-crown">
          {/* Crown band */}
          <path d="M30 20 L70 20" stroke="#b8860b" strokeWidth="4" strokeLinecap="round" />
          <path d="M30 20 L70 20" stroke="#ffd700" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          {/* Crown spires */}
          <path d="M30 20 L30 10 L34 16 L38 6 L42 14 L46 4 L50 12 L54 4 L58 14 L62 6 L66 16 L70 10 L70 20 Z" fill="url(#crownGrad)" />
          <path d="M30 20 L30 10 L34 16 L38 6 L42 14 L46 4 L50 12 L54 4 L58 14 L62 6 L66 16 L70 10 L70 20" stroke="#ffe566" strokeWidth="0.8" fill="none" opacity="0.6" />
          {/* Crown gems */}
          <circle cx="50" cy="6" r="4" fill={glowColor} style={{ animation: "qJewel 2s ease-in-out infinite" }} />
          <circle cx="50" cy="6" r="2.2" fill="white" opacity="0.7" />
          <circle cx="38" cy="8" r="2.5" fill="#ef4444" />
          <circle cx="38" cy="8" r="1.2" fill="#ff8080" opacity="0.7" />
          <circle cx="62" cy="8" r="2.5" fill="#22c55e" />
          <circle cx="62" cy="8" r="1.2" fill="#80ff80" opacity="0.7" />
          <circle cx="30" cy="18" r="1.8" fill={glowColor} opacity="0.8" />
          <circle cx="70" cy="18" r="1.8" fill={glowColor} opacity="0.8" />
          {/* Gold filigree on crown */}
          <path d="M34 18 Q36 14 38 18" stroke="#ffe566" strokeWidth="0.7" fill="none" opacity="0.8" />
          <path d="M62 18 Q64 14 66 18" stroke="#ffe566" strokeWidth="0.7" fill="none" opacity="0.8" />
          {/* Floating rune above crown */}
          <circle cx="50" cy="-2" r="5" fill="none" stroke={glowColor} strokeWidth="0.8" opacity="0.4" style={{ animation: "qJewel 3s ease-in-out infinite" }} />
          <path d="M50 -7 L51.2 -3 L50 -1 L48.8 -3 Z" fill={glowColor} opacity="0.5" />
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