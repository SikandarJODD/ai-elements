<script lang="ts">
  import { MetaTags } from "svelte-meta-tags";
  import { Subheading } from "$lib/components/docs";
  import Installation from "$lib/components/docs/installation.svelte";
  import Playground from "$lib/components/docs/playground.svelte";
  import Code from "$lib/components/docs/code.svelte";
  import { examples } from "./examples";
  import { seo } from "./seo";
  import Heading from "$lib/components/docs/heading.svelte";
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
    <main class="min-w-0" bind:this={toc.ref}>
      <Subheading class="md:text-3xl">Actions</Subheading>

      <p class="my-2 !text-muted-foreground text-lg">
        The <CodeSpan>Action</CodeSpan> component provides a flexible row of action
        buttons for AI responses with common actions like retry, like, dislike, copy,
        and share.
      </p>

      <Playground code={examples.basic.code}  >
        <examples.basic.Component />
      </Playground>

      <!-- pnpm dlx shadcn-svelte@latest add http://localhost:5173/r/hello-world.json -->
      <Installation specifier={`${PUBLIC_WEBSITE_URL}/r/action.json`} />

      <!-- Usage -->
      <Subheading>Usage</Subheading>

      <div>
        <Code
          lang="svelte"
          code={`\<script lang="ts"\>
	 import { Actions, Action } from "$lib/components/ai-elements/action/index";
\<\/script\>

<Actions class="mt-2">
  <Action label="Like" tooltip="Like">
    <ThumbsUpIcon class="size-4" />
  </Action>
</Actions>`}
        />
      </div>

      <!-- Examples  -->
      <Subheading>Examples</Subheading>

      <Playground code={examples.messageAction.code}>
        <examples.messageAction.Component />
      </Playground>
    </main>

    <!-- TOC Sidebar - Sticky on larger screens -->
    <aside
      class="hidden md:flex sticky top-24 h-fit max-h-[calc(100vh-3rem)] overflow-y-auto "
    >
      <!-- TOC Component -->
      <div>
        <h3 class="text-sm">On this page</h3>
        <Toc.Root toc={toc.current} />
      </div>
    </aside>
  </div>
</Sidebar.Inset>
