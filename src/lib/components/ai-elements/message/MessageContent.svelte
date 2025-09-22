<script lang="ts">
  import { cn } from "$lib/utils";
  import { tv, type VariantProps } from "tailwind-variants";
  import type { HTMLAttributes } from "svelte/elements";

  const messageContentVariants = tv({
    base: "flex flex-col gap-2 overflow-hidden rounded-lg text-sm",
    variants: {
      variant: {
        contained: [
          "max-w-[80%] px-4 py-3",
          "group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground",
          "group-[.is-assistant]:bg-secondary group-[.is-assistant]:text-foreground",
        ],
        flat: [
          "group-[.is-user]:max-w-[80%] group-[.is-user]:bg-secondary group-[.is-user]:px-4 group-[.is-user]:py-3 group-[.is-user]:text-foreground",
          "group-[.is-assistant]:text-foreground",
        ],
      },
    },
    defaultVariants: {
      variant: "contained",
    },
  });

  type MessageContentProps = HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof messageContentVariants>;

  let {
    class: className = "",
    variant,
    children,
    ...restProps
  }: MessageContentProps = $props();

  let id = $props.id();
</script>

<div
  class={cn(messageContentVariants({ variant }), className)}
  data-content-id={id}
  {...restProps}
>
  {@render children?.()}
</div>
