<script lang="ts">
	import HoverCardContent from "$lib/components/ui/hover-card/hover-card-content.svelte";
	import { cn } from "$lib/utils";

	interface Props {
		children?: import("svelte").Snippet;
		class?: string;
		align?: "center" | "start" | "end";
		side?: "top" | "right" | "bottom" | "left";
		sideOffset?: number;
		[key: string]: any;
	}

	let {
		children,
		side = "top",
		align = "center",
		sideOffset = 4,
		class: className,
		...props
	}: Props = $props();
</script>

<HoverCardContent
	{side}
	{align}
	{sideOffset}
	class={cn("min-w-60 divide-y overflow-hidden p-0", className)}
	{...props}
>
	{@render children?.()}
</HoverCardContent>
