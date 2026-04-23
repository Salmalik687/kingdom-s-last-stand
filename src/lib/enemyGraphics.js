/**
 * enemyGraphics.js — Advanced 3D-style enemy rendering
 * All draw functions render centered at (0,0).
 * Uses layered radial gradients, specular highlights, rim lighting,
 * and subsurface-scattering tricks for a 3D sculpted look.
 */

const S = 14; // base size unit

// ── Core 3D helpers ────────────────────────────────────────────────────────────

/** Sphere with 3-stop radial gradient + specular highlight */
function sphere3D(ctx, x, y, r, shadow, mid, light, specularAlpha = 0.55) {
  // Main body gradient (off-center highlight = 3D lighting)
  const g = ctx.createRadialGradient(x - r * 0.32, y - r * 0.38, r * 0.04, x, y, r);
  g.addColorStop(0, light);
  g.addColorStop(0.45, mid);
  g.addColorStop(1, shadow);
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  // Specular hotspot
  const sp = ctx.createRadialGradient(x - r * 0.28, y - r * 0.35, 0, x - r * 0.22, y - r * 0.28, r * 0.38);
  sp.addColorStop(0, `rgba(255,255,255,${specularAlpha})`);
  sp.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = sp;
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  // Rim light (opposite side)
  const rim = ctx.createRadialGradient(x + r * 0.6, y + r * 0.5, 0, x + r * 0.5, y + r * 0.45, r * 0.5);
  rim.addColorStop(0, 'rgba(100,180,255,0.18)');
  rim.addColorStop(1, 'rgba(100,180,255,0)');
  ctx.fillStyle = rim;
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
}

/** Drop shadow beneath character */
function dropShadow(ctx, r) {
  const sg = ctx.createRadialGradient(0, S * 0.2, 0, 0, S * 0.2, r);
  sg.addColorStop(0, 'rgba(0,0,0,0.45)');
  sg.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = sg;
  ctx.beginPath(); ctx.ellipse(0, S * 0.85, r * 0.9, r * 0.28, 0, 0, Math.PI * 2); ctx.fill();
}

/** Glowing eye with pupil + iris */
function eye3D(ctx, x, y, r, irisColor, pupilColor = '#000') {
  // Sclera
  sphere3D(ctx, x, y, r, '#d0d8e8', '#e8eef8', '#ffffff', 0.7);
  // Iris
  const ig = ctx.createRadialGradient(x - r * 0.15, y - r * 0.15, 0, x, y, r * 0.72);
  ig.addColorStop(0, irisColor); ig.addColorStop(1, '#000');
  ctx.fillStyle = ig;
  ctx.beginPath(); ctx.arc(x, y, r * 0.72, 0, Math.PI * 2); ctx.fill();
  // Pupil
  ctx.fillStyle = pupilColor;
  ctx.beginPath(); ctx.arc(x, y, r * 0.32, 0, Math.PI * 2); ctx.fill();
  // Catchlight
  ctx.fillStyle = 'rgba(255,255,255,0.88)';
  ctx.beginPath(); ctx.arc(x - r * 0.2, y - r * 0.2, r * 0.2, 0, Math.PI * 2); ctx.fill();
}

/** Glowing orb (eyes for shadow creatures) */
function glowEye(ctx, x, y, r, color) {
  ctx.save();
  ctx.shadowColor = color; ctx.shadowBlur = 14;
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, '#fff'); g.addColorStop(0.3, color); g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  ctx.shadowBlur = 0;
  ctx.restore();
}

/** Metallic plate panel */
function metalPlate(ctx, x, y, w, h, baseColor, lightColor, angle = 0) {
  ctx.save();
  ctx.translate(x + w / 2, y + h / 2); ctx.rotate(angle);
  const g = ctx.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2);
  g.addColorStop(0, lightColor); g.addColorStop(0.4, baseColor); g.addColorStop(0.7, baseColor); g.addColorStop(1, '#000');
  ctx.fillStyle = g;
  ctx.fillRect(-w / 2, -h / 2, w, h);
  ctx.restore();
}

// ── LAND 1 : Verdant Meadow ───────────────────────────────────────────────────

export function drawPeasant(ctx) {
  ctx.save();
  dropShadow(ctx, S * 0.85);
  // Body — 3D tunic with fabric folds
  sphere3D(ctx, 0, 0, S * 0.72, '#2d4a10', '#5a8a2a', '#8abf50', 0.35);
  // Fabric fold lines
  ctx.save();
  ctx.strokeStyle = 'rgba(0,0,0,0.25)'; ctx.lineWidth = 1;
  for (let i = -1; i <= 1; i++) {
    ctx.beginPath(); ctx.arc(i * S * 0.25, S * 0.15, S * 0.35, 0.3, Math.PI - 0.3); ctx.stroke();
  }
  ctx.restore();
  // Arms
  sphere3D(ctx, -S * 0.82, S * 0.08, S * 0.25, '#1e3808', '#4a7a20', '#70aa40', 0.4);
  sphere3D(ctx,  S * 0.82, S * 0.08, S * 0.25, '#1e3808', '#4a7a20', '#70aa40', 0.4);
  // Head
  ctx.save(); ctx.translate(0, -S * 0.72);
  sphere3D(ctx, 0, 0, S * 0.48, '#7a4a20', '#c09060', '#e8c090', 0.45);
  // Angry brows
  ctx.strokeStyle = '#3a1a00'; ctx.lineWidth = 2; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-S*0.38,-S*0.2); ctx.lineTo(-S*0.1,-S*0.06); ctx.stroke();
  ctx.beginPath(); ctx.moveTo( S*0.38,-S*0.2); ctx.lineTo( S*0.1,-S*0.06); ctx.stroke();
  eye3D(ctx, -S * 0.22, -S * 0.07, S * 0.13, '#cc3300');
  eye3D(ctx,  S * 0.22, -S * 0.07, S * 0.13, '#cc3300');
  // jagged mouth
  ctx.strokeStyle = '#4a2000'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(-S*0.22,S*0.18); ctx.lineTo(-S*0.1,S*0.3); ctx.lineTo(S*0.05,S*0.16); ctx.lineTo(S*0.22,S*0.3); ctx.stroke();
  // Straw hat
  ctx.fillStyle = '#c8a840';
  ctx.beginPath(); ctx.ellipse(0, -S * 0.48, S * 0.55, S * 0.12, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#a88030';
  ctx.beginPath(); ctx.moveTo(-S * 0.35, -S * 0.48); ctx.lineTo(0, -S * 0.95); ctx.lineTo(S * 0.35, -S * 0.48); ctx.fill();
  ctx.restore();
  // Pitchfork
  ctx.save(); ctx.translate(S * 0.88, S * 0.05);
  ctx.strokeStyle = '#6a4020'; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(0, -S * 1.1); ctx.lineTo(0, S * 0.5); ctx.stroke();
  ctx.strokeStyle = '#b0a060'; ctx.lineWidth = 1.8;
  [-S*0.14, 0, S*0.14].forEach(x => { ctx.beginPath(); ctx.moveTo(x,-S*1.1); ctx.lineTo(x,-S*0.65); ctx.stroke(); });
  ctx.restore();
  ctx.restore();
}

export function drawSoldier(ctx) {
  ctx.save();
  dropShadow(ctx, S * 0.9);
  // Armored body — metallic green
  sphere3D(ctx, 0, 0, S * 0.78, '#243010', '#507838', '#88b860', 0.5);
  // Chain-mail texture
  ctx.save(); ctx.globalAlpha = 0.3; ctx.strokeStyle = '#fff'; ctx.lineWidth = 0.7;
  for (let i = -3; i <= 3; i++) {
    ctx.beginPath(); ctx.moveTo(-S*0.65, i*S*0.25); ctx.lineTo(S*0.65, i*S*0.25); ctx.stroke();
  }
  ctx.restore();
  // Shoulder pads
  sphere3D(ctx, -S * 0.82, -S * 0.25, S * 0.28, '#1a2808', '#3a5820', '#609040', 0.55);
  sphere3D(ctx,  S * 0.82, -S * 0.25, S * 0.28, '#1a2808', '#3a5820', '#609040', 0.55);
  // Head with 3D helmet
  ctx.save(); ctx.translate(0, -S * 0.78);
  sphere3D(ctx, 0, 0, S * 0.52, '#7a5030', '#b88050', '#e0a870', 0.45);
  // Helmet dome
  const hg = ctx.createRadialGradient(-S*0.2, -S*0.4, 0, 0, 0, S*0.56);
  hg.addColorStop(0, '#a0b878'); hg.addColorStop(0.6, '#607840'); hg.addColorStop(1, '#1a2808');
  ctx.fillStyle = hg;
  ctx.beginPath(); ctx.arc(0, -S*0.15, S*0.54, Math.PI, 0); ctx.fill();
  ctx.fillRect(-S*0.54, -S*0.15, S*1.08, S*0.24);
  // Nose guard
  ctx.fillStyle = '#405028';
  ctx.fillRect(-S*0.07, -S*0.12, S*0.14, S*0.3);
  // Visor slit glow
  ctx.fillStyle = '#ff6600'; ctx.shadowColor = '#ff6600'; ctx.shadowBlur = 8;
  ctx.fillRect(-S*0.42, -S*0.05, S*0.84, S*0.07);
  ctx.shadowBlur = 0;
  ctx.restore();
  ctx.restore();
}

