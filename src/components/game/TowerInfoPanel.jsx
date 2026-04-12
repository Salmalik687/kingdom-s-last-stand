import { TOWER_TYPES } from "../../lib/gameEngine";
import { Button } from "@/components/ui/button";
import { ArrowUp, Trash2 } from "lucide-react";

export default function TowerInfoPanel({ tower, gold, onUpgrade, onSell }) {
  if (!tower) return null;

  const base = TOWER_TYPES[tower.type];
  const upgradeCost = Math.floor(base.upgradeCost * tower.level);
  const sellValue = Math.floor(base.cost * 0.6 * tower.level);
  const canUpgrade = gold >= upgradeCost && tower.level < 5;

  return (
    <div className="mt-4 p-3 rounded-lg border border-amber-800/30 bg-amber-950/20">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{tower.emoji}</span>
        <div>
          <div className="text-xs font-semibold text-stone-200">{base.name}</div>
          <div className="text-[10px] text-amber-400">Level {tower.level}</div>
        </div>
      </div>
      <div className="text-[10px] text-stone-400 space-y-0.5 mb-3">
        <div>Damage: {tower.damage}</div>
        <div>Range: {(tower.range / 48).toFixed(1)} tiles</div>
        <div>Fire Rate: {(1000 / tower.fireRate).toFixed(1)}/s</div>
      </div>
      <div className="flex gap-2">
        <Button
          size="sm"
          disabled={!canUpgrade}
          onClick={() => onUpgrade(tower)}
          className="flex-1 bg-green-800 hover:bg-green-700 text-green-50 text-xs gap-1 h-7"
        >
          <ArrowUp className="w-3 h-3" />
          {tower.level >= 5 ? "MAX" : `${upgradeCost}g`}
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => onSell(tower)}
          className="text-xs gap-1 h-7"
        >
          <Trash2 className="w-3 h-3" />
          {sellValue}g
        </Button>
      </div>
    </div>
  );
}