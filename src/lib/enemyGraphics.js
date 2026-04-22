/**
 * enemyGraphics.js — Land-accurate 3D-style canvas monster graphics
 * Each draw fn renders centered at (0,0). Caller saves/restores ctx.
 */

const S = 16; // base size unit

// ── Shared helpers ────────────────────────────────────────────────────────────

function shade(hex, amt) {
  const n = parseInt(hex.replace('#',''), 16);
  const clamp = v => Math.max(0, Math.min(255, v));
  const r = clamp((n >> 16) + amt), g = clamp(((n >> 8) & 0xff) + amt), b = clamp((n & 0xff) + amt);
  return `#${((1<<24)|(r<<16)|(g<<8)|b).toString(16).slice(1)}`;
}

function radGrad(ctx, x, y, r, inner, outer) {
  const g = ctx.createRadialGradient(x - r*0.3, y - r*0.35, r*0.05, x, y, r);
  g.addColorStop(0, inner); g.addColorStop(1, outer); return g;
}

function sphere(ctx, r, color) {
  ctx.fillStyle = radGrad(ctx, 0, 0, r, shade(color, 80), shade(color, -60));
  ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI*2); ctx.fill();
}

function roundRect(ctx, x, y, w, h, r, color) {
  const g = ctx.createLinearGradient(x, y, x+w, y+h);
  g.addColorStop(0, shade(color, 55)); g.addColorStop(1, shade(color, -55));
  ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fill();
}

function glowEyes(ctx, lx, ly, rx, ry, r, color) {
  ctx.fillStyle = color; ctx.shadowColor = color; ctx.shadowBlur = 10;
  ctx.beginPath(); ctx.arc(lx, ly, r, 0, Math.PI*2); ctx.arc(rx, ry, r, 0, Math.PI*2); ctx.fill();
  ctx.shadowBlur = 0;
}

// ── LAND 1: Verdant Meadow — corrupted peasants, soldiers, knights, horsemen ─

export function drawPeasant(ctx) {
  // Ragged green tunic peasant with pitchfork
  roundRect(ctx, -S*0.55, -S*0.6, S*1.1, S*1.2, 4, '#4a7c2f');
  sphere(ctx, S*0.52, '#c8a46e');
  // straw hat
  ctx.translate(0, -S*0.3);
  ctx.fillStyle = '#a08030'; ctx.beginPath();
  ctx.ellipse(0, -S*0.52, S*0.68, S*0.18, 0, 0, Math.PI*2); ctx.fill();
  ctx.fillRect(-S*0.26, -S*0.85, S*0.52, S*0.38);
  ctx.fillStyle = '#7a6020';
  ctx.beginPath(); ctx.ellipse(0, -S*0.52, S*0.68, S*0.18, 0, 0, Math.PI*2); ctx.fill();
  // pitchfork
  ctx.save(); ctx.translate(S*0.72, S*0.6); ctx.strokeStyle = '#8B5E3C'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, -S*1.2); ctx.lineTo(0, S*0.2); ctx.stroke();
  ctx.strokeStyle = '#c0c0c0'; ctx.lineWidth = 1.5;
  [-S*0.15, 0, S*0.15].forEach(x => { ctx.beginPath(); ctx.moveTo(x, -S*1.2); ctx.lineTo(x, -S*0.8); ctx.stroke(); });
  ctx.restore();
}

export function drawSoldier(ctx) {
  // Green-tabarded soldier with sword
  roundRect(ctx, -S*0.58, -S*0.65, S*1.16, S*1.3, 4, '#607830');
  // chainmail texture
  ctx.strokeStyle = '#4a6020'; ctx.lineWidth = 0.8;
  for (let i=-2;i<=2;i++) { ctx.beginPath(); ctx.moveTo(-S*0.5, i*S*0.25); ctx.lineTo(S*0.5, i*S*0.25); ctx.stroke(); }
  ctx.translate(0, -S*0.38);
  sphere(ctx, S*0.52, '#c8a46e');
  // open-face helm
  ctx.fillStyle = '#8a9060'; ctx.beginPath();
  ctx.arc(0, -S*0.5, S*0.55, Math.PI, 0); ctx.fill();
  ctx.fillRect(-S*0.55, -S*0.5, S*1.1, S*0.22);
  // nose guard
  ctx.fillStyle = '#6a7040'; ctx.fillRect(-S*0.06, -S*0.48, S*0.12, S*0.35);
  // sword
  ctx.save(); ctx.translate(S*0.68, S*0.6); ctx.rotate(-0.3);
  ctx.fillStyle = '#c8d8e0'; ctx.fillRect(-S*0.1, -S*0.9, S*0.2, S*0.9);
  ctx.fillStyle = '#d4a800'; ctx.fillRect(-S*0.28, -S*0.12, S*0.56, S*0.14);
  ctx.restore();
}

export function drawKnight(ctx) {
  // Heavy plate armor — silver/green livery
  roundRect(ctx, -S*0.68, -S*0.75, S*1.36, S*1.5, 4, '#708090');
  // armor plates highlight
  ctx.fillStyle = 'rgba(180,200,220,0.25)'; ctx.fillRect(-S*0.55, -S*0.62, S*0.35, S*1.2);
  ctx.translate(0, -S*0.45);
  sphere(ctx, S*0.58, '#708090');
  // great helm
  ctx.fillStyle = '#556070'; ctx.beginPath(); ctx.arc(0, -S*0.55, S*0.62, Math.PI, 0); ctx.fill();
  ctx.fillRect(-S*0.62, -S*0.55, S*1.24, S*0.3);
  // visor glow — angry red
  ctx.fillStyle = '#ff3300'; ctx.shadowColor='#ff3300'; ctx.shadowBlur=8;
  ctx.fillRect(-S*0.38, -S*0.52, S*0.76, S*0.11); ctx.shadowBlur=0;
  // shield
  ctx.save(); ctx.translate(-S*0.88, S*0.05);
  ctx.fillStyle = '#8B2000'; ctx.beginPath();
  ctx.moveTo(-S*0.32, -S*0.5); ctx.lineTo(S*0.32, -S*0.5); ctx.lineTo(S*0.32, S*0.22); ctx.lineTo(0, S*0.55); ctx.lineTo(-S*0.32, S*0.22); ctx.closePath(); ctx.fill();
  ctx.strokeStyle='#ffd60a'; ctx.lineWidth=1.5; ctx.stroke();
  // cross on shield
  ctx.strokeStyle='#ffd60a'; ctx.lineWidth=1.5;
  ctx.beginPath(); ctx.moveTo(0,-S*0.35); ctx.lineTo(0,S*0.25); ctx.moveTo(-S*0.2,-S*0.05); ctx.lineTo(S*0.2,-S*0.05); ctx.stroke();
  ctx.restore();
}

