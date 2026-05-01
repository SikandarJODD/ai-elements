<script lang="ts">
	import { Chat } from "@ai-sdk/svelte";
	import { DefaultChatTransport } from "ai";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import LoaderIcon from "@lucide/svelte/icons/loader";
	import SendIcon from "@lucide/svelte/icons/send";

	let chat = new Chat({
		transport: new DefaultChatTransport({
			// add your own API Endpoint path here
			api: "/api/cookbook/stream-text",
		}),
	});

	let input = $state("What is Svelte?"); // Default Prompt

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		chat.sendMessage({ text: input });
		input = "";
	}
</script>

<div class="bg-secondary/30 w-full rounded-xl border p-4">
	<!-- Input Area -->
	<form onsubmit={handleSubmit}>
		<div class="flex gap-2">
			<Input bind:value={input} placeholder="Type your message..." class="flex-1" />
			<Button
				type="submit"
				disabled={!input.trim() || chat.status === "streaming"}
				class="shrink-0"
			>
				{#if chat.status === "streaming"}
					<LoaderIcon class="size-4 animate-spin" />
				{:else}
					<SendIcon class="size-4" />
				{/if}
			</Button>
		</div>
	</form>
	<!-- Chat Messages -->
	<div class="mt-4 flex h-50 flex-col overflow-y-auto">
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
							<!-- type can be text, file, reasoning, dynamic-tool -->
							{#if part.type === "text"}
								<span class="whitespace-pre-wrap">{part.text}</span>
							{/if}
						{/each}
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
