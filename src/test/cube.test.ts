import { describe, it, expect } from "vitest";
import { solved, applyAlg, parseAlg, invertAlg, isSolved } from "@/lib/cube";

describe("cube model", () => {
  it("R four times returns to solved", () => {
    expect(isSolved(applyAlg(solved(), parseAlg("R R R R")))).toBe(true);
  });
  it("one R move scrambles", () => {
    expect(isSolved(applyAlg(solved(), parseAlg("R")))).toBe(false);
  });
  it("(R U R' U')6 is identity", () => {
    expect(isSolved(applyAlg(solved(), parseAlg("(R U R' U')6")))).toBe(true);
  });
  it("alg followed by its inverse is solved", () => {
    const m = parseAlg("x R2' D2 (R U R') D2 (R U' R) x' Rw U2’ M' {D U'}");
    expect(isSolved(applyAlg(solved(), [...m, ...invertAlg(m)]))).toBe(true);
  });
  it("T-perm twice is solved", () => {
    expect(isSolved(applyAlg(solved(), parseAlg("((R U R' U') (R' F R2 U') R' U' (R U R' F'))2")))).toBe(true);
  });
});
