<script lang="ts">
	import { Chat } from "@ai-sdk/svelte";

	let chat = new Chat({});
	let input = $state("");

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!input.trim()) return;
		chat.sendMessage({ text: input });
		input = "";
	}
</script>

<div class="p-4 space-y-4">
	<form onsubmit={handleSubmit} class="flex gap-2 max-w-md ">
		<input bind:value={input} class="flex-1 border px-4 py-2 rounded-full" placeholder="Ask anything..." />
		<button type="submit" class="bg-blue-500 text-white px-4 rounded-full"> Send </button>
	</form>

	{#each chat.messages as message}
		<div class="mb-2">
			<strong>{message.role === "user" ? "You" : "AI"}:</strong>
			{#each message.parts as part}
				{#if part.type === "text"}
					<span>{part.text}</span>
				{/if}
			{/each}
		</div>
	{/each}
</div>
