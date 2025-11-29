# Stream Text - Cookbook Recipe

> Stream text responses in real-time for better user experience

## Overview

Streaming is essential for building responsive AI applications. Instead of waiting for the complete response, users see text appearing character by character, providing immediate feedback and a more engaging experience.

This recipe shows you how to implement real-time text streaming in SvelteKit using the Vercel AI SDK's `streamText` function with the Chat class from `@ai-sdk/svelte`.

## Prerequisites

- A SvelteKit project set up
- AI SDK installed: `npm install ai @ai-sdk/svelte`
- An OpenRouter API key (get one from https://openrouter.ai)
- Basic understanding of Svelte 5 runes

## Client Component

```svelte
<script lang="ts">
  import { Chat } from "@ai-sdk/svelte";
  import { DefaultChatTransport } from "ai";

  let chat = new Chat({
    transport: new DefaultChatTransport({
      api: "/api/cookbook/stream-text",
    }),
  });

  let input = $state("");

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    chat.sendMessage({ text: input });
    input = "";
  }
</script>

<form onsubmit={handleSubmit}>
  <input bind:value={input} placeholder="Type your message..." />
  <button type="submit">Send</button>
</form>

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
```

## Server Route Handler

```typescript
// src/routes/api/cookbook/stream-text/+server.ts
import { type UIMessage, convertToModelMessages, streamText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import type { RequestHandler } from "./$types";
import { OPENROUTER_API_KEY } from "$env/static/private";

export const POST: RequestHandler = async ({ request }) => {
  const { messages }: { messages: UIMessage[] } = await request.json();

  const openrouter = createOpenRouter({
    apiKey: OPENROUTER_API_KEY,
  });

  const result = streamText({
    model: openrouter("z-ai/glm-4.5-air:free"),
    system: "You are a helpful assistant. Respond in 100 words.",
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
};
```

## Key Concepts

- **Chat Class**: The `Chat` class from `@ai-sdk/svelte` manages conversation state and provides reactive updates.
- **DefaultChatTransport**: Handles the HTTP connection to your API endpoint.
- **streamText**: Server-side function that streams the AI response back to the client.
- **toUIMessageStreamResponse**: Converts the stream into a format the Chat class can consume.
- **Message Parts**: Each message contains parts (text, tools, etc.) that can be rendered individually.

## Next Steps

- [Stream Text with Image Prompt](/cookbook/stream-text-with-image-prompt) - Add image inputs to streaming
- [Call Tools](/cookbook/call-tool) - Add tool calling to your streaming chat
- [Generate Object](/cookbook/generate-object) - Generate structured data instead of text

## Resources

- [Vercel AI SDK Documentation](https://ai-sdk.dev)
- [AI SDK Svelte Integration](https://ai-sdk.dev/docs/getting-started/svelte)
- [SvelteKit Documentation](https://kit.svelte.dev)

## Tags

streaming, text, real-time, chat, ai-sdk, sveltekit
