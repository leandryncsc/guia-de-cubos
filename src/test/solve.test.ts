import { describe, it, expect } from "vitest";
import { applyAlg, parseAlg, solved, isSolved, type Sticker } from "@/lib/cube";
import { SCRAMBLE, SOLVE_STEPS, stepSetup } from "@/lib/solve";

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
  it("usa exatamente os movimentos do embaralhamento do anexo", () => {
    const expected = [
      "R2 U R U R' U' R' U' R' U R'",
      "R2 B2 R F R' B2 R F' R U'",
      "R U R' U R U2 R' U' R U2 R' U' R U' R'",
      "F U R U' R' F' U' Fw U R U' R' Fw'",
      "y' F U F' U' L' U' L U' y' F' U' F U R U R' U2 y' F U F' U' L' U' L U y' F' U' F U R U R' U'",
      "y' F' U' F U y' R U' R' U R U2 R' y' R U R' U' y' R U' R' U R U' R'",
      "L2 D' L F2 U R2 D",
    ].join(" ");
    expect(parseAlg(SCRAMBLE)).toEqual(parseAlg(expected));
  });
  it("cada ilustração começa no estado final da etapa anterior", () => {
    for (let i = 1; i < SOLVE_STEPS.length; i++) {
      const previous = SOLVE_STEPS[i - 1];
      if (!previous) throw new Error("Etapa anterior ausente");
      const end = applyAlg(applyAlg(solved(), parseAlg(stepSetup(i - 1))), parseAlg(previous.alg));
      expect(applyAlg(solved(), parseAlg(stepSetup(i)))).toEqual(end);
    }
  });
  it("etapa 4 forma a cruz amarela sem desfazer duas camadas", () => {
    const s = after(3);
    expect(ok(s, (x) => layer(s, x) >= 0)).toBe(true);
    expect(s.filter((x) => x.n[1] === 1 && isEdge(x)).every((x) => x.c === "u")).toBe(true);
  });
  it("etapa 5 completa a face amarela sem desfazer duas camadas", () => {
    const s = after(4);
    expect(ok(s, (x) => layer(s, x) >= 0)).toBe(true);
    expect(s.filter((x) => x.n[1] === 1).every((x) => x.c === "u")).toBe(true);
  });
  it("etapa 6 posiciona todos os cantos mantendo as camadas prontas", () => {
    const s = after(5);
    expect(ok(s, (x) => layer(s, x) >= 0 || x.p.filter((v) => v !== 0).length === 3)).toBe(true);
    expect(s.filter((x) => x.n[1] === 1).every((x) => x.c === "u")).toBe(true);
    expect(isSolved(s)).toBe(false);
  });
  it("começa embaralhado", () => expect(isSolved(applyAlg(solved(), parseAlg(stepSetup(0))))).toBe(false));
  it("etapa 1 resolve a cruz branca", () => { const s = after(0); expect(ok(s, (x) => layer(s, x) === 1 && isEdge(x))).toBe(true); });
  it("etapa 2 resolve a primeira camada", () => { const s = after(1); expect(ok(s, (x) => layer(s, x) === 1)).toBe(true); });
  it("etapa 3 resolve duas camadas", () => { const s = after(2); expect(ok(s, (x) => layer(s, x) >= 0)).toBe(true); });
  it("etapa 2 ainda não estava pronta após etapa 1", () => { const s = after(0); expect(ok(s, (x) => layer(s, x) === 1)).toBe(false); });
  it("termina resolvido", () => expect(isSolved(after(SOLVE_STEPS.length - 1))).toBe(true));
});
