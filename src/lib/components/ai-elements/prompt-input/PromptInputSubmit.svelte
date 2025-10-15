<script lang="ts">
  import { cn } from "$lib/utils/utils.js";
  import Button from "$lib/components/ui/button/button.svelte";
  import type { ButtonProps } from "$lib/components/ui/button/index.js";
  import type { ChatStatus } from "./attachments-context.svelte.js";
  import SendIcon from "./SendIcon.svelte";
  import Loader2Icon from "./Loader2Icon.svelte";
  import SquareIcon from "./SquareIcon.svelte";
  import XIcon from "./XIcon.svelte";

  interface Props extends ButtonProps {
    class?: string;
    status?: ChatStatus;
    children?: import("svelte").Snippet;
  }

  let {
    class: className,
    variant = "default",
    size = "icon",
    status,
    children,
    ...props
  }: Props = $props();

  let Icon = $derived.by(() => {
    if (status === "submitted") {
      return Loader2Icon;
    } else if (status === "streaming") {
      return SquareIcon;
    } else if (status === "error") {
      return XIcon;
    }
    return SendIcon;
  });

  let iconClass = $derived.by(() => {
    if (status === "submitted") {
      return "size-4 animate-spin";
    }
    return "size-4";
  });
</script>

<Button
  class={cn("gap-1.5 rounded-lg", className)}
  {size}
  type="submit"
  {variant}
  {...props}
>
  {#if children}
    {@render children()}
  {:else}
    <!-- <svelte:component this={Icon} class={iconClass} /> -->
    <Icon class={iconClass} />
  {/if}
</Button>
