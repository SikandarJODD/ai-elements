<script lang="ts">
	import { cn } from '$lib/utils/utils';

	interface Props {
		class?: string;
		size?: 'sm' | 'md' | 'lg';
	}

	let { class: className, size = 'md' }: Props = $props();

	const barWidths = {
		sm: 'w-0.5',
		md: 'w-0.5',
		lg: 'w-1'
	};

	const containerSizes = {
		sm: 'h-4',
		md: 'h-5',
		lg: 'h-6'
	};

	const heights = {
		sm: ['6px', '9px', '12px', '9px', '6px'],
		md: ['8px', '12px', '16px', '12px', '8px'],
		lg: ['10px', '15px', '20px', '15px', '10px']
	};
</script>

<div class={cn('flex items-center gap-0.5', containerSizes[size], className)}>
	{#each Array(5) as _, i}
		<div
			class={cn(
				'bg-primary animate-[wave_1s_ease-in-out_infinite] rounded-full',
				barWidths[size]
			)}
			style:animation-delay="{i * 100}ms"
			style:height={heights[size][i]}
		></div>
	{/each}
	<span class="sr-only">Loading</span>
</div>
