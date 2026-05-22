# Svelte AI Elements

<div align="center">
  <img src="static/assets/svelte-ai-elements.png" alt="Svelte AI Elements" />
</div>

<div align='center'>

[![jsrepo](https://jsrepo.com/badges/@ai/elements/dm)](https://jsrepo.com/@ai/elements)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GitHub Sponsors](https://img.shields.io/badge/GitHub%20Sponsors-Support-pink?logo=githubsponsors)](https://github.com/sponsors/SikandarJODD)

</div>

## Overview

**Svelte AI Elements** is a developer-focused component registry for building AI-native interfaces with **SvelteKit**. It is built on top of [shadcn-svelte](https://www.shadcn-svelte.com/)

Project is divided into two parts:

1. **AI Elements**: Full-featured, production-ready components for complex AI interfaces, including chat apps, reasoning UIs, tool integrations, and workflow builders.

## Installation

If you want the quickest way to try a basic prompt input, start with the lightweight **Prompt Kit** version.

### 1. Create a Svelte app

```bash
pnpm dlx sv create my-app
```

When prompted, select:

- `TypeScript`
- `Tailwind CSS`

### 2. Initialize shadcn-svelte

```bash
cd my-app
pnpm dlx shadcn-svelte@latest init
```

### 3. Add Prompt Input

```bash
pnpm dlx shadcn-svelte@latest add https://svelte-ai-elements.vercel.app/r/prompt-input.json
```

## Usage

Here is a very basic `Prompt Input` example:

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

### AI Elements

Full-featured components for chat apps, streaming responses, reasoning UIs, tools, and workflow-style AI interfaces.

- Docs: https://svelte-ai-elements.vercel.app/components
- Registry: https://svelte-ai-elements.vercel.app/r/index.json

### Prompt Kit

Lightweight prompt engineering and conversational UI components that are easy to compose into simple AI interfaces.

- Docs: https://svelte-ai-elements.vercel.app/prompt-kit
- Registry: https://svelte-ai-elements.vercel.app/p/index.json

## Most Used Components

### AI Elements

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
