<script lang="ts">
  import Actions from "$lib/components/examples/Actions.svelte";
  import ActionHover from "$lib/components/examples/ActionHover.svelte";
  import BranchExample from "$lib/components/examples/BranchExample.svelte";
  import ChainOfThoughtExample from "$lib/components/examples/ChainOfThoughtExample.svelte";
  import ContextExample from "$lib/components/examples/ContextExample.svelte";
  import ConversationExample from "$lib/components/examples/ConversationExample.svelte";
  import InlineCitationExample from "$lib/components/examples/InlineCitationExample.svelte";
  import MessageExample from "$lib/components/examples/MessageExample.svelte";
  import OpenInChatExample from "$lib/components/examples/OpenInChatExample.svelte";
  import PromptInputExample from "$lib/components/examples/PromptInputExample.svelte";
  import ReasoningExample from "$lib/components/examples/ReasoningExample.svelte";
  import SourcesExample from "$lib/components/examples/SourcesExample.svelte";
  import SuggestionsExample from "$lib/components/examples/SuggestionsExample.svelte";
  import TaskExample from "$lib/components/examples/TaskExample.svelte";
  import WebPreviewExample from "$lib/components/examples/WebPreviewExample.svelte";
  import CodeBlockExample from "$lib/components/examples/CodeBlockExample.svelte";
  import SimpleCodeBlockExample from "$lib/components/examples/SimpleCodeBlockExample.svelte";
  import AdvancedCodeExample from "$lib/components/examples/AdvancedCodeExample.svelte";
  import ToolExample from "$lib/components/examples/ToolExample.svelte";
  import ArtifactExample from "$lib/components/examples/ArtifactExample.svelte";
  import ParentOne from "$lib/learning/examples/parent-one.svelte";
  import ParentTwo from "$lib/learning/examples/parent-two.svelte";
</script>

<div
  class="min-h-screen flex flex-col items-center justify-center p-8 space-y-12"
>
  <!-- Show grid of 2 where i can show parent comp 1 and 2 in those grid  -->
  <!-- <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
    <div>
      <h2 class="text-2xl font-bold mb-4">Parent Component 1</h2>
      <div class="border rounded-md bg-neutral-800/10 p-4">
        <ParentOne />
      </div>
    </div>
    <div>
      <h2 class="text-2xl font-bold mb-4">Parent Component 2</h2>
      <div class="border rounded-md bg-neutral-800/10 p-4">
        <ParentOne />
      </div>
    </div>
  </div> -->

  <!-- Message Example Section -->
  <div class="w-full max-w-4xl">
    <h2 class="text-2xl font-bold mb-4 text-center">Message Example</h2>
    <div class="border rounded-md bg-neutral-800/10 p-4">
      <MessageExample />
    </div>
  </div>

  <!-- Context Example Section -->
  <div class="w-full max-w-4xl">
    <h2 class="text-2xl font-bold mb-4 text-center">Context Usage Example</h2>
    <div class="border rounded-md bg-neutral-800/10 p-4">
      <ContextExample />
    </div>
  </div>

  <!-- Conversation Example Section -->
  <div class="w-full max-w-4xl">
    <h2 class="text-2xl font-bold mb-4 text-center">Conversation Example</h2>
    <div class="border rounded-md bg-neutral-800/10 p-4 h-96">
      <ConversationExample />
    </div>
  </div>

  <!-- Open in Chat Example Section -->
  <div class=" max-w-4xl">
    <h2 class="text-2xl font-bold mb-4 text-center">Open in Chat Example</h2>
    <div class="border rounded-md bg-neutral-800/10 p-4">
      <OpenInChatExample />
    </div>
  </div>

  <!-- Prompt Input Example Section -->
  <div class="w-full max-w-4xl">
    <h2 class="text-2xl font-bold mb-4 text-center">Prompt Input Example</h2>
    <div class="border rounded-md bg-neutral-800/10 p-4">
      <PromptInputExample />
    </div>
  </div>

  <!-- Inline Citation Example Section -->
  <div class="w-full max-w-4xl">
    <h2 class="text-2xl font-bold mb-4 text-center">Inline Citation Example</h2>
    <div class="border rounded-md bg-neutral-800/10 p-4">
      <InlineCitationExample />
    </div>
  </div>

  <!-- Reasoning Example Section -->
  <div class="w-full max-w-4xl">
    <h2 class="text-2xl font-bold mb-4 text-center">Reasoning Example</h2>
    <div class="border rounded-md bg-neutral-800/10 p-4">
      <ReasoningExample />
    </div>
  </div>

  <!-- Sources Example Section -->
  <div class="w-full max-w-4xl">
    <h2 class="text-2xl font-bold mb-4 text-center">Sources Example</h2>
    <div class="border rounded-md bg-neutral-800/10 p-4">
      <SourcesExample />
    </div>
  </div>

  <!-- Suggestions Example Section -->
  <div class="w-full max-w-4xl">
    <h2 class="text-2xl font-bold mb-4 text-center">Suggestions Example</h2>
    <div class="border rounded-md bg-neutral-800/10 p-4">
      <SuggestionsExample />
    </div>
  </div>

  <!-- Task Example Section -->
  <div class="w-full max-w-4xl">
    <h2 class="text-2xl font-bold mb-4 text-center">Task Example</h2>
    <div class="border rounded-md bg-neutral-800/10 p-4">
      <TaskExample />
    </div>
  </div>

  <!-- CodeBlock Example Section -->


  <!-- Simple CodeBlock Example Section -->
  <div class="w-full max-w-4xl">
    <h2 class="text-2xl font-bold mb-4 text-center">Simple CodeBlock Example</h2>
    <div class="border rounded-md bg-neutral-800/10 p-4">
      <CodeBlockExample />
    </div>
  </div>

  <!-- Advanced Code Example Section -->
  <!-- <div class="w-full max-w-4xl">
    <h2 class="text-2xl font-bold mb-4 text-center">Advanced Code Examples</h2>
    <div class="border rounded-md bg-neutral-800/10 p-4">
      <AdvancedCodeExample />
    </div>
  </div> -->

  <!-- Web Preview Example Section -->
  <div class="w-full max-w-4xl">
    <h2 class="text-2xl font-bold mb-4 text-center">Web Preview Example</h2>
    <div class="border rounded-md bg-neutral-800/10 p-4">
      <WebPreviewExample />
    </div>
  </div>

  <!-- Tool Example Section -->
  <div class="w-full max-w-4xl">
    <h2 class="text-2xl font-bold mb-4 text-center">Tool Example</h2>
    <div class="border rounded-md bg-neutral-800/10 p-4">
      <ToolExample />
    </div>
  </div>

  <!-- Artifact Example Section -->
  <div class="w-full max-w-4xl">
    <h2 class="text-2xl font-bold mb-4 text-center">Artifact Example</h2>
    <div class="border rounded-md bg-neutral-800/10 p-4">
      <ArtifactExample />
    </div>
  </div>

  <!-- <Actions />
  <ActionHover />
  <BranchExample />
  <ChainOfThoughtExample /> -->
</div>
