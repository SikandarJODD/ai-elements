<script lang="ts">
	import {
		ChatContainerContent,
		ChatContainerRoot,
	} from "$lib/components/prompt-kit/chat-container";
	import { Message, MessageContent } from "$lib/components/prompt-kit/message";
	import {
		PromptInput,
		PromptInputAction,
		PromptInputActions,
		PromptInputTextarea,
	} from "$lib/components/prompt-kit/prompt-input";
	import { ScrollButton, setScrollContext } from "$lib/components/prompt-kit/scroll-button";
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import ArrowUpIcon from "@lucide/svelte/icons/arrow-up";
	import GlobeIcon from "@lucide/svelte/icons/globe";
	import MicIcon from "@lucide/svelte/icons/mic";
	import MoreHorizontalIcon from "@lucide/svelte/icons/more-horizontal";
	import PlusIcon from "@lucide/svelte/icons/plus";
	import MessageSquareIcon from "@lucide/svelte/icons/message-square";
	import PanelLeftIcon from "@lucide/svelte/icons/panel-left";
	import { watch } from "runed";

	const scrollContext = setScrollContext();

	let chatHistory = $state([
		{ id: 1, title: "CSS Grid Layout", date: "Today" },
		{ id: 2, title: "React Components", date: "Yesterday" },
		{ id: 3, title: "API Integration", date: "2 days ago" },
		{ id: 4, title: "TypeScript Basics", date: "Last week" },
	]);

	let messages = $state([
		{
			id: 1,
			role: "user",
			content: "Hello! Can you help me with a coding question?",
		},
		{
			id: 2,
			role: "assistant",
			content:
				"Of course! I'd be happy to help with your coding question. What would you like to know?",
		},
		{
			id: 3,
			role: "user",
			content: "How do I create a responsive layout with CSS Grid?",
		},
		{
			id: 4,
			role: "assistant",
			content:
				"Creating a responsive layout with CSS Grid is straightforward. Here's a basic example:\n\n```css\n.container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 1rem;\n}\n```",
		},
	]);

	let prompt = $state("");
	let isLoading = $state(false);
	let activeChat = $state(1);
	let containerRef = $state<HTMLDivElement | null>(null);

	watch(
		() => containerRef,
		() => {
			if (containerRef) {
				scrollContext.setElement(containerRef);
			}
		}
	);

	function handleSubmit() {
		if (!prompt.trim()) return;

		messages = [
			...messages,
			{
				id: messages.length + 1,
				role: "user",
				content: prompt,
			},
		];

		const userPrompt = prompt;
		prompt = "";
		isLoading = true;

		setTimeout(() => {
			messages = [
				...messages,
				{
					id: messages.length + 1,
					role: "assistant",
					content: `You asked: "${userPrompt}". This is a simulated response.`,
				},
			];
			isLoading = false;
		}, 1500);
	}

	function handleNewChat() {
		const newId = chatHistory.length + 1;
		chatHistory = [{ id: newId, title: "New Chat", date: "Today" }, ...chatHistory];
		activeChat = newId;
		messages = [];
	}

	function handleSelectChat(id: number) {
		activeChat = id;
		// In a real app, you would load the messages for this chat
	}
</script>

