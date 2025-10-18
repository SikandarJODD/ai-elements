<script lang="ts">
	import { cn } from '$lib/utils/utils.js';

	interface Props {
		text?: string;
		class?: string;
		size?: 'sm' | 'md' | 'lg';
	}

	let { text = 'Thinking', class: className, size = 'md' }: Props = $props();

	const textSizes = {
		sm: 'text-xs',
		md: 'text-sm',
		lg: 'text-base'
	};
</script>

<div
	class={cn(
		'bg-[linear-gradient(to_right,var(--muted-foreground)_40%,var(--foreground)_60%,var(--muted-foreground)_80%)]',
		'bg-size-[200%_auto] bg-clip-text font-medium text-transparent',
		'animate-[shimmer_4s_infinite_linear]',
		textSizes[size],
		className
	)}
>
	{text}
</div>
