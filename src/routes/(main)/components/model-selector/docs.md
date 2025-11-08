# Model Selector

> A searchable command palette for selecting AI models with provider logos and multi-provider support.

## Installation

```bash
npx shadcn-svelte@latest add https://ai-elements.vercel.app/r/model-selector.json
```

## Usage

### Basic Example

```svelte
<script lang="ts">
  import {
    ModelSelector,
    ModelSelectorContent,
    ModelSelectorEmpty,
    ModelSelectorGroup,
    ModelSelectorInput,
    ModelSelectorItem,
    ModelSelectorList,
    ModelSelectorLogo,
    ModelSelectorLogoGroup,
    ModelSelectorName,
    ModelSelectorTrigger,
  } from "$lib/components/ai-elements/model-selector";
  import { Button } from "$lib/components/ui/button";
  import CheckIcon from "@lucide/svelte/icons/check";

  const models = [
    {
      id: "gpt-4o",
      name: "GPT-4o",
      chef: "OpenAI",
      chefSlug: "openai",
      providers: ["openai", "azure"],
    },
    {
      id: "claude-3.5-sonnet",
      name: "Claude 3.5 Sonnet",
      chef: "Anthropic",
      chefSlug: "anthropic",
      providers: ["anthropic", "azure"],
    },
  ];

  let open = $state(false);
  let selectedModel = $state("gpt-4o");

  const selectedModelData = $derived(
    models.find((model) => model.id === selectedModel)
  );
  const chefs = $derived(
    Array.from(new Set(models.map((model) => model.chef)))
  );
</script>

<ModelSelector bind:open>
  <ModelSelectorTrigger>
    <Button class="w-[200px] justify-between" variant="outline">
      {#if selectedModelData?.chefSlug}
        <ModelSelectorLogo provider={selectedModelData.chefSlug} />
      {/if}
      {#if selectedModelData?.name}
        <ModelSelectorName>{selectedModelData.name}</ModelSelectorName>
      {/if}
      <CheckIcon class="ml-2 size-4 shrink-0 opacity-50" />
    </Button>
  </ModelSelectorTrigger>
  <ModelSelectorContent>
    <ModelSelectorInput placeholder="Search models..." />
    <ModelSelectorList>
      <ModelSelectorEmpty>No models found.</ModelSelectorEmpty>
      {#each chefs as chef}
        <ModelSelectorGroup heading={chef}>
          {#each models.filter((model) => model.chef === chef) as model}
            <ModelSelectorItem
              value={model.id}
              onSelect={() => {
                selectedModel = model.id;
                open = false;
              }}
            >
              <ModelSelectorLogo provider={model.chefSlug} />
              <ModelSelectorName>{model.name}</ModelSelectorName>
              <ModelSelectorLogoGroup>
                {#each model.providers as provider}
                  <ModelSelectorLogo {provider} />
                {/each}
              </ModelSelectorLogoGroup>
              {#if selectedModel === model.id}
                <CheckIcon class="ml-auto size-4" />
              {/if}
            </ModelSelectorItem>
          {/each}
        </ModelSelectorGroup>
      {/each}
    </ModelSelectorList>
  </ModelSelectorContent>
</ModelSelector>
```

### With Dialog

Use the standalone dialog variant for a simpler API:

```svelte
<script lang="ts">
  import {
    ModelSelectorDialog,
    ModelSelectorEmpty,
    ModelSelectorGroup,
    ModelSelectorInput,
    ModelSelectorItem,
    ModelSelectorList,
    ModelSelectorLogo,
    ModelSelectorLogoGroup,
    ModelSelectorName,
  } from "$lib/components/ai-elements/model-selector";
  import { Button } from "$lib/components/ui/button";
  import CheckIcon from "@lucide/svelte/icons/check";

  const models = [
    {
      id: "gpt-4o",
      name: "GPT-4o",
      chef: "OpenAI",
      chefSlug: "openai",
      providers: ["openai", "azure"],
    },
  ];

  let open = $state(false);
  let selectedModel = $state("gpt-4o");

  const chefs = $derived(
    Array.from(new Set(models.map((model) => model.chef)))
  );
</script>

<div class="space-y-4">
  <Button onclick={() => (open = true)}>Open Model Selector</Button>

  <ModelSelectorDialog
    bind:open
    title="Select AI Model"
    description="Choose a model to use"
  >
    <ModelSelectorInput placeholder="Search models..." />
    <ModelSelectorList>
      <ModelSelectorEmpty>No models found.</ModelSelectorEmpty>
      {#each chefs as chef}
        <ModelSelectorGroup heading={chef}>
          {#each models.filter((model) => model.chef === chef) as model}
            <ModelSelectorItem
              value={model.id}
              onSelect={() => {
                selectedModel = model.id;
                open = false;
              }}
            >
              <ModelSelectorLogo provider={model.chefSlug} />
              <ModelSelectorName>{model.name}</ModelSelectorName>
              <ModelSelectorLogoGroup>
                {#each model.providers as provider}
                  <ModelSelectorLogo {provider} />
                {/each}
              </ModelSelectorLogoGroup>
              {#if selectedModel === model.id}
                <CheckIcon class="ml-auto size-4" />
              {/if}
            </ModelSelectorItem>
          {/each}
        </ModelSelectorGroup>
      {/each}
    </ModelSelectorList>
  </ModelSelectorDialog>
</div>
```

