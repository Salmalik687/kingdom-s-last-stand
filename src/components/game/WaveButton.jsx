import { Button } from "@/components/ui/button";
import { Play, Loader2 } from "lucide-react";

export default function WaveButton({ waveActive, onStartWave, wave }) {
  return (
    <Button
      onClick={onStartWave}
      disabled={waveActive}
      className="w-full bg-amber-700 hover:bg-amber-600 text-amber-50 font-semibold gap-2 disabled:opacity-50 mt-4"
    >
      {waveActive ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Wave in progress...
        </>
      ) : (
        <>
          <Play className="w-4 h-4" />
          Send Wave {wave}
        </>
      )}
    </Button>
  );
}