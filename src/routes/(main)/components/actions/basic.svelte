<script lang="ts">
	import { Actions, Action } from "$lib/components/ai-elements/action/index.js";
	import { Copy, RefreshCcw, Share, ThumbsDown, ThumbsUp, ThumbsUpIcon } from "@lucide/svelte";

	// Define message type
	type Message = {
		key: string;
		from: "user" | "assistant";
		content: string;
		avatar: string;
		name: string;
	};

	const messages: Message[] = [
		{
			key: crypto.randomUUID(),
			from: "user",
			content: "Hello, how are you?",
			avatar: "https://github.com/haydenbleasel.png",
			name: "Hayden Bleasel",
		},
		{
			key: crypto.randomUUID(),
			from: "assistant",
			content: "I am fine, thank you!",
			avatar: "https://github.com/openai.png",
			name: "OpenAI",
		},
	];

	// Using Svelte 5 state runes
	let liked = $state(false);
	let disliked = $state(false);
	let favorited = $state(false);

	const handleRetry = () => {
		console.log("Retry clicked");
	};

	const handleCopy = () => {
		console.log("Copy clicked");
	};

	const handleShare = () => {
		console.log("Share clicked");
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
			onClick: handleCopy,
		},
		{
			icon: Share,
			label: "Share",
			onClick: handleShare,
		},
	];
</script>

<!-- Simplified conversation layout since conversation/message components don't exist yet -->
<div class="relative mx-auto w-full max-w-2xl space-y-4 p-4">
	{#each messages as message (message.key)}
		<div
			class="flex flex-col gap-2 {message.from === 'assistant' ? 'items-start' : 'items-end'}"
		>
			<!-- Message content -->
			<div
				class="max-w-[80%] rounded-lg px-4 py-2 {message.from === 'assistant'
					? 'dark:bg-secondary bg-gray-100'
					: 'bg-blue-500 text-white'}"
			>
				<p>{message.content}</p>
			</div>

			<!-- Actions for assistant messages only -->
			{#if message.from === "assistant"}
				<Actions class="mt-2">
					{#each actions as action (action.label)}
						{@const Icon = action.icon}
						<Action
							label={action.label}
							tooltip={action.label}
							onclick={action.onClick}
						>
							<Icon class="size-4" />
						</Action>
					{/each}
				</Actions>
			{/if}
		</div>
	{/each}
</div>

<!-- Debug state display -->
<!-- <div class="mt-8 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
  <h3 class="text-sm font-medium mb-2">Debug State:</h3>
  <p class="text-xs text-gray-600 dark:text-gray-400">
    Liked: {liked} | Disliked: {disliked} | Favorited: {favorited}
  </p>
</div> -->
