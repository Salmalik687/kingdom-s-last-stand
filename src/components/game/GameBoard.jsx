import { useRef, useEffect, useCallback } from "react";
import {
  CELL_SIZE, GRID_COLS, GRID_ROWS, PATH, PATH_SET, TOWER_TYPES, getStageTheme
} from "../../lib/gameEngine";
import { drawEnemyGraphic } from "../../lib/enemyGraphics";

const BOARD_W = GRID_COLS * CELL_SIZE;
const BOARD_H = GRID_ROWS * CELL_SIZE;

// Seeded pseudo-random for stable decorations
function seededRand(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

// Pre-compute stable decoration positions once
const DECO_SEED = 42;
const _rng = seededRand(DECO_SEED);
// For each non-path cell, decide decoration: null | 'tree' | 'pine' | 'bush' | 'rock' | 'flower'
const CELL_DECO = {};
for (let x = 0; x < GRID_COLS; x++) {
  for (let y = 0; y < GRID_ROWS; y++) {
    if (PATH_SET.has(`${x},${y}`)) { CELL_DECO[`${x},${y}`] = null; continue; }
    const r = _rng();
    if (r < 0.10) CELL_DECO[`${x},${y}`] = 'tree';
    else if (r < 0.17) CELL_DECO[`${x},${y}`] = 'pine';
    else if (r < 0.22) CELL_DECO[`${x},${y}`] = 'rock';
    else if (r < 0.27) CELL_DECO[`${x},${y}`] = 'bush';
    else if (r < 0.31) CELL_DECO[`${x},${y}`] = 'flower';
    else CELL_DECO[`${x},${y}`] = null;
  }
}

// Stable cloud positions
const CLOUDS = Array.from({ length: 5 }, (_, i) => {
  const r2 = seededRand(i * 999 + 7);
  return { x: r2() * BOARD_W, y: r2() * (BOARD_H * 0.28), r: 18 + r2() * 22 };
});

// Stable mountain silhouette peaks (background only)
const MOUNTAIN_PEAKS = Array.from({ length: 6 }, (_, i) => {
  const r3 = seededRand(i * 333 + 55);
  return { x: r3() * BOARD_W, h: 55 + r3() * 55 };
});

// Biome-based terrain background with regions
function drawBiomeMap(ctx, wave) {
  const theme = getStageTheme(wave || 1);
  const isMeadow = wave >= 1 && wave <= 5;
  
  // Base background gradient
  ctx.fillStyle = theme.bg;
  ctx.fillRect(0, 0, BOARD_W, BOARD_H);

  // Meadow: Draw distant mountains
  if (isMeadow) {
    // Far mountains (darker, smaller)
    ctx.fillStyle = "rgba(60,100,80,0.3)";
    ctx.beginPath();
    ctx.moveTo(-20, BOARD_H * 0.35);
    ctx.lineTo(BOARD_W * 0.25, BOARD_H * 0.15);
    ctx.lineTo(BOARD_W * 0.5, BOARD_H * 0.28);
    ctx.lineTo(BOARD_W * 0.75, BOARD_H * 0.12);
    ctx.lineTo(BOARD_W + 20, BOARD_H * 0.32);
    ctx.lineTo(BOARD_W + 20, BOARD_H);
    ctx.lineTo(-20, BOARD_H);
    ctx.fill();
    
    // Snow caps on mountains
    ctx.fillStyle = "rgba(240,245,255,0.4)";
    ctx.beginPath();
    ctx.moveTo(BOARD_W * 0.25, BOARD_H * 0.15);
    ctx.lineTo(BOARD_W * 0.32, BOARD_H * 0.22);
    ctx.lineTo(BOARD_W * 0.18, BOARD_H * 0.22);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(BOARD_W * 0.75, BOARD_H * 0.12);
    ctx.lineTo(BOARD_W * 0.83, BOARD_H * 0.20);
    ctx.lineTo(BOARD_W * 0.67, BOARD_H * 0.20);
    ctx.fill();
  }

  // Create biome regions with organic shapes
  const biomes = isMeadow ? [
    { x: BOARD_W * 0.3, y: BOARD_H * 0.6, r: 95, color: "#7BC043", name: "grass" },
    { x: BOARD_W * 0.7, y: BOARD_H * 0.65, r: 80, color: "#6BA340", name: "grass" },
    { x: BOARD_W * 0.2, y: BOARD_H * 0.8, r: 70, color: "#5BA3D0", name: "water" },
  ] : [
    { x: BOARD_W * 0.2, y: BOARD_H * 0.3, r: 90, color: "#D4A574", name: "desert" },
    { x: BOARD_W * 0.7, y: BOARD_H * 0.25, r: 85, color: "#7BC043", name: "forest" },
    { x: BOARD_W * 0.15, y: BOARD_H * 0.75, r: 80, color: "#5BA3D0", name: "water" },
    { x: BOARD_W * 0.85, y: BOARD_H * 0.65, r: 75, color: "#4A8FBF", name: "water" },
  ];
  
  // Draw biome blobs
  biomes.forEach(b => {
    ctx.fillStyle = b.color;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = `${b.color}aa`;
    ctx.lineWidth = 2;
    ctx.stroke();
  });
  
  // Winding river/path blend zones
  ctx.strokeStyle = "rgba(76,140,180,0.4)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(0, BOARD_H * 0.5);
  ctx.quadraticCurveTo(BOARD_W * 0.3, BOARD_H * 0.3, BOARD_W * 0.5, BOARD_H * 0.4);
  ctx.quadraticCurveTo(BOARD_W * 0.7, BOARD_H * 0.5, BOARD_W, BOARD_H * 0.6);
  ctx.stroke();

  // Meadow: snow particles and wind lines
  if (isMeadow) {
    // Falling snow streaks (wind effect)
    ctx.strokeStyle = "rgba(240,245,255,0.25)";
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 20; i++) {
      const sx = (i * BOARD_W / 20 + (performance.now() * 0.05) % BOARD_W) % BOARD_W;
      const sy = BOARD_H * 0.15 + (i % 4) * BOARD_H * 0.15;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(sx - 8, sy + 3);
      ctx.stroke();
    }
    
    // Snow accumulation on ground
    ctx.fillStyle = "rgba(240,245,255,0.15)";
    ctx.fillRect(0, BOARD_H * 0.85, BOARD_W, BOARD_H * 0.15);
  }

  // Scatter biome decorations
  if (!isMeadow) {
    for (let i = 0; i < 15; i++) {
      const angle = (i / 15) * Math.PI * 2;
      const forestDist = BOARD_W * 0.25 + Math.random() * BOARD_W * 0.15;
      const tx = BOARD_W * 0.7 + Math.cos(angle) * forestDist * (0.7 + Math.random() * 0.3);
      const ty = BOARD_H * 0.25 + Math.sin(angle) * forestDist * (0.7 + Math.random() * 0.3);
      
      if (tx > 0 && tx < BOARD_W && ty > 0 && ty < BOARD_H) {
        ctx.fillStyle = "#5BA347";
        ctx.beginPath();
        ctx.arc(tx, ty, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#2E7D32";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
    
    // Desert rocks
    for (let i = 0; i < 10; i++) {
      const rx = BOARD_W * (0.1 + Math.random() * 0.3);
      const ry = BOARD_H * (0.2 + Math.random() * 0.3);
      ctx.fillStyle = "#A89060";
      ctx.beginPath();
      ctx.arc(rx, ry, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#8B7355";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  // Biome-specific atmospheric overlays
  const isDungeon = wave >= 6 && wave <= 10;
  const isVolcano = wave >= 11 && wave <= 15;
  const isAbyss = wave >= 16 && wave <= 20;
  const isShadow = wave >= 21 && wave <= 25;

  // Dungeon: Dark aura with glowing runes
  if (isDungeon) {
    ctx.fillStyle = "rgba(50,30,100,0.15)";
    ctx.fillRect(0, 0, BOARD_W, BOARD_H);
    for (let i = 0; i < 12; i++) {
      const rx = Math.random() * BOARD_W;
      const ry = Math.random() * BOARD_H;
      ctx.fillStyle = `rgba(138,43,226,${0.1 + Math.random() * 0.15})`;
      ctx.beginPath();
      ctx.arc(rx, ry, 20 + Math.random() * 30, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Volcano: Lava glow and heat haze
  if (isVolcano) {
    ctx.fillStyle = "rgba(150,30,0,0.12)";
    ctx.fillRect(0, 0, BOARD_W, BOARD_H);
    for (let i = 0; i < 10; i++) {
      const lx = Math.random() * BOARD_W;
      const ly = Math.random() * BOARD_H;
      ctx.fillStyle = `rgba(255,100,0,${0.08 + Math.random() * 0.12})`;
      ctx.beginPath();
      ctx.arc(lx, ly, 25 + Math.random() * 35, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Abyss: Frozen crystalline aura
  if (isAbyss) {
    ctx.fillStyle = "rgba(30,80,150,0.12)";
    ctx.fillRect(0, 0, BOARD_W, BOARD_H);
    for (let i = 0; i < 14; i++) {
      const ax = Math.random() * BOARD_W;
      const ay = Math.random() * BOARD_H;
      ctx.fillStyle = `rgba(100,200,255,${0.08 + Math.random() * 0.14})`;
      ctx.beginPath();
      ctx.arc(ax, ay, 18 + Math.random() * 28, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Shadow Realm: Void vortex with cosmic swirls
  if (isShadow) {
    ctx.fillStyle = "rgba(60,20,100,0.18)";
    ctx.fillRect(0, 0, BOARD_W, BOARD_H);
    // Cosmic particles
    for (let i = 0; i < 16; i++) {
      const sx = Math.random() * BOARD_W;
      const sy = Math.random() * BOARD_H;
      ctx.fillStyle = `rgba(168,85,247,${0.1 + Math.random() * 0.16})`;
      ctx.beginPath();
      ctx.arc(sx, sy, 22 + Math.random() * 32, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function drawCellDeco(ctx, x, y, deco) {
  const cx = x * CELL_SIZE + CELL_SIZE / 2;
  const cy = y * CELL_SIZE + CELL_SIZE / 2;
  ctx.font = `${CELL_SIZE * 0.52}px serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const emojis = { tree: "🌳", pine: "🌲", rock: "🪨", bush: "🌿", flower: "🌸" };
  if (emojis[deco]) ctx.fillText(emojis[deco], cx, cy + 2);
}

function drawGrid(ctx, theme, wave) {
  // Draw biome-based map
  drawBiomeMap(ctx, wave);

  // Ground tiles (checkerboard tint)
  for (let x = 0; x < GRID_COLS; x++) {
    for (let y = 0; y < GRID_ROWS; y++) {
      const isPath = PATH_SET.has(`${x},${y}`);
      if (!isPath) {
        ctx.fillStyle = ((x + y) % 2 === 0) ? theme.grassA : theme.grassB;
        ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
    }
  }

  // Path
  PATH.forEach(([x, y], i) => {
    ctx.fillStyle = i % 2 === 0 ? theme.pathA : theme.pathB;
    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    ctx.strokeStyle = theme.pathBorder;
    ctx.lineWidth = 1;
    ctx.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  });

  // Grid lines
  ctx.strokeStyle = theme.gridLine;
  ctx.lineWidth = 0.5;
  for (let x = 0; x <= GRID_COLS; x++) {
    ctx.beginPath();
    ctx.moveTo(x * CELL_SIZE, 0);
    ctx.lineTo(x * CELL_SIZE, BOARD_H);
    ctx.stroke();
  }
  for (let y = 0; y <= GRID_ROWS; y++) {
    ctx.beginPath();
    ctx.moveTo(0, y * CELL_SIZE);
    ctx.lineTo(BOARD_W, y * CELL_SIZE);
    ctx.stroke();
  }

  // Cell decorations on non-path cells
  for (let x = 0; x < GRID_COLS; x++) {
    for (let y = 0; y < GRID_ROWS; y++) {
      const key = `${x},${y}`;
      const deco = CELL_DECO[key];
      if (deco) drawCellDeco(ctx, x, y, deco);
    }
  }

  // Castle at end
  const [ex, ey] = PATH[PATH.length - 1];
  ctx.font = `${CELL_SIZE * 0.7}px serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("🏰", (ex + 0.5) * CELL_SIZE, (ey + 0.5) * CELL_SIZE);
}

const SKIN_OVERLAYS = {
  ancient:   { badge: "🪨", ringColor: "#78716c" },
  infernal:  { badge: "😈", ringColor: "#dc2626" },
  celestial: { badge: "🌟", ringColor: "#fbbf24" },
  shadow:    { badge: "🌑", ringColor: "#7c3aed" },
  void:      { badge: "🌀", ringColor: "#6d28d9" },
  doomplate: { badge: "💀", ringColor: "#450a0a" },
};

function drawTowers(ctx, towers, selectedTowerId) {
  const now = performance.now();

  towers.forEach(tower => {
    const { x, y, emoji, level } = tower;
    const customColor = tower.customColor && tower.customColor !== "default" ? tower.customColor : null;
    const effect = tower.customEffect ?? "none";
    const skin = tower.customSkin ?? "default";
    const skinData = SKIN_OVERLAYS[skin];

    const accentColor = customColor
      ? { crimson: "#dc2626", amber: "#f59e0b", emerald: "#10b981", sky: "#0ea5e9",
          violet: "#7c3aed", rose: "#f43f5e", gold: "#ffd60a", void: "#1a0a2e" }[tower.customColor] ?? "#a78bfa"
      : (skinData?.ringColor ?? "rgba(100,60,60,0.5)");

    // ── Effect: Glow / Pulse / Holy pre-draw rings ──────────────
    if (effect === "glow" || effect === "holy") {
      ctx.save();
      const glowAlpha = 0.35 + Math.sin(now * 0.003) * 0.1;
      ctx.globalAlpha = glowAlpha;
      ctx.shadowColor = accentColor;
      ctx.shadowBlur = 18;
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(x, y, CELL_SIZE * 0.42, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      ctx.restore();
    }

    if (effect === "pulse") {
      const pulsePct = (Math.sin(now * 0.004) + 1) / 2; // 0-1
      ctx.save();
      ctx.globalAlpha = pulsePct * 0.5;
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 2 + pulsePct * 3;
      ctx.beginPath();
      ctx.arc(x, y, CELL_SIZE * 0.38 + pulsePct * 8, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    if (effect === "lightning") {
      // Crackling sparks
      ctx.save();
      ctx.strokeStyle = "#fbbf24";
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.6 + Math.random() * 0.4;
      for (let i = 0; i < 3; i++) {
        const angle = (now * 0.005 + i * 2.1) % (Math.PI * 2);
        const r1 = CELL_SIZE * 0.35;
        const r2 = r1 + 6 + Math.random() * 5;
        ctx.beginPath();
        ctx.moveTo(x + Math.cos(angle) * r1, y + Math.sin(angle) * r1);
        ctx.lineTo(x + Math.cos(angle + 0.3) * r2, y + Math.sin(angle + 0.3) * r2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    if (effect === "frost") {
      // Orbiting ice crystals
      ctx.save();
      ctx.font = "8px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let i = 0; i < 4; i++) {
        const angle = now * 0.002 + i * (Math.PI / 2);
        const r = CELL_SIZE * 0.44;
        ctx.fillText("❄", x + Math.cos(angle) * r, y + Math.sin(angle) * r);
      }
      ctx.restore();
    }

    if (effect === "void") {
      // Spiraling dark particles
      ctx.save();
      for (let i = 0; i < 5; i++) {
        const angle = now * 0.003 + i * (Math.PI * 2 / 5);
        const r = CELL_SIZE * 0.40;
        ctx.globalAlpha = 0.5 + Math.sin(now * 0.005 + i) * 0.3;
        ctx.fillStyle = "#7c3aed";
        ctx.beginPath();
        ctx.arc(x + Math.cos(angle) * r, y + Math.sin(angle) * r, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    if (effect === "fire") {
      // Flame flickers above
      ctx.save();
      ctx.font = "10px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.globalAlpha = 0.75 + Math.sin(now * 0.01) * 0.25;
      const flicker = Math.sin(now * 0.012) * 2;
      ctx.fillText("🔥", x + flicker, y - CELL_SIZE * 0.45);
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    // ── Base circle ──────────────────────────────────────────────
    ctx.fillStyle = customColor ? `${accentColor}22` : "rgba(40, 30, 20, 0.8)";
    ctx.beginPath();
    ctx.arc(x, y, CELL_SIZE * 0.38, 0, Math.PI * 2);
    ctx.fill();

    const ringColor = tower.id === selectedTowerId ? "#dc2626" : accentColor;
    ctx.strokeStyle = ringColor;
    ctx.lineWidth = tower.id === selectedTowerId ? 2 : customColor ? 1.5 : 1;
    ctx.beginPath();
    ctx.arc(x, y, CELL_SIZE * 0.38, 0, Math.PI * 2);
    ctx.stroke();

    // ── Tower emoji (skin override for badge) ─────────────────────
    const displayEmoji = skin !== "default" && skinData ? emoji : emoji;
    ctx.font = `${CELL_SIZE * 0.5}px serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    if (customColor) {
      ctx.shadowColor = accentColor;
      ctx.shadowBlur = 8;
    }
    ctx.fillText(displayEmoji, x, y);
    ctx.shadowBlur = 0;

    // Skin badge (top-left corner)
    if (skinData) {
      ctx.font = `${CELL_SIZE * 0.24}px serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(skinData.badge, x - CELL_SIZE * 0.25, y - CELL_SIZE * 0.25);
    }

    // ── Level indicator ─────────────────────────────────────────
    if (level > 1) {
      ctx.fillStyle = customColor ? accentColor : "#fbbf24";
      ctx.font = "bold 9px sans-serif";
      ctx.shadowColor = customColor ? accentColor : "#fbbf24";
      ctx.shadowBlur = customColor ? 4 : 0;
      ctx.fillText("★".repeat(Math.min(level - 1, 4)), x, y + CELL_SIZE * 0.35);
      ctx.shadowBlur = 0;
    }

    // ── Range circle if selected ──────────────────────────────────
    if (tower.id === selectedTowerId) {
      ctx.save();
      ctx.strokeStyle = customColor ? `${accentColor}44` : "rgba(220, 38, 38, 0.25)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(x, y, tower.range, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  });
}

function drawEnemies(ctx, enemies) {
  const now = performance.now();

  enemies.forEach(enemy => {
    const { x, y, hp, maxHp, emoji, modEmoji, modColor, speed } = enemy;

    // --- Animation calculations ---
    // Unique per-enemy phase offset using their id hash
    const idHash = enemy.id.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const phase = idHash * 0.731;

    // Bob: vertical bounce based on speed
    const bobFreq = 8 + speed * 3;
    const bobAmp = 2.5 + speed * 1.2;
    const bob = Math.sin(now * 0.001 * bobFreq + phase) * bobAmp;

    // Charge lean: tilt forward (lean right = positive rotation)
    const leanAngle = Math.min(0.35, speed * 0.13);

    // Speed lines for fast enemies
    const isFast = speed > 1.4;

    // Spawn flash: bright ring in first ~600ms of life
    const spawnAge = now - (enemy.spawnTime ?? now);
    const isSpawning = spawnAge < 600;
    const spawnAlpha = isSpawning ? Math.max(0, 1 - spawnAge / 600) : 0;

    ctx.save();
    ctx.translate(x, y + bob);

    // Spawn entry flash ring
    if (spawnAlpha > 0) {
      ctx.save();
      ctx.globalAlpha = spawnAlpha * 0.8;
      ctx.strokeStyle = modColor || "#ffffff";
      ctx.lineWidth = 3;
      const ringR = CELL_SIZE * 0.5 * (1 + (1 - spawnAlpha) * 0.8);
      ctx.beginPath();
      ctx.arc(0, 0, ringR, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    // Speed lines behind fast/berserker enemies
    if (isFast) {
      const lineCount = 3;
      const lineAlpha = 0.35 + Math.sin(now * 0.008 + phase) * 0.15;
      ctx.save();
      ctx.globalAlpha = lineAlpha;
      ctx.strokeStyle = modColor || "#facc15";
      ctx.lineWidth = 1.5;
      for (let i = 0; i < lineCount; i++) {
        const offset = (i - 1) * 5;
        const len = 10 + speed * 4;
        ctx.beginPath();
        ctx.moveTo(-CELL_SIZE * 0.22, offset);
        ctx.lineTo(-CELL_SIZE * 0.22 - len, offset);
        ctx.stroke();
      }
      ctx.restore();
    }

    // Apply charge lean rotation
    ctx.rotate(leanAngle);

    // Modifier glow ring
    if (modColor) {
      ctx.save();
      ctx.strokeStyle = modColor;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.55 + Math.sin(now * 0.006 + phase) * 0.2;
      ctx.beginPath();
      ctx.arc(0, 0, CELL_SIZE * 0.34, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    // Shadow (squash/stretch with bob)
    const shadowScale = 1 - bob * 0.04;
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.beginPath();
    ctx.ellipse(0, CELL_SIZE * 0.3 - bob, 8 * shadowScale, 4 * shadowScale, 0, 0, Math.PI * 2);
    ctx.fill();

    // 3D enemy graphic — scale pulse on boss
    const isBoss = enemy.type?.startsWith("boss_");
    const scale = isBoss ? 1.6 + Math.sin(now * 0.004 + phase) * 0.08 : 1.0;
    ctx.save();
    ctx.scale(scale, scale);
    drawEnemyGraphic(ctx, enemy.type, isBoss);
    ctx.restore();

    // Modifier badge (emoji still used as small overlay icon)
    if (modEmoji) {
      ctx.font = `${CELL_SIZE * 0.28}px serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(modEmoji, CELL_SIZE * 0.28, -CELL_SIZE * 0.28);
    }

    ctx.restore();

    // HP bar (drawn in world space, not rotated)
    const barW = CELL_SIZE * 0.7;
    const barH = 3;
    const barX = x - barW / 2;
    const barY = y + bob - CELL_SIZE * 0.42;
    const hpPercent = hp / maxHp;

    const hpColor = modColor && hpPercent > 0.25
      ? modColor
      : hpPercent > 0.5 ? "#22c55e" : hpPercent > 0.25 ? "#eab308" : "#ef4444";

    ctx.fillStyle = "rgba(0,0,0,0.8)";
    ctx.fillRect(barX - 1, barY - 1, barW + 2, barH + 2);
    
    // HP bar with glow
    ctx.shadowColor = hpColor;
    ctx.shadowBlur = 4;
    ctx.fillStyle = hpColor;
    ctx.fillRect(barX, barY, barW * hpPercent, barH);
    ctx.shadowBlur = 0;
  });
}

const CUSTOM_COLOR_HEX = {
  crimson: "#dc2626", amber: "#f59e0b", emerald: "#10b981",
  sky: "#0ea5e9", violet: "#7c3aed", rose: "#f43f5e",
  gold: "#ffd60a", void: "#6d28d9",
};

// Per-projectile trail history: projId -> [{x,y}]
const _trailMap = {};

// Per-tower-type projectile appearance config
const PROJ_CONFIG = {
  // Archers — bright green arrow
  archer:          { color: "#4ade80", size: 3, shape: "arrow", glow: 8 },
  stormArcher:     { color: "#22c55e", size: 3, shape: "arrow", glow: 10 },
  arrowStorm:      { color: "#86efac", size: 3, shape: "arrow", glow: 12 },
  thunderArcher:   { color: "#a3e635", size: 3, shape: "arrow", glow: 12 },
  // Crossbow/Ballista — sharp yellow-lime bolt
  crossbow:        { color: "#facc15", size: 3, shape: "bolt", glow: 8 },
  ballista:        { color: "#eab308", size: 4, shape: "bolt", glow: 12 },
  venomCrossbow:   { color: "#84cc16", size: 3, shape: "bolt", glow: 10 },
  // Cannon — fiery orange orb
  cannon:          { color: "#f97316", size: 5, shape: "orb", glow: 14 },
  warcannon:       { color: "#ea580c", size: 6, shape: "orb", glow: 18 },
  doomcannon:      { color: "#dc2626", size: 7, shape: "orb", glow: 22 },
  doomSiege:       { color: "#b91c1c", size: 7, shape: "orb", glow: 22 },
  // Trebuchet/Siege — yellow boulder
  trebuchet:       { color: "#fbbf24", size: 6, shape: "boulder", glow: 14 },
  siegeEngine:     { color: "#f59e0b", size: 7, shape: "boulder", glow: 16 },
  infernoTrebuchet:{ color: "#ff6b00", size: 7, shape: "boulder", glow: 20 },
  // Mage — purple magic orb
  mage:            { color: "#c084fc", size: 4, shape: "magic", glow: 16 },
  spellcaster:     { color: "#a855f7", size: 5, shape: "magic", glow: 18 },
  arcaneCannoneer: { color: "#7c3aed", size: 5, shape: "magic", glow: 18 },
  shadowMage:      { color: "#6d28d9", size: 5, shape: "magic", glow: 18 },
  voidCannon:      { color: "#4c1d95", size: 6, shape: "magic", glow: 20 },
  arcaneSiege:     { color: "#8b5cf6", size: 6, shape: "magic", glow: 20 },
  // Frost — icy cyan shard
  frost:           { color: "#38bdf8", size: 4, shape: "ice", glow: 12 },
  frozenMage:      { color: "#7dd3fc", size: 4, shape: "ice", glow: 14 },
  blizzardTower:   { color: "#bae6fd", size: 5, shape: "ice", glow: 16 },
  frostCannoneer:  { color: "#0ea5e9", size: 5, shape: "ice", glow: 14 },
  glacialBallista: { color: "#e0f2fe", size: 5, shape: "ice", glow: 16 },
  frostStorm:      { color: "#93c5fd", size: 5, shape: "ice", glow: 18 },
  // War Machine family — deep red
  warMachine:      { color: "#ef4444", size: 6, shape: "orb", glow: 18 },
  // New Epic / Mega / Ultra / Legend towers
  dualCrossbow:    { color: "#84cc16", size: 3, shape: "bolt",    glow: 10 },
  phantomArcher:   { color: "#c084fc", size: 3, shape: "arrow",   glow: 14 },
  ruinCannon:      { color: "#f43f5e", size: 8, shape: "orb",     glow: 26 },
  abyssalMage:     { color: "#6d28d9", size: 6, shape: "magic",   glow: 22 },
  tempestEngine:   { color: "#facc15", size: 7, shape: "boulder", glow: 20 },
  soulReaper:      { color: "#fb7185", size: 5, shape: "magic",   glow: 20 },
  frostfireCannon: { color: "#38bdf8", size: 5, shape: "orb",     glow: 16 },
  celestialBallista:{ color: "#fde68a",size: 4, shape: "bolt",    glow: 18 },
  voidSiege:       { color: "#7c3aed", size: 9, shape: "magic",   glow: 30 },
  plagueBalista:   { color: "#4ade80", size: 4, shape: "bolt",    glow: 12 },
  stormSiege:      { color: "#e0f2fe", size: 8, shape: "boulder", glow: 24 },
  crimsonSpire:    { color: "#dc2626", size: 7, shape: "magic",   glow: 26 },
};

function getProjConfig(proj, towerColorMap) {
  const customColor = proj.towerId && towerColorMap[proj.towerId];
  const base = PROJ_CONFIG[proj.towerType] ?? { color: "#fbbf24", size: 4, shape: "orb", glow: 8 };
  return { ...base, color: customColor || base.color };
}

function drawProjectiles(ctx, projectiles, towers) {
  const towerColorMap = {};
  towers.forEach(t => {
    if (t.customColor && t.customColor !== "default") {
      towerColorMap[t.id] = CUSTOM_COLOR_HEX[t.customColor] ?? null;
    }
  });

  // Remove stale trails
  const liveIds = new Set(projectiles.map(p => p.id));
  for (const id of Object.keys(_trailMap)) {
    if (!liveIds.has(id)) delete _trailMap[id];
  }

  const now = performance.now();

  projectiles.forEach(proj => {
    const cfg = getProjConfig(proj, towerColorMap);
    const { color, size, shape, glow } = cfg;

    // Update trail
    if (!_trailMap[proj.id]) _trailMap[proj.id] = [];
    const trail = _trailMap[proj.id];
    trail.push({ x: proj.x, y: proj.y });
    if (trail.length > 10) trail.shift();

    // ── Trail ────────────────────────────────────────────────────
    if (trail.length > 1) {
      for (let i = 1; i < trail.length; i++) {
        const alpha = (i / trail.length) * 0.5;
        const trailSize = size * (i / trail.length) * 0.75;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(trail[i].x, trail[i].y, trailSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // ── Main projectile by shape ─────────────────────────────────
    ctx.save();
    ctx.shadowColor = color;
    ctx.shadowBlur = glow;

    // Compute direction angle from trail for arrow/bolt shapes
    const dx = trail.length > 1 ? proj.x - trail[trail.length - 2].x : 1;
    const dy = trail.length > 1 ? proj.y - trail[trail.length - 2].y : 0;
    const angle = Math.atan2(dy, dx);

    if (shape === "arrow") {
      // Thin elongated needle — green
      ctx.translate(proj.x, proj.y);
      ctx.rotate(angle);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(size * 2.5, 0);
      ctx.lineTo(-size * 1.5, -size * 0.7);
      ctx.lineTo(-size * 0.8, 0);
      ctx.lineTo(-size * 1.5, size * 0.7);
      ctx.closePath();
      ctx.fill();
      // Shaft
      ctx.strokeStyle = color + "aa";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-size * 1.5, 0);
      ctx.lineTo(-size * 3, 0);
      ctx.stroke();

    } else if (shape === "bolt") {
      // Crossbow bolt — yellow diamond
      ctx.translate(proj.x, proj.y);
      ctx.rotate(angle);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(size * 2.2, 0);
      ctx.lineTo(0, -size * 0.8);
      ctx.lineTo(-size * 2, 0);
      ctx.lineTo(0, size * 0.8);
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = glow * 1.4;

    } else if (shape === "orb") {
      // Cannon ball — radial gradient with bright core
      const grad = ctx.createRadialGradient(proj.x, proj.y, 0, proj.x, proj.y, size);
      grad.addColorStop(0, "#ffffff99");
      grad.addColorStop(0.35, color);
      grad.addColorStop(1, color + "33");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(proj.x, proj.y, size, 0, Math.PI * 2);
      ctx.fill();
      // Hot-spot ring
      ctx.strokeStyle = "#ffffff55";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(proj.x, proj.y, size * 0.5, 0, Math.PI * 2);
      ctx.stroke();

    } else if (shape === "boulder") {
      // Trebuchet boulder — rough circle with dark outline
      const grad = ctx.createRadialGradient(proj.x - size * 0.3, proj.y - size * 0.3, 0, proj.x, proj.y, size);
      grad.addColorStop(0, "#ffffffaa");
      grad.addColorStop(0.4, color);
      grad.addColorStop(1, "#00000066");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(proj.x, proj.y, size, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#00000055";
      ctx.lineWidth = 1.5;
      ctx.stroke();

    } else if (shape === "magic") {
      // Magic orb — pulsing white core + outer ring
      const pulse = 0.8 + Math.sin(now * 0.012 + proj.x) * 0.2;
      const grad = ctx.createRadialGradient(proj.x, proj.y, 0, proj.x, proj.y, size * pulse);
      grad.addColorStop(0, "#ffffff");
      grad.addColorStop(0.25, color);
      grad.addColorStop(1, color + "11");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(proj.x, proj.y, size * pulse, 0, Math.PI * 2);
      ctx.fill();
      // Outer sparkle ring
      ctx.strokeStyle = color + "99";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(proj.x, proj.y, size * pulse + 2.5, 0, Math.PI * 2);
      ctx.stroke();

    } else if (shape === "ice") {
      // Ice shard — pointed star / crystal
      ctx.translate(proj.x, proj.y);
      ctx.rotate(angle + now * 0.006);
      ctx.fillStyle = color;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        const r = i % 2 === 0 ? size * 1.4 : size * 0.6;
        i === 0 ? ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r)
                : ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
      }
      ctx.closePath();
      ctx.fill();
      // Inner white gleam
      ctx.fillStyle = "#ffffff66";
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.4, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  });
}

// ── Death particle pool ─────────────────────────────────────────────────────
const _deathParticles = []; // { x, y, vx, vy, life, maxLife, color, size }

export function spawnDeathParticles(x, y, isBoss = false) {
  const count = isBoss ? 18 : 8;
  const colors = isBoss
    ? ["#ffd60a", "#f97316", "#ef4444", "#a855f7", "#ffffff"]
    : ["#fbbf24", "#f87171", "#fb923c", "#ffffff"];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
    const speed = (isBoss ? 3 : 1.5) + Math.random() * (isBoss ? 3 : 1.5);
    _deathParticles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - (isBoss ? 1.5 : 0.8),
      life: 1,
      maxLife: 0.55 + Math.random() * 0.35,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: (isBoss ? 4 : 2) + Math.random() * (isBoss ? 4 : 2),
    });
  }
}

function updateAndDrawParticles(ctx, dt) {
  for (let i = _deathParticles.length - 1; i >= 0; i--) {
    const p = _deathParticles[i];
    p.x += p.vx * 1.2;
    p.y += p.vy * 1.2;
    p.vy += 0.12; // gravity
    p.life -= dt / p.maxLife;
    if (p.life <= 0) { _deathParticles.splice(i, 1); continue; }
    ctx.save();
    ctx.globalAlpha = Math.max(0, p.life) * 0.9;
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function drawHoverPreview(ctx, hoverCell, selectedTowerType) {
  if (!hoverCell || !selectedTowerType) return;
  const { gx, gy, valid } = hoverCell;
  const cx = gx * CELL_SIZE + CELL_SIZE / 2;
  const cy = gy * CELL_SIZE + CELL_SIZE / 2;
  const base = TOWER_TYPES[selectedTowerType];

  ctx.save();

  // Range preview
  ctx.strokeStyle = valid ? "rgba(180, 160, 100, 0.2)" : "rgba(200, 30, 30, 0.25)";
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.arc(cx, cy, base.range * CELL_SIZE, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  // Cell highlight
  ctx.fillStyle = valid ? "rgba(150, 120, 60, 0.12)" : "rgba(180, 20, 20, 0.12)";
  ctx.fillRect(gx * CELL_SIZE, gy * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  ctx.strokeStyle = valid ? "rgba(180, 150, 80, 0.5)" : "rgba(180, 30, 30, 0.5)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(gx * CELL_SIZE, gy * CELL_SIZE, CELL_SIZE, CELL_SIZE);

  // Tower preview
  ctx.globalAlpha = 0.5;
  ctx.font = `${CELL_SIZE * 0.5}px serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(base.emoji, cx, cy);

  ctx.restore();
}

export default function GameBoard({
  towers, enemies, projectiles, selectedTowerType,
  towerMap, onCellClick, selectedTowerId, wave, onTowerSwap, canvasRef: externalCanvasRef
}) {
  const internalCanvasRef = useRef(null);
  const canvasRef = externalCanvasRef ?? internalCanvasRef;
  const hoverRef = useRef(null);
  const animFrameRef = useRef(null);
  const dragRef = useRef(null); // { towerId, startGx, startGy }

  const lastRenderTimeRef = useRef(0);

  const render = useCallback((timestamp) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dt = Math.min((timestamp - (lastRenderTimeRef.current || timestamp)) / 1000, 0.05);
    lastRenderTimeRef.current = timestamp;

    // Full clear + reset all state to avoid shadow/glow bleed between frames
    ctx.clearRect(0, 0, BOARD_W, BOARD_H);
    ctx.shadowBlur = 0;
    ctx.shadowColor = "transparent";
    ctx.globalAlpha = 1;
    ctx.setLineDash([]);

    const theme = getStageTheme(wave || 1);
    drawGrid(ctx, theme, wave || 1);
    drawTowers(ctx, towers, selectedTowerId);
    drawEnemies(ctx, enemies);
    drawProjectiles(ctx, projectiles, towers);
    updateAndDrawParticles(ctx, dt);
    drawHoverPreview(ctx, hoverRef.current, selectedTowerType);

    animFrameRef.current = requestAnimationFrame(render);
  }, [towers, enemies, projectiles, selectedTowerType, selectedTowerId, wave]);

  useEffect(() => {
    animFrameRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [render]);

  // Pointer events unify mouse / touch / pen handling and avoid the iOS
  // 300ms click-delay path. We track `pressedRef` to distinguish between a
  // tap (no movement) and a drag, replacing the legacy onClick handler.
  const pressedRef = useRef(null); // { gx, gy, downAt, moved }

  const getCellFromEvent = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const scaleX = BOARD_W / rect.width;
    const scaleY = BOARD_H / rect.height;
    const mx = (e.clientX - rect.left) * scaleX;
    const my = (e.clientY - rect.top) * scaleY;
    const gx = Math.floor(mx / CELL_SIZE);
    const gy = Math.floor(my / CELL_SIZE);
    if (gx >= 0 && gx < GRID_COLS && gy >= 0 && gy < GRID_ROWS) return { gx, gy };
    return null;
  };

  const handlePointerDown = (e) => {
    // Only react to primary button presses (mouse) or any touch/pen.
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const cell = getCellFromEvent(e);
    if (!cell) return;
    pressedRef.current = { gx: cell.gx, gy: cell.gy, moved: false };
    const key = `${cell.gx},${cell.gy}`;
    if (towerMap.has(key)) {
      dragRef.current = { towerId: towerMap.get(key), startGx: cell.gx, startGy: cell.gy };
    }
    // Capture future moves on this pointer, even if it leaves the canvas.
    if (canvasRef.current && e.pointerId != null) {
      try { canvasRef.current.setPointerCapture(e.pointerId); } catch (_) { /* noop */ }
    }
  };

  const handlePointerMove = (e) => {
    const cell = getCellFromEvent(e);
    if (!cell) { hoverRef.current = null; return; }
    const { gx, gy } = cell;
    const isPath = PATH_SET.has(`${gx},${gy}`);
    const hasTower = towerMap.has(`${gx},${gy}`);
    hoverRef.current = { gx, gy, valid: !isPath && !hasTower };
    if (pressedRef.current && (gx !== pressedRef.current.gx || gy !== pressedRef.current.gy)) {
      pressedRef.current.moved = true;
    }
  };

  const handlePointerUp = (e) => {
    const cell = getCellFromEvent(e);
    const drag = dragRef.current;
    const pressed = pressedRef.current;
    pressedRef.current = null;

    if (drag && cell) {
      const { gx, gy } = cell;
      const { startGx, startGy, towerId } = drag;
      if (gx !== startGx || gy !== startGy) {
        if (!PATH_SET.has(`${gx},${gy}`)) {
          onTowerSwap && onTowerSwap(towerId, startGx, startGy, gx, gy);
        }
        dragRef.current = null;
        return;
      }
    }
    dragRef.current = null;

    // Treat as tap if pointer didn't move to a different cell.
    if (cell && pressed && !pressed.moved) {
      onCellClick(cell.gx, cell.gy);
    }
  };

  const handlePointerLeave = () => {
    hoverRef.current = null;
  };

  const handlePointerCancel = () => {
    hoverRef.current = null;
    dragRef.current = null;
    pressedRef.current = null;
  };

  const theme = getStageTheme(wave || 1);

  return (
    <div className="relative w-full overflow-hidden rounded-xl border-2 shadow-2xl shadow-black/60"
      style={{ borderColor: theme.borderColor }}>
      {/* Stage banner */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold tracking-widest uppercase pointer-events-none"
        style={{ background: 'rgba(0,0,0,0.55)', border: `1px solid ${theme.borderColor}`, color: '#ccc', backdropFilter: 'blur(4px)' }}>
        <span>{theme.emoji}</span>
        <span>{theme.name}</span>
        <span style={{ opacity: 0.5 }}>— {theme.label}</span>
      </div>
      <canvas
        ref={canvasRef}
        width={BOARD_W}
        height={BOARD_H}
        className="w-full h-auto cursor-crosshair block"
        // touch-action: manipulation kills the iOS double-tap-to-zoom delay
        // on the board so taps register immediately instead of after ~300ms.
        style={{ touchAction: "manipulation" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onPointerCancel={handlePointerCancel}
      />
      {/* Entry indicator */}
      <div className="absolute top-0 left-0 w-6 h-full pointer-events-none flex items-center">
        <div className="text-xs text-amber-400/60 -rotate-90 whitespace-nowrap origin-center font-serif tracking-wide">
          ⚔ ENTER
        </div>
      </div>
    </div>
  );
}