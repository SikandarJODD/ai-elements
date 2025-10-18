<script lang="ts">
  import KitMessageExample from "$lib/components/kit-examples/kit-message-example.svelte";
  import KitPromptInputActionsExample from "$lib/components/kit-examples/kit-prompt-input-actions-example.svelte";
  import KitPromptInputExample from "$lib/components/kit-examples/kit-prompt-input-example.svelte";
  import KitSystemMessageExample from "$lib/components/kit-examples/kit-system-message-example.svelte";
  import KitSystemMessageFilledVariantsExample from "$lib/components/kit-examples/kit-system-message-filled-variants-example.svelte";
  import KitSystemMessageCtaExample from "$lib/components/kit-examples/kit-system-message-cta-example.svelte";
  import KitLoaderExample from "$lib/components/kit-examples/kit-loader-example.svelte";
  import KitLoaderSizeExample from "$lib/components/kit-examples/kit-loader-size-example.svelte";
  import KitPromptSuggestionExample from "$lib/components/kit-examples/kit-prompt-suggestion-example.svelte";
  import KitPromptSuggestionHighlightExample from "$lib/components/kit-examples/kit-prompt-suggestion-highlight-example.svelte";
  import KitPromptSuggestionChatCompleteExample from "$lib/components/kit-examples/kit-prompt-suggestion-chat-complete-example.svelte";
  import KitToolExample from "$lib/components/kit-examples/kit-tool-example.svelte";
  import KitToolStatesExample from "$lib/components/kit-examples/kit-tool-states-example.svelte";
  import KitToolStatesCompactExample from "$lib/components/kit-examples/kit-tool-states-compact-example.svelte";
  import KitSourceBasicExample from "$lib/components/kit-examples/kit-source-basic-example.svelte";
  import KitSourceCustomExample from "$lib/components/kit-examples/kit-source-custom-example.svelte";
  import KitStepsBasicExample from "$lib/components/kit-examples/kit-steps-basic-example.svelte";
  import KitStepsWithSourceExample from "$lib/components/kit-examples/kit-steps-with-source-example.svelte";
  import KitStepsIconSwapExample from "$lib/components/kit-examples/kit-steps-icon-swap-example.svelte";
  import KitStepsWithLoaderExample from "$lib/components/kit-examples/kit-steps-with-loader-example.svelte";
  import KitFileUploadWithPromptInputExample from "$lib/components/kit-examples/kit-file-upload-with-prompt-input-example.svelte";
  import KitCodeBlockBasicExample from "$lib/components/kit-examples/kit-code-block-basic-example.svelte";
  import KitCodeBlockWithHeaderExample from "$lib/components/kit-examples/kit-code-block-with-header-example.svelte";
  import KitCodeBlockPythonExample from "$lib/components/kit-examples/kit-code-block-python-example.svelte";
  import KitCodeBlockCssExample from "$lib/components/kit-examples/kit-code-block-css-example.svelte";
  import KitCodeBlockThemeExample from "$lib/components/kit-examples/kit-code-block-theme-example.svelte";
  import KitMarkdownBasicExample from "$lib/components/kit-examples/kit-markdown-basic-example.svelte";
  import KitMarkdownCustomComponentsExample from "$lib/components/kit-examples/kit-markdown-custom-components-example.svelte";
</script>

<div class="mx-auto max-w-2xl p-4">
  <KitPromptInputExample />
