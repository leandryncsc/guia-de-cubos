// Modelo do cubo 3x3: 54 adesivos com posição (-1..1) e normal.
export type Vec = [number, number, number];
export type Color = "u" | "d" | "f" | "b" | "r" | "l";
export type Sticker = { p: Vec; n: Vec; c: Color };
export type Move = { face: string; amount: number }; // amount: 1, -1, 2

type Def = { axis: 0 | 1 | 2; deg: number; layer: (c: number) => boolean };
const one = (v: number) => (c: number) => c === v;
const DEFS: Record<string, Def> = {
  R: { axis: 0, deg: -90, layer: one(1) },
  L: { axis: 0, deg: 90, layer: one(-1) },
  U: { axis: 1, deg: -90, layer: one(1) },
  D: { axis: 1, deg: 90, layer: one(-1) },
  F: { axis: 2, deg: -90, layer: one(1) },
  B: { axis: 2, deg: 90, layer: one(-1) },
  M: { axis: 0, deg: 90, layer: one(0) },
  E: { axis: 1, deg: 90, layer: one(0) },
  S: { axis: 2, deg: -90, layer: one(0) },
  Rw: { axis: 0, deg: -90, layer: (c) => c >= 0 },
  Lw: { axis: 0, deg: 90, layer: (c) => c <= 0 },
  Uw: { axis: 1, deg: -90, layer: (c) => c >= 0 },
  Dw: { axis: 1, deg: 90, layer: (c) => c <= 0 },
  Fw: { axis: 2, deg: -90, layer: (c) => c >= 0 },
  Bw: { axis: 2, deg: 90, layer: (c) => c <= 0 },
  x: { axis: 0, deg: -90, layer: () => true },
  y: { axis: 1, deg: -90, layer: () => true },
  z: { axis: 2, deg: -90, layer: () => true },
};

export function rotate(v: Vec, axis: number, deg: number, round = true): Vec {
  const a = (deg * Math.PI) / 180;
  const c = Math.cos(a), s = Math.sin(a);
  const [x, y, z] = v;
  let r: Vec;
  if (axis === 0) r = [x, y * c - z * s, y * s + z * c];
  else if (axis === 1) r = [x * c + z * s, y, -x * s + z * c];
  else r = [x * c - y * s, x * s + y * c, z];
  return round ? (r.map((n) => Math.round(n)) as Vec) : r;
}

export function moveInfo(m: Move) {
  const d = DEFS[m.face]!;
  return { axis: d.axis, deg: d.deg * m.amount, inLayer: (s: Sticker) => d.layer(s.p[d.axis]) };
}

export function solved(): Sticker[] {
  const faces: [Vec, Color][] = [
    [[0, 1, 0], "u"], [[0, -1, 0], "d"], [[0, 0, 1], "f"],
    [[0, 0, -1], "b"], [[1, 0, 0], "r"], [[-1, 0, 0], "l"],
  ];
  const out: Sticker[] = [];
  for (const [n, c] of faces) {
    const ax = n.findIndex((v) => v !== 0);
    for (const i of [-1, 0, 1]) for (const j of [-1, 0, 1]) {
      const p: Vec = [0, 0, 0];
      p[ax] = n[ax]!;
      p[(ax + 1) % 3] = i;
      p[(ax + 2) % 3] = j;
      out.push({ p, n: [...n] as Vec, c });
    }
  }
  return out;
}

export function applyMove(state: Sticker[], m: Move): Sticker[] {
  const { axis, deg, inLayer } = moveInfo(m);
  return state.map((s) =>
    inLayer(s) ? { c: s.c, p: rotate(s.p, axis, deg), n: rotate(s.n, axis, deg) } : s,
  );
}

export function applyAlg(state: Sticker[], moves: Move[]) {
  return moves.reduce(applyMove, state);
}

const LOWER: Record<string, string> = { r: "Rw", l: "Lw", u: "Uw", d: "Dw", f: "Fw", b: "Bw" };

function norm(n: number) {
  const m = ((n % 4) + 4) % 4;
  return m === 3 ? -1 : m;
}

export function parseAlg(src: string): Move[] {
  const s = src.replace(/[’‘´`]/g, "'").replace(/[{}]/g, " ");
  let i = 0;
  const readMods = () => {
    let num = "", prime = false;
    while (i < s.length && /[0-9']/.test(s[i])) {
      if (s[i] === "'") prime = true; else num += s[i];
      i++;
    }
    return { n: num ? parseInt(num) : 1, prime };
  };
  const parseSeq = (): Move[] => {
    const out: Move[] = [];
    while (i < s.length) {
      const ch = s[i] ?? "";
      if (ch === "(") {
        i++;
        const inner = parseSeq();
        const { n, prime } = readMods();
        const block = prime ? invertAlg(inner) : inner;
        for (let k = 0; k < n; k++) out.push(...block);
      } else if (ch === ")") { i++; return out; }
      else if (/[RLUDFBMESxyz]/.test(ch) || LOWER[ch]) {
        i++;
        let face = LOWER[ch] ?? ch;
        if (s[i] === "w" && "RLUDFB".includes(ch)) { face = ch + "w"; i++; }
        const { n, prime } = readMods();
        const amt = norm(prime ? -n : n);
        if (amt !== 0) out.push({ face, amount: amt });
      } else i++;
    }
    return out;
  };
  return parseSeq();
}

export function invertAlg(moves: Move[]): Move[] {
  return [...moves].reverse().map((m) => ({ face: m.face, amount: m.amount === 2 ? 2 : -m.amount }));
}

export function moveLabel(m: Move) {
  return m.face + (m.amount === 2 ? "2" : m.amount === -1 ? "'" : "");
}

export function isSolved(state: Sticker[]) {
  const ref = new Map<string, Color>();
  for (const s of state) {
    const k = s.n.join(",");
    if (!ref.has(k)) ref.set(k, s.c);
    else if (ref.get(k) !== s.c) return false;
  }
  return true;
}
