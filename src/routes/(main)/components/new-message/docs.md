# New Message

> A comprehensive suite of components for displaying chat messages, including message rendering, branching, actions, and markdown responses.

## Installation

```bash
npx shadcn-svelte@latest add https://ai-elements.vercel.app/r/new-message.json
```

## Usage

### Basic Example

```svelte
<script lang="ts">
  import {
    Message,
    MessageContent,
    MessageResponse,
  } from "$lib/components/ai-elements/new-message";
</script>

<Message from="user">
  <MessageContent>
    <MessageResponse content="Hello! How can I help you today?" />
  </MessageContent>
</Message>

<Message from="assistant">
  <MessageContent>
    <MessageResponse
      content="I'm here to help! What would you like to know?"
    />
  </MessageContent>
</Message>
```

### With Attachments

```svelte
<script lang="ts">
  import {
    Message,
    MessageContent,
    MessageResponse,
    MessageAttachments,
    MessageAttachment,
  } from "$lib/components/ai-elements/new-message";
</script>

<Message from="user">
  <MessageAttachments>
    <MessageAttachment
      name="document.pdf"
      type="application/pdf"
      size={128000}
    />
    <MessageAttachment name="image.png" type="image/png" size={245000} />
  </MessageAttachments>
  <MessageContent>
    <MessageResponse content="Please review these files" />
  </MessageContent>
</Message>
```

### With Branching

```svelte
<script lang="ts">
  import {
    Message,
    MessageContent,
    MessageResponse,
    MessageBranch,
    MessageBranchContent,
    MessageBranchSelector,
    MessageBranchPrevious,
    MessageBranchNext,
    MessageBranchPage,
  } from "$lib/components/ai-elements/new-message";

  const versions = [
    { id: "1", content: "First response version..." },
    { id: "2", content: "Second response version..." },
  ];
</script>

<Message from="assistant">
  <MessageBranch>
    <MessageBranchContent content={versions}>
      {#snippet renderItem(version)}
        <MessageContent>
          <MessageResponse content={version.content} />
        </MessageContent>
      {/snippet}
    </MessageBranchContent>
    <MessageBranchSelector>
      <MessageBranchPrevious />
      <MessageBranchPage />
      <MessageBranchNext />
    </MessageBranchSelector>
  </MessageBranch>
</Message>
```

### With Actions

```svelte
<script lang="ts">
  import {
    Message,
    MessageContent,
    MessageResponse,
    MessageToolbar,
    MessageActions,
    MessageAction,
  } from "$lib/components/ai-elements/new-message";
  import Copy from "@lucide/svelte/icons/copy";
  import ThumbsUp from "@lucide/svelte/icons/thumbs-up";
  import RefreshCcw from "@lucide/svelte/icons/refresh-ccw";
</script>

<Message from="assistant">
  <MessageContent>
    <MessageResponse content="Here's my response!" />
  </MessageContent>
  <MessageToolbar>
    <MessageActions>
      <MessageAction
        tooltip="Regenerate"
        onclick={() => console.log("regenerate")}
      >
        <RefreshCcw class="size-4" />
      </MessageAction>
      <MessageAction tooltip="Like" onclick={() => console.log("liked")}>
        <ThumbsUp class="size-4" />
      </MessageAction>
      <MessageAction
        tooltip="Copy"
        onclick={() => navigator.clipboard.writeText("...")}
      >
        <Copy class="size-4" />
      </MessageAction>
    </MessageActions>
  </MessageToolbar>
</Message>
```

### Usage with AI SDK

Integrate with Vercel AI SDK v5's `Chat` class for real-time streaming responses.

```svelte
<script lang="ts">
  import { Chat } from "@ai-sdk/svelte";
  import {
    Message,
    MessageContent,
    MessageResponse,
    MessageToolbar,
    MessageActions,
    MessageAction,
  } from "$lib/components/ai-elements/new-message";
  import Copy from "@lucide/svelte/icons/copy";
  import RefreshCcw from "@lucide/svelte/icons/refresh-ccw";

  let chat = new Chat({});

  function handleCopy(content: string) {
    navigator.clipboard.writeText(content);
  }
</script>

<div class="flex flex-col gap-4 p-4">
  {#each chat.messages as message (message.id)}
    <Message from={message.role}>
      <MessageContent>
        {#each message.parts as part, i (i)}
          {#if part.type === "text"}
            <MessageResponse content={part.text} />
          {/if}
        {/each}
      </MessageContent>
      {#if message.role === "assistant"}
        <MessageToolbar>
          <MessageActions>
            <MessageAction tooltip="Regenerate" onclick={() => chat.reload()}>
              <RefreshCcw class="size-4" />
            </MessageAction>
            <MessageAction
              tooltip="Copy"
              onclick={() => handleCopy(message.content || "")}
            >
              <Copy class="size-4" />
            </MessageAction>
          </MessageActions>
        </MessageToolbar>
      {/if}
    </Message>
  {/each}
</div>
```

