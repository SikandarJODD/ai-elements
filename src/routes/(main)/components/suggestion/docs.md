# Suggestion

> Display a horizontal row of clickable suggestions for user interaction.

## Installation

```bash
npx shadcn-svelte@latest add https://svelte-ai-elements.vercel.app//r/suggestion.json
```

## Usage

### Basic Example

```svelte
<script lang="ts">
  import {
    Suggestion,
    SuggestionItem,
  } from "$lib/components/ai-elements/suggestion";

  const suggestions = [
    "What is quantum computing?",
    "Explain machine learning",
    "How does blockchain work?",
  ];

  function handleClick(suggestion: string) {
    console.log("Clicked:", suggestion);
  }
</script>

<Suggestion>
  {#each suggestions as suggestion}
    <SuggestionItem onclick={() => handleClick(suggestion)}>
      {suggestion}
    </SuggestionItem>
  {/each}
</Suggestion>
```

### With AI SDK

```svelte
<script lang="ts">
  import { Chat } from "@ai-sdk/svelte";
  import {
    Suggestion,
    SuggestionItem,
  } from "$lib/components/ai-elements/suggestion";

  const chat = new Chat();

  const suggestions = [
    "Explain quantum computing",
    "What is machine learning?",
    "How does AI work?",
  ];

  function handleSuggestion(text: string) {
    chat.setInput(text);
    chat.submit();
  }
</script>

<Suggestion>
  {#each suggestions as suggestion}
    <SuggestionItem onclick={() => handleSuggestion(suggestion)}>
      {suggestion}
    </SuggestionItem>
  {/each}
</Suggestion>

<form onsubmit={chat.submit}>
  <input bind:value={chat.input} placeholder="Ask a question..." />
  <button type="submit">Send</button>
</form>
```

### With Icons

```svelte
<script lang="ts">
  import {
    Suggestion,
    SuggestionItem,
  } from "$lib/components/ai-elements/suggestion";
  import { Lightbulb, Code, Book } from "lucide-svelte";

  const suggestions = [
    { icon: Lightbulb, text: "Get ideas" },
    { icon: Code, text: "Write code" },
    { icon: Book, text: "Learn something" },
  ];
</script>

<Suggestion>
  {#each suggestions as { icon: Icon, text }}
    <SuggestionItem>
      <Icon class="size-4" />
      {text}
    </SuggestionItem>
  {/each}
</Suggestion>
```

### Conditional Display

```svelte
<script lang="ts">
  import {
    Suggestion,
    SuggestionItem,
  } from "$lib/components/ai-elements/suggestion";

  let messages = $state([]);

  const suggestions = ["Tell me a joke", "Explain AI", "Write a poem"];
</script>

{#if messages.length === 0}
  <Suggestion>
    {#each suggestions as suggestion}
      <SuggestionItem onclick={() => handleSuggestion(suggestion)}>
        {suggestion}
      </SuggestionItem>
    {/each}
  </Suggestion>
{/if}
```

## Component API

### Suggestion

| Prop         | Type                           | Default | Description                                      |
| ------------ | ------------------------------ | ------- | ------------------------------------------------ |
| children     | Snippet                        | -       | Suggestion items to display                      |
| class        | string                         | -       | Additional CSS classes to apply to the container |
| ...restProps | HTMLAttributes<HTMLDivElement> | -       | All other div props are supported                |

### SuggestionItem

| Prop         | Type        | Default | Description                                    |
| ------------ | ----------- | ------- | ---------------------------------------------- |
| children     | Snippet     | -       | Content of the suggestion                      |
| onclick      | () => void  | -       | Click handler for the suggestion               |
| class        | string      | -       | Additional CSS classes to apply to the item    |
| ...restProps | ButtonProps | -       | All other Button component props are supported |

## Features

- **Horizontal layout**: Clean row of suggestions
- **Clickable**: Each suggestion is a button
- **Customizable**: Easy to style and extend with custom classes
- **Icon support**: Add icons to suggestions
- **AI SDK integration**: Works seamlessly with chat interfaces
- **Responsive**: Adapts to container size
- **Accessible**: Proper button semantics and keyboard support

## Use Cases

- **Chat starters**: Provide example questions for users
- **Quick actions**: Common tasks or queries
- **Onboarding**: Guide new users with suggestions
- **Empty states**: Show suggestions when no messages exist
- **Follow-up questions**: Suggest related queries after a response

---

For more information, visit: https://svelte-ai-elements.vercel.app/components/suggestion
