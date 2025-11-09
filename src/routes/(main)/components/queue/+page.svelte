<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";
	import {
		Subheading,
		ComponentAPITable,
		CopyMarkdownButton,
		OpenInMenu,
	} from "$lib/components/docs";
	import Installation from "$lib/components/docs/installation.svelte";
	import Playground from "$lib/components/docs/playground.svelte";
	import Code from "$lib/components/docs/code.svelte";
	import { examples } from "./examples/examples";
	import { seo } from "./examples/seo";
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";

	import * as Sidebar from "$lib/components/ui/sidebar/index.js";

	import * as Toc from "$lib/components/docs/toc";
	import { UseToc } from "$lib/hooks/use-toc.svelte";
	let toc = new UseToc();

	// URL for llm.txt
	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/components/queue/llms.txt`;

	// Component API Props Data
	const queueProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the container",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Child components",
		},
		{
			name: "...restProps",
			type: "HTMLAttributes<HTMLDivElement>",
			description: "All other div props are supported",
		},
	];

	const queueSectionProps = [
		{
			name: "defaultOpen",
			type: "boolean",
			default: "true",
			description: "Whether the section is open by default",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Child components",
		},
		{
			name: "...restProps",
			type: "CollapsibleProps",
			description: "All other Collapsible props are supported",
		},
	];

	const queueItemProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Child components",
		},
		{
			name: "...restProps",
			type: "HTMLLiAttributes",
			description: "All other li props",
		},
	];

	const queueItemIndicatorProps = [
		{
			name: "completed",
			type: "boolean",
			default: "false",
			description: "Whether the item is completed",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes",
		},
	];

	const queueItemContentProps = [
		{
			name: "completed",
			type: "boolean",
			default: "false",
			description: "Whether the item is completed",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Content to display",
		},
	];
</script>

<!-- SEO Meta Tags -->
<MetaTags {...seo} />

<Sidebar.Inset class="min-h-svh">
	<div
		class="grid min-h-svh grid-cols-1 gap-8 md:grid-cols-[1fr_280px] md:px-6 md:pb-6 lg:grid-cols-[1fr_240px]"
	>
		<main class="min-w-0" bind:this={toc.ref}>
			<Subheading class="md:text-3xl">Queue</Subheading>
			<p class="!text-muted-foreground my-2 text-lg">
				A comprehensive queue component system for displaying message lists, todos, and
				collapsible task sections in AI applications.
			</p>

			<div class="mb-8 flex items-center gap-2">
				<CopyMarkdownButton {llmsTxtUrl} />
				<OpenInMenu componentName="queue" {llmsTxtUrl} type="ai-elements" />
			</div>

			<!-- Preview -->
			<Playground code={examples.basic.code} class="flex items-start justify-start">
				<examples.basic.Component />
			</Playground>

			<Installation
				specifier={`${PUBLIC_WEBSITE_URL}/r/queue.json`}
				is_jsrepo={true}
				blockname="queue"
			/>

			<!-- Usage -->
			<Subheading>Usage</Subheading>

			<div>
				<Code
					lang="svelte"
					code={`\<script lang="ts"\>
  import {
    Queue,
    QueueSection,
    QueueSectionTrigger,
    QueueSectionLabel,
    QueueSectionContent,
    QueueList,
    QueueItem,
    QueueItemIndicator,
    QueueItemContent,
  } from "$lib/components/ai-elements/queue";

  const tasks = [
    { id: "1", title: "Review pull request" },
    { id: "2", title: "Update documentation" },
  ];
\<\/script\>

