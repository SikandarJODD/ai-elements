<script lang="ts">
	import ChevronLeft from "@lucide/svelte/icons/chevron-left";
	import ChevronRight from "@lucide/svelte/icons/chevron-right";

	interface NavItem {
		name: string;
		href: string;
		description?: string;
	}

	let {
		prev = null,
		next = null,
	}: {
		prev?: NavItem | null;
		next?: NavItem | null;
	} = $props();
</script>

<nav class="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
	<!-- Previous -->
	{#if prev}
		<a
			href={prev.href}
			class="border-border hover:bg-secondary group flex flex-col gap-1 rounded-lg border p-4 transition-colors"
		>
			<div class="flex items-center gap-1">
				<ChevronLeft
					class="text-muted-foreground group-hover:text-foreground h-4 w-4 transition-colors"
				/>
				<span class="text-foreground text-sm font-medium">
					{prev.name}
				</span>
			</div>
			{#if prev.description}
				<p class="text-muted-foreground line-clamp-1 pl-5 text-sm">
					{prev.description}
				</p>
			{/if}
		</a>
	{:else}
		<div></div>
	{/if}

	<!-- Next -->
	{#if next}
		<a
			href={next.href}
			class="border-border hover:bg-secondary group flex flex-col gap-1 rounded-lg border p-4 text-right transition-colors"
		>
			<div class="flex items-center justify-end gap-1">
				<span class="text-foreground text-sm font-medium">
					{next.name}
				</span>
				<ChevronRight
					class="text-muted-foreground group-hover:text-foreground h-4 w-4 transition-colors"
				/>
			</div>
			{#if next.description}
				<p class="text-muted-foreground line-clamp-1 pr-5 text-sm">
					{next.description}
				</p>
			{/if}
		</a>
	{:else}
		<div></div>
	{/if}
</nav>
