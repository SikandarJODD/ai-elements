<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";
	import { recipes } from "$lib/config/cookbook";
	import { FullWidthDivider } from "$lib/components/ui/full-width-divider";
</script>

<MetaTags
	title="Cookbook - Svelte AI Elements"
	description="An open-source collection of recipes, guides, and templates for building AI applications with Svelte."
	openGraph={{
		title: "Cookbook - Svelte AI Elements",
		description:
			"An open-source collection of recipes, guides, and templates for building AI applications with Svelte.",
		type: "website",
		url: "https://svelte-ai-elements.vercel.app/cookbook",
		images: [
			{
				url: "https://svelte-ai-elements.vercel.app/assets/svelte-ai-elements.png",
				width: 1200,
				height: 630,
				alt: "Svelte AI Elements Cookbook",
				type: "image/png",
			},
		],
	}}
/>

<div class="mx-auto max-w-6xl px-4 py-8 md:border-x md:px-0 md:py-12">
	<div class="mb-10 md:px-6">
		<h1 class="mb-3 text-3xl font-bold tracking-tight md:text-4xl">Svelte Cookbook</h1>
		<p class="text-muted-foreground text-base md:text-lg">
			An open-source collection of recipes, guides, and templates for building AI applications
			with Svelte.
		</p>
	</div>
	<FullWidthDivider contained />

	<section>
		{#each recipes as recipe (recipe.slug)}
			<a
				href="/cookbook/{recipe.slug}"
				class="hover:bg-accent/30 flex items-center justify-between border-b px-6 py-6 transition-colors duration-200 last:border-none hover:cursor-pointer"
			>
				<div class="group w-full">
					<div class="relative flex items-center justify-center gap-4">
						<h3
							class="text-foreground text-lg font-medium whitespace-nowrap md:text-xl"
						>
							{recipe.name}
						</h3>
						<span class="w-full border-b-2 border-dashed"></span>
					</div>

					<div class="mt-2 flex items-center justify-between gap-4">
						<p class="text-muted-foreground max-w-2xl text-sm leading-6 md:text-base">
							{recipe.description}
						</p>
						<!-- <div class="flex flex-wrap gap-2 md:justify-end">
							{#each recipe.tags as tag (`${recipe.slug}-${tag}`)}
								<Badge variant="secondary" class="text-xs capitalize">
									{tag}
								</Badge>
							{/each}
						</div> -->
					</div>
				</div>
			</a>
		{/each}
	</section>
	<FullWidthDivider contained />
</div>
