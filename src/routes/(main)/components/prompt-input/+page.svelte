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
      <Subheading class="md:text-3xl">Prompt Input</Subheading>

      <p class="my-2 !text-muted-foreground text-lg">
        The <CodeSpan>Prompt Input</CodeSpan> component allows a user to send a message
        with file attachments to a large language model. It includes a textarea,
        file upload capabilities, a submit button, and a dropdown for selecting the
        model.
      </p>

      <Playground code={examples.basic.code}>
        <div class="w-full">
          <examples.basic.Component />
        </div>
      </Playground>

      <!-- pnpm dlx shadcn-svelte@latest add http://localhost:5173/r/hello-world.json -->
      <Installation specifier={`${PUBLIC_WEBSITE_URL}/r/prompt-input.json`} is_jsrepo={true} blockname="prompt-input" />

      <!-- Usage -->
      <Subheading>Usage</Subheading>

      <div>
        <Code
          lang="svelte"
          code={`\<script lang="ts"\>
	import {
    PromptInput,
    PromptInputActionAddAttachments,
    PromptInputActionMenu,
    PromptInputActionMenuContent,
    PromptInputActionMenuTrigger,
    PromptInputAttachment,
    PromptInputAttachments,
    PromptInputBody,
    PromptInputButton,
    type PromptInputMessage,
    PromptInputModelSelect,
    PromptInputModelSelectContent,
    PromptInputModelSelectItem,
    PromptInputModelSelectTrigger,
    PromptInputModelSelectValue,
    PromptInputSubmit,
    PromptInputTextarea,
    PromptInputToolbar,
    PromptInputTools,
    type ChatStatus,
  } from "$lib/components/ai-elements/prompt-input";
\<\/script\>

<PromptInput globalDrop multiple onSubmit={handleSubmit}>
    <PromptInputBody>
      <PromptInputAttachments>
        {#snippet children(attachment)}
          <PromptInputAttachment data={attachment} />
        {/snippet}
      </PromptInputAttachments>
      <PromptInputTextarea
        bind:value={text}
        onchange={(e) => (text = (e.target as HTMLTextAreaElement).value)}
      />
    </PromptInputBody>
    <PromptInputToolbar>
      <PromptInputTools>
        <PromptInputActionMenu>
          <PromptInputActionMenuTrigger />
          <PromptInputActionMenuContent>
            <PromptInputActionAddAttachments />
          </PromptInputActionMenuContent>
        </PromptInputActionMenu>
        <PromptInputButton>
          <MicIcon size={16} />
        </PromptInputButton>
        <PromptInputButton size="default">
          <GlobeIcon size={16} />
          <span>Search</span>
        </PromptInputButton>
        <PromptInputModelSelect
          bind:value={model}
          onValueChange={(value) => {
            if (value) {
              model = value;
              const selectedModel = models.find((m) => m.id === model);
              model_name = selectedModel ? selectedModel.name : "";
            }
          }}
        >
          <PromptInputModelSelectTrigger>
            <PromptInputModelSelectValue
              value={model_name}
              placeholder="Select Model"
            />
          </PromptInputModelSelectTrigger>
          <PromptInputModelSelectContent>
            {#each models as modelOption (modelOption.id)}
              <PromptInputModelSelectItem value={modelOption.id}>
                {modelOption.name}
              </PromptInputModelSelectItem>
            {/each}
          </PromptInputModelSelectContent>
        </PromptInputModelSelect>
      </PromptInputTools>
      <PromptInputSubmit {status} />
    </PromptInputToolbar>
</PromptInput>`}
        />
      </div>

      <!-- Usage with AI SDK -->
      <Subheading>Usage with AI SDK</Subheading>

      <p class="mb-4 text-sm sm:text-base leading-relaxed">
        Build a fully functional chat app using <CodeSpan>PromptInput</CodeSpan>,
        <a
          href="/components/conversation"
          class="text-primary hover:underline font-medium"
        >
          Conversation
        </a> with a model picker:
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
    PromptInputActionAddAttachments,
    PromptInputActionMenu,
    PromptInputActionMenuContent,
    PromptInputActionMenuTrigger,
    PromptInputAttachment,
    PromptInputAttachments,
    PromptInputBody,
    PromptInputButton,
    type PromptInputMessage,
    PromptInputModelSelect,
    PromptInputModelSelectContent,
    PromptInputModelSelectItem,
    PromptInputModelSelectTrigger,
    PromptInputModelSelectValue,
    PromptInputSubmit,
    PromptInputTextarea,
    PromptInputToolbar,
    PromptInputTools,
  } from "$lib/components/ai-elements/prompt-input";
  import {
    Conversation,
    ConversationContent,
    ConversationScrollButton,
  } from "$lib/components/ai-elements/conversation";
  import { Message, MessageContent } from "$lib/components/ai-elements/message";
  import { Response } from "$lib/components/ai-elements/response";
  import { MicIcon, GlobeIcon } from "lucide-svelte";

  const models = [
    { id: "gpt-4o", name: "GPT-4o" },
    { id: "claude-opus-4-20250514", name: "Claude 4 Opus" },
  ];

  let text = $state<string>("");
  let model = $state<string>(models[0].id);
  let useMicrophone = $state<boolean>(false);
  let useWebSearch = $state<boolean>(false);

  let chat = new Chat({});

  const handleSubmit = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);

    if (!(hasText || hasAttachments)) {
      return;
    }

    chat.sendMessage(
      {
        text: message.text || "Sent with attachments",
        files: message.files,
      },
      {
        body: {
          model: model,
          webSearch: useWebSearch,
        },
      }
    );
    text = "";
  };
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
                {/if}
              {/each}
            </MessageContent>
          </Message>
        {/each}
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>

    <PromptInput onSubmit={handleSubmit} class="mt-4" globalDrop multiple>
      <PromptInputBody>
        <PromptInputAttachments>
          {#snippet children(attachment)}
            <PromptInputAttachment data={attachment} />
          {/snippet}
        </PromptInputAttachments>
        <PromptInputTextarea
          bind:value={text}
          onchange={(e) => (text = (e.target as HTMLTextAreaElement).value)}
        />
      </PromptInputBody>
      <PromptInputToolbar>
        <PromptInputTools>
          <PromptInputActionMenu>
            <PromptInputActionMenuTrigger />
            <PromptInputActionMenuContent>
              <PromptInputActionAddAttachments />
            </PromptInputActionMenuContent>
          </PromptInputActionMenu>
          <PromptInputButton
            onclick={() => (useMicrophone = !useMicrophone)}
            variant={useMicrophone ? "default" : "ghost"}
          >
            <MicIcon size={16} />
            <span class="sr-only">Microphone</span>
          </PromptInputButton>
          <PromptInputButton
            onclick={() => (useWebSearch = !useWebSearch)}
            variant={useWebSearch ? "default" : "ghost"}
          >
            <GlobeIcon size={16} />
            <span class="sr-only">Web Search</span>
          </PromptInputButton>
          <PromptInputModelSelect
            bind:value={model}
            onValueChange={(value) => {
              if (value) {
                model = value;
              }
            }}
          >
            <PromptInputModelSelectTrigger>
              <PromptInputModelSelectValue placeholder="Select model" />
            </PromptInputModelSelectTrigger>
            <PromptInputModelSelectContent>
              {#each models as modelOption (modelOption.id)}
                <PromptInputModelSelectItem value={modelOption.id}>
                  {modelOption.name}
                </PromptInputModelSelectItem>
              {/each}
            </PromptInputModelSelectContent>
          </PromptInputModelSelect>
        </PromptInputTools>
        <PromptInputSubmit
          status={chat.status === "streaming" ? "streaming" : "ready"}
        />
      </PromptInputToolbar>
    </PromptInput>
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
  const {
    model,
    messages,
    webSearch,
  }: {
    messages: UIMessage[];
    model: string;
    webSearch?: boolean;
  } = await request.json();

  const result = streamText({
    model: webSearch ? "perplexity/sonar" : model,
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
};`}
        />
      </div>

      <!-- Features -->
      <Subheading>Features</Subheading>

      <ul
        class="list-disc list-inside space-y-2 mb-6 text-sm sm:text-base leading-relaxed"
      >
        <li>Auto-resizing textarea that adjusts height based on content</li>
        <li>File attachment support with drag-and-drop</li>
        <li>Image preview for image attachments</li>
        <li>Configurable file constraints (max files, max size, accepted types)</li>
        <li>Automatic submit button icons based on status</li>
        <li>
          Support for keyboard shortcuts (Enter to submit, Shift+Enter for new line)
        </li>
        <li>Customizable min/max height for the textarea</li>
        <li>Flexible toolbar with support for custom actions and tools</li>
        <li>Built-in model selection dropdown</li>
        <li>Responsive design with mobile-friendly controls</li>
        <li>Clean, modern styling with customizable themes</li>
        <li>Form-based submission handling</li>
        <li>Hidden file input sync for native form posts</li>
        <li>Global document drop support (opt-in)</li>
      </ul>

      <!-- Examples  -->
      <!-- <Subheading>Examples</Subheading>

      <Playground code={examples.messageAction.code}>
        <examples.messageAction.Component />
      </Playground> -->
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
