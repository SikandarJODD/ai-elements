<script lang="ts">
  import { cn } from "$lib/utils.js";
  import { DotIcon, type Icon as IconType } from "@lucide/svelte";
  import type { ComponentType } from "svelte";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  interface ChainOfThoughtStepProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Icon component to display (defaults to DotIcon)
     */
    icon?: typeof IconType;
    /**
     * Label text for the step
     */
    label: string;
    /**
     * Optional description text
     */
    description?: string;
    /**
     * Status of the step
     */
    status?: "complete" | "active" | "pending";
    /**
     * Additional content
     */
    children?: Snippet;
    /**
     * Additional CSS classes
     */
    class?: string;
  }

  let {
    icon: Icon = DotIcon,
    label,
    description,
    status = "complete",
    children,
    class: className,
    ...restProps
  }: ChainOfThoughtStepProps = $props();

  const statusStyles = {
    complete: "text-muted-foreground",
    active: "text-foreground",
    pending: "text-muted-foreground/50",
  };
</script>

<div
  class={cn(
    "flex gap-2 text-sm",
    statusStyles[status],
    "fade-in-0 slide-in-from-top-2 animate-in",
    className
  )}
  {...restProps}
>
  <div class="relative mt-0.5">
    <Icon class="size-4" />
    <div class="-mx-px absolute top-7 bottom-0 left-1/2 w-px bg-border" />
  </div>
  <div class="flex-1 space-y-2">
    <div>{label}</div>
    {#if description}
      <div class="text-muted-foreground text-xs">{description}</div>
    {/if}
    {#if children}
      {@render children()}
    {/if}
  </div>
</div>
