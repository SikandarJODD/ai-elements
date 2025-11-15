<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import { Subheading } from "$lib/components/docs";
	import Playground from "$lib/components/docs/playground.svelte";
	import AiInstallCommand from "$lib/components/docs/ai-install-command.svelte";
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";

	import PromptInputWithActions from "$lib/components/prompt-kit-blocks/prompt-input-with-actions.svelte";
	import PromptInputWithSuggestions from "$lib/components/prompt-kit-blocks/prompt-input-with-suggestions.svelte";
	import PromptInputWithAutocomplete from "$lib/components/prompt-kit-blocks/prompt-input-with-autocomplete.svelte";
	import BasicFullConversation from "$lib/components/prompt-kit-blocks/basic-full-conversation.svelte";
	import ConversationWithAvatars from "$lib/components/prompt-kit-blocks/conversation-with-avatars.svelte";
	import ConversationWithActions from "$lib/components/prompt-kit-blocks/conversation-with-actions.svelte";
	import ConversationWithScroll from "$lib/components/prompt-kit-blocks/conversation-with-scroll.svelte";
	import ConversationWithPromptInput from "$lib/components/prompt-kit-blocks/conversation-with-prompt-input.svelte";
	import FullChatApp from "$lib/components/prompt-kit-blocks/full-chat-app.svelte";

	// Import raw code for display
	import promptInputWithActionsRaw from "$lib/components/prompt-kit-blocks/prompt-input-with-actions.svelte?raw";
	import promptInputWithSuggestionsRaw from "$lib/components/prompt-kit-blocks/prompt-input-with-suggestions.svelte?raw";
	import promptInputWithAutocompleteRaw from "$lib/components/prompt-kit-blocks/prompt-input-with-autocomplete.svelte?raw";
	import basicFullConversationRaw from "$lib/components/prompt-kit-blocks/basic-full-conversation.svelte?raw";
	import conversationWithAvatarsRaw from "$lib/components/prompt-kit-blocks/conversation-with-avatars.svelte?raw";
	import conversationWithActionsRaw from "$lib/components/prompt-kit-blocks/conversation-with-actions.svelte?raw";
	import conversationWithScrollRaw from "$lib/components/prompt-kit-blocks/conversation-with-scroll.svelte?raw";
	import conversationWithPromptInputRaw from "$lib/components/prompt-kit-blocks/conversation-with-prompt-input.svelte?raw";
	import fullChatAppRaw from "$lib/components/prompt-kit-blocks/full-chat-app.svelte?raw";

	import * as Toc from "$lib/components/docs/toc";
	import { UseToc } from "$lib/hooks/use-toc.svelte";
	let toc = new UseToc();
</script>

<MetaTags
	title="Blocks - Svelte Prompt Kit"
	description="UI blocks for AI applications, built with prompt-kit components. Ready-to-use examples for chat interfaces, conversations, and AI interactions."
	openGraph={{
		title: "Blocks - Svelte Prompt Kit",
		description:
			"UI blocks for AI applications, built with prompt-kit components. Ready-to-use examples for chat interfaces, conversations, and AI interactions.",
		type: "website",
		url: "https://svelte-ai-elements.vercel.app//prompt-kit/blocks",
		images: [
			{
				url: "https://svelte-ai-elements.vercel.app//assets/svelte-ai-elements.png",
				width: 1200,
				height: 630,
				alt: "Svelte AI Elements - Prompt Kit Blocks",
				type: "image/png",
			},
		],
	}}
/>

