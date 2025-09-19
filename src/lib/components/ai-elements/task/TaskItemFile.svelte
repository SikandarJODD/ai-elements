<script lang="ts">
	import { cn } from '$lib/utils.js';
  import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export interface TaskItemFileProps extends HTMLAttributes<HTMLDivElement> {
		children?: Snippet;
		class?: string;
	}

	let {
		children,
		class: className,
		...restProps
	}: TaskItemFileProps = $props();
</script>

<div
	class={cn(
		'inline-flex items-center gap-1 rounded-md border bg-secondary px-1.5 py-0.5 text-foreground text-xs',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>