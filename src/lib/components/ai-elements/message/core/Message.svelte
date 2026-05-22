<script lang="ts">
	import { cn } from "$lib/utils";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import type { MessageRole } from "../context/message-context.svelte.js";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		from: MessageRole;
		class?: string;
		children: Snippet;
	}

	let { from, class: className, children, ...restProps }: Props = $props();
</script>

<div
	class={cn(
		"group flex w-full max-w-[95%] flex-col gap-2",
		from === "user" ? "is-user ml-auto justify-end" : "is-assistant",
		className
	)}
	data-role={from}
	{...restProps}
>
	{@render children()}
</div>
