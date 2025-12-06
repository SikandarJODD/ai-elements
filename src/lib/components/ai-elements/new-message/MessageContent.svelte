<script lang="ts">
	import { cn } from "$lib/utils/utils";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		class?: string;
		children: Snippet;
	}

	let { class: className, children, ...restProps }: Props = $props();
</script>

<div
	class={cn(
		"is-user:dark flex w-fit flex-col gap-2 overflow-hidden text-sm",
		"group-[.is-user]:bg-secondary group-[.is-user]:text-foreground group-[.is-user]:ml-auto group-[.is-user]:rounded-lg group-[.is-user]:px-4 group-[.is-user]:py-3",
		"group-[.is-assistant]:text-foreground",
		className
	)}
	{...restProps}
>
	{@render children()}
</div>
