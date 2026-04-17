# Artifact

> A structured container for displaying generated content like code, documents, or other outputs with built-in header actions.

## Installation

```bash
npx shadcn-svelte@latest add https://svelte-ai-elements.vercel.app//r/artifact.json
```

## Usage

### Basic Example

```svelte
<script lang="ts">
  import {
    Artifact,
    ArtifactHeader,
    ArtifactTitle,
    ArtifactDescription,
    ArtifactContent,
    ArtifactActions,
    ArtifactAction,
    ArtifactClose,
  } from "$lib/components/ai-elements/artifact";
  import { Copy, Download } from "lucide-svelte";
</script>

<Artifact>
  <ArtifactHeader>
    <ArtifactTitle>Generated Code</ArtifactTitle>
    <ArtifactDescription>A simple React component</ArtifactDescription>
    <ArtifactActions>
      <ArtifactAction tooltip="Copy">
        <Copy class="size-4" />
      </ArtifactAction>
      <ArtifactAction tooltip="Download">
        <Download class="size-4" />
      </ArtifactAction>
      <ArtifactClose />
    </ArtifactActions>
  </ArtifactHeader>
  <ArtifactContent>
    <pre><code
        >function HelloWorld() {`{`}
  return <div>Hello World!</div>;
{`}`}</code
      ></pre>
  </ArtifactContent>
</Artifact>
```

### With Actions

```svelte
<script lang="ts">
  import {
    Artifact,
    ArtifactHeader,
    ArtifactTitle,
    ArtifactContent,
    ArtifactActions,
    ArtifactAction,
  } from "$lib/components/ai-elements/artifact";
  import { Copy, Download, Share } from "lucide-svelte";

  function handleCopy() {
    console.log("Copied!");
  }

  function handleDownload() {
    console.log("Downloaded!");
  }
</script>

<Artifact>
  <ArtifactHeader>
    <ArtifactTitle>Document</ArtifactTitle>
    <ArtifactActions>
      <ArtifactAction tooltip="Copy" onclick={handleCopy}>
        <Copy class="size-4" />
      </ArtifactAction>
      <ArtifactAction tooltip="Download" onclick={handleDownload}>
        <Download class="size-4" />
      </ArtifactAction>
    </ArtifactActions>
  </ArtifactHeader>
  <ArtifactContent>
    <p>Your generated content here...</p>
  </ArtifactContent>
</Artifact>
```

### With Code Content

```svelte
<script lang="ts">
  import {
    Artifact,
    ArtifactHeader,
    ArtifactTitle,
    ArtifactDescription,
    ArtifactContent,
  } from "$lib/components/ai-elements/artifact";
  import { Code } from "$lib/components/ai-elements/code";
</script>

<Artifact>
  <ArtifactHeader>
    <ArtifactTitle>Python Script</ArtifactTitle>
    <ArtifactDescription>Data processing script</ArtifactDescription>
  </ArtifactHeader>
  <ArtifactContent>
    <Code
      lang="python"
      code={`def process_data(data):
    return [x * 2 for x in data]`}
    />
  </ArtifactContent>
</Artifact>
```

### Extract Using Regex

Use this pattern with AI SDK Chat when the model returns markdown text and you want to turn the first fenced code block into an artifact.

```ts
import { Chat } from "@ai-sdk/svelte";
import { DefaultChatTransport } from "ai";

let chat = new Chat({
  transport: new DefaultChatTransport({
    api: "/api/chat",
    body: { model: "" },
  }),
});

function extractCode(text: string) {
  const match = text.match(/```[\s\S]*?```/);
  return match ? match[0].replace(/```[a-z]*|```/g, "").trim() : text;
}
```

Render the extracted code in `ArtifactContent` with the code component:

```svelte
<Artifact.Root>
  <Artifact.Header>
    <Artifact.Title>generated.py</Artifact.Title>
    <Artifact.Description>Extracted from the latest AI response</Artifact.Description>
  </Artifact.Header>
  <Artifact.Content class="p-0">
    <Code.Root code={extractCode(assistantText)} lang="python">
      <Code.CopyButton />
    </Code.Root>
  </Artifact.Content>
</Artifact.Root>
```

### Structured Output

Use structured output when the model can return a typed payload instead of markdown. With the shared `/api/chat` route, send instructions that require JSON and parse the latest assistant message on the client.

