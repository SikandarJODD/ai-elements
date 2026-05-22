<script lang="ts">
	import { cn } from "$lib/utils";
	import type { ImageProps } from "./types";

	let {
		ref = $bindable(null),
		base64,
		uint8Array,
		mediaType,
		alt,
		class: className,
		...rest
	}: ImageProps = $props();
</script>

<img
	bind:this={ref}
	{alt}
	class={cn("h-auto max-w-full overflow-hidden rounded-md", className)}
	src={`data:${mediaType};base64,${base64}`}
	{...rest}
/>
