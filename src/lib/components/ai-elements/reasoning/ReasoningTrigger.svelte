<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { CollapsibleTrigger } from '$lib/components/ui/collapsible/index.js';
	import { getReasoningContext } from './reasoning-context.svelte.js';
	import BrainIcon from './BrainIcon.svelte';
	import ChevronDownIcon from './ChevronDownIcon.svelte';

	interface Props {
		class?: string;
		children?: import('svelte').Snippet;
	}

	let { class: className = '', children, ...props }: Props = $props();

	let reasoningContext = getReasoningContext();

	let getThinkingMessage = $derived.by(() => {
		let { isStreaming, duration } = reasoningContext;

		if (isStreaming || duration === 0) {
			return 'Thinking...';
		}
		if (duration === undefined) {
			return 'Thought for a few seconds';
		}
		return `Thought for ${duration} seconds`;
	});
</script>

<CollapsibleTrigger
	class={cn(
		'flex w-full items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground',
		className
	)}
	{...props}
>
	{#if children}
		{@render children()}
	{:else}
		<BrainIcon class="size-4" />
		<p>{getThinkingMessage}</p>
		<ChevronDownIcon
			class={cn(
				'size-4 transition-transform',
				reasoningContext.isOpen ? 'rotate-180' : 'rotate-0'
			)}
		/>
	{/if}
</CollapsibleTrigger>