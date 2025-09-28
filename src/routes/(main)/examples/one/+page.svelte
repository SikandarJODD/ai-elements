<script lang="ts">
  import { MetaTags } from "svelte-meta-tags";
  import {
    CodeNameBlock,
    CodeSpan,
    AiInstallCommand,
    Installation,
    Subheading,
  } from "$lib/components/docs";
  import { Card } from "$lib/components/ui/card";
  import * as Toc from "$lib/components/docs/toc";
  import { UseToc } from "$lib/hooks/use-toc.svelte";

  let toc = new UseToc();
</script>

<MetaTags
  title="Svelte 5 + AI SDK: Build Modern AI Chat Apps | Complete Guide 2024"
  description="Master Svelte 5 runes with AI SDK integration. Build reactive AI chat applications using modern patterns, streaming responses, and beautiful UI components. Step-by-step tutorial."
  keywords={[
    "Svelte 5",
    "AI SDK",
    "Svelte runes",
    "AI chat application",
    "Vercel AI SDK",
    "OpenRouter",
    "streaming AI",
    "reactive AI",
    "modern Svelte",
    "AI integration tutorial",
    "SvelteKit AI",
    "chat interface",
  ]}
  canonical="https://svelte-ai-elements.dev/examples/one"
  openGraph={{
    type: "article",
    title: "Svelte 5 + AI SDK: Build Modern AI Chat Apps",
    description:
      "Master Svelte 5 runes with AI SDK integration. Build reactive AI chat applications using modern patterns and streaming responses.",
    url: "https://svelte-ai-elements.dev/examples/one",
    siteName: "Svelte AI Elements",
  }}
  twitter={{
    cardType: "summary_large_image",
    title: "Svelte 5 + AI SDK: Build Modern AI Chat Apps",
    description:
      "Master Svelte 5 runes with AI SDK integration. Build reactive AI chat applications using modern patterns and streaming responses.",
  }}
/>

