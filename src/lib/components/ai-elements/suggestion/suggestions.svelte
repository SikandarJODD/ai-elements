<script lang="ts">
	import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
	import { cn } from "$lib/utils";
	import type { Snippet } from "svelte";

	interface Props {
		children?: Snippet;
		class?: string;
		orientation?: "vertical" | "horizontal" | "both";
		scrollbarXClasses?: string;
		scrollbarYClasses?: string;
	}

	let {
		children,
		class: className,
		orientation = "horizontal",
		scrollbarXClasses,
		scrollbarYClasses,
		...restProps
	}: Props = $props();
</script>

<ScrollArea
	{orientation}
	{scrollbarXClasses}
	{scrollbarYClasses}
	class="w-full whitespace-nowrap"
	{...restProps}
>
	<div class={cn("flex w-max flex-nowrap items-center gap-2", className)}>
		{@render children?.()}
	</div>
</ScrollArea>
