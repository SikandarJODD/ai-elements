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
  import { CodeNameBlock } from "$lib/components/docs";
</script>

<!-- SEO Meta Tags -->
<MetaTags {...seo} />

<Sidebar.Inset class="min-h-svh">
  <div
    class="grid grid-cols-1 md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_240px] gap-8 min-h-svh md:px-6 md:pb-6"
  >
    <!-- Main Content Area -->
    <main class="min-w-0" bind:this={toc.ref}>
      <Subheading class="md:text-3xl">Suggestion</Subheading>

      <p class="my-2 !text-muted-foreground text-lg">
        The <CodeSpan>Suggestion</CodeSpan> component displays a horizontal row of clickable
        suggestions for user interaction.
      </p>

      <Playground code={examples.basic.code}>
        <examples.basic.Component />
      </Playground>

      <!-- pnpm dlx shadcn-svelte@latest add http://localhost:5173/r/suggestion.json -->
      <Installation specifier={`${PUBLIC_WEBSITE_URL}/r/suggestion.json`} />

      <!-- Usage -->
      <Subheading>Usage</Subheading>

      <div>
        <Code
          lang="svelte"
          code={`\<script lang="ts"\>
	import {
    Suggestion,
    Suggestions,
  } from "$lib/components/ai-elements/suggestion";
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

      <p class="mb-4 text-sm sm:text-base leading-relaxed">
        Build a simple input with suggestions users can click to send a message to the LLM.
      </p>

      <p class="mb-4 text-sm sm:text-base leading-relaxed">
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
  } from "$lib/components/ai-elements/prompt-input";
  import { Suggestion, Suggestions } from "$lib/components/ai-elements/suggestion";

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

      <p class="mb-4 text-sm sm:text-base leading-relaxed">
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
    </main>

    <!-- TOC Sidebar - Sticky on larger screens -->
    <aside
      class="hidden md:flex sticky top-24 h-fit max-h-[calc(100vh-3rem)] overflow-y-auto"
    >
      <!-- TOC Component -->
      <div>
        <h3 class="text-sm">On this page</h3>
        <Toc.Root toc={toc.current} />
      </div>
    </aside>
  </div>
</Sidebar.Inset>
