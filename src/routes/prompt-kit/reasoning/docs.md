# Reasoning

> A collapsible component for displaying AI reasoning processes, with support for streaming content and expandable/collapsible states.

## Installation

```bash
npx shadcn-svelte@latest add https://ai-elements.vercel.app/p/reasoning.json
```

## Usage

### Basic Example

```svelte
<script lang="ts">
  import {
    Reasoning,
    ReasoningContent,
    ReasoningTrigger,
  } from "$lib/components/prompt-kit/reasoning";
  import { Button } from "$lib/components/ui/button";

  let reasoningText = $state("");
  let isStreaming = $state(false);

  // Simulated streaming function
  async function simulateReasoningStream() {
    const reasoning = `I calculated the best color balance for the image:

1. First, I analyzed the color of the car - a deep blue metallic finish
2. Then, I examined the color of the sky - overcast with neutral tones
3. Next, I considered the color of the grass - vibrant green in the foreground
4. I calculated the optimal white balance to enhance all elements
5. Applied selective color adjustments to maintain natural appearance
6. Final result: improved contrast and color harmony`;

    isStreaming = true;
    reasoningText = "";

    // Simulate character-by-character streaming
    for (let i = 0; i <= reasoning.length; i++) {
      reasoningText = reasoning.slice(0, i);
      await new Promise((resolve) => setTimeout(resolve, 30));
    }

    isStreaming = false;
  }

  function handleGenerateReasoning() {
    simulateReasoningStream();
  }
</script>

<div class="flex w-full flex-col items-start gap-4">
  <Button
    variant="outline"
    size="sm"
    onclick={handleGenerateReasoning}
    disabled={isStreaming}
  >
    {isStreaming ? "Generating..." : "Generate Reasoning"}
  </Button>

  <Reasoning {isStreaming}>
    <ReasoningTrigger>Show reasoning</ReasoningTrigger>
    <ReasoningContent>
      {reasoningText}
    </ReasoningContent>
  </Reasoning>
</div>
```

## Component API

### Reasoning

| Prop        | Type    | Default | Description                            |
| ----------- | ------- | ------- | -------------------------------------- |
| isStreaming | boolean | false   | Whether content is currently streaming |
| children    | Snippet | -       | Child components to render             |

### ReasoningTrigger

| Prop      | Type                              | Default | Description                              |
| --------- | --------------------------------- | ------- | ---------------------------------------- |
| children  | Snippet                           | -       | Content to display in the trigger button |
| className | string                            | -       | Additional CSS classes                   |
| ...props  | HTMLAttributes<HTMLButtonElement> | -       | All other button props are supported     |

### ReasoningContent

| Prop      | Type                           | Default | Description                           |
| --------- | ------------------------------ | ------- | ------------------------------------- |
| children  | Snippet                        | -       | Content to display when expanded      |
| markdown  | boolean                        | false   | Whether to render content as markdown |
| className | string                         | -       | Additional CSS classes                |
| ...props  | HTMLAttributes<HTMLDivElement> | -       | All other div props are supported     |

---

For more information, visit: https://ai-elements.vercel.app/prompt-kit/reasoning
