# Kingdom's Last Stand — Comprehensive Fix Plan

**Status:** APPROVED via ralplan consensus (Planner → Architect → Critic, 2 iterations)
**Architect verdict:** PROCEED-AS-IS
**Critic verdict:** APPROVE
**Scope:** Bug-free + perf + mobile-feel pass over `kingdom-s-last-stand`

---

## ADR (Architecture Decision Record)

**Decision.** Ship a five-phase, fix-in-place sequence: Phase 1 (timing correctness) → Phase 1.5 (save schema) → Phase 2 (perf) → Phase 3 (mobile UX) → Phase 4 (refactor + flag sunset). Each phase is its own PR.

**Drivers.**
1. Player-visible bug surface first (frame-rate-dependent projectiles, fast-forward DPS halving).
2. Mid-range phone perceived performance — input lag from `forceRender` per RAF tick is the loudest cause of "laggy".
3. Refactor cost vs payoff — `Game.jsx` is 1723 lines and growing; refactor is enabling work, not a feature, so it must come last and stay behavior-preserving.

**Alternatives considered.**
- **B — Big-bang rewrite of `Game.jsx` + `gameEngine.js`.** Pull loop, state, abilities into hooks/reducers in one PR, then layer fixes on top. Rejected: 1723-line rewrite without test coverage is high-regression-risk; user asked for "stop feeling buggy", not a 2-week structural overhaul with no shipping wins.
- **C — Phase 1 only.** Three correctness bugs and stop. Rejected: doesn't address the *perceived* lag (`forceRender` per tick), which is half of the "feels buggy" complaint.

**Why chosen (Option A).** Each phase is small and reversible. Phase 1+2 alone make the game feel dramatically better. Phase 4 is deferrable. Risk surface stays per-PR-bounded.

**Consequences.**
- Phase 1.2 (game-clock fix) is technically a balance change at `speedMult=2`. Mitigated by `gameClockV2` flag with per-save defaults and a settings toggle. Sunset owned by Phase 4.7.
- Phase 1.5 introduces a save format v2. Forward-compat path is one-way (newer reads older); v1 build encountering v2 save degrades towers gracefully but rollback strands tower-upgrade investment. Acceptable for single-player.
- Phase 4 requires a replay-tape harness (introduced in Session 2.5) and seeded RNG (≤30 LOC prerequisite of Phase 2). One-time cost, ongoing benefit for any future refactor.

**Follow-ups (out of scope here).**
- Canvas-side rendering optimization (sprite atlas, offscreen canvas).
- Pinch-zoom on board, haptics, accessibility (VoiceOver labels).
- Cloud save / multi-device reconciliation.
- New content (towers, enemies, waves).

---

## RALPLAN-DR Summary

### Principles

1. **Correctness before speed before structure.** Refactoring around a timing bug bakes the bug in.
2. **Behavior preservation across refactors.** Phase 4 must produce a bit-equivalent game given identical inputs and seeded RNG. No silent rebalancing.
3. **Decoupling render rate from logic rate.** Canvas RAF and React HUD have different cadences and should be free to diverge.
4. **Mechanical acceptance criteria, not feel-words.** Every phase's "done" is grep-able, measurable, or repro-able with DevTools throttling on a named device profile.
5. **Reversible per phase.** Each phase ships behind a single PR/commit.

### Decision Drivers

1. Player-visible bug surface first.
2. Mid-range phone perceived perf.
3. Refactor cost vs payoff — must come last and stay behavior-preserving.

---

## Device Profiles

All perf and touch latency targets are pinned to these named profiles. Pick one of the two for each measurement; document which.

- **Profile DT-Throttle:** Chrome DevTools, 6x CPU throttle, 1280x720 viewport, GPU acceleration disabled. Used when no physical device is available.
- **Profile iOS-SE2020:** iPhone SE 2020, iOS 17.x, Safari, Low Power Mode OFF, browser cache cleared between trials.
- **Profile Android-P4a:** Pixel 4a, Android 13+, Chrome stable, Battery Saver OFF, browser cache cleared between trials.

**Trial protocol:** N=20 trials per measurement, report **median**. Outliers within ±1 trial of median allowed for variance.

---

