<script lang="ts">
	import { cn } from '$lib/utils/utils.js';
	import { ToolClass, setToolContext, type ToolSchema } from './tool-context.svelte.js';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		class: className,
		children,
		...restProps
	}: ToolSchema & {
		class?: string;
		children: Snippet;
	} & HTMLAttributes<HTMLDivElement> = $props();

	const contextInstance = new ToolClass(restProps as ToolSchema);
	setToolContext(contextInstance);
</script>

<div class={cn('border-border mt-3 overflow-hidden rounded-lg border', className)}>
	{@render children()}
</div>
