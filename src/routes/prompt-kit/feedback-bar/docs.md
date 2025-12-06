# Feedback Bar

> A feedback component with thumbs up/down buttons for collecting user feedback on AI responses.

## Installation

```bash
npx shadcn-svelte@latest add https://svelte-ai-elements.vercel.app/p/feedback-bar.json
```

## Usage

### Basic Example

```svelte
<script lang="ts">
  import { FeedbackBar } from "$lib/components/prompt-kit/feedback-bar";

  function handleHelpful() {
    console.log("Marked as helpful");
  }

  function handleNotHelpful() {
    console.log("Marked as not helpful");
  }

  function handleClose() {
    console.log("Feedback bar closed");
  }
</script>

<FeedbackBar
  title="Was this response helpful?"
  onHelpful={handleHelpful}
  onNotHelpful={handleNotHelpful}
  onClose={handleClose}
/>
```

### With Custom Icon

```svelte
<script lang="ts">
  import { FeedbackBar } from "$lib/components/prompt-kit/feedback-bar";
  import { Sparkles } from "@lucide/svelte";
</script>

<FeedbackBar title="Rate this AI response">
  {#snippet icon()}
    <Sparkles class="text-primary size-4" />
  {/snippet}
</FeedbackBar>
```

## Component API

### FeedbackBar

| Prop         | Type                           | Default | Description                                 |
| ------------ | ------------------------------ | ------- | ------------------------------------------- |
| title        | string                         | -       | Title text to display                       |
| icon         | Snippet                        | -       | Custom icon snippet                         |
| onHelpful    | () => void                     | -       | Callback when helpful button is clicked     |
| onNotHelpful | () => void                     | -       | Callback when not helpful button is clicked |
| onClose      | () => void                     | -       | Callback when close button is clicked       |
| className    | string                         | -       | Additional CSS classes                      |
| ...props     | HTMLAttributes<HTMLDivElement> | -       | All other div props are supported           |

---

For more information, visit: https://svelte-ai-elements.vercel.app/prompt-kit/feedback-bar
