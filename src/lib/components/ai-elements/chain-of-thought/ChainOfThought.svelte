<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { setChainOfThoughtContext } from './chain-of-thought-context.js';
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
		open = $bindable(false),
		defaultOpen = false,
		onOpenChange,
		children,
		class: className,
		...restProps
	}: ChainOfThoughtProps = $props();

	// Controllable state using Svelte 5 runes
	let internalOpen = $state(defaultOpen);

	// Derived state that handles both controlled and uncontrolled modes
	let isOpen = $state(open !== undefined ? open : defaultOpen);

	function setIsOpen(newOpen: boolean) {
		if (open !== undefined) {
			// Controlled mode
			onOpenChange?.(newOpen);
		} else {
			// Uncontrolled mode
			internalOpen = newOpen;

			onOpenChange?.(newOpen);
		}
	}

	// Set the context for child components
	setChainOfThoughtContext({
		isOpen,
		setIsOpen
	});
</script>

<div
	class={cn('not-prose max-w-prose space-y-4', className)}
	{...restProps}
>
	{@render children()}
</div>