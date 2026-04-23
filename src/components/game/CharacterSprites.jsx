// ─── SHARED ANIMATION KEYFRAMES ───────────────────────────────────────────────
const KF = `
  @keyframes bob       { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-8px)} }
  @keyframes breathe   { 0%,100%{transform:scaleX(1) scaleY(1)} 50%{transform:scaleX(1.025) scaleY(0.98)} }
  @keyframes leg-l     { 0%,100%{transform:rotate(-22deg)} 50%{transform:rotate(22deg)} }
  @keyframes leg-r     { 0%,100%{transform:rotate(22deg)} 50%{transform:rotate(-22deg)} }
  @keyframes arm-l     { 0%,100%{transform:rotate(18deg)} 50%{transform:rotate(-18deg)} }
  @keyframes arm-r     { 0%,100%{transform:rotate(-18deg)} 50%{transform:rotate(18deg)} }
  @keyframes cape      { 0%,100%{transform:skewX(-5deg) scaleY(1)} 50%{transform:skewX(6deg) scaleY(1.04)} }
  @keyframes hair      { 0%,100%{transform:skewX(-4deg)} 50%{transform:skewX(4deg)} }
  @keyframes ppulse    { 0%,100%{opacity:0.75;transform:scale(1)} 50%{opacity:1;transform:scale(1.07)} }
  @keyframes pspin     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes pspinr    { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
  @keyframes crown-glow{ 0%,100%{filter:drop-shadow(0 0 4px #d4af70)} 50%{filter:drop-shadow(0 0 18px #ffd60a)} }
  @keyframes orb-pulse { 0%,100%{r:8;opacity:0.3} 50%{r:13;opacity:0.65} }
  @keyframes frost-glow{ 0%,100%{filter:drop-shadow(0 0 6px #38bdf8)} 50%{filter:drop-shadow(0 0 18px #7dd3fc)} }
  @keyframes sun-spin  { 0%,100%{transform:scale(1) rotate(0deg);opacity:0.85} 50%{transform:scale(1.22) rotate(22deg);opacity:1} }
`;

const TB = "1.1s cubic-bezier(0.45,0.05,0.55,0.95) infinite";
const TPS = "3.5s linear infinite";
const TPP = "2.4s ease-in-out infinite";

// ─── Shared sub-components ────────────────────────────────────────────────────

function Portal({ cx, cy, rx, ry, color1, color2, id, particles = [], spinDots = false }) {
  return (
    <>
      <defs>
        <radialGradient id={id} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color1} stopOpacity="0.95"/>
          <stop offset="55%" stopColor={color2} stopOpacity="0.65"/>
          <stop offset="100%" stopColor={color2} stopOpacity="0.1"/>
        </radialGradient>
        <filter id={`${id}-glow`}>
          <feGaussianBlur stdDeviation="5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <g filter={`url(#${id}-glow)`} style={{ animation: `ppulse ${TPP}`, transformOrigin: `${cx}px ${cy}px` }}>
        <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={`url(#${id})`}/>
        <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={color1} strokeWidth="2" opacity="0.9"/>
      </g>
      <g style={{ animation: `pspin ${TPS}`, transformOrigin: `${cx}px ${cy}px` }}>
        {particles.map((p, i) => (
          <ellipse key={i}
            cx={cx + rx * Math.cos(p * Math.PI / 180)}
            cy={cy + ry * Math.sin(p * Math.PI / 180)}
            rx="2.8" ry="1.8" fill={color1} opacity="0.75"/>
        ))}
      </g>
      <g style={{ animation: `pspinr ${TPS}`, transformOrigin: `${cx}px ${cy}px` }}>
        <ellipse cx={cx} cy={cy} rx={rx * 0.58} ry={ry * 0.58} fill="none" stroke={color1} strokeWidth="1.2" opacity="0.45" strokeDasharray="5 3"/>
      </g>
    </>
  );
}

