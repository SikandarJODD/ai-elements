<script lang="ts">
	import { recipes } from "$lib/config/cookbook";
	import ChevronLeft from "@lucide/svelte/icons/chevron-left";
	import ChevronRight from "@lucide/svelte/icons/chevron-right";

	let { currentSlug }: { currentSlug: string } = $props();

	// Find current index
	let currentIndex = $derived(recipes.findIndex((r) => r.slug === currentSlug));

	// Get previous and next recipes
	let prevRecipe = $derived(currentIndex > 0 ? recipes[currentIndex - 1] : null);
	let nextRecipe = $derived(currentIndex < recipes.length - 1 ? recipes[currentIndex + 1] : null);
</script>

<nav class="mt-12 border-t pt-6">
	<div class="grid gap-4 sm:grid-cols-2">
		<!-- Previous -->
		{#if prevRecipe}
			<a
				href="/cookbook/{prevRecipe.slug}"
				class="group border-border bg-background hover:bg-muted/50 flex rounded-xl border px-5 py-4 transition-colors"
			>
				<div class="flex items-center gap-3">
					<ChevronLeft
						class="text-muted-foreground group-hover:text-foreground h-4 w-4 shrink-0 transition-colors"
					/>
					<div class="text-left">
						<div
							class="text-muted-foreground mb-1 text-[11px] uppercase tracking-[0.22em]"
						>
							Previous
						</div>
						<div class="text-foreground text-base font-medium leading-tight">
							{prevRecipe.name}
						</div>
					</div>
				</div>
			</a>
		{:else}
			<div class="hidden sm:block"></div>
		{/if}

		<!-- Next -->
		{#if nextRecipe}
			<a
				href="/cookbook/{nextRecipe.slug}"
				class="group border-border bg-background hover:bg-muted/50 flex rounded-xl border px-5 py-4 transition-colors sm:justify-end"
			>
				<div class="flex items-center gap-3 sm:flex-row-reverse">
					<ChevronRight
						class="text-muted-foreground group-hover:text-foreground h-4 w-4 shrink-0 transition-colors"
					/>
					<div class="text-left sm:text-right">
						<div
							class="text-muted-foreground mb-1 text-[11px] uppercase tracking-[0.22em]"
						>
							Next
						</div>
						<div class="text-foreground text-base font-medium leading-tight">
							{nextRecipe.name}
						</div>
					</div>
				</div>
			</a>
		{:else}
			<div class="hidden sm:block"></div>
		{/if}
	</div>
</nav>
