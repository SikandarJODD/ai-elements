<script lang="ts">
	import { CardDescription } from "$lib/components/ui/card/index.js";
	import { Shimmer } from "$lib/components/ai-elements/shimmer/index.js";
	import { cn } from "$lib/utils/utils";
	import { getPlanContext } from "./plan-context.svelte.js";
	import type { PlanDescriptionProps } from "./types.js";

	let { class: className, children, ...restProps }: PlanDescriptionProps = $props();

	const { isStreaming } = getPlanContext();
</script>

<CardDescription class={cn("text-balance", className)} data-slot="plan-description" {...restProps}>
	{#if isStreaming}
		<Shimmer content_length={80}>
			{#snippet children()}
				{@render children()}
			{/snippet}
		</Shimmer>
	{:else}
		{@render children()}
	{/if}
</CardDescription>
