<script lang="ts">
	import { CollapsibleContent } from "$lib/components/ui/collapsible/index.js";
	import { CardContent } from "$lib/components/ui/card/index.js";
	import type { PlanContentProps } from "./types.js";

	let { children, ...restProps }: PlanContentProps = $props();
</script>

<CollapsibleContent>
	<CardContent data-slot="plan-content" {...restProps}>
		{@render children?.()}
	</CardContent>
</CollapsibleContent>
