// Web Audio API sound effects — no external dependencies
import { isMuted, registerAudioContext } from "./audioContext";

let ctx = null;

function getCtx() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    // iOS suspends new contexts until a user gesture. Register so the
    // one-shot gesture listener in audioContext.js can resume it.
    registerAudioContext(ctx);
  }
  return ctx;
}

function tone(freq, type, duration, gain, startOffset = 0, detune = 0) {
  const ac = getCtx();
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

function noise(duration, gain, startOffset = 0) {
  const ac = getCtx();
  const bufferSize = ac.sampleRate * duration;
  const buffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const src = ac.createBufferSource();
  src.buffer = buffer;
  const g = ac.createGain();
  src.connect(g);
  g.connect(ac.destination);
  g.gain.setValueAtTime(gain, ac.currentTime + startOffset);
  g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + startOffset + duration);
  src.start(ac.currentTime + startOffset);
  src.stop(ac.currentTime + startOffset + duration);
}

// ─── Kill sound — punchy pop with a tiny noise burst ──────────────────────
export function playKillSound() {
  if (isMuted()) return;
  tone(380, "square", 0.06, 0.22);
  tone(560, "sine", 0.05, 0.14, 0.025);
  noise(0.04, 0.08);
}

// ─── Boss kill — big dramatic BOOM ────────────────────────────────────────
export function playBossKillSound() {
  if (isMuted()) return;
  noise(0.3, 0.35);
  tone(55, "sawtooth", 0.55, 0.5);
  tone(110, "square", 0.4, 0.35, 0.05);
  tone(220, "sine", 0.3, 0.25, 0.15);
  tone(880, "sine", 0.2, 0.2, 0.25);
}

// ─── Tower placement — satisfying clunk + ping ────────────────────────────
export function playPlaceSound() {
  if (isMuted()) return;
  noise(0.06, 0.2);
  tone(160, "square", 0.12, 0.3);
  tone(320, "sine", 0.1, 0.18, 0.04);
  tone(640, "sine", 0.08, 0.12, 0.1);
}

// ─── Gold coin pickup chime ───────────────────────────────────────────────
export function playGoldSound() {
  if (isMuted()) return;
  tone(880, "sine", 0.1, 0.18);
  tone(1100, "sine", 0.09, 0.15, 0.06);
  tone(1320, "sine", 0.08, 0.12, 0.12);
}

// ─── Damage (enemy reaches castle) — heavy thud ───────────────────────────
export function playDamageSound() {
  if (isMuted()) return;
  noise(0.1, 0.3);
  tone(80, "sawtooth", 0.2, 0.45);
  tone(55, "sine", 0.25, 0.3, 0.04);
}

// ─── Wave start — war horn ─────────────────────────────────────────────────
export function playWaveStartSound() {
  if (isMuted()) return;
  tone(130, "sawtooth", 0.35, 0.35);
  tone(196, "sawtooth", 0.3, 0.3, 0.18);
  tone(261, "sawtooth", 0.4, 0.35, 0.36);
  tone(196, "sawtooth", 0.25, 0.25, 0.6);
  tone(130, "sawtooth", 0.35, 0.3, 0.78);
}

