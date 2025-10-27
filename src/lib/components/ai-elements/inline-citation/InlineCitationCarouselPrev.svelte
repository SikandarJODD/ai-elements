<script lang="ts">
	import { cn } from "$lib/utils/utils";
	import { getCarouselContext } from "./carousel-context.svelte.js";
	import { ArrowLeft } from "@lucide/svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";

	type Props = HTMLButtonAttributes & {
		class?: string;
	};

	let { class: className, ...restProps }: Props = $props();

	const carouselContext = getCarouselContext();

	function handleClick() {
		const api = carouselContext?.getApi();
		if (api) {
			api.scrollPrev();
		}
	}
</script>

<button
	aria-label="Previous"
	class={cn("shrink-0", className)}
	onclick={handleClick}
	type="button"
	{...restProps}
>
	<ArrowLeft class="text-muted-foreground size-4" />
</button>
