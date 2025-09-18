<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLDivElement> & {
		children: Snippet;
		class?: string;
	};

	let {
		children,
		class: className,
		...restProps
	}: Props = $props();
</script>

<div
	class={cn(
		"flex items-center justify-between gap-2 rounded-t-md bg-secondary p-2",
		className
	)}
	{...restProps}
>
	{@render children()}
</div>