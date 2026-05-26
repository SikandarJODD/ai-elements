<script lang="ts">
	import { page } from "$app/state";
	import ContributeCard from "$lib/components/docs/base/main/contribute-card.svelte";
	import SupportWork from "$lib/components/docs/base/main/support-work.svelte";
	import Toc from "$lib/components/docs/base/toc/toc.svelte";
	import { CookbookSidebar } from "$lib/components/docs/layout/all-sidebar";
	import { UseToc } from "$lib/hooks/use-toc.svelte";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";

	let { children } = $props();
	let toc = new UseToc();

	// Only show sidebar on recipe pages, not on /cookbook index
	let showSidebar = $derived(page.url.pathname !== "/cookbook");
</script>

{#if showSidebar}
	<Sidebar.Provider>
		<CookbookSidebar />
		<div
			class="grid w-full grid-cols-1 gap-x-8 px-1 py-0 sm:px-4 md:grid-cols-6 lg:grid-cols-8 lg:gap-x-8 lg:pr-3 lg:pl-4 xl:grid-cols-8 xl:pl-6"
		>
			<main class="min-w-0 md:col-span-6 lg:col-span-6 xl:col-span-6" bind:this={toc.ref}>
				{@render children?.()}
			</main>

			<aside class="hidden w-full shrink-0 lg:col-span-2 lg:block xl:col-span-2">
				<div class="sticky top-21">
					<div class="flex h-[calc(100vh-7rem)] min-h-0 flex-col">
						<div>
							<h2 class="mb-2 text-sm font-medium">On this page</h2>
						</div>
						<div class="min-h-0 flex-1 overflow-y-auto pr-2">
							<Toc toc={toc.current} />
							<ContributeCard class="mt-6" />
						</div>
						<div>
							<SupportWork />
						</div>
					</div>
				</div>
			</aside>
		</div>
	</Sidebar.Provider>
{:else}
	{@render children?.()}
{/if}
