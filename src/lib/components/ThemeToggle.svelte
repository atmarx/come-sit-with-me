<script lang="ts">
	import { browser } from '$app/environment';

	type Theme = 'light' | 'dark' | 'system';

	// Initialize from localStorage or default to system
	let theme = $state<Theme>('system');

	// Track the actual applied theme (resolved from system if needed)
	let appliedTheme = $derived.by(() => {
		if (theme === 'system' && browser) {
			return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		}
		return theme === 'system' ? 'light' : theme;
	});

	// Initialize on mount
	$effect(() => {
		if (browser) {
			const stored = localStorage.getItem('theme') as Theme | null;
			if (stored && ['light', 'dark', 'system'].includes(stored)) {
				theme = stored;
			}
		}
	});

	// Apply theme changes
	$effect(() => {
		if (browser) {
			const root = document.documentElement;
			if (appliedTheme === 'dark') {
				root.classList.add('dark');
			} else {
				root.classList.remove('dark');
			}
		}
	});

	// Listen for system preference changes
	$effect(() => {
		if (browser && theme === 'system') {
			const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
			const handler = (e: MediaQueryListEvent) => {
				const root = document.documentElement;
				if (e.matches) {
					root.classList.add('dark');
				} else {
					root.classList.remove('dark');
				}
			};
			mediaQuery.addEventListener('change', handler);
			return () => mediaQuery.removeEventListener('change', handler);
		}
	});

	function setTheme(newTheme: Theme) {
		theme = newTheme;
		if (browser) {
			localStorage.setItem('theme', newTheme);
		}
	}

	function cycleTheme() {
		const themes: Theme[] = ['light', 'dark', 'system'];
		const currentIndex = themes.indexOf(theme);
		const nextIndex = (currentIndex + 1) % themes.length;
		setTheme(themes[nextIndex]);
	}

	const icons = {
		light: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
		dark: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
		system: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`
	};

	const labels = {
		light: 'Light mode',
		dark: 'Dark mode',
		system: 'System preference'
	};
</script>

<button
	onclick={cycleTheme}
	class="theme-toggle"
	title={labels[theme]}
	aria-label={labels[theme]}
>
	{@html icons[theme]}
</button>

<style>
	.theme-toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 0.5rem;
		border: none;
		background-color: transparent;
		color: var(--color-text-muted);
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.theme-toggle:hover {
		background-color: rgba(0, 0, 0, 0.05);
		color: var(--color-text);
	}

	:global(.dark) .theme-toggle:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}
</style>
