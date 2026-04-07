<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	interface TabItemProps extends WithElementRef<HTMLAttributes<HTMLDivElement>> {
		children?: Snippet;
	}

	let { ref = $bindable(null), class: className, children, ...restProps }: TabItemProps =
		$props();
</script>

<div
	bind:this={ref}
	class={cn("flex items-center gap-2 px-3 py-2 text-xs hover:bg-accent", className)}
	{...restProps}
>
	{@render children?.()}
</div>
