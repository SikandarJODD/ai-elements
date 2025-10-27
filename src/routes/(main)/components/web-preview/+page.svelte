<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";
	import { Subheading, CodeNameBlock } from "$lib/components/docs";
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
			<Subheading class="md:text-3xl">Web Preview</Subheading>

			<p class="!text-muted-foreground my-2 text-lg">
				The <CodeSpan>Web Preview</CodeSpan> component provides a flexible way to showcase the
				result of a generated UI component, along with its source code. It is designed for documentation
				and demo purposes, allowing users to interact with live examples and view the underlying
				implementation.
			</p>

			<Playground code={examples.basic.code}>
				<div class="w-full">
					<examples.basic.Component />
				</div>
			</Playground>

			<!-- pnpm dlx shadcn-svelte@latest add http://localhost:5173/r/hello-world.json -->
			<Installation
				specifier={`${PUBLIC_WEBSITE_URL}/r/web-preview.json`}
				is_jsrepo={true}
				blockname="web-preview"
			/>

			<!-- Usage -->
			<Subheading>Usage</Subheading>

			<div>
				<Code
					lang="svelte"
					code={`\<script lang="ts"\>
	import {
		WebPreview,
		WebPreviewNavigation,
		WebPreviewNavigationButton,
		WebPreviewUrl,
		WebPreviewBody,
		WebPreviewConsole,
		type LogEntry
	} from '$lib/components/ai-elements/web-preview/index.js';
\<\/script\>

<WebPreview defaultUrl="https://svelte.dev">
  <WebPreviewNavigation>
    <WebPreviewUrl src="https://svelte.dev" />
  </WebPreviewNavigation>
  <WebPreviewBody />
</WebPreview>`}
				/>
			</div>

			<!-- Usage with AI SDK -->
			<Subheading>Usage with AI SDK</Subheading>

			<p class="mb-4 text-sm leading-relaxed sm:text-base">
				Build a simple v0-like clone that generates UI components and previews them in
				real-time using <CodeSpan>useChat</CodeSpan> and the <CodeSpan>v0-sdk</CodeSpan>.
			</p>

			<p class="mb-4 text-sm leading-relaxed sm:text-base">
				First, install the <CodeSpan>v0-sdk</CodeSpan> package:
			</p>

			<div class="mb-6">
				<Code lang="bash" code={`pnpm add v0-sdk`} />
			</div>

			<p class="mb-4 text-sm leading-relaxed sm:text-base">
				Add the following component to your frontend:
			</p>

			<div class="mb-6">
				<CodeNameBlock
					filename="+page.svelte"
					lang="svelte"
					code={`\<script lang="ts"\>
  import { useChat } from "@ai-sdk/svelte";
  import { DefaultChatTransport } from "ai";
  import { Button } from "$lib/components/ui/button/index.js";
  import {
    WebPreview,
    WebPreviewNavigation,
    WebPreviewUrl,
    WebPreviewBody
  } from "$lib/components/ai-elements/web-preview/index.js";
  import {
    Input,
    PromptInputTextarea,
    PromptInputSubmit
  } from "$lib/components/ai-elements/prompt-input/index.js";
  import { Loader } from "$lib/components/ai-elements/loader/index.js";

  let previewUrl = $state("");
  let prompt = $state("");

  let { messages, sendMessage, status } = $derived(
    useChat({
      transport: new DefaultChatTransport({
        api: "/api/chat",
      }),
      async onFinish(message) {
        // Extract the demo URL from the response
        const data = JSON.parse(message.content);
        if (data.demo) {
          previewUrl = data.demo;
        }
      },
    })
  );

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    if (!prompt.trim() || status !== "ready") return;

    const message = prompt;
    prompt = "";
    sendMessage({ text: message });
  };

  const isGenerating = $derived(status === "streaming");
\<\/script\>

<div class="max-w-4xl mx-auto p-6 relative size-full rounded-lg border h-[600px]">
  <div class="flex flex-col h-full">
    <div class="flex-1 mb-4">
      {#if isGenerating}
        <div class="flex flex-col items-center justify-center h-full">
          <Loader />
          <p class="mt-4 text-muted-foreground">
            Generating app, this may take a few seconds...
          </p>
        </div>
      {:else if previewUrl}
        <WebPreview defaultUrl={previewUrl}>
          <WebPreviewNavigation>
            <WebPreviewUrl />
          </WebPreviewNavigation>
          <WebPreviewBody src={previewUrl} />
        </WebPreview>
      {:else}
        <div class="flex items-center justify-center h-full text-muted-foreground">
          Your generated app will appear here
        </div>
      {/if}
    </div>

    <Input
      onsubmit={handleSubmit}
      class="w-full max-w-2xl mx-auto relative"
    >
      <PromptInputTextarea
        bind:value={prompt}
        placeholder="Describe the app you want to build..."
        class="pr-12 min-h-[60px]"
      />
      <PromptInputSubmit
        status={isGenerating ? "streaming" : "ready"}
        disabled={!prompt.trim()}
        class="absolute bottom-1 right-1"
      />
    </Input>
  </div>
</div>`}
				/>
			</div>

			<p class="mb-4 text-sm leading-relaxed sm:text-base">
				Add the following route to your backend:
			</p>

			<div class="mb-6">
				<CodeNameBlock
					filename="/api/chat/+server.ts"
					lang="typescript"
					code={`import { v0 } from "v0-sdk";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
  const { messages } = await request.json();

  // Get the latest user message
  const prompt = messages[messages.length - 1]?.content || "";

  const result = await v0.chats.create({
    system: "You are an expert coder",
    message: prompt,
    modelConfiguration: {
      modelId: "v0-1.5-sm",
      imageGenerations: false,
      thinking: false,
    },
  });

  return new Response(
    JSON.stringify({
      demo: result.demo,
      webUrl: result.webUrl,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};`}
				/>
			</div>

			<!-- Features -->
			<Subheading>Features</Subheading>

			<ul class="mb-6 list-inside list-disc space-y-2 text-sm sm:text-base">
				<li>Live preview of UI components</li>
				<li>Composable architecture with dedicated sub-components</li>
				<li>Responsive design modes (Desktop, Tablet, Mobile)</li>
				<li>Navigation controls with back/forward functionality</li>
				<li>URL input and example selector</li>
				<li>Full screen mode support</li>
				<li>Console logging with timestamps</li>
				<li>Context-based state management</li>
				<li>Consistent styling with the design system</li>
				<li>Easy integration into documentation pages</li>
			</ul>
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
