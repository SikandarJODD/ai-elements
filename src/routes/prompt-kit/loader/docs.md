# Loader

> A loading component with multiple variants to indicate processing states and provide visual feedback to users during wait times.

## Installation

```bash
npx shadcn-svelte@latest add ${PUBLIC_WEBSITE_URL}/p/loader.json
```

**Note:** If you are using Tailwind CSS v4, you may have to grab the keyframes and add them to your global.css file manually. Check manual installation for more details.

## Usage

### Basic Example

```svelte
<script lang="ts">
	import { Loader } from "$lib/components/prompt-kit/loader";
</script>

<Loader variant="circular" />
<Loader variant="classic" />
<Loader variant="pulse" />
<Loader variant="pulse-dot" />
<Loader variant="dots" />
<Loader variant="typing" />
<Loader variant="wave" />
<Loader variant="bars" />
<Loader variant="terminal" />
<Loader variant="text-blink" text="Loading" />
<Loader variant="text-shimmer" text="Processing" />
<Loader variant="loading-dots" text="Thinking" />
```

## Component API

### Loader

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | "circular" \| "classic" \| "pulse" \| "pulse-dot" \| "dots" \| "typing" \| "wave" \| "bars" \| "terminal" \| "text-blink" \| "text-shimmer" \| "loading-dots" | "circular" | The visual style of the loader |
| size | "sm" \| "md" \| "lg" | "md" | The size of the loader |
| text | string | - | Text to display (for supported variants) |
| className | string | - | Additional CSS classes |

---

For more information, visit: https://ai-elements.vercel.app/prompt-kit/loader

