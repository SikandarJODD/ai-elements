# Implementation Notes - Message Component

## Port Summary

Successfully ported the React Message component to Svelte 5 with the following adaptations:

### Key Changes from React to Svelte

1. **Children Pattern**:
   - React: `children: React.ReactNode`
   - Svelte: `children: Snippet` with `{@render children()}`

2. **Props Spreading**:
   - React: `{...props}` on JSX
   - Svelte: `{...restProps}` on elements

3. **State Management**:
   - React: N/A (stateless component)
   - Svelte: Class-based context pattern (for future extensibility)

4. **Type System**:
   - React: `React.ComponentProps`, `React.HTMLProps`
   - Svelte: `HTMLAttributes<HTMLDivElement>`, component-specific types

5. **Tooltip Pattern**:
   - React: Uses `asChild` prop pattern
   - Svelte: Direct children wrapping (no `asChild`)

### Component Structure

```
message/
├── message-context.svelte.ts   # Context management (class-based)
├── Message.svelte              # Root container
├── MessageAvatar.svelte        # Avatar with fallback
├── MessageContent.svelte       # Content container
├── MessageActions.svelte       # Actions container
├── MessageAction.svelte        # Individual action with tooltip
├── index.ts                    # Public exports
├── README.md                   # Documentation
└── EXAMPLE.svelte              # Usage examples
```

### Design Decisions

1. **No $effect()**: As requested, all reactivity uses Svelte's built-in runes (`$state`, `$derived`, `$props`)

2. **Class + Context**: Following the `prompt-input` pattern with:
   - `MessageClass` for state management
   - Context setters/getters for child components
   - Currently minimal state (prepared for future expansion)

3. **Snippet-based Children**: Uses Svelte 5's `Snippet` type for flexible, typed children

4. **Lucide Icons Ready**: Examples show integration with `@lucide/svelte` (not `lucide-svelte`)

5. **Type Safety**: Full TypeScript support with proper type exports

### Known Limitations

1. **Markdown Support**: Currently a placeholder. To implement:
   - Add a markdown parser (e.g., `marked`, `markdown-it`)
   - Create a separate `Markdown.svelte` component
   - Import and use in `MessageContent` when `markdown={true}`

2. **Avatar DelayMs**: Removed as `bits-ui` Avatar.Fallback doesn't support this prop

### Future Enhancements

- [ ] Integrate markdown rendering library
- [ ] Add message states (sending, error, delivered)
- [ ] Add timestamp component
- [ ] Add read receipts
- [ ] Add message editing support
- [ ] Add message deletion support
- [ ] Add typing indicator integration

### Testing Checklist

- [x] All TypeScript types compile without errors
- [x] Components follow project patterns (prompt-input style)
- [x] No usage of `$effect()`
- [x] Context-based state management
- [x] Proper snippet rendering
- [x] README with examples
- [x] Example file demonstrating usage

## Usage in Project

Import from the message folder:

```typescript
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageActions,
  MessageAction
} from '$lib/components/prompt-kit/message';
```

## Differences from Original React Code

| Feature | React | Svelte |
|---------|-------|--------|
| Children | `React.ReactNode` | `Snippet` |
| Props | `React.HTMLProps<HTMLDivElement>` | `HTMLAttributes<HTMLDivElement>` |
| Tooltip | `asChild` prop | Direct wrapping |
| Avatar fallback delay | `delayMs` prop | Not supported |
| Markdown | `Markdown` component | Placeholder (to be implemented) |
| Context | Not used | Class-based context pattern |

## Integration Notes

The component integrates seamlessly with:
- ✅ UI components from `$lib/components/ui/`
- ✅ Utility functions from `$lib/utils/utils.ts`
- ✅ `@lucide/svelte` icons
- ✅ `bits-ui` primitives (Tooltip, Avatar)

No additional dependencies required beyond what's already in the project.
