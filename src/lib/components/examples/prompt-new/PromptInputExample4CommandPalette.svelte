<script lang="ts">
	import {
		PromptInput,
		PromptInputBody,
		PromptInputButton,
		PromptInputCommand,
		PromptInputCommandEmpty,
		PromptInputCommandGroup,
		PromptInputCommandInput,
		PromptInputCommandItem,
		PromptInputCommandList,
		PromptInputCommandSeparator,
		PromptInputFooter,
		PromptInputHeader,
		PromptInputHoverCard,
		PromptInputHoverCardContent,
		PromptInputHoverCardTrigger,
		PromptInputSubmit,
		PromptInputTextarea,
		PromptInputTools,
		type PromptInputMessage,
	} from "$lib/components/ai-elements/prompt-input-new/index.js";
	import { AtSign, FileCode, Folder } from "@lucide/svelte";
	import type { ChatStatus } from "ai";

	let status = $state<ChatStatus>("ready");
	let selectedFiles = $state<string[]>([]);

	const files = [
		{ path: "src/app/page.tsx", type: "code" },
		{ path: "src/components/Button.tsx", type: "code" },
		{ path: "README.md", type: "docs" },
		{ path: "package.json", type: "config" },
	];

	const folders = [
		{ path: "src/components", files: 12 },
		{ path: "src/lib", files: 8 },
		{ path: "docs", files: 5 },
	];

	const handleSubmit = (message: PromptInputMessage) => {
		console.log("Submitted with context:", { message, selectedFiles });
		status = "submitted";
		setTimeout(() => (status = "ready"), 1000);
	};

	const handleSelectFile = (path: string) => {
		if (!selectedFiles.includes(path)) {
			selectedFiles = [...selectedFiles, path];
		}
	};
</script>

<div class="mx-auto w-full max-w-3xl space-y-4">
	<div class="bg-card rounded-lg border p-4">
		<h3 class="mb-2 font-semibold">Command Palette Integration</h3>
		<p class="text-muted-foreground text-sm">
			Click the @ button to search and add files/folders as context for your prompt.
		</p>
	</div>

	<PromptInput onSubmit={handleSubmit}>
		<PromptInputHeader>
			<PromptInputHoverCard>
				<PromptInputHoverCardTrigger>
					<PromptInputButton size="icon-sm" variant="outline">
						<AtSign class="text-muted-foreground" size={14} />
					</PromptInputButton>
				</PromptInputHoverCardTrigger>
				<PromptInputHoverCardContent class="w-[400px] p-0">
					<PromptInputCommand>
						<PromptInputCommandInput placeholder="Search files and folders..." />
						<PromptInputCommandList>
							<PromptInputCommandEmpty>No results found.</PromptInputCommandEmpty>

							<PromptInputCommandGroup heading="Files">
								{#each files as file}
									<PromptInputCommandItem
										value={file.path}
										onSelect={() => handleSelectFile(file.path)}
									>
										<FileCode class="text-primary" size={16} />
										<span>{file.path}</span>
									</PromptInputCommandItem>
								{/each}
							</PromptInputCommandGroup>

							<PromptInputCommandSeparator />

							<PromptInputCommandGroup heading="Folders">
								{#each folders as folder}
									<PromptInputCommandItem
										value={folder.path}
										onSelect={() => handleSelectFile(folder.path)}
									>
										<Folder class="text-primary" size={16} />
										<div class="flex flex-col">
											<span class="text-sm font-medium">{folder.path}</span>
											<span class="text-muted-foreground text-xs"
												>{folder.files} files</span
											>
										</div>
									</PromptInputCommandItem>
								{/each}
							</PromptInputCommandGroup>
						</PromptInputCommandList>
					</PromptInputCommand>
				</PromptInputHoverCardContent>
			</PromptInputHoverCard>

			{#if selectedFiles.length > 0}
				<div class="flex flex-wrap gap-2">
					{#each selectedFiles as file}
						<div class="bg-muted rounded-md border px-2 py-1 text-xs">
							{file}
						</div>
					{/each}
				</div>
			{/if}
		</PromptInputHeader>

		<PromptInputBody>
			<PromptInputTextarea placeholder="Ask about your codebase..." />
		</PromptInputBody>

		<PromptInputFooter>
			<PromptInputTools />
			<PromptInputSubmit {status} />
		</PromptInputFooter>
	</PromptInput>
</div>
