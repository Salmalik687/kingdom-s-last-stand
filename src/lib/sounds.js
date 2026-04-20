// Web Audio API sound effects — no external dependencies

let ctx = null;

function getCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  return ctx;
}

function playTone({ frequency = 440, type = "sine", duration = 0.1, gain = 0.3, decay = true, detune = 0 }) {
  const ac = getCtx();
  const osc = ac.createOscillator();
  const gainNode = ac.createGain();

  osc.connect(gainNode);
  gainNode.connect(ac.destination);

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, ac.currentTime);
  if (detune) osc.detune.setValueAtTime(detune, ac.currentTime);
  gainNode.gain.setValueAtTime(gain, ac.currentTime);
  if (decay) gainNode.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + duration);

  osc.start(ac.currentTime);
  osc.stop(ac.currentTime + duration);
}

export function playKillSound() {
  // Quick satisfying pop
  playTone({ frequency: 320, type: "square", duration: 0.07, gain: 0.18, detune: 0 });
  setTimeout(() => playTone({ frequency: 500, type: "sine", duration: 0.06, gain: 0.12 }), 30);
}

export function playDamageSound() {
  // Low thud / grunt
  playTone({ frequency: 90, type: "sawtooth", duration: 0.15, gain: 0.4 });
  setTimeout(() => playTone({ frequency: 60, type: "sine", duration: 0.2, gain: 0.25 }), 20);
}

// Unique merge sounds — one per result tower type
export function playMergeSound(resultType) {
  const ac = getCtx();

  function tone(freq, type, duration, gain, startOffset = 0, detune = 0) {
    const osc = ac.createOscillator();
    const g = ac.createGain();
    osc.connect(g);
    g.connect(ac.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ac.currentTime + startOffset);
    if (detune) osc.detune.setValueAtTime(detune, ac.currentTime + startOffset);
    g.gain.setValueAtTime(gain, ac.currentTime + startOffset);
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + startOffset + duration);
    osc.start(ac.currentTime + startOffset);
    osc.stop(ac.currentTime + startOffset + duration);
  }

  switch (resultType) {
    case "ballista":
      // Twang + metallic ping
      tone(180, "sawtooth", 0.12, 0.3);
      tone(440, "sine", 0.18, 0.25, 0.05);
      tone(880, "sine", 0.10, 0.15, 0.15);
      break;
    case "warcannon":
      // Deep boom
      tone(80, "sawtooth", 0.3, 0.5);
      tone(120, "square", 0.2, 0.35, 0.05);
      tone(220, "sine", 0.15, 0.2, 0.1);
      break;
    case "doomcannon":
      // Massive explosion crescendo
      tone(55, "sawtooth", 0.4, 0.6);
      tone(110, "square", 0.35, 0.45, 0.04);
      tone(220, "sine", 0.25, 0.3, 0.1);
      tone(440, "sine", 0.2, 0.2, 0.2);
      tone(880, "sine", 0.15, 0.15, 0.3);
      break;
    case "stormArcher":
      // Fast ascending whistle
      tone(600, "sine", 0.08, 0.2);
      tone(800, "sine", 0.08, 0.2, 0.07);
      tone(1000, "sine", 0.1, 0.22, 0.14);
      break;
    case "arrowStorm":
      // Rapid flurry of pings
      [400, 500, 650, 800, 1000].forEach((f, i) =>
        tone(f, "sine", 0.07, 0.2, i * 0.05)
      );
      break;
    case "spellcaster":
      // Mystical ascending shimmer
      [330, 440, 554, 660, 880].forEach((f, i) =>
        tone(f, "sine", 0.18, 0.22, i * 0.06)
      );
      break;
    case "frozenMage":
      // Icy crystalline shimmer
      tone(880, "sine", 0.2, 0.2);
      tone(1100, "sine", 0.15, 0.18, 0.08);
      tone(660, "triangle", 0.25, 0.15, 0.04, -20);
      break;
    case "arcaneCannoneer":
      // Magic boom
      tone(200, "sawtooth", 0.25, 0.4);
      tone(440, "sine", 0.2, 0.3, 0.05);
      tone(880, "sine", 0.15, 0.2, 0.15);
      break;
    case "siegeEngine":
      // Heavy grinding crash
      tone(60, "sawtooth", 0.4, 0.55);
      tone(90, "square", 0.3, 0.35, 0.06);
      tone(180, "sine", 0.2, 0.25, 0.15);
      break;
    case "warMachine":
      // Clanging metal
      tone(150, "square", 0.25, 0.4);
      tone(300, "sawtooth", 0.2, 0.3, 0.08);
      tone(250, "sine", 0.18, 0.2, 0.16);
      break;
    case "blizzardTower":
      // Cold windy whoosh
      tone(220, "sine", 0.35, 0.15, 0, 30);
      tone(330, "sine", 0.3, 0.12, 0.07, -20);
      tone(440, "triangle", 0.25, 0.1, 0.14, 10);
      break;
    case "frostCannoneer":
      // Ice cannon crack
      tone(100, "sawtooth", 0.2, 0.45);
      tone(660, "sine", 0.15, 0.2, 0.06);
      tone(1100, "sine", 0.1, 0.15, 0.14);
      break;
    case "shadowMage":
      // Dark descending dread
      [880, 660, 440, 330].forEach((f, i) =>
        tone(f, "sawtooth", 0.15, 0.2, i * 0.07)
      );
      break;
    case "voidCannon":
      // Eerie void pulse
      tone(60, "sine", 0.5, 0.4);
      tone(440, "sine", 0.2, 0.2, 0.1, -50);
      tone(880, "sine", 0.12, 0.15, 0.25, 50);
      break;
    case "glacialBallista":
      // Ice bolt thud
      tone(500, "sine", 0.15, 0.25);
      tone(750, "triangle", 0.12, 0.2, 0.08);
      tone(1200, "sine", 0.08, 0.15, 0.18);
      break;
    case "thunderArcher":
      // Electric crack + high whine
      tone(100, "square", 0.1, 0.4);
      tone(800, "sine", 0.12, 0.25, 0.04);
      tone(1600, "sine", 0.08, 0.15, 0.12);
      break;
    case "infernoTrebuchet":
      // Roaring fire launch
      tone(70, "sawtooth", 0.45, 0.55);
      tone(140, "sawtooth", 0.35, 0.4, 0.05);
      tone(280, "sine", 0.25, 0.3, 0.15);
      tone(560, "sine", 0.15, 0.2, 0.28);
      break;
    case "venomCrossbow":
      // Hissing poison dart
      tone(600, "sawtooth", 0.08, 0.3);
      tone(300, "sine", 0.12, 0.2, 0.06, -30);
      tone(450, "triangle", 0.1, 0.15, 0.13);
      break;
    case "doomSiege":
      // Earth-shattering ULTRA boom
      tone(40, "sawtooth", 0.6, 0.7);
      tone(80, "square", 0.5, 0.55, 0.04);
      tone(160, "sawtooth", 0.4, 0.4, 0.1);
      tone(320, "sine", 0.3, 0.3, 0.2);
      tone(640, "sine", 0.2, 0.2, 0.32);
      tone(1280, "sine", 0.15, 0.15, 0.44);
      break;
    case "frostStorm":
      // Icy rapid volley
      [1000, 800, 600, 400, 600, 800].forEach((f, i) =>
        tone(f, "sine", 0.08, 0.18, i * 0.05)
      );
      break;
    case "arcaneSiege":
      // Arcane heavy charge
      tone(110, "sawtooth", 0.35, 0.45);
      tone(440, "sine", 0.25, 0.3, 0.08);
      tone(660, "sine", 0.18, 0.22, 0.18);
      tone(880, "sine", 0.12, 0.15, 0.28);
      break;
    default:
      // Generic merge chime
      tone(440, "sine", 0.15, 0.3);
      tone(660, "sine", 0.12, 0.25, 0.08);
      tone(880, "sine", 0.1, 0.2, 0.16);
  }
}

