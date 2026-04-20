// ─── LORD ALDRIC - Scarred Veteran Warrior ────────────────────────────────────────────────────
export function LordAldric({ size = 100 }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 100 130" style={{ overflow: "visible" }}>
      <style>{`
        @keyframes aldricBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        .al-body { animation: aldricBob 2.4s ease-in-out infinite; transform-origin: 50px 110px; }
      `}</style>

      <g className="al-body">
        {/* Body - Heavy armor */}
        <ellipse cx="50" cy="70" rx="28" ry="35" fill="#3a3a3a" stroke="#6a4a2a" strokeWidth="2"/>
        <rect x="32" y="65" width="36" height="35" fill="#2a2a2a"/>
        
        {/* Shoulder pauldrons */}
        <ellipse cx="22" cy="60" rx="10" ry="18" fill="#4a4a4a" stroke="#6a4a2a" strokeWidth="1.5"/>
        <ellipse cx="78" cy="60" rx="10" ry="18" fill="#4a4a4a" stroke="#6a4a2a" strokeWidth="1.5"/>
        
        {/* Arms - muscular */}
        <ellipse cx="18" cy="75" rx="9" ry="28" fill="#c8956f" stroke="#8a6040" strokeWidth="1"/>
        <ellipse cx="82" cy="75" rx="9" ry="28" fill="#c8956f" stroke="#8a6040" strokeWidth="1"/>
        
        {/* Hands */}
        <circle cx="16" cy="110" r="6" fill="#c8956f"/>
        <circle cx="84" cy="110" r="6" fill="#c8956f"/>
        
        {/* Legs */}
        <rect x="38" y="100" width="8" height="22" rx="4" fill="#3a3a3a" stroke="#6a4a2a" strokeWidth="1"/>
        <rect x="54" y="100" width="8" height="22" rx="4" fill="#3a3a3a" stroke="#6a4a2a" strokeWidth="1"/>
        
        {/* Feet - worn boots */}
        <ellipse cx="42" cy="124" rx="6" ry="4" fill="#1a1a1a" stroke="#6a4a2a" strokeWidth="1"/>
        <ellipse cx="58" cy="124" rx="6" ry="4" fill="#1a1a1a" stroke="#6a4a2a" strokeWidth="1"/>
        
        {/* Neck */}
        <rect x="42" y="50" width="16" height="12" rx="4" fill="#c8956f"/>
        
        {/* Head - weathered warrior face */}
        <ellipse cx="50" cy="32" rx="16" ry="18" fill="#c8956f"/>
        
        {/* Hair - short, salt & pepper */}
        <path d="M32 18 Q32 8 50 6 Q68 8 68 18 Q68 24 65 28" fill="#4a4a4a"/>
        <path d="M35 14 Q30 18 28 30" stroke="#5a5a5a" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M65 14 Q70 18 72 30" stroke="#5a5a5a" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        
        {/* Silver streaks */}
        <path d="M42 10 L40 28" stroke="#d0d0d0" strokeWidth="1.2" opacity="0.8"/>
        <path d="M58 10 L60 28" stroke="#d0d0d0" strokeWidth="1.2" opacity="0.8"/>
        
        {/* Eyes - intense, bloodshot */}
        <ellipse cx="38" cy="30" rx="3" ry="3.5" fill="#8a1010"/>
        <ellipse cx="62" cy="30" rx="3" ry="3.5" fill="#8a1010"/>
        <circle cx="39" cy="28" r="1.2" fill="#fff" opacity="0.9"/>
        <circle cx="63" cy="28" r="1.2" fill="#fff" opacity="0.9"/>
        
        {/* Eyebrows - heavy, scarred */}
        <path d="M35 22 Q38 19 42 23" stroke="#2a1a0a" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M58 23 Q62 19 65 22" stroke="#2a1a0a" strokeWidth="2" fill="none" strokeLinecap="round"/>
        
        {/* Scars - deep battle marks */}
        <path d="M52 25 Q55 32 53 40" stroke="#6a3020" strokeWidth="1.5" fill="none" opacity="0.8"/>
        <path d="M56 26 Q59 34 57 42" stroke="#6a3020" strokeWidth="1.5" fill="none" opacity="0.8"/>
        <path d="M50 22 Q52 26 51 32" stroke="#6a2010" strokeWidth="1" fill="none" opacity="0.6"/>
        
        {/* Nose - broken fighter's nose */}
        <path d="M50 30 L50 40" stroke="#9a7050" strokeWidth="1.8"/>
        <ellipse cx="48" cy="35" rx="1.2" ry="1.5" fill="#7a5030"/>
        <ellipse cx="52" cy="35" rx="1.2" ry="1.5" fill="#7a5030"/>
        
        {/* Mouth - stern, clenched */}
        <path d="M42 45 L58 45" stroke="#4a2010" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M42 46 L58 46" stroke="#2a1010" strokeWidth="0.8" opacity="0.5"/>
        
        {/* Stubble/beard shadow */}
        <circle cx="35" cy="44" r="0.5" fill="#3a2a1a" opacity="0.4"/>
        <circle cx="38" cy="45" r="0.5" fill="#3a2a1a" opacity="0.4"/>
        <circle cx="62" cy="44" r="0.5" fill="#3a2a1a" opacity="0.4"/>
        <circle cx="65" cy="45" r="0.5" fill="#3a2a1a" opacity="0.4"/>
      </g>
    </svg>
  );
}

