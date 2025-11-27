<script lang="ts">
	import { type ModelMessage } from "ai";

	let messages: ModelMessage[] = $state([]);

	let value = $state("");
	let isGenerating = $state(false);

	// key down - API Call
	let generateMessage = async (e: KeyboardEvent) => {
		if (e.key === "Enter") {
			isGenerating = true;
			console.log("value", value);
			messages.push({
				role: "user",
				content: value,
			});
			value = "";

			let response = await fetch("/api/cookbook/generate-chat-with-prompt", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					messages: messages,
				}),
			});
			let data = await response.json();
			isGenerating = false;
			messages.push(...data);
		}
	};
</script>

<div class="flex h-screen flex-col items-center justify-center gap-4">
	<h3 class="text-2xl font-bold">Generate Chat with Prompt</h3>
	<div class="flex w-full max-w-md flex-col gap-2">
		{#each messages as message}
			<div class="flex flex-col gap-1">
				<div class="font-semibold capitalize">{message.role}:</div>
				<div class="">
					{#if typeof message.content === "string"}
						{message.content}
					{:else}
						{#each message.content.filter((part) => part.type === "text") as part}
							<div>{part.text}</div>
						{/each}
					{/if}
				</div>
			</div>
		{/each}

		{#if isGenerating}
			<div class="flex flex-col gap-1">
				<div class="font-semibold capitalize">Assistant:</div>
				<div class="flex items-center gap-2">
					<div
						class="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"
					></div>
					<span class="text-gray-500">Generating...</span>
				</div>
			</div>
		{/if}
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
