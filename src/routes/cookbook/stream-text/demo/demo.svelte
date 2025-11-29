<script lang="ts">
	import { Chat } from "@ai-sdk/svelte";
	import { DefaultChatTransport } from "ai";
	import { Card, CardContent } from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import LoaderIcon from "@lucide/svelte/icons/loader";
	import SendIcon from "@lucide/svelte/icons/send";

	let chat = $derived(
		new Chat({
			transport: new DefaultChatTransport({
				api: "/api/cookbook/stream-text",
			}),
		})
	);

	let input = $state("");
	let isStreaming = $derived(chat.status === "streaming");

	// Check if last message is assistant with no text yet
	let showTypingIndicator = $derived(() => {
		if (!isStreaming) return false;
		const lastMsg = chat.messages[chat.messages.length - 1];
		if (!lastMsg || lastMsg.role !== "assistant") return false;
		const textPart = lastMsg.parts.find((p) => p.type === "text");
		return !textPart || !(textPart as { text?: string }).text;
	});

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!input.trim() || isStreaming) return;
		chat.sendMessage({ text: input });
		input = "";
	}
</script>

<Card class="w-full">
	<CardContent class="p-0">
		<!-- Messages Area -->
		<div class="flex h-72 flex-col overflow-y-auto p-4">
			{#if chat.messages.length === 0}
				<div class="text-muted-foreground flex flex-1 items-center justify-center text-sm">
					Send a message to start the conversation
				</div>
			{:else}
				<div class="space-y-3">
					{#each chat.messages as message}
						<div class="text-sm">
							<span class="font-medium">
								{message.role === "user" ? "User" : "Assistant"}:
							</span>
							{#each message.parts as part}
								{#if part.type === "text"}
									<span class="whitespace-pre-wrap">{part.text}</span>
								{/if}
							{/each}
						</div>
					{/each}

					<!-- Typing indicator with skeleton -->
					{#if showTypingIndicator()}
						<div class="text-sm">
							<!-- <span class="font-medium">Assistant:</span> -->
							<div class="mt-2 space-y-1.5">
								<div class="bg-muted h-3 w-full animate-pulse rounded"></div>
								<div class="bg-muted h-3 w-11/12 animate-pulse rounded"></div>
								<div class="bg-muted h-3 w-3/4 animate-pulse rounded"></div>
							</div>
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
					disabled={isStreaming}
					class="flex-1"
				/>
				<Button type="submit" disabled={!input.trim() || isStreaming} class="shrink-0">
					{#if isStreaming}
						<LoaderIcon class="size-4 animate-spin" />
					{:else}
						<SendIcon class="size-4" />
					{/if}
				</Button>
			</div>
		</form>
	</CardContent>
</Card>
