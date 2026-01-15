<script lang="ts">
	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();
</script>

<div class="flex -mb-15 justify-center {className}">
	<img
		src="/images/celtic-knot-divider.svg"
		alt=""
		class="opacity-60"
		style="height: 3.5rem; width: auto;"
		aria-hidden="true"
		loading="lazy"
	/>
</div>
