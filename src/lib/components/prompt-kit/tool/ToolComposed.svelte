<script lang="ts">
	import { cn } from '$lib/utils/utils.js';
	import type { ToolPart } from './tool-context.svelte.js';
	import { Tool, ToolHeader, ToolContent, ToolDetails } from './index.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		toolPart,
		defaultOpen = false,
		class: className,
		...restProps
	}: {
		toolPart: ToolPart;
		defaultOpen?: boolean;
		class?: string;
	} & HTMLAttributes<HTMLDivElement> = $props();
</script>

<Tool {toolPart} {defaultOpen} class={className} {...restProps}>
	<ToolHeader />
	<ToolContent>
		<ToolDetails />
	</ToolContent>
</Tool>
