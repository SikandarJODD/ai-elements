<script lang="ts">
	import { ToolComposed } from "$lib/components/prompt-kit/tool";
	import type { ToolPart } from "$lib/components/prompt-kit/tool";

	const toolBasic: ToolPart = {
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
		toolCallId: "call_abc123",
	};

	const toolProcessing: ToolPart = {
		type: "fetch_data",
		state: "input-streaming",
		input: {
			endpoint: "/api/users",
			method: "GET",
		},
		toolCallId: "call_xyz789",
	};

	const toolReady: ToolPart = {
		type: "calculate",
		state: "input-available",
		input: {
			expression: "2 + 2 * 3",
			precision: 2,
		},
		toolCallId: "call_def456",
	};

	const toolError: ToolPart = {
		type: "database_query",
		state: "output-error",
		input: {
			query: "SELECT * FROM users WHERE id = ?",
			params: [123],
		},
		errorText: "Connection timeout: Unable to connect to database server at localhost:5432",
		toolCallId: "call_ghi789",
	};
</script>

<div class="space-y-6">
	<div>
		<h3 class="mb-3 text-lg font-semibold">Completed Tool</h3>
		<ToolComposed toolPart={toolBasic} defaultOpen={true} class="w-full max-w-2xl" />
	</div>

	<div>
		<h3 class="mb-3 text-lg font-semibold">Processing Tool</h3>
		<ToolComposed toolPart={toolProcessing} class="w-full max-w-2xl" />
	</div>

	<div>
		<h3 class="mb-3 text-lg font-semibold">Ready Tool</h3>
		<ToolComposed toolPart={toolReady} class="w-full max-w-2xl" />
	</div>

	<div>
		<h3 class="mb-3 text-lg font-semibold">Error Tool</h3>
		<ToolComposed toolPart={toolError} defaultOpen={true} class="w-full max-w-2xl" />
	</div>
</div>
