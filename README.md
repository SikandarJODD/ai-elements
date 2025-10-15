# Svelte AI Elements

<div align="center">
  <img src="static/assets/svelte-ai-elements.png" alt="Svelte AI Elements" />
</div>

<div align="center">
  <p><strong>Pre-built, customizable Svelte AI components for AI-native applications</strong></p>
</div>

<div align="center">

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Svelte](https://img.shields.io/badge/Svelte-5.0-orange.svg)](https://svelte.dev/)
[![jsrepo](https://img.shields.io/badge/jsrepo-registry-blue)](https://jsrepo.dev/registries/@ai/elements)
[![jsrepo](https://jsrepo.dev/badges/registry/blocks?url=@ai/elements)](https://jsrepo.dev/registry?url=@ai/elements)
[![jsrepo](https://jsrepo.dev/badges/registry/categories?url=@ai/elements)](https://jsrepo.dev/registry?url=@ai/elements)

</div>

## Overview

Svelte AI Elements is a custom registy built on top of shadcn-svelte to help you build AI-native applications faster. It provides a set of customizable, high-quality components build for AI applications like prompt input, messages, conversation, response and more.

### Key Features

-  **Beautiful Design**: Built on top of shadcn-svelte with modern, accessible UI components
-  **Highly Customizable**: Easily modify components to match your brand and requirements
-  **Responsive**: Works seamlessly across desktop and mobile devices
-  **Accessible**: Built with accessibility best practices in mind
- **TypeScript Ready**: Full TypeScript support with comprehensive type definitions

## Installation

### Using JSRepo (Recommended)

The easiest way to install AI Elements is using [JSRepo](https://jsrepo.dev):

```bash
# Install JSRepo CLI
pnpm add -g jsrepo

# Initialize the registry
jsrepo init @ai/elements

# Install individual components
jsrepo add message
jsrepo add code
jsrepo add conversation
jsrepo add prompt-input
```

> **Prerequisites**: AI Elements requires [shadcn-svelte](https://www.shadcn-svelte.com/) to be installed first. Run `npx shadcn-svelte@latest init` before installing AI Elements.

### Using shadcn-svelte CLI

Alternatively, you can install components directly using the shadcn-svelte CLI:

```bash
# Install a specific component
pnpm dlx shadcn-svelte@latest add https://ai-elements.vercel.app/r/[COMPONENT].json
```

## Available Components

AI Elements provides 22+ components for building AI-native applications:

| Component | Description | Install Command |
|-----------|-------------|-----------------|
| `message` | Chat message components with avatar and content | `jsrepo add message` |
| `conversation` | Conversation container with scroll management | `jsrepo add conversation` |
| `prompt-input` | Advanced prompt input with attachments | `jsrepo add prompt-input` |
| `code` | Syntax-highlighted code blocks with copy button | `jsrepo add code` |
| `response` | AI response streaming display | `jsrepo add response` |
| `tool` | Tool call visualization with input/output | `jsrepo add tool` |
| `artifact` | Artifact display with preview | `jsrepo add artifact` |
| `reasoning` | Display AI reasoning steps | `jsrepo add reasoning` |
| `sources` | Display and manage source citations | `jsrepo add sources` |
| `suggestion` | Show AI-generated suggestions | `jsrepo add suggestion` |
| `task` | Task progress tracking | `jsrepo add task` |
| `branch` | Conversation branching interface | `jsrepo add branch` |
| `chain-of-thought` | Display chain-of-thought reasoning | `jsrepo add chain-of-thought` |
| `context` | Context window usage visualization | `jsrepo add context` |
| `copy-button` | Copy-to-clipboard button | `jsrepo add copy-button` |
| `image` | AI-generated image display | `jsrepo add image` |
| `inline-citation` | Inline citation with hover cards | `jsrepo add inline-citation` |
| `loader` | Loading states and animations | `jsrepo add loader` |
| `open-in-chat` | Open in external chat interfaces | `jsrepo add open-in-chat` |
| `web-preview` | Web page preview with console | `jsrepo add web-preview` |

[View all components on jsrepo.dev →](https://jsrepo.dev/registries/@ai/elements)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## References and Inspirations

This project draws inspiration from several excellent projects in the web development and AI space:

- **[shadcn-svelte-extras](https://www.shadcn-svelte-extras.com)** - Additional components and utilities for shadcn-svelte
- **[AI Elements](https://vercel.com/changelog/introducing-ai-elements)** - AI Elements by Vercel for building AI-powered applications
- **[Prompt Kit](https://www.prompt-kit.com)** - Beautiful UI components for AI applications

## Acknowledgments

- Built with [Svelte 5](https://svelte.dev/) and [SvelteKit](https://kit.svelte.dev/)
- UI components based on [shadcn-svelte](https://www.shadcn-svelte.com/)
- Styling with [TailwindCSS](https://tailwindcss.com/)
- AI integration powered by [Vercel AI SDK](https://sdk.vercel.ai/)

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/SikandarJODD">Sikandar Bhide (Bhide Svelte)</a></p>
  <p>
    <a href="https://svelte-ai-elements.vercel.app/docs/installation">Documentation</a> •
    <a href="https://github.com/SikandarJODD/ai-elements">GitHub</a> •
    <a href="https://github.com/SikandarJODD/ai-elements/issues">Issues</a>
  </p>
</div>
