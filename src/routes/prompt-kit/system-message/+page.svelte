<script lang="ts">
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
    class="grid grid-cols-1 md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_240px] gap-8 min-h-svh md:px-6 md:pb-6"
  >
    <!-- Main Content Area -->
    <main class="min-w-0" bind:this={toc.ref}>
      <!-- Title -->
      <Subheading class="md:text-3xl">System Message</Subheading>

      <!-- Description -->
      <p class="my-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
        Display contextual information, warnings, or instructions in AI interfaces
      </p>

      <!-- Examples Section -->
      <Subheading>Examples</Subheading>

      <!-- Example 1: Basic system message -->
      <H3>Basic system message</H3>
      <Playground code={examples.basic.code}>
        <div class="w-full flex justify-center">
          <examples.basic.Component />
        </div>
      </Playground>

      <!-- Example 2: Filled variants -->
      <H3>Filled variants</H3>
      <p class="mb-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
        Use the <code class="bg-muted px-1.5 py-0.5 rounded text-sm">fill</code> prop to apply semantic background colors based on the variant. Different variants (action, warning, error) provide visual context for the message severity.
      </p>
      <Playground code={examples.filledVariants.code}>
        <div class="w-full flex justify-center">
          <examples.filledVariants.Component />
        </div>
      </Playground>

      <!-- Example 3: With CTA -->
      <H3>With CTA</H3>
      <p class="mb-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
        Add a call-to-action button using the <code class="bg-muted px-1.5 py-0.5 rounded text-sm">cta</code> prop. You can also provide a custom icon using the <code class="bg-muted px-1.5 py-0.5 rounded text-sm">icon</code> snippet.
      </p>
      <Playground code={examples.withCta.code}>
        <div class="w-full flex justify-center">
          <examples.withCta.Component />
        </div>
      </Playground>

      <!-- Installation Section -->
      <Subheading>Installation</Subheading>

      <p class="mb-4 text-sm sm:text-base leading-relaxed">
        Copy and paste the following code into your project.
      </p>

      <div class="mb-6">
        <AiInstallCommand
          command="execute"
          args={["shadcn-svelte@latest", "add", "https://ai-elements.vercel.app/r/prompt-kit-system-message.json"]}
        />
      </div>

      <!-- Component API Section -->
      <Subheading>Component API</Subheading>

      <!-- SystemMessage -->
      <H3>SystemMessage</H3>
      <ComponentAPITable componentName="SystemMessage" props={systemMessageProps} class="mt-4" id="system-message-props" />

      <!-- CTA Configuration -->
      <H3>CTA configuration</H3>
      <p class="mb-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
        When <code class="bg-muted px-1.5 py-0.5 rounded text-sm">cta</code> is provided, SystemMessage renders a small Button next to the message content.
      </p>
      <ComponentAPITable componentName="CTAConfig" props={ctaConfigProps} class="mt-4" id="cta-config-props" />
    </main>

    <!-- TOC Sidebar - Sticky on larger screens -->
    <aside
      class="hidden md:flex sticky top-24 h-fit max-h-[calc(100vh-3rem)] overflow-y-auto"
    >
      <div>
        <h3 class="text-sm font-semibold mb-4">On this page</h3>
        <Toc.Root toc={toc.current} />
      </div>
    </aside>
  </div>
</Sidebar.Inset>