## Component Structure

The Model Selector component is composed of several sub-components:

- **ModelSelector** - Main wrapper with dialog functionality
- **ModelSelectorTrigger** - Trigger button to open the selector
- **ModelSelectorContent** - Dialog content with command palette
- **ModelSelectorDialog** - Standalone dialog variant (combines ModelSelector + Content)
- **ModelSelectorInput** - Search input field
- **ModelSelectorList** - List container for results
- **ModelSelectorEmpty** - Empty state when no results found
- **ModelSelectorGroup** - Group models by provider/category
- **ModelSelectorItem** - Individual model item
- **ModelSelectorLogo** - Provider logo from models.dev
- **ModelSelectorLogoGroup** - Container for multiple provider logos
- **ModelSelectorName** - Model name display
- **ModelSelectorSeparator** - Visual separator
- **ModelSelectorShortcut** - Keyboard shortcut display

## Props

### ModelSelector

| Prop       | Type      | Default | Description                      |
| ---------- | --------- | ------- | -------------------------------- |
| `open`     | `boolean` | -       | Controlled open state (bindable) |
| `children` | `Snippet` | -       | Selector content (required)      |

### ModelSelectorDialog

| Prop          | Type      | Default                | Description                      |
| ------------- | --------- | ---------------------- | -------------------------------- |
| `open`        | `boolean` | -                      | Controlled open state (bindable) |
| `title`       | `string`  | `"Model Selector"`     | Dialog title                     |
| `description` | `string`  | `"Search for a model"` | Dialog description               |
| `children`    | `Snippet` | -                      | Dialog content (required)        |

### ModelSelectorLogo

| Prop       | Type     | Default | Description                                 |
| ---------- | -------- | ------- | ------------------------------------------- |
| `provider` | `string` | -       | Provider slug (e.g., "openai", "anthropic") |
| `class`    | `string` | -       | Additional CSS classes                      |

### ModelSelectorGroup

| Prop       | Type      | Default | Description            |
| ---------- | --------- | ------- | ---------------------- |
| `heading`  | `string`  | -       | Group heading text     |
| `children` | `Snippet` | -       | Group items (required) |

### ModelSelectorItem

| Prop       | Type         | Default | Description                     |
| ---------- | ------------ | ------- | ------------------------------- |
| `value`    | `string`     | -       | Item value for search/selection |
| `onSelect` | `() => void` | -       | Callback when item is selected  |
| `children` | `Snippet`    | -       | Item content (required)         |

## Provider Logos

The `ModelSelectorLogo` component fetches provider logos from [models.dev](https://models.dev). Supported providers include:

- OpenAI, Anthropic, Google, Meta (Llama)
- DeepSeek, Mistral, Alibaba, xAI
- Perplexity, Cohere, Amazon Bedrock
- Azure, Groq, Together AI, OpenRouter
- And 50+ more providers

## Notes

- Built on top of shadcn-svelte's `Dialog` and `Command` components.
- Fully searchable with fuzzy matching.
- Keyboard navigation support (arrow keys, enter, escape).
- Accessible with proper ARIA labels.
- Provider logos are automatically loaded from models.dev CDN.
- Perfect for AI chat applications, model comparison tools, and API playgrounds.

## Related Components

- [Dialog](/components/dialog) - Base dialog component
- [Command](/components/command) - Command palette component
- [Button](/components/button) - Button component
