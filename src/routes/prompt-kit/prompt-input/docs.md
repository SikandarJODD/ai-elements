# Prompt Input

> An input field that allows users to enter and submit text to an AI model.

## Installation

```bash
npx shadcn-svelte@latest add https://ai-elements.vercel.app/p/prompt-input.json
```

## Usage

### Basic Example

```svelte
<script lang="ts">
  import {
    PromptInput,
    PromptInputAction,
    PromptInputActions,
    PromptInputTextarea,
  } from "$lib/components/prompt-kit/prompt-input";
  import { Button } from "$lib/components/ui/button/index.js";
  import { ArrowUp, Square } from "@lucide/svelte";

  let input = $state("");
  let isLoading = $state(false);

  function handleSubmit() {
    isLoading = true;
    // simulate request
    setTimeout(() => {
      isLoading = false;
    }, 2000);
  }

  function handleValueChange(value: string) {
    input = value;
  }
</script>

<PromptInput
  value={input}
  onValueChange={handleValueChange}
  {isLoading}
  onSubmit={handleSubmit}
  class="w-full max-w-(--breakpoint-md)"
>
  <PromptInputTextarea placeholder="Ask me anything..." />
  <PromptInputActions class="justify-end pt-2">
    <PromptInputAction>
      {#snippet tooltip()}
        {isLoading ? "Stop generation" : "Send message"}
      {/snippet}
      <Button
        variant="default"
        size="icon"
        class="h-8 w-8 rounded-full"
        onclick={handleSubmit}
      >
        {#if isLoading}
          <Square class="size-5 fill-current" />
        {:else}
          <ArrowUp class="size-5" />
        {/if}
      </Button>
    </PromptInputAction>
  </PromptInputActions>
</PromptInput>
```

## Component API

### PromptInput

| Prop          | Type                    | Default | Description                                     |
| ------------- | ----------------------- | ------- | ----------------------------------------------- |
| isLoading     | boolean                 | false   | Loading state of the input                      |
| value         | string                  | ""      | Controlled value of the input                   |
| onValueChange | (value: string) => void | -       | Callback when input value changes               |
| maxHeight     | number \| string        | 240     | Maximum height of the textarea in pixels        |
| onSubmit      | () => void              | -       | Callback when form is submitted (Enter pressed) |
| children      | Snippet                 | -       | Child components to render                      |
| className     | string                  | -       | Additional CSS classes                          |

### PromptInputTextarea

| Prop            | Type                       | Default | Description                            |
| --------------- | -------------------------- | ------- | -------------------------------------- |
| disableAutosize | boolean                    | false   | Disable automatic height adjustment    |
| className       | string                     | -       | Additional CSS classes                 |
| onKeyDown       | (e: KeyboardEvent) => void | -       | Keyboard event handler                 |
| disabled        | boolean                    | false   | Disable the textarea input             |
| ...props        | HTMLTextareaAttributes     | -       | All other textarea props are supported |

### PromptInputActions

| Prop      | Type                           | Default | Description                       |
| --------- | ------------------------------ | ------- | --------------------------------- |
| children  | Snippet                        | -       | Child components to render        |
| className | string                         | -       | Additional CSS classes            |
| ...props  | HTMLAttributes<HTMLDivElement> | -       | All other div props are supported |

### PromptInputAction

| Prop      | Type                                   | Default | Description                                     |
| --------- | -------------------------------------- | ------- | ----------------------------------------------- |
| tooltip   | Snippet                                | -       | Content to show in the tooltip                  |
| children  | Snippet                                | -       | Child component to trigger the tooltip          |
| className | string                                 | -       | Additional CSS classes for the tooltip          |
| side      | "top" \| "bottom" \| "left" \| "right" | "top"   | Position of the tooltip relative to the trigger |
| disabled  | boolean                                | false   | Disable the tooltip trigger                     |
| ...props  | TooltipProps                           | -       | All other Tooltip component props are supported |

---

For more information, visit: https://ai-elements.vercel.app/prompt-kit/prompt-input
