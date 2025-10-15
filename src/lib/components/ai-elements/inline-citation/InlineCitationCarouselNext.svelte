<script lang="ts">
	import { cn } from '$lib/utils/utils.js';
	import { getCarouselContext } from './carousel-context.svelte.js';
	import { ArrowRight } from '@lucide/svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Props = HTMLButtonAttributes & {
		class?: string;
	};

	let {
		class: className,
		...restProps
	}: Props = $props();

	const carouselContext = getCarouselContext();

	function handleClick() {
		const api = carouselContext?.getApi();
		if (api) {
			api.scrollNext();
		}
	}
</script>

<button
	aria-label="Next"
	class={cn("shrink-0", className)}
	onclick={handleClick}
	type="button"
	{...restProps}
>
	<ArrowRight class="size-4 text-muted-foreground" />
</button>