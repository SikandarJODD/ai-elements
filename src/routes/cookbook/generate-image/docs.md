# Generate Image

Generate images from text prompts using AI image generation models.

## Overview

Create images by describing what you want. The AI uses image generation models to create visuals from your text prompts.

## Image Generation Tool

```typescript
import { experimental_generateImage as generateImage, tool } from "ai";
import { z } from "zod";

export const generateImageTool = tool({
  description: "Generate an image",
  inputSchema: z.object({
    prompt: z.string().describe("The prompt to generate the image from"),
  }),
  execute: async ({ prompt }) => {
    const { image } = await generateImage({
      model: "openai/gpt-5-nano",
      prompt,
    });
    // In production, save to blob storage and return URL
    return { image: image.base64, prompt };
  },
});
```

## Server Endpoint

```typescript
import { streamText, convertToModelMessages, stepCountIs } from "ai";
import { generateImageTool } from "$lib/components/cookbook/tools";

const tools = { generateImageTool };

export const POST = async ({ request }) => {
  const { messages } = await request.json();

  const result = streamText({
    model: openrouter("openai/gpt-4o"),
    messages: convertToModelMessages(messages),
    tools,
    stopWhen: stepCountIs(5),
  });

  return result.toUIMessageStreamResponse();
};
```

## Displaying Generated Images

```svelte
{#if part.type === "tool-invocation" && part.toolInvocation.state === "result"}
  <img
    src={`data:image/png;base64,${part.toolInvocation.result.image}`}
    alt={part.toolInvocation.result.prompt}
  />
{/if}
```

## Key Concepts

1. **experimental_generateImage** - AI SDK's image generation function
2. **Base64 Images** - Images returned as base64 for immediate display
3. **Tool Integration** - Image generation wrapped as a callable tool
