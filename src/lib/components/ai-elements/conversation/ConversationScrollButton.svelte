<script lang="ts" module>
  import { cn } from "$lib/utils.js";
  import type { ButtonProps } from "$lib/components/ui/button/button.svelte";

  export interface ConversationScrollButtonProps extends ButtonProps {}
</script>

<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import { ArrowDown } from "@lucide/svelte";
  import { getStickToBottomContext } from "./stick-to-bottom-context.svelte.js";
  import { fade, fly, scale } from "svelte/transition";
  import { backOut } from "svelte/easing";

  let {
    class: className,
    onclick,
    ...restProps
  }: ConversationScrollButtonProps = $props();

  const context = getStickToBottomContext();

  const handleScrollToBottom = (event: MouseEvent) => {
    context.scrollToBottom();
    if (onclick) {
      onclick(
        event as MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
      );
    }
  };
</script>

{#if !context.isAtBottom}
  <div
    in:fly={{
      duration: 300,
      y: 10,
      easing: backOut,
    }}
    out:fly={{
      duration: 200,
      y: 10,
      easing: backOut,
    }}
    class="absolute bottom-4 left-[50%] translate-x-[-50%]"
  >
    <Button
      class={cn(
        "rounded-full shadow-lg backdrop-blur-sm bg-background/80 border-border/50 hover:bg-background/90 hover:shadow-xl",
        className
      )}
      onclick={handleScrollToBottom}
      size="icon"
      type="button"
      variant="outline"
      {...restProps}
    >
      <ArrowDown class="size-4" />
    </Button>
  </div>
{/if}
