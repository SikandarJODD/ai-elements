<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils/utils";
	import type { Snippet } from "svelte";
	import type { ButtonProps } from "$lib/components/ui/button/index.js";

	export interface QueueItemActionProps extends Omit<ButtonProps, "variant" | "size"> {
		children?: Snippet;
	}
</script>

<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";

	let {
		class: className,
		children,
		ref = $bindable(null),
		...restProps
	}: QueueItemActionProps = $props();
</script>

<Button
	bind:ref
	class={cn(
		"text-muted-foreground hover:bg-muted-foreground/10 hover:text-foreground size-auto rounded p-1 opacity-0 transition-opacity group-hover:opacity-100",
		className
	)}
	size="icon"
	type="button"
	variant="ghost"
	{...restProps}
>
	{@render children?.()}
</Button>
