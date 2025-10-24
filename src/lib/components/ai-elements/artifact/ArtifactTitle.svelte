<script lang="ts">
  import { cn } from "$lib/utils/utils";
  import type { HTMLAttributes } from "svelte/elements";

  interface Props extends HTMLAttributes<HTMLParagraphElement> {
    class?: string;
    children?: any;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<p class={cn("font-medium text-foreground text-sm", className)} {...restProps}>
  {@render children?.()}
</p>
