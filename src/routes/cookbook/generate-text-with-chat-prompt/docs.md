# Generate Text with Chat Prompt

> Use chat-style prompts with `generateText` for more natural, conversational interactions.

## Overview

While `generateText` can work with simple text prompts, using chat-style prompts gives you more control over the conversation context. You can specify system messages, maintain conversation history, and create more sophisticated AI interactions.

## When to Use Chat Prompts

Chat prompts are ideal when you need:

- **System instructions** - Set behavior, persona, or constraints for the AI
- **Conversation history** - Include previous messages for context
- **Multi-turn interactions** - Build on previous exchanges
- **Role-based formatting** - Clearly separate user input from AI responses

## Server Implementation

The key is using the `messages` parameter with `ModelMessage` types:

```typescript
import { type ModelMessage, generateText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const messages: ModelMessage[] = [
  { role: "user", content: "What's 2 + 2?" },
];

const result = await generateText({
  model: openrouter("z-ai/glm-4.5-air:free"),
  system: "You are a helpful math tutor. Be concise.",
  messages: messages,
});
```

## Key Differences from Simple Prompts

| Simple Prompt | Chat Prompt |
|--------------|-------------|
| `prompt: "Hello"` | `messages: [{role: "user", content: "Hello"}]` |
| Single input | Full conversation history |
| No system message | System message support |
| Stateless | Stateful conversation |

## Multi-Turn Conversations

Pass the full conversation history to maintain context:

```typescript
const messages: ModelMessage[] = [
  { role: "user", content: "My name is Alex." },
  { role: "assistant", content: "Nice to meet you, Alex!" },
  { role: "user", content: "What's my name?" },
];

// AI will correctly respond with "Alex"
```

## Best Practices

1. **Keep system prompts focused** - Clear, concise instructions work best
2. **Trim conversation history** - For long chats, keep only relevant messages
3. **Handle edge cases** - Empty messages, rate limits, and errors
4. **Use appropriate models** - Some models handle chat better than others

## Related Recipes

- [Generate Text](/cookbook/generate-text) - Basic text generation
- [Stream Text with Chat Prompt](/cookbook/stream-text-with-chat-prompt) - Streaming with chat prompts
- [Markdown Chatbot](/cookbook/markdown-chatbot) - Rich markdown responses

