<script lang="ts">
	import { Collapsible } from "$lib/components/ui/collapsible/index.js";
	import { cn } from "$lib/utils/utils";
	import type { Collapsible as CollapsiblePrimitive } from "bits-ui";
	import type { Snippet } from "svelte";

	interface ChainOfThoughtStepProps extends CollapsiblePrimitive.RootProps {
		class?: string;
		children?: Snippet;
		isLast?: boolean;
	}

	let {
		class: className,
		children,
		isLast = false,
		...restProps
	}: ChainOfThoughtStepProps = $props();
</script>

<Collapsible class={cn("group", className)} data-last={isLast} {...restProps}>
	{@render children?.()}
	<div class="flex justify-start group-data-[last=true]:hidden">
		<div class="bg-primary/20 ml-1.75 h-4 w-px" />
	</div>
</Collapsible>

