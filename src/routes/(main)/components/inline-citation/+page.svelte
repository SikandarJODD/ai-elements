<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";
	import { Subheading, CodeNameBlock, ComponentAPITable } from "$lib/components/docs";
	import Installation from "$lib/components/docs/installation.svelte";
	import Playground from "$lib/components/docs/playground.svelte";
	import Code from "$lib/components/docs/code.svelte";
	import { examples } from "./examples/examples";
	import { seo } from "./examples/seo";
	import CodeSpan from "$lib/components/docs/code-span.svelte";
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";

	import * as Sidebar from "$lib/components/ui/sidebar/index.js";

	import * as Toc from "$lib/components/docs/toc";
	import { UseToc } from "$lib/hooks/use-toc.svelte";
	let toc = new UseToc();
	// Component API Props Data
	const inlineCitationProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the inline citation container",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Citation content (typically InlineCitationText and InlineCitationCard)",
		},
		{
			name: "...restProps",
			type: "HTMLAttributes<HTMLSpanElement>",
			description: "All other span props are supported",
		},
	];

	const inlineCitationCardProps = [
		{
			name: "closeDelay",
			type: "number",
			default: "0",
			description: "Delay in milliseconds before closing the hover card",
		},
		{
			name: "openDelay",
			type: "number",
			default: "0",
			description: "Delay in milliseconds before opening the hover card",
		},
		{
			name: "open",
			type: "boolean",
			description: "Controls whether the card is open (bindable)",
		},
		{
			name: "children",
			type: "Snippet",
			description:
				"Card content (typically InlineCitationCardTrigger and InlineCitationCardBody)",
		},
	];

	const inlineCitationCardTriggerProps = [
		{
			name: "sources",
			type: "string[]",
			description: "Array of source URLs to display in the badge",
		},
		{
			name: "variant",
			type: "'default' | 'secondary' | 'destructive' | 'outline'",
			default: "'secondary'",
			description: "Badge variant style",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the badge",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Custom badge content (defaults to hostname with count)",
		},
	];

	const inlineCitationCardBodyProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the card body",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Card body content (typically InlineCitationCarousel)",
		},
	];

	const inlineCitationCarouselProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the carousel",
		},
		{
			name: "opts",
			type: "object",
			description: "Embla carousel options",
		},
		{
			name: "plugins",
			type: "any[]",
			description: "Embla carousel plugins",
		},
		{
			name: "orientation",
			type: "'horizontal' | 'vertical'",
			default: "'horizontal'",
			description: "Carousel orientation",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Carousel content (typically header, content, and navigation)",
		},
	];

	const inlineCitationCarouselHeaderProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the carousel header",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Header content (typically index and navigation buttons)",
		},
		{
			name: "...restProps",
			type: "HTMLAttributes<HTMLDivElement>",
			description: "All other div props are supported",
		},
	];

	const inlineCitationCarouselContentProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the carousel content",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Carousel items (InlineCitationCarouselItem components)",
		},
	];

	const inlineCitationCarouselItemProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the carousel item",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Item content (typically InlineCitationSource)",
		},
	];

	const inlineCitationCarouselNextProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the next button",
		},
		{
			name: "...restProps",
			type: "HTMLButtonAttributes",
			description: "All other button props are supported",
		},
	];

	const inlineCitationCarouselPrevProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the previous button",
		},
		{
			name: "...restProps",
			type: "HTMLButtonAttributes",
			description: "All other button props are supported",
		},
	];
</script>

<!-- SEO Meta Tags -->
<MetaTags {...seo} />

