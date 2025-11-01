# Prompt Suggestion

> A component for displaying clickable prompt suggestions that users can select to quickly populate input fields with predefined queries or commands.

## Installation

```bash
npx shadcn-svelte@latest add ${PUBLIC_WEBSITE_URL}/p/prompt-suggestion.json
```

## Usage

### Basic Example

```svelte
<script lang="ts">
  import {
    PromptInput,
    PromptInputActions,
    PromptInputTextarea,
  } from "$lib/components/prompt-kit/prompt-input";
  import { PromptSuggestion } from "$lib/components/prompt-kit/prompt-suggestion";
  import { Button } from "$lib/components/ui/button";
  import { ArrowUp } from "@lucide/svelte";

  let inputValue = $state("");

  function handleSend() {
    if (inputValue.trim()) {
      console.log("Sending:", inputValue);
      inputValue = "";
    }
  }

  function handleValueChange(value: string) {
    inputValue = value;
  }
</script>

<div class="flex w-full flex-col space-y-4">
  <div class="flex flex-wrap gap-2">
    <PromptSuggestion onclick={() => (inputValue = "Tell me a joke")}>
      Tell me a joke
    </PromptSuggestion>

    <PromptSuggestion onclick={() => (inputValue = "How does this work?")}>
      How does this work?
    </PromptSuggestion>

    <PromptSuggestion
      onclick={() => (inputValue = "Generate an image of a cat")}
    >
      Generate an image of a cat
    </PromptSuggestion>
  </div>

  <PromptInput
    value={inputValue}
    onValueChange={handleValueChange}
    onSubmit={handleSend}
  >
    <PromptInputTextarea
      placeholder="Type a message or click a suggestion..."
    />
    <PromptInputActions class="justify-end">
      <Button size="sm" onclick={handleSend} disabled={!inputValue.trim()}>
        <ArrowUp class="h-4 w-4" />
      </Button>
    </PromptInputActions>
  </PromptInput>
</div>
```

## Component API

### PromptSuggestion

| Prop      | Type                              | Default | Description                                |
| --------- | --------------------------------- | ------- | ------------------------------------------ |
| children  | Snippet                           | -       | Content to display in the suggestion       |
| className | string                            | -       | Additional CSS classes                     |
| onclick   | () => void                        | -       | Function called when suggestion is clicked |
| ...props  | HTMLAttributes<HTMLButtonElement> | -       | All other button props are supported       |

---

For more information, visit: https://ai-elements.vercel.app/prompt-kit/prompt-suggestion
