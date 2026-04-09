<script lang="ts">
	import * as PromptInput from "$lib/components/ai-elements/prompt-input-new";
	import type { Message } from "$lib/components/ai-elements/prompt-input-new";
	import { Chat } from "@ai-sdk/svelte";
	let chat = new Chat({});

	function handleSubmit(message: Message) {
		// if (!message.text.trim() && !message.files?.length) {
		// 	return;
		// }

		chat.sendMessage({
			text: message.text,
			files: message.files,
		});
	}
</script>

<div class="flex min-h-[70vh] items-center justify-center">
	<div class="space-y-4">
		<PromptInput.Root class="w-xl" onSubmit={handleSubmit}>
			<PromptInput.Body>
				<PromptInput.Textarea />
			</PromptInput.Body>
			<PromptInput.Toolbar class="justify-end">
				<PromptInput.Submit status={chat.status} />
			</PromptInput.Toolbar>
		</PromptInput.Root>
		<div class="max-w-xl rounded-md border p-4">
			{#if chat.messages.length > 0}
				<h2 class="text-lg font-bold">Chat Messages:</h2>
				<ul class="list-disc pl-5">
					{#each chat.messages as message}
						<div>{message.role}</div>
						{#each message.parts as part}
							{#if part.type === "text"}
								<p>{part.text}</p>
							{:else if part.type === "file"}
								<div class="mt-1 text-sm">
									{#if part.mediaType?.startsWith("image/")}
										<img
											alt={part.filename ?? "Uploaded file"}
											class="mt-1 max-h-40 rounded border"
											src={part.url}
										/>
									{:else}
										<a
											class="text-blue-600 underline"
											href={part.url}
											rel="noreferrer"
											target="_blank"
										>
											{part.filename ?? "Attached file"}
										</a>
									{/if}
								</div>
							{/if}
						{/each}
					{/each}
				</ul>
			{:else}
				<p>No messages yet.</p>
			{/if}
		</div>
	</div>
</div>
