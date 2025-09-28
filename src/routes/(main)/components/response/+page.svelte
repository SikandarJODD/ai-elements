<script lang="ts">
  import { MetaTags } from "svelte-meta-tags";
  import { Subheading } from "$lib/components/docs";
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
</script>

<!-- SEO Meta Tags -->
<MetaTags {...seo} />

<Sidebar.Inset class="min-h-svh">
  <div
    class="grid grid-cols-1 md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_240px] gap-8 min-h-svh md:px-6 md:pb-6"
  >
    <!-- Main Content Area -->
    <main class="min-w-0 space-y-8" bind:this={toc.ref}>
      <div class="space-y-4">
        <Subheading class="md:text-3xl">Response</Subheading>

        <p class="!text-muted-foreground text-lg leading-relaxed">
          The Response component renders a Markdown response from a large language
          model. It uses Streamdown under the hood to render the markdown.
        </p>

        <div data-toc-index={false} class="mt-6">
          <Playground code={examples.basic.code} replay>
            <div class="w-full overflow-y-auto dark-scrollbar max-h-[500px]">
              <examples.basic.Component />
            </div>
          </Playground>
        </div>
      </div>

      <!-- pnpm dlx shadcn-svelte@latest add http://localhost:5173/r/hello-world.json -->
      <div class="mt-8">
        <Installation specifier={`${PUBLIC_WEBSITE_URL}/r/response.json`} />
      </div>

      <!-- CSS Configuration -->
      <div class="space-y-4">
        <Subheading>CSS Configuration</Subheading>

        <p class="!text-muted-foreground leading-relaxed">
          Add the following imports to your <CodeSpan>app.css</CodeSpan> file to include
          Tailwind CSS and Streamdown styles:
        </p>

        <div class="mt-4">
          <Code
            lang="css"
            code={`@import 'tailwindcss';
/* Add Streamdown styles to your Tailwind build */
@source "../node_modules/svelte-streamdown/**/*";`}
          />
        </div>
      </div>

      <!-- Usage -->
      <div class="space-y-4">
        <Subheading>Usage</Subheading>

        <div class="mt-4">
          <Code
            lang="svelte"
            code={`\<script lang="ts"\>
	 import { Response } from "$lib/components/ai-elements/response";
   let content = "# Hello, World!\\nThis is a sample response from a large language model.";
\<\/script\>

<Response {content} />`}
          />
        </div>
      </div>
    </main>

    <!-- TOC Sidebar - Sticky on larger screens -->
    <aside
      class="hidden md:flex sticky top-24 h-fit max-h-[calc(100vh-3rem)] overflow-y-auto"
    >
      <!-- TOC Component -->
      <div>
        <h3 class="text-sm">On this page</h3>
        <Toc.Root toc={toc.current} />
      </div>
    </aside>
  </div>
</Sidebar.Inset>
