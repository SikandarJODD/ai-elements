<script lang="ts">
	import { getReasoningContext } from "./reasoning-context.svelte.js";
	import { cn } from "$lib/utils/utils";
	import { watch } from "runed";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	interface Props {
		children: Snippet | string;
		class?: string;
		contentClassName?: string;
		markdown?: boolean;
		[key: string]: any;
	}

	let {
		children,
		class: className,
		contentClassName,
		markdown = false,
		...rest
	}: Props = $props();

	const context = getReasoningContext();

	let contentRef: HTMLDivElement | undefined = $state();
	let innerRef: HTMLDivElement | undefined = $state();

	// Watch for isOpen changes and resize observer
	watch(
		() => [context.isOpen, innerRef] as const,
		([isOpen, inner]) => {
			if (!contentRef || !inner) return;

			const observer = new ResizeObserver(() => {
				if (contentRef && inner && isOpen) {
					contentRef.style.maxHeight = `${inner.scrollHeight}px`;
				}
			});

			observer.observe(inner);

			if (isOpen) {
				contentRef.style.maxHeight = `${inner.scrollHeight}px`;
			}

			return () => observer.disconnect();
		}
	);

	// Compute max height reactively
	let maxHeight = $derived(context.isOpen && contentRef ? `${contentRef.scrollHeight}px` : "0px");
</script>

<div
	bind:this={contentRef}
	class={cn("overflow-hidden transition-[max-height] duration-150 ease-out", className)}
	style:max-height={maxHeight}
	{...rest}
>
	<div
		bind:this={innerRef}
		class={cn("text-muted-foreground prose prose-sm dark:prose-invert", contentClassName)}
	>
		{#if markdown && typeof children === "string"}
			<!-- TODO: Add Markdown component if available -->
			{@html children}
		{:else if typeof children === "function"}
			{@render children()}
		{:else}
			{children}
		{/if}
	</div>
</div>
