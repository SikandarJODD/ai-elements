<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils/utils";
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";

	export interface QueueSectionLabelProps
		extends WithElementRef<HTMLAttributes<HTMLSpanElement>> {
		count?: number;
		label: string;
		icon?: Snippet;
		children?: Snippet;
	}
</script>

<script lang="ts">
	import CollapsibleContent from "$lib/components/ui/collapsible/collapsible-content.svelte";
	import ChevronDown from "@lucide/svelte/icons/chevron-down";

	let {
		count,
		label,
		icon,
		class: className,
		children,
		ref = $bindable(null),
		...restProps
	}: QueueSectionLabelProps = $props();
</script>

<span bind:this={ref} class={cn("flex items-center gap-2", className)} {...restProps}>
	<ChevronDown class="size-4 transition-transform group-data-[state=closed]:-rotate-90" />
	{#if icon}
		{@render icon()}
	{/if}
	<span>
		{#if count !== undefined}
			{count}
		{/if}
		{label}
	</span>
	{@render children?.()}
</span>
