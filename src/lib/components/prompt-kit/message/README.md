# Message Component

A flexible message component system for building chat interfaces in Svelte. Ported from React to follow Svelte 5 patterns with runes and snippets.

## Components

- `Message` - Root container for message layout
- `MessageAvatar` - Displays user/bot avatar with fallback support
- `MessageContent` - Container for message text/content with optional markdown support
- `MessageActions` - Container for action buttons
- `MessageAction` - Individual action button with tooltip

## Features

- ✅ Class-based context for state management
- ✅ Snippet-based children API (Svelte 5)
- ✅ No `$effect()` - uses Svelte's reactive state
- ✅ Uses `@lucide/svelte` for icons (when you add buttons)
- ✅ Fully typed with TypeScript
- ✅ Composable component architecture

## Installation

The component uses the following dependencies (already in your project):
- `bits-ui` for tooltip primitives
- UI components: Avatar, Tooltip
- `cn` utility for className merging

## Usage

### Basic Message

```svelte
<script>
  import {
    Message,
    MessageAvatar,
    MessageContent
  } from '$lib/components/prompt-kit/message';
</script>

<Message>
  <MessageAvatar
    src="/user-avatar.png"
    alt="User"
    fallback="U"
  />
  <MessageContent>
    Hello, this is a message!
  </MessageContent>
</Message>
```

### Message with Actions

```svelte
<script>
  import {
    Message,
    MessageAvatar,
    MessageContent,
    MessageActions,
    MessageAction
  } from '$lib/components/prompt-kit/message';
  import { Copy, ThumbsUp, ThumbsDown } from '@lucide/svelte';
  import { Button } from '$lib/components/ui/button';

  function handleCopy() {
    // Copy logic
  }

  function handleLike() {
    // Like logic
  }

  function handleDislike() {
    // Dislike logic
  }
</script>

<Message>
  <MessageAvatar
    src="/bot-avatar.png"
    alt="AI Assistant"
    fallback="AI"
  />
  <div class="flex flex-col gap-2">
    <MessageContent>
      Here's a helpful response!
    </MessageContent>

    <MessageActions>
      <MessageAction>
        {#snippet tooltip()}
          Copy
        {/snippet}
        <Button variant="ghost" size="icon" on:click={handleCopy}>
          <Copy class="h-4 w-4" />
        </Button>
      </MessageAction>

      <MessageAction side="bottom">
        {#snippet tooltip()}
          Like
        {/snippet}
        <Button variant="ghost" size="icon" on:click={handleLike}>
          <ThumbsUp class="h-4 w-4" />
        </Button>
      </MessageAction>

      <MessageAction>
        {#snippet tooltip()}
          Dislike
        {/snippet}
        <Button variant="ghost" size="icon" on:click={handleDislike}>
          <ThumbsDown class="h-4 w-4" />
        </Button>
      </MessageAction>
    </MessageActions>
  </div>
</Message>
```

### With Markdown Support

```svelte
<Message>
  <MessageAvatar
    src="/assistant.png"
    alt="Assistant"
    fallback="AI"
  />
  <MessageContent markdown={true}>
    # This is markdown
    - List item 1
    - List item 2
  </MessageContent>
</Message>
```

Note: Markdown rendering is currently a placeholder. You can integrate a markdown parser like `marked` or `markdown-it` when needed.

### Custom Styling

All components accept a `class` prop for custom styling:

```svelte
<Message class="border-b pb-4">
  <MessageAvatar
    class="h-10 w-10"
    src="/user.png"
    alt="User"
  />
  <MessageContent class="bg-primary text-primary-foreground">
    Styled message content
  </MessageContent>
</Message>
```

### Avatar Example

```svelte
<MessageAvatar
  src="/user.png"
  alt="User"
  fallback="U"
/>
```

## API Reference

### Message

Root container for the message.

**Props:**
- `class?: string` - Additional CSS classes
- `...props` - All HTML div attributes

### MessageAvatar

Displays an avatar with fallback support.

**Props:**
- `src: string` - Avatar image URL (required)
- `alt: string` - Alt text for the image (required)
- `fallback?: string` - Text to display if image fails to load
- `class?: string` - Additional CSS classes

### MessageContent

Container for message content.

**Props:**
- `markdown?: boolean` - Enable markdown rendering (default: false)
- `class?: string` - Additional CSS classes
- `...props` - All HTML div attributes

### MessageActions

Container for action buttons.

**Props:**
- `class?: string` - Additional CSS classes
- `...props` - All HTML div attributes

### MessageAction

Individual action button with tooltip.

**Props:**
- `tooltip: Snippet` - Tooltip content (required)
- `side?: 'top' | 'bottom' | 'left' | 'right'` - Tooltip position (default: 'top')
- `class?: string` - Additional CSS classes for tooltip content
- `...props` - Tooltip root props from bits-ui

## Architecture

The component follows the class + context pattern used in your project:

1. **Context Management**: `message-context.svelte.ts` provides a class-based state container
2. **Root Component**: `Message.svelte` initializes and provides context
3. **Child Components**: Sub-components can access context if needed (currently minimal state)
4. **Composability**: Each component is independent and composable

## Future Enhancements

- Integrate markdown parser for `MessageContent`
- Add message state (sending, error, etc.) to context
- Add timestamp display component
- Add read receipts component
- Add typing indicator integration
