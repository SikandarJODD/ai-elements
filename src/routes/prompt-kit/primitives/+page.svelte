<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import Box from "@lucide/svelte/icons/box";
	import House from "@lucide/svelte/icons/house";
	import PanelsTopLeft from "@lucide/svelte/icons/panels-top-left";

	import { Subheading } from "$lib/components/docs";
	import PromptKitPrevNext from "$lib/components/prompt-kit/prompt-kit-prev-next.svelte";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import * as Tabs from "$lib/components/ui/tabs";
	import * as Card from "$lib/components/ui/card";
	import { Badge } from "$lib/components/ui/badge";
	import CodeFileTree from "$lib/components/docs/code-file-tree/CodeFileTree.svelte";

	import { openRouterKeyStore } from "$lib/config/open-router-key.svelte";
	import * as Code from "$lib/components/docs/code/code-block";
	import AiInstallCommand from "$lib/components/docs/ai-install-command.svelte";
	import { ExternalLink, Key, Copy, Check } from "@lucide/svelte";
	import { onMount } from "svelte";
	import { seo } from "./examples/seo";

	import { primitives, primitiveComponents } from "./examples/primitives-data";
	import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";
	import { Scrollbar } from "$lib/components/ui/scroll-area";
	let apiKey = $state("");
	let showApiKey = $state(false);
	let copiedStates = $state<Record<string, boolean>>({});

	onMount(() => {
		apiKey = openRouterKeyStore.key;
	});
	function saveApiKey() {
		openRouterKeyStore.key = apiKey.trim();
	}

	function clearApiKey() {
		openRouterKeyStore.clear();
		apiKey = "";
	}

	async function copyToClipboard(text: string, id: string) {
		try {
			await navigator.clipboard.writeText(text);
			copiedStates[id] = true;
			setTimeout(() => {
				copiedStates[id] = false;
			}, 2000);
		} catch (error) {
			console.error("Failed to copy:", error);
		}
	}

	function getInstallCommand(registryName: string) {
		return `npx shadcn@latest add https://svelte-ai-elements.vercel.app/r/${registryName}.json`;
	}
</script>

<MetaTags {...seo} />

