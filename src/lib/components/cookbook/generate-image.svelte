<script lang="ts">
	import { Chat } from "@ai-sdk/svelte";
	import { DefaultChatTransport, type UIMessage } from "ai";
	import type { ChatTools } from "../../../routes/api/cookbook/generate-image/+server";

	type ChatMessage = UIMessage<never, never, ChatTools>;

	let chat = $derived(
		new Chat<ChatMessage>({
			transport: new DefaultChatTransport({
				api: "/api/generate-image",
			}),
		})
	);

	let input = $state("");

	let handleSubmit = (e: SubmitEvent) => {
		e.preventDefault();

		chat.sendMessage({
			parts: [{ type: "text", text: input }],
		});

		input = "";
	};
</script>

<div class="stretch mx-auto flex w-full max-w-md flex-col py-24">
	<div class="space-y-4">
		{#each chat.messages as message}
			<div class="whitespace-pre-wrap">
				<div>
					<div class="font-bold">{message.role}</div>
					{#each message.parts as part, partIndex}
						{#if part.type === "text"}
							<div>
								{part.text}
							</div>
						{:else if part.type === "tool-generateImageTool"}
							{#if part.state === "input-available"}
								<div>Generating image...</div>
							{:else if part.state === "output-available"}
								<img
									src={`data:image/png;base64,${part.output.image}`}
									alt={part.input.prompt}
									width="400"
									height="400"
									class="rounded border-2 border-dashed border-gray-300 p-2"
								/>
							{/if}
						{/if}
					{/each}
				</div>
			</div>
		{/each}
	</div>

	<form onsubmit={handleSubmit}>
		<input
			class="fixed bottom-0 mb-8 w-full max-w-md rounded border border-gray-300 p-2 shadow-xl"
			bind:value={input}
			placeholder="Say something..."
		/>
	</form>
</div>
