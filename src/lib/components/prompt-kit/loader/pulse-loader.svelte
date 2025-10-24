<script lang="ts">
	import { cn } from '$lib/utils/utils';

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
</script>

<div class={cn('relative', sizeClasses[size], className)}>
	<div
		class="border-primary absolute inset-0 animate-[thin-pulse_1.5s_ease-in-out_infinite] rounded-full border-2"
	></div>
	<span class="sr-only">Loading</span>
</div>
