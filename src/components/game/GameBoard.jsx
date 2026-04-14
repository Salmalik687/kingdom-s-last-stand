import { useRef, useEffect, useCallback } from "react";
import {
  CELL_SIZE, GRID_COLS, GRID_ROWS, PATH, PATH_SET, TOWER_TYPES, getStageTheme
} from "../../lib/gameEngine";

const BOARD_W = GRID_COLS * CELL_SIZE;
const BOARD_H = GRID_ROWS * CELL_SIZE;

function drawGrid(ctx, theme) {
  // Background
  ctx.fillStyle = theme.bg;
  ctx.fillRect(0, 0, BOARD_W, BOARD_H);

  // Ground tiles
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
    const { x, y, hp, maxHp, emoji } = enemy;

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

    // HP bar
    const barW = CELL_SIZE * 0.6;
    const barH = 3;
    const barX = x - barW / 2;
    const barY = y - CELL_SIZE * 0.35;
    const hpPercent = hp / maxHp;

    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(barX - 1, barY - 1, barW + 2, barH + 2);
    ctx.fillStyle = hpPercent > 0.5 ? "#22c55e" : hpPercent > 0.25 ? "#eab308" : "#ef4444";
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
    drawGrid(ctx, theme);
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