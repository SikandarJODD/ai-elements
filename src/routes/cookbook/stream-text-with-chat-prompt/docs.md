# Stream Text with Chat Prompt

> Combine streaming responses with chat-style prompts for responsive, context-aware conversations.

## Overview

This recipe combines two powerful patterns: **streaming** for real-time responses and **chat prompts** for conversational context. The result is an AI chat that remembers conversation history while showing responses as they're generated.

## Why Stream with Chat Prompts?

The combination gives you the best of both worlds:

| Feature          | Benefit                                          |
| ---------------- | ------------------------------------------------ |
| **Streaming**    | Immediate feedback, better perceived performance |
| **Chat prompts** | Context awareness, multi-turn conversations      |
| **Together**     | Responsive conversational AI that "remembers"    |

## Server Implementation

Use `streamText` with the `messages` parameter:

```typescript
import { type UIMessage, convertToModelMessages, streamText } from "ai";

const result = streamText({
  model: openrouter("z-ai/glm-4.5-air:free"),
  system: "You are a helpful assistant.",
  messages: convertToModelMessages(messages),
});

return result.toUIMessageStreamResponse();
```

## Key Functions

### `convertToModelMessages()`

Transforms `UIMessage[]` (from the client) into `ModelMessage[]` (for the model). This is essential when combining the `Chat` class with `streamText`.

### `toUIMessageStreamResponse()`

Returns a streaming response in the format expected by the `Chat` class. The client automatically updates as new tokens arrive.

## Client Implementation

The client uses the `Chat` class from `@ai-sdk/svelte`:

```typescript
import { Chat } from "@ai-sdk/svelte";
import { DefaultChatTransport } from "ai";

let chat = new Chat({
  transport: new DefaultChatTransport({
    api: "/api/chat",
  }),
});

// Send a message - response streams automatically
chat.sendMessage({ text: "Hello!" });
```

## Handling Message Parts

Each message contains `parts` that can be different types:

```svelte
{#each message.parts as part}
  {#if part.type === "text"}
    {part.text}
  {:else if part.type === "tool-..."}
    <!-- Handle tool calls -->
  {/if}
{/each}
```

## Best Practices

1. **Disable input while streaming** - Check `chat.status === "streaming"`
2. **Show streaming indicator** - Give users feedback that a response is coming
3. **Handle errors gracefully** - Check `chat.status === "error"` and `chat.error`
4. **Limit history** - For long conversations, trim older messages

## Related Recipes

- [Stream Text](/cookbook/stream-text) - Basic streaming without chat history
- [Generate Text with Chat Prompt](/cookbook/generate-text-with-chat-prompt) - Non-streaming chat
- [Markdown Chatbot](/cookbook/markdown-chatbot) - Render streamed markdown beautifully
