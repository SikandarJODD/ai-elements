<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { MetaTags } from "svelte-meta-tags";
	import { Subheading, AiInstallCommand, ComponentAPITable } from "$lib/components/docs";
	import * as Code from "$lib/components/ai-elements/code/index.js";

	import { UseToc } from "$lib/hooks/use-toc.svelte";
	import PromptKitPrevNext from "$lib/components/prompt-kit/prompt-kit-prev-next.svelte";
	import { H1, Paragraph } from "$lib/components/markdown";
	import { data } from "./data";
	import { CopyPageDropdown } from "$lib/components/docs/copy-page-dropdown";
	import { PreviewComponent } from "$lib/components/ui/preview-component";
	import PmCommand from "$lib/components/ui/pm-command/pm-command.svelte";
	let toc = new UseToc();

	// URL for llm.txt
	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/prompt-kit/scroll-button/llms.txt`;

	// Component API Props Data
	const scrollButtonProps = [
		{
			name: "variant",
			type: '"default" | "outline" | "secondary" | "ghost" | "link" | "destructive"',
			default: '"outline"',
			description: "The visual style of the button",
		},
		{
			name: "size",
			type: '"default" | "sm" | "lg" | "icon"',
			default: '"sm"',
			description: "The size of the button",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes for custom styling",
		},
		{
			name: "ref",
			type: "HTMLElement | null",
			description: "Reference to the button element",
		},
		{
			name: "onclick",
			type: "(event: MouseEvent) => void",
			description: "Click event handler",
		},
	];

	const scrollContextFunctions = [
		{
			name: "setScrollContext()",
			type: "() => ScrollContext",
			description:
				"Creates and sets the scroll context. Must be called in a parent component.",
		},
		{
			name: "getScrollContext()",
			type: "() => ScrollContext",
			description: "Retrieves the scroll context. Used internally by ScrollButton.",
		},
		{
			name: "scrollContext.setElement()",
			type: "(element: HTMLElement | null) => void",
			description: "Sets the scrollable container element to monitor.",
		},
		{
			name: "scrollContext.scrollToBottom()",
			type: "(behavior?: ScrollBehavior) => void",
			description:
				"Scrolls the container to the bottom with optional behavior ('smooth' or 'instant').",
		},
		{
			name: "scrollContext.isAtBottom",
			type: "boolean",
			description: "Reactive state indicating if the container is scrolled to the bottom.",
		},
	];

	const setupContextCode = `import { setScrollContext } from "$lib/components/prompt-kit/scroll-button";
import { watch } from "runed";

const scrollContext = setScrollContext();
let containerRef = $state<HTMLElement | null>(null);

watch(
  () => containerRef,
  () => {
    if (containerRef) {
      scrollContext.setElement(containerRef);
    }
  }
);`;

	const positioningCode = `<div class="relative h-[400px] w-full overflow-hidden">
  <!-- Your scrollable content -->
  <div bind:this={containerRef} class="h-full overflow-y-auto">
    <!-- Content -->
  </div>

  <!-- Scroll button -->
  <div class="absolute right-4 bottom-4">
    <ScrollButton />
  </div>
