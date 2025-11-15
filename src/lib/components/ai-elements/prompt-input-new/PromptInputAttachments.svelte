<script lang="ts">
	import { cn } from "$lib/utils/utils.js";
	import { watch } from "runed";
	import { getPromptInputAttachments, type FileWithId } from "./prompt-input-context.svelte.js";
	import type { PromptInputAttachmentsProps } from "./types.js";

	let { class: className, children, ...props }: PromptInputAttachmentsProps = $props();

	const attachments = getPromptInputAttachments();
	let height = $state(0);
	let contentRef = $state<HTMLDivElement | null>(null);

	// Separate files and images for grouped rendering
	const nonImageFiles = $derived(
		attachments.files.filter((f) => !(f.mediaType?.startsWith("image/") && f.url))
	);

	const imageFiles = $derived(
		attachments.files.filter((f) => f.mediaType?.startsWith("image/") && f.url)
	);

	// Watch for resize changes using ResizeObserver
	watch(
		() => contentRef,
		(contentRef) => {
			if (!contentRef) return;

			const ro = new ResizeObserver(() => {
				if (contentRef) {
					height = contentRef.getBoundingClientRect().height;
				}
			});

			ro.observe(contentRef);
			height = contentRef.getBoundingClientRect().height;

			return () => ro.disconnect();
		}
	);

	const computedHeight = $derived.by(() => {
		return attachments.files.length ? height : 0;
	});
</script>

<div
	aria-live="polite"
	class={cn("overflow-hidden transition-[height] duration-200 ease-out", className)}
	style:height="{computedHeight}px"
	{...props}
>
	<div class="space-y-2 px-3 py-1" bind:this={contentRef}>
		<!-- Non-image files first -->
		{#if nonImageFiles.length > 0}
			<div class="flex flex-wrap gap-2">
				{#each nonImageFiles as file (file.id)}
					{#if children}
						{@render children(file)}
					{/if}
				{/each}
			</div>
		{/if}

		<!-- Images second -->
		{#if imageFiles.length > 0}
			<div class="flex flex-wrap gap-2">
				{#each imageFiles as file (file.id)}
					{#if children}
						{@render children(file)}
					{/if}
				{/each}
			</div>
		{/if}
	</div>
</div>
