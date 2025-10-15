<script lang="ts">
  import { cn } from "$lib/utils/utils.js";
  import type { HTMLAttributes } from "svelte/elements";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    class?: string;
    children?: any;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<div
  class={cn(
    "flex flex-col overflow-hidden rounded-lg border bg-background shadow-sm",
    className
  )}
  {...restProps}
>
  {@render children?.()}
</div>
