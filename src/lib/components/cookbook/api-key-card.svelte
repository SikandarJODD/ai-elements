<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import * as Popover from "$lib/components/ui/popover";
	import * as HoverCard from "$lib/components/ui/hover-card";
	import { openRouterKeyStore } from "$lib/config/open-router-key.svelte";
	import { aiGatewayKeyStore } from "$lib/config/ai-gateway-key.svelte";
	import KeyIcon from "@lucide/svelte/icons/key-round";
	import Trash2Icon from "@lucide/svelte/icons/trash-2";
	import CheckIcon from "@lucide/svelte/icons/check";
	import ExternalLinkIcon from "@lucide/svelte/icons/external-link";

	let openRouterKeyInput = $state("");
	let aiGatewayKeyInput = $state("");
	let isOpen = $state(false);

	function saveOpenRouterKey() {
		if (openRouterKeyInput.trim()) {
			openRouterKeyStore.key = openRouterKeyInput.trim();
			openRouterKeyInput = "";
		}
	}

	function clearOpenRouterKey() {
		openRouterKeyStore.clear();
		openRouterKeyInput = "";
	}

	function saveAiGatewayKey() {
		if (aiGatewayKeyInput.trim()) {
			aiGatewayKeyStore.key = aiGatewayKeyInput.trim();
			aiGatewayKeyInput = "";
		}
	}

	function clearAiGatewayKey() {
		aiGatewayKeyStore.clear();
		aiGatewayKeyInput = "";
	}

	// Models used in cookbook
	const models = [
		{ name: "GLM 4.5 Air", id: "z-ai/glm-4.5-air:free", usage: "Text generation, streaming" },
		{ name: "GPT-5 Nano", id: "openai/gpt-5-nano", usage: "Image generation" },
	];
</script>

