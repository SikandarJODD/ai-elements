<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";

	export interface ConversationEmptyStateProps extends WithElementRef<HTMLAttributes<HTMLDivElement>> {
		title?: string;
		description?: string;
		icon?: Snippet;
		children?: Snippet;
	}
</script>

<script lang="ts">
	let {
		class: className,
		title = "No messages yet",
		description = "Start a conversation to see messages here",
		icon,
		children,
		ref = $bindable(null),
		...restProps
	}: ConversationEmptyStateProps = $props();
</script>

<div
	bind:this={ref}
	class={cn(
		"flex size-full flex-col items-center justify-center gap-3 p-8 text-center",
		className
	)}
	{...restProps}
>
	{#if children}
		{@render children?.()}
	{:else}
		{#if icon}
			<div class="text-muted-foreground">
				{@render icon()}
			</div>
		{/if}
		<div class="space-y-1">
			<h3 class="font-medium text-sm">{title}</h3>
			{#if description}
				<p class="text-muted-foreground text-sm">{description}</p>
			{/if}
		</div>
	{/if}
</div>