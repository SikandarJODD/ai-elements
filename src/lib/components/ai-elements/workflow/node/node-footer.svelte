<script lang="ts">
	import { CardFooter } from "$lib/components/ui/card";
	import { cn, type WithElementRef } from "$lib/utils/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	type Props = WithElementRef<HTMLAttributes<HTMLDivElement>>;

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: Props = $props();
</script>

<CardFooter
	bind:ref
	class={cn("rounded-b-md border-t bg-secondary p-3!", className)}
	{...restProps}
>
	{@render children?.()}
</CardFooter>
