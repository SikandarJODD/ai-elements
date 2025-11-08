# Queue

> A flexible component for displaying lists of pending and completed tasks, messages, or items with collapsible sections and attachment support.

## Installation

```bash
npx shadcn-svelte@latest add https://svelte-ai-elements.vercel.app/r/queue.json
```

## Usage

### Basic Example

```svelte
<script lang="ts">
  import {
    Queue,
    QueueSection,
    QueueSectionTrigger,
    QueueSectionLabel,
    QueueSectionContent,
    QueueList,
    QueueItem,
    QueueItemIndicator,
    QueueItemContent,
  } from "$lib/components/ai-elements/queue";

  const pendingTasks = [
    { id: "1", title: "Review pull request" },
    { id: "2", title: "Update documentation" },
  ];

  const completedTasks = [{ id: "3", title: "Fix bug in login" }];
</script>

<Queue>
  <QueueSection>
    <QueueSectionTrigger>
      <QueueSectionLabel count={pendingTasks.length} label=" Pending" />
    </QueueSectionTrigger>
    <QueueSectionContent>
      <QueueList>
        {#each pendingTasks as task (task.id)}
          <QueueItem>
            <QueueItemIndicator />
            <QueueItemContent>{task.title}</QueueItemContent>
          </QueueItem>
        {/each}
      </QueueList>
    </QueueSectionContent>
  </QueueSection>

  <QueueSection>
    <QueueSectionTrigger>
      <QueueSectionLabel count={completedTasks.length} label=" Completed" />
    </QueueSectionTrigger>
    <QueueSectionContent>
      <QueueList>
        {#each completedTasks as task (task.id)}
          <QueueItem>
            <QueueItemIndicator completed />
            <QueueItemContent completed>{task.title}</QueueItemContent>
          </QueueItem>
        {/each}
      </QueueList>
    </QueueSectionContent>
  </QueueSection>
</Queue>
```

### With Descriptions

```svelte
<script lang="ts">
  import {
    Queue,
    QueueList,
    QueueItem,
    QueueItemIndicator,
    QueueItemContent,
    QueueItemDescription,
  } from "$lib/components/ai-elements/queue";

  const tasks = [
    {
      id: "1",
      title: "Implement authentication",
      description: "Add OAuth2 support with Google and GitHub providers",
    },
    {
      id: "2",
      title: "Design landing page",
      description: "Create wireframes and mockups for the homepage",
    },
  ];
</script>

<Queue>
  <QueueList>
    {#each tasks as task (task.id)}
      <QueueItem>
        <QueueItemIndicator />
        <QueueItemContent>{task.title}</QueueItemContent>
        <QueueItemDescription>{task.description}</QueueItemDescription>
      </QueueItem>
    {/each}
  </QueueList>
</Queue>
```

### With Actions

```svelte
<script lang="ts">
  import {
    Queue,
    QueueList,
    QueueItem,
    QueueItemIndicator,
    QueueItemContent,
    QueueItemActions,
    QueueItemAction,
  } from "$lib/components/ai-elements/queue";
  import { Trash2, Edit } from "@lucide/svelte/icons";

  const tasks = [
    { id: "1", title: "Review pull request" },
    { id: "2", title: "Update documentation" },
  ];

  function handleEdit(id: string) {
    console.log("Edit task:", id);
  }

  function handleDelete(id: string) {
    console.log("Delete task:", id);
  }
</script>

<Queue>
  <QueueList>
    {#each tasks as task (task.id)}
      <QueueItem>
        <QueueItemIndicator />
        <QueueItemContent>{task.title}</QueueItemContent>
        <QueueItemActions>
          <QueueItemAction onclick={() => handleEdit(task.id)}>
            <Edit size={14} />
          </QueueItemAction>
          <QueueItemAction onclick={() => handleDelete(task.id)}>
            <Trash2 size={14} />
          </QueueItemAction>
        </QueueItemActions>
      </QueueItem>
    {/each}
  </QueueList>
</Queue>
```

### With Attachments

