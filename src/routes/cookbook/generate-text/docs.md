# Generate Text - Cookbook Recipe

> Learn how to generate text using AI models with simple prompts in SvelteKit

## Overview

A common use case in AI applications is generating text based on a prompt. Whether you're building a chatbot, content generator, or question-answering system, the `generateText` function provides a simple way to get AI-generated responses.

This recipe shows you how to create a basic text generation feature in SvelteKit using the Vercel AI SDK with OpenAI's GPT-4 model.

## Prerequisites

- A SvelteKit project set up
- AI SDK installed: `npm install ai @ai-sdk/openai`
- An OpenAI API key (get one from https://platform.openai.com)
- Basic understanding of Svelte 5 runes (`$state`)

## Client Component

```svelte
<script lang="ts">
  let generation = $state("");
  let isLoading = $state(false);

  async function handleGenerate() {
    isLoading = true;

    const response = await fetch("/api/completion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: "Why is the sky blue?",
      }),
    });

    const data = await response.json();
    generation = data.text;
    isLoading = false;
  }
</script>

<div>
  <button onclick={handleGenerate}> Generate </button>

  {#if isLoading}
    Loading...
  {:else}
    {generation}
  {/if}
</div>
```

## Server Route Handler

```typescript
// src/routes/api/completion/+server.ts
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
  const { prompt } = await request.json();

  const { text } = await generateText({
    model: openai("gpt-4o"),
    system: "You are a helpful assistant.",
    prompt,
  });

  return json({ text });
};
```

## Key Concepts

- **Model Selection**: We use `openai('gpt-4o')` to specify the AI model. You can swap this for other models like `gpt-3.5-turbo` or models from other providers.
- **System Prompt**: The `system` parameter sets the AI's behavior and personality. This helps guide the responses.
- **User Prompt**: The `prompt` parameter contains the user's input or question.
- **Synchronous Generation**: Unlike streaming, `generateText` waits for the complete response before returning.

## Next Steps

- [Generate Text with Chat Prompt](/cookbook/generate-text-with-chat-prompt) - Use conversational context
- [Stream Text](/cookbook/stream-text) - Stream responses in real-time for better UX
- [Generate Object](/cookbook/generate-object) - Generate structured data instead of plain text

## Resources

- [Vercel AI SDK Documentation](https://ai-sdk.dev)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [SvelteKit Documentation](https://kit.svelte.dev)

## Tags

text, generation, basics, ai-sdk, openai, sveltekit

## Example

View the complete example on GitHub: https://github.com/vercel/ai/blob/main/examples/next-openai-pages/pages/basics/generate-text/index.tsx
