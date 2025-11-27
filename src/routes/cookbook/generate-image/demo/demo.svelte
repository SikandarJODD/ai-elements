<script lang="ts">
	import { Chat } from "@ai-sdk/svelte";
	import { DefaultChatTransport, type UIMessage } from "ai";
	import { Card, CardContent } from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import type { ChatTools } from "../../../../routes/api/cookbook/generate-image/+server";

	type ChatMessage = UIMessage<never, never, ChatTools>;

	let chat = $derived(
		new Chat<ChatMessage>({
			transport: new DefaultChatTransport({
				api: "/api/cookbook/generate-image",
			}),
		})
	);

	let input = $state("A sunset over mountains");

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!input.trim() || chat.status === "streaming") return;
		chat.sendMessage({ parts: [{ type: "text", text: input }] });
		input = "";
	}
</script>

<Card>
	<CardContent class="space-y-4">
		<form onsubmit={handleSubmit} class="flex gap-2">
			<Input bind:value={input} placeholder="Describe an image..." class="flex-1" />
			<Button type="submit" disabled={chat.status === "streaming"}>
				{chat.status === "streaming" ? "Generating..." : "Generate"}
			</Button>
		</form>

		{#if chat.messages.length > 0}
			<div class="space-y-3">
				{#each chat.messages as message}
					<div class="text-sm">
						<span class="font-medium"
							>{message.role === "user" ? "User" : "Assistant"}:</span
						>
						{#each message.parts as part}
							{#if part.type === "text"}
								<span class="whitespace-pre-wrap">{part.text}</span>
							{:else if part.type === "tool-generateImageTool"}
								{#if part.state === "output-available"}
									<div class="mt-2">
										<img
											src={`data:image/png;base64,${part.output.image}`}
											alt={part.input.prompt}
											class="max-w-full rounded-lg"
										/>
										<p class="text-muted-foreground mt-1 text-xs">
											{part.input.prompt}
										</p>
									</div>
								{:else}
									<div class="text-muted-foreground mt-2 text-sm">
										🎨 Generating image...
									</div>
								{/if}
							{/if}
						{/each}
					</div>
				{/each}
			</div>
		{/if}
	</CardContent>
</Card>