## Phase 1 — Correctness & Timing Fixes

**Goal:** Make the simulation deterministic against wall-clock at any refresh rate or speed multiplier. No new features. Save schema is NOT touched here (see Phase 1.5).
**Scope budget:** ~80 LOC diff, single session.
**Risk:** Low-medium. Game-clock fix has a balancing implication; gated behind a flag.

### Tasks

| # | File:Line | Change | Acceptance |
|---|-----------|--------|------------|
| 1.1 | `src/lib/gameEngine.js:1742-1743` | Convert projectile movement to `dt`-based: `proj.x += (dx / dist) * proj.speed * dt` (drop magic `* 3`; fold into projectile `speed` constants so existing per-projectile pixels-per-second at 60Hz are preserved exactly). | Projectile travels the same number of pixels in 1.000s of wall-clock on 60Hz vs 120Hz monitor (`performance.now()` deltas; ±2%). After 5s of `document.hidden`, no projectile moves more than `proj.speed * 5s` pixels on resume. |
| 1.2 | `src/pages/Game.jsx:386-451` | Introduce `gameTimeRef.current += dt * 1000 * speedMult`. Replace tower fire-rate gates against raw RAF `timestamp` with `gameTimeRef.current`. **Gate behind a `gameClockV2` boolean flag** (rules below). | At `speedMult=2` with flag ON, towers fire ~2x as fast as at `1x` (count projectiles in 10s wall-clock; expect 1.95-2.05x ratio, N=20 median). At `speedMult=1`, behavior is bit-identical to flag OFF on a fixed seed. |

### `gameClockV2` flag rules

