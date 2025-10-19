# Prompt Input Component

A flexible and composable prompt input component for Svelte applications, perfect for AI chat interfaces and similar use cases.

## Features

- 🎨 **Composable Architecture** - Build custom layouts with sub-components
- 📏 **Auto-resize** - Textarea automatically grows with content
- 🎯 **Context-based State** - Clean state management using Svelte context
- ♿ **Accessible** - Built with accessibility in mind
- 🎭 **Tooltip Support** - Integrated tooltip actions
- ⌨️ **Keyboard Shortcuts** - Submit on Enter (Shift+Enter for new line)

## Installation

This component uses:
- `bits-ui` for tooltips
- `@lucide/svelte` for icons
- `runed` for reactive utilities (watch)

Make sure these dependencies are installed in your project.

## Usage

### Basic Example

```svelte
<script lang="ts">
	import {
		PromptInput,
		PromptInputTextarea,
		PromptInputActions,
		PromptInputAction
	} from '$lib/components/prompt-kit/prompt-input';
	import { Button } from '$lib/components/ui/button';
	import SendIcon from '@lucide/svelte/icons/send';

	let value = $state('');
	let isLoading = $state(false);

	function handleSubmit() {
		console.log('Submitting:', value);
	}

	function handleValueChange(newValue: string) {
		value = newValue;
	}
</script>

<PromptInput
	{isLoading}
	{value}
	onValueChange={handleValueChange}
	onSubmit={handleSubmit}
>
	<PromptInputTextarea placeholder="Type your message..." />
	<PromptInputActions>
		<PromptInputAction>
			{#snippet tooltip()}
				<p>Send message</p>
			{/snippet}
			<Button size="icon" onclick={handleSubmit}>
				<SendIcon class="h-4 w-4" />
			</Button>
		</PromptInputAction>
	</PromptInputActions>
</PromptInput>
```

### Advanced Example with Multiple Actions

```svelte
<script lang="ts">
	import {
		PromptInput,
		PromptInputTextarea,
		PromptInputActions,
		PromptInputAction
	} from '$lib/components/prompt-kit/prompt-input';
	import { Button } from '$lib/components/ui/button';
	import SendIcon from '@lucide/svelte/icons/send';
	import PaperclipIcon from '@lucide/svelte/icons/paperclip';
	import MicIcon from '@lucide/svelte/icons/mic';
	import ImagePlusIcon from '@lucide/svelte/icons/image-plus';

	let value = $state('');
	let isLoading = $state(false);

	function handleSubmit() {
		if (value.trim()) {
			console.log('Submitting:', value);
		}
	}
</script>

<PromptInput
	{isLoading}
	{value}
	onValueChange={(v) => value = v}
	onSubmit={handleSubmit}
	maxHeight={300}
>
	<div class="flex w-full flex-col gap-2">
		<PromptInputTextarea placeholder="Ask me anything..." />

		<PromptInputActions class="justify-between">
			<div class="flex gap-1">
				<PromptInputAction>
					{#snippet tooltip()}
						<p>Attach file</p>
					{/snippet}
					<Button variant="ghost" size="icon">
						<PaperclipIcon class="h-4 w-4" />
					</Button>
				</PromptInputAction>

				<PromptInputAction>
					{#snippet tooltip()}
						<p>Add image</p>
					{/snippet}
					<Button variant="ghost" size="icon">
						<ImagePlusIcon class="h-4 w-4" />
					</Button>
				</PromptInputAction>

				<PromptInputAction>
					{#snippet tooltip()}
						<p>Voice input</p>
					{/snippet}
					<Button variant="ghost" size="icon">
						<MicIcon class="h-4 w-4" />
					</Button>
				</PromptInputAction>
			</div>

			<PromptInputAction side="left">
				{#snippet tooltip()}
					<p>Send message (Enter)</p>
				{/snippet}
				<Button
					size="icon"
					disabled={!value.trim() || isLoading}
					onclick={handleSubmit}
				>
					<SendIcon class="h-4 w-4" />
				</Button>
			</PromptInputAction>
		</PromptInputActions>
	</div>
</PromptInput>
```

## API Reference

### PromptInput

The main container component that provides context to all child components.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `''` | Controlled value of the input |
| `onValueChange` | `(value: string) => void` | - | Callback when value changes |
| `isLoading` | `boolean` | `false` | Loading state (disables input) |
| `maxHeight` | `number \| string` | `240` | Maximum height for auto-resize |
| `onSubmit` | `() => void` | - | Callback when Enter is pressed |
| `class` | `string` | - | Additional CSS classes |

### PromptInputTextarea

The textarea input component.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | - | Placeholder text |
| `disableAutosize` | `boolean` | `false` | Disable auto-resize behavior |
| `class` | `string` | - | Additional CSS classes |
| ...rest | - | - | All standard textarea attributes |

**Features:**
- Auto-resizes based on content
- Submit on Enter, new line on Shift+Enter
- Automatically focuses when container is clicked

### PromptInputActions

Container for action buttons.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | - | Additional CSS classes |
| ...rest | - | - | All standard div attributes |

### PromptInputAction

Wrapper for individual action buttons with tooltip support.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tooltip` | `Snippet` | - | Tooltip content (required) |
| `side` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Tooltip position |
| `class` | `string` | - | Additional CSS classes for tooltip |

## Keyboard Shortcuts

- **Enter**: Submit (calls `onSubmit`)
- **Shift + Enter**: New line
- **Click on container**: Focus textarea

## Styling

The component uses Tailwind CSS classes and can be customized through the `class` prop. The default styling includes:

- Rounded corners (`rounded-3xl`)
- Border with shadow
- Transparent textarea background
- Focus ring on textarea

You can override these by passing custom classes or modifying the component files directly.

## Context API

The component uses Svelte context for state management. You can access the context in custom child components:

```svelte
<script lang="ts">
	import { getPromptInputContext } from '$lib/components/prompt-kit/prompt-input';

	const context = getPromptInputContext();
	// Access: context.value, context.isLoading, context.setValue(), etc.
</script>
```

## Implementation Notes

- Uses `runed`'s `watch` instead of `$effect()` for auto-resize
- Class-based context management following project patterns
- Built with accessibility in mind (keyboard navigation, ARIA attributes)
- Compatible with existing UI components (Button, Tooltip, etc.)

## License

MIT
