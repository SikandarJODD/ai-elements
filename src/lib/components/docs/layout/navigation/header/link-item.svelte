<script lang="ts">
	import { cn } from "$lib/utils";
	import type { HTMLAttributes } from "svelte/elements";
	import type { LinkItemType } from "./types";
	import type { Component } from "svelte";
	import type { LucideIcon } from "@lucide/svelte";

	type Props = LinkItemType & HTMLAttributes<HTMLAnchorElement>;
	let { name, description, icon, href, class: className, ...props }: Props = $props();

	// i have added Svelte Component, Lucide Icon so you can have custom-icon.svelte and lucide icon both
	let IconComponent: Component | LucideIcon | null = $derived(icon || null);
</script>

<a class={cn("flex items-center gap-x-2", className)} {href} {...props}>
	{#if typeof IconComponent !== null}
		<div
			class={cn(
				"flex aspect-square size-9 items-center justify-center rounded-lg border bg-card shadow-xs outline outline-offset-2 outline-border/60 [&_svg]:size-4 [&_svg]:text-foreground"
			)}
		>
			<IconComponent />
		</div>
	{/if}
	<div class="flex flex-col items-start justify-center">
		<span class="font-medium">{name}</span>
		<span class="line-clamp-2 text-xs text-muted-foreground">
			{description}
		</span>
	</div>
</a>
