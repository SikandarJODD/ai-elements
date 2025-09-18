<script lang="ts">
  import { Button, type ButtonProps } from "$lib/components/ui/button";
  import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "$lib/components/ui/tooltip";
  import { cn } from "$lib/utils.js";
  import type { ComponentType } from "svelte";

  interface Props extends ButtonProps {
    class?: string;
    tooltip?: string;
    label?: string;
    icon?: ComponentType;
    size?: ButtonProps["size"];
    variant?: ButtonProps["variant"];
  }

  let {
    tooltip,
    label,
    icon: Icon,
    children,
    class: className,
    size = "sm",
    variant = "ghost",
    ...restProps
  }: Props = $props();

  let id = crypto.randomUUID();
</script>

{#snippet buttonContent()}
  <Button
    class={cn(
      "size-8 p-0 text-muted-foreground hover:text-foreground",
      className
    )}
    {size}
    type="button"
    {variant}
    {...restProps}
  >
    {#if Icon}
      <Icon class="size-4" />
    {:else if children}
      {@render children()}
    {/if}
    <span class="sr-only">{label || tooltip}</span>
  </Button>
{/snippet}

{#if tooltip}
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        {@render buttonContent()}
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
{:else}
  {@render buttonContent()}
{/if}
