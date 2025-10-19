<script lang="ts">
	import { ChevronDown } from '@lucide/svelte';
	import { getReasoningContext } from './reasoning-context.svelte.js';
	import { cn } from '$lib/utils/utils';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		children: Snippet;
	}

	let { children, class: className, onclick, ...rest }: Props = $props();

	const context = getReasoningContext();

	function handleClick(e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		context.toggle();
		onclick?.(e);
	}
</script>

<button
	class={cn('flex cursor-pointer items-center gap-2', className)}
	onclick={handleClick}
	{...rest}
>
	<span class="text-primary">
		{@render children()}
	</span>
	<div
		class={cn('transform transition-transform', context.isOpen ? 'rotate-180' : '')}
	>
		<ChevronDown class="size-4" />
	</div>
</button>
