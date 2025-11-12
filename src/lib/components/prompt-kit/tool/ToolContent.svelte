<script lang="ts">
	import { cn } from "$lib/utils/utils";
	import { CollapsibleContent } from "$lib/components/ui/collapsible/index.js";
	import type { Snippet } from "svelte";

	let {
		class: className,
		children,
	}: {
		class?: string;
		children: Snippet;
	} = $props();
</script>

<CollapsibleContent
	class={cn(
		"border-border border-t",
		"data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden",
		className
	)}
>
	{@render children()}
</CollapsibleContent>
