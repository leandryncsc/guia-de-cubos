import { createFileRoute } from "@tanstack/react-router";
import { CubePlayer } from "@/components/Cube3D";
import { SCRAMBLE, SOLVE_STEPS, stepSetup } from "@/lib/solve";

export const Route = createFileRoute("/metodo")({
  head: () => ({
    meta: [
      { title: "Passo a passo para montar o cubo mágico — Cubo Fácil" },
      { name: "description", content: "Uma montagem completa do cubo mágico pelo método de camadas, etapa por etapa, com animação 3D." },
      { property: "og:title", content: "Passo a passo para montar o cubo mágico" },
      { property: "og:description", content: "Montagem completa, cada etapa continuando da anterior." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Metodo,
});

function Metodo() {
  return (
    <div className="space-y-10">
      <header className="max-w-3xl space-y-4">
        <h1 className="font-display text-5xl font-extrabold tracking-tight">Passo a passo</h1>
        <p className="text-lg text-muted-foreground">
          Uma montagem completa do começo ao fim. Cada etapa continua exatamente de onde a anterior parou — faça junto no seu cubo.
        </p>
        <div className="toy-card space-y-2 p-4">
          <p className="font-bold">Embaralhe assim (amarelo em cima, verde na frente):</p>
          <code className="block font-mono text-sm leading-relaxed">{SCRAMBLE}</code>
        </div>
      </header>
      <ol className="space-y-6">
        {SOLVE_STEPS.map((s, i) => (
          <li key={s.t} className="toy-card grid items-center gap-6 p-6 md:grid-cols-[1fr_auto]">
            <div className="space-y-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-border bg-secondary font-bold">{i + 1}</span>
              <h2 className="section-title">{s.t}</h2>
              <p className="text-muted-foreground">{s.d}</p>
              <p className="text-sm font-semibold text-accent">{s.tip}</p>
              {i > 0 && <p className="text-xs text-muted-foreground">Começa onde a etapa {i} terminou.</p>}
            </div>
            <div className="max-w-md">
              <CubePlayer alg={s.alg} setup={stepSetup(i)} size={170} view={i < 2 ? "under" : "front"} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
