<script lang="ts">
	import { page } from '$app/stores';
	import { navigation, type NavItem } from '$lib/config/navigation';

	// Flatten navigation into sequential order
	function flattenNav(items: NavItem[]): { title: string; href: string }[] {
		const result: { title: string; href: string }[] = [];
		for (const item of items) {
			result.push({ title: item.title, href: item.href });
			if (item.children) {
				result.push(...item.children.map((c) => ({ title: c.title, href: c.href })));
			}
		}
		return result;
	}

	const flatNav = flattenNav(navigation);

	// Find current page index and get next page
	let nextPage = $derived.by(() => {
		const currentPath = $page.url.pathname;
		const currentIndex = flatNav.findIndex((item) => item.href === currentPath);
		if (currentIndex >= 0 && currentIndex < flatNav.length - 1) {
			return flatNav[currentIndex + 1];
		}
		return null;
	});

	// Brigid-style segues based on what section we're going to
	function getSegue(href: string): string {
		if (href.startsWith('/introduction')) {
			return 'Let me tell you how this all begins.';
		}
		if (href.startsWith('/whats-happening')) {
			if (href.includes('hormonal')) return 'Come, let me explain what your hormones are doing.';
			if (href.includes('brain')) return 'Your brain is changing too. Let me show you.';
			if (href.includes('whole-body')) return 'This touches every part of you.';
			if (href.includes('emotional')) return 'The heart of the matter awaits.';
			return 'There is more to understand.';
		}
		if (href.startsWith('/symptoms')) {
			if (href === '/symptoms') return 'Now let us talk about what you may be feeling.';
			return 'There is more to know.';
		}
		if (href.startsWith('/support')) {
			if (href === '/support') return 'You do not have to simply endure this.';
			return 'More paths forward await.';
		}
		if (href.startsWith('/considerations')) {
			if (href === '/considerations') return 'Every woman\'s journey is her own.';
			return 'There is more to consider.';
		}
		if (href.startsWith('/for-partners')) {
			return 'For those who love someone on this journey.';
		}
		if (href.startsWith('/finding-care')) {
			return 'When you are ready to seek help.';
		}
		if (href.startsWith('/resources')) {
			return 'For when you want to learn more.';
		}
		return 'Shall we continue?';
	}
</script>

{#if nextPage}
	<div class="mt-16 border-t border-primary-200 pt-8">
		<p class="font-serif italic text-text-muted">{getSegue(nextPage.href)}</p>
		<a
			href={nextPage.href}
			class="mt-3 inline-flex items-center gap-2 text-lg font-medium text-primary-600 transition-colors hover:text-primary-700"
		>
			{nextPage.title}
			<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
			</svg>
		</a>
	</div>
{/if}
