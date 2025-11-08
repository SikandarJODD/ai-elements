<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";
	import {
		Subheading,
		ComponentAPITable,
		CopyMarkdownButton,
		OpenInMenu,
	} from "$lib/components/docs";
	import Installation from "$lib/components/docs/installation.svelte";
	import Playground from "$lib/components/docs/playground.svelte";
	import Code from "$lib/components/docs/code.svelte";
	import { examples } from "./examples/examples";
	import { seo } from "./examples/seo";
	import { PUBLIC_WEBSITE_URL } from "$env/static/public";

	import * as Sidebar from "$lib/components/ui/sidebar/index.js";

	import * as Toc from "$lib/components/docs/toc";
	import { UseToc } from "$lib/hooks/use-toc.svelte";
	let toc = new UseToc();

	// URL for llm.txt
	const llmsTxtUrl = `${PUBLIC_WEBSITE_URL}/components/confirmation/llms.txt`;

	// Component API Props Data
	const confirmationProps = [
		{
			name: "approval",
			type: "ToolUIPartApproval",
			description: "Approval object containing id, approved status, and optional reason",
		},
		{
			name: "state",
			type: "ToolUIPartState",
			description:
				"Current state: 'approval-requested' | 'approval-responded' | 'output-denied' | 'output-available'",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the alert container",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Child components (ConfirmationTitle, ConfirmationRequest, etc.)",
		},
		{
			name: "...restProps",
			type: "HTMLAttributes<HTMLDivElement>",
			description: "All other div props are supported",
		},
	];

	const confirmationTitleProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the title",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Title content",
		},
	];

	const confirmationRequestProps = [
		{
			name: "children",
			type: "Snippet",
			description:
				"Content to show when approval is requested (typically ConfirmationActions)",
		},
	];

	const confirmationAcceptedProps = [
		{
			name: "children",
			type: "Snippet",
			description: "Content to show when action is approved",
		},
	];

	const confirmationRejectedProps = [
		{
			name: "children",
			type: "Snippet",
			description: "Content to show when action is rejected",
		},
	];

	const confirmationActionsProps = [
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the actions container",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Action buttons (ConfirmationAction components)",
		},
	];

	const confirmationActionProps = [
		{
			name: "variant",
			type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'",
			default: "'default'",
			description: "Button variant style",
		},
		{
			name: "size",
			type: "'default' | 'sm' | 'lg' | 'icon'",
			default: "'sm'",
			description: "Button size",
		},
		{
			name: "class",
			type: "string",
			description: "Additional CSS classes to apply to the button",
		},
		{
			name: "children",
			type: "Snippet",
			description: "Button content",
		},
		{
			name: "onclick",
			type: "(e: MouseEvent) => void",
			description: "Click handler function",
		},
		{
			name: "...restProps",
			type: "HTMLButtonAttributes",
			description: "All other button props are supported",
		},
	];
</script>

<!-- SEO Meta Tags -->
<MetaTags {...seo} />

