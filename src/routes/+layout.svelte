<script lang="ts">
	import '../app.css';
	import Sidebar from '$lib/components/Layout/Sidebar.svelte';
	import Header from '$lib/components/Layout/Header.svelte';
	import NextPage from '$lib/components/Content/NextPage.svelte';
	import PageDivider from '$lib/components/Layout/PageDivider.svelte';

	let { children } = $props();
	let mobileMenuOpen = $state(false);

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>

<svelte:head>
	<meta name="description" content="Evidence-based perimenopause resource integrating conventional and complementary approaches" />
</svelte:head>

<div class="flex min-h-screen">
	<!-- Desktop sidebar -->
	<aside class="hidden w-64 shrink-0 border-r border-primary-100 bg-surface lg:block">
		<div class="sticky top-0 h-screen">
			<Sidebar />
		</div>
	</aside>

	<!-- Mobile sidebar overlay -->
	{#if mobileMenuOpen}
		<div class="fixed inset-0 z-40 lg:hidden">
			<!-- Backdrop -->
			<button
				class="absolute inset-0 bg-black/20"
				onclick={closeMobileMenu}
				aria-label="Close menu"
			></button>

			<!-- Sidebar -->
			<aside class="absolute left-0 top-0 h-full w-64 bg-surface shadow-xl">
				<Sidebar />
			</aside>
		</div>
	{/if}

	<!-- Main content -->
	<div class="flex flex-1 flex-col">
		<Header onMenuToggle={toggleMobileMenu} />

		<main class="flex-1 px-4 py-8 lg:px-8 lg:py-12">
			<div class="mx-auto max-w-3xl">
				{@render children()}
				<NextPage />
			</div>
		</main>

		<PageDivider class="py-8" />

		<footer class="border-t border-primary-100 px-4 py-6 text-sm text-text-muted lg:px-8">
			<div class="mx-auto max-w-3xl text-center">
				<p>Last updated: January 2026 | <a href="/about" class="hover:text-primary-600">About This Project</a></p>
				<p class="mt-2">
					© 2026 <a href="https://github.com/atmarx" class="hover:text-primary-600" target="_blank" rel="noopener">Andrew Marx</a> |
					<a href="https://creativecommons.org/licenses/by-nc/4.0/" class="hover:text-primary-600" target="_blank" rel="noopener">CC BY-NC 4.0</a>
				</p>
			</div>
		</footer>
	</div>
</div>
