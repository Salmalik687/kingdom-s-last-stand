// ─── LORD ALDRIC - Kliff Graymanne (Crimson Desert Warrior) ────────────────────────────────
export function LordAldric({ size = 100 }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 80 100" style={{ overflow: "visible" }}>
      <style>{`
        @keyframes aldricBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        .al-body { animation: aldricBob 2.4s ease-in-out infinite; transform-origin: 40px 85px; }
      `}</style>

      <g className="al-body">
        {/* Heavy armored chest plate - crimson warrior */}
        <rect x="16" y="42" width="48" height="38" rx="8" fill="#3a3a3a" stroke="#8a5a3a" strokeWidth="2"/>
        <path d="M24 45 L24 77 M40 44 L40 78 M56 45 L56 77" stroke="#8a5a3a" strokeWidth="1.5" opacity="0.6"/>
        
        {/* Massive shoulders - imposing presence */}
        <ellipse cx="14" cy="50" rx="8" ry="12" fill="#2a2a2a" stroke="#6a4a2a" strokeWidth="1.5"/>
        <ellipse cx="66" cy="50" rx="8" ry="12" fill="#2a2a2a" stroke="#6a4a2a" strokeWidth="1.5"/>
        
        {/* Thick armored arms - muscular */}
        <rect x="6" y="48" width="12" height="32" rx="5" fill="#3a3a3a" stroke="#6a4a2a" strokeWidth="1"/>
        <rect x="62" y="48" width="12" height="32" rx="5" fill="#3a3a3a" stroke="#6a4a2a" strokeWidth="1"/>
        
        {/* Iron gauntlets */}
        <circle cx="8" cy="82" r="7" fill="#4a4a4a" stroke="#8a7a6a" strokeWidth="1.5"/>
        <circle cx="72" cy="82" r="7" fill="#4a4a4a" stroke="#8a7a6a" strokeWidth="1.5"/>
        
        {/* Heavy neck guard */}
        <rect x="30" y="36" width="20" height="12" rx="3" fill="#3a3a3a" stroke="#6a4a2a" strokeWidth="1"/>
        
        {/* Head - scarred, weathered warrior */}
        <circle cx="40" cy="24" r="15" fill="#c8956f"/>
        
        {/* Silver/white streaked hair - aged warrior */}
        <path d="M23 12 Q23 5 40 3 Q57 5 57 12" fill="#4a4a4a"/>
        <path d="M25 10 Q22 12 20 16" stroke="#5a5a5a" strokeWidth="1.5" fill="none" opacity="0.7"/>
        <path d="M55 10 Q58 12 60 16" stroke="#5a5a5a" strokeWidth="1.5" fill="none" opacity="0.7"/>
        
        {/* Silver streaks in hair */}
        <path d="M32 8 Q30 12 29 20" stroke="#c0c0c0" strokeWidth="1" fill="none" opacity="0.7"/>
        <path d="M48 8 Q50 12 51 20" stroke="#c0c0c0" strokeWidth="1" fill="none" opacity="0.7"/>
        
        {/* Intense, piercing eyes - bloodshot */}
        <circle cx="31" cy="23" r="2.8" fill="#a01010"/>
        <circle cx="49" cy="23" r="2.8" fill="#a01010"/>
        <circle cx="32.5" cy="21" r="1.1" fill="#fff" opacity="0.9"/>
        <circle cx="50.5" cy="21" r="1.1" fill="#fff" opacity="0.9"/>
        
        {/* Heavy battle scars - multiple deep scars */}
        <path d="M45 22 Q47 26 46 32" stroke="#6a3030" strokeWidth="1.2" fill="none" opacity="0.7"/>
        <path d="M48 24 Q50 28 49 33" stroke="#6a3030" strokeWidth="1.2" fill="none" opacity="0.7"/>
        <path d="M44 18 Q46 20 45 24" stroke="#6a3030" strokeWidth="0.9" fill="none" opacity="0.6"/>
        
        {/* Thick, harsh eyebrows - aggressive */}
        <path d="M28 16 Q31 13 35 16" stroke="#2a1a0a" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M45 16 Q49 13 52 16" stroke="#2a1a0a" strokeWidth="2" fill="none" strokeLinecap="round"/>
        
        {/* Prominent nose - broken fighter's nose */}
        <path d="M40 22 Q39 25 40 32" stroke="#9a7050" strokeWidth="1.5"/>
        <path d="M37 24 L43 24" stroke="#9a7050" strokeWidth="0.9"/>
        
        {/* Grim determined mouth - clenched jaw */}
        <path d="M34 34 L46 34" stroke="#5a3020" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <line x1="35" y1="35" x2="45" y2="35" stroke="#3a2010" strokeWidth="0.7" opacity="0.6"/>
      </g>
    </svg>
  );
}

