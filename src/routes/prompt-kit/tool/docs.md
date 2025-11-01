# Tool

> A component for displaying AI tool invocations and their results, with support for different states (pending, running, output-available) and customizable rendering.

## Installation

```bash
npx shadcn-svelte@latest add ${PUBLIC_WEBSITE_URL}/p/tool.json
```

## Usage

### Basic Example

```svelte
<script lang="ts">
  import { ToolComposed } from "$lib/components/prompt-kit/tool";
  import type { ToolPart } from "$lib/components/prompt-kit/tool";

  const toolPart: ToolPart = {
    type: "search_web",
    state: "output-available",
    input: {
      query: "prompt-kit documentation",
      max_results: 5,
    },
    output: {
      results: [
        {
          title: "Prompt Kit - Documentation",
          url: "https://prompt-kit.com/docs",
          snippet: "A comprehensive guide to using Prompt Kit components...",
        },
        {
          title: "Getting Started with Prompt Kit",
          url: "https://prompt-kit.com/docs/installation",
          snippet:
            "Learn how to install and use Prompt Kit in your project...",
        },
      ],
    },
  };
</script>

<ToolComposed {toolPart} class="w-full max-w-md" />
```

## Component API

### ToolComposed

| Prop      | Type                           | Default | Description                                                   |
| --------- | ------------------------------ | ------- | ------------------------------------------------------------- |
| toolPart  | ToolPart                       | -       | Tool invocation data including type, state, input, and output |
| className | string                         | -       | Additional CSS classes                                        |
| ...props  | HTMLAttributes<HTMLDivElement> | -       | All other div props are supported                             |

### ToolPart Type

```typescript
type ToolPart = {
  type: string;
  state: "pending" | "running" | "output-available";
  input?: Record<string, any>;
  output?: Record<string, any>;
};
```

---

For more information, visit: https://ai-elements.vercel.app/prompt-kit/tool
