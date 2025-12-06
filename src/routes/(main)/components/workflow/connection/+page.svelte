<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";
	import { Subheading, CodeNameBlock } from "$lib/components/docs";
	import Installation from "$lib/components/docs/installation.svelte";
	import Playground from "$lib/components/docs/playground.svelte";
	import { examples } from "./examples";
	import { seo } from "./seo";
	import CodeSpan from "$lib/components/docs/code-span.svelte";
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";

	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import * as Toc from "$lib/components/docs/toc";
	import { UseToc } from "$lib/hooks/use-toc.svelte";
	import AiElementsPrevNext from "$lib/components/ai-elements/ai-elements-prev-next.svelte";
	let toc = new UseToc();
</script>

<MetaTags {...seo} />

<Sidebar.Inset class="min-h-svh">
	<div
		class="grid min-h-svh grid-cols-1 gap-8 md:grid-cols-[1fr_280px] md:px-6 md:pb-6 lg:grid-cols-[1fr_240px]"
	>
		<main class="min-w-0" bind:this={toc.ref}>
			<Subheading class="md:text-3xl">Connection</Subheading>

			<p class="!text-muted-foreground my-2 text-lg">
				The <CodeSpan>Connection</CodeSpan> component provides a styled connection line for Svelte
				Flow canvases. It renders an animated bezier curve with a circle indicator at the target
				end, using consistent theming through CSS variables.
			</p>

			<Playground code={examples.basic.code}>
				<examples.basic.Component />
			</Playground>

			<Installation
				specifier={`${PUBLIC_WEBSITE_URL}/r/connection.json`}
				is_jsrepo={true}
				blockname="workflow"
			/>

			<Subheading>Usage</Subheading>

			<CodeNameBlock
				filename="connection-example.svelte"
				lang="svelte"
				code={`\<script lang="ts"\>
  import Canvas from "$lib/components/ai-elements/workflow/canvas/Canvas.svelte";
  import Connection from "$lib/components/ai-elements/workflow/connection/Connection.svelte";
  import Controls from "$lib/components/ai-elements/workflow/controls/Controls.svelte";
  import type { Node, Edge } from "@xyflow/svelte";

  let nodes: Node[] = $state([
    {
      id: 'source',
      position: { x: 50, y: 150 },
      data: { label: '📤 Drag from edge' },
      style: 'padding: 14px 18px; border: 2px solid hsl(var(--primary)); border-radius: 10px;'
    },
    {
      id: 'target-1',
      position: { x: 380, y: 80 },
      data: { label: '🎯 Target A' }
    },
    {
      id: 'target-2',
      position: { x: 380, y: 220 },
      data: { label: '🎯 Target B' }
    }
  ]);

  let edges: Edge[] = $state([]);

  // Track connection changes in real-time
  $effect(() => {
    if (edges.length > 0) {
      console.log("Connections:", edges.map(e => \`\${e.source} → \${e.target}\`).join(", "));
    }
  });
\</script\>

<div class="space-y-3">
  <div class="h-[420px] border rounded-lg overflow-hidden">
    <Canvas bind:nodes bind:edges connectionLineComponent={Connection}>
      <Controls />
    </Canvas>
  </div>

  {#if edges.length > 0}
    <div class="px-2 py-2 rounded-lg bg-muted/50">
      <p class="text-xs font-medium">✅ Active Connections: {edges.length}</p>
      <ul class="mt-1.5 space-y-0.5">
        {#each edges as edge}
          <li class="text-xs text-muted-foreground">
            {edge.source} → {edge.target}
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>`}
			/>

			<Subheading>Features</Subheading>

			<ul class="my-4 space-y-2 text-sm sm:text-base">
				<li>• Smooth bezier curve animation for connection lines</li>
				<li>• Visual indicator circle at the target position</li>
				<li>• Theme-aware styling using CSS variables</li>
				<li>• Cubic bezier curve calculation for natural flow</li>
				<li>• Lightweight implementation with minimal props</li>
				<li>• Full TypeScript support with Svelte Flow types</li>
				<li>• Compatible with Svelte Flow's connection system</li>
			</ul>

			<Subheading>Props</Subheading>

			<div class="my-4 space-y-4">
				<div class="border-primary border-l-2 pl-4">
					<p class="mb-1 font-mono text-sm font-semibold">fromX</p>
					<p class="text-muted-foreground text-sm">
						<span class="font-mono text-xs">number</span> - The x-coordinate of the connection
						start point (automatically provided by Svelte Flow).
					</p>
				</div>

				<div class="border-primary border-l-2 pl-4">
					<p class="mb-1 font-mono text-sm font-semibold">fromY</p>
					<p class="text-muted-foreground text-sm">
						<span class="font-mono text-xs">number</span> - The y-coordinate of the connection
						start point (automatically provided by Svelte Flow).
					</p>
				</div>

				<div class="border-primary border-l-2 pl-4">
					<p class="mb-1 font-mono text-sm font-semibold">toX</p>
					<p class="text-muted-foreground text-sm">
						<span class="font-mono text-xs">number</span> - The x-coordinate of the connection
						end point (follows cursor during drag).
					</p>
				</div>

				<div class="border-primary border-l-2 pl-4">
					<p class="mb-1 font-mono text-sm font-semibold">toY</p>
					<p class="text-muted-foreground text-sm">
						<span class="font-mono text-xs">number</span> - The y-coordinate of the connection
						end point (follows cursor during drag).
					</p>
				</div>
			</div>

			<Subheading>How It Works</Subheading>

			<p class="text-muted-foreground my-4 text-sm sm:text-base">
				The Connection component creates an interactive preview while dragging from one node
				to another:
			</p>

			<ul class="my-4 space-y-3 text-sm sm:text-base">
				<li>
					<strong>Real-time Preview:</strong> Shows animated bezier curve following your cursor
					while dragging from a source node
				</li>
				<li>
					<strong>Visual Feedback:</strong> Displays an indicator circle at the cursor position
					showing where the connection will end
				</li>
				<li>
					<strong>Smooth Animation:</strong> Uses cubic bezier curves for natural, flowing
					connection paths that feel organic
				</li>
				<li>
					<strong>Theme Integration:</strong> Automatically adapts colors to your theme
					using CSS variables like <CodeSpan>--primary</CodeSpan> and <CodeSpan
						>--card</CodeSpan
					>
				</li>
				<li>
					<strong>Drop Zones:</strong> Integrates with Svelte Flow to highlight valid target
					nodes when hovering during connection creation
				</li>
			</ul>

			<Subheading>Interactive Example</Subheading>

			<p class="text-muted-foreground my-4 text-sm sm:text-base">
				Here's an advanced example showing connection tracking with real-time feedback:
			</p>

			<CodeNameBlock
				filename="advanced-connection.svelte"
				lang="svelte"
				code={`\<script lang="ts"\>
  import Canvas from "$lib/components/ai-elements/workflow/canvas/Canvas.svelte";
  import Connection from "$lib/components/ai-elements/workflow/connection/Connection.svelte";
  import Controls from "$lib/components/ai-elements/workflow/controls/Controls.svelte";
  import type { Node, Edge } from "@xyflow/svelte";

  let nodes: Node[] = $state([
    {
      id: 'source',
      position: { x: 50, y: 100 },
      data: { label: '📤 Source Node' },
      style: 'padding: 12px 16px; border: 2px solid hsl(var(--primary)); border-radius: 8px; background: hsl(var(--card));'
    },
    {
      id: 'target-1',
      position: { x: 350, y: 50 },
      data: { label: '🎯 Target 1' },
      style: 'padding: 12px 16px; border: 2px solid hsl(var(--muted-foreground) / 0.3); border-radius: 8px;'
    },
    {
      id: 'target-2',
      position: { x: 350, y: 150 },
      data: { label: '🎯 Target 2' },
      style: 'padding: 12px 16px; border: 2px solid hsl(var(--muted-foreground) / 0.3); border-radius: 8px;'
    }
  ]);

  let edges: Edge[] = $state([]);

  // Track connection changes
  $effect(() => {
    console.log(\`Total connections: \${edges.length}\`);
  });
\</script\>

<div class="space-y-4">
  <div class="h-[450px] border rounded-lg overflow-hidden">
    <Canvas bind:nodes bind:edges connectionLineComponent={Connection}>
      <Controls />
    </Canvas>
  </div>

  {#if edges.length > 0}
    <div class="p-3 rounded-lg bg-muted">
      <p class="text-sm font-medium">
        ✅ Created {edges.length} connection{edges.length > 1 ? 's' : ''}
      </p>
      <ul class="mt-2 space-y-1">
        {#each edges as edge}
          <li class="text-xs text-muted-foreground">
            {edge.source} → {edge.target}
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>`}
			/>

			<Subheading>Styling</Subheading>

			<p class="text-muted-foreground my-4 text-sm sm:text-base">
				Customize the connection line appearance using CSS variables and global styles:
			</p>

			<CodeNameBlock
				filename="custom-connection-styles.css"
				lang="css"
				code={`:global(.svelte-flow__connection-path) {
  stroke: hsl(var(--primary));
  stroke-width: 2.5;
  stroke-dasharray: 5, 5;
  animation: dash 0.5s linear infinite;
}

:global(.svelte-flow__connection-circle) {
  fill: hsl(var(--primary));
  r: 6;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

@keyframes dash {
  to {
    stroke-dashoffset: -10;
  }
}`}
			/>

			<Subheading>Best Practices</Subheading>

			<ul class="my-4 space-y-3 text-sm sm:text-base">
				<li>
					<strong>Always use with Canvas:</strong> The Connection component requires Canvas
					context to function properly and access node positions
				</li>
				<li>
					<strong>Enable connection handles:</strong> Ensure your nodes have properly configured
					connection handles for drag interactions
				</li>
				<li>
					<strong>Track edge changes:</strong> Use <CodeSpan>$effect</CodeSpan> to monitor
					<CodeSpan>edges</CodeSpan>
					array and update your UI with connection status
				</li>
				<li>
					<strong>Validate connections:</strong> Implement <CodeSpan
						>isValidConnection</CodeSpan
					> callback to prevent invalid node connections
				</li>
				<li>
					<strong>Provide user feedback:</strong> Show connection count, source/target labels,
					or status indicators after creating edges
				</li>
				<li>
					<strong>Consider accessibility:</strong> Ensure sufficient color contrast and provide
					keyboard alternatives for connection creation
				</li>
			</ul>

			<Subheading>Accessibility</Subheading>

			<p class="text-muted-foreground my-4 text-sm sm:text-base">
				The Connection component is designed with accessibility in mind:
			</p>

			<ul class="my-4 space-y-2 text-sm sm:text-base">
				<li>
					• Visual indicator circle helps users with motor impairments track cursor
					position during dragging
				</li>
				<li>
					• High contrast mode support through theme-aware CSS variables (<CodeSpan
						>--primary</CodeSpan
					>, <CodeSpan>--card</CodeSpan>)
				</li>
				<li>
					• Smooth animations respect user's <CodeSpan>prefers-reduced-motion</CodeSpan> system
					settings
				</li>
				<li>
					• Clear visual feedback with 2px stroke width ensures visibility on various
					displays
				</li>
				<li>
					• Works with keyboard navigation when used alongside Svelte Flow's built-in
					accessibility features
				</li>
			</ul>

			<AiElementsPrevNext currentSlug="connection" />
		</main>

		<Toc.Root toc={toc.current} />
	</div>
</Sidebar.Inset>
