<script lang="ts">
	import Canvas from "$lib/components/ai-elements/workflow/canvas/Canvas.svelte";
	import Panel from "$lib/components/ai-elements/workflow/panel/panel.svelte";
	import { Button } from "$lib/components/ui/button/index.js";
	import type { Node, Edge } from "@xyflow/svelte";

	let nodes: Node[] = $state([]);
	let edges: Edge[] = $state([]);
</script>

<div class="h-[400px] w-full overflow-hidden rounded-lg border">
	<Canvas bind:nodes bind:edges>
		<Panel position="top-left">
			<Button size="sm">Custom Action</Button>
		</Panel>
		<Panel position="top-right">
			<Button size="sm" variant="outline">Settings</Button>
		</Panel>
	</Canvas>
</div>
