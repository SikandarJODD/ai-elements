# Call Tool with Multiple Steps

Chain multiple tool calls where each step depends on the previous result.

## Overview

Sometimes the AI needs to call multiple tools in sequence. For example: first get the user's location, then use that location to fetch the weather.

## Multiple Tools Setup

```typescript
import { getLocation, getWeather } from "$lib/components/cookbook/tools";

const tools = {
  getLocation, // Step 1: Get location
  getWeather, // Step 2: Use location for weather
};
```

## How It Works

1. User asks: "What's the weather where I am?"
2. AI calls `getLocation` → returns "San Francisco"
3. AI calls `getWeather({ city: "San Francisco" })` → returns weather
4. AI formulates final response

## Server Endpoint

```typescript
import { streamText, convertToModelMessages, stepCountIs } from "ai";
import { getLocation, getWeather } from "$lib/components/cookbook/tools";

const tools = { getLocation, getWeather };

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

1. **Tool Chaining** - AI automatically uses output from one tool as input for another
2. **Step Limit** - `stepCountIs(5)` prevents runaway tool chains
3. **Autonomous Decisions** - AI decides the order and when to stop
