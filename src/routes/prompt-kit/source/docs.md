# Source

> A component for displaying source citations with favicons, titles, and descriptions in a popover format, ideal for showing references in AI-generated content.

## Installation

```bash
npx shadcn-svelte@latest add ${PUBLIC_WEBSITE_URL}/p/source.json
```

## Usage

### Basic Example

```svelte
<script lang="ts">
	import { Source, SourceContent, SourceTrigger } from "$lib/components/prompt-kit/source";
</script>

<div class="flex flex-wrap justify-center gap-2">
	<Source href="https://ibelick.com">
		<SourceTrigger showFavicon />
		<SourceContent
			title="Ibelick"
			description="Julien Thibeaut (@Ibelick). Design Engineer passionate about crafting beautiful, functional interfaces and tools."
		/>
	</Source>
	
	<Source href="https://www.google.com">
		<SourceTrigger showFavicon />
		<SourceContent
			title="Google"
			description="Search the world's information, including webpages, images, videos and more."
		/>
	</Source>
	
	<Source href="https://www.figma.com">
		<SourceTrigger showFavicon />
		<SourceContent
			title="Figma"
			description="Figma is the leading collaborative design tool for building meaningful products."
		/>
	</Source>
</div>
```

## Component API

### Source

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| href | string | - | URL of the source |
| children | Snippet | - | Child components to render |

### SourceTrigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| showFavicon | boolean | false | Whether to display the favicon |
| className | string | - | Additional CSS classes |
| ...props | HTMLAttributes<HTMLButtonElement> | - | All other button props are supported |

### SourceContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | - | Title of the source |
| description | string | - | Description of the source |
| className | string | - | Additional CSS classes |
| ...props | HTMLAttributes<HTMLDivElement> | - | All other div props are supported |

---

For more information, visit: https://ai-elements.vercel.app/prompt-kit/source

