<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";

	import Installation from "$lib/components/docs/installation.svelte";
	import { APITable } from "$lib/components/docs/api-table";
	import { CopyPageDropdown } from "$lib/components/docs/copy-page-dropdown";
	import { H1, H2, H3, Paragraph } from "$lib/components/markdown";
	import { PreviewComponent } from "$lib/components/ui/preview-component";
	import type { ComponentPageDocsProps } from "./component-page-docs.types";

	let {
		data,
		intro,
		llmsTxtUrl,
		installation,
		type = "ai-elements",
		componentName,
		previewClass = "",
		previewIsCentered = true,
		previewShowRetry = true,
	}: ComponentPageDocsProps = $props();

	let pageTitle = $derived(data.title);
	let pageIntro = $derived(intro ?? data.description);
	let resolvedComponentName = $derived(componentName ?? data.title);
	let PreviewComp = $derived(data.preview);
	let examples = $derived(data.examples ?? []);
	let propsTables = $derived(data.props ?? []);
</script>

<MetaTags {...data.seo} />

<section class="min-w-0">
	<div class="flex flex-col justify-between gap-3 md:flex-row md:items-center md:gap-4">
		<H1 class="font-bold" id="title">{pageTitle}</H1>
		<CopyPageDropdown {type} componentName={resolvedComponentName} {llmsTxtUrl} />
	</div>

	<Paragraph>{pageIntro}</Paragraph>w

	{#if PreviewComp}
		<PreviewComponent
			code={data.previewCode}
			class={previewClass}
			isCentered={previewIsCentered}
			showRetry={previewShowRetry}
		>
			<PreviewComp />
		</PreviewComponent>
	{/if}

	<Installation
		specifier={installation.specifier}
		is_jsrepo={installation.isJsrepo}
		blockname={installation.blockname}
	/>

	{#if examples.length > 0}
		<section>
			<H2 id="examples">Examples</H2>
			<div class="mt-4 space-y-8">
				{#each examples as example}
					<div class="space-y-0">
						<H3 id={example.name.toLowerCase().replace(/\s+/g, "-")} class="mt-0">
							{example.name}
						</H3>
						<PreviewComponent code={example.code}>
							<example.preview />
						</PreviewComponent>
					</div>
				{/each}
			</div>
		</section>
	{/if}

	{#if propsTables.length > 0}
		<section>
			<H2 id="props">Props</H2>
			<div class="mt-3 space-y-6">
				<div>
					{#each propsTables as prop}
						<APITable data={prop} />
					{/each}
				</div>
			</div>
		</section>
	{/if}
</section>
