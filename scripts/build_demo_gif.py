"""Build crisp animated WebP and GIF assets from the captured Sigma Code demo."""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image


WEBP_SIZE = (1280, 720)
GIF_SIZE = (960, 540)
FRAME_DURATION_MS = 120


def prepare(source: Image.Image, size: tuple[int, int]) -> Image.Image:
    """Convert a captured frame without adding filters that soften interface text."""
    frame = source.convert("RGB")
    if frame.size != size:
        frame = frame.resize(size, Image.Resampling.LANCZOS)
    return frame


def build_frames(sources: list[Image.Image], size: tuple[int, int]) -> list[Image.Image]:
    """Hold each real UI state, then use a short restrained cross-fade."""
    base = [prepare(source, size) for source in sources]
    holds = [11, 8, 8, 9, 15]
    transition_steps = 3
    frames: list[Image.Image] = []

    for index, current in enumerate(base):
        following = base[(index + 1) % len(base)]
        frames.extend([current.copy() for _ in range(holds[index])])
        for step in range(1, transition_steps + 1):
            frames.append(Image.blend(current, following, step / (transition_steps + 1)))

    return frames


def save_webp(frames: list[Image.Image], output: Path) -> None:
    output.parent.mkdir(parents=True, exist_ok=True)
    frames[0].save(
        output,
        format="WEBP",
        save_all=True,
        append_images=frames[1:],
        duration=FRAME_DURATION_MS,
        loop=0,
        quality=92,
        method=6,
        minimize_size=True,
        allow_mixed=True,
    )


def save_gif(frames: list[Image.Image], output: Path) -> None:
    output.parent.mkdir(parents=True, exist_ok=True)
    paletted = [
        frame.quantize(
            colors=192,
            method=Image.Quantize.MEDIANCUT,
            dither=Image.Dither.NONE,
        )
        for frame in frames
    ]
    paletted[0].save(
        output,
        save_all=True,
        append_images=paletted[1:],
        duration=FRAME_DURATION_MS,
        loop=0,
        optimize=True,
        disposal=2,
    )


def report(output: Path, frame_count: int, size: tuple[int, int]) -> None:
    print(
        f"Wrote {output} ({frame_count} frames, {size[0]}x{size[1]}, "
        f"{output.stat().st_size / 1024 / 1024:.2f} MiB)"
    )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input-dir", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True, help="Fallback GIF output")
    parser.add_argument("--webp-output", type=Path, required=True)
    args = parser.parse_args()

    paths = [args.input_dir / f"key-{index:02d}.png" for index in range(1, 6)]
    missing = [path for path in paths if not path.exists()]
    if missing:
        raise FileNotFoundError(f"Missing input frames: {missing}")

    sources: list[Image.Image] = []
    try:
        sources = [Image.open(path) for path in paths]
        webp_frames = build_frames(sources, WEBP_SIZE)
        gif_frames = build_frames(sources, GIF_SIZE)
        save_webp(webp_frames, args.webp_output)
        save_gif(gif_frames, args.output)
        report(args.webp_output, len(webp_frames), WEBP_SIZE)
        report(args.output, len(gif_frames), GIF_SIZE)
    finally:
        for source in sources:
            source.close()


if __name__ == "__main__":
    main()
