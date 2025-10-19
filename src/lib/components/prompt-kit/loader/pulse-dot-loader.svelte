<script lang="ts">
	import { cn } from '$lib/utils/utils.js';

	interface Props {
		class?: string;
		size?: 'sm' | 'md' | 'lg';
	}

	let { class: className, size = 'md' }: Props = $props();

	const sizeClasses = {
		sm: 'size-1',
		md: 'size-2',
		lg: 'size-3'
	};
</script>

<div
	class={cn(
		'bg-primary animate-[pulse-dot_1.2s_ease-in-out_infinite] rounded-full',
		sizeClasses[size],
		className
	)}
>
	<span class="sr-only">Loading</span>
</div>
