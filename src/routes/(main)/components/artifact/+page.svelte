<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";
	import { Subheading } from "$lib/components/docs";
	import Installation from "$lib/components/docs/installation.svelte";
	import Playground from "$lib/components/docs/playground.svelte";
	import Code from "$lib/components/docs/code.svelte";
	import { examples } from "./examples/examples";
	import { seo } from "./examples/seo";
	import Heading from "$lib/components/docs/heading.svelte";
	import CodeSpan from "$lib/components/docs/code-span.svelte";
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";

	import * as Sidebar from "$lib/components/ui/sidebar/index.js";

	import * as Toc from "$lib/components/docs/toc";
	import { UseToc } from "$lib/hooks/use-toc.svelte";
	let toc = new UseToc();
</script>

<!-- SEO Meta Tags -->
<MetaTags {...seo} />

<Sidebar.Inset class="min-h-svh">
	<div
		class="grid min-h-svh grid-cols-1 gap-8 md:grid-cols-[1fr_280px] md:px-6 md:pb-6 lg:grid-cols-[1fr_240px]"
	>
		<!-- Main Content Area -->
		<main class="min-w-0" bind:this={toc.ref}>
			<Subheading class="md:text-3xl">Artifact</Subheading>

			<p class="!text-muted-foreground my-2 text-lg">
				The <CodeSpan>Artifact</CodeSpan> component provides a structured container for displaying
				generated content like code, documents, or other outputs with built-in header actions.
			</p>

			<Playground code={examples.basic.code}>
				<div class="mx-auto w-full">
					<examples.basic.Component />
				</div>
			</Playground>

			<!-- pnpm dlx shadcn-svelte@latest add http://localhost:5173/r/hello-world.json -->
			<Installation
				specifier={`${PUBLIC_WEBSITE_URL}/r/artifact.json`}
				is_jsrepo={true}
				blockname="artifact"
			/>

			<!-- Usage -->
			<Subheading>Usage</Subheading>

			<div>
				<Code
					lang="svelte"
					code={`\<script lang="ts"\>
	 import {
    Artifact,
    ArtifactAction,
    ArtifactActions,
    ArtifactContent,
    ArtifactDescription,
    ArtifactHeader,
    ArtifactTitle,
  } from "$lib/components/ai-elements/artifact/index.js";
\<\/script\>

<Artifact>
  <ArtifactHeader>
    <div>
      <ArtifactTitle>Dijkstra's Algorithm Implementation</ArtifactTitle>
      <ArtifactDescription>Updated 1 minute ago</ArtifactDescription>
    </div>
    <ArtifactActions>
      <ArtifactAction icon={CopyIcon} label="Copy" tooltip="Copy to clipboard" />
    </ArtifactActions>
  </ArtifactHeader>
  <ArtifactContent>
    {/* Your content here */}
  </ArtifactContent>
</Artifact>`}
				/>
			</div>

			<!-- Examples  -->
			<!-- <Subheading>Examples</Subheading>

      <Playground code={examples.messageAction.code}>
        <examples.messageAction.Component />
      </Playground> -->
		</main>

		<!-- TOC Sidebar - Sticky on larger screens -->
		<aside class="sticky top-24 hidden h-fit max-h-[calc(100vh-3rem)] overflow-y-auto md:flex">
			<!-- TOC Component -->
			<div>
				<h3 class="text-sm">On this page</h3>
				<Toc.Root toc={toc.current} />
			</div>
		</aside>
	</div>
</Sidebar.Inset>
