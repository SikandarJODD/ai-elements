<script lang="ts">
	import { page } from "$app/state";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import * as Collapsible from "$lib/components/ui/collapsible/index.js";
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
	import ExternalLinkIcon from "@lucide/svelte/icons/external-link";
	import { onMount, type ComponentProps } from "svelte";
	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();

	let data = $state({
		navMain: [
			{
				title: "Getting Started",
				url: "#",
				items: [
					{
						title: "Introduction",
						url: "/prompt-kit",
					},
					{
						title: "Installation",
						url: "/prompt-kit/installation",
					},
					{
						title: "Primitives",
						url: "/prompt-kit/primitives",
						badge: "new",
					},
					{
						title: "Blocks",
						url: "/prompt-kit/blocks",
						badge: "new",
					},
				],
			},
			{
				title: "Components",
				url: "/prompt-kit",
				items: [
					{
						title: "Chain of Thought",
						url: "/prompt-kit/chain-of-thought",
						badge: "new",
					},
					{
						title: "Chat Container",
						url: "/prompt-kit/chat-container",
						isActive: true,
					},
					{
						title: "Code Block",
						url: "/prompt-kit/code-block",
					},
					{
						title: "Feedback Bar",
						url: "/prompt-kit/feedback-bar",
						badge: "new",
					},
					{
						title: "File Upload",
						url: "/prompt-kit/file-upload",
					},
					{
						title: "Image",
						url: "/prompt-kit/image",
					},
					{
						title: "Loader",
						url: "/prompt-kit/loader",
					},
					{
						title: "Markdown",
						url: "/prompt-kit/markdown",
					},
					{
						title: "Message",
						url: "/prompt-kit/message",
					},
					{
						title: "Prompt Input",
						url: "/prompt-kit/prompt-input",
					},
					{
						title: "Prompt Suggestion",
						url: "/prompt-kit/prompt-suggestion",
					},
					{
						title: "Reasoning",
						url: "/prompt-kit/reasoning",
					},
					{
						title: "Scroll Button",
						url: "/prompt-kit/scroll-button",
					},
					{
						title: "Source",
						url: "/prompt-kit/source",
					},
					{
						title: "Steps",
						url: "/prompt-kit/steps",
					},
					{
						title: "System Message",
						url: "/prompt-kit/system-message",
					},
					{
						title: "Text Shimmer",
						url: "/prompt-kit/text-shimmer",
						badge: "new",
					},
					{
						title: "Thinking Bar",
						url: "/prompt-kit/thinking-bar",
						badge: "new",
					},
					{
						title: "Tool",
						url: "/prompt-kit/tool",
					},
				],
			},
		],
	});

	let updateIsActive = (url: string) => {
		data.navMain.forEach((item) => {
			item.items?.forEach((subItem: any) => {
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
	<Sidebar.Content class="no-scrollbar bg-background gap-0 pt-6">
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
									{@const itemWithBadge = subItem as any}
									<Sidebar.MenuItem>
										<Sidebar.MenuButton
											isActive={itemWithBadge.isActive}
											class="hover:text-primary text-muted-foreground  active:text-primary hover:bg-transparent active:bg-transparent data-[active=true]:bg-transparent data-[active=true]:font-normal data-[active=true]:text-blue-500"
											onclick={() => {
												updateIsActive(itemWithBadge.url);
											}}
										>
											{#snippet child({ props })}
												<a href={itemWithBadge.url} {...props}
													>{itemWithBadge.title}</a
												>
											{/snippet}
										</Sidebar.MenuButton>
										{#if itemWithBadge.badge}
											<Sidebar.MenuBadge
												class="text-muted-foreground border-border rounded-md border text-[10px]"
											>
												{itemWithBadge.badge}
											</Sidebar.MenuBadge>
										{/if}
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
				href="/prompt-kit/llms.txt"
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
