<script lang="ts">
	import * as HoverCard from "$lib/components/ui/hover-card/index.js";

	interface Props {
		open?: boolean;
		openDelay?: number;
		closeDelay?: number;
		children?: import("svelte").Snippet;
	}

	let {
		open = $bindable(false),
		openDelay = 200,
		closeDelay = 0,
		children,
		...props
	}: Props = $props();
</script>

<HoverCard.Root bind:open {openDelay} {closeDelay} {...props}>
	{#if children}
		{@render children()}
	{/if}
</HoverCard.Root>
