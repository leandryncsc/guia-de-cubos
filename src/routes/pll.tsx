import { createFileRoute } from "@tanstack/react-router";
import { AlgSection } from "@/components/AlgCard";
import { PLL } from "@/lib/algs";

export const Route = createFileRoute("/pll")({
  head: () => ({
    meta: [
      { title: "PLL: os 21 casos com algoritmos — Cubo Fácil" },
      { name: "description", content: "Todos os 21 casos de PLL do método CFOP com ilustração e animação 3D." },
      { property: "og:title", content: "PLL: os 21 casos com algoritmos" },
      { property: "og:description", content: "Permutação da última camada com animação 3D." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <div className="space-y-10">
      <header className="max-w-2xl space-y-3">
        <h1 className="font-display text-5xl font-extrabold tracking-tight">PLL</h1>
        <p className="text-lg text-muted-foreground">
          Permutation of Last Layer: a etapa final do CFOP. Identifique o padrão entre os 21 casos e finalize o cubo.
        </p>
      </header>
      <AlgSection groups={PLL} />
    </div>
  ),
});
