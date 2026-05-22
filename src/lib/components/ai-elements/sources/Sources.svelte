<script lang="ts">
	import { Collapsible } from "$lib/components/ui/collapsible/index.js";
	import { cn } from "$lib/utils";
	import type { Snippet } from "svelte";

	interface Props {
		class?: string;
		children?: Snippet;
		[key: string]: any;
	}

	let { class: className = "", children, ...restProps }: Props = $props();

	let id = $derived.by(() => crypto.randomUUID());
</script>

<Collapsible {id} class={cn("not-prose text-primary mb-4 text-xs", className)} {...restProps}>
	{@render children?.()}
</Collapsible>
