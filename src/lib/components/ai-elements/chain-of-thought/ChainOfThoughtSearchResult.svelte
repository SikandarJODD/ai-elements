<script lang="ts">
  import { cn } from "$lib/utils/utils";
  import { Badge } from "$lib/components/ui/badge/index";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  interface ChainOfThoughtSearchResultProps
    extends HTMLAttributes<HTMLElement> {
    children: Snippet;
    class?: string;
  }

  let {
    children,
    class: className,
    ...restProps
  }: ChainOfThoughtSearchResultProps = $props();
</script>

<Badge
  class={cn("gap-1 px-2 py-0.5 font-normal text-xs", className)}
  variant="secondary"
  {...restProps}
>
  {@render children()}
</Badge>
