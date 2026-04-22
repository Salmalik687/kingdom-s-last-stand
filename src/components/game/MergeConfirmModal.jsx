import { TOWER_TYPES } from "../../lib/gameEngine";

export default function MergeConfirmModal({ mergeInfo, onConfirm, onCancel }) {
  if (!mergeInfo) return null;
  const { t1, t2, resultType } = mergeInfo;
  const result = TOWER_TYPES[resultType];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}>
      <div className="mx-4 rounded-2xl overflow-hidden max-w-xs w-full"
        style={{
          background: "linear-gradient(160deg, #1a1535, #100e22)",
          border: "2px solid rgba(167,139,250,0.6)",
          boxShadow: "0 0 40px rgba(139,92,246,0.4), 0 10px 30px rgba(0,0,0,0.8)",
        }}>

        {/* Header */}
        <div className="px-5 pt-5 pb-3 text-center"
          style={{ borderBottom: "1px solid rgba(139,92,246,0.2)" }}>
          <div className="text-3xl mb-1">✨</div>
          <h2 className="font-black text-sm uppercase tracking-widest"
            style={{ fontFamily: "'Cinzel', serif", color: "#e9d5ff" }}>
            Merge Available!
          </h2>
        </div>

        {/* Merge preview */}
        <div className="px-5 py-4 flex items-center justify-center gap-3">
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl">{TOWER_TYPES[t1.type]?.emoji}</span>
            <span className="text-[10px] font-bold text-center" style={{ color: "#a78bfa", maxWidth: 60 }}>
              {TOWER_TYPES[t1.type]?.name}
            </span>
          </div>
          <span className="text-xl font-black" style={{ color: "#7c3aed" }}>+</span>
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl">{TOWER_TYPES[t2.type]?.emoji}</span>
            <span className="text-[10px] font-bold text-center" style={{ color: "#a78bfa", maxWidth: 60 }}>
              {TOWER_TYPES[t2.type]?.name}
            </span>
          </div>
          <span className="text-xl font-black" style={{ color: "#ffd60a" }}>→</span>
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl">{result.emoji}</span>
            <span className="text-[10px] font-black text-center" style={{ color: "#ffd60a", maxWidth: 60 }}>
              {result.name}
            </span>
          </div>
        </div>

        <p className="text-center text-[10px] pb-3 px-4" style={{ color: "#6b5fa0" }}>
          {result.description}
        </p>

        {/* Buttons */}
        <div className="flex gap-2 px-4 pb-5">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all hover:scale-[1.02]"
            style={{
              background: "linear-gradient(180deg,#374151,#1f2937)",
              border: "2px solid #6b7280",
              color: "#9ca3af",
              cursor: "pointer",
            }}>
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all hover:scale-[1.02]"
            style={{
              background: "linear-gradient(180deg,#7c3aed,#4c1d95)",
              border: "2px solid #a78bfa",
              boxShadow: "0 3px 0 #1e0a4a, 0 0 20px rgba(139,92,246,0.5)",
              color: "#e9d5ff",
              cursor: "pointer",
            }}>
            ✨ Merge!
          </button>
        </div>
      </div>
    </div>
  );
}