# System Message

> A component for displaying system-level messages, notifications, or alerts to users with customizable variants and styling.

## Installation

```bash
npx shadcn-svelte@latest add https://svelte-ai-elements.vercel.app//p/system-message.json
```

## Usage

### Basic Example

```svelte
<script lang="ts">
  import { SystemMessage } from "$lib/components/prompt-kit/system-message";
</script>

<div class="flex flex-col gap-3">
  <SystemMessage>
    This conversation is visible to your team. Avoid sharing sensitive personal
    data.
  </SystemMessage>

  <SystemMessage fill>
    You can switch to a private workspace at any time from the header.
  </SystemMessage>
</div>
```

## Component API

### SystemMessage

| Prop      | Type                                                     | Default   | Description                              |
| --------- | -------------------------------------------------------- | --------- | ---------------------------------------- |
| children  | Snippet                                                  | -         | Content to display in the message        |
| fill      | boolean                                                  | false     | Whether to use filled background variant |
| variant   | "default" \| "info" \| "warning" \| "error" \| "success" | "default" | Visual style variant                     |
| className | string                                                   | -         | Additional CSS classes                   |
| ...props  | HTMLAttributes<HTMLDivElement>                           | -         | All other div props are supported        |

---

For more information, visit: https://svelte-ai-elements.vercel.app//prompt-kit/system-message
