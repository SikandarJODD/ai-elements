<script lang="ts">
  import type { Snippet } from "svelte";
  import * as Tabs from "$lib/components/ui/tabs";
  import * as Code from "$lib/components/ai-elements/code";
  import Button from "$lib/components/ui/button/button.svelte";
  import { cn } from "$lib/utils";

  import RefreshCwIcon from "@lucide/svelte/icons/refresh-cw";

  type Props = {
    code: string;
    replay?: boolean;
    class?: string;
    children: Snippet<[]>;
    highlight?: (number | [number, number])[];
  };

  let {
    children,
    code,
    class: className = undefined,
    replay = false,
    highlight = [],
  }: Props = $props();

  let remountCount = $state(0);

  let tab: "preview" | "code" = $state("preview");
</script>

<Tabs.Root bind:value={tab} class="w-full">
  <Tabs.List>
    <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
    <Tabs.Trigger value="code">Code</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="preview" class="size-full">
    <div
      class={cn(
        "border-border relative w-full flex min-h-[400px] place-items-center justify-center rounded-lg border",
        className
      )}
    >
      {#if replay}
        <Button
          size="icon"
          variant="ghost"
          class="absolute top-3 right-3"
          onclick={() => remountCount++}
        >
          <RefreshCwIcon class="size-4" />
        </Button>
      {/if}
      {#key remountCount}
        <div class="w-full p-4 md:p-6 flex place-items-center justify-center">
          {@render children()}
        </div>
      {/key}
    </div>
  </Tabs.Content>
  <Tabs.Content value="code" class="w-full pb-4">
    <div
      class={cn(
        "border-border relative flex min-h-[400px] rounded-lg border w-full",
        className
      )}
    >
      <Code.Overflow class="w-full data-[collapsed=true]:max-h-[380px]">
        <Code.Root
          {highlight}
          lang="svelte"
          {code}
          class="w-full no-scrollbar border-none bg-transparent"
        >
          <Code.CopyButton class="z-30" />
        </Code.Root>
      </Code.Overflow>
    </div>
  </Tabs.Content>
</Tabs.Root>
