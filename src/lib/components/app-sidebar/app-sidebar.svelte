<script lang="ts">
  import { page } from "$app/state";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import * as Collapsible from "$lib/components/ui/collapsible/index.js";
  import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
  import { onMount, type ComponentProps } from "svelte";
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
            isActive: true,
          },
          {
            title: "Installation",
            url: "/docs/installation",
          },
        ],
      },
      {
        title: "Components",
        url: "/components",
        items: [
          {
            title: "Actions",
            url: "/components/actions",
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
            url: "/components/code",
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
      {
        title: "Guides",
        url: "/guides",
        items: [
          {
            title: "Basic Setup Guide",
            url: "/guides/basic-setup",
          },
          {
            title: "Svelte 5 + AI SDK Integration",
            url: "/guides/svelte-5-ai-sdk-integration",
          },
        ],
      },
    ],
  });

  let updateIsActive = (url: string) => {
    data.navMain.forEach((item) => {
      item.items?.forEach((subItem) => {
        subItem.isActive = subItem.url === url;
      });
    });
  };

  let currentPath = $state("");

  onMount(() => {
    currentPath = page.url.pathname;
    updateIsActive(currentPath);
  });
</script>

<Sidebar.Root
  class="mt-16 h-[calc(100vh-4rem)] pl-6 pr-2"
  {...restProps}
  bind:ref
>
  <Sidebar.Content class="gap-0 no-scrollbar mb-4 bg-background pt-6">
    <!-- We create a collapsible SidebarGroup for each parent. -->
    {#each data.navMain as item (item.title)}
      <Collapsible.Root title={item.title} open class="group/collapsible">
        <Sidebar.Group class="p-0">
          <Sidebar.GroupLabel
            class="group/label text-sidebar-foreground hover:bg-transparent hover:text-sidebar-accent-foreground text-sm"
          >
            {#snippet child({ props })}
              <Collapsible.Trigger {...props}>
                {item.title}
                <ChevronRightIcon
                  class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
                />
              </Collapsible.Trigger>
            {/snippet}
          </Sidebar.GroupLabel>
          <Collapsible.Content class="mb-2">
            <Sidebar.GroupContent>
              <Sidebar.Menu class="gap-0.5">
                {#each item.items as subItem (subItem.title)}
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton
                      isActive={subItem.isActive}
                      class="hover:bg-transparent hover:text-primary  data-[active=true]:font-normal text-muted-foreground data-[active=true]:text-blue-500 data-[active=true]:bg-transparent active:bg-transparent active:text-primary"
                      onclick={() => {
                        updateIsActive(subItem.url);
                      }}
                    >
                      {#snippet child({ props })}
                        <a href={subItem.url} {...props}>{subItem.title}</a>
                      {/snippet}
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                {/each}
              </Sidebar.Menu>
            </Sidebar.GroupContent>
          </Collapsible.Content>
        </Sidebar.Group>
      </Collapsible.Root>
    {/each}
  </Sidebar.Content>
  <!-- <Sidebar.Footer>
    <div class="p-1">
      <SidebarOptInForm />
    </div>
  </Sidebar.Footer> -->
  <!-- <Sidebar.Rail /> -->
</Sidebar.Root>
