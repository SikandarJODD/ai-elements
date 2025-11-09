<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils/utils";
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";

	export interface QueueItemActionsProps extends WithElementRef<HTMLAttributes<HTMLDivElement>> {
		children?: Snippet;
	}
</script>

<script lang="ts">
	let {
		class: className,
		children,
		ref = $bindable(null),
		...restProps
	}: QueueItemActionsProps = $props();
</script>

<div bind:this={ref} class={cn("flex gap-1", className)} {...restProps}>
	{@render children?.()}
</div>
