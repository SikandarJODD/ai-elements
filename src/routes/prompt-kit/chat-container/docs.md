# Chat Container

> A component for creating chat interfaces with intelligent auto-scrolling behavior, designed to provide a smooth experience in conversation interfaces.

## Installation

```bash
npx shadcn-svelte@latest add https://svelte-ai-elements.vercel.app//p/chat-container.json
```

## Usage

### Basic Example

```svelte
<script lang="ts">
  import {
    ChatContainerContent,
    ChatContainerRoot,
  } from "$lib/components/prompt-kit/chat-container";
  import {
    Message,
    MessageAvatar,
    MessageContent,
  } from "$lib/components/prompt-kit/message";

  let messages = $state([
    {
      id: 1,
      role: "user",
      content: "Hello! Can you help me with a coding question?",
    },
    {
      id: 2,
      role: "assistant",
      content:
        "Of course! I'd be happy to help with your coding question. What would you like to know?",
    },
  ]);
</script>

<ChatContainerRoot class="h-[400px]">
  <ChatContainerContent class="space-y-4 p-4">
    {#each messages as message (message.id)}
      {@const isAssistant = message.role === "assistant"}
      <Message
        class={message.role === "user" ? "justify-end" : "justify-start"}
      >
        {#if isAssistant}
          <MessageAvatar
            src="/avatars/ai.png"
            alt="AI Assistant"
            fallback="AI"
          />
        {/if}
        <MessageContent>
          {message.content}
        </MessageContent>
      </Message>
    {/each}
  </ChatContainerContent>
</ChatContainerRoot>
```

## Component API

### ChatContainerRoot

The main container that provides auto-scrolling functionality using the `use-stick-to-bottom` library.

| Prop      | Type                           | Default | Description                                     |
| --------- | ------------------------------ | ------- | ----------------------------------------------- |
| children  | Snippet                        | -       | Child components to render inside the container |
| className | string                         | -       | Additional CSS classes                          |
| ...props  | HTMLAttributes<HTMLDivElement> | -       | All other div props                             |

### ChatContainerContent

The content wrapper that should contain your messages.

| Prop      | Type                           | Default | Description                                             |
| --------- | ------------------------------ | ------- | ------------------------------------------------------- |
| children  | Snippet                        | -       | Child components to render inside the content container |
| className | string                         | -       | Additional CSS classes                                  |
| ...props  | HTMLAttributes<HTMLDivElement> | -       | All other div props                                     |

### ChatContainerScrollAnchor

An optional scroll anchor element that can be used for scroll targeting.

| Prop      | Type                           | Default | Description            |
| --------- | ------------------------------ | ------- | ---------------------- |
| className | string                         | -       | Additional CSS classes |
| ...props  | HTMLAttributes<HTMLDivElement> | -       | All other div props    |

## Auto-Scroll Behavior

The component uses the `use-stick-to-bottom` library to provide sophisticated auto-scrolling:

- **Smooth Animations:** Uses velocity-based spring animations for natural scrolling
- **Content Resizing:** Automatically detects content changes using ResizeObserver API
- **User Control:** Automatically disables sticky behavior when users scroll up
- **Mobile Support:** Works seamlessly on touch devices
- **Performance:** Zero dependencies and optimized for chat applications
- **Scroll Anchoring:** Prevents content jumping when new content is added above the viewport

### Key Behaviors

- **Stick to Bottom:** Automatically scrolls to bottom when new content is added (if already at bottom)
- **Smart Scrolling:** Only scrolls when user is at the bottom, preserves scroll position otherwise
- **Cancel on Scroll:** User can scroll up to cancel auto-scrolling behavior
- **Resume Auto-Scroll:** Returns to auto-scrolling when user scrolls back to bottom

## Using with ScrollButton

The ChatContainer pairs perfectly with the `ScrollButton` component. The ScrollButton automatically appears when the user scrolls up and disappears when at the bottom.

---

For more information, visit: https://svelte-ai-elements.vercel.app//prompt-kit/chat-container
