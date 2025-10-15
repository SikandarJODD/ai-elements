<script lang="ts">
  import { Streamdown, type StreamdownProps } from "svelte-streamdown";
  import { cn } from "$lib/utils/utils.js";
  import { mode } from "mode-watcher";

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
  shikiTheme={mode.current === "dark" ? "github-dark-default" : "github-light-default"}
  shikiPreloadThemes={["github-dark-default", "github-light-default"]}
  baseTheme="shadcn"
  {...restProps}
/>
