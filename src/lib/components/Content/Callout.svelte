<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		type?: 'info' | 'warning' | 'tip' | 'myth';
		title?: string;
		children: Snippet;
	}

	let { type = 'info', title, children }: Props = $props();

	const styles = {
		info: {
			bg: 'bg-secondary-50',
			border: 'border-secondary-200',
			icon: 'text-secondary-600',
			title: 'text-secondary-800'
		},
		warning: {
			bg: 'bg-amber-50',
			border: 'border-amber-200',
			icon: 'text-amber-600',
			title: 'text-amber-800'
		},
		tip: {
			bg: 'bg-primary-50',
			border: 'border-primary-200',
			icon: 'text-primary-600',
			title: 'text-primary-800'
		},
		myth: {
			bg: 'bg-purple-50',
			border: 'border-purple-200',
			icon: 'text-purple-600',
			title: 'text-purple-800'
		}
	};

	const icons = {
		info: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />`,
		warning: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />`,
		tip: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />`,
		myth: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />`
	};

	const defaultTitles = {
		info: 'Note',
		warning: 'Warning',
		tip: 'Tip',
		myth: 'Myth vs Reality'
	};

	let style = $derived(styles[type]);
	let icon = $derived(icons[type]);
	let displayTitle = $derived(title || defaultTitles[type]);
</script>

<aside class="not-prose my-6 rounded-xl border-l-4 p-4 {style.bg} {style.border}">
	<div class="flex gap-3">
		<svg class="mt-0.5 h-5 w-5 shrink-0 {style.icon}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			{@html icon}
		</svg>
		<div>
			{#if displayTitle}
				<p class="mb-1 font-semibold {style.title}">{displayTitle}</p>
			{/if}
			<div class="text-text [&>p]:mb-2 [&>p:last-child]:mb-0">
				{@render children()}
			</div>
		</div>
	</div>
</aside>
