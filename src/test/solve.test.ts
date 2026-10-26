import { describe, it, expect } from "vitest";
import { applyAlg, parseAlg, solved, isSolved, type Sticker } from "@/lib/cube";
import { SOLVE_STEPS, stepSetup } from "@/lib/solve";

const after = (i: number) => applyAlg(solved(), parseAlg(stepSetup(i + 1)));
// compara com o centro da mesma face (independe da orientação do cubo)
const ok = (st: Sticker[], f: (s: Sticker) => boolean) => {
  const center = (n: string) => st.find((s) => s.n.join() === n && s.p.filter((v) => v !== 0).length === 1)!.c;
  return st.filter(f).every((s) => s.c === center(s.n.join()));
};
const isEdge = (s: Sticker) => s.p.filter((v) => v !== 0).length === 2;
const downDir = (st: Sticker[]) => st.find((s) => s.c === "d" && s.p.filter((v) => v !== 0).length === 1)!.n;
const layer = (st: Sticker[], s: Sticker) => { const d = downDir(st); return s.p[0] * d[0] + s.p[1] * d[1] + s.p[2] * d[2]; };

describe("resolução contínua", () => {
  it("começa embaralhado", () => expect(isSolved(applyAlg(solved(), parseAlg(stepSetup(0))))).toBe(false));
  it("etapa 1 resolve a cruz branca", () => { const s = after(0); expect(ok(s, (x) => layer(s, x) === 1 && isEdge(x))).toBe(true); });
  it("etapa 2 resolve a primeira camada", () => { const s = after(1); expect(ok(s, (x) => layer(s, x) === 1)).toBe(true); });
  it("etapa 3 resolve duas camadas", () => { const s = after(2); expect(ok(s, (x) => layer(s, x) >= 0)).toBe(true); });
  it("etapa 2 ainda não estava pronta após etapa 1", () => { const s = after(0); expect(ok(s, (x) => layer(s, x) === 1)).toBe(false); });
  it("termina resolvido", () => expect(isSolved(after(SOLVE_STEPS.length - 1))).toBe(true));
});
