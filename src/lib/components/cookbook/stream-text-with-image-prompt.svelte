<script lang="ts">
	import { Chat } from "@ai-sdk/svelte";
	import { DefaultChatTransport } from "ai";

	let chat = $derived(
		new Chat({
			transport: new DefaultChatTransport({
				api: "/api/cookbook/stream-text-image-prompt",
			}),
		})
	);

	let input = $state("");
	let imageUrl = $state(
		"https://science.nasa.gov/wp-content/uploads/2023/09/web-first-images-release.png"
	);

	let handleSubmit = (e: SubmitEvent) => {
		e.preventDefault();

		// Build parts array conditionally
		const parts = [
			// Add file part if imageUrl is not empty
			...(imageUrl.trim().length > 0
				? [
						{
							type: "file" as const,
							mediaType: "image/png",
							url: imageUrl,
						},
					]
				: []),
			{ type: "text" as const, text: input },
		];

		chat.sendMessage({
			role: "user",
			parts,
		});

		input = "";
		imageUrl = "";
	};
</script>

<div class="mx-auto flex w-full max-w-2xl flex-col py-24">
	<div class="mb-8 space-y-4">
		{#each chat.messages as m}
			<div class="border-b pb-4">
				<span class="font-bold">{m.role === "user" ? "User: " : "AI: "}</span>
				<div class="mt-2">
					{#each m.parts as part, i}
						{#if part.type === "text"}
							<div class="whitespace-pre-wrap">{part.text}</div>
						{:else if part.type === "file"}
							<img
								src={part.url}
								alt={part.filename ?? "image"}
								class="mt-2 max-w-md rounded border border-gray-300"
							/>
						{/if}
					{/each}
				</div>
			</div>
		{/each}
	</div>

	<form onsubmit={handleSubmit} class="space-y-4">
		<div class="flex flex-col gap-2">
			<label for="image-url" class="font-medium">Image URL:</label>
			<input
				id="image-url"
				bind:value={imageUrl}
				placeholder="Enter image URL..."
				class="rounded border border-gray-300 p-2"
			/>
		</div>
		<div class="flex flex-col gap-2">
			<label for="image-description" class="font-medium">Prompt:</label>
			<input
				id="image-description"
				bind:value={input}
				placeholder="What does the image show..."
				class="rounded border border-gray-300 p-2"
			/>
		</div>
		<button
			type="submit"
			class="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
		>
			Send Message
		</button>
	</form>
</div>
