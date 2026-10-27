import { useMemo, useState } from "react";
import { applyAlg, invertAlg, parseAlg, solved } from "@/lib/cube";
import { CubePlayer, TopView } from "./Cube3D";
import type { AlgGroup } from "@/lib/algs";

function Card({ name, alg }: { name: string; alg: string }) {
  const [open, setOpen] = useState(false);
  const setup = useMemo(() => invertAlg(parseAlg(alg)), [alg]);
  const caseState = useMemo(() => applyAlg(solved(), setup), [setup]);
  const setupStr = setup.map((m) => m.face + (m.amount === 2 ? "2" : m.amount === -1 ? "'" : "")).join(" ");
  return (
    <div className="toy-card flex flex-col items-center gap-3 p-4">
      <div className="flex w-full items-center justify-between">
        <h3 className="font-display text-lg font-bold">{name}</h3>
        <button className="btn-toy btn-toy-ghost text-xs" onClick={() => setOpen((o) => !o)}>
          {open ? "Fechar" : "Ver 3D"}
        </button>
      </div>
      {open ? <CubePlayer alg={alg} setup={setupStr} size={150} view="top" /> : <TopView state={caseState} />}
      <div className="w-full space-y-2 text-center">
        <div>
          <p className="mb-0.5 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Algoritmo que resolve o caso</p>
          <code className="font-mono text-sm leading-relaxed">{alg}</code>
        </div>
        <div>
          <p className="mb-0.5 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Setup (como colocar o caso)</p>
          <code className="font-mono text-sm leading-relaxed">{setupStr}</code>
        </div>
      </div>
    </div>
  );
}

export function AlgSection({ groups }: { groups: AlgGroup[] }) {
  return (
    <div className="space-y-12">
      {groups.map((g) => (
        <section key={g.group}>
          <h2 className="section-title mb-5">{g.group}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {g.cases.map((c) => <Card key={c.name + c.alg} {...c} />)}
          </div>
        </section>
      ))}
    </div>
  );
}
