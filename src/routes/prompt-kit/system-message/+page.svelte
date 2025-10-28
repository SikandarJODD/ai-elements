<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { MetaTags } from "svelte-meta-tags";
	import { Subheading, H3, AiInstallCommand, ComponentAPITable } from "$lib/components/docs";
	import Playground from "$lib/components/docs/playground.svelte";
	import { examples } from "./examples/examples";
	import { seo } from "./examples/seo";

	import * as Sidebar from "$lib/components/ui/sidebar/index.js";

	import * as Toc from "$lib/components/docs/toc";
	import { UseToc } from "$lib/hooks/use-toc.svelte";
	let toc = new UseToc();

	// Component API Props Data
	const systemMessageProps = [
		{
			name: "children",
			type: "Snippet",
			description: "Content displayed inside the system message",
		},
		{
			name: "variant",
			type: '"action" | "warning" | "error"',
			default: '"action"',
			description: "Severity of the message, controlling text and icon styles",
		},
		{
			name: "fill",
			type: "boolean",
			default: "false",
			description: "When true, applies a semantic background color and hides the border",
		},
		{
			name: "icon",
			type: "Snippet",
			description: "Custom icon to display instead of the default severity icon",
		},
		{
			name: "isIconHidden",
			type: "boolean",
			default: "false",
			description: "Hides the icon entirely when set to true",
		},
		{
			name: "cta",
			type: "CTAConfig",
			description: "Configuration for the optional call-to-action button",
		},
		{
			name: "className",
			type: "string",
			description: "Additional CSS classes",
		},
		{
			name: "...props",
			type: "HTMLAttributes<HTMLDivElement>",
			description: "All other div props are supported",
		},
	];

	const ctaConfigProps = [
		{
			name: "label",
			type: "string",
			description: "Text displayed inside the button",
		},
		{
			name: "onClick",
			type: "() => void",
			description: "Optional click handler",
		},
		{
			name: "variant",
			type: '"default" | "secondary" | "outline" | "ghost"',
			default: '"default"',
			description: 'Maps to button variants; "default" uses the default button style',
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
			<!-- Title -->
			<Subheading class="md:text-3xl">System Message</Subheading>

			<!-- Description -->
			<p class="text-muted-foreground my-4 text-base leading-relaxed sm:text-lg">
				Display contextual information, warnings, or instructions in AI interfaces
			</p>

			<!-- Installation Section -->
			<Subheading>Installation</Subheading>

			<p class="mb-4 text-sm leading-relaxed sm:text-base">
				Copy and paste the following code into your project.
			</p>

			<div class="mb-6">
				<AiInstallCommand
					command="execute"
					args={[
						"shadcn-svelte@latest",
						"add",
						`${PUBLIC_WEBSITE_URL}/p/system-message.json`,
					]}
				/>
			</div>

			<!-- Examples Section -->
			<Subheading>Examples</Subheading>

			<!-- Example 1: Basic system message -->
			<H3>Basic system message</H3>
			<Playground code={examples.basic.code}>
				<div class="flex w-full justify-center">
					<examples.basic.Component />
				</div>
			</Playground>

			<!-- Example 2: Filled variants -->
			<H3>Filled variants</H3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				Use the <code class="bg-muted rounded px-1.5 py-0.5 text-sm">fill</code> prop to apply
				semantic background colors based on the variant. Different variants (action, warning,
				error) provide visual context for the message severity.
			</p>
			<Playground code={examples.filledVariants.code}>
				<div class="flex w-full justify-center">
					<examples.filledVariants.Component />
				</div>
			</Playground>

			<!-- Example 3: With CTA -->
			<H3>With CTA</H3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				Add a call-to-action button using the <code
					class="bg-muted rounded px-1.5 py-0.5 text-sm">cta</code
				>
				prop. You can also provide a custom icon using the
				<code class="bg-muted rounded px-1.5 py-0.5 text-sm">icon</code> snippet.
			</p>
			<Playground code={examples.withCta.code}>
				<div class="flex w-full justify-center">
					<examples.withCta.Component />
				</div>
			</Playground>

			<!-- Component API Section -->
			<Subheading>Component API</Subheading>

			<!-- SystemMessage -->
			<H3>SystemMessage</H3>
			<ComponentAPITable
				componentName="SystemMessage"
				props={systemMessageProps}
				class="mt-4"
				id="system-message-props"
			/>

			<!-- CTA Configuration -->
			<H3>CTA configuration</H3>
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed sm:text-base">
				When <code class="bg-muted rounded px-1.5 py-0.5 text-sm">cta</code> is provided, SystemMessage
				renders a small Button next to the message content.
			</p>
			<ComponentAPITable
				componentName="CTAConfig"
				props={ctaConfigProps}
				class="mt-4"
				id="cta-config-props"
			/>
		</main>

		<!-- TOC Sidebar - Sticky on larger screens -->
		<aside class="sticky top-24 hidden h-fit max-h-[calc(100vh-3rem)] overflow-y-auto md:flex">
			<div>
				<h3 class="mb-4 text-sm font-semibold">On this page</h3>
				<Toc.Root toc={toc.current} />
			</div>
		</aside>
	</div>
</Sidebar.Inset>
