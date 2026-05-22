<script lang="ts">
	import { cn } from "$lib/utils";
	import * as Carousel from "$lib/components/ui/carousel/index.js";
	import type { Snippet } from "svelte";

	type Props = {
		children: Snippet;
		class?: string;
	};

	let { children, class: className, ...restProps }: Props = $props();
</script>

<Carousel.Item class={cn("w-full space-y-2 p-4 pl-8", className)} {...restProps}>
	{@render children()}
</Carousel.Item>
