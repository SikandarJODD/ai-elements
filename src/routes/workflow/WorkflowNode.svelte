<script lang="ts">
	import {
		Node,
		NodeContent,
		NodeDescription,
		NodeFooter,
		NodeHeader,
		NodeTitle,
	} from "$lib/components/ai-elements/workflow/node/index.js";
	import Toolbar from "$lib/components/ai-elements/workflow/toolbar/toolbar.svelte";
	import { Button } from "$lib/components/ui/button";
	import type { NodeProps } from "@xyflow/svelte";

	type WorkflowNodeData = {
		label: string;
		description: string;
		handles: { target: boolean; source: boolean };
	};

	type Props = NodeProps;

	let { data, ...restProps }: Props = $props();

	// Type assertion for data since NodeProps data is unknown by default
	let workflowData = data as WorkflowNodeData;
</script>

<Node handles={workflowData.handles}>
	<NodeHeader>
		<NodeTitle>{data.label}</NodeTitle>
		<NodeDescription>{data.description}</NodeDescription>
	</NodeHeader>
	<NodeContent>
		<p class="text-sm">{data.content}</p>
	</NodeContent>
	<NodeFooter>
		<p class="text-muted-foreground text-xs">{data.footer}</p>
	</NodeFooter>
	<Toolbar>
		<Button size="sm" variant="ghost">Edit</Button>
		<Button size="sm" variant="ghost">Delete</Button>
	</Toolbar>
</Node>
