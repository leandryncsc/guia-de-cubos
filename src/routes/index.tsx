import { createFileRoute, Link } from "@tanstack/react-router";
import { CubePlayer } from "@/components/Cube3D";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cubo Fácil — aprenda a montar o cubo mágico 3x3" },
      { name: "description", content: "Aprenda a montar o cubo mágico com movimentos ilustrados em 3D, passo a passo e algoritmos OLL e PLL." },
      { property: "og:title", content: "Cubo Fácil — aprenda a montar o cubo mágico 3x3" },
      { property: "og:description", content: "Movimentos ilustrados em 3D, passo a passo para iniciantes e algoritmos OLL/PLL." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const tips = [
  { to: "/notacao", t: "Movimentos básicos", d: "Entenda R, U, F, L, D, B e suas variações com animação 3D." },
  { to: "/metodo", t: "Passo a passo", d: "O método de camadas para montar o cubo pela primeira vez." },
  { to: "/oll", t: "57 casos de OLL", d: "Oriente a última camada com os algoritmos do método CFOP." },
  { to: "/pll", t: "21 casos de PLL", d: "Permute a última camada e finalize o cubo." },
] as const;

function Index() {
  return (
    <div className="space-y-16">
      <section className="grid items-center gap-10 md:grid-cols-2">
        <div className="space-y-5">
          <span className="inline-block rounded-full border-2 border-border bg-secondary px-3 py-1 text-sm font-bold">Cubo mágico 3x3x3</span>
          <h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            Monte o cubo mágico, <span className="text-primary">um giro</span> de cada vez.
          </h1>
          <p className="max-w-md text-lg text-muted-foreground">
            Cada movimento vem com ilustração animada: veja a face girar, pause, avance passo a passo e repita até decorar.
          </p>
          <div className="flex gap-3">
            <Link to="/notacao" className="btn-toy">Aprender os movimentos</Link>
            <Link to="/metodo" className="btn-toy btn-toy-ghost">Começar a montar</Link>
          </div>
        </div>
        <div className="toy-card flex justify-center p-6">
          <CubePlayer alg="(R U R' U')" autoplay loop size={220} />
        </div>
      </section>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tips.map((x) => (
          <Link key={x.to} to={x.to} className="toy-card block p-5 transition-transform hover:-translate-y-1">
            <h3 className="font-display text-xl font-bold">{x.t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{x.d}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
