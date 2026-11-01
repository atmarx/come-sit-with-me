# Come Sit With Me

A free, ad-free guide to perimenopause, live at **<https://comesitwith.me>**.  It's for women in the transition and for the partners trying to understand it, and it puts the research next to traditional knowledge without pretending they're the same kind of evidence.

Andrew Marx built it while he and his wife Becky go through this together.  He isn't a medical professional and the site isn't medical advice ([terms](https://comesitwith.me/terms)).  The voice, Brighid, is a constructed one, written in collaboration with Claude, and the [About page](https://comesitwith.me/about) says so plainly.  For the voice and the citation rules, see [CONTRIBUTING.md](CONTRIBUTING.md).

## Status

*Last checked 2026-11-01.*

**Real and live:**

- Production is release **v1.2.8**, deployed 2026-11-01.
- 39 markdown pages: biology, 12 symptom pages, 5 support approaches, 6 special topics, partners, finding care, terms.
- A symptom tracker at `/tracker`, stored only in the reader's browser (`localStorage`).
- Full-text search (Pagefind), `sitemap.xml` and `llms.txt`.
- A central bibliography of 111 references, each checked against its source in a November 2026 audit.

**Not there yet:**

- **The citation audit found a lot, and it isn't finished.**  In November 2026 we checked all 102 references then on the site against their sources: 26 were fine, 76 weren't.  That included invented papers, DOIs pointing at unrelated studies, and numbers the papers don't contain, and we corrected or removed them in v1.2.8.  A handful still rest on sources nobody here could read in full, and uncited prose wasn't audited at all.  The open list is at `~/Code/come-sit-with-me-papers/audit/OPEN.md`, and [the citation rules](CONTRIBUTING.md#citation-guidelines) apply to anything new.
- **The papers collection holds abstracts and open full text, not many PDFs.**  See [Papers](#papers).

## Where it runs

It's a static site: SvelteKit prerenders to `build/`, and Caddy serves that from a container on port 3000.  There's no backend and no database.

| | Host | Trigger | Config |
|---|---|---|---|
| **Production** | xdroplet04, `https://comesitwith.me` | a pushed tag | `docker-compose.production.yml`, `caddy/come-sit-with-me.caddy` |
| **Internal** | xdocker01, also copied to `/mnt/nas/TheArk/sites/comesitwithme` | a push to `main` | `deploy/compose.yml` |

Source and CI live on Gitea at `git.dev.xram.net/atmarx/come-sit-with-me`, with Woodpecker building the images (`.woodpecker/`).  [GitHub](https://github.com/atmarx/come-sit-with-me) is a public mirror, pushed by hand, and nothing deploys from it.  Analytics are self-hosted [Umami](https://umami.is/) at `stats.comesitwith.me`.

`deploy/compose.prod.yml` is a leftover that nothing references.

## Deploy

Pushing to `main` updates xdocker01 only.  **Production needs a tag:**

```sh
git tag vX.Y.Z
git push origin main vX.Y.Z
git push github main    # keep the public mirror current
```

Then check that the site really changed.  A green pipeline isn't proof, because this runner has gone green while silently dropping commands.  That's why the deploy step in `.woodpecker/deploy-production.yml` keeps its real work in the first 8 commands and pads the rest with sacrificial `true` lines.  Don't add commands after the padding.

```sh
curl -sI https://comesitwith.me/ | grep -i last-modified
```

Look at the content you changed as well.  Docs-only commits don't need a tag.

`package.json` still says `1.0.0`.  Release versions live in git tags.

## Development

```sh
npm install
npm run dev       # dev server with live reload
npm run build     # static site plus the Pagefind index, into build/
npm run preview   # serve build/
npm run check     # svelte-check
```

Stack: [SvelteKit](https://svelte.dev/docs/kit) 2 with Svelte 5, Tailwind CSS 4, [mdsvex](https://mdsvex.pngwn.io/) for content, `adapter-static`, [Pagefind](https://pagefind.app/) for search.  Pages are `src/routes/**/+page.md`, navigation is `src/lib/config/navigation.ts`, and the bibliography is `src/routes/resources/references/+page.md`.

## Page metadata

Each page's frontmatter does a few different jobs:

- `description` is the short tagline shown over the hero.
- `summary` is about 150 characters for search results, social cards and `llms.txt`.  It isn't shown on the page.  Without one, `description` is used.
- `hero` and `heroAlt` are the page art, and also its social card.  Heroes must stay 1536×1024, because `Seo.svelte` declares that size to the platforms, which crop them to about 1.91:1.  The homepage and pages without a hero use the bench painting (`static/images/og-share.webp`).

A summary is a claim like any other: it can't say anything the page doesn't.

## Papers

Copies of cited papers live in `~/Code/come-sit-with-me-papers`, outside this repo, so they can't end up in a commit, an image or the public mirror.  They're for checking citations against the source, and they're never redistributed or served.  See the README in that folder.

## Contributing

Corrections are especially welcome, above all a citation that doesn't say what the page claims.  The [About page](https://comesitwith.me/about) has the email address.  Please read [CONTRIBUTING.md](CONTRIBUTING.md) before writing content.

## License

[CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/).  See [LICENSE](LICENSE).
