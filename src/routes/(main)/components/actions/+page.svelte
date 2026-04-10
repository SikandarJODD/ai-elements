<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";
	import {
		Subheading,
		ComponentAPITable,
		CopyMarkdownButton,
		OpenInMenu,
	} from "$lib/components/docs";
	import Installation from "$lib/components/docs/installation.svelte";
	import { data } from "./data";
	import CodeSpan from "$lib/components/docs/code-span.svelte";
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";

	import AiElementsPrevNext from "$lib/components/ai-elements/ai-elements-prev-next.svelte";
	import { PreviewComponent } from "$lib/components/ui/preview-component";
	import { H2 } from "$lib/components/markdown";
	import H3 from "$lib/components/markdown/H3.svelte";

	// URL for llm.txt
	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/components/actions/llms.txt`;

	// Component API Props Data
	const actionsProps = [
		{
			name: "children",
			type: "Snippet",
			description: "Child Action components to render",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the container",
		},
		{
			name: "...restProps",
			type: "HTMLAttributes<HTMLDivElement>",
			description: "All other div props are supported",
		},
	];

	const actionProps = [
		{
			name: "tooltip",
			type: "string",
			description: "Tooltip text to display on hover",
		},
		{
			name: "label",
			type: "string",
			description:
				"Accessible label for screen readers (falls back to tooltip if not provided)",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Icon or content to render inside the button",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the button",
		},
		{
			name: "variant",
			type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'",
			default: "'ghost'",
			description: "Visual style variant of the button",
		},
		{
			name: "size",
			type: "'default' | 'sm' | 'lg' | 'icon'",
			default: "'sm'",
			description: "Size of the button",
		},
		{
			name: "onclick",
			type: "(event: MouseEvent) => void",
			description: "Click event handler",
		},
		{
			name: "disabled",
			type: "boolean",
			description: "Whether the button is disabled",
		},
		{
			name: "...restProps",
			type: "HTMLButtonAttributes | HTMLAnchorAttributes",
			description: "All other button/anchor props are supported (href for links)",
		},
	];
	let PreviewComp = $derived(data.preview);
	let examples = $derived(data.examples ? data.examples : []);
</script>

<!-- SEO Meta Tags -->
<MetaTags {...data.seo} />

<!-- Main Content Area -->
<section class="min-w-0">
	<Subheading class="md:text-3xl">Actions</Subheading>

	<p class="text-muted-foreground! my-2 text-lg">
		The Action component provides a flexible row of action buttons for AI responses with common
		actions like retry, like, dislike, copy, and share.
	</p>
	<div class="mb-8 flex items-center gap-2">
		<CopyMarkdownButton {llmsTxtUrl} />
		<OpenInMenu componentName="Actions" {llmsTxtUrl} type="ai-elements" />
	</div>
	<PreviewComponent code={data.previewCode}>
		{#if PreviewComp}
			<PreviewComp />
		{/if}
	</PreviewComponent>

	<Installation
		specifier={`${PUBLIC_WEBSITE_URL}/r/action.json`}
		is_jsrepo={true}
		blockname="action"
	/>

	<!-- Examples  -->
	<Subheading>Examples</Subheading>

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

	<!-- Component API Section -->
	<Subheading>Props</Subheading>

	<!-- Actions -->
	<ComponentAPITable
		componentName="Actions"
		props={actionsProps}
		class="mt-6"
		id="actions-props"
	/>

	<!-- Action -->
	<ComponentAPITable componentName="Action" props={actionProps} id="action-props" />

	<AiElementsPrevNext currentSlug="actions" />
</section>
