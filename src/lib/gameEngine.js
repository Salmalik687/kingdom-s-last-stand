// Medieval Tower Defense Game Engine

export const CELL_SIZE = 48;
export const GRID_COLS = 16;
export const GRID_ROWS = 10;

export const PATH = [
  [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [4, 3], [4, 2], [4, 1],
  [5, 1], [6, 1], [7, 1], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5],
  [8, 6], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [12, 6], [12, 5],
  [12, 4], [12, 3], [13, 3], [14, 3], [15, 3]
];

export const PATH_SET = new Set(PATH.map(([x, y]) => `${x},${y}`));

export const TOWER_TYPES = {
  archer: {
    name: "Archer Tower",
    cost: 50,
    damage: 8,
    range: 3,
    fireRate: 800,
    color: "#8B4513",
    emoji: "🏹",
    description: "Fast attack, medium range",
    upgradeCost: 40,
  },
  cannon: {
    name: "Cannon Tower",
    cost: 100,
    damage: 25,
    range: 2.5,
    fireRate: 1800,
    color: "#4A4A4A",
    emoji: "💣",
    description: "High damage, slow fire",
    upgradeCost: 75,
  },
  mage: {
    name: "Mage Tower",
    cost: 80,
    damage: 15,
    range: 3.5,
    fireRate: 1200,
    color: "#4B0082",
    emoji: "🔮",
    description: "Long range, magic damage",
    upgradeCost: 60,
  },
  frost: {
    name: "Frost Tower",
    cost: 70,
    damage: 5,
    range: 2.5,
    fireRate: 1000,
    color: "#4682B4",
    emoji: "❄️",
    description: "Slows enemies",
    upgradeCost: 50,
  },
};

export const ENEMY_TYPES = {
  peasant: { hp: 30, speed: 1.2, reward: 10, emoji: "🧑‍🌾", name: "Peasant" },
  soldier: { hp: 60, speed: 1, reward: 15, emoji: "⚔️", name: "Soldier" },
  knight: { hp: 120, speed: 0.8, reward: 25, emoji: "🛡️", name: "Knight" },
  horseman: { hp: 80, speed: 1.8, reward: 20, emoji: "🐴", name: "Horseman" },
  king: { hp: 300, speed: 0.6, reward: 100, emoji: "👑", name: "King" },
};

export function generateWaves(waveNumber) {
  const enemies = [];
  const base = Math.min(waveNumber, 20);

  if (waveNumber <= 3) {
    for (let i = 0; i < 3 + waveNumber * 2; i++) {
      enemies.push({ type: "peasant", delay: i * 800 });
    }
  } else if (waveNumber <= 6) {
    for (let i = 0; i < 4 + waveNumber; i++) {
      enemies.push({ type: i % 3 === 0 ? "soldier" : "peasant", delay: i * 700 });
    }
  } else if (waveNumber <= 10) {
    for (let i = 0; i < 5 + waveNumber; i++) {
      const types = ["peasant", "soldier", "knight", "horseman"];
      enemies.push({ type: types[i % types.length], delay: i * 600 });
    }
  } else {
    for (let i = 0; i < base + 5; i++) {
      const types = ["soldier", "knight", "horseman"];
      enemies.push({ type: types[i % types.length], delay: i * 500 });
    }
    if (waveNumber % 5 === 0) {
      enemies.push({ type: "king", delay: (base + 5) * 500 + 1000 });
    }
  }

  // Scale HP with wave number
  const hpMultiplier = 1 + (waveNumber - 1) * 0.15;
  return enemies.map(e => ({
    ...e,
    hpMultiplier,
  }));
}

export function createEnemy(type, hpMultiplier = 1) {
  const base = ENEMY_TYPES[type];
  return {
    id: Math.random().toString(36).substr(2, 9),
    type,
    hp: Math.floor(base.hp * hpMultiplier),
    maxHp: Math.floor(base.hp * hpMultiplier),
    speed: base.speed,
    reward: base.reward,
    emoji: base.emoji,
    pathIndex: 0,
    x: PATH[0][0] * CELL_SIZE + CELL_SIZE / 2,
    y: PATH[0][1] * CELL_SIZE + CELL_SIZE / 2,
    slowTimer: 0,
  };
}

export function createTower(type, gridX, gridY) {
  const base = TOWER_TYPES[type];
  return {
    id: Math.random().toString(36).substr(2, 9),
    type,
    gridX,
    gridY,
    x: gridX * CELL_SIZE + CELL_SIZE / 2,
    y: gridY * CELL_SIZE + CELL_SIZE / 2,
    damage: base.damage,
    range: base.range * CELL_SIZE,
    fireRate: base.fireRate,
    lastFire: 0,
    level: 1,
    color: base.color,
    emoji: base.emoji,
  };
}

export function createProjectile(tower, enemy) {
  return {
    id: Math.random().toString(36).substr(2, 9),
    x: tower.x,
    y: tower.y,
    targetId: enemy.id,
    targetX: enemy.x,
    targetY: enemy.y,
    speed: 5,
    damage: tower.damage,
    towerType: tower.type,
    color: tower.color,
  };
}

export function distanceBetween(a, b) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

export function moveEnemy(enemy, dt) {
  if (enemy.pathIndex >= PATH.length - 1) return true; // reached end

  const targetCell = PATH[enemy.pathIndex + 1];
  const targetX = targetCell[0] * CELL_SIZE + CELL_SIZE / 2;
  const targetY = targetCell[1] * CELL_SIZE + CELL_SIZE / 2;

  const dx = targetX - enemy.x;
  const dy = targetY - enemy.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  const speedMod = enemy.slowTimer > 0 ? 0.4 : 1;
  const moveSpeed = enemy.speed * speedMod * dt * 60;

  if (dist < moveSpeed) {
    enemy.x = targetX;
    enemy.y = targetY;
    enemy.pathIndex++;
    if (enemy.pathIndex >= PATH.length - 1) return true;
  } else {
    enemy.x += (dx / dist) * moveSpeed;
    enemy.y += (dy / dist) * moveSpeed;
  }

  if (enemy.slowTimer > 0) {
    enemy.slowTimer -= dt * 1000;
  }

  return false;
}

export function moveProjectile(proj, enemies) {
  const target = enemies.find(e => e.id === proj.targetId);
  if (target) {
    proj.targetX = target.x;
    proj.targetY = target.y;
  }

  const dx = proj.targetX - proj.x;
  const dy = proj.targetY - proj.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < 8) return { hit: true, targetId: proj.targetId };

  proj.x += (dx / dist) * proj.speed * 3;
  proj.y += (dy / dist) * proj.speed * 3;

  return { hit: false };
}