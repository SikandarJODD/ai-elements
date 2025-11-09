<script lang="ts" module>
	import { cn, type WithoutChild } from "$lib/utils/utils";
	import type { Snippet } from "svelte";
	import type { ScrollArea as ScrollAreaPrimitive } from "bits-ui";

	export interface QueueListProps extends WithoutChild<ScrollAreaPrimitive.RootProps> {
		children?: Snippet;
		orientation?: "vertical" | "horizontal" | "both" | undefined;
		scrollbarXClasses?: string | undefined;
		scrollbarYClasses?: string | undefined;
	}
</script>

<script lang="ts">
	import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";

	let {
		class: className,
		children,
		ref = $bindable(null),
		...restProps
	}: QueueListProps = $props();
</script>

<ScrollArea bind:ref class={cn("mt-2 -mb-1", className)} {...restProps}>
	<div class="max-h-40 pr-4">
		<ul>{@render children?.()}</ul>
	</div>
</ScrollArea>
