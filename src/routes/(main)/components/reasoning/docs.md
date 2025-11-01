# Reasoning

> Displays AI reasoning content with automatic expand/collapse during streaming, perfect for models like DeepSeek R1.

## Installation

```bash
npx shadcn-svelte@latest add https://svelte-ai-elements.vercel.app//r/reasoning.json
```

## Usage

### Basic Example

```svelte
<script lang="ts">
  import { Reasoning } from "$lib/components/ai-elements/reasoning";

  const reasoningText = "Let me think through this step by step...";
</script>

<Reasoning content={reasoningText} />
```

### With Streaming

```svelte
<script lang="ts">
  import { Reasoning } from "$lib/components/ai-elements/reasoning";

  let reasoningContent = $state("");
  let isStreaming = $state(false);

  async function streamReasoning() {
    isStreaming = true;
    reasoningContent = "";

    const steps = [
      "First, I need to understand the problem...",
      "Then, I'll break it down into smaller parts...",
      "Finally, I'll synthesize the solution...",
    ];

    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      reasoningContent += step + " ";
    }

    isStreaming = false;
  }
</script>

<button onclick={streamReasoning}>Start Reasoning</button>
<Reasoning content={reasoningContent} {isStreaming} />
```

### With AI SDK (DeepSeek R1)

```svelte
<script lang="ts">
  import { Chat } from "@ai-sdk/svelte";
  import { Reasoning } from "$lib/components/ai-elements/reasoning";

  const chat = new Chat({
    api: "/api/chat",
    model: "deepseek-r1",
  });

  $: lastMessage = chat.messages[chat.messages.length - 1];
  $: reasoning = lastMessage?.reasoning;
  $: isStreaming = chat.isLoading;
</script>

<form onsubmit={chat.submit}>
  <input bind:value={chat.input} placeholder="Ask a question..." />
  <button type="submit">Send</button>
</form>

{#if reasoning}
  <Reasoning content={reasoning} {isStreaming} />
{/if}

{#if lastMessage?.content}
  <div class="prose">
    {lastMessage.content}
  </div>
{/if}
```

### Custom Styling

```svelte
<script lang="ts">
  import {
    Reasoning,
    ReasoningTrigger,
    ReasoningContent,
  } from "$lib/components/ai-elements/reasoning";

  const reasoningText = "Analyzing the data...";
</script>

<Reasoning>
  <ReasoningTrigger class="text-purple-600">
    View Reasoning Process
  </ReasoningTrigger>
  <ReasoningContent class="bg-purple-50 dark:bg-purple-950">
    {reasoningText}
  </ReasoningContent>
</Reasoning>
```

## Component API

### Reasoning

| Prop         | Type             | Default | Description                                         |
| ------------ | ---------------- | ------- | --------------------------------------------------- |
| content      | string           | -       | The reasoning text to display                       |
| isStreaming  | boolean          | false   | Whether the reasoning is currently streaming        |
| defaultOpen  | boolean          | false   | Whether the reasoning is open by default            |
| children     | Snippet          | -       | Custom trigger and content (optional)               |
| class        | string           | -       | Additional CSS classes to apply to the container    |
| ...restProps | CollapsibleProps | -       | All other Collapsible component props are supported |

### ReasoningTrigger

| Prop         | Type                    | Default | Description                                      |
| ------------ | ----------------------- | ------- | ------------------------------------------------ |
| children     | Snippet                 | -       | Custom trigger content                           |
| class        | string                  | -       | Additional CSS classes to apply to the trigger   |
| ...restProps | CollapsibleTriggerProps | -       | All other CollapsibleTrigger props are supported |

### ReasoningContent

| Prop         | Type                    | Default | Description                                      |
| ------------ | ----------------------- | ------- | ------------------------------------------------ |
| children     | Snippet                 | -       | Reasoning content to display                     |
| class        | string                  | -       | Additional CSS classes to apply to the content   |
| ...restProps | CollapsibleContentProps | -       | All other CollapsibleContent props are supported |

## Features

- **Auto expand/collapse**: Opens during streaming, closes when finished
- **Streaming support**: Works seamlessly with streaming AI responses
- **DeepSeek R1 integration**: Perfect for models with reasoning capabilities
- **Customizable**: Easy to style and extend with custom classes
- **Smooth animations**: Collapsible with smooth transitions
- **Accessible**: Proper ARIA labels and keyboard support

## Behavior

- **During streaming**: The reasoning section automatically opens
- **After streaming**: The reasoning section automatically collapses
- **Manual control**: Users can manually expand/collapse at any time

---

For more information, visit: https://svelte-ai-elements.vercel.app/components/reasoning
