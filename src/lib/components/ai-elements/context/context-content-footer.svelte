<script lang="ts">
	import { cn } from "$lib/utils";
	import { getContextValue, estimateCost } from "./context-context.svelte.js";

	interface Props {
		children?: import("svelte").Snippet;
		class?: string;
		[key: string]: any;
	}

	let { children, class: className, ...props }: Props = $props();

	let context = getContextValue();

	let totalCost = $derived.by(() => {
		const costUSD = context.modelId
			? estimateCost({
					modelId: context.modelId,
					usage: {
						input: context.usage?.inputTokens ?? 0,
						output: context.usage?.outputTokens ?? 0,
					},
				}).totalUSD
			: undefined;

		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(costUSD ?? 0);
	});
</script>

<div
	class={cn("bg-secondary flex w-full items-center justify-between gap-3 p-3 text-xs", className)}
	{...props}
>
	{#if children}
		{@render children?.()}
	{:else}
		<span class="text-muted-foreground">Total cost</span>
		<span>{totalCost}</span>
	{/if}
</div>
