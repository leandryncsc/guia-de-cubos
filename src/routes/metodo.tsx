import { createFileRoute } from "@tanstack/react-router";
import { CubePlayer } from "@/components/Cube3D";
import { invertAlg, moveLabel, parseAlg } from "@/lib/cube";

export const Route = createFileRoute("/metodo")({
  head: () => ({
    meta: [
      { title: "Passo a passo para montar o cubo mágico — Cubo Fácil" },
      { name: "description", content: "Método de camadas para iniciantes, com cada algoritmo animado em 3D." },
      { property: "og:title", content: "Passo a passo para montar o cubo mágico" },
      { property: "og:description", content: "Método de camadas para iniciantes com algoritmos animados." },
    ],
  }),
  component: Metodo,
});

type Case = { label: string; alg: string };
const steps: { t: string; d: string; tip?: string; cases: Case[] }[] = [
  { t: "Cruz branca", d: "Com o branco embaixo, leve cada meio branco ao seu lugar, alinhado com o centro da lateral.", tip: "Gire U até o meio ficar acima do centro da mesma cor antes de descer.", cases: [
    { label: "Meio branco em cima, alinhado", alg: "F2" },
    { label: "Meio branco invertido", alg: "U' R' F R" },
  ] },
  { t: "Cantos brancos", d: "Coloque o canto branco acima do seu lugar (frente-direita, em cima) e use o caso certo.", tip: "Se o canto estiver embaixo no lugar errado, faça R U R' para tirá-lo.", cases: [
    { label: "Branco virado para a direita", alg: "R U R'" },
    { label: "Branco virado para a frente", alg: "F' U' F" },
    { label: "Branco virado para cima", alg: "R U2 R' U' R U R'" },
  ] },
  { t: "Segunda camada", d: "Ache um meio sem amarelo em cima, alinhe com o centro da frente e leve para o lado da cor de cima.", tip: "Se um meio estiver no lugar mas invertido, use um dos algoritmos para tirá-lo e depois coloque de novo.", cases: [
    { label: "Meio vai para a direita", alg: "U R U' R' U' F' U F" },
    { label: "Meio vai para a esquerda", alg: "U' L' U L U F U' F'" },
  ] },
  { t: "Cruz amarela", d: "Com o amarelo em cima, identifique o desenho dos meios amarelos.", tip: "L no canto de trás-esquerda; linha na horizontal.", cases: [
    { label: "Ponto", alg: "F R U R' U' F' Fw R U R' U' Fw'" },
    { label: "Formato L", alg: "Fw R U R' U' Fw'" },
    { label: "Linha", alg: "F R U R' U' F'" },
  ] },
  { t: "Face amarela", d: "Oriente os cantos para completar a face amarela.", tip: "Com 1 canto amarelo em cima, deixe-o na frente-esquerda e repita até acabar.", cases: [
    { label: "Sune (peixe para a esquerda)", alg: "R U R' U R U2 R'" },
    { label: "Anti-Sune", alg: "R U2 R' U' R U' R'" },
  ] },
  { t: "Posicionar cantos", d: "Troque os cantos da última camada até todos ficarem no lugar certo.", tip: "Deixe os dois cantos corretos (\"faróis\") atrás. Se nenhum estiver, faça uma vez e repita.", cases: [
    { label: "Faróis atrás", alg: "R' F R' B2 R F' R' B2 R2" },
  ] },
  { t: "Posicionar meios — final!", d: "Gire os meios da última camada e o cubo está montado.", tip: "Deixe a lateral já completa atrás.", cases: [
    { label: "Ciclo horário (Ua)", alg: "R2 U R U R' U' R' U' R' U R'" },
    { label: "Ciclo anti-horário (Ub)", alg: "R U' R U R U R U' R' U' R2" },
    { label: "Troca oposta (H)", alg: "M2 U M2 U2 M2 U M2" },
    { label: "Troca vizinha (Z)", alg: "M2 U M2 U M' U2 M2 U2 M'" },
  ] },
];

const setupOf = (alg: string) => invertAlg(parseAlg(alg)).map(moveLabel).join(" ");

function Metodo() {
  return (
    <div className="space-y-10">
      <header className="max-w-2xl space-y-3">
        <h1 className="font-display text-5xl font-extrabold tracking-tight">Passo a passo</h1>
        <p className="text-lg text-muted-foreground">O método de camadas: 7 etapas para montar o cubo pela primeira vez. Cada cubo começa já na situação do caso — aperte Reproduzir para ver como resolver.</p>
      </header>
      <ol className="space-y-6">
        {steps.map((s, i) => (
          <li key={s.t} className="toy-card space-y-6 p-6">
            <div className="space-y-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-border bg-secondary font-bold">{i + 1}</span>
              <h2 className="section-title">{s.t}</h2>
              <p className="text-muted-foreground">{s.d}</p>
              {s.tip && <p className="text-sm font-semibold text-accent">{s.tip}</p>}
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {s.cases.map((c) => (
                <div key={c.label} className="flex flex-col items-center gap-2 rounded-lg border-2 border-dashed border-border p-4">
                  <h3 className="font-display font-bold">{c.label}</h3>
                  <CubePlayer alg={c.alg} setup={setupOf(c.alg)} size={150} />
                </div>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
