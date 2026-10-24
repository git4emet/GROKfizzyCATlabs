import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Copy, ExternalLink, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  GROUP_LABEL,
  draftFromQuery,
  findExact,
  hostOf,
  looksLikeAddress,
  matches,
  toPacket,
  type Fcp,
  type FcpGroup,
} from "@/lib/fcp";
import { mergeBoard, useFcp } from "@/lib/fcp-store";
import { probeFcp } from "@/lib/probe";

const ORDER: FcpGroup[] = ["ring", "study", "bench", "made"];

export function AdapterPage() {
  const extras = useFcp((state) => state.extras);
  const hrefs = useFcp((state) => state.hrefs);
  const results = useFcp((state) => state.results);
  const add = useFcp((state) => state.add);
  const setHref = useFcp((state) => state.setHref);
  const setResult = useFcp((state) => state.setResult);
  const remove = useFcp((state) => state.remove);
  const [hydrated, setHydrated] = useState(false);
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    const finish = () => setHydrated(true);
    const unsub = useFcp.persist.onFinishHydration(finish);
    if (useFcp.persist.hasHydrated()) finish();
    return unsub;
  }, []);

  const board = useMemo(
    () => (hydrated ? mergeBoard(extras, hrefs) : mergeBoard([], {})),
    [extras, hrefs, hydrated],
  );
  const visible = board.filter((fcp) => matches(fcp, query));
  const exact = findExact(board, query);
  const trimmed = query.trim();

  async function connect(fcp: Fcp) {
    if (!fcp.href) return;
    window.open(fcp.href, "_blank", "noopener,noreferrer");
    setBusy(fcp.id);
    try {
      const result = await probeFcp({ data: { href: fcp.href } });
      setResult(fcp.id, { ok: result.ok, detail: result.detail, at: new Date().toISOString() });
    } catch {
      setResult(fcp.id, {
        ok: false,
        detail: "Opened. The check did not finish.",
        at: new Date().toISOString(),
      });
    } finally {
      setBusy(null);
    }
  }

  function make() {
    if (!trimmed || exact) return;
    const draft = draftFromQuery(trimmed);
    add(draft);
    setQuery("");
    toast(`Made ${draft.name}`);
    if (draft.href) void connect(draft);
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (exact?.href) {
      void connect(exact);
      return;
    }
    make();
  }

  async function copyOne(fcp: Fcp) {
    try {
      await navigator.clipboard.writeText(JSON.stringify(toPacket(fcp), null, 2));
      toast(`Copied ${fcp.name}`);
    } catch {
      toast("Copy is blocked in this view");
    }
  }

  function downloadAll() {
    const blob = new Blob([JSON.stringify(board.map(toPacket), null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "fcp-adapter.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  const primaryLabel = !trimmed
    ? "Make or connect"
    : exact?.href
      ? `Connect ${exact.name}`
      : exact
        ? "Needs an address"
        : looksLikeAddress(trimmed)
          ? "Make FCP and connect"
          : "Make FCP";

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6">
      <header className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-xs tracking-wide text-muted uppercase">Adapter</p>
          <a
            href="/"
            className="font-mono text-xs text-muted underline-offset-4 hover:text-fg hover:underline"
          >
            Atlas
          </a>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <h1 className="font-display text-4xl leading-tight text-fg">FCP</h1>
            <p className="mt-2 text-muted">
              Paste an address to connect it. Name something that does not have one, and this makes the card.
            </p>
          </div>
          <Button type="button" variant="outline" onClick={downloadAll}>
            <Copy />
            Download the set
          </Button>
        </div>
      </header>

      <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row">
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Chabad.org, a new name, or https://…"
          aria-label="Name or address"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
        />
        <Button type="submit" className="sm:min-w-52" disabled={!trimmed || (!!exact && !exact.href)}>
          {exact?.href ? <ExternalLink /> : <Plus />}
          {primaryLabel}
        </Button>
      </form>

      {ORDER.map((group) => {
        const cards = visible.filter((fcp) => fcp.group === group);
        if (cards.length === 0) return null;
        return (
          <section key={group} className="flex flex-col gap-3">
            <h2 className="font-mono text-xs tracking-wide text-muted uppercase">{GROUP_LABEL[group]}</h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {cards.map((fcp) => (
                <article
                  key={fcp.id}
                  className="flex flex-col gap-3 rounded-lg bg-elevated p-4 shadow-[var(--shadow-border)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-medium text-fg">{fcp.name}</h3>
                      <p className="mt-1 text-sm text-muted">{fcp.note}</p>
                    </div>
                    {fcp.madeHere ? (
                      <Button type="button" variant="ghost" size="icon" onClick={() => remove(fcp.id)} aria-label={`Remove ${fcp.name}`}>
                        <Trash2 />
                      </Button>
                    ) : null}
                  </div>

                  {fcp.href ? (
                    <p className="truncate font-mono text-xs text-subtle-fg">{hostOf(fcp.href)}</p>
                  ) : (
                    <Input
                      id={`href-${fcp.id}`}
                      placeholder="Paste the address"
                      aria-label={`Address for ${fcp.name}`}
                      onBlur={(event) => {
                        const next = event.target.value.trim();
                        if (!next) return;
                        setHref(fcp.id, next.startsWith("http") ? next : `https://${next}`);
                      }}
                      onKeyDown={(event) => {
                        if (event.key !== "Enter") return;
                        event.preventDefault();
                        const next = event.currentTarget.value.trim();
                        if (!next) return;
                        setHref(fcp.id, next.startsWith("http") ? next : `https://${next}`);
                      }}
                    />
                  )}

                  <div className="mt-auto flex flex-wrap gap-2">
                    <Button
                      type="button"
                      disabled={!fcp.href || busy === fcp.id}
                      onClick={() => void connect(fcp)}
                    >
                      <ExternalLink />
                      {busy === fcp.id ? "Connecting" : "Connect"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => void copyOne(fcp)}>
                      <Copy />
                      Copy FCP
                    </Button>
                  </div>

                  {results[fcp.id] ? (
                    <p className={results[fcp.id].ok ? "text-sm text-keep" : "text-sm text-warn"}>
                      {results[fcp.id].detail}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
