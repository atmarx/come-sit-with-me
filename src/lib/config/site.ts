/**
 * Single source of truth for site-level identity used in <head>, structured
 * data, sitemap, and llms.txt. Keep the origin here — it is the one string
 * that, when wrong, silently breaks canonicals and Open Graph everywhere.
 */
export const site = {
	origin: 'https://comesitwith.me',
	name: 'Come Sit With Me',
	tagline: 'A Perimenopause Resource',
	/** Fallback description for routes that do not supply their own. */
	description:
		'Evidence-based perimenopause resource integrating conventional and complementary approaches. Free, ad-free, and crafted with love.',
	ogImage: '/images/og-share.webp',
	ogImageAlt:
		'A weathered wooden bench on a woodland path, a knitted throw draped over the seat and a cup of tea steaming on the armrest.',
	locale: 'en_US'
} as const;

/** Absolute URL for a route path, without a trailing slash (except root). */
export function canonical(pathname: string): string {
	const clean = pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
	return `${site.origin}${clean}`;
}
