<script lang="ts">
	import { CollapsibleContent } from "$lib/components/ui/collapsible/index.js";
	import { cn } from "$lib/utils/utils";
	import type { Collapsible as CollapsiblePrimitive } from "bits-ui";
	import type { Snippet } from "svelte";

	interface ChainOfThoughtContentProps extends CollapsiblePrimitive.ContentProps {
		class?: string;
		children?: Snippet;
	}

	let { class: className, children, ...restProps }: ChainOfThoughtContentProps = $props();
</script>

<CollapsibleContent
	class={cn(
		"text-popover-foreground data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden",
		className
	)}
	{...restProps}
>
	<div class="grid grid-cols-[min-content_minmax(0,1fr)] gap-x-4">
		<div class="bg-primary/20 ml-1.75 h-full w-px group-data-[last=true]:hidden" />
		<div class="ml-1.75 h-full w-px bg-transparent group-data-[last=false]:hidden" />
		<div class="mt-2 space-y-2">{@render children?.()}</div>
	</div>
</CollapsibleContent>
