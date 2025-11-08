import basic from "./basic.svelte";
import withFooter from "./with-footer.svelte";
import streaming from "./streaming.svelte";
import multiplePlans from "./multiple-plans.svelte";

export const examples = {
	basic: {
		Component: basic,
		code: `<script lang="ts">
  import {
    Plan,
    PlanHeader,
    PlanTitle,
    PlanDescription,
    PlanAction,
    PlanContent,
    PlanTrigger,
  } from "$lib/components/ai-elements/plan";
  import FileTextIcon from "@lucide/svelte/icons/file-text";
</script>

<Plan defaultOpen={false}>
  <PlanHeader>
    <div class="flex-1">
      <div class="mb-4 flex items-center gap-2">
        <FileTextIcon class="size-4" />
        <PlanTitle>
          {#snippet children()}
            Rewrite AI Elements to SolidJS
          {/snippet}
        </PlanTitle>
      </div>
      <PlanDescription>
        {#snippet children()}
          Rewrite the AI Elements component library from React to SolidJS while
          maintaining compatibility with existing React-based shadcn/ui components
          using solid-js/compat, updating all 29 components and their test suite.
        {/snippet}
      </PlanDescription>
    </div>
    <PlanAction>
      <PlanTrigger />
    </PlanAction>
  </PlanHeader>
  <PlanContent>
    <div class="space-y-4 text-sm">
      <div>
        <h3 class="mb-2 font-semibold">Overview</h3>
        <p>
          This plan outlines the migration strategy for converting the AI Elements
          library from React to SolidJS, ensuring compatibility and maintaining
          existing functionality.
        </p>
      </div>
      <div>
        <h3 class="mb-2 font-semibold">Key Steps</h3>
        <ul class="list-inside list-disc space-y-1">
          <li>Set up SolidJS project structure</li>
          <li>Install solid-js/compat for React compatibility</li>
          <li>Migrate components one by one</li>
          <li>Update test suite for each component</li>
          <li>Verify compatibility with shadcn/ui</li>
        </ul>
      </div>
    </div>
  </PlanContent>
</Plan>`,
	},
	withFooter: {
		Component: withFooter,
		code: `<script lang="ts">
  import {
    Plan,
    PlanHeader,
    PlanTitle,
    PlanDescription,
    PlanAction,
    PlanContent,
    PlanFooter,
    PlanTrigger,
  } from "$lib/components/ai-elements/plan";
  import { Button } from "$lib/components/ui/button";
  import FileTextIcon from "@lucide/svelte/icons/file-text";
</script>

<Plan defaultOpen={false}>
  <PlanHeader>
    <div class="flex-1">
      <div class="mb-4 flex items-center gap-2">
        <FileTextIcon class="size-4" />
        <PlanTitle>
          {#snippet children()}
            Rewrite AI Elements to SolidJS
          {/snippet}
        </PlanTitle>
      </div>
      <PlanDescription>
        {#snippet children()}
          Rewrite the AI Elements component library from React to SolidJS while
          maintaining compatibility with existing React-based shadcn/ui components
          using solid-js/compat, updating all 29 components and their test suite.
        {/snippet}
      </PlanDescription>
    </div>
    <PlanAction>
      <PlanTrigger />
    </PlanAction>
  </PlanHeader>
  <PlanContent>
    <div class="space-y-4 text-sm">
      <div>
        <h3 class="mb-2 font-semibold">Overview</h3>
        <p>
          This plan outlines the migration strategy for converting the AI Elements
          library from React to SolidJS, ensuring compatibility and maintaining
          existing functionality.
        </p>
      </div>
      <div>
        <h3 class="mb-2 font-semibold">Key Steps</h3>
        <ul class="list-inside list-disc space-y-1">
          <li>Set up SolidJS project structure</li>
          <li>Install solid-js/compat for React compatibility</li>
          <li>Migrate components one by one</li>
          <li>Update test suite for each component</li>
          <li>Verify compatibility with shadcn/ui</li>
        </ul>
      </div>
    </div>
  </PlanContent>
  <PlanFooter class="justify-end">
    <PlanAction>
      <Button size="sm">
        Build <kbd class="font-mono">⌘↩</kbd>
      </Button>
    </PlanAction>
  </PlanFooter>
</Plan>`,
	},
	streaming: {
		Component: streaming,
		code: `<script lang="ts">
  import {
    Plan,
    PlanHeader,
    PlanTitle,
    PlanDescription,
    PlanAction,
    PlanContent,
    PlanTrigger,
  } from "$lib/components/ai-elements/plan";
  import { Button } from "$lib/components/ui/button";
  import FileTextIcon from "@lucide/svelte/icons/file-text";

  let isStreaming = $state(false);

  function toggleStreaming() {
    isStreaming = !isStreaming;
  }
</script>

<div class="space-y-4">
  <Button onclick={toggleStreaming}>
    {isStreaming ? "Stop Streaming" : "Start Streaming"}
  </Button>

  <Plan {isStreaming} defaultOpen={false}>
    <PlanHeader>
      <div class="flex-1">
        <div class="mb-4 flex items-center gap-2">
          <FileTextIcon class="size-4" />
          <PlanTitle>
            {#snippet children()}
              AI-Powered Code Review
            {/snippet}
          </PlanTitle>
        </div>
        <PlanDescription>
          {#snippet children()}
            Analyzing your codebase and generating recommendations for improvements
            and best practices.
          {/snippet}
        </PlanDescription>
      </div>
      <PlanAction>
        <PlanTrigger />
      </PlanAction>
    </PlanHeader>
    <PlanContent>
      <div class="space-y-4 text-sm">
        <div>
          <h3 class="mb-2 font-semibold">Analysis Steps</h3>
          <ul class="list-inside list-disc space-y-1">
            <li>Scan codebase for patterns</li>
            <li>Identify potential issues</li>
            <li>Generate improvement suggestions</li>
            <li>Create detailed report</li>
          </ul>
        </div>
      </div>
    </PlanContent>
  </Plan>
</div>`,
	},
	multiplePlans: {
		Component: multiplePlans,
		code: `<script lang="ts">
  import {
    Plan,
    PlanHeader,
    PlanTitle,
    PlanDescription,
    PlanAction,
    PlanContent,
    PlanTrigger,
  } from "$lib/components/ai-elements/plan";
  import CheckIcon from "@lucide/svelte/icons/check";
</script>

<div class="space-y-4">
  <Plan defaultOpen={false}>
    <PlanHeader>
      <div class="flex-1">
        <PlanTitle>
          {#snippet children()}
            Phase 1: Research
          {/snippet}
        </PlanTitle>
        <PlanDescription>
          {#snippet children()}
            Gather requirements and analyze existing solutions.
          {/snippet}
        </PlanDescription>
      </div>
      <PlanAction>
        <PlanTrigger />
      </PlanAction>
    </PlanHeader>
    <PlanContent>
      <ul class="space-y-2 text-sm">
        <li class="flex items-start gap-2">
          <CheckIcon class="mt-0.5 size-4 text-green-600" />
          <span>Market research</span>
        </li>
        <li class="flex items-start gap-2">
          <CheckIcon class="mt-0.5 size-4 text-green-600" />
          <span>Competitor analysis</span>
        </li>
        <li class="flex items-start gap-2">
          <CheckIcon class="mt-0.5 size-4 text-green-600" />
          <span>User interviews</span>
        </li>
      </ul>
    </PlanContent>
  </Plan>

  <Plan defaultOpen={false}>
    <PlanHeader>
      <div class="flex-1">
        <PlanTitle>
          {#snippet children()}
            Phase 2: Design
          {/snippet}
        </PlanTitle>
        <PlanDescription>
          {#snippet children()}
            Create wireframes and design system components.
          {/snippet}
        </PlanDescription>
      </div>
      <PlanAction>
        <PlanTrigger />
      </PlanAction>
    </PlanHeader>
    <PlanContent>
      <ul class="space-y-2 text-sm">
        <li class="flex items-start gap-2">
          <CheckIcon class="mt-0.5 size-4 text-green-600" />
          <span>Create wireframes</span>
        </li>
        <li class="flex items-start gap-2">
          <CheckIcon class="mt-0.5 size-4 text-green-600" />
          <span>Design system setup</span>
        </li>
        <li class="flex items-start gap-2">
          <CheckIcon class="mt-0.5 size-4 text-green-600" />
          <span>Prototype key flows</span>
        </li>
      </ul>
    </PlanContent>
  </Plan>

  <Plan defaultOpen={false}>
    <PlanHeader>
      <div class="flex-1">
        <PlanTitle>
          {#snippet children()}
            Phase 3: Development
          {/snippet}
        </PlanTitle>
        <PlanDescription>
          {#snippet children()}
            Build and test the application features.
          {/snippet}
        </PlanDescription>
      </div>
      <PlanAction>
        <PlanTrigger />
      </PlanAction>
    </PlanHeader>
    <PlanContent>
      <ul class="space-y-2 text-sm">
        <li class="flex items-start gap-2">
          <CheckIcon class="mt-0.5 size-4 text-green-600" />
          <span>Set up development environment</span>
        </li>
        <li class="flex items-start gap-2">
          <CheckIcon class="mt-0.5 size-4 text-green-600" />
          <span>Implement core features</span>
        </li>
        <li class="flex items-start gap-2">
          <CheckIcon class="mt-0.5 size-4 text-green-600" />
          <span>Write tests</span>
        </li>
      </ul>
    </PlanContent>
  </Plan>
</div>`,
	},
};
