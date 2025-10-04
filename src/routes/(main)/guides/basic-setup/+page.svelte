<script lang="ts">
  import { MetaTags } from "svelte-meta-tags";
  import InfoIcon from "@lucide/svelte/icons/info";
  import CircleCheckIcon from "@lucide/svelte/icons/circle-check";
  import RocketIcon from "@lucide/svelte/icons/rocket";
  import BookOpenIcon from "@lucide/svelte/icons/book-open";
  import ComponentIcon from "@lucide/svelte/icons/component";
  import {
    CodeNameBlock,
    CodeSpan,
    AiInstallCommand,
    Installation,
    Subheading,
  } from "$lib/components/docs";
  import { Card } from "$lib/components/ui/card";
  import * as Toc from "$lib/components/docs/toc";
  import { UseToc } from "$lib/hooks/use-toc.svelte";
  import { Button } from "$lib/components/ui/button";

  let toc = new UseToc();
</script>

<MetaTags
  title="Basic Setup Guide - Svelte AI Elements Getting Started"
  description="Complete setup guide for Svelte AI Elements. Learn how to install Svelte, configure shadcn-svelte, set up OpenRouter API, and integrate AI SDK for building intelligent applications. Step-by-step tutorial for beginners."
  keywords={[
    "Svelte setup",
    "AI Elements setup",
    "SvelteKit installation",
    "shadcn-svelte setup",
    "OpenRouter API setup",
    "AI SDK installation",
    "Svelte AI tutorial",
    "getting started Svelte AI",
    "Svelte AI Elements guide",
    "AI chatbot setup",
    "Vercel AI SDK Svelte",
    "TypeScript Svelte setup",
    "Tailwind CSS Svelte",
    "Svelte project setup",
    "AI development setup",
  ]}
  canonical="https://svelte-ai-elements.vercel.app/guides/basic-setup"
  openGraph={{
    type: "article",
    title: "Basic Setup Guide - Svelte AI Elements",
    description:
      "Complete setup guide for building AI-powered Svelte applications. Install Svelte, configure UI components, and integrate AI models in 10 minutes.",
    url: "https://svelte-ai-elements.vercel.app/guides/basic-setup",
    siteName: "Svelte AI Elements",
    images: [
      {
        url: "https://svelte-ai-elements.vercel.app/assets/blog-og.png",
        width: 1200,
        height: 630,
        alt: "Svelte AI Elements Basic Setup Guide",
        type: "image/png",
      },
    ],
  }}
  twitter={{
    cardType: "summary_large_image",
    title: "Basic Setup Guide - Svelte AI Elements",
    description:
      "Complete setup guide for building AI-powered Svelte applications. Install Svelte, configure UI components, and integrate AI models in 10 minutes.",
  }}
/>

