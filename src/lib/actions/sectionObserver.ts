import { currentSection } from '$lib/stores/currentSection';

export function sectionObserver(node: HTMLElement, pathname: string) {
	let observer: IntersectionObserver | null = null;
	let hasUserScrolled = false;
	let timeoutId: ReturnType<typeof setTimeout> | null = null;
	let currentPathname = pathname;

	function findScrollContainer(el: HTMLElement): HTMLElement | null {
		let container: HTMLElement | null = el.parentElement;
		while (container && !container.classList.contains('overflow-y-auto')) {
			container = container.parentElement;
		}
		return container;
	}

	const scrollContainer = findScrollContainer(node);

	const onScroll = () => {
		hasUserScrolled = true;
	};
	scrollContainer?.addEventListener('scroll', onScroll, { passive: true });

	function setupObserver() {
		// Clean up previous observer
		if (timeoutId) clearTimeout(timeoutId);
		if (observer) observer.disconnect();
		hasUserScrolled = false;

		timeoutId = setTimeout(() => {
			const h1 = node.querySelector('h1');
			const headings = node.querySelectorAll('h2[id], h3[id]');

			if (headings.length === 0) {
				return;
			}

			// If there's a hash, set the initial section from it
			const hash = window.location.hash.slice(1);
			if (hash) {
				const targetHeading = node.querySelector(`#${CSS.escape(hash)}`) as HTMLElement | null;
				if (targetHeading) {
					currentSection.set({
						id: hash,
						text: targetHeading.textContent?.trim() || ''
					});
				}
			}

			observer = new IntersectionObserver(
				(entries) => {
					const visible = entries
						.filter((entry) => entry.isIntersecting)
						.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

					if (visible.length > 0) {
						const heading = visible[0].target as HTMLElement;

						// If h1 is visible, clear the section breadcrumb
						if (heading.tagName === 'H1') {
							currentSection.set(null);
							if (hasUserScrolled) {
								history.replaceState(null, '', window.location.pathname);
							}
							return;
						}

						const id = heading.id;
						const text = heading.textContent?.trim() || '';

						currentSection.set({ id, text });

						if (hasUserScrolled && id) {
							history.replaceState(null, '', `#${id}`);
						}
					}
				},
				{
					root: scrollContainer,
					rootMargin: '-80px 0px -75% 0px',
					threshold: 0
				}
			);

			// Observe h1 first so it takes priority when visible
			if (h1) observer.observe(h1);
			headings.forEach((heading) => observer!.observe(heading));
		}, 150);
	}

	setupObserver();

	return {
		update(newPathname: string) {
			if (newPathname !== currentPathname) {
				currentPathname = newPathname;
				currentSection.set(null);
				setupObserver();
			}
		},
		destroy() {
			if (timeoutId) clearTimeout(timeoutId);
			scrollContainer?.removeEventListener('scroll', onScroll);
			observer?.disconnect();
			currentSection.set(null);
		}
	};
}
