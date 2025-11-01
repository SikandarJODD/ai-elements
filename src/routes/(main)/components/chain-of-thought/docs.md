# Chain of Thought

> A visual representation of an AI's reasoning process, showing step-by-step thinking with support for search results, images, and progress indicators.

## Installation

```bash
npx shadcn-svelte@latest add ${PUBLIC_WEBSITE_URL}/r/chain-of-thought.json
```

## Usage

### Basic Example

```svelte
<script lang="ts">
	import {
		ChainOfThought,
		ChainOfThoughtHeader,
		ChainOfThoughtContent,
		ChainOfThoughtStep
	} from "$lib/components/ai-elements/chain-of-thought";
</script>

<ChainOfThought>
	<ChainOfThoughtHeader>Analyzing the problem...</ChainOfThoughtHeader>
	<ChainOfThoughtContent>
		<ChainOfThoughtStep>First, I need to understand the requirements</ChainOfThoughtStep>
		<ChainOfThoughtStep>Then, I'll break down the solution into steps</ChainOfThoughtStep>
		<ChainOfThoughtStep>Finally, I'll implement the solution</ChainOfThoughtStep>
	</ChainOfThoughtContent>
</ChainOfThought>
```

### With Search Results

```svelte
<script lang="ts">
	import {
		ChainOfThought,
		ChainOfThoughtHeader,
		ChainOfThoughtContent,
		ChainOfThoughtStep,
		ChainOfThoughtSearchResults,
		ChainOfThoughtSearchResult
	} from "$lib/components/ai-elements/chain-of-thought";
</script>

<ChainOfThought>
	<ChainOfThoughtHeader>Researching the topic...</ChainOfThoughtHeader>
	<ChainOfThoughtContent>
		<ChainOfThoughtStep>Searching for relevant information</ChainOfThoughtStep>
		<ChainOfThoughtSearchResults>
			<ChainOfThoughtSearchResult
				title="Article 1"
				url="https://example.com/1"
				description="First search result"
			/>
			<ChainOfThoughtSearchResult
				title="Article 2"
				url="https://example.com/2"
				description="Second search result"
			/>
		</ChainOfThoughtSearchResults>
		<ChainOfThoughtStep>Analyzing the search results</ChainOfThoughtStep>
	</ChainOfThoughtContent>
</ChainOfThought>
```

### With Images

```svelte
<script lang="ts">
	import {
		ChainOfThought,
		ChainOfThoughtHeader,
		ChainOfThoughtContent,
		ChainOfThoughtStep,
		ChainOfThoughtImage
	} from "$lib/components/ai-elements/chain-of-thought";
</script>

<ChainOfThought>
	<ChainOfThoughtHeader>Processing image...</ChainOfThoughtHeader>
	<ChainOfThoughtContent>
		<ChainOfThoughtStep>Analyzing the image content</ChainOfThoughtStep>
		<ChainOfThoughtImage src="/image.jpg" alt="Analysis image" />
		<ChainOfThoughtStep>Extracting key features</ChainOfThoughtStep>
	</ChainOfThoughtContent>
</ChainOfThought>
```

### Streaming Example

```svelte
<script lang="ts">
	import {
		ChainOfThought,
		ChainOfThoughtHeader,
		ChainOfThoughtContent,
		ChainOfThoughtStep
	} from "$lib/components/ai-elements/chain-of-thought";

	let steps = $state<string[]>([]);
	let isThinking = $state(true);

	// Simulate streaming steps
	async function streamThinking() {
		const thinkingSteps = [
			"Understanding the question...",
			"Breaking down the problem...",
			"Formulating a solution...",
			"Verifying the answer..."
		];

		for (const step of thinkingSteps) {
			await new Promise(resolve => setTimeout(resolve, 1000));
			steps.push(step);
		}
		isThinking = false;
	}

	$effect(() => {
		streamThinking();
	});
</script>

<ChainOfThought>
	<ChainOfThoughtHeader>
		{isThinking ? "Thinking..." : "Analysis Complete"}
	</ChainOfThoughtHeader>
	<ChainOfThoughtContent>
		{#each steps as step}
			<ChainOfThoughtStep>{step}</ChainOfThoughtStep>
		{/each}
	</ChainOfThoughtContent>
</ChainOfThought>
```

## Component API

### ChainOfThought

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | Snippet | - | Child components to render |
| class | string | - | Additional CSS classes to apply to the container |
| ...restProps | HTMLAttributes<HTMLDivElement> | - | All other div props are supported |

### ChainOfThoughtHeader

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | Snippet | - | Header content (typically status text) |
| class | string | - | Additional CSS classes to apply to the header |
| ...restProps | HTMLAttributes<HTMLDivElement> | - | All other div props are supported |

### ChainOfThoughtContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | Snippet | - | Content to render (steps, search results, images) |
| class | string | - | Additional CSS classes to apply to the content area |
| ...restProps | HTMLAttributes<HTMLDivElement> | - | All other div props are supported |

### ChainOfThoughtStep

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | Snippet | - | Step content text |
| class | string | - | Additional CSS classes to apply to the step |
| ...restProps | HTMLAttributes<HTMLDivElement> | - | All other div props are supported |

### ChainOfThoughtSearchResults

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | Snippet | - | Search result items |
| class | string | - | Additional CSS classes to apply to the container |
| ...restProps | HTMLAttributes<HTMLDivElement> | - | All other div props are supported |

### ChainOfThoughtSearchResult

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | - | Title of the search result |
| url | string | - | URL of the search result |
| description | string | - | Description of the search result |
| class | string | - | Additional CSS classes to apply to the result |
| ...restProps | HTMLAttributes<HTMLAnchorElement> | - | All other anchor props are supported |

### ChainOfThoughtImage

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| src | string | - | Image source URL |
| alt | string | - | Alternative text for the image |
| class | string | - | Additional CSS classes to apply to the image |
| ...restProps | HTMLAttributes<HTMLImageElement> | - | All other img props are supported |

## Features

- **Step-by-step visualization**: Clear display of reasoning process
- **Search results**: Show research and sources
- **Image support**: Display relevant images in the thinking process
- **Streaming support**: Works with streaming AI responses
- **Progress indicators**: Visual feedback for ongoing thinking
- **Customizable**: Easy to style and extend with custom classes

---

For more information, visit: https://svelte-ai-elements.vercel.app/components/chain-of-thought

