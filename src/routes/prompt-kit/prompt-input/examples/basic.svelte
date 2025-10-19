<script lang="ts">
  import {
    PromptInput,
    PromptInputTextarea,
    PromptInputActions,
    PromptInputAction,
  } from "$lib/components/prompt-kit/prompt-input";
  import { Button } from "$lib/components/ui/button";
  import SendIcon from "@lucide/svelte/icons/send";

  let value = $state("");
  let isLoading = $state(false);

  function handleSubmit() {
    if (value.trim()) {
      console.log("Submitting:", value);
      isLoading = true;

      // Simulate async operation
      setTimeout(() => {
        isLoading = false;
        value = "";
      }, 2000);
    }
  }
</script>

<div class="max-w-2xl mx-auto">
  <PromptInput
    {isLoading}
    {value}
    onValueChange={(v) => (value = v)}
    onSubmit={handleSubmit}
  >
    <PromptInputTextarea placeholder="Type your message..." />
    <PromptInputActions>
      <PromptInputAction>
        {#snippet tooltip()}
          <p>Send message (Enter)</p>
        {/snippet}
        <Button
          size="icon"
          onclick={handleSubmit}
          disabled={!value.trim() || isLoading}
        >
          <SendIcon class="h-4 w-4" />
        </Button>
      </PromptInputAction>
    </PromptInputActions>
  </PromptInput>
</div>
