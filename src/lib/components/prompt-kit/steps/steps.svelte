<script lang="ts">
	import { Collapsible } from '$lib/components/ui/collapsible';
	import { cn } from '$lib/utils/utils';
	import type { Snippet } from 'svelte';

	let {
		defaultOpen = true,
		open = $bindable(defaultOpen),
		class: className,
		children
	}: {
		defaultOpen?: boolean;
		open?: boolean;
		class?: string;
		children?: Snippet;
	} = $props();
</script>

<Collapsible bind:open class={cn(className)}>
	{#if children}
		{@render children()}
	{/if}
</Collapsible>
