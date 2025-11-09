<script lang="ts">
	import { CardHeader } from "$lib/components/ui/card/index.js";
	import { cn } from "$lib/utils/utils";
	import type { PlanHeaderProps } from "./types.js";

	let { class: className, children, ...restProps }: PlanHeaderProps = $props();
</script>

<CardHeader
	class={cn("flex items-start justify-between", className)}
	data-slot="plan-header"
	{...restProps}
>
	{@render children?.()}
</CardHeader>
