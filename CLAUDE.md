# Claude Notes

This is a perimenopause guide—a free, evidence-based resource created by a couple navigating this transition together. The voice is "Brighid," a wise goddess grandmother archetype. See [CONTRIBUTING.md](CONTRIBUTING.md) for full editorial guidelines.

## Project Overview

**Tech Stack:** SvelteKit 2 + Svelte 5, Tailwind CSS 4, mdsvex (Markdown with Svelte components), static adapter for GitHub Pages deployment.

**Content Model:** 38 markdown pages organized into sections:
- `/` — Home
- `/introduction` — Gateway page
- `/whats-happening/` — 4 pages on biology (hormones, brain, body, emotions)
- `/symptoms/` — 12 symptom pages + tracker
- `/support/` — 5 treatment approach pages
- `/considerations/` — 6 special topics (race/ethnicity, LGBTQ+, surgical, etc.)
- `/for-partners/` — Partner-focused content
- `/finding-care/`, `/resources/`, `/about/`

## Key Files

| File | Purpose |
|------|---------|
| `src/routes/**/+page.md` | Content pages (markdown + Svelte components) |
| `src/routes/resources/references/+page.md` | Central reference repository (101 citations) |
| `src/lib/components/Content/` | Citation components (Cite, Ref, References, etc.) |
| `src/lib/config/navigation.ts` | Site navigation structure |
| `src/app.css` | Theme colors, fonts, Tailwind config |
| `CONTRIBUTING.md` | Voice guidelines and citation system docs |

## Citation System

Citations use a **centralized reference model**:

1. **In content:** Wrap cited text with `<Cite>` component
   ```svelte
   <Cite id="swan-vasomotor-2015" tooltip="Avis NE, et al. JAMA Internal Medicine. 2015;">
     Hot flashes can persist for 7+ years.
   </Cite>
   ```

2. **In references page:** Add anchor + full citation
   ```markdown
   <a aria-hidden="true" id="swan-vasomotor-2015"></a>
   **Avis NE, et al.** ["Duration of Vasomotor Symptoms..."](https://doi.org/...) *JAMA Internal Medicine.* 2015.
   ```

3. **ID format:** `topic-descriptor-year` (e.g., `bone-loss-perimenopause`, `sleep-insomnia-2019`)

## Development Environment

- **Do not build** — the user runs `npm run dev` with live reloading
- Node/npm may not be available in shell, but changes can be verified via dev server
- Static site generates to `/build` on deploy
- **Flatpak sandbox:** VSCodium runs in a Flatpak container. To run commands outside the sandbox (e.g., `magick`, system tools), use `flatpak-spawn --host <command>`

## Content Guidelines (Quick Reference)

- Write as Brighid: wise, warm, embodied—not clinical
- Use "support" not "treatment" (this isn't a disease)
- Be honest about uncertainty in evidence
- Both/and thinking: traditional knowledge AND modern research
- Validate without patronizing; no toxic positivity
- See [CONTRIBUTING.md](CONTRIBUTING.md) for full voice guidelines

## Image Assets

Source images for import are in `./assets/`:
- **Hero images:** `./assets/heros/` → convert with `cwebp -q 80 input.png -o static/images/heroes/output.webp`
- **Other images:** `./assets/images/` → convert to `static/images/`

Hero images use frontmatter in markdown pages:
```yaml
hero: /images/heroes/page-name.webp
heroAlt: Description of the image
```

## Adding Content

1. Create `src/routes/[section]/[page-name]/+page.md`
2. Add frontmatter: `title`, `description`
3. Import needed components at top of file
4. Add to navigation in `src/lib/config/navigation.ts`
5. Add any new citations to `/resources/references/+page.md`
