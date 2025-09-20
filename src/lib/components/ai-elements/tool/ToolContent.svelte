<script lang="ts">
  import { CollapsibleContent } from "$lib/components/ui/collapsible/index.js";
  import { cn } from "$lib/utils.js";
  import type { Snippet } from "svelte";

  interface ToolContentProps {
    class?: string;
    children?: Snippet;
    [key: string]: any;
  }

  let { class: className = "", children, ...restProps }: ToolContentProps = $props();

  let id = $props.id();;
</script>

<CollapsibleContent
  {id}
  class={cn(
    "data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2 text-popover-foreground outline-none data-[state=closed]:animate-out data-[state=open]:animate-in",
    className
  )}
  {...restProps}
>
  {@render children?.()}
</CollapsibleContent>