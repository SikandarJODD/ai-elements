# New Message

> Composable chat message primitives for Svelte with markdown responses, attachments, branching, and action slots.

## Installation

```bash
npx shadcn-svelte@latest add https://svelte-ai-elements.vercel.app/r/message.json
```

## Usage

### Basic Example

```svelte
<script lang="ts">
  import {
    Message,
    MessageContent,
    MessageResponse,
  } from "$lib/components/ai-elements/message";
</script>

<Message from="user">
  <MessageContent>How do I compose the new message primitives?</MessageContent>
</Message>

<Message from="assistant">
  <MessageContent>
    <MessageResponse
      content={`Use \`Message\` as the wrapper, \`MessageContent\` for a single body, and \`MessageResponse\` when you want markdown rendering.`}
    />
  </MessageContent>
</Message>
```

### File Attachment Example

```svelte
<script lang="ts">
  import {
    Message,
    MessageAttachment,
    MessageAttachments,
    MessageContent,
  } from "$lib/components/ai-elements/message";
</script>

<Message from="user">
  <MessageAttachments class="mb-2">
    <MessageAttachment
      data={{
        type: "file",
        url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&h=720&fit=crop",
        mediaType: "image/jpeg",
        filename: "dashboard-review.jpg",
      }}
    />
    <MessageAttachment
      data={{
        type: "file",
        mediaType: "application/pdf",
        filename: "release-notes.pdf",
      }}
    />
  </MessageAttachments>

  <MessageContent>Please review these files.</MessageContent>
</Message>
```

Image attachments open inside the built-in centered dialog preview. Non-image files stay compact and tooltip-based.

### Branch Example

```svelte
<script lang="ts">
  import {
    Message,
    MessageBranch,
    MessageBranchContent,
    MessageBranchNext,
    MessageBranchPage,
    MessageBranchPrevious,
    MessageBranchSelector,
    MessageContent,
    MessageToolbar,
  } from "$lib/components/ai-elements/message";

  const versions = [
    { id: "1", content: "First response version..." },
    { id: "2", content: "Second response version..." },
  ];
</script>

<Message from="user">
  <MessageContent>Show two versions of the assistant response.</MessageContent>
</Message>

<Message from="assistant">
  <MessageBranch>
    <MessageBranchContent {versions} />

    <MessageToolbar>
      <MessageBranchSelector>
        <MessageBranchPrevious />
        <MessageBranchPage />
        <MessageBranchNext />
      </MessageBranchSelector>
    </MessageToolbar>
  </MessageBranch>
</Message>
```

`MessageBranchContent` now accepts a single `versions` prop and renders each version with `MessageResponse` internally.

### Prompt Input Composition

```svelte
<script lang="ts">
  import * as PromptInput from "$lib/components/ai-elements/prompt-input";
  import type { PromptInputMessage } from "$lib/components/ai-elements/prompt-input";
  import {
    Message,
    MessageContent,
    MessageResponse,
  } from "$lib/components/ai-elements/message";

  type ChatMessage = {
    id: string;
    role: "user" | "assistant";
    content: string;
  };

  let messages = $state<ChatMessage[]>([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "Ask about attachments, branching, or markdown rendering.",
    },
  ]);

  function handleSubmit(payload: PromptInputMessage) {
    const text = payload.text.trim();

    if (!text) return;

    messages = [
      ...messages,
      { id: crypto.randomUUID(), role: "user", content: text },
    ];
  }
</script>

<div class="flex w-full max-w-2xl flex-col gap-4">
  {#each messages as message (message.id)}
    <Message from={message.role}>
      <MessageContent>
        {#if message.role === "assistant"}
          <MessageResponse content={message.content} />
        {:else}
          {message.content}
        {/if}
      </MessageContent>
    </Message>
  {/each}

  <PromptInput.Root class="w-full" onSubmit={handleSubmit}>
    <PromptInput.Body>
      <PromptInput.Textarea placeholder="Ask about the message API..." />
    </PromptInput.Body>
    <PromptInput.Toolbar class="justify-end">
      <PromptInput.Submit />
    </PromptInput.Toolbar>
  </PromptInput.Root>
</div>
```

## Component Structure

```text
Message
|- MessageAttachments
|  `- MessageAttachment
|- MessageContent
|  `- MessageResponse
|- MessageBranch
|  |- MessageBranchContent
|  `- MessageToolbar
|     `- MessageBranchSelector
|        |- MessageBranchPrevious
|        |- MessageBranchPage
|        `- MessageBranchNext
`- MessageToolbar
   `- MessageActions
      `- MessageAction
```

## Key Props

- `Message`: set `from` to control role-aware layout.
- `MessageResponse`: pass `content` for markdown, plus optional `components` overrides for `svelte-streamdown`.
- `MessageBranch`: use `defaultBranch` and `onBranchChange` to manage branched assistant output.
- `MessageBranchContent`: pass `versions: { id: string; content: string }[]`.
- `MessageAttachment`: pass `data: { type: "file"; filename?: string; mediaType?: string; url?: string }`.
- `MessageAttachmentPreview`: image-only preview surface used by `MessageAttachment`.
- `MessageAction`: optional `tooltip` and `label` on top of standard button props.
