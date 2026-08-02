"""Compose the generated editorial background into a deterministic social card."""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps


SIZE = (1200, 630)
INK = (21, 25, 23, 255)
MUTED = (77, 87, 82, 255)
TEAL = (7, 93, 85, 255)


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size=size)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--background", type=Path, required=True)
    parser.add_argument("--mark", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()

    with Image.open(args.background) as source:
        canvas = ImageOps.fit(source.convert("RGBA"), SIZE, method=Image.Resampling.LANCZOS)

    draw = ImageDraw.Draw(canvas)
    bold = "C:/Windows/Fonts/arialbd.ttf"
    regular = "C:/Windows/Fonts/arial.ttf"
    mono = "C:/Windows/Fonts/consola.ttf"

    with Image.open(args.mark) as mark_source:
        mark = mark_source.convert("RGBA").resize((54, 54), Image.Resampling.LANCZOS)
        canvas.alpha_composite(mark, (64, 56))

    draw.text((134, 67), "SIGMA CODE", font=font(bold, 27), fill=INK)
    draw.text(
        (64, 151),
        "OPEN SOURCE  ·  DURABLE BY DESIGN",
        font=font(mono, 15),
        fill=TEAL,
    )
    draw.text((60, 213), "WORK SURVIVES.", font=font(bold, 61), fill=INK)
    draw.text((60, 284), "PROOF CLOSES", font=font(bold, 61), fill=TEAL)
    draw.text((60, 355), "THE TASK.", font=font(bold, 61), fill=TEAL)
    draw.line((64, 493, 447, 493), fill=(181, 187, 181, 255), width=1)
    draw.text(
        (64, 516),
        "Durable sessions  ·  Native sandboxes",
        font=font(regular, 17),
        fill=MUTED,
    )
    draw.text(
        (64, 545),
        "Evidence-backed completion",
        font=font(regular, 17),
        fill=MUTED,
    )

    args.output.parent.mkdir(parents=True, exist_ok=True)
    canvas.convert("RGB").save(args.output, format="PNG", optimize=True)
    print(f"Wrote {args.output} ({SIZE[0]}x{SIZE[1]})")


if __name__ == "__main__":
    main()
