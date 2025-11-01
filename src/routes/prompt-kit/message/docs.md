# Message

> A component for displaying messages in a conversation interface, with support for avatars, markdown content, and interactive actions.

## Installation

```bash
npx shadcn-svelte@latest add https://svelte-ai-elements.vercel.app//p/message.json
```

## Usage

### Basic Example

```svelte
<script lang="ts">
  import {
    Message,
    MessageAvatar,
    MessageContent,
  } from "$lib/components/prompt-kit/message";
</script>

<div class="flex flex-col gap-8">
  <Message class="justify-end">
    <MessageContent>Hello! How can I help you today?</MessageContent>
  </Message>

  <Message class="justify-start">
    <MessageAvatar src="/avatars/ai.png" alt="AI" fallback="AI" />
    <MessageContent markdown class="bg-transparent p-0">
      I can help with a variety of tasks: answering questions, providing
      information, assisting with coding, generating creative content. What
      would you like help with today?
    </MessageContent>
  </Message>
</div>
```

## Component API

### Message

| Prop      | Type                           | Default | Description                       |
| --------- | ------------------------------ | ------- | --------------------------------- |
| children  | Snippet                        | -       | Child components to render        |
| className | string                         | -       | Additional CSS classes            |
| ...props  | HTMLAttributes<HTMLDivElement> | -       | All other div props are supported |

### MessageAvatar

| Prop      | Type   | Default | Description                            |
| --------- | ------ | ------- | -------------------------------------- |
| src       | string | -       | URL of the avatar image                |
| alt       | string | -       | Alt text for the avatar image          |
| fallback  | string | -       | Text to display if image fails to load |
| className | string | -       | Additional CSS classes                 |

### MessageContent

| Prop      | Type                           | Default | Description                           |
| --------- | ------------------------------ | ------- | ------------------------------------- |
| children  | Snippet                        | -       | Content to display in the message     |
| markdown  | boolean                        | false   | Whether to render content as markdown |
| className | string                         | -       | Additional CSS classes                |
| ...props  | HTMLAttributes<HTMLDivElement> | -       | All other div props are supported     |

### MessageActions

| Prop      | Type                           | Default | Description                       |
| --------- | ------------------------------ | ------- | --------------------------------- |
| children  | Snippet                        | -       | Child components to render        |
| className | string                         | -       | Additional CSS classes            |
| ...props  | HTMLAttributes<HTMLDivElement> | -       | All other div props are supported |

### MessageAction

| Prop      | Type                                   | Default | Description                                     |
| --------- | -------------------------------------- | ------- | ----------------------------------------------- |
| tooltip   | Snippet                                | -       | Content to show in the tooltip                  |
| children  | Snippet                                | -       | Child component to trigger the tooltip          |
| className | string                                 | -       | Additional CSS classes for the tooltip          |
| side      | "top" \| "bottom" \| "left" \| "right" | "top"   | Position of the tooltip relative to the trigger |
| ...props  | TooltipProps                           | -       | All other Tooltip component props are supported |

---

For more information, visit: https://svelte-ai-elements.vercel.app//prompt-kit/message