// ─── QUEEN SERAPHINE - Graceful Royal Leader ────────────────────────────────────────────────────
export function QueenSeraphine({ size = 120 }) {
  return (
    <svg width={size} height={size * 1.6} viewBox="0 0 100 160" style={{ overflow: "visible" }}>
      <style>{`
        @keyframes serBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes crownGlow { 0%,100%{filter:drop-shadow(0 0 4px #d4af70)} 50%{filter:drop-shadow(0 0 10px #d4af70)} }
        .ser-body { animation: serBob 2.6s ease-in-out infinite; transform-origin: 50px 140px; }
        .ser-crown { animation: crownGlow 2s ease-in-out infinite; }
      `}</style>

      <g className="ser-body">
        {/* Gown - elegant green silk */}
        <path d="M25 70 L22 135 L28 158 L50 160 L72 158 L78 135 L75 70 Z" fill="#2a6a4a" stroke="#1a4a2a" strokeWidth="1"/>
        
        {/* Gold belt accent */}
        <rect x="25" y="68" width="50" height="6" fill="#d4af70" opacity="0.8" stroke="#9a7f40" strokeWidth="0.5"/>
        
        {/* Sleeves - draped elegantly */}
        <path d="M25 72 Q15 80 12 100 L18 105 Q20 88 28 75 Z" fill="#2a6a4a" opacity="0.8"/>
        <path d="M75 72 Q85 80 88 100 L82 105 Q80 88 72 75 Z" fill="#2a6a4a" opacity="0.8"/>
        
        {/* Hands */}
        <ellipse cx="10" cy="100" rx="6" ry="7" fill="#f0d4b8"/>
        <ellipse cx="90" cy="100" rx="6" ry="7" fill="#f0d4b8"/>
        
        {/* Neck */}
        <rect x="40" y="56" width="20" height="14" rx="4" fill="#f0d4b8"/>
        
        {/* Head - serene, graceful */}
        <ellipse cx="50" cy="36" rx="17" ry="19" fill="#f0d4b8"/>
        
        {/* Long flowing hair - dark and glossy */}
        <path d="M31 20 Q31 10 50 8 Q69 10 69 20 Q69 26 66 32" fill="#3a2a1a"/>
        <path d="M28 28 Q22 40 20 65 Q18 80 24 95" stroke="#3a2a1a" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M72 28 Q78 40 80 65 Q82 80 76 95" stroke="#3a2a1a" strokeWidth="5" fill="none" strokeLinecap="round"/>
        
        {/* Kind, wise eyes - green */}
        <ellipse cx="38" cy="35" rx="3" ry="3.5" fill="#4a8a6a"/>
        <ellipse cx="62" cy="35" rx="3" ry="3.5" fill="#4a8a6a"/>
        <circle cx="39.5" cy="32" r="1.2" fill="#fff" opacity="0.95"/>
        <circle cx="63.5" cy="32" r="1.2" fill="#fff" opacity="0.95"/>
        
        {/* Graceful eyebrows */}
        <path d="M36 27 Q38 24 42 28" stroke="#2a1a0a" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        <path d="M58 28 Q62 24 64 27" stroke="#2a1a0a" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        
        {/* Refined nose */}
        <path d="M50 35 L50 44" stroke="#d4a080" strokeWidth="1"/>
        
        {/* Gentle, kind smile */}
        <path d="M42 46 Q50 48 58 46" stroke="#c8805a" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
        
        {/* Royal Crown */}
        <g className="ser-crown">
          <ellipse cx="50" cy="14" rx="18" ry="5" fill="none" stroke="#d4af70" strokeWidth="2"/>
          <circle cx="50" cy="10" r="3" fill="#d4af70"/>
          <circle cx="36" cy="16" r="2" fill="#d4af70" opacity="0.9"/>
          <circle cx="64" cy="16" r="2" fill="#d4af70" opacity="0.9"/>
          <circle cx="50" cy="10" r="1.5" fill="#2d7a4a"/>
        </g>
      </g>
    </svg>
  );
}