- **Default ON for new games and for saves where `wave ≤ 10`.**
- **Default OFF for saves where `wave > 10`** (these players have built balance intuition under the old behavior; don't yank it mid-run).
- **First time a player triggers `speedMult=2` after the flag is ON post-fix, show a one-time toast:** "Fast-forward now scales tower fire rate too. (Settings → Game Clock to revert.)" Track shown-state under `qls_clockv2_toast_shown` in localStorage.
- **Settings toggle:** new `Game Clock: Modern / Classic` setting in the existing settings modal.
- **Sunset:** Phase 4.7 owns flag removal. Trigger: either (a) two stable releases (≥14 days each) with no >0.5% rollback rate from "Modern" to "Classic," OR (b) telemetry confirms ≥95% of active sessions use Modern. Whichever first. After sunset, remove the OFF code path; flag check becomes dead and is deleted.

### Verification (Phase 1)

- **Manual (DT-Throttle):** Set DevTools rendering "Frame rate" to 30/60/120fps. Place same tower vs same enemy stream. Kill counts in 30s of wall-clock match within ±5%, N=20 median.
- **Manual:** Pause tab for 10s, return. No projectile teleports, no enemy super-jumps.
- **Manual:** With flag ON, toggle 1x↔2x mid-wave. Tower fire visually doubles/halves; enemy speed visually doubles/halves; both proportional. With flag OFF, behavior matches pre-fix exactly.
- **Codified:** `grep -n "speed \* 3" src/lib/gameEngine.js` returns zero.
- **Codified:** `grep -n "lastFire" src/pages/Game.jsx` shows comparisons against `gameTimeRef`, not raw `timestamp`, inside the `gameClockV2`-on branch.
- **Codified:** `grep -n "gameClockV2" src/` returns ≥3 hits.

### Out of scope (Phase 1)

Save schema (Phase 1.5). Any new towers/upgrades. Speed retuning beyond folding the `* 3` constant.

---

## Phase 1.5 — Save Schema Migration

**Goal:** Replace the brittle hand-listed `upgradePath_*` flag schema with a generic shape, with a tested v1→v2 migration. Ships as its own PR after Phase 1 is stable.
**Scope budget:** ~250 LOC diff (`upgradePath_*` is referenced in 4 files, ~69 occurrences).
**Risk:** Medium. Bad migration corrupts existing saves.

### Background

`upgradePath_*` is referenced in:
- `src/lib/saveGame.js` (serialization list)
- `src/lib/gameEngine.js` (read at simulation time)
- `src/lib/towerUpgradePaths.js` (definition source)
- `src/pages/Game.jsx` (UI gating)

**Decision: keep runtime tower object shape unchanged. The save layer holds the translation shim.** Rationale: changing the in-memory object shape forces edits in all 4 files; keeping a save-layer adapter localizes the change to `saveGame.js`. New upgrade paths added to `towerUpgradePaths.js` automatically get persisted via the generic adapter.

### Tasks

| # | File:Line | Change | Acceptance |
|---|-----------|--------|------------|
| 1.5.1 | `src/lib/saveGame.js` | Introduce `serializeUpgrades(tower)` and `deserializeUpgrades(savedTower)`. On serialize, scan tower keys matching `/^upgradePath_/` and emit `upgrades: { [pathKey]: bool }`. On deserialize, expand back to flat `upgradePath_*` properties. | Round-trip a fixture tower through serialize→deserialize; all `upgradePath_*` values match input ±0. |
| 1.5.2 | `src/lib/saveGame.js` | Bump save `version: 2`. Add `migrateV1toV2(saveData)` that maps v1 flat flags → v2 `upgrades` map. | Loading the captured v1 fixture produces an in-game state object identical to pre-migration load, asserted on `{ towers, gold, lives, wave, score }`. |
| 1.5.3 | `src/lib/saveGame.js` | Add a `KNOWN_UPGRADE_PATHS` constant sourced from `towerUpgradePaths.js` (single import, no manual list). | `grep -c "'upgradePath_" src/lib/saveGame.js` drops to zero (only regex pattern remains). Adding a new entry to `towerUpgradePaths.js` and saving in-game produces a save file containing the new key with no `saveGame.js` edit. |

### Forward-compat behavior (v2 save loaded on a v1-only build)

- v1 build encountering `version: 2` save: log a console warning, fall through to a defensive load that ignores the `upgrades` map (resulting in towers reset to base). **Game does NOT crash.** Core state (gold, lives, wave) preserved.
- One-time "Save format updated. Older builds may not fully read this save." dialog when first v2 save is created; gated by `qls_v2_save_warning_shown`.
- We do NOT attempt forward-write of a v1-shaped save from a v2 build. Forward-compat is one-way (newer reads older).

### Verification (Phase 1.5)

- **Codified:** Round-trip test on captured v1 save fixtures → load → save → load → assert deep-equal on game state.
- **Codified:** Synthetic v2 save loaded by simulated v1-build code path (call the v1 loader directly); asserts no crash, returns valid game state with degraded towers.
- **Manual:** Load a save created on Phase 1 build into Phase 1.5 build → game continues correctly. Reverse (v2 save in Phase 1 build) shows the warning dialog and degraded-tower load without crash.

### Out of scope (Phase 1.5)

Touching the runtime tower object shape. New save fields beyond the upgrade refactor. Cloud sync.

---

## Session 2.5 — Replay Tape Capture (no code change)

**Before any Phase 2 code lands**, capture the replay tape on main with Phase 1 + Phase 1.5 merged.

- Tape format: seeded RNG, recorded inputs `{ wave, taps[], abilities[], speedToggles[] }`, snapshots of `{ enemies, towers, gold, lives, score }` at every wave end for waves 1-15.
- Stored in `tests/fixtures/replay-baseline-postP1.json`.
- This tape is the reference for Phase 2/3/4 regression assertions.

If the codebase has no seeded RNG, introducing one is a **prerequisite task** of Phase 2 (≤30 LOC, one-time cost).

**Verification gate:** diff the tape against a manually-played reference run before locking it in as baseline. If Phase 1.5 introduced any silent behavior change beyond the documented `upgrades` map migration, regenerate.

---

## Phase 2 — Performance Fixes

**Goal:** Eliminate the "laggy on mid-range Android" feeling. Decouple HUD update rate from game-loop rate without sacrificing tower-selection / hover latency.
**Scope budget:** ~250 LOC diff, single session.
**Risk:** Medium.

### Tasks

| # | File:Line | Change | Acceptance |
|---|-----------|--------|------------|
| 2.1a | `src/pages/Game.jsx:717` | Replace `forceRender(n => n + 1)` per RAF with a throttled HUD update at ~10Hz (every 100ms). Drive it by accumulating `dt` in the RAF and dispatching `setHudTick(t+1)` when `≥100ms`. | `grep` shows no `forceRender` in the RAF body. React DevTools Profiler on Profile DT-Throttle: Game.jsx commits drop from ~60/s to ~10-12/s during gameplay (10s sample, N=20 median). |
| 2.1b | `src/pages/Game.jsx`, `src/components/game/GameBoard.jsx` | **Lift `selectedTowerId`, `selectedTowerType`, `hoveredCellId` into a ref** (or a tiny context whose value is a ref). GameBoard reads the ref on each of *its own* RAF ticks (not via React props). The 10Hz parent commit no longer affects selection feedback. | Hover-to-highlight latency on Profile DT-Throttle: <17ms median pointerover→canvas-paint, N=20. Tap-to-select feedback: <33ms median. `grep -n "selectedTowerId" src/pages/Game.jsx` shows ref access inside hot path. |
| 2.2 | `src/pages/Game.jsx:423,558,575,594,620` | Consolidate the 4-5 per-frame `enemiesRef.current.filter(...)` calls into a single pass. | `grep -c "enemiesRef.current.filter" src/pages/Game.jsx` ≤ 1 inside the RAF body. Replay-tape diff: identical wave-end snapshots vs baseline. |
| 2.3 | `src/pages/Game.jsx:445-447` (tower targeting) | Replace per-tower `filter+sort` with: per-frame spatial bucket of enemies (grid by tower-radius cell size); per tower scan only nearby cells; track-min instead of full sort. Deterministic tie-break by enemy `id`. | At 30 towers × 50 enemies on Profile DT-Throttle: median RAF callback duration <4ms, N=20. Replay-tape diff: identical `tower → target enemy id` mapping per frame for waves 1-15. |
| 2.4 | `src/pages/Game.jsx:704` | Replace `setTimeout(doSave, 200)` with `requestIdleCallback(doSave, { timeout: 1000 })` (fallback `setTimeout(doSave, 200)` on Safari). **Save snapshot reads strictly from refs** (`enemiesRef`, `towersRef`, etc.) and the consolidated reducer state — never from a useState that may have just been scheduled. | DevTools Performance trace on Profile DT-Throttle during wave-end shows no main-thread localStorage block on the wave-end frame (long-task <16ms). Save persists on reload. Replay-tape diff: identical save contents at wave-end. |

### Verification (Phase 2)

- **Manual (Profile DT-Throttle):** Place 20 towers, spawn wave 15. Frame rate ≥45fps median, N=20.
- **Manual (Profile iOS-SE2020 OR Android-P4a):** Same scenario, ≥40fps median, N=20.
- **Codified:** `grep "forceRender(n => n + 1)" src/pages/Game.jsx` returns zero hits inside the RAF closure.
- **Codified:** Replay-tape diff matches baseline (waves 1-15).
- **Codified:** Targeting equivalence — for the baseline tape's first 1000 frames, `tower → enemy.id` mapping is identical pre/post.

### Out of scope (Phase 2)

Canvas rendering optimization (sprite batching, offscreen canvas). GameBoard.jsx's own RAF stays as-is.

---

## Phase 3 — Mobile Touch UX

**Goal:** Make it feel native on phones. No new game features.
**Scope budget:** ~200 LOC, may add 1-2 new component/hook files.
**Risk:** Low-medium.

### Tasks

| # | File:Line | Change | Acceptance |
|---|-----------|--------|------------|
| 3.1 | `src/components/game/*` (all `onClick` on game-board interactive elements) | Add `onPointerDown` alongside `onClick`. On `pointerType === 'touch'`, preventDefault + dispatch immediately. Suppress trailing `click` for pointers we already handled (track pointerId in a Set, clear on pointerup). | Profile iOS-SE2020 + Android-P4a: tap-to-place latency, `pointerdown`→tower visible on canvas, ≤80ms median (N=20). Was ~300ms+. `grep -rE "onPointerDown\|onTouchStart" src/components/game/` returns ≥ count of primary tap targets (was 0). |
| 3.2 | `src/hooks/use-mobile.jsx` | Hook returns `false` on first render (coerced via `!!isMobile`), then resolves after matchMedia listener fires → mobile users see desktop layout for one paint, causing reflow. **Fix:** synchronously evaluate `window.matchMedia('(max-width: 768px)').matches` in the initializer, with `typeof window !== 'undefined'` SSR guard. | Profile iOS-SE2020 + Android-P4a: hard-refresh 20x; visible layout jump in first 200ms occurs in 0/20 trials. |
| 3.3 | New `src/hooks/useBoardGestures.js` (consumed by GameBoard.jsx) | Add gesture layer: long-press opens upgrade menu; drag-from-tray places tower. **Concrete thresholds:** long-press dwell **600ms**; drag-disambiguation distance **10px** from `pointerdown` origin (any movement >10px before 600ms cancels long-press). Cancel on `pointerup`, `pointercancel`, page-blur. Export `LONGPRESS_MS = 600` and `DRAG_THRESHOLD_PX = 10` as named constants. | Profile iOS-SE2020 + Android-P4a: 20/20 long-presses register upgrade menu within 600-700ms. 0/20 false positives during 5-second simulated pan/scroll. Drag-from-tray: 18/20 successful placements at drop point ±1 grid cell. |

### Verification (Phase 3)

- **Manual:** Real-device test on iOS-SE2020 and Android-P4a. Place 5 towers via tap. Long-press 2 towers. Drag-place 1 tower. All meet per-task thresholds.
- **Manual:** Hard-refresh on mobile 20x. Layout-jump count = 0.
- **Codified:** `grep -rE "onPointerDown\|onTouchStart" src/components/game/ | wc -l` ≥ baseline + N (count of primary tap targets).
- **Codified:** `useBoardGestures.js` exports `LONGPRESS_MS === 600` and `DRAG_THRESHOLD_PX === 10`.

### Out of scope (Phase 3)

Pinch-zoom, haptics, accessibility. Game loop is not touched.

---

## Phase 4 — Structural Refactor (Behavior-Preserving)

**Goal:** Split Game.jsx so the next feature doesn't add to a 2000-line file. **No behavior changes.**
**Scope budget:** ~600-900 LOC moved (mostly cut/paste with renames). Single PR but treated as its own session.
**Risk:** Highest of the five phases.

### Tasks

| # | Source | Target | Notes |
|---|--------|--------|-------|
| 4.1 | `src/pages/Game.jsx` ability handlers | New `src/hooks/useAbilities.js` | Pure event-driven; takes refs and dispatches effects. |
| 4.2 | `src/pages/Game.jsx` RAF loop body | New `src/hooks/useGameLoop.js` | Receives `dt`, returns `{ enemies, towers, projectiles }` refs. **Closed-over state via latest-value-ref pattern** (a ref updated each render holds the current callback/state; the RAF reads from this ref). **Do NOT use a `useEffect` deps array** to re-bind the RAF on every state change. |
| 4.3 | `src/pages/Game.jsx` 54 useState → consolidate gameplay-numerics | New `src/hooks/useGameState.js` (useReducer) | Group: `gold`, `lives`, `wave`, `score`, `combo`, `comboExpiresAt` into one reducer. Modal/UI state stays as useState. **Equivalence test: replay-tape diff** (recorded game-over events for waves 1-15 emit exactly one GAME_OVER per fatal hit, ±1 frame tolerance vs baseline). Rationale: bug class is integration concern between reducer + RAF dispatch order, not reducer-in-isolation. |
| 4.4 | `src/pages/Game.jsx` tower lifecycle | New `src/hooks/useTowers.js` | **Hook returns a ref**, not React state. Methods (`place`, `upgrade`, `sell`) mutate the ref synchronously and (separately) bump the HUD tick if HUD-relevant. |
| 4.5 | `src/pages/Game.jsx:9` (`spawnDeathParticles` import from GameBoard) | New `src/lib/effects.js` | **Move ALL of:** `spawnDeathParticles`, the `_deathParticles` array, AND `updateAndDrawParticles`. **GameBoard.jsx imports `tickAndDrawEffects(ctx, dt)`** from the new module. **Game.jsx imports `spawnDeathParticles` from `lib/effects.js`**. If only `spawnDeathParticles` is moved without the array and the tick function, particles silently break. |
| 4.6 | `src/pages/Game.jsx` shrinks to wiring | — | <500 LOC, mostly composition + JSX. |
| 4.7 | `gameClockV2` flag sunset (per Phase 1.2 rules) | `src/pages/Game.jsx`, `src/lib/gameEngine.js` | Remove the OFF code path and the flag check. Settings toggle removed. **Sunset trigger must be met before this task ships** (see Phase 1.2). |

### Mitigations

1. **Replay tape is the contract.** Phase 4 must pass the same replay tape captured at end of Session 2.5. Wave-end snapshots, targeting maps, and game-over event sequences must match.
2. **Refactor in commits, not one diff.** Each of 4.1-4.7 is its own commit. Bisect-friendly.
3. **Don't combine with other phases.** Phase 4 ships strictly after 1, 1.5, 2, 3 are merged and stable.
4. **Manual A/B video.** Record 60s on a fixed seed before vs after. Visual parity required.

### Verification (Phase 4)

- **Codified:** Replay-tape pass — baseline replays bit-identically through refactored code, including game-over event sequences.
- **Codified:** `wc -l src/pages/Game.jsx` < 500.
- **Codified:** `grep "from '@/components/game/GameBoard'" src/lib/ src/pages/Game.jsx` returns zero (no logic→component imports).
- **Codified:** `grep -c "useState" src/pages/Game.jsx` drops from 54 to ≤ ~10 (modal/UI only).
- **Codified:** `grep -rn "gameClockV2" src/` returns zero after 4.7 ships.
- **Manual:** A/B video shows no perceptible behavior delta.

### Out of scope (Phase 4)

GameBoard.jsx canvas internals beyond the effects extraction. base44 SDK integration. Any new gameplay system. The pure `gameEngine.js` is already well-shaped — leave it alone.

---

## Risk Register

| Phase | Risk | Likelihood | Mitigation |
|-------|------|------------|------------|
| 1 | Folding `* 3` into projectile speed retunes balance | Medium | Verify projectile pixels/second at 60Hz unchanged ±2% before/after. |
| 1 | Game-clock fix is a balance change | High (visible) | `gameClockV2` flag + per-save default + first-2x toast + sunset rules. |
| 1.5 | Save migration corrupts existing saves | Medium | Round-trip test on captured v1 fixtures. Adapter in save layer only; runtime shape unchanged. |
| 1.5 | v2 save loaded on a v1 build mid-rollout | Medium | Documented degradation: v1 build defensively ignores `upgrades` map; towers reset to base; no crash. One-time warning dialog. |
| 1.5 | Player rolls back to v1 client (cached PWA) after first v2 save → tower upgrades silently lost | Low-medium | Acceptable for single-player; documented in release notes. Core progress (gold, lives, wave) preserved. |
| 1.5 | Larger LOC than originally scoped (69 refs not 18) | High (now mitigated) | Save-layer adapter avoids touching the other 3 files; budget revised to ~250 LOC. |
| 2 | HUD throttling makes gold counter feel laggy | Low | 100ms = 10Hz, under perception threshold. Drop to 50ms if complaints. |
| 2 | Selection state in ref breaks under React 18 concurrent rendering | Low-medium | Ref reads in canvas RAF; React state used only for the 10Hz HUD tick. |
| 2 | Spatial bucket picks different enemy on ties | Low | Deterministic tie-break by enemy id. Replay-tape diff catches drift. |
| 2 | `requestIdleCallback` not on Safari | High (known) | setTimeout fallback. |
| 2 | Save-defer reads inconsistent state | Low (mitigated) | Ref-only snapshot source. |
| 3 | Pointer/click double-firing on Android | Medium | pointerId tracking + click suppression. |
| 3 | Long-press false positive during pan | Medium (now mitigated) | 10px drag threshold cancels long-press; 0/20 false positives required. |
| 3 | matchMedia synchronous read fails under SSR | Low | `typeof window !== 'undefined'` guard. |
| 4 | Silent behavior regression | Medium | Replay tape is mandatory pass-criterion. |
| 4 | Game-over fires twice per fatal hit due to render-schedule shift | Medium | Replay-tape recorded game-over events; ±1 frame tolerance. |
| 4 | Hook closures over stale state | Medium | Latest-value-ref pattern in 4.2; explicit in spec, not a deps array. |
| 4 | Effects extraction misses one of the three pieces | Medium (now mitigated) | 4.5 explicitly enumerates spawn, store, tick — all three move together. |
| 4 | Flag sunset removes code path while a player still has Classic preference | Low | Sunset trigger requires telemetry/release-count threshold; Classic users keep flag alive during sunset window. After sunset, Classic preference silently coerces to Modern. |

---

## Out of Scope (whole effort)

- New towers, enemies, waves, or upgrades.
- Visual rebalancing (Phase 1.2 with flag ON is a correctness-with-balance-impact change, mitigated by the per-save flag default).
- base44 SDK / backend integration.
- Canvas rendering optimization (sprite atlas, offscreen canvas).
- Pinch-zoom, haptics, accessibility.
- Tests beyond replay tape, save round-trip, and targeting equivalence harnesses.
- Analytics/telemetry beyond what Phase 1.2 sunset criteria need.
- Cloud sync, multi-device save reconciliation.

---

## Phase Sequence

1. **Session 1 — Phase 1.** Two timing fixes (1.1, 1.2 with flag). ~80 LOC.
2. **Session 2 — Phase 1.5.** Save schema migration. ~250 LOC.
3. **Session 2.5 — Replay tape capture.** No code change in `src/`. Captures `tests/fixtures/replay-baseline-postP1.json`. **Required before Session 3.**
4. **Session 3 — Phase 2.** Perf wins. Validate on Profile DT-Throttle and at least one of Profile iOS-SE2020 / Android-P4a.
5. **Session 4 — Phase 3.** Touch UX. Real-device testing required.
6. **Session 5 (after sunset trigger met) — Phase 4.** Refactor + flag removal.

---

## Acceptance Summary (one-liner per phase)

- **Phase 1 done when:** projectile pixels/second is refresh-rate-invariant; with `gameClockV2` ON, tower DPS scales with `speedMult`; flag-OFF behavior is bit-identical to pre-fix.
- **Phase 1.5 done when:** v1 saves round-trip identically through v2 code; v2 saves degrade gracefully on a v1 build; new upgrade paths persist with no `saveGame.js` edits.
- **Phase 2 done when:** Game.jsx React commits ≤ 12/s; selection feedback ≤1 canvas frame; Profile DT-Throttle holds ≥45fps median at wave 15 with 20 towers; replay tape matches baseline.
- **Phase 3 done when:** tap-to-place ≤80ms median on iOS-SE2020 / Android-P4a; 0 first-render layout flashes in 20 trials; long-press 20/20 with 0 pan false-positives.
- **Phase 4 done when:** replay tape passes; Game.jsx <500 LOC; no `lib/`→`components/` imports; `gameClockV2` removed.

---

## Executor Notes (from Critic)

1. **Phase 4.7 is load-bearing for tech-debt hygiene.** The grep-zero check is the gate. If OR-trigger conditions aren't met by Phase 4 close, escalate before merging — don't quietly carry the flag forward.
2. **The 600ms / 10px constants in Phase 3.3 may feel wrong on first device test.** Calibrated against published mobile-UX norms but two-thumb tower-defense ergonomics differ. Run the 20/20 trial as written; if false-positive rate spikes during fast wave-15 play, treat as real signal — adjust constants and re-run, document the change.
3. **Replay-tape capture timing (Session 2.5, post-Phase-1.5) is the right window — protect it.** Diff the tape against a manually-played reference run before locking it in as baseline.

---

## File Locations Referenced

- `src/pages/Game.jsx`
- `src/lib/gameEngine.js`
- `src/components/game/GameBoard.jsx`
- `src/lib/saveGame.js`
- `src/lib/towerUpgradePaths.js`
- `src/hooks/use-mobile.jsx`

New files to be created:
- `src/hooks/useGameLoop.js`, `src/hooks/useGameState.js`, `src/hooks/useTowers.js`, `src/hooks/useAbilities.js` (Phase 4)
- `src/hooks/useBoardGestures.js` (Phase 3)
- `src/lib/effects.js` (Phase 4.5)
- `tests/fixtures/replay-baseline-postP1.json` (Session 2.5)
