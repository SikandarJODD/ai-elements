<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { getChainOfThoughtContext } from './chain-of-thought-context.js';
	import { Collapsible, CollapsibleContent } from '$lib/components/ui/collapsible/index.js';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface ChainOfThoughtContentProps extends HTMLAttributes<HTMLDivElement> {
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
	}: ChainOfThoughtContentProps = $props();

	const { isOpen } = getChainOfThoughtContext();
</script>

<Collapsible open={isOpen}>
	<CollapsibleContent
		class={cn(
			'mt-2 space-y-3',
			'data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2 text-popover-foreground outline-none data-[state=closed]:animate-out data-[state=open]:animate-in',
			className
		)}
	>
		{@render children()}
	</CollapsibleContent>
</Collapsible>