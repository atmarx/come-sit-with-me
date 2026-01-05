<script lang="ts">
	interface Props {
		grade: 'A' | 'B' | 'C' | 'D';
	}

	let { grade }: Props = $props();

	const gradeInfo = {
		A: {
			color: 'bg-green-100 text-green-800 border-green-300',
			description: 'Strong evidence from multiple RCTs'
		},
		B: {
			color: 'bg-blue-100 text-blue-800 border-blue-300',
			description: 'Moderate evidence from limited RCTs or cohort studies'
		},
		C: {
			color: 'bg-amber-100 text-amber-800 border-amber-300',
			description: 'Weak evidence or expert opinion'
		},
		D: {
			color: 'bg-gray-100 text-gray-600 border-gray-300',
			description: 'Insufficient evidence to recommend'
		}
	};

	let info = $derived(gradeInfo[grade]);
</script>

<span
	class="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium {info.color}"
	title={info.description}
>
	<span class="font-bold">Grade {grade}</span>
	<button
		class="cursor-help"
		aria-label={info.description}
	>
		<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
		</svg>
	</button>
</span>
