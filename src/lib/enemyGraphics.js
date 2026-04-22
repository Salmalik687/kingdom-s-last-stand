/**
 * enemyGraphics.js
 * All draw functions render centered at (0,0).
 * Every function wraps everything in ctx.save() / ctx.restore().
 * Uses ONLY safe canvas APIs (no roundRect).
 */

const S = 14; // base size unit

// ── Helpers ───────────────────────────────────────────────────────────────────

function radialGrad(ctx, r, light, dark) {
  const g = ctx.createRadialGradient(-r * 0.3, -r * 0.35, r * 0.05, 0, 0, r);
  g.addColorStop(0, light);
  g.addColorStop(1, dark);
  return g;
}

function circle(ctx, x, y, r, color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function glowCircle(ctx, x, y, r, color) {
  ctx.save();
  ctx.shadowColor = color;
  ctx.shadowBlur = 10;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function eyes(ctx, color, size = S * 0.13) {
  // Two glowing eyes centered relative to face
  glowCircle(ctx, -S * 0.22, -S * 0.08, size, color);
  glowCircle(ctx,  S * 0.22, -S * 0.08, size, color);
}

function body(ctx, r, topColor, bottomColor) {
  const g = ctx.createRadialGradient(-r * 0.25, -r * 0.3, r * 0.05, 0, 0, r);
  g.addColorStop(0, topColor);
  g.addColorStop(1, bottomColor);
  ctx.save();
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function horn(ctx, dx, angle, color) {
  ctx.save();
  ctx.translate(dx, -S * 0.45);
  ctx.rotate(angle);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(-S * 0.12, -S * 0.55);
  ctx.lineTo(S * 0.12, -S * 0.15);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

// ── LAND 1 : Verdant Meadow ───────────────────────────────────────────────────

export function drawPeasant(ctx) {
  ctx.save();
  // Body — dirty green tunic
  body(ctx, S * 0.72, '#6a9c3a', '#2d4a10');
  // Head
  ctx.save();
  ctx.translate(0, -S * 0.65);
  body(ctx, S * 0.46, '#c8a46e', '#8a6030');
  // angry brows
  ctx.strokeStyle = '#3a1a00'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(-S*0.35, -S*0.18); ctx.lineTo(-S*0.1, -S*0.08); ctx.stroke();
  ctx.beginPath(); ctx.moveTo( S*0.35, -S*0.18); ctx.lineTo( S*0.1, -S*0.08); ctx.stroke();
  eyes(ctx, '#ff4400');
  // jagged mouth
  ctx.strokeStyle = '#3a1a00'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(-S*0.22, S*0.18); ctx.lineTo(-S*0.1, S*0.28); ctx.lineTo(S*0.05, S*0.14); ctx.lineTo(S*0.22, S*0.28); ctx.stroke();
  ctx.restore();
  // pitchfork
  ctx.save();
  ctx.translate(S * 0.85, S * 0.05);
  ctx.strokeStyle = '#5a3010'; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(0, -S * 1.1); ctx.lineTo(0, S * 0.5); ctx.stroke();
  ctx.strokeStyle = '#a0a0a0'; ctx.lineWidth = 1.5;
  [-S*0.14, 0, S*0.14].forEach(x => {
    ctx.beginPath(); ctx.moveTo(x, -S*1.1); ctx.lineTo(x, -S*0.65); ctx.stroke();
  });
  ctx.restore();
  ctx.restore();
}

export function drawSoldier(ctx) {
  ctx.save();
  // Armored torso
  body(ctx, S * 0.78, '#607840', '#2a3a10');
  // chainmail lines
  ctx.strokeStyle = 'rgba(0,0,0,0.3)'; ctx.lineWidth = 1;
  for (let i = -2; i <= 2; i++) {
    ctx.beginPath(); ctx.moveTo(-S*0.6, i*S*0.28); ctx.lineTo(S*0.6, i*S*0.28); ctx.stroke();
  }
  // Head with helmet
  ctx.save();
  ctx.translate(0, -S * 0.72);
  body(ctx, S * 0.5, '#c8a46e', '#8a6030');
  // helmet top
  ctx.fillStyle = '#708050';
  ctx.beginPath();
  ctx.arc(0, -S*0.15, S*0.52, Math.PI, 0);
  ctx.fill();
  ctx.fillRect(-S*0.52, -S*0.15, S*1.04, S*0.22);
  // nose guard
  ctx.fillStyle = '#506030';
  ctx.fillRect(-S*0.07, -S*0.12, S*0.14, S*0.3);
  // menacing eyes
  ctx.strokeStyle = '#3a2a00'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(-S*0.38, -S*0.22); ctx.lineTo(-S*0.12, -S*0.1); ctx.stroke();
  ctx.beginPath(); ctx.moveTo( S*0.38, -S*0.22); ctx.lineTo( S*0.12, -S*0.1); ctx.stroke();
  eyes(ctx, '#ff6600', S*0.11);
  ctx.restore();
  ctx.restore();
}

export function drawKnight(ctx) {
  ctx.save();
  // Heavy plate body
  body(ctx, S * 0.88, '#7a8c9a', '#2a3a44');
  // plate shine
  ctx.save();
  ctx.fillStyle = 'rgba(200,220,240,0.18)';
  ctx.beginPath(); ctx.arc(-S*0.2, -S*0.3, S*0.35, 0, Math.PI*2); ctx.fill();
  ctx.restore();
  // Shield
  ctx.save();
  ctx.translate(-S * 1.0, S * 0.05);
  ctx.fillStyle = '#8B1a00';
  ctx.beginPath();
  ctx.moveTo(-S*0.32, -S*0.5);
  ctx.lineTo( S*0.32, -S*0.5);
  ctx.lineTo( S*0.32,  S*0.18);
  ctx.lineTo(0, S*0.52);
  ctx.lineTo(-S*0.32, S*0.18);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#ffd60a'; ctx.lineWidth = 1.5; ctx.stroke();
  // cross on shield
  ctx.strokeStyle = '#ffd60a'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(0,-S*0.35); ctx.lineTo(0, S*0.25); ctx.moveTo(-S*0.2,-S*0.05); ctx.lineTo(S*0.2,-S*0.05); ctx.stroke();
  ctx.restore();
  // Head with great helm
  ctx.save();
  ctx.translate(0, -S * 0.82);
  body(ctx, S * 0.56, '#708090', '#2a3a44');
  ctx.fillStyle = '#556070';
  ctx.beginPath(); ctx.arc(0, -S*0.1, S*0.58, Math.PI, 0); ctx.fill();
  ctx.fillRect(-S*0.58, -S*0.1, S*1.16, S*0.28);
  // red visor slit
  ctx.shadowColor = '#ff2200'; ctx.shadowBlur = 8;
  ctx.fillStyle = '#ff2200';
  ctx.fillRect(-S*0.38, -S*0.08, S*0.76, S*0.1);
  ctx.shadowBlur = 0;
  ctx.restore();
  ctx.restore();
}

export function drawHorseman(ctx) {
  ctx.save();
  // Horse body
  ctx.save();
  ctx.translate(0, S * 0.45);
  body(ctx, S * 1.1, '#c09060', '#6a4820');
  // legs
  ctx.fillStyle = '#a07840';
  [[-S*0.62, S*0.7],[S*0.62, S*0.7],[-S*0.28, S*0.78],[S*0.28, S*0.78]].forEach(([x,y]) => {
    ctx.fillRect(x - S*0.11, y, S*0.22, S*0.5);
  });
  // hooves
  ctx.fillStyle = '#1a0a00';
  [[-S*0.62, S*1.2],[S*0.62, S*1.2],[-S*0.28, S*1.28],[S*0.28, S*1.28]].forEach(([x,y]) => {
    ctx.beginPath(); ctx.ellipse(x, y, S*0.14, S*0.1, 0, 0, Math.PI*2); ctx.fill();
  });
  ctx.restore();
  // Rider
  ctx.save();
  ctx.translate(S * 0.18, -S * 0.15);
  body(ctx, S * 0.55, '#607840', '#2a3a10');
  ctx.translate(0, -S * 0.5);
  body(ctx, S * 0.42, '#c8a46e', '#8a6030');
  // fierce eyes
  eyes(ctx, '#ff4400', S*0.11);
  ctx.restore();
  ctx.restore();
}

// ── LAND 2 : Dark Dungeon ─────────────────────────────────────────────────────

export function drawSkeleton(ctx) {
  ctx.save();
  // Rib cage body
  body(ctx, S * 0.72, '#e0d4c0', '#8a7a60');
  ctx.strokeStyle = '#6a5a40'; ctx.lineWidth = 1;
  for (let i = -2; i <= 2; i++) {
    ctx.beginPath(); ctx.arc(0, i*S*0.2, S*0.42, -Math.PI*0.7, Math.PI*0.7); ctx.stroke();
  }
  // Skull head
  ctx.save();
  ctx.translate(0, -S * 0.65);
  body(ctx, S * 0.52, '#f0e8d8', '#b0a080');
  // hollow eyes
  ctx.fillStyle = '#0a0a0a';
  ctx.beginPath(); ctx.ellipse(-S*0.2, -S*0.08, S*0.16, S*0.12, 0, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse( S*0.2, -S*0.08, S*0.16, S*0.12, 0, 0, Math.PI*2); ctx.fill();
  // inner purple glow
  glowCircle(ctx, -S*0.2, -S*0.08, S*0.07, '#a855f7');
  glowCircle(ctx,  S*0.2, -S*0.08, S*0.07, '#a855f7');
  // teeth
  ctx.fillStyle = '#f0f0e0';
  [-S*0.2, -S*0.06, S*0.08, S*0.22].forEach(x => {
    ctx.fillRect(x, S*0.2, S*0.1, S*0.18);
  });
  ctx.restore();
  ctx.restore();
}

export function drawWraith(ctx) {
  ctx.save();
  // Ghostly aura
  const g = ctx.createRadialGradient(0, 0, 0, 0, 0, S * 1.1);
  g.addColorStop(0, 'rgba(192,132,252,0.9)');
  g.addColorStop(0.5, 'rgba(109,40,217,0.55)');
  g.addColorStop(1, 'rgba(76,29,149,0)');
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(0, S*0.1, S*1.1, 0, Math.PI*2); ctx.fill();
  // wispy tail
  ctx.fillStyle = 'rgba(124,58,237,0.35)';
  ctx.beginPath();
  ctx.moveTo(-S*0.75, S*0.55);
  ctx.quadraticCurveTo(-S*0.95, S*1.4, -S*0.4, S*1.7);
  ctx.quadraticCurveTo(0, S*1.1, S*0.4, S*1.7);
  ctx.quadraticCurveTo(S*0.95, S*1.4, S*0.75, S*0.55);
  ctx.closePath(); ctx.fill();
  // Skull face
  body(ctx, S*0.48, '#e0d8ff', '#9060d0');
  // dark eye sockets
  ctx.fillStyle = '#0a0010';
  ctx.beginPath(); ctx.ellipse(-S*0.18, -S*0.08, S*0.15, S*0.11, 0, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse( S*0.18, -S*0.08, S*0.15, S*0.11, 0, 0, Math.PI*2); ctx.fill();
  glowCircle(ctx, -S*0.18, -S*0.08, S*0.06, '#c084fc');
  glowCircle(ctx,  S*0.18, -S*0.08, S*0.06, '#c084fc');
  ctx.restore();
}

export function drawNecromancer(ctx) {
  ctx.save();
  // Robe
  ctx.fillStyle = '#2d1b4e';
  ctx.beginPath();
  ctx.moveTo(-S*0.75, S*0.9);
  ctx.lineTo( S*0.75, S*0.9);
  ctx.lineTo( S*0.52, -S*0.5);
  ctx.lineTo(-S*0.52, -S*0.5);
  ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#7c3aed'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(-S*0.75,S*0.9); ctx.lineTo(-S*0.52,-S*0.5); ctx.stroke();
  ctx.beginPath(); ctx.moveTo( S*0.75,S*0.9); ctx.lineTo( S*0.52,-S*0.5); ctx.stroke();
  // Hood + head
  ctx.save();
  ctx.translate(0, -S * 0.62);
  body(ctx, S*0.5, '#b8a080', '#6a5030');
  // dark hood
  ctx.fillStyle = '#1e0a3e';
  ctx.beginPath();
  ctx.moveTo(-S*0.55, S*0.08);
  ctx.lineTo( S*0.55, S*0.08);
  ctx.lineTo(0, -S*0.92);
  ctx.closePath(); ctx.fill();
  // glowing skull face visible under hood
  eyes(ctx, '#a855f7', S*0.13);
  // jaw
  ctx.strokeStyle = '#c8b890'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(0, S*0.18, S*0.25, 0, Math.PI); ctx.stroke();
  ctx.restore();
  // Staff with orb
  ctx.save();
  ctx.translate(S * 0.88, S*0.1);
  ctx.strokeStyle = '#4a2a00'; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(0, -S*1.5); ctx.lineTo(0, S*0.5); ctx.stroke();
  const og = ctx.createRadialGradient(0,-S*1.5,0,0,-S*1.5,S*0.38);
  og.addColorStop(0,'#fff'); og.addColorStop(0.3,'#a855f7'); og.addColorStop(1,'rgba(168,85,247,0)');
  ctx.fillStyle = og; ctx.shadowColor = '#a855f7'; ctx.shadowBlur = 14;
  ctx.beginPath(); ctx.arc(0,-S*1.5,S*0.38,0,Math.PI*2); ctx.fill();
  ctx.shadowBlur = 0;
  ctx.restore();
  ctx.restore();
}

export function drawKing(ctx) {
  ctx.save();
  // Regal undead robe
  body(ctx, S * 0.82, '#4a1878', '#1a0830');
  ctx.strokeStyle = '#ffd60a'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(0,0,S*0.82,0,Math.PI*2); ctx.stroke();
  // Head
  ctx.save();
  ctx.translate(0, -S * 0.78);
  body(ctx, S*0.54, '#4a3028', '#1a1008');
  // Crown
  ctx.fillStyle = '#ffd60a';
  ctx.fillRect(-S*0.55, -S*0.52, S*1.1, S*0.24);
  // Crown points
  [[-S*0.38, S*0.32],[0, S*0.42],[S*0.38, S*0.32]].forEach(([ox, oh]) => {
    ctx.beginPath();
    ctx.moveTo(ox - S*0.14, -S*0.52);
    ctx.lineTo(ox, -S*0.52 - oh);
    ctx.lineTo(ox + S*0.14, -S*0.52);
    ctx.closePath(); ctx.fill();
  });
  // Ruby on crown
  ctx.fillStyle = '#ef4444'; ctx.shadowColor='#ef4444'; ctx.shadowBlur=8;
  ctx.beginPath(); ctx.arc(0, -S*0.56, S*0.1, 0, Math.PI*2); ctx.fill();
  ctx.shadowBlur = 0;
  // undead eyes — fiery orange
  eyes(ctx, '#ff6600', S*0.14);
  ctx.restore();
  ctx.restore();
}

// ── LAND 3 : Volcanic Wastes ──────────────────────────────────────────────────

export function drawDemon(ctx) {
  ctx.save();
  // Red muscular body
  body(ctx, S * 0.85, '#cc2020', '#5a0808');
  // muscle highlight
  ctx.fillStyle = 'rgba(255,80,0,0.15)';
  ctx.beginPath(); ctx.ellipse(-S*0.2, 0, S*0.28, S*0.5, -0.3, 0, Math.PI*2); ctx.fill();
  // Horns
  horn(ctx, -S*0.32, -0.5, '#3a0505');
  horn(ctx,  S*0.32,  0.5, '#3a0505');
  // Head
  ctx.save();
  ctx.translate(0, -S * 0.72);
  body(ctx, S*0.54, '#c02020', '#600a0a');
  // thick brows
  ctx.strokeStyle = '#2a0000'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(-S*0.42,-S*0.22); ctx.lineTo(-S*0.08,-S*0.08); ctx.stroke();
  ctx.beginPath(); ctx.moveTo( S*0.42,-S*0.22); ctx.lineTo( S*0.08,-S*0.08); ctx.stroke();
  eyes(ctx, '#ffaa00', S*0.14);
  // fangs
  ctx.fillStyle = '#fff';
  ctx.beginPath(); ctx.moveTo(-S*0.2, S*0.22); ctx.lineTo(-S*0.1, S*0.42); ctx.lineTo(S*0.02, S*0.22); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo( S*0.2, S*0.22); ctx.lineTo( S*0.1, S*0.42); ctx.lineTo(-S*0.02, S*0.22); ctx.closePath(); ctx.fill();
  ctx.restore();
  ctx.restore();
}

export function drawGolem(ctx) {
  ctx.save();
  // Massive grey rock body
  body(ctx, S * 1.05, '#787878', '#2a2a2a');
  // rock crack lines
  ctx.strokeStyle = '#222'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(-S*0.55,-S*0.6); ctx.lineTo(S*0.2,S*0.35); ctx.lineTo(S*0.65,-S*0.2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-S*0.2,S*0.5); ctx.lineTo(S*0.6,S*0.05); ctx.stroke();
  // moss patches
  ctx.fillStyle = '#3a6a2a';
  ctx.beginPath(); ctx.arc(-S*0.4,-S*0.22,S*0.18,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc( S*0.3, S*0.42,S*0.13,0,Math.PI*2); ctx.fill();
  // Head with crack
  ctx.save();
  ctx.translate(0, -S * 0.88);
  body(ctx, S*0.64, '#6b7280', '#303030');
  ctx.strokeStyle = '#1a1a1a'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(-S*0.1,-S*0.45); ctx.lineTo(S*0.08,S*0.2); ctx.lineTo(S*0.25,S*0.42); ctx.stroke();
  eyes(ctx, '#f97316', S*0.18);
  ctx.restore();
  ctx.restore();
}

export function drawLavaSpawn(ctx) {
  ctx.save();
  // Outer lava glow
  const g = ctx.createRadialGradient(-S*0.25, -S*0.25, 0, 0, 0, S*1.05);
  g.addColorStop(0,   '#ffffff');
  g.addColorStop(0.15,'#fff7aa');
  g.addColorStop(0.4, '#ff8c00');
  g.addColorStop(0.75,'#8b1a00');
  g.addColorStop(1,   '#1a0000');
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(0,0,S*1.05,0,Math.PI*2); ctx.fill();
  // lava cracks
  ctx.strokeStyle = '#ffd60a'; ctx.lineWidth = 2; ctx.shadowColor='#ffd60a'; ctx.shadowBlur=8;
  for (let i = 0; i < 5; i++) {
    const a = (i/5)*Math.PI*2;
    ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(Math.cos(a)*S*0.85, Math.sin(a)*S*0.85); ctx.stroke();
  }
  ctx.shadowBlur = 0;
  // bright core
  ctx.fillStyle = '#ffffa0'; ctx.shadowColor='#ffff00'; ctx.shadowBlur=16;
  ctx.beginPath(); ctx.arc(0,0,S*0.22,0,Math.PI*2); ctx.fill();
  ctx.shadowBlur = 0;
  ctx.restore();
}

export function drawFiredrake(ctx) {
  ctx.save();
  // Dragon body
  body(ctx, S*1.0, '#ef4444', '#7f1d1d');
  // Wing left
  ctx.save();
  ctx.translate(-S*0.55, -S*0.15); ctx.rotate(-0.7);
  ctx.fillStyle = 'rgba(127,29,29,0.72)';
  ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(-S*1.55,-S*0.85); ctx.lineTo(-S*1.25,S*0.55); ctx.closePath(); ctx.fill();
  ctx.strokeStyle='#5a0a0a'; ctx.lineWidth=1.5;
  [0.35,0.65,0.95].forEach(t=>{ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(-S*1.55*t,-S*0.85*t); ctx.stroke();});
  ctx.restore();
  // Wing right
  ctx.save();
  ctx.translate(S*0.55, -S*0.15); ctx.rotate(0.7);
  ctx.fillStyle = 'rgba(127,29,29,0.72)';
  ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(S*1.55,-S*0.85); ctx.lineTo(S*1.25,S*0.55); ctx.closePath(); ctx.fill();
  ctx.strokeStyle='#5a0a0a'; ctx.lineWidth=1.5;
  [0.35,0.65,0.95].forEach(t=>{ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(S*1.55*t,-S*0.85*t); ctx.stroke();});
  ctx.restore();
  // Head
  ctx.save();
  ctx.translate(S*0.9, -S*0.28);
  body(ctx, S*0.5, '#dc2626', '#7f1d1d');
  // snout
  ctx.fillStyle = '#b91c1c';
  ctx.beginPath(); ctx.ellipse(S*0.42,S*0.05,S*0.38,S*0.2,0.25,0,Math.PI*2); ctx.fill();
  eyes(ctx, '#ffaa00', S*0.12);
  // fire breath
  ctx.fillStyle='rgba(255,200,0,0.55)'; ctx.shadowColor='#ff8c00'; ctx.shadowBlur=12;
  ctx.beginPath(); ctx.moveTo(S*0.72,-S*0.05); ctx.lineTo(S*1.75,-S*0.2); ctx.lineTo(S*1.7,S*0.12); ctx.lineTo(S*0.72,S*0.08); ctx.closePath(); ctx.fill();
  ctx.shadowBlur=0;
  ctx.restore();
  ctx.restore();
}

// ── LAND 4 : Frozen Abyss ─────────────────────────────────────────────────────

export function drawSpecter(ctx) {
  ctx.save();
  // Ghostly icy aura
  const g = ctx.createRadialGradient(0,0,0,0,0,S*1.05);
  g.addColorStop(0,'rgba(186,230,253,0.92)');
  g.addColorStop(0.55,'rgba(56,189,248,0.5)');
  g.addColorStop(1,'rgba(14,165,233,0)');
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(0,S*0.1,S*1.05,0,Math.PI*2); ctx.fill();
  // wispy tail
  ctx.fillStyle='rgba(125,211,252,0.38)';
  ctx.beginPath();
  ctx.moveTo(-S*0.65, S*0.5);
  ctx.quadraticCurveTo(-S*0.8,S*1.4,-S*0.3,S*1.65);
  ctx.quadraticCurveTo(0,S*1.1,S*0.3,S*1.65);
  ctx.quadraticCurveTo(S*0.8,S*1.4,S*0.65,S*0.5);
  ctx.closePath(); ctx.fill();
  // Face
  body(ctx, S*0.46, '#bae6fd', '#4a9abf');
  ctx.fillStyle='#0c4a6e';
  ctx.beginPath(); ctx.ellipse(-S*0.17,-S*0.07,S*0.14,S*0.1,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse( S*0.17,-S*0.07,S*0.14,S*0.1,0,0,Math.PI*2); ctx.fill();
  glowCircle(ctx,-S*0.17,-S*0.07,S*0.06,'#38bdf8');
  glowCircle(ctx, S*0.17,-S*0.07,S*0.06,'#38bdf8');
  ctx.restore();
}

export function drawFrostGiant(ctx) {
  ctx.save();
  // Huge icy body
  body(ctx, S*1.05, '#1d4ed8', '#0a1e5a');
  // ice plate highlights
  ctx.fillStyle='rgba(147,197,253,0.32)';
  ctx.beginPath(); ctx.ellipse(-S*0.3,-S*0.25,S*0.42,S*0.28,-0.4,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse( S*0.25,S*0.3, S*0.35,S*0.22, 0.3,0,Math.PI*2); ctx.fill();
  // ice spikes from shoulders
  ctx.fillStyle='#93c5fd';
  [[-S*1.05,-S*0.35],[S*1.05,-S*0.35]].forEach(([x,y])=>{
    ctx.save(); ctx.translate(x,y);
    ctx.beginPath(); ctx.moveTo(0,-S*0.6); ctx.lineTo(-S*0.2,S*0.2); ctx.lineTo(S*0.2,S*0.2); ctx.closePath(); ctx.fill(); ctx.restore();
  });
  // Head
  ctx.save();
  ctx.translate(0, -S*0.98);
  body(ctx, S*0.65, '#1d4ed8', '#0a1840');
  // icy brow
  ctx.fillStyle='#93c5fd'; ctx.fillRect(-S*0.58,-S*0.42,S*1.16,S*0.18);
  // icicle beard
  ctx.fillStyle='#bfdbfe';
  [-S*0.4,-S*0.16,S*0.08,S*0.32].forEach(x=>{
    ctx.beginPath();
    ctx.moveTo(x, S*0.32);
    ctx.lineTo(x + S*0.08, S*0.32+S*0.45);
    ctx.lineTo(x + S*0.16, S*0.32);
    ctx.closePath(); ctx.fill();
  });
  eyes(ctx, '#7dd3fc', S*0.16);
  ctx.restore();
  ctx.restore();
}

export function drawIceWalker(ctx) {
  ctx.save();
  body(ctx, S*0.78, '#38bdf8', '#0369a1');
  // crystalline facets
  ctx.strokeStyle='rgba(255,255,255,0.3)'; ctx.lineWidth=1.5;
  ctx.beginPath(); ctx.moveTo(-S*0.55,-S*0.45); ctx.lineTo(S*0.35,S*0.2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(S*0.5,-S*0.35); ctx.lineTo(-S*0.2,S*0.55); ctx.stroke();
  // Head with ice crown spikes
  ctx.save();
  ctx.translate(0, -S*0.72);
  body(ctx, S*0.5, '#7dd3fc', '#0369a1');
  // spikes
  ctx.fillStyle='#e0f2fe';
  [[-S*0.28,-S*0.42,-0.4],[0,-S*0.52,0],[S*0.28,-S*0.42,0.4]].forEach(([x,y,r])=>{
    ctx.save(); ctx.translate(x,y); ctx.rotate(r);
    ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(-S*0.08,-S*0.42); ctx.lineTo(S*0.08,0); ctx.closePath(); ctx.fill(); ctx.restore();
  });
  eyes(ctx, '#38bdf8', S*0.12);
  ctx.restore();
  ctx.restore();
}

export function drawShadow(ctx) {
  ctx.save();
  // Swirling void darkness
  const g = ctx.createRadialGradient(-S*0.3,-S*0.3,0,0,0,S*1.1);
  g.addColorStop(0,'#6d28d9');
  g.addColorStop(0.45,'#1e0a3e');
  g.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=g;
  ctx.beginPath(); ctx.arc(0,0,S*1.1,0,Math.PI*2); ctx.fill();
  // smoky wisps
  ctx.fillStyle='rgba(109,40,217,0.32)';
  for (let i=0;i<4;i++){
    const a=(i/4)*Math.PI*2;
    ctx.beginPath(); ctx.ellipse(Math.cos(a)*S*0.65,Math.sin(a)*S*0.65,S*0.38,S*0.22,a,0,Math.PI*2); ctx.fill();
  }
  // Two large menacing eyes
  glowCircle(ctx,-S*0.26,-S*0.1,S*0.2,'#a855f7');
  glowCircle(ctx, S*0.26,-S*0.1,S*0.2,'#a855f7');
  ctx.fillStyle='#0a000f';
  ctx.beginPath(); ctx.arc(-S*0.26,-S*0.1,S*0.1,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc( S*0.26,-S*0.1,S*0.1,0,Math.PI*2); ctx.fill();
  ctx.restore();
}

// ── LAND 5+ : Shadow Realm & Beyond ──────────────────────────────────────────

export function drawVoidling(ctx) {
  ctx.save();
  // Swirling void orb
  const g = ctx.createRadialGradient(-S*0.2,-S*0.2,0,0,0,S*0.95);
  g.addColorStop(0,'#a855f7');
  g.addColorStop(0.5,'#4c1d95');
  g.addColorStop(1,'#000');
  ctx.fillStyle=g;
  ctx.beginPath(); ctx.arc(0,0,S*0.95,0,Math.PI*2); ctx.fill();
  // orbit ring
  ctx.save();
  ctx.strokeStyle='rgba(192,132,252,0.65)'; ctx.lineWidth=2;
  const t = (performance.now() * 0.001) % Math.PI;
  ctx.beginPath(); ctx.ellipse(0,0,S*1.2,S*0.32,t,0,Math.PI*2); ctx.stroke();
  ctx.restore();
  // single massive eye with slit pupil
  ctx.fillStyle='#ffd60a'; ctx.shadowColor='#ffd60a'; ctx.shadowBlur=16;
  ctx.beginPath(); ctx.ellipse(0,0,S*0.32,S*0.22,0,0,Math.PI*2); ctx.fill();
  ctx.shadowBlur=0;
  ctx.fillStyle='#050010';
  ctx.beginPath(); ctx.ellipse(0,0,S*0.1,S*0.2,0,0,Math.PI*2); ctx.fill();
  ctx.restore();
}

export function drawSoulReaper(ctx) {
  ctx.save();
  // Dark hooded robe
  ctx.fillStyle='#0f0a1a';
  ctx.beginPath();
  ctx.moveTo(-S*0.75, S*0.95);
  ctx.lineTo( S*0.75, S*0.95);
  ctx.lineTo( S*0.55,-S*0.5);
  ctx.lineTo(-S*0.55,-S*0.5);
  ctx.closePath(); ctx.fill();
  ctx.fillStyle='rgba(109,40,217,0.28)';
  ctx.beginPath();
  ctx.moveTo(0, S*0.95);
  ctx.lineTo( S*0.22,-S*0.5);
  ctx.lineTo(-S*0.22,-S*0.5);
  ctx.closePath(); ctx.fill();
  // Skull head
  ctx.save();
  ctx.translate(0, -S*0.6);
  body(ctx, S*0.5, '#ddd8d0', '#8a7a60');
  ctx.fillStyle='#0a001a';
  ctx.beginPath(); ctx.ellipse(-S*0.17,-S*0.07,S*0.14,S*0.1,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse( S*0.17,-S*0.07,S*0.14,S*0.1,0,0,Math.PI*2); ctx.fill();
  glowCircle(ctx,-S*0.17,-S*0.07,S*0.07,'#7c3aed');
  glowCircle(ctx, S*0.17,-S*0.07,S*0.07,'#7c3aed');
  ctx.restore();
  // Scythe
  ctx.save();
  ctx.translate(S*0.9, S*0.1);
  ctx.strokeStyle='#374151'; ctx.lineWidth=2.5;
  ctx.beginPath(); ctx.moveTo(0,-S*1.55); ctx.lineTo(0,S*0.5); ctx.stroke();
  ctx.fillStyle='#7c3aed'; ctx.shadowColor='#7c3aed'; ctx.shadowBlur=14;
  ctx.beginPath();
  ctx.moveTo(0,-S*1.55);
  ctx.quadraticCurveTo(S*0.95,-S*1.3,S*0.62,-S*0.65);
  ctx.lineTo(0,-S*0.95);
  ctx.closePath(); ctx.fill(); ctx.shadowBlur=0;
  ctx.restore();
  ctx.restore();
}

export function drawDoomKnight(ctx) {
  ctx.save();
  // Black cursed plate
  body(ctx, S*0.9, '#1e293b', '#050a12');
  // void rune cracks
  ctx.strokeStyle='#7c3aed'; ctx.lineWidth=1.5; ctx.shadowColor='#7c3aed'; ctx.shadowBlur=8;
  ctx.beginPath(); ctx.moveTo(-S*0.5,-S*0.55); ctx.lineTo(-S*0.12,S*0.4); ctx.stroke();
  ctx.beginPath(); ctx.moveTo( S*0.35,-S*0.45); ctx.lineTo( S*0.1, S*0.55); ctx.stroke();
  ctx.shadowBlur=0;
  // Head — great helm
  ctx.save();
  ctx.translate(0,-S*0.82);
  body(ctx, S*0.58, '#1e293b', '#050a12');
  ctx.fillStyle='#0f172a';
  ctx.beginPath(); ctx.arc(0,-S*0.1,S*0.6,Math.PI,0); ctx.fill();
  ctx.fillRect(-S*0.6,-S*0.1,S*1.2,S*0.28);
  // red visor
  ctx.fillStyle='#ef4444'; ctx.shadowColor='#ef4444'; ctx.shadowBlur=12;
  ctx.fillRect(-S*0.42,-S*0.08,S*0.84,S*0.11);
  ctx.shadowBlur=0;
  // black horns
  ctx.fillStyle='#1e0a00';
  horn(ctx,-S*0.32,-0.4,'#1e0a00');
  horn(ctx, S*0.32, 0.4,'#1e0a00');
  ctx.restore();
  ctx.restore();
}

export function drawAbyssLord(ctx) {
  ctx.save();
  // Massive void core
  const g = ctx.createRadialGradient(-S*0.35,-S*0.35,0,0,0,S*1.25);
  g.addColorStop(0,'#7c3aed');
  g.addColorStop(0.4,'#2e1065');
  g.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=g;
  ctx.beginPath(); ctx.arc(0,0,S*1.25,0,Math.PI*2); ctx.fill();
  // tentacles
  ctx.strokeStyle='#4c1d95'; ctx.lineWidth=3;
  for (let i=0;i<6;i++){
    const a=(i/6)*Math.PI*2;
    ctx.beginPath();
    ctx.moveTo(Math.cos(a)*S*0.65,Math.sin(a)*S*0.65);
    ctx.quadraticCurveTo(Math.cos(a+0.9)*S*1.35,Math.sin(a+0.9)*S*1.35,Math.cos(a+1.35)*S*1.82,Math.sin(a+1.35)*S*1.82);
    ctx.stroke();
    circle(ctx,Math.cos(a+1.35)*S*1.82,Math.sin(a+1.35)*S*1.82,S*0.12,'#7c3aed');
  }
  // Central eye
  ctx.fillStyle='#ffd60a'; ctx.shadowColor='#ffd60a'; ctx.shadowBlur=22;
  ctx.beginPath(); ctx.ellipse(0,0,S*0.42,S*0.28,0,0,Math.PI*2); ctx.fill();
  ctx.shadowBlur=0;
  ctx.fillStyle='rgba(5,0,15,0.96)';
  ctx.beginPath(); ctx.ellipse(0,0,S*0.13,S*0.25,0,0,Math.PI*2); ctx.fill();
  // eye veins
  ctx.strokeStyle='rgba(200,0,0,0.55)'; ctx.lineWidth=0.8;
  for(let i=0;i<6;i++){
    const a=(i/6)*Math.PI*2;
    ctx.beginPath(); ctx.moveTo(Math.cos(a)*S*0.13,Math.sin(a)*S*0.13); ctx.lineTo(Math.cos(a)*S*0.38,Math.sin(a)*S*0.22); ctx.stroke();
  }
  ctx.restore();
}

// ── BOSSES ────────────────────────────────────────────────────────────────────

export function drawBossMeadow(ctx) {
  ctx.save();
  // Giant green dragon body
  body(ctx, S*1.65, '#16a34a', '#052e16');
  ctx.strokeStyle='#166534'; ctx.lineWidth=1.8;
  for(let i=0;i<5;i++){const y=-S*0.6+i*S*0.48; ctx.beginPath(); ctx.moveTo(-S*1.5,y); ctx.quadraticCurveTo(0,y+S*0.22,S*1.5,y); ctx.stroke();}
  // Wings
  [[-1],[1]].forEach(([d])=>{
    ctx.save(); ctx.translate(d*S*0.65,-S*0.35); ctx.rotate(d*0.75);
    ctx.fillStyle='rgba(22,101,52,0.72)';
    ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(d*S*2.0,-S*1.3); ctx.lineTo(d*S*1.6,S*0.65); ctx.closePath(); ctx.fill();
    ctx.strokeStyle='#052e16'; ctx.lineWidth=2;
    [0.35,0.65,0.92].forEach(t=>{ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(d*S*2.0*t,-S*1.3*t); ctx.stroke();});
    ctx.restore();
  });
  // Head
  ctx.save();
  ctx.translate(S*1.35,-S*0.5);
  body(ctx, S*0.82, '#15803d','#052e16');
  ctx.fillStyle='#166534';
  ctx.beginPath(); ctx.ellipse(S*0.55,S*0.06,S*0.52,S*0.26,0.22,0,Math.PI*2); ctx.fill();
  eyes(ctx,'#ffd60a',S*0.2);
  // teeth
  ctx.fillStyle='#fff';
  [-S*0.22,-S*0.04,S*0.14,S*0.32].forEach(x=>{
    ctx.beginPath(); ctx.moveTo(x+S*0.52,S*0.16); ctx.lineTo(x+S*0.62,S*0.44); ctx.lineTo(x+S*0.72,S*0.16); ctx.closePath(); ctx.fill();
  });
  ctx.restore();
  ctx.restore();
}

export function drawBossDungeon(ctx) {
  ctx.save();
  body(ctx, S*1.55, '#3d1a08','#0a0503');
  // bone protrusions
  ctx.fillStyle='#c8baa8';
  [[-S*1.15,-S*0.4],[S*1.15,-S*0.4],[-S*1.15,S*0.2],[S*1.15,S*0.2]].forEach(([x,y])=>{
    ctx.save(); ctx.translate(x,y); const d=x<0?1:-1;
    ctx.beginPath(); ctx.moveTo(0,-S*0.38); ctx.lineTo(d*S*0.42,0); ctx.lineTo(0,S*0.38); ctx.closePath(); ctx.fill(); ctx.restore();
  });
  // undead rib lines
  ctx.strokeStyle='#5c3a1e'; ctx.lineWidth=1.8;
  for(let i=-3;i<=3;i++){ctx.beginPath(); ctx.moveTo(-S*1.3,i*S*0.4); ctx.lineTo(S*1.3,i*S*0.4); ctx.stroke();}
  // Head
  ctx.save();
  ctx.translate(0,-S*1.35);
  body(ctx, S*0.88, '#5c3a1e','#1a0a04');
  // bone crown
  ctx.fillStyle='#c8baa8';
  [-S*0.6,-S*0.28,S*0.0,S*0.32,S*0.6].forEach(x=>{
    ctx.beginPath(); ctx.moveTo(x,-S*0.72); ctx.lineTo(x-S*0.1,-S*0.72-S*(0.35+Math.abs(x)*0.15)); ctx.lineTo(x+S*0.1,-S*0.72); ctx.closePath(); ctx.fill();
  });
  eyes(ctx,'#ef4444',S*0.24);
  // maw
  ctx.fillStyle='#050100';
  ctx.beginPath(); ctx.ellipse(0,S*0.32,S*0.52,S*0.28,0,0,Math.PI); ctx.fill();
  ctx.fillStyle='#c8baa8';
  [-S*0.38,-S*0.18,S*0.02,S*0.22,S*0.42].forEach(x=>{ctx.fillRect(x-S*0.07,S*0.32,S*0.13,S*0.24);});
  ctx.restore();
  ctx.restore();
}

export function drawBossVolcano(ctx) {
  ctx.save();
  body(ctx, S*1.7, '#991b1b','#3a0505');
  // lava seams
  ctx.strokeStyle='#fbbf24'; ctx.lineWidth=2.5; ctx.shadowColor='#f97316'; ctx.shadowBlur=14;
  ctx.beginPath(); ctx.moveTo(-S*0.8,-S*0.95); ctx.lineTo(S*0.2,S*0.4); ctx.lineTo(S*0.82,-S*0.6); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-S*0.45,S*0.6); ctx.lineTo(S*0.7,S*0.15); ctx.stroke();
  ctx.shadowBlur=0;
  // magma drips
  [[-S*0.6,S*1.4],[S*0.5,S*1.5],[S*0.08,S*1.25]].forEach(([x,y])=>{
    const dg=ctx.createRadialGradient(x,y,0,x,y,S*0.28);
    dg.addColorStop(0,'#fff'); dg.addColorStop(0.35,'#fbbf24'); dg.addColorStop(1,'rgba(249,115,22,0)');
    ctx.fillStyle=dg; ctx.beginPath(); ctx.arc(x,y,S*0.28,0,Math.PI*2); ctx.fill();
  });
  // Head
  ctx.save();
  ctx.translate(0,-S*1.52);
  body(ctx, S*0.92,'#b91c1c','#450a0a');
  ctx.strokeStyle='#fbbf24'; ctx.lineWidth=2; ctx.shadowColor='#fbbf24'; ctx.shadowBlur=8;
  ctx.beginPath(); ctx.moveTo(-S*0.45,S*0.32); ctx.lineTo(-S*0.12,-S*0.2); ctx.lineTo(S*0.38,S*0.14); ctx.stroke(); ctx.shadowBlur=0;
  horn(ctx,-S*0.45,-0.52,'#450a0a');
  horn(ctx, S*0.45, 0.52,'#450a0a');
  eyes(ctx,'#fbbf24',S*0.25);
  ctx.restore();
  ctx.restore();
}

export function drawBossAbyss(ctx) {
  ctx.save();
  body(ctx, S*1.75,'#1d4ed8','#060e2e');
  // ice shard armor spikes
  ctx.fillStyle='rgba(147,197,253,0.52)';
  [[-S*1.0,-S*0.55,0.42],[S*0.78,-S*0.42,-0.35],[-S*0.68,S*0.5,0.28],[S*0.88,S*0.32,-0.3]].forEach(([x,y,r])=>{
    ctx.save(); ctx.translate(x,y); ctx.rotate(r);
    ctx.beginPath(); ctx.moveTo(0,-S*0.8); ctx.lineTo(-S*0.22,S*0.32); ctx.lineTo(S*0.22,S*0.32); ctx.closePath(); ctx.fill(); ctx.restore();
  });
  // shoulder ice spikes
  [[-S*1.22,-S*0.38],[S*1.22,-S*0.38]].forEach(([x,y])=>{
    ctx.save(); ctx.translate(x,y); ctx.fillStyle='#bfdbfe';
    ctx.beginPath(); ctx.moveTo(0,-S*0.65); ctx.lineTo(-S*0.24,S*0.22); ctx.lineTo(S*0.24,S*0.22); ctx.closePath(); ctx.fill(); ctx.restore();
  });
  // Head
  ctx.save();
  ctx.translate(0,-S*1.55);
  body(ctx, S*0.88,'#1d4ed8','#06122e');
  ctx.fillStyle='#93c5fd'; ctx.fillRect(-S*0.8,-S*0.52,S*1.6,S*0.2);
  // icicle beard
  ctx.fillStyle='#bfdbfe';
  [-S*0.52,-S*0.24,S*0.04,S*0.32].forEach(x=>{
    ctx.beginPath(); ctx.moveTo(x,S*0.32); ctx.lineTo(x+S*0.1,S*0.32+S*0.52); ctx.lineTo(x+S*0.2,S*0.32); ctx.closePath(); ctx.fill();
  });
  eyes(ctx,'#7dd3fc',S*0.24);
  ctx.restore();
  ctx.restore();
}

export function drawBossShadow(ctx) {
  ctx.save();
  // Massive void nebula
  const g = ctx.createRadialGradient(-S*0.5,-S*0.5,0,0,0,S*1.8);
  g.addColorStop(0,'#7c3aed');
  g.addColorStop(0.3,'#2e1065');
  g.addColorStop(0.7,'#0a0010');
  g.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=g;
  ctx.beginPath(); ctx.arc(0,0,S*1.8,0,Math.PI*2); ctx.fill();
  // tendrils
  ctx.strokeStyle='#6d28d9'; ctx.lineWidth=3.5;
  for(let i=0;i<8;i++){
    const a=(i/8)*Math.PI*2;
    ctx.beginPath();
    ctx.moveTo(Math.cos(a)*S*0.9,Math.sin(a)*S*0.9);
    ctx.quadraticCurveTo(Math.cos(a+0.7)*S*1.85,Math.sin(a+0.7)*S*1.85,Math.cos(a+1.15)*S*2.45,Math.sin(a+1.15)*S*2.45);
    ctx.stroke();
    circle(ctx,Math.cos(a+1.15)*S*2.45,Math.sin(a+1.15)*S*2.45,S*0.2,'#4c1d95');
  }
  // three eyes
  [[0,-S*0.25,S*0.4,S*0.25],[S*0.58,S*0.35,S*0.24,S*0.15],[-S*0.58,S*0.35,S*0.24,S*0.15]].forEach(([x,y,rx,ry])=>{
    ctx.fillStyle='#ffd60a'; ctx.shadowColor='#ffd60a'; ctx.shadowBlur=22;
    ctx.beginPath(); ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2); ctx.fill(); ctx.shadowBlur=0;
    ctx.fillStyle='rgba(5,0,15,0.95)';
    ctx.beginPath(); ctx.ellipse(x,y,rx*0.34,ry*0.88,0,0,Math.PI*2); ctx.fill();
  });
  ctx.restore();
}

export function drawGenericBoss(ctx) {
  ctx.save();
  body(ctx, S*1.5, '#7f1d1d','#300000');
  eyes(ctx,'#ef4444',S*0.24);
  ctx.fillStyle='#fff';
  [-S*0.4,-S*0.15,S*0.1,S*0.35].forEach(x=>{ctx.fillRect(x-S*0.1,S*0.28,S*0.18,S*0.38);});
  ctx.restore();
}

// ── Master dispatcher ─────────────────────────────────────────────────────────

const DRAW_MAP = {
  peasant:      drawPeasant,
  soldier:      drawSoldier,
  knight:       drawKnight,
  horseman:     drawHorseman,
  skeleton:     drawSkeleton,
  wraith:       drawWraith,
  necromancer:  drawNecromancer,
  king:         drawKing,
  demon:        drawDemon,
  golem:        drawGolem,
  lavaSpawn:    drawLavaSpawn,
  firedrake:    drawFiredrake,
  specter:      drawSpecter,
  frostGiant:   drawFrostGiant,
  iceWalker:    drawIceWalker,
  shadow:       drawShadow,
  voidling:     drawVoidling,
  soulReaper:   drawSoulReaper,
  doomKnight:   drawDoomKnight,
  abyssLord:    drawAbyssLord,
  boss_meadow:   drawBossMeadow,
  boss_dungeon:  drawBossDungeon,
  boss_volcano:  drawBossVolcano,
  boss_abyss:    drawBossAbyss,
  boss_shadow:   drawBossShadow,
};

export function drawEnemyGraphic(ctx, type, isBoss) {
  ctx.save();
  const fn = DRAW_MAP[type];
  if (fn) {
    fn(ctx);
  } else if (isBoss) {
    drawGenericBoss(ctx);
  } else {
    // fallback: colored sphere
    body(ctx, S * 0.8, '#6b7280', '#2a2a2a');
    eyes(ctx, '#ef4444');
  }
  ctx.restore();
}