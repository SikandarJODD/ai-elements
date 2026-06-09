<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	type FullWidthDividerProps = HTMLAttributes<HTMLDivElement> & {
		contained?: boolean;
		position?: "top" | "bottom";
	};

	let {
		class: className,
		contained = false,
		position,
		"aria-hidden": ariaHidden = "true",
		...rest
	}: FullWidthDividerProps = $props();
</script>

<div
	aria-hidden={ariaHidden}
	data-contained={contained}
	data-position={position}
	class={cn(
		"pointer-events-none absolute h-px bg-border",
		// full-bleed (default)
		"data-[contained=false]:left-1/2 data-[contained=false]:w-screen data-[contained=false]:-translate-x-1/2",
		// contained
		"data-[contained=true]:inset-x-0 data-[contained=true]:w-full",
		// position
		position && "data-[position=bottom]:-bottom-px data-[position=top]:-top-px",
		className
	)}
	{...rest}
></div>