```svelte
<script lang="ts">
  import {
    Queue,
    QueueList,
    QueueItem,
    QueueItemIndicator,
    QueueItemContent,
    QueueItemAttachment,
    QueueItemImage,
    QueueItemFile,
  } from "$lib/components/ai-elements/queue";

  const messages = [
    {
      id: "1",
      content: "Check out these designs",
      attachments: [
        { type: "image", url: "/design1.png" },
        { type: "image", url: "/design2.png" },
      ],
    },
    {
      id: "2",
      content: "Here's the report",
      attachments: [{ type: "file", filename: "report.pdf" }],
    },
  ];
</script>

<Queue>
  <QueueList>
    {#each messages as message (message.id)}
      <QueueItem>
        <QueueItemIndicator />
        <QueueItemContent>{message.content}</QueueItemContent>
        <QueueItemAttachment>
          {#each message.attachments as attachment}
            {#if attachment.type === "image"}
              <QueueItemImage src={attachment.url} alt="Attachment" />
            {:else if attachment.type === "file"}
              <QueueItemFile>{attachment.filename}</QueueItemFile>
            {/if}
          {/each}
        </QueueItemAttachment>
      </QueueItem>
    {/each}
  </QueueList>
</Queue>
```

### With AI SDK

```svelte
<script lang="ts">
  import { Chat } from "@ai-sdk/svelte";
  import {
    Queue,
    QueueSection,
    QueueSectionTrigger,
    QueueSectionLabel,
    QueueSectionContent,
    QueueList,
    QueueItem,
    QueueItemIndicator,
    QueueItemContent,
  } from "$lib/components/ai-elements/queue";

  const chat = new Chat();

  $: pendingMessages = chat.messages.filter((m) => m.status === "pending");
  $: completedMessages = chat.messages.filter((m) => m.status === "completed");
</script>

<Queue>
  <QueueSection>
    <QueueSectionTrigger>
      <QueueSectionLabel count={pendingMessages.length} label=" Pending" />
    </QueueSectionTrigger>
    <QueueSectionContent>
      <QueueList>
        {#each pendingMessages as message (message.id)}
          <QueueItem>
            <QueueItemIndicator />
            <QueueItemContent>{message.content}</QueueItemContent>
          </QueueItem>
        {/each}
      </QueueList>
    </QueueSectionContent>
  </QueueSection>

  <QueueSection>
    <QueueSectionTrigger>
      <QueueSectionLabel count={completedMessages.length} label=" Completed" />
    </QueueSectionTrigger>
    <QueueSectionContent>
      <QueueList>
        {#each completedMessages as message (message.id)}
          <QueueItem>
            <QueueItemIndicator completed />
            <QueueItemContent completed>{message.content}</QueueItemContent>
          </QueueItem>
        {/each}
      </QueueList>
    </QueueSectionContent>
  </QueueSection>
</Queue>
```

## Component API

### Queue

| Prop         | Type                           | Default | Description                                      |
| ------------ | ------------------------------ | ------- | ------------------------------------------------ |
| class        | string                         | -       | Additional CSS classes to apply to the container |
| children     | Snippet                        | -       | Child components                                 |
| ...restProps | HTMLAttributes<HTMLDivElement> | -       | All other div props are supported                |

### QueueSection

| Prop         | Type             | Default | Description                               |
| ------------ | ---------------- | ------- | ----------------------------------------- |
| defaultOpen  | boolean          | true    | Whether the section is open by default    |
| class        | string           | -       | Additional CSS classes                    |
| children     | Snippet          | -       | Child components                          |
| ...restProps | CollapsibleProps | -       | All other Collapsible props are supported |

### QueueSectionTrigger

| Prop         | Type                 | Default | Description            |
| ------------ | -------------------- | ------- | ---------------------- |
| class        | string               | -       | Additional CSS classes |
| children     | Snippet              | -       | Child components       |
| ...restProps | HTMLButtonAttributes | -       | All other button props |

### QueueSectionLabel