<div class="fixed right-4 bottom-4 z-50">
	<Popover.Root bind:open={isOpen}>
		<Popover.Trigger>
			<Button
				variant="outline"
				size="sm"
				class="gap-2 shadow-md {openRouterKeyStore.hasKey && aiGatewayKeyStore.hasKey
					? 'border-green-500/50 bg-green-500/10'
					: ''}"
			>
				<KeyIcon class="size-4" />
				API Keys
				{#if openRouterKeyStore.hasKey && aiGatewayKeyStore.hasKey}
					<CheckIcon class="size-3 text-green-500" />
				{/if}
			</Button>
		</Popover.Trigger>

		<Popover.Content
			class="dark-scrollbar max-h-[80vh] w-80 overflow-y-auto"
			align="end"
			side="top"
		>
			<div class="space-y-4">
				<!-- Header -->
				<div>
					<h4 class="font-medium">API Keys</h4>
					<p class="text-muted-foreground text-xs">
						Keys are stored locally and never sent to our servers.
					</p>
				</div>

				<!-- OpenRouter API Key Section -->
				<div class="space-y-2">
					<div class="flex items-center gap-2">
						<h5 class="text-sm font-medium">OpenRouter API Key</h5>
						<span
							class="rounded-full bg-green-500/15 px-2 py-0.5 text-[10px] font-medium text-green-600 dark:text-green-400"
							>free</span
						>
					</div>
					<p class="text-muted-foreground text-xs">
						Used for text generation & streaming
					</p>
					{#if openRouterKeyStore.hasKey}
						<div class="bg-muted/50 space-y-2 rounded-lg border p-3">
							<div class="flex items-center gap-2">
								<CheckIcon class="size-4 text-green-500" />
								<span class="text-sm font-medium">Saved</span>
							</div>
							<Button
								variant="destructive"
								size="sm"
								class="w-full"
								onclick={clearOpenRouterKey}
							>
								<Trash2Icon class="mr-2 size-3.5" />
								Remove
							</Button>
						</div>
					{:else}
						<div class="space-y-2">
							<Input
								id="openrouter-key-input"
								type="password"
								placeholder="sk-or-v1-..."
								bind:value={openRouterKeyInput}
								class="text-sm"
							/>
							<Button
								variant="secondary"
								size="sm"
								class="w-full"
								onclick={saveOpenRouterKey}
								disabled={!openRouterKeyInput.trim()}
							>
								<KeyIcon class="mr-2 size-3.5" />
								Save Key
							</Button>
						</div>
					{/if}
					<p class="text-muted-foreground text-xs">
						Get key at
						<a
							href="https://openrouter.ai/keys"
							target="_blank"
							rel="noopener noreferrer"
							class="text-primary inline-flex items-center gap-1 hover:underline"
						>
							openrouter.ai/keys
							<ExternalLinkIcon class="size-3" />
						</a>
					</p>
				</div>

				<!-- AI Gateway API Key Section -->
				<!-- <div class="space-y-2 border-t pt-4">
					<div class="flex items-center gap-2">
						<h5 class="text-sm font-medium">Vercel AI Gateway Key</h5>
						<HoverCard.Root openDelay={100} closeDelay={100}>
							<HoverCard.Trigger>
								<span
									class="cursor-help rounded-full bg-yellow-500/15 px-2 py-0.5 text-[10px] font-medium text-yellow-600 dark:text-yellow-400"
									>credits</span
								>
							</HoverCard.Trigger>
							<HoverCard.Content class="w-72 text-sm">
								<p class="mb-2">
									We are using <strong>GPT-5 Nano</strong> for image generation.
								</p>
								<a
									href="https://vercel.com/ai-gateway/models/gpt-5-nano"
									target="_blank"
									rel="noopener noreferrer"
									class="text-primary inline-flex items-center gap-1 hover:underline"
								>
									Check pricing on Vercel Gateway
									<ExternalLinkIcon class="size-3" />
								</a>
							</HoverCard.Content>
						</HoverCard.Root>
					</div>
					<p class="text-muted-foreground text-xs">
						Used for image generation (gpt-5-nano)
					</p>
					{#if aiGatewayKeyStore.hasKey}
						<div class="bg-muted/50 space-y-2 rounded-lg border p-3">
							<div class="flex items-center gap-2">
								<CheckIcon class="size-4 text-green-500" />
								<span class="text-sm font-medium">Saved</span>
							</div>
							<Button
								variant="destructive"
								size="sm"
								class="w-full"
								onclick={clearAiGatewayKey}
							>
								<Trash2Icon class="mr-2 size-3.5" />
								Remove
							</Button>
						</div>
					{:else}
						<div class="space-y-2">
							<Input
								id="ai-gateway-key-input"
								type="password"
								placeholder="sk-..."
								bind:value={aiGatewayKeyInput}
								class="text-sm"
							/>
							<Button
								variant="secondary"
								size="sm"
								class="w-full"
								onclick={saveAiGatewayKey}
								disabled={!aiGatewayKeyInput.trim()}
							>
								<KeyIcon class="mr-2 size-3.5" />
								Save Key
							</Button>
						</div>
					{/if}
					<p class="text-muted-foreground text-xs">
						Get key at
						<a
							href="https://vercel.com/docs/ai-gateway"
							target="_blank"
							rel="noopener noreferrer"
							class="text-primary inline-flex items-center gap-1 hover:underline"
						>
							vercel.com/ai-gateway
							<ExternalLinkIcon class="size-3" />
						</a>
					</p>
				</div> -->

				<!-- Models Used -->
				<div class="border-t pt-3">
					<h5 class="text-muted-foreground mb-2 text-xs font-medium uppercase">
						Models Used
					</h5>
					<div class="space-y-2">
						{#each models as model}
							<div class="text-xs">
								<div class="font-medium">{model.name}</div>
								<div class="text-muted-foreground font-mono text-[10px]">
									{model.id}
								</div>
								<div class="text-muted-foreground">{model.usage}</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</Popover.Content>
	</Popover.Root>
</div>
