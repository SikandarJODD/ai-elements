<script lang="ts" module>
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	export type TextShimmerProps = HTMLAttributes<HTMLElement> & {
		/** The HTML element to render as */
		as?: keyof HTMLElementTagNameMap;
		/** Animation duration in seconds */
		duration?: number;
		/** Spread of the shimmer highlight (5-45) */
		spread?: number;
		/** Content to display */
		children?: Snippet;
		/** Additional CSS classes */
		class?: string;
	};
</script>

<script lang="ts">
	import { cn } from "$lib/utils/utils";

	let {
		as = "span",
		duration = 4,
		spread = 20,
		children,
		class: className,
		...restProps
	}: TextShimmerProps = $props();

	// Clamp spread between 5 and 45
	const dynamicSpread = $derived(Math.min(Math.max(spread, 5), 45));

	const shimmerStyle = $derived(
		`background-image: linear-gradient(to right, var(--muted-foreground) ${50 - dynamicSpread}%, var(--foreground) 50%, var(--muted-foreground) ${50 + dynamicSpread}%); animation-duration: ${duration}s;`
	);
</script>

<svelte:element
	this={as}
	class={cn(
		"bg-size-[200%_auto] bg-clip-text font-medium text-transparent",
		"animate-[shimmer_4s_infinite_linear]",
		className
	)}
	style={shimmerStyle}
	{...restProps}
>
	{#if children}
		{@render children()}
	{/if}
</svelte:element>
