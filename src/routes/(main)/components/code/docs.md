# Code

> A code block component with syntax highlighting, line numbers, and copy to clipboard functionality.

## Installation

```bash
npx shadcn-svelte@latest add https://ai-elements.vercel.app/r/code.json
```

## Usage

### Basic Example

```svelte
<script lang="ts">
  import { Code } from "$lib/components/ai-elements/code";

  const code = `function hello() {
  console.log("Hello, world!");
}`;
</script>

<Code lang="javascript" {code} />
```

### With Line Numbers

```svelte
<script lang="ts">
  import { Code } from "$lib/components/ai-elements/code";

  const code = `const greeting = "Hello";
const name = "World";
console.log(\`\${greeting}, \${name}!\`);`;
</script>

<Code lang="javascript" {code} lineNumbers />
```

### With Highlighted Lines

```svelte
<script lang="ts">
  import { Code } from "$lib/components/ai-elements/code";

  const code = `function calculate(a, b) {
  const sum = a + b;
  return sum;
}`;
</script>

<Code lang="javascript" {code} highlightedLines={[2]} />
```

### With Copy Button

```svelte
<script lang="ts">
  import { Code, CodeCopyButton } from "$lib/components/ai-elements/code";

  const code = `npm install svelte-ai-elements`;
</script>

<div class="relative">
  <Code lang="bash" {code} />
  <CodeCopyButton {code} />
</div>
```

### With AI SDK Streaming

```svelte
<script lang="ts">
  import { streamObject } from "@ai-sdk/svelte";
  import { Code } from "$lib/components/ai-elements/code";
  import { z } from "zod";

  const { object, submit } = streamObject({
    schema: z.object({
      code: z.string(),
      language: z.string(),
    }),
  });

  function generateCode() {
    submit("Generate a hello world function in JavaScript");
  }
</script>

<button onclick={generateCode}>Generate Code</button>

{#if $object?.code}
  <Code lang={$object.language || "javascript"} code={$object.code} />
{/if}
```

### With Overflow Control

```svelte
<script lang="ts">
  import { Code, CodeOverflow } from "$lib/components/ai-elements/code";

  const longCode = `// Very long code here...
`.repeat(50);
</script>

<CodeOverflow>
  <Code lang="javascript" code={longCode} />
</CodeOverflow>
```

## Component API

### Code

| Prop             | Type                           | Default       | Description                                      |
| ---------------- | ------------------------------ | ------------- | ------------------------------------------------ |
| code             | string                         | -             | The code string to display                       |
| lang             | string                         | 'plaintext'   | Programming language for syntax highlighting     |
| lineNumbers      | boolean                        | false         | Whether to show line numbers                     |
| highlightedLines | number[]                       | []            | Array of line numbers to highlight               |
| theme            | string                         | 'github-dark' | Shiki theme for syntax highlighting              |
| class            | string                         | -             | Additional CSS classes to apply to the container |
| ...restProps     | HTMLAttributes<HTMLDivElement> | -             | All other div props are supported                |

### CodeCopyButton

| Prop         | Type        | Default | Description                                    |
| ------------ | ----------- | ------- | ---------------------------------------------- |
| code         | string      | -       | The code string to copy to clipboard           |
| class        | string      | -       | Additional CSS classes to apply to the button  |
| ...restProps | ButtonProps | -       | All other Button component props are supported |

### CodeOverflow

| Prop         | Type                           | Default | Description                                      |
| ------------ | ------------------------------ | ------- | ------------------------------------------------ |
| children     | Snippet                        | -       | Code component to wrap                           |
| maxHeight    | string                         | '400px' | Maximum height before scrolling                  |
| class        | string                         | -       | Additional CSS classes to apply to the container |
| ...restProps | HTMLAttributes<HTMLDivElement> | -       | All other div props are supported                |

## Features

- **Syntax highlighting**: Powered by Shiki for accurate highlighting
- **Line numbers**: Optional line number display
- **Line highlighting**: Highlight specific lines
- **Copy to clipboard**: Built-in copy button
- **Overflow control**: Handle long code blocks gracefully
- **Theme support**: Multiple syntax highlighting themes
- **Streaming support**: Works with AI SDK streaming
- **Customizable**: Easy to style and extend with custom classes

## Supported Languages

The Code component supports all languages supported by Shiki, including:

- JavaScript/TypeScript
- Python
- Rust
- Go
- Java
- C/C++
- HTML/CSS
- SQL
- And many more...

---

For more information, visit: https://svelte-ai-elements.vercel.app/components/code
