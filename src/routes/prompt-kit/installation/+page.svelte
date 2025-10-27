<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { Installation } from "$lib/components/docs";
	import Code from "$lib/components/docs/code.svelte";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import { MetaTags } from "svelte-meta-tags";
</script>

<MetaTags
	title="Installation - Prompt Kit"
	description="Learn how to install and set up Prompt Kit components in your SvelteKit project."
	openGraph={{
		title: "Installation - Prompt Kit",
		description:
			"Learn how to install and set up Prompt Kit components in your SvelteKit project.",
		type: "website",
		url: "https://ai-elements.vercel.app/prompt-kit/installation",
		images: [
			{
				url: "https://ai-elements.vercel.app/assets/svelte-ai-elements.png",
				width: 1200,
				height: 630,
				alt: "Svelte AI Elements - Prompt Kit",
				type: "image/png",
			},
		],
	}}
/>

<Sidebar.Inset class="px-4 py-8 md:px-6 md:py-12 lg:py-12">
	<h1
		class="text-foreground mb-8 text-3xl leading-tight font-semibold tracking-tight md:text-4xl md:font-bold"
	>
		Installation
	</h1>

	<div class="flex max-w-3xl flex-col gap-8">
		<section>
			<h2
				class="text-foreground mb-4 text-xl leading-tight font-semibold tracking-tight md:text-2xl"
			>
				Prerequisites
			</h2>

			<p class="text-muted-foreground mb-4 text-base leading-7">
				Before installing, ensure you have the following:
			</p>

			<ul class="text-muted-foreground ml-6 list-disc space-y-2 text-base leading-7">
				<li>
					<a
						href="https://nodejs.org/en/download/"
						target="_blank"
						rel="noopener noreferrer"
						class="hover:text-foreground underline underline-offset-2">Node.js</a
					> version 18 or later
				</li>
				<li>
					<a
						href="https://svelte.dev/"
						target="_blank"
						rel="noopener noreferrer"
						class="hover:text-foreground underline underline-offset-2">Svelte</a
					> version 5 or later
				</li>
			</ul>
		</section>

		<section>
			<h2
				class="text-foreground mb-4 text-xl leading-tight font-semibold tracking-tight md:text-2xl"
			>
				Install shadcn-svelte
			</h2>

			<p class="text-muted-foreground mb-4 text-base leading-7">
				First, you'll need to install and configure shadcn-svelte in your project. Follow
				the installation guide at <a
					href="https://www.shadcn-svelte.com/docs/installation"
					target="_blank"
					rel="noopener noreferrer"
					class="hover:text-foreground underline underline-offset-2"
					>shadcn-svelte documentation</a
				>.
			</p>

			<p class="text-muted-foreground text-base leading-7">
				Once shadcn-svelte is set up, you can install prompt-kit components using the shadcn
				CLI.
			</p>
		</section>

		<section>
			<h2
				class="text-foreground mb-4 text-xl leading-tight font-semibold tracking-tight md:text-2xl"
			>
				Using the shadcn CLI
			</h2>

			<div class="mb-4">
				<Installation
					specifier={`${PUBLIC_WEBSITE_URL}/r/[COMPONENT].json`}
					is_jsrepo={false}
				/>
			</div>
		</section>

		<section>
			<h2
				class="text-foreground mb-4 text-xl leading-tight font-semibold tracking-tight md:text-2xl"
			>
				Usage
			</h2>

			<p class="text-muted-foreground mb-4 text-base leading-7">
				After installation, import and start using the components in your project:
			</p>

			<Code
				lang="typescript"
				code={`import { PromptInput } from "$lib/components/prompt-kit/prompt-input";`}
			/>
		</section>
	</div>
</Sidebar.Inset>
