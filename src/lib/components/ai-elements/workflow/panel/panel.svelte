<script lang="ts">
  import { Panel as PanelPrimitive, type PanelProps } from "@xyflow/svelte";
  import { cn } from "$lib/utils/utils";

  type PanelComponentProps = PanelProps & {
    class?: string;
  };

  let { class: className, ...restProps }: PanelComponentProps = $props();
</script>

<PanelPrimitive
  class={cn("m-4 overflow-hidden rounded-md border bg-card p-1", className)}
  {...restProps}
/>
