# Installation

Install Svelte AI Elements in a SvelteKit app and start with `prompt-input`.

## Prerequisites

- A SvelteKit project
- `shadcn-svelte` initialized
- Node.js installed

## Commands

```bash
pnpm dlx sv create my-app
pnpm dlx shadcn-svelte@latest init
pnpm dlx shadcn-svelte@latest add https://svelte-ai-elements.vercel.app/r/prompt-input.json
```

## First usage

Import `* as PromptInput` from `$lib/components/ai-elements/prompt-input` and render `PromptInput.Root`, `PromptInput.Body`, `PromptInput.Textarea`, `PromptInput.Toolbar`, and `PromptInput.Submit`.

## Next step

- Component docs: `/components/prompt-input`
