<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Textarea } from "$lib/components/ui/textarea";
	import type { ModelMessage } from "ai";

	let value = $state("What is Life?"); // Default Prompt
	let messages = $state<ModelMessage[]>([]);

	let handleSubmit = async () => {
		if (!value.trim()) return;
		// Add user prompt to messages
		messages = [...messages, { role: "user", content: value }];

		const response = await fetch("/api/cookbook/generate-text", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ messages }),
		});

		const data = await response.json();
		value = "";
		// Append AI response to messages
		messages = [...messages, ...data.messages];
	};
</script>

<div>
	<div class="flex flex-col gap-2 p-2">
		<Textarea
			bind:value
			placeholder="What is Life ?...Type Anything"
			onkeydown={(e) => {
				if (e.key === "Enter" && !e.shiftKey) {
					e.preventDefault();
					handleSubmit();
				}
			}}
		/>
		<Button type="submit" class="self-end" onclick={handleSubmit}>Submit</Button>
	</div>
	<!-- Generate text messages -->
	<div class="mt-4">
		{#each messages as message}
			<div class="font-semibold">{message.role}:</div>
			<div>
				{#if typeof message.content === "string"}
					{message.content}
				{:else}
					{#each message.content as part}
						{#if part.type === "text"}
							{part.text}
						{/if}
					{/each}
				{/if}
			</div>
		{/each}
	</div>
</div>
