<script lang="ts">
	import { Streamdown, type StreamdownProps } from "svelte-streamdown";
	import Code from "svelte-streamdown/code";
	import MathRenderer from "svelte-streamdown/math";
	import Mermaid from "svelte-streamdown/mermaid";
	import { mode } from "mode-watcher";
	import githubDarkDefault from "@shikijs/themes/github-dark-default";
	import githubLightDefault from "@shikijs/themes/github-light-default";
	import { cn } from "$lib/utils/utils";

	type StreamdownComponents = NonNullable<StreamdownProps["components"]>;

	type Props = {
		content: string;
		class?: string;
		components?: StreamdownComponents;
	} & Omit<StreamdownProps, "class" | "content" | "components">;

	let { content, class: className, components, ...restProps }: Props = $props();

	const defaultComponents = {
		code: Code,
		mermaid: Mermaid,
		math: MathRenderer,
	} satisfies StreamdownComponents;

	let currentTheme = $derived(
		mode.current === "dark" ? "github-dark-default" : "github-light-default"
	);
	let mergedComponents = $derived({ ...defaultComponents, ...components });
</script>

<div class={cn("size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0", className)}>
	<Streamdown
		{content}
		baseTheme="shadcn"
		components={mergedComponents}
		shikiTheme={currentTheme}
		shikiThemes={{
			"github-light-default": githubLightDefault,
			"github-dark-default": githubDarkDefault,
		}}
		{...restProps}
	/>
</div>
