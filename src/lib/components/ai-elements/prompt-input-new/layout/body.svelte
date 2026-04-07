<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	interface BodyProps extends WithElementRef<HTMLAttributes<HTMLDivElement>> {
		children?: Snippet;
	}

	let { ref = $bindable(null), class: className, children, ...restProps }: BodyProps =
		$props();
</script>

<div bind:this={ref} class={cn("contents", className)} {...restProps}>
	{@render children?.()}
</div>
