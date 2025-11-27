<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import * as Popover from "$lib/components/ui/popover";
	import { openRouterKeyStore } from "$lib/config/open-router-key.svelte";
	import KeyIcon from "@lucide/svelte/icons/key-round";
	import Trash2Icon from "@lucide/svelte/icons/trash-2";
	import CheckIcon from "@lucide/svelte/icons/check";
	import ExternalLinkIcon from "@lucide/svelte/icons/external-link";

	let apiKeyInput = $state("");
	let isOpen = $state(false);

	function saveApiKey() {
		if (apiKeyInput.trim()) {
			openRouterKeyStore.key = apiKeyInput.trim();
			apiKeyInput = "";
		}
	}

	function clearApiKey() {
		openRouterKeyStore.clear();
		apiKeyInput = "";
	}

	// Models used in cookbook
	const models = [
		{ name: "GLM 4.5 Air", id: "z-ai/glm-4.5-air:free", usage: "Text generation, streaming" },
		{ name: "GPT-4o", id: "openai/gpt-4o", usage: "Image generation" },
	];
</script>

<div class="fixed right-4 bottom-4 z-50">
	<Popover.Root bind:open={isOpen}>
		<Popover.Trigger>
			<Button
				variant="outline"
				size="sm"
				class="gap-2 shadow-md {openRouterKeyStore.hasKey
					? 'border-green-500/50 bg-green-500/10'
					: ''}"
			>
				<KeyIcon class="size-4" />
				API Key
				{#if openRouterKeyStore.hasKey}
					<CheckIcon class="size-3 text-green-500" />
				{/if}
			</Button>
		</Popover.Trigger>

		<Popover.Content class="w-80" align="end" side="top">
			<div class="space-y-4">
				<!-- Header -->
				<div>
					<h4 class="font-medium">OpenRouter API Key</h4>
					<p class="text-muted-foreground text-xs">
						Your key is stored locally and never sent to our servers.
					</p>
				</div>

				<!-- API Key Input -->
				{#if openRouterKeyStore.hasKey}
					<div class="bg-muted/50 space-y-3 rounded-lg border p-3">
						<div class="flex items-center gap-2">
							<CheckIcon class="size-4 text-green-500" />
							<span class="text-sm font-medium">API Key Saved</span>
						</div>
						<Button variant="destructive" size="sm" class="w-full" onclick={clearApiKey}>
							<Trash2Icon class="mr-2 size-3.5" />
							Remove API Key
						</Button>
					</div>
				{:else}
					<div class="space-y-2">
						<label for="api-key-input" class="text-sm font-medium">API Key</label>
						<Input
							id="api-key-input"
							type="password"
							placeholder="sk-or-v1-..."
							bind:value={apiKeyInput}
							class="text-sm"
						/>
						<Button
							variant="secondary"
							size="sm"
							class="w-full"
							onclick={saveApiKey}
							disabled={!apiKeyInput.trim()}
						>
							<KeyIcon class="mr-2 size-3.5" />
							Save API Key
						</Button>
					</div>
				{/if}

				<!-- Get API Key Link -->
				<p class="text-muted-foreground text-xs">
					Get your free API key at
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

				<!-- Models Used -->
				<div class="border-t pt-3">
					<h5 class="text-muted-foreground mb-2 text-xs font-medium uppercase">Models Used</h5>
					<div class="space-y-2">
						{#each models as model}
							<div class="text-xs">
								<div class="font-medium">{model.name}</div>
								<div class="text-muted-foreground font-mono text-[10px]">{model.id}</div>
								<div class="text-muted-foreground">{model.usage}</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</Popover.Content>
	</Popover.Root>
</div>

