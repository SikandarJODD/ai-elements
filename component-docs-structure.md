# Component Docs Structure

Use `src/routes/(main)/components/actions` as the reference shape for new component docs.

## Required files

```text
component-name/
  examples/
  docs.md
  data.ts
  llms.txt/
    +server.ts
  +page.svelte
```

- `examples/`: preview component and any extra live demos.
- `docs.md`: markdown source for `llms.txt`, copy, and open-in-chat flows.
- `data.ts`: owns component meta, SEO, examples, preview imports, and props tables.
- `llms.txt/+server.ts`: returns `docs.md?raw`.
- `+page.svelte`: stays thin and renders `ComponentPageDocs` with the route data.


most used stuff

 `src/
└── lib/
    └── components/
        └── ai-elements/
            └── chat-container/
                ├── chat-container-content.svelte
                ├── chat-container.svelte
                ├── context.svelte.ts
                └── index.ts`