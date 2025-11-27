<script lang="ts">
	import { Chat } from "@ai-sdk/svelte";
	import { DefaultChatTransport, lastAssistantMessageIsCompleteWithToolCalls } from "ai";

	import type { ChatMessage } from "../../../routes/api/cookbook/render-visual-interface/+server";

	let chat = $derived(
		new Chat<ChatMessage>({
			transport: new DefaultChatTransport({
				api: "/api/render-visual-interface",
			}),

			sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,

			// run client-side tools that are automatically executed:
			async onToolCall({ toolCall }) {
				if (toolCall.toolName === "getLocation") {
					const cities = ["New York", "Los Angeles", "Chicago", "San Francisco"];

					// No await - avoids potential deadlocks
					chat.addToolOutput({
						tool: "getLocation",
						toolCallId: toolCall.toolCallId,
						output: cities[Math.floor(Math.random() * cities.length)],
					});
				}
			},
		})
	);

	let input = $state("");

	let handleSubmit = (e: SubmitEvent) => {
		e.preventDefault();
		chat.sendMessage({ text: input });
		input = "";
	};
</script>

<div class="stretch mx-auto flex w-full max-w-md flex-col gap-4 py-24">
	{#each chat.messages as m}
		<div class="flex flex-col gap-1 whitespace-pre-wrap">
			<strong>{m.role}: </strong>
			{#each m.parts as part, i}
				{#if part.type === "text"}
					<div>{part.text}</div>
				{:else if part.type === "tool-askForConfirmation"}
					<!-- render confirmation tool (client-side tool with user interaction) -->
					<div class="flex flex-col gap-2 text-gray-500">
						<div class="flex gap-2">
							{#if part.state === "output-available"}
								<b>{part.output}</b>
							{:else}
								<button
									class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
									onclick={() =>
										chat.addToolOutput({
											tool: "askForConfirmation",
											toolCallId: part.toolCallId,
											output: "Yes, confirmed.",
										})}
								>
									Yes
								</button>
								<button
									class="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
									onclick={() =>
										chat.addToolOutput({
											tool: "askForConfirmation",
											toolCallId: part.toolCallId,
											output: "No, denied",
										})}
								>
									No
								</button>
							{/if}
						</div>
					</div>
				{:else if part.type === "tool-getWeatherInformation"}
					<!-- render weather information tool -->
					{#if part.state === "output-available"}
						<div class="flex flex-col gap-2 rounded-lg bg-blue-400 p-4">
							<div class="flex flex-row items-center justify-between">
								<div class="text-4xl font-medium text-blue-50">
									{part.output.value}°{part.output.unit === "celsius" ? "C" : "F"}
								</div>

								<div class="h-9 w-9 shrink-0 rounded-full bg-amber-400"></div>
							</div>
							<div class="flex flex-row justify-between gap-2 text-blue-50">
								{#each part.output.weeklyForecast as forecast}
									<div class="flex flex-col items-center">
										<div class="text-xs">{forecast.day}</div>
										<div>{forecast.value}°</div>
									</div>
								{/each}
							</div>
						</div>
					{/if}
				{:else if part.type === "tool-getLocation"}
					<!-- render location tool -->
					{#if part.state === "output-available"}
						<div class="rounded-lg bg-gray-100 p-4 text-gray-500">
							User is in {part.output}.
						</div>
					{:else}
						<div class="text-gray-500">Calling getLocation...</div>
					{/if}
				{/if}
			{/each}
		</div>
	{/each}

	<form onsubmit={handleSubmit}>
		<input
			class="fixed bottom-0 mb-8 w-full max-w-md rounded border border-gray-300 p-2 shadow-xl"
			bind:value={input}
			placeholder="Say something..."
		/>
	</form>
</div>
