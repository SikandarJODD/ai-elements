<script lang="ts">
	import { cn } from '$lib/utils/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	interface StepsBarProps extends HTMLAttributes<HTMLDivElement> {}

	let { class: className, ...restProps }: StepsBarProps = $props();
</script>

<div class={cn('bg-muted h-full w-[2px]', className)} aria-hidden="true" {...restProps}></div>
