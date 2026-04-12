import { Heart, Coins, Swords, Trophy } from "lucide-react";

export default function GameHUD({ lives, gold, wave, score, maxWave }) {
  return (
    <div className="flex items-center gap-4 md:gap-6 flex-wrap">
      <div className="flex items-center gap-2 bg-red-950/60 border border-red-800/40 rounded-lg px-3 py-1.5">
        <Heart className="w-4 h-4 text-red-400" fill="currentColor" />
        <span className="text-red-200 font-bold text-sm">{lives}</span>
      </div>
      <div className="flex items-center gap-2 bg-yellow-950/60 border border-yellow-800/40 rounded-lg px-3 py-1.5">
        <Coins className="w-4 h-4 text-yellow-400" />
        <span className="text-yellow-200 font-bold text-sm">{gold}</span>
      </div>
      <div className="flex items-center gap-2 bg-blue-950/60 border border-blue-800/40 rounded-lg px-3 py-1.5">
        <Swords className="w-4 h-4 text-blue-400" />
        <span className="text-blue-200 font-bold text-sm">Wave {wave}</span>
      </div>
      <div className="flex items-center gap-2 bg-purple-950/60 border border-purple-800/40 rounded-lg px-3 py-1.5">
        <Trophy className="w-4 h-4 text-purple-400" />
        <span className="text-purple-200 font-bold text-sm">{score}</span>
      </div>
    </div>
  );
}