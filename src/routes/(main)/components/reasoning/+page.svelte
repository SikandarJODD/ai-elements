<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";
	import {
		Subheading,
		ComponentAPITable,
		CodeNameBlock,
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
	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/components/reasoning/llms.txt`;
	// Component API Props Data
	const reasoningProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the reasoning container",
		},
		{
			name: "isStreaming",
			type: "boolean",
			default: "false",
			description: "Whether the AI is currently streaming reasoning content",
		},
		{
			name: "open",
			type: "boolean",
			description:
				"Controlled state for whether the reasoning content is expanded (bindable)",
		},
		{
			name: "defaultOpen",
			type: "boolean",
			default: "true",
			description: "Default open state when not controlled",
		},
		{
			name: "onOpenChange",
			type: "(open: boolean) => void",
			description: "Callback fired when the open state changes",
		},
		{
			name: "duration",
			type: "number",
			description: "Duration in seconds that the AI spent reasoning (bindable)",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Child components (typically ReasoningTrigger and ReasoningContent)",
		},
		{
			name: "...props",
			type: "CollapsibleProps",
			description: "All other Collapsible component props are supported",
		},
	];

	const reasoningContentProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the content container",
		},
		{
			name: "children",
			type: "Snippet",
			description: "The reasoning content to display when expanded",
		},
		{
			name: "...props",
			type: "CollapsibleContentProps",
			description: "All other CollapsibleContent component props are supported",
		},
	];

	const reasoningTriggerProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the trigger button",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Custom trigger content (defaults to brain icon with thinking message)",
		},
		{
			name: "...props",
			type: "CollapsibleTriggerProps",
			description: "All other CollapsibleTrigger component props are supported",
		},
	];

	const responseProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the response container",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Response content to render",
		},
		{
			name: "...props",
			type: "HTMLAttributes<HTMLDivElement>",
			description: "All other div props are supported",
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
			<Subheading class="md:text-3xl">Reasoning</Subheading>

			<p class="!text-muted-foreground my-2 text-lg">
				The <CodeSpan>Reasoning</CodeSpan> component displays AI reasoning content, automatically
				opening during streaming and closing when finished.
			</p>

			<!-- Actions -->
			<div class="mb-8 flex items-center gap-2">
				<CopyMarkdownButton {llmsTxtUrl} />
				<OpenInMenu componentName="Reasoning" {llmsTxtUrl} type="ai-elements" />
			</div>

			<Playground code={examples.basic.code} replay>
				<examples.basic.Component />
			</Playground>

			<!-- pnpm dlx shadcn-svelte@latest add http://localhost:5173/r/hello-world.json -->
			<Installation
				specifier={`${PUBLIC_WEBSITE_URL}/r/reasoning.json`}
				is_jsrepo={true}
				blockname="reasoning"
			/>

			<!-- Usage -->
			<Subheading>Usage</Subheading>

			<div>
				<Code
					lang="svelte"
					code={`\<script lang="ts"\>
	import {
    Reasoning,
    ReasoningTrigger,
    ReasoningContent,
  } from "$lib/components/ai-elements/reasoning/index.js";
\<\/script\>

<Reasoning class="w-full" {isStreaming}>
  <ReasoningTrigger />
  <ReasoningContent>{content}</ReasoningContent>
</Reasoning>
  `}
				/>
			</div>

			<!-- Usage with AI SDK -->
			<Subheading>Usage with AI SDK</Subheading>

			<p class="mb-4 text-sm leading-relaxed sm:text-base">
				Build a chatbot with reasoning using Deepseek R1.
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
    Reasoning,
    ReasoningContent,
    ReasoningTrigger,
  } from "$lib/components/ai-elements/reasoning/index.js";
  import {
    Conversation,
    ConversationContent,
    ConversationScrollButton,
  } from "$lib/components/ai-elements/conversation/index.js";
  import {
    PromptInput,
    PromptInputTextarea,
    PromptInputSubmit,
  } from "$lib/components/ai-elements/prompt-input/index.js";
  import { Loader } from "$lib/components/ai-elements/loader/index.js";
  import { Message, MessageContent } from "$lib/components/ai-elements/message/index.js";
  import { Response } from "$lib/components/ai-elements/response/index.js";

  let chat = new Chat({});
  let input = $state("");

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    chat.sendMessage({ text: input });
    input = "";
  }
\<\/script\>

<div class="max-w-4xl mx-auto p-6 relative size-full rounded-lg border h-[600px]">
  <div class="flex flex-col h-full">
    <Conversation>
      <ConversationContent>
        {#each chat.messages as message (message.id)}
          <Message from={message.role}>
            <MessageContent>
              {#each message.parts as part, i (i)}
                {#if part.type === "text"}
                  <Response>
                    {part.text}
                  </Response>
                {:else if part.type === "reasoning"}
                  <Reasoning
                    class="w-full"
                    isStreaming={chat.status === "streaming" &&
                      i === message.parts.length - 1 &&
                      message.id === chat.messages.at(-1)?.id}
                  >
                    <ReasoningTrigger />
                    <ReasoningContent>{part.text}</ReasoningContent>
                  </Reasoning>
                {/if}
              {/each}
            </MessageContent>
          </Message>
        {/each}
        {#if chat.status === "streaming"}
          <Loader />
        {/if}
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>

    <PromptInput onsubmit={handleSubmit} class="mt-4 w-full max-w-2xl mx-auto relative">
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
    </PromptInput>
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
    model: "deepseek/deepseek-r1",
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse({
    sendReasoning: true,
  });
};`}
				/>
			</div>

			<!-- Features -->
			<Subheading>Features</Subheading>

			<ul class="mb-6 ml-6 list-disc text-sm sm:text-base [&>li]:mt-2">
				<li>Automatically opens when streaming content and closes when finished</li>
				<li>Manual toggle control for user interaction</li>
				<li>Smooth animations and transitions powered by Radix UI</li>
				<li>Visual streaming indicator with pulsing animation</li>
				<li>Composable architecture with separate trigger and content components</li>
				<li>Built with accessibility in mind including keyboard navigation</li>
				<li>Responsive design that works across different screen sizes</li>
				<li>Seamlessly integrates with both light and dark themes</li>
				<li>Built on top of shadcn-svelte Collapsible primitives</li>
				<li>TypeScript support with proper type definitions</li>
			</ul>

			<!-- Component API Section -->
			<Subheading>Props</Subheading>

			<!-- Reasoning -->
			<ComponentAPITable
				componentName="Reasoning"
				props={reasoningProps}
				class="mt-6"
				id="reasoning-props"
			/>

			<!-- ReasoningTrigger -->
			<ComponentAPITable
				componentName="ReasoningTrigger"
				props={reasoningTriggerProps}
				id="reasoning-trigger-props"
			/>

			<!-- ReasoningContent -->
			<ComponentAPITable
				componentName="ReasoningContent"
				props={reasoningContentProps}
				id="reasoning-content-props"
			/>

			<!-- Response -->
			<ComponentAPITable componentName="Response" props={responseProps} id="response-props" />
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
