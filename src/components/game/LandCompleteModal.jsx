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
    lines: [
      { speaker: "Lord Aldric", emoji: "⚔️", text: "The Shadow Sovereign falls! Eldenmoor stands victorious!", color: "#c084fc" },
      { speaker: "Lord Aldric", emoji: "⚔️", text: "A blinding light tears through the darkness... and then — silence.", color: "#c084fc" },
      { speaker: "Queen Seraphine", emoji: "👸", text: "Lord Aldric... you came back.", color: "#f9a8d4" },
      { speaker: "Lord Aldric", emoji: "⚔️", text: "My Queen — I swore I would. Eldenmoor is safe. The shadow is broken.", color: "#c084fc" },
      { speaker: "Queen Seraphine", emoji: "👸", text: "I watched from the tower every single wave. I never stopped believing in you.", color: "#f9a8d4" },
      { speaker: "Lord Aldric", emoji: "⚔️", text: "Then this victory belongs to you, my Queen. Always.", color: "#c084fc" },
      { speaker: "Queen Seraphine", emoji: "👸", text: "Rise, Champion of Eldenmoor. Rise, and let the kingdom celebrate your name FOREVER.", color: "#f9a8d4" },
    ],
    reward: 2000,
    rewardLabel: "Eternal Glory",
    isFinal: true,
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