<script lang="ts">
  import {
    Context,
    ContextCacheUsage,
    ContextContent,
    ContextContentBody,
    ContextContentFooter,
    ContextContentHeader,
    ContextInputUsage,
    ContextOutputUsage,
    ContextReasoningUsage,
    ContextTrigger,
  } from "../ai-elements/context/index.js";

  // Generate a unique ID for this component instance
</script>

<div class="flex items-center justify-center p-8">
  <Context
    maxTokens={128_000}
    modelId="openai:gpt-5"
    usage={{
      inputTokens: 32_000,
      outputTokens: 8000,
      cachedInputTokens: 0,
      reasoningTokens: 0,
    }}
    usedTokens={40_000}
  >
    <ContextTrigger />
    <ContextContent>
      <ContextContentHeader />
      <ContextContentBody>
        <ContextInputUsage />
        <ContextOutputUsage />
        <ContextReasoningUsage />
        <ContextCacheUsage />
      </ContextContentBody>
      <ContextContentFooter />
    </ContextContent>
  </Context>
</div>

<!-- Optional: Display the component ID for debugging -->
<!-- <p class="text-xs text-muted-foreground mt-2">Component ID: {componentId}</p> -->