<Sidebar.Inset class="min-h-svh">
	<div class="md:px-6 md:pb-6">
		<!-- Main Content Area -->
		<main class="mx-auto max-w-5xl">
			<!-- Title -->
			<Subheading class="md:text-3xl">Primitives</Subheading>

			<!-- Description -->
			<p class="text-muted-foreground my-4 text-base leading-relaxed sm:text-lg">
				Fullstack building blocks for AI applications. Each primitive includes a UI
				component and an API route using the Vercel AI SDK. Easy to install with the shadcn
				registry.
			</p>

			<!-- API Key Input Section -->
			<Card.Root class="my-6">
				<Card.Header>
					<Card.Title class="flex items-center gap-2">
						<Key class="size-5" />
						OpenRouter API Key
					</Card.Title>
					<Card.Description>
						Enter your OpenRouter API key to test the primitives. Using model: <code
							class="bg-muted rounded px-1.5 py-0.5 text-xs"
							>z-ai/glm-4.5-air:free</code
						>
					</Card.Description>
				</Card.Header>
				<Card.Content class="space-y-4">
					<div class="flex gap-2">
						<div class="flex-1">
							<Label for="api-key" class="sr-only">API Key</Label>
							<Input
								id="api-key"
								type={showApiKey ? "text" : "password"}
								placeholder={openRouterKeyStore.key
									? "API key is saved"
									: "sk-or-v1-..."}
								bind:value={apiKey}
								class="font-mono text-sm"
							/>
						</div>
						<Button variant="outline" onclick={() => (showApiKey = !showApiKey)}>
							{showApiKey ? "Hide" : "Show"}
						</Button>
						<Button onclick={saveApiKey} disabled={!apiKey.trim()}>Save</Button>
						<Button
							variant="destructive"
							onclick={clearApiKey}
							disabled={!openRouterKeyStore.key}
						>
							Clear
						</Button>
					</div>
					<p class="text-muted-foreground text-xs">
						{#if openRouterKeyStore.key}
							Your API key is saved locally. If not provided, the server's default key
							will be used.
						{:else}
							Optional: Enter your OpenRouter API key to test the primitives. If not
							provided, the server's default key will be used. Get your key at
							<a
								href="https://openrouter.ai/keys"
								target="_blank"
								rel="noopener noreferrer"
								class="text-primary hover:underline"
							>
								openrouter.ai/keys
							</a>
						{/if}
					</p>
				</Card.Content>
			</Card.Root>

			<!-- Primitives Grid -->
			<div class="mt-8 space-y-12">
				{#each primitives as primitive, index}
					<div id={primitive.id} class="scroll-mt-20">
						<div class="mb-4 flex items-center justify-between">
							<div>
								<h2 class="text-2xl font-bold tracking-tight">{primitive.title}</h2>
								<p class="text-muted-foreground mt-1 text-sm">
									{primitive.description}
								</p>
							</div>
							<Badge variant="secondary">New</Badge>
						</div>

						<!-- Tabs Container -->
						<Tabs.Root value="preview" class="items-start">
							<ScrollArea>
								<Tabs.List class="mb-3">
									<Tabs.Trigger value="preview">
										<House
											class="-ms-0.5 me-1.5 opacity-60"
											size={16}
											aria-hidden="true"
										/>
										Preview
									</Tabs.Trigger>
									<Tabs.Trigger value="code" class="group">
										<PanelsTopLeft
											class="-ms-0.5 me-1.5 opacity-60"
											size={16}
											aria-hidden="true"
										/>
										Components
									</Tabs.Trigger>
									<Tabs.Trigger value="api" class="group">
										<Box
											class="-ms-0.5 me-1.5 opacity-60"
											size={16}
											aria-hidden="true"
										/>
										API <span class="font-mono">(+server.ts)</span>
									</Tabs.Trigger>
								</Tabs.List>
								<Scrollbar orientation="horizontal" />
							</ScrollArea>

							<!-- Preview Tab -->
							<Tabs.Content value="preview" class="mt-4 w-full overflow-hidden ">
								{@const PrimitiveComponent =
									primitiveComponents[
										primitive.id as keyof typeof primitiveComponents
									]}
								<Card.Root class="overflow-hidden">
									<Card.Content class="p-0">
										<div class="min-h-[600px] p-4">
											{#if PrimitiveComponent}
												<PrimitiveComponent />
											{/if}
										</div>
									</Card.Content>
								</Card.Root>
							</Tabs.Content>
							<!-- Code Tab with File Tree -->
							<Tabs.Content
								value="code"
								class="mt-4 w-full overflow-hidden rounded-xl border"
							>
								<CodeFileTree
									files={primitive.componentFiles}
									defaultFile={primitive.componentFiles[0]?.name}
									class="min-h-[600px]"
								/>
							</Tabs.Content>

							<!-- API Tab -->
							<Tabs.Content
								value="api"
								class="mt-4 w-full overflow-hidden rounded-xl border p-2"
							>
								<div class="space-y-2">
									<div class="px-2">
										<p class="font-mono text-sm font-semibold">
											{primitive.apiFile.name}
										</p>
										<p class="text-muted-foreground font-mono text-xs">
											{primitive.apiFile.path}
										</p>
									</div>
									<div class="overflow-hidden rounded-xl border">
										<Code.Root
											code={primitive.apiFile.content}
											lang="typescript"
											class="no-scrollbar max-h-[600px] rounded-none border-none"
										>
											<Code.CopyButton />
										</Code.Root>
									</div>
								</div>
							</Tabs.Content>
						</Tabs.Root>

						<!-- Install Command & Demo Link -->
						<div class="mt-10 space-y-3">
							<div>
								<AiInstallCommand
									command="execute"
									args={[
										"shadcn-svelte@latest",
										"add",
										`https://svelte-ai-elements.vercel.app/r/${primitive.registryName}.json`,
									]}
									component={primitive.id}
									registry="primitives"
								/>
							</div>
							<div>
								<Button
									variant="outline"
									href={primitive.demoUrl}
									class="w-full gap-2 sm:w-auto"
									target="_blank"
								>
									Open Full Demo
									<ExternalLink class="size-4" />
								</Button>
							</div>
						</div>
					</div>

					{#if index < primitives.length - 1}
						<div class="border-t"></div>
					{/if}
				{/each}
				<!-- Call to Action -->
				<!--
			<div class="mt-12 flex flex-col gap-4 sm:flex-row">
				<Button
					variant="outline"
					class="gap-2"
					href="https://github.com/SikandarJODD/ai-elements/issues/new"
					target="_blank"
				>
					Suggest a new primitive
					<ExternalLink class="size-4" />
				</Button>
				<Button
					variant="outline"
					class="gap-2"
					href="https://github.com/SikandarJODD/ai-elements"
					target="_blank"
				>
					Contribute to prompt-kit
					<ExternalLink class="size-4" />
				</Button>
			</div>
			-->

				<!-- Link to Blocks -->
				<div class="bg-muted/50 mt-8 rounded-lg border p-6">
					<h3 class="mb-2 text-lg font-semibold">Looking for UI-only components?</h3>
					<p class="text-muted-foreground mb-4 text-sm">
						Check out our Blocks collection for ready-to-use UI components without API
						integration.
					</p>
					<Button variant="outline" href="/prompt-kit/blocks" class="gap-2">
						View Blocks
						<ExternalLink class="size-4" />
					</Button>
				</div>
			</div>

			<PromptKitPrevNext currentSlug="primitives" />
		</main>
	</div>
</Sidebar.Inset>
