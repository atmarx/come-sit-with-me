<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';

	let isOpen = $state(false);
	let query = $state('');
	let results = $state<any[]>([]);
	let selectedIndex = $state(0);
	let pagefind = $state<any>(null);
	let isLoading = $state(false);
	let isMac = $state(true); // Default to Mac, will detect on mount

	// Portal elements
	let portalContainer: HTMLElement | null = null;
	let portalInput: HTMLInputElement | null = null;

	// Computed shortcut key display
	let modKey = $derived(isMac ? '⌘' : 'Ctrl+');

	async function loadPagefind() {
		const path = '/pagefind/pagefind.js';
		return await import(/* @vite-ignore */ path);
	}

	onMount(async () => {
		// Detect platform for keyboard shortcut display
		isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform);

		// Create portal container at body level to escape stacking contexts
		portalContainer = document.createElement('div');
		portalContainer.id = 'search-portal';
		document.body.appendChild(portalContainer);

		try {
			pagefind = await loadPagefind();
			await pagefind.init();
		} catch (e) {
			console.log('Pagefind not available (expected in dev mode)');
		}
	});

	onDestroy(() => {
		portalContainer?.remove();
	});

	// Render modal into portal when open state changes
	$effect(() => {
		if (!portalContainer) return;

		if (isOpen) {
			document.body.classList.add('search-open');
			renderModal();
		} else {
			document.body.classList.remove('search-open');
			portalContainer.innerHTML = '';
		}
	});

	// Update results list when results or selectedIndex change
	$effect(() => {
		if (!isOpen || !portalContainer) return;
		const resultsList = portalContainer.querySelector('#search-results');
		if (resultsList) {
			resultsList.innerHTML = renderResults();
			attachResultListeners();
		}
	});

	function renderModal() {
		if (!portalContainer) return;

		portalContainer.innerHTML = `
			<div class="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh]">
				<button class="absolute inset-0 bg-black/50" aria-label="Close search" id="search-backdrop"></button>
				<div class="relative mx-4 w-full max-w-xl rounded-xl shadow-2xl" style="background-color: var(--color-surface);" role="dialog" aria-modal="true" aria-label="Search">
					<div class="flex items-center gap-3 border-b p-4" style="border-color: var(--color-primary-200);">
						<svg class="h-5 w-5 shrink-0" style="color: var(--color-text-muted);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
						</svg>
						<input
							id="search-input"
							type="text"
							placeholder="Search..."
							class="flex-1 bg-transparent text-base outline-none"
							style="color: var(--color-text);"
							autocomplete="off"
						/>
						<kbd class="rounded px-2 py-1 text-xs" style="background-color: var(--color-primary-100); color: var(--color-primary-600);">ESC</kbd>
					</div>
					<div id="search-results" class="max-h-80 overflow-y-auto p-2">
						${renderResults()}
					</div>
				</div>
			</div>
		`;

		// Attach event listeners
		portalContainer.querySelector('#search-backdrop')?.addEventListener('click', closeModal);

		portalInput = portalContainer.querySelector('#search-input');
		if (portalInput) {
			portalInput.value = query;
			portalInput.addEventListener('input', handlePortalInput);
			portalInput.addEventListener('keydown', handleKeydown);
			setTimeout(() => portalInput?.focus(), 10);
		}

		attachResultListeners();
	}

	function renderResults(): string {
		if (isLoading) {
			return `<div class="p-4 text-center" style="color: var(--color-text-muted);">Searching...</div>`;
		}

		if (query && results.length === 0) {
			return `<div class="p-4 text-center" style="color: var(--color-text-muted);">No results found</div>`;
		}

		if (results.length === 0) {
			return `<div class="p-4 text-center" style="color: var(--color-text-muted);">Type to search...</div>`;
		}

		return results.map((result, i) => {
			const pageTitle = result.meta?.title || 'Untitled';
			const subResult = result.sub_results?.[0];
			const sectionTitle = subResult?.title && subResult.title !== pageTitle ? subResult.title : null;
			const excerpt = subResult?.excerpt || result.excerpt || '';

			return `
				<button
					class="search-result w-full rounded-lg p-3 text-left transition-colors"
					style="background-color: ${i === selectedIndex ? 'var(--color-primary-100)' : 'transparent'};"
					data-index="${i}"
				>
					<div class="font-medium" style="color: var(--color-text);">${pageTitle}${sectionTitle ? ` → ${sectionTitle}` : ''}</div>
					<div class="mt-1 text-sm line-clamp-2" style="color: var(--color-text-muted);">${excerpt}</div>
				</button>
			`;
		}).join('');
	}

	function attachResultListeners() {
		if (!portalContainer) return;
		portalContainer.querySelectorAll('.search-result').forEach((btn) => {
			btn.addEventListener('click', () => {
				const index = parseInt(btn.getAttribute('data-index') || '0');
				navigateToResult(results[index]);
			});
		});
	}

	async function search(searchQuery: string) {
		if (!pagefind || !searchQuery.trim()) {
			results = [];
			return;
		}

		isLoading = true;
		// Force re-render of results
		if (portalContainer) {
			const resultsList = portalContainer.querySelector('#search-results');
			if (resultsList) resultsList.innerHTML = renderResults();
		}

		try {
			const searchResults = await pagefind.search(searchQuery);
			const loadedResults = await Promise.all(
				searchResults.results.slice(0, 8).map((r: any) => r.data())
			);
			results = loadedResults;
			selectedIndex = 0;
		} catch (e) {
			console.error('Search error:', e);
			results = [];
		}
		isLoading = false;
	}

	function openModal() {
		isOpen = true;
		query = '';
		results = [];
		selectedIndex = 0;
	}

	function closeModal() {
		isOpen = false;
		query = '';
		results = [];
	}

	function handlePortalInput(e: Event) {
		const target = e.target as HTMLInputElement;
		query = target.value;
		clearTimeout(searchTimeout);
		searchTimeout = setTimeout(() => search(query), 150);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			closeModal();
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			selectedIndex = Math.min(selectedIndex + 1, results.length - 1);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			selectedIndex = Math.max(selectedIndex - 1, 0);
		} else if (e.key === 'Enter' && results.length > 0) {
			e.preventDefault();
			navigateToResult(results[selectedIndex]);
		}
	}

	function navigateToResult(result: any) {
		closeModal();
		// Use sub_result URL (includes anchor) if available, otherwise fall back to main URL
		const targetUrl = result.sub_results?.[0]?.url || result.url;
		goto(targetUrl);
	}

	let searchTimeout: ReturnType<typeof setTimeout>;

	function handleGlobalKeydown(e: KeyboardEvent) {
		// Primary: Cmd/Ctrl+F (familiar to non-dev users)
		// Fallback: Cmd/Ctrl+K (familiar to dev users)
		if ((e.metaKey || e.ctrlKey) && (e.key === 'f' || e.key === 'k')) {
			e.preventDefault();
			openModal();
		}
	}
</script>

<svelte:window onkeydown={handleGlobalKeydown} />

<!-- Search trigger in sidebar -->
<button
	onclick={openModal}
	class="flex w-full items-center gap-2 rounded-lg border border-primary-200 bg-[var(--color-surface)] px-3 py-2 text-left text-sm text-text-muted transition-colors hover:border-primary-300 hover:bg-primary-50"
>
	<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
	</svg>
	<span class="flex-1">Search...</span>
	<kbd class="hidden rounded bg-primary-100 px-1.5 py-0.5 text-xs font-medium text-primary-600 sm:inline">{modKey}F</kbd>
</button>
