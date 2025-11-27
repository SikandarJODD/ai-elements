<script lang="ts">
	import { Chat } from "@ai-sdk/svelte";
	import { DefaultChatTransport } from "ai";

	async function convertFilesToDataURLs(
		files: FileList
	): Promise<{ type: "file"; filename: string; mediaType: string; url: string }[]> {
		return Promise.all(
			Array.from(files).map(
				(file) =>
					new Promise<{
						type: "file";
						filename: string;
						mediaType: string;
						url: string;
					}>((resolve, reject) => {
						const reader = new FileReader();
						reader.onload = () => {
							resolve({
								type: "file",
								filename: file.name,
								mediaType: file.type,
								url: reader.result as string, // Data URL
							});
						};
						reader.onerror = reject;
						reader.readAsDataURL(file);
					})
			)
		);
	}

	let chat = $derived(
		new Chat({
			transport: new DefaultChatTransport({
				api: "/api/cookbook/chat-with-pdf",
			}),
		})
	);

	let input = $state("");
	let files = $state<FileList | undefined>(undefined);
	let fileInputRef: HTMLInputElement;

	let handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();

		const fileParts = files && files.length > 0 ? await convertFilesToDataURLs(files) : [];

		chat.sendMessage({
			role: "user",
			parts: [{ type: "text", text: input }, ...fileParts],
		});

		files = undefined;
		input = "";

		if (fileInputRef) {
			fileInputRef.value = "";
		}
	};
</script>

<div class="stretch mx-auto flex w-full max-w-md flex-col py-24">
	{#each chat.messages as message}
		<div class="whitespace-pre-wrap">
			{message.role === "user" ? "User: " : "AI: "}

			{#each message.parts as part}
				{#if part.type === "text"}
					<div>{part.text}</div>
				{/if}
			{/each}
		</div>
	{/each}

	<form
		class="fixed bottom-0 mb-8 w-full max-w-md space-y-2 rounded border border-gray-300 p-2 shadow-xl"
		onsubmit={handleSubmit}
	>
		<input
			type="file"
			onchange={(e) => {
				const target = e.currentTarget;
				if (target.files) {
					files = target.files;
				}
			}}
			multiple
			bind:this={fileInputRef}
		/>

		<input class="w-full p-2" bind:value={input} placeholder="Say something..." />
	</form>
</div>
