# ComponentAPITable

A reusable component for displaying component API documentation in a clean, formatted table.

## Usage

```svelte
<script lang="ts">
  import { ComponentAPITable, type PropDefinition } from "$lib/components/docs";

  const myComponentProps: PropDefinition[] = [
    {
      name: "value",
      type: "string",
      default: '""',
      description: "The controlled value of the component",
    },
    {
      name: "onChange",
      type: "(value: string) => void",
      description: "Callback when value changes",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Whether the component is disabled",
    },
  ];
</script>

<ComponentAPITable componentName="MyComponent" props={myComponentProps} />
```

## Props

### ComponentAPITable

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `componentName` | `string` | - | Name of the component being documented |
| `props` | `PropDefinition[]` | - | Array of prop definitions to display |
| `class` | `string` | - | Optional additional CSS classes |

### PropDefinition

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | `string` | ✅ | Name of the prop |
| `type` | `string` | ✅ | TypeScript type of the prop |
| `default` | `string` | ❌ | Default value (optional) |
| `description` | `string` | ✅ | Description of the prop |

## Features

- ✨ Clean, modern table design with rounded borders
- 🎨 Automatic syntax highlighting for prop names and types
- 📱 Responsive with horizontal scrolling on mobile
- 🌗 Dark mode support with proper theming
- 📝 Consistent spacing and typography
- 🔄 Reusable across all documentation pages

## Example

See `src/routes/prompt-kit/prompt-input/+page.svelte` for a complete implementation example.
