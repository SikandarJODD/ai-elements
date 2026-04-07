<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	interface ToolsProps extends WithElementRef<HTMLAttributes<HTMLDivElement>> {
		children?: Snippet;
	}

	let { ref = $bindable(null), class: className, children, ...restProps }: ToolsProps =
		$props();
</script>

<div bind:this={ref} class={cn("flex min-w-0 items-center gap-1", className)} {...restProps}>
	{@render children?.()}
</div>
