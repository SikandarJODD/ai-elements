<script lang="ts">
	import { Chat } from "@ai-sdk/svelte";
	import { DefaultChatTransport } from "ai";
	import { Button } from "$lib/components/ui/button";
	import { ArrowUp } from "@lucide/svelte";
	import {
		ChatContainerRoot,
		ChatContainerContent,
	} from "$lib/components/prompt-kit/chat-container";
	import {
		PromptInput,
		PromptInputTextarea,
		PromptInputActions,
	} from "$lib/components/prompt-kit/prompt-input";
	import MessageComponent from "./MessageComponent.svelte";
	import LoadingMessage from "./LoadingMessage.svelte";
	import ErrorMessage from "./ErrorMessage.svelte";

	let inputValue = $state("");

	let chat = $derived(
		new Chat({
			transport: new DefaultChatTransport({
				api: "/api/primitives/full-chat-app",
			}),
		})
	);

	const handleSubmit = () => {
		if (!inputValue.trim()) return;

		chat.sendMessage({ text: inputValue });
		inputValue = "";
	};

	const isLoading = $derived(chat.status !== "ready");
</script>

<div class="flex h-[calc(100vh-4rem)] w-full flex-col overflow-hidden">
	<ChatContainerRoot
		class="relative mx-auto h-full w-full max-w-3xl flex-1 space-y-0 overflow-y-auto"
	>
		<ChatContainerContent class="min-w-full space-y-2 py-12">
			{#each chat.messages as message, index}
				{@const isLastMessage = index === chat.messages.length - 1}
				<MessageComponent {message} {isLastMessage} />
			{/each}

			{#if chat.status === "submitted"}
				<LoadingMessage />
			{/if}

			{#if chat.status === "error" && chat.error}
				<ErrorMessage error={chat.error} />
			{/if}
		</ChatContainerContent>
	</ChatContainerRoot>

	<div class="inset-x-0 bottom-0 mx-auto w-full max-w-3xl shrink-0 px-3 pb-3 md:px-5 md:pb-5">
		<PromptInput
			{isLoading}
			value={inputValue}
			onValueChange={(value) => (inputValue = value)}
			onSubmit={handleSubmit}
			class="border-input bg-popover relative z-10 w-full rounded-3xl border p-0 pt-1 shadow-xs"
		>
			<div class="flex flex-col">
				<PromptInputTextarea
					placeholder="Ask anything"
					class="min-h-[44px] pt-3 pl-4 text-base leading-[1.3] sm:text-base md:text-base"
				/>

				<PromptInputActions class="mt-3 flex w-full items-center justify-between gap-2 p-2">
					<div></div>
					<div class="flex items-center gap-2">
						<Button
							size="icon"
							disabled={!inputValue.trim() ||
								(chat.status !== "ready" && chat.status !== "error")}
							onclick={handleSubmit}
							class="size-9 rounded-full"
						>
							{#if chat.status === "ready" || chat.status === "error"}
								<ArrowUp size={18} />
							{:else}
								<span class="size-3 rounded-xs bg-white"></span>
							{/if}
						</Button>
					</div>
				</PromptInputActions>
			</div>
		</PromptInput>
	</div>
</div>