## Component Structure

```
Message
├── MessageAttachments
│   └── MessageAttachment
│
├── MessageContent
│   └── MessageResponse (markdown)
│
├── MessageBranch (for multiple versions)
│   ├── MessageBranchContent
│   └── MessageBranchSelector
│       ├── MessageBranchPrevious
│       ├── MessageBranchPage
│       └── MessageBranchNext
│
├── MessageToolbar
│   └── MessageActions
│       └── MessageAction (retry, like, copy...)
```

## Component API

### Message

| Prop     | Type                  | Default | Description                                      |
| -------- | --------------------- | ------- | ------------------------------------------------ |
| from     | 'user' \| 'assistant' | -       | The role of the message sender                   |
| children | Snippet               | -       | Child components (MessageContent, Actions, etc.) |
| class    | string                | -       | Additional CSS classes                           |

### MessageContent

| Prop     | Type    | Default | Description                            |
| -------- | ------- | ------- | -------------------------------------- |
| children | Snippet | -       | Content to render (typically Response) |
| class    | string  | -       | Additional CSS classes                 |

### MessageResponse

| Prop    | Type   | Default | Description                                |
| ------- | ------ | ------- | ------------------------------------------ |
| content | string | -       | Markdown content to render with highlights |
| class   | string | -       | Additional CSS classes                     |

### MessageToolbar

| Prop     | Type    | Default | Description               |
| -------- | ------- | ------- | ------------------------- |
| children | Snippet | -       | MessageActions components |
| class    | string  | -       | Additional CSS classes    |

### MessageActions

| Prop     | Type    | Default | Description            |
| -------- | ------- | ------- | ---------------------- |
| children | Snippet | -       | MessageAction children |
| class    | string  | -       | Additional CSS classes |

### MessageAction

| Prop    | Type       | Default | Description            |
| ------- | ---------- | ------- | ---------------------- |
| tooltip | string     | -       | Tooltip text on hover  |
| label   | string     | -       | Accessible label       |
| onclick | () => void | -       | Click handler          |
| class   | string     | -       | Additional CSS classes |

### MessageBranch

| Prop          | Type    | Default | Description                  |
| ------------- | ------- | ------- | ---------------------------- |
| defaultBranch | number  | 0       | Initial branch index to show |
| children      | Snippet | -       | BranchContent and Selector   |
| class         | string  | -       | Additional CSS classes       |

### MessageBranchContent

| Prop       | Type                 | Default | Description                 |
| ---------- | -------------------- | ------- | --------------------------- |
| content    | T[]                  | -       | Array of content items      |
| renderItem | Snippet<[T, number]> | -       | Snippet to render each item |
| class      | string               | -       | Additional CSS classes      |

### MessageBranchSelector

| Prop  | Type   | Default | Description            |
| ----- | ------ | ------- | ---------------------- |
| class | string | -       | Additional CSS classes |

### MessageAttachments

| Prop     | Type    | Default | Description                  |
| -------- | ------- | ------- | ---------------------------- |
| children | Snippet | -       | MessageAttachment components |
| class    | string  | -       | Additional CSS classes       |

### MessageAttachment

| Prop     | Type       | Default | Description            |
| -------- | ---------- | ------- | ---------------------- |
| name     | string     | -       | File name to display   |
| type     | string     | -       | MIME type              |
| size     | number     | -       | File size in bytes     |
| onRemove | () => void | -       | Remove button handler  |
| class    | string     | -       | Additional CSS classes |

## Features

- **Markdown Rendering**: Built-in markdown support with syntax highlighting via `svelte-streamdown`
- **Message Branching**: Navigate between multiple AI response versions
- **File Attachments**: Display attached files with file type icons, names, and sizes
- **Action Buttons**: Customizable action buttons with tooltips for copy, retry, like, dislike
- **Theme Support**: Automatic dark/light mode via `mode-watcher`
- **Svelte 5 Runes**: Built with `$state`, `$derived`, and class-based context for state management
- **Minimalist Design**: Flat design with user messages in secondary background, assistant messages full-width

---

For more information, visit: https://ai-elements.vercel.app/components/new-message
