<script lang="ts" module>
	import type { Component } from "svelte";
	import type { SEO } from "$lib/types/seo";
	import type { Example } from "$lib/types/example";
	import type {
		InstallComponentDocs,
		PropsTable
	} from "$lib/types/structure";

	export type ComponentDocPageProps = {
		id: string;
		title: string;
		description: string;
		seo: SEO;
		installPathPrefix?: "r" | "s" | "f";
		preview?: Component;
		previewCode?: CodeBlock | CodeBlock[];
		installCodeBlocks?: CodeBlock | CodeBlock[];
		installPackages?: string[];
		installFolderStructure?: string;
		installTailwindCode?: CodeBlock;
		examples?: Example[];
		propsTables?: PropsTable[];
		descriptionClass?: string;
		install?: InstallComponentDocs; // new prop which covers everything
	};
</script>

<script lang="ts">
	import { page } from "$app/state";
	import { H1, H2, Paragraph, H3 } from "$markdown";
	import type { CodeBlock } from "$lib/types/code";
	import PackageBadges from "./package-badges.svelte";
	import InstallComponent from "./install-component.svelte";
	import ApiTable from "../api-table/api-table.svelte";
	import Seo from "./seo.svelte";
	import { PreviewComponent } from "$lib/components/ui/preview-component";
	import CopyPageDropdown from "./copy-page-dropdown.svelte";
	import { CompactApiTable } from "../api-table";

	let {
		id,
		title,
		description,
		seo,
		installPathPrefix,
		preview,
		previewCode,
		installCodeBlocks,
		installPackages = [],
		installFolderStructure,
		installTailwindCode,
		examples = [],
		propsTables = [],
		descriptionClass = "",
		install
	}: ComponentDocPageProps = $props();

	let PreviewComp = $derived(preview);
	let installUrl = $derived(`${page.url.origin}/r/${id}.json`);

	let getURLPath = (url: string) => {
		// clean url by removing query params and hash
		let cleanUrl = url.split("?")[0].split("#")[0];
		return cleanUrl;
	};

	let llmsTxtUrl = $derived(`${getURLPath(page.url.href)}/llms.txt`);
</script>

<Seo title={seo.title} description={seo.description} keywords={seo.keywords} />
<div class="space-y-6 md:space-y-8">
	<section>
		<div
			class="flex flex-col justify-between gap-3 md:flex-row md:items-center md:gap-4"
		>
			<H1 id="introduction">{title}</H1>
			<CopyPageDropdown componentName={title} {llmsTxtUrl} />
		</div>

		<div class="mt-3 max-w-2xl">
			<Paragraph class={descriptionClass}>
				{description}
			</Paragraph>
			<PackageBadges packages={installPackages} />
		</div>
	</section>

	<section>
		<PreviewComponent code={previewCode}>
			{#if PreviewComp}
				<PreviewComp />
			{/if}
		</PreviewComponent>
	</section>

	<section>
		<H2 id="installation">Installation</H2>
		<InstallComponent
			{installUrl}
			tailwindConfig={installTailwindCode
				? { code: installTailwindCode }
				: undefined}
			codeBlocks={installCodeBlocks}
			packages={installPackages}
			folderStructure={installFolderStructure}
			class="mt-4"
			{install}
		/>
	</section>

	{#if examples.length > 0}
		<section>
			<H2 id="examples">Examples</H2>
			<div class="mt-4 space-y-8">
				{#each examples as example (example.name)}
					<div class="space-y-0">
						<H3
							id={example.name.toLowerCase().replace(/\s+/g, "-")}
							class="mt-0"
						>
							{example.name}
						</H3>
						{#if example.description}
							<Paragraph>
								{example.description}
							</Paragraph>
						{/if}
						<PreviewComponent
							code={example.code}
							class={example.previewClass}
						>
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
			<div class="mt-3 space-y-8">
				{#each propsTables as prop}
					<CompactApiTable data={prop} />
				{/each}
			</div>
		</section>
	{/if}
</div>
