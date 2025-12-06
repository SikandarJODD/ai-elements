# Text Shimmer

> A text component with an animated shimmer effect, perfect for indicating AI thinking or loading states.

## Installation

```bash
npx shadcn-svelte@latest add https://svelte-ai-elements.vercel.app/p/text-shimmer.json
```

## Usage

### Basic Example

```svelte
<script lang="ts">
  import { TextShimmer } from "$lib/components/prompt-kit/text-shimmer";
</script>

<TextShimmer>Processing your request...</TextShimmer>
```

### Custom Duration and Spread

```svelte
<script lang="ts">
  import { TextShimmer } from "$lib/components/prompt-kit/text-shimmer";
</script>

<div class="flex flex-col gap-4">
  <TextShimmer duration={2} spread={30}>
    Fast shimmer with wide spread
  </TextShimmer>

  <TextShimmer duration={6} spread={10}>
    Slow shimmer with narrow spread
  </TextShimmer>
</div>
```

### As Different Elements

```svelte
<script lang="ts">
  import { TextShimmer } from "$lib/components/prompt-kit/text-shimmer";
</script>

<TextShimmer as="h2" class="text-2xl font-bold">
  Heading with shimmer effect
</TextShimmer>

<TextShimmer as="p" class="text-lg">
  Paragraph with shimmer effect
</TextShimmer>
```

## Component API

### TextShimmer

| Prop      | Type                       | Default | Description                               |
| --------- | -------------------------- | ------- | ----------------------------------------- |
| children  | Snippet                    | -       | Content to display with shimmer effect    |
| as        | keyof HTMLElementTagNameMap| "span"  | HTML element to render as                 |
| duration  | number                     | 4       | Animation duration in seconds             |
| spread    | number                     | 20      | Spread of shimmer highlight (5-45)        |
| className | string                     | -       | Additional CSS classes                    |
| ...props  | HTMLAttributes<HTMLElement>| -       | All other element props are supported     |

---

For more information, visit: https://svelte-ai-elements.vercel.app/prompt-kit/text-shimmer

