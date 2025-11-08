<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils/utils";
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";

	export interface QueueItemIndicatorProps
		extends WithElementRef<HTMLAttributes<HTMLSpanElement>> {
		completed?: boolean;
		children?: Snippet;
	}
</script>

<script lang="ts">
	let {
		completed = false,
		class: className,
		children,
		ref = $bindable(null),
		...restProps
	}: QueueItemIndicatorProps = $props();
</script>

<span
	bind:this={ref}
	class={cn(
		"mt-0.5 inline-block size-2.5 rounded-full border",
		completed
			? "border-muted-foreground/20 bg-muted-foreground/10"
			: "border-muted-foreground/50",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</span>
