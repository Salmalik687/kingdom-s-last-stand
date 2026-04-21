import { useState } from "react";
import { X, Palette, Sparkles, Shirt } from "lucide-react";
import { TOWER_TYPES } from "../../lib/gameEngine";

// ── Color palettes ─────────────────────────────────────────────
const COLORS = [
  { id: "default",  label: "Default",   hex: null },
  { id: "crimson",  label: "Crimson",   hex: "#dc2626" },
  { id: "amber",    label: "Amber",     hex: "#f59e0b" },
  { id: "emerald",  label: "Emerald",   hex: "#10b981" },
  { id: "sky",      label: "Sky",       hex: "#0ea5e9" },
  { id: "violet",   label: "Violet",    hex: "#7c3aed" },
  { id: "rose",     label: "Rose",      hex: "#f43f5e" },
  { id: "gold",     label: "Gold",      hex: "#ffd60a" },
  { id: "void",     label: "Void",      hex: "#1a0a2e" },
];

// ── Visual effects ─────────────────────────────────────────────
const EFFECTS = [
  { id: "none",     label: "None",          emoji: "✖",  desc: "No effect"                       },
  { id: "glow",     label: "Glow",          emoji: "✨",  desc: "Soft radiant glow around tower"  },
  { id: "pulse",    label: "Pulse",         emoji: "💫",  desc: "Rhythmic pulsing light ring"     },
  { id: "fire",     label: "Fire Trail",    emoji: "🔥",  desc: "Flame particles on projectiles"  },
  { id: "frost",    label: "Frost Aura",    emoji: "❄️",  desc: "Icy crystals orbit the tower"   },
  { id: "lightning",label: "Lightning",     emoji: "⚡",  desc: "Static sparks crackle around"   },
  { id: "void",     label: "Void Rift",     emoji: "🌀",  desc: "Dark void particles swirl"      },
  { id: "holy",     label: "Holy Light",    emoji: "☀️",  desc: "Divine rays of golden light"    },
];

// ── Skins (special merged-tower only skins unlock for merged types) ──
const SKINS = [
  { id: "default",    label: "Default",       emoji: "🔧", desc: "Original appearance",          mergedOnly: false },
  { id: "ancient",    label: "Ancient Stone", emoji: "🪨", desc: "Weathered ancient stonework",  mergedOnly: false },
  { id: "infernal",   label: "Infernal",      emoji: "😈", desc: "Demonic carved sigils",        mergedOnly: false },
  { id: "celestial",  label: "Celestial",     emoji: "🌟", desc: "Blessed by the sun gods",      mergedOnly: false },
  { id: "shadow",     label: "Shadow Forged", emoji: "🌑", desc: "Forged in the shadow realm",   mergedOnly: true  },
  { id: "void",       label: "Void Touched",  emoji: "🌀", desc: "Warped by void energies",      mergedOnly: true  },
  { id: "doomplate",  label: "Doom Plate",    emoji: "💀", desc: "Armored with Malgrath's iron", mergedOnly: true  },
];

const TABS = [
  { id: "color",  label: "Color",   icon: Palette },
  { id: "effect", label: "Effects", icon: Sparkles },
  { id: "skin",   label: "Skins",   icon: Shirt },
];

