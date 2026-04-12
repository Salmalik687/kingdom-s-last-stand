import { TOWER_TYPES } from "../../lib/gameEngine";
import { cn } from "@/lib/utils";

export default function TowerPanel({ selectedTower, onSelect, gold }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xs uppercase tracking-widest text-amber-400/70 font-semibold mb-1">
        Towers
      </h3>
      {Object.entries(TOWER_TYPES).map(([key, tower]) => {
        const canAfford = gold >= tower.cost;
        const isSelected = selectedTower === key;

        return (
          <button
            key={key}
            onClick={() => onSelect(isSelected ? null : key)}
            disabled={!canAfford}
            className={cn(
              "flex items-center gap-3 p-2.5 rounded-lg border transition-all text-left",
              "hover:bg-amber-950/30",
              isSelected
                ? "border-amber-500 bg-amber-950/40 shadow-lg shadow-amber-900/20"
                : "border-stone-700/50 bg-stone-900/50",
              !canAfford && "opacity-40 cursor-not-allowed hover:bg-transparent"
            )}
          >
            <span className="text-xl">{tower.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-stone-200 truncate">
                {tower.name}
              </div>
              <div className="text-[10px] text-stone-400">{tower.description}</div>
            </div>
            <div className="text-xs font-bold text-yellow-400 whitespace-nowrap">
              {tower.cost}g
            </div>
          </button>
        );
      })}
    </div>
  );
}