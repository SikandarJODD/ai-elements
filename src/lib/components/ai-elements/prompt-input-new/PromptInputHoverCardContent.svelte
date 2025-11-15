<script lang="ts">
	import { cn } from "$lib/utils/utils.js";
	import * as HoverCard from "$lib/components/ui/hover-card/index.js";

	interface Props {
		class?: string;
		align?: "start" | "center" | "end";
		side?: "top" | "right" | "bottom" | "left";
		sideOffset?: number;
		children?: import("svelte").Snippet;
	}

	let {
		class: className,
		align = "center",
		side = "top",
		sideOffset = 4,
		children,
		...props
	}: Props = $props();
</script>

<HoverCard.Content class={cn(className)} {align} {side} {sideOffset} {...props}>
	{#if children}
		{@render children()}
	{/if}
</HoverCard.Content>
