<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	interface TabBodyProps extends WithElementRef<HTMLAttributes<HTMLDivElement>> {
		children?: Snippet;
	}

	let { ref = $bindable(null), class: className, children, ...restProps }: TabBodyProps =
		$props();
</script>

<div bind:this={ref} class={cn("space-y-1", className)} {...restProps}>
	{@render children?.()}
</div>
