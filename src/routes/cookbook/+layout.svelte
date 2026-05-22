<script lang="ts">
	import { page } from "$app/state";
	import { CookbookSidebar } from "$lib/components/docs/layout/all-sidebar";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	// import ApiKeyCard from "$lib/components/cookbook/api-key-card.svelte";

	let { children } = $props();

	// Only show sidebar on recipe pages, not on /cookbook index
	let showSidebar = $derived(page.url.pathname !== "/cookbook");
</script>

{#if showSidebar}
	<Sidebar.Provider>
		<CookbookSidebar />
		<main class="w-full md:max-w-5xl md:mx-auto px-4 pb-6 md:px-6">
			{@render children?.()}
		</main>
		<!-- <ApiKeyCard /> -->
	</Sidebar.Provider>
{:else}
	{@render children?.()}
{/if}
