# Prompt Input New Guide

Use this order:

1. Header -> Body -> Toolbar

```svelte
<PromptInput>
  <PromptInputHeader />
  <PromptInputBody />
  <PromptInputToolbar />
</PromptInput>
```

How it shows:

- `PromptInputHeader`: top area for chips, context, or status
- `PromptInputBody`: main content area for attachments and textarea
- `PromptInputToolbar`: bottom action row for tools and submit
