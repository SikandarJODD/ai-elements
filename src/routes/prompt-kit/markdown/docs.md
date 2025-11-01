# Markdown

> A component for rendering Markdown content with support for GitHub Flavored Markdown (GFM) and custom component styling.

## Installation

```bash
npx shadcn-svelte@latest add ${PUBLIC_WEBSITE_URL}/p/markdown.json
```

## Usage

### Basic Example

```svelte
<script lang="ts">
  import { Markdown } from "$lib/components/prompt-kit/markdown";

  const markdownContent = `# Markdown Example

This is a **bold text** and this is an *italic text*.

## Lists

### Unordered List
- Item 1
- Item 2
- Item 3

### Ordered List
1. First item
2. Second item
3. Third item

## Links and Images

[Visit Prompt Kit](https://prompt-kit.com)

## Code

Inline \`code\` example.

\`\`\`javascript
// Code block example
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`
`;
</script>

<Markdown content={markdownContent} class="prose dark:prose-invert" />
```

## Component API

### Markdown

| Prop      | Type                           | Default | Description                       |
| --------- | ------------------------------ | ------- | --------------------------------- |
| content   | string                         | -       | Markdown content to render        |
| className | string                         | -       | Additional CSS classes            |
| ...props  | HTMLAttributes<HTMLDivElement> | -       | All other div props are supported |

---

For more information, visit: https://ai-elements.vercel.app/prompt-kit/markdown
