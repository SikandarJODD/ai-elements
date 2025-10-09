<script lang="ts">
  import { Background, SvelteFlow, type SvelteFlowProps } from "@xyflow/svelte";

  import "@xyflow/svelte/dist/style.css";

  import { mode } from "mode-watcher";
  import Controls from "../controls/Controls.svelte";
  import type { Snippet } from "svelte";

  type CanvasProps = SvelteFlowProps & {
    children?: Snippet;
  };
  let {
    children,
    nodes = $bindable([]),
    edges = $bindable([]),
    ...restProps
  }: CanvasProps = $props();

  $inspect(nodes, "Nodes");
  $inspect(edges, "Edges");
</script>

<SvelteFlow
  colorMode={mode.current}
  bind:nodes
  bind:edges
  fitView
  zoomOnDoubleClick
  {...restProps}
>
  <!-- panOnDrag={false} panOnScroll -->
  <Controls />
  <Background bgColor="var(--sidebar)" />
  {@render children?.()}
</SvelteFlow>
