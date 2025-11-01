# Image

> Displays AI-generated images from base64 encoded data with automatic styling and accessibility features.

## Installation

```bash
npx shadcn-svelte@latest add https://svelte-ai-elements.vercel.app//r/image.json
```

## Usage

### Basic Example

```svelte
<script lang="ts">
  import { Image } from "$lib/components/ai-elements/image";

  const imageData = {
    base64: "iVBORw0KGgoAAAANSUhEUgAAAAUA...",
    mediaType: "image/png",
  };
</script>

<Image
  base64={imageData.base64}
  mediaType={imageData.mediaType}
  alt="Generated image"
/>
```

### With AI SDK

```svelte
<script lang="ts">
  import { experimental_generateImage as generateImage } from "ai";
  import { Image } from "$lib/components/ai-elements/image";

  let generatedImage = $state<any>(null);
  let isGenerating = $state(false);

  async function generate() {
    isGenerating = true;
    const result = await generateImage({
      model: "stability-ai/stable-diffusion-xl",
      prompt: "A beautiful sunset over mountains",
    });
    generatedImage = result.image;
    isGenerating = false;
  }
</script>

<button onclick={generate} disabled={isGenerating}>
  {isGenerating ? "Generating..." : "Generate Image"}
</button>

{#if generatedImage}
  <Image
    base64={generatedImage.base64}
    mediaType={generatedImage.mediaType}
    alt="AI generated sunset over mountains"
  />
{/if}
```

### Custom Styling

```svelte
<script lang="ts">
  import { Image } from "$lib/components/ai-elements/image";
</script>

<!-- Square thumbnail -->
<Image
  base64={imageData.base64}
  mediaType={imageData.mediaType}
  alt="Thumbnail"
  class="size-32 rounded-lg object-cover"
/>

<!-- Full width with shadow -->
<Image
  base64={imageData.base64}
  mediaType={imageData.mediaType}
  alt="Full width image"
  class="w-full rounded-xl shadow-lg"
/>

<!-- Circular avatar -->
<Image
  base64={imageData.base64}
  mediaType={imageData.mediaType}
  alt="Avatar"
  class="size-16 rounded-full object-cover"
/>
```

### Responsive Gallery

```svelte
<script lang="ts">
  import { Image } from "$lib/components/ai-elements/image";

  let images = [
    { base64: "...", mediaType: "image/png", alt: "Image 1" },
    { base64: "...", mediaType: "image/jpeg", alt: "Image 2" },
    { base64: "...", mediaType: "image/webp", alt: "Image 3" },
  ];
</script>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {#each images as image}
    <Image
      base64={image.base64}
      mediaType={image.mediaType}
      alt={image.alt}
      class="aspect-square rounded-lg object-cover"
    />
  {/each}
</div>
```

## Component API

### Image

| Prop         | Type              | Default | Description                                                             |
| ------------ | ----------------- | ------- | ----------------------------------------------------------------------- |
| base64       | string            | -       | The base64 encoded image data                                           |
| mediaType    | string            | -       | The MIME type of the image (e.g., "image/png", "image/jpeg")            |
| uint8Array   | Uint8Array        | -       | The raw binary data as a Uint8Array (optional, uses base64 instead)     |
| alt          | string            | -       | Alternative text description for the image (required for accessibility) |
| class        | string            | -       | Additional CSS classes to apply to the image element                    |
| ref          | HTMLImageElement  | -       | Reference to the underlying img element                                 |
| ...restProps | HTMLImgAttributes | -       | All other standard HTML image attributes (width, height, loading, etc.) |

## Features

- **Base64 support**: Displays images from base64 encoded data
- **AI SDK integration**: Works seamlessly with AI SDK's image generation
- **Automatic data URL**: Constructs proper data URLs from base64 and mediaType
- **Accessibility**: Requires alt text for screen readers
- **Customizable**: Easy to style with Tailwind classes
- **Responsive**: Adapts to container size with sensible defaults
- **Multiple formats**: Supports PNG, JPEG, WebP, and other image formats

## Default Styling

The Image component comes with sensible default styles:

- `h-auto` - Height adjusts automatically to maintain aspect ratio
- `max-w-full` - Maximum width is 100% of container
- `rounded-md` - Slightly rounded corners

These can be overridden using the `class` prop.

---

For more information, visit: https://svelte-ai-elements.vercel.app/components/image
