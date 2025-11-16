<script lang="ts">
	import { cn } from "$lib/utils/utils";
	import Message from "$lib/components/prompt-kit/message/Message.svelte";
	import MessageContent from "$lib/components/prompt-kit/message/MessageContent.svelte";
	import MessageActions from "$lib/components/prompt-kit/message/MessageActions.svelte";
	import MessageAction from "$lib/components/prompt-kit/message/MessageAction.svelte";
	import { Button } from "$lib/components/ui/button";
	import { Copy, ThumbsUp, ThumbsDown } from "@lucide/svelte";
	import type { UIMessage } from "ai";

	let {
		message,
		isLastMessage = false,
	}: {
		message: UIMessage;
		isLastMessage?: boolean;
	} = $props();

	const isAssistant = $derived(message.role === "assistant");

	const messageText = $derived(
		message.parts.map((part) => (part.type === "text" ? part.text : "")).join("")
	);
</script>

<Message
	class={cn(
		"mx-auto flex w-full max-w-3xl flex-col gap-2 px-2 md:px-10",
		isAssistant ? "items-start" : "items-end"
	)}
>
	{#if isAssistant}
		<div class="group flex w-full flex-col gap-0">
			<MessageContent
				class="text-foreground prose w-full min-w-0 flex-1 rounded-lg bg-transparent p-0"
				markdown={true}
				content={messageText}
			/>
			<MessageActions
				class={cn(
					"-ml-2.5 flex gap-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100",
					isLastMessage && "opacity-100"
				)}
			>
				<MessageAction delayDuration={100}>
					{#snippet tooltip()}
						Copy
					{/snippet}
					<Button variant="ghost" size="icon" class="rounded-full">
						<Copy class="h-4 w-4" />
					</Button>
				</MessageAction>
				<MessageAction delayDuration={100}>
					{#snippet tooltip()}
						Upvote
					{/snippet}
					<Button variant="ghost" size="icon" class="rounded-full">
						<ThumbsUp class="h-4 w-4" />
					</Button>
				</MessageAction>
				<MessageAction delayDuration={100}>
					{#snippet tooltip()}
						Downvote
					{/snippet}
					<Button variant="ghost" size="icon" class="rounded-full">
						<ThumbsDown class="h-4 w-4" />
					</Button>
				</MessageAction>
			</MessageActions>
		</div>
	{:else}
		<div class="group flex w-full flex-col items-end gap-1">
			<MessageContent
				class="bg-muted text-primary max-w-[85%] rounded-3xl px-5 py-2.5 whitespace-pre-wrap sm:max-w-[75%]"
			>
				{messageText}
			</MessageContent>
			<MessageActions
				class={cn(
					"flex gap-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
				)}
			>
				<MessageAction delayDuration={100}>
					{#snippet tooltip()}
						Copy
					{/snippet}
					<Button variant="ghost" size="icon" class="rounded-full">
						<Copy class="h-4 w-4" />
					</Button>
				</MessageAction>
			</MessageActions>
		</div>
	{/if}
</Message>
