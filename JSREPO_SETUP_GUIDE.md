# 🎯 JSRepo Setup Guide for AI Elements

## ✨ **Strategy: Extend shadcn-svelte**

**Key Insight**: AI Elements are **built on top of shadcn-svelte**, not standalone!

Users will already have from shadcn-svelte:
- ✅ `$lib/utils` with `cn()` function
- ✅ shadcn-svelte UI components (Button, Card, Tooltip, etc.)
- ✅ Tailwind CSS configured
- ✅ SvelteKit project structure

**Result**: We don't need to change anything in your components! 🎉

---

## 📁 Current Structure Analysis

### ✅ **Your Structure is PERFECT!**

```
src/lib/components/ai-elements/
├── action/           → @ai/elements/action
├── artifact/         → @ai/elements/artifact
├── code/             → @ai/elements/code
├── conversation/     → @ai/elements/conversation
├── message/          → @ai/elements/message
├── prompt-input/     → @ai/elements/prompt-input
└── ... (18 more blocks)
```

Each directory = One installable block ✅

---

## 🚀 Implementation Steps

### Step 1: Install JSRepo CLI

```powershell
npm i -g jsrepo
```

### Step 2: Authenticate with jsrepo.com

```powershell
jsrepo auth
```

You'll be directed to login and authorize the CLI.

### Step 3: Initialize Registry Config

```powershell
jsrepo init --registry
```

When prompted:
- **Where are your blocks located?**: `./src/lib/components/ai-elements`
- **Add another blocks directory?**: No
- **Create jsrepo-build-config.json?**: Yes

### Step 4: Configure jsrepo-build-config.json

Create/update the file with this content:

```json
{
  "$schema": "https://unpkg.com/jsrepo@1.47.0/schemas/registry-config.json",
  "name": "@ai/elements",
  "version": "0.1.0",
  "dirs": ["./src/lib/components/ai-elements"],

  "excludeDeps": [
    "svelte",
    "@sveltejs/kit",
    "tailwindcss",
    "clsx",
    "tailwind-merge",
    "tailwind-variants"
  ],

  "meta": {
    "authors": ["SikandarJODD"],
    "description": "⚡ AI-powered Svelte components built on shadcn-svelte. Requires shadcn-svelte installation. Add beautiful conversational AI interfaces to your SvelteKit apps.",
    "homepage": "https://github.com/SikandarJODD/ai-elements",
    "repository": "https://github.com/SikandarJODD/ai-elements",
    "bugs": "https://github.com/SikandarJODD/ai-elements/issues",
    "tags": ["svelte", "ai", "shadcn-svelte", "components", "chatbot", "conversation", "ai-sdk", "vercel-ai"]
  },

  "peerDependencies": {
    "svelte": {
      "version": "5.x.x",
      "message": "AI Elements requires Svelte 5. Install: npm i svelte@latest"
    },
    "@sveltejs/kit": {
      "version": "2.x.x",
      "message": "AI Elements requires SvelteKit. Create project: npm create svelte@latest"
    },
    "tailwindcss": {
      "version": "4.x.x",
      "message": "AI Elements requires Tailwind CSS v4. See: https://tailwindcss.com/docs/installation"
    }
  },

  "configFiles": [
    {
      "name": "Global Styles (app.css)",
      "path": "./src/app.css",
      "expectedPath": "./src/app.css",
      "optional": false
    }
  ],

  "rules": {
    "no-framework-dependency": "error",
    "no-unpinned-dependency": "warn",
    "require-local-dependency-exists": "error"
  }
}
```

### Step 5: Create Prerequisites Documentation

Create a README for users to understand setup requirements:

**File**: `src/lib/components/ai-elements/README.md`

```markdown
# AI Elements

Beautiful AI-powered components for SvelteKit, built on shadcn-svelte.

## Prerequisites

Before installing AI Elements, you **must** have shadcn-svelte set up in your project:

### 1. Initialize shadcn-svelte

\`\`\`bash
npx shadcn-svelte@latest init
\`\`\`

### 2. Install Required shadcn Components

AI Elements depend on these shadcn-svelte components:

\`\`\`bash
npx shadcn-svelte@latest add button card tooltip scroll-area badge
\`\`\`

Different AI Elements may require additional components:

| AI Element | Required shadcn Components |
|------------|---------------------------|
| `message` | button, avatar |
| `code` | button (for copy) |
| `conversation` | scroll-area |
| `prompt-input` | button, tooltip, popover |
| `workflow` | card, button |

### 3. Install AI SDK

\`\`\`bash
npm install ai @ai-sdk/svelte
\`\`\`

## Installation

Once prerequisites are met, install AI Elements:

\`\`\`bash
# Initialize the registry
jsrepo init @ai/elements

# Install specific components
jsrepo add message
jsrepo add code
jsrepo add conversation
jsrepo add prompt-input
\`\`\`

## Troubleshooting

**Import errors for `$lib/utils`?**
→ Run `npx shadcn-svelte@latest init` to set up the utils

**Import errors for UI components?**
→ Install required shadcn components: `npx shadcn-svelte@latest add button card`

**Styling issues?**
→ Ensure your `app.css` includes Tailwind and the CSS variables
\`\`\`

### Step 6: Add Per-Component README Files (Optional)

For components with specific dependencies, add a README:

**Example**: `src/lib/components/ai-elements/workflow/README.md`

```markdown
# Workflow Component

