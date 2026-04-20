// ─── LORD ALDRIC ────────────────────────────────────────────────────
export function LordAldric({ size = 100, bobOffset = 0 }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 100 130" style={{ overflow: "visible", filter: "drop-shadow(0 6px 24px rgba(0,0,0,0.8))" }}>
      <style>{`
        @keyframes aldricBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes aldricBreath { 0%,100%{transform:scaleX(1)} 50%{transform:scaleX(1.02)} }
        .al-body { animation: aldricBob 2.4s ease-in-out infinite ${bobOffset}s; transform-origin: 50px 110px; }
        .al-torso { animation: aldricBreath 2.8s ease-in-out infinite; transform-origin: 50px 70px; }
      `}</style>

      <g className="al-body">
        {/* Cape — dark red/brown, fluttering */}
        <path d="M25 55 Q12 65 8 95 Q5 110 10 125 M30 55 L32 125" fill="#3a1f1f" stroke="#2a0f0f" strokeWidth="0.5" />
        <path d="M75 55 Q88 65 92 95 Q95 110 90 125 M70 55 L68 125" fill="#3a1f1f" stroke="#2a0f0f" strokeWidth="0.5" />

        <g className="al-torso">
          {/* Breastplate — dark iron */}
          <ellipse cx="50" cy="65" rx="22" ry="24" fill="#2a2a2a" stroke="#1a1a1a" strokeWidth="1" />
          <path d="M50 42 Q45 55 46 65 M50 42 Q55 55 54 65" stroke="#3a3a3a" strokeWidth="1" fill="none" opacity="0.5" />

          {/* Arms — armored */}
          <ellipse cx="25" cy="60" rx="8" ry="20" fill="#2a2a2a" />
          <ellipse cx="75" cy="60" rx="8" ry="20" fill="#2a2a2a" />

          {/* Hands — gauntleted */}
          <circle cx="20" cy="80" r="7" fill="#4a4a4a" stroke="#2a2a2a" strokeWidth="1" />
          <circle cx="80" cy="80" r="7" fill="#4a4a4a" stroke="#2a2a2a" strokeWidth="1" />
          <path d="M16 82 L12 85 M20 83 L18 88 M24 82 L26 87" stroke="#6a6a6a" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
          <path d="M84 82 L88 85 M80 83 L82 88 M76 82 L74 87" stroke="#6a6a6a" strokeWidth="1" strokeLinecap="round" opacity="0.6" />

          {/* Shield on left */}
          <ellipse cx="16" cy="72" rx="8" ry="12" fill="#5a3a2a" stroke="#3a2a1a" strokeWidth="1" />
          <path d="M18 62 L14 68" stroke="#8a6a5a" strokeWidth="2" opacity="0.5" />

          {/* Sword hilt at right hip */}
          <rect x="78" y="75" width="3" height="12" fill="#8a6a5a" />
          <circle cx="80" cy="87" r="2" fill="#d4af70" />
        </g>

        {/* Neck */}
        <rect x="42" y="42" width="16" height="14" rx="3" fill="#c9915a" stroke="#8a5030" strokeWidth="0.5" />

        {/* Head — noble, hardened */}
        <circle cx="50" cy="32" r="15" fill="#b8824a" />
        {/* Jaw shadow */}
        <ellipse cx="50" cy="38" rx="10" ry="4" fill="#8a5030" opacity="0.3" />

        {/* War paint marks on forehead — dark lines */}
        <path d="M42 20 L42 26" stroke="#1a0a0a" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M50 19 L50 25" stroke="#1a0a0a" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M58 20 L58 26" stroke="#1a0a0a" strokeWidth="1.5" strokeLinecap="round" />

        {/* Eyes — intense, sunken */}
        <ellipse cx="42" cy="31" rx="4" ry="3.5" fill="#1a0a0a" />
        <ellipse cx="58" cy="31" rx="4" ry="3.5" fill="#1a0a0a" />
        <circle cx="42.5" cy="30" r="1.2" fill="#fff" opacity="0.9" />
        <circle cx="58.5" cy="30" r="1.2" fill="#fff" opacity="0.9" />

        {/* Eye shadow — dark, battle-worn */}
        <ellipse cx="42" cy="32" rx="5.5" ry="4" fill="#4a2010" opacity="0.6" />
        <ellipse cx="58" cy="32" rx="5.5" ry="4" fill="#4a2010" opacity="0.6" />

        {/* Brows — heavy, angry, furrowed */}
        <path d="M44 23 Q51 20 57 23" stroke="#0a0a0a" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M64 23 Q69 20 76 23" stroke="#0a0a0a" strokeWidth="3" fill="none" strokeLinecap="round" />

        {/* Battle scars — multiple */}
        <path d="M46 32 L50 38" stroke="#6a3020" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
        <path d="M47 32 L51 38" stroke="#a05040" strokeWidth="0.7" strokeLinecap="round" opacity="0.4" />
        <path d="M52 25 L54 31" stroke="#6a3020" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <path d="M48 40 L46 45" stroke="#6a3020" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />

        {/* Nose — strong */}
        <path d="M49 33 Q48 38 49 40 L51 40 Q52 38 51 33" fill="#8a6540" opacity="0.7" />

        {/* Mouth — grim line */}
        <path d="M44 43 Q50 45 56 43" stroke="#3a1808" strokeWidth="1.2" fill="none" strokeLinecap="round" />

        {/* Beard stubble */}
        <circle cx="40" cy="44" r="0.7" fill="#2a1008" opacity="0.5" />
        <circle cx="45" cy="46" r="0.6" fill="#2a1008" opacity="0.5" />
        <circle cx="55" cy="46" r="0.6" fill="#2a1008" opacity="0.5" />
        <circle cx="60" cy="44" r="0.7" fill="#2a1008" opacity="0.5" />
      </g>
    </svg>
  );
}

