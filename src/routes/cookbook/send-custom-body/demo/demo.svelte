<script lang="ts">
	import { Chat } from "@ai-sdk/svelte";
	import { DefaultChatTransport } from "ai";
	import { Card, CardContent } from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import LoaderIcon from "@lucide/svelte/icons/loader";
	import SendIcon from "@lucide/svelte/icons/send";
	import UserIcon from "@lucide/svelte/icons/user";

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

	let input = $state("Tell me about myself.");
	let isStreaming = $derived(chat.status === "streaming");

	// Check if we're waiting for initial response
	let showLoadingState = $derived(() => {
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

<Card>
	<CardContent class="space-y-4">
		<div class="grid grid-cols-2 gap-4">
			<div>
				<label for="name" class="text-muted-foreground mb-1 block text-xs">Name</label>
				<Input
					id="name"
					bind:value={userName}
					placeholder="Your name"
					disabled={isStreaming}
				/>
			</div>
			<div>
				<label for="age" class="text-muted-foreground mb-1 block text-xs">Age</label>
				<Input
					id="age"
					type="number"
					bind:value={userAge}
					placeholder="Age"
					disabled={isStreaming}
				/>
			</div>
		</div>

		<div class="bg-muted/50 rounded border p-2 text-xs">
			<span class="text-muted-foreground">Custom body:</span>
			<code class="ml-2">{"{"} name: "{userName}", age: {userAge} {"}"}</code>
		</div>

		<form onsubmit={handleSubmit} class="flex gap-2">
			<Input
				bind:value={input}
				placeholder="Say something..."
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

		<!-- Loading state with personalized message -->
		{#if showLoadingState()}
			<div class="animate-in fade-in rounded-lg border p-3">
				<div class="mb-2 flex items-center gap-2">
					<div class="bg-primary/10 flex size-8 items-center justify-center rounded-full">
						<UserIcon class="text-primary size-4" />
					</div>
					<div>
						<div class="bg-muted h-3 w-20 animate-pulse rounded"></div>
					</div>
				</div>
				<div class="space-y-1.5 pl-10">
					<div class="text-muted-foreground flex items-center gap-2 text-xs">
						<LoaderIcon class="size-3 animate-spin" />
						<span>Curating response for {userName}, age {userAge}...</span>
					</div>
					<div class="bg-muted h-3 w-3/4 animate-pulse rounded"></div>
					<div class="bg-muted h-3 w-1/2 animate-pulse rounded"></div>
				</div>
			</div>
		{/if}

		{#if chat.messages.length > 0 && !showLoadingState()}
			<div class="space-y-3">
				{#each chat.messages as message}
					<div class="text-sm">
						<span class="font-medium"
							>{message.role === "user" ? "User" : "Assistant"}:</span
						>
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
