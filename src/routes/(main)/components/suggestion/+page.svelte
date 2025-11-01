<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";
	import {
		Subheading,
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
	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/components/suggestion/llms.txt`;
	// Component API Props Data
	const suggestionProps = [
		{
			name: "suggestion",
			type: "string",
			description: "The suggestion text to display and pass to the onclick handler",
		},
		{
			name: "onclick",
			type: "(suggestion: string) => void",
			description:
				"Callback fired when the suggestion is clicked, receives the suggestion text",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Custom content to render instead of the suggestion text",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the suggestion button",
		},
		{
			name: "variant",
			type: "ButtonProps['variant']",
			default: "'outline'",
			description: "Button variant style",
		},
		{
			name: "size",
			type: "ButtonProps['size']",
			default: "'sm'",
			description: "Button size",
		},
		{
			name: "...restProps",
			type: "ButtonProps",
			description: "All other Button component props are supported",
		},
	];

	const suggestionsProps = [
		{
			name: "children",
			type: "Snippet",
			description: "Suggestion components to render in the scrollable container",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the suggestions container",
		},
		{
			name: "orientation",
			type: "'vertical' | 'horizontal' | 'both'",
			default: "'horizontal'",
			description: "Scroll direction for the suggestions container",
		},
		{
			name: "scrollbarXClasses",
			type: "string",
			description: "Custom CSS classes for the horizontal scrollbar",
		},
		{
			name: "scrollbarYClasses",
			type: "string",
			description: "Custom CSS classes for the vertical scrollbar",
		},
		{
			name: "...restProps",
			type: "ScrollAreaProps",
			description: "All other ScrollArea component props are supported",
		},
	];

	import { CodeNameBlock } from "$lib/components/docs";
</script>

<!-- SEO Meta Tags -->
<MetaTags {...seo} />

<Sidebar.Inset class="min-h-svh">
	<div
		class="grid min-h-svh grid-cols-1 gap-8 md:grid-cols-[1fr_280px] md:px-6 md:pb-6 lg:grid-cols-[1fr_240px]"
	>
		<!-- Main Content Area -->
		<main class="min-w-0" bind:this={toc.ref}>
			<Subheading class="md:text-3xl">Suggestion</Subheading>

			<p class="!text-muted-foreground my-2 text-lg">
				The <CodeSpan>Suggestion</CodeSpan> component displays a horizontal row of clickable
				suggestions for user interaction.
			</p>

			<!-- Actions -->
			<div class="mb-8 flex items-center gap-2">
				<CopyMarkdownButton {llmsTxtUrl} />
				<OpenInMenu componentName="Suggestion" {llmsTxtUrl} type="ai-elements" />
			</div>

			<Playground code={examples.basic.code}>
				<examples.basic.Component />
			</Playground>

			<!-- pnpm dlx shadcn-svelte@latest add http://localhost:5173/r/suggestion.json -->
			<Installation
				specifier={`${PUBLIC_WEBSITE_URL}/r/suggestion.json`}
				is_jsrepo={true}
				blockname="suggestion"
			/>

			<!-- Usage -->
			<Subheading>Usage</Subheading>

			<div>
				<Code
					lang="svelte"
					code={`\<script lang="ts"\>
	import {
    Suggestion,
    Suggestions,
  } from "$lib/components/ai-elements/suggestion/index.js";
\<\/script\>

<Suggestions scrollbarXClasses="hidden">
  {#each suggestions as suggestion (suggestion)}
    <Suggestion {suggestion} onclick={handleSuggestionClick} />
  {/each}
</Suggestions>`}
				/>
			</div>

			<!-- Usage with AI SDK -->
			<Subheading>Usage with AI SDK</Subheading>

			<p class="mb-4 text-sm leading-relaxed sm:text-base">
				Build a simple input with suggestions users can click to send a message to the LLM.
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
    PromptInput,
    PromptInputBody,
    PromptInputSubmit,
    PromptInputTextarea,
    type PromptInputMessage,
  } from "$lib/components/ai-elements/prompt-input/index.js";
  import { Suggestion, Suggestions } from "$lib/components/ai-elements/suggestion/index.js";

  const suggestions = [
    "Can you explain how to play tennis?",
    "What is the weather in Tokyo?",
    "How do I make a really good fish taco?",
  ];

  let text = $state<string>("");

  let chat = new Chat({});

  const handleSubmit = (message: PromptInputMessage) => {
    if (!message.text?.trim()) return;
    chat.sendMessage({ text: message.text });
    text = "";
  };

  const handleSuggestionClick = (suggestion: string) => {
    chat.sendMessage({ text: suggestion });
  };
\<\/script\>

<div class="max-w-4xl mx-auto p-6 relative size-full rounded-lg border h-[600px]">
  <div class="flex flex-col h-full">
    <div class="flex flex-col gap-4">
      <Suggestions scrollbarXClasses="hidden">
        {#each suggestions as suggestion (suggestion)}
          <Suggestion {suggestion} onclick={handleSuggestionClick} />
        {/each}
      </Suggestions>
      <PromptInput onSubmit={handleSubmit} class="mt-4 w-full max-w-2xl mx-auto relative">
        <PromptInputBody>
          <PromptInputTextarea
            bind:value={text}
            placeholder="Say something..."
            onchange={(e) => (text = (e.target as HTMLTextAreaElement).value)}
            class="pr-12"
          />
        </PromptInputBody>
        <PromptInputSubmit
          status={chat.status === "streaming" ? "streaming" : "ready"}
          disabled={!text.trim()}
          class="absolute bottom-1 right-1"
        />
      </PromptInput>
    </div>
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
    model: "openai:gpt-4o",
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
};`}
				/>
			</div>

			<!-- Component API Section -->
			<Subheading>Props</Subheading>

			<!-- Suggestion -->
			<ComponentAPITable
				componentName="Suggestion"
				props={suggestionProps}
				class="mt-6"
				id="suggestion-props"
			/>

			<!-- Suggestions -->
			<ComponentAPITable
				componentName="Suggestions"
				props={suggestionsProps}
				id="suggestions-props"
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