export function drawHorseman(ctx) {
  // Warhorse — tan with rider
  ctx.save(); ctx.translate(0, S*0.4);
  ctx.fillStyle = radGrad(ctx, 0, 0, S*1.0, '#c9935a', '#7a5030');
  ctx.beginPath(); ctx.ellipse(0, 0, S*1.4, S*0.8, 0, 0, Math.PI*2); ctx.fill();
  // legs
  ctx.fillStyle = '#a07040';
  [[-S*0.7,S*0.5],[S*0.7,S*0.5],[-S*0.35,S*0.6],[S*0.35,S*0.6]].forEach(([x,y])=>{
    ctx.fillRect(x-S*0.1, y, S*0.2, S*0.55);
  });
  // hooves
  ctx.fillStyle='#2a1a0a';
  [[-S*0.7,S*1.05],[S*0.7,S*1.05],[-S*0.35,S*1.15],[S*0.35,S*1.15]].forEach(([x,y])=>{
    ctx.fillRect(x-S*0.12, y, S*0.24, S*0.15);
  });
  // mane
  ctx.fillStyle='#5a3020'; ctx.fillRect(-S*0.2, -S*0.7, S*1.35, S*0.22);
  ctx.restore();
  // rider
  ctx.translate(S*0.2, -S*0.15);
  sphere(ctx, S*0.45, '#c8a46e');
  ctx.fillStyle='#607830'; ctx.beginPath(); ctx.arc(0,-S*0.42,S*0.48,Math.PI,0); ctx.fill();
  ctx.fillStyle='#2a3540'; ctx.fillRect(-S*0.38,-S*0.46,S*0.76,S*0.12);
}

// ── LAND 2: Dark Dungeon — undead, skeletons, wraiths, necromancers, kings ──

export function drawSkeleton(ctx) {
  // Bone-white skeleton warrior
  roundRect(ctx, -S*0.45, -S*0.55, S*0.9, S*1.1, 3, '#d8d0c0');
  // ribs
  ctx.strokeStyle='#a09888'; ctx.lineWidth=1;
  for(let i=-1;i<=2;i++) { ctx.beginPath(); ctx.moveTo(-S*0.35, i*S*0.2); ctx.lineTo(S*0.35, i*S*0.2); ctx.stroke(); }
  ctx.translate(0, -S*0.42);
  sphere(ctx, S*0.5, '#e0d8c8');
  // hollow eyes
  ctx.fillStyle='#1a1a1a';
  ctx.beginPath(); ctx.arc(-S*0.17,-S*0.08,S*0.14,0,Math.PI*2); ctx.arc(S*0.17,-S*0.08,S*0.14,0,Math.PI*2); ctx.fill();
  // jaw teeth
  ctx.fillStyle='#f0ece0';
  [-S*0.16, 0, S*0.16].forEach(x => ctx.fillRect(x-S*0.055, S*0.25, S*0.11, S*0.16));
  // bone arm with sword
  ctx.save(); ctx.translate(S*0.62,S*0.5);
  ctx.fillStyle='#d8d0c0'; ctx.fillRect(-S*0.08,-S*0.9,S*0.16,S*0.4);
  ctx.fillStyle='#c0c8d0'; ctx.fillRect(-S*0.08,-S*1.4,S*0.16,S*0.55);
  ctx.fillStyle='#d4a800'; ctx.fillRect(-S*0.24,-S*0.92,S*0.48,S*0.11);
  ctx.restore();
}

export function drawWraith(ctx) {
  // Glowing purple ghost — wispy trails
  ctx.save();
  const g = ctx.createRadialGradient(0,0,0,0,0,S*1.15);
  g.addColorStop(0,'#c084fc'); g.addColorStop(0.5,'rgba(124,58,237,0.6)'); g.addColorStop(1,'rgba(76,29,149,0)');
  ctx.fillStyle=g; ctx.globalAlpha=0.9;
  ctx.beginPath(); ctx.arc(0, S*0.15, S*1.15, 0, Math.PI*2); ctx.fill();
  // wispy bottom
  ctx.fillStyle='rgba(124,58,237,0.4)';
  ctx.beginPath(); ctx.moveTo(-S*0.8,S*0.5); ctx.quadraticCurveTo(-S*1.0,S*1.5,-S*0.5,S*1.8);
  ctx.quadraticCurveTo(0,S*1.2,S*0.5,S*1.8); ctx.quadraticCurveTo(S*1.0,S*1.5,S*0.8,S*0.5); ctx.closePath(); ctx.fill();
  ctx.globalAlpha=1; ctx.restore();
  // skull face
  sphere(ctx, S*0.5, '#d0c8ff');
  ctx.fillStyle='#1a003a'; ctx.beginPath();
  ctx.arc(-S*0.17,-S*0.08,S*0.14,0,Math.PI*2); ctx.arc(S*0.17,-S*0.08,S*0.14,0,Math.PI*2); ctx.fill();
  // inner glow eyes
  glowEyes(ctx, -S*0.17,-S*0.08, S*0.17,-S*0.08, S*0.07, '#c084fc');
}

