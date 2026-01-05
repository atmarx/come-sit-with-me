<script lang="ts">
	import { onMount } from 'svelte';

	interface SymptomEntry {
		date: string;
		symptoms: Record<string, number>;
		notes: string;
	}

	const symptoms = [
		{ id: 'hot-flashes', name: 'Hot flashes / night sweats', icon: '🔥' },
		{ id: 'sleep', name: 'Sleep disruption', icon: '🌙' },
		{ id: 'mood', name: 'Mood changes', icon: '🎭' },
		{ id: 'brain-fog', name: 'Brain fog / focus', icon: '🌫️' },
		{ id: 'energy', name: 'Fatigue / low energy', icon: '🔋' },
		{ id: 'aches', name: 'Joint / muscle aches', icon: '💪' },
		{ id: 'anxiety', name: 'Anxiety / racing thoughts', icon: '⚡' },
		{ id: 'headache', name: 'Headaches', icon: '🤕' },
		{ id: 'dryness', name: 'Dryness (skin, eyes, vaginal)', icon: '💧' },
		{ id: 'bleeding', name: 'Irregular bleeding', icon: '🩸' }
	];

	let entries = $state<SymptomEntry[]>([]);
	let todaySymptoms = $state<Record<string, number>>({});
	let todayNotes = $state('');
	let showHistory = $state(false);
	let mounted = $state(false);

	const today = new Date().toISOString().split('T')[0];

	function getTodayEntry(): SymptomEntry | undefined {
		return entries.find((e) => e.date === today);
	}

	let hasEntryToday = $derived(!!getTodayEntry());

	onMount(() => {
		// Load from localStorage
		const stored = localStorage.getItem('symptom-tracker');
		if (stored) {
			try {
				entries = JSON.parse(stored);
				const todayEntry = getTodayEntry();
				if (todayEntry) {
					todaySymptoms = { ...todayEntry.symptoms };
					todayNotes = todayEntry.notes;
				}
			} catch {
				entries = [];
			}
		}
		mounted = true;
	});

	function saveEntries() {
		localStorage.setItem('symptom-tracker', JSON.stringify(entries));
	}

	function saveToday() {
		const existingIndex = entries.findIndex((e) => e.date === today);
		const entry: SymptomEntry = {
			date: today,
			symptoms: { ...todaySymptoms },
			notes: todayNotes
		};

		if (existingIndex >= 0) {
			entries[existingIndex] = entry;
		} else {
			entries = [entry, ...entries];
		}
		saveEntries();
	}

	function setSymptom(id: string, value: number) {
		if (todaySymptoms[id] === value) {
			// Toggle off if same value clicked
			delete todaySymptoms[id];
			todaySymptoms = { ...todaySymptoms };
		} else {
			todaySymptoms = { ...todaySymptoms, [id]: value };
		}
	}

	function formatDate(dateStr: string): string {
		const date = new Date(dateStr + 'T12:00:00');
		return date.toLocaleDateString('en-US', {
			weekday: 'short',
			month: 'short',
			day: 'numeric'
		});
	}

	function getRecentEntries(count: number): SymptomEntry[] {
		return entries.slice(0, count);
	}

	function getSeverityColor(value: number): string {
		const colors = [
			'bg-secondary-200 dark:bg-secondary-800',
			'bg-secondary-300 dark:bg-secondary-700',
			'bg-amber-200 dark:bg-amber-800',
			'bg-amber-300 dark:bg-amber-700',
			'bg-coral-300 dark:bg-coral-700',
			'bg-coral-400 dark:bg-coral-600'
		];
		return colors[value] || colors[0];
	}

	function getSeverityLabel(value: number): string {
		const labels = ['None', 'Mild', 'Moderate', 'Noticeable', 'Significant', 'Severe'];
		return labels[value] || 'None';
	}

	function exportData() {
		const data = entries
			.map((e) => {
				const symptomList = Object.entries(e.symptoms)
					.map(([id, val]) => {
						const symptom = symptoms.find((s) => s.id === id);
						return `  ${symptom?.name || id}: ${getSeverityLabel(val)}`;
					})
					.join('\n');
				return `${formatDate(e.date)}\n${symptomList}${e.notes ? `\n  Notes: ${e.notes}` : ''}`;
			})
			.join('\n\n');

		const blob = new Blob(
			[`Symptom Tracker Export\nGenerated: ${new Date().toLocaleDateString()}\n\n${data}`],
			{ type: 'text/plain' }
		);
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `symptoms-${today}.txt`;
		a.click();
		URL.revokeObjectURL(url);
	}

	function clearAllData() {
		if (confirm('This will delete all your tracked data. Are you sure?')) {
			entries = [];
			todaySymptoms = {};
			todayNotes = '';
			localStorage.removeItem('symptom-tracker');
		}
	}

	// Calculate weekly averages for visualization
	let weeklyAverages = $derived.by(() => {
		const last7 = entries.filter((e) => {
			const entryDate = new Date(e.date);
			const weekAgo = new Date();
			weekAgo.setDate(weekAgo.getDate() - 7);
			return entryDate >= weekAgo;
		});

		if (last7.length === 0) return [];

		return symptoms.map((s) => {
			const values = last7.map((e) => e.symptoms[s.id]).filter((v) => v !== undefined);
			const avg = values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
			return { ...s, average: avg, count: values.length };
		});
	});
