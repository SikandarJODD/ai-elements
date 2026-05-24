<script lang="ts">
	import * as Tool from "$lib/components/ai-elements/tool/index.js";

	// Mock tool data
	let toolData = {
		type: "web_search",
		state: "output-available" as const,
		input: {
			query: "latest AI developments 2024",
			count: 5,
			language: "en",
		},
		output: {
			results: [
				{
					title: "Revolutionary AI Breakthrough in 2024",
					url: "https://example.com/ai-breakthrough-2024",
					snippet:
						"Scientists have achieved a major milestone in artificial intelligence...",
				},
				{
					title: "The Future of Machine Learning",
					url: "https://example.com/ml-future",
					snippet: "New research shows promising developments in neural networks...",
				},
			],
			total_results: 147,
		},
	};

	let errorToolData = {
		type: "database_query",
		state: "output-error" as const,
		input: {
			query: "SELECT * FROM users WHERE invalid_column = 'test'",
			database: "production",
		},
		errorText: "SQL Error: Column 'invalid_column' doesn't exist in table 'users'",
	};

	let loadingToolData = {
		type: "api_call",
		state: "input-available" as const,
		input: {
			endpoint: "/api/v1/data",
			method: "GET",
			headers: {
				Authorization: "Bearer token123",
				"Content-Type": "application/json",
			},
		},
	};
</script>

<div class="mx-auto max-w-2xl space-y-6 p-6">
	<h1 class="text-2xl font-bold">Tool Components Example</h1>

	<!-- Successful Tool Example -->
	<Tool.Root>
		<Tool.Header type={toolData.type} state={toolData.state} />
		<Tool.Content>
			<Tool.Input input={toolData.input} />
			<Tool.Output output={toolData.output} />
		</Tool.Content>
	</Tool.Root>

	<!-- Error Tool Example -->
	<Tool.Root>
		<Tool.Header type={errorToolData.type} state={errorToolData.state} />
		<Tool.Content>
			<Tool.Input input={errorToolData.input} />
			<Tool.Output output={undefined} errorText={errorToolData.errorText} />
		</Tool.Content>
	</Tool.Root>

	<!-- Loading Tool Example -->
	<Tool.Root>
		<Tool.Header type={loadingToolData.type} state={loadingToolData.state} />
		<Tool.Content>
			<Tool.Input input={loadingToolData.input} />
		</Tool.Content>
	</Tool.Root>

	<!-- Pending Tool Example -->
	<Tool.Root>
		<Tool.Header type="file_analyzer" state="input-streaming" />
		<Tool.Content>
			<Tool.Input
				input={{
					file_path: "/documents/report.pdf",
					analysis_type: "summarization",
				}}
			/>
		</Tool.Content>
	</Tool.Root>
</div>