export function drawKnight(ctx) {
  ctx.save();
  dropShadow(ctx, S);
  // Heavy plate — dark steel
  sphere3D(ctx, 0, 0, S * 0.9, '#1a2530', '#506070', '#90aac0', 0.6);
  // Plate highlight band
  ctx.save();
  const ph = ctx.createLinearGradient(-S*0.6, -S*0.5, S*0.5, S*0.3);
  ph.addColorStop(0, 'rgba(200,220,255,0.22)'); ph.addColorStop(1, 'rgba(200,220,255,0)');
  ctx.fillStyle = ph; ctx.beginPath(); ctx.arc(0, 0, S*0.9, 0, Math.PI*2); ctx.fill();
  ctx.restore();
  // Shield
  ctx.save(); ctx.translate(-S * 1.05, S * 0.05);
  const sg = ctx.createLinearGradient(-S*0.35, -S*0.55, S*0.35, S*0.55);
  sg.addColorStop(0, '#cc3030'); sg.addColorStop(0.5, '#8B1a00'); sg.addColorStop(1, '#3a0a00');
  ctx.fillStyle = sg;
  ctx.beginPath(); ctx.moveTo(-S*0.32,-S*0.5); ctx.lineTo(S*0.32,-S*0.5); ctx.lineTo(S*0.32,S*0.18); ctx.lineTo(0,S*0.52); ctx.lineTo(-S*0.32,S*0.18); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#ffd60a'; ctx.lineWidth = 1.8; ctx.stroke();
  // Shield specular
  ctx.fillStyle = 'rgba(255,255,255,0.15)';
  ctx.beginPath(); ctx.ellipse(-S*0.08, -S*0.18, S*0.15, S*0.28, -0.3, 0, Math.PI*2); ctx.fill();
  ctx.restore();
  // Helm
  ctx.save(); ctx.translate(0, -S * 0.85);
  sphere3D(ctx, 0, 0, S * 0.58, '#1a2530', '#455870', '#7090b0', 0.65);
  // Visor
  ctx.fillStyle = '#ff2200'; ctx.shadowColor = '#ff3300'; ctx.shadowBlur = 14;
  ctx.fillRect(-S*0.4, -S*0.06, S*0.8, S*0.12);
  ctx.shadowBlur = 0;
  // Crest feather
  ctx.fillStyle = '#cc2020';
  ctx.beginPath(); ctx.moveTo(-S*0.06,-S*0.58); ctx.quadraticCurveTo(S*0.35,-S*1.2,-S*0.15,-S*0.58); ctx.fill();
  ctx.restore();
  ctx.restore();
}

export function drawHorseman(ctx) {
  ctx.save();
  dropShadow(ctx, S * 1.3);
  // Horse — chestnut with muscle shading
  ctx.save(); ctx.translate(0, S * 0.45);
  sphere3D(ctx, 0, 0, S * 1.12, '#5a3010', '#b07040', '#dda060', 0.38);
  // Muscle highlight
  ctx.fillStyle = 'rgba(255,200,150,0.15)'; ctx.beginPath(); ctx.ellipse(-S*0.25, -S*0.3, S*0.55, S*0.35, -0.4, 0, Math.PI*2); ctx.fill();
  // Legs
  [[-S*0.62,S*0.7],[S*0.62,S*0.7],[-S*0.28,S*0.78],[S*0.28,S*0.78]].forEach(([x,y]) => {
    const lg = ctx.createLinearGradient(x-S*0.1, y, x+S*0.1, y+S*0.5);
    lg.addColorStop(0, '#9a6030'); lg.addColorStop(1, '#3a1a08');
    ctx.fillStyle = lg; ctx.fillRect(x-S*0.11, y, S*0.22, S*0.52);
    // Hoof
    ctx.fillStyle = '#0a0500'; ctx.beginPath(); ctx.ellipse(x, y+S*1.22, S*0.14, S*0.09, 0, 0, Math.PI*2); ctx.fill();
  });
  // Mane
  ctx.fillStyle = '#3a2010';
  ctx.beginPath(); ctx.moveTo(-S*0.4,-S*0.85); ctx.quadraticCurveTo(-S*0.6,-S*0.4,-S*0.55,S*0.2); ctx.lineTo(-S*0.38,S*0.2); ctx.quadraticCurveTo(-S*0.42,-S*0.38,-S*0.22,-S*0.8); ctx.closePath(); ctx.fill();
  ctx.restore();
  // Rider
  ctx.save(); ctx.translate(S*0.18, -S*0.2);
  sphere3D(ctx, 0, 0, S*0.56, '#243010', '#507838', '#80b058', 0.4);
  ctx.translate(0, -S*0.52);
  sphere3D(ctx, 0, 0, S*0.42, '#7a4a20', '#c09060', '#e8c090', 0.45);
  eye3D(ctx, -S*0.17, -S*0.05, S*0.11, '#cc3300');
  eye3D(ctx,  S*0.17, -S*0.05, S*0.11, '#cc3300');
  ctx.restore();
  ctx.restore();
}

// ── LAND 2 : Dark Dungeon ─────────────────────────────────────────────────────

