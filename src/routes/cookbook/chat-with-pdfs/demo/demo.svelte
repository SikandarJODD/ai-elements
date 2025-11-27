<script lang="ts">
	import { Chat } from "@ai-sdk/svelte";
	import { DefaultChatTransport } from "ai";
	import { Card, CardContent } from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import UploadIcon from "@lucide/svelte/icons/upload";

	async function convertFilesToDataURLs(files: FileList) {
		return Promise.all(
			Array.from(files).map(
				(file) =>
					new Promise<{ type: "file"; filename: string; mediaType: string; url: string }>(
						(resolve, reject) => {
							const reader = new FileReader();
							reader.onload = () => {
								resolve({
									type: "file",
									filename: file.name,
									mediaType: file.type,
									url: reader.result as string,
								});
							};
							reader.onerror = reject;
							reader.readAsDataURL(file);
						}
					)
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

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!input.trim() && !files?.length) return;

		const fileParts = files?.length ? await convertFilesToDataURLs(files) : [];

		chat.sendMessage({
			role: "user",
			parts: [{ type: "text", text: input }, ...fileParts],
		});

		files = undefined;
		input = "";
		if (fileInputRef) fileInputRef.value = "";
	}
</script>

<Card>
	<CardContent class="space-y-4">
		<div class="flex items-center gap-2 rounded-lg border border-dashed p-4">
			<UploadIcon class="text-muted-foreground size-5" />
			<input
				type="file"
				accept=".pdf"
				bind:this={fileInputRef}
				onchange={(e) => {
					if (e.currentTarget.files) files = e.currentTarget.files;
				}}
				class="text-sm"
			/>
		</div>

		{#if files?.length}
			<div class="text-sm text-green-600">📄 {files[0].name} ready</div>
		{/if}

		<form onsubmit={handleSubmit} class="flex gap-2">
			<Input bind:value={input} placeholder="Ask about the PDF..." class="flex-1" />
			<Button type="submit" disabled={chat.status === "streaming"}>
				{chat.status === "streaming" ? "..." : "Send"}
			</Button>
		</form>

		{#if chat.messages.length > 0}
			<div class="space-y-3">
				{#each chat.messages as message}
					<div class="text-sm">
						<span class="font-medium">{message.role === "user" ? "User" : "Assistant"}:</span>
						{#each message.parts as part}
							{#if part.type === "text"}
								<span class="whitespace-pre-wrap">{part.text}</span>
							{:else if part.type === "file"}
								<span class="text-muted-foreground"> [PDF: {part.filename}]</span>
							{/if}
						{/each}
					</div>
				{/each}
			</div>
		{/if}
	</CardContent>
</Card>

