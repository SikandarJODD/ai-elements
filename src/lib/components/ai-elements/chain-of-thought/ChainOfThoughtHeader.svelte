<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { getChainOfThoughtContext } from './chain-of-thought-context.js';
	import { Collapsible, CollapsibleTrigger } from '$lib/components/ui/collapsible/index.js';
	import { BrainIcon, ChevronDownIcon } from '@lucide/svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface ChainOfThoughtHeaderProps extends HTMLButtonAttributes {
		/**
		 * Children content (optional, defaults to "Chain of Thought")
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes
		 */
		class?: string;
	}

	let {
		children,
		class: className,
		...restProps
	}: ChainOfThoughtHeaderProps = $props();

	const { isOpen, setIsOpen } = getChainOfThoughtContext();
</script>

<Collapsible open={isOpen} onOpenChange={setIsOpen}>
	<CollapsibleTrigger
		class={cn(
			'flex w-full items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground',
			className
		)}
	>
		<BrainIcon class="size-4" />
		<span class="flex-1 text-left">
			{#if children}
				{@render children()}
			{:else}
				Chain of Thought
			{/if}
		</span>
		<ChevronDownIcon
			class={cn(
				'size-4 transition-transform',
				isOpen ? 'rotate-180' : 'rotate-0'
			)}
		/>
	</CollapsibleTrigger>
</Collapsible>