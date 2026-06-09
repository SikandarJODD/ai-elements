<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import { CopyPageDropdown } from "$lib/components/docs/base/main";
	import { SingleFile } from "$lib/components/ui/code";
	import { PMCommand } from "$lib/components/ui/pm-command";
	import { Badge } from "$lib/components/ui/badge";
	import { Button } from "$lib/components/ui/button";
	import PromptInputPreview from "../../components/prompt-input/examples/preview.svelte";
	import CheckIcon from "@lucide/svelte/icons/check";
	import ArrowRightIcon from "@lucide/svelte/icons/arrow-right";
	import { MetaTags } from "svelte-meta-tags";

	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/docs/installation/llms.txt`;

	const usageCode = `<script lang="ts">
  import * as PromptInput from "$lib/components/ai-elements/prompt-input";

  function handleSubmit(message: { text: string }) {
    console.log(message.text);
  }
<\/script>

<PromptInput.Root onSubmit={handleSubmit}>
  <PromptInput.Body>
    <PromptInput.Textarea />
  </PromptInput.Body>

  <PromptInput.Toolbar class="justify-end">
    <PromptInput.Submit />
  </PromptInput.Toolbar>
</PromptInput.Root>`;
</script>

<MetaTags
	title="Installation - Svelte AI Elements"
	description="Let's install Svelte AI Elements and start with prompt-input."
	canonical="https://svelte-ai-elements.vercel.app/docs/installation"
	openGraph={{
		url: "https://svelte-ai-elements.vercel.app/docs/installation",
		title: "Installation - Svelte AI Elements",
		description: "Let's install Svelte AI Elements and start with prompt-input.",
		type: "article",
		siteName: "Svelte AI Elements",
	}}
/>

<article class="mx-auto">
	<header class="mb-12">
		<div class="mb-6 flex flex-col md:flex-row items-start justify-between gap-4">
			<div class="space-y-4">
				<!-- <div class="flex flex-wrap items-center gap-2">
					<Badge variant="secondary">Docs</Badge>
					<Badge variant="secondary">Installation</Badge>
				</div> -->
				<h1 class="text-4xl font-semibold tracking-tight">Installation</h1>
				<p class="text-muted-foreground max-w-3xl text-lg leading-relaxed">
					Let's install Svelte AI Elements and start with
					<code class="text-foreground">prompt-input</code>.
				</p>
			</div>
			<CopyPageDropdown
				class="shrink-0"
				componentName="Svelte AI Elements Installation"
				{llmsTxtUrl}
			/>
		</div>
	</header>

	<section class="mb-12">
		<h2 class="mb-4 text-3xl font-semibold">1. Create a SvelteKit app</h2>
		<p class="text-muted-foreground mb-6 max-w-3xl leading-relaxed">
			Make sure to select Tailwind CSS and Typescript options for easier integration.
		</p>
		<!-- pnpm dlx sv create my-app --template minimal --types ts --install pnpm --add tailwindcss prettier -->
		<PMCommand command="execute" args={["sv", "create", "my-app"]} />
	</section>

	<section class="mb-12">
		<h2 class="mb-4 text-3xl font-semibold">2. Initialize shadcn-svelte</h2>
		<PMCommand command="execute" args={["shadcn-svelte@latest", "init"]} />
	</section>

	<section class="mb-12">
		<h2 class="mb-4 text-3xl font-semibold">3. Add prompt-input Component</h2>
		<p class="text-muted-foreground mb-6 max-w-3xl leading-relaxed">
			Install the first component directly from the Svelte AI Elements registry.
		</p>
		<PMCommand
			command="execute"
			args={["shadcn-svelte@latest", "add", `${PUBLIC_WEBSITE_URL}/r/prompt-input.json`]}
		/>
	</section>

	<section class="mb-12">
		<h2 class="mb-4 text-3xl font-semibold">Usage</h2>
		<p class="text-muted-foreground mb-6 max-w-3xl leading-relaxed">
			Start with a simple prompt surface, then wire
			<code class="text-foreground">onSubmit</code> into your own chat or API flow.
		</p>
		<div class="border-border bg-background mb-6 overflow-hidden rounded-lg border">
			<div class="flex min-h-64 items-center justify-center p-6">
				<PromptInputPreview />
			</div>
		</div>
		<div>
			<SingleFile
				code={{
					name: "src/routes/+page.svelte",
					lang: "svelte",
					code: usageCode,
				}}
			/>
		</div>
	</section>
</article>
