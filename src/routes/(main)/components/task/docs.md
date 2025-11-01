# Task

> Display task lists or workflow progress with collapsible details, status indicators, and progress tracking.

## Installation

```bash
npx shadcn-svelte@latest add ${PUBLIC_WEBSITE_URL}/r/task.json
```

## Usage

### Basic Example

```svelte
<script lang="ts">
	import {
		Task,
		TaskTrigger,
		TaskContent,
		TaskStatus,
		TaskProgress
	} from "$lib/components/ai-elements/task";
</script>

<Task>
	<TaskTrigger>
		<TaskStatus status="complete" />
		Setup Project
	</TaskTrigger>
	<TaskContent>
		<p>Initialize the project with necessary dependencies</p>
	</TaskContent>
</Task>
```

### Multiple Tasks with Progress

```svelte
<script lang="ts">
	import {
		Task,
		TaskTrigger,
		TaskContent,
		TaskStatus,
		TaskProgress
	} from "$lib/components/ai-elements/task";

	const tasks = [
		{ title: "Setup", status: "complete", progress: 100, details: "Project initialized" },
		{ title: "Development", status: "in-progress", progress: 60, details: "Building features" },
		{ title: "Testing", status: "pending", progress: 0, details: "Not started yet" }
	];
</script>

{#each tasks as task}
	<Task>
		<TaskTrigger>
			<TaskStatus status={task.status} />
			{task.title}
			<TaskProgress value={task.progress} />
		</TaskTrigger>
		<TaskContent>
			<p>{task.details}</p>
		</TaskContent>
	</Task>
{/each}
```

### With AI SDK (Streaming Tasks)

```svelte
<script lang="ts">
	import { experimental_useObject as useObject } from "@ai-sdk/svelte";
	import {
		Task,
		TaskTrigger,
		TaskContent,
		TaskStatus,
		TaskProgress
	} from "$lib/components/ai-elements/task";
	import { z } from "zod";

	const { object, submit } = useObject({
		api: "/api/tasks",
		schema: z.object({
			tasks: z.array(
				z.object({
					title: z.string(),
					status: z.enum(["pending", "in-progress", "complete", "error"]),
					progress: z.number(),
					details: z.string()
				})
			)
		})
	});

	function generateTasks() {
		submit("Create a plan to build a web app");
	}
</script>

<button onclick={generateTasks}>Generate Tasks</button>

{#if $object?.tasks}
	{#each $object.tasks as task}
		<Task>
			<TaskTrigger>
				<TaskStatus status={task.status} />
				{task.title}
				<TaskProgress value={task.progress} />
			</TaskTrigger>
			<TaskContent>
				<p>{task.details}</p>
			</TaskContent>
		</Task>
	{/each}
{/if}
```

### Custom Styling

```svelte
<script lang="ts">
	import {
		Task,
		TaskTrigger,
		TaskContent,
		TaskStatus
	} from "$lib/components/ai-elements/task";
</script>

<Task class="border-2 border-blue-500">
	<TaskTrigger class="bg-blue-50 dark:bg-blue-950">
		<TaskStatus status="in-progress" />
		Custom Styled Task
	</TaskTrigger>
	<TaskContent class="bg-blue-50/50 dark:bg-blue-950/50">
		<p>This task has custom styling</p>
	</TaskContent>
</Task>
```

## Component API

### Task

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | Snippet | - | Child components to render |
| open | boolean | false | Whether the task is expanded |
| class | string | - | Additional CSS classes to apply to the container |
| ...restProps | CollapsibleProps | - | All other Collapsible component props are supported |

### TaskTrigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | Snippet | - | Trigger content (typically status, title, progress) |
| class | string | - | Additional CSS classes to apply to the trigger |
| ...restProps | CollapsibleTriggerProps | - | All other CollapsibleTrigger props are supported |

### TaskContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | Snippet | - | Task details to display |
| class | string | - | Additional CSS classes to apply to the content |
| ...restProps | CollapsibleContentProps | - | All other CollapsibleContent props are supported |

### TaskStatus

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| status | "pending" \| "in-progress" \| "complete" \| "error" | "pending" | Current status of the task |
| class | string | - | Additional CSS classes to apply to the status indicator |
| ...restProps | HTMLAttributes<HTMLDivElement> | - | All other div props are supported |

### TaskProgress

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | number | 0 | Progress percentage (0-100) |
| class | string | - | Additional CSS classes to apply to the progress bar |
| ...restProps | ProgressProps | - | All other Progress component props are supported |

## Features

- **Collapsible**: Expand/collapse task details
- **Status indicators**: Visual status (pending, in-progress, complete, error)
- **Progress tracking**: Show completion percentage
- **AI SDK integration**: Works with streaming task generation
- **Customizable**: Easy to style and extend with custom classes
- **Accessible**: Proper ARIA labels and keyboard navigation

## Status Types

- **pending**: Task not started (gray indicator)
- **in-progress**: Task currently running (blue indicator)
- **complete**: Task finished successfully (green indicator)
- **error**: Task failed (red indicator)

---

For more information, visit: https://svelte-ai-elements.vercel.app/components/task

