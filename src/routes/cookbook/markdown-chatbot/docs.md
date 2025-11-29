# Markdown Chatbot

> Render AI responses in beautiful markdown with syntax-highlighted code blocks, lists, tables, and more.

## Overview

AI models often return responses in markdown format - especially when explaining code, providing instructions, or formatting data. This recipe shows how to render that markdown beautifully using the `svelte-streamdown` library, which handles streaming markdown content with proper syntax highlighting.

## Why Markdown Rendering Matters

Raw markdown is hard to read:

```
**Important:** Use `npm install` to add dependencies.
```

Rendered markdown is clear and professional:

**Important:** Use `npm install` to add dependencies.

## The Markdown Component

We use `svelte-streamdown` for optimal streaming markdown:

```svelte
<script lang="ts">
  import { Streamdown } from "svelte-streamdown";
  import { mode } from "mode-watcher";
</script>

<Streamdown
  content={text}
  shikiTheme={mode.current === "dark"
    ? "github-dark-default"
    : "github-light-default"}
  baseTheme="shadcn"
/>
```

## Key Features

| Feature                 | Description                                          |
| ----------------------- | ---------------------------------------------------- |
| **Streaming Support**   | Renders markdown as it arrives, not after completion |
| **Syntax Highlighting** | Shiki-powered code highlighting for 100+ languages   |
| **Theme Aware**         | Automatically adapts to light/dark mode              |
| **Safe HTML**           | DOMPurify prevents XSS attacks                       |

## System Prompt for Better Formatting

Instruct the AI to use markdown effectively:

```typescript
const result = streamText({
  model: openrouter("z-ai/glm-4.5-air:free"),
  system: `You are a helpful assistant that provides well-formatted markdown.
Use code blocks with language identifiers, bullet lists, and headers.`,
  messages: convertToModelMessages(messages),
});
```

## Rendering Message Parts

Handle text parts and render them with the Markdown component:

```svelte
{#each message.parts as part}
  {#if part.type === "text"}
    <Markdown content={part.text} />
  {/if}
{/each}
```

## Best Practices

1. **Use dark/light themes** - Match your app's color scheme
2. **Add prose classes** - Tailwind prose classes style markdown elements
3. **Handle empty content** - Show placeholder when no content yet
4. **Stream smoothly** - svelte-streamdown handles partial markdown gracefully

## Dependencies

```bash
npm install svelte-streamdown mode-watcher
```

## Related Recipes

- [Stream Text](/cookbook/stream-text) - Basic streaming
- [Stream Text with Chat Prompt](/cookbook/stream-text-with-chat-prompt) - Streaming with history
- [Generate Text](/cookbook/generate-text) - Non-streaming markdown
