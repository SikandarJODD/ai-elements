<script lang="ts">
	import * as HoverCard from "$lib/components/ui/hover-card/index.js";
	import type { Snippet } from "svelte";

	type Props = {
		children: Snippet;
		closeDelay?: number;
		openDelay?: number;
		open?: boolean;
	};

	let {
		children,
		closeDelay = 0,
		openDelay = 0,
		open = $bindable(false),
		...restProps
	}: Props = $props();
</script>

<HoverCard.Root bind:open {closeDelay} {openDelay} {...restProps}>
	{@render children()}
</HoverCard.Root>
