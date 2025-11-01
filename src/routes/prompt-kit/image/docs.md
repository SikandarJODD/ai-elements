# Image

> The Image component displays images from base64 or Uint8Array data, supporting all standard HTML image attributes. It is ideal for showing AI-generated images or user uploads in chat and AI apps. Compatible with AI SDK v5 architecture.

## Installation

```bash
npx shadcn-svelte@latest add https://svelte-ai-elements.vercel.app//p/image.json
```

## Usage

### Basic Example

```svelte
<script lang="ts">
  import { Image } from "$lib/components/prompt-kit/image";

  // Example base64 (compact SVG chat typing icon)
  const base64 =
    "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDQ4IDQ4Ij48cmVjdCB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHJ4PSIxMCIgZmlsbD0iIzdjM2FlZCIvPjxjaXJjbGUgY3g9IjE2IiBjeT0iMjQiIHI9IjQiIGZpbGw9IiNmZmYiLz48Y2lyY2xlIGN4PSIyNCIgY3k9IjI0IiByPSI0IiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iMzIiIGN5PSIyNCIgcj0iNCIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==";
</script>

<Image
  {base64}
  uint8Array={new Uint8Array()}
  mediaType="image/svg+xml"
  alt="Compact gradient chat icon"
  class="h-24 w-24 rounded-md"
/>
```

## Component API

### Image

| Prop       | Type                                | Default     | Description                                   |
| ---------- | ----------------------------------- | ----------- | --------------------------------------------- |
| base64     | string                              | -           | Base64-encoded image data                     |
| uint8Array | Uint8Array                          | -           | Raw image data as Uint8Array                  |
| mediaType  | string                              | 'image/png' | MIME type of the image (e.g., 'image/jpeg')   |
| alt        | string                              | -           | Alternative text for accessibility (required) |
| className  | string                              | -           | Additional CSS classes                        |
| ...props   | ImgHTMLAttributes<HTMLImageElement> | -           | All standard HTML <img> attributes            |

## Features

- Accepts base64 or Uint8Array image data
- Supports all standard HTML image attributes
- Responsive by default with `max-w-full h-auto`
- Customizable with Tailwind classes
- Fully accessible (alt required)

---

For more information, visit: https://svelte-ai-elements.vercel.app//prompt-kit/image
