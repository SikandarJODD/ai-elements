<script lang="ts">
	import { page } from "$app/state";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import CookbookSidebar from "$lib/components/app-sidebar/cookbook-sidebar.svelte";
	import ApiKeyCard from "$lib/components/cookbook/api-key-card.svelte";

	let { children } = $props();

	// Only show sidebar on recipe pages, not on /cookbook index
	let showSidebar = $derived(page.url.pathname !== "/cookbook");
</script>

{#if showSidebar}
	<Sidebar.Provider>
		<CookbookSidebar />
		<main class="w-full px-4 pb-6 md:px-6">
			{@render children?.()}
		</main>
		<ApiKeyCard />
	</Sidebar.Provider>
{:else}
	{@render children?.()}
{/if}
