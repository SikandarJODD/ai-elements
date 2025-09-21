<script lang="ts" module>
  // Add this inside components below inside data
  // Components : Branch, Chain of Thought, Code Block, Context, Converation, Inline Citation, Loader, Message, Open in Chat, Prompt Input, Reasoning, Response, Sources, Suggestion, Task, Tool, Web Preview
  let data = {
    navMain: [
      {
        title: "Getting Started",
        url: "#",
        items: [
          {
            title: "Introduction",
            url: "#",
            isActive: true,
          },
          {
            title: "Installation",
            url: "#",
          },
        ],
      },
      {
        title: "Components",
        url: "#",
        items: [
          {
            title: "Actions",
            url: "#",
          },
          {
            title: "Artifact",
            url: "#",
          },
          {
            title: "Branch",
            url: "#",
          },
          {
            title: "Chain of Thought",
            url: "#",
          },
          {
            title: "Code Block",
            url: "#",
          },
          {
            title: "Context",
            url: "#",
          },
          {
            title: "Conversation",
            url: "#",
          },
          {
            title: "Inline Citation",
            url: "#",
          },
          {
            title: "Loader",
            url: "#",
          },
          {
            title: "Message",
            url: "#",
          },
          {
            title: "Open in Chat",
            url: "#",
          },
          {
            title: "Prompt Input",
            url: "#",
          },
          {
            title: "Reasoning",
            url: "#",
          },
          {
            title: "Response",
            url: "#",
          },
          {
            title: "Sources",
            url: "#",
          },
          {
            title: "Suggestion",
            url: "#",
          },
          {
            title: "Task",
            url: "#",
          },
          {
            title: "Tool",
            url: "#",
          },
          {
            title: "Web Preview",
            url: "#",
          },
        ],
      },
      // {
      //   title: "Community",
      //   url: "#",
      //   items: [
      //     {
      //       title: "Contribution Guide",
      //       url: "#",
      //     },
      //   ],
      // },
    ],
  };
</script>

<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import GalleryVerticalEndIcon from "@lucide/svelte/icons/gallery-vertical-end";
  import type { ComponentProps } from "svelte";
  import SidebarOptInForm from "./sidebar-opt-in-form.svelte";
  let {
    ref = $bindable(null),
    ...restProps
  }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root class="mt-16 h-[calc(100vh-4rem)]" {...restProps} bind:ref>
  <!-- <Sidebar.Header>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton size="lg">
          {#snippet child({ props })}
            <a href="##" {...props}>
              <div
                class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
              >
                <GalleryVerticalEndIcon class="size-4" />
              </div>
              <div class="flex flex-col gap-0.5 leading-none">
                <span class="font-medium">Documentation</span>
                <span class="">v1.0.0</span>
              </div>
            </a>
          {/snippet}
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Header> -->
  <Sidebar.Content class="no-scrollbar">
    <Sidebar.Group>
      <Sidebar.Menu>
        {#each data.navMain as item (item.title)}
          <Sidebar.MenuItem>
            <Sidebar.MenuButton class="font-medium">
              {#snippet child({ props })}
                <a href={item.url} {...props}>
                  {item.title}
                </a>
              {/snippet}
            </Sidebar.MenuButton>
            {#if item.items?.length}
              <Sidebar.MenuSub>
                {#each item.items as subItem (subItem.title)}
                  <Sidebar.MenuSubItem>
                    <Sidebar.MenuSubButton isActive={subItem.isActive}>
                      {#snippet child({ props })}
                        <a href={subItem.url} {...props}>{subItem.title}</a>
                      {/snippet}
                    </Sidebar.MenuSubButton>
                  </Sidebar.MenuSubItem>
                {/each}
              </Sidebar.MenuSub>
            {/if}
          </Sidebar.MenuItem>
        {/each}
      </Sidebar.Menu>
    </Sidebar.Group>
  </Sidebar.Content>
  <Sidebar.Footer>
    <div class="p-1">
      <SidebarOptInForm />
    </div>
  </Sidebar.Footer>
  <!-- <Sidebar.Rail /> -->
</Sidebar.Root>
