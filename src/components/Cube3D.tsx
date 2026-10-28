import { useEffect, useMemo, useRef, useState } from "react";
import {
  applyAlg, applyMove, moveInfo, moveLabel, parseAlg, rotate, solved,
  type Move, type Sticker, type Vec,
} from "@/lib/cube";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const unit = (i: number): Vec => [0, 1, 2].map((k) => (k === i ? 1 : 0)) as Vec;

function stickerMatrix(s: Sticker, S: number, anim?: { axis: number; deg: number }) {
  const ax = s.n.findIndex((v) => v !== 0);
  let u = unit((ax + 1) % 3), v = unit((ax + 2) % 3), n: Vec = [...s.n] as Vec;
  let t: Vec = [s.p[0] * S + s.n[0] * (S / 2), s.p[1] * S + s.n[1] * (S / 2), s.p[2] * S + s.n[2] * (S / 2)];
  if (anim) {
    const r = (x: Vec) => rotate(x, anim.axis, anim.deg, false);
    u = r(u); v = r(v); n = r(n); t = r(t);
  }
  const f = (x: Vec) => [x[0], -x[1], x[2]];
  return `matrix3d(${[...f(u), 0, ...f(v), 0, ...f(n), 0, ...f(t), 1].map((x) => x.toFixed(4)).join(",")})`;
}

const VIEWS = { front: [-28, -38], top: [-55, -30], under: [30, -38] } as const;

