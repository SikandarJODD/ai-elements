<script lang="ts">
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";
	import {
		Heading,
		Subheading,
		CodeSpan,
		AiInstallCommand,
		Installation,
	} from "$lib/components/docs";
	import Code from "$lib/components/docs/code.svelte";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import { MetaTags } from "svelte-meta-tags";
	import InfoIcon from "@lucide/svelte/icons/info";
</script>

<MetaTags
	title="Installation - Svelte AI Elements"
	description="Learn how to install and set up AI Elements in your SvelteKit project with shadcn-svelte."
	openGraph={{
		title: "Installation - Svelte AI Elements",
		description:
			"Learn how to install and set up AI Elements in your SvelteKit project with shadcn-svelte.",
		type: "website",
		url: "https://svelte-ai-elements.vercel.app//docs/installation",
		images: [
			{
				url: "https://svelte-ai-elements.vercel.app//assets/svelte-ai-elements.png",
				width: 1200,
				height: 630,
				alt: "Svelte AI Elements",
				type: "image/png",
			},
		],
	}}
/>

<Sidebar.Inset class="px-4 py-8 md:px-6 md:py-12 lg:py-12">
	<h1
		class="text-foreground text-3xl leading-tight font-semibold tracking-tight md:text-4xl md:font-bold"
	>
		Installation
	</h1>

	<div class="mt-8 flex flex-col gap-8 md:gap-10">
		<section>
			<h2
				class="text-foreground mb-4 text-xl leading-tight font-semibold tracking-tight md:text-2xl"
			>
				Prerequisites
			</h2>

			<p
				class="text-muted-foreground mb-6 max-w-4xl text-base leading-7 sm:text-lg md:leading-8"
			>
				Before installing Svelte AI Elements, ensure you have the following:
			</p>

			<ul class="ml-6 list-disc space-y-3 text-base leading-7 sm:text-lg md:leading-8">
				<li>
					<a
						href="https://nodejs.org/en/download/"
						target="_blank"
						rel="noopener noreferrer"
						class="hover:text-primary text-primary underline underline-offset-2"
						>Node.js</a
					> version 18 or later
				</li>
				<li>
					<a
						href="https://kit.svelte.dev/"
						target="_blank"
						rel="noopener noreferrer"
						class="hover:text-primary text-primary underline underline-offset-2"
						>SvelteKit</a
					> project set up
				</li>
				<li>
					<a
						href="https://www.shadcn-svelte.com/"
						target="_blank"
						rel="noopener noreferrer"
						class="hover:text-primary text-primary underline underline-offset-2"
						>shadcn-svelte</a
					> configured in your project
				</li>
			</ul>
		</section>

		<section>
			<h2
				class="text-foreground mb-4 text-xl leading-tight font-semibold tracking-tight md:text-2xl"
			>
				Install SvelteKit
			</h2>

			<p
				class="text-muted-foreground mb-6 max-w-4xl text-base leading-7 sm:text-lg md:leading-8"
			>
				If you don't have a SvelteKit project yet, create one using the following command:
			</p>

			<div class="mb-6">
				<AiInstallCommand command="execute" args={["sv", "create", "my-app"]} />
			</div>

			<p
				class="text-muted-foreground mb-4 max-w-4xl text-base leading-7 sm:text-lg md:leading-8"
			>
				Make sure to select <CodeSpan>Tailwind CSS</CodeSpan> when prompted during the setup
				process.
			</p>

			<p
				class="text-muted-foreground mb-4 max-w-4xl text-base leading-7 sm:text-lg md:leading-8"
			>
				Navigate to your project directory:
			</p>

			<div class="bg-card border-border w-full rounded-lg border">
				<div class="no-scrollbar overflow-x-auto p-4">
					<span
						class="dark:text-muted-foreground font-mono text-sm leading-none font-light text-nowrap"
					>
						cd my-app
					</span>
				</div>
			</div>
		</section>

		<section>
			<h2
				class="text-foreground mb-4 text-xl leading-tight font-semibold tracking-tight md:text-2xl"
			>
				Install shadcn-svelte
			</h2>

			<p
				class="text-muted-foreground mb-6 max-w-4xl text-base leading-7 sm:text-lg md:leading-8"
			>
				First, you'll need to install and configure <CodeSpan>shadcn-svelte</CodeSpan>
				in your project. Run the init command to set up your project:
			</p>

			<div class="mb-6">
				<AiInstallCommand command="execute" args={["shadcn-svelte@latest", "init"]} />
			</div>

			<p
				class="text-muted-foreground mb-4 max-w-4xl text-base leading-7 sm:text-lg md:leading-8"
			>
				Follow the prompts to configure <CodeSpan>components.json</CodeSpan>:
			</p>

			<div class="bg-card border-border w-full rounded-lg border">
				<div class="no-scrollbar overflow-x-auto p-4">
					<pre class="dark:text-muted-foreground font-mono text-sm leading-relaxed"><code
							>Which base color would you like to use? › Slate
