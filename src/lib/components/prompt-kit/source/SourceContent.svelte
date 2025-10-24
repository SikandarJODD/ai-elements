<script lang="ts">
  import { cn } from "$lib/utils/utils";
  import HoverCardContent from "$lib/components/ui/hover-card/hover-card-content.svelte";
  import { getSourceContext } from "./source-context.svelte.js";

  interface Props {
    title: string;
    description: string;
    class?: string;
    [key: string]: any;
  }

  let { title, description, class: className, ...restProps }: Props = $props();

  const { href, domain } = getSourceContext();

  let displayDomain = $derived(domain.replace("www.", ""));
  let faviconUrl = $derived(
    `https://www.google.com/s2/favicons?sz=64&domain_url=${encodeURIComponent(href)}`
  );
</script>

<HoverCardContent class={cn("w-80 p-0 shadow-xs", className)} {...restProps}>
  <a
    {href}
    target="_blank"
    rel="noopener noreferrer"
    class="flex flex-col gap-2 p-3"
  >
    <div class="flex items-center gap-1.5">
      <img
        src={faviconUrl}
        alt="favicon"
        class="size-4 rounded-full"
        width="16"
        height="16"
      />
      <div class="text-primary truncate text-sm">
        {displayDomain}
      </div>
    </div>
    <div class="line-clamp-2 text-sm font-medium">{title}</div>
    <div class="text-muted-foreground line-clamp-2 text-sm">
      {description}
    </div>
  </a>
</HoverCardContent>
