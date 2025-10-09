<script lang="ts">
	import { CardAction } from "$lib/components/ui/card";
	import type { WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	type Props = WithElementRef<HTMLAttributes<HTMLDivElement>>;

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: Props = $props();
</script>

<CardAction bind:ref class={className} {...restProps}>
	{@render children?.()}
</CardAction>
