# Checkpoint

> A simple component for marking conversation history points and restoring the chat to a previous state.

## Installation

```bash
npx shadcn-svelte@latest add https://svelte-ai-elements.vercel.app/r/checkpoint.json
```

## Usage

### Basic Example

```svelte
<script lang="ts">
  import {
    Checkpoint,
    CheckpointIcon,
    CheckpointTrigger,
  } from "$lib/components/ai-elements/checkpoint";
</script>

<Checkpoint>
  <CheckpointIcon />
  <CheckpointTrigger onclick={() => console.log("Restore clicked")}>
    Restore checkpoint
  </CheckpointTrigger>
</Checkpoint>
```

### With Tooltip

```svelte
<script lang="ts">
  import {
    Checkpoint,
    CheckpointIcon,
    CheckpointTrigger,
  } from "$lib/components/ai-elements/checkpoint";
</script>

<Checkpoint>
  <CheckpointIcon />
  <CheckpointTrigger
    tooltip="Restores workspace and chat to this point"
    onclick={() => handleRestore()}
  >
    Restore checkpoint
  </CheckpointTrigger>
</Checkpoint>
```

### With Conversation

```svelte
<script lang="ts">
  import {
    Checkpoint,
    CheckpointIcon,
    CheckpointTrigger,
  } from "$lib/components/ai-elements/checkpoint";
  import {
    Conversation,
    ConversationContent,
  } from "$lib/components/ai-elements/conversation";
  import {
    Message,
    MessageContent,
  } from "$lib/components/ai-elements/message";

  type MessageType = {
    id: string;
    role: "user" | "assistant";
    content: string;
  };

  let messages = $state<MessageType[]>([
    { id: "1", role: "user", content: "What is React?" },
    {
      id: "2",
      role: "assistant",
      content: "React is a JavaScript library...",
    },
  ]);

  let checkpoints = $state([{ messageCount: 2, label: "After React basics" }]);

  function handleRestore(messageCount: number) {
    messages = messages.slice(0, messageCount);
  }
</script>

<Conversation>
  <ConversationContent>
    {#each messages as message, index (message.id)}
      <Message from={message.role}>
        <MessageContent>{message.content}</MessageContent>
      </Message>

      {#each checkpoints as checkpoint (checkpoint.label)}
        {#if checkpoint.messageCount === index + 1}
          <Checkpoint>
            <CheckpointIcon />
            <CheckpointTrigger
              onclick={() => handleRestore(checkpoint.messageCount)}
            >
              Restore: {checkpoint.label}
            </CheckpointTrigger>
          </Checkpoint>
        {/if}
      {/each}
    {/each}
  </ConversationContent>
</Conversation>
```

### Custom Icon

```svelte
<script lang="ts">
  import {
    Checkpoint,
    CheckpointIcon,
    CheckpointTrigger,
  } from "$lib/components/ai-elements/checkpoint";
  import { Flag } from "@lucide/svelte/icons";
</script>

<Checkpoint>
  <CheckpointIcon>
    <Flag class="size-4 text-blue-500" />
  </CheckpointIcon>
  <CheckpointTrigger onclick={() => handleRestore()}>
    Restore checkpoint
  </CheckpointTrigger>
</Checkpoint>
```

## Component API

### Checkpoint

| Prop         | Type                           | Default | Description                                          |
| ------------ | ------------------------------ | ------- | ---------------------------------------------------- |
| class        | string                         | -       | Additional CSS classes to apply to the container     |
| children     | Snippet                        | -       | Child components (CheckpointIcon, CheckpointTrigger) |
| ...restProps | HTMLAttributes<HTMLDivElement> | -       | All other div props are supported                    |

### CheckpointIcon

| Prop     | Type    | Default | Description                                  |
| -------- | ------- | ------- | -------------------------------------------- |
| class    | string  | -       | Additional CSS classes to apply to the icon  |
| children | Snippet | -       | Custom icon content (overrides default icon) |
| size     | number  | 16      | Size of the icon in pixels                   |

### CheckpointTrigger

| Prop     | Type                                                                        | Default | Description                                   |
| -------- | --------------------------------------------------------------------------- | ------- | --------------------------------------------- |
| class    | string                                                                      | -       | Additional CSS classes to apply to the button |
| children | Snippet                                                                     | -       | Button content                                |
| variant  | 'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link' | 'ghost' | Button variant style                          |
| size     | 'default' \| 'sm' \| 'lg' \| 'icon'                                         | 'sm'    | Button size                                   |
| tooltip  | string                                                                      | -       | Optional tooltip text to display on hover     |
| onclick  | (e: MouseEvent) => void                                                     | -       | Click handler function                        |
| disabled | boolean                                                                     | false   | Whether the button is disabled                |

## Features

- **Simple flex layout** with icon, trigger, and separator
- **Visual separator line** for clear conversation breaks
- **Clickable restore button** for reverting to checkpoint
- **Customizable icon** (defaults to BookmarkIcon)
- **Optional tooltip** for additional context
- **Keyboard accessible** with proper ARIA labels
- **Responsive design** that adapts to different screen sizes
- **Seamless light/dark theme** integration

## Use Cases

- **Conversation branching**: Allow users to explore different conversation paths
- **Undo functionality**: Revert to previous conversation states
- **Version control**: Mark important points in a conversation
- **Debugging**: Test different conversation flows
- **User experience**: Give users control over conversation history

---

For more information, visit: https://svelte-ai-elements.vercel.app/components/checkpoint
