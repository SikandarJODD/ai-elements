<script lang="ts">
	import { Chat } from "@ai-sdk/svelte";
	import { DefaultChatTransport } from "ai";
	import { Card, CardContent } from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Markdown } from "$lib/components/prompt-kit/markdown";

	let chat = $derived(
		new Chat({
			transport: new DefaultChatTransport({
				api: "/api/cookbook/markdown-chatbot",
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
		<div class="flex h-96 flex-col overflow-y-auto p-4">
			{#if chat.messages.length === 0}
				<div class="text-muted-foreground flex flex-1 items-center justify-center text-sm">
					Try: "Show me a TypeScript function with error handling"
				</div>
			{:else}
				<div class="space-y-4">
					{#each chat.messages as message}
						<div class="text-sm">
							<span
								class="text-muted-foreground mb-1 block text-xs font-medium uppercase"
							>
								{message.role === "user" ? "You" : "Assistant"}
							</span>
							{#if message.role === "user"}
								{#each message.parts as part}
									{#if part.type === "text"}
										<span class="whitespace-pre-wrap">{part.text}</span>
									{/if}
								{/each}
							{:else}
								{#each message.parts as part}
									{#if part.type === "text"}
										<Markdown
											content={part.text}
											class="prose prose-sm prose-neutral dark:prose-invert prose-pre:bg-muted prose-pre:border prose-pre:rounded-lg prose-code:before:content-none prose-code:after:content-none max-w-none"
										/>
									{/if}
								{/each}
							{/if}
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
					placeholder="Ask for code examples, explanations..."
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
