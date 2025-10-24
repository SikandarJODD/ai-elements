<script lang="ts">
  import { cn } from "$lib/utils/utils";
  import {
    Controls as ControlsPrimitive,
    type ControlsProps,
  } from "@xyflow/svelte";

  let { class: className, ...restProps }: ControlsProps = $props();
</script>

<ControlsPrimitive
  class={cn(
    "gap-px overflow-hidden rounded-md border bg-card p-1 shadow-none!",
    "[&>button]:rounded-md [&>button]:border-none! [&>button]:bg-transparent! [&>button]:hover:bg-secondary!",
    className
  )}
  {...restProps}
/>
