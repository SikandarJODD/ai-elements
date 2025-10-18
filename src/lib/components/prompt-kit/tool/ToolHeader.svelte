<script lang="ts">
	import { getToolContext } from './tool-context.svelte.js';
	import { cn } from '$lib/utils/utils.js';
	import {
		CheckCircle,
		Loader2,
		Settings,
		XCircle,
		ChevronDown
	} from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { Component } from 'svelte';

	let { class: className }: { class?: string } = $props();

	const context = getToolContext();

	function getStateIcon() {
		switch (context.toolPart.state) {
			case 'input-streaming':
				return Loader2;
			case 'input-available':
				return Settings;
			case 'output-available':
				return CheckCircle;
			case 'output-error':
				return XCircle;
			default:
				return Settings;
		}
	}

	function getStateIconClass() {
		switch (context.toolPart.state) {
			case 'input-streaming':
				return 'h-4 w-4 animate-spin text-blue-500';
			case 'input-available':
				return 'h-4 w-4 text-orange-500';
			case 'output-available':
				return 'h-4 w-4 text-green-500';
			case 'output-error':
				return 'h-4 w-4 text-red-500';
			default:
				return 'text-muted-foreground h-4 w-4';
		}
	}

	function getStateBadge(): { text: string; class: string } {
		const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';
		switch (context.toolPart.state) {
			case 'input-streaming':
				return {
					text: 'Processing',
					class: cn(
						baseClasses,
						'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
					)
				};
			case 'input-available':
				return {
					text: 'Ready',
					class: cn(
						baseClasses,
						'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
					)
				};
			case 'output-available':
				return {
					text: 'Completed',
					class: cn(
						baseClasses,
						'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
					)
				};
			case 'output-error':
				return {
					text: 'Error',
					class: cn(
						baseClasses,
						'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
					)
				};
			default:
				return {
					text: 'Pending',
					class: cn(
						baseClasses,
						'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
					)
				};
		}
	}

	const StateIcon = $derived(getStateIcon());
	const stateIconClass = $derived(getStateIconClass());
	const stateBadge = $derived(getStateBadge());
</script>

<Button
	variant="ghost"
	class={cn(
		'bg-background h-auto w-full justify-between rounded-b-none px-3 py-2 font-normal',
		className
	)}
	onclick={() => context.toggleOpen()}
>
	<div class="flex items-center gap-2">
		<StateIcon class={stateIconClass} />
		<span class="font-mono text-sm font-medium">
			{context.toolPart.type}
		</span>
		<span class={stateBadge.class}>
			{stateBadge.text}
		</span>
	</div>
	<ChevronDown class={cn('h-4 w-4 transition-transform', context.isOpen && 'rotate-180')} />
</Button>
