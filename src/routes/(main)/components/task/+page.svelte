<script lang="ts">
  import { MetaTags } from "svelte-meta-tags";
  import { Subheading, CodeNameBlock } from "$lib/components/docs";
  import Installation from "$lib/components/docs/installation.svelte";
  import Playground from "$lib/components/docs/playground.svelte";
  import Code from "$lib/components/docs/code.svelte";
  import { examples } from "./examples/examples";
  import { seo } from "./examples/seo";
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
      <Subheading class="md:text-3xl">Task</Subheading>

      <p class="my-2 !text-muted-foreground text-lg">
        The <CodeSpan>Task</CodeSpan> component provides a structured way to display
        task lists or workflow progress with collapsible details, status indicators,
        and progress tracking. It consists of a main Task container with TaskTrigger
        for the clickable header and TaskContent for the collapsible content area.
      </p>

      <Playground code={examples.basic.code}>
        <div class="min-w-lg">
          <examples.basic.Component />
        </div>
      </Playground>

      <!-- pnpm dlx shadcn-svelte@latest add http://localhost:5173/r/hello-world.json -->
      <Installation specifier={`${PUBLIC_WEBSITE_URL}/r/task.json`} is_jsrepo={true} blockname="task" />

      <!-- Usage -->
      <Subheading>Usage</Subheading>

      <div>
        <Code
          lang="svelte"
          code={`\<script lang="ts"\>
	import {
		Task,
		TaskContent,
		TaskItem,
		TaskItemFile,
		TaskTrigger
	} from '$lib/components/ai-elements/task';
\<\/script\>

<Task class="w-full">
  <TaskTrigger title="Found project files" />
  <TaskContent>
    <TaskItem>
      Read <TaskItemFile>index.md</TaskItemFile>
    </TaskItem>
  </TaskContent>
</Task>`}
        />
      </div>

      <!-- Usage with AI SDK -->
      <Subheading>Usage with AI SDK</Subheading>

      <p class="mb-4 text-sm sm:text-base leading-relaxed">
        Build a mock async programming agent using <CodeSpan>experimental_useObject</CodeSpan>.
      </p>

      <p class="mb-4 text-sm sm:text-base leading-relaxed">
        Add the following component to your frontend:
      </p>

      <div class="mb-6">
        <CodeNameBlock
          filename="+page.svelte"
          lang="svelte"
          code={`\<script lang="ts"\>
  import { experimental_useObject as useObject } from "@ai-sdk/svelte";
  import {
    Task,
    TaskItem,
    TaskItemFile,
    TaskTrigger,
    TaskContent,
  } from "$lib/components/ai-elements/task";
  import { Button } from "$lib/components/ui/button";
  import { tasksSchema } from "$lib/schemas/tasks-schema";
  import {
    SiReact,
    SiTypescript,
    SiJavascript,
    SiCss3,
    SiHtml5,
    SiJson,
    SiMarkdown,
  } from "svelte-icons-pack/si";

  const iconMap = {
    react: { component: SiReact, color: "#149ECA" },
    typescript: { component: SiTypescript, color: "#3178C6" },
    javascript: { component: SiJavascript, color: "#F7DF1E" },
    css: { component: SiCss3, color: "#1572B6" },
    html: { component: SiHtml5, color: "#E34F26" },
    json: { component: SiJson, color: "#000000" },
    markdown: { component: SiMarkdown, color: "#000000" },
  };

  let { object, submit, isLoading } = $derived(
    useObject({
      api: "/api/chat",
      schema: tasksSchema,
    })
  );

  const handleSubmit = (taskType: string) => {
    submit({ prompt: taskType });
  };

  const renderTaskItem = (item: any, index: number) => {
    if (item?.type === "file" && item.file) {
      const iconInfo = iconMap[item.file.icon as keyof typeof iconMap];
      if (iconInfo) {
        const IconComponent = iconInfo.component;
        return {
          text: item.text,
          icon: IconComponent,
          color: item.file.color || iconInfo.color,
          name: item.file.name,
        };
      }
    }
    return { text: item?.text || "" };
  };
\<\/script\>

<div class="max-w-4xl mx-auto p-6 relative size-full rounded-lg border h-[600px]">
  <div class="flex flex-col h-full">
    <div class="flex gap-2 mb-6 flex-wrap">
      <Button
        onclick={() => handleSubmit("React component development")}
        disabled={isLoading}
        variant="outline"
      >
        React Development
      </Button>
      <Button
        onclick={() => handleSubmit("API endpoint creation")}
        disabled={isLoading}
        variant="outline"
      >
        API Development
      </Button>
      <Button
        onclick={() => handleSubmit("Database schema design")}
        disabled={isLoading}
        variant="outline"
      >
        Database Design
      </Button>
    </div>

    <div class="flex-1 overflow-auto space-y-4">
      {#if isLoading && !object}
        <div class="text-muted-foreground">Generating tasks...</div>
      {/if}

      {#if object?.tasks}
        {#each object.tasks as task, taskIndex (taskIndex)}
          <Task defaultOpen={taskIndex === 0}>
            <TaskTrigger title={task.title || "Loading..."} />
            <TaskContent>
              {#each task.items || [] as item, itemIndex (itemIndex)}
                {@const renderedItem = renderTaskItem(item, itemIndex)}
                <TaskItem>
                  {#if renderedItem.icon}
                    <span class="inline-flex items-center gap-1">
                      {renderedItem.text}
                      <TaskItemFile>
                        <svelte:component
                          this={renderedItem.icon}
                          color={renderedItem.color}
                          size={16}
                        />
                        <span>{renderedItem.name}</span>
                      </TaskItemFile>
                    </span>
                  {:else}
                    {renderedItem.text}
                  {/if}
                </TaskItem>
              {/each}
            </TaskContent>
          </Task>
        {/each}
      {/if}
    </div>
  </div>
</div>`}
        />
      </div>

      <p class="mb-4 text-sm sm:text-base leading-relaxed">
        Add the following route to your backend:
      </p>

      <div class="mb-6">
        <CodeNameBlock
          filename="api/chat/+server.ts"
          lang="typescript"
          code={`import { streamObject } from "ai";
import { z } from "zod";
import type { RequestHandler } from "./$types";

export const taskItemSchema = z.object({
  type: z.enum(["text", "file"]),
  text: z.string(),
  file: z
    .object({
      name: z.string(),
      icon: z.string(),
      color: z.string().optional(),
    })
    .optional(),
});

export const taskSchema = z.object({
  title: z.string(),
  items: z.array(taskItemSchema),
  status: z.enum(["pending", "in_progress", "completed"]),
});

export const tasksSchema = z.object({
  tasks: z.array(taskSchema),
});

// Allow streaming responses up to 30 seconds
export const config = {
  maxDuration: 30,
};

export const POST: RequestHandler = async ({ request }) => {
  const { prompt } = await request.json();

  const result = streamObject({
    model: "openai:gpt-4o",
    schema: tasksSchema,
    prompt: \`You are an AI assistant that generates realistic development task workflows. Generate a set of tasks that would occur during \${prompt}.

    Each task should have:
    - A descriptive title
    - Multiple task items showing the progression
    - Some items should be plain text, others should reference files
    - Use realistic file names and appropriate file types
    - Status should progress from pending to in_progress to completed

    For file items, use these icon types: 'react', 'typescript', 'javascript', 'css', 'html', 'json', 'markdown'

    Generate 3-4 tasks total, with 4-6 items each.\`,
  });

  return result.toTextStreamResponse();
};`}
        />
      </div>

      <!-- Features -->
      <Subheading>Features</Subheading>

      <ul class="list-disc list-inside space-y-2 mb-6 text-sm sm:text-base">
        <li>Visual icons for pending, in-progress, completed, and error states</li>
        <li>Expandable content for task descriptions and additional information</li>
        <li>Built-in progress counter showing completed vs total tasks</li>
        <li>Optional progressive reveal of tasks with customizable timing</li>
        <li>Support for custom content within task items</li>
        <li>Full type safety with proper TypeScript definitions</li>
        <li>Keyboard navigation and screen reader support</li>
      </ul>

      <!-- Examples  -->
      <!-- <Subheading>Examples</Subheading>

      <Playground code={examples.messageAction.code}>
        <examples.messageAction.Component />
      </Playground> -->
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
