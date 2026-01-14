<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		href: string;
		title: string;
		lead?: string;
		variant?: 'primary' | 'secondary' | 'amber' | 'teal' | 'coral' | 'lavender';
		span?: boolean;
		children: Snippet;
	}

	let { href, title, lead, variant = 'primary', span = false, children }: Props = $props();

	const styles = {
		primary: 'text-primary-700',
		secondary: 'text-secondary-700',
		amber: 'text-amber-700',
		teal: 'text-teal-700',
		coral: 'text-coral-700',
		lavender: 'text-lavender-700'
	};

	let titleColor = $derived(styles[variant]);
</script>

<a
	{href}
	class="block rounded-xl border border-black/10 bg-surface p-6 transition-all hover:border-black/20 hover:shadow-md {span ? 'sm:col-span-2' : ''}"
>
	{#if lead}
		<p class="font-serif text-sm italic text-text-muted">{lead}</p>
	{/if}
	<h3 class="font-serif text-lg font-semibold {titleColor}">{title}</h3>
	<p class="mt-2 text-sm text-text-muted">
		{@render children()}
	</p>
</a>
