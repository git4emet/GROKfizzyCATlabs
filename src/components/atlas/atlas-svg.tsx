import { useEffect, useId, useRef } from "react";
import { layPoints, layPorts, sheetHeight, SPINE, strokeClass, WIDTH } from "@/lib/atlas/layout";
import type { AtlasPoint, AtlasPort, TwinRow } from "@/lib/atlas/types";

type Props = {
  points: AtlasPoint[];
  ports: AtlasPort[];
  twins: TwinRow[];
  hingeId: string;
  selectedId: string;
  onSelect: (id: string) => void;
};

export function AtlasSvg({ points, ports, hingeId, selectedId, onSelect }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const uid = useId().replace(/:/g, "");
  const laid = layPoints(points, hingeId);
  const laidPorts = layPorts(ports, points.length);
  const height = sheetHeight(points.length + ports.length);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (media.matches) svg.pauseAnimations();
      else svg.unpauseAnimations();
    };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [points.length, ports.length]);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${WIDTH} ${height}`}
      className="h-auto w-full"
      data-atlas-sheet=""
      role="img"
      aria-label="Living atlas. Twenty-five seats on a spine, ports appended below."
    >
      <defs>
        <linearGradient id={`${uid}-spine`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--color-fg)" stopOpacity="0.05" />
          <stop offset="0.45" stopColor="var(--color-fg)" stopOpacity="0.4" />
          <stop offset="1" stopColor="var(--color-fg)" stopOpacity="0.05" />
        </linearGradient>
        <radialGradient id={`${uid}-wash`} cx="50%" cy="40%" r="60%">
          <stop offset="0" stopColor="var(--color-fg)" stopOpacity="0.05" />
          <stop offset="1" stopColor="var(--color-fg)" stopOpacity="0" />
        </radialGradient>
        <filter id={`${uid}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width={WIDTH} height={height} fill={`url(#${uid}-wash)`} />
      <line
        x1={SPINE}
        y1={16}
        x2={SPINE}
        y2={height - 12}
        stroke={`url(#${uid}-spine)`}
        strokeWidth="1"
      />

      {laid.map((point) => (
        <Node
          key={point.id}
          x={point.x}
          y={point.y}
          label={point.name}
          side={point.side}
          kind={point.kind}
          selected={point.id === selectedId}
          hinge={point.hinge}
          dur={9 + (point.index % 6)}
          onSelect={() => onSelect(point.id)}
          filterId={`${uid}-glow`}
        />
      ))}

      {laidPorts.map((port) => (
        <Node
          key={port.id}
          x={port.x}
          y={port.y}
          label={port.name}
          side={port.side}
          kind="port"
          selected={port.id === selectedId}
          hinge={false}
          dur={11 + (port.index % 4)}
          onSelect={() => onSelect(port.id)}
          filterId={`${uid}-glow`}
        />
      ))}
    </svg>
  );
}

function Node({
  x,
  y,
  label,
  side,
  kind,
  selected,
  hinge,
  dur,
  onSelect,
  filterId,
}: {
  x: number;
  y: number;
  label: string;
  side: -1 | 0 | 1;
  kind: AtlasPoint["kind"] | "port";
  selected: boolean;
  hinge: boolean;
  dur: number;
  onSelect: () => void;
  filterId: string;
}) {
  const anchor = hinge || side < 0 ? "end" : "start";
  const textX = hinge ? -94 : side < 0 ? -24 : 24;
  const textY = 4;
  const spokes = [0, 72, 144, 216, 288];

  return (
    <g
      transform={`translate(${x} ${y})`}
      className={strokeClass(kind)}
      filter={selected ? `url(#${filterId})` : undefined}
      onClick={onSelect}
      style={{ cursor: "pointer" }}
    >
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0"
          to="360"
          dur={`${dur}s`}
          repeatCount="indefinite"
        />
        {spokes.map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <line
              key={deg}
              x1="0"
              y1="0"
              x2={Math.cos(rad) * 15}
              y2={Math.sin(rad) * 15}
              strokeWidth="1"
              strokeOpacity="0.55"
            />
          );
        })}
      </g>
      {hinge ? (
        <circle r="13" className="fill-none" strokeWidth="1" strokeDasharray="2 2" />
      ) : null}
      <circle
        r={selected ? 8 : 6.5}
        className="fill-bg"
        strokeWidth={selected ? 2 : 1.25}
      />
      <circle r="18" className="fill-transparent stroke-none" />
      <text
        x={textX}
        y={textY}
        textAnchor={anchor}
        className="fill-fg font-sans"
        fontSize="11"
      >
        {label.length > 18 ? `${label.slice(0, 17)}…` : label}
        <animate
          attributeName="opacity"
          values="0.55;1;0.55"
          dur={`${dur + 2}s`}
          repeatCount="indefinite"
        />
      </text>
    </g>
  );
}
