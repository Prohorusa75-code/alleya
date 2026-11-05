/* Геометрия айсберга: плоские полигональные грани.
   Случайность с фиксированным зерном — рисунок одинаковый при каждой сборке. */

export type Facet = { points: string; fill: string };

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

/* ---------- подводная часть ---------- */

export const DEEP_W = 1000;
export const DEEP_H = 4000;
/* ширина у линии воды — совпадает с основанием верхушки */
export const WATER_XL = 330;
export const WATER_XR = 640;

// [y, левый край, правый край]: расширяется к середине и сходится ко дну
const OUTLINE: [number, number, number][] = [
  [0, WATER_XL, WATER_XR],
  [160, 250, 725],
  [460, 150, 825],
  [900, 70, 905],
  [1450, 40, 950],
  [2050, 62, 928],
  [2650, 120, 885],
  [3150, 205, 805],
  [3550, 320, 700],
  [3820, 425, 590],
  [4000, 498, 512],
];

const DEEP_COLORS = ["#0c3f4e", "#145867", "#0f4a5a"];

export function deepFacets(): Facet[] {
  const rand = rng(7);
  // добавляем промежуточные ряды, чтобы грани были мельче
  const rows: [number, number, number][] = [];
  for (let i = 0; i < OUTLINE.length - 1; i++) {
    const [y0, l0, r0] = OUTLINE[i];
    const [y1, l1, r1_] = OUTLINE[i + 1];
    rows.push(OUTLINE[i]);
    if (i < OUTLINE.length - 2) {
      const t = 0.5;
      rows.push([
        y0 + (y1 - y0) * t,
        l0 + (l1 - l0) * t + (rand() - 0.5) * 50,
        r0 + (r1_ - r0) * t + (rand() - 0.5) * 50,
      ]);
    }
  }
  rows.push(OUTLINE[OUTLINE.length - 1]);

  const COLS = 6;
  const grid: [number, number][][] = rows.map(([y, l, r], ri) => {
    const pts: [number, number][] = [];
    const prevY = ri > 0 ? rows[ri - 1][0] : y;
    const nextY = ri < rows.length - 1 ? rows[ri + 1][0] : y;
    for (let c = 0; c <= COLS; c++) {
      const edge = c === 0 || c === COLS;
      const cw = (r - l) / COLS;
      const x = l + cw * c + (edge ? 0 : (rand() - 0.5) * cw * 0.7);
      const firstOrLast = ri === 0 || ri === rows.length - 1;
      const yj = firstOrLast ? 0 : (rand() - 0.5) * Math.min(y - prevY, nextY - y) * 0.6;
      pts.push([x, y + yj]);
    }
    return pts;
  });

  const facets: Facet[] = [];
  const pick = (c: number) => {
    // слева грани темнее, справа светлее, с примесью случайности
    const bias = c / COLS;
    const v = rand() * 0.75 + bias * 0.5;
    return DEEP_COLORS[v < 0.42 ? 0 : v < 0.8 ? 2 : 1];
  };
  for (let ri = 0; ri < grid.length - 1; ri++) {
    for (let c = 0; c < COLS; c++) {
      const a = grid[ri][c];
      const b = grid[ri][c + 1];
      const d = grid[ri + 1][c];
      const e = grid[ri + 1][c + 1];
      const tri = (p: [number, number][]) => p.map(([x, y]) => `${r1(x)},${r1(y)}`).join(" ");
      if (rand() < 0.5) {
        facets.push({ points: tri([a, b, e]), fill: pick(c) });
        facets.push({ points: tri([a, e, d]), fill: pick(c) });
      } else {
        facets.push({ points: tri([a, b, d]), fill: pick(c) });
        facets.push({ points: tri([b, e, d]), fill: pick(c) });
      }
    }
  }
  return facets;
}

/* ---------- верхушка над водой ---------- */

export const TIP_W = 1000;
export const TIP_H = 420;

const P = {
  A: [WATER_XL, 420], B: [360, 300], C: [400, 250], D: [430, 120], E: [470, 60],
  F: [500, 92], G: [540, 18], H: [575, 110], I: [600, 190], J: [625, 262], K: [WATER_XR, 420],
  P: [452, 300], Q: [522, 222], R: [562, 322], S: [482, 386], T: [602, 360], U: [512, 142],
} as const;

type Key = keyof typeof P;

const TIP_TRIS: [Key, Key, Key, string][] = [
  ["A", "B", "P", "#bcdde6"],
  ["A", "P", "S", "#a3cfdb"],
  ["B", "C", "P", "#d6eaf0"],
  ["C", "D", "P", "#f7fbfc"],
  ["D", "U", "P", "#d6eaf0"],
  ["D", "E", "U", "#ffffff"],
  ["E", "F", "U", "#bcdde6"],
  ["F", "G", "U", "#f7fbfc"],
  ["G", "H", "U", "#a3cfdb"],
  ["U", "H", "Q", "#bcdde6"],
  ["H", "I", "Q", "#8dc2d1"],
  ["U", "Q", "P", "#ffffff"],
  ["P", "Q", "S", "#d6eaf0"],
  ["Q", "R", "S", "#bcdde6"],
  ["Q", "I", "R", "#a3cfdb"],
  ["I", "J", "R", "#8dc2d1"],
  ["J", "T", "R", "#a3cfdb"],
  ["J", "K", "T", "#79b4c5"],
  ["R", "T", "S", "#8dc2d1"],
  ["S", "T", "K", "#79b4c5"],
  ["A", "S", "K", "#a3cfdb"],
];

export function tipFacets(): Facet[] {
  return TIP_TRIS.map(([a, b, c, fill]) => ({
    points: [P[a], P[b], P[c]].map(([x, y]) => `${x},${y}`).join(" "),
    fill,
  }));
}
