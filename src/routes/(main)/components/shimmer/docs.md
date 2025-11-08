# Shimmer

> An animated shimmer effect component for text, perfect for loading states and highlighting content in your AI applications.

## Installation

```bash
npx shadcn-svelte@latest add https://ai-elements.vercel.app/r/shimmer.json
```

## Usage

### Basic Example

```svelte
<script lang="ts">
  import { Shimmer } from "$lib/components/ai-elements/shimmer";
</script>

<Shimmer content_length={35}>
  {#snippet children()}
    Hello, this is a shimmer effect!
  {/snippet}
</Shimmer>
```

### Custom Duration

```svelte
<script lang="ts">
  import { Shimmer } from "$lib/components/ai-elements/shimmer";
</script>

<div class="flex gap-4">
  <Shimmer duration={1} content_length={23}>
    {#snippet children()}
      Fast shimmer animation
    {/snippet}
  </Shimmer>

  <Shimmer duration={4} content_length={23}>
    {#snippet children()}
      Slow shimmer animation
    {/snippet}
  </Shimmer>
</div>
```

### Custom Spread

The `spread` prop controls the width of the shimmer effect. Higher values create a wider shimmer.

```svelte
<script lang="ts">
  import { Shimmer } from "$lib/components/ai-elements/shimmer";
</script>

<div class="flex flex-col gap-4">
  <Shimmer spread={1} content_length={21}>
    {#snippet children()}
      Narrow shimmer spread
    {/snippet}
  </Shimmer>

  <Shimmer spread={4} content_length={18}>
    {#snippet children()}
      Wide shimmer spread
    {/snippet}
  </Shimmer>
</div>
```

### Different HTML Elements

Use the `as` prop to render the shimmer as different HTML elements.

```svelte
<script lang="ts">
  import { Shimmer } from "$lib/components/ai-elements/shimmer";
</script>

<div class="flex flex-col gap-4">
  <Shimmer as="h1" class="text-4xl font-bold" content_length={23}>
    {#snippet children()}
      Heading 1 with Shimmer
    {/snippet}
  </Shimmer>

  <Shimmer as="h2" class="text-3xl font-semibold" content_length={23}>
    {#snippet children()}
      Heading 2 with Shimmer
    {/snippet}
  </Shimmer>

  <Shimmer as="span" class="text-lg" content_length={19}>
    {#snippet children()}
      Inline shimmer text
    {/snippet}
  </Shimmer>
</div>
```

### AI Loading State

Perfect for indicating AI processing states:

```svelte
<script lang="ts">
  import { Shimmer } from "$lib/components/ai-elements/shimmer";

  let isProcessing = $state(true);
</script>

{#if isProcessing}
  <div class="space-y-2">
    <Shimmer as="div" class="text-sm" content_length={27}>
      {#snippet children()}
        Analyzing your request...
      {/snippet}
    </Shimmer>

    <Shimmer as="div" class="text-sm" duration={1.5} content_length={23}>
      {#snippet children()}
        Processing with AI...
      {/snippet}
    </Shimmer>

    <Shimmer as="div" class="text-sm" duration={2.5} content_length={23}>
      {#snippet children()}
        Generating response...
      {/snippet}
    </Shimmer>
  </div>
{/if}
```

### With AI SDK

```svelte
<script lang="ts">
  import { Chat } from "@ai-sdk/svelte";
  import { Shimmer } from "$lib/components/ai-elements/shimmer";
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
      <Shimmer content_length={30}>
        {#snippet children()}
          Thinking and processing...
        {/snippet}
      </Shimmer>
    </Message>
  {/if}
</div>
```

## Props

| Prop             | Type                          | Default | Description                                                          |
| ---------------- | ----------------------------- | ------- | -------------------------------------------------------------------- |
| `children`       | `Snippet`                     | -       | The text content to display with shimmer effect (required)           |
| `content_length` | `number`                      | `30`    | The approximate length of the content for calculating shimmer spread |
| `as`             | `keyof HTMLElementTagNameMap` | `"p"`   | The HTML element to render as                                        |
| `duration`       | `number`                      | `2`     | Animation duration in seconds                                        |
| `spread`         | `number`                      | `2`     | Shimmer spread multiplier (higher = wider shimmer)                   |
| `class`          | `string`                      | -       | Additional CSS classes                                               |

## Notes

- The `content_length` prop is used to calculate the dynamic spread of the shimmer effect. Set it to approximately match your text length for optimal visual effect.
- The shimmer effect uses CSS custom properties and animations, requiring no external animation libraries.
- The component is fully accessible and works with any HTML element type via the `as` prop.
- Combine `duration` and `spread` props to create unique shimmer effects for different use cases.
