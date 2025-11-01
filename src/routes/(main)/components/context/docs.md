# Context

> A comprehensive view of AI model usage displaying context window utilization, token consumption breakdown, and cost estimation.

## Installation

```bash
npx shadcn-svelte@latest add ${PUBLIC_WEBSITE_URL}/r/context.json
```

## Usage

### Basic Example

```svelte
<script lang="ts">
	import {
		Context,
		ContextTrigger,
		ContextContent,
		ContextInputUsage,
		ContextOutputUsage
	} from "$lib/components/ai-elements/context";
</script>

<Context>
	<ContextTrigger />
	<ContextContent>
		<ContextInputUsage tokens={1500} />
		<ContextOutputUsage tokens={500} />
	</ContextContent>
</Context>
```

### With All Usage Types

```svelte
<script lang="ts">
	import {
		Context,
		ContextTrigger,
		ContextContent,
		ContextInputUsage,
		ContextOutputUsage,
		ContextReasoningUsage,
		ContextCacheUsage
	} from "$lib/components/ai-elements/context";
</script>

<Context>
	<ContextTrigger />
	<ContextContent>
		<ContextInputUsage tokens={2000} cost={0.002} />
		<ContextOutputUsage tokens={800} cost={0.004} />
		<ContextReasoningUsage tokens={500} cost={0.001} />
		<ContextCacheUsage tokens={1000} cost={0.0005} />
	</ContextContent>
</Context>
```

### With AI SDK

```svelte
<script lang="ts">
	import { Chat } from "@ai-sdk/svelte";
	import {
		Context,
		ContextTrigger,
		ContextContent,
		ContextInputUsage,
		ContextOutputUsage
	} from "$lib/components/ai-elements/context";

	const chat = new Chat();

	$: lastMessage = chat.messages[chat.messages.length - 1];
	$: usage = lastMessage?.usage;
</script>

{#if usage}
	<Context>
		<ContextTrigger />
		<ContextContent>
			<ContextInputUsage tokens={usage.promptTokens} />
			<ContextOutputUsage tokens={usage.completionTokens} />
		</ContextContent>
	</Context>
{/if}
```

### Custom Header and Footer

```svelte
<script lang="ts">
	import {
		Context,
		ContextTrigger,
		ContextContent,
		ContextContentHeader,
		ContextContentBody,
		ContextContentFooter,
		ContextInputUsage,
		ContextOutputUsage
	} from "$lib/components/ai-elements/context";
</script>

<Context>
	<ContextTrigger />
	<ContextContent>
		<ContextContentHeader>
			<h3>Token Usage</h3>
		</ContextContentHeader>
		<ContextContentBody>
			<ContextInputUsage tokens={1500} />
			<ContextOutputUsage tokens={500} />
		</ContextContentBody>
		<ContextContentFooter>
			<p>Total: 2000 tokens</p>
		</ContextContentFooter>
	</ContextContent>
</Context>
```

## Component API

### Context

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | Snippet | - | Child components to render |
| class | string | - | Additional CSS classes to apply to the container |
| ...restProps | HoverCardProps | - | All other HoverCard component props are supported |

### ContextTrigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | Snippet | - | Custom trigger content (defaults to context icon) |
| class | string | - | Additional CSS classes to apply to the trigger |
| ...restProps | HoverCardTriggerProps | - | All other HoverCardTrigger props are supported |

### ContextContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | Snippet | - | Usage components to display |
| class | string | - | Additional CSS classes to apply to the content |
| ...restProps | HoverCardContentProps | - | All other HoverCardContent props are supported |

### ContextInputUsage

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| tokens | number | - | Number of input tokens used |
| cost | number | - | Cost of input tokens (optional) |
| class | string | - | Additional CSS classes to apply |
| ...restProps | HTMLAttributes<HTMLDivElement> | - | All other div props are supported |

### ContextOutputUsage

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| tokens | number | - | Number of output tokens used |
| cost | number | - | Cost of output tokens (optional) |
| class | string | - | Additional CSS classes to apply |
| ...restProps | HTMLAttributes<HTMLDivElement> | - | All other div props are supported |

### ContextReasoningUsage

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| tokens | number | - | Number of reasoning tokens used |
| cost | number | - | Cost of reasoning tokens (optional) |
| class | string | - | Additional CSS classes to apply |
| ...restProps | HTMLAttributes<HTMLDivElement> | - | All other div props are supported |

### ContextCacheUsage

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| tokens | number | - | Number of cached tokens used |
| cost | number | - | Cost of cached tokens (optional) |
| class | string | - | Additional CSS classes to apply |
| ...restProps | HTMLAttributes<HTMLDivElement> | - | All other div props are supported |

## Features

- **Comprehensive usage tracking**: Input, output, reasoning, and cache tokens
- **Cost estimation**: Optional cost display for each token type
- **Hover card interface**: Clean, non-intrusive display
- **AI SDK integration**: Works seamlessly with AI SDK usage data
- **Customizable**: Easy to style and extend with custom classes
- **Accessible**: Proper ARIA labels and keyboard navigation

---

For more information, visit: https://svelte-ai-elements.vercel.app/components/context

