<script lang="ts">
	import { cn } from "$lib/utils/utils";
	import * as Code from "$lib/components/ai-elements/code";
	import { fly } from "svelte/transition";
	import { Svelte } from "$lib/components/icons/index";

	type FileItem = {
		name: string;
		path: string;
		content: string;
	};

	type Props = {
		files: FileItem[];
		class?: string;
		defaultFile?: string;
	};

	let { files, class: className, defaultFile }: Props = $props();

	let selectedFile = $state<string>(defaultFile || files[0]?.name || "");
	let folderExpanded = $state<boolean>(true);

	function getLanguage(
		filename: string
	): "svelte" | "typescript" | "javascript" | "json" | "css" | "tsx" | "jsx" | "text" {
		const ext = filename.split(".").pop()?.toLowerCase();
		switch (ext) {
			case "svelte":
				return "svelte";
			case "ts":
				return "typescript";
			case "js":
				return "javascript";
			case "json":
				return "json";
			case "css":
				return "css";
			case "tsx":
				return "tsx";
			case "jsx":
				return "jsx";
			case "html":
				return "text";
			default:
				return "typescript";
		}
	}

	function selectFile(filename: string) {
		selectedFile = filename;
	}

	let currentFile = $derived(files.find((f) => f.name === selectedFile));
	let currentLang = $derived(currentFile ? getLanguage(currentFile.name) : "typescript");
</script>

<div class={cn("flex h-full overflow-hidden rounded-lg", className)}>
	<!-- File Tree Sidebar -->
	<div class="bg-muted/30 border-border w-64 shrink-0 rounded-l-lg border-r">
		<div class="p-3">
			<button
				onclick={() => (folderExpanded = !folderExpanded)}
				class="text-muted-foreground hover:text-foreground mb-2 flex w-full items-center gap-1.5 text-sm font-medium"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					class={[
						"mt-0.5 transition-transform duration-200 ease-in-out",
						folderExpanded ? "" : "-rotate-90",
					]}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"><path d="m6 9 6 6 6-6" /></svg
				>

				components
			</button>

			{#if folderExpanded}
				<div class="ml-4 space-y-0.5">
					{#each files as file, index}
						<button
							in:fly|global={{ y: -10, delay: index * 60 }}
							out:fly|global={{ y: -5, delay: (files.length - index) * 20 }}
							onclick={() => selectFile(file.name)}
							class={cn(
								"hover:bg-muted text-muted-foreground flex w-full items-center gap-1 rounded-md px-2 py-1.5 text-left text-sm transition-colors",
								selectedFile === file.name && "bg-muted text-foreground"
							)}
						>
							<Svelte class="size-4 shrink-0" />
							<span class="truncate">{file.name}</span>
						</button>
					{/each}
				</div>
			{/if}
		</div>
	</div>

	<!-- Code Display -->
	<div class="relative flex-1 overflow-hidden">
		{#if currentFile}
			<Code.Root
				code={currentFile.content}
				lang={currentLang}
				class="no-scrollbar h-full max-h-[600px] rounded-none border-none"
			>
				<Code.CopyButton />
			</Code.Root>
		{/if}
	</div>
</div>
