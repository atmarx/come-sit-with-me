import { canonical } from '$lib/config/site';

export const prerender = true;

/**
 * Routes are read from the filesystem rather than from navigation.ts so the
 * sitemap cannot drift when a page is added but not yet linked in the nav.
 */
const pages = import.meta.glob('/src/routes/**/+page.@(md|svelte)');

function toRoute(filePath: string): string {
	const route = filePath.replace(/^\/src\/routes/, '').replace(/\/\+page\.(md|svelte)$/, '');
	return route === '' ? '/' : route;
}

export async function GET() {
	const urls = Object.keys(pages)
		.map(toRoute)
		// Drop SvelteKit route groups and dynamic segments — neither is used today,
		// but a stray [slug] in the sitemap is a crawl error we would not notice.
		.filter((route) => !route.includes('[') && !route.includes('('))
		.sort();

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((route) => `\t<url><loc>${canonical(route)}</loc></url>`).join('\n')}
</urlset>
`;

	return new Response(body, {
		headers: { 'Content-Type': 'application/xml' }
	});
}
