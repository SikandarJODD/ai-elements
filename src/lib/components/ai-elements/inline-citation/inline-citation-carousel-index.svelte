<script lang="ts">
	import { cn } from "$lib/utils";
	import { getCarouselContext } from "./carousel-context.svelte.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	type Props = HTMLAttributes<HTMLDivElement> & {
		children?: Snippet;
		class?: string;
	};

	let { children, class: className, ...restProps }: Props = $props();

	const carouselContext = getCarouselContext();

	let current = $state(0);
	let count = $state(0);

	const displayText = $derived.by(() => {
		return children ? null : `${current}/${count}`;
	});

	$effect(() => {
		const api = carouselContext?.getApi();
		if (!api) return;

		// Initialize values
		count = api.scrollSnapList().length;
		current = api.selectedScrollSnap() + 1;

		// Set up event listener
		const handleSelect = () => {
			current = api.selectedScrollSnap() + 1;
		};

		api.on("select", handleSelect);

		// Cleanup
		return () => {
			api.off?.("select", handleSelect);
		};
	});
</script>

<div
	class={cn(
		"text-muted-foreground flex flex-1 items-center justify-end px-3 py-1 text-xs",
		className
	)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		{displayText}
	{/if}
</div>
