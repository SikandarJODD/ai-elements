<script lang="ts">
	import { cn } from "$lib/utils/utils";
	import { getMessageBranchContext } from "./message-context.svelte.js";
	import type { Snippet } from "svelte";
	import { watch } from "runed";

	type ContentItem = { id: string; content: string };

	interface Props {
		/**
		 * Either provide snippets array OR content array with renderItem
		 */
		children?: Snippet[];
		/**
		 * Array of content items to render
		 */
		content?: ContentItem[];
		/**
		 * Render function for content items
		 */
		renderItem?: Snippet<[ContentItem, number]>;
		class?: string;
		[key: string]: unknown;
	}

	let { children, content, renderItem, class: className, ...restProps }: Props = $props();

	const branchContext = getMessageBranchContext();

	// Compute items count based on whether we have snippets or content
	let itemsCount = $derived(children?.length ?? content?.length ?? 0);

	// Update branches count when items change
	watch(
		() => itemsCount,
		(newLength) => {
			if (branchContext.totalBranches !== newLength) {
				// Store the count, not the snippets themselves
				branchContext.setBranchCount(newLength);
			}
		}
	);
</script>

{#if children}
	<!-- Render snippets mode -->
	{#each children as branch, index (index)}
		<div
			class={cn(
				"grid gap-2 overflow-hidden [&>div]:pb-0",
				index === branchContext.currentBranch ? "block" : "hidden",
				className
			)}
			{...restProps}
		>
			{@render branch()}
		</div>
	{/each}
{:else if content && renderItem}
	<!-- Render content with renderItem mode -->
	{#each content as item, index (item.id)}
		<div
			class={cn(
				"grid gap-2 overflow-hidden [&>div]:pb-0",
				index === branchContext.currentBranch ? "block" : "hidden",
				className
			)}
			{...restProps}
		>
			{@render renderItem(item, index)}
		</div>
	{/each}
{/if}
