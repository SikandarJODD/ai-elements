<script lang="ts">
	import { CardHeader } from "$lib/components/ui/card";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	type Props = WithElementRef<HTMLAttributes<HTMLDivElement>>;

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: Props = $props();
</script>

<CardHeader
	bind:ref
	class={cn("gap-0.5 rounded-t-md border-b bg-secondary p-3!", className)}
	{...restProps}
>
	{@render children?.()}
</CardHeader>
