// Global mute state + iOS audio-unlock helper.
//
// iOS Safari (and some Android browsers) starts AudioContext in a `suspended`
// state until the user produces a gesture. Without an explicit resume(),
// every call to play* in sounds.js silently produces nothing. We register a
// one-shot pointerdown/touchstart/keydown listener that calls
// `unlockAudio(ctx)` to resume any context registered before the first
// gesture.

let _muted = false;

// Contexts that have been created before the first user gesture; they need
// resume() once a gesture happens. Sets are deduped so re-registering the
// same context is a no-op.
const pendingCtxs = new Set();
let unlocked = false;

export function isMuted() { return _muted; }
export function setMuted(val) { _muted = val; }
export function toggleMute() { _muted = !_muted; return _muted; }

// Called by sounds.js when it lazily creates the AudioContext. Once a gesture
// has been observed, contexts registered after that point already start
// running and don't need resume().
export function registerAudioContext(ctx) {
  if (!ctx) return;
  if (unlocked) {
    if (ctx.state === "suspended") ctx.resume().catch(() => { /* noop */ });
    return;
  }
  pendingCtxs.add(ctx);
}

function flushUnlock() {
  if (unlocked) return;
  unlocked = true;
  for (const ctx of pendingCtxs) {
    if (ctx.state === "suspended") ctx.resume().catch(() => { /* noop */ });
  }
  pendingCtxs.clear();
}

if (typeof window !== "undefined") {
  const onGesture = () => {
    flushUnlock();
    window.removeEventListener("pointerdown", onGesture, true);
    window.removeEventListener("touchstart", onGesture, true);
    window.removeEventListener("keydown", onGesture, true);
  };
  window.addEventListener("pointerdown", onGesture, true);
  window.addEventListener("touchstart", onGesture, true);
  window.addEventListener("keydown", onGesture, true);
}
