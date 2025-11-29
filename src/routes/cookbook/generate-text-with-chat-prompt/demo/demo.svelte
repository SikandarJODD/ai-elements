<script lang="ts">
	import { Card, CardContent } from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";

	type Message = {
		role: "user" | "assistant";
		content: string;
	};

	let messages = $state<Message[]>([]);
	let input = $state("");
	let isLoading = $state(false);

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!input.trim() || isLoading) return;

		const userMessage = input.trim();
		input = "";

		// Add user message to display
		messages = [...messages, { role: "user", content: userMessage }];
		isLoading = true;

		try {
			// Send all messages for context
			const response = await fetch("/api/cookbook/generate-chat-with-prompt", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					messages: messages.map((m) => ({
						role: m.role,
						content: m.content,
					})),
				}),
			});

			const result = await response.json();

			// Extract assistant response from result
			if (result && result.length > 0) {
				const lastMessage = result[result.length - 1];
				const assistantContent =
					lastMessage.content?.[0]?.text || lastMessage.content || "No response";
				messages = [...messages, { role: "assistant", content: assistantContent }];
			}
		} catch {
			messages = [
				...messages,
				{ role: "assistant", content: "Error: Failed to get response" },
			];
		} finally {
			isLoading = false;
		}
	}
</script>

<Card class="w-full">
	<CardContent class="p-0">
		<!-- Messages Area -->
		<div class="flex h-72 flex-col overflow-y-auto p-4">
			{#if messages.length === 0}
				<div class="text-muted-foreground flex flex-1 items-center justify-center text-sm">
					Send a message to start the conversation
				</div>
			{:else}
				<div class="space-y-3">
					{#each messages as message}
						<div class="text-sm">
							<span class="font-medium">
								{message.role === "user" ? "User" : "Assistant"}:
							</span>
							<span class="whitespace-pre-wrap">{message.content}</span>
						</div>
					{/each}
					{#if isLoading}
						<div class="text-muted-foreground text-sm">
							<span class="font-medium">Assistant:</span>
							<span>Thinking...</span>
						</div>
					{/if}
				</div>
			{/if}
		</div>

		<!-- Input Area -->
		<form onsubmit={handleSubmit} class="border-t p-4">
			<div class="flex gap-2">
				<Input
					bind:value={input}
					placeholder="Type your message..."
					disabled={isLoading}
					class="flex-1"
				/>
				<Button type="submit" disabled={!input.trim() || isLoading}>
					{isLoading ? "Generating..." : "Send"}
				</Button>
			</div>
		</form>
	</CardContent>
</Card>
