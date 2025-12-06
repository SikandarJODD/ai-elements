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
			<Subheading class="md:text-3xl">Controls</Subheading>

			<p class="!text-muted-foreground my-2 text-lg">
				The <CodeSpan>Controls</CodeSpan> component provides interactive zoom and fit view controls
				for Svelte Flow canvases. It includes a modern, themed design with backdrop blur and
				card styling.
			</p>

			<Playground code={examples.basic.code}>
				<examples.basic.Component />
			</Playground>

			<Installation
				specifier={`${PUBLIC_WEBSITE_URL}/r/controls.json`}
				is_jsrepo={true}
				blockname="workflow"
			/>

			<Subheading>Usage</Subheading>

			<CodeNameBlock
				filename="controls-example.svelte"
				lang="svelte"
				code={`\<script lang="ts"\>
  import Canvas from "$lib/components/ai-elements/workflow/canvas/Canvas.svelte";
  import Controls from "$lib/components/ai-elements/workflow/controls/Controls.svelte";
  import type { Node, Edge } from "@xyflow/svelte";

  let nodes: Node[] = $state([]);
  let edges: Edge[] = $state([]);
\</script\>

<Canvas bind:nodes bind:edges>
  <Controls />
</Canvas>`}
			/>

			<Subheading>Features</Subheading>

			<ul class="my-4 space-y-2 text-sm sm:text-base">
				<li>• Zoom in/out controls</li>
				<li>• Fit view button to center and scale content</li>
				<li>• Rounded pill design with backdrop blur</li>
				<li>• Theme-aware card background</li>
				<li>• Subtle drop shadow for depth</li>
				<li>• Full TypeScript support</li>
				<li>• Compatible with all Svelte Flow control features</li>
			</ul>

			<Subheading>Props</Subheading>

			<div class="my-4 space-y-4">
				<div class="border-primary border-l-2 pl-4">
					<p class="mb-1 font-mono text-sm font-semibold">className?</p>
					<p class="text-muted-foreground text-sm">
						<span class="font-mono text-xs">string</span> - Additional CSS classes to apply
						to the controls.
					</p>
				</div>

				<div class="border-primary border-l-2 pl-4">
					<p class="mb-1 font-mono text-sm font-semibold">[...props]</p>
					<p class="text-muted-foreground text-sm">
						<span class="font-mono text-xs">ComponentProps&lt;typeof Controls&gt;</span>
						- Any other props from @xyflow/svelte Controls component (showZoom, showFitView,
						showInteractive, position, etc.).
					</p>
				</div>
			</div>

			<Subheading>Custom Positioning</Subheading>

			<CodeNameBlock
				filename="custom-controls.svelte"
				lang="svelte"
				code={`\<script lang="ts"\>
  import Canvas from "$lib/components/ai-elements/workflow/canvas/Canvas.svelte";
  import Controls from "$lib/components/ai-elements/workflow/controls/Controls.svelte";
  import type { Node, Edge } from "@xyflow/svelte";

  let nodes: Node[] = $state([]);
  let edges: Edge[] = $state([]);
\</script\>

<Canvas bind:nodes bind:edges>
  <Controls position="top-right" showInteractive={false} />
</Canvas>`}
			/>

			<AiElementsPrevNext currentSlug="controls" />
		</main>

		<Toc.Root toc={toc.current} />
	</div>
</Sidebar.Inset>
