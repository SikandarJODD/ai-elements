# Loader

> A spinning animation component to indicate loading states in your AI applications.

## Installation

```bash
npx shadcn-svelte@latest add https://svelte-ai-elements.vercel.app//r/loader.json
```

## Usage

### Basic Example

```svelte
<script lang="ts">
  import { Loader } from "$lib/components/ai-elements/loader";
</script>

<div>
  <Loader />
</div>
```

### Custom Size

```svelte
<script lang="ts">
  import { Loader } from "$lib/components/ai-elements/loader";
</script>

<div class="flex gap-4">
  <Loader size={12} />
  <Loader size={16} />
  <Loader size={24} />
  <Loader size={32} />
</div>
```

### With AI SDK

```svelte
<script lang="ts">
  import { Chat } from "@ai-sdk/svelte";
  import { Loader } from "$lib/components/ai-elements/loader";
  import {
    Message,
    MessageContent,
  } from "$lib/components/ai-elements/message";

  const chat = new Chat();
</script>

<div>
  {#each chat.messages as message}
    <Message role={message.role}>
      <MessageContent>{message.content}</MessageContent>
    </Message>
  {/each}

  {#if chat.status === "submitted"}
    <Message role="assistant">
      <Loader />
    </Message>
  {/if}
</div>
```

### Using LoaderIcon Directly

```svelte
<script lang="ts">
  import { LoaderIcon } from "$lib/components/ai-elements/loader";
</script>

<div class="flex items-center gap-2">
  <LoaderIcon size={16} />
  <span>Loading...</span>
</div>
```

## Component API

### Loader

| Prop         | Type                           | Default | Description                                             |
| ------------ | ------------------------------ | ------- | ------------------------------------------------------- |
| size         | number                         | 16      | Size of the loader icon in pixels                       |
| class        | string                         | -       | Additional CSS classes to apply to the loader container |
| ...restProps | HTMLAttributes<HTMLDivElement> | -       | All other div props are supported                       |

### LoaderIcon

| Prop | Type   | Default | Description                       |
| ---- | ------ | ------- | --------------------------------- |
| size | number | 16      | Size of the loader icon in pixels |

## Features

- **Customizable size**: Adjust the loader size to fit your design
- **Flexible usage**: Use the wrapper component or the icon directly
- **Smooth animation**: Continuous spinning animation
- **Accessible**: Includes proper ARIA attributes for screen readers

---

For more information, visit: https://svelte-ai-elements.vercel.app/components/loader
