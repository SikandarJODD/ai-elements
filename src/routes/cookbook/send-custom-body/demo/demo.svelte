<script lang="ts">
	import { Chat } from "@ai-sdk/svelte";
	import { DefaultChatTransport } from "ai";
	import { Card, CardContent } from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";

	let userName = $state("Alice");
	let userAge = $state(25);

	let chat = $derived(
		new Chat({
			transport: new DefaultChatTransport({
				api: "/api/cookbook/send-custom-body",
				body: {
					name: userName,
					age: userAge,
				},
			}),
		})
	);

	let input = $state("Tell me something personalized!");

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!input.trim() || chat.status === "streaming") return;
		chat.sendMessage({ text: input });
		input = "";
	}
</script>

<Card>
	<CardContent class="space-y-4">
		<div class="grid grid-cols-2 gap-4">
			<div>
				<label class="text-muted-foreground mb-1 block text-xs">Name</label>
				<Input bind:value={userName} placeholder="Your name" />
			</div>
			<div>
				<label class="text-muted-foreground mb-1 block text-xs">Age</label>
				<Input type="number" bind:value={userAge} placeholder="Age" />
			</div>
		</div>

		<div class="bg-muted/50 rounded border p-2 text-xs">
			<span class="text-muted-foreground">Custom body:</span>
			<code class="ml-2">{"{"} name: "{userName}", age: {userAge} {"}"}</code>
		</div>

		<form onsubmit={handleSubmit} class="flex gap-2">
			<Input bind:value={input} placeholder="Say something..." class="flex-1" />
			<Button type="submit" disabled={chat.status === "streaming"}>
				{chat.status === "streaming" ? "..." : "Send"}
			</Button>
		</form>

		{#if chat.messages.length > 0}
			<div class="space-y-3">
				{#each chat.messages as message}
					<div class="text-sm">
						<span class="font-medium">{message.role === "user" ? "User" : "Assistant"}:</span>
						{#each message.parts as part}
							{#if part.type === "text"}
								<span class="whitespace-pre-wrap">{part.text}</span>
							{/if}
						{/each}
					</div>
				{/each}
			</div>
		{/if}
	</CardContent>
</Card>

