<script lang="ts">
  import {
    PromptInputProvider,
    PromptInput,
    PromptInputBody,
    PromptInputTextarea,
    PromptInputToolbar,
    PromptInputTools,
    PromptInputSubmit,
    PromptInputAttachments,
    PromptInputAttachment,
    PromptInputActionMenu,
    PromptInputActionMenuTrigger,
    PromptInputActionMenuContent,
    PromptInputActionAddAttachments,
    getPromptInputController,
    type PromptInputMessage,
  } from "$lib/components/ai-elements/prompt-input";
  import Button from "$lib/components/ui/button/button.svelte";
  import Sparkles from "@lucide/svelte/icons/sparkles";
  import FileText from "@lucide/svelte/icons/file-text";
  import Code from "@lucide/svelte/icons/code";
  import MessageSquare from "@lucide/svelte/icons/message-square";

  // Templates that can be inserted
  const templates = [
    {
      Icon: Sparkles,
      label: "Creative Story",
      text: "Write a creative story about a robot learning to paint. Include vivid descriptions and emotional depth.",
    },
    {
      Icon: Code,
      label: "Code Review",
      text: "Please review the following code for best practices, potential bugs, and performance improvements:\n\n",
    },
    {
      Icon: FileText,
      label: "Summarize",
      text: "Please provide a concise summary of the following text, highlighting the key points:\n\n",
    },
    {
      Icon: MessageSquare,
      label: "Email Draft",
      text: "Draft a professional email to respond to the following inquiry:\n\n",
    },
  ];

  let controller = $state<ReturnType<typeof getPromptInputController> | null>(
    null
  );

  // Initialize controller after provider is set
  $effect(() => {
    try {
      controller = getPromptInputController();
    } catch {
      // Provider not yet available
    }
  });

  function insertTemplate(text: string) {
    if (controller) {
      controller.textInput.setInput(text);
    }
  }

  function handleSubmit(message: PromptInputMessage): Promise<void> {
    console.log("Submitted:", message);
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Template submission complete!");
        resolve();
      }, 500);
    });
  }
</script>

<div class="mx-auto max-w-4xl space-y-6 p-8">
  <div class="space-y-2">
    <h1 class="text-3xl font-bold">Prompt Templates Example</h1>
    <p class="text-muted-foreground">
      Click any template to instantly populate the input with pre-written prompts
    </p>
  </div>

  <PromptInputProvider initialInput="">
    <!-- Template Gallery -->
    <div
      class="grid gap-3 rounded-lg border bg-card p-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {#each templates as template}
        <Button
          class="flex h-auto flex-col items-start gap-2 p-4"
          onclick={() => insertTemplate(template.text)}
          variant="outline"
        >
          <div class="flex items-center gap-2">
            <template.Icon class="h-4 w-4" />
            <span class="font-semibold text-sm">{template.label}</span>
          </div>
          <p class="line-clamp-2 text-left text-xs text-muted-foreground">
            {template.text}
          </p>
        </Button>
      {/each}
    </div>

    <!-- Stats Display -->
    {#if controller}
      <div class="flex items-center gap-4 text-sm text-muted-foreground">
        <span>
          Characters: <strong class="text-foreground"
            >{controller.textInput.value.length}</strong
          >
        </span>
        <span>•</span>
        <span>
          Attachments: <strong class="text-foreground"
            >{controller.attachments.files.length}</strong
          >
        </span>
      </div>
    {/if}

    <!-- Prompt Input -->
    <PromptInput globalDrop multiple onSubmit={handleSubmit}>
      <PromptInputBody>
        <PromptInputAttachments>
          {#snippet children(file)}
            <PromptInputAttachment data={file} />
          {/snippet}
        </PromptInputAttachments>
        <PromptInputTextarea placeholder="Use a template or type your own prompt..." />
      </PromptInputBody>
      <PromptInputToolbar>
        <PromptInputTools>
          <PromptInputActionMenu>
            <PromptInputActionMenuTrigger />
            <PromptInputActionMenuContent>
              <PromptInputActionAddAttachments />
            </PromptInputActionMenuContent>
          </PromptInputActionMenu>
        </PromptInputTools>
        <PromptInputSubmit />
      </PromptInputToolbar>
    </PromptInput>

    <!-- Info Card -->
    <div class="rounded-lg border bg-muted/50 p-4">
      <h4 class="mb-2 font-semibold text-sm">🎯 How it works</h4>
      <ul class="ml-4 list-disc space-y-1 text-sm text-muted-foreground">
        <li>
          Templates use <code class="text-xs">PromptInputProvider</code> to control
          input from outside
        </li>
        <li>Click any template to instantly populate the text input</li>
        <li>Character and attachment counts update in real-time</li>
        <li>
          The provider enables external state management without prop drilling
        </li>
      </ul>
    </div>
  </PromptInputProvider>
</div>
