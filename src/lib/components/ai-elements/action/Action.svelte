<script lang="ts">
  import { cn } from "$lib/utils/utils.js";
  import Button, {
    type ButtonProps,
  } from "$lib/components/ui/button/button.svelte";
  import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "$lib/components/ui/tooltip/index.js";

  export type ActionProps = ButtonProps & {
    tooltip?: string;
    label?: string;
  };

  let {
    tooltip,
    children,
    label,
    class: className,
    variant = "ghost",
    size = "sm",
    ...restProps
  }: ActionProps = $props();

  let buttonClasses = $derived(
    cn(
      "relative size-9 p-1.5 text-muted-foreground hover:text-foreground",
      className
    )
  );
</script>

{#if tooltip}
  <TooltipProvider>
    <Tooltip delayDuration={150}>
      <TooltipTrigger>
        <Button
          class={buttonClasses}
          {size}
          type="button"
          {variant}
          {...restProps}
        >
          {@render children?.()}
          <span class="sr-only">{label || tooltip}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
{:else}
  <Button class={buttonClasses} {size} type="button" {variant} {...restProps}>
    {@render children?.()}
    <span class="sr-only">{label || tooltip}</span>
  </Button>
{/if}
