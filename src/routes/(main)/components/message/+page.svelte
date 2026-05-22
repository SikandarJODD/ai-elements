<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";

	import Installation from "$lib/components/docs/installation.svelte";
	import Code from "$lib/components/docs/code.svelte";
	import { APITable } from "$lib/components/docs/base/api-table";
	import { CopyPageDropdown } from "$lib/components/docs/base/main/copy-page-dropdown";
	import { CodeSpan, H1, H2, H3, Paragraph } from "$lib/components/markdown";
	import { PMCommand } from "$lib/components/ui/pm-command";
	import { PreviewComponent } from "$lib/components/ui/preview-component";
	import { data } from "./data";
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";

	let pageTitle = $derived(data.title);
	let pageIntro = $derived(data.description);
	let resolvedComponentName = $derived(data.title);
	let PreviewComp = $derived(data.preview);
	let examples = $derived(data.examples ?? []);
	let propsTables = $derived(data.props ?? []);
	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/components/message/llms.txt`;
	const messageResponseWithPluginsCode = `\<script lang="ts"\>
	import { Streamdown, type StreamdownProps } from 'streamdown-svelte';
	import { code } from '@streamdown-svelte/code';
	import { mermaid } from '@streamdown-svelte/mermaid';
	import { math } from '@streamdown-svelte/math';
	import { cjk } from '@streamdown-svelte/cjk';
	import 'katex/dist/katex.min.css';

	import { mode } from 'mode-watcher';
	import githubDarkDefault from '@shikijs/themes/github-dark-default';
	import githubLightDefault from '@shikijs/themes/github-light-default';
	import { cn } from '$lib/utils';
	type Props = StreamdownProps;

	let { content, class: className, components, ...restProps }: Props = $props();
	let currentTheme = $derived(
		mode.current === 'dark' ? 'github-dark-default' : 'github-light-default'
	);
\<\/script\>

<div class={cn('size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0', className)}>
	<Streamdown
		{content}
		baseTheme="shadcn"
		shikiTheme={currentTheme}
		shikiThemes={{
			'github-light-default': githubLightDefault,
			'github-dark-default': githubDarkDefault
		}}
		plugins={{ code, mermaid, math, cjk }}
		{...restProps}
	/>
</div>`;
</script>

<MetaTags {...data.seo} />

<section class="min-w-0">
	<div class="flex flex-col justify-between gap-3 md:flex-row md:items-center md:gap-4">
		<H1 class="font-bold" id="title">{pageTitle}</H1>
		<CopyPageDropdown type="ai-elements" componentName={resolvedComponentName} {llmsTxtUrl} />
	</div>

	<Paragraph>{pageIntro}</Paragraph>

	{#if PreviewComp}
		<PreviewComponent code={data.previewCode} isCentered={true}>
			<PreviewComp />
		</PreviewComponent>
	{/if}

	<div class="mt-8 mb-12">
		<Installation
			specifier="{PUBLIC_WEBSITE_URL}/r/message.json"
			is_jsrepo={false}
			blockname="message"
		/>
	</div>

	<section class="mb-12 space-y-4">
		<H2 id="additional-steps">Additional Steps</H2>
		<div class="space-y-6">
			<div>
				<Paragraph id="add-streamdown-source" class="mt-0 mb-2">Add to <CodeSpan>layout.css</CodeSpan> file</Paragraph>
				<Code
					hideLines
					lang="css"
					code={`@source "../../node_modules/streamdown-svelte/dist/**/*.{js,svelte,ts}";`}
				/>
			</div>

			<div>
				<Paragraph id="install-streamdown-plugins" class="mt-0 mb-2">Install plugin packages for Maths, Mermaid, and CJK rendering</Paragraph>
				<PMCommand
					command="add"
					args={[
						"@streamdown-svelte/mermaid",
						"@streamdown-svelte/code",
						"@streamdown-svelte/math",
						"@streamdown-svelte/cjk",
						"katex"
					]}
				/>
			</div>

			<div>
				<Paragraph id="add-streamdown-plugins" class="mt-0 mb-2">
					Update <CodeSpan>MessageResponse.svelte</CodeSpan>
				</Paragraph>
				<Code
					lang="svelte"
					code={messageResponseWithPluginsCode}
					highlight={[[3, 7], 30]}
				/>
			</div>
		</div>
	</section>

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