export function drawNecromancer(ctx) {
  // Purple-robed mage with staff
  ctx.fillStyle='#2d1b4e';
  ctx.beginPath(); ctx.moveTo(-S*0.7,S*0.8); ctx.lineTo(S*0.7,S*0.8); ctx.lineTo(S*0.48,-S*0.45); ctx.lineTo(-S*0.48,-S*0.45); ctx.closePath(); ctx.fill();
  // robe trim
  ctx.strokeStyle='#7c3aed'; ctx.lineWidth=1.5;
  ctx.beginPath(); ctx.moveTo(-S*0.7,S*0.8); ctx.lineTo(-S*0.48,-S*0.45); ctx.moveTo(S*0.7,S*0.8); ctx.lineTo(S*0.48,-S*0.45); ctx.stroke();
  ctx.translate(0,-S*0.42);
  sphere(ctx, S*0.48, '#b8a080');
  // hood
  ctx.fillStyle='#1e0a3e'; ctx.beginPath();
  ctx.moveTo(-S*0.52,S*0.1); ctx.lineTo(S*0.52,S*0.1); ctx.lineTo(0,-S*0.95); ctx.closePath(); ctx.fill();
  // skull face under hood
  ctx.fillStyle='#c8b890'; ctx.beginPath(); ctx.arc(0,-S*0.12,S*0.3,0.4,Math.PI-0.4); ctx.fill();
  ctx.fillStyle='#1a0a2e';
  ctx.beginPath(); ctx.arc(-S*0.12,-S*0.22,S*0.1,0,Math.PI*2); ctx.arc(S*0.12,-S*0.22,S*0.1,0,Math.PI*2); ctx.fill();
  glowEyes(ctx,-S*0.12,-S*0.22,S*0.12,-S*0.22,S*0.05,'#a855f7');
  // staff
  ctx.save(); ctx.translate(S*0.75,S*0.62);
  ctx.strokeStyle='#4a2a00'; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(0,-S*1.5); ctx.lineTo(0,S*0.2); ctx.stroke();
  const og=ctx.createRadialGradient(0,-S*1.5,0,0,-S*1.5,S*0.35);
  og.addColorStop(0,'#fff'); og.addColorStop(0.3,'#a855f7'); og.addColorStop(1,'rgba(168,85,247,0)');
  ctx.fillStyle=og; ctx.shadowColor='#a855f7'; ctx.shadowBlur=12;
  ctx.beginPath(); ctx.arc(0,-S*1.5,S*0.35,0,Math.PI*2); ctx.fill(); ctx.shadowBlur=0;
  ctx.restore();
}

export function drawKing(ctx) {
  // Dungeon king — undead royalty in tattered purple robes
  roundRect(ctx, -S*0.65, -S*0.7, S*1.3, S*1.5, 4, '#4a1878');
  // gold trim
  ctx.strokeStyle='#ffd60a'; ctx.lineWidth=2;
  ctx.strokeRect(-S*0.65,-S*0.7,S*1.3,S*1.5);
  ctx.translate(0,-S*0.52);
  sphere(ctx, S*0.52, '#2a1a0e');
  ctx.fillStyle='#1a100a'; ctx.beginPath(); ctx.arc(0,0,S*0.52,0,Math.PI*2); ctx.fill();
  // undead face
  ctx.fillStyle='#6a5040'; ctx.beginPath(); ctx.arc(0,0,S*0.48,0,Math.PI*2); ctx.fill();
  // crown
  ctx.fillStyle='#ffd60a'; ctx.fillRect(-S*0.55,-S*0.62,S*1.1,S*0.28);
  [[-S*0.38,S*0.25],[0,S*0.35],[S*0.38,S*0.25]].forEach(([ox,oh])=>{
    ctx.beginPath(); ctx.moveTo(ox-S*0.15,-S*0.62); ctx.lineTo(ox,-S*0.62-oh); ctx.lineTo(ox+S*0.15,-S*0.62); ctx.fill();
  });
  // ruby gems
  ctx.fillStyle='#ef4444'; ctx.shadowColor='#ef4444'; ctx.shadowBlur=6;
  ctx.beginPath(); ctx.arc(0,-S*0.65,S*0.1,0,Math.PI*2); ctx.fill(); ctx.shadowBlur=0;
  // glowing skull eyes
  glowEyes(ctx,-S*0.2,-S*0.08,S*0.2,-S*0.08,S*0.12,'#ff6600');
}

// ── LAND 3: Volcanic Wastes — fire demons, golems, drakes, lava ─────────────

export function drawDemon(ctx) {
  // Red-skinned fire demon with horns
  roundRect(ctx, -S*0.62, -S*0.7, S*1.24, S*1.4, 5, '#8b1a1a');
  // muscle tone
  ctx.fillStyle='rgba(200,50,0,0.2)'; ctx.fillRect(-S*0.45,-S*0.55,S*0.25,S*1.1);
  // shoulder spikes
  ctx.fillStyle='#5a0a0a';
  [[-S*0.72,-S*0.3,S*0.65],[S*0.72,-S*0.3,-S*0.65]].forEach(([tx,ty,lean])=>{
    ctx.save(); ctx.translate(tx,ty);
    ctx.beginPath(); ctx.moveTo(0,-S*0.55); ctx.lineTo(lean*0.3,S*0.2); ctx.lineTo(-lean*0.3,S*0.2); ctx.closePath(); ctx.fill(); ctx.restore();
  });
  ctx.translate(0,-S*0.52);
  sphere(ctx, S*0.55, '#a81a1a');
  // curved horns
  ctx.fillStyle='#3a0505';
  [[-1],[1]].forEach(([d])=>{
    ctx.save(); ctx.translate(d*S*0.32,-S*0.42); ctx.rotate(d*0.55);
    ctx.beginPath(); ctx.moveTo(0,0); ctx.quadraticCurveTo(d*S*0.45,-S*0.55,d*S*0.25,-S*0.82); ctx.lineTo(d*S*0.08,-S*0.1); ctx.closePath(); ctx.fill(); ctx.restore();
  });
  // white fangs
  ctx.fillStyle='#fff'; ctx.beginPath();
  ctx.moveTo(-S*0.18,S*0.25); ctx.lineTo(-S*0.08,S*0.45); ctx.lineTo(S*0.08,S*0.25);
  ctx.moveTo(S*0.18,S*0.25); ctx.lineTo(S*0.08,S*0.45); ctx.lineTo(-S*0.08,S*0.25); ctx.fill();
  glowEyes(ctx,-S*0.2,-S*0.08,S*0.2,-S*0.08,S*0.14,'#ff9900');
}

