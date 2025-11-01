# Response

> A component that renders Markdown responses from large language models with syntax highlighting and streaming support.

## Installation

```bash
npx shadcn-svelte@latest add https://ai-elements.vercel.app/r/response.json
```

## CSS Configuration

Add the following imports to your `app.css` file to include Tailwind CSS and Streamdown styles:

```css
@import "tailwindcss";
/* Add Streamdown styles to your Tailwind build */
@source "../node_modules/svelte-streamdown/**/*";
```

## Usage

### Basic Example

```svelte
<script lang="ts">
  import { Response } from "$lib/components/ai-elements/response";

  const content = `# Hello World

This is a **markdown** response with:
- Lists
- Code blocks
- And more!

\`\`\`javascript
console.log("Hello, world!");
\`\`\`
`;
</script>

<Response {content} />
```

### With Streaming

```svelte
<script lang="ts">
  import { Response } from "$lib/components/ai-elements/response";
  import { Chat } from "@ai-sdk/svelte";

  const chat = new Chat();
</script>

<div>
  {#each chat.messages as message}
    {#if message.role === "assistant"}
      <Response content={message.content} />
    {/if}
  {/each}
</div>
```

### Custom Theme

```svelte
<script lang="ts">
  import { Response } from "$lib/components/ai-elements/response";

  const content = "# Custom Theme\n\nThis uses a custom base theme.";
</script>

<Response {content} baseTheme="github" />
```

### With Custom Styling

```svelte
<script lang="ts">
  import { Response } from "$lib/components/ai-elements/response";

  const content = "# Styled Response\n\nThis has custom styling applied.";
</script>

<Response {content} class="rounded-lg border p-4" />
```

## Component API

### Response

| Prop         | Type            | Default  | Description                                                                  |
| ------------ | --------------- | -------- | ---------------------------------------------------------------------------- |
| content      | string          | -        | Markdown content to render                                                   |
| class        | string          | -        | Additional CSS classes to apply to the response container                    |
| shikiTheme   | string          | -        | Shiki theme for code syntax highlighting (auto-set based on dark/light mode) |
| baseTheme    | string          | 'shadcn' | Base theme for markdown styling                                              |
| ...restProps | StreamdownProps | -        | All other Streamdown component props are supported                           |

## Features

- **Markdown rendering**: Full markdown support with syntax highlighting
- **Streaming support**: Works seamlessly with streaming AI responses
- **Code highlighting**: Automatic syntax highlighting for code blocks using Shiki
- **Theme support**: Automatic dark/light mode theme switching
- **Customizable**: Easy to style and extend with custom classes
- **Built on Streamdown**: Leverages the powerful svelte-streamdown library

## Dependencies

This component requires:

- `svelte-streamdown` - For markdown rendering and streaming support
- `shiki` - For syntax highlighting in code blocks

---

For more information, visit: https://svelte-ai-elements.vercel.app/components/response
