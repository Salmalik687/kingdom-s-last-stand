import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, Swords } from "lucide-react";

const LOG_COLORS = {
  damage:   { color: "#f87171", icon: "⚔️" },
  kill:     { color: "#fbbf24", icon: "💀" },
  heal:     { color: "#34d399", icon: "💚" },
  merge:    { color: "#a78bfa", icon: "✨" },
  wave:     { color: "#60a5fa", icon: "🌊" },
  special:  { color: "#f472b6", icon: "⚡" },
  boss:     { color: "#ff4d6d", icon: "🔥" },
  gold:     { color: "#fcd34d", icon: "💰" },
};

export default function CombatLog({ entries }) {
  const [open, setOpen] = useState(true);
  const bottomRef = useRef(null);
  const prevLenRef = useRef(0);

  useEffect(() => {
    if (entries.length !== prevLenRef.current) {
      prevLenRef.current = entries.length;
      if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [entries.length, open]);

  return (
    <div style={{
      background: "linear-gradient(160deg, #0e0a1e, #080610)",
      border: "1.5px solid rgba(100,60,180,0.35)",
      borderRadius: 12,
      overflow: "hidden",
      marginTop: 12,
    }}>
      {/* Header */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-3 py-2"
        style={{ background: "rgba(100,60,180,0.12)" }}
      >
        <div className="flex items-center gap-2">
          <Swords className="w-3.5 h-3.5" style={{ color: "#a78bfa" }} />
          <span style={{
            fontSize: 10, fontWeight: 900, letterSpacing: "0.2em",
            textTransform: "uppercase", color: "#a78bfa", fontFamily: "'Cinzel', serif",
          }}>Combat Log</span>
          {entries.length > 0 && (
            <span style={{
              fontSize: 9, background: "rgba(167,139,250,0.2)",
              border: "1px solid rgba(167,139,250,0.4)",
              color: "#a78bfa", borderRadius: 999,
              padding: "1px 6px", fontWeight: 700,
            }}>{entries.length}</span>
          )}
        </div>
        {open
          ? <ChevronDown className="w-3.5 h-3.5" style={{ color: "#a78bfa" }} />
          : <ChevronUp className="w-3.5 h-3.5" style={{ color: "#a78bfa" }} />
        }
      </button>

      {/* Log entries */}
      {open && (
        <div style={{
          maxHeight: 160,
          overflowY: "auto",
          padding: "6px 10px 8px",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(100,60,180,0.3) transparent",
        }}>
          {entries.length === 0 ? (
            <p style={{ fontSize: 10, color: "#3a2a50", textAlign: "center", padding: "8px 0", fontFamily: "'Cinzel', serif" }}>
              Awaiting battle...
            </p>
          ) : (
            entries.map((e) => {
              const style = LOG_COLORS[e.type] || LOG_COLORS.damage;
              return (
                <div key={e.id} style={{
                  display: "flex", alignItems: "flex-start", gap: 6,
                  animation: "logEntry 0.2s ease-out",
                }}>
                  <span style={{ fontSize: 10, flexShrink: 0, marginTop: 1 }}>{style.icon}</span>
                  <span style={{
                    fontSize: 10, color: style.color, lineHeight: 1.5,
                    fontFamily: "'Cinzel', serif",
                  }}>{e.text}</span>
                </div>
              );
            })
          )}
          <div ref={bottomRef} />
        </div>
      )}

      <style>{`
        @keyframes logEntry {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}