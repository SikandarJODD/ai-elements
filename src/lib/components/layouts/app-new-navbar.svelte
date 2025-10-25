<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Icons from "$lib/components/icons";

  import BookOpenIcon from "@lucide/svelte/icons/book-open";
  import BoxIcon from "@lucide/svelte/icons/box";
  import SparklesIcon from "@lucide/svelte/icons/sparkles";
  import FileTextIcon from "@lucide/svelte/icons/file-text";
  import HomeIcon from "@lucide/svelte/icons/home";
  import type { Component } from "svelte";
  // import { Logo } from '$lib/components/_extras/navbars';
  import {
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuRoot,
    NavigationMenuTrigger,
  } from "$lib/components/ui/navigation-menu";
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "$lib/components/ui/popover";
  import { cn } from "$lib/utils/utils";
  import AppSearchbar from "./app-searchbar.svelte";
  import LightSwitch from "../ui/light-switch/light-switch.svelte";
  import McpDialog from "./mcp-dialog.svelte";

  type MobileNavigationItem = {
    label: string;
    href?: string;
    icon?: Component;
    description?: string;
    submenu?: boolean;
    type?: "simple" | "description" | "icon";
    items?: {
      href: string;
      label: string;
      icon?: Component;
      description?: string;
    }[];
  };

  // Mobile navigation with organized sections
  let mobileNavigationLinks: MobileNavigationItem[] = [
    { href: "/", label: "Home", icon: HomeIcon },
    { href: "/docs/introduction", label: "Documentation", icon: BookOpenIcon },
    { href: "/guides", label: "Guides", icon: FileTextIcon },
    {
      label: "AI Elements",
      submenu: true,
      type: "description",
      items: [
        {
          description: "Prompt input field",
          href: "/components/prompt-input",
          label: "Prompt Input",
        },
        {
          description: "Interactive actions within AI responses",
          href: "/components/actions",
          label: "Action",
        },
        {
          description: "AI-generated artifacts and content",
          href: "/components/artifact",
          label: "Artifact",
        },
        {
          description: "Display code with syntax highlighting",
          href: "/components/code",
          label: "Code",
        },
        {
          description: "Complete conversation interfaces",
          href: "/components/conversation",
          label: "Conversation",
        },
        {
          description: "Display AI-generated images",
          href: "/components/image",
          label: "Image",
        },
        {
          description: "Individual chat messages",
          href: "/components/message",
          label: "Message",
        },
        {
          description: "AI reasoning and thought process",
          href: "/components/reasoning",
          label: "Reasoning",
        },
        {
          description: "Source references and citations",
          href: "/components/sources",
          label: "Sources",
        },
        {
          description: "Display tool usage and results",
          href: "/components/tool",
          label: "Tool",
        },
        {
          description: "Panel for grouping content",
          href: "/components/panel",
          label: "Panel",
        },
        {
          description: "Inline citation for sources",
          href: "/components/inline-citation",
          label: "Inline Citation",
        },
        {
          description: "Loader for async operations",
          href: "/components/loader",
          label: "Loader",
        },
        {
          description: "Open in chat button",
          href: "/components/open-in-chat",
          label: "Open In Chat",
        },
        {
          description: "Toolbar for actions",
          href: "/components/toolbar",
          label: "Toolbar",
        },
        {
          description: "Copy button for content",
          href: "/components/copy-button",
          label: "Copy Button",
        },
        {
          description: "Task display component",
          href: "/components/task",
          label: "Task",
        },
        {
          description: "Web preview display",
          href: "/components/web-preview",
          label: "Web Preview",
        },
        {
          description: "Edge for graph visualizations",
          href: "/components/edge",
          label: "Edge",
        },
        {
          description: "Node for graph visualizations",
          href: "/components/node",
          label: "Node",
        },
        {
          description: "Canvas for drawing",
          href: "/components/canvas",
          label: "Canvas",
        },
        {
          description: "Context display",
          href: "/components/context",
          label: "Context",
        },
        {
          description: "Connection visualization",
          href: "/components/connection",
          label: "Connection",
        },
        {
          description: "Controls for UI",
          href: "/components/controls",
          label: "Controls",
        },
      ],
    },
    {
      label: "Prompt Kit",
      submenu: true,
      type: "description",
      items: [
        {
          description: "Input component for AI prompts",
          href: "/prompt-kit/prompt-input",
          label: "Prompt Input",
        },
        {
          description: "Chat container with message handling",
          href: "/prompt-kit/chat-container",
          label: "Chat Container",
        },
        {
          description: "Styled code blocks with copy button",
          href: "/prompt-kit/code-block",
          label: "Code Block",
        },
        {
          description: "File upload with preview",
          href: "/prompt-kit/file-upload",
          label: "File Upload",
        },
        {
          description: "Image display with zoom",
          href: "/prompt-kit/image",
          label: "Image",
        },
        {
          description: "Loading states and animations",
          href: "/prompt-kit/loader",
          label: "Loader",
        },
        {
          description: "Markdown renderer with syntax highlighting",
          href: "/prompt-kit/markdown",
          label: "Markdown",
        },
        {
          description: "Chat message component",
          href: "/prompt-kit/message",
          label: "Message",
        },

        {
          description: "Prompt suggestions and quick actions",
          href: "/prompt-kit/prompt-suggestion",
          label: "Prompt Suggestion",
        },
        {
          description: "Reasoning display component",
          href: "/prompt-kit/reasoning",
          label: "Reasoning",
        },
        {
          description: "Source citations component",
          href: "/prompt-kit/source",
          label: "Source",
        },
        {
          description: "Multi-step process indicator",
          href: "/prompt-kit/steps",
          label: "Steps",
        },
        {
          description: "System message display",
          href: "/prompt-kit/system-message",
          label: "System Message",
        },
        {
          description: "Tool usage and execution display",
          href: "/prompt-kit/tool",
          label: "Tool",
        },
      ],
    },
  ];

  // desktop links
  type NavigationLink = {
    active: boolean;
    href: string;
    label: string;
  };
  // Navigation links array to be used in both desktop and mobile menus
  let desktopLinks: NavigationLink[] = $state([
    { href: "/", label: "Home", active: true },
    // { href: "/docs/introduction", label: "Docs", active: false },
    { href: "/components/actions", label: "AI Elements", active: false },
    { href: "/prompt-kit/prompt-input", label: "Prompt Kit", active: false },
    { href: "/guides", label: "Guides", active: false },
  ]);
