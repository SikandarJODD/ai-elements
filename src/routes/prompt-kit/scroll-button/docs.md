# Scroll Button

> A floating button component that appears when users scroll up, allowing them to quickly return to the bottom of a scrollable container.

## Installation

```bash
npx shadcn-svelte@latest add https://ai-elements.vercel.app/p/scroll-button.json
```

## Usage

### Basic Example

```svelte
<script lang="ts">
  import {
    ChatContainerRoot,
    ChatContainerContent,
  } from "$lib/components/prompt-kit/chat-container";
  import {
    ScrollButton,
    setScrollContext,
  } from "$lib/components/prompt-kit/scroll-button";
  import { watch } from "runed";

  const scrollContext = setScrollContext();

  const content = Array(20)
    .fill(0)
    .map((_, i) => ({
      id: i,
      title: `Item ${i + 1}`,
      description: "This is a sample item to demonstrate scrolling behavior.",
    }));

  let containerRef = $state<HTMLDivElement | null>(null);

  watch(
    () => containerRef,
    () => {
      if (containerRef) {
        scrollContext.setElement(containerRef);
      }
    }
  );
</script>

<div class="relative flex h-[400px] w-full flex-col overflow-hidden">
  <div
    bind:this={containerRef}
    class="flex h-full w-full flex-col items-center justify-center overflow-y-auto"
  >
    <ChatContainerRoot class="h-full w-full">
      <ChatContainerContent class="w-full">
        {#each content as item (item.id)}
          <div class="border-b p-3">
            <h3 class="font-medium">{item.title}</h3>
            <p class="text-muted-foreground">{item.description}</p>
          </div>
        {/each}
      </ChatContainerContent>
      <div class="absolute right-12 bottom-4">
        <ScrollButton />
      </div>
    </ChatContainerRoot>
  </div>
</div>
```

## Component API

### ScrollButton

| Prop      | Type                              | Default | Description                          |
| --------- | --------------------------------- | ------- | ------------------------------------ |
| className | string                            | -       | Additional CSS classes               |
| ...props  | HTMLAttributes<HTMLButtonElement> | -       | All other button props are supported |

### setScrollContext

A function that creates and returns a scroll context for managing scroll behavior.

**Returns:** An object with the following methods:

- `setElement(element: HTMLElement)` - Sets the scrollable element to track
- `scrollToBottom()` - Scrolls the element to the bottom
- `isAtBottom` - A reactive value indicating if the element is scrolled to the bottom

---

For more information, visit: https://ai-elements.vercel.app/prompt-kit/scroll-button
