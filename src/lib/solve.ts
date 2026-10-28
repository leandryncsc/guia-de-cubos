import { moveLabel, parseAlg } from "./cube";

// Uma resolução contínua pelo método de camadas: cada etapa parte do estado da anterior.
export const SOLVE_STEPS = [
  { t: "Cruz branca", alg: "D' R2 U' F2 L' D L2", d: "Com o branco embaixo, leve os 4 meios brancos ao lugar, alinhados com os centros laterais.", tip: "Gire o cubo para ver a face branca embaixo." },
  { t: "Cantos brancos", alg: "R U R' U' R U R' y U R U' R' y R U2 R' U' R U R' y U' F' U F y", d: "Coloque cada canto branco acima do seu lugar e insira-o, completando a primeira camada.", tip: "R U R' (branco à direita), F' U' F (branco na frente), R U2 R' U' R U R' (branco em cima)." },
  { t: "Segunda camada", alg: "U R U' R' U' F' U F y U' L' U L U F U' F' y U2 R U' R' U' F' U F y U L' U L U F U' F' y", d: "Leve os meios sem amarelo para a camada do meio, à direita ou à esquerda.", tip: "Direita: U R U' R' U' F' U F · Esquerda: U' L' U L U F U' F'." },
  { t: "Cruz amarela", alg: "Fw R U R' U' Fw' U F R U R' U' F'", d: "Forme a cruz amarela em cima (ponto → L → linha → cruz).", tip: "F R U R' U' F' — repita com o L atrás-esquerda ou a linha na horizontal." },
  { t: "Face amarela", alg: "R U R' U R U2 R' U R U2 R' U' R U' R'", d: "Oriente os cantos até toda a face de cima ficar amarela.", tip: "Sune: R U R' U R U2 R'." },
  { t: "Posicionar cantos", alg: "U R' F R' B2 R F' R' B2 R2", d: "Coloque os cantos amarelos no lugar certo.", tip: "Deixe os dois cantos corretos atrás antes do algoritmo." },
  { t: "Posicionar meios — fim!", alg: "R U' R U R U R U' R' U' R2", d: "Gire os meios da última camada e o cubo está montado.", tip: "Deixe a lateral completa atrás." },
];

const toStr = (s: string) => parseAlg(s).map(moveLabel).join(" ");
// Sequência do anexo, preservada em sete linhas na ordem de execução.
export const SCRAMBLE = [
  "R2 U R U R' U' R' U' R' U R'",
  "R2 B2 R F R' B2 R F' R U'",
  "R U R' U R U2 R' U' R U2 R' U' R U' R'",
  "F U R U' R' F' U' Fw U R U' R' Fw'",
  "y' F U F' U' L' U' L U' y' F' U' F U R U R' U2 y' F U F' U' L' U' L U y' F' U' F U R U R' U'",
  "y' F' U' F U y' R U' R' U R U2 R' y' R U R' U' y' R U' R' U R U' R'",
  "L2 D' L F2 U R2 D",
].join("\n");

// setup (estado inicial) de cada etapa = embaralhamento + etapas anteriores
export const stepSetup = (i: number) =>
  [SCRAMBLE, ...SOLVE_STEPS.slice(0, i).map((s) => toStr(s.alg))].join(" ");