export function CubeView({ state, anim, size = 180, view = "front", draggable = true }: {
  state: Sticker[]; anim?: { move: Move; t: number } | undefined; size?: number; view?: "front" | "top" | "under" | undefined; draggable?: boolean;
}) {
  const S = size / 3.4;
  const info = anim ? moveInfo(anim.move) : null;
  const ease = anim ? 0.5 - Math.cos(anim.t * Math.PI) / 2 : 0;
  const [rot, setRot] = useState<[number, number]>([...VIEWS[view]]);
  useEffect(() => setRot([...VIEWS[view]]), [view]);
  const drag = useRef<{ x: number; y: number; r: [number, number] } | null>(null);
  return (
    <div
      className={cn("cube-stage", draggable && "cube-stage-drag")}
      style={{ width: size * 1.45, height: size * 1.45 }}
      onPointerDown={draggable ? (e) => { e.currentTarget.setPointerCapture(e.pointerId); drag.current = { x: e.clientX, y: e.clientY, r: rot }; } : undefined}
      onPointerMove={draggable ? (e) => {
        const d = drag.current; if (!d) return;
        setRot([Math.max(-89, Math.min(89, d.r[0] - (e.clientY - d.y) * 0.6)), d.r[1] + (e.clientX - d.x) * 0.6]);
      } : undefined}
      onPointerUp={() => { drag.current = null; }}
      onDoubleClick={() => setRot([...VIEWS[view]])}
      title={draggable ? "Arraste para girar · duplo clique para voltar" : undefined}
    >
      <div className="cube-body" style={{ transform: `rotateX(${rot[0]}deg) rotateY(${rot[1]}deg)` }}>
        {state.map((s, i) => {
          const a = info && info.inLayer(s) ? { axis: info.axis, deg: info.deg * ease } : undefined;
          return (
            <div key={i} className="cube-sticker" style={{ width: S, height: S, padding: S * 0.07, marginLeft: -S / 2, marginTop: -S / 2, transform: stickerMatrix(s, S, a) }}>
              <span style={{ background: `var(--cube-${s.c})` }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function CubePlayer({ alg, setup, loop = false, autoplay = false, size = 180, compact = false, view, showProgress = false }: {
  alg: string; setup?: string; loop?: boolean; autoplay?: boolean; size?: number; compact?: boolean; view?: "front" | "top" | "under" | undefined; showProgress?: boolean;
}) {
  const moves = useMemo(() => parseAlg(alg), [alg]);
  const initial = useMemo(() => applyAlg(solved(), parseAlg(setup ?? "")), [setup]);
  const [state, setState] = useState(initial);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(autoplay);
  const [vw, setVw] = useState(view);
  const [anim, setAnim] = useState<{ move: Move; t: number } | undefined>();
  const raf = useRef(0);

  const reset = () => { cancelAnimationFrame(raf.current); setAnim(undefined); setState(initial); setIdx(0); };
  useEffect(reset, [initial, moves]); // eslint-disable-line react-hooks/exhaustive-deps

  const runMove = (i: number) => {
    const move = moves[i];
    if (!move) return;
    const dur = move.amount === 2 ? 650 : 420;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      if (t < 1) { setAnim({ move, t }); raf.current = requestAnimationFrame(tick); }
      else { setAnim(undefined); setState((s) => applyMove(s, move)); setIdx(i + 1); }
    };
    raf.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (!playing || anim) return;
    if (idx < moves.length) {
      const id = setTimeout(() => runMove(idx), idx === 0 ? 400 : 120);
      return () => clearTimeout(id);
    }
    if (loop) { const id = setTimeout(reset, 1100); return () => clearTimeout(id); }
    setPlaying(false);
    return undefined;
  }, [playing, anim, idx]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const step = () => { if (!anim && idx < moves.length) runMove(idx); };
  const current = anim ? idx : idx - 1;

  return (
    <div className="flex flex-col items-center gap-3">
      <CubeView state={state} anim={anim} size={size} view={vw} draggable={!compact} />
      {!compact && <p className="text-xs text-muted-foreground">Arraste o cubo para girar · duplo clique volta</p>}
      {!compact && (
        <>
          {showProgress ? <div className="space-y-1 text-center text-sm" aria-live="polite">
            <p className="font-semibold">{idx === moves.length ? "Embaralhamento concluído" : `Movimentos: ${idx} de ${moves.length}`}</p>
            <p className="h-6 font-mono text-muted-foreground">{moves[idx] ? <>{anim ? "Girando" : "Próximo"}: <span className="font-bold text-foreground">{moveLabel(moves[idx])}</span></> : "Pronto para a cruz branca"}</p>
          </div> : <div className="flex flex-wrap justify-center gap-1 font-mono text-sm">
            {moves.map((m, i) => (
              <span key={i} className={cn("move-chip", i === current && "move-chip-active", i < current && "move-chip-done")}>
                {moveLabel(m)}
              </span>
            ))}
          </div>}
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            <Button className="btn-toy" onClick={() => { if (idx >= moves.length) reset(); setPlaying((p) => !p); }}>
              {playing ? "Pausar" : idx >= moves.length ? "Repetir" : "Reproduzir"}
            </Button>
            <Button className="btn-toy btn-toy-ghost" onClick={step} disabled={playing || Boolean(anim) || idx >= moves.length}>Passo</Button>
            <Button className="btn-toy btn-toy-ghost" onClick={() => { setPlaying(false); reset(); }}>Reiniciar</Button>
            <Button className="btn-toy btn-toy-ghost" onClick={() => setVw((v) => (v === "under" ? "front" : "under"))}>{vw === "under" ? "Ver cima" : "Ver baixo"}</Button>
          </div>
        </>
      )}
    </div>
  );
}

// Vista superior 2D da última camada (para OLL/PLL)
export function TopView({ state, size = 110 }: { state: Sticker[]; size?: number }) {
  const c = size / 5;
  const cells: { x: number; y: number; w: number; h: number; col: string }[] = [];
  for (const s of state) {
    if (s.p[1] !== 1) continue;
    const gx = s.p[0] + 2, gy = s.p[2] + 2;
    const col = `var(--cube-${s.c})`;
    if (s.n[1] === 1) cells.push({ x: gx * c, y: gy * c, w: c, h: c, col });
    else if (s.n[2] === 1) cells.push({ x: gx * c, y: 4 * c + c * 0.15, w: c, h: c * 0.55, col });
    else if (s.n[2] === -1) cells.push({ x: gx * c, y: c * 0.3, w: c, h: c * 0.55, col });
    else if (s.n[0] === 1) cells.push({ x: 4 * c + c * 0.15, y: gy * c, w: c * 0.55, h: c, col });
    else cells.push({ x: c * 0.3, y: gy * c, w: c * 0.55, h: c, col });
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {cells.map((r, i) => (
        <rect key={i} x={r.x + 1.5} y={r.y + 1.5} width={r.w - 3} height={r.h - 3} rx={3} fill={r.col} stroke="var(--foreground)" strokeWidth={1.5} />
      ))}
    </svg>
  );
}
