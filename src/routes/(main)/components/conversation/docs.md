# Conversation

> A container component that wraps messages and automatically scrolls to the bottom. Includes a scroll button that appears when not at the bottom.

## Installation

```bash
npx shadcn-svelte@latest add https://svelte-ai-elements.vercel.app//r/conversation.json
```

## Usage

### Basic Example

```svelte
<script lang="ts">
  import {
    Conversation,
    ConversationContent,
    ConversationScrollButton,
  } from "$lib/components/ai-elements/conversation";
  import {
    Message,
    MessageContent,
  } from "$lib/components/ai-elements/message";
</script>

<Conversation class="h-96 w-full">
  <ConversationContent>
    <Message role="user">
      <MessageContent>Hello! How are you?</MessageContent>
    </Message>
    <Message role="assistant">
      <MessageContent
        >I'm doing great! How can I help you today?</MessageContent
      >
    </Message>
  </ConversationContent>
  <ConversationScrollButton />
</Conversation>
```

### With Empty State

```svelte
<script lang="ts">
  import {
    Conversation,
    ConversationContent,
    ConversationEmptyState,
    ConversationScrollButton,
  } from "$lib/components/ai-elements/conversation";
  import { MessageSquare } from "@lucide/svelte";

  let messages = $state([]);
</script>

<Conversation class="h-96 w-full">
  <ConversationContent>
    {#if messages.length === 0}
      <ConversationEmptyState
        title="No messages yet"
        description="Start a conversation to see messages here"
      >
        {#snippet icon()}
          <MessageSquare class="size-12" />
        {/snippet}
      </ConversationEmptyState>
    {:else}
      {#each messages as message}
        <!-- Render messages -->
      {/each}
    {/if}
  </ConversationContent>
  <ConversationScrollButton />
</Conversation>
```

### With AI SDK

```svelte
<script lang="ts">
  import { Chat } from "@ai-sdk/svelte";
  import {
    Conversation,
    ConversationContent,
    ConversationScrollButton,
  } from "$lib/components/ai-elements/conversation";
  import {
    Message,
    MessageContent,
  } from "$lib/components/ai-elements/message";
  import { PromptInput } from "$lib/components/ai-elements/prompt-input";

  const chat = new Chat();
</script>

<div class="flex h-screen flex-col">
  <Conversation class="flex-1">
    <ConversationContent>
      {#each chat.messages as message}
        <Message role={message.role}>
          <MessageContent>{message.content}</MessageContent>
        </Message>
      {/each}
    </ConversationContent>
    <ConversationScrollButton />
  </Conversation>

  <PromptInput onSubmit={(data) => chat.append(data)} />
</div>
```

## Component API

### Conversation

| Prop         | Type                           | Default  | Description                                                                   |
| ------------ | ------------------------------ | -------- | ----------------------------------------------------------------------------- |
| class        | string                         | -        | Additional CSS classes to apply to the conversation container                 |
| initial      | ScrollBehavior                 | 'smooth' | Scroll behavior for initial scroll to bottom ('auto' \| 'smooth')             |
| resize       | ScrollBehavior                 | 'smooth' | Scroll behavior when container resizes ('auto' \| 'smooth')                   |
| ref          | HTMLDivElement                 | -        | Bindable reference to the conversation container element                      |
| children     | Snippet                        | -        | Child components (typically ConversationContent and ConversationScrollButton) |
| ...restProps | HTMLAttributes<HTMLDivElement> | -        | All other div props are supported                                             |

### ConversationContent

| Prop         | Type                           | Default | Description                                              |
| ------------ | ------------------------------ | ------- | -------------------------------------------------------- |
| class        | string                         | -       | Additional CSS classes to apply to the content container |
| ref          | HTMLDivElement                 | -       | Bindable reference to the content container element      |
| children     | Snippet                        | -       | Message components to render in the conversation         |
| ...restProps | HTMLAttributes<HTMLDivElement> | -       | All other div props are supported                        |

### ConversationEmptyState

| Prop        | Type    | Default                                     | Description                                                  |
| ----------- | ------- | ------------------------------------------- | ------------------------------------------------------------ |
| class       | string  | -                                           | Additional CSS classes to apply to the empty state container |
| title       | string  | 'No messages yet'                           | Title text to display in the empty state                     |
| description | string  | 'Start a conversation to see messages here' | Description text to display in the empty state               |
| icon        | Snippet | -                                           | Custom icon snippet to display above the title               |
| children    | Snippet | -                                           | Custom content to render instead of default empty state      |

### ConversationScrollButton

| Prop     | Type    | Default | Description                                          |
| -------- | ------- | ------- | ---------------------------------------------------- |
| class    | string  | -       | Additional CSS classes to apply to the scroll button |
| children | Snippet | -       | Custom button content (defaults to ChevronDown icon) |

## Features

- **Auto-scroll**: Automatically scrolls to the bottom when new messages are added
- **Scroll behavior**: Configurable scroll behavior for initial load and resize events
- **Scroll button**: Shows a button to scroll to bottom when user scrolls up
- **Empty state**: Built-in empty state component for when there are no messages
- **Flexible**: Works with any message components and layouts

---

For more information, visit: https://svelte-ai-elements.vercel.app/components/conversation
