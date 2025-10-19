<script lang="ts">
  import { setChatContainerContext, type ResizeMode, type InitialMode } from "./chat-container-context.svelte";
  import { cn } from "$lib/utils/utils";
  import { watch } from "runed";

  let {
    children,
    class: className,
    resize = "smooth",
    initial = "instant",
    ...restProps
  }: {
    children?: import("svelte").Snippet;
    class?: string;
    resize?: ResizeMode;
    initial?: InitialMode;
    [key: string]: any;
  } = $props();

  const context = setChatContainerContext(resize, initial);

  let containerElement: HTMLElement;

  watch(
    () => containerElement,
    () => {
      if (containerElement) {
        context.setElement(containerElement);
      }
    }
  );
</script>

<div
  bind:this={containerElement}
  class={cn("flex overflow-y-auto", className)}
  role="log"
  {...restProps}
>
  {@render children?.()}
</div>
