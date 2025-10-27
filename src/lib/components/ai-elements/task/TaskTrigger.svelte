<script lang="ts">
	import { CollapsibleTrigger } from "$lib/components/ui/collapsible/index.js";
	import { cn } from "$lib/utils/utils";
	import { ChevronDown, Search } from "@lucide/svelte";
	import { Collapsible as CollapsiblePrimitive } from "bits-ui";
	import type { Snippet } from "svelte";

	export interface TaskTriggerProps extends CollapsiblePrimitive.TriggerProps {
		title: string;
		class?: string;
		children?: Snippet;
	}

	let { children, class: className, title, ...restProps }: TaskTriggerProps = $props();

	let randomId = crypto.randomUUID();
</script>

{#if children}
	<CollapsibleTrigger class={cn("group", className)} {...restProps}>
		{@render children?.()}
	</CollapsibleTrigger>
{:else}
	<CollapsibleTrigger class={cn("group", className)} {...restProps}>
		<div
			class="text-muted-foreground hover:text-foreground flex w-full cursor-pointer items-center gap-2 text-sm transition-colors"
		>
			<Search class="size-4" />
			<p class="text-sm">{title}</p>
			<ChevronDown class="size-4 transition-transform group-data-[state=open]:rotate-180" />
		</div>
	</CollapsibleTrigger>
{/if}
