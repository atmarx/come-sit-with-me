# Convert Images to WebP

Converts PNG images from `assets/` to optimized WebP files in `static/images/`.

`assets/` is gitignored and only exists where Andrew keeps the source art.  `cwebp` may not be installed; `magick input.png -quality 80 output.webp` does the same job.

## Usage

Run this skill when you have new PNG images in `assets/heros/` or `assets/images/` that need to be converted for web use.

## Commands

Convert new hero images:
```bash
for png in assets/heros/*.png; do
  filename=$(basename "$png" .png)
  webp="static/images/heroes/${filename}.webp"
  if [ ! -f "$webp" ]; then
    cwebp -q 80 "$png" -o "$webp"
    echo "Converted: $filename.png -> $filename.webp"
  fi
done
```

Convert a specific file:
```bash
cwebp -q 80 assets/images/FILENAME.png -o static/images/FILENAME.webp
```

## Quality Settings

- **80**: The site's default for heroes
- **90**: Higher quality, larger files
- **75**: Smaller files, slight quality loss

## Notes

- Originals stay in `assets/`
- Reference images from pages by their served path, e.g. `/images/heroes/page-name.webp`
- Heroes are 1536×1024; the frontmatter fields are `hero` and `heroAlt`