// ─── Merge sounds — unique per result tower ───────────────────────────────
export function playMergeSound(resultType) {
  if (isMuted()) return;

  switch (resultType) {
    case "ballista":
      tone(180, "sawtooth", 0.12, 0.3);
      tone(440, "sine", 0.18, 0.25, 0.05);
      tone(880, "sine", 0.10, 0.15, 0.15);
      noise(0.05, 0.15);
      break;
    case "warcannon":
      noise(0.18, 0.3);
      tone(80, "sawtooth", 0.3, 0.5);
      tone(120, "square", 0.2, 0.35, 0.05);
      tone(220, "sine", 0.15, 0.2, 0.1);
      break;
    case "doomcannon":
      noise(0.3, 0.4);
      tone(55, "sawtooth", 0.4, 0.6);
      tone(110, "square", 0.35, 0.45, 0.04);
      tone(220, "sine", 0.25, 0.3, 0.1);
      tone(440, "sine", 0.2, 0.2, 0.2);
      tone(880, "sine", 0.15, 0.15, 0.3);
      break;
    case "stormArcher":
      tone(600, "sine", 0.08, 0.2);
      tone(800, "sine", 0.08, 0.2, 0.07);
      tone(1000, "sine", 0.1, 0.22, 0.14);
      break;
    case "arrowStorm":
      [400, 500, 650, 800, 1000].forEach((f, i) => tone(f, "sine", 0.07, 0.2, i * 0.05));
      break;
    case "spellcaster":
      [330, 440, 554, 660, 880].forEach((f, i) => tone(f, "sine", 0.18, 0.22, i * 0.06));
      break;
    case "frozenMage":
      tone(880, "sine", 0.2, 0.2);
      tone(1100, "sine", 0.15, 0.18, 0.08);
      tone(660, "triangle", 0.25, 0.15, 0.04, -20);
      break;
    case "arcaneCannoneer":
      noise(0.1, 0.2);
      tone(200, "sawtooth", 0.25, 0.4);
      tone(440, "sine", 0.2, 0.3, 0.05);
      tone(880, "sine", 0.15, 0.2, 0.15);
      break;
    case "siegeEngine":
      noise(0.2, 0.28);
      tone(60, "sawtooth", 0.4, 0.55);
      tone(90, "square", 0.3, 0.35, 0.06);
      break;
    case "warMachine":
      noise(0.12, 0.22);
      tone(150, "square", 0.25, 0.4);
      tone(300, "sawtooth", 0.2, 0.3, 0.08);
      break;
    case "blizzardTower":
      tone(220, "sine", 0.35, 0.15, 0, 30);
      tone(330, "sine", 0.3, 0.12, 0.07, -20);
      tone(440, "triangle", 0.25, 0.1, 0.14, 10);
      break;
    case "frostCannoneer":
      noise(0.08, 0.18);
      tone(100, "sawtooth", 0.2, 0.45);
      tone(660, "sine", 0.15, 0.2, 0.06);
      break;
    case "shadowMage":
      [880, 660, 440, 330].forEach((f, i) => tone(f, "sawtooth", 0.15, 0.2, i * 0.07));
      break;
    case "voidCannon":
      tone(60, "sine", 0.5, 0.4);
      tone(440, "sine", 0.2, 0.2, 0.1, -50);
      tone(880, "sine", 0.12, 0.15, 0.25, 50);
      break;
    case "glacialBallista":
      tone(500, "sine", 0.15, 0.25);
      tone(750, "triangle", 0.12, 0.2, 0.08);
      tone(1200, "sine", 0.08, 0.15, 0.18);
      break;
    case "thunderArcher":
      noise(0.08, 0.3);
      tone(100, "square", 0.1, 0.4);
      tone(800, "sine", 0.12, 0.25, 0.04);
      tone(1600, "sine", 0.08, 0.15, 0.12);
      break;
    case "infernoTrebuchet":
      noise(0.2, 0.3);
      tone(70, "sawtooth", 0.45, 0.55);
      tone(140, "sawtooth", 0.35, 0.4, 0.05);
      tone(280, "sine", 0.25, 0.3, 0.15);
      break;
    case "venomCrossbow":
      tone(600, "sawtooth", 0.08, 0.3);
      tone(300, "sine", 0.12, 0.2, 0.06, -30);
      break;
    case "doomSiege":
      noise(0.35, 0.5);
      tone(40, "sawtooth", 0.6, 0.7);
      tone(80, "square", 0.5, 0.55, 0.04);
      tone(160, "sawtooth", 0.4, 0.4, 0.1);
      tone(320, "sine", 0.3, 0.3, 0.2);
      tone(640, "sine", 0.2, 0.2, 0.32);
      break;
    case "frostStorm":
      [1000, 800, 600, 400, 600, 800].forEach((f, i) => tone(f, "sine", 0.08, 0.18, i * 0.05));
      break;
    case "arcaneSiege":
      noise(0.15, 0.22);
      tone(110, "sawtooth", 0.35, 0.45);
      tone(440, "sine", 0.25, 0.3, 0.08);
      tone(880, "sine", 0.12, 0.15, 0.28);
      break;
    default:
      tone(440, "sine", 0.15, 0.3);
      tone(660, "sine", 0.12, 0.25, 0.08);
      tone(880, "sine", 0.1, 0.2, 0.16);
  }
}

// ─── Wave success fanfare ─────────────────────────────────────────────────
export function playWaveSuccessSound() {
  if (isMuted()) return 0;
  const notes = [523, 659, 784, 1047];
  notes.forEach((freq, i) => {
    setTimeout(() => {
      tone(freq, "sine", 0.28, 0.24, 0);
      tone(freq * 2, "sine", 0.15, 0.08, 0);
    }, i * 110);
  });
  return notes.length * 110 + 250;
}

// ─── Victory shout ────────────────────────────────────────────────────────
const VICTORY_SHOUTS = [
  "The round is won! Glory to Eldenmoor!",
  "Hah! Yield, thou foul wretches! The kingdom stands!",
  "Victory! By the crown of Aldric, we endure!",
  "Begone, vile horde! This land shall never fall!",
  "The enemy flees! Eldenmoor prevails this day!",
];

export function playVictoryShout() {
  if (isMuted()) return;
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const text = VICTORY_SHOUTS[Math.floor(Math.random() * VICTORY_SHOUTS.length)];
  const utt = new SpeechSynthesisUtterance(text);
  utt.rate = 0.65 + Math.random() * 0.15;
  utt.pitch = 0.3 + Math.random() * 0.4;
  utt.volume = 0.8 + Math.random() * 0.2;
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v =>
    v.lang === "en-GB" &&
    (v.name.toLowerCase().includes("victoria") || v.name.toLowerCase().includes("sarah") ||
     v.name.toLowerCase().includes("female") || v.name.toLowerCase().includes("woman"))
  ) || voices.find(v => v.lang === "en-GB") || voices.find(v => v.lang.startsWith("en"));
  if (preferred) utt.voice = preferred;
  const trySpeak = () => window.speechSynthesis.speak(utt);
  if (voices.length === 0) { window.speechSynthesis.onvoiceschanged = trySpeak; } else { trySpeak(); }
}