# Svelte AI Elements

<div align="center">
  <img src="static/assets/svelte-ai-elements.png" alt="Svelte AI Elements" />
</div>
<br />
<a href="https://vercel.com/open-source-program">
  <img alt="Vercel OSS Program" src="https://vercel.com/oss/program-badge-2026.svg" />
</a>
<br />
<br />

**Svelte AI Elements** is a unofficial port of [Vercel AI Elements](https://vercel.com/changelog/introducing-ai-elements) for Svelte. It provides a set of components and utilities to help developers build AI-powered applications with Svelte.

## Installation

### 1. Create a Svelte app

```bash
pnpm dlx sv create my-app
```

### 2. Initialize shadcn-svelte

```bash
cd my-app
pnpm dlx shadcn-svelte@latest init
```

### 3. Add Prompt Input Component

```bash
pnpm dlx shadcn-svelte@latest add https://svelte-ai-elements.vercel.app/r/prompt-input.json
```

## Usage

Here is a very basic `Prompt Input` example f:

```svelte
<script lang="ts">
  import * as PromptInput from "$lib/components/ai-elements/prompt-input";
  import type { Message } from "$lib/components/ai-elements/prompt-input";
  import { Chat } from "@ai-sdk/svelte";

  let chat = new Chat({});

  function handleSubmit(message: Message) {
    chat.sendMessage({
      text: message.text,
    });
  }
</script>

<div class="space-y-4">
  <PromptInput.Root class="w-xl" onSubmit={handleSubmit}>
    <PromptInput.Body>
      <PromptInput.Textarea />
    </PromptInput.Body>

    <PromptInput.Toolbar class="justify-end">
      <PromptInput.Submit />
    </PromptInput.Toolbar>
  </PromptInput.Root>

  <!-- Showcase messages -->
  <ul>
    {#each chat.messages as message, messageIndex (messageIndex)}
      <li>
        <div class="text-base font-semibold">{message.role}</div>
        <div>
          {#each message.parts as part, partIndex (partIndex)}
            {#if part.type === "text"}
              <div class="text-muted-foreground text-sm">{part.text}</div>
            {/if}
          {/each}
        </div>
      </li>
    {/each}
  </ul>
</div>
```

## Libraries

### Svelte AI Elements

Full-featured components for chat apps, streaming responses, reasoning UIs, tools, and workflow-style AI interfaces.

- Docs: https://svelte-ai-elements.vercel.app/components
- Registry: https://svelte-ai-elements.vercel.app/r/index.json

### Svelte Prompt Kit

Lightweight prompt engineering and conversational UI components that are easy to compose into simple AI interfaces.

- Site: https://sv-prompt-kit.vercel.app
- Registry: https://svelte-ai-elements.vercel.app/p/index.json

## Most Used Components

### Svelte AI Elements

| Component      | What it helps with                                    |
| -------------- | ----------------------------------------------------- |
| `Message`      | Role-based chat messages and response layout          |
| `Prompt Input` | Prompt submission with AI-focused input controls      |
| `Conversation` | Scrollable conversation containers and chat structure |
| `Response`     | Streaming markdown response rendering                 |
| `Reasoning`    | Expandable AI thinking and reasoning views            |

## Streaming Responses

For markdown and streaming response rendering, this project uses [`streamdown-svelte`](https://github.com/PacificStudio/streamdown-svelte), the Svelte port used throughout the repo for streamed markdown output.

## Inspired By

- [Vercel AI Elements](https://vercel.com/changelog/introducing-ai-elements)

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

<div align="center">
  <p>Made with ❤️ by <a href="https://x.com/Sikandar_Bhide">Bhide Svelte</a></p>

</div>
