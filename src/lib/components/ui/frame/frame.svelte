<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils';

	let {
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	data-slot="frame"
	class={cn(
		'relative flex flex-col rounded-2xl bg-muted/72 p-1',
		'*:[[data-slot=frame-panel]+[data-slot=frame-panel]]:mt-1',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
