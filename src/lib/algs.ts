// Algoritmos extraídos dos PDFs "OLL / PLL - O Cubo 2024" (youtube.com/c/OCuboAdelFonseca)
export type AlgGroup = { group: string; cases: { name: string; alg: string }[] };

const g = (group: string, prefix: string, algs: (string | [string, string])[]): AlgGroup => ({
  group,
  cases: algs.map((a, i) => (Array.isArray(a) ? { name: a[0], alg: a[1] } : { name: `${prefix} ${i + 1}`, alg: a })),
});

export const OLL: AlgGroup[] = [
  g("Todos os meios orientados", "", [
    ["Sune", "R U R' U R U2' R'"], ["Anti-Sune", "R U2 R' U' R U' R'"],
    ["H", "y (R U R' U) (R U' R' U) (R U2' R')"], ["Pi", "R U2' R2' U' R2 U' R2' U2' R"],
    ["T", "(Rw U R' U') (Rw' F R F')"], ["L", "F' (Rw U R' U') Rw' F R"],
    ["U", "R2 D (R' U2 R) D' (R' U2 R')"],
  ]),
  g("Formatos de T", "T", ["F R U R' U' F'", "(R U R' U') (R' F R F')"]),
  g("Quadrados", "Quadrado", ["(Rw U2 R' U' R U' Rw')", "(Rw' U2' R U R' U Rw)"]),
  g("Formato de C", "C", ["(R U R2' U') (R' F R U) R U' F'", "R' U' (R' F R F') U R"]),
  g("Formato de W", "W", ["y2 L' U' L U' L' U L U L F' L' F", "(R U R' U) (R U' R' U') (R' F R F')"]),
  g("Cantos corretos, meios invertidos", "Meios", ["(Rw U R' U') (Rw' R) (U R U' R')", "(R U R' U') M' (U R U' Rw')"]),
  g("Formato de P", "P", ["(R' U' F) (U R U' R') F' R", "R U B' (U' R' U) (R B R')", "R' U' F' U F R", "F (U R U' R') F'"]),
  g("Formato de I (linha)", "Linha", ["Fw (R U R' U')2 Fw'", "(Rw U Rw') (U R U' R')2 (Rw U' Rw')", "R' (F' U' F U') (R U R' U) R", "(R' F R U) (R U' R2' F') R2 U' R' (U R U R')"]),
  g("Formatos de peixe", "Peixe", ["(R U R' U') R' F (R2 U R' U') F'", "(R U R' U) (R' F R F') (R U2' R')", "(R U2') (R2' F R F') (R U2' R')", "(F R' F' R) (U R U' R')"]),
  g("Movimento do cavalo", "Cavalo", ["(Rw U' Rw') (U' Rw U Rw') (F' U F)", "(R' F R) (U R' F' R) (F U' F')", "(Rw U Rw') (R U R' U') (Rw U' Rw')", "(Rw' U' Rw) (R' U' R U) (Rw' U Rw)"]),
  g("Formatos estranhos", "Estranho", ["(R U R' U') (R U' R') (F' U' F) (R U R')", "F U (R U2 R' U') (R U2 R' U') F'", "(R U R' U R U2' R') F (R U R' U') F'", "(R' U' R U' R' U2 R) F (R U R' U') F'"]),
  g("Formatos de L", "L", ["F (R U R' U')2 F'", "F' (L' U' L U)2 F", "Rw U' Rw2' U Rw2 U Rw2' U' Rw", "Rw' U Rw2 U' Rw2' U' Rw2 U Rw'", "(Rw U R' U) (R U' R' U) R U2' Rw'", "(Rw' U' R U') (R' U R U') R' U2 Rw"]),
  g("Formato de relâmpago", "Relâmpago", ["(Rw U R' U R U2' Rw')", "(Rw' U' R U' R' U2 Rw)", "Rw' (R2 U R' U R U2' R') U M'", "Rw R2' (U' R U' R' U2 R) U' R Rw'", "(L F') (L' U' L U) F U' L'", "(R' F) (R U R' U') F' U R"]),
  g("Sem meios orientados (ponto)", "Ponto", ["(R U2') (R2' F R F') U2' (R' F R F')", "F (R U R' U') F' Fw (R U R' U') Fw'", "Fw (R U R' U') Fw' U' F (R U R' U') F'", "Fw (R U R' U') Fw' U F (R U R' U') F'", "R U2' (R2' F R F') U2' Rw (R' U R U' Rw')", "Rw' R U (R U R' U') Rw (R2' F R F')", "(R U R' U) (R' F R F') U2' (R' F R F')", "Rw' R U (R U R' U') Rw2 R2' (U R U' Rw')"]),
];

export const PLL: AlgGroup[] = [
  g("Apenas permutação de meios", "", [["Ua", "(M2' U M) U2 (M' U M2')"], ["Ub", "(M2' U' M) U2 (M' U' M2')"], ["H", "(M2' U M2') U2 (M2' U M2')"], ["Z", "(M2' U M2' U) (M' U2) (M2' U2 M')"]]),
  g("Apenas permutação de cantos", "", [["Aa", "x (R' U R') D2 (R U' R') D2 R2 x'"], ["Ab", "x R2' D2 (R U R') D2 (R U' R) x'"], ["E", "x' (R U' R' D) (R U R' D') (R U R' D) (R U' R' D') x"]]),
  g("Troca de cantos adjacentes", "", [["Ra", "(R U R' F') (R U2' R' U2') (R' F R U) (R U2' R')"], ["Rb", "(R' U2 R U2') R' F (R U R' U') R' F' R2"], ["Ja", "x R2' (F R F' R) U2' (Rw' U Rw U2') x'"], ["Jb", "(R U R' F') (R U R' U') R' (F R2 U' R')"], ["T", "(R U R' U') (R' F R2 U') R' U' (R U R' F')"], ["F", "(R' U' F') (R U R' U') (R' F R2 U') (R' U' R) (U R' U R)"]]),
  g("Troca de cantos opostos", "", [["V", "(R' U R' U') y (R' F' R2 U') (R' U R' F) R F"], ["Y", "F (R U' R' U') (R U R' F') (R U R' U') (R' F R F')"], ["Na", "(R U R' U) (R U R' F') (R U R' U') (R' F R2 U') R' U2 (R U' R')"], ["Nb", "Rw' D' F Rw U' Rw' F' D Rw2 U Rw' U' Rw' F Rw F'"]]),
  g("Permutações G (ciclos duplos)", "", [["Ga", "R2 U (R' U R' U') (R U' R2) {D U'} (R' U R D')"], ["Gb", "(R' U' R) {U D'} (R2 U R' U) (R U' R U') R2' D"], ["Gc", "R2' U' (R U' R U) (R' U R2) {D' U} (R U' R' D)"], ["Gd", "(R U R') {U' D} (R2 U' R U') (R' U R' U) R2 D'"]]),
];