<Queue>
  <QueueSection>
    <QueueSectionTrigger>
      <QueueSectionLabel count={tasks.length} label=" Tasks" />
    </QueueSectionTrigger>
    <QueueSectionContent>
      <QueueList>
        {#each tasks as task (task.id)}
          <QueueItem>
            <QueueItemIndicator />
            <QueueItemContent>{task.title}</QueueItemContent>
          </QueueItem>
        {/each}
      </QueueList>
    </QueueSectionContent>
  </QueueSection>
</Queue>`}
				/>
			</div>

			<!-- Examples -->
			<Subheading>Examples</Subheading>

			<h3 class="mb-4 text-lg font-semibold">With Descriptions</h3>
			<div>
				<Code
					lang="svelte"
					code={`\<script lang="ts"\>
  import {
    Queue,
    QueueList,
    QueueItem,
    QueueItemIndicator,
    QueueItemContent,
    QueueItemDescription,
  } from "$lib/components/ai-elements/queue";
\<\/script\>

<Queue>
  <QueueList>
    <QueueItem>
      <QueueItemIndicator />
      <QueueItemContent>Implement authentication</QueueItemContent>
      <QueueItemDescription>
        Add OAuth2 support with Google and GitHub providers
      </QueueItemDescription>
    </QueueItem>
  </QueueList>
</Queue>`}
				/>
			</div>

			<h3 class="mt-6 mb-4 text-lg font-semibold">With Actions</h3>
			<div>
				<Code
					lang="svelte"
					code={`\<script lang="ts"\>
  import { Trash2, Edit } from "@lucide/svelte/icons";
  import {
    Queue,
    QueueList,
    QueueItem,
    QueueItemIndicator,
    QueueItemContent,
    QueueItemActions,
    QueueItemAction,
  } from "$lib/components/ai-elements/queue";
\<\/script\>

<Queue>
  <QueueList>
    <QueueItem>
      <QueueItemIndicator />
      <QueueItemContent>Review pull request</QueueItemContent>
      <QueueItemActions>
        <QueueItemAction onclick={() => handleEdit()}>
          <Edit size={14} />
        </QueueItemAction>
        <QueueItemAction onclick={() => handleDelete()}>
          <Trash2 size={14} />
        </QueueItemAction>
      </QueueItemActions>
    </QueueItem>
  </QueueList>
</Queue>`}
				/>
			</div>

			<h3 class="mt-6 mb-4 text-lg font-semibold">With Attachments</h3>
			<div>
				<Code
					lang="svelte"
					code={`\<script lang="ts"\>
  import {
    Queue,
    QueueList,
    QueueItem,
    QueueItemIndicator,
    QueueItemContent,
    QueueItemAttachment,
    QueueItemImage,
    QueueItemFile,
  } from "$lib/components/ai-elements/queue";
\<\/script\>

<Queue>
  <QueueList>
    <QueueItem>
      <QueueItemIndicator />
      <QueueItemContent>Check out these designs</QueueItemContent>
      <QueueItemAttachment>
        <QueueItemImage src="/design1.png" alt="Design 1" />
        <QueueItemImage src="/design2.png" alt="Design 2" />
        <QueueItemFile>report.pdf</QueueItemFile>
      </QueueItemAttachment>
    </QueueItem>
  </QueueList>
</Queue>`}
				/>
			</div>

			<!-- Component API -->
			<Subheading>Component API</Subheading>

			<ComponentAPITable componentName="Queue" props={queueProps} />

			<ComponentAPITable componentName="QueueSection" props={queueSectionProps} />

			<ComponentAPITable componentName="QueueItem" props={queueItemProps} />

			<ComponentAPITable componentName="QueueItemIndicator" props={queueItemIndicatorProps} />

			<ComponentAPITable componentName="QueueItemContent" props={queueItemContentProps} />

			<!-- Features -->
			<Subheading>Features</Subheading>
			<ul class="text-muted-foreground ml-6 list-disc space-y-2">
				<li>Collapsible sections for organizing items into groups</li>
				<li>Completed/pending states with visual indicators</li>
				<li>Hover-revealed actions for clean UI</li>
				<li>Attachment support for images and files</li>
				<li>Scrollable lists with max height</li>
				<li>Smooth animations for expand/collapse</li>
				<li>Keyboard accessible with proper ARIA labels</li>
				<li>Responsive design that adapts to different screen sizes</li>
				<li>Seamless light/dark theme integration</li>
			</ul>

			<!-- Use Cases -->
			<!-- <Subheading>Use Cases</Subheading>
			<ul class="text-muted-foreground ml-6 list-disc space-y-2">
				<li>Task management with pending and completed states</li>
				<li>Message queues with attachments</li>
				<li>Todo lists with descriptions and actions</li>
				<li>Multi-step workflow displays</li>
				<li>File upload queues with progress</li>
				<li>AI agent task tracking</li>
			</ul> -->
		</main>

		<aside class="sticky top-24 hidden h-fit max-h-[calc(100vh-3rem)] overflow-y-auto md:flex">
			<div>
				<h3 class="text-sm">On this page</h3>
				<Toc.Root toc={toc.current} />
			</div>
		</aside>
	</div>
</Sidebar.Inset>