</script>

<svelte:head>
	<title>Symptom Tracker - Come Sit With Me | A Perimenopause Resource</title>
	<meta
		name="description"
		content="Track your perimenopause symptoms privately. All data stays on your device."
	/>
</svelte:head>

<div class="mx-auto max-w-2xl">
	<div class="mb-8 rounded-2xl bg-black/5 px-8 py-12 dark:bg-white/5">
		<h1 class="font-serif text-3xl font-bold md:text-4xl">Symptom Tracker</h1>
		<p class="mt-4 text-text-muted">
			Track patterns. Bring data to appointments. <a href="#privacy">All stored locally on your device</a>.
		</p>
	</div>

	{#if !mounted}
		<div class="py-12 text-center text-text-muted">Loading...</div>
	{:else}
		<!-- Today's Entry -->
		<section class="mb-12">
			<h2 class="mb-6 font-serif text-xl font-semibold">
				Today
				<span class="ml-2 text-sm font-normal text-text-muted">{formatDate(today)}</span>
			</h2>

			<div class="symptom-list">
				{#each symptoms as symptom}
					<div class="rounded-lg border border-black/10 bg-surface p-4 dark:border-white/10">
						<div class="mb-3 flex items-center gap-3">
							<span class="text-lg">{symptom.icon}</span>
							<span class="font-medium">{symptom.name}</span>
						</div>
						<div class="flex justify-between">
							{#each [0, 1, 2, 3, 4, 5] as value}
								{@const isSelected = todaySymptoms[symptom.id] === value}
								<button
									type="button"
									onclick={() => setSymptom(symptom.id, value)}
									class="severity-btn severity-{value}"
									class:selected={isSelected}
									title={getSeverityLabel(value)}
								>
									{value}
								</button>
							{/each}
						</div>
						<div class="mt-2 flex justify-between text-xs text-text-muted">
							<span>None</span>
							<span>Severe</span>
						</div>
					</div>
				{/each}
			</div>

			<div class="mt-6">
				<label for="notes" class="mb-2 block font-medium">Notes (optional)</label>
				<textarea
					id="notes"
					bind:value={todayNotes}
					placeholder="Anything else you want to remember about today..."
					class="notes-input"
					rows="3"
				></textarea>
			</div>

			<button onclick={saveToday} class="save-btn">
				{hasEntryToday ? "Update Today's Notes" : "Save Today's Notes"}
			</button>
		</section>
		
		<!-- Weekly Summary -->
		{#if weeklyAverages.length > 0 && entries.length > 0}
			<section class="mb-12">
				<h2 class="mb-6 font-serif text-xl font-semibold">This Week</h2>
				<div class="rounded-lg border border-black/10 bg-surface p-4 dark:border-white/10">
					{#each weeklyAverages.filter((s) => s.count > 0) as symptom}
						<div class="flex items-center gap-3 border-b border-black/5 py-3 last:border-0 dark:border-white/5">
							<span class="w-6 text-center">{symptom.icon}</span>
							<span class="flex-1 text-sm">{symptom.name}</span>
							<div class="flex items-center gap-2">
								<div class="h-2 w-24 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
									<div
										class="h-full rounded-full {getSeverityColor(Math.round(symptom.average))}"
										style="width: {(symptom.average / 5) * 100}%"
									></div>
								</div>
								<span class="w-8 text-right text-sm text-text-muted">
									{symptom.average.toFixed(1)}
								</span>
							</div>
						</div>
					{/each}
					{#if weeklyAverages.filter((s) => s.count > 0).length === 0}
						<p class="py-4 text-center text-text-muted">No symptoms tracked this week yet.</p>
					{/if}
				</div>
			</section>
		{/if}

		<!-- History -->
		<section class="mb-12 mt-16">
			<button
				onclick={() => (showHistory = !showHistory)}
				class="mb-4 flex w-full items-center justify-between font-serif text-xl font-semibold"
			>
				<span>History ({entries.length} entries)</span>
				<span class="text-text-muted">{showHistory ? '−' : '+'}</span>
			</button>

			{#if showHistory}
				{#if entries.length === 0}
					<p class="py-4 text-text-muted">No entries yet. Start tracking today!</p>
				{:else}
					<div class="space-y-4">
						{#each entries as entry}
							<div class="rounded-lg border border-black/10 bg-surface p-4 dark:border-white/10">
								<div class="mb-3 font-medium">{formatDate(entry.date)}</div>
								<div class="flex flex-wrap gap-2">
									{#each Object.entries(entry.symptoms) as [id, value]}
										{@const symptom = symptoms.find((s) => s.id === id)}
										{#if symptom && value > 0}
											<span
												class="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs {getSeverityColor(value)}"
											>
												{symptom.icon}
												{symptom.name.split(' ')[0]}
												<span class="font-medium">{value}</span>
											</span>
										{/if}
									{/each}
								</div>
								{#if entry.notes}
									<p class="mt-2 text-sm text-text-muted">{entry.notes}</p>
								{/if}
							</div>
						{/each}
					</div>
				{/if}
			{/if}
		</section>

		<!-- Actions -->
		<section class="mb-16 flex flex-wrap gap-4">
			<button
				onclick={exportData}
				disabled={entries.length === 0}
				class="rounded-lg border border-black/10 px-4 py-2 text-sm transition-colors hover:bg-black/5 disabled:opacity-50 dark:border-white/10 dark:hover:bg-white/5"
			>
				Export for Doctor
			</button>
			<button
				onclick={clearAllData}
				class="rounded-lg border border-coral-300 px-4 py-2 text-sm text-coral-700 transition-colors hover:bg-coral-50 dark:border-coral-700 dark:text-coral-400 dark:hover:bg-coral-900/20"
			>
				Clear All Data
			</button>
		</section>

	{/if}

	<!-- Privacy Note -->
	<aside id="privacy" class="rounded-lg bg-secondary-100 p-4 text-sm dark:bg-white/10">
		<p class="font-medium text-secondary-800 dark:text-secondary-300">Your data stays with you.</p>
		<p class="mt-2 text-secondary-700 dark:text-secondary-400">
			Everything you track here is stored only in your browser's local storage. It never travels to any server.
			No one can see it but you.
		</p>
		<p class="mt-2 italic text-secondary-600 dark:text-secondary-500">
			"I already see your symptoms through your eyes—I don't need a database." — Brigid
		</p>
		<p class="mt-6 text-xs text-secondary-600 dark:text-secondary-500">
			Note: Clearing your browser data or using private/incognito mode will remove your entries.
		</p>
	</aside>
</div>

<style>
	.severity-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 0.5rem;
		border: 2px solid rgba(0, 0, 0, 0.1);
		font-size: 0.875rem;
		font-weight: 500;
		background-color: var(--color-surface);
		cursor: pointer;
		transition: all 0.15s;
	}

	.severity-btn:hover {
		border-color: rgba(0, 0, 0, 0.2);
	}

	.severity-btn.selected {
		border-color: rgba(0, 0, 0, 0.2);
	}

	.severity-btn.severity-0.selected { background-color: #d4f5d4; }
	.severity-btn.severity-1.selected { background-color: #b8e8b8; }
	.severity-btn.severity-2.selected { background-color: #fde68a; }
	.severity-btn.severity-3.selected { background-color: #fcd34d; }
	.severity-btn.severity-4.selected { background-color: #f5a8a8; }
	.severity-btn.severity-5.selected { background-color: #f08080; }

	:global(.dark) .severity-btn {
		border-color: rgba(255, 255, 255, 0.1);
		background-color: var(--color-surface);
	}

	:global(.dark) .severity-btn:hover {
		border-color: rgba(255, 255, 255, 0.2);
	}

	:global(.dark) .severity-btn.selected {
		border-color: rgba(255, 255, 255, 0.2);
	}

	:global(.dark) .severity-btn.severity-0.selected { background-color: #3a4e3a; }
	:global(.dark) .severity-btn.severity-1.selected { background-color: #4a5e4a; }
	:global(.dark) .severity-btn.severity-2.selected { background-color: #78601a; }
	:global(.dark) .severity-btn.severity-3.selected { background-color: #92751f; }
	:global(.dark) .severity-btn.severity-4.selected { background-color: #8c5050; }
	:global(.dark) .severity-btn.severity-5.selected { background-color: #a05050; }

	.notes-input {
		width: 100%;
		border-radius: 0.5rem;
		border: 1px solid rgba(0, 0, 0, 0.1);
		background-color: var(--color-surface);
		padding: 1rem;
		font-size: 0.875rem;
	}

	:global(.dark) .notes-input {
		border-color: rgba(255, 255, 255, 0.1);
	}

	.save-btn {
		margin-top: 1rem;
		width: 100%;
		border-radius: 0.5rem;
		background-color: #a87878;
		padding: 0.75rem 1.5rem;
		font-weight: 500;
		color: white;
		cursor: pointer;
		transition: background-color 0.15s;
	}

	.save-btn:hover {
		background-color: #8c5f5f;
	}

	.symptom-list {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
</style>
