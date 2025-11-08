<script lang="ts">
	import { CardTitle } from "$lib/components/ui/card/index.js";
	import { Shimmer } from "$lib/components/ai-elements/shimmer/index.js";
	import { getPlanContext } from "./plan-context.svelte.js";
	import type { PlanTitleProps } from "./types.js";

	let { children, ...restProps }: PlanTitleProps = $props();

	const { isStreaming } = getPlanContext();
</script>

<CardTitle data-slot="plan-title" {...restProps}>
	{#if isStreaming}
		<Shimmer content_length={50}>
			{#snippet children()}
				{@render children()}
			{/snippet}
		</Shimmer>
	{:else}
		{@render children()}
	{/if}
</CardTitle>
