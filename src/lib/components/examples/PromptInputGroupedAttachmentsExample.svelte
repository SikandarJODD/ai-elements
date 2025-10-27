<script lang="ts">
	import {
		PromptInput,
		PromptInputBody,
		PromptInputTextarea,
		PromptInputToolbar,
		PromptInputTools,
		PromptInputSubmit,
		PromptInputAttachments,
		PromptInputAttachment,
		PromptInputActionMenu,
		PromptInputActionMenuTrigger,
		PromptInputActionMenuContent,
		PromptInputActionAddAttachments,
		type PromptInputMessage,
	} from "$lib/components/ai-elements/prompt-input/index.js";
	import { Badge } from "$lib/components/ui/badge/index.js";
	import FileIcon from "@lucide/svelte/icons/file";
	import ImageIcon from "@lucide/svelte/icons/image";
	import FileTextIcon from "@lucide/svelte/icons/file-text";
	import FileVideoIcon from "@lucide/svelte/icons/file-video";

	let messages = $state<
		Array<{
			text?: string;
			files: Array<{
				filename?: string;
				mediaType?: string;
				url?: string;
			}>;
		}>
	>([]);

	function getFileIcon(mediaType?: string) {
		if (!mediaType) return FileIcon;
		if (mediaType.startsWith("image/")) return ImageIcon;
		if (mediaType.startsWith("video/")) return FileVideoIcon;
		if (mediaType.includes("pdf") || mediaType.includes("text")) return FileTextIcon;
		return FileIcon;
	}

	function getFileTypeLabel(mediaType?: string) {
		if (!mediaType) return "Unknown";
		if (mediaType.startsWith("image/")) return "Image";
		if (mediaType.startsWith("video/")) return "Video";
		if (mediaType.includes("pdf")) return "PDF";
		if (mediaType.includes("text")) return "Text";
		return "File";
	}

	async function handleSubmit(message: PromptInputMessage): Promise<void> {
		const hasContent = message.text?.trim() || message.files?.length;

		if (!hasContent) {
			return;
		}

		// Log to show blob → data URL conversion
		console.log("Submitted message with converted URLs:", message);

		messages = [
			...messages,
			{
				text: message.text,
				files: message.files || [],
			},
		];

		// Simulate async processing
		await new Promise((resolve) => setTimeout(resolve, 300));
	}
</script>

