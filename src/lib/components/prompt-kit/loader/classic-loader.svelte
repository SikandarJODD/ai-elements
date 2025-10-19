<script lang="ts">
	import { cn } from '$lib/utils/utils.js';

	interface Props {
		class?: string;
		size?: 'sm' | 'md' | 'lg';
	}

	let { class: className, size = 'md' }: Props = $props();

	const sizeClasses = {
		sm: 'size-4',
		md: 'size-5',
		lg: 'size-6'
	};

	const barSizes = {
		sm: { height: '6px', width: '1.5px' },
		md: { height: '8px', width: '2px' },
		lg: { height: '10px', width: '2.5px' }
	};

	const marginLeft = {
		sm: '-0.75px',
		md: '-1px',
		lg: '-1.25px'
	};

	const transformOrigin = {
		sm: '0.75px 10px',
		md: '1px 12px',
		lg: '1.25px 14px'
	};
</script>

<div class={cn('relative', sizeClasses[size], className)}>
	<div class="absolute h-full w-full">
		{#each Array(12) as _, i}
			<div
				class="bg-primary absolute animate-[spinner-fade_1.2s_linear_infinite] rounded-full"
				style:top="0"
				style:left="50%"
				style:margin-left={marginLeft[size]}
				style:transform-origin={transformOrigin[size]}
				style:transform="rotate({i * 30}deg)"
				style:opacity="0"
				style:animation-delay="{i * 0.1}s"
				style:height={barSizes[size].height}
				style:width={barSizes[size].width}
			/>
		{/each}
	</div>
	<span class="sr-only">Loading</span>
</div>
