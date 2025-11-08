<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils/utils";
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";

	export interface QueueItemContentProps extends WithElementRef<HTMLAttributes<HTMLSpanElement>> {
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
	}: QueueItemContentProps = $props();
</script>

<span
	bind:this={ref}
	class={cn(
		"line-clamp-1 grow break-words",
		completed ? "text-muted-foreground/50 line-through" : "text-muted-foreground",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</span>
