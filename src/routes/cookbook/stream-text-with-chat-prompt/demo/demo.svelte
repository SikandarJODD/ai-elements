<script lang="ts">
	import { Chat } from "@ai-sdk/svelte";
	import { DefaultChatTransport } from "ai";
	import { Card, CardContent } from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";

	let chat = $derived(
		new Chat({
			transport: new DefaultChatTransport({
				api: "/api/cookbook/stream-text-image-prompt",
			}),
		})
	);

	let input = $state("");

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!input.trim() || chat.status === "streaming") return;

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
				</div>
			{/if}
		</div>

		<!-- Input Area -->
		<form onsubmit={handleSubmit} class="border-t p-4">
			<div class="flex gap-2">
				<Input
					bind:value={input}
					placeholder="Type your message..."
					disabled={chat.status === "streaming"}
					class="flex-1"
				/>
				<Button type="submit" disabled={!input.trim() || chat.status === "streaming"}>
					{chat.status === "streaming" ? "Streaming..." : "Send"}
				</Button>
			</div>
		</form>
	</CardContent>
</Card>

