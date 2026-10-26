import { createFileRoute } from "@tanstack/react-router";
import { CubePlayer } from "@/components/Cube3D";

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

const steps = [
  { t: "Cruz branca", d: "Monte uma cruz na face branca, alinhando cada meio com o centro da lateral. Faça de forma intuitiva; se o meio estiver na frente, invertido, use o algoritmo.", alg: "F' U' R' U", tip: "Dica: comece com o centro branco para cima e depois vire o cubo." },
  { t: "Cantos brancos", d: "Com a cruz para baixo, coloque o canto branco embaixo do seu lugar (frente-direita) e repita o algoritmo até ele encaixar.", alg: "(R U R' U')", tip: "Repita até 6 vezes — o canto sempre se resolve." },
  { t: "Segunda camada (meio para a direita)", d: "Ache um meio sem amarelo na camada de cima, alinhe com o centro da frente e leve para a direita.", alg: "U R U' R' U' F' U F", tip: "Use a versão para a esquerda espelhando o movimento." },
  { t: "Segunda camada (meio para a esquerda)", d: "Mesmo princípio, levando a peça para o lado esquerdo.", alg: "U' L' U L U F U' F'", tip: "" },
  { t: "Cruz amarela", d: "Com o amarelo em cima, faça este algoritmo até formar a cruz (ponto → L → linha → cruz).", alg: "F R U R' U' F'", tip: "Com o L, deixe-o no canto de trás-esquerda. Com a linha, deixe-a horizontal." },
  { t: "Face amarela (Sune)", d: "Oriente os cantos para completar a face amarela.", alg: "R U R' U R U2 R'", tip: "Com 1 canto amarelo em cima, deixe-o na frente-esquerda." },
  { t: "Posicionar cantos", d: "Troque os cantos da última camada até todos ficarem no lugar.", alg: "R' F R' B2 R F' R' B2 R2", tip: "Deixe os dois cantos já corretos atrás." },
  { t: "Posicionar meios — final!", d: "Gire os meios da última camada e o cubo está montado.", alg: "R2 U R U R' U' R' U' R' U R'", tip: "Deixe a face completa atrás; repita se precisar." },
];

function Metodo() {
  return (
    <div className="space-y-10">
      <header className="max-w-2xl space-y-3">
        <h1 className="font-display text-5xl font-extrabold tracking-tight">Passo a passo</h1>
        <p className="text-lg text-muted-foreground">O método de camadas: 7 etapas simples para montar o cubo pela primeira vez.</p>
      </header>
      <ol className="space-y-6">
        {steps.map((s, i) => (
          <li key={s.t} className="toy-card grid items-center gap-6 p-6 md:grid-cols-[1fr_auto]">
            <div className="space-y-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-border bg-secondary font-bold">{i + 1}</span>
              <h2 className="section-title">{s.t}</h2>
              <p className="text-muted-foreground">{s.d}</p>
              {s.tip && <p className="text-sm font-semibold text-accent">{s.tip}</p>}
            </div>
            <CubePlayer alg={s.alg} size={170} />
          </li>
        ))}
      </ol>
    </div>
  );
}
