<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";
	import {
		Subheading,
		CodeNameBlock,
		ComponentAPITable,
		CopyMarkdownButton,
		OpenInMenu,
	} from "$lib/components/docs";
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
	import AiElementsPrevNext from "$lib/components/ai-elements/ai-elements-prev-next.svelte";
	let toc = new UseToc();

	// URL for llm.txt
	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/components/tool/llms.txt`;
	// Component API Props Data
	const toolProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the tool container",
		},
		{
			name: "children",
			type: "Snippet",
			description:
				"Child components (typically ToolHeader, ToolInput, ToolOutput, ToolContent)",
		},
		{
			name: "...restProps",
			type: "CollapsibleProps",
			description: "All other Collapsible component props are supported",
		},
	];

	const toolContentProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the content container",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Custom content to display in the collapsible area",
		},
		{
			name: "...restProps",
			type: "CollapsibleContentProps",
			description: "All other CollapsibleContent component props are supported",
		},
	];

	const toolHeaderProps = [
		{
			name: "type",
			type: "string",
			description: "The name/type of the tool being executed",
		},
		{
			name: "state",
			type: "'input-streaming' | 'input-available' | 'output-available' | 'output-error'",
			description: "Current state of the tool execution",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the header",
		},
		{
			name: "...restProps",
			type: "CollapsibleTriggerProps",
			description: "All other CollapsibleTrigger component props are supported",
		},
	];

	const toolInputProps = [
		{
			name: "input",
			type: "any",
			description: "The input parameters passed to the tool (will be JSON stringified)",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the input container",
		},
		{
			name: "...restProps",
			type: "HTMLAttributes<HTMLDivElement>",
			description: "All other div props are supported",
		},
	];

	const toolOutputProps = [
		{
			name: "output",
			type: "any",
			description: "The output result from the tool execution",
		},
		{
			name: "errorText",
			type: "string",
			description: "Error message to display if the tool execution failed",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the output container",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Custom content to render instead of the default output display",
		},
		{
			name: "...restProps",
			type: "HTMLAttributes<HTMLDivElement>",
			description: "All other div props are supported",
		},
	];
</script>

<!-- SEO Meta Tags -->
<MetaTags {...seo} />

<Sidebar.Inset class="min-h-svh">
	<div
		class="grid min-h-svh grid-cols-1 gap-8 md:grid-cols-[1fr_280px] md:px-6 md:pb-6 lg:grid-cols-[1fr_240px]"
	>
		<!-- Main Content Area -->
		<main class="min-w-0" bind:this={toc.ref}>
			<Subheading class="md:text-3xl">Tool</Subheading>

			<p class="!text-muted-foreground my-2 text-lg">
				The <CodeSpan>Tool</CodeSpan> component displays a collapsible interface for showing/hiding
				tool details. It is designed to take the ToolUIPart type from the AI SDK and display
				it in a collapsible interface.
			</p>

			<!-- Actions -->
			<div class="mb-8 flex items-center gap-2">
				<CopyMarkdownButton {llmsTxtUrl} />
				<OpenInMenu componentName="Tool" {llmsTxtUrl} type="ai-elements" />
			</div>

			<Playground code={examples.basic.code}>
				<div class="w-full">
					<examples.basic.Component />
				</div>
			</Playground>

			<!-- pnpm dlx shadcn-svelte@latest add http://localhost:5173/r/hello-world.json -->
			<Installation
				specifier={`${PUBLIC_WEBSITE_URL}/r/tool.json`}
				is_jsrepo={true}
				blockname="tool"
			/>

			<!-- Usage -->
			<Subheading>Usage</Subheading>

			<div>
				<Code
					lang="svelte"
					code={`\<script lang="ts"\>
	import {
    Tool,
    ToolHeader,
    ToolContent,
    ToolInput,
    ToolOutput,
  } from "$lib/components/ai-elements/tool/index.js";
\<\/script\>

