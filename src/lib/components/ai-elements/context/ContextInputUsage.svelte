<script lang="ts">
	import { cn } from "$lib/utils";
	import { getContextValue, estimateCost } from "./context-context.svelte.js";
	import TokensWithCost from "./TokensWithCost.svelte";

	interface Props {
		children?: import("svelte").Snippet;
		class?: string;
		[key: string]: any;
	}

	let { children, class: className, ...props }: Props = $props();

	let context = getContextValue();

	let inputTokens = $derived.by(() => context.usage?.inputTokens ?? 0);

	let inputCostText = $derived.by(() => {
		if (!inputTokens || !context.modelId) return undefined;

		const inputCost = estimateCost({
			modelId: context.modelId,
			usage: { input: inputTokens, output: 0 },
		}).totalUSD;

		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(inputCost);
	});
</script>

{#if children}
	{@render children()}
{:else if inputTokens}
	<div class={cn("flex items-center justify-between text-xs", className)} {...props}>
		<span class="text-muted-foreground">Input</span>
		<TokensWithCost tokens={inputTokens} costText={inputCostText} />
	</div>
{/if}
