<script lang="ts">
	import { AppSidebar } from "$lib/components/docs/layout/all-sidebar";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";

	let { children } = $props();
</script>

<Sidebar.Provider>
	<AppSidebar />
	<main class="w-full px-0 pb-6 md:px-6">
		{@render children?.()}
	</main>
</Sidebar.Provider>
