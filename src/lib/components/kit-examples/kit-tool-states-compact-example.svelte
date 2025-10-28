<script lang="ts">
	import { ToolComposed } from "$lib/components/prompt-kit/tool";
	import type { ToolPart } from "$lib/components/prompt-kit/tool";

	const toolInputStreaming: ToolPart = {
		type: "file_search",
		state: "input-streaming",
		input: {
			pattern: "*.tsx",
			directory: "/components",
		},
	};

	const toolInputAvailable: ToolPart = {
		type: "api_call",
		state: "input-available",
		input: {
			endpoint: "/api/users",
			method: "GET",
		},
	};

	const toolOutputAvailable: ToolPart = {
		type: "database_query",
		state: "output-available",
		input: {
			table: "users",
			limit: 10,
		},
		output: {
			count: 42,
			data: [
				{ id: 1, name: "John Doe" },
				{ id: 2, name: "Jane Smith" },
			],
		},
	};

	const toolOutputError: ToolPart = {
		type: "email_send",
		state: "output-error",
		output: {
			to: "user@example.com",
			subject: "Welcome!",
		},
		errorText: "Failed to connect to SMTP server",
	};
</script>

<div class="flex w-full flex-col items-center justify-center space-y-2">
	<ToolComposed toolPart={toolInputStreaming} class="w-full max-w-md" />
	<ToolComposed toolPart={toolInputAvailable} class="w-full max-w-md" />
	<ToolComposed toolPart={toolOutputAvailable} class="w-full max-w-md" />
	<ToolComposed toolPart={toolOutputError} class="w-full max-w-md" />
</div>
