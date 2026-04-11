<script lang="ts">
	import { page } from "$app/state";
	import AiElementsPrevNext from "$lib/components/ai-elements/ai-elements-prev-next.svelte";
	import { getAIElementByHref } from "$lib/config/ai-elements-data";
	import { UseToc } from "$lib/hooks/use-toc.svelte";

	let { children } = $props();

	function normalizePath(pathname: string) {
		return pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
	}

	let currentItem = $derived(getAIElementByHref(normalizePath(page.url.pathname)));
	import Toc from "$lib/components/docs/toc/toc.svelte";
	let toc = new UseToc();
</script>

<!-- {@render children()} -->

<div
	class="mx-auto grid w-full max-w-7xl grid-cols-1 gap-y-10 px-4 py-6 sm:px-6 lg:pr-2 lg:pl-12 xl:grid-cols-[minmax(0,1fr)_15rem] xl:items-start xl:gap-x-14 xl:gap-y-0"
>
	<main class="w-full max-w-5xl min-w-0 xl:justify-self-center 2xl:max-w-6xl" bind:this={toc.ref}>
		{@render children()}
		{#if currentItem}
			<AiElementsPrevNext currentSlug={currentItem.slug} />
		{/if}
	</main>

	<aside class="sticky top-24 hidden w-full xl:block">
		<div>
			<h2 class="mb-2 text-sm font-medium">On this page</h2>
		</div>
		<Toc toc={toc.current} />
	</aside>
</div>
