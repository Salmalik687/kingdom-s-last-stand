// ─── LORD ALDRIC ────────────────────────────────────────────────────
export function LordAldric({ size = 100 }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 80 100" style={{ overflow: "visible" }}>
      <style>{`
        @keyframes aldricBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        .al-body { animation: aldricBob 2.4s ease-in-out infinite; transform-origin: 40px 85px; }
      `}</style>

      <g className="al-body">
        {/* Body - simple tunic */}
        <rect x="20" y="45" width="40" height="35" rx="8" fill="#8B4513" />
        
        {/* Arms */}
        <rect x="12" y="50" width="8" height="25" rx="4" fill="#d4a574" />
        <rect x="60" y="50" width="8" height="25" rx="4" fill="#d4a574" />
        
        {/* Hands */}
        <circle cx="14" cy="78" r="5" fill="#d4a574" />
        <circle cx="66" cy="78" r="5" fill="#d4a574" />
        
        {/* Neck */}
        <rect x="32" y="38" width="16" height="10" rx="3" fill="#d4a574" />
        
        {/* Head */}
        <circle cx="40" cy="25" r="13" fill="#d4a574" />
        
        {/* Hair - simple dark brown */}
        <path d="M27 18 Q27 12 40 10 Q53 12 53 18" fill="#3a2a1a" />
        
        {/* Eyes */}
        <circle cx="34" cy="24" r="2" fill="#000" />
        <circle cx="46" cy="24" r="2" fill="#000" />
        <circle cx="35" cy="23" r="0.8" fill="#fff" opacity="0.9" />
        <circle cx="47" cy="23" r="0.8" fill="#fff" opacity="0.9" />
        
        {/* Eyebrows */}
        <path d="M32 20 Q34 19 36 20" stroke="#2a1a0a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <path d="M44 20 Q46 19 48 20" stroke="#2a1a0a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        
        {/* Nose */}
        <line x1="40" y1="25" x2="40" y2="30" stroke="#c8956f" strokeWidth="1" />
        
        {/* Mouth - determined look */}
        <path d="M35 32 Q40 34 45 32" stroke="#8a5030" strokeWidth="1" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// ─── QUEEN SERAPHINE ────────────────────────────────────────────────────
export function QueenSeraphine({ size = 120 }) {
  return (
    <svg width={size} height={size * 1.6} viewBox="0 0 80 130" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="serGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4a3a2a" />
          <stop offset="100%" stopColor="#2a1a0a" />
        </linearGradient>
      </defs>

      <style>{`
        @keyframes serBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        .ser-body { animation: serBob 2.6s ease-in-out infinite; transform-origin: 40px 110px; }
      `}</style>

      <g className="ser-body">
        {/* Gown - flowing dress */}
        <path d="M20 50 L18 100 L22 125 L40 128 L58 125 L62 100 L60 50 Z" fill="#2a6a4a" />
        <path d="M25 50 L24 100 L26 122 L40 124 L54 122 L56 100 L55 50 Z" fill="#4a8a6a" opacity="0.6" />
        
        {/* Bodice */}
        <path d="M22 45 Q20 50 20 55 L60 55 Q60 50 58 45 Q50 42 40 42 Q30 42 22 45 Z" fill="#1a6a4a" />
        
        {/* Arms - sleeves */}
        <ellipse cx="15" cy="52" rx="7" ry="18" fill="#2a6a4a" />
        <ellipse cx="65" cy="52" rx="7" ry="18" fill="#2a6a4a" />
        
        {/* Hands */}
        <circle cx="12" cy="72" r="4.5" fill="#f9e4d0" />
        <circle cx="68" cy="72" r="4.5" fill="#f9e4d0" />
        
        {/* Neck */}
        <rect x="33" y="38" width="14" height="8" rx="2" fill="#f9e4d0" />
        
        {/* Head */}
        <circle cx="40" cy="26" r="12" fill="#f9e4d0" />
        
        {/* Hair - long, flowing */}
        <path d="M28 20 Q20 18 18 30 Q16 45 20 60" stroke="#4a3a2a" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M52 20 Q60 18 62 30 Q64 45 60 60" stroke="#4a3a2a" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M30 15 Q40 12 50 15" fill="#4a3a2a" />
        
        {/* Eyes - kind, wise */}
        <ellipse cx="33" cy="25" rx="2.5" ry="2" fill="#4a8a6a" />
        <ellipse cx="47" cy="25" rx="2.5" ry="2" fill="#4a8a6a" />
        <circle cx="34.5" cy="24" r="0.7" fill="#fff" opacity="0.95" />
        <circle cx="48.5" cy="24" r="0.7" fill="#fff" opacity="0.95" />
        
        {/* Eyebrows - gentle arch */}
        <path d="M31 21 Q33 19.5 35 21" stroke="#3a2a1a" strokeWidth="1" fill="none" strokeLinecap="round" />
        <path d="M45 21 Q47 19.5 49 21" stroke="#3a2a1a" strokeWidth="1" fill="none" strokeLinecap="round" />
        
        {/* Nose */}
        <line x1="40" y1="25" x2="40" y2="29" stroke="#d4a080" strokeWidth="0.8" />
        
        {/* Mouth - gentle smile */}
        <path d="M35 31 Q40 32.5 45 31" stroke="#c8805a" strokeWidth="1" fill="none" strokeLinecap="round" />
        
        {/* Crown - simple circlet */}
        <ellipse cx="40" cy="14" rx="14" ry="4" fill="none" stroke="#d4af70" strokeWidth="1.5" />
        <circle cx="40" cy="12" r="2" fill="#d4af70" />
        <circle cx="30" cy="15" r="1.2" fill="#d4af70" opacity="0.8" />
        <circle cx="50" cy="15" r="1.2" fill="#d4af70" opacity="0.8" />
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
        {/* Dark robe */}
        <path d="M18 48 L16 95 L20 98 L40 100 L60 98 L64 95 L62 48 Z" fill="#3a0a2a" />
        <path d="M22 48 L21 93 L40 96 L59 93 L58 48 Z" fill="#5a1a4a" opacity="0.5" />
        
        {/* Arms with sleeves */}
        <ellipse cx="12" cy="55" rx="6" ry="22" fill="#3a0a2a" />
        <ellipse cx="68" cy="55" rx="6" ry="22" fill="#3a0a2a" />
        
        {/* Hands */}
        <circle cx="10" cy="78" r="4" fill="#d4a574" />
        <circle cx="70" cy="78" r="4" fill="#d4a574" />
        
        {/* Neck */}
        <rect x="32" y="38" width="16" height="10" rx="3" fill="#d4a574" />
        
        {/* Head */}
        <circle cx="40" cy="25" r="13" fill="#d4a574" />
        
        {/* Hair - dark, longer */}
        <path d="M27 16 Q27 10 40 8 Q53 10 53 16" fill="#1a0a0a" />
        <path d="M25 25 Q20 28 18 38" stroke="#1a0a0a" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M55 25 Q60 28 62 38" stroke="#1a0a0a" strokeWidth="5" fill="none" strokeLinecap="round" />
        
        {/* Eyes - piercing */}
        <circle cx="34" cy="24" r="2" fill="#000" />
        <circle cx="46" cy="24" r="2" fill="#000" />
        <circle cx="35.2" cy="23" r="0.7" fill="#fff" opacity="0.9" />
        <circle cx="47.2" cy="23" r="0.7" fill="#fff" opacity="0.9" />
        
        {/* Eyebrows - sharp */}
        <path d="M31 20 Q34 18.5 37 20.5" stroke="#1a0a0a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <path d="M43 20.5 Q46 18.5 49 20" stroke="#1a0a0a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        
        {/* Nose */}
        <line x1="40" y1="25" x2="40" y2="30" stroke="#c8956f" strokeWidth="0.9" />
        
        {/* Mouth - mysterious */}
        <path d="M36 32 Q40 33 44 32" stroke="#8a5030" strokeWidth="0.9" fill="none" strokeLinecap="round" />
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
        {/* Tunic - light blue */}
        <rect x="20" y="45" width="40" height="35" rx="8" fill="#4a8a9a" />
        
        {/* Arms */}
        <rect x="12" y="50" width="8" height="25" rx="4" fill="#d4a574" />
        <rect x="60" y="50" width="8" height="25" rx="4" fill="#d4a574" />
        
        {/* Hands */}
        <circle cx="14" cy="78" r="5" fill="#d4a574" />
        <circle cx="66" cy="78" r="5" fill="#d4a574" />
        
        {/* Neck */}
        <rect x="32" y="38" width="16" height="10" rx="3" fill="#d4a574" />
        
        {/* Head */}
        <circle cx="40" cy="25" r="13" fill="#d4a574" />
        
        {/* Hair - lighter, shorter */}
        <path d="M27 16 Q27 11 40 9 Q53 11 53 16" fill="#6a5a4a" />
        
        {/* Eyes - bright blue */}
        <circle cx="34" cy="24" r="2" fill="#4a8a9a" />
        <circle cx="46" cy="24" r="2" fill="#4a8a9a" />
        <circle cx="35.2" cy="23" r="0.8" fill="#fff" opacity="0.95" />
        <circle cx="47.2" cy="23" r="0.8" fill="#fff" opacity="0.95" />
        
        {/* Eyebrows */}
        <path d="M32 20 Q34 18.5 36 20" stroke="#2a1a0a" strokeWidth="1" fill="none" strokeLinecap="round" />
        <path d="M44 20 Q46 18.5 48 20" stroke="#2a1a0a" strokeWidth="1" fill="none" strokeLinecap="round" />
        
        {/* Nose */}
        <line x1="40" y1="25" x2="40" y2="30" stroke="#c8956f" strokeWidth="1" />
        
        {/* Mouth - friendly */}
        <path d="M36 32 Q40 33.5 44 32" stroke="#8a5030" strokeWidth="1" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// ─── AURORA - Sun Priestess ────────────────────────────────────────────────────
export function Aurora({ size = 100 }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 80 100" style={{ overflow: "visible" }}>
      <style>{`
        @keyframes auroraGlow { 0%,100%{filter:drop-shadow(0 0 5px #ffd60a)} 50%{filter:drop-shadow(0 0 12px #ffd60a)} }
        @keyframes auroraBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        .aurora-body { animation: auroraBob 2.5s ease-in-out infinite; transform-origin: 40px 85px; }
        .aurora-head { animation: auroraGlow 2s ease-in-out infinite; }
      `}</style>

      <g className="aurora-body">
        {/* Tunic - golden yellow */}
        <rect x="20" y="45" width="40" height="35" rx="8" fill="#d4a847" />
        
        {/* Arms */}
        <rect x="12" y="50" width="8" height="25" rx="4" fill="#f0d4a0" />
        <rect x="60" y="50" width="8" height="25" rx="4" fill="#f0d4a0" />
        
        {/* Hands */}
        <circle cx="14" cy="78" r="5" fill="#f0d4a0" />
        <circle cx="66" cy="78" r="5" fill="#f0d4a0" />
        
        {/* Neck */}
        <rect x="32" y="38" width="16" height="10" rx="3" fill="#f0d4a0" />
        
        {/* Head */}
        <circle cx="40" cy="25" r="13" fill="#f0d4a0" className="aurora-head" />
        
        {/* Hair - golden blonde */}
        <path d="M27 16 Q27 10 40 8 Q53 10 53 16" fill="#d4a070" />
        <path d="M26 20 Q24 24 25 30" stroke="#d4a070" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M54 20 Q56 24 55 30" stroke="#d4a070" strokeWidth="3" fill="none" strokeLinecap="round" />
        
        {/* Eyes - warm golden */}
        <circle cx="34" cy="24" r="2" fill="#d4a070" />
        <circle cx="46" cy="24" r="2" fill="#d4a070" />
        <circle cx="35.2" cy="23" r="0.8" fill="#fff" opacity="0.95" />
        <circle cx="47.2" cy="23" r="0.8" fill="#fff" opacity="0.95" />
        
        {/* Eyebrows */}
        <path d="M32 20 Q34 18.5 36 20" stroke="#8a6a4a" strokeWidth="1" fill="none" strokeLinecap="round" />
        <path d="M44 20 Q46 18.5 48 20" stroke="#8a6a4a" strokeWidth="1" fill="none" strokeLinecap="round" />
        
        {/* Nose */}
        <line x1="40" y1="25" x2="40" y2="30" stroke="#d4a080" strokeWidth="0.9" />
        
        {/* Mouth - warm smile */}
        <path d="M36 32 Q40 34 44 32" stroke="#c87030" strokeWidth="1" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}