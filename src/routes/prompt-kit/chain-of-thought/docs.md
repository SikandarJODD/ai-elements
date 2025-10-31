# Chain of Thought

> A composable component for displaying AI's step-by-step reasoning process. Features collapsible steps with custom icons, content items, and visual connectors to show the thinking flow.

## Installation

```bash
npx shadcn-svelte@latest add ${PUBLIC_WEBSITE_URL}/p/chain-of-thought.json
```

## Usage

### Basic Example

```svelte
<script lang="ts">
	import {
		ChainOfThought,
		ChainOfThoughtContent,
		ChainOfThoughtItem,
		ChainOfThoughtStep,
		ChainOfThoughtTrigger,
	} from "$lib/components/prompt-kit/chain-of-thought";
</script>

<ChainOfThought>
	<ChainOfThoughtStep>
		<ChainOfThoughtTrigger>Analyzing the user's request</ChainOfThoughtTrigger>
		<ChainOfThoughtContent>
			<ChainOfThoughtItem>
				The user asked about implementing a sorting algorithm
			</ChainOfThoughtItem>
			<ChainOfThoughtItem>
				This appears to be a technical question requiring code examples
			</ChainOfThoughtItem>
		</ChainOfThoughtContent>
	</ChainOfThoughtStep>

	<ChainOfThoughtStep>
		<ChainOfThoughtTrigger>Considering implementation options</ChainOfThoughtTrigger>
		<ChainOfThoughtContent>
			<ChainOfThoughtItem>
				Quick sort: O(n log n) average case, good for general purpose
			</ChainOfThoughtItem>
			<ChainOfThoughtItem>
				Merge sort: O(n log n) worst case, stable and predictable
			</ChainOfThoughtItem>
			<ChainOfThoughtItem>
				Bubble sort: O(n²), simple but inefficient for large datasets
			</ChainOfThoughtItem>
		</ChainOfThoughtContent>
	</ChainOfThoughtStep>

	<ChainOfThoughtStep isLast>
		<ChainOfThoughtTrigger>Selecting the best approach</ChainOfThoughtTrigger>
		<ChainOfThoughtContent>
			<ChainOfThoughtItem>
				Given the educational context, I'll demonstrate merge sort for its clarity
			</ChainOfThoughtItem>
			<ChainOfThoughtItem>
				It shows the divide-and-conquer principle effectively
			</ChainOfThoughtItem>
		</ChainOfThoughtContent>
	</ChainOfThoughtStep>
</ChainOfThought>
```

## Component API

### ChainOfThought

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | Snippet | - | The ChainOfThoughtStep components to display |
| class | string | - | Additional CSS classes |

### ChainOfThoughtStep

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | Snippet | - | The trigger and content components |
| class | string | - | Additional CSS classes |
| isLast | boolean | false | Whether this is the last step (hides connector line) |
| open | boolean | - | Control the open state (makes component controlled) |
| onOpenChange | (open: boolean) => void | - | Callback when open state changes |
| ...props | CollapsibleRootProps | - | Additional Collapsible component props from bits-ui |

### ChainOfThoughtTrigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | Snippet | - | The trigger text content |
| class | string | - | Additional CSS classes |
| leftIcon | Snippet | - | Optional icon to display on the left side |
| swapIconOnHover | boolean | true | Whether to swap the left icon with chevron on hover |
| ...props | CollapsibleTriggerProps | - | Additional Collapsible trigger props from bits-ui |

### ChainOfThoughtContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | Snippet | - | The content items to display |
| class | string | - | Additional CSS classes |
| ...props | CollapsibleContentProps | - | Additional Collapsible content props from bits-ui |

### ChainOfThoughtItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | Snippet | - | The item content |
| class | string | - | Additional CSS classes |
| ...props | HTMLAttributes<HTMLDivElement> | - | Additional HTML div props |

## Usage Notes

### Component Structure

The Chain of Thought component follows a composable pattern. Wrap your steps in `ChainOfThought`, then use `ChainOfThoughtStep` for each reasoning step. Each step contains a `ChainOfThoughtTrigger` and `ChainOfThoughtContent`.

### Custom Icons

Use the `leftIcon` snippet prop on the trigger to add custom icons from `@lucide/svelte`. By default, the icon swaps with a chevron on hover, but you can disable this with `swapIconOnHover={false}`.

### Visual Connectors

The component automatically adds visual connector lines between steps. Set `isLast={true}` on the final step to hide the connector line after it.

### Rich Content

You can embed any content inside `ChainOfThoughtItem`, including code blocks, images, or other components. This makes it perfect for showing complex reasoning with examples.

---

For more information, visit: https://ai-elements.vercel.app/prompt-kit/chain-of-thought