// ─── QUEEN SERAPHINE - Wise Ruler ────────────────────────────────────────────────────
export function QueenSeraphine({ size = 120 }) {
  return (
    <svg width={size} height={size * 1.6} viewBox="0 0 80 130" style={{ overflow: "visible" }}>
      <style>{`
        @keyframes serBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        @keyframes crownGlow { 0%,100%{filter:drop-shadow(0 0 4px #d4af70)} 50%{filter:drop-shadow(0 0 10px #d4af70)} }
        .ser-body { animation: serBob 2.6s ease-in-out infinite; transform-origin: 40px 110px; }
        .ser-crown { animation: crownGlow 2s ease-in-out infinite; }
      `}</style>

      <g className="ser-body">
        {/* Elegant gown - green silk */}
        <path d="M20 52 L18 105 L22 128 L40 130 L58 128 L62 105 L60 52 Z" fill="#2a6a4a"/>
        <path d="M25 52 L24 102 L26 124 L40 126 L54 124 L56 102 L55 52 Z" fill="#4a8a6a" opacity="0.5"/>
        
        {/* Gold embroidered belt */}
        <rect x="20" y="50" width="40" height="5" fill="#d4af70" opacity="0.7"/>
        
        {/* Sleeves - draped */}
        <path d="M20 55 Q15 60 12 75" stroke="#2a6a4a" strokeWidth="7" fill="none" strokeLinecap="round"/>
        <path d="M60 55 Q65 60 68 75" stroke="#2a6a4a" strokeWidth="7" fill="none" strokeLinecap="round"/>
        
        {/* Elegant hands */}
        <circle cx="10" cy="75" r="5" fill="#f0d4b8"/>
        <circle cx="70" cy="75" r="5" fill="#f0d4b8"/>
        
        {/* Neck */}
        <rect x="32" y="40" width="16" height="9" rx="3" fill="#f0d4b8"/>
        
        {/* Head - graceful */}
        <circle cx="40" cy="28" r="13" fill="#f0d4b8"/>
        
        {/* Long dark hair */}
        <path d="M27 18 Q27 11 40 9 Q53 11 53 18" fill="#3a2a1a"/>
        <path d="M25 24 Q20 35 18 50 Q16 60 20 70" stroke="#3a2a1a" strokeWidth="4" fill="none" strokeLinecap="round"/>
        <path d="M55 24 Q60 35 62 50 Q64 60 60 70" stroke="#3a2a1a" strokeWidth="4" fill="none" strokeLinecap="round"/>
        
        {/* Kind, wise eyes - green */}
        <ellipse cx="33" cy="27" rx="2.2" ry="2" fill="#4a8a6a"/>
        <ellipse cx="47" cy="27" rx="2.2" ry="2" fill="#4a8a6a"/>
        <circle cx="34.3" cy="25.5" r="0.8" fill="#fff" opacity="0.95"/>
        <circle cx="48.3" cy="25.5" r="0.8" fill="#fff" opacity="0.95"/>
        
        {/* Graceful eyebrows */}
        <path d="M31 22 Q33 20 36 22" stroke="#2a1a0a" strokeWidth="0.9" fill="none" strokeLinecap="round"/>
        <path d="M44 22 Q47 20 49 22" stroke="#2a1a0a" strokeWidth="0.9" fill="none" strokeLinecap="round"/>
        
        {/* Refined nose */}
        <line x1="40" y1="27" x2="40" y2="31" stroke="#d4a080" strokeWidth="0.8"/>
        
        {/* Gentle smile */}
        <path d="M35 33 Q40 34.5 45 33" stroke="#c8805a" strokeWidth="1" fill="none" strokeLinecap="round"/>
        
        {/* Royal Crown */}
        <g className="ser-crown">
          <ellipse cx="40" cy="12" rx="15" ry="4" fill="none" stroke="#d4af70" strokeWidth="1.5"/>
          <circle cx="40" cy="9" r="2.5" fill="#d4af70"/>
          <circle cx="29" cy="14" r="1.5" fill="#d4af70" opacity="0.9"/>
          <circle cx="51" cy="14" r="1.5" fill="#d4af70" opacity="0.9"/>
          <circle cx="40" cy="9" r="1.2" fill="#2d7a4a"/>
        </g>
      </g>
    </svg>
  );
}

