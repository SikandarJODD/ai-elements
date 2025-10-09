<script>
  import {
    Background,
    BackgroundVariant,
    Controls,
    SvelteFlow,
  } from "@xyflow/svelte";

  import "@xyflow/svelte/dist/style.css";

  let nodes = $state.raw([
    { id: "1", position: { x: 300, y: 200 }, data: { label: "Svelte" } },
    { id: "2", position: { x: 300, y: 300 }, data: { label: "Flow" } },
  ]);

  let edges = $state.raw([{ id: "e1-2", source: "1", target: "2" }]);
  import { mode } from "mode-watcher";
</script>

<div class="h-[calc(100vh-65px)] w-full">
  <SvelteFlow
    bind:nodes
    bind:edges
    colorMode={mode.current}
    fitView
    zoomOnDoubleClick
  >
    <!-- panOnDrag={false} panOnScroll -->
    <Controls />
    <Background variant={BackgroundVariant.Dots} />
  </SvelteFlow>
</div>
