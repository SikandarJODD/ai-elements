# Render Visual Interface

Render custom UI components for different tool outputs, including interactive elements.

## Overview

Instead of just showing text, render rich UI components based on tool results. Create weather cards, confirmation dialogs, or any custom interface elements.

## Client-Side Tool Handling

```typescript
let chat = new Chat<ChatMessage>({
  transport: new DefaultChatTransport({
    api: "/api/cookbook/render-visual-interface",
  }),
  
  // Auto-send when tools complete
  sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
  
  // Handle client-side tools
  async onToolCall({ toolCall }) {
    if (toolCall.toolName === "getLocation") {
      chat.addToolOutput({
        tool: "getLocation",
        toolCallId: toolCall.toolCallId,
        output: "San Francisco",
      });
    }
  },
});
```

## Rendering Tool Parts

```svelte
{#each message.parts as part}
  {#if part.type === "tool-getWeatherInformation"}
    <WeatherCard data={part.output} />
  {:else if part.type === "tool-askForConfirmation"}
    {#if part.state === "output-available"}
      <span>{part.output}</span>
    {:else}
      <button onclick={() => chat.addToolOutput({...})}>Confirm</button>
    {/if}
  {/if}
{/each}
```

## Key Concepts

1. **Tool Part Types** - Each tool has its own `part.type` like `tool-getWeather`
2. **State Handling** - Check `part.state` for "output-available" or pending
3. **Interactive Tools** - Some tools require user input before completion
4. **addToolOutput** - Programmatically provide tool results

