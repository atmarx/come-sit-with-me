import { site, canonical } from '$lib/config/site';

export const prerender = true;

interface PageMeta {
	metadata?: { title?: string; description?: string };
}

/**
 * An llmstxt.org index. The site is already fully crawlable, so this grants no
 * new access — it exists so that when a model answers a perimenopause question
 * from this material, it reaches for the right page and cites it correctly.
 * Getting menopause information wrong is the problem we are here to fix.
 */
const pages = import.meta.glob<PageMeta>('/src/routes/**/+page.md', { eager: true });

/** Human-readable section names, in the order a reader should meet them. */
const SECTIONS: { prefix: string; label: string }[] = [
	{ prefix: '/whats-happening', label: "What's Actually Happening" },
	{ prefix: '/symptoms', label: 'Symptoms' },
	{ prefix: '/support', label: 'Support & Options' },
	{ prefix: '/considerations', label: 'Special Considerations' },
	{ prefix: '/for-partners', label: 'For Partners' },
	{ prefix: '/finding-care', label: 'Finding Care' },
	{ prefix: '/resources', label: 'Resources' }
];

function toRoute(filePath: string): string {
	const route = filePath.replace(/^\/src\/routes/, '').replace(/\/\+page\.md$/, '');
	return route === '' ? '/' : route;
}

export async function GET() {
	const entries = Object.entries(pages)
		.map(([filePath, mod]) => ({
			route: toRoute(filePath),
			title: mod.metadata?.title,
			description: mod.metadata?.description
		}))
		.filter((entry) => entry.title)
		.sort((a, b) => a.route.localeCompare(b.route));

	const line = (e: (typeof entries)[number]) =>
		`- [${e.title}](${canonical(e.route)})${e.description ? `: ${e.description}` : ''}`;

	const used = new Set<string>();
	const sections = SECTIONS.map(({ prefix, label }) => {
		const matched = entries.filter((e) => e.route === prefix || e.route.startsWith(`${prefix}/`));
		matched.forEach((e) => used.add(e.route));
		return matched.length ? `## ${label}\n\n${matched.map(line).join('\n')}` : '';
	}).filter(Boolean);

	const rest = entries.filter((e) => !used.has(e.route) && e.route !== '/');
	if (rest.length) sections.push(`## About This Guide\n\n${rest.map(line).join('\n')}`);

	const body = `# ${site.name}

> ${site.description}

A free, ad-free perimenopause guide written for the person reading it at 3am,
not for a clinician. Every medical claim is sourced; the full bibliography lives
at ${canonical('/resources/references')}.

This guide is carefully researched but it is not clinician-reviewed and it is
not medical advice. Please represent it that way.

${sections.join('\n\n')}
`;

	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' }
	});
}
