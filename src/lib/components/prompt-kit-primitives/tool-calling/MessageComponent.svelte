<script lang="ts">
	import { cn } from "$lib/utils/utils";
	import Message from "$lib/components/prompt-kit/message/Message.svelte";
	import MessageContent from "$lib/components/prompt-kit/message/MessageContent.svelte";
	import MessageActions from "$lib/components/prompt-kit/message/MessageActions.svelte";
	import MessageAction from "$lib/components/prompt-kit/message/MessageAction.svelte";
	import { ToolComposed } from "$lib/components/prompt-kit/tool";
	import type { ToolPart } from "$lib/components/prompt-kit/tool";
	import {
		Reasoning,
		ReasoningTrigger,
		ReasoningContent,
	} from "$lib/components/prompt-kit/reasoning";
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

	// ============================================================================
	// TOOL PARTS RENDERING STRATEGY
	// ============================================================================
	// Choose one of the two approaches below:

	// APPROACH 1: Show ONLY the latest tool state (Default)
	// This shows only the current/final state of the tool
	let toolParts = $derived(
		message.parts.filter((part) => part.type && part.type.startsWith("tool-"))
	);

	// APPROACH 2: Show ALL tool state progressions
	// Uncomment the code below to show tool execution history: Processing → Ready → Completed
	// Useful for showing tool state transitions like reasoning traces
	// Comment out APPROACH 1 above and uncomment the code below:

	// let toolPartsHistory = $state<any[]>([]);

	// $effect(() => {
	// 	const currentToolParts = message.parts.filter(
	// 		(part) => part.type && part.type.startsWith("tool-")
	// 	);

	// 	if (currentToolParts.length > 0) {
	// 		currentToolParts.forEach((currentPart: any) => {
	// 			const tp = currentPart as ToolPart;
	// 			const key = `${tp.toolCallId}-${tp.state}`;

	// 			// Only add new states we haven't seen before
	// 			const existsInHistory = toolPartsHistory.some((historicalPart: any) => {
	// 				const htp = historicalPart as ToolPart;
	// 				return `${htp.toolCallId}-${htp.state}` === key;
	// 			});

	// 			if (!existsInHistory) {
	// 				toolPartsHistory = [...toolPartsHistory, { ...currentPart }];
	// 			}
	// 		});
	// 	}
	// });

	// let toolParts = $derived(toolPartsHistory);
	// ============================================================================

	// Extract reasoning parts from the message
	let reasoningParts = $derived(message.parts.filter((part) => part.type === "reasoning"));

	// Check if currently streaming reasoning (last part of last message)
	let isStreamingReasoning = $derived((index: number) => {
		return index === reasoningParts.length - 1 && isLastMessage;
	});

	// just for debugging
	// $inspect(toolParts, "Tool Parts");
</script>

<Message
	class={cn(
		"mx-auto flex w-full max-w-3xl flex-col gap-2 px-2 md:px-10",
		isAssistant ? "items-start" : "items-end"
	)}
>
	{#if isAssistant}
		<div class="group flex w-full flex-col gap-0 space-y-2">
			{#if reasoningParts.length > 0}
				<div class="w-full space-y-2">
					{#each reasoningParts as part, index (index)}
						<Reasoning class="w-full" isStreaming={isStreamingReasoning(index)}>
							<ReasoningTrigger>Reasoning</ReasoningTrigger>
							<ReasoningContent markdown content={part.text}></ReasoningContent>
						</Reasoning>
					{/each}
				</div>
			{/if}

			{#if toolParts.length > 0}
				<div class="w-full space-y-2">
					{#each toolParts as part, index (`${(part as ToolPart).toolCallId}-${(part as ToolPart).state || part.type}-${index}`)}
						{@const toolPart = part as ToolPart}
						<ToolComposed
							{toolPart}
							defaultOpen={toolPart.state === "output-available" ||
								toolPart.state === "output-error"}
						/>
					{/each}
				</div>
			{/if}

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
