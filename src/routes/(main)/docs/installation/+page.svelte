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
  import * as Sidebar from "$lib/components/ui/sidebar/index";
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
    url: "https://ai-elements.vercel.app/docs/installation",
    images: [
      {
        url: "https://ai-elements.vercel.app/assets/svelte-ai-elements.png",
        width: 1200,
        height: 630,
        alt: "Svelte AI Elements",
        type: "image/png",
      },
    ],
  }}
/>

<Sidebar.Inset class="px-4 md:px-6 py-8 md:py-12 lg:py-12">
  <h1
    class="text-3xl md:text-4xl font-semibold md:font-bold leading-tight tracking-tight text-foreground"
  >
    Installation
  </h1>

  <div class="mt-8 flex flex-col gap-8 md:gap-10">
    <section>
      <h2
        class="text-xl md:text-2xl font-semibold leading-tight tracking-tight text-foreground mb-4"
      >
        Prerequisites
      </h2>

      <p
        class="max-w-4xl text-base sm:text-lg leading-7 md:leading-8 text-muted-foreground mb-6"
      >
        Before installing Svelte AI Elements, ensure you have the following:
      </p>

      <ul
        class="ml-6 list-disc space-y-3 text-base sm:text-lg leading-7 md:leading-8"
      >
        <li>
          <a
            href="https://nodejs.org/en/download/"
            target="_blank"
            rel="noopener noreferrer"
            class="underline hover:text-primary text-primary underline-offset-2"
            >Node.js</a
          > version 18 or later
        </li>
        <li>
          <a
            href="https://kit.svelte.dev/"
            target="_blank"
            rel="noopener noreferrer"
            class="underline hover:text-primary text-primary underline-offset-2"
            >SvelteKit</a
          > project set up
        </li>
        <li>
          <a
            href="https://www.shadcn-svelte.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="underline hover:text-primary text-primary underline-offset-2"
            >shadcn-svelte</a
          > configured in your project
        </li>
      </ul>
    </section>

    <section>
      <h2
        class="text-xl md:text-2xl font-semibold leading-tight tracking-tight text-foreground mb-4"
      >
        Install SvelteKit
      </h2>

      <p
        class="max-w-4xl text-base sm:text-lg leading-7 md:leading-8 text-muted-foreground mb-6"
      >
        If you don't have a SvelteKit project yet, create one using the
        following command:
      </p>

      <div class="mb-6">
        <AiInstallCommand command="execute" args={["sv", "create", "my-app"]} />
      </div>

      <p
        class="max-w-4xl text-base sm:text-lg leading-7 md:leading-8 text-muted-foreground mb-4"
      >
        Make sure to select <CodeSpan>Tailwind CSS</CodeSpan> when prompted during the setup process.
      </p>

      <p
        class="max-w-4xl text-base sm:text-lg leading-7 md:leading-8 text-muted-foreground mb-4"
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
        class="text-xl md:text-2xl font-semibold leading-tight tracking-tight text-foreground mb-4"
      >
        Install shadcn-svelte
      </h2>

      <p
        class="max-w-4xl text-base sm:text-lg leading-7 md:leading-8 text-muted-foreground mb-6"
      >
        First, you'll need to install and configure <CodeSpan
          >shadcn-svelte</CodeSpan
        >
        in your project. Run the init command to set up your project:
      </p>

      <div class="mb-6">
        <AiInstallCommand
          command="execute"
          args={["shadcn-svelte@latest", "init"]}
        />
      </div>

      <p
        class="max-w-4xl text-base sm:text-lg leading-7 md:leading-8 text-muted-foreground mb-4"
      >
        Follow the prompts to configure <CodeSpan>components.json</CodeSpan>:
      </p>

      <div class="bg-card border-border w-full rounded-lg border">
        <div class="no-scrollbar overflow-x-auto p-4">
          <pre
            class="dark:text-muted-foreground font-mono text-sm leading-relaxed"><code
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
        class="text-xl md:text-2xl font-semibold leading-tight tracking-tight text-foreground mb-4"
      >
        Using the shadcn CLI
      </h2>

      <p
        class="max-w-4xl text-base sm:text-lg leading-7 md:leading-8 text-muted-foreground mb-6"
      >
        Once shadcn-svelte is set up, you can install components
        using the shadcn CLI. Use the following command pattern to add any
        component:
      </p>

      <div class="mb-6">
        <Installation specifier={`${PUBLIC_WEBSITE_URL}/r/[COMPONENT].json`} />
      </div>

      <p
        class="max-w-4xl text-base sm:text-lg leading-7 md:leading-8 text-muted-foreground mb-4"
      >
        Available components include:
      </p>

      <ul
        class="ml-6 list-disc space-y-3 text-base sm:text-lg leading-7 md:leading-8"
      >
        <li>
          <CodeSpan>message</CodeSpan> - Chat message component with role-based styling
        </li>
        <li>
          <CodeSpan>prompt-input</CodeSpan> - Advanced prompt input with suggestions
        </li>
        <li>
          <CodeSpan>conversation</CodeSpan> - Complete conversation container
        </li>
        <li><CodeSpan>code</CodeSpan> - Syntax-highlighted code blocks</li>
        <li><CodeSpan>reasoning</CodeSpan> - AI reasoning display component</li>
        <li><CodeSpan>loader</CodeSpan> - Loading states for AI responses</li>
        <li>
          <CodeSpan>response</CodeSpan> - AI stream response display component
        </li>
        <li>And many more...</li>
      </ul>

      <p
        class="max-w-4xl text-base sm:text-lg leading-7 md:leading-8 text-muted-foreground mt-8 mb-4"
      >
        For example, to install the message component:
      </p>

      <div>
        <Installation specifier={`${PUBLIC_WEBSITE_URL}/r/message.json`} />
      </div>
    </section>

    <section>
      <h2
        class="text-xl md:text-2xl font-semibold leading-tight tracking-tight text-foreground mb-4"
      >
        Usage
      </h2>

      <p
        class="max-w-4xl text-base sm:text-lg leading-7 md:leading-8 text-muted-foreground mb-6"
      >
        After installation, import and start using the components in your
        project:
      </p>

      <div class="md:max-w-4xl lg:max-w-5xl">
        <Code
          lang="svelte"
          code={`\<script lang="ts"\>
 import {
    Message,
    MessageAvatar,
    MessageContent,
  } from "$lib/components/ai-elements/message/index";

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
        class="max-w-4xl text-base sm:text-lg leading-7 md:leading-8 text-muted-foreground mt-8"
      >
        That's it! You're now ready to build amazing AI-powered interfaces with
        Svelte AI Elements. Check out the individual component documentation for
        detailed usage examples and API references.
      </p>
    </section>

    <section>
      <div
        class="bg-muted dark:bg-muted/40 border-muted/50 dark:border-muted/30 border rounded-lg p-6 backdrop-blur-sm"
      >
        <div class="flex">
          <div class="flex-shrink-0">
            <InfoIcon class="h-5 w-5 text-muted-foreground mt-0.5" />
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-muted-foreground mb-2">
              Need Help?
            </h3>
            <div class="text-sm text-muted-foreground/70 leading-relaxed">
              <p>
                If you encounter any issues during installation, visit our
                <a
                  href="https://github.com/SikandarJODD/ai-elements"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="underline hover:text-foreground/90 text-foreground/75 underline-offset-2 font-medium"
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
