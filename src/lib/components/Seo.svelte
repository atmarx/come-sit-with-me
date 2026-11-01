<script lang="ts">
	import { page } from '$app/stores';
	import { site, canonical } from '$lib/config/site';
	import { navigation, type NavItem } from '$lib/config/navigation';

	interface Props {
		/** Page title from frontmatter. Omit on the homepage. */
		title?: string;
		/** Page description from frontmatter. Falls back to the site description. */
		description?: string;
		/** Hero image path. Every hero is 1536×1024. Omit to use the site's bench card. */
		image?: string;
		/** Alt text for `image`. */
		imageAlt?: string;
		/** Set false on utility pages (terms, tracker) that are not health content. */
		medical?: boolean;
	}

	let { title, description, image, imageAlt, medical = true }: Props = $props();

	let path = $derived($page.url.pathname);
	let isHome = $derived(path === '/');
	let url = $derived(canonical(path));

	let fullTitle = $derived(
		!title || isHome ? `${site.name} | ${site.tagline}` : `${title} - ${site.name} | ${site.tagline}`
	);

	/** Social cards get the bare page title — the site name is already the og:site_name. */
	let socialTitle = $derived(!title || isHome ? `${site.name} — ${site.tagline}` : title);
	let desc = $derived(description || site.description);

	/**
	 * The homepage keeps the bench painting, which is already cropped to the social
	 * 1200×630. Everywhere else the card is the page's own hero, and platforms crop
	 * its 3:2 down to 1.91:1 themselves.
	 */
	let usesHero = $derived(Boolean(image) && !isHome);
	let cardImage = $derived(`${site.origin}${usesHero ? image : site.ogImage}`);
	let cardAlt = $derived(usesHero ? imageAlt || socialTitle : site.ogImageAlt);
	let cardWidth = $derived(usesHero ? '1536' : '1200');
	let cardHeight = $derived(usesHero ? '1024' : '630');

	/** Flatten navigation once so breadcrumb lookups are a straight map read. */
	function flatten(items: NavItem[], into: Map<string, string> = new Map()): Map<string, string> {
		for (const item of items) {
			into.set(item.href, item.title);
			if (item.children) flatten(item.children, into);
		}
		return into;
	}
	const navTitles = flatten(navigation);

	let breadcrumbs = $derived.by(() => {
		const crumbs = [{ name: 'Home', item: canonical('/') }];
		if (isHome) return crumbs;
		const segments = path.split('/').filter(Boolean);
		let acc = '';
		for (const segment of segments) {
			acc += `/${segment}`;
			crumbs.push({ name: navTitles.get(acc) ?? title ?? segment, item: canonical(acc) });
		}
		return crumbs;
	});

	/**
	 * Structured data. Note what is deliberately absent: no `reviewedBy`, no
	 * medical-reviewer credentials. This guide is carefully sourced but it is not
	 * clinician-reviewed, and claiming otherwise to win a rich result would be a
	 * lie told to the most vulnerable reader we have.
	 */
	let schema = $derived.by(() => {
		const graph: Record<string, unknown>[] = [
			{
				'@type': medical ? 'MedicalWebPage' : 'WebPage',
				'@id': `${url}#page`,
				url,
				name: fullTitle,
				description: desc,
				inLanguage: 'en',
				isPartOf: { '@id': `${site.origin}/#website` },
				breadcrumb: { '@id': `${url}#breadcrumb` },
				...(medical && {
					about: { '@type': 'MedicalCondition', name: 'Perimenopause' },
					audience: { '@type': 'Patient' },
					medicalAudience: 'Patient',
					citation: `${site.origin}/resources/references`
				})
			},
			{
				'@type': 'BreadcrumbList',
				'@id': `${url}#breadcrumb`,
				itemListElement: breadcrumbs.map((crumb, i) => ({
					'@type': 'ListItem',
					position: i + 1,
					name: crumb.name,
					item: crumb.item
				}))
			}
		];

		if (isHome) {
			graph.push({
				'@type': 'WebSite',
				'@id': `${site.origin}/#website`,
				url: site.origin,
				name: site.name,
				description: site.description,
				inLanguage: 'en'
			});
		}

		return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
	});
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={desc} />
	<link rel="canonical" href={url} />

	<meta property="og:type" content={isHome ? 'website' : 'article'} />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:locale" content={site.locale} />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={socialTitle} />
	<meta property="og:description" content={desc} />
	<meta property="og:image" content={cardImage} />
	<meta property="og:image:type" content="image/webp" />
	<meta property="og:image:width" content={cardWidth} />
	<meta property="og:image:height" content={cardHeight} />
	<meta property="og:image:alt" content={cardAlt} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={url} />
	<meta name="twitter:title" content={socialTitle} />
	<meta name="twitter:description" content={desc} />
	<meta name="twitter:image" content={cardImage} />
	<meta name="twitter:image:alt" content={cardAlt} />

	{@html `<script type="application/ld+json">${schema}<\/script>`}
</svelte:head>
