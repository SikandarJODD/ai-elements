<script lang="ts">
	import {
		Message,
		MessageAction,
		MessageActions,
		MessageAttachment,
		MessageAttachments,
		MessageBranch,
		MessageBranchContent,
		MessageBranchNext,
		MessageBranchPage,
		MessageBranchPrevious,
		MessageBranchSelector,
		MessageContent,
		MessageResponse,
		MessageToolbar,
	} from "$lib/components/ai-elements/new-message/index.js";

	import Copy from "@lucide/svelte/icons/copy";
	import RefreshCcw from "@lucide/svelte/icons/refresh-ccw";
	import ThumbsUp from "@lucide/svelte/icons/thumbs-up";
	import ThumbsDown from "@lucide/svelte/icons/thumbs-down";

	// Message type definition
	type MessageData = {
		key: string;
		from: "user" | "assistant";
		versions?: { id: string; content: string }[];
		content?: string;
		attachments?: {
			type: "file";
			url: string;
			mediaType?: string;
			filename?: string;
		}[];
	};

	// Sample messages data
	const messages: MessageData[] = [
		{
			key: crypto.randomUUID(),
			from: "user",
			content: "How does Svelte 5 runes system work and when should I use them?",
			attachments: [
				{
					type: "file",
					url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
					mediaType: "image/jpeg",
					filename: "svelte-5-banner.jpg",
				},
				{
					type: "file",
					url: "",
					mediaType: "application/pdf",
					filename: "svelte-5-runes-guide.pdf",
				},
			],
		},
		{
			key: crypto.randomUUID(),
			from: "assistant",
			versions: [
				{
					id: crypto.randomUUID(),
					content: `# Svelte 5 Runes Guide

Svelte 5 introduces **runes** - a powerful new reactivity system using special \`$\` prefixed functions. Here's what you need to know:

## Core Runes

### $state
Creates reactive state in your components:

\`\`\`svelte
\<script lang="ts"\>
  let count = $state(0);
\<\/script\>

<button onclick={() => count++}>
  Count: {count}
</button>
\`\`\`

### $derived
Computes values that automatically update when dependencies change:

\`\`\`svelte
\<script lang="ts"\>
  let count = $state(0);
  let doubled = $derived(count * 2);
  let message = $derived.by(() => {
    return count > 10 ? 'High!' : 'Low';
  });
\<\/script\>
\`\`\`

## When to Use Runes

- ✅ **Component state** - Use \`$state\` for reactive variables
- ✅ **Computed values** - Use \`$derived\` for values based on state
- ✅ **Side effects** - Use \`$effect\` when needed (but prefer \`watch()\` from runed)
- ✅ **Props** - Use \`$props()\` to declare component props

## Key Benefits

1. **Explicit reactivity** - Clear what's reactive vs static
2. **Works everywhere** - Runes work in .svelte.ts files too
3. **Better TypeScript** - Improved type inference

Would you like to explore \`$effect\`, \`$props\`, or \`$bindable\`?`,
				},
				{
					id: crypto.randomUUID(),
					content: `Svelte 5 runes are special compiler directives that make reactivity explicit. The most common ones are:

- **$state** - for creating reactive state
- **$derived** - for computed values
- **$props** - for component props
- **$effect** - for side effects (use sparingly)

Here's a simple example:

\`\`\`svelte
\<script lang="ts"\>
  let count = $state(0);
\<\/script\>

\<button onclick={() => count++}\>
  Clicked {count} times
\</button\>
\`\`\`

Which specific rune would you like to learn more about?`,
				},
				{
					id: crypto.randomUUID(),
					content: `Absolutely! Svelte 5 runes are a major evolution in how Svelte handles reactivity. They solve several problems:

## Key Benefits

1. **Explicit reactivity** - Clear what triggers updates
2. **Universal** - Works in .svelte and .svelte.ts files
3. **Better DX** - Improved TypeScript and tooling support

## Most Popular Runes

| Rune | Purpose |
|------|---------|
| $state | Create reactive state |
| $derived | Compute derived values |
| $props | Declare component props |
| $effect | Handle side effects |
| $bindable | Two-way binding props |
| $inspect | Debug reactive values |

The beauty of runes is they make Svelte's "magic" explicit while keeping the syntax clean. Want to dive into a specific rune?`,
				},
			],
		},
	];

	// State for liked/disliked messages
	let liked = $state<Record<string, boolean>>({});
	let disliked = $state<Record<string, boolean>>({});

	function handleCopy(content: string) {
		navigator.clipboard.writeText(content);
	}

	function handleRetry() {
		console.log("Retrying...");
	}

	function toggleLike(key: string) {
		liked[key] = !liked[key];
	}

	function toggleDislike(key: string) {
		disliked[key] = !disliked[key];
	}