</div>`;

	let PreviewComp = $derived(data.preview);
</script>

<!-- SEO Meta Tags -->
<MetaTags {...data.seo} />

<!-- Main Content Area -->
<main class="min-w-0" bind:this={toc.ref}>
	<div>
		<div class="flex flex-col justify-between gap-3 md:flex-row md:items-center md:gap-4">
			<H1 class="font-bold" id="title">{data.title}</H1>
			<CopyPageDropdown type="prompt-kit" componentName={data.title} {llmsTxtUrl} />
		</div>
		<Paragraph class="max-w-2xl">{data.description}</Paragraph>
	</div>

	{#if PreviewComp}
		<PreviewComponent code={data.previewCode} showRetry={false}>
			<PreviewComp />
		</PreviewComponent>
	{/if}

	<!-- Installation Section -->
	<Subheading>Installation</Subheading>

	<p class="mb-4 text-sm leading-relaxed sm:text-base">
		Copy and paste the following code into your project.
	</p>

	<div class="mb-6">
		<PmCommand
			command="execute"
			args={["shadcn-svelte@latest", "add", `${PUBLIC_WEBSITE_URL}/p/scroll-button.json`]}
		/>
	</div>

	<!-- Examples Section -->
	<Subheading>Examples</Subheading>

	<!-- Example 1: Basic Usage -->
	<h3 class="mt-6 mb-3 text-lg font-semibold" id="basic-usage" data-toc-ignore={true}>
		Basic Usage
	</h3>
	<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
		The ScrollButton component works with a scroll context. Set up the context in a parent
		component and bind it to a scrollable container. The button automatically appears when
		scrolling up and hides when at the bottom.
	</p>
	<div data-toc-index={false}>
		<!-- <Playground
			code={data.examples[0].code}
			component="scroll-button"
			registry="prompt-kit"
			source="example"
		>
			<examples.basic.Component />
		</Playground> -->
		{#if data.examples}
			{@const ExampleComponent = data.examples[0].preview}
			<PreviewComponent code={data.examples[0].code} showRetry={false}>
				<ExampleComponent />
			</PreviewComponent>
		{/if}
	</div>

	<!-- Example 2: Custom Styling -->
	<h3 class="mt-8 mb-3 text-lg font-semibold" id="custom-styling" data-toc-ignore={true}>
		Custom Styling
	</h3>
	<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
		Customize the button's appearance using different variants and sizes. The button supports
		all standard button variants.
	</p>
	<div data-toc-index={false}>
		<!-- <Playground
			code={examples.custom.code}
			component="scroll-button"
			registry="prompt-kit"
			source="example"
		>
			<examples.custom.Component />
		</Playground> -->
		{#if data.examples}
			{@const ExampleComponent = data.examples[1].preview}
			<PreviewComponent code={data.examples[1].code} showRetry={false}>
				<ExampleComponent />
			</PreviewComponent>
		{/if}
	</div>

	<!-- Usage Guide Section -->
	<Subheading>Usage Guide</Subheading>

	<h3 class="mt-6 mb-3 text-lg font-semibold" id="setup-context">Setting Up the Context</h3>
	<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
		The ScrollButton requires a scroll context to track the scroll position. Create the context
		in a parent component and bind it to your scrollable container:
	</p>

	<div>
		<Code.Root lang="typescript" code={setupContextCode} class="mb-6">
			<Code.CopyButton />
		</Code.Root>
	</div>

	<h3 class="mt-8 mb-3 text-lg font-semibold" id="positioning">Positioning the Button</h3>
	<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
		Position the ScrollButton absolutely within your container. It's typically placed in the
		bottom-right corner:
	</p>

	<div>
		<Code.Root lang="svelte" code={positioningCode} class="mb-6">
			<Code.CopyButton />
		</Code.Root>
	</div>

	<h3 class="mt-8 mb-3 text-lg font-semibold" id="chat-container-integration">
		Integration with ChatContainer
	</h3>
	<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
		The ScrollButton pairs perfectly with the ChatContainer component. Both use similar context
		patterns for scroll management. See the <a
			href="/prompt-kit/chat-container#using-with-scroll-button"
			class="text-primary hover:underline">ChatContainer documentation</a
		> for integration examples.
	</p>

	<!-- Component API Section -->
	<Subheading>Component API</Subheading>

	<!-- ScrollButton Props -->
	<ComponentAPITable
		componentName="ScrollButton"
		props={scrollButtonProps}
		class="mt-6"
		id="scroll-button-props"
	/>

	<!-- Scroll Context API -->
	<h3 class="mt-8 mb-3 text-lg font-semibold" id="scroll-context-api">Scroll Context API</h3>
	<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
		The scroll context provides functions and state for managing scroll behavior:
	</p>
	<ComponentAPITable
		componentName="Scroll Context"
		props={scrollContextFunctions}
		class="mt-6"
		id="scroll-context-functions"
	/>

	<!-- Features Section -->
	<Subheading>Features</Subheading>

	<ul class="text-muted-foreground mb-6 list-inside list-disc space-y-2 text-sm sm:text-base">
		<li>
			<strong>Context-based visibility:</strong> Automatically shows/hides based on scroll position
		</li>
		<li><strong>Smooth animations:</strong> Elegant fade and slide transitions</li>
		<li>
			<strong>Customizable styling:</strong> Supports all button variants and sizes
		</li>
		<li><strong>SSR-safe:</strong> Handles server-side rendering gracefully</li>
		<li>
			<strong>Threshold detection:</strong> Configurable threshold for bottom detection (50px default)
		</li>
		<li><strong>Smooth scrolling:</strong> Uses native smooth scroll behavior</li>
	</ul>

	<PromptKitPrevNext currentSlug="scroll-button" />
</main>