<div class="max-w-7xl mx-auto py-4 px-4 sm:py-8 sm:px-6 lg:px-8">
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
    <article
      class="prose prose-gray dark:prose-invert lg:col-span-3 max-w-none"
      bind:this={toc.ref}
    >
      <header class="mb-8 sm:mb-12">
        <h1
          data-toc-index={false}
          class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight"
        >
          Basic Setup Guide
        </h1>

        <div
          class="bg-zinc-50 dark:bg-zinc-900/50 border-l-4 border-zinc-300 dark:border-zinc-600 pl-4 py-3 mb-8 sm:mb-10 rounded-r"
        >
          <p class="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            Goal: Set up a complete development environment for building
            AI-powered Svelte applications with all necessary tools and
            configurations
          </p>
        </div>

        <div
          class="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6"
        >
          <p class="text-sm text-blue-900 dark:text-blue-200 flex gap-2">
            <InfoIcon strokeWidth={1.6} class="size-5 shrink-0 mt-0.5" />
            <span
              ><strong>Reusable Guide:</strong> This setup guide is referenced across
              all Svelte AI Elements tutorials. Complete these steps once, and you're
              ready for any advanced guide!</span
            >
          </p>
        </div>
      </header>

      <!-- Step 1: Installing Svelte -->
      <section class="mb-12 sm:mb-16">
        <Subheading>Step 1: Installing Svelte</Subheading>
        <p class="mb-6 text-sm sm:text-base leading-relaxed">
          Create a new SvelteKit project with TypeScript and Tailwind CSS
          support. We'll use the <strong>sv</strong> CLI for quick setup:
        </p>

        <div class="mb-6">
          <AiInstallCommand
            command="execute"
            args={["sv", "create", "my-ai-app"]}
          />
        </div>

        <p class="mt-6 mb-5 text-sm sm:text-base leading-relaxed">
          When prompted, select the following options:
        </p>
        <ul
          class="list-disc pl-6 mb-6 text-muted-foreground space-y-2 text-sm sm:text-base"
        >
          <li>
            Which template? → <span class="text-primary font-medium"
              >SvelteKit minimal</span
            >
          </li>
          <li>
            Add type checking? → <span class="text-primary font-medium"
              >Yes, using TypeScript</span
            >
          </li>
          <li>
            Add additional options? → <span class="text-primary font-medium"
              >Add Tailwind CSS</span
            >
          </li>
        </ul>

        <p class="mt-6 mb-4 text-sm sm:text-base leading-relaxed">
          Navigate to your project directory:
        </p>
        <div class="mb-6">
          <CodeNameBlock
            filename="terminal"
            lang="bash"
            code={`cd my-ai-app`}
          />
        </div>

        <div
          class="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-6"
        >
          <p class="text-sm text-green-900 dark:text-green-200 flex gap-2">
            <CircleCheckIcon strokeWidth={1.6} class="size-5 shrink-0 mt-0.5" />
            <span
              ><strong>Success!</strong> You now have a modern SvelteKit project
              with TypeScript and Tailwind CSS ready to go.</span
            >
          </p>
        </div>
      </section>

      <!-- Step 2: Installing shadcn-svelte -->
      <section class="mb-12 sm:mb-16">
        <Subheading>Step 2: Installing shadcn-svelte</Subheading>
        <p class="mb-6 text-sm sm:text-base leading-relaxed">
          <strong>shadcn-svelte</strong> provides beautiful, accessible UI components
          that integrate seamlessly with Tailwind CSS. Install and configure it:
        </p>

        <div class="mb-6">
          <AiInstallCommand
            command="execute"
            args={["pnpm", "dlx", "shadcn-svelte@latest", "init"]}
          />
        </div>

        <p class="mt-6 mb-5 text-sm sm:text-base leading-relaxed">
          Configure <CodeSpan>components.json</CodeSpan> with the following settings:
        </p>

        <div class="bg-zinc-50 dark:bg-card w-full rounded-lg mb-6 border border-zinc-200 dark:border-zinc-800">
          <div class="no-scrollbar overflow-x-auto p-4">
            <pre
              class="text-muted-foreground font-mono text-sm leading-relaxed"><code
                >Which base color would you like to use? › <span
                  class="text-primary">Neutral</span
                >
Where is your global CSS file? › <span class="text-primary">src/app.css</span>
Configure the import alias for lib: › <span class="text-primary">$lib</span>
Configure the import alias for components: › <span class="text-primary"
                  >$lib/components</span
                >
Configure the import alias for utils: › <span class="text-primary"
                  >$lib/utils</span
                >
Configure the import alias for hooks: › <span class="text-primary"
                  >$lib/hooks</span
                >
Configure the import alias for ui: › <span class="text-primary"
                  >$lib/components/ui</span
                ></code
              ></pre>
          </div>
        </div>

        <p
          class="mt-6 text-muted-foreground text-sm sm:text-base leading-relaxed"
        >
          This creates a <CodeSpan>lib/components/ui</CodeSpan> directory structure
          with pre-configured components that work perfectly with Svelte AI Elements.
        </p>
      </section>

      <!-- Step 3: Configuring OpenRouter -->
      <section class="mb-12 sm:mb-16">
        <Subheading>Step 3: Configuring OpenRouter & AI Models</Subheading>
        <p class="mb-6 text-sm sm:text-base leading-relaxed">
          OpenRouter provides free access to multiple AI models through a single
          API. Let's set it up:
        </p>

        <div class="space-y-4 mb-6">
          <!-- border border-zinc-200 dark:border-zinc-800 -->
          <div class="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-800">
            <h4 class="font-semibold text-base mb-2 flex items-center gap-2" data-toc-index={false}>
              <span class="text-primary">1.</span> Get Your API Key
            </h4>
            <p class="text-sm text-muted-foreground mb-3">
              Visit <a
                href="https://openrouter.ai/keys"
                class="underline text-primary"
                target="_blank"
                rel="noopener noreferrer">https://openrouter.ai/keys</a
              > and sign up for a free account. Generate your API key.
            </p>
          </div>

          <div class="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-800">
            <h4 class="font-semibold text-base mb-2 flex items-center gap-2" data-toc-index={false}>
              <span class="text-primary">2.</span> Create Environment File
            </h4>
            <p class="text-sm text-muted-foreground mb-3">
              Create a <CodeSpan>.env.local</CodeSpan> file in your project root:
            </p>
            <div class="mb-3">
              <CodeNameBlock
                filename=".env.local"
                lang="bash"
                code={`OPENROUTER_API_KEY=your_api_key_here`}
              />
            </div>
          </div>

          <div class="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-800">
            <h4 class="font-semibold text-base mb-2 flex items-center gap-2" data-toc-index={false}>
              <span class="text-primary">3.</span> Free AI Models Available
            </h4>
            <p class="text-sm text-muted-foreground mb-3">
              You can use these free models for testing and development:
            </p>
            <div class="bg-card border-border rounded-lg border p-3">
              <pre
                class="text-xs font-mono dark:text-muted-foreground leading-relaxed"><code
                  >x-ai/grok-4-fast:free
