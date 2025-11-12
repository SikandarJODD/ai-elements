<script lang="ts">
	import { ToolComposed } from "$lib/components/prompt-kit/tool";
	import type { ToolPart } from "$lib/components/prompt-kit/tool";

	const toolProcessing: ToolPart = {
		type: "search_documents",
		state: "input-streaming",
		input: {
			query: "AI best practices",
			max_results: 10,
		},
		toolCallId: "call_001",
	};

	const toolReady: ToolPart = {
		type: "translate_text",
		state: "input-available",
		input: {
			text: "Hello, world!",
			target_language: "es",
		},
		toolCallId: "call_002",
	};

	const toolCompleted: ToolPart = {
		type: "calculate_sum",
		state: "output-available",
		input: {
			numbers: [10, 20, 30, 40],
		},
		output: {
			result: 100,
			operation: "sum",
		},
		toolCallId: "call_003",
	};

	const toolError: ToolPart = {
		type: "fetch_api_data",
		state: "output-error",
		input: {
			url: "https://api.example.com/data",
			method: "GET",
		},
		errorText: "Network timeout: Request exceeded 30 second limit",
		toolCallId: "call_004",
	};
</script>

<div class="flex w-full flex-col items-center justify-center space-y-2">
	<ToolComposed toolPart={toolProcessing} class="w-full max-w-md" />
	<ToolComposed toolPart={toolReady} class="w-full max-w-md" />
	<ToolComposed toolPart={toolCompleted} class="w-full max-w-md" />
	<ToolComposed toolPart={toolError} class="w-full max-w-md" />
</div>
