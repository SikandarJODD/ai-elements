<script lang="ts">
	import * as Carousel from "$lib/components/ui/carousel/index.js";
	import type { Snippet } from "svelte";

	type Props = {
		children: Snippet;
		class?: string;
	};

	let { children, ...restProps }: Props = $props();
</script>

<Carousel.Content {...restProps}>
	{@render children()}
</Carousel.Content>
