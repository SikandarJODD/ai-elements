# Branch

> Manages multiple versions of AI messages, allowing users to navigate between different response branches.

## Installation

```bash
npx shadcn-svelte@latest add ${PUBLIC_WEBSITE_URL}/r/branch.json
```

## Usage

### Basic Example

```svelte
<script lang="ts">
  import {
    Branch,
    BranchSelector,
    BranchPrevious,
    BranchNext,
    BranchPage,
    BranchMessages,
  } from "$lib/components/ai-elements/branch";

  let messages = [
    { id: 1, content: "First response version" },
    { id: 2, content: "Second response version" },
    { id: 3, content: "Third response version" },
  ];
</script>

<Branch>
  <BranchSelector>
    <BranchPrevious />
    <BranchPage />
    <BranchNext />
  </BranchSelector>
  <BranchMessages {messages}>
    {#snippet children(message)}
      <p>{message.content}</p>
    {/snippet}
  </BranchMessages>
</Branch>
```

### With AI SDK

```svelte
<script lang="ts">
  import { Chat } from "@ai-sdk/svelte";
  import {
    Branch,
    BranchSelector,
    BranchPrevious,
    BranchNext,
    BranchPage,
    BranchMessages,
  } from "$lib/components/ai-elements/branch";

  const chat = new Chat();

  // Get all assistant message branches
  $: assistantMessages = chat.messages.filter((m) => m.role === "assistant");
</script>

<Branch>
  <BranchSelector>
    <BranchPrevious />
    <BranchPage />
    <BranchNext />
  </BranchSelector>
  <BranchMessages messages={assistantMessages}>
    {#snippet children(message)}
      <div class="prose">
        {message.content}
      </div>
    {/snippet}
  </BranchMessages>
</Branch>
```

### Custom Navigation

```svelte
<script lang="ts">
  import {
    Branch,
    BranchSelector,
    BranchPrevious,
    BranchNext,
    BranchPage,
  } from "$lib/components/ai-elements/branch";
  import { ChevronLeft, ChevronRight } from "lucide-svelte";

  let branches = ["Response A", "Response B", "Response C"];
</script>

<Branch>
  <BranchSelector>
    <BranchPrevious>
      <ChevronLeft class="size-4" />
    </BranchPrevious>
    <BranchPage />
    <BranchNext>
      <ChevronRight class="size-4" />
    </BranchNext>
  </BranchSelector>
  <!-- Your content here -->
</Branch>
```

## Component API

### Branch

| Prop         | Type                           | Default | Description                                      |
| ------------ | ------------------------------ | ------- | ------------------------------------------------ |
| children     | Snippet                        | -       | Child components to render                       |
| class        | string                         | -       | Additional CSS classes to apply to the container |
| ...restProps | HTMLAttributes<HTMLDivElement> | -       | All other div props are supported                |

### BranchSelector

| Prop         | Type                           | Default | Description                                     |
| ------------ | ------------------------------ | ------- | ----------------------------------------------- |
| children     | Snippet                        | -       | Navigation buttons (Previous, Page, Next)       |
| class        | string                         | -       | Additional CSS classes to apply to the selector |
| ...restProps | HTMLAttributes<HTMLDivElement> | -       | All other div props are supported               |

### BranchPrevious

| Prop         | Type        | Default | Description                                    |
| ------------ | ----------- | ------- | ---------------------------------------------- |
| children     | Snippet     | -       | Custom content (defaults to left arrow icon)   |
| class        | string      | -       | Additional CSS classes to apply to the button  |
| ...restProps | ButtonProps | -       | All other Button component props are supported |

### BranchNext

| Prop         | Type        | Default | Description                                    |
| ------------ | ----------- | ------- | ---------------------------------------------- |
| children     | Snippet     | -       | Custom content (defaults to right arrow icon)  |
| class        | string      | -       | Additional CSS classes to apply to the button  |
| ...restProps | ButtonProps | -       | All other Button component props are supported |

### BranchPage

| Prop         | Type                           | Default | Description                                           |
| ------------ | ------------------------------ | ------- | ----------------------------------------------------- |
| class        | string                         | -       | Additional CSS classes to apply to the page indicator |
| ...restProps | HTMLAttributes<HTMLDivElement> | -       | All other div props are supported                     |

### BranchMessages

| Prop         | Type                           | Default | Description                                      |
| ------------ | ------------------------------ | ------- | ------------------------------------------------ |
| messages     | any[]                          | -       | Array of message objects to display              |
| children     | Snippet<[message: any]>        | -       | Snippet to render each message                   |
| class        | string                         | -       | Additional CSS classes to apply to the container |
| ...restProps | HTMLAttributes<HTMLDivElement> | -       | All other div props are supported                |

## Features

- **Multiple branches**: Navigate between different AI response versions
- **Keyboard navigation**: Arrow keys for quick navigation
- **Page indicator**: Shows current branch and total count
- **Customizable**: Easy to style and extend with custom classes
- **AI SDK integration**: Works seamlessly with AI SDK chat interfaces
- **Accessible**: Proper ARIA labels and keyboard support

---

For more information, visit: https://svelte-ai-elements.vercel.app/components/branch
