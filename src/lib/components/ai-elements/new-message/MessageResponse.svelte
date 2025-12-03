<script lang="ts">
	import { cn } from "$lib/utils/utils";
	import { Streamdown, type StreamdownProps } from "svelte-streamdown";
	import { mode } from "mode-watcher";
	import type { HTMLAttributes } from "svelte/elements";

	type Props = {
		content: string;
		class?: string;
	} & Omit<StreamdownProps, "content" | "class"> &
		Omit<HTMLAttributes<HTMLDivElement>, "content">;

	let { content, class: className, ...restProps }: Props = $props();
</script>

<div
	class={cn(
		"size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
		className
	)}
>
	<Streamdown
		{content}
		shikiTheme={mode.current === "dark"
			? "github-dark-default"
			: "github-light-default"}
		shikiPreloadThemes={["github-dark-default", "github-light-default"]}
		baseTheme="shadcn"
		{...restProps}
	/>
</div>

