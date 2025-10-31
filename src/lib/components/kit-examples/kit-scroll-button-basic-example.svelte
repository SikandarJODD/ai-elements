<script lang="ts">
	import {
		ScrollButton,
		setScrollContext,
	} from "$lib/components/prompt-kit/scroll-button/index.js";
	import { watch } from "runed";

	const scrollContext = setScrollContext();

	const content = Array(20)
		.fill(0)
		.map((_, i) => ({
			id: i,
			title: `Item ${i + 1}`,
			description: "This is a sample item to demonstrate scrolling behavior.",
		}));

	let containerRef = $state<HTMLElement | null>(null);

	watch(
		() => containerRef,
		() => {
			if (containerRef) {
				scrollContext.setElement(containerRef);
			}
		}
	);
</script>

<div class="relative h-[400px] w-full overflow-hidden">
	<div bind:this={containerRef} class="h-full overflow-y-auto">
		<div class="flex w-full flex-col p-4">
			{#each content as item (item.id)}
				<div class="border-b p-3">
					<h3 class="font-medium">{item.title}</h3>
					<p class="text-muted-foreground">{item.description}</p>
				</div>
			{/each}
		</div>
	</div>
	<div class="absolute right-4 bottom-4">
		<ScrollButton />
	</div>
</div>
