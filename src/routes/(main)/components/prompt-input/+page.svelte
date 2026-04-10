<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";
	import { Subheading, CopyMarkdownButton, OpenInMenu } from "$lib/components/docs";
	import Installation from "$lib/components/docs/installation.svelte";
	import Playground from "$lib/components/docs/playground.svelte";
	import Code from "$lib/components/docs/code.svelte";
	import { examples } from "./examples/examples";
	import { seo } from "./examples/seo";
	import CodeSpan from "$lib/components/docs/code-span.svelte";
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";

	import * as Sidebar from "$lib/components/ui/sidebar/index.js";

	import * as Toc from "$lib/components/docs/toc";
	import { UseToc } from "$lib/hooks/use-toc.svelte";
	import AiElementsPrevNext from "$lib/components/ai-elements/ai-elements-prev-next.svelte";
	let toc = new UseToc();

	// URL for llm.txt
	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/components/prompt-input/llms.txt`;
	// Component API Props Data
</script>

<!-- SEO Meta Tags -->
<MetaTags {...seo} />


		<!-- Main Content Area -->
		<main class="min-w-0" bind:this={toc.ref}>
			<Subheading class="md:text-3xl">Prompt Input</Subheading>

			<p class="text-muted-foreground! my-2 text-lg">
				The <CodeSpan>Prompt Input</CodeSpan> component allows a user to send a message with file
				attachments to a large language model. It includes a textarea, file upload capabilities,
				a submit button, and a dropdown for selecting the model.
			</p>

			<!-- Actions -->
			<div class="mb-8 flex items-center gap-2">
				<CopyMarkdownButton {llmsTxtUrl} />
				<OpenInMenu componentName="Prompt Input" {llmsTxtUrl} type="ai-elements" />
			</div>

			<Playground code={examples.basic.code} isExpand>
				<examples.basic.Component />
			</Playground>

			<!-- pnpm dlx shadcn-svelte@latest add http://localhost:5173/r/hello-world.json -->
			<Installation
				specifier={`${PUBLIC_WEBSITE_URL}/r/prompt-input.json`}
				is_jsrepo={false}
				blockname="prompt-input"
			/>

			<AiElementsPrevNext currentSlug="prompt-input" />
		</main>


