<script lang="ts" module>
	import { cn } from "$lib/utils/utils";
	import type { Snippet } from "svelte";
	import type { Collapsible as CollapsiblePrimitive } from "bits-ui";

	export interface QueueSectionContentProps extends CollapsiblePrimitive.ContentProps {
		children?: Snippet;
	}
</script>

<script lang="ts">
	import { CollapsibleContent } from "$lib/components/ui/collapsible/index.js";

	let {
		class: className,
		children,
		ref = $bindable(null),
		...restProps
	}: QueueSectionContentProps = $props();
</script>

<CollapsibleContent bind:ref class={cn(className)} {...restProps}>
	{@render children?.()}
</CollapsibleContent>