export function playWaveSuccessSound() {
  // Triumphant fanfare arpeggio
  const notes = [523, 659, 784, 1047];
  notes.forEach((freq, i) => {
    setTimeout(() => playTone({ frequency: freq, type: "sine", duration: 0.25, gain: 0.22 }), i * 110);
  });
}

const VICTORY_SHOUTS = [
  "The round is won! Glory to Eldenmoor!",
  "Hah! Yield, thou foul wretches! The kingdom stands!",
  "Victory! By the crown of Aldric, we endure!",
  "Begone, vile horde! This land shall never fall!",
  "The enemy flees! Eldenmoor prevails this day!",
];

export function playVictoryShout() {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const text = VICTORY_SHOUTS[Math.floor(Math.random() * VICTORY_SHOUTS.length)];
  const utt = new SpeechSynthesisUtterance(text);
  
  // Drunk British accent: slower rate, slurred pitch variations, volume wobbles
  utt.rate = 0.65 + Math.random() * 0.15; // Slurred, stumbling pace
  utt.pitch = 0.3 + Math.random() * 0.4; // Pitch wavers unpredictably
  utt.volume = 0.8 + Math.random() * 0.2; // Volume fluctuates

  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v =>
    v.lang === "en-GB" &&
    (v.name.toLowerCase().includes("victoria") || v.name.toLowerCase().includes("sarah") ||
     v.name.toLowerCase().includes("female") || v.name.toLowerCase().includes("woman"))
  ) || voices.find(v => v.lang === "en-GB") || voices.find(v => v.lang.startsWith("en"));
  if (preferred) utt.voice = preferred;

  const trySpeak = () => window.speechSynthesis.speak(utt);
  if (voices.length === 0) {
    window.speechSynthesis.onvoiceschanged = trySpeak;
  } else {
    trySpeak();
  }
}