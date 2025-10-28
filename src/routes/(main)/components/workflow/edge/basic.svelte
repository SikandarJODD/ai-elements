<script lang="ts">
	import Canvas from "$lib/components/ai-elements/workflow/canvas/Canvas.svelte";
	import Controls from "$lib/components/ai-elements/workflow/controls/Controls.svelte";
	import { Edge } from "$lib/components/ai-elements/workflow/edge/index.js";
	import type { Node, Edge as EdgeType } from "@xyflow/svelte";

	const edgeTypes = {
		temporary: Edge.Temporary,
		animated: Edge.Animated,
	};

	let nodes: Node[] = $state([
		{
			id: "1",
			position: { x: 0, y: 100 },
			data: { label: "Start" },
			style: "padding: 10px; border: 2px solid hsl(var(--primary)); border-radius: 8px; background: hsl(var(--card));",
		},
		{
			id: "2",
			position: { x: 200, y: 50 },
			data: { label: "Animated" },
			style: "padding: 10px; border: 2px solid hsl(var(--primary)); border-radius: 8px; background: hsl(var(--card));",
		},
		{
			id: "3",
			position: { x: 200, y: 150 },
			data: { label: "Temporary" },
			style: "padding: 10px; border: 2px dashed hsl(var(--ring)); border-radius: 8px; background: hsl(var(--card));",
		},
		{
			id: "4",
			position: { x: 400, y: 100 },
			data: { label: "End" },
			style: "padding: 10px; border: 2px solid hsl(var(--primary)); border-radius: 8px; background: hsl(var(--card));",
		},
	]);

	let edges: EdgeType[] = $state([
		{
			id: "e1-2",
			source: "1",
			target: "2",
			type: "animated",
			label: "Animated",
		},
		{
			id: "e1-3",
			source: "1",
			target: "3",
			type: "temporary",
			label: "Temporary",
		},
		{ id: "e2-4", source: "2", target: "4", type: "animated" },
		{ id: "e3-4", source: "3", target: "4", type: "temporary" },
	]);
</script>

<div class="h-[350px] w-full overflow-hidden rounded-lg border">
	<Canvas bind:nodes bind:edges {edgeTypes}>
		<Controls />
	</Canvas>
</div>
<p class="text-muted-foreground mt-2 text-xs">
	🔵 Animated edges show moving indicators | ⚪ Temporary edges use dashed lines
</p>
