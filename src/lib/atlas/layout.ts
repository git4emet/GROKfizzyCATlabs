import type { AtlasKind, AtlasPoint, AtlasPort, LaidPoint, TwinRow } from "./types";

export const WIDTH = 440;
export const ROW = 62;
export const PAD_TOP = 40;
export const SPINE = 220;

export const CHIP: Record<
  AtlasKind | "port",
  { label: string; munsell: string; stroke: string }
> = {
  loop: { label: "Loop", munsell: "5G 5/4", stroke: "var(--color-keep)" },
  path: { label: "Path", munsell: "5Y 6/4", stroke: "var(--color-warn)" },
  gate: { label: "Gate", munsell: "N 8/0", stroke: "var(--color-accent)" },
  fft: { label: "FFT", munsell: "5R 6/4", stroke: "var(--color-danger)" },
  port: { label: "Port", munsell: "N 5/0", stroke: "var(--color-muted)" },
};

const STROKE_CLASS: Record<AtlasKind | "port", string> = {
  loop: "stroke-keep",
  path: "stroke-warn",
  gate: "stroke-accent",
  fft: "stroke-danger",
  port: "stroke-muted",
};

export function strokeClass(kind: AtlasKind | "port"): string {
  return STROKE_CLASS[kind];
}

export function sheetHeight(count: number): number {
  return PAD_TOP + Math.max(count, 1) * ROW + 24;
}

export function layPoints(points: AtlasPoint[], hingeId: string): LaidPoint[] {
  return points.map((point, index) => {
    const hinge = point.id === hingeId;
    const side: -1 | 0 | 1 = hinge ? 0 : index % 2 === 0 ? -1 : 1;
    const x = hinge ? SPINE : side < 0 ? SPINE - 70 : SPINE + 70;
    return {
      ...point,
      index,
      hinge,
      side,
      x,
      y: PAD_TOP + index * ROW,
    };
  });
}

export function layPorts(
  ports: AtlasPort[],
  startIndex: number,
): Array<AtlasPort & { x: number; y: number; side: -1 | 1; index: number }> {
  return ports.map((port, offset) => {
    const index = startIndex + offset;
    const side: -1 | 1 = index % 2 === 0 ? -1 : 1;
    return {
      ...port,
      index,
      side,
      x: side < 0 ? SPINE - 70 : SPINE + 70,
      y: PAD_TOP + index * ROW,
    };
  });
}

export function pairNote(
  twins: TwinRow[],
  id: string,
): { primes: [number, number]; other: string; note: string } | null {
  const row = twins.find((twin) => twin.a === id || twin.b === id);
  if (!row) return null;
  return {
    primes: row.primes,
    other: row.a === id ? row.b : row.a,
    note: row.note,
  };
}
