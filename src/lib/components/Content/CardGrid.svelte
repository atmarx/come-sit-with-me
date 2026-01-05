<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		cols?: 1 | 2;
		children: Snippet;
	}

	let { cols = 2, children }: Props = $props();
</script>

<div class="not-prose my-8 grid gap-4 {cols === 2 ? 'sm:grid-cols-2' : 'grid-cols-1'}">
	{@render children()}
</div>
