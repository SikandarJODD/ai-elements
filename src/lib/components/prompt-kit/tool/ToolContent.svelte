<script lang="ts">
	import { getToolContext } from './tool-context.svelte.js';
	import { cn } from '$lib/utils/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	let {
		class: className,
		children,
		...restProps
	}: {
		class?: string;
		children: Snippet;
	} & HTMLAttributes<HTMLDivElement> = $props();

	const context = getToolContext();
</script>

{#if context.isOpen}
	<div
		class={cn(
			'border-border border-t',
			'data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden',
			className
		)}
		{...restProps}
	>
		{@render children()}
	</div>
{/if}
