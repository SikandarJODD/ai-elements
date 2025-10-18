<script lang="ts">
  import { cn } from "$lib/utils/utils.js";

  interface Props {
    class?: string;
    size?: "sm" | "md" | "lg";
  }

  let { class: className, size = "md" }: Props = $props();

  let barWidths = {
    sm: "w-1",
    md: "w-1.5",
    lg: "w-2",
  };

  let containerSizes = {
    sm: "h-4 gap-1",
    md: "h-5 gap-1.5",
    lg: "h-6 gap-2",
  };
</script>

<div class={cn("flex", containerSizes[size], className)}>
  {#each Array(3) as _, i}
    <!-- svelte-ignore element_invalid_self_closing_tag -->
    <div
      class={cn(
        "bg-primary h-full animate-[wave-bars_1.2s_ease-in-out_infinite]",
        barWidths[size]
      )}
      style:animation-delay="{i * 0.2}s"
    />
  {/each}
  <span class="sr-only">Loading</span>
</div>
