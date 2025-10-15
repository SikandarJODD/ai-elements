<script lang="ts">
	import { cn } from '$lib/utils/utils.js';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLQuoteElement> & {
		children: Snippet;
		class?: string;
	};

	let {
		children,
		class: className,
		...restProps
	}: Props = $props();
</script>

<blockquote
	class={cn(
		"border-muted border-l-2 pl-3 text-muted-foreground text-sm italic",
		className
	)}
	{...restProps}
>
	{@render children()}
</blockquote>