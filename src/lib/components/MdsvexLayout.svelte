<script lang="ts" module>
	// Export components for use in markdown
	export { default as Callout } from '$lib/components/Content/Callout.svelte';
	export { default as Card } from '$lib/components/Content/Card.svelte';
	export { default as CardGrid } from '$lib/components/Content/CardGrid.svelte';
	export { default as Cite } from '$lib/components/Content/Cite.svelte';
	export { default as Ref } from '$lib/components/Content/Ref.svelte';
	export { default as References } from '$lib/components/Content/References.svelte';
	export { default as RefItem } from '$lib/components/Content/RefItem.svelte';
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title?: string;
		description?: string;
		children: Snippet;
	}

	let { title, description, children }: Props = $props();
</script>

<svelte:head>
	{#if title}
		<title>{title} | A Perimenopause Resource</title>
	{/if}
	{#if description}
		<meta name="description" content={description} />
	{/if}
</svelte:head>

{#if title}
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
