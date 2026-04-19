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
  utt.rate = 0.78;
  utt.pitch = 0.45;
  utt.volume = 1;

  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v =>
    v.lang === "en-GB" &&
    (v.name.toLowerCase().includes("daniel") || v.name.toLowerCase().includes("george") ||
     v.name.toLowerCase().includes("male") || v.name.toLowerCase().includes("oliver"))
  ) || voices.find(v => v.lang === "en-GB") || voices.find(v => v.lang.startsWith("en"));
  if (preferred) utt.voice = preferred;

  const trySpeak = () => window.speechSynthesis.speak(utt);
  if (voices.length === 0) {
    window.speechSynthesis.onvoiceschanged = trySpeak;
  } else {
    trySpeak();
  }
}