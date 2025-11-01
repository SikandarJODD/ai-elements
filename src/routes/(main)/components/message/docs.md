# Message

> A chat interface message component that displays messages from either a user or an AI assistant with avatar and content.

## Installation

```bash
npx shadcn-svelte@latest add ${PUBLIC_WEBSITE_URL}/r/message.json
```

## Usage

### Basic Example

```svelte
<script lang="ts">
	import { Message, MessageAvatar, MessageContent } from "$lib/components/ai-elements/message";
</script>

<Message from="user">
	<MessageAvatar name="John Doe" />
	<MessageContent>Hello! How can I help you today?</MessageContent>
</Message>

<Message from="assistant">
	<MessageAvatar name="AI Assistant" />
	<MessageContent>I'm here to help! What would you like to know?</MessageContent>
</Message>
```

### With Custom Avatar

```svelte
<script lang="ts">
	import { Message, MessageAvatar, MessageContent } from "$lib/components/ai-elements/message";
</script>

<Message from="user">
	<MessageAvatar src="/avatar.jpg" name="John Doe" />
	<MessageContent>What's the weather like today?</MessageContent>
</Message>
```

### Flat Variant

```svelte
<script lang="ts">
	import { Message, MessageAvatar, MessageContent } from "$lib/components/ai-elements/message";
</script>

<Message from="assistant">
	<MessageAvatar name="AI" />
	<MessageContent variant="flat">
		The weather is sunny with a high of 75°F.
	</MessageContent>
</Message>
```

### With AI SDK

```svelte
<script lang="ts">
	import { Chat } from "@ai-sdk/svelte";
	import { Message, MessageAvatar, MessageContent } from "$lib/components/ai-elements/message";

	const chat = new Chat();
</script>

<div>
	{#each chat.messages as message}
		<Message from={message.role}>
			<MessageAvatar name={message.role === "user" ? "You" : "AI"} />
			<MessageContent>{message.content}</MessageContent>
		</Message>
	{/each}
</div>
```

## Component API

### Message

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| from | 'user' \| 'assistant' | - | The role of the message sender (user or assistant) |
| class | string | - | Additional CSS classes to apply to the message container |
| children | Snippet | - | Child components to render (typically MessageContent and MessageAvatar) |
| ...restProps | HTMLAttributes<HTMLDivElement> | - | All other div props are supported |

### MessageAvatar

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| src | string | - | URL of the avatar image |
| name | string | - | Name of the user (used for fallback text) |
| class | string | - | Additional CSS classes to apply to the avatar |
| ...restProps | ComponentProps<typeof Avatar> | - | All other Avatar component props are supported |

### MessageContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'contained' \| 'flat' | 'contained' | Visual style variant of the message content |
| class | string | - | Additional CSS classes to apply to the content container |
| children | Snippet | - | Content to render inside the message |
| ...restProps | HTMLAttributes<HTMLDivElement> | - | All other div props are supported |

## Features

- **Role-based styling**: Different styles for user and assistant messages
- **Avatar support**: Display user avatars with fallback to initials
- **Flexible content**: Support for text, markdown, and custom content
- **Variants**: Choose between contained and flat message styles
- **Customizable**: Easy to style and extend with custom classes

---

For more information, visit: https://svelte-ai-elements.vercel.app/components/message

