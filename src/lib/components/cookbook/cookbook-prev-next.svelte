<script lang="ts">
	import { recipes } from "$lib/config/cookbook-data";
	import ChevronLeft from "@lucide/svelte/icons/chevron-left";
	import ChevronRight from "@lucide/svelte/icons/chevron-right";

	let { currentSlug }: { currentSlug: string } = $props();

	// Get only available recipes for navigation
	let availableRecipes = recipes.filter((r) => r.status === "available");

	// Find current index
	let currentIndex = $derived(availableRecipes.findIndex((r) => r.slug === currentSlug));

	// Get previous and next recipes
	let prevRecipe = $derived(currentIndex > 0 ? availableRecipes[currentIndex - 1] : null);
	let nextRecipe = $derived(
		currentIndex < availableRecipes.length - 1 ? availableRecipes[currentIndex + 1] : null
	);
</script>

<nav class="mt-12 border-t pt-6">
	<div class="flex items-center justify-between">
		<!-- Previous -->
		{#if prevRecipe}
			<a
				href="/cookbook/{prevRecipe.slug}"
				class="group flex items-center gap-2 text-sm transition-colors"
			>
				<ChevronLeft
					class="text-muted-foreground group-hover:text-foreground h-4 w-4 transition-colors"
				/>
				<div class="text-left">
					<div class="text-muted-foreground text-xs">Previous</div>
					<div class="text-foreground group-hover:text-primary font-medium">
						{prevRecipe.name}
					</div>
				</div>
			</a>
		{:else}
			<div></div>
		{/if}

		<!-- Next -->
		{#if nextRecipe}
			<a
				href="/cookbook/{nextRecipe.slug}"
				class="group flex items-center gap-2 text-sm transition-colors"
			>
				<div class="text-right">
					<div class="text-muted-foreground text-xs">Next</div>
					<div class="text-foreground group-hover:text-primary font-medium">
						{nextRecipe.name}
					</div>
				</div>
				<ChevronRight
					class="text-muted-foreground group-hover:text-foreground h-4 w-4 transition-colors"
				/>
			</a>
		{:else}
			<div></div>
		{/if}
	</div>
</nav>
