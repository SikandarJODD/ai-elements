# New Message

> Enhanced message component with branching, attachments, actions, and markdown rendering for AI chat interfaces.

## Installation

```bash
npx shadcn-svelte@latest add https://svelte-ai-elements.vercel.app/r/new-message.json
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
    MessageActions,
    MessageAction,
  } from "$lib/components/ai-elements/new-message";
  import Copy from "@lucide/svelte/icons/copy";
  import ThumbsUp from "@lucide/svelte/icons/thumbs-up";
</script>

<Message from="assistant">
  <MessageContent>
    <MessageResponse content="Here's my response!" />
  </MessageContent>
  <MessageActions>
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
</Message>
```

## Component API

### MessageActions

| Prop  | Type   | Default | Description            |
| ----- | ------ | ------- | ---------------------- |
| class | string | -       | Additional CSS classes |

### MessageAction

| Prop    | Type       | Default | Description            |
| ------- | ---------- | ------- | ---------------------- |
| tooltip | string     | -       | Tooltip text on hover  |
| label   | string     | -       | Accessible label       |
| onclick | () => void | -       | Click handler          |
| class   | string     | -       | Additional CSS classes |

### MessageBranch

| Prop  | Type   | Default | Description            |
| ----- | ------ | ------- | ---------------------- |
| class | string | -       | Additional CSS classes |

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

### MessageAttachment

| Prop     | Type       | Default | Description        |
| -------- | ---------- | ------- | ------------------ |
| name     | string     | -       | File name          |
| type     | string     | -       | MIME type          |
| size     | number     | -       | File size in bytes |
| onRemove | () => void | -       | Remove handler     |

## Features

- **Markdown Rendering**: Built-in markdown support with syntax highlighting
- **Message Branching**: Navigate between multiple response versions
- **File Attachments**: Display attached files with size and type info
- **Action Buttons**: Customizable action buttons with tooltips
- **Theme Support**: Automatic dark/light mode via mode-watcher
- **Svelte 5 Runes**: Built with $state, $derived, and context API

---

For more information, visit: https://svelte-ai-elements.vercel.app/components/new-message

## Component API

### Message

| Prop  | Type                  | Default | Description                    |
| ----- | --------------------- | ------- | ------------------------------ |
| from  | 'user' \| 'assistant' | -       | The role of the message sender |
| class | string                | -       | Additional CSS classes         |

### MessageContent

| Prop  | Type   | Default | Description            |
| ----- | ------ | ------- | ---------------------- |
| class | string | -       | Additional CSS classes |

### MessageResponse

| Prop    | Type   | Default | Description                |
| ------- | ------ | ------- | -------------------------- |
| content | string | -       | Markdown content to render |
| class   | string | -       | Additional CSS classes     |
