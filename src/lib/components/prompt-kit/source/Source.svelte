<script lang="ts">
	import { HoverCard } from '$lib/components/ui/hover-card/index.js';
	import { SourceClass, setSourceContext } from './source-context.svelte.js';
	import type { Snippet } from 'svelte';

	let {
		href,
		children
	}: {
		href: string;
		children: Snippet;
	} = $props();

	const contextInstance = new SourceClass({ href });
	setSourceContext(contextInstance);
</script>

<HoverCard openDelay={150} closeDelay={0}>
	{@render children()}
</HoverCard>
