<script lang="ts" module>
	import { cn } from "$lib/utils/utils";
	import type { Snippet } from "svelte";
	import type { Collapsible as CollapsiblePrimitive } from "bits-ui";

	export interface QueueSectionProps extends CollapsiblePrimitive.RootProps {
		children?: Snippet;
	}
</script>

<script lang="ts">
	import { Collapsible } from "$lib/components/ui/collapsible/index.js";

	let {
		class: className,
		open = $bindable(true),
		children,
		ref = $bindable(null),
		...restProps
	}: QueueSectionProps = $props();
</script>

<Collapsible bind:ref bind:open class={cn(className)} {...restProps}>
	{@render children?.()}
</Collapsible>
