<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	interface TabLabelProps extends WithElementRef<HTMLAttributes<HTMLHeadingElement>> {
		children?: Snippet;
	}

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: TabLabelProps = $props();
</script>

<h3 bind:this={ref} class={cn("mb-2 px-3 text-xs font-medium text-muted-foreground", className)} {...restProps}>
	{@render children?.()}
</h3>
