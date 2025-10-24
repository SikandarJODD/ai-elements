<script lang="ts">
	import { cn } from '$lib/utils/utils';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface StepsItemProps extends HTMLAttributes<HTMLDivElement> {
		children?: Snippet;
	}

	let { class: className, children, ...restProps }: StepsItemProps = $props();
</script>

<div class={cn('text-muted-foreground text-sm', className)} {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</div>
