<script lang="ts">
  import {
    OpenIn,
    OpenInChatGPT,
    OpenInClaude,
    OpenInContent,
    OpenInScira,
    OpenInT3,
    OpenInTrigger,
    OpenInV0,
  } from "$lib/components/ai-elements/open-in-chat";

  let sampleQuery = "How can I implement authentication in SvelteKit?";
</script>

<div class="flex flex-col space-y-4 items-center">
  <div class="text-sm text-muted-foreground">
    Click the button below to open the query in various AI chat platforms:
  </div>

  <div class="text-sm font-mono bg-muted p-2 rounded">
    Query: "{sampleQuery}"
  </div>

  <OpenIn query={sampleQuery}>
    <OpenInTrigger />
    <OpenInContent>
      <OpenInChatGPT />
      <OpenInClaude />
      <OpenInT3 />
      <OpenInScira />
      <OpenInV0 />
    </OpenInContent>
  </OpenIn>
</div>