<Tool>
  <ToolHeader
    type='web_search'
    state='output-available'
  />
  <ToolContent>
    <ToolInput input="latest AI developments 2025" />
    <ToolOutput output={results: [
        {
          title: "Revolutionary AI Breakthrough in 2024",
          url: "https://example.com/ai-breakthrough-2024",
          snippet: "Scientists have achieved a major milestone in artificial intelligence..."
        },
        {
          title: "The Future of Machine Learning",
          url: "https://example.com/ml-future",
          snippet: "New research shows promising developments in neural networks..."
        }
      ],
      total_results: 147
    }} />
  </ToolContent>
</Tool>`}
				/>
			</div>

			<!-- Usage with AI SDK -->
			<Subheading>Usage with AI SDK</Subheading>

			<p class="mb-4 text-sm leading-relaxed sm:text-base">
				Build a simple stateful weather app that renders the last message in a tool using <CodeSpan
					>useChat</CodeSpan
				>.
			</p>

			<p class="mb-4 text-sm leading-relaxed sm:text-base">
				Add the following component to your frontend:
			</p>

			<div class="mb-6">
				<CodeNameBlock
					filename="+page.svelte"
					lang="svelte"
					code={`\<script lang="ts"\>
  import { useChat } from "@ai-sdk/svelte";
  import { DefaultChatTransport, type ToolUIPart } from "ai";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Response } from "$lib/components/ai-elements/response/index.js";
  import {
    Tool,
    ToolContent,
    ToolHeader,
    ToolInput,
    ToolOutput,
  } from "$lib/components/ai-elements/tool/index.js";

  type WeatherToolInput = {
    location: string;
    units: "celsius" | "fahrenheit";
  };

  type WeatherToolOutput = {
    location: string;
    temperature: string;
    conditions: string;
    humidity: string;
    windSpeed: string;
    lastUpdated: string;
  };

  type WeatherToolUIPart = ToolUIPart<{
    fetch_weather_data: {
      input: WeatherToolInput;
      output: WeatherToolOutput;
    };
  }>;

  let { messages, sendMessage, status } = $derived(
    useChat({
      transport: new DefaultChatTransport({
        api: "/api/chat",
      }),
    })
  );

  const handleWeatherClick = () => {
    sendMessage({ text: "Get weather data for San Francisco in fahrenheit" });
  };

  let latestMessage = $derived(messages[messages.length - 1]);
  let weatherTool = $derived(
    latestMessage?.parts?.find(
      (part) => part.type === "tool-fetch_weather_data"
    ) as WeatherToolUIPart | undefined
  );

  function formatWeatherResult(result: WeatherToolOutput): string {
    return \`**Weather for \${result.location}**

**Temperature:** \${result.temperature}
**Conditions:** \${result.conditions}
**Humidity:** \${result.humidity}
**Wind Speed:** \${result.windSpeed}

*Last updated: \${result.lastUpdated}*\`;
  }
\<\/script\>

<div class="max-w-4xl mx-auto p-6 relative size-full rounded-lg border h-[600px]">
  <div class="flex flex-col h-full">
    <div class="space-y-4">
      <Button onclick={handleWeatherClick} disabled={status !== "ready"}>
        Get Weather for San Francisco
      </Button>

      {#if weatherTool}
        <Tool defaultOpen={true}>
          <ToolHeader type="tool-fetch_weather_data" state={weatherTool.state} />
          <ToolContent>
            <ToolInput input={weatherTool.input} />
            <ToolOutput
              output={<Response>
                {formatWeatherResult(weatherTool.output)}
              </Response>}
              errorText={weatherTool.errorText}
            />
          </ToolContent>
        </Tool>
      {/if}
    </div>
  </div>
</div>`}
				/>
			</div>

			<p class="mb-4 text-sm leading-relaxed sm:text-base">
				Add the following route to your backend:
			</p>

			<div class="mb-6">
				<CodeNameBlock
					filename="api/chat/+server.ts"
					lang="typescript"
					code={`import { streamText, type UIMessage, convertToModelMessages } from "ai";
import { openrouter, defaultModel } from "$lib/config/ai-config";
import { z } from "zod";
import type { RequestHandler } from "./$types";

// Allow streaming responses up to 30 seconds
export const config = {
  maxDuration: 30,
};

export const POST: RequestHandler = async ({ request }) => {
  const { messages }: { messages: UIMessage[] } = await request.json();

  const result = streamText({
    model: openrouter(defaultModel),
    messages: convertToModelMessages(messages),
    tools: {
      fetch_weather_data: {
        description: "Fetch weather information for a specific location",
        parameters: z.object({
          location: z
            .string()
            .describe("The city or location to get weather for"),
          units: z
            .enum(["celsius", "fahrenheit"])
            .default("celsius")
            .describe("Temperature units"),
        }),
        inputSchema: z.object({
          location: z.string(),
          units: z.enum(["celsius", "fahrenheit"]).default("celsius"),
        }),
        execute: async ({ location, units }) => {
          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 1500));

          const temp =
            units === "celsius"
              ? Math.floor(Math.random() * 35) + 5
              : Math.floor(Math.random() * 63) + 41;

          return {
            location,
            temperature: \`\${temp}°\${units === "celsius" ? "C" : "F"}\`,
            conditions: "Sunny",
            humidity: \`12%\`,
            windSpeed: \`35 \${units === "celsius" ? "km/h" : "mph"}\`,
            lastUpdated: new Date().toLocaleString(),
          };
        },
      },
    },
  });

  return result.toUIMessageStreamResponse();
};`}
				/>
			</div>

			<!-- Features -->
			<Subheading>Features</Subheading>

			<ul class="mb-6 list-inside list-disc space-y-2 text-sm leading-relaxed sm:text-base">
				<li>Collapsible interface for showing/hiding tool details</li>
				<li>Visual status indicators with icons and badges</li>
				<li>
					Support for multiple tool execution states (pending, running, completed, error)
				</li>
				<li>Formatted parameter display with JSON syntax highlighting</li>
				<li>Result and error handling with appropriate styling</li>
				<li>Composable structure for flexible layouts</li>
				<li>Accessible keyboard navigation and screen reader support</li>
				<li>Consistent styling that matches your design system</li>
				<li>Auto-opens completed tools by default for better UX</li>
			</ul>

			<!-- Examples  -->
			<!-- <Subheading>Examples</Subheading>

      <Playground code={examples.messageAction.code}>
        <examples.messageAction.Component />
      </Playground> -->

			<!-- Component API Section -->
			<Subheading>Props</Subheading>

			<!-- Tool -->
			<ComponentAPITable
				componentName="Tool"
				props={toolProps}
				class="mt-6"
				id="tool-props"
			/>

			<!-- ToolHeader -->
			<ComponentAPITable
				componentName="ToolHeader"
				props={toolHeaderProps}
				id="tool-header-props"
			/>

			<!-- ToolInput -->
			<ComponentAPITable
				componentName="ToolInput"
				props={toolInputProps}
				id="tool-input-props"
			/>

			<!-- ToolOutput -->
			<ComponentAPITable
				componentName="ToolOutput"
				props={toolOutputProps}
				id="tool-output-props"
			/>

			<!-- ToolContent -->
			<ComponentAPITable
				componentName="ToolContent"
				props={toolContentProps}
				id="tool-content-props"
			/>

			<AiElementsPrevNext currentSlug="tool" />
		</main>

		<!-- TOC Sidebar - Sticky on larger screens -->
		<aside class="sticky top-24 hidden h-fit max-h-[calc(100vh-3rem)] overflow-y-auto md:flex">
			<!-- TOC Component -->
			<div>
				<h3 class="text-sm">On this page</h3>
				<Toc.Root toc={toc.current} />
			</div>
		</aside>
	</div>
</Sidebar.Inset>
