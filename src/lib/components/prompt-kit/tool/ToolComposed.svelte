<script lang="ts">
	import type { ToolPart } from "./types.js";
	import { Tool, ToolHeader, ToolContent, ToolDetails } from "./index.js";

	let {
		toolPart,
		defaultOpen = false,
		class: className,
	}: {
		toolPart: ToolPart;
		defaultOpen?: boolean;
		class?: string;
	} = $props();
</script>

<Tool {toolPart} {defaultOpen} class={className}>
	<ToolHeader />
	<ToolContent>
		<ToolDetails />
	</ToolContent>
</Tool>