// ─── MORRIGAN - Shadow Mage ────────────────────────────────────────────────────
export function Morrigan({ size = 100 }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 80 100" style={{ overflow: "visible" }}>
      <style>{`
        @keyframes morBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        .mor-body { animation: morBob 2.5s ease-in-out infinite; transform-origin: 40px 85px; }
      `}</style>

      <g className="mor-body">
        {/* Dark mystical robe */}
        <path d="M16 48 L14 100 L18 102 L40 104 L62 102 L66 100 L64 48 Z" fill="#2a0a3a"/>
        <path d="M20 48 L19 98 L40 102 L61 98 L60 48 Z" fill="#4a1a5a" opacity="0.5"/>
        
        {/* Purple arcane accents */}
        <rect x="28" y="52" width="24" height="2" fill="#7c3aed" opacity="0.6"/>
        
        {/* Flowing sleeves */}
        <ellipse cx="12" cy="55" rx="7" ry="24" fill="#2a0a3a"/>
        <ellipse cx="68" cy="55" rx="7" ry="24" fill="#2a0a3a"/>
        
        {/* Pale hands */}
        <circle cx="9" cy="80" r="5" fill="#e8d0f0"/>
        <circle cx="71" cy="80" r="5" fill="#e8d0f0"/>
        
        {/* Neck */}
        <rect x="31" y="39" width="18" height="10" rx="3" fill="#e8d0f0"/>
        
        {/* Head - pale, mysterious */}
        <circle cx="40" cy="26" r="13" fill="#e8d0f0"/>
        
        {/* Long dark hair */}
        <path d="M26 15 Q26 8 40 6 Q54 8 54 15" fill="#0a0a0a"/>
        <path d="M24 23 Q18 32 16 48" stroke="#0a0a0a" strokeWidth="4" fill="none" strokeLinecap="round"/>
        <path d="M56 23 Q62 32 64 48" stroke="#0a0a0a" strokeWidth="4" fill="none" strokeLinecap="round"/>
        
        {/* Mystical purple eyes */}
        <circle cx="32" cy="25" r="2.3" fill="#5a2a7a"/>
        <circle cx="48" cy="25" r="2.3" fill="#5a2a7a"/>
        <circle cx="33.3" cy="23.5" r="0.8" fill="#c8a0ff" opacity="0.95"/>
        <circle cx="49.3" cy="23.5" r="0.8" fill="#c8a0ff" opacity="0.95"/>
        
        {/* Sharp eyebrows - mysterious */}
        <path d="M29 20 Q32 18 35 21" stroke="#0a0a0a" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
        <path d="M45 21 Q48 18 51 20" stroke="#0a0a0a" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
        
        {/* Nose */}
        <line x1="40" y1="26" x2="40" y2="31" stroke="#d4a0c0" strokeWidth="0.9"/>
        
        {/* Neutral mysterious mouth */}
        <path d="M35 33 Q40 34 45 33" stroke="#a08090" strokeWidth="1" fill="none" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

// ─── KAEL - Ice Archer ────────────────────────────────────────────────────
export function Kael({ size = 100 }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 80 100" style={{ overflow: "visible" }}>
      <style>{`
        @keyframes kaelBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        .kael-body { animation: kaelBob 2.4s ease-in-out infinite; transform-origin: 40px 85px; }
      `}</style>

      <g className="kael-body">
        {/* Icy blue tunic */}
        <rect x="20" y="45" width="40" height="35" rx="8" fill="#3a8aaa" stroke="#5aa0ca" strokeWidth="1"/>
        
        {/* Icy crystalline patterns */}
        <line x1="32" y1="50" x2="32" y2="75" stroke="#5aa0ca" strokeWidth="0.8" opacity="0.4"/>
        <line x1="48" y1="50" x2="48" y2="75" stroke="#5aa0ca" strokeWidth="0.8" opacity="0.4"/>
        
        {/* Arms - with archery bracer detail */}
        <rect x="10" y="50" width="10" height="28" rx="4" fill="#d4a574"/>
        <rect x="60" y="50" width="10" height="28" rx="4" fill="#d4a574"/>
        
        {/* Hands */}
        <circle cx="11" cy="80" r="5" fill="#d4a574"/>
        <circle cx="69" cy="80" r="5" fill="#d4a574"/>
        
        {/* Neck */}
        <rect x="31" y="38" width="18" height="10" rx="3" fill="#d4a574"/>
        
        {/* Head */}
        <circle cx="40" cy="26" r="13" fill="#d4a574"/>
        
        {/* Light blonde/silver hair - wind-swept */}
        <path d="M26 16 Q26 10 40 8 Q54 10 54 16" fill="#a89070"/>
        <path d="M26 22 Q22 28 20 38" stroke="#a89070" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M54 22 Q58 28 60 38" stroke="#a89070" strokeWidth="3" fill="none" strokeLinecap="round"/>
        
        {/* Cool ice-blue eyes */}
        <circle cx="32" cy="25" r="2.2" fill="#3a8aaa"/>
        <circle cx="48" cy="25" r="2.2" fill="#3a8aaa"/>
        <circle cx="33.2" cy="23.5" r="0.8" fill="#a8d5ff" opacity="0.95"/>
        <circle cx="49.2" cy="23.5" r="0.8" fill="#a8d5ff" opacity="0.95"/>
        
        {/* Focused eyebrows */}
        <path d="M30 20 Q32 18 35 20.5" stroke="#5a4a3a" strokeWidth="1" fill="none" strokeLinecap="round"/>
        <path d="M45 20.5 Q48 18 50 20" stroke="#5a4a3a" strokeWidth="1" fill="none" strokeLinecap="round"/>
        
        {/* Nose */}
        <line x1="40" y1="26" x2="40" y2="31" stroke="#c8956f" strokeWidth="0.95"/>
        
        {/* Focused, determined mouth */}
        <path d="M36 33 Q40 34 44 33" stroke="#8a6840" strokeWidth="1" fill="none" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

// ─── AURORA - Sun Priestess ────────────────────────────────────────────────────
export function Aurora({ size = 100 }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 80 100" style={{ overflow: "visible" }}>
      <style>{`
        @keyframes auroraGlow { 0%,100%{filter:drop-shadow(0 0 6px #ffd60a)} 50%{filter:drop-shadow(0 0 14px #ffd60a)} }
        @keyframes auroraBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        .aurora-body { animation: auroraBob 2.5s ease-in-out infinite; transform-origin: 40px 85px; }
        .aurora-head { animation: auroraGlow 2s ease-in-out infinite; }
      `}</style>

      <g className="aurora-body">
        {/* Golden ceremonial tunic */}
        <rect x="20" y="45" width="40" height="35" rx="8" fill="#d4a847" stroke="#ffd60a" strokeWidth="1"/>
        
        {/* Radiant sun pattern on chest */}
        <circle cx="40" cy="58" r="4" fill="#ffd60a" opacity="0.6"/>
        {[0,1,2,3,4,5].map(i => (
          <line key={i} x1="40" y1="52" x2="40" y2="48" stroke="#ffd60a" strokeWidth="0.8" opacity="0.4" transform={`rotate(${i*60} 40 58)`}/>
        ))}
        
        {/* Arms */}
        <rect x="12" y="50" width="10" height="28" rx="4" fill="#f0d4a0"/>
        <rect x="58" y="50" width="10" height="28" rx="4" fill="#f0d4a0"/>
        
        {/* Hands */}
        <circle cx="13" cy="80" r="5" fill="#f0d4a0"/>
        <circle cx="67" cy="80" r="5" fill="#f0d4a0"/>
        
        {/* Neck */}
        <rect x="31" y="38" width="18" height="10" rx="3" fill="#f0d4a0"/>
        
        {/* Head - warm golden glow */}
        <circle cx="40" cy="26" r="13" fill="#f0d4a0" className="aurora-head"/>
        
        {/* Flowing golden blonde hair */}
        <path d="M26 15 Q26 8 40 6 Q54 8 54 15" fill="#d4a070"/>
        <path d="M24 22 Q20 32 18 45" stroke="#d4a070" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
        <path d="M56 22 Q60 32 62 45" stroke="#d4a070" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
        
        {/* Warm golden eyes */}
        <circle cx="32" cy="25" r="2.2" fill="#d4a070"/>
        <circle cx="48" cy="25" r="2.2" fill="#d4a070"/>
        <circle cx="33.2" cy="23.5" r="0.8" fill="#fff" opacity="0.98"/>
        <circle cx="49.2" cy="23.5" r="0.8" fill="#fff" opacity="0.98"/>
        
        {/* Warm, kind eyebrows */}
        <path d="M30 20 Q32 18 35 20" stroke="#8a6a4a" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
        <path d="M45 20 Q48 18 50 20" stroke="#8a6a4a" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
        
        {/* Nose */}
        <line x1="40" y1="26" x2="40" y2="31" stroke="#d4a080" strokeWidth="0.95"/>
        
        {/* Warm, welcoming smile */}
        <path d="M36 33 Q40 35 44 33" stroke="#c8705a" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
      </g>
    </svg>
  );
}