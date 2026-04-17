**Message Rename File List**

**Summary**
Create a short Markdown file at repo root named `message-conversion-files.md` listing the files that reference `lib/components/ai-elements/message`, so the conversion can be handled one file at a time.

**Markdown Content**
```md
# Message Conversion Files

- ai-elements.json
- registry.json
- registry-storage.json
- static/llms.txt
- static/r/message.json
- static/r/playground.json
- src/lib/config/github-paths.ts
- src/lib/components/ai-elements/README.md
- src/routes/playground/+page.svelte
- src/routes/playground/components/code-viewer-dialog.svelte
- src/routes/ai-elements/llms.txt/ai-elements-llm.md
- src/routes/(main)/docs/installation/+page.svelte
- src/routes/(main)/guides/svelte-5-ai-sdk-integration/+page.svelte
- src/routes/(main)/components/message/+page.svelte
- src/routes/(main)/components/message/docs.md
- src/routes/(main)/components/message/examples/basic.svelte
- src/routes/(main)/components/actions/examples/message-action.svelte
- src/routes/(main)/components/checkpoint/docs.md
- src/routes/(main)/components/checkpoint/examples/basic.svelte
- src/routes/(main)/components/conversation/docs.md
- src/routes/(main)/components/loader/docs.md
- src/routes/(main)/components/shimmer/docs.md
```

**Key Changes**
- Add only `message-conversion-files.md`.
- Do not rename `message` or `new-message` yet.
- Use this list as the one-by-one conversion checklist.

**Assumptions**
- Include registry/static generated references because they currently mention `ai-elements/message`.
- Keep the file short and plain, with no status checkboxes.
