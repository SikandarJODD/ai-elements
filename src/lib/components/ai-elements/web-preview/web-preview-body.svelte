<script lang="ts">
	import { cn } from "$lib/utils";
	import { getWebPreviewContext } from "./web-preview-context.svelte.js";

	let {
		loading,
		src,
		class: className,
		...restProps
	}: {
		loading?: import("svelte").Snippet;
		src?: string;
		class?: string;
		[key: string]: any;
	} = $props();

	let context = getWebPreviewContext();

	let finalSrc = $derived.by(() => (src ?? context.url) || undefined);
</script>

<div class="flex-1">
	<iframe
		class={cn("size-full", className)}
		sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
		src={finalSrc}
		title="Preview"
		{...restProps}
	></iframe>
	{#if loading}
		{@render loading()}
	{/if}
</div>
