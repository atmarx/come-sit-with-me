<script lang="ts">
	import type { Snippet } from 'svelte';
	interface Props {
		children: Snippet;
		attribution?: string;
		attributionHref?: string;
	}
	let { children, attribution, attributionHref }: Props = $props();
</script>

<aside class="my-8 rounded-r-lg border-l-4 border-primary-400 bg-primary-100/70 py-4 pl-6 pr-4 dark:border-primary-600 dark:bg-primary-950/50">
	<p class="font-serif text-lg italic leading-relaxed text-primary-900 dark:text-primary-100">
		{@render children()}
	</p>
	{#if attribution}
		<p class="mt-2 text-sm text-primary-700 dark:text-primary-300">
			— {#if attributionHref}<a href={attributionHref} class="underline hover:text-primary-800 dark:hover:text-primary-200">{attribution}</a>{:else}{attribution}{/if}
		</p>
	{/if}
</aside>
