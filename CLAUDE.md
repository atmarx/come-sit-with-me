# Claude Notes

This is a perimenopause guide—a free, evidence-based resource created by a couple navigating this transition together. The voice is "Brighid," a wise goddess grandmother archetype. See [CONTRIBUTING.md](CONTRIBUTING.md) for full editorial guidelines.

## Project Overview

**Production URL:** https://comesitwith.me (NOT comesitwithme.org)

**Tech Stack:** SvelteKit 2 + Svelte 5, Tailwind CSS 4, mdsvex (Markdown with Svelte components), static adapter, Pagefind search.  Served by Caddy in a container — see [README.md](README.md) for hosts and deploy.

**Deploys:** push to `main` updates xdocker01 only.  Production (xdroplet04) needs a pushed tag.  GitHub is a public mirror: run `git push github main` after each release.  Nothing deploys from it.

**Content Model:** 39 markdown pages organized into sections:
- `/` — Home
- `/introduction` — Gateway page
- `/whats-happening/` — 4 pages on biology (hormones, brain, body, emotions)
- `/symptoms/` — 12 symptom pages (the tracker is a Svelte page at `/tracker`)
- `/support/` — 5 treatment approach pages
- `/considerations/` — 6 special topics (race/ethnicity, LGBTQ+, surgical, etc.)
- `/for-partners/` — Partner-focused content
- `/finding-care/`, `/resources/`, `/about/`, `/terms/`

## Key Files

| File | Purpose |
|------|---------|
| `src/routes/**/+page.md` | Content pages (markdown + Svelte components) |
| `src/routes/resources/references/+page.md` | Central reference repository (114 references) |
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

4. **Verify before citing.**  Check PubMed or the DOI, and read the abstract against the claim.  Wired is not verified — this bibliography has held fabricated entries.  See the citation guidelines in CONTRIBUTING.md.

5. **Never send Andrew's email to an outside service:** no `email=`, `mailto=` or `User-Agent` contact, even where an API invites it.  A hook in `.claude/settings.json` blocks tool calls that contain the literal address.

6. **Source papers** live in `~/Code/come-sit-with-me-papers` (outside the repo, never redistributed).  Check there first, and read `audit/OPEN.md` before auditing.

## Development Environment

- **Do not build** — the user runs `npm run dev` with live reloading
- Static site generates to `/build` on deploy
- **Flatpak sandbox:** only when working from VSCodium's Flatpak container — run host tools with `flatpak-spawn --host <command>`.  Fleet sessions have `node`, `npm` and `magick` directly; `cwebp` and `flatpak-spawn` aren't there.

## Content Guidelines (Quick Reference)

- Write as Brighid: wise, warm, embodied—not clinical
- Use "support" not "treatment" (this isn't a disease)
- Be honest about uncertainty in evidence
- Both/and thinking: traditional knowledge AND modern research
- Validate without patronizing; no toxic positivity
- See [CONTRIBUTING.md](CONTRIBUTING.md) for full voice guidelines

## Image Assets

Heroes are 1536×1024 WebP.  Source images for import are in `./assets/` (gitignored — it only exists where Andrew puts it, and fleet worktrees don't have it):
- **Hero images:** `./assets/heros/` → convert with `cwebp -q 80 input.png -o static/images/heroes/output.webp`
- **Other images:** `./assets/images/` → convert to `static/images/`

Hero images use frontmatter in markdown pages:
```yaml
hero: /images/heroes/page-name.webp
heroAlt: Description of the image
```

## Adding Content

1. Create `src/routes/[section]/[page-name]/+page.md`
2. Add frontmatter: `title`, `description` (short hero tagline), `summary` (~150 characters for search and social cards, and only what the page actually says)
3. Import needed components at top of file
4. Add to navigation in `src/lib/config/navigation.ts`
5. Add any new citations to `/resources/references/+page.md`
