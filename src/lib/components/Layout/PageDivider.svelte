<script lang="ts">
	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();
</script>

<div class="flex justify-center {className}">
	<img
		src="/images/celtic-knot-divider.svg"
		alt=""
		class="h-14 w-auto opacity-60"
		aria-hidden="true"
		loading="lazy"
	/>
</div>
