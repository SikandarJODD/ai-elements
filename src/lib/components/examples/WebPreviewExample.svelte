<script lang="ts">
	import {
		WebPreview,
		WebPreviewNavigation,
		WebPreviewNavigationButton,
		WebPreviewUrl,
		WebPreviewBody,
		WebPreviewConsole,
		type LogEntry
	} from '$lib/components/ai-elements/web-preview/index.js';
	import { ArrowLeft, ArrowRight, RotateCcw, ExternalLink } from '@lucide/svelte';

	// Sample logs for the console
	let sampleLogs: LogEntry[] = [
		{
			level: 'log',
			message: 'Page loaded successfully',
			timestamp: new Date(Date.now() - 10000)
		},
		{
			level: 'warn',
			message: 'Warning: Deprecated API used',
			timestamp: new Date(Date.now() - 5000)
		},
		{
			level: 'error',
			message: 'Error: Failed to load resource',
			timestamp: new Date()
		}
	];

	let currentUrl = $state('https://svelte.dev');

	function handleUrlChange(url: string) {
		console.log('URL changed to:', url);
	}

	function goBack() {
		console.log('Going back');
	}

	function goForward() {
		console.log('Going forward');
	}

	function refresh() {
		console.log('Refreshing page');
	}

	function openExternal() {
		if (currentUrl) {
			window.open(currentUrl, '_blank');
		}
	}
</script>

<div class="w-full max-w-4xl mx-auto p-4 space-y-4">
	<h2 class="text-2xl font-bold">Web Preview Component Example</h2>

	<WebPreview defaultUrl={currentUrl} onUrlChange={handleUrlChange} class="h-96">
		<WebPreviewNavigation>
			<WebPreviewNavigationButton onclick={goBack} tooltip="Go Back">
				<ArrowLeft class="h-4 w-4" />
			</WebPreviewNavigationButton>

			<WebPreviewNavigationButton onclick={goForward} tooltip="Go Forward">
				<ArrowRight class="h-4 w-4" />
			</WebPreviewNavigationButton>

			<WebPreviewNavigationButton onclick={refresh} tooltip="Refresh">
				<RotateCcw class="h-4 w-4" />
			</WebPreviewNavigationButton>

			<WebPreviewUrl bind:value={currentUrl} />

			<WebPreviewNavigationButton onclick={openExternal} tooltip="Open in New Tab">
				<ExternalLink class="h-4 w-4" />
			</WebPreviewNavigationButton>
		</WebPreviewNavigation>

		<WebPreviewBody />

		<WebPreviewConsole logs={sampleLogs} />
	</WebPreview>
</div>
