# Tool

> A collapsible component for displaying AI tool invocations and their results, with support for different execution states (processing, ready, completed, error) and customizable rendering. Built with shadcn-svelte Collapsible primitives.

## Installation

```bash
npx shadcn-svelte@latest add https://svelte-ai-elements.vercel.app//p/tool.json
```

## Usage

### Basic Example (Composed)

```svelte
<script lang="ts">
  import { ToolComposed } from "$lib/components/prompt-kit/tool";
  import type { ToolPart } from "$lib/components/prompt-kit/tool";

  const toolPart: ToolPart = {
    type: "get_weather",
    state: "output-available",
    input: {
      location: "San Francisco, CA",
      units: "celsius",
    },
    output: {
      temperature: 18,
      conditions: "Partly cloudy",
      humidity: 65,
      wind_speed: 12,
    },
    toolCallId: "call_weather_123",
  };
</script>

<ToolComposed {toolPart} defaultOpen={true} class="w-full max-w-lg" />
```

### Composable Pattern

```svelte
<script lang="ts">
  import {
    Tool,
    ToolHeader,
    ToolContent,
    ToolDetails,
  } from "$lib/components/prompt-kit/tool";
  import type { ToolPart } from "$lib/components/prompt-kit/tool";

  const toolPart: ToolPart = {
    type: "analyze_code",
    state: "input-streaming",
    input: {
      file_path: "/src/components/Button.tsx",
      analysis_type: "security",
    },
    toolCallId: "call_stream_001",
  };
</script>

<Tool {toolPart} defaultOpen={false}>
  <ToolHeader />
  <ToolContent>
    <ToolDetails />
  </ToolContent>
</Tool>
```

## Tool States

The Tool component supports four execution states:

- **`input-streaming`** - Tool is receiving input (shows "Processing" badge)
- **`input-available`** - Tool has input and is ready to execute (shows "Ready" badge)
- **`output-available`** - Tool has successfully executed (shows "Completed" badge)
- **`output-error`** - Tool execution failed (shows "Error" badge)

## Component API

### ToolComposed

All-in-one component that includes header, content, and details.

| Prop        | Type     | Default | Description                                      |
| ----------- | -------- | ------- | ------------------------------------------------ |
| toolPart    | ToolPart | -       | Tool invocation data                             |
| defaultOpen | boolean  | false   | Whether the tool details are expanded by default |
| class       | string   | -       | Additional CSS classes                           |

### Tool (Root)

Root component using Collapsible.Root for composable pattern.

| Prop        | Type     | Default | Description                                      |
| ----------- | -------- | ------- | ------------------------------------------------ |
| toolPart    | ToolPart | -       | Tool invocation data (shared via context)        |
| defaultOpen | boolean  | false   | Whether the tool details are expanded by default |
| open        | boolean  | -       | Controlled open state (bindable)                 |
| class       | string   | -       | Additional CSS classes                           |
| children    | Snippet  | -       | Child components (ToolHeader, ToolContent)       |

### ToolHeader

Displays tool name, state badge, and collapsible trigger.

| Prop  | Type   | Description            |
| ----- | ------ | ---------------------- |
| class | string | Additional CSS classes |

### ToolContent

Collapsible content wrapper for tool details.

| Prop     | Type    | Description                              |
| -------- | ------- | ---------------------------------------- |
| class    | string  | Additional CSS classes                   |
| children | Snippet | Content to display (usually ToolDetails) |

### ToolDetails

Displays formatted JSON input/output and error messages.

| Prop  | Type   | Description            |
| ----- | ------ | ---------------------- |
| class | string | Additional CSS classes |

### ToolBadge

State badge component showing tool execution status.

| Prop  | Type      | Description            |
| ----- | --------- | ---------------------- |
| state | ToolState | The state of the tool  |
| class | string    | Additional CSS classes |

### ToolPart Type

```typescript
type ToolPart = {
  type: string; // Tool name (e.g., "get_weather")
  state: ToolState; // Execution state
  input?: Record<string, unknown>; // Input parameters (optional)
  output?: Record<string, unknown>; // Output data (optional)
  toolCallId?: string; // Unique identifier (optional)
  errorText?: string; // Error message (optional)
};
```

### ToolState Type

```typescript
type ToolState =
  | "input-streaming" // Tool is receiving input
  | "input-available" // Tool has input and is ready to execute
  | "output-available" // Tool has successfully executed
  | "output-error"; // Tool execution failed
```

## Features

- ✅ **Collapsible Interface** - Built with shadcn-svelte Collapsible primitives
- ✅ **State Badges** - Visual indicators for tool execution status
- ✅ **Composed & Composable** - Use ToolComposed for simplicity or compose your own
- ✅ **JSON Formatting** - Automatic formatting of input/output data
- ✅ **Error Handling** - Display error messages with proper styling
- ✅ **Accessible** - Keyboard navigation and screen reader support
- ✅ **Customizable** - Full control over styling and behavior

---

For more information, visit: https://svelte-ai-elements.vercel.app//prompt-kit/tool
