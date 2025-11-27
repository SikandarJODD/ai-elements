# Generate Object

Generate structured JSON objects with type-safe schemas using the Vercel AI SDK.

## Overview

The `generateObject` function allows you to generate structured data that conforms to a Zod schema. This is perfect for:

- Generating typed data from AI responses
- Creating structured content like notifications, cards, lists
- Extracting structured information from text

## Server Endpoint

```typescript
import { generateObject } from "ai";
import { z } from "zod";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const schema = z.object({
  notifications: z.array(
    z.object({
      name: z.string().describe("Name of a fictional person."),
      message: z.string().describe("Do not use emojis or links."),
      minutesAgo: z.number(),
    })
  ),
});

export const POST = async ({ request }) => {
  const { prompt } = await request.json();

  const result = await generateObject({
    model: openrouter("z-ai/glm-4.5-air:free"),
    schema,
    prompt,
  });

  return result.toJsonResponse();
};
```

## Client Component

```svelte
<script lang="ts">
  let notifications = $state([]);

  async function generate() {
    const res = await fetch("/api/cookbook/generate-object", {
      method: "POST",
      body: JSON.stringify({ prompt: "New activity" }),
    });
    const data = await res.json();
    notifications = data.notifications;
  }
</script>
```

## Key Concepts

1. **Zod Schema** - Define the structure of your expected output
2. **Type Safety** - Get fully typed responses that match your schema
3. **Descriptions** - Add `.describe()` to help the AI understand field purposes
4. **toJsonResponse()** - Returns structured JSON to the client

