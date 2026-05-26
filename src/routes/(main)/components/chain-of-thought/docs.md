# Chain Of Thought

A collapsible component that visualizes AI reasoning steps with support for search results, images, and step-by-step progress indicators.

## Installation

<Tabs items={["CLI", "Manual"]}>
<Tab value="CLI">

### Using CLI

```bash
npx shadcn-svelte@latest add https://sv-animations.vercel.app/r/chain-of-thought.json
```

</Tab>
<Tab value="Manual">

### Manual Installation

Copy the component source files into your project and update the example files with real usage.

</Tab>
</Tabs>

## Usage

```svelte
<script lang="ts">
  import { ChainOfThought } from "$lib/components/ai-elements/chain-of-thought";
</script>

<ChainOfThought />
```

