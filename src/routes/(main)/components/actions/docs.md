# Actions

> A flexible row of action buttons for AI responses with common actions like retry, like, dislike, copy, and share.

## Installation

```bash
npx shadcn-svelte@latest add https://ai-elements.vercel.app/r/action.json
```

## Usage

### Basic Example

```svelte
<script lang="ts">
  import { Actions, Action } from "$lib/components/ai-elements/action";
  import { Copy, ThumbsUp, ThumbsDown, RotateCw } from "lucide-svelte";
</script>

<Actions>
  <Action tooltip="Copy">
    <Copy class="size-4" />
  </Action>
  <Action tooltip="Like">
    <ThumbsUp class="size-4" />
  </Action>
  <Action tooltip="Dislike">
    <ThumbsDown class="size-4" />
  </Action>
  <Action tooltip="Retry">
    <RotateCw class="size-4" />
  </Action>
</Actions>
```

### With Click Handlers

```svelte
<script lang="ts">
  import { Actions, Action } from "$lib/components/ai-elements/action";
  import { Copy, RotateCw } from "lucide-svelte";

  function handleCopy() {
    console.log("Copied!");
  }

  function handleRetry() {
    console.log("Retrying...");
  }
</script>

<Actions>
  <Action tooltip="Copy" onclick={handleCopy}>
    <Copy class="size-4" />
  </Action>
  <Action tooltip="Retry" onclick={handleRetry}>
    <RotateCw class="size-4" />
  </Action>
</Actions>
```

### With AI SDK

```svelte
<script lang="ts">
  import { Chat } from "@ai-sdk/svelte";
  import { Actions, Action } from "$lib/components/ai-elements/action";
  import { Copy, RotateCw } from "lucide-svelte";

  const chat = new Chat();

  function copyMessage(content: string) {
    navigator.clipboard.writeText(content);
  }

  function retryLastMessage() {
    const lastUserMessage = chat.messages
      .filter((m) => m.role === "user")
      .pop();
    if (lastUserMessage) {
      chat.reload();
    }
  }
</script>

<div>
  {#each chat.messages as message}
    {#if message.role === "assistant"}
      <div>
        <p>{message.content}</p>
        <Actions>
          <Action tooltip="Copy" onclick={() => copyMessage(message.content)}>
            <Copy class="size-4" />
          </Action>
          <Action tooltip="Retry" onclick={retryLastMessage}>
            <RotateCw class="size-4" />
          </Action>
        </Actions>
      </div>
    {/if}
  {/each}
</div>
```

### Different Variants

```svelte
<script lang="ts">
  import { Actions, Action } from "$lib/components/ai-elements/action";
  import { Copy, Trash } from "lucide-svelte";
</script>

<Actions>
  <Action tooltip="Copy" variant="ghost">
    <Copy class="size-4" />
  </Action>
  <Action tooltip="Delete" variant="destructive">
    <Trash class="size-4" />
  </Action>
</Actions>
```

## Component API

### Actions

| Prop         | Type                           | Default | Description                                      |
| ------------ | ------------------------------ | ------- | ------------------------------------------------ |
| children     | Snippet                        | -       | Child Action components to render                |
| class        | string                         | -       | Additional CSS classes to apply to the container |
| ...restProps | HTMLAttributes<HTMLDivElement> | -       | All other div props are supported                |

### Action

| Prop         | Type                                                                        | Default | Description                                                                 |
| ------------ | --------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------- |
| tooltip      | string                                                                      | -       | Tooltip text to display on hover                                            |
| label        | string                                                                      | -       | Accessible label for screen readers (falls back to tooltip if not provided) |
| children     | Snippet                                                                     | -       | Icon or content to render inside the button                                 |
| class        | string                                                                      | -       | Additional CSS classes to apply to the button                               |
| variant      | 'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link' | 'ghost' | Visual style variant of the button                                          |
| size         | 'default' \| 'sm' \| 'lg' \| 'icon'                                         | 'sm'    | Size of the button                                                          |
| onclick      | (event: MouseEvent) => void                                                 | -       | Click event handler                                                         |
| disabled     | boolean                                                                     | -       | Whether the button is disabled                                              |
| ...restProps | ButtonProps                                                                 | -       | All other Button component props are supported                              |

## Features

- **Flexible actions**: Support for any icon or content
- **Tooltips**: Built-in tooltip support for better UX
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Variants**: Multiple button variants for different use cases
- **AI SDK integration**: Works seamlessly with AI SDK chat interfaces
- **Customizable**: Easy to style and extend with custom classes

---

For more information, visit: https://svelte-ai-elements.vercel.app/components/actions
