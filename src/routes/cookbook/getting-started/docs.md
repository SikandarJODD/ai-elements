# Getting Started

Build AI-powered Svelte applications with the Vercel AI SDK.

## Overview

This cookbook shows you how to integrate AI into your SvelteKit applications. You'll learn streaming text, generating objects, calling tools, and more.

## Prerequisites

- Node.js 18+ installed
- A SvelteKit project
- An OpenRouter API key (free tier available)

## Installation

```bash
npm install ai @ai-sdk/svelte @openrouter/ai-sdk-provider zod
```

## Environment Setup

Create a `.env` file in your project root:

```env
OPENROUTER_API_KEY=sk-or-v1-your-api-key-here
```

Get your API key at https://openrouter.ai/keys

## AI Configuration

Create a shared config file for your AI setup:

```typescript
// src/lib/config/ai-config.ts
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { OPENROUTER_API_KEY } from "$env/static/private";

export const openrouter = createOpenRouter({
  apiKey: OPENROUTER_API_KEY,
});

export const defaultModel = "z-ai/glm-4.5-air:free";
```

## Your First API Endpoint

```typescript
// src/routes/api/chat/+server.ts
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { openrouter, defaultModel } from "$lib/config/ai-config";

export const POST = async ({ request }) => {
  const { messages }: { messages: UIMessage[] } = await request.json();

  const result = streamText({
    model: openrouter(defaultModel),
    system: "You are a helpful assistant.",
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
};
```

## Your First Chat Component

```svelte
<script lang="ts">
  import { Chat } from "@ai-sdk/svelte";
  import { DefaultChatTransport } from "ai";

  let chat = new Chat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  let input = $state("");

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    chat.sendMessage({ text: input });
    input = "";
  }
</script>

<div>
  {#each chat.messages as message}
    <div>
      <strong>{message.role}:</strong>
      {#each message.parts as part}
        {#if part.type === "text"}
          {part.text}
        {/if}
      {/each}
    </div>
  {/each}

  <form onsubmit={handleSubmit}>
    <input bind:value={input} placeholder="Say something..." />
    <button type="submit">Send</button>
  </form>
</div>
```

## Next Steps

- [Stream Text](/cookbook/stream-text) - Real-time streaming responses
- [Generate Object](/cookbook/generate-object) - Type-safe structured data
- [Call Tool](/cookbook/call-tool) - Enable AI to call functions

