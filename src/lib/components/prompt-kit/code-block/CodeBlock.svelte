<script lang="ts">
	import { cn } from "$lib/utils/utils";
	import {
		CodeBlockClass,
		setCodeBlockContext,
		type CodeBlockSchema,
	} from "./code-block-context.svelte.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		class: className,
		children,
		...restProps
	}: CodeBlockSchema & {
		class?: string;
		children: Snippet;
	} & HTMLAttributes<HTMLDivElement> = $props();

	let contextInstance = new CodeBlockClass();
	setCodeBlockContext(contextInstance);
</script>

<div
	class={cn(
		"not-prose flex w-full flex-col overflow-clip border",
		"border-border bg-card text-card-foreground rounded-xl",
		className
	)}
	{...restProps}
>
	{@render children()}
</div>
