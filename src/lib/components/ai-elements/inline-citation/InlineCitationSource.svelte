<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLDivElement> & {
		title?: string;
		url?: string;
		description?: string;
		children?: Snippet;
		class?: string;
	};

	let {
		title,
		url,
		description,
		children,
		class: className,
		...restProps
	}: Props = $props();
</script>

<div class={cn("space-y-1", className)} {...restProps}>
	{#if title}
		<h4 class="truncate font-medium text-sm leading-tight">{title}</h4>
	{/if}
	{#if url}
		<p class="truncate break-all text-muted-foreground text-xs">{url}</p>
	{/if}
	{#if description}
		<p class="line-clamp-3 text-muted-foreground text-sm leading-relaxed">
			{description}
		</p>
	{/if}
	{#if children}
		{@render children()}
	{/if}
</div>