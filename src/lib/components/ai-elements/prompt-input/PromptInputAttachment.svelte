<script lang="ts">
import { cn } from "$lib/utils.js";
import Button from "$lib/components/ui/button/button.svelte";
import { getAttachmentsContext, type FileWithId } from "./attachments-context.svelte.js";
import PaperclipIcon from "./PaperclipIcon.svelte";
import XIcon from "./XIcon.svelte";

interface Props {
  data: FileWithId;
  class?: string;
}

let { data, class: className, ...props }: Props = $props();

let attachments = getAttachmentsContext();
</script>

<div
  class={cn("group relative h-14 w-14 rounded-md border", className)}
  {...props}
>
  {#if data.mediaType?.startsWith("image/") && data.url}
    <img
      alt={data.filename || "attachment"}
      class="size-full rounded-md object-cover"
      height={56}
      src={data.url}
      width={56}
    />
  {:else}
    <div class="flex size-full items-center justify-center text-muted-foreground">
      <PaperclipIcon class="size-4" />
    </div>
  {/if}
  <Button
    aria-label="Remove attachment"
    class="-right-1.5 -top-1.5 absolute h-6 w-6 rounded-full opacity-0 group-hover:opacity-100"
    onclick={() => attachments.remove(data.id)}
    size="icon"
    type="button"
    variant="outline"
  >
    <XIcon class="h-3 w-3" />
  </Button>
</div>