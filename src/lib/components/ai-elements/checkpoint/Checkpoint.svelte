<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils/utils";
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";

	export interface CheckpointProps extends WithElementRef<HTMLAttributes<HTMLDivElement>> {
		children?: Snippet;
	}
</script>

<script lang="ts">
	import { Separator } from "$lib/components/ui/separator";

	let {
		class: className,
		children,
		ref = $bindable(null),
		...restProps
	}: CheckpointProps = $props();
</script>

<div
	bind:this={ref}
	class={cn("text-muted-foreground flex items-center gap-0.5", className)}
	{...restProps}
>
	{@render children?.()}
	<Separator />
</div>
