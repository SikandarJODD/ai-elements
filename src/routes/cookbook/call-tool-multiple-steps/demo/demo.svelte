<script lang="ts">
	import { Chat } from "@ai-sdk/svelte";
	import { DefaultChatTransport } from "ai";
	import { Card, CardContent } from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";

	let chat = $derived(
		new Chat({
			transport: new DefaultChatTransport({
				api: "/api/cookbook/call-tool-multiple-steps",
			}),
		})
	);

	let input = $state("What's the weather where I am?");

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!input.trim() || chat.status === "streaming") return;
		chat.sendMessage({ text: input });
		input = "";
	}
</script>

<Card>
	<CardContent class="space-y-4">
		<form onsubmit={handleSubmit} class="flex gap-2">
			<Input bind:value={input} placeholder="Ask about weather..." class="flex-1" />
			<Button type="submit" disabled={chat.status === "streaming"}>
				{chat.status === "streaming" ? "..." : "Send"}
			</Button>
		</form>

		{#if chat.messages.length > 0}
			<div class="space-y-3">
				{#each chat.messages as message}
					<div class="text-sm">
						<span class="font-medium">
							{message.role === "user" ? "User" : "Assistant"}:
						</span>
						{#each message.parts as part}
							{#if part.type === "text"}
								<span class="whitespace-pre-wrap">{part.text}</span>
							{:else if part.type === "tool-invocation"}
								<div class="bg-muted my-2 rounded border p-2 text-xs">
									<div class="flex items-center gap-2">
										<span class="rounded bg-blue-100 px-1.5 py-0.5 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
											Step {part.toolInvocation.toolName === "getLocation" ? "1" : "2"}
										</span>
										<span class="text-muted-foreground">{part.toolInvocation.toolName}</span>
									</div>
									{#if part.toolInvocation.state === "result"}
										<div class="mt-1 text-green-600">→ {part.toolInvocation.result}</div>
									{/if}
								</div>
							{/if}
						{/each}
					</div>
				{/each}
			</div>
		{/if}
	</CardContent>
</Card>

