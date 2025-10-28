# AI Elements

Beautiful AI-powered components for SvelteKit, built on top of shadcn-svelte.

## 📋 Prerequisites

**Important**: AI Elements are built as an extension of shadcn-svelte. You **must** have shadcn-svelte set up before installing AI Elements.

### 1. Initialize shadcn-svelte

```bash
npx shadcn-svelte@latest init
```

This sets up:

- `$lib/utils.ts` with the `cn()` utility
- Tailwind CSS configuration
- Component structure

### 2. Install Required shadcn Components

AI Elements depend on several shadcn-svelte components. Install the base set:

```bash
npx shadcn-svelte@latest add button card tooltip scroll-area badge avatar
```

### 3. Install AI SDK

```bash
pnpm add ai @ai-sdk/svelte
```

## 📦 Installation

Once prerequisites are met, install AI Elements using JSRepo:

```bash
# Install JSRepo CLI globally
pnpm add -g jsrepo

# Initialize the AI Elements registry
jsrepo init @ai/elements

# Install specific components
jsrepo add message
jsrepo add code
jsrepo add conversation
jsrepo add prompt-input
```

## 🧩 Component Dependencies

Different AI Elements require different shadcn components:

| AI Element     | Required shadcn Components     | Additional npm Packages                       |
| -------------- | ------------------------------ | --------------------------------------------- |
| `message`      | `avatar`, `button`             | `ai`, `@ai-sdk/svelte`                        |
| `code`         | `button`                       | `@shikijs/langs`, `@shikijs/themes`, `marked` |
| `conversation` | `scroll-area`, `button`        | `ai`                                          |
| `prompt-input` | `button`, `tooltip`, `popover` | `ai`                                          |
| `workflow`     | `card`, `button`               | `@xyflow/svelte`                              |
| `tool`         | `button`, `badge`              | `ai`                                          |
| `artifact`     | `card`                         | `ai`                                          |
| `response`     | -                              | `ai`                                          |
| `sources`      | `card`, `badge`                | -                                             |
| `copy-button`  | `button`, `tooltip`            | -                                             |

**Pro Tip**: Install all commonly used shadcn components at once:

```bash
npx shadcn-svelte@latest add button card tooltip scroll-area badge avatar popover input textarea
```

## 🚀 Usage

After installation, import and use components:

```svelte
<script lang="ts">
  import {
    Message,
    MessageContent,
    MessageAvatar,
  } from "$lib/components/ai-elements/message/index.js";
  import { Code } from "$lib/components/ai-elements/code/index.js";
  import { Conversation } from "$lib/components/ai-elements/conversation/index.js";
</script>

<Conversation>
  <Message from="user">
    <MessageAvatar />
    <MessageContent>Hello, AI!</MessageContent>
  </Message>

  <Message from="assistant">
    <MessageAvatar />
    <MessageContent>
      <Code lang="typescript" code={`console.log("Hello!")`} />
    </MessageContent>
  </Message>
</Conversation>
```

## 🔧 Troubleshooting

### Import Errors

**Error: Cannot find module '$lib/utils'**

```bash
# Solution: Initialize shadcn-svelte
npx shadcn-svelte@latest init
```

**Error: Cannot find module '$lib/components/ui/button'**

```bash
# Solution: Install missing shadcn component
npx shadcn-svelte@latest add button
```

**Error: Module not found: '@ai-sdk/svelte'**

```bash
# Solution: Install AI SDK
pnpm add ai @ai-sdk/svelte
```

### Styling Issues

If components don't look right:

1. Ensure `app.css` includes Tailwind and CSS variables
2. Check that Tailwind is properly configured in your project
3. Verify dark mode is set up if using dark theme

### Type Errors

Make sure you have the latest type definitions:

```bash
pnpm add -D @types/node typescript
```

## 📚 Documentation

For detailed component documentation and examples, visit:

- [GitHub Repository](https://github.com/SikandarJODD/ai-elements)
- [Component Examples](https://github.com/SikandarJODD/ai-elements/tree/main/src/routes)

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## 📄 License

[License information from your repo]
