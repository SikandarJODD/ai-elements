# New Message Guide

Use this order:

1. `Message`
2. `MessageContent` or `MessageBranch`
3. optional `MessageToolbar`

```svelte
<Message from="assistant">
  <MessageBranch>
    <MessageBranchContent {versions} />
    <MessageToolbar>
      <MessageBranchSelector>
        <MessageBranchPrevious />
        <MessageBranchPage />
        <MessageBranchNext />
      </MessageBranchSelector>
    </MessageToolbar>
  </MessageBranch>
</Message>
```

How it shows:

- `Message`: outer role-aware wrapper
- `MessageContent`: single message body
- `MessageBranchContent`: built-in renderer for branched message versions
- `MessageToolbar`: bottom row for selectors and actions
