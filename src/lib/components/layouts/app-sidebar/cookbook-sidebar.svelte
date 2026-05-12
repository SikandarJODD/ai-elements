<script lang="ts">
	import { page } from "$app/state";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import ExternalLinkIcon from "@lucide/svelte/icons/external-link";
	import { recipes } from "$lib/config/cookbook-data";
	import { type ComponentProps } from "svelte";

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();

	// Reactive current path - updates automatically on navigation
	let currentPath = $derived(page.url.pathname);

	function isActive(slug: string): boolean {
		return currentPath === `/cookbook/${slug}`;
	}
</script>

<Sidebar.Root class="mt-16 h-[calc(100vh-4rem)] pr-2 pl-6" {...restProps} bind:ref>
	<Sidebar.Content class="no-scrollbar bg-background gap-0 pt-6">
		<Sidebar.Group class="p-0">
			<Sidebar.GroupLabel class="text-sidebar-foreground text-sm">Recipes</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu class="gap-0.5">
					{#each recipes as recipe (recipe.slug)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton
								isActive={isActive(recipe.slug)}
								class="hover:text-primary text-muted-foreground active:text-primary hover:bg-transparent active:bg-transparent data-[active=true]:bg-transparent data-[active=true]:font-normal data-[active=true]:text-blue-500"
							>
								{#snippet child({ props })}
									<a href="/cookbook/{recipe.slug}" {...props}>
										{recipe.name}
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>

	<Sidebar.Footer class="border-border mt-0 border-t pt-0">
		<div class="flex flex-col gap-1 py-3">
			<a
				href="/cookbook/llms.txt"
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
</Sidebar.Root>
