<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		href: string;
		title: string;
		variant?: 'primary' | 'secondary';
		span?: boolean;
		children: Snippet;
	}

	let { href, title, variant = 'primary', span = false, children }: Props = $props();

	const styles = {
		primary: {
			border: 'border-primary-100 hover:border-primary-300',
			title: 'text-primary-700'
		},
		secondary: {
			border: 'border-secondary-100 hover:border-secondary-300',
			title: 'text-secondary-700'
		}
	};

	let style = $derived(styles[variant]);
</script>

<a
	{href}
	class="block rounded-xl border bg-surface p-6 transition-all hover:shadow-md {style.border} {span ? 'sm:col-span-2' : ''}"
>
	<h3 class="font-serif text-lg font-semibold {style.title}">{title}</h3>
	<p class="mt-2 text-sm text-text-muted">
		{@render children()}
	</p>
</a>
