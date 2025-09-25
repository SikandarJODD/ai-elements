<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import type { ComponentProps } from "svelte";
  let {
    ref = $bindable(null),
    ...restProps
  }: ComponentProps<typeof Sidebar.Root> = $props();

  let data = $state({
    navMain: [
      {
        title: "Getting Started",
        url: "#",
        items: [
          {
            title: "Introduction",
            url: "/docs/introduction",
          },
          // {
          //   title: "Installation",
          //   url: "/docs/installation",
          // },
        ],
      },
      {
        title: "Components",
        url: "/components",
        items: [
          {
            title: "Actions",
            url: "/components/actions",
            isActive: true,
          },
          {
            title: "Artifact",
            url: "/components/artifact",
          },
          // {
          //   title: "Branch",
          //   url: "/components/branch",
          // },
          {
            title: "Chain of Thought",
            url: "/components/chain-of-thought",
          },
          {
            title: "Code Block",
            url: "/components/code-block",
          },
          {
            title: "Context",
            url: "/components/context",
          },
          {
            title: "Conversation",
            url: "/components/conversation",
          },
          {
            title: "Inline Citation",
            url: "/components/inline-citation",
          },
          {
            title: "Loader",
            url: "/components/loader",
          },
          {
            title: "Message",
            url: "/components/message",
          },
          {
            title: "Open in Chat",
            url: "/components/open-in-chat",
          },
          {
            title: "Prompt Input",
            url: "/components/prompt-input",
          },
          {
            title: "Reasoning",
            url: "/components/reasoning",
          },
          {
            title: "Response",
            url: "/components/response",
          },
          {
            title: "Sources",
            url: "/components/sources",
          },
          {
            title: "Suggestion",
            url: "/components/suggestion",
          },
          {
            title: "Task",
            url: "/components/task",
          },
          {
            title: "Tool",
            url: "/components/tool",
          },
          {
            title: "Web Preview",
            url: "/components/web-preview",
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
  });

  let updateIsActive = (url: string) => {
    data.navMain.forEach((item) => {
      item.items?.forEach((subItem) => {
        subItem.isActive = subItem.url === url;
      });
    });
  };
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
  <Sidebar.Content class="no-scrollbar mb-4 bg-background ">
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
                    <Sidebar.MenuSubButton isActive={subItem.isActive} onclick={() => updateIsActive(subItem.url)}>
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
  <!-- <Sidebar.Footer>
    <div class="p-1">
      <SidebarOptInForm />
    </div>
  </Sidebar.Footer> -->
  <!-- <Sidebar.Rail /> -->
</Sidebar.Root>
