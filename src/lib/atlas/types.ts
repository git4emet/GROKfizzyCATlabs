export type AtlasKind = "loop" | "path" | "gate" | "fft";

export type AtlasStanding = "named" | "proposed" | "open";

export type AtlasPoint = {
  id: string;
  name: string;
  kind: AtlasKind;
  descriptor: string;
  analogies: [string, string];
  evaluation: string;
  owner: string;
  standing: AtlasStanding;
  lane: { r: number; g: number; b: number };
};

export type TwinRow = {
  primes: [number, number];
  a: string;
  b: string;
  note: string;
};

export type ChainStep = {
  step: string;
  who: string;
  does: string;
  person?: string;
  gap?: boolean;
};

export type AtlasPort = {
  id: string;
  name: string;
  href: string;
  note: string;
};

export type AtlasFile = {
  name: string;
  volume: {
    ports: number;
    workflows: number;
    loops: number;
    paths: number;
    gates: number;
    fft: number;
  };
  hinge: string;
  chain: ChainStep[];
  points: AtlasPoint[];
  twins: TwinRow[];
};

export type LaidPoint = AtlasPoint & {
  x: number;
  y: number;
  side: -1 | 0 | 1;
  index: number;
  hinge: boolean;
};
