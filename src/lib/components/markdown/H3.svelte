<script lang="ts">
	import type { Snippet } from "svelte";
	import { cn } from "$lib/utils";

	type ComponentProps = {
		class?: string;
		children?: Snippet;
		[prop: string]: unknown;
	};

	const { children, class: className = "", ...rest }: ComponentProps = $props();
	import { onMount } from "svelte";

	let ref = $state<HTMLHeadingElement>();
	let id = $state<string>();

	onMount(() => {
		id = ref?.innerText.split(" ").join("-").toLowerCase();
	});
</script>

<h3
	bind:this={ref}
	{id}
	class={cn("text-foreground font-display mt-4 scroll-m-24 text-xl font-medium", className)}
	{...rest}
>
	{@render children?.()}
</h3>