deepseek/deepseek-chat-v3.1:free
z-ai/glm-4.5-air:free
qwen/qwen3-coder:free
moonshotai/kimi-k2:free</code
                ></pre>
            </div>
          </div>
        </div>

        <div
          class="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mt-6"
        >
          <p class="text-sm text-amber-900 dark:text-amber-200 flex gap-2">
            <InfoIcon strokeWidth={1.6} class="size-5 shrink-0 mt-0.5" />
            <span
              ><strong>Important:</strong> Never commit your <CodeSpan
                >.env.local</CodeSpan
              > file to version control. Add it to <CodeSpan
                >.gitignore</CodeSpan
              >.</span
            >
          </p>
        </div>
      </section>

      <!-- Step 4: AI SDK Integration -->
      <section class="mb-12 sm:mb-16">
        <Subheading>Step 4: AI SDK Integration</Subheading>
        <p class="mb-6 text-sm sm:text-base leading-relaxed">
          Install the Vercel AI SDK and OpenRouter provider to enable streaming
          AI responses:
        </p>

        <div class="mb-6">
          <AiInstallCommand
            command="add"
            args={["ai", "@ai-sdk/svelte", "@openrouter/ai-sdk-provider"]}
          />
        </div>

        <p class="mt-6 mb-4 text-sm sm:text-base leading-relaxed">
          Create an AI configuration file to manage your AI settings:
        </p>

        <div class="mb-6">
          <CodeNameBlock
            filename="src/lib/ai-config.ts"
            lang="typescript"
            code={`import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { OPENROUTER_API_KEY } from '$env/static/private';

export const openrouter = createOpenRouter({
  apiKey: OPENROUTER_API_KEY,
});

// Choose your preferred free model
export const defaultModel = 'z-ai/glm-4.5-air:free';`}
          />
        </div>

        <p
          class="mt-6 text-muted-foreground text-sm sm:text-base leading-relaxed"
        >
          This configuration file allows you to easily switch between different
          AI models and manage your API credentials in one place.
        </p>
      </section>

      <!-- Step 5: Adding Components -->
      <section class="mb-12 sm:mb-16">
        <Subheading>Step 5: Adding Svelte AI Elements Components</Subheading>
        <p class="mb-6 text-sm sm:text-base leading-relaxed">
          Svelte AI Elements provides pre-built components for common AI
          patterns. Add components as needed using the CLI:
        </p>

        <div class="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4 mb-6 border border-zinc-200 dark:border-zinc-800">
          <h4 class="font-semibold text-base mb-3" data-toc-index={false}>
            Example: Adding Components
          </h4>
          <p class="text-sm text-muted-foreground mb-4">
            Install specific components for your project:
          </p>

          <div class="space-y-3">
            <div>
              <p class="text-xs text-muted-foreground mb-2">
                For chat interfaces:
              </p>
              <AiInstallCommand
                command="execute"
                args={[
                  "pnpx",
                  "shadcn-svelte@latest",
                  "add",
                  "https://svelte-ai-elements.vercel.app/r/message.json",
                ]}
              />
            </div>

            <div class="pt-2">
              <p class="text-xs text-muted-foreground mb-2">
                For prompt inputs:
              </p>
              <AiInstallCommand
                command="execute"
                args={[
                  "pnpx",
                  "shadcn-svelte@latest",
                  "add",
                  "https://svelte-ai-elements.vercel.app/r/prompt-input.json",
                ]}
              />
            </div>

            <div class="pt-2">
              <p class="text-xs text-muted-foreground mb-2">
                For loading states:
              </p>
              <AiInstallCommand
                command="execute"
                args={[
                  "pnpx",
                  "shadcn-svelte@latest",
                  "add",
                  "https://svelte-ai-elements.vercel.app/r/loader.json",
                ]}
              />
            </div>
          </div>
        </div>

        <div
          class="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-6"
        >
          <p class="text-sm text-blue-900 dark:text-blue-200 flex gap-2">
            <InfoIcon strokeWidth={1.6} class="size-5 shrink-0 mt-0.5" />
            <span
              ><strong>Note:</strong> Each guide will specify which components
              to install using the <CodeSpan>[COMPONENT]</CodeSpan> placeholder.
              Install only the components you need for that specific tutorial.</span
            >
          </p>
        </div>

        <!-- <p class="mt-6 text-sm sm:text-base leading-relaxed">
          Browse all available components at <a
            href="https://svelte-ai-elements.vercel.app/components"
            class="underline text-primary"
            >svelte-ai-elements.vercel.app/components</a
          >.
        </p> -->
      </section>

      <!-- Verification Section -->
      <section class="mb-12 sm:mb-6">
        <Subheading>Verifying Your Setup</Subheading>
        <p class="mb-6 text-sm sm:text-base leading-relaxed">
          Let's verify everything is working correctly. Start the development
          server:
        </p>

        <div class="mb-6">
          <CodeNameBlock
            filename="terminal"
            lang="bash"
            code={`npm run dev
# or
pnpm dev
# or
bun dev`}
          />
        </div>

        <p class="mt-6 mb-4 text-sm sm:text-base leading-relaxed">
          Your development server should start at <CodeSpan
            >http://localhost:5173</CodeSpan
          >. Check for:
        </p>

        <ul
          class="list-disc pl-6 mb-6 text-muted-foreground space-y-2 text-sm sm:text-base"
        >
          <li>No TypeScript errors in terminal</li>
          <li>Tailwind CSS styles loading correctly</li>
          <li>No console errors in browser DevTools</li>
          <li>Environment variables loaded (check your backend routes)</li>
        </ul>

        <div
          class="bg-green-50 dark:bg-green-950/30 border flex items-center gap-2 text-green-900 dark:text-green-200 border-green-200 dark:border-green-800 rounded-lg p-4 mt-6"
        >
          <CircleCheckIcon strokeWidth={1.6} class="size-5 shrink-0 mt-0.5" />
          <p class="text-sm text-green-900 dark:text-green-200 flex gap-2">
            Your development environment is ready. You can now proceed with any
            Svelte AI Elements tutorial or guide.
          </p>
        </div>
      </section>

      <!-- Footer -->
      <section class="border-t border-border pt-6">
        <div
          class="bg-gradient-to-r from-neutral-100 dark:from-neutral-900 to-blue-500/10 dark:to-blue-900/30 rounded-lg p-6"
        >
          <h2 class="text-lg font-semibold mb-3" id="ready-to-build">
            Ready to Build Something Amazing?
          </h2>
          <p class="text-sm text-muted-foreground mb-4">
            You've completed the basic setup! This foundation will be referenced
            in all other guides. Bookmark this page for quick reference.
          </p>
          <div class="flex flex-wrap gap-3">
            <Button href="/guides" variant="default">
              <BookOpenIcon strokeWidth={1.5} class="mr-1" />
              Browse All Guides
            </Button>
            <Button href="/components" variant="outline">
              <ComponentIcon strokeWidth={1.5} class="mr-1" />
              Explore Components
            </Button>
          </div>
        </div>
      </section>
    </article>

    <!-- Table of Contents Sidebar -->
    <aside class="hidden lg:block">
      <div class="sticky top-4 lg:top-24 bg-muted/30 rounded-lg p-4 lg:p-6">
        <h3
          class="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-4"
        >
          On this page
        </h3>
        <Toc.Root toc={toc.current} />
      </div>
    </aside>
  </div>
</div>