Visual workflow builder for AI agents.

## Dependencies

This component requires:

### shadcn-svelte Components
\`\`\`bash
npx shadcn-svelte@latest add card button
\`\`\`

### npm Packages
\`\`\`bash
npm install @xyflow/svelte
\`\`\`

## Usage

\`\`\`svelte
<script>
  import { Workflow } from '$lib/components/ai-elements/workflow';
</script>

<Workflow nodes={nodes} edges={edges} />
\`\`\`
\`\`\`

### Step 7: Update package.json

Add build scripts:

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "registry:build": "jsrepo build",
    "registry:publish": "jsrepo publish",
    "registry:publish:dry": "jsrepo publish --dry-run"
  }
}
```

### Step 8: Build and Test

```powershell
# Build the manifest
pnpm registry:build

# This creates jsrepo-manifest.json

# Test publish (won't actually publish)
pnpm registry:publish:dry
```

### Step 9: Publish to jsrepo.com

```powershell
# Real publish
pnpm registry:publish
```

---

## 📦 What Gets Installed

When users run `jsrepo add message`, they get:

```
src/lib/components/ai-elements/message/
├── Message.svelte
├── MessageContent.svelte
├── MessageAvatar.svelte
└── index.ts
```

**Imports stay as-is**:
```typescript
import { cn } from "$lib/utils";  // ✅ From shadcn-svelte
import { Avatar } from "$lib/components/ui/avatar";  // ✅ From shadcn-svelte
```

**JSRepo automatically**:
- ✅ Copies all files
- ✅ Installs npm dependencies (ai, @ai-sdk/svelte, etc.)
- ✅ Resolves local dependencies (if Message needs Code, installs both)
- ✅ Skips excluded deps (svelte, tailwindcss, etc.)

---

## 🎨 User Installation Flow

### First Time Setup

```bash
# 1. User creates SvelteKit project
npm create svelte@latest my-app
cd my-app

# 2. User installs shadcn-svelte
npx shadcn-svelte@latest init

# 3. User installs required shadcn components
npx shadcn-svelte@latest add button card tooltip

# 4. User initializes AI Elements registry
jsrepo init @ai/elements

# 5. User installs AI components
jsrepo add message code conversation
```

### Post-Install Message

JSRepo doesn't have built-in post-install messages, but we can:

1. **Include README files** - JSRepo copies them with the block
2. **Document in meta description** - Shows on jsrepo.com
3. **Create a setup checker** - Optional block that verifies setup

---

## 📋 Component Dependency Matrix

Track which AI Elements need which shadcn components:

| AI Element | shadcn Components | npm Packages |
|------------|------------------|--------------|
| message | avatar, button | ai, @ai-sdk/svelte |
| code | button | @shikijs/langs, @shikijs/themes |
| conversation | scroll-area | ai |
| prompt-input | button, tooltip, popover | ai |
| workflow | card, button | @xyflow/svelte |
| tool | button | ai |
| artifact | card | ai |

You can add this to your main README or create a dependencies guide.

---

## ✅ Final Checklist

Before publishing:

- [ ] `jsrepo-build-config.json` is configured
- [ ] Main README.md explains shadcn-svelte prerequisite
- [ ] `excludeDeps` includes all shadcn dependencies
- [ ] `peerDependencies` lists required versions
- [ ] `app.css` is in `configFiles`
- [ ] Build script added to package.json
- [ ] Test build: `pnpm registry:build`
- [ ] Test publish: `pnpm registry:publish:dry`
- [ ] Authenticated: `jsrepo auth`
- [ ] Scope claimed on jsrepo.com: `@ai`

---

## 🎯 Summary

**What we're NOT changing**:
- ❌ No component code changes
- ❌ No import path changes
- ❌ No utils refactoring

**What we're adding**:
- ✅ `jsrepo-build-config.json`
- ✅ Documentation about prerequisites
- ✅ Build/publish scripts

**Result**:
- ✅ Components work perfectly with shadcn-svelte
- ✅ Users get a seamless experience
- ✅ No code duplication
- ✅ Easy to maintain

Ready to implement? Let's do it! 🚀
