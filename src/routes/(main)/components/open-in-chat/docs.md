# Open In Chat

> A dropdown menu that allows users to open queries in different AI chat platforms with a single click.

## Installation

```bash
npx shadcn-svelte@latest add https://svelte-ai-elements.vercel.app//r/open-in-chat.json
```

## Usage

### Basic Example

```svelte
<script lang="ts">
  import { OpenInChat } from "$lib/components/ai-elements/open-in-chat";

  const query = "Explain quantum computing";
</script>

<OpenInChat {query} />
```

### With Custom Trigger

```svelte
<script lang="ts">
  import {
    OpenInChat,
    OpenInChatTrigger,
    OpenInChatContent,
    OpenInChatItem,
  } from "$lib/components/ai-elements/open-in-chat";
  import { ExternalLink } from "lucide-svelte";

  const query = "What is machine learning?";
</script>

<OpenInChat>
  <OpenInChatTrigger>
    <ExternalLink class="size-4" />
    Open in AI Chat
  </OpenInChatTrigger>
  <OpenInChatContent {query} />
</OpenInChat>
```

### Custom Platforms

```svelte
<script lang="ts">
  import {
    OpenInChat,
    OpenInChatTrigger,
    OpenInChatContent,
    OpenInChatItem,
  } from "$lib/components/ai-elements/open-in-chat";

  const query = "Explain neural networks";
  const platforms = [
    {
      name: "ChatGPT",
      url: `https://chat.openai.com/?q=${encodeURIComponent(query)}`,
    },
    {
      name: "Claude",
      url: `https://claude.ai/new?q=${encodeURIComponent(query)}`,
    },
    {
      name: "Gemini",
      url: `https://gemini.google.com/app?q=${encodeURIComponent(query)}`,
    },
  ];
</script>

<OpenInChat>
  <OpenInChatTrigger>Open in...</OpenInChatTrigger>
  <OpenInChatContent>
    {#each platforms as platform}
      <OpenInChatItem href={platform.url} target="_blank">
        {platform.name}
      </OpenInChatItem>
    {/each}
  </OpenInChatContent>
</OpenInChat>
```

### With Dynamic Query

```svelte
<script lang="ts">
  import { OpenInChat } from "$lib/components/ai-elements/open-in-chat";

  let userQuery = $state("");
</script>

<input bind:value={userQuery} placeholder="Enter your question..." />
<OpenInChat query={userQuery} disabled={!userQuery} />
```

## Component API

### OpenInChat

| Prop         | Type              | Default | Description                                          |
| ------------ | ----------------- | ------- | ---------------------------------------------------- |
| query        | string            | -       | The query text to open in AI chat platforms          |
| children     | Snippet           | -       | Custom trigger and content (optional)                |
| disabled     | boolean           | false   | Whether the dropdown is disabled                     |
| class        | string            | -       | Additional CSS classes to apply to the container     |
| ...restProps | DropdownMenuProps | -       | All other DropdownMenu component props are supported |

### OpenInChatTrigger

| Prop         | Type                     | Default | Description                                       |
| ------------ | ------------------------ | ------- | ------------------------------------------------- |
| children     | Snippet                  | -       | Custom trigger content                            |
| class        | string                   | -       | Additional CSS classes to apply to the trigger    |
| ...restProps | DropdownMenuTriggerProps | -       | All other DropdownMenuTrigger props are supported |

### OpenInChatContent

| Prop         | Type                     | Default | Description                                       |
| ------------ | ------------------------ | ------- | ------------------------------------------------- |
| query        | string                   | -       | The query text (when using default items)         |
| children     | Snippet                  | -       | Custom menu items (optional)                      |
| class        | string                   | -       | Additional CSS classes to apply to the content    |
| ...restProps | DropdownMenuContentProps | -       | All other DropdownMenuContent props are supported |

### OpenInChatItem

| Prop         | Type                  | Default | Description                                    |
| ------------ | --------------------- | ------- | ---------------------------------------------- |
| href         | string                | -       | URL to open                                    |
| children     | Snippet               | -       | Item content                                   |
| class        | string                | -       | Additional CSS classes to apply to the item    |
| ...restProps | DropdownMenuItemProps | -       | All other DropdownMenuItem props are supported |

## Features

- **Multiple platforms**: ChatGPT, Claude, Gemini, and more
- **One-click access**: Open queries in AI chats instantly
- **Customizable**: Add your own platforms and styling
- **URL encoding**: Automatically encodes queries for URLs
- **Keyboard navigation**: Full keyboard support
- **Accessible**: Proper ARIA labels and focus management

## Default Platforms

The component includes these platforms by default:

- ChatGPT (OpenAI)
- Claude (Anthropic)
- Gemini (Google)
- Perplexity
- You.com

---

For more information, visit: https://svelte-ai-elements.vercel.app/components/open-in-chat
