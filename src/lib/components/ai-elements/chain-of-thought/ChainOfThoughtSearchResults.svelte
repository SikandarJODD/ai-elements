<script lang="ts">
	import { cn } from '$lib/utils/utils.js';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface ChainOfThoughtSearchResultsProps extends HTMLAttributes<HTMLDivElement> {
		/**
		 * Children content
		 */
		children: Snippet;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	let {
		children,
		class: className,
		...restProps
	}: ChainOfThoughtSearchResultsProps = $props();
</script>

<div
	class={cn('flex items-center gap-2', className)}
	{...restProps}
>
	{@render children()}
</div>