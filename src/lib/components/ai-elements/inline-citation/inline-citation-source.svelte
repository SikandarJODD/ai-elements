<script lang="ts">
	import { cn } from "$lib/utils";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	type Props = HTMLAttributes<HTMLDivElement> & {
		title?: string;
		url?: string;
		description?: string;
		children?: Snippet;
		class?: string;
	};

	let { title, url, description, children, class: className, ...restProps }: Props = $props();
</script>

<div class={cn("space-y-1", className)} {...restProps}>
	{#if title}
		<h4 class="truncate text-sm leading-tight font-medium">{title}</h4>
	{/if}
	{#if url}
		<p class="text-muted-foreground truncate text-xs break-all">{url}</p>
	{/if}
	{#if description}
		<p class="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
			{description}
		</p>
	{/if}
	{#if children}
		{@render children()}
	{/if}
</div>
