<script lang="ts">
  import { cn } from "$lib/utils/utils";

  let {
    class: className,
    ...restProps
  }: {
    class?: string;
    [key: string]: any;
  } = $props();
</script>

<div
  class={cn("h-px w-full shrink-0 scroll-mt-4", className)}
  aria-hidden="true"
  {...restProps}
/>
