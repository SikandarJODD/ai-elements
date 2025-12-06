# Thinking Bar

> A component for displaying AI thinking state with animated shimmer text and optional stop button.

## Installation

```bash
npx shadcn-svelte@latest add https://svelte-ai-elements.vercel.app/p/thinking-bar.json
```

## Usage

### Basic Example

```svelte
<script lang="ts">
  import { ThinkingBar } from "$lib/components/prompt-kit/thinking-bar";
</script>

<ThinkingBar />
```

### With Stop Button

```svelte
<script lang="ts">
  import { ThinkingBar } from "$lib/components/prompt-kit/thinking-bar";

  function handleStop() {
    console.log("Stop thinking and answer now");
  }
</script>

<ThinkingBar text="Analyzing your question" onStop={handleStop} />
```

### Clickable with Custom Labels

```svelte
<script lang="ts">
  import { ThinkingBar } from "$lib/components/prompt-kit/thinking-bar";

  function handleClick() {
    console.log("Thinking bar clicked");
  }

  function handleStop() {
    console.log("Stopping...");
  }
</script>

<ThinkingBar
  text="Deep thinking in progress"
  stopLabel="Skip to answer"
  onStop={handleStop}
  onclick={handleClick}
/>
```

## Component API

### ThinkingBar

| Prop      | Type                           | Default      | Description                            |
| --------- | ------------------------------ | ------------ | -------------------------------------- |
| text      | string                         | "Thinking"   | Text to display with shimmer effect    |
| onStop    | () => void                     | -            | Callback when stop button is clicked   |
| stopLabel | string                         | "Answer now" | Label for the stop button              |
| onclick   | () => void                     | -            | Callback when thinking text is clicked |
| className | string                         | -            | Additional CSS classes                 |
| ...props  | HTMLAttributes<HTMLDivElement> | -            | All other div props are supported      |

---

For more information, visit: https://svelte-ai-elements.vercel.app/prompt-kit/thinking-bar
