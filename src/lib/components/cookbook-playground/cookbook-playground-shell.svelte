<script lang="ts">
	import { page } from "$app/state";
	import { onMount } from "svelte";
	import { IsMobile } from "$lib/hooks/is-mobile.svelte.js";
	import * as Tabs from "$lib/components/ui/tabs";
	import {
		BlockPreview,
		CodeTree,
		CodeView,
		collectDefaultOpenFolderIds,
		findBlockCodeFile,
		flattenBlockCodeFiles,
		type CookbookPlaygroundPageData,
	} from "$lib/components/code-preview";
	import {
		ResizableHandle,
		ResizablePane,
		ResizablePaneGroup,
	} from "$lib/components/ui/resizable";
	import CookbookPlaygroundRail from "./cookbook-playground-rail.svelte";

	interface CookbookPlaygroundShellProps {
		item: CookbookPlaygroundPageData;
	}

	let { item }: CookbookPlaygroundShellProps = $props();

	let isMobile = new IsMobile();
	let hydrated = $state(false);
	let mobileTab = $state<"files" | "code" | "preview" | "recipes">("code");
	let selectedFileId = $state("");
	let selectedOpenFolderIds = $state<string[] | null>(null);

	let files = $derived(flattenBlockCodeFiles(item.codeTree.nodes));
	let defaultFileId = $derived(item.codeTree.defaultFileId || files[0]?.id || "");
	let defaultOpenFolderIds = $derived(collectDefaultOpenFolderIds(item.codeTree.nodes));
	let activeFileId = $derived(selectedFileId || defaultFileId);
	let openFolderIds = $derived(selectedOpenFolderIds ?? defaultOpenFolderIds);
	let activeFile = $derived(findBlockCodeFile(item.codeTree, activeFileId) ?? files[0]);
	let currentSlug = $derived(page.url.pathname.split("/").filter(Boolean).at(-1) ?? item.slug);
	let useMobileLayout = $derived(hydrated && isMobile.current);

	onMount(() => {
		hydrated = true;
	});

	function selectFile(fileId: string) {
		selectedFileId = fileId;
	}

	function toggleFolder(folderId: string) {
		const next = [...openFolderIds];

		if (next.includes(folderId)) {
			selectedOpenFolderIds = next.filter((id) => id !== folderId);
		} else {
			selectedOpenFolderIds = [...next, folderId];
		}
	}
</script>

<section class="mx-auto flex max-w-[1800px] flex-col px-4 py-6 md:px-6">
	{#if useMobileLayout}
		<div class="overflow-hidden rounded-2xl border bg-card/40">
			<Tabs.Root bind:value={mobileTab}>
				<div class="border-b px-2 pt-2">
					<Tabs.List class="grid h-auto w-full grid-cols-4 bg-transparent">
						<Tabs.Trigger value="files">Files</Tabs.Trigger>
						<Tabs.Trigger value="code">Code</Tabs.Trigger>
						<Tabs.Trigger value="preview">Preview</Tabs.Trigger>
						<Tabs.Trigger value="recipes">Recipes</Tabs.Trigger>
					</Tabs.List>
				</div>

				<Tabs.Content value="files" class="mt-0 min-h-[65vh]">
					<CodeTree
						codeTree={item.codeTree}
						{activeFileId}
						{openFolderIds}
						onSelectFile={selectFile}
						onToggleFolder={toggleFolder}
					/>
				</Tabs.Content>

				<Tabs.Content value="code" class="mt-0 min-h-[65vh]">
					<CodeView {activeFile} />
				</Tabs.Content>

				<Tabs.Content value="preview" class="mt-0 min-h-[65vh]">
					<BlockPreview item={item} />
				</Tabs.Content>

				<Tabs.Content value="recipes" class="mt-0 min-h-[65vh]">
					<CookbookPlaygroundRail {currentSlug} />
				</Tabs.Content>
			</Tabs.Root>
		</div>
	{:else}
		<div class="overflow-hidden rounded-2xl border bg-card/40">
			<div class="flex min-h-[calc(100vh-9rem)]">
				<div class="min-w-0 flex-1">
					<ResizablePaneGroup direction="horizontal" class="min-h-[calc(100vh-9rem)]">
						<ResizablePane defaultSize={20} minSize={15} maxSize={28}>
							<CodeTree
								codeTree={item.codeTree}
								{activeFileId}
								{openFolderIds}
								onSelectFile={selectFile}
								onToggleFolder={toggleFolder}
							/>
						</ResizablePane>

						<ResizableHandle
							withHandle
							class="bg-border/60 hover:bg-border data-[direction=horizontal]:w-3 data-[direction=horizontal]:after:w-3 [&>div]:h-10 [&>div]:w-1.5 [&>div]:rounded-full [&>div]:bg-foreground/30"
						/>

						<ResizablePane defaultSize={42} minSize={25}>
							<CodeView {activeFile} />
						</ResizablePane>

						<ResizableHandle
							withHandle
							class="bg-border/60 hover:bg-border data-[direction=horizontal]:w-3 data-[direction=horizontal]:after:w-3 [&>div]:h-10 [&>div]:w-1.5 [&>div]:rounded-full [&>div]:bg-foreground/30"
						/>

						<ResizablePane defaultSize={38} minSize={20}>
							<BlockPreview item={item} />
						</ResizablePane>
					</ResizablePaneGroup>
				</div>

				<aside class="h-[70vh] w-72 shrink-0 self-start overflow-hidden border-l bg-background/70">
					<CookbookPlaygroundRail {currentSlug} />
				</aside>
			</div>
		</div>
	{/if}
</section>
