<script lang="ts">
	import { Action, Actions } from "$lib/components/ai-elements/action/index.js";
	import { Message, MessageContent } from "$lib/components/ai-elements/message/index.js";
	import { Copy, Heart, RefreshCcw, Share, ThumbsDown, ThumbsUp } from "@lucide/svelte";

	// Using Svelte 5 state runes
	let liked = $state(false);
	let disliked = $state(false);
	let favorited = $state(false);

	const responseContent = `This is a response from an assistant.

Try hovering over this message to see the actions appear!`;

	const handleRetry = () => {
		console.log("Retrying request...");
	};

	const handleCopy = (content?: string) => {
		console.log("Copied:", content);
	};

	const handleShare = (content?: string) => {
		console.log("Sharing:", content);
	};

	const actions = [
		{
			icon: RefreshCcw,
			label: "Retry",
			onClick: handleRetry,
		},
		{
			icon: ThumbsUp,
			label: "Like",
			onClick: () => (liked = !liked),
		},
		{
			icon: ThumbsDown,
			label: "Dislike",
			onClick: () => (disliked = !disliked),
		},
		{
			icon: Copy,
			label: "Copy",
			onClick: () => handleCopy(responseContent),
		},
		{
			icon: Share,
			label: "Share",
			onClick: () => handleShare(responseContent),
		},
		{
			icon: Heart,
			label: "Favorite",
			onClick: () => (favorited = !favorited),
		},
	];
</script>

<div class="px-4">
	<Message class="group flex flex-col items-start gap-2 " from="assistant">
		<MessageContent>{responseContent}</MessageContent>
		<Actions class="mt-2 opacity-0 group-hover:opacity-100">
			{#each actions as action (action.label)}
				{@const Icon = action.icon}
				<Action label={action.label} onclick={action.onClick}>
					<Icon class="size-4" />
				</Action>
			{/each}
		</Actions>
	</Message>
</div>
