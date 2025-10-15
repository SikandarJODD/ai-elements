<script lang="ts">
	import { cn } from '$lib/utils/utils.js';
	import { Collapsible } from '$lib/components/ui/collapsible/index.js';
	import {
		ChainOfThoughtContext,
		setChainOfThoughtContext
	} from './chain-of-thought-context.svelte.js';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface ChainOfThoughtProps extends HTMLAttributes<HTMLDivElement> {
		/**
		 * Whether the chain of thought is open (controlled)
		 */
		open?: boolean;
		/**
		 * Default open state (uncontrolled)
		 */
		defaultOpen?: boolean;
		/**
		 * Callback when open state changes
		 */
		onOpenChange?: (open: boolean) => void;
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
		open = $bindable(undefined),
		defaultOpen = false,
		onOpenChange,
		children,
		class: className,
		...restProps
	}: ChainOfThoughtProps = $props();

	// Create context instance with proper controllable state
	const context = new ChainOfThoughtContext({
		isOpen: open !== undefined ? open : defaultOpen,
		onOpenChange
	});

	// Handle controlled mode synchronization
	$effect(() => {
		if (open !== undefined) {
			context.isOpen = open;
		}
	});

	// Set the context for child components
	setChainOfThoughtContext(context);
</script>

<Collapsible open={context.isOpen} onOpenChange={context.setIsOpen}>
	<div class={cn('not-prose max-w-prose space-y-4', className)} {...restProps}>
		{@render children()}
	</div>
</Collapsible>
