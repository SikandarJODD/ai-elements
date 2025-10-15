<script lang="ts">
  import AiInstallCommand from "./ai-install-command.svelte";
  import { Subheading } from "$lib/components/docs";
  import CopyButton from "../ai-elements/copy-button/CopyButton.svelte";
  import ClipboardIcon from "@lucide/svelte/icons/clipboard";
  import * as Tooltip from "$lib/components/ui/tooltip";

  type Props = {
    specifier: string;
    is_jsrepo?: boolean;
    blockname?: string;
  };

  let { specifier, is_jsrepo = true, blockname }: Props = $props();

  let jsrepoCommand = $derived(`jsrepo add ${blockname ?? specifier}`);
</script>

<Subheading>Installation</Subheading>
<!-- pnpm dlx shadcn-svelte@latest add http://localhost:5173/r/hello-world.json -->

<AiInstallCommand
  command="execute"
  args={["shadcn-svelte@latest", "add", specifier]}
/>

{#if is_jsrepo}
<p class="mt-4 text-sm text-muted-foreground">
  If you prefer using <a href="https://jsrepo.dev" target="_blank" rel="noopener noreferrer" class="font-medium text-yellow-400 underline-offset-2 hover:underline">jsrepo</a>, please install via the command below:
</p>
<div class="mt-2 border-border w-full rounded-lg border bg-card">
  <div
    class="border-border flex place-items-center justify-between gap-2 border-b py-1 pr-2"
  >
    <div class="flex place-items-center gap-2 px-2">
      <div class="bg-foreground flex size-4 place-items-center justify-center opacity-50">
        <svg class="text-background size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>
      </div>
      <span class="font-mono text-sm font-light">jsrepo</span>
    </div>
    <Tooltip.Root>
      <Tooltip.Trigger>
        {#snippet child({ props })}
          <CopyButton
            {...props}
            text={jsrepoCommand}
            class="size-6 [&_svg]:size-3"
          >
            {#snippet icon()}
              <ClipboardIcon />
            {/snippet}
          </CopyButton>
        {/snippet}
      </Tooltip.Trigger>
      <Tooltip.Content>Copy to Clipboard</Tooltip.Content>
    </Tooltip.Root>
  </div>
  <div class="no-scrollbar overflow-x-auto p-3">
    <span class="dark:text-muted-foreground font-mono text-sm leading-none font-light text-nowrap">
      {jsrepoCommand}
    </span>
  </div>
</div>
{/if}

<style lang="postcss">
  :global(.no-scrollbar) {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
</style>
