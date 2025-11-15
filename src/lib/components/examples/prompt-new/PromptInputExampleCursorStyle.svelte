<script lang="ts">
	import {
		PromptInput,
		PromptInputAttachment,
		PromptInputAttachments,
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
		PromptInputProvider,
		PromptInputSubmit,
		PromptInputTab,
		PromptInputTabBody,
		PromptInputTabItem,
		PromptInputTabLabel,
		PromptInputTextarea,
		PromptInputTools,
		type PromptInputMessage,
	} from "$lib/components/ai-elements/prompt-input-new";
	import {
		ModelSelector,
		ModelSelectorContent,
		ModelSelectorEmpty,
		ModelSelectorGroup,
		ModelSelectorInput,
		ModelSelectorItem,
		ModelSelectorList,
		ModelSelectorLogo,
		ModelSelectorLogoGroup,
		ModelSelectorName,
		ModelSelectorTrigger,
	} from "$lib/components/ai-elements/model-selector";
	import { AtSign, Check, Files, Globe, ImageIcon, Ruler } from "@lucide/svelte";

	const models = [
		{
			id: "gpt-4o",
			name: "GPT-4o",
			chef: "OpenAI",
			chefSlug: "openai",
			providers: ["openai", "azure"],
		},
		{
			id: "gpt-4o-mini",
			name: "GPT-4o Mini",
			chef: "OpenAI",
			chefSlug: "openai",
			providers: ["openai", "azure"],
		},
		{
			id: "claude-opus-4-20250514",
			name: "Claude 4 Opus",
			chef: "Anthropic",
			chefSlug: "anthropic",
			providers: ["anthropic", "azure", "google", "amazon-bedrock"],
		},
		{
			id: "claude-sonnet-4-20250514",
			name: "Claude 4 Sonnet",
			chef: "Anthropic",
			chefSlug: "anthropic",
			providers: ["anthropic", "azure", "google", "amazon-bedrock"],
		},
		{
			id: "gemini-2.0-flash-exp",
			name: "Gemini 2.0 Flash",
			chef: "Google",
			chefSlug: "google",
			providers: ["google"],
		},
	];

	const SUBMITTING_TIMEOUT = 200;
	const STREAMING_TIMEOUT = 2000;

	const sampleFiles = {
		activeTabs: [{ path: "prompt-input.tsx", location: "packages/elements/src" }],
		recents: [
			{ path: "queue.tsx", location: "apps/test/app/examples" },
			{ path: "queue.tsx", location: "packages/elements/src" },
		],
		added: [
			{ path: "prompt-input.tsx", location: "packages/elements/src" },
			{ path: "queue.tsx", location: "apps/test/app/examples" },
			{ path: "queue.tsx", location: "packages/elements/src" },
		],
		filesAndFolders: [
			{ path: "prompt-input.tsx", location: "packages/elements/src" },
			{ path: "queue.tsx", location: "apps/test/app/examples" },
		],
		code: [{ path: "prompt-input.tsx", location: "packages/elements/src" }],
		docs: [{ path: "README.md", location: "packages/elements" }],
	};

	const sampleTabs = {
		active: [{ path: "packages/elements/src/task-queue-panel.tsx" }],
		recents: [
			{ path: "apps/test/app/examples/task-queue-panel.tsx" },
			{ path: "apps/test/app/page.tsx" },
			{ path: "packages/elements/src/task.tsx" },
			{ path: "apps/test/app/examples/prompt-input.tsx" },
			{ path: "packages/elements/src/queue.tsx" },
			{ path: "apps/test/app/examples/queue.tsx" },
		],
	};

	let model = $state(models[0].id);
	let modelSelectorOpen = $state(false);
	let status = $state<"submitted" | "streaming" | "ready" | "error">("ready");
	let textareaRef = $state<HTMLTextAreaElement | null>(null);

	const selectedModelData = $derived(models.find((m) => m.id === model));

	function handleSubmit(message: PromptInputMessage) {
		const hasText = Boolean(message.text);
		const hasAttachments = Boolean(message.files?.length);

		if (!(hasText || hasAttachments)) {
			return;
		}

		status = "submitted";

		console.log("Submitting message:", message);

		setTimeout(() => {
			status = "streaming";
		}, SUBMITTING_TIMEOUT);

		setTimeout(() => {
			status = "ready";
		}, STREAMING_TIMEOUT);
	}
</script>

