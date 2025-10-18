<script lang="ts">
	import { cn } from '$lib/utils/utils.js';

	interface Props {
		class?: string;
		size?: 'sm' | 'md' | 'lg';
	}

	let { class: className, size = 'md' }: Props = $props();

	const cursorSizes = {
		sm: 'h-3 w-1.5',
		md: 'h-4 w-2',
		lg: 'h-5 w-2.5'
	};

	const textSizes = {
		sm: 'text-xs',
		md: 'text-sm',
		lg: 'text-base'
	};

	const containerSizes = {
		sm: 'h-4',
		md: 'h-5',
		lg: 'h-6'
	};
</script>

<div class={cn('flex items-center space-x-1', containerSizes[size], className)}>
	<span class={cn('text-primary font-mono', textSizes[size])}>&gt;</span>
	<div class={cn('bg-primary animate-[blink_1s_step-end_infinite]', cursorSizes[size])} />
	<span class="sr-only">Loading</span>
</div>
