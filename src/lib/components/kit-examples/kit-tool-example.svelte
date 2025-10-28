<script lang="ts">
	import { ToolComposed } from "$lib/components/prompt-kit/tool";
	import type { ToolPart } from "$lib/components/prompt-kit/tool";

	const toolPart: ToolPart = {
		type: "search_web",
		state: "output-available",
		input: {
			query: "prompt-kit documentation",
			max_results: 5,
		},
		output: {
			results: [
				{
					title: "Prompt Kit - Documentation",
					url: "https://prompt-kit.com/docs",
					snippet: "A comprehensive guide to using Prompt Kit components...",
				},
				{
					title: "Getting Started with Prompt Kit",
					url: "https://prompt-kit.com/docs/installation",
					snippet: "Learn how to install and use Prompt Kit in your project...",
				},
			],
		},
	};
</script>

<ToolComposed {toolPart} class="w-full max-w-md" />
