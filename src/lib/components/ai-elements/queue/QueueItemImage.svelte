<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils/utils";
	import type { HTMLImgAttributes } from "svelte/elements";

	export interface QueueItemImageProps extends WithElementRef<HTMLImgAttributes> {}
</script>

<script lang="ts">
	let {
		class: className,
		ref = $bindable(null),
		alt = "",
		...restProps
	}: QueueItemImageProps = $props();
</script>

<img
	bind:this={ref}
	{alt}
	class={cn("h-8 w-8 rounded border object-cover", className)}
	height={32}
	width={32}
	{...restProps}
/>
