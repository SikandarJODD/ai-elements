<script lang="ts">
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { getOpenInContext, providers } from "./open-in-context.svelte.js";
  import ExternalLink from "@lucide/svelte/icons/external-link";
  import MessageCircle from "@lucide/svelte/icons/message-circle";

  interface Props {
    class?: string;
  }

  let { ...restProps }: Props = $props();

  let context = getOpenInContext();

  let url = $derived.by(() => providers.t3.createUrl(context.query));
</script>

<DropdownMenu.Item {...restProps}>
  <a
    href={url}
    rel="noopener"
    target="_blank"
    class="w-full flex items-center gap-2"
  >
    <span class="shrink-0">
      <MessageCircle size="1em" />
    </span>
    <span class="flex-1">{providers.t3.title}</span>
    <ExternalLink class="size-4 shrink-0" />
  </a>
</DropdownMenu.Item>