export default function TowerCustomizationMenu({ tower, onApply, onClose }) {
  const base = TOWER_TYPES[tower.type];
  const isMerged = !!base?.isMerged;

  const [tab, setTab] = useState("color");
  const [selectedColor, setSelectedColor] = useState(tower.customColor ?? "default");
  const [selectedEffect, setSelectedEffect] = useState(tower.customEffect ?? "none");
  const [selectedSkin, setSelectedSkin] = useState(tower.customSkin ?? "default");

  const handleApply = () => {
    onApply(tower.id, {
      customColor: selectedColor,
      customEffect: selectedEffect,
      customSkin: selectedSkin,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>

      <div className="relative w-80 rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #120e28, #0d0a1e)",
          border: "2px solid rgba(167,139,250,0.5)",
          boxShadow: "0 0 60px rgba(139,92,246,0.3), 0 10px 0 #04020a",
        }}>

        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3"
          style={{ borderBottom: "1px solid rgba(139,92,246,0.25)", background: "rgba(139,92,246,0.08)" }}>
          <div className="text-2xl">{tower.emoji}</div>
          <div className="flex-1">
            <div className="text-sm font-black text-white">{base.name}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#7c6faa" }}>
              🎨 Tower Customization
            </div>
          </div>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg transition-all hover:bg-red-900/40"
            style={{ border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444" }}>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex" style={{ borderBottom: "1px solid rgba(139,92,246,0.2)" }}>
          {TABS.map(t => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button key={t.id} onClick={() => setTab(t.id)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[10px] font-black uppercase tracking-wider transition-all"
                style={{
                  color: active ? "#c4b5fd" : "#4a3d70",
                  background: active ? "rgba(139,92,246,0.15)" : "transparent",
                  borderBottom: active ? "2px solid #a78bfa" : "2px solid transparent",
                }}>
                <Icon className="w-3 h-3" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="p-4" style={{ minHeight: 230 }}>

          {/* COLOR TAB */}
          {tab === "color" && (
            <div>
              <p className="text-[10px] text-purple-400/70 mb-3 font-medium">Choose a tint for your tower's projectiles and glow.</p>
              <div className="grid grid-cols-3 gap-2">
                {COLORS.map(c => {
                  const active = selectedColor === c.id;
                  const displayHex = c.hex ?? TOWER_TYPES[tower.type]?.color ?? "#888";
                  return (
                    <button key={c.id} onClick={() => setSelectedColor(c.id)}
                      className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl transition-all"
                      style={{
                        background: active ? `${displayHex}28` : "rgba(255,255,255,0.03)",
                        border: `2px solid ${active ? displayHex : "rgba(80,60,120,0.3)"}`,
                        boxShadow: active ? `0 0 12px ${displayHex}60` : "none",
                      }}>
                      <div className="w-7 h-7 rounded-full border-2"
                        style={{
                          background: displayHex,
                          borderColor: active ? "#fff" : "rgba(255,255,255,0.2)",
                          boxShadow: active ? `0 0 10px ${displayHex}` : "none",
                        }} />
                      <span className="text-[9px] font-bold" style={{ color: active ? "#e9d5ff" : "#6b5fa0" }}>{c.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* EFFECTS TAB */}
          {tab === "effect" && (
            <div>
              <p className="text-[10px] text-purple-400/70 mb-3 font-medium">Add a visual aura or particle trail to your tower.</p>
              <div className="flex flex-col gap-2">
                {EFFECTS.map(e => {
                  const active = selectedEffect === e.id;
                  return (
                    <button key={e.id} onClick={() => setSelectedEffect(e.id)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left"
                      style={{
                        background: active ? "rgba(139,92,246,0.2)" : "rgba(255,255,255,0.03)",
                        border: `2px solid ${active ? "#a78bfa" : "rgba(80,60,120,0.3)"}`,
                        boxShadow: active ? "0 0 12px rgba(139,92,246,0.4)" : "none",
                      }}>
                      <span className="text-lg w-7 text-center">{e.emoji}</span>
                      <div className="flex-1">
                        <div className="text-xs font-black" style={{ color: active ? "#e9d5ff" : "#7c6faa" }}>{e.label}</div>
                        <div className="text-[9px] mt-0.5" style={{ color: active ? "#a78bfa" : "#4a3d70" }}>{e.desc}</div>
                      </div>
                      {active && <div className="w-2 h-2 rounded-full bg-purple-400 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* SKINS TAB */}
          {tab === "skin" && (
            <div>
              <p className="text-[10px] text-purple-400/70 mb-3 font-medium">
                Apply a unique visual skin. {isMerged ? "All skins unlocked — merged tower!" : "Shadow, Void & Doom skins require a merged tower."}
              </p>
              <div className="flex flex-col gap-2">
                {SKINS.map(s => {
                  const locked = s.mergedOnly && !isMerged;
                  const active = selectedSkin === s.id && !locked;
                  return (
                    <button key={s.id}
                      onClick={() => !locked && setSelectedSkin(s.id)}
                      disabled={locked}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left"
                      style={{
                        background: locked ? "rgba(30,25,50,0.4)" : active ? "rgba(139,92,246,0.2)" : "rgba(255,255,255,0.03)",
                        border: `2px solid ${locked ? "rgba(60,50,80,0.3)" : active ? "#a78bfa" : "rgba(80,60,120,0.3)"}`,
                        opacity: locked ? 0.5 : 1,
                        cursor: locked ? "not-allowed" : "pointer",
                        boxShadow: active ? "0 0 12px rgba(139,92,246,0.4)" : "none",
                      }}>
                      <span className="text-lg w-7 text-center">{s.emoji}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black" style={{ color: locked ? "#4a3d70" : active ? "#e9d5ff" : "#7c6faa" }}>
                            {s.label}
                          </span>
                          {s.mergedOnly && (
                            <span className="text-[8px] px-1.5 py-0.5 rounded-full font-bold"
                              style={{ background: "rgba(251,191,36,0.15)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.3)" }}>
                              MERGED
                            </span>
                          )}
                        </div>
                        <div className="text-[9px] mt-0.5" style={{ color: locked ? "#3a2d60" : active ? "#a78bfa" : "#4a3d70" }}>
                          {locked ? "🔒 Merge towers to unlock" : s.desc}
                        </div>
                      </div>
                      {active && <div className="w-2 h-2 rounded-full bg-purple-400 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Preview strip */}
        <div className="mx-4 mb-3 px-3 py-2 rounded-xl flex items-center gap-3"
          style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)" }}>
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0"
            style={{
              background: COLORS.find(c => c.id === selectedColor)?.hex
                ? `${COLORS.find(c => c.id === selectedColor).hex}22`
                : "rgba(139,92,246,0.15)",
              border: `2px solid ${COLORS.find(c => c.id === selectedColor)?.hex ?? "#a78bfa"}`,
              boxShadow: selectedEffect !== "none"
                ? `0 0 18px ${COLORS.find(c => c.id === selectedColor)?.hex ?? "#a78bfa"}80`
                : "none",
              animation: selectedEffect === "pulse" ? "previewPulse 1.4s ease-in-out infinite" : "none",
            }}>
            <span className="text-xl">
              {SKINS.find(s => s.id === selectedSkin)?.emoji === "🔧" ? tower.emoji
                : SKINS.find(s => s.id === selectedSkin)?.emoji ?? tower.emoji}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-black text-white/80">Preview</div>
            <div className="text-[9px] mt-0.5" style={{ color: "#7c6faa" }}>
              {[
                COLORS.find(c => c.id === selectedColor)?.label,
                EFFECTS.find(e => e.id === selectedEffect)?.label,
                SKINS.find(s => s.id === selectedSkin)?.label,
              ].filter(Boolean).join(" · ")}
            </div>
          </div>
        </div>

        {/* Apply button */}
        <div className="px-4 pb-4">
          <button onClick={handleApply}
            className="w-full py-3 rounded-xl font-black text-sm uppercase tracking-widest transition-all hover:scale-[1.02]"
            style={{
              background: "linear-gradient(180deg, #7c3aed, #4c1d95)",
              border: "2px solid #a78bfa",
              boxShadow: "0 4px 0 #1e0a4a, 0 0 20px rgba(139,92,246,0.5)",
              color: "#e9d5ff",
            }}>
            ✨ Apply Customization
          </button>
        </div>
      </div>

      <style>{`
        @keyframes previewPulse {
          0%,100% { box-shadow: 0 0 8px rgba(139,92,246,0.4); }
          50%      { box-shadow: 0 0 24px rgba(139,92,246,0.9); }
        }
      `}</style>
    </div>
  );
}