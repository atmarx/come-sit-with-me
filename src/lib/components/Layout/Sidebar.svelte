<script lang="ts">
	import { page } from '$app/stores';
	import { navigation, type NavItem } from '$lib/config/navigation';

	let expandedSections = $state<Set<string>>(new Set());

	function toggleSection(href: string) {
		if (expandedSections.has(href)) {
			expandedSections.delete(href);
		} else {
			expandedSections.add(href);
		}
		expandedSections = new Set(expandedSections);
	}

	function isActive(href: string, currentPath: string): boolean {
		if (href === '/') {
			return currentPath === '/';
		}
		return currentPath === href || currentPath.startsWith(href + '/');
	}

	function isSectionExpanded(item: NavItem, currentPath: string): boolean {
		if (expandedSections.has(item.href)) return true;
		if (item.children) {
			return item.children.some((child) => isActive(child.href, currentPath));
		}
		return false;
	}
</script>

<nav class="sidebar-scroll h-full overflow-y-auto px-4 py-6">
	<div class="mb-8">
		<a href="/" class="block">
			<h1 class="font-serif text-xl font-semibold text-primary-700">Come Sit With Me</h1>
			<p class="text-sm text-text-muted">A Perimenopause Resource</p>
		</a>
	</div>

	<ul class="space-y-1">
		{#each navigation as item}
			<li>
				{#if item.children}
					<button
						onclick={() => toggleSection(item.href)}
						class="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-primary-50"
						class:text-primary-700={isActive(item.href, $page.url.pathname)}
					>
						<span>{item.title}</span>
						<svg
							class="h-4 w-4 transition-transform"
							class:rotate-90={isSectionExpanded(item, $page.url.pathname)}
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
						</svg>
					</button>

					{#if isSectionExpanded(item, $page.url.pathname)}
						<ul class="ml-3 mt-1 space-y-1 border-l-2 border-primary-100">
							<li>
								<a
									href={item.href}
									class="block rounded-r-lg border-l-2 border-transparent py-1.5 pl-4 pr-3 text-sm transition-colors hover:border-primary-300 hover:bg-primary-50"
									class:nav-link-active={$page.url.pathname === item.href}
								>
									Overview
								</a>
							</li>
							{#each item.children as child}
								<li>
									<a
										href={child.href}
										class="block rounded-r-lg border-l-2 border-transparent py-1.5 pl-4 pr-3 text-sm transition-colors hover:border-primary-300 hover:bg-primary-50"
										class:nav-link-active={isActive(child.href, $page.url.pathname)}
									>
										{child.title}
									</a>
								</li>
							{/each}
						</ul>
					{/if}
				{:else}
					<a
						href={item.href}
						class="block rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-primary-50"
						class:nav-link-active={isActive(item.href, $page.url.pathname)}
						class:text-primary-700={isActive(item.href, $page.url.pathname)}
					>
						{item.title}
					</a>
				{/if}
			</li>
		{/each}
	</ul>
</nav>
