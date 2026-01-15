<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';

	let isOpen = $state(false);
	let copied = $state(false);
	let canNativeShare = $state(false);

	// Portal elements
	let portalContainer: HTMLElement | null = null;

	const siteUrl = 'https://comesitwith.me';
	const siteTitle = 'Come Sit With Me — A Perimenopause Resource';
	const siteDescription = 'Evidence-based perimenopause resource integrating conventional and complementary approaches.';

	let currentUrl = $derived(`${siteUrl}${$page.url.pathname}`);

	onMount(() => {
		// Check if native share is available (mobile)
		canNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

		// Create portal container at body level
		portalContainer = document.createElement('div');
		portalContainer.id = 'share-portal';
		document.body.appendChild(portalContainer);
	});

	onDestroy(() => {
		portalContainer?.remove();
	});

	// Render modal into portal when open state changes
	$effect(() => {
		if (!portalContainer) return;

		if (isOpen) {
			document.body.classList.add('modal-open');
			renderModal();
		} else {
			document.body.classList.remove('modal-open');
			portalContainer.innerHTML = '';
		}
	});

	function renderModal() {
		if (!portalContainer) return;

		portalContainer.innerHTML = `
			<div class="fixed inset-0 z-[9999] flex items-center justify-center">
				<button class="absolute inset-0 bg-black/50" aria-label="Close share dialog" id="share-backdrop"></button>
				<div class="relative mx-4 w-full max-w-sm rounded-xl shadow-2xl" style="background-color: var(--color-surface);" role="dialog" aria-modal="true" aria-label="Share this page">
					<div class="flex items-center justify-between border-b p-4" style="border-color: var(--color-primary-200);">
						<h2 class="font-serif text-lg font-semibold" style="color: var(--color-text);">Share this page</h2>
						<button id="share-close" class="rounded-lg p-1 transition-colors hover:bg-primary-100" aria-label="Close">
							<svg class="h-5 w-5" style="color: var(--color-text-muted);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
					<div class="grid grid-cols-2 gap-3 p-4">
						${canNativeShare ? `
						<button id="share-native" class="flex flex-col items-center gap-2 rounded-lg p-4 transition-colors hover:bg-primary-50" style="background-color: var(--color-primary-50);">
							<svg class="h-6 w-6" style="color: var(--color-primary-600);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
							</svg>
							<span class="text-sm font-medium" style="color: var(--color-text);">Share...</span>
						</button>
						` : ''}
						<button id="share-facebook" class="flex flex-col items-center gap-2 rounded-lg p-4 transition-colors hover:bg-primary-50">
							<svg class="h-6 w-6" style="color: #1877F2;" viewBox="0 0 24 24" fill="currentColor">
								<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
							</svg>
							<span class="text-sm font-medium" style="color: var(--color-text);">Facebook</span>
						</button>
						<button id="share-twitter" class="flex flex-col items-center gap-2 rounded-lg p-4 transition-colors hover:bg-primary-50">
							<svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
								<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
							</svg>
							<span class="text-sm font-medium" style="color: var(--color-text);">X / Twitter</span>
						</button>
						<button id="share-reddit" class="flex flex-col items-center gap-2 rounded-lg p-4 transition-colors hover:bg-primary-50">
							<svg class="h-6 w-6" style="color: #FF4500;" viewBox="0 0 24 24" fill="currentColor">
								<path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
							</svg>
							<span class="text-sm font-medium" style="color: var(--color-text);">Reddit</span>
						</button>
						<button id="share-copy" class="flex flex-col items-center gap-2 rounded-lg p-4 transition-colors hover:bg-primary-50 ${canNativeShare ? '' : 'col-span-2'}">
							<svg class="h-6 w-6" style="color: var(--color-primary-600);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
							</svg>
							<span id="copy-text" class="text-sm font-medium" style="color: var(--color-text);">${copied ? 'Copied!' : 'Copy Link'}</span>
						</button>
					</div>
				</div>
			</div>
		`;

		// Attach event listeners
		portalContainer.querySelector('#share-backdrop')?.addEventListener('click', closeModal);
		portalContainer.querySelector('#share-close')?.addEventListener('click', closeModal);
		portalContainer.querySelector('#share-native')?.addEventListener('click', handleNativeShare);
		portalContainer.querySelector('#share-facebook')?.addEventListener('click', handleFacebook);
		portalContainer.querySelector('#share-twitter')?.addEventListener('click', handleTwitter);
		portalContainer.querySelector('#share-reddit')?.addEventListener('click', handleReddit);
		portalContainer.querySelector('#share-copy')?.addEventListener('click', handleCopyLink);
	}

	function openModal() {
		copied = false;
		isOpen = true;
	}

	function closeModal() {
		isOpen = false;
	}

	async function handleNativeShare() {
		try {
			await navigator.share({
				title: siteTitle,
				text: siteDescription,
				url: currentUrl
			});
			closeModal();
		} catch (err) {
			// User cancelled or share failed - do nothing
		}
	}

	function handleFacebook() {
		const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
		window.open(url, '_blank', 'width=600,height=400');
		closeModal();
	}

	function handleTwitter() {
		const text = `${siteTitle}\n${siteDescription}`;
		const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(text)}`;
		window.open(url, '_blank', 'width=600,height=400');
		closeModal();
	}

	function handleReddit() {
		const url = `https://www.reddit.com/submit?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(siteTitle)}`;
		window.open(url, '_blank', 'width=600,height=600');
		closeModal();
	}

	async function handleCopyLink() {
		try {
			await navigator.clipboard.writeText(currentUrl);
			copied = true;
			// Update the button text
			const copyText = portalContainer?.querySelector('#copy-text');
			if (copyText) copyText.textContent = 'Copied!';
			setTimeout(() => {
				copied = false;
				closeModal();
			}, 1500);
		} catch (err) {
			// Fallback for older browsers
			const textarea = document.createElement('textarea');
			textarea.value = currentUrl;
			document.body.appendChild(textarea);
			textarea.select();
			document.execCommand('copy');
			document.body.removeChild(textarea);
			copied = true;
			setTimeout(closeModal, 1500);
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && isOpen) {
			closeModal();
		}
	}

	export function open() {
		openModal();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- Share button for header -->
<button
	onclick={openModal}
	class="share-toggle"
	aria-label="Share this page"
	title="Share"
>
	<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
	</svg>
</button>

<style>
	.share-toggle {
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

	.share-toggle:hover {
		background-color: rgba(0, 0, 0, 0.05);
		color: var(--color-text);
	}

	:global(.dark) .share-toggle:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}
</style>
