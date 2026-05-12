<script lang="ts">
	import { Badge } from "$lib/components/ui/badge";
	import { ScrollArea } from "$lib/components/ui/scroll-area";
	import {
		cookbookPlaygroundItems,
		getCookbookPlaygroundHref,
	} from "$lib/config/cookbook-playground-data";

	interface CookbookPlaygroundRailProps {
		currentSlug: string;
	}

	let { currentSlug }: CookbookPlaygroundRailProps = $props();

	let activeCount = $derived(
		cookbookPlaygroundItems.filter((item) => item.status === "active").length
	);
</script>

<div class="flex h-full min-h-0 flex-col overflow-hidden">
	<div class="border-b px-3 py-3">
		<div class="flex items-center justify-between gap-3">
			<div>
				<p class="text-foreground text-sm font-medium">Cookbook</p>
			</div>
		</div>
	</div>

	<ScrollArea
		class="min-h-0 flex-1"
		orientation="vertical"
		scrollbarYClasses="hidden"
		fade={false}
	>
		<div class="space-y-1">
			{#each cookbookPlaygroundItems as navItem (navItem.slug)}
				{#if navItem.status === "active"}
					<a
						href={getCookbookPlaygroundHref(navItem.slug)}
						aria-current={navItem.slug === currentSlug ? "page" : undefined}
						class={[
							"flex h-18 flex-col justify-center px-2.5 py-2 transition-colors",
							navItem.slug === currentSlug
								? "bg-accent text-foreground"
								: "hover:bg-muted/40",
						]}
					>
						<div class="flex items-center justify-between gap-3">
							<p class="text-sm leading-4 font-medium">{navItem.title}</p>
							<Badge variant="secondary" class="shrink-0 text-[10px]">Live</Badge>
						</div>
						<p class="text-muted-foreground mt-1 line-clamp-2 text-xs leading-4">
							{navItem.description}
						</p>
					</a>
				{:else}
					<div
						aria-disabled="true"
						class="flex h-18 flex-col justify-center px-2.5 py-2 opacity-65"
					>
						<div class="flex items-center justify-between gap-3">
							<p class="text-sm font-mono leading-4 font-normal">{navItem.title}</p>
							<Badge variant="outline" class="shrink-0 text-[10px]">Soon</Badge>
						</div>
						<p class="text-muted-foreground mt-1 line-clamp-2 text-xs leading-4">
							{navItem.description}
						</p>
					</div>
				{/if}
			{/each}
		</div>
	</ScrollArea>
</div>
