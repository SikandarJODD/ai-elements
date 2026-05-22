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

	let outputTokens = $derived.by(() => context.usage?.outputTokens ?? 0);

	let outputCostText = $derived.by(() => {
		if (!outputTokens || !context.modelId) return undefined;

		const outputCost = estimateCost({
			modelId: context.modelId,
			usage: { input: 0, output: outputTokens },
		}).totalUSD;

		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(outputCost);
	});
</script>

{#if children}
	{@render children()}
{:else if outputTokens}
	<div class={cn("flex items-center justify-between text-xs", className)} {...props}>
		<span class="text-muted-foreground">Output</span>
		<TokensWithCost tokens={outputTokens} costText={outputCostText} />
	</div>
{/if}