<Sidebar.Provider>
	<Sidebar.Root class="border-r">
		<Sidebar.Header class="border-b p-4">
			<Button onclick={handleNewChat} class="w-full">
				<PlusIcon class="mr-2 h-4 w-4" />
				New Chat
			</Button>
		</Sidebar.Header>
		<Sidebar.Content class="p-2">
			<Sidebar.Group>
				<Sidebar.GroupLabel>Chat History</Sidebar.GroupLabel>
				<Sidebar.GroupContent>
					<Sidebar.Menu>
						{#each chatHistory as chat (chat.id)}
							<Sidebar.MenuItem>
								<Sidebar.MenuButton
									isActive={activeChat === chat.id}
									onclick={() => handleSelectChat(chat.id)}
								>
									<MessageSquareIcon class="mr-2 h-4 w-4" />
									<div class="flex flex-col items-start">
										<span class="text-sm font-medium">{chat.title}</span>
										<span class="text-muted-foreground text-xs"
											>{chat.date}</span
										>
									</div>
								</Sidebar.MenuButton>
							</Sidebar.MenuItem>
						{/each}
					</Sidebar.Menu>
				</Sidebar.GroupContent>
			</Sidebar.Group>
		</Sidebar.Content>
	</Sidebar.Root>

	<Sidebar.Inset>
		<main class="bg-background flex h-screen max-h-screen flex-col">
			<div class="border-b p-4">
				<Sidebar.Trigger>
					<Button variant="ghost" size="icon">
						<PanelLeftIcon class="h-5 w-5" />
					</Button>
				</Sidebar.Trigger>
			</div>

			<div class="relative flex-1 overflow-hidden">
				<div bind:this={containerRef} class="h-full overflow-y-auto">
					<ChatContainerRoot class="h-full w-full">
						<ChatContainerContent class="space-y-12 px-4 py-12">
							{#each messages as message (message.id)}
								<Message
									class={message.role === "user"
										? "justify-end"
										: "justify-start"}
								>
									<MessageContent class="max-w-[80%]">
										{message.content}
									</MessageContent>
								</Message>
							{/each}
						</ChatContainerContent>
					</ChatContainerRoot>
				</div>
				<div
					class="absolute bottom-4 left-1/2 flex w-full max-w-3xl -translate-x-1/2 justify-end px-5"
				>
					<ScrollButton class="shadow-sm" />
				</div>
			</div>

			<div class="bg-background z-10 shrink-0 px-3 pb-3 md:px-5 md:pb-5">
				<div class="mx-auto max-w-3xl">
					<PromptInput
						{isLoading}
						value={prompt}
						onValueChange={(v) => (prompt = v)}
						onSubmit={handleSubmit}
						class="border-input bg-popover relative z-10 w-full rounded-3xl border p-0 pt-1 shadow-xs"
					>
						<div class="flex flex-col">
							<PromptInputTextarea
								placeholder="Ask anything"
								class="min-h-[44px] pt-3 pl-4 text-base leading-[1.3] sm:text-base md:text-base"
							/>

							<PromptInputActions
								class="mt-5 flex w-full items-center justify-between gap-2 px-3 pb-3"
							>
								<div class="flex items-center gap-2">
									<PromptInputAction>
										{#snippet tooltip()}
											<p>Add a new action</p>
										{/snippet}
										<Button
											variant="outline"
											size="icon"
											class="size-9 rounded-full"
										>
											<PlusIcon class="h-[18px] w-[18px]" />
										</Button>
									</PromptInputAction>

									<PromptInputAction>
										{#snippet tooltip()}
											<p>Search</p>
										{/snippet}
										<Button variant="outline" class="rounded-full">
											<GlobeIcon class="h-[18px] w-[18px]" />
											Search
										</Button>
									</PromptInputAction>

									<PromptInputAction>
										{#snippet tooltip()}
											<p>More actions</p>
										{/snippet}
										<Button
											variant="outline"
											size="icon"
											class="size-9 rounded-full"
										>
											<MoreHorizontalIcon class="h-[18px] w-[18px]" />
										</Button>
									</PromptInputAction>
								</div>
								<div class="flex items-center gap-2">
									<PromptInputAction>
										{#snippet tooltip()}
											<p>Voice input</p>
										{/snippet}
										<Button
											variant="outline"
											size="icon"
											class="size-9 rounded-full"
										>
											<MicIcon class="h-[18px] w-[18px]" />
										</Button>
									</PromptInputAction>

									<Button
										size="icon"
										disabled={!prompt.trim() || isLoading}
										onclick={handleSubmit}
										class="size-9 rounded-full"
									>
										{#if !isLoading}
											<ArrowUpIcon class="h-[18px] w-[18px]" />
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
		</main>
	</Sidebar.Inset>
</Sidebar.Provider>
