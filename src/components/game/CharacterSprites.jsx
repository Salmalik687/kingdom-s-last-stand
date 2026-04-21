// ─── SHARED SMOOTH ANIMATION STYLES ─────────────────────────────────────────
const SHARED_KEYFRAMES = `
  @keyframes smooth-bob   { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-7px)} }
  @keyframes smooth-breathe { 0%,100%{transform:scaleX(1)} 50%{transform:scaleX(1.03)} }
  @keyframes smooth-leg-l { 0%,100%{transform:rotate(-20deg)} 50%{transform:rotate(20deg)} }
  @keyframes smooth-leg-r { 0%,100%{transform:rotate(20deg)} 50%{transform:rotate(-20deg)} }
  @keyframes smooth-arm-l { 0%,100%{transform:rotate(16deg)} 50%{transform:rotate(-16deg)} }
  @keyframes smooth-arm-r { 0%,100%{transform:rotate(-16deg)} 50%{transform:rotate(16deg)} }
  @keyframes smooth-cape  { 0%,100%{transform:skewX(-5deg) scaleY(1)} 50%{transform:skewX(5deg) scaleY(1.03)} }
  @keyframes smooth-hair  { 0%,100%{transform:skewX(-3deg)} 50%{transform:skewX(3deg)} }
  @keyframes portal-pulse { 0%,100%{opacity:0.7;transform:scale(1)} 50%{opacity:1;transform:scale(1.06)} }
  @keyframes portal-spin  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes portal-spin-r{ from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
  @keyframes glow-pulse   { 0%,100%{filter:drop-shadow(0 0 6px currentColor)} 50%{filter:drop-shadow(0 0 18px currentColor)} }
  @keyframes sun-ray      { 0%,100%{transform:scale(1) rotate(0deg)} 50%{transform:scale(1.18) rotate(15deg)} }
  @keyframes crown-glow   { 0%,100%{filter:drop-shadow(0 0 4px #d4af70)} 50%{filter:drop-shadow(0 0 14px #ffd60a)} }
  @keyframes aura-flicker { 0%,100%{opacity:0.3;r:8px} 50%{opacity:0.7;r:13px} }
`;

// Timing helpers — all use cubic-bezier for smooth ease
const T_BODY = "1.1s cubic-bezier(0.45,0.05,0.55,0.95) infinite";
const T_LIMB = "1.1s cubic-bezier(0.45,0.05,0.55,0.95) infinite";
const T_LIMB_HALF = "1.1s cubic-bezier(0.45,0.05,0.55,0.95) 0.55s infinite";
const T_PORTAL = "2.4s ease-in-out infinite";
const T_PORTAL_SPIN = "4s linear infinite";
const T_SLOW_SPIN = "6s linear infinite";

