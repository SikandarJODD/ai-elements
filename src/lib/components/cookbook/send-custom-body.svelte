<script lang="ts">
	import { Chat } from "@ai-sdk/svelte";
	import { DefaultChatTransport } from "ai";

	let chat = $derived(
		new Chat({
			transport: new DefaultChatTransport({
				api: "/api/cookbook/send-custom-body",
			}),
		})
	);

	let value = $state("");
	// key down - API Call
	let generateMessage = async (e: KeyboardEvent) => {
		if (e.key === "Enter") {
			console.log("value", value);
			chat.sendMessage(
				{ text: value },
				{
					body: {
						name: "John",
						age: 30,
					},
				}
			);
			value = "";
		}
	};
</script>

<div class="flex h-screen flex-col items-center justify-center gap-4">
	<h3 class="w-full max-w-md text-2xl font-bold">Send Custom Body With Chat</h3>
	<div class="flex w-full max-w-md flex-col gap-2">
		{#each chat.messages as message}
			<div class="flex flex-col gap-1">
				<div class="font-semibold capitalize">{message.role}:</div>
				<div class="">
					{#each message.parts as part}
						{#if part.type === "text"}
							<div>
								{part.text}
							</div>
						{/if}
					{/each}
				</div>
			</div>
		{/each}
	</div>
	<div class="flex w-full max-w-md flex-col gap-1">
		<label for="prompt"> Enter Prompt</label>
		<input
			type="text"
			bind:value
			onkeydown={generateMessage}
			placeholder="Enter Message"
			class="rounded-lg border border-gray-300 p-2"
		/>
	</div>
</div>
