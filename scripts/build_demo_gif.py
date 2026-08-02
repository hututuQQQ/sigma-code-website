"""Build the Sigma Code website demo GIF from browser-captured T3 frames."""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter


FRAME_SIZE = (960, 540)
FRAME_DURATION_MS = 110


def fit_frame(source: Image.Image, zoom: float) -> Image.Image:
    """Resize a 16:9 screenshot and apply a very small cinematic push-in."""
    base = source.convert("RGB").resize(FRAME_SIZE, Image.Resampling.LANCZOS)
    if zoom <= 1:
        return base

    width = round(FRAME_SIZE[0] * zoom)
    height = round(FRAME_SIZE[1] * zoom)
    enlarged = base.resize((width, height), Image.Resampling.LANCZOS)
    left = (width - FRAME_SIZE[0]) // 2
    top = (height - FRAME_SIZE[1]) // 2
    return enlarged.crop((left, top, left + FRAME_SIZE[0], top + FRAME_SIZE[1]))


def add_finish(frame: Image.Image, progress: float) -> Image.Image:
    """Add a restrained vignette and a cyan scanning highlight."""
    finished = ImageEnhance.Contrast(frame).enhance(1.025).convert("RGBA")

    vignette = Image.new("L", FRAME_SIZE, 0)
    vignette_draw = ImageDraw.Draw(vignette)
    vignette_draw.ellipse((-140, -115, 1100, 655), fill=255)
    vignette = vignette.filter(ImageFilter.GaussianBlur(72))
    dark = Image.new("RGBA", FRAME_SIZE, (4, 8, 12, 34))
    dark.putalpha(Image.eval(vignette, lambda value: 34 - round(value * 34 / 255)))
    finished = Image.alpha_composite(finished, dark)

    scan_y = round((FRAME_SIZE[1] + 80) * progress) - 40
    scan = Image.new("RGBA", FRAME_SIZE, (0, 0, 0, 0))
    scan_draw = ImageDraw.Draw(scan)
    scan_draw.rectangle((0, scan_y - 20, FRAME_SIZE[0], scan_y + 20), fill=(74, 246, 222, 6))
    scan_draw.line((0, scan_y, FRAME_SIZE[0], scan_y), fill=(74, 246, 222, 42), width=1)
    scan = scan.filter(ImageFilter.GaussianBlur(5))
    finished = Image.alpha_composite(finished, scan)

    border = Image.new("RGBA", FRAME_SIZE, (0, 0, 0, 0))
    ImageDraw.Draw(border).rounded_rectangle(
        (1, 1, FRAME_SIZE[0] - 2, FRAME_SIZE[1] - 2),
        radius=15,
        outline=(74, 246, 222, 70),
        width=2,
    )
    return Image.alpha_composite(finished, border).convert("RGB")


def build_frames(images: list[Image.Image]) -> list[Image.Image]:
    frames: list[Image.Image] = []
    sequence = [
        (0, 1, 7, 5),
        (1, 2, 5, 5),
        (2, 3, 5, 5),
        (3, 4, 6, 5),
        (4, 0, 10, 6),
    ]
    estimated_total = sum(hold + fade for _, _, hold, fade in sequence)

    for current_index, next_index, hold_count, fade_count in sequence:
        for hold_step in range(hold_count):
            zoom = 1 + (hold_step / max(hold_count - 1, 1)) * 0.006
            frames.append(fit_frame(images[current_index], zoom))

        current = fit_frame(images[current_index], 1.006)
        upcoming = fit_frame(images[next_index], 1)
        for fade_step in range(1, fade_count + 1):
            frames.append(Image.blend(current, upcoming, fade_step / (fade_count + 1)))

    return [
        add_finish(frame, index / max(estimated_total - 1, 1))
        for index, frame in enumerate(frames)
    ]


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input-dir", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()

    paths = [args.input_dir / f"key-{index:02d}.png" for index in range(1, 6)]
    missing = [path for path in paths if not path.exists()]
    if missing:
        raise FileNotFoundError(f"Missing input frames: {missing}")

    sources = [Image.open(path) for path in paths]
    frames = build_frames(sources)
    args.output.parent.mkdir(parents=True, exist_ok=True)

    paletted = [
        frame.quantize(colors=96, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE)
        for frame in frames
    ]
    paletted[0].save(
        args.output,
        save_all=True,
        append_images=paletted[1:],
        duration=FRAME_DURATION_MS,
        loop=0,
        optimize=True,
        disposal=2,
    )
    print(
        f"Wrote {args.output} ({len(frames)} frames, "
        f"{FRAME_SIZE[0]}x{FRAME_SIZE[1]}, {args.output.stat().st_size / 1024 / 1024:.2f} MiB)"
    )


if __name__ == "__main__":
    main()