</script>

<div class="flex flex-col gap-4">
	{#each messages as message (message.key)}
		<Message from={message.from}>
			{#if message.versions && message.versions.length > 1}
				<!-- Message with multiple versions (branching) -->
				<MessageBranch defaultBranch={0}>
					<MessageBranchContent content={message.versions}>
						{#snippet renderItem(version)}
							<MessageContent>
								<MessageResponse content={version.content} />
							</MessageContent>
						{/snippet}
					</MessageBranchContent>

					{#if message.from === "assistant"}
						<MessageToolbar>
							<MessageBranchSelector from={message.from}>
								<MessageBranchPrevious />
								<MessageBranchPage />
								<MessageBranchNext />
							</MessageBranchSelector>

							<MessageActions>
								<MessageAction
									label="Retry"
									onclick={handleRetry}
									tooltip="Regenerate response"
								>
									<RefreshCcw class="size-4" />
								</MessageAction>
								<MessageAction
									label="Like"
									onclick={() => toggleLike(message.key)}
									tooltip="Like this response"
								>
									<ThumbsUp
										class="size-4"
										fill={liked[message.key] ? "currentColor" : "none"}
									/>
								</MessageAction>
								<MessageAction
									label="Dislike"
									onclick={() => toggleDislike(message.key)}
									tooltip="Dislike this response"
								>
									<ThumbsDown
										class="size-4"
										fill={disliked[message.key] ? "currentColor" : "none"}
									/>
								</MessageAction>
								<MessageAction
									label="Copy"
									onclick={() => handleCopy(message.versions?.[0]?.content || "")}
									tooltip="Copy to clipboard"
								>
									<Copy class="size-4" />
								</MessageAction>
							</MessageActions>
						</MessageToolbar>
					{/if}
				</MessageBranch>
			{:else}
				<!-- Single version message -->
				<div>
					{#if message.attachments && message.attachments.length > 0}
						<MessageAttachments class="mb-2">
							{#each message.attachments as attachment (attachment.url || attachment.filename)}
								<MessageAttachment data={attachment} />
							{/each}
						</MessageAttachments>
					{/if}

					<MessageContent>
						{#if message.from === "assistant"}
							<MessageResponse content={message.content || ""} />
						{:else}
							{message.content}
						{/if}
					</MessageContent>

					{#if message.from === "assistant" && message.versions}
						<MessageActions>
							<MessageAction
								label="Retry"
								onclick={handleRetry}
								tooltip="Regenerate response"
							>
								<RefreshCcw class="size-4" />
							</MessageAction>
							<MessageAction
								label="Like"
								onclick={() => toggleLike(message.key)}
								tooltip="Like this response"
							>
								<ThumbsUp
									class="size-4"
									fill={liked[message.key] ? "currentColor" : "none"}
								/>
							</MessageAction>
							<MessageAction
								label="Dislike"
								onclick={() => toggleDislike(message.key)}
								tooltip="Dislike this response"
							>
								<ThumbsDown
									class="size-4"
									fill={disliked[message.key] ? "currentColor" : "none"}
								/>
							</MessageAction>
							<MessageAction
								label="Copy"
								onclick={() => handleCopy(message.content || "")}
								tooltip="Copy to clipboard"
							>
								<Copy class="size-4" />
							</MessageAction>
						</MessageActions>
					{/if}
				</div>
			{/if}
		</Message>
	{/each}
</div>
