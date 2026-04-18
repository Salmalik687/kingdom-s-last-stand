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

function drawMeadowSky(ctx) {
  // Deep sky gradient - top blue to horizon haze
  const sky = ctx.createLinearGradient(0, 0, 0, BOARD_H);
  sky.addColorStop(0,    "#1a6fb5");
  sky.addColorStop(0.22, "#3a9ad9");
  sky.addColorStop(0.5,  "#7ec8f0");
  sky.addColorStop(0.72, "#b8dfa8");
  sky.addColorStop(1,    "#4a8a3a");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, BOARD_W, BOARD_H);

  // Sun glow halo
  ctx.save();
  const sunX = BOARD_W * 0.80, sunY = BOARD_H * 0.09;
  const halo = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, 55);
  halo.addColorStop(0, "rgba(255,240,120,0.55)");
  halo.addColorStop(1, "rgba(255,240,120,0)");
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(sunX, sunY, 55, 0, Math.PI * 2);
  ctx.fill();
  // Sun disc
  ctx.shadowColor = "rgba(255,220,80,0.9)";
  ctx.shadowBlur = 20;
  ctx.fillStyle = "#ffe855";
  ctx.beginPath();
  ctx.arc(sunX, sunY, 16, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Clouds - fluffy multi-circle style
  CLOUDS.forEach(c => {
    ctx.save();
    ctx.shadowColor = "rgba(180,210,255,0.3)";
    ctx.shadowBlur = 10;
    ctx.fillStyle = "rgba(255,255,255,0.92)";
    const puffs = [
      { ox: 0,           oy: -c.r * 0.18, r: c.r * 0.65 },
      { ox: -c.r * 0.55, oy: 0,           r: c.r * 0.48 },
      { ox:  c.r * 0.55, oy: 0,           r: c.r * 0.48 },
      { ox: -c.r * 0.28, oy: c.r * 0.08,  r: c.r * 0.55 },
      { ox:  c.r * 0.28, oy: c.r * 0.08,  r: c.r * 0.55 },
    ];
    puffs.forEach(p => {
      ctx.beginPath();
      ctx.arc(c.x + p.ox, c.y + p.oy, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    // Bottom flat base
    ctx.fillStyle = "rgba(210,235,255,0.6)";
    ctx.fillRect(c.x - c.r * 0.9, c.y + c.r * 0.05, c.r * 1.8, c.r * 0.28);
    ctx.restore();
  });

  // Distant layered mountains
  ctx.save();
  // Far layer - cool blue-grey
  ctx.globalAlpha = 0.38;
  MOUNTAIN_PEAKS.forEach((m, i) => {
    const grad = ctx.createLinearGradient(m.x, BOARD_H * 0.48 - m.h * 1.1, m.x, BOARD_H * 0.48);
    grad.addColorStop(0, "#8ab0cc");
    grad.addColorStop(1, "#6a9070");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(m.x - m.h * 0.85, BOARD_H * 0.48);
    ctx.lineTo(m.x - m.h * 0.08, BOARD_H * 0.48 - m.h * 1.1);
    ctx.lineTo(m.x + m.h * 0.85, BOARD_H * 0.48);
    ctx.closePath();
    ctx.fill();
    // Snow cap
    ctx.globalAlpha = 0.55;
    ctx.fillStyle = "#e8f4ff";
    ctx.beginPath();
    ctx.moveTo(m.x - m.h * 0.14, BOARD_H * 0.48 - m.h * 0.82);
    ctx.lineTo(m.x - m.h * 0.08, BOARD_H * 0.48 - m.h * 1.1);
    ctx.lineTo(m.x + m.h * 0.14, BOARD_H * 0.48 - m.h * 0.82);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 0.38;
  });
  ctx.restore();

  // Near rolling hills (horizon line - smooth bezier bumps)
  ctx.save();
  const hillY = BOARD_H * 0.52;
  const hillGrad = ctx.createLinearGradient(0, hillY - 40, 0, hillY + 30);
  hillGrad.addColorStop(0, "#5aaa48");
  hillGrad.addColorStop(1, "#3d7a30");
  ctx.fillStyle = hillGrad;
  ctx.beginPath();
  ctx.moveTo(0, BOARD_H);
  ctx.lineTo(0, hillY + 15);
  // Smooth hill bumps across the width
  const hillBumps = [
    [0, hillY + 15], [BOARD_W * 0.1, hillY - 18], [BOARD_W * 0.2, hillY + 8],
    [BOARD_W * 0.33, hillY - 28], [BOARD_W * 0.46, hillY + 5],
    [BOARD_W * 0.58, hillY - 22], [BOARD_W * 0.7, hillY + 10],
    [BOARD_W * 0.82, hillY - 20], [BOARD_W * 0.92, hillY + 6], [BOARD_W, hillY + 12],
  ];
  ctx.moveTo(0, hillY + 15);
  for (let i = 0; i < hillBumps.length - 1; i++) {
    const [x0, y0] = hillBumps[i];
    const [x1, y1] = hillBumps[i + 1];
    const mx = (x0 + x1) / 2;
    ctx.quadraticCurveTo(x0, y0, mx, (y0 + y1) / 2);
  }
  ctx.lineTo(BOARD_W, BOARD_H);
  ctx.closePath();
  ctx.fill();

  // Grass highlight strip along horizon
  ctx.fillStyle = "rgba(120,200,80,0.22)";
  ctx.beginPath();
  ctx.moveTo(0, hillY + 15);
  for (let i = 0; i < hillBumps.length - 1; i++) {
    const [x0, y0] = hillBumps[i];
    const [x1, y1] = hillBumps[i + 1];
    const mx = (x0 + x1) / 2;
    ctx.quadraticCurveTo(x0, y0, mx, (y0 + y1) / 2);
  }
  ctx.lineTo(BOARD_W, hillY + 20);
  ctx.lineTo(0, hillY + 20);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawMeadowGround(ctx) {
  // Rich grass ground fill below the hill line
  const ground = ctx.createLinearGradient(0, BOARD_H * 0.5, 0, BOARD_H);
  ground.addColorStop(0,   "#4a9438");
  ground.addColorStop(0.3, "#3a7a2a");
  ground.addColorStop(1,   "#254d1a");
  ctx.fillStyle = ground;
  ctx.fillRect(0, BOARD_H * 0.5, BOARD_W, BOARD_H * 0.5);
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
    drawMeadowSky(ctx);
    drawMeadowGround(ctx);
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
      // Earthy dirt path with texture
      ctx.fillStyle = i % 2 === 0 ? "#8b6340" : "#7a5530";
      ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      // Subtle gravel dots
      ctx.fillStyle = "rgba(60,35,10,0.25)";
      ctx.fillRect(x * CELL_SIZE + 4, y * CELL_SIZE + 4, 3, 3);
      ctx.fillRect(x * CELL_SIZE + CELL_SIZE - 8, y * CELL_SIZE + CELL_SIZE - 8, 3, 3);
    } else {
      ctx.fillStyle = i % 2 === 0 ? theme.pathA : theme.pathB;
      ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
    ctx.strokeStyle = isMeadow ? "rgba(60,35,10,0.35)" : theme.pathBorder;
    ctx.lineWidth = 1;
    ctx.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  });

  // Grid lines
  ctx.strokeStyle = isMeadow ? "rgba(0,80,0,0.08)" : theme.gridLine;
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
      ctx.strokeStyle = "rgba(220, 38, 38, 0.25)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(x, y, tower.range, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  });
}

function drawEnemies(ctx, enemies) {
  enemies.forEach(enemy => {
    const { x, y, hp, maxHp, emoji, modEmoji, modColor } = enemy;

    // Modifier glow ring
    if (modColor) {
      ctx.save();
      ctx.strokeStyle = modColor;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.arc(x, y, CELL_SIZE * 0.34, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    // Shadow
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.beginPath();
    ctx.ellipse(x, y + CELL_SIZE * 0.3, 8, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Enemy emoji
    ctx.font = `${CELL_SIZE * 0.45}px serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(emoji, x, y);

    // Modifier badge (top-right corner)
    if (modEmoji) {
      ctx.font = `${CELL_SIZE * 0.28}px serif`;
      ctx.fillText(modEmoji, x + CELL_SIZE * 0.22, y - CELL_SIZE * 0.22);
    }

    // HP bar
    const barW = CELL_SIZE * 0.7;
    const barH = 3;
    const barX = x - barW / 2;
    const barY = y - CELL_SIZE * 0.4;
    const hpPercent = hp / maxHp;

    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(barX - 1, barY - 1, barW + 2, barH + 2);
    // Modifier affects HP bar colour
    ctx.fillStyle = modColor && hpPercent > 0.25
      ? modColor
      : hpPercent > 0.5 ? "#22c55e" : hpPercent > 0.25 ? "#eab308" : "#ef4444";
    ctx.fillRect(barX, barY, barW * hpPercent, barH);
  });
}

function drawProjectiles(ctx, projectiles) {
  projectiles.forEach(proj => {
    ctx.fillStyle = proj.towerType === "mage" ? "#a855f7"
      : proj.towerType === "frost" ? "#60a5fa"
      : proj.towerType === "cannon" ? "#f97316"
      : "#fbbf24";
    ctx.beginPath();
    ctx.arc(proj.x, proj.y, proj.towerType === "cannon" ? 4 : 3, 0, Math.PI * 2);
    ctx.fill();

    // Glow
    ctx.shadowColor = ctx.fillStyle;
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.arc(proj.x, proj.y, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  });
}

function drawHoverPreview(ctx, hoverCell, selectedTowerType) {
  if (!hoverCell || !selectedTowerType) return;
  const { gx, gy, valid } = hoverCell;
  const cx = gx * CELL_SIZE + CELL_SIZE / 2;
  const cy = gy * CELL_SIZE + CELL_SIZE / 2;
  const base = TOWER_TYPES[selectedTowerType];

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
  ctx.globalAlpha = 1;
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
    ctx.clearRect(0, 0, BOARD_W, BOARD_H);

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