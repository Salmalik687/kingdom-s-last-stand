import { useRef, useEffect, useCallback } from "react";
import {
  CELL_SIZE, GRID_COLS, GRID_ROWS, PATH, PATH_SET, TOWER_TYPES, getStageTheme
} from "../../lib/gameEngine";

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

// 2D flat storybook-style meadow background
function drawMeadow2D(ctx) {
  // ── Sky: flat cornflower blue ──
  ctx.fillStyle = "#87CEEB";
  ctx.fillRect(0, 0, BOARD_W, BOARD_H);

  // ── Sun: flat yellow circle + rays ──
  const sunX = BOARD_W * 0.82, sunY = BOARD_H * 0.10;
  // rays
  ctx.strokeStyle = "#FFD600";
  ctx.lineWidth = 2.5;
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(sunX + Math.cos(angle) * 20, sunY + Math.sin(angle) * 20);
    ctx.lineTo(sunX + Math.cos(angle) * 32, sunY + Math.sin(angle) * 32);
    ctx.stroke();
  }
  // disc fill
  ctx.fillStyle = "#FFE033";
  ctx.beginPath();
  ctx.arc(sunX, sunY, 18, 0, Math.PI * 2);
  ctx.fill();
  // disc outline
  ctx.strokeStyle = "#B8860B";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(sunX, sunY, 18, 0, Math.PI * 2);
  ctx.stroke();

  // ── Flat 2D clouds (rounded rectangles with bumps) ──
  function drawFlatCloud(cx, cy, w, h) {
    ctx.fillStyle = "#FFFFFF";
    // bumps on top
    const bumps = 4;
    for (let b = 0; b < bumps; b++) {
      const bx = cx - w * 0.35 + (b / (bumps - 1)) * w * 0.7;
      const by = cy - h * 0.3;
      ctx.beginPath();
      ctx.arc(bx, by, h * 0.55, 0, Math.PI * 2);
      ctx.fill();
    }
    // main body
    ctx.beginPath();
    ctx.roundRect(cx - w / 2, cy - h * 0.1, w, h * 0.7, h * 0.35);
    ctx.fill();
    // outline
    ctx.strokeStyle = "#B0C8E0";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let b = 0; b < bumps; b++) {
      const bx = cx - w * 0.35 + (b / (bumps - 1)) * w * 0.7;
      const by = cy - h * 0.3;
      ctx.arc(bx, by, h * 0.55, Math.PI, 0);
    }
    ctx.stroke();
    ctx.beginPath();
    ctx.roundRect(cx - w / 2, cy - h * 0.1, w, h * 0.7, h * 0.35);
    ctx.stroke();
  }
  drawFlatCloud(BOARD_W * 0.15, BOARD_H * 0.09, 80, 28);
  drawFlatCloud(BOARD_W * 0.40, BOARD_H * 0.06, 60, 22);
  drawFlatCloud(BOARD_W * 0.63, BOARD_H * 0.11, 70, 24);

  // ── Distant mountains: flat triangles with outline ──
  const mtns = [
    { x: BOARD_W * 0.05, w: 100, h: 70, fill: "#A8C4D8", snow: "#EEF6FF" },
    { x: BOARD_W * 0.22, w: 130, h: 90, fill: "#8BAEC8", snow: "#EEF6FF" },
    { x: BOARD_W * 0.45, w: 110, h: 75, fill: "#9BB8CC", snow: "#EEF6FF" },
    { x: BOARD_W * 0.65, w: 120, h: 82, fill: "#8BAEC8", snow: "#EEF6FF" },
    { x: BOARD_W * 0.88, w: 95,  h: 65, fill: "#A8C4D8", snow: "#EEF6FF" },
  ];
  const horizonY = BOARD_H * 0.44;
  mtns.forEach(m => {
    // mountain body
    ctx.fillStyle = m.fill;
    ctx.beginPath();
    ctx.moveTo(m.x - m.w / 2, horizonY);
    ctx.lineTo(m.x, horizonY - m.h);
    ctx.lineTo(m.x + m.w / 2, horizonY);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#6A8FA8";
    ctx.lineWidth = 2;
    ctx.stroke();
    // snow cap
    const snowH = m.h * 0.28;
    ctx.fillStyle = m.snow;
    ctx.beginPath();
    ctx.moveTo(m.x - m.w * 0.18, horizonY - m.h + snowH);
    ctx.lineTo(m.x, horizonY - m.h);
    ctx.lineTo(m.x + m.w * 0.18, horizonY - m.h + snowH);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#B0CCE0";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  });

  // ── Horizon hill strip: flat green band ──
  ctx.fillStyle = "#6DBF5A";
  ctx.beginPath();
  ctx.moveTo(0, horizonY + 2);
  // bumpy top edge
  const hillPts = [
    [0, horizonY + 2],
    [BOARD_W * 0.12, horizonY - 14],
    [BOARD_W * 0.25, horizonY + 4],
    [BOARD_W * 0.38, horizonY - 18],
    [BOARD_W * 0.52, horizonY + 2],
    [BOARD_W * 0.65, horizonY - 12],
    [BOARD_W * 0.78, horizonY + 6],
    [BOARD_W * 0.90, horizonY - 10],
    [BOARD_W, horizonY + 4],
  ];
  ctx.moveTo(hillPts[0][0], hillPts[0][1]);
  for (let i = 0; i < hillPts.length - 1; i++) {
    const mx = (hillPts[i][0] + hillPts[i + 1][0]) / 2;
    const my = (hillPts[i][1] + hillPts[i + 1][1]) / 2;
    ctx.quadraticCurveTo(hillPts[i][0], hillPts[i][1], mx, my);
  }
  ctx.lineTo(BOARD_W, BOARD_H);
  ctx.lineTo(0, BOARD_H);
  ctx.closePath();
  ctx.fill();
  // dark outline on hill top
  ctx.strokeStyle = "#3D8C2A";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(hillPts[0][0], hillPts[0][1]);
  for (let i = 0; i < hillPts.length - 1; i++) {
    const mx = (hillPts[i][0] + hillPts[i + 1][0]) / 2;
    const my = (hillPts[i][1] + hillPts[i + 1][1]) / 2;
    ctx.quadraticCurveTo(hillPts[i][0], hillPts[i][1], mx, my);
  }
  ctx.stroke();

  // ── Ground: flat grass fill ──
  ctx.fillStyle = "#5AB347";
  ctx.fillRect(0, horizonY + 2, BOARD_W, BOARD_H);

  // ── Flat hand-drawn cartoon trees in background (behind grid) ──
  function drawFlatTree(tx, ty, trunk_h, canopy_r, fillC, outlineC) {
    // trunk
    ctx.fillStyle = "#7A4F2A";
    ctx.fillRect(tx - 4, ty - trunk_h, 8, trunk_h);
    ctx.strokeStyle = "#4A2E10";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(tx - 4, ty - trunk_h, 8, trunk_h);
    // canopy
    ctx.fillStyle = fillC;
    ctx.beginPath();
    ctx.arc(tx, ty - trunk_h, canopy_r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = outlineC;
    ctx.lineWidth = 2;
    ctx.stroke();
    // highlight dot
    ctx.fillStyle = "rgba(255,255,255,0.25)";
    ctx.beginPath();
    ctx.arc(tx - canopy_r * 0.3, ty - trunk_h - canopy_r * 0.3, canopy_r * 0.3, 0, Math.PI * 2);
    ctx.fill();
  }
  // scattered background trees along horizon
  const bgTrees = [
    { x: BOARD_W * 0.03, y: horizonY + 8 },
    { x: BOARD_W * 0.09, y: horizonY + 4 },
    { x: BOARD_W * 0.17, y: horizonY + 10 },
    { x: BOARD_W * 0.30, y: horizonY + 6 },
    { x: BOARD_W * 0.55, y: horizonY + 8 },
    { x: BOARD_W * 0.72, y: horizonY + 5 },
    { x: BOARD_W * 0.84, y: horizonY + 9 },
    { x: BOARD_W * 0.95, y: horizonY + 7 },
  ];
  bgTrees.forEach((t, i) => {
    const big = i % 3 === 0;
    drawFlatTree(t.x, t.y, big ? 22 : 16, big ? 18 : 13, "#4CAF50", "#2E7D32");
  });

  // ── Flat flowers scattered on ground ──
  const flowers = [
    { x: BOARD_W * 0.07, y: horizonY + 22 }, { x: BOARD_W * 0.19, y: horizonY + 30 },
    { x: BOARD_W * 0.34, y: horizonY + 18 }, { x: BOARD_W * 0.48, y: horizonY + 28 },
    { x: BOARD_W * 0.61, y: horizonY + 20 }, { x: BOARD_W * 0.77, y: horizonY + 26 },
    { x: BOARD_W * 0.91, y: horizonY + 22 },
  ];
  const flowerColors = ["#FF6B9D", "#FFD700", "#FF8C42", "#C084FC", "#FF6B6B"];
  flowers.forEach((f, i) => {
    const fc = flowerColors[i % flowerColors.length];
    // stem
    ctx.strokeStyle = "#3D8C2A";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(f.x, f.y);
    ctx.lineTo(f.x, f.y - 10);
    ctx.stroke();
    // petals
    ctx.fillStyle = fc;
    for (let p = 0; p < 5; p++) {
      const pa = (p / 5) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(f.x + Math.cos(pa) * 4, f.y - 10 + Math.sin(pa) * 4, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    // center
    ctx.fillStyle = "#FFD700";
    ctx.beginPath();
    ctx.arc(f.x, f.y - 10, 2.5, 0, Math.PI * 2);
    ctx.fill();
  });
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
  const isMeadow = wave >= 1 && wave <= 5;

  if (isMeadow) {
    drawMeadow2D(ctx);
  } else {
    // Non-meadow flat background
    ctx.fillStyle = theme.bg;
    ctx.fillRect(0, 0, BOARD_W, BOARD_H);
  }

  // Ground tiles (checkerboard tint over the base)
  for (let x = 0; x < GRID_COLS; x++) {
    for (let y = 0; y < GRID_ROWS; y++) {
      const isPath = PATH_SET.has(`${x},${y}`);
      if (!isPath) {
        if (isMeadow) {
          // no fill — background gradient shows through cleanly
        } else {
          ctx.fillStyle = ((x + y) % 2 === 0) ? theme.grassA : theme.grassB;
          ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
      }
    }
  }

  // Path
  PATH.forEach(([x, y], i) => {
    if (isMeadow) {
      // Flat 2D dirt path
      ctx.fillStyle = "#C8964A";
      ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    } else {
      ctx.fillStyle = i % 2 === 0 ? theme.pathA : theme.pathB;
      ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
    ctx.strokeStyle = isMeadow ? "#7A4F2A" : theme.pathBorder;
    ctx.lineWidth = 1;
    ctx.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  });

  // Grid lines
  ctx.strokeStyle = isMeadow ? "rgba(61,140,42,0.18)" : theme.gridLine;
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

  // Meadow decorations (trees, rocks, bushes) on non-path, non-tower cells
  if (isMeadow) {
    for (let x = 0; x < GRID_COLS; x++) {
      for (let y = 0; y < GRID_ROWS; y++) {
        const key = `${x},${y}`;
        const deco = CELL_DECO[key];
        if (deco) drawCellDeco(ctx, x, y, deco);
      }
    }
  }

  // Castle at end
  const [ex, ey] = PATH[PATH.length - 1];
  ctx.font = `${CELL_SIZE * 0.7}px serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("🏰", (ex + 0.5) * CELL_SIZE, (ey + 0.5) * CELL_SIZE);
}

function drawTowers(ctx, towers, selectedTowerId) {
  towers.forEach(tower => {
    const { x, y, emoji, level } = tower;

    // Base circle
    ctx.fillStyle = "rgba(40, 30, 20, 0.8)";
    ctx.beginPath();
    ctx.arc(x, y, CELL_SIZE * 0.38, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = tower.id === selectedTowerId ? "#dc2626" : "rgba(100, 60, 60, 0.5)";
    ctx.lineWidth = tower.id === selectedTowerId ? 2 : 1;
    ctx.beginPath();
    ctx.arc(x, y, CELL_SIZE * 0.38, 0, Math.PI * 2);
    ctx.stroke();

    // Tower emoji
    ctx.font = `${CELL_SIZE * 0.5}px serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(emoji, x, y);

    // Level indicator
    if (level > 1) {
      ctx.fillStyle = "#fbbf24";
      ctx.font = "bold 9px sans-serif";
      ctx.fillText("★".repeat(Math.min(level - 1, 4)), x, y + CELL_SIZE * 0.35);
    }

    // Range circle if selected
    if (tower.id === selectedTowerId) {
      ctx.save();
      ctx.strokeStyle = "rgba(220, 38, 38, 0.25)";
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

    // Enemy emoji — scale pulse on boss
    const isBoss = enemy.type?.startsWith("boss_");
    const scale = isBoss ? 1 + Math.sin(now * 0.004 + phase) * 0.07 : 1;
    const fontSize = CELL_SIZE * 0.45 * scale;
    ctx.font = `${fontSize}px serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(emoji, 0, 0);

    // Modifier badge
    if (modEmoji) {
      ctx.font = `${CELL_SIZE * 0.28}px serif`;
      ctx.fillText(modEmoji, CELL_SIZE * 0.22, -CELL_SIZE * 0.22);
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

function drawProjectiles(ctx, projectiles) {
  projectiles.forEach(proj => {
    const color = proj.towerType === "mage" ? "#a855f7"
      : proj.towerType === "frost" ? "#60a5fa"
      : proj.towerType === "cannon" ? "#f97316"
      : "#fbbf24";

    ctx.save();
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.arc(proj.x, proj.y, proj.towerType === "cannon" ? 4 : 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
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
  towerMap, onCellClick, selectedTowerId, wave
}) {
  const canvasRef = useRef(null);
  const hoverRef = useRef(null);
  const animFrameRef = useRef(null);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

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
    drawProjectiles(ctx, projectiles);
    drawHoverPreview(ctx, hoverRef.current, selectedTowerType);

    animFrameRef.current = requestAnimationFrame(render);
  }, [towers, enemies, projectiles, selectedTowerType, selectedTowerId, wave]);

  useEffect(() => {
    animFrameRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [render]);

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = BOARD_W / rect.width;
    const scaleY = BOARD_H / rect.height;
    const mx = (e.clientX - rect.left) * scaleX;
    const my = (e.clientY - rect.top) * scaleY;
    const gx = Math.floor(mx / CELL_SIZE);
    const gy = Math.floor(my / CELL_SIZE);

    if (gx >= 0 && gx < GRID_COLS && gy >= 0 && gy < GRID_ROWS) {
      const isPath = PATH_SET.has(`${gx},${gy}`);
      const hasTower = towerMap.has(`${gx},${gy}`);
      hoverRef.current = { gx, gy, valid: !isPath && !hasTower };
    } else {
      hoverRef.current = null;
    }
  };

  const handleClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = BOARD_W / rect.width;
    const scaleY = BOARD_H / rect.height;
    const mx = (e.clientX - rect.left) * scaleX;
    const my = (e.clientY - rect.top) * scaleY;
    const gx = Math.floor(mx / CELL_SIZE);
    const gy = Math.floor(my / CELL_SIZE);

    if (gx >= 0 && gx < GRID_COLS && gy >= 0 && gy < GRID_ROWS) {
      onCellClick(gx, gy);
    }
  };

  const handleMouseLeave = () => {
    hoverRef.current = null;
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
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        onMouseLeave={handleMouseLeave}
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