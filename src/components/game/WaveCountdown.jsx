import { useEffect, useState } from "react";

export default function WaveCountdown({ waveActive, waveQueue, waveTimer }) {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [nextEnemyEmoji, setNextEnemyEmoji] = useState("");

  useEffect(() => {
    if (!waveActive || waveQueue.length === 0) {
      setTimeRemaining(0);
      setNextEnemyEmoji("");
      return;
    }

    const nextEnemy = waveQueue[0];
    const remaining = Math.max(0, nextEnemy.delay - waveTimer);
    setTimeRemaining(remaining);
    
    // Get emoji for next enemy (would need to import enemy data, using fallback)
    setNextEnemyEmoji(nextEnemy.emoji || "👹");
  }, [waveActive, waveQueue, waveTimer]);

  if (!waveActive || timeRemaining === 0 || waveQueue.length === 0) {
    return null;
  }

  const seconds = (timeRemaining / 1000).toFixed(1);
  const isWarning = timeRemaining < 3000;

  return (
    <div className="absolute bottom-8 left-8 z-10"
      style={{
        animation: isWarning ? "countdownPulse 0.4s ease-in-out infinite" : "none",
      }}>
      
      <div className="flex flex-col items-center gap-2">
        {/* Next enemy preview */}
        <div className="text-5xl" style={{ filter: isWarning ? "drop-shadow(0 0 12px #ef4444)" : "drop-shadow(0 0 8px rgba(255,150,0,0.5))" }}>
          {nextEnemyEmoji}
        </div>
        
        {/* Countdown */}
        <div className="text-center rounded-xl px-6 py-3"
          style={{
            background: isWarning
              ? "linear-gradient(180deg, #7f1d1d, #450a0a)"
              : "linear-gradient(180deg, #1a2a4a, #0a1a3a)",
            border: `2px solid ${isWarning ? "#fca5a5" : "#60a5fa"}`,
            boxShadow: isWarning
              ? "0 0 30px rgba(239,68,68,0.6), 0 0 60px rgba(239,68,68,0.3)"
              : "0 0 20px rgba(96,165,250,0.4)",
          }}>
          
          <div className="text-sm font-bold uppercase tracking-widest" style={{ color: isWarning ? "#fca5a5" : "#93c5fd" }}>
            Next Wave
          </div>
          <div className="text-4xl font-black" style={{
            color: isWarning ? "#ef4444" : "#60a5fa",
            textShadow: isWarning ? "0 0 20px #ef4444" : "0 0 10px #60a5fa",
          }}>
            {seconds}s
          </div>
        </div>
      </div>

      <style>{`
        @keyframes countdownPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
      `}</style>
    </div>
  );
}