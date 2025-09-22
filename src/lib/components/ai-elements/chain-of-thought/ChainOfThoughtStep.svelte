<script lang="ts">
  import { cn } from "$lib/utils.js";
  import { DotIcon, type Icon as IconType } from "@lucide/svelte";
  import { getChainOfThoughtContext } from './chain-of-thought-context.svelte.js';
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
    /**
     * Animation delay in milliseconds (optional, auto-calculated if not provided)
     */
    delay?: number;
  }

  let {
    icon: Icon = DotIcon,
    label,
    description,
    status = "complete",
    children,
    class: className,
    delay,
    ...restProps
  }: ChainOfThoughtStepProps = $props();

  const context = getChainOfThoughtContext();
  let isVisible = $state(false);
  let element: HTMLDivElement;

  const statusStyles = {
    complete: "text-muted-foreground",
    active: "text-foreground",
    pending: "text-muted-foreground/50",
  };

  // Calculate step index based on DOM position
  function getStepIndex(): number {
    if (!element?.parentElement) return 0;
    const steps = Array.from(element.parentElement.querySelectorAll('[data-chain-step]'));
    return steps.indexOf(element);
  }

  // Handle animation when content opens/closes
  $effect(() => {
    if (context.isOpen) {
      const stepIndex = getStepIndex();
      const calculatedDelay = delay ?? stepIndex * 150; // 150ms between each step
      const timer = setTimeout(() => {
        isVisible = true;
      }, calculatedDelay);

      return () => clearTimeout(timer);
    } else {
      isVisible = false;
    }
  });
</script>

<div
  bind:this={element}
  data-chain-step
  class={cn(
    "flex gap-2 text-sm transition-all duration-500 ease-out",
    statusStyles[status],
    isVisible
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-3",
    className
  )}
  {...restProps}
>
  <div class="relative mt-0.5">
    <Icon class="size-4" />
    <div class="-mx-px absolute top-7 bottom-0 left-1/2 w-px bg-border"></div>
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