</script>

<header
  class="border-b fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-4 md:px-6"
>
  <div class="flex h-16 items-center justify-between gap-4">
    <!-- Left side  -->
    <div class="flex items-center gap-2">
      <!-- Mobile menu trigger  -->
      <Popover>
        <PopoverTrigger class="md:hidden">
          {#snippet child({ props })}
            <Button
              class="group size-8 md:hidden"
              variant="ghost"
              size="icon"
              {...props}
            >
              <svg
                class="pointer-events-none"
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 12L20 12"
                  class="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-315"
                />
                <path
                  d="M4 12H20"
                  class="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,0.25,1.8)] group-aria-expanded:rotate-45"
                />
                <path
                  d="M4 12H20"
                  class="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-135"
                />
              </svg>
            </Button>
          {/snippet}
        </PopoverTrigger>
        <PopoverContent
          align="start"
          class="z-50 w-72 p-0 md:hidden max-h-[calc(100vh-10rem)] overflow-y-auto dark-scrollbar"
        >
          <div class="p-2">
            <NavigationMenuRoot class="max-w-none *:w-full">
              <NavigationMenuList class="flex-col items-start gap-0">
                {#each mobileNavigationLinks as link, index (link.label)}
                  <NavigationMenuItem class="w-full">
                    {#if link.submenu}
                      <div
                        class="text-muted-foreground px-3 py-2 text-xs font-semibold uppercase tracking-wide"
                      >
                        {link.label}
                      </div>
                      {#if link.items}
                        <ul class="space-y-0.5 pb-2">
                          {#each link.items as item}
                            <li>
                              <NavigationMenuLink
                                href={item.href}
                                class="hover:bg-accent hover:text-accent-foreground flex flex-col gap-0.5 rounded-md px-3 py-2 text-sm transition-colors"
                              >
                                <span class="font-medium">{item.label}</span>
                                {#if item.description}
                                  <span
                                    class="text-muted-foreground text-xs line-clamp-1"
                                  >
                                    {item.description}
                                  </span>
                                {/if}
                              </NavigationMenuLink>
                            </li>
                          {/each}
                        </ul>
                      {/if}
                    {:else}
                      <a
                        href={link.href || "#"}
                        class="hover:bg-accent hover:text-accent-foreground flex flex-row items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors w-full"
                      >
                        {#if link.icon}
                          <!-- <svelte:component this={link.icon} class="size-4 shrink-0" /> -->
                          {@const NavIcon = link.icon}
                          <NavIcon class="size-4 shrink-0" strokeWidth={1.4} />
                        {/if}
                        <span>{link.label}</span>
                      </a>
                    {/if}

                    <!-- Add separator between sections -->
                    {#if index < mobileNavigationLinks.length - 1}
                      <div
                        role="separator"
                        aria-orientation="horizontal"
                        class="bg-border my-2 h-px w-full"
                      ></div>
                    {/if}
                  </NavigationMenuItem>
                {/each}
              </NavigationMenuList>
            </NavigationMenuRoot>
          </div>
        </PopoverContent>
      </Popover>
      <!-- Main nav  -->
      <div class="flex items-center gap-6">
        <a href="/" class="text-primary hover:text-primary/90">
          Svelte AI Elements
        </a>
        <!-- Navigation menu  -->
        <NavigationMenuRoot class="max-md:hidden">
          <NavigationMenuList class="gap-2">
            {#each desktopLinks as link (link.label)}
              <NavigationMenuItem>
                <NavigationMenuLink
                  active={link.active}
                  href={link.href}
                  class="text-muted-foreground active:bg-transparent hover:text-primary bg-none hover:bg-transparent py-1.5 font-medium"
                >
                  {link.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            {/each}
          </NavigationMenuList>
        </NavigationMenuRoot>
      </div>
    </div>
    <!-- Right side  -->
    <div class="flex items-center gap-2 md:gap-2">
      <!-- Search Bar -->
      <div class="hidden md:block">
        <McpDialog />
        <AppSearchbar />
      </div>
      <Button
        variant="ghost"
        size="icon"
        href="https://github.com/SikandarJODD/ai-elements"
        target="_blank"
      >
        <Icons.GitHub class="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        href="https://x.com/Sikandar_Bhide"
        target="_blank"
        class="hidden md:inline-flex"
      >
        <Icons.Twitter class="size-4" />
      </Button>
      <LightSwitch variant="ghost" />
    </div>
  </div>
</header>
