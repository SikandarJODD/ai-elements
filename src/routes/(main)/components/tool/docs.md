# Tool

> A collapsible interface component for displaying tool execution details from AI SDK tool calls.

## Installation

```bash
npx shadcn-svelte@latest add ${PUBLIC_WEBSITE_URL}/r/tool.json
```

## Usage

### Basic Example

```svelte
<script lang="ts">
  import {
    Tool,
    ToolHeader,
    ToolContent,
    ToolInput,
    ToolOutput,
  } from "$lib/components/ai-elements/tool";
</script>

<Tool>
  <ToolHeader type="tool-get_weather" state="output-available" />
  <ToolContent>
    <ToolInput input={{ location: "San Francisco" }} />
    <ToolOutput output={{ temperature: 72, condition: "Sunny" }} />
  </ToolContent>
</Tool>
```

### With Different States

```svelte
<script lang="ts">
  import {
    Tool,
    ToolHeader,
    ToolContent,
    ToolInput,
    ToolOutput,
  } from "$lib/components/ai-elements/tool";
</script>

<!-- Input streaming -->
<Tool>
  <ToolHeader type="tool-search" state="input-streaming" />
  <ToolContent>
    <ToolInput input={{ query: "AI news" }} />
  </ToolContent>
</Tool>

<!-- Output available -->
<Tool>
  <ToolHeader type="tool-search" state="output-available" />
  <ToolContent>
    <ToolInput input={{ query: "AI news" }} />
    <ToolOutput output={{ results: ["Result 1", "Result 2"] }} />
  </ToolContent>
</Tool>

<!-- Error state -->
<Tool>
  <ToolHeader type="tool-search" state="output-error" />
  <ToolContent>
    <ToolInput input={{ query: "AI news" }} />
    <ToolOutput errorText="Failed to fetch results" />
  </ToolContent>
</Tool>
```

### With AI SDK

```svelte
<script lang="ts">
  import { useChat } from "@ai-sdk/svelte";
  import {
    Tool,
    ToolHeader,
    ToolContent,
    ToolInput,
    ToolOutput,
  } from "$lib/components/ai-elements/tool";
  import type { ToolUIPart } from "ai";

  const { messages, append } = useChat();

  function getToolParts(message: any): ToolUIPart[] {
    return message.parts?.filter((part: any) => part.type === "tool") || [];
  }
</script>

<div>
  {#each messages as message}
    {#if message.role === "assistant"}
      {#each getToolParts(message) as tool}
        <Tool>
          <ToolHeader type={tool.toolName} state={tool.state} />
          <ToolContent>
            <ToolInput input={tool.input} />
            <ToolOutput output={tool.output} errorText={tool.errorText} />
          </ToolContent>
        </Tool>
      {/each}
    {/if}
  {/each}
</div>
```

## Component API

### Tool

| Prop         | Type             | Default | Description                                                                 |
| ------------ | ---------------- | ------- | --------------------------------------------------------------------------- |
| class        | string           | -       | Additional CSS classes to apply to the tool container                       |
| children     | Snippet          | -       | Child components (typically ToolHeader, ToolInput, ToolOutput, ToolContent) |
| ...restProps | CollapsibleProps | -       | All other Collapsible component props are supported                         |

### ToolHeader

| Prop         | Type                                                                           | Default | Description                                                |
| ------------ | ------------------------------------------------------------------------------ | ------- | ---------------------------------------------------------- |
| type         | string                                                                         | -       | The name/type of the tool being executed                   |
| state        | 'input-streaming' \| 'input-available' \| 'output-available' \| 'output-error' | -       | Current state of the tool execution                        |
| class        | string                                                                         | -       | Additional CSS classes to apply to the header              |
| ...restProps | CollapsibleTriggerProps                                                        | -       | All other CollapsibleTrigger component props are supported |

### ToolContent

| Prop         | Type                    | Default | Description                                                |
| ------------ | ----------------------- | ------- | ---------------------------------------------------------- |
| class        | string                  | -       | Additional CSS classes to apply to the content container   |
| children     | Snippet                 | -       | Custom content to display in the collapsible area          |
| ...restProps | CollapsibleContentProps | -       | All other CollapsibleContent component props are supported |

### ToolInput

| Prop         | Type                           | Default | Description                                                        |
| ------------ | ------------------------------ | ------- | ------------------------------------------------------------------ |
| input        | any                            | -       | The input parameters passed to the tool (will be JSON stringified) |
| class        | string                         | -       | Additional CSS classes to apply to the input container             |
| ...restProps | HTMLAttributes<HTMLDivElement> | -       | All other div props are supported                                  |

### ToolOutput

| Prop         | Type                           | Default | Description                                                |
| ------------ | ------------------------------ | ------- | ---------------------------------------------------------- |
| output       | any                            | -       | The output result from the tool (will be JSON stringified) |
| errorText    | string                         | -       | Error message to display if the tool execution failed      |
| class        | string                         | -       | Additional CSS classes to apply to the output container    |
| ...restProps | HTMLAttributes<HTMLDivElement> | -       | All other div props are supported                          |

## Features

- **Collapsible interface**: Show/hide tool details with a click
- **State indicators**: Visual feedback for different execution states
- **JSON formatting**: Automatic formatting of input/output data
- **Error handling**: Built-in error state display
- **AI SDK integration**: Designed to work seamlessly with AI SDK ToolUIPart type
- **Customizable**: Easy to style and extend with custom classes

---

For more information, visit: https://svelte-ai-elements.vercel.app/components/tool
