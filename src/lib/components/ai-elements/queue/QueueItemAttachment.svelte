<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils/utils";
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";

	export interface QueueItemAttachmentProps
		extends WithElementRef<HTMLAttributes<HTMLDivElement>> {
		children?: Snippet;
	}
</script>

<script lang="ts">
	let {
		class: className,
		children,
		ref = $bindable(null),
		...restProps
	}: QueueItemAttachmentProps = $props();
</script>

<div bind:this={ref} class={cn("mt-1 flex flex-wrap gap-2", className)} {...restProps}>
	{@render children?.()}
</div>
