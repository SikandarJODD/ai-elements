<script lang="ts">
  import { Card } from "$lib/components/ui/card";
  import { Handle, Position } from "@xyflow/svelte";
  import { cn, type WithElementRef } from "$lib/utils/utils";
  import type { HTMLAttributes } from "svelte/elements";

  type Props = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    handles: {
      target: boolean;
      source: boolean;
    };
  };

  let {
    ref = $bindable(null),
    handles,
    class: className,
    children,
    ...restProps
  }: Props = $props();
</script>

<Card
  bind:ref
  class={cn(
    "node-container relative size-full h-auto w-sm gap-0 rounded-md p-0",
    className
  )}
  {...restProps}
>
  {#if handles.target}
  <Handle position={Position.Left} type="target" isConnectable />
  {/if}
  {#if handles.source}
  <Handle position={Position.Right} type="source" isConnectable />
  {/if}
  {@render children?.()}
</Card>
