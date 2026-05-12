<script lang="ts">
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import PromptKitSidebar from "$lib/components/layouts/app-sidebar/prompt-kit-sidebar.svelte";
	import Toc from "$lib/components/docs/toc/toc.svelte";
	import { UseToc } from "$lib/hooks/use-toc.svelte";

	let { children } = $props();
	let toc = new UseToc();
</script>

<!-- <Sidebar.Provider>
	<PromptKitSidebar />
	<main class="w-full px-4 pb-6 md:px-6">
		{@render children?.()}
		</main>
		</Sidebar.Provider> -->

<Sidebar.Provider>
	<PromptKitSidebar />
	<!-- <AppSidebar /> -->

	<div
		class="mx-auto grid w-full max-w-7xl grid-cols-1 gap-y-10 px-4 py-6 sm:px-6 lg:pr-2 lg:pl-12 xl:grid-cols-[minmax(0,1fr)_14rem] xl:items-start xl:gap-x-14 xl:gap-y-0"
	>
		<main
			class="w-full max-w-5xl min-w-0 xl:justify-self-center 2xl:max-w-6xl"
			bind:this={toc.ref}
		>
			{@render children()}
			<!-- <DocsNavigation previous={navigation.previous} next={navigation.next} /> -->
		</main>

		<aside class="sticky top-24 hidden w-full xl:block">
			<div>
				<h2 class="mb-2 text-sm font-medium">On this page</h2>
			</div>
			<Toc toc={toc.current} />
		</aside>
	</div>
</Sidebar.Provider>
