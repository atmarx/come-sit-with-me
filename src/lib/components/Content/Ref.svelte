<script lang="ts">
	interface Props {
		id: string;
	}

	let { id }: Props = $props();
</script>

<sup class="ref">
	<a href="#ref-{id}" id="ref-{id}-back" class="ref-link">[{id}]</a>
</sup>

<style>
	.ref {
		font-size: 0.75em;
		line-height: 0;
		position: relative;
		vertical-align: baseline;
		top: -0.5em;
	}

	.ref-link {
		color: var(--color-primary-600, #a08080);
		text-decoration: none;
		font-weight: 500;
	}

	.ref-link:hover {
		color: var(--color-primary-700, #8a6a6a);
		text-decoration: underline;
	}
</style>
