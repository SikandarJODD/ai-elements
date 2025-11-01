# Web Preview

> Showcase generated UI components with live preview and source code viewing capabilities.

## Installation

```bash
npx shadcn-svelte@latest add ${PUBLIC_WEBSITE_URL}/r/web-preview.json
```

## Usage

### Basic Example

```svelte
<script lang="ts">
	import {
		WebPreview,
		WebPreviewNavigation,
		WebPreviewUrl,
		WebPreviewContent
	} from "$lib/components/ai-elements/web-preview";
</script>

<WebPreview defaultUrl="https://example.com">
	<WebPreviewNavigation>
		<WebPreviewUrl />
	</WebPreviewNavigation>
	<WebPreviewContent>
		<iframe src="https://example.com" title="Preview" />
	</WebPreviewContent>
</WebPreview>
```

### With AI SDK (v0-like Clone)

```svelte
<script lang="ts">
	import { useChat } from "@ai-sdk/svelte";
	import {
		WebPreview,
		WebPreviewNavigation,
		WebPreviewUrl,
		WebPreviewContent
	} from "$lib/components/ai-elements/web-preview";
	import { v0 } from "v0-sdk";

	const chat = useChat({
		api: "/api/chat"
	});

	let previewUrl = $state("");
	let isGenerating = $state(false);

	async function generateUI(prompt: string) {
		isGenerating = true;
		const result = await v0.generate(prompt);
		previewUrl = result.url;
		isGenerating = false;
	}
</script>

<input
	bind:value={chat.input}
	placeholder="Describe the UI you want..."
	onsubmit={() => generateUI(chat.input)}
/>

{#if isGenerating}
	<p>Generating UI...</p>
{:else if previewUrl}
	<WebPreview defaultUrl={previewUrl}>
		<WebPreviewNavigation>
			<WebPreviewUrl />
		</WebPreviewNavigation>
		<WebPreviewContent>
			<iframe src={previewUrl} title="Generated UI" />
		</WebPreviewContent>
	</WebPreview>
{/if}
```

### With Tabs (Preview + Code)

```svelte
<script lang="ts">
	import {
		WebPreview,
		WebPreviewNavigation,
		WebPreviewUrl,
		WebPreviewTabs,
		WebPreviewTabsList,
		WebPreviewTabsTrigger,
		WebPreviewTabsContent
	} from "$lib/components/ai-elements/web-preview";
	import { Code } from "$lib/components/ai-elements/code";

	const previewUrl = "https://example.com";
	const sourceCode = `<div>Hello World</div>`;
</script>

<WebPreview defaultUrl={previewUrl}>
	<WebPreviewNavigation>
		<WebPreviewUrl />
	</WebPreviewNavigation>
	<WebPreviewTabs>
		<WebPreviewTabsList>
			<WebPreviewTabsTrigger value="preview">Preview</WebPreviewTabsTrigger>
			<WebPreviewTabsTrigger value="code">Code</WebPreviewTabsTrigger>
		</WebPreviewTabsList>
		<WebPreviewTabsContent value="preview">
			<iframe src={previewUrl} title="Preview" />
		</WebPreviewTabsContent>
		<WebPreviewTabsContent value="code">
			<Code lang="html" code={sourceCode} />
		</WebPreviewTabsContent>
	</WebPreviewTabs>
</WebPreview>
```

### Custom Navigation

```svelte
<script lang="ts">
	import {
		WebPreview,
		WebPreviewNavigation,
		WebPreviewUrl,
		WebPreviewContent
	} from "$lib/components/ai-elements/web-preview";
	import { RefreshCw, ExternalLink } from "lucide-svelte";

	let currentUrl = $state("https://example.com");

	function refresh() {
		// Reload iframe
	}

	function openInNewTab() {
		window.open(currentUrl, "_blank");
	}
</script>

<WebPreview defaultUrl={currentUrl}>
	<WebPreviewNavigation>
		<button onclick={refresh}>
			<RefreshCw class="size-4" />
		</button>
		<WebPreviewUrl />
		<button onclick={openInNewTab}>
			<ExternalLink class="size-4" />
		</button>
	</WebPreviewNavigation>
	<WebPreviewContent>
		<iframe src={currentUrl} title="Preview" />
	</WebPreviewContent>
</WebPreview>
```

## Component API

### WebPreview

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| defaultUrl | string | - | Default URL to display in the preview |
| children | Snippet | - | Child components to render |
| class | string | - | Additional CSS classes to apply to the container |
| ...restProps | HTMLAttributes<HTMLDivElement> | - | All other div props are supported |

### WebPreviewNavigation

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | Snippet | - | Navigation controls (URL bar, buttons, etc.) |
| class | string | - | Additional CSS classes to apply to the navigation |
| ...restProps | HTMLAttributes<HTMLDivElement> | - | All other div props are supported |

### WebPreviewUrl

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| class | string | - | Additional CSS classes to apply to the URL input |
| ...restProps | InputProps | - | All other Input component props are supported |

### WebPreviewContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | Snippet | - | Content to display (typically iframe) |
| class | string | - | Additional CSS classes to apply to the content area |
| ...restProps | HTMLAttributes<HTMLDivElement> | - | All other div props are supported |

### WebPreviewTabs

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | Snippet | - | Tab components |
| defaultValue | string | "preview" | Default active tab |
| class | string | - | Additional CSS classes to apply to the tabs |
| ...restProps | TabsProps | - | All other Tabs component props are supported |

## Features

- **Live preview**: Display generated UI in real-time
- **URL navigation**: Editable URL bar
- **Tab support**: Switch between preview and code view
- **Iframe embedding**: Safely embed external content
- **AI SDK integration**: Works with v0-sdk and similar tools
- **Customizable**: Easy to style and extend with custom classes
- **Responsive**: Adapts to container size

## Use Cases

- **UI generation**: Preview AI-generated interfaces
- **Documentation**: Show live examples with code
- **Prototyping**: Quick UI mockups and previews
- **Code playgrounds**: Interactive code editors
- **v0-like tools**: Build UI generation platforms

---

For more information, visit: https://svelte-ai-elements.vercel.app/components/web-preview

