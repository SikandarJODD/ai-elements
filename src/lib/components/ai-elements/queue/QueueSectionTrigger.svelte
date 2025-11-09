<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils/utils";
	import type { HTMLButtonAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";

	export interface QueueSectionTriggerProps extends WithElementRef<HTMLButtonAttributes> {
		children?: Snippet;
	}
</script>

<script lang="ts">
	import { CollapsibleTrigger } from "$lib/components/ui/collapsible/index.js";

	let {
		class: className,
		children,
		ref = $bindable(null),
		...restProps
	}: QueueSectionTriggerProps = $props();
</script>

<CollapsibleTrigger>
	<button
		bind:this={ref}
		class={cn(
			"group bg-muted/40 text-muted-foreground hover:bg-muted flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium transition-colors",
			className
		)}
		type="button"
		{...restProps}
	>
		{@render children?.()}
	</button>
</CollapsibleTrigger>
