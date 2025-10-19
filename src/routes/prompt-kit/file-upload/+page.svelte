<script lang="ts">
  import { MetaTags } from "svelte-meta-tags";
  import { Subheading, AiInstallCommand, ComponentAPITable } from "$lib/components/docs";
  import Playground from "$lib/components/docs/playground.svelte";
  import { examples } from "./examples/examples";
  import { seo } from "./examples/seo";

  import * as Sidebar from "$lib/components/ui/sidebar/index.js";

  import * as Toc from "$lib/components/docs/toc";
  import { UseToc } from "$lib/hooks/use-toc.svelte";
  let toc = new UseToc();

  // Component API Props Data
  const fileUploadProps = [
    {
      name: "onFilesAdded",
      type: "(files: File[]) => void",
      description: "Function called when files are added",
    },
    {
      name: "children",
      type: "Snippet",
      description: "Child components",
    },
    {
      name: "multiple",
      type: "boolean",
      default: "true",
      description: "Allow selection of multiple files",
    },
    {
      name: "accept",
      type: "string",
      description: 'File types to accept (e.g., ".jpg,.png")',
    },
  ];

  const fileUploadTriggerProps = [
    {
      name: "asChild",
      type: "boolean",
      default: "false",
      description: "Use child element as the trigger",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes",
    },
    {
      name: "children",
      type: "Snippet",
      description: "Child components",
    },
    {
      name: "...props",
      type: "HTMLAttributes<HTMLButtonElement>",
      description: "All other button props",
    },
  ];

  const fileUploadContentProps = [
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes",
    },
    {
      name: "...props",
      type: "HTMLAttributes<HTMLDivElement>",
      description: "All other div props",
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
      <Subheading class="md:text-3xl">File Upload</Subheading>

      <!-- Description -->
      <p class="my-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
        A component for creating drag-and-drop file upload interfaces with support for single or multiple files, custom triggers, and visual feedback during file dragging operations.
      </p>

      <!-- Examples Section -->
      <Subheading>Examples</Subheading>

      <!-- Example 1: File Upload with Prompt Input -->
      <h3 class="text-lg font-semibold mb-3 mt-6" id="file-upload-with-prompt-input">File Upload with Prompt Input</h3>
      <p class="mb-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
        You can combine the file upload component with the <code class="bg-muted px-1.5 py-0.5 rounded text-sm">Prompt Input</code> component to create a full-featured input component with file upload support. You can try to drop a file to see the visual feedback.
      </p>
      <Playground code={examples.withPromptInput.code}>
        <div class="w-full flex justify-center">
          <examples.withPromptInput.Component />
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
          args={["shadcn-svelte@latest", "add", "https://ai-elements.vercel.app/r/prompt-kit-file-upload.json"]}
        />
      </div>

      <!-- Component API Section -->
      <Subheading>Component API</Subheading>

      <!-- FileUpload -->
      <ComponentAPITable componentName="FileUpload" props={fileUploadProps} class="mt-6" id="file-upload-props" />

      <!-- FileUploadTrigger -->
      <ComponentAPITable componentName="FileUploadTrigger" props={fileUploadTriggerProps} id="file-upload-trigger-props" />

      <!-- FileUploadContent -->
      <ComponentAPITable componentName="FileUploadContent" props={fileUploadContentProps} id="file-upload-content-props" />
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
