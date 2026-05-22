<script lang="ts" module>
	import {
		blockPages,
		components,
		docsPages,
		primitivePages,
		type BadgeType
	} from "$lib/registry/components";

	type NavItem = {
		title: string;
		url: string;
		badge?: BadgeType;
	};

	// Build navigation from registry
	const data = {
		navMain: [
			{
				title: "Getting Started",
				url: "#",
				items: docsPages.map((page) => ({
					title: page.name,
					url: page.href
				})) as NavItem[]
			},
			{
				title: "Primitives",
				url: "#",
				items: primitivePages.map((page) => ({
					title: page.name,
					url: page.href
				})) as NavItem[]
			},
			{
				title: "Blocks",
				url: "#",
				items: blockPages.map((page) => ({
					title: page.name,
					url: page.href
				})) as NavItem[]
			},
			{
				title: "Components",
				url: "#",
				items: components.map((c) => ({
					title: c.name,
					url: c.href,
					badge: c.badge
				})) as NavItem[]
			}
		]
	};
</script>

<script lang="ts">
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import { ScrollFadeEffect } from "$lib/components/ui/scroll-area/index.js";
	import Badge from "$lib/components/ui/spell/badge/badge.svelte";
	import { page } from "$app/state";
	import type { ComponentProps } from "svelte";
	import { watch } from "runed";

	let {
		ref = $bindable(null),
		...restProps
	}: ComponentProps<typeof Sidebar.Root> = $props();
	let contentRef = $state<HTMLElement | null>(null);
	let pathname = $derived(page.url.pathname);

	watch(
		() => pathname,
		() => {
			let activeItem = contentRef?.querySelector<HTMLElement>(
				'[data-sidebar="menu-button"][data-active="true"]'
			);

			activeItem?.scrollIntoView({
				block: "nearest",
				inline: "nearest",
				behavior: "smooth"
			});
		}
	);
</script>

<Sidebar.Root class="bg-background pt-14" {...restProps} bind:ref>
	<Sidebar.Content bind:ref={contentRef}>
		<ScrollFadeEffect class="max-h-[calc(100vh-6rem)] py-4 pr-1">
			<!-- We create a Sidebar.Group for each parent. -->
			{#each data.navMain as group (group.title)}
				<Sidebar.Group>
					<Sidebar.GroupLabel>{group.title}</Sidebar.GroupLabel>
					<Sidebar.GroupContent>
						<Sidebar.Menu>
							{#each group.items as item (item.url)}
								<Sidebar.MenuItem>
									<Sidebar.MenuButton
										isActive={page.url.pathname ===
											item.url}
										class="scroll-mt-10 scroll-mb-40"
									>
										{#snippet child({ props })}
											<a href={item.url} {...props}>
												{item.title}
												{#if item.badge}
													<Badge
														variant={item.badge ===
														"New"
															? "emerald"
															: item.badge ===
																  "Updated"
																? "cyan"
																: "yellow"}
														size="sm"
													>
														{item.badge}
													</Badge>
												{/if}
											</a>
										{/snippet}
									</Sidebar.MenuButton>
								</Sidebar.MenuItem>
							{/each}
						</Sidebar.Menu>
					</Sidebar.GroupContent>
				</Sidebar.Group>
			{/each}
		</ScrollFadeEffect>
	</Sidebar.Content>
	<!-- <Sidebar.Footer>
		<SupportWork />
	</Sidebar.Footer> -->
</Sidebar.Root>
