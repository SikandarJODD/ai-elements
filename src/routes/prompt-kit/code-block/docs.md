# Code Block

> A component for displaying code snippets with syntax highlighting and customizable styling using Shiki.

## Installation

```bash
npx shadcn-svelte@latest add https://svelte-ai-elements.vercel.app//p/code-block.json
```

## Usage

### Basic Example

```svelte
<script lang="ts">
  import {
    CodeBlock,
    CodeBlockCode,
  } from "$lib/components/prompt-kit/code-block";

  const code = `function greet(name: string) {
  return \`Hello, \${name}!\`;
}

// Call the function
const greeting = greet("World");
console.log(greeting);`;
</script>

<CodeBlock>
  <CodeBlockCode {code} language="javascript" />
</CodeBlock>
```

## Component API

### CodeBlock

| Prop     | Type                           | Default | Description                       |
| -------- | ------------------------------ | ------- | --------------------------------- |
| children | Snippet                        | -       | Child components to render        |
| class    | string                         | -       | Additional CSS classes            |
| ...props | HTMLAttributes<HTMLDivElement> | -       | All other div props are supported |

### CodeBlockCode

| Prop     | Type                           | Default        | Description                          |
| -------- | ------------------------------ | -------------- | ------------------------------------ |
| code     | string                         | -              | The code to display and highlight    |
| language | string                         | "tsx"          | The language for syntax highlighting |
| theme    | string                         | "github-light" | The theme for syntax highlighting    |
| class    | string                         | -              | Additional CSS classes               |
| ...props | HTMLAttributes<HTMLDivElement> | -              | All other div props are supported    |

### CodeBlockGroup

| Prop     | Type                           | Default | Description                       |
| -------- | ------------------------------ | ------- | --------------------------------- |
| children | Snippet                        | -       | Child components to render        |
| class    | string                         | -       | Additional CSS classes            |
| ...props | HTMLAttributes<HTMLDivElement> | -       | All other div props are supported |

## Usage with Markdown

The `CodeBlock` component is used internally by the `Markdown` component to render code blocks in markdown content. When used within the Markdown component, code blocks are automatically wrapped with the `not-prose` class to prevent conflicts with prose styling.

## Tailwind Typography and not-prose

The `CodeBlock` component includes the `not-prose` class by default to prevent Tailwind Typography's prose styling from affecting code blocks. This is important when using the [@tailwindcss/typography](https://github.com/tailwindlabs/tailwindcss-typography) plugin, which provides beautiful typography defaults but can interfere with code block styling.

Since code blocks are styled with Shiki for syntax highlighting, they should not inherit Tailwind Typography styles. The `not-prose` class ensures that code blocks maintain their intended appearance regardless of the surrounding typography context.

## Customizing Syntax Highlighting

The `CodeBlockCode` component uses [Shiki](https://shiki.matsu.io/) for syntax highlighting. You can customize the theme by passing a different theme name to the `theme` prop.

Shiki supports many popular themes including:

- `github-light` (default)
- `github-dark`
- `dracula`
- `nord`
- and more

For a complete list of supported themes, refer to the [Shiki documentation](https://github.com/shikijs/shiki/blob/main/docs/themes.md).

---

For more information, visit: https://svelte-ai-elements.vercel.app//prompt-kit/code-block
