<script lang="ts">
	import { ToolComposed } from "$lib/components/prompt-kit/tool";
	import type { ToolPart } from "$lib/components/prompt-kit/tool";

	// Processing state - tool is receiving input
	const toolProcessing: ToolPart = {
		type: "analyze_code",
		state: "input-streaming",
		input: {
			file_path: "/src/components/Button.tsx",
			analysis_type: "security",
		},
		toolCallId: "call_stream_001",
	};

	// Ready state - tool has input and is ready to execute
	const toolReady: ToolPart = {
		type: "generate_image",
		state: "input-available",
		input: {
			prompt: "A serene mountain landscape at sunset",
			size: "1024x1024",
			style: "photorealistic",
		},
		toolCallId: "call_ready_002",
	};

	// Completed state - tool has successfully executed
	const toolCompleted: ToolPart = {
		type: "get_weather",
		state: "output-available",
		input: {
			location: "Tokyo, Japan",
			units: "celsius",
		},
		output: {
			temperature: 22,
			conditions: "Clear sky",
			humidity: 58,
			wind_speed: 8,
			forecast: "Sunny throughout the day",
		},
		toolCallId: "call_success_003",
	};

	// Error state - tool execution failed
	const toolError: ToolPart = {
		type: "send_email",
		state: "output-error",
		input: {
			to: "user@example.com",
			subject: "Welcome to our platform",
			body: "Thank you for signing up!",
		},
		errorText:
			"SMTP Authentication failed: Invalid credentials for mail.example.com:587. Please check your email configuration.",
		toolCallId: "call_error_004",
	};
</script>

<div class="space-y-6">
	<div>
		<h3 class="text-muted-foreground mb-3 text-sm font-medium">Processing - Input Streaming</h3>
		<ToolComposed
			toolPart={toolProcessing}
			defaultOpen={true}
			class="w-full max-w-2xl min-w-xl"
		/>
	</div>

	<div>
		<h3 class="text-muted-foreground mb-3 text-sm font-medium">Ready - Input Available</h3>
		<ToolComposed toolPart={toolReady} class="w-full max-w-2xl" />
	</div>

	<div>
		<h3 class="text-muted-foreground mb-3 text-sm font-medium">Completed - Output Available</h3>
		<ToolComposed toolPart={toolCompleted} defaultOpen={true} class="w-full max-w-2xl" />
	</div>

	<div>
		<h3 class="text-muted-foreground mb-3 text-sm font-medium">Error - Output Error</h3>
		<ToolComposed toolPart={toolError} class="w-full max-w-2xl" />
	</div>
</div>
