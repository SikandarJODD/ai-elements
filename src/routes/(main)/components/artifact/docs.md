# Artifact

> A structured container for displaying generated content like code, documents, or other outputs with built-in header actions.

## Installation

```bash
npx shadcn-svelte@latest add https://ai-elements.vercel.app/r/artifact.json
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
