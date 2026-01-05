<script lang="ts">
	interface Props {
		signatureImage: string;
		signatureAlt?: string;
		symbolImage?: string;
		symbolAlt?: string;
	}

	let { signatureImage, signatureAlt = 'Signature', symbolImage, symbolAlt = '' }: Props = $props();
</script>

<div class="mt-12 flex flex-col items-center gap-4 text-center">
	{#if symbolImage}
		<img src={symbolImage} alt={symbolAlt} class="h-24 w-24 opacity-70" />
	{/if}
	<img src={signatureImage} alt={signatureAlt} class="h-16" />
</div>