</div>
<div>
  <h2 class="mb-4 mt-8 text-2xl font-bold">
    Prompt Input with Actions Example
  </h2>
  <div class="mx-auto max-w-2xl p-4">
    <KitPromptInputActionsExample />
  </div>
  <!-- Message example  -->
  <div class="mx-auto max-w-2xl p-4">
    <h2 class="mb-4 mt-8 text-2xl font-bold">Message Component Example</h2>
    <KitMessageExample />
  </div>
  <!-- System Message example  -->
  <div class="mx-auto max-w-2xl p-4">
    <h2 class="mb-4 mt-8 text-2xl font-bold">System Message Component Example</h2>
    <KitSystemMessageExample />
  </div>
  <!-- System Message Filled Variants example  -->
  <div class="mx-auto max-w-2xl p-4">
    <h2 class="mb-4 mt-8 text-2xl font-bold">System Message Filled Variants Example</h2>
    <KitSystemMessageFilledVariantsExample />
  </div>
  <!-- System Message with CTA example  -->
  <div class="mx-auto max-w-2xl p-4">
    <h2 class="mb-4 mt-8 text-2xl font-bold">System Message with CTA Example</h2>
    <KitSystemMessageCtaExample />
  </div>
  <!-- Loader example  -->
  <div class="mx-auto max-w-4xl p-4">
    <h2 class="mb-4 mt-8 text-2xl font-bold">Loader Component Example</h2>
    <KitLoaderExample />
  </div>
  <!-- Loader Sizes example  -->
  <div class="mx-auto max-w-4xl p-4">
    <h2 class="mb-4 mt-8 text-2xl font-bold">Loader Sizes Example</h2>
    <KitLoaderSizeExample />
  </div>
  <!-- Prompt Suggestion example  -->
  <div class="mx-auto max-w-2xl p-4">
    <h2 class="mb-4 mt-8 text-2xl font-bold">Prompt Suggestion Example</h2>
    <KitPromptSuggestionExample />
  </div>
  <!-- Prompt Suggestion Highlight example  -->
  <div class="mx-auto max-w-2xl p-4">
    <h2 class="mb-4 mt-8 text-2xl font-bold">Prompt Suggestion Highlight Example</h2>
    <KitPromptSuggestionHighlightExample />
  </div>
  <!-- Prompt Suggestion Chat Complete Interface example  -->
  <div class="mx-auto max-w-2xl p-4">
    <h2 class="mb-4 mt-8 text-2xl font-bold">Chat Complete Interface Example</h2>
    <KitPromptSuggestionChatCompleteExample />
  </div>
  <!-- Tool example  -->
  <div class="mx-auto max-w-2xl p-4">
    <h2 class="mb-4 mt-8 text-2xl font-bold">Tool Component Example</h2>
    <KitToolExample />
  </div>
  <!-- Tool States example  -->
  <div class="mx-auto max-w-2xl p-4">
    <h2 class="mb-4 mt-8 text-2xl font-bold">Tool Component - All States</h2>
    <KitToolStatesExample />
  </div>
  <!-- Tool States Compact example  -->
  <div class="mx-auto max-w-2xl p-4">
    <h2 class="mb-4 mt-8 text-2xl font-bold">Tool States (Compact)</h2>
    <KitToolStatesCompactExample />
  </div>
  <!-- Source Basic example  -->
  <div class="mx-auto max-w-2xl p-4">
    <h2 class="mb-4 mt-8 text-2xl font-bold">Source Component - Basic Example</h2>
    <KitSourceBasicExample />
  </div>
  <!-- Source Custom example  -->
  <div class="mx-auto max-w-2xl p-4">
    <h2 class="mb-4 mt-8 text-2xl font-bold">Source Component - Custom Example</h2>
    <KitSourceCustomExample />
  </div>
  <!-- Steps Basic example  -->
  <div class="mx-auto max-w-2xl p-4">
    <h2 class="mb-4 mt-8 text-2xl font-bold">Steps Component - Basic Example</h2>
    <KitStepsBasicExample />
  </div>
  <!-- Steps With Source example  -->
  <div class="mx-auto max-w-2xl p-4">
    <h2 class="mb-4 mt-8 text-2xl font-bold">Steps Component - With Source</h2>
    <KitStepsWithSourceExample />
  </div>
  <!-- Steps Icon Swap example  -->
  <div class="mx-auto max-w-2xl p-4">
    <h2 class="mb-4 mt-8 text-2xl font-bold">Steps Component - Custom Icon</h2>
    <KitStepsIconSwapExample />
  </div>
  <!-- Steps With Loader example  -->
  <div class="mx-auto max-w-2xl p-4">
    <h2 class="mb-4 mt-8 text-2xl font-bold">Steps Component - With Loader</h2>
    <KitStepsWithLoaderExample />
  </div>
  <!-- File Upload with Prompt Input example  -->
  <div class="mx-auto max-w-4xl p-4">
    <h2 class="mb-4 mt-8 text-2xl font-bold">File Upload with Prompt Input</h2>
    <KitFileUploadWithPromptInputExample />
  </div>
  <!-- Code Block Basic example  -->
  <div class="mx-auto max-w-4xl p-4">
    <h2 class="mb-4 mt-8 text-2xl font-bold">Code Block - Basic Example</h2>
    <KitCodeBlockBasicExample />
  </div>
  <!-- Code Block With Header example  -->
  <div class="mx-auto max-w-4xl p-4">
    <h2 class="mb-4 mt-8 text-2xl font-bold">Code Block - With Header</h2>
    <KitCodeBlockWithHeaderExample />
  </div>
  <!-- Code Block Python example  -->
  <div class="mx-auto max-w-4xl p-4">
    <h2 class="mb-4 mt-8 text-2xl font-bold">Code Block - Python Example</h2>
    <KitCodeBlockPythonExample />
  </div>
  <!-- Code Block CSS example  -->
  <div class="mx-auto max-w-4xl p-4">
    <h2 class="mb-4 mt-8 text-2xl font-bold">Code Block - CSS Example</h2>
    <KitCodeBlockCssExample />
  </div>
  <!-- Code Block Theme example  -->
  <div class="mx-auto max-w-4xl p-4">
    <h2 class="mb-4 mt-8 text-2xl font-bold">Code Block - Theme-Aware (Svelte Todo)</h2>
    <KitCodeBlockThemeExample />
  </div>
  <!-- Markdown Basic example  -->
  <div class="mx-auto max-w-4xl p-4">
    <h2 class="mb-4 mt-8 text-2xl font-bold">Markdown - Basic Example</h2>
    <KitMarkdownBasicExample />
  </div>
  <!-- Markdown Custom Components example  -->
  <div class="mx-auto max-w-4xl p-4">
    <h2 class="mb-4 mt-8 text-2xl font-bold">Markdown - Custom Theme Example</h2>
    <KitMarkdownCustomComponentsExample />
  </div>
</div>