// ─── MORRIGAN - Dark Mystical Mage ────────────────────────────────────────────────────
export function Morrigan({ size = 100 }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 100 130" style={{ overflow: "visible" }}>
      <style>{`
        @keyframes morBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes morGlow { 0%,100%{opacity:0.6} 50%{opacity:1} }
        .mor-body { animation: morBob 2.5s ease-in-out infinite; transform-origin: 50px 110px; }
        .mor-aura { animation: morGlow 3s ease-in-out infinite; }
      `}</style>

      <g className="mor-body">
        {/* Dark mystical robes */}
        <path d="M20 65 L18 130 L22 133 L50 135 L78 133 L82 130 L80 65 Z" fill="#2a0a3a" stroke="#4a1a5a" strokeWidth="1.5"/>
        
        {/* Purple arcane trim */}
        <rect x="32" y="68" width="36" height="3" fill="#7c3aed" opacity="0.7"/>
        
        {/* Sleeves - tattered mystique */}
        <ellipse cx="18" cy="75" rx="8" ry="28" fill="#2a0a3a"/>
        <ellipse cx="82" cy="75" rx="8" ry="28" fill="#2a0a3a"/>
        
        {/* Hands - pale, mystical */}
        <ellipse cx="14" cy="105" rx="6" ry="7" fill="#e8d0f0"/>
        <ellipse cx="86" cy="105" rx="6" ry="7" fill="#e8d0f0"/>
        
        {/* Aura around hands */}
        <circle cx="14" cy="105" r="9" fill="#7c3aed" opacity="0.15" className="mor-aura"/>
        <circle cx="86" cy="105" r="9" fill="#7c3aed" opacity="0.15" className="mor-aura"/>
        
        {/* Neck */}
        <rect x="40" y="54" width="20" height="14" rx="4" fill="#e8d0f0"/>
        
        {/* Head - pale, mysterious */}
        <ellipse cx="50" cy="34" rx="17" ry="19" fill="#e8d0f0"/>
        
        {/* Long dark hair - straight and flowing */}
        <path d="M31 18 Q31 8 50 6 Q69 8 69 18" fill="#0a0a0a"/>
        <path d="M29 25 Q22 38 20 65" stroke="#0a0a0a" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M71 25 Q78 38 80 65" stroke="#0a0a0a" strokeWidth="5" fill="none" strokeLinecap="round"/>
        
        {/* Mystical purple eyes */}
        <ellipse cx="38" cy="33" rx="3.2" ry="3.5" fill="#5a2a7a"/>
        <ellipse cx="62" cy="33" rx="3.2" ry="3.5" fill="#5a2a7a"/>
        <circle cx="39.5" cy="30" r="1.2" fill="#c8a0ff" opacity="0.95"/>
        <circle cx="63.5" cy="30" r="1.2" fill="#c8a0ff" opacity="0.95"/>
        
        {/* Sharp eyebrows - mysterious */}
        <path d="M35 25 Q38 21 42 26" stroke="#0a0a0a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M58 26 Q62 21 65 25" stroke="#0a0a0a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        
        {/* Nose */}
        <path d="M50 33 L50 42" stroke="#d4a0c0" strokeWidth="1"/>
        
        {/* Neutral mysterious mouth */}
        <path d="M42 45 Q50 46 58 45" stroke="#a08090" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

// ─── KAEL - Cool Ice Archer ────────────────────────────────────────────────────
export function Kael({ size = 100 }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 100 130" style={{ overflow: "visible" }}>
      <style>{`
        @keyframes kaelBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes frostGlow { 0%,100%{filter:drop-shadow(0 0 6px #38bdf8)} 50%{filter:drop-shadow(0 0 14px #38bdf8)} }
        .kael-body { animation: kaelBob 2.4s ease-in-out infinite; transform-origin: 50px 110px; }
        .kael-head { animation: frostGlow 2.5s ease-in-out infinite; }
      `}</style>

      <g className="kael-body">
        {/* Icy blue tunic with frost accents */}
        <rect x="25" y="65" width="50" height="38" rx="10" fill="#0ea5e9" stroke="#06b6d4" strokeWidth="2"/>
        
        {/* Crystalline ice patterns - sharp geometric */}
        <line x1="38" y1="70" x2="38" y2="100" stroke="#67e8f9" strokeWidth="1.5" opacity="0.6"/>
        <line x1="62" y1="70" x2="62" y2="100" stroke="#67e8f9" strokeWidth="1.5" opacity="0.6"/>
        <polygon points="50,72 55,80 50,85 45,80" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.7"/>
        <polygon points="50,95 56,103 50,108 44,103" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.7"/>
        
        {/* Arms - lean archer build with frost shimmer */}
        <ellipse cx="20" cy="80" rx="8" ry="26" fill="#f5f3ff" stroke="#38bdf8" strokeWidth="1"/>
        <ellipse cx="80" cy="80" rx="8" ry="26" fill="#f5f3ff" stroke="#38bdf8" strokeWidth="1"/>
        
        {/* Hands - pale ice touched */}
        <ellipse cx="16" cy="108" r="6" fill="#e0f2fe"/>
        <ellipse cx="84" cy="108" r="6" fill="#e0f2fe"/>
        
        {/* Neck */}
        <rect x="40" y="54" width="20" height="14" rx="4" fill="#e0f2fe"/>
        
        {/* Head - pale complexion */}
        <ellipse cx="50" cy="34" rx="17" ry="19" fill="#e0f2fe" className="kael-head"/>
        
        {/* Icy silver hair - sharp, frost-like */}
        <path d="M31 18 Q31 8 50 6 Q69 8 69 18" fill="#a7f3d0"/>
        <path d="M29 26 Q24 36 22 55" stroke="#a7f3d0" strokeWidth="4" fill="none" strokeLinecap="round"/>
        <path d="M71 26 Q76 36 78 55" stroke="#a7f3d0" strokeWidth="4" fill="none" strokeLinecap="round"/>
        {/* Frost streaks */}
        <path d="M38 10 Q36 20 34 35" stroke="#cffafe" strokeWidth="1.5" opacity="0.7"/>
        <path d="M62 10 Q64 20 66 35" stroke="#cffafe" strokeWidth="1.5" opacity="0.7"/>
        
        {/* Piercing ice-blue eyes */}
        <ellipse cx="38" cy="33" rx="3" ry="3.5" fill="#06b6d4"/>
        <ellipse cx="62" cy="33" rx="3" ry="3.5" fill="#06b6d4"/>
        <circle cx="39.5" cy="30" r="1.3" fill="#e0f2fe" opacity="0.98"/>
        <circle cx="63.5" cy="30" r="1.3" fill="#e0f2fe" opacity="0.98"/>
        
        {/* Sharp, cold eyebrows */}
        <path d="M35 25 Q38 21 42 26" stroke="#0284c7" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        <path d="M58 26 Q62 21 65 25" stroke="#0284c7" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        
        {/* Nose - sharp and chiseled */}
        <path d="M50 33 L50 42" stroke="#06b6d4" strokeWidth="1.2"/>
        
        {/* Determined, cold mouth */}
        <path d="M42 45 Q50 47 58 45" stroke="#0284c7" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

// ─── AURORA - Warm Sun Priestess ────────────────────────────────────────────────────
export function Aurora({ size = 100 }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 100 130" style={{ overflow: "visible" }}>
      <style>{`
        @keyframes auroraGlow { 0%,100%{filter:drop-shadow(0 0 8px #f59e0b)} 50%{filter:drop-shadow(0 0 16px #f59e0b)} }
        @keyframes auroraBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes sunPulse { 0%,100%{r:5} 50%{r:6} }
        .aurora-body { animation: auroraBob 2.5s ease-in-out infinite; transform-origin: 50px 110px; }
        .aurora-head { animation: auroraGlow 2s ease-in-out infinite; }
        .sun-symbol { animation: sunPulse 1.5s ease-in-out infinite; }
      `}</style>

      <g className="aurora-body">
        {/* Golden ceremonial robes with sun theme */}
        <rect x="25" y="65" width="50" height="38" rx="10" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
        
        {/* Radiant sun symbol - glowing core */}
        <circle cx="50" cy="78" r="5" fill="#fef3c7" className="sun-symbol"/>
        <circle cx="50" cy="78" r="7" fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.6"/>
        {[0,1,2,3,4,5].map(i => (
          <line key={i} x1="50" y1="70" x2="50" y2="64" stroke="#fbbf24" strokeWidth="1.5" opacity="0.6" transform={`rotate(${i*60} 50 78)`}/>
        ))}
        
        {/* Arms - graceful priestess build */}
        <ellipse cx="18" cy="80" rx="9" ry="26" fill="#fef3c7" stroke="#d97706" strokeWidth="1"/>
        <ellipse cx="82" cy="80" rx="9" ry="26" fill="#fef3c7" stroke="#d97706" strokeWidth="1"/>
        
        {/* Hands - warm pale */}
        <ellipse cx="14" cy="108" r="6" fill="#fef3c7"/>
        <ellipse cx="86" cy="108" r="6" fill="#fef3c7"/>
        
        {/* Neck */}
        <rect x="40" y="54" width="20" height="14" rx="4" fill="#fef3c7"/>
        
        {/* Head - radiant warmth */}
        <ellipse cx="50" cy="34" rx="17" ry="19" fill="#fef3c7" className="aurora-head"/>
        
        {/* Long flowing golden hair - bright and vibrant */}
        <path d="M31 18 Q31 8 50 6 Q69 8 69 18" fill="#fbbf24"/>
        <path d="M29 26 Q24 36 22 55" stroke="#fbbf24" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
        <path d="M71 26 Q76 36 78 55" stroke="#fbbf24" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
        {/* Sun rays in hair */}
        <path d="M36 15 Q34 25 32 40" stroke="#fcd34d" strokeWidth="1" opacity="0.6"/>
        <path d="M64 15 Q66 25 68 40" stroke="#fcd34d" strokeWidth="1" opacity="0.6"/>
        
        {/* Bright golden eyes - warm and compassionate */}
        <ellipse cx="38" cy="33" rx="3" ry="3.5" fill="#f59e0b"/>
        <ellipse cx="62" cy="33" rx="3" ry="3.5" fill="#f59e0b"/>
        <circle cx="39.5" cy="30" r="1.3" fill="#fffbeb" opacity="0.99"/>
        <circle cx="63.5" cy="30" r="1.3" fill="#fffbeb" opacity="0.99"/>
        
        {/* Soft, kind eyebrows */}
        <path d="M35 25 Q38 21 42 26" stroke="#b45309" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
        <path d="M58 26 Q62 21 65 25" stroke="#b45309" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
        
        {/* Nose */}
        <path d="M50 33 L50 42" stroke="#f59e0b" strokeWidth="1"/>
        
        {/* Warm, healing smile */}
        <path d="M42 45 Q50 48 58 45" stroke="#d97706" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
      </g>
    </svg>
  );
}