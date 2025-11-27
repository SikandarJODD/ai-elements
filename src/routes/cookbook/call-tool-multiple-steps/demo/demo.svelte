<script lang="ts">
	import { Chat } from "@ai-sdk/svelte";
	import { DefaultChatTransport } from "ai";
	import { Card, CardContent } from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { ToolComposed } from "$lib/components/prompt-kit/tool";
	import type { ToolPart } from "$lib/components/prompt-kit/tool";

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

	// Convert AI SDK tool part to ToolPart format
	function toToolPart(part: any): ToolPart {
		return {
			type: part.toolName,
			state: part.state,
			input: part.input,
			output: part.output,
			toolCallId: part.toolCallId,
			errorText: part.errorText,
		};
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
			<div class="space-y-4">
				{#each chat.messages as message}
					<div class="space-y-2">
						<div class="text-muted-foreground text-xs font-medium uppercase">
							{message.role === "user" ? "You" : "Assistant"}
						</div>
						{#each message.parts as part}
							{#if part.type === "text"}
								<p class="text-sm whitespace-pre-wrap">{part.text}</p>
							{:else if part.type.startsWith("tool-")}
								{@const toolPart = toToolPart(part)}
								<ToolComposed
									{toolPart}
									defaultOpen={toolPart.state === "output-available"}
									class="max-w-full"
								/>
							{/if}
						{/each}
					</div>
				{/each}
			</div>
		{/if}
	</CardContent>
</Card>
