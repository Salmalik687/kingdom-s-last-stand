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
  // Sky gradient
  const sky = ctx.createLinearGradient(0, 0, 0, BOARD_H * 0.45);
  sky.addColorStop(0, "#3a7bd5");
  sky.addColorStop(0.5, "#a8c8f0");
  sky.addColorStop(1, "#d4e9c7");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, BOARD_W, BOARD_H * 0.45);

  // Sun
  ctx.save();
  ctx.shadowColor = "rgba(255,230,100,0.6)";
  ctx.shadowBlur = 28;
  ctx.fillStyle = "#ffe066";
  ctx.beginPath();
  ctx.arc(BOARD_W * 0.82, BOARD_H * 0.1, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Clouds
  CLOUDS.forEach(c => {
    ctx.save();
    ctx.globalAlpha = 0.82;
    ctx.fillStyle = "#ffffff";
    [0, -c.r * 0.5, c.r * 0.5, -c.r * 0.8, c.r * 0.8].forEach((ox, i) => {
      const oy = i === 0 ? -c.r * 0.25 : 0;
      ctx.beginPath();
      ctx.arc(c.x + ox, c.y + oy, c.r * (i === 0 ? 0.7 : 0.5), 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
  });

  // Distant mountains (silhouette)
  ctx.save();
  ctx.globalAlpha = 0.45;
  MOUNTAIN_PEAKS.forEach(m => {
    const grad = ctx.createLinearGradient(m.x, BOARD_H * 0.42 - m.h, m.x, BOARD_H * 0.42);
    grad.addColorStop(0, "#7aa0c0");
    grad.addColorStop(1, "#5a8060");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(m.x - m.h * 0.7, BOARD_H * 0.42);
    ctx.lineTo(m.x, BOARD_H * 0.42 - m.h);
    ctx.lineTo(m.x + m.h * 0.7, BOARD_H * 0.42);
    ctx.closePath();
    ctx.fill();
    // Snow cap
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.beginPath();
    ctx.moveTo(m.x - m.h * 0.12, BOARD_H * 0.42 - m.h * 0.75);
    ctx.lineTo(m.x, BOARD_H * 0.42 - m.h);
    ctx.lineTo(m.x + m.h * 0.12, BOARD_H * 0.42 - m.h * 0.75);
    ctx.closePath();
    ctx.fill();
  });
  ctx.restore();
}

function drawMeadowGround(ctx, theme) {
  // Rich rolling ground gradient over the bottom portion
  const ground = ctx.createLinearGradient(0, BOARD_H * 0.35, 0, BOARD_H);
  ground.addColorStop(0, "#3d7a3d");
  ground.addColorStop(0.4, "#2e5e2e");
  ground.addColorStop(1, "#1e3e1e");
  ctx.fillStyle = ground;
  ctx.fillRect(0, BOARD_H * 0.35, BOARD_W, BOARD_H * 0.65);
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
    // Sky layer
    drawMeadowSky(ctx);
    // Ground layer
    drawMeadowGround(ctx, theme);
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
          // Subtle checker overlay on top of meadow ground
          ctx.globalAlpha = (x + y) % 2 === 0 ? 0.10 : 0.04;
          ctx.fillStyle = "#a8d878";
          ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
          ctx.globalAlpha = 1;
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