<div class="flex size-full flex-col justify-end">
	<PromptInputProvider>
		<PromptInput globalDrop multiple onSubmit={handleSubmit}>
			<PromptInputHeader>
				<PromptInputHoverCard>
					<PromptInputHoverCardTrigger>
						<PromptInputButton class="!h-8" size="icon-sm" variant="outline">
							<AtSign class="text-muted-foreground" size={12} />
						</PromptInputButton>
					</PromptInputHoverCardTrigger>
					<PromptInputHoverCardContent class="w-[400px] p-0">
						<PromptInputCommand>
							<PromptInputCommandInput
								class="border-none focus-visible:ring-0"
								placeholder="Add files, folders, docs..."
							/>
							<PromptInputCommandList>
								<PromptInputCommandEmpty class="text-muted-foreground p-3 text-sm">
									No results found.
								</PromptInputCommandEmpty>
								<PromptInputCommandGroup heading="Added">
									<PromptInputCommandItem value="active-tabs">
										<Globe />
										<span>Active Tabs</span>
										<span class="text-muted-foreground ml-auto">✓</span>
									</PromptInputCommandItem>
								</PromptInputCommandGroup>
								<PromptInputCommandSeparator />
								<PromptInputCommandGroup heading="Other Files">
									{#each sampleFiles.added as file, index (`${file.path}-${index}`)}
										<PromptInputCommandItem value={`${file.path}-${index}`}>
											<Globe class="text-primary" />
											<div class="flex flex-col">
												<span class="text-sm font-medium">
													{file.path}
												</span>
												<span class="text-muted-foreground text-xs">
													{file.location}
												</span>
											</div>
										</PromptInputCommandItem>
									{/each}
								</PromptInputCommandGroup>
							</PromptInputCommandList>
						</PromptInputCommand>
					</PromptInputHoverCardContent>
				</PromptInputHoverCard>
				<PromptInputHoverCard>
					<PromptInputHoverCardTrigger>
						<PromptInputButton size="sm" variant="outline">
							<Ruler class="text-muted-foreground" size={12} />
							<span>1</span>
						</PromptInputButton>
					</PromptInputHoverCardTrigger>
					<PromptInputHoverCardContent class="divide-y overflow-hidden p-0">
						<div class="space-y-2 p-3">
							<p class="text-muted-foreground text-sm font-medium">
								Attached Project Rules
							</p>
							<p class="text-muted-foreground ml-4 text-sm">Always Apply:</p>
							<p class="ml-8 text-sm">ultracite.mdc</p>
						</div>
						<p class="bg-sidebar text-muted-foreground px-4 py-3 text-sm">
							Click to manage
						</p>
					</PromptInputHoverCardContent>
				</PromptInputHoverCard>
				<PromptInputHoverCard>
					<PromptInputHoverCardTrigger>
						<PromptInputButton size="sm" variant="outline">
							<Files class="text-muted-foreground" size={12} />
							<span>1 Tab</span>
						</PromptInputButton>
					</PromptInputHoverCardTrigger>
					<PromptInputHoverCardContent class="w-[300px] space-y-4 px-0 py-3">
						<PromptInputTab>
							<PromptInputTabLabel>Active Tabs</PromptInputTabLabel>
							<PromptInputTabBody>
								{#each sampleTabs.active as tab (tab.path)}
									<PromptInputTabItem>
										<Globe class="text-primary" size={16} />
										<span class="truncate" dir="rtl">
											{tab.path}
										</span>
									</PromptInputTabItem>
								{/each}
							</PromptInputTabBody>
						</PromptInputTab>
						<PromptInputTab>
							<PromptInputTabLabel>Recents</PromptInputTabLabel>
							<PromptInputTabBody>
								{#each sampleTabs.recents as tab (tab.path)}
									<PromptInputTabItem>
										<Globe class="text-primary" size={16} />
										<span class="truncate" dir="rtl">
											{tab.path}
										</span>
									</PromptInputTabItem>
								{/each}
							</PromptInputTabBody>
						</PromptInputTab>
						<div class="text-muted-foreground border-t px-3 pt-2 text-xs">
							Only file paths are included
						</div>
					</PromptInputHoverCardContent>
				</PromptInputHoverCard>
				<PromptInputAttachments>
					{#snippet children(file)}
						<PromptInputAttachment data={file} />
					{/snippet}
				</PromptInputAttachments>
			</PromptInputHeader>
			<PromptInputBody>
				<PromptInputTextarea
					bind:ref={textareaRef}
					placeholder="Plan, search, build anything"
				/>
			</PromptInputBody>
			<PromptInputFooter>
				<PromptInputTools>
					<ModelSelector bind:open={modelSelectorOpen}>
						<ModelSelectorTrigger>
							<PromptInputButton>
								{#if selectedModelData?.chefSlug}
									<ModelSelectorLogo provider={selectedModelData.chefSlug} />
								{/if}
								{#if selectedModelData?.name}
									<ModelSelectorName>
										{selectedModelData.name}
									</ModelSelectorName>
								{/if}
							</PromptInputButton>
						</ModelSelectorTrigger>
						<ModelSelectorContent>
							<ModelSelectorInput placeholder="Search models..." />
							<ModelSelectorList>
								<ModelSelectorEmpty>No models found.</ModelSelectorEmpty>
								{#each ["OpenAI", "Anthropic", "Google"] as chef (chef)}
									<ModelSelectorGroup heading={chef}>
										{#each models.filter((m) => m.chef === chef) as m (m.id)}
											<ModelSelectorItem
												value={m.id}
												onSelect={() => {
													model = m.id;
													modelSelectorOpen = false;
												}}
											>
												<ModelSelectorLogo provider={m.chefSlug} />
												<ModelSelectorName>{m.name}</ModelSelectorName>
												<ModelSelectorLogoGroup>
													{#each m.providers as provider (provider)}
														<ModelSelectorLogo {provider} />
													{/each}
												</ModelSelectorLogoGroup>
												{#if model === m.id}
													<Check class="ml-auto size-4" />
												{:else}
													<div class="ml-auto size-4"></div>
												{/if}
											</ModelSelectorItem>
										{/each}
									</ModelSelectorGroup>
								{/each}
							</ModelSelectorList>
						</ModelSelectorContent>
					</ModelSelector>
				</PromptInputTools>
				<div class="flex items-center gap-2">
					<PromptInputButton size="icon-sm" variant="ghost">
						<ImageIcon class="text-muted-foreground" size={16} />
					</PromptInputButton>
					<PromptInputSubmit class="!h-8" {status} />
				</div>
			</PromptInputFooter>
		</PromptInput>
	</PromptInputProvider>
</div>
