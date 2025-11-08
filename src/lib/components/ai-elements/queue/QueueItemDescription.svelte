<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils/utils";
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";

	export interface QueueItemDescriptionProps
		extends WithElementRef<HTMLAttributes<HTMLDivElement>> {
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
	}: QueueItemDescriptionProps = $props();
</script>

<div
	bind:this={ref}
	class={cn(
		"ml-6 text-xs",
		completed ? "text-muted-foreground/40 line-through" : "text-muted-foreground",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
