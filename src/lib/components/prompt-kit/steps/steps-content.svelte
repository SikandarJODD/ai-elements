<script lang="ts">
	import { CollapsibleContent } from '$lib/components/ui/collapsible';
	import { cn } from '$lib/utils/utils.js';
	import type { Snippet } from 'svelte';
	import StepsBar from './steps-bar.svelte';

	let {
		class: className,
		bar,
		children
	}: {
		class?: string;
		bar?: Snippet;
		children?: Snippet;
	} = $props();
</script>

<CollapsibleContent
	class={cn(
		'text-popover-foreground data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden',
		className
	)}
>
	<div
		class="mt-3 grid max-w-full min-w-0 grid-cols-[min-content_minmax(0,1fr)] items-start gap-x-3"
	>
		<div class="min-w-0 self-stretch">
			{#if bar}
				{@render bar()}
			{:else}
				<StepsBar />
			{/if}
		</div>
		<div class="min-w-0 space-y-2">
			{#if children}
				{@render children()}
			{/if}
		</div>
	</div>
</CollapsibleContent>
