<script lang="ts">
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import PromptKitSidebar from "$lib/components/ui/sidebar/prompt-kit-sidebar.svelte";

	let { children } = $props();
</script>

<Sidebar.Provider>
	<PromptKitSidebar />
	<main class="w-full px-4 pb-6 md:px-6">
		{@render children?.()}
	</main>
</Sidebar.Provider>
