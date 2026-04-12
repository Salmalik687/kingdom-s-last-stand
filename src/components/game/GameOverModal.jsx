import { Button } from "@/components/ui/button";
import { Trophy, RotateCcw, Swords } from "lucide-react";

export default function GameOverModal({ score, wave, onRestart }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-gradient-to-b from-stone-900 to-stone-950 border border-amber-800/40 rounded-2xl p-8 max-w-sm w-full mx-4 text-center shadow-2xl">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-950/60 border border-red-800/40 flex items-center justify-center">
          <Swords className="w-8 h-8 text-red-400" />
        </div>
        <h2 className="text-2xl font-bold text-amber-100 mb-1 font-serif">
          Castle Fallen
        </h2>
        <p className="text-stone-400 text-sm mb-6">
          The kingdom has been overrun...
        </p>

        <div className="flex justify-center gap-6 mb-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span className="text-xl font-bold text-yellow-200">{score}</span>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-stone-500">Score</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Swords className="w-4 h-4 text-blue-400" />
              <span className="text-xl font-bold text-blue-200">{wave}</span>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-stone-500">Waves</span>
          </div>
        </div>

        <Button
          onClick={onRestart}
          className="w-full bg-amber-700 hover:bg-amber-600 text-amber-50 font-semibold py-3 gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Defend Again
        </Button>
      </div>
    </div>
  );
}