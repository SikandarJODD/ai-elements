<script lang="ts">
	import { cn } from "$lib/utils";
	import * as Carousel from "$lib/components/ui/carousel/index.js";
	import {
		CarouselContext,
		setCarouselContext,
		type CarouselApi,
	} from "./carousel-context.svelte.js";
	import type { Snippet } from "svelte";

	type Props = {
		children: Snippet;
		class?: string;
		opts?: object;
		plugins?: any[];
		orientation?: "horizontal" | "vertical";
	};

	let {
		children,
		class: className,
		opts = {},
		plugins = [],
		orientation = "horizontal",
		...restProps
	}: Props = $props();

	const carouselContext = new CarouselContext();
	setCarouselContext(carouselContext);

	function setApi(api: any) {
		carouselContext.setApi(api);
	}
</script>

<Carousel.Root
	class={cn("w-full", className)}
	{opts}
	{plugins}
	{orientation}
	{...restProps}
	{setApi}
>
	{@render children()}
</Carousel.Root>
