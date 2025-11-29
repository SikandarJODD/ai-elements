<script lang="ts">
	import { Chat } from "@ai-sdk/svelte";
	import { DefaultChatTransport, lastAssistantMessageIsCompleteWithToolCalls } from "ai";
	import { Card, CardContent } from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import LoaderIcon from "@lucide/svelte/icons/loader";
	import SendIcon from "@lucide/svelte/icons/send";
	import CloudIcon from "@lucide/svelte/icons/cloud";
	import type { ChatMessage } from "../../../../routes/api/cookbook/render-visual-interface/+server";

	let chat = $derived(
		new Chat<ChatMessage>({
			transport: new DefaultChatTransport({
				api: "/api/cookbook/render-visual-interface",
			}),
			sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
			async onToolCall({ toolCall }) {
				if (toolCall.toolName === "getLocation") {
					const cities = ["New York", "Los Angeles", "Chicago", "San Francisco"];
					chat.addToolOutput({
						tool: "getLocation",
						toolCallId: toolCall.toolCallId,
						output: cities[Math.floor(Math.random() * cities.length)],
					});
				}
			},
		})
	);

	let input = $state("What's the weather in San Francisco today? in Celcius units?");
	let isStreaming = $derived(chat.status === "streaming");

	// Check if we're waiting for initial response
	let showLoadingState = $derived(() => {
		if (!isStreaming) return false;
		const lastMsg = chat.messages[chat.messages.length - 1];
		if (!lastMsg || lastMsg.role !== "assistant") return false;
		return lastMsg.parts.length === 0;
	});

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!input.trim() || isStreaming) return;
		chat.sendMessage({ text: input });
		input = "";
	}
</script>

<Card>
	<CardContent class="space-y-4">
		<form onsubmit={handleSubmit} class="flex gap-2">
			<Input
				bind:value={input}
				placeholder="Ask about weather..."
				class="flex-1"
				disabled={isStreaming}
			/>
			<Button type="submit" disabled={isStreaming || !input.trim()} class="shrink-0">
				{#if isStreaming}
					<LoaderIcon class="size-4 animate-spin" />
				{:else}
					<SendIcon class="size-4" />
				{/if}
			</Button>
		</form>

		<!-- Loading state -->
		{#if showLoadingState()}
			<div class="space-y-3">
				<div class="text-sm">
					<span class="font-medium">Assistant:</span>
					<span class="text-muted-foreground ml-1 inline-flex items-center gap-2">
						<CloudIcon class="size-4 animate-pulse" />
						<span class="text-xs">Fetching weather data...</span>
					</span>
				</div>
				<div class="animate-pulse rounded-lg bg-blue-500/20 p-3">
					<div class="mb-2 h-8 w-16 rounded bg-blue-500/30"></div>
					<div class="flex gap-3">
						{#each [1, 2, 3, 4, 5] as _}
							<div class="h-8 w-8 rounded bg-blue-500/20"></div>
						{/each}
					</div>
				</div>
			</div>
		{/if}

		{#if chat.messages.length > 0}
			<div class="space-y-3">
				{#each chat.messages as message}
					<div class="text-sm">
						<span class="font-medium"
							>{message.role === "user" ? "User" : "Assistant"}:</span
						>
						{#each message.parts as part}
							{#if part.type === "text"}
								<span>{part.text}</span>
							{:else if part.type === "tool-askForConfirmation"}
								<div class="my-2 flex gap-2">
									{#if part.state === "output-available"}
										<span class="font-medium text-green-600">{part.output}</span
										>
									{:else}
										<Button
											size="sm"
											onclick={() =>
												chat.addToolOutput({
													tool: "askForConfirmation",
													toolCallId: part.toolCallId,
													output: "Confirmed",
												})}>Yes</Button
										>
										<Button
											size="sm"
											variant="destructive"
											onclick={() =>
												chat.addToolOutput({
													tool: "askForConfirmation",
													toolCallId: part.toolCallId,
													output: "Denied",
												})}>No</Button
										>
									{/if}
								</div>
							{:else if part.type === "tool-getWeatherInformation" && part.state === "output-available"}
								<div class="my-2 rounded-lg bg-blue-500 p-3 text-white">
									<div class="text-2xl font-bold">
										{part.output.value}°{part.output.unit === "celsius"
											? "C"
											: "F"}
									</div>
									<div class="mt-2 flex gap-3 text-xs">
										{#each part.output.weeklyForecast as day}
											<div class="text-center">
												<div>{day.day}</div>
												<div>{day.value}°</div>
											</div>
										{/each}
									</div>
								</div>
							{:else if part.type === "tool-getLocation"}
								<div class="text-muted-foreground my-1 text-xs">
									{part.state === "output-available"
										? `📍 ${part.output}`
										: "Getting location..."}
								</div>
							{/if}
						{/each}
					</div>
				{/each}
			</div>
		{/if}
	</CardContent>
</Card>
