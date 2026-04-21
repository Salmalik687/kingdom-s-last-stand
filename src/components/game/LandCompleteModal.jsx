import { useEffect, useState } from "react";

const LAND_SCENES = {
  1: {
    title: "The Meadow Falls Silent",
    land: "🌿 Land 1: The Verdant Meadow",
    boss: "🐉 Forest Drake",
    bg: "linear-gradient(160deg, #052405 0%, #0a3a0a 50%, #0d4a10 100%)",
    border: "#1a6a1a",
    glow: "#22c55e",
    particles: ["🌿", "🍃", "🌸", "🌻", "🦋"],
    narrator: "Lord Aldric",
    lines: [
      "The meadows of Eldenmoor are safe at last.",
      "The Forest Drake lies slain — its ancient terror ended.",
      "The birds sing once more. The flowers bloom again.",
      "But dark whispers drift from the north... The Dungeon awaits.",
    ],
    reward: 300,
    rewardLabel: "Meadow Gold",
  },
  2: {
    title: "Darkness Broken",
    land: "🪨 Land 2: The Dark Dungeon",
    boss: "🧟 Dungeon Overlord",
    bg: "linear-gradient(160deg, #04040f 0%, #080818 50%, #0c0c25 100%)",
    border: "#2a2a6a",
    glow: "#6366f1",
    particles: ["🪨", "💀", "🗡️", "🕯️", "⚗️"],
    narrator: "Lord Aldric",
    lines: [
      "The Dungeon Overlord let out one final shriek before crumbling to dust.",
      "Torchlight fills the ancient halls once more.",
      "The prisoners are freed. The chains are broken.",
      "Yet a tremor shakes the earth... the volcanoes stir with fury.",
    ],
    reward: 500,
    rewardLabel: "Dungeon Spoils",
  },
  3: {
    title: "The Fires Extinguished",
    land: "🌋 Land 3: Volcanic Wastes",
    boss: "🔥 Flame Titan",
    bg: "linear-gradient(160deg, #150302 0%, #2a0500 50%, #3d0800 100%)",
    border: "#7a1a00",
    glow: "#f97316",
    particles: ["🌋", "🔥", "⚡", "💎", "🪙"],
    narrator: "Lord Aldric",
    lines: [
      "The Flame Titan roared as Eldenmoor's arrows found their mark!",
      "The lava cools. The volcanic wastes grow still.",
      "Our kingdom grows stronger with every victory.",
      "But a bone-chilling wind blows from the frozen north. Brace yourselves!",
    ],
    reward: 750,
    rewardLabel: "Volcanic Riches",
  },
  4: {
    title: "The Ice Age Ends",
    land: "❄️ Land 4: The Frozen Abyss",
    boss: "❄️ Frost Colossus",
    bg: "linear-gradient(160deg, #020210 0%, #04041e 50%, #06063a 100%)",
    border: "#0a0a80",
    glow: "#60a5fa",
    particles: ["❄️", "🌨️", "💠", "🧊", "⭐"],
    narrator: "Lord Aldric",
    lines: [
      "The Frost Colossus shatters into a thousand glittering crystals!",
      "Warmth returns to the Frozen Abyss for the first time in an age.",
      "The people of Eldenmoor weep with joy and relief.",
      "One final land remains — the Shadow Realm. Our greatest trial.",
    ],
    reward: 1000,
    rewardLabel: "Frozen Treasures",
  },
  5: {
    title: "The Shadow Falls",
    land: "💀 Land 5: The Shadow Realm",
    boss: "💀 Shadow Sovereign",
    bg: "linear-gradient(160deg, #0a0010 0%, #180530 50%, #220050 100%)",
    border: "#7a20c0",
    glow: "#e879f9",
    particles: ["👑", "✨", "🌟", "💜", "🕊️"],
    narrator: "Lord Aldric",
    lines: [
      "The Shadow Sovereign falls! Eldenmoor stands victorious!",
      "A blinding light tears through the darkness... and then — silence.",
      "My Queen — I swore I would return. Eldenmoor is safe. The shadow is broken.",
      "But the Demon Lord's throne still stands. The greatest evil awaits...",
    ],
    reward: 2000,
    rewardLabel: "Shadow Spoils",
  },
  6: {
    title: "The Demon Lord Slain",
    land: "👑 Land 6: The Demon's Throne",
    boss: "👑 Demon Lord Malgrath",
    bg: "linear-gradient(160deg, #0a0005 0%, #1a000a 50%, #250010 100%)",
    border: "#8a001a",
    glow: "#ff4d6d",
    particles: ["👑", "🔥", "⚔️", "💥", "✨"],
    narrator: "Lord Aldric",
    lines: [
      "Demon Lord Malgrath — he who plagued Eldenmoor for ten thousand years — is NO MORE.",
      "By our hand, the demon throne crumbles to ash and shadow.",
      "The realm breathes free for the first time in an age.",
      "Yet the ancient gates crack open... something far older stirs beyond.",
    ],
    reward: 2500,
    rewardLabel: "Demon's Hoard",
  },
  7: {
    title: "The Gates Hold No More",
    land: "⚔️ Land 7: The Shattered Gates",
    boss: "⚔️ Guardian of the Gates",
    bg: "linear-gradient(160deg, #0f0810 0%, #1a1620 50%, #252035 100%)",
    border: "#3a2a5a",
    glow: "#a78bfa",
    particles: ["⚔️", "🛡️", "💫", "🌀", "⚡"],
    narrator: "Lord Aldric",
    lines: [
      "The Guardian of the Gates falls. The ancient seals are shattered forever.",
      "What lay beyond these gates was never meant to be unleashed.",
      "Strange creatures pour from the rift — unlike anything we have faced.",
      "We march on. Eldenmoor's survival demands nothing less.",
    ],
    reward: 3000,
    rewardLabel: "Gate Relics",
  },
  8: {
    title: "The Grove Cleansed",
    land: "🍂 Land 8: The Corrupted Grove",
    boss: "🍂 The Corrupted Bloom",
    bg: "linear-gradient(160deg, #0a150a 0%, #0f2a0f 50%, #1a3a1a 100%)",
    border: "#2a5a1a",
    glow: "#86efac",
    particles: ["🍂", "🌿", "🍃", "🌸", "💚"],
    narrator: "Lord Aldric",
    lines: [
      "The Corrupted Bloom withers and dies. The grove exhales its last poisoned breath.",
      "Ancient nature, twisted beyond recognition, finds peace at last.",
      "Seeds of renewal fall where corruption once choked all life.",
      "The plaguelands lie ahead. Disease and rot await our blades.",
    ],
    reward: 3500,
    rewardLabel: "Grove Essence",
  },
  9: {
    title: "The Plague Ends",
    land: "☠️ Land 9: The Plaguelands",
    boss: "☠️ The Plague Mother",
    bg: "linear-gradient(160deg, #0a0a05 0%, #1a1a0a 50%, #252510 100%)",
    border: "#5a5a1a",
    glow: "#d9f99d",
    particles: ["☠️", "⚗️", "🌿", "🍀", "✨"],
    narrator: "Lord Aldric",
    lines: [
      "The Plague Mother's reign of pestilence is finally ended.",
      "Clean wind sweeps across the once-rotted lands. People emerge from hiding.",
      "Our warriors stand strong — tempered by every horror they have faced.",
      "The Crystallic Scar calls. Reality itself is cracked and bleeding.",
    ],
    reward: 4000,
    rewardLabel: "Plague Cures",
  },
  10: {
    title: "The Scar Sealed",
    land: "💎 Land 10: The Crystallic Scar",
    boss: "💎 The Crystalline Titan",
    bg: "linear-gradient(160deg, #080a0f 0%, #0f1420 50%, #1a2a3a 100%)",
    border: "#1a3a7a",
    glow: "#7dd3fc",
    particles: ["💎", "💠", "⭐", "🌊", "🔮"],
    narrator: "Lord Aldric",
    lines: [
      "The Crystalline Titan shatters into ten thousand glittering shards.",
      "The wound in reality seals shut — for now.",
      "Ten lands. Ten horrors. And still we stand.",
      "The storms ahead are unlike anything before. Brace thy soul.",
    ],
    reward: 5000,
    rewardLabel: "Crystal Fragments",
  },
};

