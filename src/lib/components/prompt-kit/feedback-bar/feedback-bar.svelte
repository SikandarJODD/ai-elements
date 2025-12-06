<script lang="ts" module>
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	export type FeedbackBarProps = HTMLAttributes<HTMLDivElement> & {
		/** Additional CSS classes */
		class?: string;
		/** Title text to display */
		title?: string;
		/** Custom icon snippet */
		icon?: Snippet;
		/** Callback when helpful (thumbs up) is clicked */
		onHelpful?: () => void;
		/** Callback when not helpful (thumbs down) is clicked */
		onNotHelpful?: () => void;
		/** Callback when close button is clicked */
		onClose?: () => void;
	};
</script>

<script lang="ts">
	import { cn } from "$lib/utils/utils";
	import { ThumbsUp, ThumbsDown, X } from "@lucide/svelte";

	let {
		class: className,
		title,
		icon,
		onHelpful,
		onNotHelpful,
		onClose,
		...restProps
	}: FeedbackBarProps = $props();
</script>

<div
	class={cn("bg-background border-border inline-flex rounded-[12px] border text-sm", className)}
	{...restProps}
>
	<div class="flex w-full items-center justify-between">
		<div class="flex flex-1 items-center justify-start gap-4 py-3 pl-4">
			{#if icon}
				{@render icon()}
			{/if}
			<span class="text-foreground font-medium">{title}</span>
		</div>
		<div class="flex items-center justify-center gap-0.5 px-3 py-0">
			<button
				type="button"
				class="text-muted-foreground hover:text-foreground flex size-8 items-center justify-center rounded-md transition-colors"
				aria-label="Helpful"
				onclick={onHelpful}
			>
				<ThumbsUp class="size-4" />
			</button>
			<button
				type="button"
				class="text-muted-foreground hover:text-foreground flex size-8 items-center justify-center rounded-md transition-colors"
				aria-label="Not helpful"
				onclick={onNotHelpful}
			>
				<ThumbsDown class="size-4" />
			</button>
		</div>
		<div class="border-border flex items-center justify-center border-l">
			<button
				type="button"
				onclick={onClose}
				class="text-muted-foreground hover:text-foreground flex items-center justify-center rounded-md p-3"
				aria-label="Close"
			>
				<X class="size-5" />
			</button>
		</div>
	</div>
</div>