<Sidebar.Inset class="min-h-svh">
	<div
		class="grid min-h-svh grid-cols-1 gap-8 md:grid-cols-[1fr_280px] md:px-6 md:pb-6 lg:grid-cols-[1fr_240px]"
	>
		<main class="min-w-0" bind:this={toc.ref}>
			<Subheading class="md:text-3xl">Confirmation</Subheading>
			<p class="!text-muted-foreground my-2 text-lg">
				An alert-based component for managing tool execution approval workflows with
				request, accept, and reject states.
			</p>

			<div class="mb-8 flex items-center gap-2">
				<CopyMarkdownButton {llmsTxtUrl} />
				<OpenInMenu componentName="confirmation" {llmsTxtUrl} type="ai-elements" />
			</div>

			<!-- Preview -->
			<Playground code={examples.basic.code}>
				<examples.basic.Component />
			</Playground>

			<Installation
				specifier={`${PUBLIC_WEBSITE_URL}/r/confirmation.json`}
				is_jsrepo={true}
				blockname="confirmation"
			/>

			<!-- Usage -->
			<Subheading>Usage</Subheading>

			<Code
				lang="svelte"
				code={`\<script lang="ts"\>
  import {
    Confirmation,
    ConfirmationTitle,
    ConfirmationRequest,
    ConfirmationAccepted,
    ConfirmationRejected,
    ConfirmationActions,
    ConfirmationAction,
  } from "$lib/components/ai-elements/confirmation";

  let approval = $state({ id: "tool-1" });
  let state = $state("approval-requested");

  function handleApprove() {
    approval = { ...approval, approved: true };
    state = "approval-responded";
  }

  function handleReject() {
    approval = { ...approval, approved: false };
    state = "output-denied";
  }
\<\/script\>

<Confirmation {approval} {state}>
  <ConfirmationTitle>
    Delete 3 files from the project directory?
  </ConfirmationTitle>

  <ConfirmationRequest>
    <ConfirmationActions>
      <ConfirmationAction variant="default" onclick={handleApprove}>
        Approve
      </ConfirmationAction>
      <ConfirmationAction variant="outline" onclick={handleReject}>
        Reject
      </ConfirmationAction>
    </ConfirmationActions>
  </ConfirmationRequest>

  <ConfirmationAccepted>
    Files have been deleted successfully.
  </ConfirmationAccepted>

  <ConfirmationRejected>
    Action was rejected. Files were not deleted.
  </ConfirmationRejected>
</Confirmation>`}
			/>

			<!-- Examples -->
			<Subheading>Examples</Subheading>

			<h3 class="mb-4 text-lg font-semibold">With AI SDK</h3>
			<Code
				lang="svelte"
				code={`\<script lang="ts"\>
  import { Chat } from "@ai-sdk/svelte";
  import {
    Confirmation,
    ConfirmationTitle,
    ConfirmationRequest,
    ConfirmationAccepted,
    ConfirmationRejected,
    ConfirmationActions,
    ConfirmationAction,
  } from "$lib/components/ai-elements/confirmation";

  let chat = new Chat({
    api: "/api/chat",
    maxSteps: 5,
  });

  async function handleApprove(toolCallId: string) {
    await chat.addToolResult({
      toolCallId,
      result: { approved: true },
    });
  }

  async function handleReject(toolCallId: string) {
    await chat.addToolResult({
      toolCallId,
      result: { approved: false, reason: "User declined" },
    });
  }
\<\/script\>

{#each chat.messages as message}
  {#if message.role === "assistant"}
    {#each message.toolInvocations ?? [] as toolInvocation}
      <Confirmation
        approval={{ id: toolInvocation.toolCallId, ...toolInvocation.result }}
        state={toolInvocation.state}
      >
        <ConfirmationTitle>
          {toolInvocation.toolName}: Confirm action?
        </ConfirmationTitle>

        <ConfirmationRequest>
          <ConfirmationActions>
            <ConfirmationAction
              onclick={() => handleApprove(toolInvocation.toolCallId)}
            >
              Approve
            </ConfirmationAction>
            <ConfirmationAction
              variant="outline"
              onclick={() => handleReject(toolInvocation.toolCallId)}
            >
              Reject
            </ConfirmationAction>
          </ConfirmationActions>
        </ConfirmationRequest>

        <ConfirmationAccepted>
          Action approved and executed.
        </ConfirmationAccepted>

        <ConfirmationRejected>
          Action was rejected.
        </ConfirmationRejected>
      </Confirmation>
    {/each}
  {/if}
{/each}`}
			/>

			<!-- Component API -->
			<Subheading>Component API</Subheading>

			<ComponentAPITable componentName="Confirmation" props={confirmationProps} />

			<ComponentAPITable componentName="ConfirmationTitle" props={confirmationTitleProps} />

			<ComponentAPITable
				componentName="ConfirmationRequest"
				props={confirmationRequestProps}
			/>

			<ComponentAPITable
				componentName="ConfirmationAccepted"
				props={confirmationAcceptedProps}
			/>

			<ComponentAPITable
				componentName="ConfirmationRejected"
				props={confirmationRejectedProps}
			/>

			<ComponentAPITable
				componentName="ConfirmationActions"
				props={confirmationActionsProps}
			/>

			<ComponentAPITable componentName="ConfirmationAction" props={confirmationActionProps} />

			<!-- Features -->
			<Subheading>Features</Subheading>
			<ul class="text-muted-foreground ml-6 list-disc space-y-2">
				<li>State-based rendering for different approval stages</li>
				<li>Built on shadcn-svelte Alert component for consistent styling</li>
				<li>Flexible action buttons with customizable variants</li>
				<li>Context-based component composition</li>
				<li>TypeScript support with proper type definitions</li>
				<li>Accessible with proper ARIA attributes</li>
				<li>Seamless integration with Vercel AI SDK</li>
				<li>Responsive design with mobile support</li>
			</ul>

			<!-- Use Cases -->
			<Subheading>Use Cases</Subheading>
			<ul class="text-muted-foreground ml-6 list-disc space-y-2">
				<li>File deletion or modification confirmations</li>
				<li>Database operation approvals</li>
				<li>API call confirmations for sensitive actions</li>
				<li>Code execution permissions</li>
				<li>Payment or transaction approvals</li>
				<li>System configuration changes</li>
			</ul>
		</main>

		<aside class="sticky top-24 hidden h-fit max-h-[calc(100vh-3rem)] overflow-y-auto md:flex">
			<div>
				<h3 class="text-sm">On this page</h3>
				<Toc.Root toc={toc.current} />
			</div>
		</aside>
	</div>
</Sidebar.Inset>
