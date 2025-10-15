<script lang="ts">
	import { cn } from '$lib/utils/utils.js';
	import { getBranchContext } from './branch-context.js';
	import type { Snippet } from 'svelte';

	interface Props {
		from: 'user' | 'assistant' | 'system' | 'function' | 'data' | 'tool';
		class?: string;
		children: Snippet;
		[key: string]: any;
	}

	let { from, class: className, children, ...restProps }: Props = $props();

	const { totalBranches } = getBranchContext();

	// Don't render if there's only one branch
	let shouldRender = $derived(totalBranches > 1);
</script>

{#if shouldRender}
	<div
		class={cn(
			'flex items-center gap-2 self-end px-10',
			from === 'assistant' ? 'justify-start' : 'justify-end',
			className
		)}
		{...restProps}
	>
		{@render children()}
	</div>
{/if}