<script lang="ts">
	import { cn } from "$lib/utils/utils";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import Markdown from "../markdown/Markdown.svelte";

	let {
		markdown = false,
		class: className,
		content,
		children,
		...restProps
	}: {
		content?: string;
		markdown?: boolean;
		class?: string;
		children?: Snippet;
	} & HTMLAttributes<HTMLDivElement> = $props();

	const classNames = cn(
		"text-foreground bg-secondary prose rounded-lg p-2 break-words whitespace-normal",
		className
	);
</script>

{#if markdown && content}
	<!-- Markdown rendering can be added here when needed -->
	<!-- For now, we'll render as plain div -->
	<!-- <div class={classNames} {...restProps}>
		{@render children()}
	</div> -->
	<Markdown class={classNames} {content}></Markdown>
{:else}
	<div class={classNames} {...restProps}>
		{@render children?.()}
	</div>
{/if}