<Sidebar.Inset class="min-h-svh">
	<div
		class="grid min-h-svh grid-cols-1 gap-8 md:grid-cols-[1fr_280px] md:px-6 md:pb-6 lg:grid-cols-[1fr_240px]"
	>
		<!-- Main Content Area -->
		<main class="min-w-0" bind:this={toc.ref}>
			<Subheading class="md:text-3xl">Inline Citation</Subheading>

			<p class="!text-muted-foreground my-2 text-lg">
				The <CodeSpan>Inline Citation</CodeSpan> component provides a way to display citations
				inline with text content, similar to academic papers or research documents. It consists
				of a citation pill that shows detailed source information on hover, making it perfect
				for AI-generated content that needs to reference sources.
			</p>

			<Playground code={examples.basic.code}>
				<examples.basic.Component />
			</Playground>

			<!-- pnpm dlx shadcn-svelte@latest add http://localhost:5173/r/hello-world.json -->
			<Installation
				specifier={`${PUBLIC_WEBSITE_URL}/r/inline-citation.json`}
				is_jsrepo={true}
				blockname="inline-citation"
			/>

			<!-- Usage -->
			<Subheading>Usage</Subheading>

			<div>
				<Code
					lang="svelte"
					code={`\<script lang="ts"\>
	import {
		InlineCitation,
		InlineCitationText,
		InlineCitationCard,
		InlineCitationCardTrigger,
		InlineCitationCardBody,
		InlineCitationCarousel,
		InlineCitationCarouselContent,
		InlineCitationCarouselItem,
		InlineCitationCarouselHeader,
		InlineCitationCarouselIndex,
		InlineCitationCarouselPrev,
		InlineCitationCarouselNext,
		InlineCitationSource,
		InlineCitationQuote
	} from '$lib/components/ai-elements/inline-citation/index.js';
\<\/script\>

<InlineCitation>
				<InlineCitationText>
					New frameworks like Svelte offer better performance and developer experience
				</InlineCitationText>
				<InlineCitationCard>
					<InlineCitationCardTrigger {sources} />
					<InlineCitationCardBody>
						<InlineCitationCarousel>
							<InlineCitationCarouselHeader>
								<InlineCitationCarouselPrev />
								<InlineCitationCarouselIndex />
								<InlineCitationCarouselNext />
							</InlineCitationCarouselHeader>
							<InlineCitationCarouselContent>
								{#each sourceDetails as source, index}
									<InlineCitationCarouselItem>
										<InlineCitationSource
											title={source.title}
											url={source.url}
											description={source.description}
										/>
										{#if sampleQuotes[index]}
											<InlineCitationQuote>
												{sampleQuotes[index]}
											</InlineCitationQuote>
										{/if}
									</InlineCitationCarouselItem>
								{/each}
							</InlineCitationCarouselContent>
						</InlineCitationCarousel>
					</InlineCitationCardBody>
				</InlineCitationCard>
			</InlineCitation>`}
				/>
			</div>

			<!-- Usage with AI SDK -->
			<Subheading>Usage with AI SDK</Subheading>

			<p class="mb-4 text-sm leading-relaxed sm:text-base">
				Build citations for AI-generated content using <CodeSpan
					>experimental_useObject</CodeSpan
				> from <CodeSpan>@ai-sdk/svelte</CodeSpan>.
			</p>

			<p class="mb-4 text-sm leading-relaxed sm:text-base">
				Add the following component to your frontend:
			</p>

			<div class="mb-6">
				<CodeNameBlock
					filename="+page.svelte"
					lang="svelte"
					code={`\<script lang="ts"\>
  import { experimental_useObject as useObject } from '@ai-sdk/svelte';
  import {
    InlineCitation,
    InlineCitationCard,
    InlineCitationCardTrigger,
    InlineCitationCardBody,
    InlineCitationCarousel,
    InlineCitationCarouselContent,
    InlineCitationCarouselItem,
    InlineCitationCarouselHeader,
    InlineCitationCarouselIndex,
    InlineCitationCarouselPrev,
    InlineCitationCarouselNext,
    InlineCitationSource,
    InlineCitationQuote,
  } from '$lib/components/ai-elements/inline-citation/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import type { citationSchema } from './api/citation/+server';

  let object = $state<typeof citationSchema | undefined>(undefined);
  let isLoading = $state(false);

  async function handleSubmit(topic: string) {
    isLoading = true;
    const { submit } = useObject({
      api: '/api/citation',
      schema: citationSchema,
    });

    const result = await submit({ prompt: topic });
    object = result.object;
    isLoading = false;
  }
\<\/script\>

<div class="max-w-4xl mx-auto p-6 space-y-6">
  <div class="flex gap-2 mb-6">
    <Button
      onclick={() => handleSubmit('artificial intelligence')}
      disabled={isLoading}
      variant="outline"
    >
      Generate AI Content
    </Button>
    <Button
      onclick={() => handleSubmit('climate change')}
      disabled={isLoading}
      variant="outline"
    >
      Generate Climate Content
    </Button>
  </div>

  {#if isLoading && !object}
    <div class="text-muted-foreground">
      Generating content with citations...
    </div>
  {/if}

  {#if object?.content}
    <div class="prose prose-sm max-w-none">
      <p class="leading-relaxed">
        {#each object.content.split(/(\[\\d+\])/) as part, index}
          {@const citationMatch = part.match(/\[(\\d+)\]/)}
          {#if citationMatch}
            {@const citationNumber = citationMatch[1]}
            {@const citation = object.citations?.find(
              (c) => c.number === citationNumber
            )}
            {#if citation}
              <InlineCitation>
                <InlineCitationCard>
                  <InlineCitationCardTrigger sources={[citation.url]} />
                  <InlineCitationCardBody>
                    <InlineCitationCarousel>
                      <InlineCitationCarouselHeader>
                        <InlineCitationCarouselPrev />
                        <InlineCitationCarouselNext />
                        <InlineCitationCarouselIndex />
                      </InlineCitationCarouselHeader>
                      <InlineCitationCarouselContent>
                        <InlineCitationCarouselItem>
                          <InlineCitationSource
                            title={citation.title}
                            url={citation.url}
                            description={citation.description}
                          />
                          {#if citation.quote}
                            <InlineCitationQuote>
                              {citation.quote}
                            </InlineCitationQuote>
                          {/if}
                        </InlineCitationCarouselItem>
                      </InlineCitationCarouselContent>
                    </InlineCitationCarousel>
                  </InlineCitationCardBody>
                </InlineCitationCard>
              </InlineCitation>
            {/if}
          {:else}
            {part}
          {/if}
        {/each}
      </p>
    </div>
  {/if}
</div>`}
				/>
			</div>

			<p class="mb-4 text-sm leading-relaxed sm:text-base">
				Add the following route to your backend:
			</p>

			<div class="mb-6">
				<CodeNameBlock
					filename="api/citation/+server.ts"
					lang="typescript"
					code={`import { streamObject } from 'ai';
import { z } from 'zod';
import { openrouter, defaultModel } from '$lib/config/ai-config';
import type { RequestHandler } from './$types';

export const citationSchema = z.object({
  content: z.string(),
  citations: z.array(
    z.object({
      number: z.string(),
      title: z.string(),
      url: z.string(),
      description: z.string().optional(),
      quote: z.string().optional(),
    })
  ),
});

export const POST: RequestHandler = async ({ request }) => {
  const { prompt } = await request.json();

  const result = streamObject({
    model: openrouter(defaultModel),
    schema: citationSchema,
    prompt: \`Generate a well-researched paragraph about \${prompt} with proper citations.
      Include:
      - A comprehensive paragraph with inline citations marked as [1], [2], etc.
      - 2-3 citations with realistic source information
      - Each citation should have a title, URL, and optional description/quote
      - Make the content informative and the sources credible

      Format citations as numbered references within the text.\`,
  });

  return result.toTextStreamResponse();
};`}
				/>
			</div>

			<!-- Features -->
			<Subheading>Features</Subheading>

			<ul class="mb-6 list-inside list-disc space-y-2 text-sm leading-relaxed sm:text-base">
				<li>Hover interaction to reveal detailed citation information</li>
				<li>Carousel navigation for multiple citations with prev/next controls</li>
				<li>Live index tracking showing current slide position (e.g., "1/5")</li>
				<li>Support for source titles, URLs, and descriptions</li>
				<li>Optional quote blocks for relevant excerpts</li>
				<li>Composable architecture for flexible citation formats</li>
				<li>Accessible design with proper keyboard navigation</li>
				<li>Seamless integration with AI-generated content</li>
				<li>Clean visual design that doesn't disrupt reading flow</li>
				<li>Smart badge display showing source hostname and count</li>
			</ul>

			<!-- Examples  -->
			<!-- <Subheading>Examples</Subheading>

      <Playground code={examples.messageAction.code}>
        <examples.messageAction.Component />
      </Playground> -->

			<!-- Component API Section -->
			<Subheading>Props</Subheading>

			<!-- InlineCitation -->
			<ComponentAPITable
				componentName="InlineCitation"
				props={inlineCitationProps}
				class="mt-6"
				id="inline-citation-props"
			/>

			<!-- InlineCitationCard -->
			<ComponentAPITable
				componentName="InlineCitationCard"
				props={inlineCitationCardProps}
				id="inline-citation-card-props"
			/>

			<!-- InlineCitationCardTrigger -->
			<ComponentAPITable
				componentName="InlineCitationCardTrigger"
				props={inlineCitationCardTriggerProps}
				id="inline-citation-card-trigger-props"
			/>

			<!-- InlineCitationCardBody -->
			<ComponentAPITable
				componentName="InlineCitationCardBody"
				props={inlineCitationCardBodyProps}
				id="inline-citation-card-body-props"
			/>

			<!-- InlineCitationCarousel -->
			<ComponentAPITable
				componentName="InlineCitationCarousel"
				props={inlineCitationCarouselProps}
				id="inline-citation-carousel-props"
			/>

			<!-- InlineCitationCarouselHeader -->
			<ComponentAPITable
				componentName="InlineCitationCarouselHeader"
				props={inlineCitationCarouselHeaderProps}
				id="inline-citation-carousel-header-props"
			/>

			<!-- InlineCitationCarouselContent -->
			<ComponentAPITable
				componentName="InlineCitationCarouselContent"
				props={inlineCitationCarouselContentProps}
				id="inline-citation-carousel-content-props"
			/>

			<!-- InlineCitationCarouselItem -->
			<ComponentAPITable
				componentName="InlineCitationCarouselItem"
				props={inlineCitationCarouselItemProps}
				id="inline-citation-carousel-item-props"
			/>

			<!-- InlineCitationCarouselNext -->
			<ComponentAPITable
				componentName="InlineCitationCarouselNext"
				props={inlineCitationCarouselNextProps}
				id="inline-citation-carousel-next-props"
			/>

			<!-- InlineCitationCarouselPrev -->
			<ComponentAPITable
				componentName="InlineCitationCarouselPrev"
				props={inlineCitationCarouselPrevProps}
				id="inline-citation-carousel-prev-props"
			/>
		</main>

		<!-- TOC Sidebar - Sticky on larger screens -->
		<aside class="sticky top-24 hidden h-fit max-h-[calc(100vh-3rem)] overflow-y-auto md:flex">
			<!-- TOC Component -->
			<div>
				<h3 class="text-sm">On this page</h3>
				<Toc.Root toc={toc.current} />
			</div>
		</aside>
	</div>
</Sidebar.Inset>
