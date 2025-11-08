<script lang="ts">
	import { CardFooter } from "$lib/components/ui/card/index.js";
	import type { PlanFooterProps } from "./types.js";

	let { children, ...restProps }: PlanFooterProps = $props();
</script>

<CardFooter data-slot="plan-footer" {...restProps}>
	{@render children?.()}
</CardFooter>
