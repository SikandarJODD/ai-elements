<script lang="ts">
	import { getReasoningContext } from "./reasoning-context.svelte.js";
	import { cn } from "$lib/utils/utils";
	import { watch } from "runed";
	import type { Snippet } from "svelte";
	import { Streamdown } from "svelte-streamdown";
	import { mode } from "mode-watcher";

	interface Props {
		children?: Snippet;
		content?: string;
		class?: string;
		contentClassName?: string;
		markdown?: boolean;
		[key: string]: any;
	}

	let {
		children,
		content, // for streamdown purpose only
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
		{#if content}
			<!-- Basic -->
			<!-- <Streamdown {content} /> -->
			<!-- Advance with light and dark theme  -->
			<Streamdown
				{content}
				class="pb-4 [&>*:first-child]:mt-2 [&>*:last-child]:mb-0"
				shikiTheme={mode.current === "dark"
					? "github-dark-default"
					: "github-light-default"}
				shikiPreloadThemes={["github-dark-default", "github-light-default"]}
				baseTheme="shadcn"
			/>
		{:else}
			{@render children?.()}
		{/if}
	</div>
</div>
