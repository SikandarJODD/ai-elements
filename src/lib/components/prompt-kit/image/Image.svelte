<script lang="ts">
  import { cn } from "$lib/utils/utils";
  import type { HTMLImgAttributes } from "svelte/elements";

  export type GeneratedImageLike = {
    base64?: string;
    uint8Array?: Uint8Array;
    mediaType?: string;
  };

  type Props = GeneratedImageLike & {
    alt: string;
    class?: string;
  } & Omit<HTMLImgAttributes, "src" | "alt" | "class">;

  let {
    base64,
    uint8Array,
    mediaType = "image/png",
    class: className,
    alt,
    ...props
  }: Props = $props();

  let src = $derived.by(() => {
    // Base64 takes precedence
    if (base64 && mediaType) {
      return `data:${mediaType};base64,${base64}`;
    }

    // Handle Uint8Array
    if (uint8Array && mediaType) {
      const blob = new Blob([uint8Array as BlobPart], { type: mediaType });
      return URL.createObjectURL(blob);
    }

    return undefined;
  });
</script>

{#if !src}
  <div
    aria-label={alt}
    role="img"
    class={cn(
      "h-auto max-w-full animate-pulse overflow-hidden rounded-md bg-gray-100 dark:bg-neutral-800",
      className
    )}
  ></div>
{:else}
  <img
    {src}
    {alt}
    class={cn("h-auto max-w-full overflow-hidden rounded-md", className)}
    {...props}
  />
{/if}
