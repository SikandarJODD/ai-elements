<script lang="ts">
	import * as WebPreview from "$lib/components/ai-elements/web-preview/index.js";
	import type { LogEntry } from "$lib/components/ai-elements/web-preview/index.js";

	import ArrowLeft from "@lucide/svelte/icons/arrow-left";
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import RotateCcw from "@lucide/svelte/icons/rotate-ccw";
	import ExternalLink from "@lucide/svelte/icons/external-link";

	// Sample logs for the console
	let sampleLogs: LogEntry[] = [
		{
			level: "log",
			message: "Page loaded successfully",
			timestamp: new Date(Date.now() - 10000),
		},
		{
			level: "warn",
			message: "Warning: Deprecated API used",
			timestamp: new Date(Date.now() - 5000),
		},
		{
			level: "error",
			message: "Error: Failed to load resource",
			timestamp: new Date(),
		},
	];

	let currentUrl = $state("https://svelte.dev");

	function handleUrlChange(url: string) {
		console.log("URL changed to:", url);
	}

	function goBack() {
		console.log("Going back");
	}

	function goForward() {
		console.log("Going forward");
	}

	function refresh() {
		console.log("Refreshing page");
	}

	function openExternal() {
		if (currentUrl) {
			window.open(currentUrl, "_blank");
		}
	}
</script>

<div class="mx-auto w-full max-w-4xl">
	<!-- <h2 class="text-2xl font-bold">Web Preview Component Example</h2> -->

	<WebPreview.Root defaultUrl={currentUrl} onUrlChange={handleUrlChange} class="h-120">
		<WebPreview.Navigation>
			<WebPreview.NavigationButton onclick={goBack} tooltip="Go Back">
				<ArrowLeft class="h-4 w-4" />
			</WebPreview.NavigationButton>

			<WebPreview.NavigationButton onclick={goForward} tooltip="Go Forward">
				<ArrowRight class="h-4 w-4" />
			</WebPreview.NavigationButton>

			<WebPreview.NavigationButton onclick={refresh} tooltip="Refresh">
				<RotateCcw class="h-4 w-4" />
			</WebPreview.NavigationButton>

			<WebPreview.Url bind:value={currentUrl} />

			<WebPreview.NavigationButton onclick={openExternal} tooltip="Open in New Tab">
				<ExternalLink class="h-4 w-4" />
			</WebPreview.NavigationButton>
		</WebPreview.Navigation>
		<WebPreview.Body />
		<WebPreview.Console logs={sampleLogs} />
	</WebPreview.Root>
</div>
