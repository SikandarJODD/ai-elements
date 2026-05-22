<script lang="ts">
	import { cn } from "$lib/utils";
	import { untrack } from "svelte";
	import { WebPreviewContext, setWebPreviewContext } from "./web-preview-context.svelte.js";

	let {
		defaultUrl = "",
		onUrlChange,
		class: className,
		children,
		...restProps
	}: {
		defaultUrl?: string;
		onUrlChange?: (url: string) => void;
		class?: string;
		children: import("svelte").Snippet;
		[key: string]: any;
	} = $props();

	// Create and set the context
	let context = new WebPreviewContext(
		untrack(() => defaultUrl),
		// svelte-ignore state_referenced_locally
		onUrlChange
	);
	setWebPreviewContext(context);
</script>

<div class={cn("bg-card flex size-full flex-col rounded-lg border", className)} {...restProps}>
	{@render children()}
</div>
