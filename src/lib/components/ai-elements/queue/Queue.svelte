<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils/utils";
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";

	export interface QueueProps extends WithElementRef<HTMLAttributes<HTMLDivElement>> {
		children?: Snippet;
	}
</script>

<script lang="ts">
	let { class: className, children, ref = $bindable(null), ...restProps }: QueueProps = $props();
</script>

<div
	bind:this={ref}
	class={cn(
		"border-border bg-background flex flex-col gap-2 rounded-xl border px-3 pt-2 pb-2 shadow-xs",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
