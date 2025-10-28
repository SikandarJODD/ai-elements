<script lang="ts">
	import {
		ChatContainerRoot,
		ChatContainerContent,
	} from "$lib/components/prompt-kit/chat-container/index.js";
	import {
		ScrollButton,
		setScrollContext,
	} from "$lib/components/prompt-kit/scroll-button/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import type { ButtonVariant } from "$lib/components/ui/button/index.js";
	import { watch } from "runed";

	const scrollContext = setScrollContext();

	let variant = $state<ButtonVariant>("secondary");

	const content = Array(20)
		.fill(0)
		.map((_, i) => ({
			id: i,
			title: `Item ${i + 1}`,
			description: "This is a sample item to demonstrate scrolling behavior.",
		}));

	let containerRef = $state<HTMLDivElement | null>(null);

	watch(
		() => containerRef,
		() => {
			if (containerRef) {
				scrollContext.setElement(containerRef);
			}
		}
	);
</script>

<div class="flex h-[500px] w-full flex-col overflow-hidden">
	<div class="flex w-full items-center justify-between gap-2 overflow-x-scroll border-b p-3">
		<div></div>
		<div class="flex gap-2">
			<Button
				size="sm"
				variant={variant === "default" ? "default" : "outline"}
				onclick={() => (variant = "default")}
			>
				Default
			</Button>
			<Button
				size="sm"
				variant={variant === "outline" ? "default" : "outline"}
				onclick={() => (variant = "outline")}
			>
				Outline
			</Button>
			<Button
				size="sm"
				variant={variant === "secondary" ? "default" : "outline"}
				onclick={() => (variant = "secondary")}
			>
				Secondary
			</Button>
		</div>
	</div>

	<div class="relative flex-1 overflow-y-auto">
		<div
			bind:this={containerRef}
			class="flex h-full w-full flex-col items-center justify-center overflow-y-auto"
		>
			<ChatContainerRoot class="h-full w-full">
				<ChatContainerContent class="w-full">
					{#each content as item (item.id)}
						<div class="border-b p-3">
							<h3 class="font-medium">{item.title}</h3>
							<p class="text-muted-foreground">{item.description}</p>
						</div>
					{/each}
				</ChatContainerContent>
				<div class="absolute right-4 bottom-4">
					<ScrollButton {variant} />
				</div>
			</ChatContainerRoot>
		</div>
	</div>
</div>