export function drawGolem(ctx) {
  // Massive rock golem — grey boulders stacked
  roundRect(ctx, -S*0.85, -S*0.8, S*1.7, S*1.7, 8, '#5a5a5a');
  // rock facets
  ctx.strokeStyle='#333'; ctx.lineWidth=2;
  ctx.beginPath(); ctx.moveTo(-S*0.5,-S*0.5); ctx.lineTo(S*0.2,S*0.3); ctx.lineTo(S*0.6,-S*0.2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-S*0.2,S*0.5); ctx.lineTo(S*0.6,S*0.1); ctx.stroke();
  // lichens
  ctx.fillStyle='#3a6a2a'; ctx.beginPath(); ctx.arc(-S*0.4,-S*0.2,S*0.18,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#2a5a1a'; ctx.beginPath(); ctx.arc(S*0.3,S*0.4,S*0.12,0,Math.PI*2); ctx.fill();
  ctx.translate(0,-S*0.65);
  sphere(ctx, S*0.65, '#6b7280');
  // crack on face
  ctx.strokeStyle='#2a2a2a'; ctx.lineWidth=1.5;
  ctx.beginPath(); ctx.moveTo(-S*0.1,-S*0.4); ctx.lineTo(S*0.05,S*0.1); ctx.lineTo(S*0.2,S*0.3); ctx.stroke();
  glowEyes(ctx,-S*0.24,-S*0.05,S*0.24,-S*0.05,S*0.16,'#f97316');
}

export function drawLavaSpawn(ctx) {
  // Molten lava blob — glowing orange core
  const g = ctx.createRadialGradient(-S*0.2,-S*0.2,0,0,0,S*1.0);
  g.addColorStop(0,'#ffffff'); g.addColorStop(0.15,'#fff7aa'); g.addColorStop(0.4,'#ff8c00'); g.addColorStop(0.75,'#8b1a00'); g.addColorStop(1,'#1a0000');
  ctx.fillStyle=g; ctx.beginPath(); ctx.arc(0,0,S*1.0,0,Math.PI*2); ctx.fill();
  // lava cracks radiating out
  ctx.strokeStyle='#ffd60a'; ctx.lineWidth=2; ctx.shadowColor='#ffd60a'; ctx.shadowBlur=8;
  for(let i=0;i<5;i++) {
    const a=(i/5)*Math.PI*2;
    ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(Math.cos(a)*S*0.85,Math.sin(a)*S*0.85); ctx.stroke();
  }
  ctx.shadowBlur=0;
  // bright core
  ctx.fillStyle='#ffffa0'; ctx.shadowColor='#ffff00'; ctx.shadowBlur=14;
  ctx.beginPath(); ctx.arc(0,0,S*0.25,0,Math.PI*2); ctx.fill(); ctx.shadowBlur=0;
}

export function drawFiredrake(ctx) {
  // Fire-breathing dragon — red scales, wings
  ctx.fillStyle = radGrad(ctx, 0, S*0.2, S*1.0, '#ef4444', '#7f1d1d');
  ctx.beginPath(); ctx.ellipse(0, S*0.25, S*1.3, S*0.75, 0, 0, Math.PI*2); ctx.fill();
  // wing membranes
  ctx.fillStyle='rgba(127,29,29,0.7)';
  [[-1],[1]].forEach(([d])=>{
    ctx.save(); ctx.translate(d*S*0.5,-S*0.15); ctx.rotate(d*0.6);
    ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(d*S*1.4,-S*0.9); ctx.lineTo(d*S*1.1,S*0.55); ctx.closePath(); ctx.fill(); ctx.restore();
  });
  // wing ribs
  ctx.strokeStyle='#5a0a0a'; ctx.lineWidth=1.5;
  [[-1],[1]].forEach(([d])=>{
    ctx.save(); ctx.translate(d*S*0.5,-S*0.15); ctx.rotate(d*0.6);
    [0.35, 0.65, 0.9].forEach(t => {
      ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(d*S*1.4*t,-S*0.9*t); ctx.stroke();
    });
    ctx.restore();
  });
  // head
  ctx.save(); ctx.translate(S*0.95,-S*0.25);
  sphere(ctx, S*0.48, '#dc2626');
  // snout
  ctx.fillStyle='#b91c1c'; ctx.beginPath(); ctx.ellipse(S*0.38,S*0.05,S*0.38,S*0.2,0.3,0,Math.PI*2); ctx.fill();
  // nostrils with smoke
  ctx.fillStyle='#450a0a'; ctx.beginPath(); ctx.arc(S*0.55,S*0.0,S*0.07,0,Math.PI*2); ctx.arc(S*0.6,S*0.1,S*0.07,0,Math.PI*2); ctx.fill();
  glowEyes(ctx,-S*0.05,-S*0.15,S*0.28,-S*0.18,S*0.12,'#ff9900');
  // fire breath streak
  ctx.fillStyle='rgba(255,200,0,0.5)'; ctx.shadowColor='#ff8c00'; ctx.shadowBlur=10;
  ctx.beginPath(); ctx.moveTo(S*0.7,-S*0.05); ctx.lineTo(S*1.6,-S*0.2); ctx.lineTo(S*1.55,S*0.1); ctx.lineTo(S*0.7,S*0.08); ctx.closePath(); ctx.fill();
  ctx.shadowBlur=0; ctx.restore();
}

// ── LAND 4: Frozen Abyss — specters, frost giants, ice walkers, shadows ─────

export function drawSpecter(ctx) {
  // Icy blue translucent ghost
  ctx.save();
  const g = ctx.createRadialGradient(0,0,0,0,0,S*1.0);
  g.addColorStop(0,'rgba(186,230,253,0.95)'); g.addColorStop(0.55,'rgba(56,189,248,0.55)'); g.addColorStop(1,'rgba(14,165,233,0)');
  ctx.fillStyle=g; ctx.beginPath(); ctx.arc(0,S*0.1,S*1.0,0,Math.PI*2); ctx.fill();
  // wispy tail
  ctx.fillStyle='rgba(125,211,252,0.4)';
  ctx.beginPath(); ctx.moveTo(-S*0.65,S*0.5); ctx.quadraticCurveTo(-S*0.8,S*1.4,-S*0.3,S*1.7);
  ctx.quadraticCurveTo(0,S*1.1,S*0.3,S*1.7); ctx.quadraticCurveTo(S*0.8,S*1.4,S*0.65,S*0.5); ctx.closePath(); ctx.fill();
  ctx.globalAlpha=1; ctx.restore();
  sphere(ctx, S*0.47, '#bae6fd');
  // hollow icy eyes
  ctx.fillStyle='#0c4a6e'; ctx.beginPath();
  ctx.arc(-S*0.16,-S*0.07,S*0.13,0,Math.PI*2); ctx.arc(S*0.16,-S*0.07,S*0.13,0,Math.PI*2); ctx.fill();
  glowEyes(ctx,-S*0.16,-S*0.07,S*0.16,-S*0.07,S*0.06,'#38bdf8');
}

export function drawFrostGiant(ctx) {
  // Enormous ice-armored giant — blue steel
  roundRect(ctx,-S*0.9,-S*0.9,S*1.8,S*2.0,6,'#1e3a8a');
  // ice crystal armor plates
  ctx.fillStyle='rgba(147,197,253,0.35)';
  [[-S*0.6,S*0.1],[S*0.4,-S*0.3],[S*0.1,S*0.55]].forEach(([x,y])=>{
    ctx.save(); ctx.translate(x,y);
    ctx.beginPath(); ctx.moveTo(0,-S*0.55); ctx.lineTo(-S*0.18,S*0.25); ctx.lineTo(S*0.18,S*0.25); ctx.closePath(); ctx.fill(); ctx.restore();
  });
  ctx.translate(0,-S*0.82);
  sphere(ctx, S*0.68, '#1d4ed8');
  // icy brow ridge
  ctx.fillStyle='#93c5fd'; ctx.fillRect(-S*0.6,-S*0.42,S*1.2,S*0.18);
  // ice beard
  ctx.fillStyle='#bfdbfe';
  [-S*0.32,0,S*0.32].forEach(x=>{
    ctx.save(); ctx.translate(x,S*0.32); ctx.fillRect(-S*0.08,0,S*0.16,S*0.45); ctx.restore();
  });
  glowEyes(ctx,-S*0.26,-S*0.1,S*0.26,-S*0.1,S*0.16,'#7dd3fc');
}

export function drawIceWalker(ctx) {
  // Crystalline walking ice humanoid
  ctx.save(); ctx.rotate(Math.PI/8);
  roundRect(ctx,-S*0.45,-S*0.65,S*0.9,S*1.2,4,'#38bdf8');
  ctx.restore();
  ctx.translate(0,-S*0.42);
  sphere(ctx, S*0.48, '#7dd3fc');
  // ice spikes from head
  ctx.fillStyle='#e0f2fe';
  [[-S*0.22,-S*0.42,-0.4],[S*0.22,-S*0.42,0.4],[0,-S*0.52,0]].forEach(([x,y,r])=>{
    ctx.save(); ctx.translate(x,y); ctx.rotate(r);
    ctx.fillRect(-S*0.07,-S*0.42,S*0.14,S*0.42); ctx.restore();
  });
  glowEyes(ctx,-S*0.16,-S*0.07,S*0.16,-S*0.07,S*0.11,'#38bdf8');
}

export function drawShadow(ctx) {
  // Void-darkness shadow creature
  const g = ctx.createRadialGradient(-S*0.3,-S*0.3,0,0,0,S*1.1);
  g.addColorStop(0,'#6d28d9'); g.addColorStop(0.45,'#1e0a3e'); g.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=g; ctx.beginPath(); ctx.arc(0,0,S*1.1,0,Math.PI*2); ctx.fill();
  // wisps
  ctx.fillStyle='rgba(109,40,217,0.35)';
  for(let i=0;i<4;i++){
    const a=(i/4)*Math.PI*2;
    ctx.beginPath(); ctx.ellipse(Math.cos(a)*S*0.7,Math.sin(a)*S*0.7,S*0.4,S*0.25,a,0,Math.PI*2); ctx.fill();
  }
  glowEyes(ctx,-S*0.22,-S*0.1,S*0.22,-S*0.1,S*0.17,'#a855f7');
}

// ── LAND 5: Shadow Realm — voidlings, soul reapers, doom knights, abyss lords ─

export function drawVoidling(ctx) {
  // Small swirling void orb with single eye
  const g = ctx.createRadialGradient(-S*0.2,-S*0.2,0,0,0,S*0.95);
  g.addColorStop(0,'#a855f7'); g.addColorStop(0.5,'#4c1d95'); g.addColorStop(1,'#000');
  ctx.fillStyle=g; ctx.beginPath(); ctx.arc(0,0,S*0.95,0,Math.PI*2); ctx.fill();
  // rotating ring
  ctx.save();
  ctx.strokeStyle='rgba(192,132,252,0.7)'; ctx.lineWidth=2;
  ctx.beginPath(); ctx.ellipse(0,0,S*1.2,S*0.35,(performance.now()*0.001)%Math.PI,0,Math.PI*2); ctx.stroke();
  ctx.restore();
  // iris with slit
  ctx.fillStyle='#ffd60a'; ctx.shadowColor='#ffd60a'; ctx.shadowBlur=14;
  ctx.beginPath(); ctx.ellipse(0,0,S*0.3,S*0.22,0,0,Math.PI*2); ctx.fill(); ctx.shadowBlur=0;
  ctx.fillStyle='#0a0000'; ctx.beginPath(); ctx.ellipse(0,0,S*0.1,S*0.2,0,0,Math.PI*2); ctx.fill();
}

export function drawSoulReaper(ctx) {
  // Cloaked undead reaper with glowing scythe
  ctx.fillStyle='#0f0a1a';
  ctx.beginPath(); ctx.moveTo(-S*0.72,S*0.85); ctx.lineTo(S*0.72,S*0.85);
  ctx.lineTo(S*0.52,-S*0.55); ctx.lineTo(-S*0.52,-S*0.55); ctx.closePath(); ctx.fill();
  ctx.fillStyle='rgba(109,40,217,0.3)';
  ctx.beginPath(); ctx.moveTo(0,S*0.85); ctx.lineTo(S*0.22,-S*0.55); ctx.lineTo(-S*0.22,-S*0.55); ctx.closePath(); ctx.fill();
  ctx.translate(0,-S*0.6);
  sphere(ctx, S*0.5, '#e8e4dc');
  // sunken void eyes
  ctx.fillStyle='#0a001a';
  ctx.beginPath(); ctx.arc(-S*0.17,-S*0.07,S*0.14,0,Math.PI*2); ctx.arc(S*0.17,-S*0.07,S*0.14,0,Math.PI*2); ctx.fill();
  glowEyes(ctx,-S*0.17,-S*0.07,S*0.17,-S*0.07,S*0.07,'#7c3aed');
  // scythe
  ctx.save(); ctx.translate(S*0.8,S*0.65);
  ctx.strokeStyle='#4b5563'; ctx.lineWidth=2.5; ctx.beginPath(); ctx.moveTo(0,-S*1.55); ctx.lineTo(0,S*0.25); ctx.stroke();
  ctx.fillStyle='#6d28d9'; ctx.shadowColor='#6d28d9'; ctx.shadowBlur=12;
  ctx.beginPath(); ctx.moveTo(0,-S*1.55); ctx.quadraticCurveTo(S*1.0,-S*1.35,S*0.65,-S*0.65); ctx.lineTo(0,-S*0.95); ctx.closePath(); ctx.fill(); ctx.shadowBlur=0;
  ctx.restore();
}

export function drawDoomKnight(ctx) {
  // Black cursed plate armor with void energy
  roundRect(ctx,-S*0.72,-S*0.8,S*1.44,S*1.65,5,'#0f172a');
  // void rune cracks
  ctx.strokeStyle='#7c3aed'; ctx.lineWidth=1.5; ctx.shadowColor='#7c3aed'; ctx.shadowBlur=8;
  ctx.beginPath(); ctx.moveTo(-S*0.45,-S*0.55); ctx.lineTo(-S*0.12,S*0.35); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(S*0.3,-S*0.45); ctx.lineTo(S*0.1,S*0.55); ctx.stroke();
  ctx.shadowBlur=0;
  ctx.translate(0,-S*0.65);
  sphere(ctx,S*0.6,'#1e293b');
  // full faceguard with red slit
  ctx.fillStyle='#0f172a'; ctx.beginPath(); ctx.arc(0,-S*0.52,S*0.64,Math.PI,0); ctx.fill();
  ctx.fillRect(-S*0.64,-S*0.52,S*1.28,S*0.32);
  ctx.fillStyle='#ef4444'; ctx.shadowColor='#ef4444'; ctx.shadowBlur=10;
  ctx.fillRect(-S*0.42,-S*0.46,S*0.84,S*0.12); ctx.shadowBlur=0;
  // black horns
  ctx.fillStyle='#1e0a00';
  [[-1],[1]].forEach(([d])=>{
    ctx.save(); ctx.translate(d*S*0.34,-S*0.5); ctx.rotate(d*0.42);
    ctx.beginPath(); ctx.moveTo(0,0); ctx.quadraticCurveTo(d*S*0.3,-S*0.5,d*S*0.18,-S*0.75); ctx.lineTo(d*S*0.06,-S*0.08); ctx.closePath(); ctx.fill(); ctx.restore();
  });
}

export function drawAbyssLord(ctx) {
  // Giant floating void horror — tentacles and massive eye
  const g = ctx.createRadialGradient(-S*0.35,-S*0.35,0,0,0,S*1.3);
  g.addColorStop(0,'#7c3aed'); g.addColorStop(0.4,'#2e1065'); g.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=g; ctx.beginPath(); ctx.arc(0,0,S*1.3,0,Math.PI*2); ctx.fill();
  // tentacles
  ctx.strokeStyle='#4c1d95'; ctx.lineWidth=3;
  for(let i=0;i<6;i++){
    const a=(i/6)*Math.PI*2;
    ctx.beginPath(); ctx.moveTo(Math.cos(a)*S*0.65,Math.sin(a)*S*0.65);
    ctx.quadraticCurveTo(Math.cos(a+0.9)*S*1.4,Math.sin(a+0.9)*S*1.4,Math.cos(a+1.35)*S*1.85,Math.sin(a+1.35)*S*1.85); ctx.stroke();
    // sucker tips
    ctx.fillStyle='#7c3aed'; ctx.beginPath(); ctx.arc(Math.cos(a+1.35)*S*1.85,Math.sin(a+1.35)*S*1.85,S*0.12,0,Math.PI*2); ctx.fill();
  }
  // massive central eye with vertical slit
  ctx.fillStyle='#ffd60a'; ctx.shadowColor='#ffd60a'; ctx.shadowBlur=20;
  ctx.beginPath(); ctx.ellipse(0,0,S*0.42,S*0.28,0,0,Math.PI*2); ctx.fill(); ctx.shadowBlur=0;
  ctx.fillStyle='rgba(10,0,20,0.95)'; ctx.beginPath(); ctx.ellipse(0,0,S*0.14,S*0.25,0,0,Math.PI*2); ctx.fill();
  // eye veins
  ctx.strokeStyle='rgba(200,0,0,0.6)'; ctx.lineWidth=0.8;
  for(let i=0;i<5;i++){
    const a=(i/5)*Math.PI*2;
    ctx.beginPath(); ctx.moveTo(Math.cos(a)*S*0.14,Math.sin(a)*S*0.14); ctx.lineTo(Math.cos(a)*S*0.38,Math.sin(a)*S*0.24); ctx.stroke();
  }
}

// ── BOSS MONSTERS ─────────────────────────────────────────────────────────────

export function drawBossMeadow(ctx) {
  // Forest Drake — massive green dragon boss
  ctx.fillStyle=radGrad(ctx,0,S*0.3,S*1.5,'#4ade80','#14532d');
  ctx.beginPath(); ctx.ellipse(0,S*0.35,S*1.85,S*1.05,0,0,Math.PI*2); ctx.fill();
  // bark-like scale texture
  ctx.strokeStyle='#166534'; ctx.lineWidth=1.5;
  for(let i=0;i<5;i++){const y=-S*0.5+i*S*0.4; ctx.beginPath(); ctx.moveTo(-S*1.5,y); ctx.quadraticCurveTo(0,y+S*0.2,S*1.5,y); ctx.stroke();}
  // wings
  ctx.fillStyle='rgba(22,101,52,0.7)';
  [[-1],[1]].forEach(([d])=>{
    ctx.save(); ctx.translate(d*S*0.6,-S*0.3); ctx.rotate(d*0.75);
    ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(d*S*1.9,-S*1.25); ctx.lineTo(d*S*1.55,S*0.65); ctx.closePath(); ctx.fill();
    // wing spines
    ctx.strokeStyle='#052e16'; ctx.lineWidth=2;
    [0.35,0.65,0.9].forEach(t=>{ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(d*S*1.9*t,-S*1.25*t); ctx.stroke();});
    ctx.restore();
  });
  // head
  ctx.save(); ctx.translate(S*1.35,-S*0.4);
  sphere(ctx,S*0.82,'#16a34a');
  ctx.fillStyle='#14532d'; ctx.beginPath(); ctx.ellipse(S*0.55,S*0.05,S*0.5,S*0.25,0.25,0,Math.PI*2); ctx.fill();
  // nostril fire
  ctx.fillStyle='rgba(255,200,0,0.7)'; ctx.shadowColor='#ff8c00'; ctx.shadowBlur=14;
  ctx.beginPath(); ctx.moveTo(S*0.8,-S*0.1); ctx.lineTo(S*1.8,-S*0.35); ctx.lineTo(S*1.75,S*0.1); ctx.lineTo(S*0.8,S*0.05); ctx.closePath(); ctx.fill(); ctx.shadowBlur=0;
  glowEyes(ctx,-S*0.1,-S*0.2,S*0.38,-S*0.25,S*0.2,'#ffd60a');
  // teeth
  ctx.fillStyle='#fff';
  [-S*0.22,-S*0.04,S*0.14,S*0.32].forEach(x=>{ctx.beginPath(); ctx.moveTo(x+S*0.55,S*0.15); ctx.lineTo(x+S*0.65,S*0.4); ctx.lineTo(x+S*0.45+S*0.1,S*0.15); ctx.fill();});
  ctx.restore();
}

export function drawBossDungeon(ctx) {
  // Dungeon Overlord — giant undead abomination
  roundRect(ctx,-S*1.0,-S*1.05,S*2.0,S*2.4,8,'#2d1a0e');
  ctx.strokeStyle='#6b4c2a'; ctx.lineWidth=2;
  for(let i=-3;i<=3;i++){ctx.beginPath(); ctx.moveTo(-S*0.85,i*S*0.35); ctx.lineTo(S*0.85,i*S*0.35); ctx.stroke();}
  // bone protrusions
  ctx.fillStyle='#c8baa8';
  [[-S*1.05,-S*0.4],[S*1.05,-S*0.4],[-S*1.05,S*0.2],[S*1.05,S*0.2]].forEach(([x,y])=>{
    ctx.save(); ctx.translate(x,y); const d=x<0?1:-1;
    ctx.beginPath(); ctx.moveTo(0,-S*0.35); ctx.lineTo(d*S*0.4,0); ctx.lineTo(0,S*0.35); ctx.closePath(); ctx.fill(); ctx.restore();
  });
  ctx.translate(0,-S*1.05);
  sphere(ctx,S*0.85,'#2d1a0e');
  ctx.fillStyle='#1a0f08'; ctx.beginPath(); ctx.arc(0,0,S*0.85,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#5c3a1e'; ctx.beginPath(); ctx.arc(0,0,S*0.78,0,Math.PI*2); ctx.fill();
  // crown of bones
  ctx.fillStyle='#c8baa8';
  [-S*0.52,-S*0.2,S*0.2,S*0.52].forEach(x=>{
    ctx.save(); ctx.translate(x,-S*0.7); ctx.fillRect(-S*0.1,0,S*0.2,x===0||x===-S*0.2||x===S*0.2?S*0.42:S*0.32); ctx.restore();
  });
  glowEyes(ctx,-S*0.3,-S*0.12,S*0.3,-S*0.12,S*0.22,'#ef4444');
  // gaping maw
  ctx.fillStyle='#0a0500'; ctx.beginPath(); ctx.ellipse(0,S*0.28,S*0.48,S*0.26,0,0,Math.PI); ctx.fill();
  ctx.fillStyle='#c8baa8';
  [-S*0.32,-S*0.12,S*0.12,S*0.32].forEach(x=>{ctx.fillRect(x-S*0.06,S*0.28,S*0.12,S*0.22);});
}

export function drawBossVolcano(ctx) {
  // Flame Titan — lava-dripping giant
  roundRect(ctx,-S*1.1,-S*1.1,S*2.2,S*2.8,8,'#7f1d1d');
  // lava seams
  ctx.strokeStyle='#fbbf24'; ctx.lineWidth=2.5; ctx.shadowColor='#f97316'; ctx.shadowBlur=12;
  ctx.beginPath(); ctx.moveTo(-S*0.7,-S*0.8); ctx.lineTo(S*0.2,S*0.35); ctx.lineTo(S*0.75,-S*0.55); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-S*0.4,S*0.55); ctx.lineTo(S*0.65,S*0.1); ctx.stroke();
  ctx.shadowBlur=0;
  // magma drips
  [[-S*0.6,S*1.1],[S*0.5,S*1.2],[S*0.1,S*1.0]].forEach(([x,y])=>{
    const dg=ctx.createRadialGradient(x,y,0,x,y,S*0.25);
    dg.addColorStop(0,'#fff'); dg.addColorStop(0.3,'#fbbf24'); dg.addColorStop(1,'rgba(249,115,22,0)');
    ctx.fillStyle=dg; ctx.beginPath(); ctx.arc(x,y,S*0.25,0,Math.PI*2); ctx.fill();
  });
  ctx.translate(0,-S*1.15);
  sphere(ctx,S*0.9,'#991b1b');
  // magma face cracks
  ctx.strokeStyle='#fbbf24'; ctx.lineWidth=2; ctx.shadowColor='#fbbf24'; ctx.shadowBlur=8;
  ctx.beginPath(); ctx.moveTo(-S*0.4,S*0.3); ctx.lineTo(-S*0.1,-S*0.2); ctx.lineTo(S*0.35,S*0.1); ctx.stroke(); ctx.shadowBlur=0;
  // massive horns
  ctx.fillStyle='#450a0a';
  [[-1],[1]].forEach(([d])=>{
    ctx.save(); ctx.translate(d*S*0.5,-S*0.65); ctx.rotate(d*0.5);
    ctx.beginPath(); ctx.moveTo(0,0); ctx.quadraticCurveTo(d*S*0.65,-S*0.75,d*S*0.42,-S*1.05); ctx.lineTo(d*S*0.12,-S*0.08); ctx.closePath(); ctx.fill(); ctx.restore();
  });
  glowEyes(ctx,-S*0.32,-S*0.14,S*0.32,-S*0.14,S*0.24,'#fbbf24');
}

export function drawBossAbyss(ctx) {
  // Frost Colossus — crystalline ice giant
  roundRect(ctx,-S*1.15,-S*1.2,S*2.3,S*2.9,8,'#1e3a8a');
  // ice shard armor
  ctx.fillStyle='rgba(147,197,253,0.5)';
  [[-S*0.9,-S*0.5,0.4],[S*0.75,-S*0.4,-0.35],[-S*0.65,S*0.45,0.25],[S*0.85,S*0.3,-0.3]].forEach(([x,y,r])=>{
    ctx.save(); ctx.translate(x,y); ctx.rotate(r);
    ctx.beginPath(); ctx.moveTo(0,-S*0.75); ctx.lineTo(-S*0.22,S*0.3); ctx.lineTo(S*0.22,S*0.3); ctx.closePath(); ctx.fill(); ctx.restore();
  });
  // shoulder ice spikes
  [[-S*1.15,-S*0.35],[S*1.15,-S*0.35]].forEach(([x,y])=>{
    ctx.save(); ctx.translate(x,y); ctx.fillStyle='#bfdbfe';
    ctx.beginPath(); ctx.moveTo(0,-S*0.6); ctx.lineTo(-S*0.22,S*0.2); ctx.lineTo(S*0.22,S*0.2); ctx.closePath(); ctx.fill(); ctx.restore();
  });
  ctx.translate(0,-S*1.18);
  sphere(ctx,S*0.92,'#1d4ed8');
  // icy crown
  ctx.fillStyle='#93c5fd'; ctx.fillRect(-S*0.82,-S*0.48,S*1.64,S*0.2);
  // icicle beard
  ctx.fillStyle='#bfdbfe';
  [-S*0.48,-S*0.2,S*0.08,S*0.36].forEach(x=>{ctx.fillRect(x,S*0.32,S*0.16,S*0.48+Math.abs(x)*0.2);});
  glowEyes(ctx,-S*0.32,-S*0.12,S*0.32,-S*0.12,S*0.22,'#7dd3fc');
}

export function drawBossShadow(ctx) {
  // Shadow Sovereign — giant cosmic void entity
  const g = ctx.createRadialGradient(-S*0.5,-S*0.5,0,0,0,S*1.75);
  g.addColorStop(0,'#7c3aed'); g.addColorStop(0.3,'#2e1065'); g.addColorStop(0.7,'#0a0010'); g.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=g; ctx.beginPath(); ctx.arc(0,0,S*1.75,0,Math.PI*2); ctx.fill();
  // massive void tendrils
  ctx.strokeStyle='#6d28d9'; ctx.lineWidth=3.5;
  for(let i=0;i<8;i++){
    const a=(i/8)*Math.PI*2;
    ctx.beginPath(); ctx.moveTo(Math.cos(a)*S*0.85,Math.sin(a)*S*0.85);
    ctx.quadraticCurveTo(Math.cos(a+0.7)*S*1.8,Math.sin(a+0.7)*S*1.8,Math.cos(a+1.15)*S*2.4,Math.sin(a+1.15)*S*2.4); ctx.stroke();
    ctx.fillStyle='#4c1d95'; ctx.beginPath(); ctx.arc(Math.cos(a+1.15)*S*2.4,Math.sin(a+1.15)*S*2.4,S*0.18,0,Math.PI*2); ctx.fill();
  }
  // three cosmic eyes
  [[0,-S*0.25,S*0.38,S*0.24],[-S*0.58,S*0.38,S*0.22,S*0.14],[S*0.58,S*0.38,S*0.22,S*0.14]].forEach(([x,y,rx,ry],i)=>{
    ctx.fillStyle='#ffd60a'; ctx.shadowColor='#ffd60a'; ctx.shadowBlur=20+i*5;
    ctx.beginPath(); ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2); ctx.fill(); ctx.shadowBlur=0;
    ctx.fillStyle='rgba(10,0,20,0.95)'; ctx.beginPath(); ctx.ellipse(x,y,rx*0.35,ry*0.85,0,0,Math.PI*2); ctx.fill();
  });
}

