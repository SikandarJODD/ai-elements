<script lang="ts">
	import { page } from "$app/state";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import * as Collapsible from "$lib/components/ui/collapsible/index.js";
	import Badge from "$lib/components/ui/badge/badge.svelte";
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
	import ExternalLinkIcon from "@lucide/svelte/icons/external-link";
	import { onMount, type ComponentProps } from "svelte";
	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();

	type SidebarItem = {
		title: string;
		url: string;
		isActive?: boolean;
		badge?: string;
	};

	type SidebarSection = {
		title: string;
		url: string;
		items: SidebarItem[];
	};

	let data = $state<{ navMain: SidebarSection[] }>({
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
						title: "Checkpoint",
						url: "/components/checkpoint",
						badge: "new",
					},
					{
						title: "Code Block",
						url: "/components/code",
					},
					{
						title: "Confirmation",
						url: "/components/confirmation",
						badge: "new",
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
						title: "Image",
						url: "/components/image",
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
						title: "Model Selector",
						url: "/components/model-selector",
						badge: "new",
					},
					{
						title: "Open in Chat",
						url: "/components/open-in-chat",
					},
					{
						title: "Plan",
						url: "/components/plan",
						badge: "new",
					},
					{
						title: "Prompt Input",
						url: "/components/prompt-input",
					},
					{
						title: "Queue",
						url: "/components/queue",
						badge: "new",
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
						title: "Shimmer",
						url: "/components/shimmer",
						badge: "new",
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
				title: "Workflow",
				url: "/components/workflow",
				items: [
					{
						title: "Canvas",
						url: "/components/workflow/canvas",
					},
					{
						title: "Connection",
						url: "/components/workflow/connection",
					},
					{
						title: "Controls",
						url: "/components/workflow/controls",
					},
					{
						title: "Edge",
						url: "/components/workflow/edge",
					},
					{
						title: "Node",
						url: "/components/workflow/node",
					},
					{
						title: "Panel",
						url: "/components/workflow/panel",
					},
					{
						title: "Toolbar",
						url: "/components/workflow/toolbar",
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
			item.items.forEach((subItem) => {
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

<Sidebar.Root class="mt-16 h-[calc(100vh-4rem)] pr-2 pl-6" {...restProps} bind:ref>
	<Sidebar.Content class="no-scrollbar bg-background mb-4 gap-0 pt-6">
		<!-- We create a collapsible SidebarGroup for each parent. -->
		{#each data.navMain as item (item.title)}
			<Collapsible.Root title={item.title} open class="group/collapsible">
				<Sidebar.Group class="p-0">
					<Sidebar.GroupLabel
						class="group/label text-sidebar-foreground hover:text-sidebar-accent-foreground text-sm hover:bg-transparent"
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
											class="hover:text-primary text-muted-foreground  active:text-primary hover:bg-transparent active:bg-transparent data-[active=true]:bg-transparent data-[active=true]:font-normal data-[active=true]:text-blue-500"
											onclick={() => {
												updateIsActive(subItem.url);
											}}
										>
											{#snippet child({ props })}
												<a
													href={subItem.url}
													{...props}
													class="flex w-full items-center justify-between"
												>
													<span>{subItem.title}</span>
													{#if subItem.badge}
														<Badge
															variant="secondary"
															class="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 h-4 border px-1 py-0 text-[10px] font-semibold uppercase"
														>
															{subItem.badge}
														</Badge>
													{/if}
												</a>
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
	<Sidebar.Footer class="border-border mt-0 border-t pt-0">
		<div class="flex flex-col gap-1 py-3">
			<a
				href="/ai-elements/llms.txt"
				target="_blank"
				class="text-muted-foreground hover:text-foreground group hover:bg-accent flex items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors"
			>
				<span>llms.txt</span>
				<ExternalLinkIcon
					class="size-3.5 opacity-0 transition-opacity group-hover:opacity-100"
				/>
			</a>
		</div>
	</Sidebar.Footer>
	<!-- <Sidebar.Rail /> -->
</Sidebar.Root>
