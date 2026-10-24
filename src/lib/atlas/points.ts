import raw from "./atlas_points.json";
import type { AtlasFile, AtlasPoint } from "./types";

export const ATLAS = raw as AtlasFile;

export function pointById(id: string): AtlasPoint | undefined {
  return ATLAS.points.find((point) => point.id === id);
}

export const STANDING_LABEL = {
  named: "On the record",
  proposed: "Proposed, not installed",
  open: "Open",
} as const;