// 3D-style sphere via SVG radial gradient
function Sphere({ cx, cy, r, dark, mid, light, id }) {
  const gid = `sph-${id}`;
  const sid = `sph-spec-${id}`;
  return (
    <>
      <defs>
        <radialGradient id={gid} cx="35%" cy="32%" r="65%" fx="32%" fy="28%">
          <stop offset="0%" stopColor={light}/>
          <stop offset="45%" stopColor={mid}/>
          <stop offset="100%" stopColor={dark}/>
        </radialGradient>
        <radialGradient id={sid} cx="28%" cy="26%" r="45%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.55)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r} fill={`url(#${gid})`}/>
      <circle cx={cx} cy={cy} r={r} fill={`url(#${sid})`}/>
      {/* Rim light */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(100,160,255,0.12)" strokeWidth={r * 0.25}/>
    </>
  );
}

// Metallic plate with linear gradient
function Plate({ x, y, w, h, rx = 2, light, dark, stroke, strokeW = 1 }) {
  const id = `plate-${x}-${y}`;
  return (
    <>
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={light}/>
          <stop offset="45%" stopColor={dark}/>
          <stop offset="100%" stopColor="#000"/>
        </linearGradient>
      </defs>
      <rect x={x} y={y} width={w} height={h} rx={rx} fill={`url(#${id})`} stroke={stroke} strokeWidth={strokeW}/>
    </>
  );
}

// ─── LORD ALDRIC — Steel-clad warrior king ────────────────────────────────────
export function LordAldric({ size = 100 }) {
  const sc = size / 100;
  return (
    <svg width={140 * sc} height={165 * sc} viewBox="0 0 140 165" style={{ overflow: "visible" }}>
      <style>{KF}</style>
      <Portal cx={70} cy={152} rx={40} ry={11} color1="#5a7aaa" color2="#2a4a7a" id="aldric-p"
        particles={[0,45,90,135,180,225,270,315]}/>

      <g style={{ animation: `bob ${TB}`, transformOrigin: "70px 132px" }}>
        {/* Shadow */}
        <ellipse cx="70" cy="153" rx="28" ry="6" fill="rgba(0,0,0,0.35)"/>

        {/* Cape */}
        <g style={{ animation: `cape 1.2s ease-in-out infinite`, transformOrigin: "70px 100px" }}>
          <path d="M46 75 L38 148 L55 152 L70 148 L85 152 L102 148 L94 75 Z" fill="#1a1a2e" stroke="#2a2a4a" strokeWidth="1"/>
          <path d="M55 75 L50 148 L70 150 L90 148 L85 75 Z" fill="#22224a" opacity="0.7"/>
        </g>

        {/* Left arm */}
        <g style={{ animation: `arm-l ${TB}`, transformOrigin: "45px 85px" }}>
          <Sphere cx={45} cy={80} r={10} dark="#1a2530" mid="#506070" light="#90aac0" id="al-lsh"/>
          <rect x="37" y="88" width="10" height="22" rx="5" fill="url(#al-larm)" stroke="#60789a" strokeWidth="1.2"/>
          <defs><linearGradient id="al-larm" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#3a5870"/><stop offset="50%" stopColor="#7090b0"/><stop offset="100%" stopColor="#1a2a40"/></linearGradient></defs>
          {/* Gauntlet */}
          <rect x="34" y="108" width="16" height="10" rx="3" fill="#506888" stroke="#7090b0" strokeWidth="1"/>
          <rect x="33" y="104" width="4" height="8" rx="2" fill="#7090b0"/>
          <rect x="37" y="103" width="4" height="8" rx="2" fill="#7090b0"/>
          <rect x="41" y="104" width="3.5" height="7" rx="2" fill="#7090b0"/>
          <rect x="30" y="110" width="3.5" height="5" rx="2" fill="#7090b0"/>
        </g>

        {/* Right arm */}
        <g style={{ animation: `arm-r ${TB}`, transformOrigin: "95px 85px" }}>
          <Sphere cx={95} cy={80} r={10} dark="#1a2530" mid="#506070" light="#90aac0" id="al-rsh"/>
          <rect x="93" y="88" width="10" height="22" rx="5" fill="url(#al-rarm)" stroke="#60789a" strokeWidth="1.2"/>
          <defs><linearGradient id="al-rarm" x1="100%" y1="0%" x2="0%" y2="0%"><stop offset="0%" stopColor="#3a5870"/><stop offset="50%" stopColor="#7090b0"/><stop offset="100%" stopColor="#1a2a40"/></linearGradient></defs>
          <rect x="90" y="108" width="16" height="10" rx="3" fill="#506888" stroke="#7090b0" strokeWidth="1"/>
          <rect x="103" y="104" width="4" height="8" rx="2" fill="#7090b0"/>
          <rect x="99" y="103" width="4" height="8" rx="2" fill="#7090b0"/>
          <rect x="95" y="104" width="3.5" height="7" rx="2" fill="#7090b0"/>
          <rect x="106" y="110" width="3.5" height="5" rx="2" fill="#7090b0"/>
        </g>

        {/* Chest plate */}
        <defs>
          <linearGradient id="al-chest" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7090b0"/><stop offset="40%" stopColor="#3a5070"/><stop offset="100%" stopColor="#0a1520"/>
          </linearGradient>
        </defs>
        <rect x="47" y="73" width="46" height="40" rx="8" fill="url(#al-chest)" stroke="#5a7a9a" strokeWidth="1.5"
          style={{ animation: `breathe ${TB}`, transformOrigin: "70px 93px" }}/>
        {/* Chest highlight */}
        <ellipse cx="62" cy="83" rx="10" ry="14" fill="rgba(200,220,255,0.14)" transform="rotate(-15 62 83)"/>
        {/* Chest rune */}
        <path d="M70 78 L66 92 L70 90 L74 92 Z" fill="none" stroke="#88aacc" strokeWidth="1.2" opacity="0.7"/>

        {/* Legs */}
        <g style={{ animation: `leg-l ${TB}`, transformOrigin: "60px 117px" }}>
          <rect x="54" y="113" width="12" height="22" rx="5" fill="url(#al-legL)" stroke="#5a7a9a" strokeWidth="1"/>
          <defs><linearGradient id="al-legL" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#5a7a9a"/><stop offset="100%" stopColor="#1a2a40"/></linearGradient></defs>
          <ellipse cx="60" cy="136" rx="8" ry="5" fill="#384a60" stroke="#5a7a9a" strokeWidth="1"/>
        </g>
        <g style={{ animation: `leg-r ${TB}`, transformOrigin: "80px 117px" }}>
          <rect x="74" y="113" width="12" height="22" rx="5" fill="url(#al-legR)" stroke="#5a7a9a" strokeWidth="1"/>
          <defs><linearGradient id="al-legR" x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#5a7a9a"/><stop offset="100%" stopColor="#1a2a40"/></linearGradient></defs>
          <ellipse cx="80" cy="136" rx="8" ry="5" fill="#384a60" stroke="#5a7a9a" strokeWidth="1"/>
        </g>

        {/* Neck */}
        <rect x="63" y="65" width="14" height="12" rx="4" fill="#c09070"/>

        {/* Head */}
        <Sphere cx={70} cy={47} r={18} dark="#7a4a20" mid="#c09060" light="#e8c090" id="al-head"/>
        {/* Hair */}
        <path d="M51 33 Q51 20 70 18 Q89 20 89 33 Q89 42 86 48" fill="#3a3030"/>
        <g style={{ animation: `hair 1.9s ease-in-out infinite`, transformOrigin: "54px 40px" }}>
          <path d="M55 28 Q48 34 46 50" stroke="#4a4040" strokeWidth="3" fill="none" strokeLinecap="round"/>
        </g>
        <g style={{ animation: `hair 1.9s ease-in-out infinite reverse`, transformOrigin: "86px 40px" }}>
          <path d="M85 28 Q92 34 94 50" stroke="#4a4040" strokeWidth="3" fill="none" strokeLinecap="round"/>
        </g>
        {/* Eyes */}
        <Sphere cx={59} cy={44} r={4} dark="#1a3a6a" mid="#3a7abf" light="#7ac0ff" id="al-el"/>
        <circle cx="59" cy="44" r="1.8" fill="#051020"/>
        <circle cx="58" cy="43" r="1" fill="rgba(255,255,255,0.9)"/>
        <Sphere cx={81} cy={44} r={4} dark="#1a3a6a" mid="#3a7abf" light="#7ac0ff" id="al-er"/>
        <circle cx="81" cy="44" r="1.8" fill="#051020"/>
        <circle cx="80" cy="43" r="1" fill="rgba(255,255,255,0.9)"/>
        {/* Brows */}
        <path d="M55 38 Q58 34 63 38" stroke="#2a1a10" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        <path d="M77 38 Q82 34 85 38" stroke="#2a1a10" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        {/* Nose bridge */}
        <path d="M70 44 L70 52" stroke="#a87050" strokeWidth="1.2"/>
        {/* Mouth */}
        <path d="M63 56 Q70 59 77 56" stroke="#5a2a10" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* Battle scar */}
        <path d="M74 38 L76 48" stroke="rgba(120,60,40,0.6)" strokeWidth="1.2" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

// ─── QUEEN SERAPHINE — Emerald sorceress queen ────────────────────────────────
export function QueenSeraphine({ size = 120 }) {
  const sc = size / 120;
  return (
    <svg width={140 * sc} height={195 * sc} viewBox="0 0 140 195" style={{ overflow: "visible" }}>
      <style>{KF}</style>
      <Portal cx={70} cy={182} rx={42} ry={12} color1="#4a9a6a" color2="#1a5a3a" id="sera-p"
        particles={[0,40,80,120,160,200,240,280,320]}/>

      <g style={{ animation: `bob 1.3s cubic-bezier(0.45,0.05,0.55,0.95) infinite`, transformOrigin: "70px 162px" }}>
        <ellipse cx="70" cy="183" rx="30" ry="7" fill="rgba(0,0,0,0.3)"/>

        {/* Dress / robe */}
        <defs>
          <linearGradient id="sera-robe" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2a7a4a"/><stop offset="50%" stopColor="#1a5a35"/><stop offset="100%" stopColor="#0a2a1a"/>
          </linearGradient>
          <linearGradient id="sera-robe2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3a8a5a"/><stop offset="100%" stopColor="#082818"/>
          </linearGradient>
        </defs>
        <path d="M38 98 L34 185 L70 188 L106 185 L102 98 Z" fill="url(#sera-robe)" stroke="#1a5a35" strokeWidth="1.2"/>
        {/* Robe sheen */}
        <ellipse cx="55" cy="140" rx="10" ry="30" fill="rgba(80,200,120,0.12)" transform="rotate(-10 55 140)"/>
        {/* Robe trim */}
        <rect x="38" y="96" width="64" height="6" rx="2" fill="url(#gold-trim)"/>
        <defs><linearGradient id="gold-trim" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#9a7030"/><stop offset="30%" stopColor="#ffd060"/><stop offset="60%" stopColor="#d4a840"/><stop offset="100%" stopColor="#7a5020"/></linearGradient></defs>

        {/* Left sleeve */}
        <g style={{ animation: `arm-l 1.3s cubic-bezier(0.45,0.05,0.55,0.95) infinite`, transformOrigin: "33px 102px" }}>
          <path d="M38 98 Q26 110 22 132 L30 135 Q32 116 42 105 Z" fill="#225a3a" stroke="#1a4a2a" strokeWidth="0.8"/>
          <rect x="14" y="126" width="14" height="12" rx="3" fill="#f0d4b8" stroke="#c8a080" strokeWidth="1"/>
          <rect x="13" y="122" width="4" height="8" rx="2" fill="#f0d4b8"/>
          <rect x="17" y="121" width="4" height="8" rx="2" fill="#f0d4b8"/>
          <rect x="21" y="122" width="3.5" height="7" rx="2" fill="#f0d4b8"/>
          <rect x="10" y="128" width="3.5" height="5" rx="2" fill="#f0d4b8"/>
        </g>

        {/* Right sleeve */}
        <g style={{ animation: `arm-r 1.3s cubic-bezier(0.45,0.05,0.55,0.95) infinite`, transformOrigin: "107px 102px" }}>
          <path d="M102 98 Q114 110 118 132 L110 135 Q108 116 98 105 Z" fill="#225a3a" stroke="#1a4a2a" strokeWidth="0.8"/>
          <rect x="112" y="126" width="14" height="12" rx="3" fill="#f0d4b8" stroke="#c8a080" strokeWidth="1"/>
          <rect x="113" y="122" width="4" height="8" rx="2" fill="#f0d4b8"/>
          <rect x="117" y="121" width="4" height="8" rx="2" fill="#f0d4b8"/>
          <rect x="121" y="122" width="3.5" height="7" rx="2" fill="#f0d4b8"/>
          <rect x="124" y="128" width="3.5" height="5" rx="2" fill="#f0d4b8"/>
        </g>

        {/* Cape layers */}
        <g style={{ animation: `cape 1.3s ease-in-out infinite`, transformOrigin: "45px 148px" }}>
          <path d="M40 140 L35 185 L58 188 L62 140 Z" fill="#1a4a2a" opacity="0.85"/>
        </g>
        <g style={{ animation: `cape 1.3s ease-in-out infinite reverse`, transformOrigin: "95px 148px" }}>
          <path d="M78 140 L78 188 L105 185 L100 140 Z" fill="#1a4a2a" opacity="0.85"/>
        </g>

        {/* Neck */}
        <rect x="60" y="84" width="20" height="16" rx="5" fill="#f0d4b8"/>

        {/* Head */}
        <Sphere cx={70} cy={64} r={18} dark="#c09070" mid="#e8c8a0" light="#fae0c0" id="sera-head"/>
        {/* Hair */}
        <path d="M51 48 Q51 36 70 34 Q89 36 89 48 Q89 55 86 62" fill="#2a1a0e"/>
        <g style={{ animation: `hair 2s ease-in-out infinite`, transformOrigin: "45px 73px" }}>
          <path d="M49 56 Q42 68 40 90" stroke="#2a1a0e" strokeWidth="5" fill="none" strokeLinecap="round"/>
        </g>
        <g style={{ animation: `hair 2s ease-in-out infinite reverse`, transformOrigin: "95px 73px" }}>
          <path d="M91 56 Q98 68 100 90" stroke="#2a1a0e" strokeWidth="5" fill="none" strokeLinecap="round"/>
        </g>

        {/* Eyes */}
        <Sphere cx={59} cy={62} r={4} dark="#1a4a2a" mid="#2d7a4a" light="#5aaa80" id="sera-el"/>
        <circle cx="59" cy="62" r="1.8" fill="#051410"/>
        <circle cx="58" cy="61" r="1" fill="rgba(255,255,255,0.9)"/>
        <Sphere cx={81} cy={62} r={4} dark="#1a4a2a" mid="#2d7a4a" light="#5aaa80" id="sera-er"/>
        <circle cx="81" cy="62" r="1.8" fill="#051410"/>
        <circle cx="80" cy="61" r="1" fill="rgba(255,255,255,0.9)"/>
        <path d="M55 55 Q58 51 63 55" stroke="#1a0a05" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        <path d="M77 55 Q82 51 85 55" stroke="#1a0a05" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        <path d="M70 62 L70 70" stroke="#d4a880" strokeWidth="1.2"/>
        <path d="M63 74 Q70 77 77 74" stroke="#c08060" strokeWidth="1.4" fill="none" strokeLinecap="round"/>

        {/* Crown */}
        <g style={{ animation: `crown-glow 2.2s ease-in-out infinite` }}>
          <defs>
            <linearGradient id="crown-g" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffe08a"/><stop offset="50%" stopColor="#d4af70"/><stop offset="100%" stopColor="#7a5020"/>
            </linearGradient>
          </defs>
          <ellipse cx="70" cy="43" rx="20" ry="5.5" fill="none" stroke="url(#crown-g)" strokeWidth="2.5"/>
          {/* Crown points */}
          {[56, 63, 70, 77, 84].map((x, i) => (
            <path key={i} d={`M${x} 44 L${x + (i === 2 ? 0 : i < 2 ? -1 : 1)} ${44 - [22, 28, 34, 28, 22][i]} L${x + 6} 44`}
              fill="url(#crown-g)" stroke="#9a7030" strokeWidth="0.8"/>
          ))}
          {/* Crown gems */}
          <circle cx="70" cy="38" r="3.5" fill="#2d7a4a" stroke="#ffd060" strokeWidth="1.2"/>
          <circle cx="56" cy="43" r="2.2" fill="#dc2626" stroke="#ffd060" strokeWidth="0.8"/>
          <circle cx="84" cy="43" r="2.2" fill="#dc2626" stroke="#ffd060" strokeWidth="0.8"/>
          {/* Crown specular */}
          <ellipse cx="65" cy="42" rx="8" ry="2" fill="rgba(255,240,180,0.3)" transform="rotate(-10 65 42)"/>
        </g>
      </g>
    </svg>
  );
}

// ─── MORRIGAN — Dark Archmage ─────────────────────────────────────────────────
export function Morrigan({ size = 100 }) {
  const sc = size / 100;
  return (
    <svg width={140 * sc} height={162 * sc} viewBox="0 0 140 162" style={{ overflow: "visible" }}>
      <style>{KF + `@keyframes void-orb { 0%,100%{r:9;opacity:0.35} 50%{r:14;opacity:0.7} }`}</style>
      <Portal cx={70} cy={152} rx={44} ry={12} color1="#9b4dca" color2="#3a0a6a" id="mor-p"
        particles={[0,30,60,90,120,150,180,210,240,270,300,330]}/>

      <g style={{ animation: `bob 1.1s cubic-bezier(0.45,0.05,0.55,0.95) infinite`, transformOrigin: "70px 132px" }}>
        <ellipse cx="70" cy="153" rx="32" ry="7" fill="rgba(0,0,0,0.38)"/>

        {/* Robe — void dark */}
        <defs>
          <linearGradient id="mor-robe" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e0538"/><stop offset="50%" stopColor="#100320"/><stop offset="100%" stopColor="#050010"/>
          </linearGradient>
        </defs>
        <path d="M34 80 L30 148 L70 152 L110 148 L106 80 Z" fill="url(#mor-robe)" stroke="#3a0a5a" strokeWidth="1.5"/>
        {/* Robe sheen */}
        <ellipse cx="52" cy="118" rx="9" ry="28" fill="rgba(140,80,220,0.14)" transform="rotate(-12 52 118)"/>
        {/* Void trim */}
        <rect x="44" y="82" width="52" height="3.5" rx="1.5" fill="#7c3aed" opacity="0.8"/>

        {/* Cape */}
        <g style={{ animation: `cape 1.1s ease-in-out infinite`, transformOrigin: "48px 124px" }}>
          <path d="M36 118 L30 150 L56 152 L58 118 Z" fill="#0a0118" opacity="0.9"/>
        </g>
        <g style={{ animation: `cape 1.1s ease-in-out infinite reverse`, transformOrigin: "92px 124px" }}>
          <path d="M82 118 L82 152 L110 150 L104 118 Z" fill="#0a0118" opacity="0.9"/>
        </g>

        {/* Left arm */}
        <g style={{ animation: `arm-l 1.1s cubic-bezier(0.45,0.05,0.55,0.95) infinite`, transformOrigin: "38px 87px" }}>
          <rect x="30" y="80" width="14" height="32" rx="7" fill="#160428" stroke="#4a1a6a" strokeWidth="1"/>
          {/* Hand */}
          <rect x="27" y="110" width="12" height="10" rx="3" fill="#e8d4f0" stroke="#9b4dca" strokeWidth="1"/>
          <rect x="26" y="107" width="4" height="7" rx="2" fill="#e8d4f0"/>
          <rect x="30" y="106" width="4" height="7" rx="2" fill="#e8d4f0"/>
          <rect x="34" y="107" width="3.5" height="6" rx="2" fill="#e8d4f0"/>
          <rect x="23" y="113" width="3.5" height="5" rx="2" fill="#e8d4f0"/>
          {/* Void orb */}
          <circle cx="31" cy="120" r="9" fill="#7c3aed" style={{ animation: `void-orb 1.8s ease-in-out infinite` }} opacity="0.5"/>
          <circle cx="31" cy="120" r="5" fill="#c084fc" opacity="0.85"/>
          <circle cx="29.5" cy="118.5" r="2" fill="rgba(255,255,255,0.7)"/>
        </g>

        {/* Right arm */}
        <g style={{ animation: `arm-r 1.1s cubic-bezier(0.45,0.05,0.55,0.95) infinite`, transformOrigin: "102px 87px" }}>
          <rect x="96" y="80" width="14" height="32" rx="7" fill="#160428" stroke="#4a1a6a" strokeWidth="1"/>
          <rect x="101" y="110" width="12" height="10" rx="3" fill="#e8d4f0" stroke="#9b4dca" strokeWidth="1"/>
          <rect x="102" y="107" width="4" height="7" rx="2" fill="#e8d4f0"/>
          <rect x="106" y="106" width="4" height="7" rx="2" fill="#e8d4f0"/>
          <rect x="110" y="107" width="3.5" height="6" rx="2" fill="#e8d4f0"/>
          <rect x="113" y="113" width="3.5" height="5" rx="2" fill="#e8d4f0"/>
          <circle cx="109" cy="120" r="9" fill="#7c3aed" style={{ animation: `void-orb 1.8s ease-in-out 0.9s infinite` }} opacity="0.5"/>
          <circle cx="109" cy="120" r="5" fill="#c084fc" opacity="0.85"/>
          <circle cx="107.5" cy="118.5" r="2" fill="rgba(255,255,255,0.7)"/>
        </g>

        {/* Neck */}
        <rect x="61" y="67" width="18" height="14" rx="4" fill="#e0c8f0"/>

        {/* Head */}
        <Sphere cx={70} cy={48} r={19} dark="#2a0848" mid="#c098e0" light="#e8d0ff" id="mor-head"/>
        {/* Hair */}
        <path d="M50 32 Q50 20 70 18 Q90 20 90 32" fill="#060406"/>
        <g style={{ animation: `hair 2.2s ease-in-out infinite`, transformOrigin: "44px 60px" }}>
          <path d="M49 37 Q42 52 40 78" stroke="#0a060a" strokeWidth="5.5" fill="none" strokeLinecap="round"/>
        </g>
        <g style={{ animation: `hair 2.2s ease-in-out infinite reverse`, transformOrigin: "96px 60px" }}>
          <path d="M91 37 Q98 52 100 78" stroke="#0a060a" strokeWidth="5.5" fill="none" strokeLinecap="round"/>
        </g>
        {/* Eyes */}
        <Sphere cx={59} cy={47} r={4} dark="#2a0860" mid="#7c3aed" light="#c084fc" id="mor-el"/>
        <circle cx="59" cy="47" r="1.9" fill="#0a0018"/>
        <circle cx="58" cy="46" r="1.1" fill="rgba(255,200,255,0.9)"/>
        <Sphere cx={81} cy={47} r={4} dark="#2a0860" mid="#7c3aed" light="#c084fc" id="mor-er"/>
        <circle cx="81" cy="47" r="1.9" fill="#0a0018"/>
        <circle cx="80" cy="46" r="1.1" fill="rgba(255,200,255,0.9)"/>
        {/* Sharp brows */}
        <path d="M54 39 Q57 35 63 40" stroke="#050308" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M77 40 Q83 35 86 39" stroke="#050308" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M70 47 L70 56" stroke="#c898e0" strokeWidth="1.2"/>
        <path d="M62 58 Q70 61 78 58" stroke="#9060a0" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
        {/* Horns / arcane headpiece */}
        <path d="M53 33 Q48 24 52 16" stroke="#2a0848" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M87 33 Q92 24 88 16" stroke="#2a0848" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <circle cx="52" cy="16" r="3.5" fill="#9b4dca" stroke="#c084fc" strokeWidth="1"/>
        <circle cx="88" cy="16" r="3.5" fill="#9b4dca" stroke="#c084fc" strokeWidth="1"/>
      </g>
    </svg>
  );
}

// ─── KAEL — Frost Knight ──────────────────────────────────────────────────────
export function Kael({ size = 100 }) {
  const sc = size / 100;
  return (
    <svg width={140 * sc} height={162 * sc} viewBox="0 0 140 162" style={{ overflow: "visible" }}>
      <style>{KF}</style>
      <Portal cx={70} cy={150} rx={42} ry={12} color1="#06b6d4" color2="#0c4a6e" id="kael-p"
        particles={[0,45,90,135,180,225,270,315]}/>

      <g style={{ animation: `bob 0.95s cubic-bezier(0.45,0.05,0.55,0.95) infinite`, transformOrigin: "70px 130px" }}>
        <ellipse cx="70" cy="151" rx="30" ry="7" fill="rgba(0,0,0,0.32)"/>

        {/* Frost armor body */}
        <defs>
          <linearGradient id="kael-chest" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7dd3fc"/><stop offset="40%" stopColor="#0ea5e9"/><stop offset="100%" stopColor="#024a6e"/>
          </linearGradient>
          <linearGradient id="kael-arm" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8"/><stop offset="100%" stopColor="#0369a1"/>
          </linearGradient>
        </defs>

        {/* Left arm */}
        <g style={{ animation: `arm-l 0.95s cubic-bezier(0.45,0.05,0.55,0.95) infinite`, transformOrigin: "41px 84px" }}>
          <Sphere cx={41} cy={79} r={11} dark="#0369a1" mid="#0ea5e9" light="#7dd3fc" id="kael-lsh"/>
          <rect x="33" y="88" width="12" height="24" rx="6" fill="url(#kael-arm)" stroke="#38bdf8" strokeWidth="1.5"/>
          {/* Ice gauntlet */}
          <rect x="29" y="110" width="16" height="10" rx="3.5" fill="#0ea5e9" stroke="#7dd3fc" strokeWidth="1.2"/>
          <rect x="28" y="106" width="4.5" height="8" rx="2.5" fill="#38bdf8"/>
          <rect x="33" y="105" width="4.5" height="8" rx="2.5" fill="#38bdf8"/>
          <rect x="38" y="106" width="4" height="7" rx="2.5" fill="#38bdf8"/>
          <rect x="25" y="112" width="4" height="5" rx="2" fill="#38bdf8"/>
          {/* Ice crystal on knuckle */}
          <polygon points="34,104 36,99 38,104" fill="#e0f2fe" opacity="0.9"/>
        </g>

        {/* Right arm */}
        <g style={{ animation: `arm-r 0.95s cubic-bezier(0.45,0.05,0.55,0.95) infinite`, transformOrigin: "99px 84px" }}>
          <Sphere cx={99} cy={79} r={11} dark="#0369a1" mid="#0ea5e9" light="#7dd3fc" id="kael-rsh"/>
          <rect x="95" y="88" width="12" height="24" rx="6" fill="url(#kael-arm)" stroke="#38bdf8" strokeWidth="1.5"/>
          <rect x="95" y="110" width="16" height="10" rx="3.5" fill="#0ea5e9" stroke="#7dd3fc" strokeWidth="1.2"/>
          <rect x="95" y="106" width="4.5" height="8" rx="2.5" fill="#38bdf8"/>
          <rect x="100" y="105" width="4.5" height="8" rx="2.5" fill="#38bdf8"/>
          <rect x="105" y="106" width="4" height="7" rx="2.5" fill="#38bdf8"/>
          <rect x="111" y="112" width="4" height="5" rx="2" fill="#38bdf8"/>
          <polygon points="102,104 104,99 106,104" fill="#e0f2fe" opacity="0.9"/>
        </g>

        {/* Chest plate */}
        <rect x="45" y="74" width="50" height="42" rx="10" fill="url(#kael-chest)" stroke="#06b6d4" strokeWidth="2"
          style={{ animation: `breathe 0.95s ease-in-out infinite`, transformOrigin: "70px 95px" }}/>
        {/* Plate highlight */}
        <ellipse cx="60" cy="85" rx="12" ry="16" fill="rgba(200,240,255,0.18)" transform="rotate(-15 60 85)"/>
        {/* Frost rune */}
        <path d="M70 80 L70 100 M62 84 L78 96 M62 96 L78 84" stroke="#b3e5fc" strokeWidth="1.2" opacity="0.7"/>

        {/* Legs */}
        <g style={{ animation: `leg-l 0.95s cubic-bezier(0.45,0.05,0.55,0.95) infinite`, transformOrigin: "60px 116px" }}>
          <rect x="54" y="112" width="12" height="24" rx="6" fill="url(#kael-chest)" stroke="#06b6d4" strokeWidth="1.2"/>
          <ellipse cx="60" cy="137" rx="8" ry="5" fill="#0284c7" stroke="#06b6d4" strokeWidth="1"/>
        </g>
        <g style={{ animation: `leg-r 0.95s cubic-bezier(0.45,0.05,0.55,0.95) infinite`, transformOrigin: "80px 116px" }}>
          <rect x="74" y="112" width="12" height="24" rx="6" fill="url(#kael-chest)" stroke="#06b6d4" strokeWidth="1.2"/>
          <ellipse cx="80" cy="137" rx="8" ry="5" fill="#0284c7" stroke="#06b6d4" strokeWidth="1"/>
        </g>

        {/* Neck */}
        <rect x="62" y="66" width="16" height="12" rx="4" fill="#e0f2fe"/>

        {/* Head — frost */}
        <Sphere cx={70} cy={48} r={19} dark="#0a4060" mid="#90d8f8" light="#e0f7ff" id="kael-head"/>
        <g style={{ animation: `frost-glow 2.5s ease-in-out infinite`, transformOrigin: "70px 48px" }}>
          <circle cx="70" cy="48" r="19" fill="none" stroke="#7dd3fc" strokeWidth="1.5" opacity="0.5"/>
        </g>
        {/* Hair — ice blue */}
        <path d="M50 32 Q50 21 70 19 Q90 21 90 32" fill="#a7f3d0"/>
        <g style={{ animation: `hair 1.6s ease-in-out infinite`, transformOrigin: "45px 56px" }}>
          <path d="M49 39 Q44 50 42 70" stroke="#a7f3d0" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
        </g>
        <g style={{ animation: `hair 1.6s ease-in-out infinite reverse`, transformOrigin: "95px 56px" }}>
          <path d="M91 39 Q96 50 98 70" stroke="#a7f3d0" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
        </g>
        {/* Eyes */}
        <Sphere cx={59} cy={47} r={4} dark="#024a6e" mid="#06b6d4" light="#67e8f9" id="kael-el"/>
        <circle cx="59" cy="47" r="1.9" fill="#020e18"/>
        <circle cx="58" cy="46" r="1.1" fill="rgba(220,250,255,0.95)"/>
        <Sphere cx={81} cy={47} r={4} dark="#024a6e" mid="#06b6d4" light="#67e8f9" id="kael-er"/>
        <circle cx="81" cy="47" r="1.9" fill="#020e18"/>
        <circle cx="80" cy="46" r="1.1" fill="rgba(220,250,255,0.95)"/>
        <path d="M55 39 Q58 35 63 40" stroke="#0284c7" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M77 40 Q82 35 85 39" stroke="#0284c7" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M70 47 L70 56" stroke="#06b6d4" strokeWidth="1.2"/>
        <path d="M63 59 Q70 62 77 59" stroke="#0284c7" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        {/* Ice crown spikes */}
        <defs><linearGradient id="kael-spike" x1="0%" y1="100%" x2="0%" y2="0%"><stop offset="0%" stopColor="#7dd3fc"/><stop offset="100%" stopColor="#e0f2fe"/></linearGradient></defs>
        {[[-16,-3],[-8,4],[0,6],[8,4],[16,-3]].map(([dx, height], i) => (
          <polygon key={i} points={`${70+dx},29 ${70+dx-4},38 ${70+dx+4},38`}
            fill="url(#kael-spike)" opacity={0.8 + i * 0.04 - 0.16} transform={`translate(0,-${height})`}/>
        ))}
      </g>
    </svg>
  );
}

// ─── AURORA — Sun Paladin ─────────────────────────────────────────────────────
export function Aurora({ size = 100 }) {
  const sc = size / 100;
  return (
    <svg width={140 * sc} height={162 * sc} viewBox="0 0 140 162" style={{ overflow: "visible" }}>
      <style>{KF + `@keyframes aurora-glow { 0%,100%{filter:drop-shadow(0 0 8px #f59e0b)} 50%{filter:drop-shadow(0 0 24px #fbbf24)} }`}</style>
      <Portal cx={70} cy={150} rx={44} ry={12} color1="#fbbf24" color2="#b45309" id="aurora-p"
        particles={[0,30,60,90,120,150,180,210,240,270,300,330]}/>

      <g style={{ animation: `bob 1.05s cubic-bezier(0.45,0.05,0.55,0.95) infinite`, transformOrigin: "70px 130px" }}>
        <ellipse cx="70" cy="151" rx="30" ry="7" fill="rgba(0,0,0,0.3)"/>

        {/* Sun aura behind */}
        <g style={{ animation: `aurora-glow 2s ease-in-out infinite`, transformOrigin: "70px 90px" }}>
          {[0,30,60,90,120,150,180,210,240,270,300,330].map(a => (
            <line key={a} x1={70 + 50 * Math.cos(a * Math.PI / 180)} y1={90 + 50 * Math.sin(a * Math.PI / 180)}
              x2={70 + 60 * Math.cos(a * Math.PI / 180)} y2={90 + 60 * Math.sin(a * Math.PI / 180)}
              stroke="#fbbf24" strokeWidth="2" opacity="0.25"/>
          ))}
        </g>

        {/* Golden armor */}
        <defs>
          <linearGradient id="aurora-chest" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fde68a"/><stop offset="40%" stopColor="#f59e0b"/><stop offset="100%" stopColor="#7a4a00"/>
          </linearGradient>
          <linearGradient id="aurora-arm" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fcd34d"/><stop offset="100%" stopColor="#b45309"/>
          </linearGradient>
        </defs>

        {/* Left arm */}
        <g style={{ animation: `arm-l 1.05s cubic-bezier(0.45,0.05,0.55,0.95) infinite`, transformOrigin: "41px 84px" }}>
          <Sphere cx={41} cy={79} r={11} dark="#7a4a00" mid="#f59e0b" light="#fde68a" id="aurora-lsh"/>
          <rect x="33" y="88" width="12" height="24" rx="6" fill="url(#aurora-arm)" stroke="#fbbf24" strokeWidth="1.5"/>
          <rect x="29" y="110" width="16" height="10" rx="3.5" fill="#f59e0b" stroke="#fcd34d" strokeWidth="1.2"/>
          <rect x="28" y="106" width="4.5" height="8" rx="2.5" fill="#fbbf24"/>
          <rect x="33" y="105" width="4.5" height="8" rx="2.5" fill="#fbbf24"/>
          <rect x="38" y="106" width="4" height="7" rx="2.5" fill="#fbbf24"/>
          <rect x="25" y="112" width="4" height="5" rx="2" fill="#fbbf24"/>
          <circle cx="34" cy="117" r="3" fill="#fef3c7" opacity="0.9"/>
        </g>

        {/* Right arm */}
        <g style={{ animation: `arm-r 1.05s cubic-bezier(0.45,0.05,0.55,0.95) infinite`, transformOrigin: "99px 84px" }}>
          <Sphere cx={99} cy={79} r={11} dark="#7a4a00" mid="#f59e0b" light="#fde68a" id="aurora-rsh"/>
          <rect x="95" y="88" width="12" height="24" rx="6" fill="url(#aurora-arm)" stroke="#fbbf24" strokeWidth="1.5"/>
          <rect x="95" y="110" width="16" height="10" rx="3.5" fill="#f59e0b" stroke="#fcd34d" strokeWidth="1.2"/>
          <rect x="95" y="106" width="4.5" height="8" rx="2.5" fill="#fbbf24"/>
          <rect x="100" y="105" width="4.5" height="8" rx="2.5" fill="#fbbf24"/>
          <rect x="105" y="106" width="4" height="7" rx="2.5" fill="#fbbf24"/>
          <rect x="111" y="112" width="4" height="5" rx="2" fill="#fbbf24"/>
          <circle cx="106" cy="117" r="3" fill="#fef3c7" opacity="0.9"/>
        </g>

        {/* Chest */}
        <rect x="45" y="74" width="50" height="42" rx="10" fill="url(#aurora-chest)" stroke="#fbbf24" strokeWidth="2"
          style={{ animation: `breathe 1.05s ease-in-out infinite`, transformOrigin: "70px 95px" }}/>
        {/* Sun emblem */}
        <g style={{ animation: `sun-spin 1.8s ease-in-out infinite`, transformOrigin: "70px 93px" }}>
          <circle cx="70" cy="93" r="6" fill="#fef3c7"/>
          <circle cx="70" cy="93" r="8.5" fill="none" stroke="#fbbf24" strokeWidth="1.2" opacity="0.7"/>
          {[0,1,2,3,4,5].map(i => (
            <line key={i} x1="70" y1="84" x2="70" y2="79" stroke="#fbbf24" strokeWidth="2" opacity="0.7"
              transform={`rotate(${i * 60} 70 93)`}/>
          ))}
        </g>
        {/* Plate highlight */}
        <ellipse cx="60" cy="82" rx="10" ry="14" fill="rgba(255,240,160,0.22)" transform="rotate(-15 60 82)"/>

        {/* Legs */}
        <g style={{ animation: `leg-l 1.05s cubic-bezier(0.45,0.05,0.55,0.95) infinite`, transformOrigin: "60px 116px" }}>
          <rect x="54" y="112" width="12" height="24" rx="6" fill="url(#aurora-chest)" stroke="#d97706" strokeWidth="1.2"/>
          <ellipse cx="60" cy="137" rx="8" ry="5" fill="#b45309" stroke="#f59e0b" strokeWidth="1"/>
        </g>
        <g style={{ animation: `leg-r 1.05s cubic-bezier(0.45,0.05,0.55,0.95) infinite`, transformOrigin: "80px 116px" }}>
          <rect x="74" y="112" width="12" height="24" rx="6" fill="url(#aurora-chest)" stroke="#d97706" strokeWidth="1.2"/>
          <ellipse cx="80" cy="137" rx="8" ry="5" fill="#b45309" stroke="#f59e0b" strokeWidth="1"/>
        </g>

        {/* Neck */}
        <rect x="62" y="66" width="16" height="12" rx="4" fill="#fef3c7"/>

        {/* Head */}
        <Sphere cx={70} cy={48} r={19} dark="#b45309" mid="#fde68a" light="#fffbeb" id="aurora-head"/>
        <g style={{ animation: `aurora-glow 2s ease-in-out infinite` }}>
          <circle cx="70" cy="48" r="19" fill="none" stroke="#fbbf24" strokeWidth="1.5" opacity="0.4"/>
        </g>
        {/* Hair — golden */}
        <path d="M50 32 Q50 21 70 19 Q90 21 90 32" fill="#fbbf24"/>
        <g style={{ animation: `hair 1.9s ease-in-out infinite`, transformOrigin: "44px 56px" }}>
          <path d="M49 38 Q44 50 42 72" stroke="#f59e0b" strokeWidth="5" fill="none" strokeLinecap="round"/>
        </g>
        <g style={{ animation: `hair 1.9s ease-in-out infinite reverse`, transformOrigin: "96px 56px" }}>
          <path d="M91 38 Q96 50 98 72" stroke="#f59e0b" strokeWidth="5" fill="none" strokeLinecap="round"/>
        </g>
        {/* Eyes */}
        <Sphere cx={59} cy={47} r={4} dark="#7a4a00" mid="#f59e0b" light="#fef3c7" id="aurora-el"/>
        <circle cx="59" cy="47" r="1.9" fill="#1a0a00"/>
        <circle cx="58" cy="46" r="1.1" fill="rgba(255,250,230,0.98)"/>
        <Sphere cx={81} cy={47} r={4} dark="#7a4a00" mid="#f59e0b" light="#fef3c7" id="aurora-er"/>
        <circle cx="81" cy="47" r="1.9" fill="#1a0a00"/>
        <circle cx="80" cy="46" r="1.1" fill="rgba(255,250,230,0.98)"/>
        <path d="M55 39 Q58 35 63 40" stroke="#b45309" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M77 40 Q82 35 85 39" stroke="#b45309" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M70 47 L70 56" stroke="#f59e0b" strokeWidth="1.2"/>
        <path d="M63 59 Q70 62 77 59" stroke="#d97706" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        {/* Sun halo */}
        <circle cx="70" cy="48" r="23" fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.35" strokeDasharray="4 4"/>
      </g>
    </svg>
  );
}