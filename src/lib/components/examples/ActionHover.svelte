<script lang="ts">
	import { Action, Actions } from "$lib/components/ai-elements/action/index.js";
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

<!-- Simplified message component with hover effects -->
<div
	class="group flex max-w-lg flex-col items-start gap-2 rounded-lg border bg-gray-100 p-4 dark:bg-gray-800"
>
	<!-- Message content -->
	<div class="text-sm leading-relaxed whitespace-pre-wrap">
		{responseContent}
	</div>

	<!-- Actions with hover effect -->
	<Actions class="mt-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
		{#each actions as action (crypto.randomUUID())}
			{@const Icon = action.icon}
			<Action label={action.label} tooltip={action.label} onclick={action.onClick}>
				<Icon class="size-3" />
			</Action>
		{/each}
	</Actions>
</div>

<!-- Debug state display -->
<div class="mt-4 rounded-lg bg-gray-50 p-3 text-xs dark:bg-gray-900">
	<p class="text-gray-600 dark:text-gray-400">
		State: Liked: {liked} | Disliked: {disliked} | Favorited: {favorited}
	</p>
</div>