<Sidebar.Inset class="min-h-svh">
	<div
		class="grid min-h-svh grid-cols-1 gap-8 md:grid-cols-[1fr_280px] md:px-6 md:pb-6 lg:grid-cols-[1fr_240px]"
	>
		<!-- Main Content Area -->
		<main class="min-w-0" bind:this={toc.ref}>
			<!-- Title -->
			<Subheading class="md:text-3xl">Blocks</Subheading>

			<!-- Description -->
			<p class="text-muted-foreground my-4 text-base leading-relaxed sm:text-lg">
				UI blocks for AI applications, built with prompt-kit components. Copy and paste
				these blocks into your project to quickly build chat interfaces, conversations, and
				AI interactions.
			</p>

			<!-- Prompt Input Blocks -->
			<Subheading>Prompt Input Blocks</Subheading>

			<!-- Prompt Input with Actions -->
			<h3 class="mt-6 mb-3 text-lg font-semibold" id="prompt-input-with-actions">
				Prompt Input with Actions
			</h3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				A prompt input with multiple action buttons for search, voice input, and more.
			</p>
			<Playground
				code={promptInputWithActionsRaw}
				class="aspect-video h-[500px]"
				component="prompt-input-with-actions"
				registry="prompt-kit"
				source="blocks"
			>
				<PromptInputWithActions />
			</Playground>

			<div class="mt-4">
				<AiInstallCommand
					command="execute"
					args={[
						"shadcn-svelte@latest",
						"add",
						`${PUBLIC_WEBSITE_URL}/r/prompt-input-with-actions-block.json`,
					]}
					component="prompt-input-with-actions-block"
					registry="prompt-kit"
					source="install_blocks"
				/>
			</div>

			<!-- Prompt Input with Suggestions -->
			<h3 class="mt-8 mb-3 text-lg font-semibold" id="prompt-input-with-suggestions">
				Prompt Input with Suggestions
			</h3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				A prompt input with categorized suggestions that expand on click.
			</p>
			<Playground
				code={promptInputWithSuggestionsRaw}
				class="aspect-video h-[500px]"
				component="prompt-input-with-suggestions"
				registry="prompt-kit"
				source="blocks"
			>
				<PromptInputWithSuggestions />
			</Playground>

			<div class="mt-4">
				<AiInstallCommand
					command="execute"
					args={[
						"shadcn-svelte@latest",
						"add",
						`${PUBLIC_WEBSITE_URL}/r/prompt-input-with-suggestions-block.json`,
					]}
					component="prompt-input-with-suggestions-block"
					registry="prompt-kit"
					source="install_blocks"
				/>
			</div>

			<!-- Prompt Input with Autocomplete -->
			<h3 class="mt-8 mb-3 text-lg font-semibold" id="prompt-input-with-autocomplete">
				Prompt Input with Autocomplete
			</h3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				A prompt input with autocomplete suggestions that filter as you type.
			</p>
			<Playground
				code={promptInputWithAutocompleteRaw}
				class="aspect-video h-[500px]"
				component="prompt-input-with-autocomplete"
				registry="prompt-kit"
				source="blocks"
			>
				<PromptInputWithAutocomplete />
			</Playground>

			<div class="mt-4">
				<AiInstallCommand
					command="execute"
					args={[
						"shadcn-svelte@latest",
						"add",
						`${PUBLIC_WEBSITE_URL}/r/prompt-input-with-autocomplete-block.json`,
					]}
					component="prompt-input-with-autocomplete-block"
					registry="prompt-kit"
					source="install_blocks"
				/>
			</div>

			<!-- Conversation Blocks -->
			<Subheading>Conversation Blocks</Subheading>

			<!-- Basic Full Conversation -->
			<h3 class="mt-6 mb-3 text-lg font-semibold" id="basic-full-conversation">
				Basic Full Conversation
			</h3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				A simple conversation layout with user and assistant messages.
			</p>
			<Playground
				code={basicFullConversationRaw}
				class="aspect-video h-[500px]"
				component="basic-full-conversation"
				registry="prompt-kit"
				source="blocks"
			>
				<BasicFullConversation />
			</Playground>

			<div class="mt-4">
				<AiInstallCommand
					command="execute"
					args={[
						"shadcn-svelte@latest",
						"add",
						`${PUBLIC_WEBSITE_URL}/r/basic-full-conversation-block.json`,
					]}
					component="basic-full-conversation-block"
					registry="prompt-kit"
					source="install_blocks"
				/>
			</div>

			<!-- Conversation with Avatars -->
			<h3 class="mt-8 mb-3 text-lg font-semibold" id="conversation-with-avatars">
				Conversation with Avatars
			</h3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				A conversation with avatar images for each message.
			</p>
			<Playground
				code={conversationWithAvatarsRaw}
				class="aspect-video h-[500px]"
				component="conversation-with-avatars"
				registry="prompt-kit"
				source="blocks"
			>
				<ConversationWithAvatars />
			</Playground>

			<div class="mt-4">
				<AiInstallCommand
					command="execute"
					args={[
						"shadcn-svelte@latest",
						"add",
						`${PUBLIC_WEBSITE_URL}/r/conversation-with-avatars-block.json`,
					]}
					component="conversation-with-avatars-block"
					registry="prompt-kit"
					source="install_blocks"
				/>
			</div>

			<!-- Conversation with Actions -->
			<h3 class="mt-8 mb-3 text-lg font-semibold" id="conversation-with-actions">
				Conversation with Actions
			</h3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				A conversation with action buttons like copy, like, dislike, and regenerate.
			</p>
			<Playground
				code={conversationWithActionsRaw}
				class="aspect-video h-[500px]"
				component="conversation-with-actions"
				registry="prompt-kit"
				source="blocks"
			>
				<ConversationWithActions />
			</Playground>

			<div class="mt-4">
				<AiInstallCommand
					command="execute"
					args={[
						"shadcn-svelte@latest",
						"add",
						`${PUBLIC_WEBSITE_URL}/r/conversation-with-actions-block.json`,
					]}
					component="conversation-with-actions-block"
					registry="prompt-kit"
					source="install_blocks"
				/>
			</div>

			<!-- Conversation with Scroll to Bottom -->
			<h3 class="mt-8 mb-3 text-lg font-semibold" id="conversation-with-scroll">
				Conversation with Scroll to Bottom
			</h3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				A conversation with a scroll-to-bottom button for easy navigation.
			</p>
			<Playground
				code={conversationWithScrollRaw}
				class="aspect-video h-[500px]"
				component="conversation-with-scroll"
				registry="prompt-kit"
				source="blocks"
			>
				<ConversationWithScroll />
			</Playground>

			<div class="mt-4">
				<AiInstallCommand
					command="execute"
					args={[
						"shadcn-svelte@latest",
						"add",
						`${PUBLIC_WEBSITE_URL}/r/conversation-with-scroll-block.json`,
					]}
					component="conversation-with-scroll-block"
					registry="prompt-kit"
					source="install_blocks"
				/>
			</div>

			<!-- Conversation with Prompt Input -->
			<h3 class="mt-8 mb-3 text-lg font-semibold" id="conversation-with-prompt-input">
				Conversation with Prompt Input
			</h3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				A complete chat interface with conversation history and prompt input.
			</p>
			<Playground
				code={conversationWithPromptInputRaw}
				class="aspect-video h-[600px]"
				component="conversation-with-prompt-input"
				registry="prompt-kit"
				source="blocks"
			>
				<ConversationWithPromptInput />
			</Playground>

			<div class="mt-4">
				<AiInstallCommand
					command="execute"
					args={[
						"shadcn-svelte@latest",
						"add",
						`${PUBLIC_WEBSITE_URL}/r/conversation-with-prompt-input-block.json`,
					]}
					component="conversation-with-prompt-input-block"
					registry="prompt-kit"
					source="install_blocks"
				/>
			</div>
			<!-- Full Chat App -->
			<!-- <Subheading>Complete Applications</Subheading>

			<h3 class="mt-6 mb-3 text-lg font-semibold" id="full-chat-app">Full Chat App</h3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				A complete chat application with sidebar, chat history, and all features combined.
			</p>
			<Playground code={fullChatAppRaw} class="aspect-video h-[700px]">
				<FullChatApp />
			</Playground> -->
		</main>

		<!-- TOC Sidebar - Sticky on larger screens -->
		<aside class="sticky top-24 hidden h-fit max-h-[calc(100vh-3rem)] overflow-y-auto md:flex">
			<div>
				<h3 class="mb-4 text-sm font-semibold">On this page</h3>
				<Toc.Root toc={toc.current} />
			</div>
		</aside>
	</div>
</Sidebar.Inset>
