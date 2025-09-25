<script lang="ts">
  import { Streamdown, type StreamdownProps } from "svelte-streamdown";
  import { cn } from "$lib/utils.js";

  type Props = StreamdownProps & {
    class?: string;
  };

  let { class: className, ...restProps }: Props = $props();
</script>

<Streamdown
  class={cn(
    "size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
    className
  )}
  shikiPreloadThemes={["github-light-default", "github-dark-default"]}
  {...restProps}
/>