export function drawGenericBoss(ctx, color='#ef4444') {
  sphere(ctx,S*1.6,color);
  ctx.fillStyle='#000a'; ctx.beginPath();
  ctx.arc(-S*0.5,-S*0.2,S*0.35,0,Math.PI*2); ctx.arc(S*0.5,-S*0.2,S*0.35,0,Math.PI*2); ctx.fill();
  glowEyes(ctx,-S*0.5,-S*0.2,S*0.5,-S*0.2,S*0.18,color);
  ctx.fillStyle='#fff';
  [-S*0.4,-S*0.15,S*0.15,S*0.4].forEach(x=>{ctx.fillRect(x-S*0.1,S*0.28,S*0.18,S*0.38);});
}

// ── Master dispatcher ──────────────────────────────────────────────────────────

const DRAW_MAP = {
  // Land 1 — Verdant Meadow
  peasant:      drawPeasant,
  soldier:      drawSoldier,
  knight:       drawKnight,
  horseman:     drawHorseman,
  // Land 2 — Dark Dungeon
  skeleton:     drawSkeleton,
  wraith:       drawWraith,
  necromancer:  drawNecromancer,
  king:         drawKing,
  // Land 3 — Volcanic Wastes
  demon:        drawDemon,
  golem:        drawGolem,
  lavaSpawn:    drawLavaSpawn,
  firedrake:    drawFiredrake,
  // Land 4 — Frozen Abyss
  specter:      drawSpecter,
  frostGiant:   drawFrostGiant,
  iceWalker:    drawIceWalker,
  shadow:       drawShadow,
  // Land 5+ — Shadow Realm & beyond
  voidling:     drawVoidling,
  soulReaper:   drawSoulReaper,
  doomKnight:   drawDoomKnight,
  abyssLord:    drawAbyssLord,
  // Bosses
  boss_meadow:   drawBossMeadow,
  boss_dungeon:  drawBossDungeon,
  boss_volcano:  drawBossVolcano,
  boss_abyss:    drawBossAbyss,
  boss_shadow:   drawBossShadow,
};

export function drawEnemyGraphic(ctx, type, isBoss) {
  const fn = DRAW_MAP[type];
  if (fn) { fn(ctx); return; }
  if (isBoss) { drawGenericBoss(ctx); return; }
  sphere(ctx, S*0.85, '#6b7280');
}