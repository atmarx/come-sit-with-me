<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		id: string;
		children: Snippet;
	}

	let { id, children }: Props = $props();
</script>

<li id="ref-{id}" class="ref-item">
	{@render children()}
	<a href="#ref-{id}-back" class="back-link" aria-label="Back to reference">↩</a>
</li>

<style>
	.ref-item {
		scroll-margin-top: 2rem;
	}

	.back-link {
		margin-left: 0.5rem;
		color: var(--color-primary-500, #c4a4a4);
		text-decoration: none;
		font-size: 0.875em;
	}

	.back-link:hover {
		color: var(--color-primary-700, #8a6a6a);
	}
</style>
