<script lang="ts">
	import { FullWidthDivider } from "$lib/components/ui/full-width-divider";
	import { GridFiller } from "$lib/components/ui/grid-filler";
	import type { Guide } from "$lib/config/guides";
	import BlogCard from "./blog-card.svelte";

	type Props = Guide[];
	let { blogs }: { blogs: Guide[] } = $props();
</script>

<!-- <div class="relative"> -->
<div class="mx-auto w-full max-w-5xl pt-4 lg:border-x">
	<div class="space-y-2 px-4 py-8 md:py-12">
		<h1 class="text-2xl font-semibold tracking-wide md:text-4xl">Latest Blogs</h1>
		<p class="text-muted-foreground text-sm">
			Discover the latest trends and insights in the world of design and technology.
		</p>
	</div>
	<FullWidthDivider contained />
	<!-- <div class="absolute inset-0 top-45 -left-6 h-px w-[104%] bg-neutral-50"></div> -->
	<div class="bg-border grid grid-cols-1 gap-px sm:grid-cols-2 md:grid-cols-3">
		{#each blogs as blog (blog.title)}
			<BlogCard {...blog} />
		{/each}
		<GridFiller
			class="bg-background"
			mdColumns={3}
			smColumns={4}
			lgColumns={3}
			totalItems={blogs.length}
		/>
	</div>
	<FullWidthDivider contained />
</div>
<!-- </div> -->
