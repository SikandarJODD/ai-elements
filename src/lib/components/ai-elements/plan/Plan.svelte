<script lang="ts">
	import { Collapsible } from "$lib/components/ui/collapsible/index.js";
	import { Card } from "$lib/components/ui/card/index.js";
	import { cn } from "$lib/utils/utils";
	import { setPlanContext } from "./plan-context.svelte.js";
	import type { PlanProps } from "./types.js";

	let { class: className, isStreaming = false, children, ...restProps }: PlanProps = $props();

	// Set context for child components
	setPlanContext({ isStreaming });
</script>

<Collapsible data-slot="plan" {...restProps}>
	<Card class={cn("shadow-none", className)}>
		{@render children?.()}
	</Card>
</Collapsible>
