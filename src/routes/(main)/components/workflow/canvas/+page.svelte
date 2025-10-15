<script lang="ts">
  import { MetaTags } from "svelte-meta-tags";
  import { Subheading, CodeNameBlock } from "$lib/components/docs";
  import Installation from "$lib/components/docs/installation.svelte";
  import Playground from "$lib/components/docs/playground.svelte";
  import Code from "$lib/components/docs/code.svelte";
  import { examples } from "./examples";
  import { seo } from "./seo";
  import CodeSpan from "$lib/components/docs/code-span.svelte";
  import { PUBLIC_WEBSITE_URL } from "$env/static/public";

  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import * as Toc from "$lib/components/docs/toc";
  import { UseToc } from "$lib/hooks/use-toc.svelte";
  let toc = new UseToc();
</script>

<MetaTags {...seo} />

<Sidebar.Inset class="min-h-svh">
  <div
    class="grid grid-cols-1 md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_240px] gap-8 min-h-svh md:px-6 md:pb-6"
  >
    <main class="min-w-0" bind:this={toc.ref}>
      <Subheading class="md:text-3xl">Canvas</Subheading>

      <p class="my-2 !text-muted-foreground text-lg">
        The <CodeSpan>Canvas</CodeSpan> component provides a Svelte Flow-based canvas for building
        interactive node-based interfaces. It comes pre-configured with sensible defaults for AI
        applications, including panning, zooming, and selection behaviors.
      </p>

      <Playground code={examples.basic.code}>
        <examples.basic.Component />
      </Playground>

      <Installation specifier={`${PUBLIC_WEBSITE_URL}/r/canvas.json`} is_jsrepo={true} blockname="workflow" />

      <Subheading>Usage</Subheading>

      <CodeNameBlock
        filename="canvas-example.svelte"
        lang="svelte"
        code={`\<script lang="ts"\>
  import Canvas from "$lib/components/ai-elements/workflow/canvas/Canvas.svelte";
  import type { Node, Edge } from "@xyflow/svelte";

  let nodes: Node[] = $state([
    {
      id: '1',
      type: 'default',
      position: { x: 100, y: 100 },
      data: { label: 'Node 1' }
    }
  ]);

  let edges: Edge[] = $state([]);
\</script\>

<Canvas bind:nodes bind:edges />`}
      />

      <Subheading>Features</Subheading>

      <ul class="space-y-2 my-4 text-sm sm:text-base">
        <li>• Pre-configured Svelte Flow canvas with AI-optimized defaults</li>
        <li>• Pan on scroll enabled for intuitive navigation</li>
        <li>• Selection on drag for multi-node operations</li>
        <li>• Customizable background color using CSS variables</li>
        <li>• Zoom on double-click for quick navigation</li>
        <li>• Auto-fit view to show all nodes</li>
        <li>• Theme-aware with automatic dark/light mode support</li>
        <li>• Fully compatible with Svelte Flow props and API</li>
      </ul>

      <Subheading>Props</Subheading>

      <div class="space-y-4 my-4">
        <div class="border-l-2 border-primary pl-4">
          <p class="font-mono text-sm font-semibold mb-1">nodes</p>
          <p class="text-sm text-muted-foreground">
            <span class="font-mono text-xs">Node[]</span> - Array of nodes to display on the canvas. Use <CodeSpan>bind:nodes</CodeSpan> for two-way binding.
          </p>
        </div>

        <div class="border-l-2 border-primary pl-4">
          <p class="font-mono text-sm font-semibold mb-1">edges</p>
          <p class="text-sm text-muted-foreground">
            <span class="font-mono text-xs">Edge[]</span> - Array of edges connecting nodes. Use <CodeSpan>bind:edges</CodeSpan> for two-way binding.
          </p>
        </div>

        <div class="border-l-2 border-primary pl-4">
          <p class="font-mono text-sm font-semibold mb-1">children?</p>
          <p class="text-sm text-muted-foreground">
            <span class="font-mono text-xs">Snippet</span> - Child components like Controls, Panels, or custom overlays.
          </p>
        </div>

        <div class="border-l-2 border-primary pl-4">
          <p class="font-mono text-sm font-semibold mb-1">[...props]</p>
          <p class="text-sm text-muted-foreground">
            <span class="font-mono text-xs">SvelteFlowProps</span> - Any other Svelte Flow props like
            nodeTypes, edgeTypes, onNodesChange, etc.
          </p>
        </div>
      </div>

      <Subheading>Example with Custom Node Types</Subheading>

      <CodeNameBlock
        filename="workflow-canvas.svelte"
        lang="svelte"
        code={`\<script lang="ts"\>
  import Canvas from "$lib/components/ai-elements/workflow/canvas/Canvas.svelte";
  import { Edge } from "$lib/components/ai-elements/workflow/edge";
  import type { Node, Edge as EdgeType } from "@xyflow/svelte";
  import CustomNode from "./CustomNode.svelte";

  const nodeTypes = {
    custom: CustomNode,
  };

  const edgeTypes = {
    animated: Edge.Animated,
    temporary: Edge.Temporary,
  };

  let nodes: Node[] = $state([
    {
      id: '1',
      type: 'custom',
      position: { x: 0, y: 0 },
      data: { label: 'Start' }
    },
    {
      id: '2',
      type: 'custom',
      position: { x: 200, y: 100 },
      data: { label: 'Process' }
    }
  ]);

  let edges: EdgeType[] = $state([
    {
      id: 'e1-2',
      source: '1',
      target: '2',
      type: 'animated'
    }
  ]);
\</script\>

<div class="h-screen w-full">
  <Canvas
    bind:nodes
    bind:edges
    {nodeTypes}
    {edgeTypes}
  />
</div>`}
      />
    </main>

    <Toc.Root toc={toc.current} />
  </div>
</Sidebar.Inset>