<div class="mx-auto max-w-4xl space-y-6 p-8">
	<div class="space-y-2">
		<h1 class="text-3xl font-bold">Grouped Attachments Example</h1>
		<p class="text-muted-foreground">
			Files and images are automatically grouped separately with enhanced display
		</p>
	</div>

	<!-- Submission History -->
	{#if messages.length > 0}
		<div class="bg-card space-y-4 rounded-lg border p-4">
			<h3 class="text-sm font-semibold">Submission History</h3>
			<div class="space-y-3">
				{#each messages as message, i}
					<div class="bg-muted/50 rounded-md border p-3">
						<div class="mb-2 flex items-center gap-2">
							<Badge variant="outline" class="text-xs">
								Message {i + 1}
							</Badge>
							{#if message.files.length > 0}
								<Badge variant="secondary" class="text-xs">
									{message.files.length} attachment{message.files.length !== 1
										? "s"
										: ""}
								</Badge>
							{/if}
						</div>

						{#if message.text}
							<p class="mb-2 text-sm">{message.text}</p>
						{/if}

						{#if message.files.length > 0}
							<div class="flex flex-wrap gap-2">
								{#each message.files as file}
									{@const Icon = getFileIcon(file.mediaType)}
									<div
										class="bg-background flex items-center gap-2 rounded-md border px-2 py-1"
									>
										<Icon class="text-muted-foreground h-3 w-3" />
										<span class="max-w-[200px] truncate text-xs">
											{file.filename || "Unknown"}
										</span>
										<Badge variant="outline" class="text-[10px]">
											{getFileTypeLabel(file.mediaType)}
										</Badge>
									</div>
								{/each}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Prompt Input -->
	<PromptInput globalDrop multiple onSubmit={handleSubmit}>
		<PromptInputBody>
			<PromptInputAttachments>
				{#snippet children(file)}
					<PromptInputAttachment data={file} />
				{/snippet}
			</PromptInputAttachments>
			<PromptInputTextarea placeholder="Upload multiple files to see grouped rendering..." />
		</PromptInputBody>
		<PromptInputToolbar>
			<PromptInputTools>
				<PromptInputActionMenu>
					<PromptInputActionMenuTrigger />
					<PromptInputActionMenuContent>
						<PromptInputActionAddAttachments />
					</PromptInputActionMenuContent>
				</PromptInputActionMenu>
			</PromptInputTools>
			<PromptInputSubmit />
		</PromptInputToolbar>
	</PromptInput>

	<!-- Feature Explanation -->
	<div class="grid gap-4 sm:grid-cols-2">
		<div class="bg-card space-y-3 rounded-lg border p-4">
			<h4 class="text-sm font-semibold">📁 Non-Image Files</h4>
			<ul class="text-muted-foreground space-y-2 text-sm">
				<li class="flex gap-2">
					<span>•</span>
					<span>Displayed with file icon and name</span>
				</li>
				<li class="flex gap-2">
					<span>•</span>
					<span>Hover to see full filename + media type</span>
				</li>
				<li class="flex gap-2">
					<span>•</span>
					<span>Grouped separately at the top</span>
				</li>
				<li class="flex gap-2">
					<span>•</span>
					<span>Better for PDFs, docs, text files</span>
				</li>
			</ul>
		</div>

		<div class="bg-card space-y-3 rounded-lg border p-4">
			<h4 class="text-sm font-semibold">🖼️ Image Files</h4>
			<ul class="text-muted-foreground space-y-2 text-sm">
				<li class="flex gap-2">
					<span>•</span>
					<span>Shown as image thumbnails</span>
				</li>
				<li class="flex gap-2">
					<span>•</span>
					<span>Square preview with aspect ratio</span>
				</li>
				<li class="flex gap-2">
					<span>•</span>
					<span>Grouped separately after files</span>
				</li>
				<li class="flex gap-2">
					<span>•</span>
					<span>Visual preview for quick recognition</span>
				</li>
			</ul>
		</div>
	</div>

	<!-- Technical Details -->
	<div class="bg-muted/50 rounded-lg border p-4">
		<h4 class="mb-3 text-sm font-semibold">🔧 Technical Implementation</h4>
		<div class="text-muted-foreground space-y-2 text-sm">
			<p>
				<strong class="text-foreground">Grouped Rendering:</strong> Files are automatically separated
				into two groups:
			</p>
			<ul class="ml-4 list-disc space-y-1">
				<li>Non-images (PDFs, docs, etc.) → rendered with icons and tooltips</li>
				<li>Images (PNG, JPG, etc.) → rendered as visual thumbnails</li>
			</ul>
			<p class="mt-3">
				<strong class="text-foreground">URL Conversion:</strong> Blob URLs (<code
					class="bg-muted-foreground/20 rounded px-1 text-xs">blob:http://...</code
				>) are automatically converted to data URLs (<code
					class="bg-muted-foreground/20 rounded px-1 text-xs">data:image/...</code
				>) before submission, ensuring compatibility with APIs and serialization.
			</p>
		</div>
	</div>

	<!-- Instructions -->
	<div class="rounded-lg bg-blue-50 p-4 dark:bg-blue-950/20">
		<p class="text-sm">
			<strong>Try it:</strong> Upload a mix of images and documents. Notice how they're grouped
			separately and displayed differently. Hover over document names to see the full filename
			and media type in a tooltip.
		</p>
	</div>
</div>
