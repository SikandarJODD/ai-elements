# Prompt Input Examples

This directory contains 6 comprehensive examples demonstrating the new Prompt Input component features.

## Examples Overview

### 1. **Cursor-Style with Tools & Model Selector** (`PromptInputExample1CursorStyle.svelte`)

**Full-featured example** showcasing:

- ✅ Action menu with dropdown
- ✅ Model selector with multiple models
- ✅ Speech-to-text button
- ✅ Custom tools (Search button)
- ✅ File attachments with global drop
- ✅ Status management (submitted/streaming/ready)

**Use Case**: Production-ready chat interface similar to Cursor AI

---

### 2. **Web Speech API Focus** (`PromptInputExample2SpeechAPI.svelte`)

**Minimal example** highlighting:

- ✅ Speech-to-text functionality
- ✅ Voice input demonstration
- ✅ Real-time transcription
- ✅ Simple submit flow

**Use Case**: Voice-first applications, accessibility features

---

### 3. **File Upload & Control** (`PromptInputExample3FileUpload.svelte`)

**File-focused example** demonstrating:

- ✅ File validation (accept, maxFiles, maxFileSize)
- ✅ Image-only uploads
- ✅ Error handling with user feedback
- ✅ Global drag & drop
- ✅ File preview in attachments

**Use Case**: Image analysis, document processing, multi-modal AI

---

### 4. **Command Palette Integration** (`PromptInputExample4CommandPalette.svelte`)

**Advanced example** featuring:

- ✅ Command palette in header
- ✅ File/folder search
- ✅ Context selection
- ✅ Hover card with command list
- ✅ Dynamic file selection

**Use Case**: Code assistants, IDE integrations, context-aware AI

---

### 5. **Tabs & Hover Cards** (`PromptInputExample5TabsHoverCards.svelte`)

**UI-rich example** showcasing:

- ✅ Tabs for file organization (Active/Recent)
- ✅ Multiple hover cards
- ✅ File metadata display
- ✅ Project rules integration
- ✅ Clean header organization

**Use Case**: Project-aware AI, workspace management

---

### 6. **Provider Mode with External Controls** (`PromptInputExample6ProviderMode.svelte`)

**Provider pattern example** demonstrating:

- ✅ PromptInputProvider usage
- ✅ External control buttons
- ✅ Programmatic input manipulation
- ✅ Message history tracking
- ✅ State management outside component

**Use Case**: Complex applications needing external control, testing, automation

---

## Usage

```svelte
<script>
  import { PromptInputExample1CursorStyle } from "$lib/components/examples/prompt-new";
</script>

<PromptInputExample1CursorStyle />
```

## Features Demonstrated Across Examples

| Feature          | Ex1 | Ex2 | Ex3 | Ex4 | Ex5 | Ex6 |
| ---------------- | --- | --- | --- | --- | --- | --- |
| File Attachments | ✅  | ❌  | ✅  | ❌  | ❌  | ✅  |
| Speech-to-Text   | ✅  | ✅  | ❌  | ❌  | ❌  | ❌  |
| Model Selector   | ✅  | ❌  | ❌  | ❌  | ❌  | ❌  |
| Action Menu      | ✅  | ❌  | ✅  | ❌  | ❌  | ❌  |
| Command Palette  | ❌  | ❌  | ❌  | ✅  | ❌  | ❌  |
| Tabs             | ❌  | ❌  | ❌  | ❌  | ✅  | ❌  |
| Hover Cards      | ❌  | ❌  | ❌  | ✅  | ✅  | ❌  |
| Provider Mode    | ❌  | ❌  | ❌  | ❌  | ❌  | ✅  |
| Header Section   | ❌  | ❌  | ❌  | ✅  | ✅  | ❌  |
| File Validation  | ❌  | ❌  | ✅  | ❌  | ❌  | ❌  |

## Component Architecture

All examples follow the same basic structure:

```svelte
<PromptInput onSubmit={handleSubmit}>
  <PromptInputHeader>
    <!-- Optional: Command palette, tabs, metadata -->
  </PromptInputHeader>

  <PromptInputAttachments>
    <!-- File previews -->
  </PromptInputAttachments>

  <PromptInputBody>
    <PromptInputTextarea />
  </PromptInputBody>

  <PromptInputFooter>
    <PromptInputTools>
      <!-- Action menu, speech, model selector, etc. -->
    </PromptInputTools>
    <PromptInputSubmit />
  </PromptInputFooter>
</PromptInput>
```

## Key Patterns

### 1. **Svelte 5 Runes**

All examples use modern Svelte 5 syntax:

- `$state` for reactive state
- `$derived` for computed values
- `{#snippet}` for render props

### 2. **bind:value Pattern**

Components use Svelte's `bind:value` instead of React's controlled pattern:

```svelte
<PromptInputModelSelect bind:value={model} />
<PromptInputTabs bind:value={activeTab} />
```

### 3. **Type Safety**

All examples are fully typed with TypeScript:

```typescript
import type { ChatStatus, PromptInputMessage } from "ai";
```

## Testing

Each example can be tested independently. They all:

- ✅ Have no TypeScript errors
- ✅ Use proper Svelte 5 syntax
- ✅ Follow the codebase patterns
- ✅ Include user feedback (status, messages, errors)
