<script lang="ts">
	import Canvas from "$lib/components/ai-elements/workflow/canvas/Canvas.svelte";
	import Controls from "$lib/components/ai-elements/workflow/controls/Controls.svelte";
	import type { Node, Edge } from "@xyflow/svelte";

	let nodes: Node[] = $state([
		{ id: "1", position: { x: 50, y: 50 }, data: { label: "Node 1" } },
		{ id: "2", position: { x: 250, y: 50 }, data: { label: "Node 2" } },
		{ id: "3", position: { x: 150, y: 150 }, data: { label: "Node 3" } },
		{ id: "4", position: { x: 350, y: 150 }, data: { label: "Node 4" } },
	]);

	let edges: Edge[] = $state([
		{ id: "e1-2", source: "1", target: "2" },
		{ id: "e2-3", source: "2", target: "3" },
		{ id: "e3-4", source: "3", target: "4" },
	]);
</script>

<div class="h-[400px] w-full overflow-hidden rounded-lg border">
	<Canvas bind:nodes bind:edges>
		<Controls />
	</Canvas>
</div>
<p class="text-muted-foreground mt-2 text-xs">
	🎯 Use controls: Zoom In (+) | Zoom Out (-) | Fit View (⛶) | Lock (🔒)
</p>