| Prop     | Type    | Default | Description               |
| -------- | ------- | ------- | ------------------------- |
| label    | string  | -       | Label text to display     |
| count    | number  | -       | Optional count to display |
| icon     | Snippet | -       | Optional icon snippet     |
| class    | string  | -       | Additional CSS classes    |
| children | Snippet | -       | Additional child content  |

### QueueSectionContent

| Prop         | Type                    | Default | Description                                      |
| ------------ | ----------------------- | ------- | ------------------------------------------------ |
| class        | string                  | -       | Additional CSS classes                           |
| children     | Snippet                 | -       | Child components                                 |
| ...restProps | CollapsibleContentProps | -       | All other CollapsibleContent props are supported |

### QueueList

| Prop         | Type            | Default | Description                              |
| ------------ | --------------- | ------- | ---------------------------------------- |
| class        | string          | -       | Additional CSS classes                   |
| children     | Snippet         | -       | Child components (QueueItem)             |
| ...restProps | ScrollAreaProps | -       | All other ScrollArea props are supported |

### QueueItem

| Prop         | Type             | Default | Description            |
| ------------ | ---------------- | ------- | ---------------------- |
| class        | string           | -       | Additional CSS classes |
| children     | Snippet          | -       | Child components       |
| ...restProps | HTMLLiAttributes | -       | All other li props     |

### QueueItemIndicator

| Prop      | Type    | Default | Description                   |
| --------- | ------- | ------- | ----------------------------- |
| completed | boolean | false   | Whether the item is completed |
| class     | string  | -       | Additional CSS classes        |

### QueueItemContent

| Prop      | Type    | Default | Description                   |
| --------- | ------- | ------- | ----------------------------- |
| completed | boolean | false   | Whether the item is completed |
| class     | string  | -       | Additional CSS classes        |
| children  | Snippet | -       | Content to display            |

### QueueItemDescription

| Prop      | Type    | Default | Description                   |
| --------- | ------- | ------- | ----------------------------- |
| completed | boolean | false   | Whether the item is completed |
| class     | string  | -       | Additional CSS classes        |
| children  | Snippet | -       | Description content           |

### QueueItemActions

| Prop     | Type    | Default | Description            |
| -------- | ------- | ------- | ---------------------- |
| class    | string  | -       | Additional CSS classes |
| children | Snippet | -       | Action buttons         |

### QueueItemAction

| Prop         | Type        | Default | Description                   |
| ------------ | ----------- | ------- | ----------------------------- |
| class        | string      | -       | Additional CSS classes        |
| children     | Snippet     | -       | Button content (usually icon) |
| ...restProps | ButtonProps | -       | All other Button props        |

### QueueItemAttachment

| Prop     | Type    | Default | Description            |
| -------- | ------- | ------- | ---------------------- |
| class    | string  | -       | Additional CSS classes |
| children | Snippet | -       | Attachment items       |

### QueueItemImage

| Prop         | Type              | Default | Description            |
| ------------ | ----------------- | ------- | ---------------------- |
| src          | string            | -       | Image source URL       |
| alt          | string            | ""      | Image alt text         |
| class        | string            | -       | Additional CSS classes |
| ...restProps | HTMLImgAttributes | -       | All other img props    |

### QueueItemFile

| Prop     | Type    | Default | Description            |
| -------- | ------- | ------- | ---------------------- |
| class    | string  | -       | Additional CSS classes |
| children | Snippet | -       | Filename to display    |

## Features

- **Collapsible sections** for organizing items into groups
- **Completed/pending states** with visual indicators
- **Hover-revealed actions** for clean UI
- **Attachment support** for images and files
- **Scrollable lists** with max height
- **Smooth animations** for expand/collapse
- **Keyboard accessible** with proper ARIA labels
- **Responsive design** that adapts to different screen sizes
- **Seamless light/dark theme** integration

## Use Cases

- **Task management**: Display pending and completed tasks
- **Message queues**: Show queued messages with attachments
- **Todo lists**: Organize todos with descriptions and actions
- **Workflow steps**: Display multi-step processes
- **File uploads**: Show upload queue with progress
- **AI agent tasks**: Display agent's pending and completed actions

---

For more information, visit: https://svelte-ai-elements.vercel.app/components/queue
