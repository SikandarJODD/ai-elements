<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";
	import { Badge } from "$lib/components/ui/badge";
	import { recipes, getUniqueTags } from "$lib/config/cookbook-data";
	import { Input } from "$lib/components/ui/input";

	// State for filtering - multiple tag selection
	let selectedTags = $state<string[]>([]);
	let searchQuery = $state("");

	// Get unique tags
	const allTags = getUniqueTags();

	// Calculate tag counts
	const tagCounts = $derived.by(() => {
		const counts: Record<string, number> = {};
		recipes.forEach((recipe) => {
			recipe.tags.forEach((tag) => {
				counts[tag] = (counts[tag] || 0) + 1;
			});
		});
		return counts;
	});

	// Filtered recipes using $derived
	let filteredRecipes = $derived.by(() => {
		let result = recipes;

		// Filter by search query
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase();
			result = result.filter(
				(r) =>
					r.name.toLowerCase().includes(query) ||
					r.description.toLowerCase().includes(query) ||
					r.tags.some((t) => t.toLowerCase().includes(query))
			);
		}

		// Filter by selected tags (show recipes that have ANY of the selected tags)
		if (selectedTags.length > 0) {
			result = result.filter((r) => r.tags.some((tag) => selectedTags.includes(tag)));
		}

		return result;
	});

	// Group recipes by status
	let availableRecipes = $derived(filteredRecipes.filter((r) => r.status === "available"));
	let comingSoonRecipes = $derived(filteredRecipes.filter((r) => r.status === "coming-soon"));

	// Toggle tag selection (multiple selection)
	function toggleTag(tag: string) {
		if (selectedTags.includes(tag)) {
			selectedTags = selectedTags.filter((t) => t !== tag);
		} else {
			selectedTags = [...selectedTags, tag];
		}
	}
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

<div class="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
	<!-- Header -->
	<div class="mb-10">
		<!-- <h1 class="mb-8 text-3xl font-bold tracking-tight md:text-4xl">Svelte Cookbook</h1> -->
		<div class="mb-8 md:mb-8">
			<h1 class="mb-3 text-3xl font-bold tracking-tight md:text-4xl">Svelte Cookbook</h1>
			<p class="text-muted-foreground text-base md:text-lg">
				An open-source collection of recipes, guides, and templates for building AI
				applications with Svelte.
			</p>
		</div>

		<!-- Search -->
		<div class="mb-6">
			<Input
				type="text"
				class="h-10 w-full rounded-full md:max-w-md"
				placeholder="Search recipes..."
				bind:value={searchQuery}
			/>
		</div>

		<!-- Recipes Title -->
		<h2 class="mb-4 text-xl font-semibold">Recipes</h2>

		<!-- Tag Filters with Counts -->
		<div class="mb-8 flex flex-wrap gap-2">
			{#each allTags.sort((a, b) => tagCounts[b] - tagCounts[a]) as tag}
				<Badge
					variant={selectedTags.includes(tag) ? "default" : "secondary"}
					class="cursor-pointer px-3.5 py-2 text-sm capitalize transition-colors"
					onclick={() => toggleTag(tag)}
				>
					{tag}
					<span class="ml-1 font-mono text-neutral-500">
						{tagCounts[tag]}
					</span>
				</Badge>
			{/each}
		</div>
	</div>

	<!-- Available Recipes List -->
	{#if availableRecipes.length > 0}
		<section class="mb-12">
			<div class="space-y-0">
				{#each availableRecipes as recipe (recipe.slug)}
					<a
						href="/cookbook/{recipe.slug}"
						class="group flex items-center justify-between gap-6 border-b py-4 transition-colors last:border-b-0"
					>
						<div class="flex-1">
							<h3
								class="text-base font-normal group-hover:underline group-hover:underline-offset-2"
							>
								{recipe.name}
							</h3>
						</div>
						<div class="flex items-center gap-2">
							{#each recipe.tags.slice(0, 2) as tag}
								<Badge variant="secondary" class="text-xs capitalize ">
									{tag}
								</Badge>
							{/each}
							{#if recipe.tags.length > 2}
								<Badge variant="secondary" class="text-xs">
									+{recipe.tags.length - 2}
								</Badge>
							{/if}
						</div>
					</a>
				{/each}
			</div>
		</section>
	{/if}

	<!-- Coming Soon Recipes -->
	{#if comingSoonRecipes.length > 0}
		<section>
			<h2 class="mb-6 text-xl font-semibold">Coming Soon</h2>
			<div class="space-y-0">
				{#each comingSoonRecipes as recipe (recipe.slug)}
					<div
						class="text-muted-foreground flex items-center justify-between gap-6 border-b py-4 opacity-50 last:border-b-0"
					>
						<div class="flex-1">
							<h3 class="text-base font-normal">
								{recipe.name}
							</h3>
						</div>
						<div class="flex items-center gap-2">
							{#each recipe.tags.slice(0, 2) as tag}
								<Badge variant="secondary" class="text-xs capitalize">
									{tag}
								</Badge>
							{/each}
							{#if recipe.tags.length > 2}
								<Badge variant="secondary" class="text-xs">
									+{recipe.tags.length - 2}
								</Badge>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</section>
	{/if}

	<!-- No Results -->
	{#if filteredRecipes.length === 0}
		<div class="py-12 text-center">
			<p class="text-muted-foreground text-lg">No recipes found matching your search.</p>
		</div>
	{/if}
</div>
