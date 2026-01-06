<script lang="ts">
	import { Streamdown } from "svelte-streamdown";
	import Code from "svelte-streamdown/code";
	import { cn } from "$lib/utils/utils";
	import { mode } from "mode-watcher";

	// Import Shiki themes
	import githubLightDefault from "@shikijs/themes/github-light-default";
	import githubDarkDefault from "@shikijs/themes/github-dark-default";

	const markdownContent = `# Custom Components Example

## Styled Headings

### This is a custom styled H3

## Custom Blockquotes

> This is a custom styled blockquote
> with multiple lines of text.

## Custom Lists

- First item with custom styling
- Second item with custom styling
- Third item with custom styling
`;

	let theme = $state<"light" | "dark">("light");

	function toggleTheme() {
		theme = theme === "light" ? "dark" : "light";
	}

	let currentTheme = $derived(
		mode.current === "dark" ? "github-dark-default" : "github-light-default"
	);
</script>

<div
	class={cn(
		"w-full max-w-3xl rounded-lg p-6 transition-colors",
		theme === "light" ? "bg-white text-black" : "bg-black text-white"
	)}
>
	<div class="mb-4 flex justify-end">
		<button
			onclick={toggleTheme}
			class={cn(
				"rounded px-3 py-1 text-sm hover:opacity-80",
				theme === "light" ? "bg-gray-200" : "bg-gray-900"
			)}
		>
			Toggle {theme === "light" ? "Dark" : "Light"} Mode
		</button>
	</div>

	<!-- Custom themed Streamdown component -->
	<Streamdown
		content={markdownContent}
		shikiTheme={mode.current === "dark" ? "github-dark-default" : "github-light-default"}
		components={{ code: Code }}
		shikiThemes={{
			"github-light-default": githubLightDefault,
			"github-dark-default": githubDarkDefault,
		}}
		baseTheme="shadcn"
		theme={{
			h3: {
				base: "my-4 text-xl font-bold text-blue-500",
			},
			blockquote: {
				base: "my-4 border-l-4 border-green-500 pl-4 italic",
			},
			li: {
				base: "my-1 flex items-center before:mr-2 before:inline-block before:h-2 before:w-2 before:rounded-full before:bg-orange-500",
			},
		}}
	/>
</div>