<div class="max-w-7xl mx-auto py-4 px-4 sm:py-8 sm:px-6 lg:px-8">
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
    <article
      class="prose prose-gray dark:prose-invert lg:col-span-3 max-w-none"
      bind:this={toc.ref}
    >
    <header class="mb-8 sm:mb-12">
      <h1 data-toc-index={false} class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
        Svelte 5 + AI SDK: Build Modern AI Chat Apps
      </h1>

      <div class="bg-zinc-50 dark:bg-zinc-900/50 border-l-4 border-zinc-300 dark:border-zinc-600 pl-4 py-3 mb-6 rounded-r">
        <p class="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
          Learn to build reactive AI chat applications using Svelte 5 runes and the AI SDK with modern patterns.
        </p>
      </div>
    </header>

    <section class="mb-8 sm:mb-10">
      <Subheading>Project Setup</Subheading>
      <p class="mb-4 text-sm sm:text-base">
        Create a new SvelteKit project with Tailwind CSS support:
      </p>
      <div>
        <AiInstallCommand command="execute" args={["sv", "create", "my-app"]} />
      </div>

      <p class="mt-4 mb-4">When prompted, select:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Which template? → <strong>SvelteKit minimal</strong></li>
        <li>Add type checking? → <strong>Yes, using TypeScript</strong></li>
        <li>Add additional options? → <strong>Add Tailwind CSS</strong></li>
      </ul>

      <CodeNameBlock
        filename="terminal"
        lang="bash"
        code={`cd my-ai-app
npm install`}
      />
    </section>

    <section class="mb-8 sm:mb-10">
      <Subheading>UI Setup with shadcn-svelte</Subheading>
      <p class="mb-4 text-sm sm:text-base">
        Install and configure <strong>shadcn-svelte</strong> for beautiful, accessible
        UI components:
      </p>

      <CodeNameBlock
        filename="setup.sh"
        lang="bash"
        code={`# Install shadcn-svelte
pnpm dlx shadcn-svelte@latest init

# Add necessary components
pnpm dlx shadcn-svelte@latest add button
pnpm dlx shadcn-svelte@latest add input
pnpm dlx shadcn-svelte@latest add card
pnpm dlx shadcn-svelte@latest add scroll-area`}
      />

      <p class="mt-4">
        This will create a <CodeSpan>lib/components/ui</CodeSpan> directory with
        pre-built components that integrate seamlessly with Tailwind CSS.
      </p>
    </section>

    <section class="mb-8 sm:mb-10">
      <Subheading>AI SDK Integration & OpenRouter Setup</Subheading>
      <p class="mb-4 text-sm sm:text-base">
        Install the Vercel AI SDK and set up OpenRouter for accessing AI models:
      </p>

      <CodeNameBlock
        filename="install.sh"
        lang="bash"
        code={`# Install AI SDK for Svelte
npm install ai @ai-sdk/openai

# Install environment variable support
npm install -D @types/node`}
      />

      <p class="mt-4 mb-4">Create a <CodeSpan>.env.local</CodeSpan> file:</p>

      <CodeNameBlock
        filename=".env.local"
        lang="text"
        code={`# Get your API key from https://openrouter.ai/keys
OPENROUTER_API_KEY=your_api_key_here`}
      />

      <p class="mt-4">
        <strong>Note:</strong> Sign up at
        <a
          href="https://openrouter.ai"
          class="underline"
          target="_blank"
          rel="noopener">OpenRouter</a
        >
        to get your free API key. OpenRouter provides access to multiple AI models
        through a single API.
      </p>
    </section>

    <section class="mb-8 sm:mb-10">
      <Subheading>Text Streaming Configuration</Subheading>
      <p class="mb-4 text-sm sm:text-base">
        Configure <CodeSpan>streamText</CodeSpan> and <CodeSpan
          >UIMessage[]</CodeSpan
        > to handle real-time AI responses:
      </p>

      <CodeNameBlock
        filename="ai-config.ts"
        lang="typescript"
        code={`// src/lib/ai-config.ts
import { createOpenAI } from '@ai-sdk/openai';

export const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const defaultModel = 'deepseek/deepseek-chat-v3.1:free';`}
      />

      <p class="mt-4">
        This configuration allows your app to stream AI responses in real-time,
        providing a smooth user experience similar to ChatGPT's interface.
      </p>
    </section>

    <section class="mb-8 sm:mb-10">
      <Subheading>File Structure & Backend API</Subheading>
      <p class="mb-4 text-sm sm:text-base">
        Create the backend API endpoint in <CodeSpan
          >src/routes/api/chat/+server.ts</CodeSpan
        >:
      </p>

      <CodeNameBlock
        filename="+server.ts"
        lang="typescript"
        code={`import { streamText } from 'ai';
import { openrouter, defaultModel } from '$lib/ai-config';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  const { messages } = await request.json();

  const result = await streamText({
    model: openrouter(defaultModel),
    messages,
    temperature: 0.7,
    maxTokens: 1000,
  });

  return result.toDataStreamResponse();
};`}
      />

      <p class="mt-4">
        This server endpoint handles incoming chat messages and streams AI
        responses back to the frontend using the AI SDK's streaming
        capabilities.
      </p>
    </section>

    <section class="mb-8 sm:mb-10">
      <Subheading>Frontend Chat Interface</Subheading>
      <p class="mb-4 text-sm sm:text-base">
        Build the chat interface in <CodeSpan>src/routes/+page.svelte</CodeSpan>
        using AI SDK's Svelte integration:
      </p>

      <CodeNameBlock
        filename="+page.svelte"
        lang="svelte"
        code={`\<script lang="ts"\>
  import { useChat } from 'ai/svelte';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Card } from '$lib/components/ui/card';

  const { input, handleSubmit, messages, isLoading } = useChat({
    api: '/api/chat'
  });
\<\/script\>

<div class="max-w-2xl mx-auto p-4">
  <h1 class="text-2xl font-bold mb-6">AI Chat Interface</h1>

  <!-- Messages Container -->
  <div class="space-y-4 mb-6 h-96 overflow-y-auto">
    {#each $messages as message}
      <Card class="p-4">
        <div class="font-semibold mb-2">
          {message.role === 'user' ? 'You' : 'AI'}
          {message.content}
        </div>
      </Card>
    {/each}
  </div>

  <!-- Input Form -->
  <form on:submit={handleSubmit} class="flex gap-2">
    <Input
      bind:value={$input}
      placeholder="Type your message..."
      disabled={$isLoading}
      class="flex-1"
    />
    <Button type="submit" disabled={$isLoading}>
      {$isLoading ? 'Sending...' : 'Send'}
    </Button>
  </form>
</div>`}
      />

      <p class="mt-4">
        The <CodeSpan>useChat</CodeSpan> hook from AI SDK automatically handles message
        state, streaming, and form submission, making it incredibly easy to build
        chat interfaces.
      </p>
    </section>

    <section class="mb-8 sm:mb-10">
      <Subheading>Actions, Prompts & Advanced Features</Subheading>
      <p class="mb-4 text-sm sm:text-base">
        Enhance your chat interface with actions, system prompts, and custom
        message handling:
      </p>

      <CodeNameBlock
        filename="enhanced-server.ts"
        lang="typescript"
        code={`// Enhanced server endpoint with system prompt
export const POST: RequestHandler = async ({ request }) => {
  const { messages } = await request.json();

  const result = await streamText({
    model: openrouter(defaultModel),
    system: 'You are a helpful AI assistant specialized in Svelte development.',
    messages,
    temperature: 0.7,
    maxTokens: 1000,
  });

  return result.toDataStreamResponse();
};`}
      />

      <p class="mt-4 mb-4">Add custom actions and message types:</p>

      <CodeNameBlock
        filename="enhanced-chat.svelte"
        lang="svelte"
        code={`\<script lang="ts"\>
  import { useChat } from 'ai/svelte';

  const { input, handleSubmit, messages, isLoading, append } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: '1',
        role: 'assistant',
        content: 'Hello! I\'m your Svelte AI assistant. How can I help you today?'
      }
    ]
  });

  // Custom action handlers
  const askAboutSvelte = () => {
    append({
      role: 'user',
      content: 'Tell me about Svelte best practices'
    });
  };
\<\/script\>

<!-- Add quick action buttons -->
<div class="flex gap-2 mb-4">
  <Button variant="outline" on:click={askAboutSvelte}>
    Ask about Svelte
  </Button>
  <Button variant="outline" on:click={() => append({
    role: 'user',
    content: 'Help me with AI integration'
  })}>
    AI Integration Help
  </Button>
</div>`}
      />
    </section>

    <Card class="p-5 bg-zinc-50/30 dark:bg-zinc-800/10 border-zinc-200 dark:border-zinc-700/40 mb-8">
      <div class="mb-4">
        <h3 class="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
          🎉 You're all set!
        </h3>
        <p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Your AI-powered Svelte app is ready with streaming responses and beautiful UI.
        </p>
      </div>

      <div class="flex flex-col sm:flex-row gap-3">
        <a
          href="/demo"
          class="inline-flex items-center justify-center px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-medium rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors group"
        >
          <svg class="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          Try Live Demo
        </a>

        <a
          href="https://github.com/SikandarJODD/ai-elements"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center justify-center px-4 py-2 bg-zinc-100 dark:bg-zinc-700/50 text-zinc-700 dark:text-zinc-300 text-sm font-medium rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors group"
        >
          <svg class="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          View Source Code
        </a>
      </div>
    </Card>

    <section class="mb-8 sm:mb-12">
      <Subheading>Free AI Models for Testing</Subheading>

      <div class="bg-zinc-50 dark:bg-zinc-900/50 border-l-4 border-zinc-300 dark:border-zinc-600 pl-4 py-3 mb-6 rounded-r">
        <p class="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
          Experiment with these free models from <strong class="text-zinc-900 dark:text-zinc-100">OpenRouter</strong> while
          building and testing your applications. Perfect for development and prototyping.
        </p>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <Card class="p-5 bg-zinc-50/50 dark:bg-zinc-800/20 border-zinc-200 dark:border-zinc-700/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 hover:shadow-sm transition-all">
          <div class="mb-4">
            <h4 class="font-semibold text-lg text-zinc-900 dark:text-zinc-100 mb-1">Fast & Efficient</h4>
            <p class="text-sm text-zinc-600 dark:text-zinc-400">Perfect for rapid prototyping and development</p>
          </div>
          <ul class="space-y-3">
            <li class="flex items-center justify-between group">
              <a
                href="https://openrouter.ai/models/x-ai/grok-4-fast:free"
                class="font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                target="_blank"
                rel="noopener"
              >
                x-ai/grok-4-fast:free
              </a>
              <svg class="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors opacity-0 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </li>
            <li class="flex items-center justify-between group">
              <a
                href="https://openrouter.ai/models/deepseek/deepseek-chat-v3.1:free"
                class="font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                target="_blank"
                rel="noopener"
              >
                deepseek/deepseek-chat-v3.1:free
              </a>
              <svg class="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors opacity-0 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </li>
            <li class="flex items-center justify-between group">
              <a
                href="https://openrouter.ai/models/z-ai/glm-4.5-air:free"
                class="font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                target="_blank"
                rel="noopener"
              >
                z-ai/glm-4.5-air:free
              </a>
              <svg class="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors opacity-0 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </li>
          </ul>
        </Card>

        <Card class="p-5 bg-zinc-50/50 dark:bg-zinc-800/20 border-zinc-200 dark:border-zinc-700/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 hover:shadow-sm transition-all">
          <div class="mb-4">
            <h4 class="font-semibold text-lg text-zinc-900 dark:text-zinc-100 mb-1">Specialized</h4>
            <p class="text-sm text-zinc-600 dark:text-zinc-400">Optimized for specific use cases</p>
          </div>
          <ul class="space-y-3">
            <li class="flex flex-col space-y-1.5">
              <div class="flex items-center justify-between group">
                <a
                  href="https://openrouter.ai/models/qwen/qwen3-coder:free"
                  class="font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  target="_blank"
                  rel="noopener"
                >
                  qwen/qwen3-coder:free
                </a>
                <svg class="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors opacity-0 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </div>
              <div class="flex items-center space-x-1">
                <svg class="w-3 h-3 text-zinc-500 dark:text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                <span class="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Code-focused</span>
              </div>
            </li>
            <li class="flex flex-col space-y-1.5">
              <div class="flex items-center justify-between group">
                <a
                  href="https://openrouter.ai/models/moonshotai/kimi-k2:free"
                  class="font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  target="_blank"
                  rel="noopener"
                >
                  moonshotai/kimi-k2:free
                </a>
                <svg class="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors opacity-0 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </div>
              <div class="flex items-center space-x-1">
                <svg class="w-3 h-3 text-zinc-500 dark:text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"/>
                </svg>
                <span class="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Long context</span>
              </div>
            </li>
          </ul>
        </Card>
      </div>
    </section>

    <section class="mb-8 sm:mb-12">
      <Subheading>Additional Resources</Subheading>
      <Card class="p-6 bg-zinc-50/30 dark:bg-zinc-800/10 border-zinc-200 dark:border-zinc-700/40">
        <div class="mb-5">
          <h3 class="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Essential Links</h3>
          <p class="text-sm text-zinc-600 dark:text-zinc-400">Key resources to enhance your AI development journey</p>
        </div>
        <div class="grid gap-3 sm:grid-cols-1">
          <div class="space-y-3">
            <a
              href="https://ai-sdk.dev/docs/getting-started/svelte"
              class="flex items-center justify-between p-4 bg-white dark:bg-zinc-800/40 rounded-lg border border-zinc-200 dark:border-zinc-700/50 hover:border-zinc-300 dark:hover:border-zinc-600/60 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-all duration-200 group"
              target="_blank"
              rel="noopener"
            >
              <div>
                <h4 class="font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 mb-1">
                  Vercel AI SDK - Svelte Documentation
                </h4>
                <p class="text-sm text-zinc-600 dark:text-zinc-400">Official guide for Svelte integration</p>
              </div>
              <svg class="w-4 h-4 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
            <a
              href="https://openrouter.ai"
              class="flex items-center justify-between p-4 bg-white dark:bg-zinc-800/40 rounded-lg border border-zinc-200 dark:border-zinc-700/50 hover:border-zinc-300 dark:hover:border-zinc-600/60 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-all duration-200 group"
              target="_blank"
              rel="noopener"
            >
              <div>
                <h4 class="font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 mb-1">
                  OpenRouter - AI Model Access
                </h4>
                <p class="text-sm text-zinc-600 dark:text-zinc-400">Access to multiple AI models with unified API</p>
              </div>
              <svg class="w-4 h-4 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
            <a
              href="https://www.shadcn-svelte.com"
              class="flex items-center justify-between p-4 bg-white dark:bg-zinc-800/40 rounded-lg border border-zinc-200 dark:border-zinc-700/50 hover:border-zinc-300 dark:hover:border-zinc-600/60 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-all duration-200 group"
              target="_blank"
              rel="noopener"
            >
              <div>
                <h4 class="font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 mb-1">
                  shadcn-svelte - UI Components
                </h4>
                <p class="text-sm text-zinc-600 dark:text-zinc-400">Beautiful and accessible UI component library</p>
              </div>
              <svg class="w-4 h-4 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
          </div>
        </div>
      </Card>
    </section>
    </article>

    <!-- Table of Contents -->
    <aside class="lg:col-span-1 order-first lg:order-last">
      <div class="sticky top-8 h-fit">
        <div class="lg:block">
          <div class="bg-muted/30 rounded-lg p-4 lg:p-6">
            <h3 class="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-4">
              On this page
            </h3>
            <Toc.Root toc={toc.current} />
          </div>
        </div>
      </div>
    </aside>
  </div>
</div>