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
    class="grid grid-cols-1 md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_240px] gap-8 min-h-svh md:px-6 md:pb-6"
  >
    <!-- Main Content Area -->
    <main class="min-w-0" bind:this={toc.ref}>
      <Subheading class="md:text-3xl">Sources</Subheading>

      <p class="my-2 !text-muted-foreground text-lg">
        The <CodeSpan>Sources</CodeSpan> component allows a user to view the sources
        or citations used to generate a response.
      </p>

      <Playground code={examples.basic.code}>
        <div class="min-w-xs">
          <examples.basic.Component />
        </div>
      </Playground>

      <!-- pnpm dlx shadcn-svelte@latest add http://localhost:5173/r/hello-world.json -->
      <Installation specifier={`${PUBLIC_WEBSITE_URL}/r/sources.json`} />

      <!-- Usage -->
      <Subheading>Usage</Subheading>

      <div>
        <Code
          lang="svelte"
          code={`\<script lang="ts"\>
	import {
    Source,
    Sources,
    SourcesContent,
    SourcesTrigger,
  } from "$lib/components/ai-elements/sources";
\<\/script\>

<Sources>
    <SourcesTrigger count={sources.length} />
    <SourcesContent>
      {#each sources as source (source.href)}
        <Source href={source.href} title={source.title} />
      {/each}
    </SourcesContent>
</Sources>`}
        />
      </div>

      <!-- Usage with AI SDK -->
      <div class="space-y-4">
        <Subheading>Usage with AI SDK</Subheading>

        <p class="!text-muted-foreground leading-relaxed">
          Build a simple web search agent with Perplexity Sonar and display the sources used to generate the response.
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
    Conversation,
    ConversationContent,
    ConversationScrollButton
  } from "$lib/components/ai-elements/conversation";
  import { Message, MessageContent } from "$lib/components/ai-elements/message";
  import { Response } from "$lib/components/ai-elements/response";
  import {
    Source,
    Sources,
    SourcesContent,
    SourcesTrigger
  } from "$lib/components/ai-elements/sources";
  import {
    Input,
    PromptInputTextarea,
    PromptInputSubmit
  } from "$lib/components/ai-elements/prompt-input";

  let chat = new Chat({});

  function handleSubmit(e: Event) {
    e.preventDefault();
    if (chat.input.trim()) {
      chat.send();
    }
  }
\<\/script\>

<div class="max-w-4xl mx-auto p-6 relative size-full rounded-lg border h-[600px]">
  <div class="flex flex-col h-full">
    <div class="flex-1 overflow-auto mb-4">
      <Conversation>
        <ConversationContent>
          {#each chat.messages as message (message.id)}
            {#if message.role === "assistant"}
              {@const sources = message.parts.filter(part => part.type === "source-url")}
              {#if sources.length > 0}
                <Sources>
                  <SourcesTrigger count={sources.length} />
                  <SourcesContent>
                    {#each sources as part}
                      <Source href={part.url} title={part.url} />
                    {/each}
                  </SourcesContent>
                </Sources>
              {/if}
            {/if}
            <Message from={message.role}>
              <MessageContent>
                {#each message.parts as part, i (i)}
                  {#if part.type === "text"}
                    <Response content={part.text} />
                  {/if}
                {/each}
              </MessageContent>
            </Message>
          {/each}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
    </div>

    <Input onsubmit={handleSubmit} class="mt-4 w-full max-w-2xl mx-auto relative">
      <PromptInputTextarea
        bind:value={chat.input}
        placeholder="Ask a question and search the web..."
        class="pr-12"
      />
      <PromptInputSubmit
        status={chat.status}
        disabled={!chat.input.trim()}
        class="absolute bottom-1 right-1"
      />
    </Input>
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
import { perplexity } from "@ai-sdk/perplexity";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
  const { messages }: { messages: UIMessage[] } = await request.json();

  const result = streamText({
    model: perplexity("sonar"),
    system: "You are a helpful assistant. Keep your responses short (< 100 words) unless you are asked for more details. ALWAYS USE SEARCH.",
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse({
    sendSources: true,
  });
};`}
          />
        </div>
      </div>

      <!-- Features -->
      <div class="space-y-4">
        <Subheading>Features</Subheading>

        <ul class="space-y-3 text-sm sm:text-base leading-relaxed list-disc list-inside !text-muted-foreground">
          <li>Collapsible component that allows a user to view the sources or citations used to generate a response</li>
          <li>Customizable trigger and content components</li>
          <li>Support for custom sources or citations</li>
          <li>Responsive design with mobile-friendly controls</li>
          <li>Clean, modern styling with customizable themes</li>
        </ul>
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