```json
{
  "type": "code",
  "language": "python",
  "title": "Group Revenue By Region",
  "filename": "group_revenue.py",
  "content": "def group_revenue(rows):\n    return rows"
}
```

Then map the payload fields directly to the artifact:

```svelte
{#if payload}
  <Artifact.Root>
    <Artifact.Header>
      <Artifact.Title>{payload.title}</Artifact.Title>
      <Artifact.Description>{payload.filename}</Artifact.Description>
    </Artifact.Header>
    <Artifact.Content class="p-0">
      <Code.Root code={payload.content} lang={payload.language}>
        <Code.CopyButton />
      </Code.Root>
    </Artifact.Content>
  </Artifact.Root>
{/if}
```

## Component API

### Artifact

| Prop         | Type                           | Default | Description                                      |
| ------------ | ------------------------------ | ------- | ------------------------------------------------ |
| children     | Snippet                        | -       | Child components to render                       |
| class        | string                         | -       | Additional CSS classes to apply to the container |
| ...restProps | HTMLAttributes<HTMLDivElement> | -       | All other div props are supported                |

### ArtifactHeader

| Prop         | Type                           | Default | Description                                                            |
| ------------ | ------------------------------ | ------- | ---------------------------------------------------------------------- |
| children     | Snippet                        | -       | Child components to render (typically title, description, and actions) |
| class        | string                         | -       | Additional CSS classes to apply to the header                          |
| ...restProps | HTMLAttributes<HTMLDivElement> | -       | All other div props are supported                                      |

### ArtifactTitle

| Prop         | Type                                 | Default | Description                                  |
| ------------ | ------------------------------------ | ------- | -------------------------------------------- |
| children     | Snippet                              | -       | Title text content                           |
| class        | string                               | -       | Additional CSS classes to apply to the title |
| ...restProps | HTMLAttributes<HTMLParagraphElement> | -       | All other paragraph props are supported      |

### ArtifactDescription

| Prop         | Type                                 | Default | Description                                        |
| ------------ | ------------------------------------ | ------- | -------------------------------------------------- |
| children     | Snippet                              | -       | Description text content                           |
| class        | string                               | -       | Additional CSS classes to apply to the description |
| ...restProps | HTMLAttributes<HTMLParagraphElement> | -       | All other paragraph props are supported            |

### ArtifactContent

| Prop         | Type                           | Default | Description                                         |
| ------------ | ------------------------------ | ------- | --------------------------------------------------- |
| children     | Snippet                        | -       | Content to display in the artifact                  |
| class        | string                         | -       | Additional CSS classes to apply to the content area |
| ...restProps | HTMLAttributes<HTMLDivElement> | -       | All other div props are supported                   |

### ArtifactActions

| Prop         | Type                           | Default | Description                                              |
| ------------ | ------------------------------ | ------- | -------------------------------------------------------- |
| children     | Snippet                        | -       | Action buttons to render                                 |
| class        | string                         | -       | Additional CSS classes to apply to the actions container |
| ...restProps | HTMLAttributes<HTMLDivElement> | -       | All other div props are supported                        |

### ArtifactAction

| Prop         | Type                        | Default | Description                                    |
| ------------ | --------------------------- | ------- | ---------------------------------------------- |
| tooltip      | string                      | -       | Tooltip text to display on hover               |
| children     | Snippet                     | -       | Icon or content to render inside the button    |
| onclick      | (event: MouseEvent) => void | -       | Click event handler                            |
| class        | string                      | -       | Additional CSS classes to apply to the button  |
| ...restProps | ButtonProps                 | -       | All other Button component props are supported |

### ArtifactClose

| Prop         | Type        | Default | Description                                         |
| ------------ | ----------- | ------- | --------------------------------------------------- |
| class        | string      | -       | Additional CSS classes to apply to the close button |
| ...restProps | ButtonProps | -       | All other Button component props are supported      |

## Features

- **Structured layout**: Clean header and content separation
- **Built-in actions**: Easy to add copy, download, share buttons
- **Flexible content**: Support for any type of generated content
- **Close button**: Optional close functionality
- **Customizable**: Easy to style and extend with custom classes

---

For more information, visit: https://svelte-ai-elements.vercel.app/components/artifact
