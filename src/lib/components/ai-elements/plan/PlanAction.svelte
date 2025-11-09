<script lang="ts">
	import { CardAction } from "$lib/components/ui/card/index.js";
	import type { PlanActionProps } from "./types.js";

	let { children, ...restProps }: PlanActionProps = $props();
</script>

<CardAction data-slot="plan-action" {...restProps}>
	{@render children?.()}
</CardAction>
