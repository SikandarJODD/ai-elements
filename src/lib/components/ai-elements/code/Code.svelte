<script lang="ts">
	import { cn } from "$lib/utils";
	import { codeVariants } from ".";
	import type { CodeRootProps } from "./types";
	import { useCode } from "./code.svelte.js";
	import { box } from "svelte-toolbelt";

	let {
		ref = $bindable(null),
		variant = "default",
		lang = "typescript",
		code,
		class: className,
		hideLines = false,
		highlight = [],
		children,
		...rest
	}: CodeRootProps = $props();

	const codeState = useCode({
		code: box.with(() => code),
		hideLines: box.with(() => hideLines),
		highlight: box.with(() => highlight),
		lang: box.with(() => lang),
	});
</script>

<div {...rest} bind:this={ref} class={cn(codeVariants({ variant }), className)}>
	<div class="ai-code-wrapper">
		{@html codeState.highlighted}
		{@render children?.()}
	</div>
</div>

<style>
	@reference '../../../../app.css';

	/* Scoped global styles - only affect elements within .ai-code-wrapper */
	/* Dark mode: check dark class on parent, then scope to wrapper */
	:global(.dark) .ai-code-wrapper :global(.shiki),
	:global(.dark) .ai-code-wrapper :global(.shiki span) {
		color: var(--shiki-dark) !important;
		font-style: var(--shiki-dark-font-style) !important;
		font-weight: var(--shiki-dark-font-weight) !important;
		text-decoration: var(--shiki-dark-text-decoration) !important;
	}

	/* Shiki see: https://shiki.matsu.io/guide/dual-themes#class-based-dark-mode */
	:global(html.dark) .ai-code-wrapper :global(.shiki),
	:global(html.dark) .ai-code-wrapper :global(.shiki span) {
		color: var(--shiki-dark) !important;
		font-style: var(--shiki-dark-font-style) !important;
		font-weight: var(--shiki-dark-font-weight) !important;
		text-decoration: var(--shiki-dark-text-decoration) !important;
	}

	.ai-code-wrapper :global(pre.shiki) {
		@apply overflow-x-auto rounded-lg bg-inherit py-4 text-sm;
	}

	.ai-code-wrapper :global(pre.shiki:not([data-code-overflow] *):not([data-code-overflow])) {
		@apply overflow-y-auto;
		max-height: min(100%, 650px);
	}

	.ai-code-wrapper :global(pre.shiki code) {
		@apply grid min-w-full rounded-none border-0 bg-transparent p-0 break-words;
		counter-reset: line;
		box-decoration-break: clone;
	}

	.ai-code-wrapper :global(pre.line-numbers) {
		counter-reset: step;
		counter-increment: step 0;
	}

	.ai-code-wrapper :global(pre.line-numbers .line::before) {
		content: counter(step);
		counter-increment: step;
		display: inline-block;
		width: 1.8rem;
		margin-right: 1.4rem;
		text-align: right;
	}

	.ai-code-wrapper :global(pre.line-numbers .line::before) {
		@apply text-muted-foreground;
	}

	.ai-code-wrapper :global(pre .line.line--highlighted) {
		@apply bg-secondary;
		/* border-l-2 border-primary/40 if needed */
	}

	.ai-code-wrapper :global(pre .line.line--highlighted span) {
		@apply relative;
	}

	.ai-code-wrapper :global(pre .line) {
		@apply inline-block min-h-4 w-full px-4 py-0.5;
	}

	.ai-code-wrapper :global(pre.line-numbers .line) {
		@apply px-2;
	}
</style>
