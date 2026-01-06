<script lang="ts">
	import { cn } from "$lib/utils/utils";
	import { Streamdown, type StreamdownProps } from "svelte-streamdown";
	import { mode } from "mode-watcher";
	import type { HTMLAttributes } from "svelte/elements";

	// Import Shiki themes
	import githubLightDefault from "@shikijs/themes/github-light-default";
	import githubDarkDefault from "@shikijs/themes/github-dark-default";
	import Code from "svelte-streamdown/code";

	type Props = {
		content: string;
		id?: string;
		class?: string;
	} & Omit<StreamdownProps, "content" | "class"> &
		Omit<HTMLAttributes<HTMLDivElement>, "content">;

	let { content, id, class: className, ...restProps }: Props = $props();
	let currentTheme = $derived(
		mode.current === "dark" ? "github-dark-default" : "github-light-default"
	);
</script>

<div {id} class={cn(className)} {...restProps}>
	<Streamdown
		{content}
		class="[&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
		shikiTheme={currentTheme}
		baseTheme="shadcn"
		components={{ code: Code }}
		shikiThemes={{
			"github-light-default": githubLightDefault,
			"github-dark-default": githubDarkDefault,
		}}
	/>
</div>
