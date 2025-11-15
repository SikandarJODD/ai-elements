<script lang="ts">
	import {
		PromptInput,
		PromptInputBody,
		PromptInputButton,
		PromptInputFooter,
		PromptInputHeader,
		PromptInputHoverCard,
		PromptInputHoverCardContent,
		PromptInputHoverCardTrigger,
		PromptInputSubmit,
		PromptInputTabs,
		PromptInputTabsContent,
		PromptInputTabsList,
		PromptInputTabsTrigger,
		PromptInputTextarea,
		PromptInputTools,
		type PromptInputMessage,
	} from "$lib/components/ai-elements/prompt-input-new/index.js";
	import { FileCode, Files, Ruler } from "@lucide/svelte";
	import type { ChatStatus } from "ai";

	let status = $state<ChatStatus>("ready");
	let activeTab = $state("active");

	const activeTabs = [{ path: "src/app/page.tsx" }, { path: "src/components/Button.tsx" }];

	const recentTabs = [
		{ path: "README.md" },
		{ path: "package.json" },
		{ path: "src/lib/utils.ts" },
	];

	const handleSubmit = (message: PromptInputMessage) => {
		console.log("Submitted:", message);
		status = "submitted";
		setTimeout(() => (status = "ready"), 1000);
	};
</script>

<div class="mx-auto w-full max-w-3xl space-y-4">
	<div class="bg-card rounded-lg border p-4">
		<h3 class="mb-2 font-semibold">Tabs & Hover Cards</h3>
		<p class="text-muted-foreground text-sm">
			Organize files with tabs and preview details with hover cards.
		</p>
	</div>

	<PromptInput onSubmit={handleSubmit}>
		<PromptInputHeader>
			<!-- Tabs Hover Card -->
			<PromptInputHoverCard>
				<PromptInputHoverCardTrigger>
					<PromptInputButton size="sm" variant="outline">
						<Files class="text-muted-foreground" size={14} />
						<span>{activeTabs.length} Tabs</span>
					</PromptInputButton>
				</PromptInputHoverCardTrigger>
				<PromptInputHoverCardContent class="w-[320px] p-0">
					<PromptInputTabs bind:value={activeTab}>
						<PromptInputTabsList class="w-full">
							<PromptInputTabsTrigger value="active" class="flex-1">
								Active
							</PromptInputTabsTrigger>
							<PromptInputTabsTrigger value="recent" class="flex-1">
								Recent
							</PromptInputTabsTrigger>
						</PromptInputTabsList>

						<PromptInputTabsContent value="active" class="p-3">
							<div class="space-y-2">
								{#each activeTabs as tab}
									<div
										class="hover:bg-accent flex items-center gap-2 rounded-md p-2"
									>
										<FileCode class="text-primary" size={16} />
										<span class="truncate text-sm" dir="rtl">{tab.path}</span>
									</div>
								{/each}
							</div>
						</PromptInputTabsContent>

						<PromptInputTabsContent value="recent" class="p-3">
							<div class="space-y-2">
								{#each recentTabs as tab}
									<div
										class="hover:bg-accent flex items-center gap-2 rounded-md p-2"
									>
										<FileCode class="text-primary" size={16} />
										<span class="truncate text-sm" dir="rtl">{tab.path}</span>
									</div>
								{/each}
							</div>
						</PromptInputTabsContent>
					</PromptInputTabs>
					<div class="text-muted-foreground border-t px-3 py-2 text-xs">
						Only file paths are included
					</div>
				</PromptInputHoverCardContent>
			</PromptInputHoverCard>

			<!-- Rules Hover Card -->
			<PromptInputHoverCard>
				<PromptInputHoverCardTrigger>
					<PromptInputButton size="sm" variant="outline">
						<Ruler class="text-muted-foreground" size={14} />
						<span>1 Rule</span>
					</PromptInputButton>
				</PromptInputHoverCardTrigger>
				<PromptInputHoverCardContent class="divide-y p-0">
					<div class="space-y-2 p-3">
						<p class="text-muted-foreground text-sm font-medium">
							Attached Project Rules
						</p>
						<p class="text-muted-foreground ml-4 text-sm">Always Apply:</p>
						<p class="ml-8 text-sm">coding-standards.md</p>
					</div>
					<p class="bg-sidebar text-muted-foreground px-4 py-3 text-sm">
						Click to manage
					</p>
				</PromptInputHoverCardContent>
			</PromptInputHoverCard>
		</PromptInputHeader>

		<PromptInputBody>
			<PromptInputTextarea placeholder="Plan, search, build anything..." />
		</PromptInputBody>

		<PromptInputFooter>
			<PromptInputTools />
			<PromptInputSubmit {status} />
		</PromptInputFooter>
	</PromptInput>
</div>
