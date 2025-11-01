<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";
	import {
		Subheading,
		CodeNameBlock,
		ComponentAPITable,
		CopyMarkdownButton,
		OpenInMenu,
	} from "$lib/components/docs";
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
	let toc = new UseToc();

	// URL for llm.txt
	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/components/loader/llms.txt`;
	// Component API Props Data
	const loaderProps = [
		{
			name: "size",
			type: "number",
			default: "16",
			description: "Size of the loader icon in pixels",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the loader container",
		},
		{
			name: "...restProps",
			type: "HTMLAttributes<HTMLDivElement>",
			description: "All other div props are supported",
		},
	];

	const loaderIconProps = [
		{
			name: "size",
			type: "number",
			default: "16",
			description: "Size of the loader icon in pixels",
		},
	];
</script>

<!-- SEO Meta Tags -->
<MetaTags {...seo} />

<Sidebar.Inset class="min-h-svh">
	<div
		class="grid min-h-svh grid-cols-1 gap-8 md:grid-cols-[1fr_280px] md:px-6 md:pb-6 lg:grid-cols-[1fr_240px]"
	>
		<!-- Main Content Area -->
		<main class="min-w-0" bind:this={toc.ref}>
			<Subheading class="md:text-3xl">Loader</Subheading>

			<p class="!text-muted-foreground my-2 text-lg">
				The <CodeSpan>Loader</CodeSpan> component provides a spinning animation to indicate loading
				states in your AI applications. It includes both a customizable wrapper component and
				the underlying icon for flexible usage.
			</p>

			<!-- Actions -->
			<div class="mb-8 flex items-center gap-2">
				<CopyMarkdownButton {llmsTxtUrl} />
				<OpenInMenu componentName="Loader" {llmsTxtUrl} type="ai-elements" />
			</div>

			<Playground code={examples.basic.code}>
				<examples.basic.Component />
			</Playground>

			<!-- pnpm dlx shadcn-svelte@latest add http://localhost:5173/r/loader.json -->
			<Installation
				specifier={`${PUBLIC_WEBSITE_URL}/r/loader.json`}
				is_jsrepo={true}
				blockname="loader"
			/>

			<!-- Usage -->
			<Subheading>Usage</Subheading>

			<div>
				<Code
					lang="svelte"
					code={`\<script lang="ts"\>
  import { Loader } from "$lib/components/ai-elements/loader/index.js";
\<\/script\>

<div>
  <Loader />
</div>`}
				/>
			</div>

			<!-- Usage with AI SDK -->
			<Subheading>Usage with AI SDK</Subheading>

			<p class="mb-4 text-sm leading-relaxed sm:text-base">
				Build a simple chat app that displays a loader before the response streams by using <CodeSpan
					>status === "submitted"</CodeSpan
				>.
			</p>

			<p class="mb-4 text-sm leading-relaxed sm:text-base">
				Add the following component to your frontend:
			</p>

			<div class="mb-6">
				<CodeNameBlock
					filename="+page.svelte"
					lang="svelte"
					code={`\<script lang="ts"\>
  import { Chat } from "@ai-sdk/svelte";
  import {
    Conversation,
    ConversationContent,
    ConversationScrollButton,
  } from "$lib/components/ai-elements/conversation/index.js";
  import { Message, MessageContent } from "$lib/components/ai-elements/message/index.js";
  import {
    Input,
    PromptInputTextarea,
    PromptInputSubmit,
  } from "$lib/components/ai-elements/prompt-input/index.js";
  import { Loader } from "$lib/components/ai-elements/loader/index.js";

  let input = $state("");
  let chat = new Chat({});

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (input.trim()) {
      chat.sendMessage({ text: input });
      input = "";
    }
  }
\<\/script\>

<div class="max-w-4xl mx-auto p-6 relative size-full rounded-lg border h-[600px]">
  <div class="flex flex-col h-full">
    <Conversation>
      <ConversationContent>
        {#each chat.messages as message, messageIndex (messageIndex)}
          <Message from={message.role}>
            <MessageContent>
              {#each message.parts as part, partIndex (partIndex)}
                {#if part.type === "text"}
                  <div>{part.text}</div>
                {/if}
              {/each}
            </MessageContent>
          </Message>
        {/each}
        {#if chat.status === "submitted"}
          <Loader />
        {/if}
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>

    <Input onsubmit={handleSubmit} class="mt-4 w-full max-w-2xl mx-auto relative">
      <PromptInputTextarea
        bind:value={input}
        placeholder="Say something..."
        class="pr-12"
      />
      <PromptInputSubmit
        status={chat.status === "streaming" ? "streaming" : "ready"}
        disabled={!input.trim()}
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
					filename="api/chat/+server.ts"
					lang="typescript"
					code={`import { streamText, type UIMessage, convertToModelMessages } from "ai";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
  const { messages }: { messages: UIMessage[] } = await request.json();

  const result = streamText({
    model: "openai/gpt-4o", // or your preferred model
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
};`}
				/>
			</div>

			<!-- Component API Section -->
			<Subheading>Props</Subheading>

			<!-- Loader -->
			<ComponentAPITable
				componentName="Loader"
				props={loaderProps}
				class="mt-6"
				id="loader-props"
			/>

			<!-- LoaderIcon -->
			<ComponentAPITable
				componentName="LoaderIcon"
				props={loaderIconProps}
				id="loader-icon-props"
			/>
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
