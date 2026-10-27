import { createFileRoute } from "@tanstack/react-router";
import { CubePlayer } from "@/components/Cube3D";

export const Route = createFileRoute("/notacao")({
  head: () => ({
    meta: [
      { title: "Movimentos básicos do cubo mágico 3x3 — Cubo Fácil" },
      { name: "description", content: "Notação do cubo mágico ilustrada: R, L, U, D, F, B, giros anti-horários, duplos, camadas do meio e rotações." },
      { property: "og:title", content: "Movimentos básicos do cubo mágico 3x3" },
      { property: "og:description", content: "Cada letra da notação animada em 3D." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Notacao,
});

const groups: { title: string; intro: string; moves: [string, string][] }[] = [
  {
    title: "Faces (sentido horário)",
    intro: "Cada letra é uma face. O giro horário é como se você estivesse olhando de frente para aquela face.",
    moves: [["R", "Direita (Right)"], ["L", "Esquerda (Left)"], ["U", "Cima (Up)"], ["D", "Baixo (Down)"], ["F", "Frente (Front)"], ["B", "Trás (Back)"]],
  },
  {
    title: "Anti-horário (')",
    intro: "O apóstrofo ' (lê-se \"linha\") inverte o sentido do giro.",
    moves: [["R'", "Direita anti-horário"], ["L'", "Esquerda anti-horário"], ["U'", "Cima anti-horário"], ["D'", "Baixo anti-horário"], ["F'", "Frente anti-horário"], ["B'", "Trás anti-horário"]],
  },
  {
    title: "Giros duplos (2)",
    intro: "O número 2 indica meia volta (180°). O sentido não importa.",
    moves: [["R2", "Direita duas vezes"], ["U2", "Cima duas vezes"], ["F2", "Frente duas vezes"]],
  },
  {
    title: "Camadas do meio",
    intro: "M segue o sentido de L, E segue o de D e S segue o de F.",
    moves: [["M", "Meio (Middle)"], ["E", "Equador"], ["S", "Standing"]],
  },
  {
    title: "Duas camadas (w)",
    intro: "Com w (ou letra minúscula) giram a face e a camada do meio juntas.",
    moves: [["Rw", "Direita dupla (r)"], ["Lw", "Esquerda dupla (l)"], ["Uw", "Cima dupla (u)"], ["Fw", "Frente dupla (f)"]],
  },
  {
    title: "Rotações do cubo inteiro",
    intro: "x, y e z giram o cubo todo na mão, sem mexer nas peças entre si.",
    moves: [["x", "Como R, cubo inteiro"], ["y", "Como U, cubo inteiro"], ["z", "Como F, cubo inteiro"]],
  },
];

function Notacao() {
  return (
    <div className="space-y-12">
      <header className="max-w-2xl space-y-3">
        <h1 className="font-display text-5xl font-extrabold tracking-tight">Movimentos básicos</h1>
        <p className="text-lg text-muted-foreground">
          Segure o cubo com a face verde para você e a amarela para cima. Cada cartão mostra o giro em loop.
        </p>
      </header>
      {groups.map((g) => (
        <section key={g.title}>
          <h2 className="section-title">{g.title}</h2>
          <p className="mb-5 mt-1 text-muted-foreground">{g.intro}</p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {g.moves.map(([m, d]) => (
              <div key={m} className="toy-card flex flex-col items-center p-3 text-center">
                <span className="font-mono text-3xl font-bold">{m}</span>
                <CubePlayer alg={m} autoplay loop compact size={110} />
                <span className="text-xs text-muted-foreground">{d}</span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