export default function LandCompleteModal({ landNumber, show, onContinue }) {
  const [visible, setVisible] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  const scene = LAND_SCENES[landNumber];

  // Helper: get line text whether it's a string or object
  const getLineText = (line) => (typeof line === "object" ? line.text : line);
  const getLineSpeaker = (line) => (typeof line === "object" ? line.speaker : scene?.narrator);
  const getLineEmoji = (line) => (typeof line === "object" ? line.emoji : "⚔");
  const getLineColor = (line) => (typeof line === "object" ? line.color : scene?.glow);

  useEffect(() => {
    if (show && scene) {
      setVisible(true);
      setLineIndex(0);
      setTyped("");
      setDone(false);
      // Speech
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        const lastLine = scene.lines[scene.lines.length - 1];
        const shout = scene.isFinal
          ? "Rise, Champion of Eldenmoor. Rise, and let the kingdom celebrate your name forever!"
          : getLineText(lastLine);
        const utt = new SpeechSynthesisUtterance(shout);
        utt.rate = scene.isFinal ? 0.60 : 0.75;
        utt.pitch = scene.isFinal ? 0.7 : 0.4;
        utt.volume = 1;
        const voices = window.speechSynthesis.getVoices();
        const v = voices.find(v => v.lang === "en-GB") || voices.find(v => v.lang.startsWith("en"));
        if (v) utt.voice = v;
        setTimeout(() => window.speechSynthesis.speak(utt), 800);
      }
    } else {
      setVisible(false);
    }
  }, [show, landNumber]);

  // Typewriter
  useEffect(() => {
    if (!visible || !scene) return;
    const line = getLineText(scene.lines[lineIndex] || "");
    if (typed.length < line.length) {
      const t = setTimeout(() => setTyped(line.slice(0, typed.length + 1)), 28);
      return () => clearTimeout(t);
    }
  }, [visible, typed, lineIndex, scene]);

  const advanceLine = () => {
    if (!scene) return;
    const line = getLineText(scene.lines[lineIndex] || "");
    if (typed.length < line.length) {
      setTyped(line);
      return;
    }
    if (lineIndex < scene.lines.length - 1) {
      setLineIndex(l => l + 1);
      setTyped("");
    } else {
      setDone(true);
    }
  };

  if (!visible || !scene) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.92)" }}>

      {/* Floating particles */}
      {scene.particles.map((p, i) => (
        <div key={i} className="absolute text-2xl pointer-events-none select-none"
          style={{
            left: `${10 + i * 18}%`,
            top: `${8 + (i % 3) * 12}%`,
            animation: `bounce ${1.5 + i * 0.3}s ease-in-out infinite`,
            animationDelay: `${i * 0.2}s`,
            opacity: 0.6,
          }}>
          {p}
        </div>
      ))}
      {scene.particles.map((p, i) => (
        <div key={`b${i}`} className="absolute text-xl pointer-events-none select-none"
          style={{
            right: `${5 + i * 16}%`,
            bottom: `${10 + (i % 4) * 10}%`,
            animation: `bounce ${1.8 + i * 0.25}s ease-in-out infinite`,
            animationDelay: `${i * 0.3 + 0.5}s`,
            opacity: 0.45,
          }}>
          {p}
        </div>
      ))}

      {/* Modal */}
      <div className="relative max-w-lg w-full mx-4 rounded-2xl overflow-hidden"
        style={{
          background: scene.bg,
          border: `3px solid ${scene.border}`,
          boxShadow: `0 0 80px ${scene.glow}55, 0 8px 0 #000, 0 0 50px ${scene.glow}22`,
          animation: "cardFloat 3s ease-in-out infinite",
        }}>

        {/* Glow top bar */}
        <div style={{ height: 4, background: `linear-gradient(90deg, transparent, ${scene.glow}, transparent)` }} />

        <div className="px-6 pt-6 pb-2 text-center">
          {/* Land badge */}
          <div className="inline-block text-xs font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full mb-3"
            style={{ background: `${scene.glow}22`, border: `1px solid ${scene.glow}55`, color: scene.glow }}>
            {scene.land}
          </div>

          {/* Title */}
          <h2 className="text-2xl font-black mb-1"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              color: "#fff",
              textShadow: `0 0 30px ${scene.glow}`,
              animation: "titleGlow 2s ease-in-out infinite",
            }}>
            {scene.title}
          </h2>

          {/* Boss defeated */}
          <p className="text-sm font-bold mb-4" style={{ color: scene.glow }}>
            ⚔ {scene.boss} Defeated!
          </p>
        </div>

        {/* Dialogue box */}
        <div className="mx-6 mb-4 rounded-xl p-4 cursor-pointer select-none"
          style={{ background: "rgba(0,0,0,0.55)", border: `1px solid ${scene.border}`, minHeight: 90 }}
          onClick={advanceLine}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{getLineEmoji(scene.lines[lineIndex])}</span>
            <span className="text-xs font-black uppercase tracking-widest" style={{ color: getLineColor(scene.lines[lineIndex]) }}>
              {getLineSpeaker(scene.lines[lineIndex])}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-white" style={{ minHeight: 48 }}>
            {typed}
            <span className="animate-pulse" style={{ color: getLineColor(scene.lines[lineIndex]) }}>▌</span>
          </p>
          <div className="flex items-center justify-between mt-3">
            <div className="flex gap-1">
              {scene.lines.map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full" style={{
                  background: i <= lineIndex ? scene.glow : "#333"
                }} />
              ))}
            </div>
            <span className="text-[10px] font-bold" style={{ color: `${scene.glow}88` }}>
              {done ? "Click to claim reward" : "Click to continue"}
            </span>
          </div>
        </div>

        {/* Reward + Continue */}
        {done && (
          <div className="px-6 pb-6">
            <div className="flex items-center justify-center gap-3 mb-4 p-3 rounded-xl"
              style={{ background: "rgba(255,214,10,0.08)", border: "1px solid rgba(255,214,10,0.25)" }}>
              <span className="text-2xl">💰</span>
              <div>
                <div className="text-xs font-bold text-yellow-500 uppercase tracking-widest">{scene.rewardLabel}</div>
                <div className="text-xl font-black text-yellow-300">+{scene.reward} Gold</div>
              </div>
            </div>
            <button
              onClick={onContinue}
              className="w-full rounded-xl py-3 font-black text-sm uppercase tracking-widest transition-all"
              style={{
                background: `linear-gradient(180deg, ${scene.glow}, ${scene.border})`,
                border: `2px solid ${scene.glow}`,
                boxShadow: `0 5px 0 #000, 0 0 25px ${scene.glow}44`,
                color: "#fff",
              }}>
              {scene.isFinal ? "🏆 Claim Victory!" : "⚔ March Onward!"}
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes titleGlow {
          0%, 100% { filter: drop-shadow(0 0 20px currentColor); }
          50% { filter: drop-shadow(0 0 40px currentColor); }
        }
      `}</style>
    </div>
  );
}