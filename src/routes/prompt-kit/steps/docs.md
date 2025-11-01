# Steps

> A collapsible component for displaying multi-step processes or agent workflows, with support for expandable/collapsible states and custom icons.

## Installation

```bash
npx shadcn-svelte@latest add https://svelte-ai-elements.vercel.app//p/steps.json
```

## Usage

### Basic Example

```svelte
<script lang="ts">
  import {
    Steps,
    StepsContent,
    StepsItem,
    StepsTrigger,
  } from "$lib/components/prompt-kit/steps";
</script>

<div class="space-y-4">
  <Steps defaultOpen>
    {#snippet children()}
      <StepsTrigger>
        {#snippet children()}
          Agent run: Summarize repository
        {/snippet}
      </StepsTrigger>
      <StepsContent>
        {#snippet children()}
          <div class="space-y-1">
            <StepsItem>Searching files in repo...</StepsItem>
            <StepsItem>Found 12 files (src, docs)</StepsItem>
            <StepsItem>Parsing markdown and code blocks</StepsItem>
            <StepsItem>Selecting tool: summarize</StepsItem>
            <StepsItem>Running summarize(tool) with top 5 files</StepsItem>
            <StepsItem class="text-foreground">Summary generated</StepsItem>
          </div>
        {/snippet}
      </StepsContent>
    {/snippet}
  </Steps>
</div>
```

## Component API

### Steps

| Prop        | Type    | Default | Description                               |
| ----------- | ------- | ------- | ----------------------------------------- |
| defaultOpen | boolean | false   | Whether the steps are expanded by default |
| children    | Snippet | -       | Child components to render                |

### StepsTrigger

| Prop      | Type                              | Default | Description                              |
| --------- | --------------------------------- | ------- | ---------------------------------------- |
| children  | Snippet                           | -       | Content to display in the trigger button |
| className | string                            | -       | Additional CSS classes                   |
| ...props  | HTMLAttributes<HTMLButtonElement> | -       | All other button props are supported     |

### StepsContent

| Prop      | Type                           | Default | Description                       |
| --------- | ------------------------------ | ------- | --------------------------------- |
| children  | Snippet                        | -       | Content to display when expanded  |
| className | string                         | -       | Additional CSS classes            |
| ...props  | HTMLAttributes<HTMLDivElement> | -       | All other div props are supported |

### StepsItem

| Prop      | Type                           | Default | Description                         |
| --------- | ------------------------------ | ------- | ----------------------------------- |
| children  | Snippet                        | -       | Content to display in the step item |
| className | string                         | -       | Additional CSS classes              |
| ...props  | HTMLAttributes<HTMLDivElement> | -       | All other div props are supported   |

---

For more information, visit: https://svelte-ai-elements.vercel.app//prompt-kit/steps
