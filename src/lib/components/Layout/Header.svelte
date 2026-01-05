<script lang="ts">
	import { page } from '$app/stores';
	import { navigation } from '$lib/config/navigation';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	interface Props {
		onMenuToggle: () => void;
	}

	let { onMenuToggle }: Props = $props();

	function getBreadcrumbs(pathname: string): Array<{ title: string; href: string }> {
		const crumbs: Array<{ title: string; href: string }> = [];

		if (pathname === '/') return crumbs;

		for (const item of navigation) {
			if (pathname === item.href || pathname.startsWith(item.href + '/')) {
				crumbs.push({ title: item.title, href: item.href });

				if (item.children) {
					for (const child of item.children) {
						if (pathname === child.href) {
							crumbs.push({ title: child.title, href: child.href });
							break;
						}
					}
				}
				break;
			}
		}

		return crumbs;
	}

	let breadcrumbs = $derived(getBreadcrumbs($page.url.pathname));
</script>

<header class="sticky top-0 z-10 border-b border-primary-100 bg-cream/95 backdrop-blur-sm">
	<div class="flex h-14 items-center gap-4 px-4 lg:px-8">
		<!-- Mobile menu button -->
		<button onclick={onMenuToggle} class="rounded-lg p-2 hover:bg-primary-50 lg:hidden" aria-label="Toggle menu">
			<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
			</svg>
		</button>

		<!-- Breadcrumbs -->
		<nav class="flex items-center text-sm" aria-label="Breadcrumb">
			<a href="/" class="text-text-muted hover:text-primary-600">Home</a>
			{#each breadcrumbs as crumb, i}
				<svg class="mx-2 h-4 w-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
				{#if i === breadcrumbs.length - 1}
					<span class="font-medium text-text">{crumb.title}</span>
				{:else}
					<a href={crumb.href} class="text-text-muted hover:text-primary-600">{crumb.title}</a>
				{/if}
			{/each}
		</nav>

		<!-- Spacer -->
		<div class="flex-1"></div>

		<!-- Theme toggle -->
		<ThemeToggle />
	</div>
</header>
