<script lang="ts">
	import { cn } from "$lib/utils";
	import type { Snippet } from "svelte";

	let {
		class: className,
		children,
		title,
		titleBaseClass
	} = $props<{
		class?: string;
		children?: Snippet;
		title?: string;
		titleBaseClass?: string;
	}>();
</script>

<div class={cn("relative pb-10 pl-8", className)}>
	{#if title}
		<div class={cn("mb-0 flex h-8 items-center", titleBaseClass)}>
			<div
				class="absolute -left-3.5 rounded-full border-y-4 border-white dark:border-background"
			>
				<span
					class="flex size-7 items-center justify-center rounded-full bg-muted font-mono text-xs font-medium text-foreground [counter-increment:step] before:content-[counter(step)] dark:bg-card"
				></span>
			</div>
			<h3 class="text-base leading-none font-medium">
				{title}
			</h3>
		</div>
	{:else}
		<div
			class="absolute -left-4.5 rounded-full border-2 border-white dark:border-background"
		>
			<span
				class="flex size-7 items-center justify-center rounded-full bg-muted font-mono text-xs font-medium text-foreground [counter-increment:step] before:content-[counter(step)] dark:bg-card"
			></span>
		</div>
	{/if}
	<div class="text-base leading-relaxed text-foreground/70">
		{@render children?.()}
	</div>
</div>
