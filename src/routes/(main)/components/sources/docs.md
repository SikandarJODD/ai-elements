# Sources

> Display sources or citations used to generate an AI response with expandable details.

## Installation

```bash
npx shadcn-svelte@latest add ${PUBLIC_WEBSITE_URL}/r/sources.json
```

## Usage

### Basic Example

```svelte
<script lang="ts">
	import {
		Sources,
		SourcesHeader,
		SourcesContent,
		SourceItem
	} from "$lib/components/ai-elements/sources";

	const sources = [
		{
			title: "Wikipedia - Quantum Computing",
			url: "https://en.wikipedia.org/wiki/Quantum_computing",
			description: "Overview of quantum computing principles"
		},
		{
			title: "Nature - Quantum Supremacy",
			url: "https://www.nature.com/articles/s41586-019-1666-5",
			description: "Research paper on quantum supremacy"
		}
	];
</script>

<Sources>
	<SourcesHeader>Sources ({sources.length})</SourcesHeader>
	<SourcesContent>
		{#each sources as source}
			<SourceItem
				title={source.title}
				url={source.url}
				description={source.description}
			/>
		{/each}
	</SourcesContent>
</Sources>
```

### With AI SDK (Perplexity Sonar)

```svelte
<script lang="ts">
	import { Chat } from "@ai-sdk/svelte";
	import {
		Sources,
		SourcesHeader,
		SourcesContent,
		SourceItem
	} from "$lib/components/ai-elements/sources";

	const chat = new Chat({
		api: "/api/chat",
		model: "perplexity-sonar"
	});

	$: lastMessage = chat.messages[chat.messages.length - 1];
	$: sources = lastMessage?.sources || [];
</script>

<form onsubmit={chat.submit}>
	<input bind:value={chat.input} placeholder="Ask a question..." />
	<button type="submit">Search</button>
</form>

{#if lastMessage?.content}
	<div class="prose">
		{lastMessage.content}
	</div>
{/if}

{#if sources.length > 0}
	<Sources>
		<SourcesHeader>Sources ({sources.length})</SourcesHeader>
		<SourcesContent>
			{#each sources as source}
				<SourceItem
					title={source.title}
					url={source.url}
					description={source.description}
				/>
			{/each}
		</SourcesContent>
	</Sources>
{/if}
```

### Collapsible Sources

```svelte
<script lang="ts">
	import {
		Sources,
		SourcesHeader,
		SourcesContent,
		SourceItem
	} from "$lib/components/ai-elements/sources";

	const sources = [/* ... */];
	let isOpen = $state(false);
</script>

<Sources bind:open={isOpen}>
	<SourcesHeader>
		{isOpen ? "Hide" : "Show"} Sources ({sources.length})
	</SourcesHeader>
	<SourcesContent>
		{#each sources as source}
			<SourceItem {...source} />
		{/each}
	</SourcesContent>
</Sources>
```

## Component API

### Sources

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | Snippet | - | Child components to render |
| open | boolean | false | Whether the sources are expanded |
| class | string | - | Additional CSS classes to apply to the container |
| ...restProps | CollapsibleProps | - | All other Collapsible component props are supported |

### SourcesHeader

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | Snippet | - | Header content (typically "Sources (count)") |
| class | string | - | Additional CSS classes to apply to the header |
| ...restProps | CollapsibleTriggerProps | - | All other CollapsibleTrigger props are supported |

### SourcesContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | Snippet | - | Source items to display |
| class | string | - | Additional CSS classes to apply to the content |
| ...restProps | CollapsibleContentProps | - | All other CollapsibleContent props are supported |

### SourceItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | - | Title of the source |
| url | string | - | URL of the source |
| description | string | - | Description of the source (optional) |
| class | string | - | Additional CSS classes to apply to the item |
| ...restProps | HTMLAttributes<HTMLAnchorElement> | - | All other anchor props are supported |

## Features

- **Collapsible**: Expand/collapse sources to save space
- **Source details**: Title, URL, and description for each source
- **AI SDK integration**: Works with Perplexity Sonar and other search models
- **Customizable**: Easy to style and extend with custom classes
- **Accessible**: Proper ARIA labels and keyboard navigation
- **Link preview**: Hover to see full URL

---

For more information, visit: https://svelte-ai-elements.vercel.app/components/sources

