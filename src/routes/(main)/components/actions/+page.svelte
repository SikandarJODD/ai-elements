<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";

	import Installation from "$lib/components/docs/installation.svelte";
	import { data } from "./data";
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";

	import AiElementsPrevNext from "$lib/components/ai-elements/ai-elements-prev-next.svelte";
	import { PreviewComponent } from "$lib/components/ui/preview-component";
	import { H1, H2, H3, Paragraph } from "$lib/components/markdown";
	import { CopyPageDropdown } from "$lib/components/docs/copy-page-dropdown";
	import { APITable } from "$lib/components/docs/api-table";

	// URL for llm.txt
	let llmsTxtUrl = $derived(`${PUBLIC_WEBSITE_URL}/components/actions/llms.txt`);

	let PreviewComp = $derived(data.preview);
	let examples = $derived(data.examples ? data.examples : []);
</script>

<!-- SEO Meta Tags -->
<MetaTags {...data.seo} />

<!-- Main Content Area -->
<section class="min-w-0">
	<div class="flex flex-col justify-between gap-3 md:flex-row md:items-center md:gap-4">
		<H1>Actions</H1>
		<CopyPageDropdown type="ai-elements" componentName="Actions" {llmsTxtUrl} />
	</div>
	<Paragraph>
		The Action component provides a flexible row of action buttons for AI responses with common
		actions like retry, like, dislike, copy, and share.
	</Paragraph>
	<PreviewComponent code={data.previewCode}>
		{#if PreviewComp}
			<PreviewComp />
		{/if}
	</PreviewComponent>

	<Installation
		specifier={`${PUBLIC_WEBSITE_URL}/r/action.json`}
		is_jsrepo={false}
		blockname="action"
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

	{#if data?.props && data.props.length > 0}
		<section>
			<H2 id="props">Props</H2>
			<div class="mt-3 space-y-6">
				<div>
					{#each data.props as prop}
						<APITable data={prop} />
					{/each}
				</div>
			</div>
		</section>
	{/if}

	<AiElementsPrevNext currentSlug="actions" />
</section>
