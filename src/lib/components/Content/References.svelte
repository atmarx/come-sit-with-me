<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<aside class="references">
	<h2>References</h2>
	<ol class="reference-list">
		{@render children()}
	</ol>
</aside>

<style>
	.references {
		margin-top: 3rem;
		padding-top: 2rem;
		border-top: 1px solid var(--color-primary-200, #e8d8d8);
	}

	.references h2 {
		font-family: var(--font-serif, Georgia, serif);
		font-size: 1.25rem;
		color: var(--color-text, #3D3836);
		margin-bottom: 1rem;
	}

	.reference-list {
		font-size: 0.875rem;
		color: var(--color-text-muted, #6B6462);
		line-height: 1.6;
		padding-left: 1.5rem;
	}

	.reference-list :global(li) {
		margin-bottom: 0.5rem;
	}

	.reference-list :global(a) {
		color: var(--color-primary-600, #a08080);
	}
</style>
