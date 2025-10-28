<script lang="ts">
	import { goto } from "$app/navigation";
	import SearchIcon from "@lucide/svelte/icons/search";
	import FileIcon from "@lucide/svelte/icons/file";
	import BookOpenIcon from "@lucide/svelte/icons/book-open";
	import CodeIcon from "@lucide/svelte/icons/code";
	import BoxIcon from "@lucide/svelte/icons/box";
	import { watch } from "runed";
	import * as Command from "$lib/components/ui/command/index.js";
	import { searchNavigation, getNavigationGroups } from "$lib/config/navigation-data";
	import type { NavigationItem } from "$lib/config/navigation-data";

	let open = $state(false);
	let searchQuery = $state("");
	let searchResults: NavigationItem[] = $state([]);

	// Get grouped navigation data
	const navigationGroups = getNavigationGroups();

	function handleKeydown(e: KeyboardEvent) {
		// Cmd+K or Ctrl+K to open search
		if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			open = !open;
		}
		// Escape to close
		if (e.key === "Escape") {
			open = false;
		}
	}

	function handleSearch(value: string) {
		if (value.trim()) {
			searchResults = searchNavigation(value);
		} else {
			searchResults = [];
		}
	}

	// Watch for search query changes
	watch(
		() => searchQuery,
		(query) => {
			handleSearch(query);
		}
	);

	// Watch for when dialog opens to show initial suggestions
	watch(
		() => ({ query: searchQuery, isOpen: open }),
		({ query, isOpen }) => {
			if (!query.trim() && isOpen) {
				// Show docs, AI Elements, and Prompt Kit when search is empty
				searchResults = [...navigationGroups.docs, ...navigationGroups.components];
			}
		}
	);

	function handleSelect(href: string) {
		open = false;
		goto(href);
		// Reset search after navigation
		setTimeout(() => {
			searchQuery = "";
			searchResults = [];
		}, 100);
	}

	function getCategoryIcon(category: string) {
		switch (category) {
			case "component":
				return BoxIcon;
			case "guide":
				return CodeIcon;
			case "docs":
				return BookOpenIcon;
			default:
				return FileIcon;
		}
	}
</script>

<svelte:document onkeydown={handleKeydown} />

<!-- Search Button -->
<button
	onclick={() => (open = true)}
	class="bg-muted/50 hover:bg-muted inline-flex h-9 w-full items-center justify-between gap-2 rounded-md px-3 text-sm transition-colors md:w-72"
	type="button"
>
	<div class="flex items-center gap-2">
		<SearchIcon class="text-muted-foreground size-4" />
		<span class="text-muted-foreground">Search documentation...</span>
	</div>
	<div class="flex items-center gap-1">
		<kbd
			class="bg-background text-muted-foreground pointer-events-none hidden h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none sm:inline-flex"
		>
			Ctrl
		</kbd>
		<kbd
			class="bg-background text-muted-foreground pointer-events-none hidden h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none sm:inline-flex"
		>
			K
		</kbd>
	</div>
</button>

<!-- Search Dialog -->
<Command.Dialog bind:open>
	<Command.Input
		placeholder="Search components, examples, and docs..."
		bind:value={searchQuery}
	/>
	<Command.List>
		<Command.Empty>No results found.</Command.Empty>

		{#if searchQuery.trim()}
			<!-- Search Results -->
			{#if searchResults.length > 0}
				<Command.Group heading="Results">
					{#each searchResults as item (item.href)}
						{@const Icon = getCategoryIcon(item.category)}
						<Command.Item value={item.title} onSelect={() => handleSelect(item.href)}>
							<Icon class="mr-2 size-4" strokeWidth={1.6} />
							<div class="flex flex-col">
								<span>{item.title}</span>
								{#if item.description}
									<span class="text-muted-foreground text-xs"
										>{item.description}</span
									>
								{/if}
							</div>
						</Command.Item>
					{/each}
				</Command.Group>
			{/if}
		{:else}
			<!-- Default Suggestions when no search query -->
			<Command.Group heading="Getting Started">
				{#each navigationGroups.docs as item (item.href)}
					{@const Icon = getCategoryIcon(item.category)}
					<Command.Item value={item.title} onSelect={() => handleSelect(item.href)}>
						<Icon class="mr-2 size-4" strokeWidth={1.2} />
						<div class="flex flex-col">
							<span>{item.title}</span>
							{#if item.description}
								<span class="text-muted-foreground text-xs">{item.description}</span
								>
							{/if}
						</div>
					</Command.Item>
				{/each}
			</Command.Group>

			<Command.Separator />

			<Command.Group heading="AI Elements">
				{#each navigationGroups.components.filter((item) => !item.title.startsWith("Prompt Kit")) as item (item.href)}
					{@const Icon = getCategoryIcon(item.category)}
					<Command.Item value={item.title} onSelect={() => handleSelect(item.href)}>
						<Icon class="mr-2 size-4" strokeWidth={1.2} />
						<div class="flex flex-col">
							<span>{item.title}</span>
							{#if item.description}
								<span class="text-muted-foreground text-xs">{item.description}</span
								>
							{/if}
						</div>
					</Command.Item>
				{/each}
			</Command.Group>

			<Command.Separator />

			<Command.Group heading="Prompt Kit">
				{#each navigationGroups.components.filter( (item) => item.title.startsWith("Prompt Kit") ) as item (item.href)}
					{@const Icon = getCategoryIcon(item.category)}
					<Command.Item value={item.title} onSelect={() => handleSelect(item.href)}>
						<Icon class="mr-2 size-4" strokeWidth={1.2} />
						<div class="flex flex-col">
							<span>{item.title.replace("Prompt Kit - ", "")}</span>
							{#if item.description}
								<span class="text-muted-foreground text-xs">{item.description}</span
								>
							{/if}
						</div>
					</Command.Item>
				{/each}
			</Command.Group>

			<Command.Separator />

			<Command.Group heading="Guides">
				{#each navigationGroups.guides.slice(0, 4) as item (item.href)}
					{@const Icon = getCategoryIcon(item.category)}
					<Command.Item value={item.title} onSelect={() => handleSelect(item.href)}>
						<Icon class="mr-2 size-4" strokeWidth={1.2} />
						<div class="flex flex-col gap-1">
							<span>{item.title}</span>
							{#if item.description}
								<span class="text-muted-foreground text-xs">{item.description}</span
								>
							{/if}
						</div>
					</Command.Item>
				{/each}
			</Command.Group>
		{/if}
	</Command.List>
</Command.Dialog>
