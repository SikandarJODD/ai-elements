<script lang="ts">
	import { ToolComposed } from "$lib/components/prompt-kit/tool";
	import type { ToolPart } from "$lib/components/prompt-kit/tool";

	const toolPart: ToolPart = {
		type: "get_weather",
		state: "output-available",
		input: {
			location: "San Francisco, CA",
			units: "celsius",
		},
		output: {
			temperature: 18,
			conditions: "Partly cloudy",
			humidity: 65,
			wind_speed: 12,
		},
		toolCallId: "call_weather_123",
	};
</script>

<ToolComposed {toolPart} defaultOpen={true} class="w-full max-w-lg" />
