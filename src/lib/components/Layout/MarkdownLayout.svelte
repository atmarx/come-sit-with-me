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

<article class="prose prose-lg max-w-none">
	{#if title}
		<h1 class="font-serif">{title}</h1>
	{/if}
	{#if description}
		<p class="lead text-lg text-text-muted">{description}</p>
	{/if}

	{@render children()}
</article>
