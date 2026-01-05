<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		id: string;
		tooltip: string;
		children: Snippet;
	}

	let { id, tooltip, children }: Props = $props();
</script>

<a
	href="/resources/references#{id}"
	class="cite-text"
	role="doc-noteref"
	aria-describedby="tooltip-{id}"
>
	{@render children()}<span class="cite-tooltip" id="tooltip-{id}" role="tooltip">{tooltip}</span>
</a>

<style>
	.cite-text {
		position: relative;
		display: inline;
		color: inherit;
		text-decoration: none;
		background-color: rgba(0, 0, 0, 0.03);
		border-radius: 0.25em;
		padding: 0.1em 0.25em;
		margin: 0 0.05em;
		cursor: help;
		transition: background-color 0.15s ease;
		/* Help with line-break rendering */
		box-decoration-break: clone;
		-webkit-box-decoration-break: clone;
	}

	.cite-text:hover {
		background-color: rgba(0, 0, 0, 0.06);
	}

	.cite-tooltip {
		position: absolute;
		bottom: 100%;
		left: 0;
		margin-bottom: 0.5rem;
		padding: 0.75rem 1rem;
		background-color: var(--color-text, #3d3836);
		color: var(--color-cream, #fdf8f5);
		font-size: 0.8125rem;
		font-style: normal;
		line-height: 1.5;
		border-radius: 0.5rem;
		width: max-content;
		max-width: 320px;
		z-index: 50;
		box-shadow:
			0 4px 6px -1px rgb(0 0 0 / 0.1),
			0 2px 4px -2px rgb(0 0 0 / 0.1);
		pointer-events: none;
		/* Hidden by default, shown on hover/focus */
		opacity: 0;
		visibility: hidden;
		transition:
			opacity 0.15s ease,
			visibility 0.15s ease;
	}

	.cite-text:hover .cite-tooltip,
	.cite-text:focus .cite-tooltip {
		opacity: 1;
		visibility: visible;
	}

	/* Arrow */
	.cite-tooltip::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 1rem;
		border: 6px solid transparent;
		border-top-color: var(--color-text, #3d3836);
	}

	/* Dark mode adjustments */
	:global(.dark) .cite-text {
		background-color: rgba(255, 255, 255, 0.05);
	}

	:global(.dark) .cite-text:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}

	:global(.dark) .cite-tooltip {
		background-color: var(--color-cream, #fdf8f5);
		color: var(--color-text, #3d3836);
	}

	:global(.dark) .cite-tooltip::after {
		border-top-color: var(--color-cream, #fdf8f5);
	}
</style>
