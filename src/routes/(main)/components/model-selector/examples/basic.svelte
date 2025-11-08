<script lang="ts">
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
	} from "$lib/components/ai-elements/model-selector/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import CheckIcon from "@lucide/svelte/icons/check";

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
			id: "claude-sonnet-4-20250514",
			name: "Claude 4 Sonnet",
			chef: "Anthropic",
			chefSlug: "anthropic",
			providers: ["anthropic", "azure", "google-vertex", "amazon-bedrock"],
		},
		{
			id: "claude-3.5-sonnet",
			name: "Claude 3.5 Sonnet",
			chef: "Anthropic",
			chefSlug: "anthropic",
			providers: ["anthropic", "azure", "google-vertex", "amazon-bedrock"],
		},
		{
			id: "gemini-2.0-flash-exp",
			name: "Gemini 2.0 Flash",
			chef: "Google",
			chefSlug: "google",
			providers: ["google", "google-vertex"],
		},
		{
			id: "gemini-1.5-pro",
			name: "Gemini 1.5 Pro",
			chef: "Google",
			chefSlug: "google",
			providers: ["google", "google-vertex"],
		},
	];

	let open = $state(false);
	let selectedModel = $state("gpt-4o");

	const selectedModelData = $derived(models.find((model) => model.id === selectedModel));
	const chefs = $derived(Array.from(new Set(models.map((model) => model.chef))));
</script>

<ModelSelector bind:open>
	<ModelSelectorTrigger>
		<Button class="w-[200px] justify-between" variant="outline">
			{#if selectedModelData?.chefSlug}
				<ModelSelectorLogo provider={selectedModelData.chefSlug} />
			{/if}
			{#if selectedModelData?.name}
				<ModelSelectorName>{selectedModelData.name}</ModelSelectorName>
			{/if}
			<CheckIcon class="ml-2 size-4 shrink-0 opacity-50" />
		</Button>
	</ModelSelectorTrigger>
	<ModelSelectorContent>
		<ModelSelectorInput placeholder="Search models..." />
		<ModelSelectorList>
			<ModelSelectorEmpty>No models found.</ModelSelectorEmpty>
			{#each chefs as chef}
				<ModelSelectorGroup heading={chef}>
					{#each models.filter((model) => model.chef === chef) as model}
						<ModelSelectorItem
							value={model.id}
							onSelect={() => {
								selectedModel = model.id;
								open = false;
							}}
						>
							<ModelSelectorLogo provider={model.chefSlug} />
							<ModelSelectorName>{model.name}</ModelSelectorName>
							<ModelSelectorLogoGroup>
								{#each model.providers as provider}
									<ModelSelectorLogo {provider} />
								{/each}
							</ModelSelectorLogoGroup>
							{#if selectedModel === model.id}
								<CheckIcon class="ml-auto size-4" />
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
