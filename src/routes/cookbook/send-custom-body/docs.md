# Send Custom Body

Send additional data alongside chat messages to your API endpoint.

## Overview

Sometimes you need to send extra data with your chat requests—user preferences, session info, or custom parameters. The `body` option in `DefaultChatTransport` lets you include any additional fields.

## Client Setup

```typescript
import { Chat } from "@ai-sdk/svelte";
import { DefaultChatTransport } from "ai";

let chat = new Chat({
  transport: new DefaultChatTransport({
    api: "/api/cookbook/send-custom-body",
    body: {
      name: "Alice",
      age: 25,
      theme: "dark",
    },
  }),
});
```

## Server Endpoint

```typescript
export const POST = async ({ request }) => {
  // Extract custom fields alongside messages
  const { messages, name, age } = await request.json();

  console.log("User:", name, "Age:", age);

  const result = streamText({
    model: openrouter("z-ai/glm-4.5-air:free"),
    system: `You are talking to ${name} who is ${age} years old.`,
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
};
```

## Key Concepts

1. **body option** - Add any custom fields to every request
2. **Type Safety** - Destructure expected fields on the server
3. **Dynamic Context** - Use custom data to personalize AI responses
