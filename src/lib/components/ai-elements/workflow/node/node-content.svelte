<script lang="ts">
  import { CardContent } from "$lib/components/ui/card";
  import { cn, type WithElementRef } from "$lib/utils/utils.js";
  import type { HTMLAttributes } from "svelte/elements";

  type Props = WithElementRef<HTMLAttributes<HTMLDivElement>>;

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: Props = $props();
</script>

<CardContent bind:ref class={cn("p-3", className)} {...restProps}>
  {@render children?.()}
</CardContent>