// ─── LORD ALDRIC - Scarred Veteran Warrior ─────────────────────────────────
export function LordAldric({ size = 100 }) {
  const id = "aldric_sprite";
  return (
    <svg width={size * 1.4} height={size * 1.6} viewBox="0 0 140 160" style={{ overflow: "visible" }}>
      <defs>
        <radialGradient id={`${id}-portal`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5a7a9a" stopOpacity="0.9"/>
          <stop offset="50%" stopColor="#3a5a7a" stopOpacity="0.7"/>
          <stop offset="100%" stopColor="#1a2a4a" stopOpacity="0.3"/>
        </radialGradient>
      </defs>
      <style>{SHARED_KEYFRAMES}</style>

      {/* Portal */}
      <g style={{ animation: `portal-pulse ${T_PORTAL}`, transformOrigin: "70px 148px" }}>
        <ellipse cx="70" cy="148" rx="38" ry="10" fill={`url(#${id}-portal)`}/>
        <ellipse cx="70" cy="148" rx="38" ry="10" fill="none" stroke="#5a7a9a" strokeWidth="1.5" opacity="0.8"/>
      </g>
      <g style={{ animation: `portal-spin ${T_PORTAL_SPIN}`, transformOrigin: "70px 148px" }}>
        {[0,45,90,135,180,225,270,315].map(a => (
          <ellipse key={a} cx={70 + 34 * Math.cos(a * Math.PI / 180)} cy={148 + 9 * Math.sin(a * Math.PI / 180)}
            rx="2.5" ry="1.5" fill="#5a7a9a" opacity="0.6"/>
        ))}
      </g>
      <g style={{ animation: `portal-spin-r ${T_SLOW_SPIN}`, transformOrigin: "70px 148px" }}>
        <ellipse cx="70" cy="148" rx="22" ry="6" fill="none" stroke="#8ab0d0" strokeWidth="1" opacity="0.5" strokeDasharray="4 3"/>
      </g>

      {/* Body group with smooth bob */}
      <g style={{ animation: `smooth-bob ${T_BODY}`, transformOrigin: "70px 130px" }}>

        {/* Arms — offset half-period for natural gait */}
        <g style={{ animation: `smooth-arm-l ${T_LIMB}`, transformOrigin: "42px 82px" }}>
          <ellipse cx="42" cy="88" rx="9" ry="26" fill="#c8956f" stroke="#8a6040" strokeWidth="1"/>
          <rect x="31" y="110" width="9" height="11" rx="2" fill="#c8956f" stroke="#8a6040" strokeWidth="0.8"/>
          <rect x="30" y="107" width="3.5" height="7" rx="1.5" fill="#c8956f" stroke="#8a6040" strokeWidth="0.7"/>
          <rect x="34" y="106" width="3.5" height="7" rx="1.5" fill="#c8956f" stroke="#8a6040" strokeWidth="0.7"/>
          <rect x="38" y="107" width="3" height="6" rx="1.5" fill="#c8956f" stroke="#8a6040" strokeWidth="0.7"/>
          <rect x="27" y="112" width="3" height="5" rx="1.5" fill="#c8956f" stroke="#8a6040" strokeWidth="0.7"/>
        </g>
        <g style={{ animation: `smooth-arm-r ${T_LIMB}`, transformOrigin: "98px 82px" }}>
          <ellipse cx="98" cy="88" rx="9" ry="26" fill="#c8956f" stroke="#8a6040" strokeWidth="1"/>
          <rect x="100" y="110" width="9" height="11" rx="2" fill="#c8956f" stroke="#8a6040" strokeWidth="0.8"/>
          <rect x="101" y="107" width="3.5" height="7" rx="1.5" fill="#c8956f" stroke="#8a6040" strokeWidth="0.7"/>
          <rect x="105" y="106" width="3.5" height="7" rx="1.5" fill="#c8956f" stroke="#8a6040" strokeWidth="0.7"/>
          <rect x="98" y="107" width="3" height="6" rx="1.5" fill="#c8956f" stroke="#8a6040" strokeWidth="0.7"/>
          <rect x="109" y="112" width="3" height="5" rx="1.5" fill="#c8956f" stroke="#8a6040" strokeWidth="0.7"/>
        </g>

        {/* Body */}
        <ellipse cx="70" cy="83" rx="28" ry="35" fill="#3a3a3a" stroke="#6a4a2a" strokeWidth="2"
          style={{ animation: `smooth-breathe ${T_BODY}`, transformOrigin: "70px 83px" }}/>
        <rect x="52" y="78" width="36" height="35" fill="#2a2a2a"/>
        <ellipse cx="42" cy="73" rx="10" ry="18" fill="#4a4a4a" stroke="#6a4a2a" strokeWidth="1.5"/>
        <ellipse cx="98" cy="73" rx="10" ry="18" fill="#4a4a4a" stroke="#6a4a2a" strokeWidth="1.5"/>

        {/* Legs */}
        <g style={{ animation: `smooth-leg-l ${T_LIMB}`, transformOrigin: "60px 118px" }}>
          <rect x="56" y="113" width="9" height="24" rx="4" fill="#3a3a3a" stroke="#6a4a2a" strokeWidth="1"/>
          <ellipse cx="60" cy="138" rx="7" ry="4" fill="#1a1a1a" stroke="#6a4a2a" strokeWidth="1"/>
        </g>
        <g style={{ animation: `smooth-leg-r ${T_LIMB}`, transformOrigin: "80px 118px" }}>
          <rect x="75" y="113" width="9" height="24" rx="4" fill="#3a3a3a" stroke="#6a4a2a" strokeWidth="1"/>
          <ellipse cx="79" cy="138" rx="7" ry="4" fill="#1a1a1a" stroke="#6a4a2a" strokeWidth="1"/>
        </g>

        {/* Neck + Head */}
        <rect x="62" y="62" width="16" height="12" rx="4" fill="#c8956f"/>
        <ellipse cx="70" cy="44" rx="16" ry="18" fill="#c8956f"/>
        {/* Hair */}
        <path d="M52 30 Q52 20 70 18 Q88 20 88 30 Q88 36 85 40" fill="#4a4a4a"/>
        <g style={{ animation: `smooth-hair 1.8s ease-in-out infinite`, transformOrigin: "54px 38px" }}>
          <path d="M55 26 Q50 30 48 42" stroke="#5a5a5a" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        </g>
        <g style={{ animation: `smooth-hair 1.8s ease-in-out infinite reverse`, transformOrigin: "86px 38px" }}>
          <path d="M85 26 Q90 30 92 42" stroke="#5a5a5a" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        </g>
        {/* Face highlights */}
        <path d="M62 22 L60 40" stroke="#d0d0d0" strokeWidth="1.2" opacity="0.8"/>
        <path d="M78 22 L80 40" stroke="#d0d0d0" strokeWidth="1.2" opacity="0.8"/>
        <ellipse cx="58" cy="42" rx="3.5" ry="4" fill="#5a7a9a"/>
        <ellipse cx="82" cy="42" rx="3.5" ry="4" fill="#5a7a9a"/>
        <circle cx="59.5" cy="40" r="1.5" fill="#e0f0ff" opacity="0.95"/>
        <circle cx="83.5" cy="40" r="1.5" fill="#e0f0ff" opacity="0.95"/>
        <path d="M55 34 Q58 31 62 35" stroke="#3a2010" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        <path d="M78 35 Q82 31 85 34" stroke="#3a2010" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        <path d="M72 38 Q74 44 72 51" stroke="#7a4020" strokeWidth="1" fill="none" opacity="0.5"/>
        <path d="M70 42 L70 52" stroke="#a88060" strokeWidth="1.5"/>
        <path d="M62 57 Q70 59 78 57" stroke="#5a2a10" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
        <path d="M60 58 Q70 62 80 58" stroke="#4a3a2a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

// ─── QUEEN SERAPHINE - Graceful Royal Leader ───────────────────────────────
export function QueenSeraphine({ size = 120 }) {
  const id = "seraphine_sprite";
  return (
    <svg width={size * 1.4} height={size * 1.6} viewBox="0 0 140 192" style={{ overflow: "visible" }}>
      <defs>
        <radialGradient id={`${id}-portal`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4a8a6a" stopOpacity="0.9"/>
          <stop offset="50%" stopColor="#2d7a4a" stopOpacity="0.7"/>
          <stop offset="100%" stopColor="#1a4a2a" stopOpacity="0.3"/>
        </radialGradient>
      </defs>
      <style>{SHARED_KEYFRAMES}</style>

      {/* Portal */}
      <g style={{ animation: `portal-pulse 2.8s ease-in-out infinite`, transformOrigin: "70px 178px" }}>
        <ellipse cx="70" cy="178" rx="40" ry="11" fill={`url(#${id}-portal)`}/>
        <ellipse cx="70" cy="178" rx="40" ry="11" fill="none" stroke="#4a8a6a" strokeWidth="1.5" opacity="0.9"/>
      </g>
      <g style={{ animation: `portal-spin 5s linear infinite`, transformOrigin: "70px 178px" }}>
        {[0,40,80,120,160,200,240,280,320].map(a => (
          <ellipse key={a} cx={70 + 36 * Math.cos(a * Math.PI / 180)} cy={178 + 10 * Math.sin(a * Math.PI / 180)}
            rx="2" ry="1.5" fill="#d4af70" opacity="0.7"/>
        ))}
      </g>
      <g style={{ animation: `portal-spin-r 7s linear infinite`, transformOrigin: "70px 178px" }}>
        <ellipse cx="70" cy="178" rx="24" ry="7" fill="none" stroke="#a0d4b0" strokeWidth="1" opacity="0.5" strokeDasharray="5 3"/>
      </g>

      {/* Body */}
      <g style={{ animation: `smooth-bob 1.3s cubic-bezier(0.45,0.05,0.55,0.95) infinite`, transformOrigin: "70px 160px" }}>

        {/* Arms */}
        <g style={{ animation: `smooth-arm-l 1.3s cubic-bezier(0.45,0.05,0.55,0.95) infinite`, transformOrigin: "32px 100px" }}>
          <path d="M32 98 Q22 106 19 126 L26 131 Q27 114 36 104 Z" fill="#2a6a4a" opacity="0.85"/>
          <rect x="12" y="121" width="9" height="11" rx="2" fill="#f0d4b8" stroke="#c8a080" strokeWidth="0.8"/>
          <rect x="11" y="118" width="3.5" height="7" rx="1.5" fill="#f0d4b8"/>
          <rect x="15" y="117" width="3.5" height="7" rx="1.5" fill="#f0d4b8"/>
          <rect x="19" y="118" width="3" height="6" rx="1.5" fill="#f0d4b8"/>
          <rect x="8" y="123" width="3" height="5" rx="1.5" fill="#f0d4b8"/>
        </g>
        <g style={{ animation: `smooth-arm-r 1.3s cubic-bezier(0.45,0.05,0.55,0.95) infinite`, transformOrigin: "108px 100px" }}>
          <path d="M108 98 Q118 106 121 126 L114 131 Q113 114 104 104 Z" fill="#2a6a4a" opacity="0.85"/>
          <rect x="119" y="121" width="9" height="11" rx="2" fill="#f0d4b8" stroke="#c8a080" strokeWidth="0.8"/>
          <rect x="120" y="118" width="3.5" height="7" rx="1.5" fill="#f0d4b8"/>
          <rect x="124" y="117" width="3.5" height="7" rx="1.5" fill="#f0d4b8"/>
          <rect x="117" y="118" width="3" height="6" rx="1.5" fill="#f0d4b8"/>
          <rect x="128" y="123" width="3" height="5" rx="1.5" fill="#f0d4b8"/>
        </g>

        {/* Gown */}
        <path d="M38 96 L34 162 L40 185 L70 188 L100 185 L106 162 L102 96 Z" fill="#2a6a4a" stroke="#1a4a2a" strokeWidth="1"/>
        <g style={{ animation: `smooth-cape 1.3s ease-in-out infinite`, transformOrigin: "45px 148px" }}>
          <path d="M40 140 L35 185 L55 188 L60 140 Z" fill="#225a3a" opacity="0.8"/>
        </g>
        <g style={{ animation: `smooth-cape 1.3s ease-in-out infinite reverse`, transformOrigin: "95px 148px" }}>
          <path d="M80 140 L80 188 L105 185 L100 140 Z" fill="#225a3a" opacity="0.8"/>
        </g>
        <rect x="38" y="94" width="64" height="7" fill="#d4af70" opacity="0.85" stroke="#9a7f40" strokeWidth="0.5"/>

        {/* Neck + Head */}
        <rect x="58" y="82" width="24" height="16" rx="4" fill="#f0d4b8"/>
        <ellipse cx="70" cy="62" rx="17" ry="19" fill="#f0d4b8"/>
        <path d="M51 46 Q51 36 70 34 Q89 36 89 46 Q89 52 86 58" fill="#3a2a1a"/>
        <g style={{ animation: `smooth-hair 2s ease-in-out infinite`, transformOrigin: "44px 70px" }}>
          <path d="M48 54 Q42 66 40 88" stroke="#3a2a1a" strokeWidth="5" fill="none" strokeLinecap="round"/>
        </g>
        <g style={{ animation: `smooth-hair 2s ease-in-out infinite reverse`, transformOrigin: "96px 70px" }}>
          <path d="M92 54 Q98 66 100 88" stroke="#3a2a1a" strokeWidth="5" fill="none" strokeLinecap="round"/>
        </g>
        <ellipse cx="58" cy="61" rx="3" ry="3.5" fill="#4a8a6a"/>
        <ellipse cx="82" cy="61" rx="3" ry="3.5" fill="#4a8a6a"/>
        <circle cx="59.5" cy="58" r="1.2" fill="#fff" opacity="0.95"/>
        <circle cx="83.5" cy="58" r="1.2" fill="#fff" opacity="0.95"/>
        <path d="M56 53 Q58 50 62 54" stroke="#2a1a0a" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        <path d="M78 54 Q82 50 84 53" stroke="#2a1a0a" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        <path d="M70 61 L70 70" stroke="#d4a080" strokeWidth="1"/>
        <path d="M62 72 Q70 74 78 72" stroke="#c8805a" strokeWidth="1.3" fill="none" strokeLinecap="round"/>

        {/* Crown */}
        <g style={{ animation: `crown-glow 2.2s ease-in-out infinite` }}>
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

// ─── MORRIGAN - Dark Mystical Mage ─────────────────────────────────────────
export function Morrigan({ size = 100 }) {
  const id = "morrigan_sprite";
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
      <style>{SHARED_KEYFRAMES + `
        @keyframes mor-orb { 0%,100%{r:8;opacity:0.25} 50%{r:13;opacity:0.55} }
      `}</style>

      {/* Portal */}
      <g filter={`url(#${id}-glow)`} style={{ animation: `portal-pulse 2s ease-in-out infinite`, transformOrigin: "70px 150px" }}>
        <ellipse cx="70" cy="150" rx="42" ry="11" fill={`url(#${id}-portal)`}/>
        <ellipse cx="70" cy="150" rx="42" ry="11" fill="none" stroke="#9b4dca" strokeWidth="2" opacity="0.9"/>
      </g>
      <g style={{ animation: `portal-spin 3s linear infinite`, transformOrigin: "70px 150px" }}>
        {[0,30,60,90,120,150,180,210,240,270,300,330].map(a => (
          <ellipse key={a} cx={70 + 38 * Math.cos(a * Math.PI / 180)} cy={150 + 10 * Math.sin(a * Math.PI / 180)}
            rx="2" ry="1.5" fill="#c084fc" opacity="0.7"/>
        ))}
      </g>
      <g style={{ animation: `portal-spin-r 2.2s linear infinite`, transformOrigin: "70px 150px" }}>
        <ellipse cx="70" cy="150" rx="26" ry="7" fill="none" stroke="#e879f9" strokeWidth="1.5" opacity="0.6" strokeDasharray="4 4"/>
        <ellipse cx="70" cy="150" rx="14" ry="4" fill="#4a0a6a" opacity="0.4"/>
      </g>

      {/* Body */}
      <g style={{ animation: `smooth-bob 1.15s cubic-bezier(0.45,0.05,0.55,0.95) infinite`, transformOrigin: "70px 135px" }}>

        {/* Arms */}
        <g style={{ animation: `smooth-arm-l 1.15s cubic-bezier(0.45,0.05,0.55,0.95) infinite`, transformOrigin: "38px 85px" }}>
          <ellipse cx="38" cy="88" rx="8" ry="28" fill="#2a0a3a"/>
          <rect x="27" y="113" width="9" height="11" rx="2" fill="#e8d0f0" stroke="#9b4dca" strokeWidth="0.8"/>
          <rect x="26" y="110" width="3.5" height="7" rx="1.5" fill="#e8d0f0"/>
          <rect x="30" y="109" width="3.5" height="7" rx="1.5" fill="#e8d0f0"/>
          <rect x="34" y="110" width="3" height="6" rx="1.5" fill="#e8d0f0"/>
          <rect x="23" y="115" width="3" height="5" rx="1.5" fill="#e8d0f0"/>
          {/* Magic orb */}
          <circle cx="31" cy="118" r="9" fill="#7c3aed" style={{ animation: `mor-orb 1.8s ease-in-out infinite` }}/>
        </g>
        <g style={{ animation: `smooth-arm-r 1.15s cubic-bezier(0.45,0.05,0.55,0.95) infinite`, transformOrigin: "102px 85px" }}>
          <ellipse cx="102" cy="88" rx="8" ry="28" fill="#2a0a3a"/>
          <rect x="104" y="113" width="9" height="11" rx="2" fill="#e8d0f0" stroke="#9b4dca" strokeWidth="0.8"/>
          <rect x="105" y="110" width="3.5" height="7" rx="1.5" fill="#e8d0f0"/>
          <rect x="109" y="109" width="3.5" height="7" rx="1.5" fill="#e8d0f0"/>
          <rect x="102" y="110" width="3" height="6" rx="1.5" fill="#e8d0f0"/>
          <rect x="113" y="115" width="3" height="5" rx="1.5" fill="#e8d0f0"/>
          <circle cx="109" cy="118" r="9" fill="#7c3aed" style={{ animation: `mor-orb 1.8s ease-in-out 0.9s infinite` }}/>
        </g>

        {/* Robes */}
        <path d="M34 78 L30 143 L36 147 L70 149 L104 147 L110 143 L106 78 Z" fill="#2a0a3a" stroke="#4a1a5a" strokeWidth="1.5"/>
        <rect x="44" y="82" width="52" height="3" fill="#7c3aed" opacity="0.7"/>
        <g style={{ animation: `smooth-cape 1.15s ease-in-out infinite`, transformOrigin: "48px 128px" }}>
          <path d="M36 120 L32 148 L55 150 L58 120 Z" fill="#1a0528" opacity="0.9"/>
        </g>
        <g style={{ animation: `smooth-cape 1.15s ease-in-out infinite reverse`, transformOrigin: "92px 128px" }}>
          <path d="M82 120 L85 150 L108 148 L104 120 Z" fill="#1a0528" opacity="0.9"/>
        </g>

        {/* Neck + Head */}
        <rect x="58" y="64" width="24" height="16" rx="4" fill="#e8d0f0"/>
        <ellipse cx="70" cy="46" rx="17" ry="19" fill="#e8d0f0"/>
        <path d="M51 30 Q51 20 70 18 Q89 20 89 30" fill="#0a0a0a"/>
        <g style={{ animation: `smooth-hair 2.2s ease-in-out infinite`, transformOrigin: "44px 60px" }}>
          <path d="M49 37 Q42 50 40 78" stroke="#0a0a0a" strokeWidth="5" fill="none" strokeLinecap="round"/>
        </g>
        <g style={{ animation: `smooth-hair 2.2s ease-in-out infinite reverse`, transformOrigin: "96px 60px" }}>
          <path d="M91 37 Q98 50 100 78" stroke="#0a0a0a" strokeWidth="5" fill="none" strokeLinecap="round"/>
        </g>
        <ellipse cx="58" cy="45" rx="3.2" ry="3.5" fill="#5a2a7a"/>
        <ellipse cx="82" cy="45" rx="3.2" ry="3.5" fill="#5a2a7a"/>
        <circle cx="59.5" cy="42" r="1.2" fill="#c8a0ff" opacity="0.95"/>
        <circle cx="83.5" cy="42" r="1.2" fill="#c8a0ff" opacity="0.95"/>
        <path d="M55 37 Q58 33 62 38" stroke="#0a0a0a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M78 38 Q82 33 85 37" stroke="#0a0a0a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M70 45 L70 54" stroke="#d4a0c0" strokeWidth="1"/>
        <path d="M62 57 Q70 58 78 57" stroke="#a08090" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

// ─── KAEL - Cool Ice Archer ────────────────────────────────────────────────
export function Kael({ size = 100 }) {
  const id = "kael_sprite";
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
      <style>{SHARED_KEYFRAMES + `
        @keyframes frost-head { 0%,100%{filter:drop-shadow(0 0 6px #38bdf8)} 50%{filter:drop-shadow(0 0 16px #38bdf8)} }
        @keyframes frost-flake { 0%,100%{opacity:0.4;transform:scale(0.9)} 50%{opacity:1;transform:scale(1.1)} }
      `}</style>

      {/* Portal */}
      <g filter={`url(#${id}-glow)`} style={{ animation: `portal-pulse 1.9s ease-in-out infinite`, transformOrigin: "70px 148px" }}>
        <ellipse cx="70" cy="148" rx="40" ry="11" fill={`url(#${id}-portal)`}/>
        <ellipse cx="70" cy="148" rx="40" ry="11" fill="none" stroke="#06b6d4" strokeWidth="2" opacity="0.9"/>
      </g>
      <g style={{ animation: `portal-spin 2.5s linear infinite`, transformOrigin: "70px 148px" }}>
        {[0,45,90,135,180,225,270,315].map(a => (
          <text key={a} x={70 + 36 * Math.cos(a * Math.PI / 180)} y={148 + 10 * Math.sin(a * Math.PI / 180)}
            fontSize="8" fill="#67e8f9" opacity="0.8" textAnchor="middle" dominantBaseline="middle"
            transform={`rotate(${a} ${70 + 36 * Math.cos(a * Math.PI / 180)} ${148 + 10 * Math.sin(a * Math.PI / 180)})`}>❄</text>
        ))}
      </g>
      <g style={{ animation: `portal-spin-r 1.8s linear infinite`, transformOrigin: "70px 148px" }}>
        <ellipse cx="70" cy="148" rx="24" ry="6.5" fill="none" stroke="#e0f2fe" strokeWidth="1" opacity="0.5" strokeDasharray="3 3"/>
        <ellipse cx="70" cy="148" rx="12" ry="3.5" fill="#bae6fd" opacity="0.2"/>
      </g>

      {/* Body */}
      <g style={{ animation: `smooth-bob 0.95s cubic-bezier(0.45,0.05,0.55,0.95) infinite`, transformOrigin: "70px 130px" }}>

        {/* Arms */}
        <g style={{ animation: `smooth-arm-l 0.95s cubic-bezier(0.45,0.05,0.55,0.95) infinite`, transformOrigin: "40px 82px" }}>
          <ellipse cx="40" cy="85" rx="8" ry="26" fill="#0ea5e9" stroke="#38bdf8" strokeWidth="1.5"/>
          <rect x="29" y="108" width="10" height="11" rx="3" fill="#0ea5e9" stroke="#67e8f9" strokeWidth="1.2"/>
          <rect x="28" y="105" width="4" height="7" rx="2" fill="#38bdf8"/>
          <rect x="32" y="104" width="4" height="7" rx="2" fill="#38bdf8"/>
          <rect x="36" y="105" width="3.5" height="6" rx="2" fill="#38bdf8"/>
          <rect x="25" y="111" width="3.5" height="5" rx="2" fill="#38bdf8"/>
          <polygon points="34,103 36,99 38,103" fill="#e0f2fe" opacity="0.9"/>
        </g>
        <g style={{ animation: `smooth-arm-r 0.95s cubic-bezier(0.45,0.05,0.55,0.95) infinite`, transformOrigin: "100px 82px" }}>
          <ellipse cx="100" cy="85" rx="8" ry="26" fill="#0ea5e9" stroke="#38bdf8" strokeWidth="1.5"/>
          <rect x="101" y="108" width="10" height="11" rx="3" fill="#0ea5e9" stroke="#67e8f9" strokeWidth="1.2"/>
          <rect x="102" y="105" width="4" height="7" rx="2" fill="#38bdf8"/>
          <rect x="106" y="104" width="4" height="7" rx="2" fill="#38bdf8"/>
          <rect x="110" y="105" width="3.5" height="6" rx="2" fill="#38bdf8"/>
          <rect x="98" y="111" width="3.5" height="5" rx="2" fill="#38bdf8"/>
          <polygon points="106,103 108,99 110,103" fill="#e0f2fe" opacity="0.9"/>
        </g>

        {/* Body */}
        <rect x="44" y="78" width="52" height="38" rx="10" fill="#0ea5e9" stroke="#06b6d4" strokeWidth="2"/>
        <line x1="57" y1="83" x2="57" y2="113" stroke="#67e8f9" strokeWidth="1.5" opacity="0.6"/>
        <line x1="83" y1="83" x2="83" y2="113" stroke="#67e8f9" strokeWidth="1.5" opacity="0.6"/>
        <polygon points="70,85 75,93 70,98 65,93" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.7"/>

        {/* Legs */}
        <g style={{ animation: `smooth-leg-l 0.95s cubic-bezier(0.45,0.05,0.55,0.95) infinite`, transformOrigin: "60px 115px" }}>
          <rect x="56" y="112" width="9" height="22" rx="4" fill="#0ea5e9" stroke="#06b6d4" strokeWidth="1"/>
          <ellipse cx="60" cy="135" rx="7" ry="4" fill="#0284c7"/>
        </g>
        <g style={{ animation: `smooth-leg-r 0.95s cubic-bezier(0.45,0.05,0.55,0.95) infinite`, transformOrigin: "80px 115px" }}>
          <rect x="75" y="112" width="9" height="22" rx="4" fill="#0ea5e9" stroke="#06b6d4" strokeWidth="1"/>
          <ellipse cx="79" cy="135" rx="7" ry="4" fill="#0284c7"/>
        </g>

        {/* Neck + Head */}
        <rect x="60" y="66" width="20" height="14" rx="4" fill="#e0f2fe"/>
        <ellipse cx="70" cy="47" rx="17" ry="19" fill="#e0f2fe" style={{ animation: `frost-head 2.5s ease-in-out infinite` }}/>
        <path d="M51 31 Q51 21 70 19 Q89 21 89 31" fill="#a7f3d0"/>
        <g style={{ animation: `smooth-hair 1.6s ease-in-out infinite`, transformOrigin: "45px 55px" }}>
          <path d="M49 38 Q44 48 42 68" stroke="#a7f3d0" strokeWidth="4" fill="none" strokeLinecap="round"/>
        </g>
        <g style={{ animation: `smooth-hair 1.6s ease-in-out infinite reverse`, transformOrigin: "95px 55px" }}>
          <path d="M91 38 Q96 48 98 68" stroke="#a7f3d0" strokeWidth="4" fill="none" strokeLinecap="round"/>
        </g>
        <ellipse cx="58" cy="46" rx="3" ry="3.5" fill="#06b6d4"/>
        <ellipse cx="82" cy="46" rx="3" ry="3.5" fill="#06b6d4"/>
        <circle cx="59.5" cy="43" r="1.3" fill="#e0f2fe" opacity="0.98"/>
        <circle cx="83.5" cy="43" r="1.3" fill="#e0f2fe" opacity="0.98"/>
        <path d="M55 38 Q58 34 62 39" stroke="#0284c7" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        <path d="M78 39 Q82 34 85 38" stroke="#0284c7" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        <path d="M70 46 L70 55" stroke="#06b6d4" strokeWidth="1.2"/>
        <path d="M62 58 Q70 60 78 58" stroke="#0284c7" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

// ─── AURORA - Warm Sun Priestess ───────────────────────────────────────────
export function Aurora({ size = 100 }) {
  const id = "aurora_sprite";
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
      <style>{SHARED_KEYFRAMES + `
        @keyframes aurora-glow { 0%,100%{filter:drop-shadow(0 0 8px #f59e0b)} 50%{filter:drop-shadow(0 0 22px #fbbf24)} }
        @keyframes aurora-sun  { 0%,100%{transform:scale(1) rotate(0deg);opacity:0.8} 50%{transform:scale(1.2) rotate(20deg);opacity:1} }
      `}</style>

      {/* Portal */}
      <g filter={`url(#${id}-glow)`} style={{ animation: `portal-pulse 1.7s ease-in-out infinite`, transformOrigin: "70px 148px" }}>
        <ellipse cx="70" cy="148" rx="42" ry="11" fill={`url(#${id}-portal)`}/>
        <ellipse cx="70" cy="148" rx="42" ry="11" fill="none" stroke="#fbbf24" strokeWidth="2" opacity="0.9"/>
      </g>
      <g style={{ animation: `portal-spin 2s linear infinite`, transformOrigin: "70px 148px" }}>
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((a, i) => (
          <ellipse key={a} cx={70 + 38 * Math.cos(a * Math.PI / 180)} cy={148 + 10 * Math.sin(a * Math.PI / 180)}
            rx={i % 2 === 0 ? 3 : 1.5} ry="2" fill={i % 2 === 0 ? "#fcd34d" : "#f59e0b"} opacity="0.8"/>
        ))}
      </g>
      <g style={{ animation: `portal-spin-r 1.5s linear infinite`, transformOrigin: "70px 148px" }}>
        <ellipse cx="70" cy="148" rx="26" ry="7" fill="none" stroke="#fef3c7" strokeWidth="1.5" opacity="0.6" strokeDasharray="5 2"/>
        <ellipse cx="70" cy="148" rx="14" ry="4" fill="#fef3c7" opacity="0.2"/>
      </g>

      {/* Body */}
      <g style={{ animation: `smooth-bob 1.05s cubic-bezier(0.45,0.05,0.55,0.95) infinite`, transformOrigin: "70px 130px" }}>

        {/* Arms */}
        <g style={{ animation: `smooth-arm-l 1.05s cubic-bezier(0.45,0.05,0.55,0.95) infinite`, transformOrigin: "40px 83px" }}>
          <ellipse cx="40" cy="86" rx="9" ry="26" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1.5"/>
          <rect x="29" y="109" width="10" height="11" rx="3" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1.2"/>
          <rect x="28" y="106" width="4" height="7" rx="2" fill="#fbbf24"/>
          <rect x="32" y="105" width="4" height="7" rx="2" fill="#fbbf24"/>
          <rect x="36" y="106" width="3.5" height="6" rx="2" fill="#fbbf24"/>
          <rect x="25" y="112" width="3.5" height="5" rx="2" fill="#fbbf24"/>
          <circle cx="34" cy="115" r="2.5" fill="#fef3c7" opacity="0.9"/>
          <circle cx="34" cy="115" r="4" fill="none" stroke="#fef3c7" strokeWidth="0.8" opacity="0.5"/>
        </g>
        <g style={{ animation: `smooth-arm-r 1.05s cubic-bezier(0.45,0.05,0.55,0.95) infinite`, transformOrigin: "100px 83px" }}>
          <ellipse cx="100" cy="86" rx="9" ry="26" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1.5"/>
          <rect x="101" y="109" width="10" height="11" rx="3" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1.2"/>
          <rect x="102" y="106" width="4" height="7" rx="2" fill="#fbbf24"/>
          <rect x="106" y="105" width="4" height="7" rx="2" fill="#fbbf24"/>
          <rect x="110" y="106" width="3.5" height="6" rx="2" fill="#fbbf24"/>
          <rect x="98" y="112" width="3.5" height="5" rx="2" fill="#fbbf24"/>
          <circle cx="106" cy="115" r="2.5" fill="#fef3c7" opacity="0.9"/>
          <circle cx="106" cy="115" r="4" fill="none" stroke="#fef3c7" strokeWidth="0.8" opacity="0.5"/>
        </g>

        {/* Body */}
        <rect x="44" y="78" width="52" height="38" rx="10" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2"/>
        {/* Sun symbol */}
        <g style={{ animation: `aurora-sun 1.8s ease-in-out infinite`, transformOrigin: "70px 91px" }}>
          <circle cx="70" cy="91" r="5" fill="#fef3c7"/>
          <circle cx="70" cy="91" r="7" fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.6"/>
          {[0,1,2,3,4,5].map(i => (
            <line key={i} x1="70" y1="83" x2="70" y2="77" stroke="#fbbf24" strokeWidth="1.5" opacity="0.6"
              transform={`rotate(${i * 60} 70 91)`}/>
          ))}
        </g>

        {/* Legs */}
        <g style={{ animation: `smooth-leg-l 1.05s cubic-bezier(0.45,0.05,0.55,0.95) infinite`, transformOrigin: "60px 114px" }}>
          <rect x="56" y="112" width="9" height="22" rx="4" fill="#f59e0b" stroke="#d97706" strokeWidth="1"/>
          <ellipse cx="60" cy="135" rx="7" ry="4" fill="#b45309"/>
        </g>
        <g style={{ animation: `smooth-leg-r 1.05s cubic-bezier(0.45,0.05,0.55,0.95) infinite`, transformOrigin: "80px 114px" }}>
          <rect x="75" y="112" width="9" height="22" rx="4" fill="#f59e0b" stroke="#d97706" strokeWidth="1"/>
          <ellipse cx="79" cy="135" rx="7" ry="4" fill="#b45309"/>
        </g>

        {/* Neck + Head */}
        <rect x="60" y="66" width="20" height="14" rx="4" fill="#fef3c7"/>
        <ellipse cx="70" cy="47" rx="17" ry="19" fill="#fef3c7" style={{ animation: `aurora-glow 2s ease-in-out infinite` }}/>
        <path d="M51 31 Q51 21 70 19 Q89 21 89 31" fill="#fbbf24"/>
        <g style={{ animation: `smooth-hair 1.9s ease-in-out infinite`, transformOrigin: "44px 55px" }}>
          <path d="M49 38 Q44 48 42 68" stroke="#fbbf24" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
        </g>
        <g style={{ animation: `smooth-hair 1.9s ease-in-out infinite reverse`, transformOrigin: "96px 55px" }}>
          <path d="M91 38 Q96 48 98 68" stroke="#fbbf24" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
        </g>
        <ellipse cx="58" cy="46" rx="3" ry="3.5" fill="#f59e0b"/>
        <ellipse cx="82" cy="46" rx="3" ry="3.5" fill="#f59e0b"/>
        <circle cx="59.5" cy="43" r="1.3" fill="#fffbeb" opacity="0.99"/>
        <circle cx="83.5" cy="43" r="1.3" fill="#fffbeb" opacity="0.99"/>
        <path d="M55 38 Q58 34 62 39" stroke="#b45309" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
        <path d="M78 39 Q82 34 85 38" stroke="#b45309" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
        <path d="M70 46 L70 55" stroke="#f59e0b" strokeWidth="1"/>
        <path d="M62 58 Q70 61 78 58" stroke="#d97706" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
      </g>
    </svg>
  );
}