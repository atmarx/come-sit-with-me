<script lang="ts" module>
	// Export components for use in markdown
	export { default as Callout } from '$lib/components/Content/Callout.svelte';
	export { default as Card } from '$lib/components/Content/Card.svelte';
	export { default as CardGrid } from '$lib/components/Content/CardGrid.svelte';
	export { default as Cite } from '$lib/components/Content/Cite.svelte';
	export { default as PullQuote } from '$lib/components/Content/PullQuote.svelte';
	export { default as Ref } from '$lib/components/Content/Ref.svelte';
	export { default as References } from '$lib/components/Content/References.svelte';
	export { default as RefItem } from '$lib/components/Content/RefItem.svelte';
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import type { Snippet } from 'svelte';

	interface Props {
		title?: string;
		description?: string;
		hero?: string;
		heroAlt?: string;
		children: Snippet;
	}

	let { title, description, hero, heroAlt, children }: Props = $props();

	let pageTitle = $derived.by(() => {
		if (!title) return 'Come Sit With Me | A Perimenopause Resource';
		// Homepage gets simpler format
		if ($page.url.pathname === '/') {
			return 'Come Sit With Me | A Perimenopause Resource';
		}
		// Subpages get "Page Title - Come Sit With Me | A Perimenopause Resource"
		return `${title} - Come Sit With Me | A Perimenopause Resource`;
	});
</script>

<svelte:head>
	<title>{pageTitle}</title>
	{#if description}
		<meta name="description" content={description} />
	{/if}
</svelte:head>

{#key $page.url.pathname}
	{#if hero && title}
		<!-- Hero with overlaid title -->
		<div class="hero-full-bleed relative mb-8 overflow-hidden md:rounded-b-2xl med:rounded-b-2xl">
			<img
				src={hero}
				alt={heroAlt || ''}
				class="h-auto w-full"
				loading="eager"
			/>
			<div class="absolute inset-x-0 bottom-0 sm:bottom-0 md:bottom-20 px-8 py-6 bg-white/50 dark:bg-black/50">
				<h1 class="text-shadow-hero font-serif text-3xl font-bold text-text [text-wrap:balance] md:text-5xl">{title}</h1>
				{#if description}
					<p class="text-shadow-hero mt-3 text-right text-l md:text-xl [text-wrap:balance] text-black/80 dark:text-white/80">{description}</p>
				{/if}
			</div>
		</div>
	{:else if title}
		<!-- Title only (no hero) -->
		<div class="mb-8 overflow-hidden rounded-2xl bg-black/5 px-8 py-12">
			<h1 class="font-serif text-3xl font-bold [text-wrap:balance] md:text-4xl">{title}</h1>
			{#if description}
				<p class="mt-6 -mb-6 text-right text-lg [text-wrap:balance] text-text-muted">{description}</p>
			{/if}
		</div>
	{/if}

	<article class="prose prose-lg max-w-none">
		{@render children()}
	</article>
{/key}
