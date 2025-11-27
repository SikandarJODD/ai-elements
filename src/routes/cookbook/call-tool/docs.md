# Call Tool

Enable AI to call custom tools/functions to perform actions or retrieve data.

## Overview

Tools let the AI interact with external systems, APIs, or perform computations. The AI decides when and how to use tools based on the conversation.

## Defining a Tool

```typescript
import { tool } from "ai";
import { z } from "zod";

export const getWeather = tool({
  description: "Get the weather for a location",
  inputSchema: z.object({
    city: z.string().describe("The city to get weather for"),
    unit: z.enum(["C", "F"]).describe("Temperature unit"),
  }),
  execute: async ({ city, unit }) => {
    // Call real weather API here
    return `It is 24°${unit} and Sunny in ${city}!`;
  },
});
```

## Server Endpoint

```typescript
import { streamText, convertToModelMessages, stepCountIs } from "ai";
import { getWeather } from "$lib/components/cookbook/tools";

const tools = { getWeather };

export const POST = async ({ request }) => {
  const { messages } = await request.json();

  const result = streamText({
    model: openrouter("z-ai/glm-4.5-air:free"),
    messages: convertToModelMessages(messages),
    tools,
    stopWhen: stepCountIs(5),
  });

  return result.toUIMessageStreamResponse();
};
```

## Key Concepts

1. **tool()** - Define tools with description, schema, and execute function
2. **inputSchema** - Zod schema for type-safe tool parameters
3. **stopWhen** - Prevent infinite tool loops
4. **Tool Invocation Parts** - Access tool calls in message parts