// ─── QUEEN SERAPHINE ────────────────────────────────────────────────────
export function QueenSeraphine({ size = 120, glowColor = "#2d7a4a", glowRgb = "45,122,74" }) {
  return (
    <svg width={size} height={size * 1.8} viewBox="0 0 100 180" style={{ overflow: "visible", filter: `drop-shadow(0 6px 28px rgba(45,90,74,0.5)) drop-shadow(0 0 40px rgba(45,122,74,0.2))` }}>
      <defs>
        <radialGradient id="queenSkinGrad" cx="45%" cy="38%" r="55%">
          <stop offset="0%" stopColor="#f9e4d0" />
          <stop offset="50%" stopColor="#f0d4b8" />
          <stop offset="100%" stopColor="#dcc0a0" />
        </radialGradient>
        <linearGradient id="queenHairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4a3a2a" />
          <stop offset="50%" stopColor="#3a2a1a" />
          <stop offset="100%" stopColor="#1a0a00" />
        </linearGradient>
        <radialGradient id="greenDressGrad" cx="50%" cy="20%" r="80%">
          <stop offset="0%" stopColor="#6aaa8a" />
          <stop offset="50%" stopColor="#4a8a6a" />
          <stop offset="100%" stopColor="#2a6a4a" />
        </radialGradient>
      </defs>

      <style>{`
        @keyframes qBob      { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes qBreath   { 0%,100%{transform:scaleX(1)}    50%{transform:scaleX(1.015)} }
        @keyframes qHairSway { 0%,100%{transform:skewX(0deg) translateX(0)} 50%{transform:skewX(1.5deg) translateX(1px)} }
        @keyframes qJewel    { 0%,100%{opacity:0.8;filter:drop-shadow(0 0 3px #d4af70)} 50%{opacity:1;filter:drop-shadow(0 0 10px #d4af70)} }
        @keyframes qCrown    { 0%,100%{filter:drop-shadow(0 0 5px #d4af70)} 50%{filter:drop-shadow(0 0 16px #d4af70)} }
        @keyframes qEye      { 0%,100%{opacity:0.6} 50%{opacity:1} }
        .q-body  { animation: qBob 2.6s ease-in-out infinite; transform-origin: 50px 160px; }
        .q-torso { animation: qBreath 3s ease-in-out infinite; transform-origin: 50px 90px; }
        .q-hair  { animation: qHairSway 3.2s ease-in-out infinite; transform-origin: 50px 50px; }
        .q-crown { animation: qCrown 2.4s ease-in-out infinite; }
      `}</style>

      <g className="q-body">

        {/* ══ GOWN — Medieval green dress ══ */}
        {/* Outer gown — rich green */}
        <path d="M28 88 Q14 118 10 150 Q8 168 50 174 Q92 168 90 150 Q86 118 72 88 Z" fill="url(#greenDressGrad)" />
        {/* Inner layer highlight */}
        <path d="M33 88 Q22 115 20 148 Q22 162 50 167 Q78 162 80 148 Q78 115 67 88 Z" fill="#4a8a6a" opacity="0.4" />
        {/* Gold hem trim */}
        <path d="M10 150 Q50 174 90 150" stroke="#d4af37" strokeWidth="2.5" fill="none" opacity="0.9" />
        {/* Dress embroidery — subtle gold lines */}
        {[0,1,2,3].map(i => (
          <path key={i} d={`M${38+i*5} 95 Q${36+i*5} 140 ${37+i*5} 162`} stroke="#d4af37" strokeWidth="0.6" fill="none" opacity={0.15 + i*0.05} />
        ))}

        {/* ══ BODICE / CORSET ══ */}
        <g className="q-torso">
          {/* Main bodice — darker green */}
          <path d="M30 70 Q26 88 28 96 L72 96 Q74 88 70 70 Q60 64 50 63 Q40 64 30 70 Z" fill="#2a6a4a" />
          <path d="M33 72 Q30 88 32 94 L68 94 Q70 88 67 72 Q58 66 50 65 Q42 66 33 72 Z" fill="#4a8a6a" opacity="0.5" />

          {/* Bodice lacing — golden cord */}
          <path d="M46 70 Q44 80 46 90" stroke="#d4af37" strokeWidth="1" fill="none" opacity="0.8" />
          <path d="M54 70 Q56 80 54 90" stroke="#d4af37" strokeWidth="1" fill="none" opacity="0.8" />
          {[0,1,2,3].map(i => (
            <path key={i} d={`M46 ${72+i*6} Q50 ${74+i*6} 54 ${72+i*6}`} stroke="#d4af37" strokeWidth="0.8" fill="none" opacity="0.7" />
          ))}

          {/* Central ornament */}
          <circle cx="50" cy="76" r="4" fill="#1a4a3a" stroke="#d4af37" strokeWidth="1" />
          <circle cx="50" cy="76" r="2.5" fill="#d4af70" opacity="0.9" style={{ animation: "qJewel 2s ease-in-out infinite" }} />

          {/* ══ SLEEVES ══ — draped medieval */}
          {/* Left sleeve — flowing */}
          <path d="M30 70 Q18 72 12 82 Q8 92 12 98 Q18 102 24 96 Q22 86 28 80 Z" fill="#2a6a4a" />
          <path d="M12 98 Q18 102 24 96" stroke="#d4af37" strokeWidth="1.5" fill="none" opacity="0.8" />
          
          {/* Right sleeve */}
          <path d="M70 70 Q82 72 88 82 Q92 92 88 98 Q82 102 76 96 Q78 86 72 80 Z" fill="#2a6a4a" />
          <path d="M88 98 Q82 102 76 96" stroke="#d4af37" strokeWidth="1.5" fill="none" opacity="0.8" />

          {/* ══ HANDS ══ — elegant */}
          {/* Left hand */}
          <path d="M11 97 Q8 101 9 106 Q11 108 14 107 Q16 103 14 98 Z" fill="url(#queenSkinGrad)" />
          <path d="M10 102 Q8 100 7 104" stroke="#e8c0a0" strokeWidth="1" fill="none" strokeLinecap="round" />
          
          {/* Right hand */}
          <path d="M89 97 Q92 101 91 106 Q89 108 86 107 Q84 103 86 98 Z" fill="url(#queenSkinGrad)" />
          <path d="M90 102 Q92 100 93 104" stroke="#e8c0a0" strokeWidth="1" fill="none" strokeLinecap="round" />
          
          {/* Rings */}
          <circle cx="90" cy="103" r="2" fill="none" stroke="#d4af37" strokeWidth="1.2" opacity="0.9" />
          <circle cx="10" cy="104" r="2" fill="none" stroke="#d4af37" strokeWidth="1.2" opacity="0.9" />
        </g>

        {/* ══ NECK ══ */}
        <path d="M41 52 Q38 60 38 68 L62 68 Q62 60 59 52 Q54 48 50 48 Q46 48 41 52 Z" fill="url(#queenSkinGrad)" />
        {/* Collarbone shadow */}
        <path d="M38 66 Q50 70 62 66" stroke="#c09878" strokeWidth="0.8" fill="none" opacity="0.5" />

        {/* ══ NECKLACE — Gold chain with jewels ══ */}
        <path d="M32 66 Q40 72 50 70 Q60 72 68 66" stroke="#d4af37" strokeWidth="1.5" fill="none" opacity="0.9" />
        {/* Pendant jewels */}
        {[36,43,50,57,64].map((x,i) => (
          <circle key={i} cx={x} cy={i===2?73:70} r={i===2?2.5:1.5} fill={i===2?"#2d7a4a":i%2===0?"#d4af37":"#c0805a"} opacity={i===2?0.9:0.85} />
        ))}

        {/* ══ HEAD / FACE ══ */}
        {/* Head shape */}
        <ellipse cx="50" cy="38" rx="17" ry="19" fill="url(#queenSkinGrad)" />
        {/* Realistic face structure */}
        <ellipse cx="50" cy="50" rx="11" ry="5" fill="#c8956f" opacity="0.35" />
        {/* Cheeks — natural blush */}
        <ellipse cx="36" cy="43" rx="5.5" ry="3.5" fill="#e89a8a" opacity="0.22" />
        <ellipse cx="64" cy="43" rx="5.5" ry="3.5" fill="#e89a8a" opacity="0.22" />
        {/* Subtle jawline definition */}
        <path d="M34 48 Q50 55 66 48" stroke="#c8956f" strokeWidth="0.8" fill="none" opacity="0.3" />

        {/* ══ EYES ══ — expressive and realistic */}
        {/* Eye whites with subtle definition */}
        <ellipse cx="39" cy="36" rx="6.2" ry="4.8" fill="#faf8f5" />
        <ellipse cx="61" cy="36" rx="6.2" ry="4.8" fill="#faf8f5" />
        {/* Upper eyelid shadow for depth */}
        <ellipse cx="39" cy="33" rx="6.5" ry="2" fill="rgba(0,0,0,0.08)" />
        <ellipse cx="61" cy="33" rx="6.5" ry="2" fill="rgba(0,0,0,0.08)" />
        {/* Iris — rich emerald */}
        <circle cx="39" cy="37" r="4" fill="#4a8a6a" />
        <circle cx="61" cy="37" r="4" fill="#4a8a6a" />
        {/* Iris detail ring */}
        <circle cx="39" cy="37" r="3.8" fill="none" stroke="#2a6a4a" strokeWidth="0.5" opacity="0.6" />
        <circle cx="61" cy="37" r="3.8" fill="none" stroke="#2a6a4a" strokeWidth="0.5" opacity="0.6" />
        {/* Inner pupil */}
        <circle cx="39" cy="37" r="2" fill="#0a0a0a" />
        <circle cx="61" cy="37" r="2" fill="#0a0a0a" />
        {/* Realistic pupil shine — multiple light sources */}
        <circle cx="40.5" cy="35" r="1.2" fill="white" opacity="0.95" />
        <circle cx="39" cy="39" r="0.5" fill="white" opacity="0.4" />
        <circle cx="62.5" cy="35" r="1.2" fill="white" opacity="0.95" />
        <circle cx="61" cy="39" r="0.5" fill="white" opacity="0.4" />
        
        {/* Upper eyelid / lash line */}
        <path d="M33 33 Q39 31 45 33" stroke="#3a2a1a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M55 33 Q61 31 67 33" stroke="#3a2a1a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        
        {/* Lashes */}
        {[33,36,39,42,45].map((x,i) => <line key={i} x1={x} y1="33" x2={x-0.5+i*0.3} y2={29+i%2} stroke="#2a1a0a" strokeWidth="0.8" strokeLinecap="round" />)}
        {[55,58,61,64,67].map((x,i) => <line key={i} x1={x} y1="33" x2={x-0.5+i*0.3} y2={29+i%2} stroke="#2a1a0a" strokeWidth="0.8" strokeLinecap="round" />)}

        {/* Eyebrows — delicate, arched */}
        <path d="M31 28 Q36 24.5 42 27" stroke="#4a3a2a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M58 27 Q64 24.5 69 28" stroke="#4a3a2a" strokeWidth="1.6" fill="none" strokeLinecap="round" />

        {/* ══ NOSE ══ — refined */}
        <path d="M49 40 Q48.5 44 48.5 46.5 Q49.5 47.8 50.5 47 Q51.5 46 51 40" stroke="#b88860" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.8" />
        {/* Nostril shadows */}
        <ellipse cx="48" cy="47" rx="1.2" ry="1.2" fill="rgba(120,80,60,0.3)" />
        <ellipse cx="52" cy="47" rx="1.2" ry="1.2" fill="rgba(120,80,60,0.3)" />

        {/* ══ LIPS ══ — soft, natural rose */}
        {/* Upper lip with natural shape */}
        <path d="M40 51.5 Q43 49.5 46 50.5 Q48 48.8 50 49.5 Q52 48.8 54 50.5 Q57 49.5 60 51.5" fill="#d4708a" stroke="none" />
        {/* Upper lip texture */}
        <path d="M40 51.5 Q50 49.5 60 51.5" fill="#e48098" opacity="0.35" />
        {/* Lower lip fuller */}
        <path d="M40 51.5 Q43 55 50 56.5 Q57 55 60 51.5" fill="#d4708a" />
        {/* Lower lip shading */}
        <path d="M40 51.5 Q50 57 60 51.5" fill="#e48098" opacity="0.25" />
        {/* Realistic lip shine */}
        <path d="M43 52 Q50 54.5 57 52" stroke="rgba(255,200,220,0.6)" strokeWidth="0.8" fill="none" strokeLinecap="round" />

        {/* ══ HAIR ══ — voluminous, flowing locks ══ */}
        <g className="q-hair">
          {/* Top crown volume */}
          <path d="M30 18 Q26 12 24 6 Q36 2 50 1 Q64 2 76 6 Q74 12 70 18" fill="#3a2a1a" />
          <path d="M32 16 Q28 14 26 10 Q38 6 50 5 Q62 6 74 10 Q72 14 68 16" fill="#4a3a2a" opacity="0.6" />
          
          {/* Left side volume — wavy, realistic */}
          <path d="M32 20 Q18 26 14 40 Q10 56 12 70 Q9 80 12 92" stroke="url(#queenHairGrad)" strokeWidth="12" fill="none" strokeLinecap="round" />
          <path d="M32 20 Q20 30 18 48 Q15 64 18 78" stroke="#2a1a0a" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.4" />
          
          {/* Right side volume — matching */}
          <path d="M68 20 Q82 26 86 40 Q90 56 88 70 Q91 80 88 92" stroke="url(#queenHairGrad)" strokeWidth="12" fill="none" strokeLinecap="round" />
          <path d="M68 20 Q80 30 82 48 Q85 64 82 78" stroke="#2a1a0a" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.4" />
          
          {/* Long flowing tresses back */}
          <path d="M15 92 Q10 112 14 140 Q16 155 20 168" stroke="#3a2a1a" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M85 92 Q90 112 86 140 Q84 155 80 168" stroke="#3a2a1a" strokeWidth="8" fill="none" strokeLinecap="round" />
          
          {/* Inner shadow definition */}
          <path d="M32 22 Q25 35 23 50 Q21 65 24 80" stroke="#1a0a00" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.5" />
          <path d="M68 22 Q75 35 77 50 Q79 65 76 80" stroke="#1a0a00" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.5" />
          
          {/* Soft face-framing wisps */}
          <path d="M34 30 Q28 34 30 42" stroke="#3a2a1a" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.8" />
          <path d="M66 30 Q72 34 70 42" stroke="#3a2a1a" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.8" />
          <path d="M32 25 Q28 28 30 35" stroke="#4a3a2a" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
          <path d="M68 25 Q72 28 70 35" stroke="#4a3a2a" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
        </g>

        {/* ══ HEADPIECE — Ornate medieval circlet ══ */}
        <g className="q-crown">
          {/* Circlet band */}
          <ellipse cx="50" cy="20" rx="30" ry="6" fill="#a89070" stroke="#8a6a50" strokeWidth="1" />
          {/* Gold embellishments */}
          <circle cx="50" cy="16" r="4.5" fill="#d4af70" opacity="0.95" />
          <circle cx="35" cy="20" r="3" fill="#d4af70" opacity="0.8" />
          <circle cx="65" cy="20" r="3" fill="#d4af70" opacity="0.8" />
          
          {/* Circlet jewels */}
          <circle cx="50" cy="16" r="2" fill="#2d7a4a" opacity="0.9" />
          <circle cx="35" cy="20" r="1.5" fill="#8a5a4a" opacity="0.7" />
          <circle cx="65" cy="20" r="1.5" fill="#8a5a4a" opacity="0.7" />
          
          {/* Side strands flowing down from circlet */}
          <path d="M32 22 L30 38 M68 22 L70 38" stroke="#a89070" strokeWidth="1.5" opacity="0.6" />
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