<script lang="ts">
	import { NodeToolbar, Position } from "@xyflow/svelte";
	import { cn } from "$lib/utils/utils";
	import type { Snippet } from "svelte";
	import type { NodeToolbarProps } from "@xyflow/svelte";

	interface ToolbarProps extends Omit<NodeToolbarProps, "children"> {
		class?: string;
		children?: Snippet;
	}

	let {
		class: className,
		children,
		position = Position.Bottom,
		...restProps
	}: ToolbarProps = $props();
</script>

<NodeToolbar
	class={cn("bg-background flex items-center gap-1 rounded-sm border p-1.5", className)}
	{position}
	{...restProps}
>
	{#if children}
		{@render children()}
	{/if}
</NodeToolbar>
