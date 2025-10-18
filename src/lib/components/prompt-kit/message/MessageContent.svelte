<script lang="ts">
	import { cn } from '$lib/utils/utils.js';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		markdown = false,
		class: className,
		children,
		...restProps
	}: {
		markdown?: boolean;
		class?: string;
		children: Snippet;
	} & HTMLAttributes<HTMLDivElement> = $props();

	const classNames = cn(
		'rounded-lg p-2 text-foreground bg-secondary prose break-words whitespace-normal',
		className
	);
</script>

{#if markdown}
	<!-- Markdown rendering can be added here when needed -->
	<!-- For now, we'll render as plain div -->
	<div class={classNames} {...restProps}>
		{@render children()}
	</div>
{:else}
	<div class={classNames} {...restProps}>
		{@render children()}
	</div>
{/if}
