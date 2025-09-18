<script lang="ts" module>
  import { cn } from "$lib/utils.js";
  import type { ButtonProps } from "$lib/components/ui/button/button.svelte";

  export interface ConversationScrollButtonProps extends ButtonProps {}
</script>

<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import { ArrowDown } from "@lucide/svelte";
  import { getStickToBottomContext } from "./stick-to-bottom-context.svelte.js";

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
  <Button
    class={cn(
      "absolute bottom-4 left-[50%] translate-x-[-50%] rounded-full",
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
{/if}
