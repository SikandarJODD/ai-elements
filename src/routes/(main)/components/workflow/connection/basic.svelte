<script lang="ts">
	import Canvas from "$lib/components/ai-elements/workflow/canvas/Canvas.svelte";
	import Connection from "$lib/components/ai-elements/workflow/connection/Connection.svelte";
	import Controls from "$lib/components/ai-elements/workflow/controls/Controls.svelte";
	import type { Node, Edge } from "@xyflow/svelte";

	let nodes: Node[] = $state([
		{
			id: "1",
			type: "input",
			position: { x: 50, y: 150 },
			data: { label: "Source" },
			style: "padding: 12px 20px; border: 2px solid hsl(var(--primary)); border-radius: 8px; background: hsl(var(--card));",
		},
		{
			id: "2",
			type: "output",
			position: { x: 300, y: 80 },
			data: { label: "Target A" },
			style: "padding: 12px 20px; border: 2px solid hsl(var(--muted-foreground) / 0.3); border-radius: 8px; background: hsl(var(--card));",
		},
		{
			id: "3",
			type: "output",
			position: { x: 300, y: 220 },
			data: { label: "Target B" },
			style: "padding: 12px 20px; border: 2px solid hsl(var(--muted-foreground) / 0.3); border-radius: 8px; background: hsl(var(--card));",
		},
	]);

	let edges: Edge[] = $state([]);
</script>

<div class="space-y-2">
	<div class="bg-background h-[400px] w-full overflow-hidden rounded-lg border">
		<Canvas bind:nodes bind:edges connectionLineComponent={Connection}>
			<Controls />
		</Canvas>
	</div>

	<p class="text-muted-foreground px-2 text-xs">
		💡 <strong>Try it:</strong> Drag from the Source node's right edge to connect to Target A or
		Target B
	</p>
</div>
