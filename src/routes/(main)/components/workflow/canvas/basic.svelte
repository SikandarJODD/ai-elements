<script lang="ts">
  import Canvas from "$lib/components/ai-elements/workflow/canvas/Canvas.svelte";
  import Controls from "$lib/components/ai-elements/workflow/controls/Controls.svelte";
  import type { Node, Edge } from "@xyflow/svelte";

  let nodes: Node[] = $state([
    {
      id: '1',
      type: 'default',
      position: { x: 50, y: 100 },
      data: { label: 'Start Node' }
    },
    {
      id: '2',
      type: 'default',
      position: { x: 250, y: 50 },
      data: { label: 'Process' }
    },
    {
      id: '3',
      type: 'default',
      position: { x: 250, y: 150 },
      data: { label: 'Analysis' }
    },
    {
      id: '4',
      type: 'default',
      position: { x: 450, y: 100 },
      data: { label: 'End Node' }
    }
  ]);

  let edges: Edge[] = $state([
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e1-3', source: '1', target: '3' },
    { id: 'e2-4', source: '2', target: '4' },
    { id: 'e3-4', source: '3', target: '4' }
  ]);
</script>

<div class="h-[400px] w-full border rounded-lg overflow-hidden">
  <Canvas bind:nodes bind:edges>
    <Controls />
  </Canvas>
</div>
<p class="text-xs text-muted-foreground mt-2">
  💡 Try: Pan (scroll), Zoom (scroll wheel), Drag nodes, Select multiple nodes
</p>
