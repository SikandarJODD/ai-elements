<script lang="ts">
  import Actions from "$lib/components/ai-elements/action/Actions.svelte";
  import Action from "$lib/components/ai-elements/action/Action.svelte";
  import {
    Copy,
    Heart,
    RefreshCcw,
    Share,
    ThumbsDown,
    ThumbsUp,
  } from "@lucide/svelte";

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
  class="group flex flex-col items-start gap-2 max-w-lg p-4 rounded-lg bg-gray-100 dark:bg-gray-800 border"
>
  <!-- Message content -->
  <div class="whitespace-pre-wrap text-sm leading-relaxed">
    {responseContent}
  </div>

  <!-- Actions with hover effect -->
  <Actions
    class="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
  >
    {#each actions as action (crypto.randomUUID())}
      {@const Icon = action.icon}
      <Action
        label={action.label}
        tooltip={action.label}
        onclick={action.onClick}
      >
        <Icon class="size-3" />
      </Action>
    {/each}
  </Actions>
</div>

<!-- Debug state display -->
<div class="mt-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg text-xs">
  <p class="text-gray-600 dark:text-gray-400">
    State: Liked: {liked} | Disliked: {disliked} | Favorited: {favorited}
  </p>
</div>