Where is your global CSS file? (this file will be overwritten) › src/app.css
Configure the import alias for lib: › $lib
Configure the import alias for components: › $lib/components
Configure the import alias for utils: › $lib/utils
Configure the import alias for hooks: › $lib/hooks
Configure the import alias for ui: › $lib/components/ui</code
						></pre>
				</div>
			</div>
		</section>

		<section>
			<h2
				class="text-foreground mb-4 text-xl leading-tight font-semibold tracking-tight md:text-2xl"
			>
				Using the shadcn CLI
			</h2>

			<p
				class="text-muted-foreground mb-6 max-w-4xl text-base leading-7 sm:text-lg md:leading-8"
			>
				Once shadcn-svelte is set up, you can install components using the shadcn CLI. Use
				the following command pattern to add any component:
			</p>

			<div class="mb-6">
				<Installation specifier={`${PUBLIC_WEBSITE_URL}/r/[COMPONENT].json`} />
			</div>

			<p
				class="text-muted-foreground mb-4 max-w-4xl text-base leading-7 sm:text-lg md:leading-8"
			>
				Available components include:
			</p>

			<ul class="ml-6 list-disc space-y-3 text-base leading-7 sm:text-lg md:leading-8">
				<li>
					<CodeSpan>message</CodeSpan> - Chat message component with role-based styling
				</li>
				<li>
					<CodeSpan>prompt-input</CodeSpan> - Advanced prompt input with suggestions
				</li>
				<li>
					<CodeSpan>conversation</CodeSpan> - Complete conversation container
				</li>
				<li>
					<CodeSpan>code</CodeSpan> - Syntax-highlighted code blocks
				</li>
				<li>
					<CodeSpan>reasoning</CodeSpan> - AI reasoning display component
				</li>
				<li>
					<CodeSpan>loader</CodeSpan> - Loading states for AI responses
				</li>
				<li>
					<CodeSpan>response</CodeSpan> - AI stream response display component
				</li>
				<li>And many more...</li>
			</ul>

			<p
				class="text-muted-foreground mt-8 mb-4 max-w-4xl text-base leading-7 sm:text-lg md:leading-8"
			>
				For example, to install the message component:
			</p>

			<div>
				<Installation specifier={`${PUBLIC_WEBSITE_URL}/r/message.json`} />
			</div>
		</section>

		<section>
			<h2
				class="text-foreground mb-4 text-xl leading-tight font-semibold tracking-tight md:text-2xl"
			>
				Usage
			</h2>

			<p
				class="text-muted-foreground mb-6 max-w-4xl text-base leading-7 sm:text-lg md:leading-8"
			>
				After installation, import and start using the components in your project:
			</p>

			<div class="md:max-w-4xl lg:max-w-5xl">
				<Code
					lang="svelte"
					code={`\<script lang="ts"\>
 import {
    Message,
    MessageAvatar,
    MessageContent,
  } from "$lib/components/ai-elements/message/index.js";

  type MessageData = {
    key: string;
    from: "user" | "assistant";
    content: string;
    avatar: string;
    name: string;
  };

  let messages: MessageData[] = $state([
    {
      key: crypto.randomUUID(),
      from: "user",
      content: "Hello, how are you?",
      avatar: "https://github.com/haydenbleasel.png",
      name: "Hayden Bleasel",
    },
    {
      key: crypto.randomUUID(),
      from: "assistant",
      content:
        "Hello! I'm doing well, thank you for asking. How can I help you today?",
      avatar: "https://github.com/copilot.png",
      name: "Assistant",
    },
    {
      key: crypto.randomUUID(),
      from: "user",
      content: "Can you help me understand Svelte 5 runes?",
      avatar: "https://github.com/haydenbleasel.png",
      name: "Hayden Bleasel",
    },
    {
      key: crypto.randomUUID(),
      from: "assistant",
      content:
        "Absolutely! Svelte 5 introduces runes like $state, $derived, and $props which provide a more powerful and flexible reactivity system. Would you like me to explain any specific rune?",
      avatar: "https://github.com/copilot.png",
      name: "Assistant",
    },
  ]);
\<\/script\>

<div class="space-y-4">
  {#each messages as { content, from, avatar, name }}
    <Message {from}>
      <MessageContent>{content}</MessageContent>
      <MessageAvatar {name} src={avatar} />
    </Message>
  {/each}
</div>`}
				/>
			</div>

			<p
				class="text-muted-foreground mt-8 max-w-4xl text-base leading-7 sm:text-lg md:leading-8"
			>
				That's it! You're now ready to build amazing AI-powered interfaces with Svelte AI
				Elements. Check out the individual component documentation for detailed usage
				examples and API references.
			</p>
		</section>

		<section>
			<div
				class="bg-muted dark:bg-muted/40 border-muted/50 dark:border-muted/30 rounded-lg border p-6 backdrop-blur-sm"
			>
				<div class="flex">
					<div class="flex-shrink-0">
						<InfoIcon class="text-muted-foreground mt-0.5 h-5 w-5" />
					</div>
					<div class="ml-4">
						<h3 class="text-muted-foreground mb-2 text-sm font-medium">Need Help?</h3>
						<div class="text-muted-foreground/70 text-sm leading-relaxed">
							<p>
								If you encounter any issues during installation, visit our
								<a
									href="https://github.com/SikandarJODD/ai-elements"
									target="_blank"
									rel="noopener noreferrer"
									class="hover:text-foreground/90 text-foreground/75 font-medium underline underline-offset-2"
									>GitHub repository</a
								>
								for support.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</Sidebar.Inset>