export function drawSkeleton(ctx) {
  ctx.save();
  dropShadow(ctx, S * 0.85);
  // Rib cage — ivory bone
  sphere3D(ctx, 0, 0, S * 0.72, '#5a4a30', '#c0aa80', '#e8d8b8', 0.38);
  // Rib lines engraved
  ctx.save(); ctx.strokeStyle = 'rgba(60,40,10,0.4)'; ctx.lineWidth = 1.5;
  for (let i = -2; i <= 2; i++) {
    ctx.beginPath(); ctx.arc(0, i*S*0.2, S*0.44, -Math.PI*0.68, Math.PI*0.68); ctx.stroke();
  }
  ctx.restore();
  // Skull
  ctx.save(); ctx.translate(0, -S*0.68);
  sphere3D(ctx, 0, 0, S*0.54, '#8a7a58', '#d8c8a0', '#f8eedd', 0.4);
  // Eye sockets — hollow 3D depth
  ctx.fillStyle = '#0a0505';
  ctx.beginPath(); ctx.ellipse(-S*0.2,-S*0.08,S*0.17,S*0.13,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse( S*0.2,-S*0.08,S*0.17,S*0.13,0,0,Math.PI*2); ctx.fill();
  // Inner glow
  glowEye(ctx, -S*0.2, -S*0.08, S*0.07, '#a855f7');
  glowEye(ctx,  S*0.2, -S*0.08, S*0.07, '#a855f7');
  // Nasal cavity
  ctx.fillStyle = '#1a1008'; ctx.beginPath(); ctx.ellipse(0,S*0.1,S*0.08,S*0.12,0,0,Math.PI*2); ctx.fill();
  // Teeth
  ctx.fillStyle = '#f0eedd';
  [-S*0.2,-S*0.06,S*0.08,S*0.22].forEach(x => { ctx.fillRect(x,S*0.2,S*0.1,S*0.2); });
  ctx.restore();
  ctx.restore();
}

export function drawWraith(ctx) {
  ctx.save();
  // Swirling ectoplasm aura
  const g = ctx.createRadialGradient(-S*0.2, -S*0.25, 0, 0, S*0.1, S*1.15);
  g.addColorStop(0, 'rgba(220,160,255,0.95)');
  g.addColorStop(0.35, 'rgba(139,80,220,0.65)');
  g.addColorStop(0.7, 'rgba(76,29,149,0.3)');
  g.addColorStop(1, 'rgba(76,29,149,0)');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0,S*0.1,S*1.15,0,Math.PI*2); ctx.fill();
  // Wispy tail
  ctx.fillStyle = 'rgba(124,58,237,0.35)';
  ctx.beginPath(); ctx.moveTo(-S*0.75,S*0.55); ctx.quadraticCurveTo(-S*0.95,S*1.4,-S*0.4,S*1.72); ctx.quadraticCurveTo(0,S*1.1,S*0.4,S*1.72); ctx.quadraticCurveTo(S*0.95,S*1.4,S*0.75,S*0.55); ctx.closePath(); ctx.fill();
  // Spectral face
  sphere3D(ctx, 0, 0, S*0.5, '#5a2890', '#b080e8', '#e0ccff', 0.35);
  // Eye sockets
  ctx.fillStyle = '#050010';
  ctx.beginPath(); ctx.ellipse(-S*0.18,-S*0.08,S*0.15,S*0.12,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse( S*0.18,-S*0.08,S*0.15,S*0.12,0,0,Math.PI*2); ctx.fill();
  glowEye(ctx,-S*0.18,-S*0.08,S*0.07,'#d084fc');
  glowEye(ctx, S*0.18,-S*0.08,S*0.07,'#d084fc');
  ctx.restore();
}

export function drawNecromancer(ctx) {
  ctx.save();
  dropShadow(ctx, S * 0.9);
  // Robe with folds — deep violet
  const rg = ctx.createLinearGradient(-S*0.75, -S*0.5, S*0.75, S*0.9);
  rg.addColorStop(0, '#4a1878'); rg.addColorStop(0.5, '#2d1b4e'); rg.addColorStop(1, '#0e0518');
  ctx.fillStyle = rg;
  ctx.beginPath(); ctx.moveTo(-S*0.75,S*0.9); ctx.lineTo(S*0.75,S*0.9); ctx.lineTo(S*0.52,-S*0.5); ctx.lineTo(-S*0.52,-S*0.5); ctx.closePath(); ctx.fill();
  // Robe shine
  ctx.fillStyle = 'rgba(140,80,220,0.18)';
  ctx.beginPath(); ctx.ellipse(-S*0.15, S*0.2, S*0.22, S*0.5, -0.2, 0, Math.PI*2); ctx.fill();
  // Head
  ctx.save(); ctx.translate(0,-S*0.65);
  sphere3D(ctx, 0, 0, S*0.52, '#5a3018', '#a07840', '#c8a060', 0.4);
  // Dark hood
  const hood = ctx.createLinearGradient(0,-S*0.95,0,S*0.1);
  hood.addColorStop(0,'#1e0a3e'); hood.addColorStop(1,'#0a0518');
  ctx.fillStyle = hood;
  ctx.beginPath(); ctx.moveTo(-S*0.58,S*0.08); ctx.lineTo(S*0.58,S*0.08); ctx.lineTo(0,-S*0.95); ctx.closePath(); ctx.fill();
  glowEye(ctx,-S*0.2,0,S*0.13,'#a855f7');
  glowEye(ctx, S*0.2,0,S*0.13,'#a855f7');
  ctx.restore();
  // Staff
  ctx.save(); ctx.translate(S*0.88,S*0.1);
  const stg = ctx.createLinearGradient(-S*0.05,-S*1.5,S*0.05,S*0.5);
  stg.addColorStop(0,'#7a5030'); stg.addColorStop(1,'#2a1008');
  ctx.fillStyle = stg; ctx.fillRect(-S*0.07,-S*1.5,S*0.14,S*2.0);
  // Orb
  sphere3D(ctx,0,-S*1.5,S*0.38,'#3a0878','#8833cc','#cc88ff',0.6);
  ctx.shadowColor='#a855f7'; ctx.shadowBlur=18;
  ctx.strokeStyle='#c084fc'; ctx.lineWidth=1.2; ctx.beginPath(); ctx.arc(0,-S*1.5,S*0.42,0,Math.PI*2); ctx.stroke();
  ctx.shadowBlur=0;
  ctx.restore();
  ctx.restore();
}

export function drawKing(ctx) {
  ctx.save();
  dropShadow(ctx, S);
  // Regal undead robe
  sphere3D(ctx, 0, 0, S*0.84, '#1a0830', '#4a1878', '#8040cc', 0.35);
  // Gold trim ring
  ctx.strokeStyle='#ffd60a'; ctx.lineWidth=2; ctx.shadowColor='#ffd60a'; ctx.shadowBlur=6;
  ctx.beginPath(); ctx.arc(0,0,S*0.84,0,Math.PI*2); ctx.stroke(); ctx.shadowBlur=0;
  // Head
  ctx.save(); ctx.translate(0,-S*0.8);
  sphere3D(ctx,0,0,S*0.56,'#2a1808','#5a3828','#8a6048',0.4);
  // Crown
  const cg = ctx.createLinearGradient(-S*0.55,-S*0.55,S*0.55,-S*0.28);
  cg.addColorStop(0,'#ffd60a'); cg.addColorStop(0.5,'#f59e0b'); cg.addColorStop(1,'#78350f');
  ctx.fillStyle=cg; ctx.fillRect(-S*0.55,-S*0.52,S*1.1,S*0.28);
  [[-S*0.38,S*0.35],[0,S*0.45],[S*0.38,S*0.35]].forEach(([ox,oh]) => {
    ctx.fillStyle=cg; ctx.beginPath(); ctx.moveTo(ox-S*0.14,-S*0.52); ctx.lineTo(ox,-S*0.52-oh); ctx.lineTo(ox+S*0.14,-S*0.52); ctx.closePath(); ctx.fill();
  });
  // Gems on crown
  ctx.fillStyle='#ef4444'; ctx.shadowColor='#ef4444'; ctx.shadowBlur=10;
  ctx.beginPath(); ctx.arc(0,-S*0.58,S*0.1,0,Math.PI*2); ctx.fill(); ctx.shadowBlur=0;
  eye3D(ctx,-S*0.22,-S*0.06,S*0.15,'#ff6600','#1a0000');
  eye3D(ctx, S*0.22,-S*0.06,S*0.15,'#ff6600','#1a0000');
  ctx.restore();
  ctx.restore();
}

// ── LAND 3 : Volcanic Wastes ──────────────────────────────────────────────────

export function drawDemon(ctx) {
  ctx.save();
  dropShadow(ctx, S);
  // Muscular red body
  sphere3D(ctx, 0, 0, S*0.87, '#5a0808', '#aa1818', '#e84040', 0.42);
  // Muscle definition
  ctx.fillStyle='rgba(255,120,0,0.18)'; ctx.beginPath(); ctx.ellipse(-S*0.18,0,S*0.28,S*0.5,-0.3,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='rgba(255,120,0,0.12)'; ctx.beginPath(); ctx.ellipse(S*0.2,S*0.15,S*0.22,S*0.4,0.2,0,Math.PI*2); ctx.fill();
  // Horns — curled
  ctx.save(); ctx.translate(-S*0.32,-S*0.48);
  const hnl = ctx.createLinearGradient(0,0,-S*0.15,-S*0.6);
  hnl.addColorStop(0,'#5a0a00'); hnl.addColorStop(1,'#2a0500');
  ctx.fillStyle=hnl; ctx.beginPath(); ctx.moveTo(0,0); ctx.quadraticCurveTo(-S*0.3,-S*0.38,-S*0.1,-S*0.62); ctx.lineTo(S*0.1,-S*0.08); ctx.closePath(); ctx.fill(); ctx.restore();
  ctx.save(); ctx.translate(S*0.32,-S*0.48);
  ctx.fillStyle=hnl; ctx.beginPath(); ctx.moveTo(0,0); ctx.quadraticCurveTo(S*0.3,-S*0.38,S*0.1,-S*0.62); ctx.lineTo(-S*0.1,-S*0.08); ctx.closePath(); ctx.fill(); ctx.restore();
  // Head
  ctx.save(); ctx.translate(0,-S*0.75);
  sphere3D(ctx,0,0,S*0.55,'#5a0808','#b01818','#d83838',0.4);
  ctx.strokeStyle='#2a0000'; ctx.lineWidth=3; ctx.lineCap='round';
  ctx.beginPath(); ctx.moveTo(-S*0.44,-S*0.24); ctx.lineTo(-S*0.1,-S*0.08); ctx.stroke();
  ctx.beginPath(); ctx.moveTo( S*0.44,-S*0.24); ctx.lineTo( S*0.1,-S*0.08); ctx.stroke();
  eye3D(ctx,-S*0.22,-S*0.07,S*0.15,'#ff8800','#0a0000');
  eye3D(ctx, S*0.22,-S*0.07,S*0.15,'#ff8800','#0a0000');
  // Fangs
  ctx.fillStyle='#fff8f0'; ctx.strokeStyle='#c8c0b0'; ctx.lineWidth=0.8;
  [[-S*0.18,S*0.2],[ S*0.18,S*0.2]].forEach(([x,y])=>{ ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x-S*0.05,y+S*0.28); ctx.lineTo(x+S*0.1,y); ctx.closePath(); ctx.fill(); ctx.stroke(); });
  ctx.restore();
  ctx.restore();
}

export function drawGolem(ctx) {
  ctx.save();
  dropShadow(ctx, S*1.15);
  // Massive stone body with rock texture
  sphere3D(ctx, 0, 0, S*1.08, '#1a1a1a', '#5a5a5a', '#909090', 0.45);
  // Rock facets — angled flat planes
  ctx.fillStyle='rgba(200,200,200,0.12)'; ctx.beginPath(); ctx.ellipse(-S*0.3,-S*0.3,S*0.45,S*0.3,-0.5,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='rgba(0,0,0,0.3)'; ctx.beginPath(); ctx.moveTo(-S*0.5,-S*0.6); ctx.lineTo(S*0.2,S*0.38); ctx.lineTo(S*0.62,-S*0.22); ctx.closePath(); ctx.fill();
  // Cracks with glow
  ctx.strokeStyle='rgba(249,115,22,0.7)'; ctx.lineWidth=1.8; ctx.shadowColor='#f97316'; ctx.shadowBlur=8;
  ctx.beginPath(); ctx.moveTo(-S*0.55,-S*0.6); ctx.lineTo(S*0.18,S*0.38); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-S*0.2,S*0.5); ctx.lineTo(S*0.6,S*0.05); ctx.stroke();
  ctx.shadowBlur=0;
  // Moss
  ctx.fillStyle='rgba(60,120,40,0.6)'; ctx.beginPath(); ctx.arc(-S*0.4,-S*0.25,S*0.18,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='rgba(60,120,40,0.5)'; ctx.beginPath(); ctx.arc(S*0.3,S*0.42,S*0.14,0,Math.PI*2); ctx.fill();
  // Head
  ctx.save(); ctx.translate(0,-S*0.92);
  sphere3D(ctx,0,0,S*0.66,'#1a1a1a','#5a5a5a','#888888',0.5);
  ctx.strokeStyle='rgba(249,115,22,0.6)'; ctx.lineWidth=1.5; ctx.shadowColor='#f97316'; ctx.shadowBlur=6;
  ctx.beginPath(); ctx.moveTo(-S*0.1,-S*0.45); ctx.lineTo(S*0.08,S*0.2); ctx.stroke(); ctx.shadowBlur=0;
  glowEye(ctx,-S*0.24,0,S*0.18,'#f97316');
  glowEye(ctx, S*0.24,0,S*0.18,'#f97316');
  ctx.restore();
  ctx.restore();
}

export function drawLavaSpawn(ctx) {
  ctx.save();
  // Outer heat corona
  const corona = ctx.createRadialGradient(0,0,0,0,0,S*1.35);
  corona.addColorStop(0,'rgba(255,255,200,0)'); corona.addColorStop(0.5,'rgba(255,160,0,0.15)'); corona.addColorStop(1,'rgba(200,50,0,0)');
  ctx.fillStyle=corona; ctx.beginPath(); ctx.arc(0,0,S*1.35,0,Math.PI*2); ctx.fill();
  // Molten body
  const g = ctx.createRadialGradient(-S*0.25,-S*0.28,0,0,0,S*1.05);
  g.addColorStop(0,'#ffffff'); g.addColorStop(0.12,'#fff7c0'); g.addColorStop(0.35,'#ff9000'); g.addColorStop(0.7,'#8b1a00'); g.addColorStop(1,'#1a0000');
  ctx.fillStyle=g; ctx.beginPath(); ctx.arc(0,0,S*1.05,0,Math.PI*2); ctx.fill();
  // Lava veins
  ctx.strokeStyle='#ffd60a'; ctx.lineWidth=2; ctx.shadowColor='#ffd60a'; ctx.shadowBlur=10;
  for (let i=0;i<6;i++) { const a=(i/6)*Math.PI*2; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(Math.cos(a)*S*0.85,Math.sin(a)*S*0.85); ctx.stroke(); }
  ctx.shadowBlur=0;
  // White-hot core
  sphere3D(ctx,0,0,S*0.28,'#ff8c00','#ffdd00','#ffffff',0.9);
  ctx.shadowColor='#ffff80'; ctx.shadowBlur=20;
  ctx.fillStyle='rgba(255,255,200,0.6)'; ctx.beginPath(); ctx.arc(0,0,S*0.14,0,Math.PI*2); ctx.fill();
  ctx.shadowBlur=0;
  ctx.restore();
}

export function drawFiredrake(ctx) {
  ctx.save();
  dropShadow(ctx, S*1.2);
  // Dragon body
  sphere3D(ctx,0,0,S*1.02,'#7f1d1d','#cc2a2a','#f04040',0.4);
  // Scale texture
  ctx.save(); ctx.globalAlpha=0.2; ctx.strokeStyle='#5a0808'; ctx.lineWidth=1;
  for(let i=-3;i<=3;i++) for(let j=-3;j<=3;j++) { ctx.beginPath(); ctx.arc(i*S*0.35,j*S*0.28,S*0.2,-Math.PI*0.6,Math.PI*0.6); ctx.stroke(); }
  ctx.restore();
  // Wings — membrane with bone structure
  [[-1],[1]].forEach(([d])=>{
    ctx.save(); ctx.translate(d*S*0.6,-S*0.18); ctx.rotate(d*0.72);
    const wg=ctx.createLinearGradient(0,0,d*S*1.8,S*0.6);
    wg.addColorStop(0,'rgba(180,30,30,0.85)'); wg.addColorStop(1,'rgba(80,10,10,0.4)');
    ctx.fillStyle=wg; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(d*S*2.0,-S*1.3); ctx.lineTo(d*S*1.65,S*0.62); ctx.closePath(); ctx.fill();
    // Wing bones
    ctx.strokeStyle='rgba(100,20,20,0.8)'; ctx.lineWidth=2;
    [0.35,0.65,0.92].forEach(t=>{ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(d*S*2.0*t,-S*1.3*t); ctx.stroke();});
    ctx.restore();
  });
  // Head
  ctx.save(); ctx.translate(S*0.92,-S*0.3);
  sphere3D(ctx,0,0,S*0.52,'#7f1d1d','#bf2a2a','#ef4040',0.42);
  // Snout
  const snout = ctx.createLinearGradient(S*0.05,S*0.05,S*0.82,S*0.1);
  snout.addColorStop(0,'#d02020'); snout.addColorStop(1,'#8a1010');
  ctx.fillStyle=snout; ctx.beginPath(); ctx.ellipse(S*0.45,S*0.06,S*0.4,S*0.22,0.28,0,Math.PI*2); ctx.fill();
  // Nostril glow
  ctx.fillStyle='rgba(255,180,0,0.7)'; ctx.shadowColor='#ff8c00'; ctx.shadowBlur=8;
  ctx.beginPath(); ctx.arc(S*0.78,-S*0.04,S*0.06,0,Math.PI*2); ctx.fill(); ctx.shadowBlur=0;
  eye3D(ctx,-S*0.1,0,S*0.13,'#ff8c00','#0a0000');
  // Fire breath
  ctx.shadowColor='#ff8c00'; ctx.shadowBlur=16;
  const fg=ctx.createLinearGradient(S*0.75,0,S*1.8,0);
  fg.addColorStop(0,'rgba(255,230,100,0.85)'); fg.addColorStop(0.5,'rgba(255,120,0,0.65)'); fg.addColorStop(1,'rgba(255,60,0,0)');
  ctx.fillStyle=fg; ctx.beginPath(); ctx.moveTo(S*0.75,-S*0.08); ctx.lineTo(S*1.82,-S*0.22); ctx.lineTo(S*1.78,S*0.16); ctx.lineTo(S*0.75,S*0.1); ctx.closePath(); ctx.fill();
  ctx.shadowBlur=0;
  ctx.restore();
  ctx.restore();
}

// ── LAND 4 : Frozen Abyss ─────────────────────────────────────────────────────

export function drawSpecter(ctx) {
  ctx.save();
  // Icy ghost aura
  const g=ctx.createRadialGradient(-S*0.18,-S*0.22,0,0,S*0.1,S*1.08);
  g.addColorStop(0,'rgba(220,245,255,0.95)'); g.addColorStop(0.45,'rgba(100,195,245,0.55)'); g.addColorStop(1,'rgba(14,165,233,0)');
  ctx.fillStyle=g; ctx.beginPath(); ctx.arc(0,S*0.1,S*1.08,0,Math.PI*2); ctx.fill();
  // Tail
  ctx.fillStyle='rgba(147,210,250,0.42)';
  ctx.beginPath(); ctx.moveTo(-S*0.65,S*0.5); ctx.quadraticCurveTo(-S*0.82,S*1.4,-S*0.3,S*1.68); ctx.quadraticCurveTo(0,S*1.12,S*0.3,S*1.68); ctx.quadraticCurveTo(S*0.82,S*1.4,S*0.65,S*0.5); ctx.closePath(); ctx.fill();
  // Face
  sphere3D(ctx,0,0,S*0.48,'#2a6898','#70c0e8','#cce8ff',0.5);
  // Eye sockets
  ctx.fillStyle='#050a18'; ctx.beginPath(); ctx.ellipse(-S*0.17,-S*0.07,S*0.14,S*0.1,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(S*0.17,-S*0.07,S*0.14,S*0.1,0,0,Math.PI*2); ctx.fill();
  glowEye(ctx,-S*0.17,-S*0.07,S*0.06,'#38bdf8');
  glowEye(ctx, S*0.17,-S*0.07,S*0.06,'#38bdf8');
  ctx.restore();
}

export function drawFrostGiant(ctx) {
  ctx.save();
  dropShadow(ctx, S*1.2);
  // Glacial body
  sphere3D(ctx,0,0,S*1.08,'#0a1e5a','#1a4ed8','#5090f8',0.5);
  // Ice crystal facets
  ctx.fillStyle='rgba(180,220,255,0.22)'; ctx.beginPath(); ctx.ellipse(-S*0.3,-S*0.28,S*0.44,S*0.28,-0.4,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='rgba(0,0,0,0.28)'; ctx.beginPath(); ctx.moveTo(-S*0.6,-S*0.55); ctx.lineTo(S*0.38,S*0.35); ctx.lineTo(S*0.72,-S*0.22); ctx.closePath(); ctx.fill();
  // Shoulder ice spikes
  [[-S*1.08,-S*0.36],[S*1.08,-S*0.36]].forEach(([x,y])=>{
    const ig=ctx.createLinearGradient(x-S*0.22,y,x+S*0.22,y+S*0.65); ig.addColorStop(0,'#bfdbfe'); ig.addColorStop(1,'#3b82f6');
    ctx.fillStyle=ig; ctx.save(); ctx.translate(x,y); ctx.beginPath(); ctx.moveTo(0,-S*0.68); ctx.lineTo(-S*0.22,S*0.22); ctx.lineTo(S*0.22,S*0.22); ctx.closePath(); ctx.fill(); ctx.restore();
  });
  // Head
  ctx.save(); ctx.translate(0,-S*1.0);
  sphere3D(ctx,0,0,S*0.66,'#0a1e5a','#1a4ed8','#5090f8',0.52);
  // Ice brow plate
  const ibg=ctx.createLinearGradient(-S*0.6,-S*0.45,S*0.6,-S*0.22); ibg.addColorStop(0,'#93c5fd'); ibg.addColorStop(1,'#3b82f6');
  ctx.fillStyle=ibg; ctx.fillRect(-S*0.58,-S*0.44,S*1.16,S*0.2);
  // Icicle beard
  ctx.fillStyle='#bfdbfe';
  [-S*0.4,-S*0.16,S*0.08,S*0.32].forEach(x=>{ ctx.beginPath(); ctx.moveTo(x,S*0.32); ctx.lineTo(x+S*0.08,S*0.32+S*0.48); ctx.lineTo(x+S*0.17,S*0.32); ctx.closePath(); ctx.fill(); });
  eye3D(ctx,-S*0.24,-S*0.06,S*0.17,'#38bdf8','#001a40');
  eye3D(ctx, S*0.24,-S*0.06,S*0.17,'#38bdf8','#001a40');
  ctx.restore();
  ctx.restore();
}

export function drawIceWalker(ctx) {
  ctx.save();
  dropShadow(ctx, S*0.9);
  sphere3D(ctx,0,0,S*0.8,'#0369a1','#38bdf8','#7dd3fc',0.55);
  // Crystal facets
  ctx.strokeStyle='rgba(255,255,255,0.4)'; ctx.lineWidth=1.5;
  ctx.beginPath(); ctx.moveTo(-S*0.55,-S*0.45); ctx.lineTo(S*0.38,S*0.22); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(S*0.52,-S*0.38); ctx.lineTo(-S*0.2,S*0.55); ctx.stroke();
  // Head with ice crown
  ctx.save(); ctx.translate(0,-S*0.75);
  sphere3D(ctx,0,0,S*0.52,'#0369a1','#7dd3fc','#e0f2fe',0.55);
  // Spikes
  [[-S*0.28,-S*0.44,-0.4],[0,-S*0.54,0],[S*0.28,-S*0.44,0.4]].forEach(([x,y,r])=>{
    ctx.save(); ctx.translate(x,y); ctx.rotate(r);
    const sg=ctx.createLinearGradient(0,0,0,-S*0.44); sg.addColorStop(0,'#bfdbfe'); sg.addColorStop(1,'#e0f2fe');
    ctx.fillStyle=sg; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(-S*0.08,-S*0.44); ctx.lineTo(S*0.08,0); ctx.closePath(); ctx.fill(); ctx.restore();
  });
  eye3D(ctx,-S*0.18,-S*0.04,S*0.12,'#38bdf8','#001840');
  eye3D(ctx, S*0.18,-S*0.04,S*0.12,'#38bdf8','#001840');
  ctx.restore();
  ctx.restore();
}

export function drawShadow(ctx) {
  ctx.save();
  // Dark void core
  const g=ctx.createRadialGradient(-S*0.3,-S*0.3,0,0,0,S*1.15);
  g.addColorStop(0,'#6d28d9'); g.addColorStop(0.4,'#1e0a3e'); g.addColorStop(0.8,'#050010'); g.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=g; ctx.beginPath(); ctx.arc(0,0,S*1.15,0,Math.PI*2); ctx.fill();
  // Smoky wisps
  ctx.fillStyle='rgba(109,40,217,0.35)';
  for(let i=0;i<5;i++){ const a=(i/5)*Math.PI*2; ctx.beginPath(); ctx.ellipse(Math.cos(a)*S*0.68,Math.sin(a)*S*0.68,S*0.38,S*0.22,a,0,Math.PI*2); ctx.fill(); }
  // Surface sheen — makes it look 3D
  ctx.fillStyle='rgba(130,80,220,0.18)'; ctx.beginPath(); ctx.ellipse(-S*0.3,-S*0.28,S*0.42,S*0.28,-0.4,0,Math.PI*2); ctx.fill();
  // Glowing eyes
  glowEye(ctx,-S*0.26,-S*0.1,S*0.22,'#a855f7');
  glowEye(ctx, S*0.26,-S*0.1,S*0.22,'#a855f7');
  ctx.fillStyle='#0a000f'; ctx.beginPath(); ctx.arc(-S*0.26,-S*0.1,S*0.1,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc( S*0.26,-S*0.1,S*0.1,0,Math.PI*2); ctx.fill();
  ctx.restore();
}

// ── LAND 5+ : Shadow Realm & Beyond ──────────────────────────────────────────

export function drawVoidling(ctx) {
  ctx.save();
  // Swirling void orb
  const g=ctx.createRadialGradient(-S*0.22,-S*0.22,0,0,0,S*0.98);
  g.addColorStop(0,'#c084fc'); g.addColorStop(0.4,'#6d28d9'); g.addColorStop(0.8,'#1a0838'); g.addColorStop(1,'#000');
  ctx.fillStyle=g; ctx.beginPath(); ctx.arc(0,0,S*0.98,0,Math.PI*2); ctx.fill();
  // Specular highlight
  const sp=ctx.createRadialGradient(-S*0.3,-S*0.35,0,-S*0.2,-S*0.28,S*0.5);
  sp.addColorStop(0,'rgba(220,180,255,0.45)'); sp.addColorStop(1,'rgba(220,180,255,0)');
  ctx.fillStyle=sp; ctx.beginPath(); ctx.arc(0,0,S*0.98,0,Math.PI*2); ctx.fill();
  // Orbit ring
  ctx.save(); const t=(performance.now()*0.001)%Math.PI;
  ctx.strokeStyle='rgba(196,132,252,0.7)'; ctx.lineWidth=2.5;
  ctx.beginPath(); ctx.ellipse(0,0,S*1.22,S*0.32,t,0,Math.PI*2); ctx.stroke(); ctx.restore();
  // Massive eye
  glowEye(ctx,0,0,S*0.32,'#ffd60a');
  ctx.fillStyle='#050010'; ctx.beginPath(); ctx.ellipse(0,0,S*0.1,S*0.22,0,0,Math.PI*2); ctx.fill();
  // Iris refraction ring
  ctx.strokeStyle='rgba(255,210,0,0.3)'; ctx.lineWidth=1;
  ctx.beginPath(); ctx.ellipse(0,0,S*0.38,S*0.25,0,0,Math.PI*2); ctx.stroke();
  ctx.restore();
}

export function drawSoulReaper(ctx) {
  ctx.save();
  dropShadow(ctx, S*0.9);
  // Robe with depth
  const rg=ctx.createLinearGradient(-S*0.75,S*0.95,S*0.3,-S*0.5);
  rg.addColorStop(0,'#080510'); rg.addColorStop(0.5,'#120a22'); rg.addColorStop(1,'#1e1035');
  ctx.fillStyle=rg; ctx.beginPath(); ctx.moveTo(-S*0.75,S*0.95); ctx.lineTo(S*0.75,S*0.95); ctx.lineTo(S*0.55,-S*0.5); ctx.lineTo(-S*0.55,-S*0.5); ctx.closePath(); ctx.fill();
  // Robe specular edge
  ctx.fillStyle='rgba(109,40,217,0.22)'; ctx.beginPath(); ctx.ellipse(-S*0.2,S*0.2,S*0.2,S*0.5,-0.25,0,Math.PI*2); ctx.fill();
  // Skull
  ctx.save(); ctx.translate(0,-S*0.62);
  sphere3D(ctx,0,0,S*0.52,'#5a4a30','#c8b890','#f0e8d8',0.4);
  ctx.fillStyle='#0a001a'; ctx.beginPath(); ctx.ellipse(-S*0.17,-S*0.07,S*0.14,S*0.1,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(S*0.17,-S*0.07,S*0.14,S*0.1,0,0,Math.PI*2); ctx.fill();
  glowEye(ctx,-S*0.17,-S*0.07,S*0.07,'#7c3aed');
  glowEye(ctx, S*0.17,-S*0.07,S*0.07,'#7c3aed');
  ctx.restore();
  // Scythe
  ctx.save(); ctx.translate(S*0.92,S*0.1);
  const sg=ctx.createLinearGradient(-S*0.05,-S*1.55,S*0.05,S*0.5); sg.addColorStop(0,'#5a4040'); sg.addColorStop(1,'#1a0a0a');
  ctx.fillStyle=sg; ctx.fillRect(-S*0.07,-S*1.55,S*0.14,S*2.05);
  ctx.fillStyle='#7c3aed'; ctx.shadowColor='#7c3aed'; ctx.shadowBlur=16;
  ctx.beginPath(); ctx.moveTo(0,-S*1.55); ctx.quadraticCurveTo(S*1.0,-S*1.32,S*0.65,-S*0.65); ctx.lineTo(0,-S*0.98); ctx.closePath(); ctx.fill(); ctx.shadowBlur=0;
  // Blade specular
  ctx.fillStyle='rgba(180,140,255,0.3)'; ctx.beginPath(); ctx.ellipse(S*0.42,-S*1.1,S*0.2,S*0.12,-0.8,0,Math.PI*2); ctx.fill();
  ctx.restore();
  ctx.restore();
}

export function drawDoomKnight(ctx) {
  ctx.save();
  dropShadow(ctx, S);
  // Black cursed plate — void metal
  sphere3D(ctx,0,0,S*0.92,'#020510','#1e293b','#384a5c',0.55);
  // Void rune cracks
  ctx.strokeStyle='#7c3aed'; ctx.lineWidth=1.8; ctx.shadowColor='#7c3aed'; ctx.shadowBlur=10;
  ctx.beginPath(); ctx.moveTo(-S*0.52,-S*0.57); ctx.lineTo(-S*0.14,S*0.42); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(S*0.36,-S*0.47); ctx.lineTo(S*0.12,S*0.57); ctx.stroke();
  ctx.shadowBlur=0;
  // Shoulder spikes
  [[-S*1.0,-S*0.4],[S*1.0,-S*0.4]].forEach(([x,y])=>{
    sphere3D(ctx,x,y,S*0.3,'#020510','#1e293b','#384a5c',0.5);
    ctx.fillStyle='#1a0a00'; ctx.beginPath(); ctx.moveTo(x,y-S*0.52); ctx.lineTo(x-S*0.1,y-S*0.02); ctx.lineTo(x+S*0.1,y-S*0.02); ctx.closePath(); ctx.fill();
  });
  // Helm
  ctx.save(); ctx.translate(0,-S*0.84);
  sphere3D(ctx,0,0,S*0.6,'#020510','#1e293b','#384a5c',0.58);
  ctx.fillStyle='#050a14'; ctx.beginPath(); ctx.arc(0,-S*0.1,S*0.62,Math.PI,0); ctx.fill();
  ctx.fillRect(-S*0.62,-S*0.1,S*1.24,S*0.3);
  // Visor slit with red glow
  ctx.fillStyle='#ef4444'; ctx.shadowColor='#ef4444'; ctx.shadowBlur=16;
  ctx.fillRect(-S*0.44,-S*0.07,S*0.88,S*0.12); ctx.shadowBlur=0;
  // Horns
  [[-S*0.34,-0.42],[S*0.34,0.42]].forEach(([ox,angle])=>{
    ctx.save(); ctx.translate(ox,-S*0.45); ctx.rotate(angle);
    ctx.fillStyle='#0a0500'; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(-S*0.12,-S*0.55); ctx.lineTo(S*0.12,-S*0.15); ctx.closePath(); ctx.fill(); ctx.restore();
  });
  ctx.restore();
  ctx.restore();
}

export function drawAbyssLord(ctx) {
  ctx.save();
  // Massive void core
  const g=ctx.createRadialGradient(-S*0.38,-S*0.38,0,0,0,S*1.28);
  g.addColorStop(0,'#a855f7'); g.addColorStop(0.28,'#4c1d95'); g.addColorStop(0.65,'#1a0838'); g.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=g; ctx.beginPath(); ctx.arc(0,0,S*1.28,0,Math.PI*2); ctx.fill();
  // Specular
  ctx.fillStyle='rgba(180,100,255,0.2)'; ctx.beginPath(); ctx.ellipse(-S*0.35,-S*0.35,S*0.5,S*0.35,-0.5,0,Math.PI*2); ctx.fill();
  // Tentacles with gradient
  for(let i=0;i<6;i++){
    const a=(i/6)*Math.PI*2;
    const tg=ctx.createLinearGradient(Math.cos(a)*S*0.65,Math.sin(a)*S*0.65,Math.cos(a+1.35)*S*1.88,Math.sin(a+1.35)*S*1.88);
    tg.addColorStop(0,'#4c1d95'); tg.addColorStop(1,'rgba(76,29,149,0)');
    ctx.strokeStyle=tg; ctx.lineWidth=4; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(Math.cos(a)*S*0.65,Math.sin(a)*S*0.65); ctx.quadraticCurveTo(Math.cos(a+0.9)*S*1.38,Math.sin(a+0.9)*S*1.38,Math.cos(a+1.35)*S*1.88,Math.sin(a+1.35)*S*1.88); ctx.stroke();
    // Sucker tip
    sphere3D(ctx,Math.cos(a+1.35)*S*1.88,Math.sin(a+1.35)*S*1.88,S*0.14,'#1e0a3e','#7c3aed','#c084fc',0.6);
  }
  // Central eye — massive
  glowEye(ctx,0,0,S*0.45,'#ffd60a');
  ctx.fillStyle='rgba(5,0,15,0.96)'; ctx.beginPath(); ctx.ellipse(0,0,S*0.14,S*0.27,0,0,Math.PI*2); ctx.fill();
  // Veins
  ctx.strokeStyle='rgba(200,0,0,0.55)'; ctx.lineWidth=0.8;
  for(let i=0;i<7;i++){ const a=(i/7)*Math.PI*2; ctx.beginPath(); ctx.moveTo(Math.cos(a)*S*0.14,Math.sin(a)*S*0.14); ctx.lineTo(Math.cos(a)*S*0.4,Math.sin(a)*S*0.24); ctx.stroke(); }
  ctx.restore();
}

// ── BOSSES ────────────────────────────────────────────────────────────────────

export function drawBossMeadow(ctx) {
  ctx.save();
  dropShadow(ctx, S*2.0);
  // Giant dragon body — deep green
  sphere3D(ctx,0,0,S*1.7,'#052e16','#15803d','#22c55e',0.38);
  // Scale texture
  ctx.save(); ctx.globalAlpha=0.18; ctx.strokeStyle='#166534'; ctx.lineWidth=1.2;
  for(let y=-5;y<=5;y++) for(let x=-5;x<=5;x++) { ctx.beginPath(); ctx.arc(x*S*0.4,y*S*0.35,S*0.22,-Math.PI*0.65,Math.PI*0.65); ctx.stroke(); }
  ctx.restore();
  // Belly lighter
  ctx.fillStyle='rgba(134,239,172,0.18)'; ctx.beginPath(); ctx.ellipse(S*0.2,S*0.3,S*0.7,S*1.0,0.2,0,Math.PI*2); ctx.fill();
  // Wings
  [[-1],[1]].forEach(([d])=>{
    ctx.save(); ctx.translate(d*S*0.68,-S*0.38); ctx.rotate(d*0.78);
    const wg=ctx.createLinearGradient(0,0,d*S*2.1,S*0.65); wg.addColorStop(0,'rgba(22,101,52,0.9)'); wg.addColorStop(1,'rgba(5,46,22,0.3)');
    ctx.fillStyle=wg; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(d*S*2.1,-S*1.35); ctx.lineTo(d*S*1.68,S*0.68); ctx.closePath(); ctx.fill();
    ctx.strokeStyle='rgba(5,46,22,0.7)'; ctx.lineWidth=2;
    [0.35,0.65,0.92].forEach(t=>{ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(d*S*2.1*t,-S*1.35*t); ctx.stroke();});
    ctx.restore();
  });
  // Head
  ctx.save(); ctx.translate(S*1.38,-S*0.52);
  sphere3D(ctx,0,0,S*0.85,'#052e16','#166534','#22c55e',0.42);
  // Snout
  const sng=ctx.createLinearGradient(0,0,S*1.0,0); sng.addColorStop(0,'#1a6630'); sng.addColorStop(1,'#0a3318');
  ctx.fillStyle=sng; ctx.beginPath(); ctx.ellipse(S*0.55,S*0.06,S*0.56,S*0.28,0.25,0,Math.PI*2); ctx.fill();
  // Nostril glow
  ctx.fillStyle='rgba(255,200,0,0.5)'; ctx.shadowColor='#ffd60a'; ctx.shadowBlur=8;
  ctx.beginPath(); ctx.arc(S*0.98,-S*0.04,S*0.07,0,Math.PI*2); ctx.fill(); ctx.shadowBlur=0;
  eye3D(ctx,-S*0.12,S*0.02,S*0.22,'#ffd60a','#1a1000');
  // Teeth
  ctx.fillStyle='#fffff0'; ctx.strokeStyle='#d4d0c0'; ctx.lineWidth=0.8;
  [-S*0.2,-S*0.02,S*0.16,S*0.34].forEach(x=>{ ctx.beginPath(); ctx.moveTo(x+S*0.55,S*0.2); ctx.lineTo(x+S*0.65,S*0.48); ctx.lineTo(x+S*0.75,S*0.2); ctx.closePath(); ctx.fill(); ctx.stroke(); });
  ctx.restore();
  ctx.restore();
}

export function drawBossDungeon(ctx) {
  ctx.save();
  dropShadow(ctx, S*1.95);
  sphere3D(ctx,0,0,S*1.6,'#050302','#3d1a08','#7a3a18',0.4);
  // Bone spurs
  ctx.fillStyle='#c8baa8';
  const boneGrad=ctx.createLinearGradient(-S*0.2,-S*0.4,S*0.2,S*0.4); boneGrad.addColorStop(0,'#ddd8c8'); boneGrad.addColorStop(1,'#a09080');
  [[-S*1.18,-S*0.42],[S*1.18,-S*0.42],[-S*1.15,S*0.22],[S*1.15,S*0.22]].forEach(([x,y])=>{
    ctx.fillStyle=boneGrad; ctx.save(); ctx.translate(x,y); const d=x<0?1:-1;
    ctx.beginPath(); ctx.moveTo(0,-S*0.42); ctx.lineTo(d*S*0.48,0); ctx.lineTo(0,S*0.42); ctx.closePath(); ctx.fill();
    ctx.restore();
  });
  // Rib lines
  ctx.strokeStyle='rgba(80,40,10,0.5)'; ctx.lineWidth=2;
  for(let i=-3;i<=3;i++){ ctx.beginPath(); ctx.moveTo(-S*1.35,i*S*0.42); ctx.lineTo(S*1.35,i*S*0.42); ctx.stroke(); }
  // Head
  ctx.save(); ctx.translate(0,-S*1.4);
  sphere3D(ctx,0,0,S*0.92,'#1a0a04','#5c3a1e','#9a6040',0.42);
  // Bone crown
  [-S*0.62,-S*0.3,S*0.02,S*0.34,S*0.62].forEach(x=>{
    const cg=ctx.createLinearGradient(x,-S*0.72,x,-S*0.72-S*0.5); cg.addColorStop(0,'#ddd8c8'); cg.addColorStop(1,'#f0ece0');
    ctx.fillStyle=cg; ctx.beginPath(); ctx.moveTo(x,-S*0.72); ctx.lineTo(x-S*0.12,-S*0.72-S*(0.38+Math.abs(x)*0.14)); ctx.lineTo(x+S*0.12,-S*0.72); ctx.closePath(); ctx.fill();
  });
  eye3D(ctx,-S*0.28,S*0.04,S*0.25,'#ef4444','#050000');
  eye3D(ctx, S*0.28,S*0.04,S*0.25,'#ef4444','#050000');
  // Maw
  ctx.fillStyle='#030100'; ctx.beginPath(); ctx.ellipse(0,S*0.35,S*0.55,S*0.3,0,0,Math.PI); ctx.fill();
  ctx.fillStyle=boneGrad; [-S*0.4,-S*0.2,S*0.0,S*0.2,S*0.4].forEach(x=>{ ctx.fillRect(x-S*0.08,S*0.35,S*0.14,S*0.28); });
  ctx.restore();
  ctx.restore();
}

export function drawBossVolcano(ctx) {
  ctx.save();
  dropShadow(ctx, S*2.0);
  sphere3D(ctx,0,0,S*1.75,'#3a0505','#991b1b','#cc2222',0.4);
  // Lava seams with glow
  ctx.strokeStyle='#fbbf24'; ctx.lineWidth=3; ctx.shadowColor='#f97316'; ctx.shadowBlur=18;
  ctx.beginPath(); ctx.moveTo(-S*0.82,-S*0.98); ctx.lineTo(S*0.22,S*0.42); ctx.lineTo(S*0.85,-S*0.62); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-S*0.48,S*0.62); ctx.lineTo(S*0.72,S*0.18); ctx.stroke();
  ctx.shadowBlur=0;
  // Magma drip orbs
  [[-S*0.62,S*1.42],[S*0.52,S*1.52],[S*0.1,S*1.28]].forEach(([x,y])=>{
    sphere3D(ctx,x,y,S*0.28,'#8b1a00','#fbbf24','#ffffff',0.8);
    ctx.shadowColor='#ff8c00'; ctx.shadowBlur=12; ctx.fillStyle='rgba(255,200,0,0.5)'; ctx.beginPath(); ctx.arc(x,y,S*0.34,0,Math.PI*2); ctx.fill(); ctx.shadowBlur=0;
  });
  // Head
  ctx.save(); ctx.translate(0,-S*1.56);
  sphere3D(ctx,0,0,S*0.95,'#450a0a','#b91c1c','#dc2626',0.42);
  // Horns — lava-tipped
  [[-S*0.47,-0.54],[S*0.47,0.54]].forEach(([ox,angle])=>{
    ctx.save(); ctx.translate(ox,-S*0.45); ctx.rotate(angle);
    const hg=ctx.createLinearGradient(0,-S*0.65,0,0); hg.addColorStop(0,'#ff8c00'); hg.addColorStop(1,'#450a0a');
    ctx.fillStyle=hg; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(-S*0.14,-S*0.66); ctx.lineTo(S*0.14,-S*0.18); ctx.closePath(); ctx.fill(); ctx.restore();
  });
  ctx.strokeStyle='#fbbf24'; ctx.lineWidth=2.2; ctx.shadowColor='#fbbf24'; ctx.shadowBlur=10;
  ctx.beginPath(); ctx.moveTo(-S*0.45,S*0.35); ctx.lineTo(-S*0.12,-S*0.22); ctx.lineTo(S*0.4,S*0.16); ctx.stroke(); ctx.shadowBlur=0;
  eye3D(ctx,-S*0.28,-S*0.06,S*0.26,'#fbbf24','#1a0500');
  eye3D(ctx, S*0.28,-S*0.06,S*0.26,'#fbbf24','#1a0500');
  ctx.restore();
  ctx.restore();
}

export function drawBossAbyss(ctx) {
  ctx.save();
  dropShadow(ctx, S*2.0);
  sphere3D(ctx,0,0,S*1.8,'#06122e','#1d4ed8','#5090f8',0.48);
  // Ice shard armor
  ctx.fillStyle='rgba(147,197,253,0.55)';
  [[-S*1.05,-S*0.58,0.44],[S*0.82,-S*0.44,-0.38],[-S*0.72,S*0.52,0.3],[S*0.9,S*0.35,-0.32]].forEach(([x,y,r])=>{
    const ig=ctx.createLinearGradient(x,y,x+Math.cos(r)*S*0.6,y-S*0.85); ig.addColorStop(0,'#bfdbfe'); ig.addColorStop(1,'#3b82f6');
    ctx.fillStyle=ig; ctx.save(); ctx.translate(x,y); ctx.rotate(r); ctx.beginPath(); ctx.moveTo(0,-S*0.85); ctx.lineTo(-S*0.24,S*0.35); ctx.lineTo(S*0.24,S*0.35); ctx.closePath(); ctx.fill(); ctx.restore();
  });
  [[-S*1.25,-S*0.4],[S*1.25,-S*0.4]].forEach(([x,y])=>{
    const sg=ctx.createLinearGradient(x-S*0.25,y,x+S*0.25,y+S*0.7); sg.addColorStop(0,'#e0f2fe'); sg.addColorStop(1,'#93c5fd');
    ctx.fillStyle=sg; ctx.save(); ctx.translate(x,y); ctx.beginPath(); ctx.moveTo(0,-S*0.7); ctx.lineTo(-S*0.25,S*0.25); ctx.lineTo(S*0.25,S*0.25); ctx.closePath(); ctx.fill(); ctx.restore();
  });
  // Head
  ctx.save(); ctx.translate(0,-S*1.58);
  sphere3D(ctx,0,0,S*0.92,'#06122e','#1d4ed8','#5090f8',0.5);
  // Icy brow
  const ibg=ctx.createLinearGradient(-S*0.82,-S*0.52,S*0.82,-S*0.3); ibg.addColorStop(0,'#93c5fd'); ibg.addColorStop(0.5,'#60a5fa'); ibg.addColorStop(1,'#3b82f6');
  ctx.fillStyle=ibg; ctx.fillRect(-S*0.82,-S*0.55,S*1.64,S*0.22);
  // Icicle beard
  const icg=ctx.createLinearGradient(0,S*0.35,0,S*0.9); icg.addColorStop(0,'#bfdbfe'); icg.addColorStop(1,'rgba(191,219,254,0)');
  ctx.fillStyle=icg;
  [-S*0.54,-S*0.26,S*0.02,S*0.3].forEach(x=>{ ctx.beginPath(); ctx.moveTo(x,S*0.35); ctx.lineTo(x+S*0.1,S*0.35+S*0.55); ctx.lineTo(x+S*0.2,S*0.35); ctx.closePath(); ctx.fill(); });
  eye3D(ctx,-S*0.28,-S*0.08,S*0.25,'#38bdf8','#001840');
  eye3D(ctx, S*0.28,-S*0.08,S*0.25,'#38bdf8','#001840');
  ctx.restore();
  ctx.restore();
}

export function drawBossShadow(ctx) {
  ctx.save();
  // Massive cosmic void
  const g=ctx.createRadialGradient(-S*0.55,-S*0.55,0,0,0,S*1.88);
  g.addColorStop(0,'#9333ea'); g.addColorStop(0.22,'#4c1d95'); g.addColorStop(0.55,'#0a0015'); g.addColorStop(0.85,'#030008'); g.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=g; ctx.beginPath(); ctx.arc(0,0,S*1.88,0,Math.PI*2); ctx.fill();
  // Star-like specular
  ctx.fillStyle='rgba(160,90,255,0.2)'; ctx.beginPath(); ctx.ellipse(-S*0.42,-S*0.42,S*0.65,S*0.42,-0.5,0,Math.PI*2); ctx.fill();
  // Tendrils
  for(let i=0;i<9;i++){
    const a=(i/9)*Math.PI*2;
    const tg=ctx.createLinearGradient(Math.cos(a)*S*0.9,Math.sin(a)*S*0.9,Math.cos(a+1.12)*S*2.5,Math.sin(a+1.12)*S*2.5);
    tg.addColorStop(0,'rgba(109,28,217,0.85)'); tg.addColorStop(1,'rgba(109,28,217,0)');
    ctx.strokeStyle=tg; ctx.lineWidth=4; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(Math.cos(a)*S*0.92,Math.sin(a)*S*0.92); ctx.quadraticCurveTo(Math.cos(a+0.68)*S*1.92,Math.sin(a+0.68)*S*1.92,Math.cos(a+1.12)*S*2.5,Math.sin(a+1.12)*S*2.5); ctx.stroke();
    sphere3D(ctx,Math.cos(a+1.12)*S*2.5,Math.sin(a+1.12)*S*2.5,S*0.22,'#1e0a3e','#6d28d9','#a855f7',0.6);
  }
  // Three menacing eyes
  [[0,-S*0.28,S*0.42,S*0.26],[S*0.6,S*0.36,S*0.26,S*0.16],[-S*0.6,S*0.36,S*0.26,S*0.16]].forEach(([x,y,rx,ry])=>{
    glowEye(ctx,x,y,rx*0.75,'#ffd60a');
    ctx.fillStyle='rgba(5,0,15,0.96)'; ctx.beginPath(); ctx.ellipse(x,y,rx*0.3,ry*0.9,0,0,Math.PI*2); ctx.fill();
    // Iris ring
    ctx.strokeStyle='rgba(255,200,0,0.3)'; ctx.lineWidth=1.2; ctx.beginPath(); ctx.ellipse(x,y,rx*0.88,ry*0.88,0,0,Math.PI*2); ctx.stroke();
  });
  ctx.restore();
}

export function drawGenericBoss(ctx) {
  ctx.save();
  dropShadow(ctx, S*1.8);
  sphere3D(ctx, 0, 0, S*1.55, '#300000', '#7f1d1d', '#cc2020', 0.42);
  glowEye(ctx,-S*0.3,0,S*0.25,'#ef4444');
  glowEye(ctx, S*0.3,0,S*0.25,'#ef4444');
  ctx.fillStyle='#fff8f0'; ctx.strokeStyle='#c0b8a8'; ctx.lineWidth=0.8;
  [-S*0.42,-S*0.16,S*0.1,S*0.36].forEach(x=>{ ctx.beginPath(); ctx.moveTo(x+S*0.1,S*0.28); ctx.lineTo(x,S*0.52); ctx.lineTo(x+S*0.2,S*0.28); ctx.closePath(); ctx.fill(); ctx.stroke(); });
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
    sphere3D(ctx, 0, 0, S * 0.82, '#2a2a2a', '#6b7280', '#a0aabb', 0.45);
    glowEye(ctx, -S*0.2, -S*0.05, S*0.13, '#ef4444');
    glowEye(ctx,  S*0.2, -S*0.05, S*0.13, '#ef4444');
  }
  ctx.restore();
}