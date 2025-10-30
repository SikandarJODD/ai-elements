<script lang="ts">
	import { CollapsibleTrigger } from "$lib/components/ui/collapsible/index.js";
	import { cn } from "$lib/utils/utils";
	import { ChevronDown, Circle } from "@lucide/svelte";
	import type { Collapsible as CollapsiblePrimitive } from "bits-ui";
	import type { Snippet } from "svelte";

	interface ChainOfThoughtTriggerProps extends CollapsiblePrimitive.TriggerProps {
		class?: string;
		children?: Snippet;
		leftIcon?: Snippet;
		swapIconOnHover?: boolean;
	}

	let {
		class: className,
		children,
		leftIcon,
		swapIconOnHover = true,
		...restProps
	}: ChainOfThoughtTriggerProps = $props();
</script>

<CollapsibleTrigger
	class={cn(
		"group text-muted-foreground hover:text-foreground flex cursor-pointer items-center justify-start gap-1 text-left text-sm transition-colors",
		className
	)}
	{...restProps}
>
	<div class="flex items-center gap-2">
		{#if leftIcon}
			<span class="relative inline-flex size-4 items-center justify-center">
				<span class={cn("transition-opacity", swapIconOnHover && "group-hover:opacity-0")}>
					{@render leftIcon()}
				</span>
				{#if swapIconOnHover}
					<ChevronDown
						class="absolute size-4 opacity-0 transition-opacity group-hover:opacity-100 group-data-[state=open]:rotate-180"
					/>
				{/if}
			</span>
		{:else}
			<span class="relative inline-flex size-4 items-center justify-center">
				<Circle class="size-2 fill-current" />
			</span>
		{/if}
		<span>{@render children?.()}</span>
	</div>
	{#if !leftIcon}
		<ChevronDown class="size-4 transition-transform group-data-[state=open]:rotate-180" />
	{/if}
</CollapsibleTrigger>

