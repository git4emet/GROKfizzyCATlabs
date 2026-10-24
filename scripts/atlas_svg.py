"""Build a self-contained animated atlas sheet from atlas_points.json.

Geometry matches src/lib/atlas/layout.ts: width 440, row 62, pad 40, spine 220.
Twin couplings stay in the table, not drawn across the spine.
Append further nodes to the points array and run this again.
"""

from __future__ import annotations

import json
import math
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "src" / "lib" / "atlas" / "atlas_points.json"
TARGET = ROOT / "public" / "atlas.svg"

WIDTH = 440
ROW = 62
PAD_TOP = 40
SPINE = 220

STROKE = {
    "loop": "#8fbfa3",
    "path": "#c4b48a",
    "gate": "#c8ccd4",
    "fft": "#c49292",
}


def main() -> None:
    data = json.loads(SOURCE.read_text())
    points = data["points"]
    hinge = data["hinge"]
    height = PAD_TOP + len(points) * ROW + 24
    laid = []
    for index, point in enumerate(points):
        side = 0 if point["id"] == hinge else (-1 if index % 2 == 0 else 1)
        x = SPINE if side == 0 else (SPINE - 70 if side < 0 else SPINE + 70)
        laid.append({**point, "index": index, "side": side, "x": x, "y": PAD_TOP + index * ROW})

    parts = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {WIDTH} {height}" role="img">',
        "<title>Living atlas</title>",
        "<desc>Twenty-five seats. Handoff has no twin. Generated from atlas_points.json.</desc>",
        "<defs>",
        '<linearGradient id="spine" x1="0" y1="0" x2="0" y2="1">',
        '<stop offset="0" stop-color="#f4f4f5" stop-opacity="0.05"/>',
        '<stop offset="0.45" stop-color="#f4f4f5" stop-opacity="0.45"/>',
        '<stop offset="1" stop-color="#f4f4f5" stop-opacity="0.05"/>',
        "</linearGradient>",
        '<filter id="glow" x="-50%" y="-50%" width="200%" height="200%">',
        '<feGaussianBlur stdDeviation="1.4" result="blur"/>',
        '<feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>',
        "</filter>",
        "</defs>",
        f'<rect width="{WIDTH}" height="{height}" fill="#0a0a0b"/>',
        f'<line x1="{SPINE}" y1="16" x2="{SPINE}" y2="{height - 12}" stroke="url(#spine)"/>',
    ]
    for point in laid:
        color = STROKE[point["kind"]]
        anchor = "end" if point["side"] <= 0 else "start"
        text_x = -94 if point["id"] == hinge else (-24 if point["side"] < 0 else 24)
        text_y = 4
        dur = 9 + (point["index"] % 6)
        spokes = []
        for deg in (0, 72, 144, 216, 288):
            rad = deg * math.pi / 180
            spokes.append(
                f'<line x1="0" y1="0" x2="{math.cos(rad) * 15:.2f}" y2="{math.sin(rad) * 15:.2f}" '
                f'stroke="{color}" stroke-opacity="0.55"/>'
            )
        ring = ""
        if point["id"] == hinge:
            ring = f'<circle r="13" fill="none" stroke="{color}" stroke-dasharray="2 2"/>'
        parts.append(
            f'<g transform="translate({point["x"]} {point["y"]})" filter="url(#glow)">'
            f'<g><animateTransform attributeName="transform" type="rotate" from="0" to="360" '
            f'dur="{dur}s" repeatCount="indefinite"/>{"".join(spokes)}</g>'
            f'{ring}<circle r="6.5" fill="#0a0a0b" stroke="{color}"/>'
            f'<text x="{text_x}" y="{text_y}" text-anchor="{anchor}" fill="#f4f4f5" '
            f'font-family="Figtree, sans-serif" font-size="11">{_xml(point["name"])}'
            f'<animate attributeName="opacity" values="0.55;1;0.55" dur="{dur + 2}s" '
            f'repeatCount="indefinite"/></text></g>'
        )
    parts.append("</svg>")
    TARGET.write_text("\n".join(parts) + "\n")
    print(f"wrote {TARGET} ({len(points)} seats, hinge={hinge})")


def _xml(value: str) -> str:
    return value.replace("&", "&").replace("<", "<").replace(">", ">")


if __name__ == "__main__":
    main()
