import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Download, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AtlasSvg } from "@/components/atlas/atlas-svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CHIP, pairNote } from "@/lib/atlas/layout";
import { ATLAS, pointById, STANDING_LABEL } from "@/lib/atlas/points";
import { useAtlas } from "@/lib/atlas/store";
import type { AtlasPort } from "@/lib/atlas/types";
import { SEEDS, hostOf } from "@/lib/fcp";

const KIND_ORDER = ["loop", "path", "gate", "fft"] as const;

export function AtlasPage() {
  const ports = useAtlas((state) => state.ports);
  const add = useAtlas((state) => state.add);
  const remove = useAtlas((state) => state.remove);
  const [ready, setReady] = useState(false);
  const [selectedId, setSelectedId] = useState(ATLAS.hinge);
  const [name, setName] = useState("");
  const [href, setHref] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    const finish = () => setReady(true);
    const unsub = useAtlas.persist.onFinishHydration(finish);
    if (useAtlas.persist.hasHydrated()) finish();
    return unsub;
  }, []);

  const visiblePorts = ready ? ports : [];
  const selected = pointById(selectedId);
  const selectedPort = visiblePorts.find((port) => port.id === selectedId);
  const twin = selected ? pairNote(ATLAS.twins, selected.id) : null;
  const twinOther = twin ? pointById(twin.other) : undefined;

  const known = useMemo(
    () => SEEDS.filter((seed) => seed.href && !ports.some((port) => port.href === seed.href)),
    [ports],
  );

  function seat(port: AtlasPort) {
    add(port);
    setSelectedId(port.id);
    toast(`Seated ${port.name}`);
  }

  function onSeat(event: FormEvent) {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    const address = href.trim();
    const next: AtlasPort = {
      id: `port-${crypto.randomUUID()}`,
      name: trimmed,
      href: address ? (address.startsWith("http") ? address : `https://${address}`) : "",
      note: note.trim() || "Seated from this page.",
    };
    seat(next);
    setName("");
    setHref("");
    setNote("");
  }

  function downloadJson() {
    const payload = {
      ...ATLAS,
      ports: visiblePorts,
      note: "Ports are appended. The twenty-five seats are not rewritten.",
    };
    saveBlob(JSON.stringify(payload, null, 2), "atlas_points.json", "application/json");
  }

  function downloadSvg() {
    const node = document.querySelector("[data-atlas-sheet]");
    if (!node) return;
    const text = new XMLSerializer().serializeToString(node);
    saveBlob(text, "atlas.svg", "image/svg+xml");
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6">
      <header className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-xs tracking-wide text-muted uppercase">Living atlas</p>
          <a
            href="/connect"
            className="font-mono text-xs text-muted underline-offset-4 hover:text-fg hover:underline"
          >
            Connect a profile
          </a>
        </div>
        <h1 className="font-display text-4xl leading-tight text-fg sm:text-5xl">
          Twenty-five seats. The handoff is still open.
        </h1>
        <p className="max-w-2xl text-base text-muted">
          Engineers request the drills, the office assigns the lots, E&D Logs receives the jobs,
          and the Drilling Coordinator directs the rigs. Nobody in that chain is named as the one
          who files the GSOC ticket or confirms Positive Response before the ground is opened.
        </p>
      </header>

      <ol className="grid gap-2 sm:grid-cols-5">
        {ATLAS.chain.map((step) => (
          <li
            key={`${step.step}-${step.who}`}
            className={
              step.gap
                ? "flex flex-col gap-1 rounded-md bg-warn-soft p-3 shadow-[var(--shadow-border)]"
                : "flex flex-col gap-1 rounded-md bg-elevated p-3 shadow-[var(--shadow-border)]"
            }
          >
            <span className="font-mono text-xs text-muted">{step.gap ? "Gap" : `Step ${step.step}`}</span>
            <span className="text-sm text-fg">{step.who}</span>
            {step.person ? <span className="text-xs text-muted">{step.person}</span> : null}
            <span className="text-sm text-muted">{step.does}</span>
          </li>
        ))}
      </ol>

      <div className="grid items-start gap-6 lg:grid-cols-2">
        <div className="max-h-screen overflow-auto rounded-lg bg-elevated p-3 shadow-[var(--shadow-border)]">
          <AtlasSvg
            points={ATLAS.points}
            ports={visiblePorts}
            twins={ATLAS.twins}
            hingeId={ATLAS.hinge}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>

        <div className="flex flex-col gap-4">
          {selected ? (
            <article className="flex flex-col gap-4 rounded-lg bg-subtle p-4 shadow-[var(--shadow-border)]">
              <div className="flex flex-wrap items-center gap-2">
                <Chip kind={selected.kind} />
                <span className="font-mono text-xs text-muted">{CHIP[selected.kind].munsell}</span>
                <span className="font-mono text-xs text-muted">{STANDING_LABEL[selected.standing]}</span>
                {selected.id === ATLAS.hinge ? (
                  <span className="font-mono text-xs text-warn">Hinge · no twin</span>
                ) : null}
              </div>
              <h2 className="font-display text-3xl text-fg">{selected.name}</h2>
              <p className="text-sm text-fg">{selected.descriptor}</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {selected.analogies.map((line) => (
                  <p key={line} className="rounded-sm bg-elevated p-3 text-sm text-muted">
                    {line}
                  </p>
                ))}
              </div>
              <p className="text-sm text-fg">{selected.evaluation}</p>
              <p className="text-sm text-muted">
                Owner <span className="text-fg">{selected.owner}</span>
              </p>
              {twin && twinOther ? (
                <p className="text-sm text-muted">
                  Twin {twin.primes[0]}·{twin.primes[1]} with{" "}
                  <button
                    type="button"
                    className="text-fg underline-offset-4 hover:underline"
                    onClick={() => setSelectedId(twinOther.id)}
                  >
                    {twinOther.name}
                  </button>
                  . {twin.note}
                </p>
              ) : null}
              <Lanes r={selected.lane.r} g={selected.lane.g} b={selected.lane.b} />
            </article>
          ) : selectedPort ? (
            <article className="flex flex-col gap-3 rounded-lg bg-subtle p-4 shadow-[var(--shadow-border)]">
              <div className="flex flex-wrap items-center gap-2">
                <Chip kind="port" />
                <span className="font-mono text-xs text-muted">{CHIP.port.munsell}</span>
              </div>
              <h2 className="font-display text-3xl text-fg">{selectedPort.name}</h2>
              <p className="text-sm text-muted">{selectedPort.note}</p>
              {selectedPort.href ? (
                <a
                  href={selectedPort.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-fg underline-offset-4 hover:underline"
                >
                  {hostOf(selectedPort.href)}
                </a>
              ) : (
                <p className="text-sm text-muted">No address yet.</p>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  remove(selectedPort.id);
                  setSelectedId(ATLAS.hinge);
                }}
              >
                <Trash2 />
                Unseat
              </Button>
            </article>
          ) : null}

          <div className="flex flex-col gap-2">
            {KIND_ORDER.map((kind) => (
              <div key={kind} className="flex flex-wrap gap-2">
                {ATLAS.points
                  .filter((point) => point.kind === kind)
                  .map((point) => (
                    <button
                      key={point.id}
                      type="button"
                      onClick={() => setSelectedId(point.id)}
                      className={
                        point.id === selectedId
                          ? "h-11 rounded-sm bg-accent px-3 text-sm text-accent-foreground"
                          : "h-11 rounded-sm bg-elevated px-3 text-sm text-fg shadow-[var(--shadow-border)]"
                      }
                    >
                      {point.name}
                    </button>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="font-display text-2xl text-fg">Twin-prime table</h2>
        <p className="max-w-2xl text-sm text-muted">
          Twelve pairs. Handoff is the unpaired seat: the ticket owner is not in the dataset
          because nobody has been named.
        </p>
        <div className="overflow-x-auto rounded-lg shadow-[var(--shadow-border)]">
          <table className="w-full min-w-lg border-collapse text-left text-sm">
            <thead className="bg-elevated font-mono text-xs text-muted">
              <tr>
                <th className="px-3 py-3 font-medium">Twin</th>
                <th className="px-3 py-3 font-medium">Left</th>
                <th className="px-3 py-3 font-medium">Right</th>
                <th className="px-3 py-3 font-medium">Why they sit together</th>
              </tr>
            </thead>
            <tbody>
              {ATLAS.twins.map((row) => (
                <tr key={row.primes.join("-")} className="border-t border-border">
                  <td className="px-3 py-3 font-mono text-xs text-muted">
                    {row.primes[0]} · {row.primes[1]}
                  </td>
                  <td className="px-3 py-3">
                    <button type="button" className="text-fg" onClick={() => setSelectedId(row.a)}>
                      {pointById(row.a)?.name}
                    </button>
                  </td>
                  <td className="px-3 py-3">
                    <button type="button" className="text-fg" onClick={() => setSelectedId(row.b)}>
                      {pointById(row.b)?.name}
                    </button>
                  </td>
                  <td className="px-3 py-3 text-muted">{row.note}</td>
                </tr>
              ))}
              <tr className="border-t border-border bg-warn-soft">
                <td className="px-3 py-3 font-mono text-xs text-muted">—</td>
                <td className="px-3 py-3">
                  <button type="button" className="text-fg" onClick={() => setSelectedId(ATLAS.hinge)}>
                    Handoff
                  </button>
                </td>
                <td className="px-3 py-3 text-muted">No twin</td>
                <td className="px-3 py-3 text-fg">GSOC ticket and Positive Response. Owner unassigned.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={onSeat} className="flex flex-col gap-3 rounded-lg bg-elevated p-4 shadow-[var(--shadow-border)]">
          <h2 className="font-display text-2xl text-fg">Seat a port</h2>
          <p className="text-sm text-muted">
            {visiblePorts.length} seated. {ATLAS.volume.ports} is the declared volume, not a lock.
            The {ATLAS.volume.workflows} workflows are declared and not written here. A proposed
            chain is not a procedure you can run.
          </p>
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Name"
            aria-label="Port name"
          />
          <Input
            value={href}
            onChange={(event) => setHref(event.target.value)}
            placeholder="Address, if you have one"
            aria-label="Port address"
            inputMode="url"
          />
          <Input
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="What it already does"
            aria-label="Port note"
          />
          <Button type="submit" disabled={!ready || !name.trim()}>
            Seat port
          </Button>
        </form>

        <div className="flex flex-col gap-3">
          <h2 className="font-display text-2xl text-fg">Already on the board</h2>
          <p className="text-sm text-muted">
            These are profiles the connect page already knows. Seating one does not open it, and
            it does not replace Spectra QEST or Construction Hive.
          </p>
          <div className="flex flex-wrap gap-2">
            {known.map((seed) => (
              <Button
                key={seed.id}
                variant="outline"
                size="sm"
                disabled={!ready}
                onClick={() =>
                  seat({
                    id: `port-${seed.id}`,
                    name: seed.name,
                    href: seed.href,
                    note: seed.note,
                  })
                }
              >
                {seed.name}
              </Button>
            ))}
          </div>
          {visiblePorts.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {visiblePorts.map((port) => (
                <li key={port.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(port.id)}
                    className="text-sm text-fg underline-offset-4 hover:underline"
                  >
                    {port.name}
                    {port.href ? ` · ${hostOf(port.href)}` : ""}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>

      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={downloadJson}>
          <Download />
          Dataset
        </Button>
        <Button variant="outline" onClick={downloadSvg}>
          <Download />
          Sheet
        </Button>
      </div>

      <p className="max-w-2xl text-xs text-subtle-fg">
        Chip names ({Object.values(CHIP).map((chip) => chip.munsell).join(", ")}) label these
        tokens. They are not measured Munsell renotations. R is Dream, G is Field, B is Street. Nothing on this sheet authorizes excavation.
      </p>
    </div>
  );
}

function Chip({ kind }: { kind: keyof typeof CHIP }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs text-muted">
      <span className={`inline-block size-2 rounded-full border ${strokeClassFor(kind)} bg-bg`} />
      {CHIP[kind].label}
    </span>
  );
}

function strokeClassFor(kind: keyof typeof CHIP): string {
  if (kind === "loop") return "border-keep";
  if (kind === "path") return "border-warn";
  if (kind === "gate") return "border-accent";
  if (kind === "fft") return "border-danger";
  return "border-muted";
}

function Lanes({ r, g, b }: { r: number; g: number; b: number }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex h-2 overflow-hidden rounded-full bg-bg">
        <span className="bg-danger" style={{ width: `${r * 100}%` }} />
        <span className="bg-keep" style={{ width: `${g * 100}%` }} />
        <span className="bg-street" style={{ width: `${b * 100}%` }} />
      </div>
      <p className="font-mono text-xs text-muted">
        Dream {r.toFixed(2)} · Field {g.toFixed(2)} · Street {b.toFixed(2)}
      </p>
    </div>
  );
}

function saveBlob(text: string, filename: string, type: string) {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
