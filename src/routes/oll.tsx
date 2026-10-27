import { createFileRoute } from "@tanstack/react-router";
import { AlgSection } from "@/components/AlgCard";
import { OLL } from "@/lib/algs";

export const Route = createFileRoute("/oll")({
  head: () => ({
    meta: [
      { title: "OLL: os 57 casos com algoritmos — Cubo Fácil" },
      { name: "description", content: "Todos os 57 casos de OLL do método CFOP com ilustração e animação 3D de cada algoritmo." },
      { property: "og:title", content: "OLL: os 57 casos com algoritmos" },
      { property: "og:description", content: "Orientação da última camada com animação 3D." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <div className="space-y-10">
      <header className="max-w-2xl space-y-3">
        <h1 className="font-display text-5xl font-extrabold tracking-tight">OLL</h1>
        <p className="text-lg text-muted-foreground">
          Orientation of Last Layer: terceira etapa do CFOP, logo após o F2L. Deixa toda a face amarela pronta. São 57 casos, cada um com seu algoritmo.
        </p>
      </header>
      <AlgSection groups={OLL} />
    </div>
  ),
});
