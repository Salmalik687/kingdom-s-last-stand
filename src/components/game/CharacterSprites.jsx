// ─── LORD ALDRIC - Scarred Veteran Warrior ────────────────────────────────────────────────────
export function LordAldric({ size = 100 }) {
  const id = "aldric";
  return (
    <svg width={size * 1.4} height={size * 1.6} viewBox="0 0 140 160" style={{ overflow: "visible" }}>
      <defs>
        <radialGradient id={`${id}-portal`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5a7a9a" stopOpacity="0.9"/>
          <stop offset="50%" stopColor="#3a5a7a" stopOpacity="0.7"/>
          <stop offset="100%" stopColor="#1a2a4a" stopOpacity="0.3"/>
        </radialGradient>
        <filter id={`${id}-glow`}>
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <style>{`
        @keyframes al-walk-body { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes al-leg-l { 0%,100%{transform:rotate(-22deg)} 50%{transform:rotate(22deg)} }
        @keyframes al-leg-r { 0%,100%{transform:rotate(22deg)} 50%{transform:rotate(-22deg)} }
        @keyframes al-arm-l { 0%,100%{transform:rotate(18deg)} 50%{transform:rotate(-18deg)} }
        @keyframes al-arm-r { 0%,100%{transform:rotate(-18deg)} 50%{transform:rotate(18deg)} }
        @keyframes al-portal-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes al-portal-pulse { 0%,100%{opacity:0.7;transform:scale(1)} 50%{opacity:1;transform:scale(1.05)} }
        @keyframes al-portal-inner { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        .al-body { animation: al-walk-body 0.6s ease-in-out infinite; transform-origin: 70px 130px; }
        .al-leg-l { animation: al-leg-l 0.6s ease-in-out infinite; transform-origin: 58px 118px; }
        .al-leg-r { animation: al-leg-r 0.6s ease-in-out infinite; transform-origin: 82px 118px; }
        .al-arm-l { animation: al-arm-l 0.6s ease-in-out infinite; transform-origin: 42px 82px; }
        .al-arm-r { animation: al-arm-r 0.6s ease-in-out infinite; transform-origin: 98px 82px; }
        .al-portal { animation: al-portal-pulse 2s ease-in-out infinite; transform-origin: 70px 148px; }
        .al-portal-ring { animation: al-portal-spin 3s linear infinite; transform-origin: 70px 148px; }
        .al-portal-inner { animation: al-portal-inner 2s linear infinite; transform-origin: 70px 148px; }
      `}</style>

      {/* Portal */}
      <g className="al-portal">
        <ellipse cx="70" cy="148" rx="38" ry="10" fill={`url(#${id}-portal)`}/>
        <ellipse cx="70" cy="148" rx="38" ry="10" fill="none" stroke="#5a7a9a" strokeWidth="1.5" opacity="0.8"/>
      </g>
      <g className="al-portal-ring">
        {[0,45,90,135,180,225,270,315].map(a => (
          <ellipse key={a} cx={70 + 34 * Math.cos(a * Math.PI / 180)} cy={148 + 9 * Math.sin(a * Math.PI / 180)}
            rx="2.5" ry="1.5" fill="#5a7a9a" opacity="0.6"/>
        ))}
      </g>
      <g className="al-portal-inner">
        <ellipse cx="70" cy="148" rx="22" ry="6" fill="none" stroke="#8ab0d0" strokeWidth="1" opacity="0.5" strokeDasharray="4 3"/>
      </g>

      {/* Character body */}
      <g className="al-body">
        {/* Arms */}
        <g className="al-arm-l">
          <ellipse cx="42" cy="88" rx="9" ry="26" fill="#c8956f" stroke="#8a6040" strokeWidth="1"/>
          <circle cx="40" cy="118" r="6" fill="#c8956f"/>
        </g>
        <g className="al-arm-r">
          <ellipse cx="98" cy="88" rx="9" ry="26" fill="#c8956f" stroke="#8a6040" strokeWidth="1"/>
          <circle cx="100" cy="118" r="6" fill="#c8956f"/>
        </g>

        {/* Body - Heavy armor */}
        <ellipse cx="70" cy="83" rx="28" ry="35" fill="#3a3a3a" stroke="#6a4a2a" strokeWidth="2"/>
        <rect x="52" y="78" width="36" height="35" fill="#2a2a2a"/>
        {/* Shoulder pauldrons */}
        <ellipse cx="42" cy="73" rx="10" ry="18" fill="#4a4a4a" stroke="#6a4a2a" strokeWidth="1.5"/>
        <ellipse cx="98" cy="73" rx="10" ry="18" fill="#4a4a4a" stroke="#6a4a2a" strokeWidth="1.5"/>

        {/* Legs */}
        <g className="al-leg-l">
          <rect x="56" y="113" width="9" height="24" rx="4" fill="#3a3a3a" stroke="#6a4a2a" strokeWidth="1"/>
          <ellipse cx="60" cy="138" rx="7" ry="4" fill="#1a1a1a" stroke="#6a4a2a" strokeWidth="1"/>
        </g>
        <g className="al-leg-r">
          <rect x="75" y="113" width="9" height="24" rx="4" fill="#3a3a3a" stroke="#6a4a2a" strokeWidth="1"/>
          <ellipse cx="79" cy="138" rx="7" ry="4" fill="#1a1a1a" stroke="#6a4a2a" strokeWidth="1"/>
        </g>

        {/* Neck */}
        <rect x="62" y="62" width="16" height="12" rx="4" fill="#c8956f"/>
        {/* Head */}
        <ellipse cx="70" cy="44" rx="16" ry="18" fill="#c8956f"/>
        {/* Hair */}
        <path d="M52 30 Q52 20 70 18 Q88 20 88 30 Q88 36 85 40" fill="#4a4a4a"/>
        <path d="M55 26 Q50 30 48 42" stroke="#5a5a5a" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M85 26 Q90 30 92 42" stroke="#5a5a5a" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M62 22 L60 40" stroke="#d0d0d0" strokeWidth="1.2" opacity="0.8"/>
        <path d="M78 22 L80 40" stroke="#d0d0d0" strokeWidth="1.2" opacity="0.8"/>
        {/* Eyes */}
        <ellipse cx="58" cy="42" rx="3.5" ry="4" fill="#5a7a9a"/>
        <ellipse cx="82" cy="42" rx="3.5" ry="4" fill="#5a7a9a"/>
        <circle cx="59.5" cy="40" r="1.5" fill="#e0f0ff" opacity="0.95"/>
        <circle cx="83.5" cy="40" r="1.5" fill="#e0f0ff" opacity="0.95"/>
        {/* Eyebrows */}
        <path d="M55 34 Q58 31 62 35" stroke="#3a2010" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        <path d="M78 35 Q82 31 85 34" stroke="#3a2010" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        {/* Scar */}
        <path d="M72 38 Q74 44 72 51" stroke="#7a4020" strokeWidth="1" fill="none" opacity="0.5"/>
        {/* Nose */}
        <path d="M70 42 L70 52" stroke="#a88060" strokeWidth="1.5"/>
        {/* Mouth */}
        <path d="M62 57 Q70 59 78 57" stroke="#5a2a10" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
        {/* Beard */}
        <path d="M60 58 Q70 62 80 58" stroke="#4a3a2a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

// ─── QUEEN SERAPHINE - Graceful Royal Leader ────────────────────────────────────────────────────
export function QueenSeraphine({ size = 120 }) {
  const id = "seraphine";
  return (
    <svg width={size * 1.4} height={size * 1.6} viewBox="0 0 140 192" style={{ overflow: "visible" }}>
      <defs>
        <radialGradient id={`${id}-portal`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4a8a6a" stopOpacity="0.9"/>
          <stop offset="50%" stopColor="#2d7a4a" stopOpacity="0.7"/>
          <stop offset="100%" stopColor="#1a4a2a" stopOpacity="0.3"/>
        </radialGradient>
      </defs>
      <style>{`
        @keyframes ser-walk-body { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes ser-gown-l { 0%,100%{transform:skewX(-6deg)} 50%{transform:skewX(6deg)} }
        @keyframes ser-gown-r { 0%,100%{transform:skewX(6deg)} 50%{transform:skewX(-6deg)} }
        @keyframes ser-arm-l { 0%,100%{transform:rotate(14deg)} 50%{transform:rotate(-14deg)} }
        @keyframes ser-arm-r { 0%,100%{transform:rotate(-14deg)} 50%{transform:rotate(14deg)} }
        @keyframes crownGlow { 0%,100%{filter:drop-shadow(0 0 4px #d4af70)} 50%{filter:drop-shadow(0 0 12px #d4af70)} }
        @keyframes ser-portal-pulse { 0%,100%{opacity:0.7;transform:scale(1)} 50%{opacity:1;transform:scale(1.06)} }
        @keyframes ser-portal-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes ser-portal-inner { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        .ser-body { animation: ser-walk-body 0.7s ease-in-out infinite; transform-origin: 70px 160px; }
        .ser-arm-l { animation: ser-arm-l 0.7s ease-in-out infinite; transform-origin: 32px 100px; }
        .ser-arm-r { animation: ser-arm-r 0.7s ease-in-out infinite; transform-origin: 108px 100px; }
        .ser-gown-l { animation: ser-gown-l 0.7s ease-in-out infinite; transform-origin: 45px 148px; }
        .ser-gown-r { animation: ser-gown-r 0.7s ease-in-out infinite; transform-origin: 95px 148px; }
        .ser-crown { animation: crownGlow 2s ease-in-out infinite; }
        .ser-portal { animation: ser-portal-pulse 2.2s ease-in-out infinite; transform-origin: 70px 178px; }
        .ser-portal-ring { animation: ser-portal-spin 3.5s linear infinite; transform-origin: 70px 178px; }
        .ser-portal-inner { animation: ser-portal-inner 2.5s linear infinite; transform-origin: 70px 178px; }
      `}</style>

      {/* Portal - royal emerald green */}
      <g className="ser-portal">
        <ellipse cx="70" cy="178" rx="40" ry="11" fill={`url(#${id}-portal)`}/>
        <ellipse cx="70" cy="178" rx="40" ry="11" fill="none" stroke="#4a8a6a" strokeWidth="1.5" opacity="0.9"/>
      </g>
      <g className="ser-portal-ring">
        {[0,40,80,120,160,200,240,280,320].map(a => (
          <ellipse key={a} cx={70 + 36 * Math.cos(a * Math.PI / 180)} cy={178 + 10 * Math.sin(a * Math.PI / 180)}
            rx="2" ry="1.5" fill="#d4af70" opacity="0.7"/>
        ))}
      </g>
      <g className="ser-portal-inner">
        <ellipse cx="70" cy="178" rx="24" ry="7" fill="none" stroke="#a0d4b0" strokeWidth="1" opacity="0.5" strokeDasharray="5 3"/>
      </g>

      {/* Character body */}
      <g className="ser-body">
        {/* Arms */}
        <g className="ser-arm-l">
          <path d="M32 98 Q22 106 19 126 L26 131 Q27 114 36 104 Z" fill="#2a6a4a" opacity="0.85"/>
          <ellipse cx="19" cy="126" rx="6" ry="7" fill="#f0d4b8"/>
        </g>
        <g className="ser-arm-r">
          <path d="M108 98 Q118 106 121 126 L114 131 Q113 114 104 104 Z" fill="#2a6a4a" opacity="0.85"/>
          <ellipse cx="121" cy="126" rx="6" ry="7" fill="#f0d4b8"/>
        </g>

        {/* Gown */}
        <path d="M38 96 L34 162 L40 185 L70 188 L100 185 L106 162 L102 96 Z" fill="#2a6a4a" stroke="#1a4a2a" strokeWidth="1"/>
        {/* Gown leg swing panels */}
        <g className="ser-gown-l">
          <path d="M40 140 L35 185 L55 188 L60 140 Z" fill="#225a3a" opacity="0.8"/>
        </g>
        <g className="ser-gown-r">
          <path d="M80 140 L80 188 L105 185 L100 140 Z" fill="#225a3a" opacity="0.8"/>
        </g>
        {/* Gold belt */}
        <rect x="38" y="94" width="64" height="7" fill="#d4af70" opacity="0.85" stroke="#9a7f40" strokeWidth="0.5"/>

        {/* Neck */}
        <rect x="58" y="82" width="24" height="16" rx="4" fill="#f0d4b8"/>
        {/* Head */}
        <ellipse cx="70" cy="62" rx="17" ry="19" fill="#f0d4b8"/>
        {/* Hair */}
        <path d="M51 46 Q51 36 70 34 Q89 36 89 46 Q89 52 86 58" fill="#3a2a1a"/>
        <path d="M48 54 Q42 66 40 88" stroke="#3a2a1a" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M92 54 Q98 66 100 88" stroke="#3a2a1a" strokeWidth="5" fill="none" strokeLinecap="round"/>
        {/* Eyes */}
        <ellipse cx="58" cy="61" rx="3" ry="3.5" fill="#4a8a6a"/>
        <ellipse cx="82" cy="61" rx="3" ry="3.5" fill="#4a8a6a"/>
        <circle cx="59.5" cy="58" r="1.2" fill="#fff" opacity="0.95"/>
        <circle cx="83.5" cy="58" r="1.2" fill="#fff" opacity="0.95"/>
        {/* Eyebrows */}
        <path d="M56 53 Q58 50 62 54" stroke="#2a1a0a" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        <path d="M78 54 Q82 50 84 53" stroke="#2a1a0a" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        {/* Nose */}
        <path d="M70 61 L70 70" stroke="#d4a080" strokeWidth="1"/>
        {/* Smile */}
        <path d="M62 72 Q70 74 78 72" stroke="#c8805a" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
        {/* Crown */}
        <g className="ser-crown">
          <ellipse cx="70" cy="40" rx="18" ry="5" fill="none" stroke="#d4af70" strokeWidth="2"/>
          <circle cx="70" cy="36" r="3" fill="#d4af70"/>
          <circle cx="56" cy="42" r="2" fill="#d4af70" opacity="0.9"/>
          <circle cx="84" cy="42" r="2" fill="#d4af70" opacity="0.9"/>
          <circle cx="70" cy="36" r="1.5" fill="#2d7a4a"/>
        </g>
      </g>
    </svg>
  );
}

// ─── MORRIGAN - Dark Mystical Mage ────────────────────────────────────────────────────
export function Morrigan({ size = 100 }) {
  const id = "morrigan";
  return (
    <svg width={size * 1.4} height={size * 1.6} viewBox="0 0 140 160" style={{ overflow: "visible" }}>
      <defs>
        <radialGradient id={`${id}-portal`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#9b4dca" stopOpacity="0.95"/>
          <stop offset="50%" stopColor="#5a2a7a" stopOpacity="0.75"/>
          <stop offset="100%" stopColor="#1a0a2a" stopOpacity="0.3"/>
        </radialGradient>
        <filter id={`${id}-glow`}>
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <style>{`
        @keyframes mor-walk-body { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes mor-robe-l { 0%,100%{transform:skewX(-8deg)} 50%{transform:skewX(8deg)} }
        @keyframes mor-robe-r { 0%,100%{transform:skewX(8deg)} 50%{transform:skewX(-8deg)} }
        @keyframes mor-arm-l { 0%,100%{transform:rotate(16deg)} 50%{transform:rotate(-16deg)} }
        @keyframes mor-arm-r { 0%,100%{transform:rotate(-16deg)} 50%{transform:rotate(16deg)} }
        @keyframes morGlow { 0%,100%{opacity:0.5} 50%{opacity:1} }
        @keyframes mor-portal-pulse { 0%,100%{opacity:0.8;transform:scale(1)} 50%{opacity:1;transform:scale(1.08)} }
        @keyframes mor-portal-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes mor-portal-inner { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        .mor-body { animation: mor-walk-body 0.65s ease-in-out infinite; transform-origin: 70px 135px; }
        .mor-arm-l { animation: mor-arm-l 0.65s ease-in-out infinite; transform-origin: 38px 85px; }
        .mor-arm-r { animation: mor-arm-r 0.65s ease-in-out infinite; transform-origin: 102px 85px; }
        .mor-robe-l { animation: mor-robe-l 0.65s ease-in-out infinite; transform-origin: 48px 128px; }
        .mor-robe-r { animation: mor-robe-r 0.65s ease-in-out infinite; transform-origin: 92px 128px; }
        .mor-aura { animation: morGlow 2.5s ease-in-out infinite; }
        .mor-portal { animation: mor-portal-pulse 1.8s ease-in-out infinite; transform-origin: 70px 150px; }
        .mor-portal-ring { animation: mor-portal-spin 2.5s linear infinite; transform-origin: 70px 150px; }
        .mor-portal-inner { animation: mor-portal-inner 1.8s linear infinite; transform-origin: 70px 150px; }
      `}</style>

      {/* Portal - arcane void purple */}
      <g className="mor-portal" filter={`url(#${id}-glow)`}>
        <ellipse cx="70" cy="150" rx="42" ry="11" fill={`url(#${id}-portal)`}/>
        <ellipse cx="70" cy="150" rx="42" ry="11" fill="none" stroke="#9b4dca" strokeWidth="2" opacity="0.9"/>
      </g>
      <g className="mor-portal-ring">
        {[0,30,60,90,120,150,180,210,240,270,300,330].map(a => (
          <ellipse key={a} cx={70 + 38 * Math.cos(a * Math.PI / 180)} cy={150 + 10 * Math.sin(a * Math.PI / 180)}
            rx="2" ry="1.5" fill="#c084fc" opacity="0.7"/>
        ))}
      </g>
      <g className="mor-portal-inner">
        <ellipse cx="70" cy="150" rx="26" ry="7" fill="none" stroke="#e879f9" strokeWidth="1.5" opacity="0.6" strokeDasharray="4 4"/>
        <ellipse cx="70" cy="150" rx="14" ry="4" fill="#4a0a6a" opacity="0.4"/>
      </g>

      {/* Character body */}
      <g className="mor-body">
        {/* Arms */}
        <g className="mor-arm-l">
          <ellipse cx="38" cy="88" rx="8" ry="28" fill="#2a0a3a"/>
          <ellipse cx="34" cy="118" rx="6" ry="7" fill="#e8d0f0"/>
          <circle cx="34" cy="118" r="10" fill="#7c3aed" opacity="0.15" className="mor-aura"/>
        </g>
        <g className="mor-arm-r">
          <ellipse cx="102" cy="88" rx="8" ry="28" fill="#2a0a3a"/>
          <ellipse cx="106" cy="118" rx="6" ry="7" fill="#e8d0f0"/>
          <circle cx="106" cy="118" r="10" fill="#7c3aed" opacity="0.15" className="mor-aura"/>
        </g>

        {/* Robes */}
        <path d="M34 78 L30 143 L36 147 L70 149 L104 147 L110 143 L106 78 Z" fill="#2a0a3a" stroke="#4a1a5a" strokeWidth="1.5"/>
        <rect x="44" y="82" width="52" height="3" fill="#7c3aed" opacity="0.7"/>
        {/* Robe swing panels */}
        <g className="mor-robe-l">
          <path d="M36 120 L32 148 L55 150 L58 120 Z" fill="#1a0528" opacity="0.9"/>
        </g>
        <g className="mor-robe-r">
          <path d="M82 120 L85 150 L108 148 L104 120 Z" fill="#1a0528" opacity="0.9"/>
        </g>

        {/* Neck */}
        <rect x="58" y="64" width="24" height="16" rx="4" fill="#e8d0f0"/>
        {/* Head */}
        <ellipse cx="70" cy="46" rx="17" ry="19" fill="#e8d0f0"/>
        {/* Hair */}
        <path d="M51 30 Q51 20 70 18 Q89 20 89 30" fill="#0a0a0a"/>
        <path d="M49 37 Q42 50 40 78" stroke="#0a0a0a" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M91 37 Q98 50 100 78" stroke="#0a0a0a" strokeWidth="5" fill="none" strokeLinecap="round"/>
        {/* Eyes */}
        <ellipse cx="58" cy="45" rx="3.2" ry="3.5" fill="#5a2a7a"/>
        <ellipse cx="82" cy="45" rx="3.2" ry="3.5" fill="#5a2a7a"/>
        <circle cx="59.5" cy="42" r="1.2" fill="#c8a0ff" opacity="0.95"/>
        <circle cx="83.5" cy="42" r="1.2" fill="#c8a0ff" opacity="0.95"/>
        {/* Eyebrows */}
        <path d="M55 37 Q58 33 62 38" stroke="#0a0a0a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M78 38 Q82 33 85 37" stroke="#0a0a0a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* Nose */}
        <path d="M70 45 L70 54" stroke="#d4a0c0" strokeWidth="1"/>
        {/* Mouth */}
        <path d="M62 57 Q70 58 78 57" stroke="#a08090" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

// ─── KAEL - Cool Ice Archer ────────────────────────────────────────────────────
export function Kael({ size = 100 }) {
  const id = "kael";
  return (
    <svg width={size * 1.4} height={size * 1.6} viewBox="0 0 140 160" style={{ overflow: "visible" }}>
      <defs>
        <radialGradient id={`${id}-portal`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.95"/>
          <stop offset="50%" stopColor="#0284c7" stopOpacity="0.7"/>
          <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0.3"/>
        </radialGradient>
        <filter id={`${id}-glow`}>
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <style>{`
        @keyframes kael-walk-body { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes kael-leg-l { 0%,100%{transform:rotate(-24deg)} 50%{transform:rotate(24deg)} }
        @keyframes kael-leg-r { 0%,100%{transform:rotate(24deg)} 50%{transform:rotate(-24deg)} }
        @keyframes kael-arm-l { 0%,100%{transform:rotate(20deg)} 50%{transform:rotate(-20deg)} }
        @keyframes kael-arm-r { 0%,100%{transform:rotate(-20deg)} 50%{transform:rotate(20deg)} }
        @keyframes frostGlow { 0%,100%{filter:drop-shadow(0 0 6px #38bdf8)} 50%{filter:drop-shadow(0 0 14px #38bdf8)} }
        @keyframes kael-portal-pulse { 0%,100%{opacity:0.75;transform:scale(1)} 50%{opacity:1;transform:scale(1.07)} }
        @keyframes kael-portal-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes kael-portal-inner { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        @keyframes frost-flake { 0%,100%{opacity:0.4} 50%{opacity:0.9} }
        .kael-body { animation: kael-walk-body 0.55s ease-in-out infinite; transform-origin: 70px 130px; }
        .kael-leg-l { animation: kael-leg-l 0.55s ease-in-out infinite; transform-origin: 58px 115px; }
        .kael-leg-r { animation: kael-leg-r 0.55s ease-in-out infinite; transform-origin: 82px 115px; }
        .kael-arm-l { animation: kael-arm-l 0.55s ease-in-out infinite; transform-origin: 40px 82px; }
        .kael-arm-r { animation: kael-arm-r 0.55s ease-in-out infinite; transform-origin: 100px 82px; }
        .kael-head { animation: frostGlow 2.5s ease-in-out infinite; }
        .kael-portal { animation: kael-portal-pulse 1.6s ease-in-out infinite; transform-origin: 70px 148px; }
        .kael-portal-ring { animation: kael-portal-spin 2s linear infinite; transform-origin: 70px 148px; }
        .kael-portal-inner { animation: kael-portal-inner 1.5s linear infinite; transform-origin: 70px 148px; }
        .frost-flake { animation: frost-flake 1.2s ease-in-out infinite; }
      `}</style>

      {/* Portal - icy cyan frost */}
      <g className="kael-portal" filter={`url(#${id}-glow)`}>
        <ellipse cx="70" cy="148" rx="40" ry="11" fill={`url(#${id}-portal)`}/>
        <ellipse cx="70" cy="148" rx="40" ry="11" fill="none" stroke="#06b6d4" strokeWidth="2" opacity="0.9"/>
      </g>
      <g className="kael-portal-ring">
        {[0,45,90,135,180,225,270,315].map(a => (
          <text key={a} x={70 + 36 * Math.cos(a * Math.PI / 180)} y={148 + 10 * Math.sin(a * Math.PI / 180)}
            fontSize="8" fill="#67e8f9" opacity="0.8" textAnchor="middle" dominantBaseline="middle"
            transform={`rotate(${a} ${70 + 36 * Math.cos(a * Math.PI / 180)} ${148 + 10 * Math.sin(a * Math.PI / 180)})`}>
            ❄
          </text>
        ))}
      </g>
      <g className="kael-portal-inner">
        <ellipse cx="70" cy="148" rx="24" ry="6.5" fill="none" stroke="#e0f2fe" strokeWidth="1" opacity="0.5" strokeDasharray="3 3"/>
        <ellipse cx="70" cy="148" rx="12" ry="3.5" fill="#bae6fd" opacity="0.2"/>
      </g>

      {/* Character body */}
      <g className="kael-body">
        {/* Arms */}
        <g className="kael-arm-l">
          <ellipse cx="40" cy="85" rx="8" ry="26" fill="#f5f3ff" stroke="#38bdf8" strokeWidth="1"/>
          <ellipse cx="36" cy="113" r="6" fill="#e0f2fe"/>
        </g>
        <g className="kael-arm-r">
          <ellipse cx="100" cy="85" rx="8" ry="26" fill="#f5f3ff" stroke="#38bdf8" strokeWidth="1"/>
          <ellipse cx="104" cy="113" r="6" fill="#e0f2fe"/>
        </g>

        {/* Body tunic */}
        <rect x="44" y="78" width="52" height="38" rx="10" fill="#0ea5e9" stroke="#06b6d4" strokeWidth="2"/>
        <line x1="57" y1="83" x2="57" y2="113" stroke="#67e8f9" strokeWidth="1.5" opacity="0.6"/>
        <line x1="83" y1="83" x2="83" y2="113" stroke="#67e8f9" strokeWidth="1.5" opacity="0.6"/>
        <polygon points="70,85 75,93 70,98 65,93" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.7"/>

        {/* Legs */}
        <g className="kael-leg-l">
          <rect x="56" y="112" width="9" height="22" rx="4" fill="#0ea5e9" stroke="#06b6d4" strokeWidth="1"/>
          <ellipse cx="60" cy="135" rx="7" ry="4" fill="#0284c7"/>
        </g>
        <g className="kael-leg-r">
          <rect x="75" y="112" width="9" height="22" rx="4" fill="#0ea5e9" stroke="#06b6d4" strokeWidth="1"/>
          <ellipse cx="79" cy="135" rx="7" ry="4" fill="#0284c7"/>
        </g>

        {/* Neck */}
        <rect x="60" y="66" width="20" height="14" rx="4" fill="#e0f2fe"/>
        {/* Head */}
        <ellipse cx="70" cy="47" rx="17" ry="19" fill="#e0f2fe" className="kael-head"/>
        {/* Hair */}
        <path d="M51 31 Q51 21 70 19 Q89 21 89 31" fill="#a7f3d0"/>
        <path d="M49 38 Q44 48 42 68" stroke="#a7f3d0" strokeWidth="4" fill="none" strokeLinecap="round"/>
        <path d="M91 38 Q96 48 98 68" stroke="#a7f3d0" strokeWidth="4" fill="none" strokeLinecap="round"/>
        <path d="M58 23 Q56 33 54 48" stroke="#cffafe" strokeWidth="1.5" opacity="0.7"/>
        <path d="M82 23 Q84 33 86 48" stroke="#cffafe" strokeWidth="1.5" opacity="0.7"/>
        {/* Eyes */}
        <ellipse cx="58" cy="46" rx="3" ry="3.5" fill="#06b6d4"/>
        <ellipse cx="82" cy="46" rx="3" ry="3.5" fill="#06b6d4"/>
        <circle cx="59.5" cy="43" r="1.3" fill="#e0f2fe" opacity="0.98"/>
        <circle cx="83.5" cy="43" r="1.3" fill="#e0f2fe" opacity="0.98"/>
        {/* Eyebrows */}
        <path d="M55 38 Q58 34 62 39" stroke="#0284c7" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        <path d="M78 39 Q82 34 85 38" stroke="#0284c7" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        {/* Nose */}
        <path d="M70 46 L70 55" stroke="#06b6d4" strokeWidth="1.2"/>
        {/* Mouth */}
        <path d="M62 58 Q70 60 78 58" stroke="#0284c7" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

// ─── AURORA - Warm Sun Priestess ────────────────────────────────────────────────────
export function Aurora({ size = 100 }) {
  const id = "aurora";
  return (
    <svg width={size * 1.4} height={size * 1.6} viewBox="0 0 140 160" style={{ overflow: "visible" }}>
      <defs>
        <radialGradient id={`${id}-portal`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="1"/>
          <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.7"/>
          <stop offset="100%" stopColor="#b45309" stopOpacity="0.25"/>
        </radialGradient>
        <filter id={`${id}-glow`}>
          <feGaussianBlur stdDeviation="5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <style>{`
        @keyframes aurora-walk-body { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes aurora-leg-l { 0%,100%{transform:rotate(-20deg)} 50%{transform:rotate(20deg)} }
        @keyframes aurora-leg-r { 0%,100%{transform:rotate(20deg)} 50%{transform:rotate(-20deg)} }
        @keyframes aurora-arm-l { 0%,100%{transform:rotate(16deg)} 50%{transform:rotate(-16deg)} }
        @keyframes aurora-arm-r { 0%,100%{transform:rotate(-16deg)} 50%{transform:rotate(16deg)} }
        @keyframes auroraGlow { 0%,100%{filter:drop-shadow(0 0 8px #f59e0b)} 50%{filter:drop-shadow(0 0 18px #f59e0b)} }
        @keyframes sunPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.15)} }
        @keyframes aurora-portal-pulse { 0%,100%{opacity:0.8;transform:scale(1)} 50%{opacity:1;transform:scale(1.1)} }
        @keyframes aurora-portal-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes aurora-portal-inner { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        .aurora-body { animation: aurora-walk-body 0.62s ease-in-out infinite; transform-origin: 70px 130px; }
        .aurora-leg-l { animation: aurora-leg-l 0.62s ease-in-out infinite; transform-origin: 58px 114px; }
        .aurora-leg-r { animation: aurora-leg-r 0.62s ease-in-out infinite; transform-origin: 82px 114px; }
        .aurora-arm-l { animation: aurora-arm-l 0.62s ease-in-out infinite; transform-origin: 40px 83px; }
        .aurora-arm-r { animation: aurora-arm-r 0.62s ease-in-out infinite; transform-origin: 100px 83px; }
        .aurora-head { animation: auroraGlow 2s ease-in-out infinite; }
        .sun-symbol { animation: sunPulse 1.5s ease-in-out infinite; transform-origin: 70px 91px; }
        .aurora-portal { animation: aurora-portal-pulse 1.5s ease-in-out infinite; transform-origin: 70px 148px; }
        .aurora-portal-ring { animation: aurora-portal-spin 1.8s linear infinite; transform-origin: 70px 148px; }
        .aurora-portal-inner { animation: aurora-portal-inner 1.3s linear infinite; transform-origin: 70px 148px; }
      `}</style>

      {/* Portal - radiant golden sun */}
      <g className="aurora-portal" filter={`url(#${id}-glow)`}>
        <ellipse cx="70" cy="148" rx="42" ry="11" fill={`url(#${id}-portal)`}/>
        <ellipse cx="70" cy="148" rx="42" ry="11" fill="none" stroke="#fbbf24" strokeWidth="2" opacity="0.9"/>
      </g>
      <g className="aurora-portal-ring">
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((a, i) => (
          <ellipse key={a} cx={70 + 38 * Math.cos(a * Math.PI / 180)} cy={148 + 10 * Math.sin(a * Math.PI / 180)}
            rx={i % 2 === 0 ? 3 : 1.5} ry="2" fill={i % 2 === 0 ? "#fcd34d" : "#f59e0b"} opacity="0.8"/>
        ))}
      </g>
      <g className="aurora-portal-inner">
        <ellipse cx="70" cy="148" rx="26" ry="7" fill="none" stroke="#fef3c7" strokeWidth="1.5" opacity="0.6" strokeDasharray="5 2"/>
        <ellipse cx="70" cy="148" rx="14" ry="4" fill="#fef3c7" opacity="0.2"/>
      </g>

      {/* Character body */}
      <g className="aurora-body">
        {/* Arms */}
        <g className="aurora-arm-l">
          <ellipse cx="40" cy="86" rx="9" ry="26" fill="#fef3c7" stroke="#d97706" strokeWidth="1"/>
          <ellipse cx="36" cy="114" r="6" fill="#fef3c7"/>
        </g>
        <g className="aurora-arm-r">
          <ellipse cx="100" cy="86" rx="9" ry="26" fill="#fef3c7" stroke="#d97706" strokeWidth="1"/>
          <ellipse cx="104" cy="114" r="6" fill="#fef3c7"/>
        </g>

        {/* Robes */}
        <rect x="44" y="78" width="52" height="38" rx="10" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
        {/* Sun symbol */}
        <g className="sun-symbol">
          <circle cx="70" cy="91" r="5" fill="#fef3c7"/>
          <circle cx="70" cy="91" r="7" fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.6"/>
          {[0,1,2,3,4,5].map(i => (
            <line key={i} x1="70" y1="83" x2="70" y2="77" stroke="#fbbf24" strokeWidth="1.5" opacity="0.6"
              transform={`rotate(${i * 60} 70 91)`}/>
          ))}
        </g>

        {/* Legs */}
        <g className="aurora-leg-l">
          <rect x="56" y="112" width="9" height="22" rx="4" fill="#f59e0b" stroke="#d97706" strokeWidth="1"/>
          <ellipse cx="60" cy="135" rx="7" ry="4" fill="#b45309"/>
        </g>
        <g className="aurora-leg-r">
          <rect x="75" y="112" width="9" height="22" rx="4" fill="#f59e0b" stroke="#d97706" strokeWidth="1"/>
          <ellipse cx="79" cy="135" rx="7" ry="4" fill="#b45309"/>
        </g>

        {/* Neck */}
        <rect x="60" y="66" width="20" height="14" rx="4" fill="#fef3c7"/>
        {/* Head */}
        <ellipse cx="70" cy="47" rx="17" ry="19" fill="#fef3c7" className="aurora-head"/>
        {/* Hair */}
        <path d="M51 31 Q51 21 70 19 Q89 21 89 31" fill="#fbbf24"/>
        <path d="M49 38 Q44 48 42 68" stroke="#fbbf24" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
        <path d="M91 38 Q96 48 98 68" stroke="#fbbf24" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
        <path d="M56 24 Q54 34 52 49" stroke="#fcd34d" strokeWidth="1" opacity="0.6"/>
        <path d="M84 24 Q86 34 88 49" stroke="#fcd34d" strokeWidth="1" opacity="0.6"/>
        {/* Eyes */}
        <ellipse cx="58" cy="46" rx="3" ry="3.5" fill="#f59e0b"/>
        <ellipse cx="82" cy="46" rx="3" ry="3.5" fill="#f59e0b"/>
        <circle cx="59.5" cy="43" r="1.3" fill="#fffbeb" opacity="0.99"/>
        <circle cx="83.5" cy="43" r="1.3" fill="#fffbeb" opacity="0.99"/>
        {/* Eyebrows */}
        <path d="M55 38 Q58 34 62 39" stroke="#b45309" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
        <path d="M78 39 Q82 34 85 38" stroke="#b45309" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
        {/* Nose */}
        <path d="M70 46 L70 55" stroke="#f59e0b" strokeWidth="1"/>
        {/* Smile */}
        <path d="M62 58 Q70 61 78 58" stroke="#d97706" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
      </g>
    </svg>
  );
}