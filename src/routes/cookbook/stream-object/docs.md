# Stream Object

Stream structured JSON objects progressively with real-time updates using the Vercel AI SDK.

## Overview

The `streamObject` function streams structured data as it's being generated. This provides:

- Real-time UI updates as data arrives
- Better perceived performance for users
- Progressive rendering of complex objects

## Server Endpoint

```typescript
import { streamObject } from "ai";
import { z } from "zod";

const schema = z.object({
  notifications: z.array(
    z.object({
      name: z.string(),
      message: z.string(),
    })
  ),
});

export const POST = async ({ request }) => {
  const { prompt } = await request.json();

  const result = streamObject({
    model: openrouter("z-ai/glm-4.5-air:free"),
    schema,
    prompt,
  });

  return result.toTextStreamResponse();
};
```

## Client Component

```svelte
<script lang="ts">
  import { experimental_useObject as useObject } from "@ai-sdk/svelte";

  const { object, submit, isLoading } = useObject({
    api: "/api/cookbook/stream-object",
    schema: notificationSchema,
  });
</script>

{#each $object?.notifications ?? [] as notification}
  <div>{notification.name}: {notification.message}</div>
{/each}
```

## Key Concepts

1. **useObject Hook** - Svelte hook for streaming objects
2. **Progressive Updates** - UI updates as each field arrives
3. **Partial Objects** - Handle incomplete data during streaming
4. **toTextStreamResponse()** - Streams object as text chunks
