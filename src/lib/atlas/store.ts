import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AtlasPort } from "./types";

type AtlasState = {
  ports: AtlasPort[];
  add: (port: AtlasPort) => void;
  remove: (id: string) => void;
};

export const useAtlas = create<AtlasState>()(
  persist(
    (set) => ({
      ports: [],
      add: (port) =>
        set((state) => ({
          ports: [...state.ports.filter((item) => item.id !== port.id), port],
        })),
      remove: (id) =>
        set((state) => ({
          ports: state.ports.filter((item) => item.id !== id),
        })),
    }),
    { name: "living-atlas" },
  ),
);
