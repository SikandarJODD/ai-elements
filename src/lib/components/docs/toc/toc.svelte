<script lang="ts" module>
  export type TocProps = {
    toc: Heading[];
    class?: string;
    /** Indicates whether this is a child component or root component */
    isChild?: boolean;
  };
</script>

<script lang="ts">
  import type { Heading } from "$lib/hooks/use-toc.svelte";
  import { pushState } from "$app/navigation";
  import { cn } from "$lib/utils";
  import Self from "./toc.svelte";

  let { toc, isChild = false, class: className }: TocProps = $props();

  function smoothScrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }

  function handleLinkClick(event: MouseEvent, id: string | undefined) {
    event.preventDefault();
    if (id) {
      smoothScrollTo(id);
      // Update URL without triggering page reload
      // history.pushState(null, "", `#${id}`);
      // pushState(null, "", `#${id}`);
      pushState(``, `#${id}`);
    }
  }
</script>

<ul class={cn("m-0 list-none text-sm font-medium", { "pl-4": isChild })}>
  {#each toc as heading, i (i)}
    <li
      class={cn("text-muted-foreground mt-0 pt-2 transition-all", {
        "text-foreground font-normal": heading.active,
      })}
    >
      {#if heading.id}
        <a
          href="#{heading.id}"
          class={[
            "hover:text-foreground block font-normal py-1 rounded-md transition-all duration-200",
            heading.active ? "text-blue-500" : "",
          ]}
          onclick={(e) => handleLinkClick(e, heading.id)}
        >
          {heading.label}
        </a>
      {:else}
        <span class="block py-1 px-2">
          {heading.label}
        </span>
      {/if}
    </li>
    {#if heading.children.length > 0}
      <Self class={className} toc={heading.children} isChild={true} />
    {/if}
  {/each}
</ul>
