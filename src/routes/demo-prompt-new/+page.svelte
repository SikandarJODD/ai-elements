<script lang="ts">
	import PromptInputExampleCursorStyle from "$lib/components/examples/prompt-new/PromptInputExampleCursorStyle.svelte";
	import PromptInputExample1CursorStyle from "$lib/components/examples/prompt-new/PromptInputExample1CursorStyle.svelte";
	import PromptInputExample2SpeechAPI from "$lib/components/examples/prompt-new/PromptInputExample2SpeechAPI.svelte";
	import PromptInputExample3FileUpload from "$lib/components/examples/prompt-new/PromptInputExample3FileUpload.svelte";
	import PromptInputExample4CommandPalette from "$lib/components/examples/prompt-new/PromptInputExample4CommandPalette.svelte";
	import PromptInputExample5TabsHoverCards from "$lib/components/examples/prompt-new/PromptInputExample5TabsHoverCards.svelte";
	import PromptInputExample6ProviderMode from "$lib/components/examples/prompt-new/PromptInputExample6ProviderMode.svelte";
</script>

<svelte:head>
	<title>Prompt Input Examples - AI Elements</title>
	<meta
		name="description"
		content="Comprehensive examples showcasing the new Prompt Input component features"
	/>
</svelte:head>

<div class="container mx-auto max-w-7xl space-y-8 px-4 py-8">
	<!-- Header -->
	<div class="space-y-2">
		<h1 class="text-3xl font-bold tracking-tight">Prompt Input Examples</h1>
		<p class="text-muted-foreground text-sm">
			Explore 7 comprehensive examples demonstrating different features and use cases of the
			new Prompt Input component.
		</p>
	</div>

	<!-- Examples Grid -->
	<div class="space-y-12">
		<!-- Example 0: Cursor-Style (New) -->
		<div class="space-y-3">
			<div class="space-y-1">
				<h2 class="text-lg font-semibold">Cursor-Style Prompt Input</h2>
				<p class="text-muted-foreground text-xs">
					Advanced Cursor-style interface with hover cards for context management, file
					tabs, project rules, model selector with provider logos, and image upload.
					Features a clean header layout with compact buttons and rich hover previews.
				</p>
			</div>
			<div class="h-[400px]">
				<PromptInputExampleCursorStyle />
			</div>
		</div>

		<!-- Example 1 -->
		<div class="space-y-3">
			<div class="space-y-1">
				<h2 class="text-lg font-semibold">1. Cursor-Style with Tools & Model Selector</h2>
				<p class="text-muted-foreground text-xs">
					Full-featured production-ready example with action menu, model selector, speech
					button, and file attachments. Perfect for building AI chat interfaces.
				</p>
			</div>
			<div class="bg-card rounded-lg border p-6">
				<PromptInputExample1CursorStyle />
			</div>
		</div>

		<!-- Example 2 -->
		<div class="space-y-3">
			<div class="space-y-1">
				<h2 class="text-lg font-semibold">2. Web Speech API Focus</h2>
				<p class="text-muted-foreground text-xs">
					Minimal voice-first example highlighting speech-to-text functionality. Great for
					accessibility and hands-free interactions.
				</p>
			</div>
			<div class="bg-card rounded-lg border p-6">
				<PromptInputExample2SpeechAPI />
			</div>
		</div>

		<!-- Example 3 -->
		<div class="space-y-3">
			<div class="space-y-1">
				<h2 class="text-lg font-semibold">3. File Upload & Control</h2>
				<p class="text-muted-foreground text-xs">
					Advanced file validation with accept types, max files, and size limits. Includes
					error handling and user feedback for multi-modal AI applications.
				</p>
			</div>
			<div class="bg-card rounded-lg border p-6">
				<PromptInputExample3FileUpload />
			</div>
		</div>

		<!-- Example 4 -->
		<div class="space-y-3">
			<div class="space-y-1">
				<h2 class="text-lg font-semibold">4. Command Palette Integration</h2>
				<p class="text-muted-foreground text-xs">
					Context-aware AI with command palette for file/folder search. Ideal for code
					assistants and IDE integrations.
				</p>
			</div>
			<div class="bg-card rounded-lg border p-6">
				<PromptInputExample4CommandPalette />
			</div>
		</div>

		<!-- Example 5 -->
		<div class="space-y-3">
			<div class="space-y-1">
				<h2 class="text-lg font-semibold">5. Tabs & Hover Cards</h2>
				<p class="text-muted-foreground text-xs">
					UI-rich organization with tabs for active/recent files and hover cards for
					metadata. Perfect for project-aware AI applications.
				</p>
			</div>
			<div class="bg-card rounded-lg border p-6">
				<PromptInputExample5TabsHoverCards />
			</div>
		</div>

		<!-- Example 6 -->
		<div class="space-y-3">
			<div class="space-y-1">
				<h2 class="text-lg font-semibold">6. Provider Mode with External Controls</h2>
				<p class="text-muted-foreground text-xs">
					Demonstrates PromptInputProvider for external state management. Use when you
					need programmatic control over input and attachments.
				</p>
			</div>
			<div class="bg-card rounded-lg border p-6">
				<PromptInputExample6ProviderMode />
			</div>
		</div>
	</div>

	<!-- Footer -->
	<div class="border-t pt-6">
		<div class="space-y-2">
			<h3 class="text-sm font-semibold">Component Features</h3>
			<div class="text-muted-foreground grid grid-cols-2 gap-2 text-xs md:grid-cols-4">
				<div>✓ File Attachments</div>
				<div>✓ Speech-to-Text</div>
				<div>✓ Model Selector</div>
				<div>✓ Action Menu</div>
				<div>✓ Command Palette</div>
				<div>✓ Tabs & Hover Cards</div>
				<div>✓ Provider Mode</div>
				<div>✓ Status Management</div>
			</div>
		</div>
	</div>
</div>
