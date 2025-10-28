<script lang="ts">
	import { CardFooter } from "$lib/components/ui/card";
	import { cn, type WithElementRef } from "$lib/utils/utils";
	import type { HTMLAttributes } from "svelte/elements";

	type Props = WithElementRef<HTMLAttributes<HTMLDivElement>>;

	let { ref = $bindable(null), class: className, children, ...restProps }: Props = $props();
</script>

<CardFooter
	bind:ref
	class={cn("bg-secondary rounded-b-md border-t p-3!", className)}
	{...restProps}
>
	{@render children?.()}
</CardFooter>
