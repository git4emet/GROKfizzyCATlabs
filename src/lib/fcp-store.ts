import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SEEDS, type Fcp, type LinkResult } from "./fcp";

type FcpState = {
  extras: Fcp[];
  hrefs: Record<string, string>;
  results: Record<string, LinkResult>;
  add: (fcp: Fcp) => void;
  setHref: (id: string, href: string) => void;
  setResult: (id: string, result: LinkResult) => void;
  remove: (id: string) => void;
};

export const useFcp = create<FcpState>()(
  persist(
    (set) => ({
      extras: [],
      hrefs: {},
      results: {},
      add: (fcp) =>
        set((state) => ({
          extras: [fcp, ...state.extras.filter((item) => item.id !== fcp.id)],
        })),
      setHref: (id, href) =>
        set((state) => ({
          hrefs: { ...state.hrefs, [id]: href },
          extras: state.extras.map((item) => (item.id === id ? { ...item, href } : item)),
        })),
      setResult: (id, result) =>
        set((state) => ({ results: { ...state.results, [id]: result } })),
      remove: (id) =>
        set((state) => ({
          extras: state.extras.filter((item) => item.id !== id),
        })),
    }),
    { name: "fcp-adapter" },
  ),
);

export function mergeBoard(
  extras: Fcp[],
  hrefs: Record<string, string>,
): Fcp[] {
  const seeded = SEEDS.map((fcp) =>
    hrefs[fcp.id] !== undefined ? { ...fcp, href: hrefs[fcp.id] } : fcp,
  );
  const ids = new Set(seeded.map((fcp) => fcp.id));
  return [...extras.filter((fcp) => !ids.has(fcp.id)), ...seeded];
}
