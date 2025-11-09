# Confirmation

> A component for requesting user approval before executing sensitive AI actions. Displays different states for approval requests, accepted, and rejected actions.

## Installation

```bash
npx shadcn-svelte@latest add https://ai-elements.vercel.app/r/confirmation.json
```

## Usage

### Basic Example

```svelte
<script lang="ts">
  import {
    Confirmation,
    ConfirmationTitle,
    ConfirmationRequest,
    ConfirmationAccepted,
    ConfirmationRejected,
    ConfirmationActions,
    ConfirmationAction,
  } from "$lib/components/ai-elements/confirmation";

  let approval = $state({ id: "tool-1" });
  let state = $state("approval-requested");

  function handleApprove() {
    approval = { ...approval, approved: true };
    state = "approval-responded";
  }

  function handleReject() {
    approval = { ...approval, approved: false, reason: "User declined" };
    state = "output-denied";
  }
</script>

<Confirmation {approval} {state}>
  <ConfirmationTitle>
    Delete 3 files from the project directory?
  </ConfirmationTitle>

  <ConfirmationRequest>
    <ConfirmationActions>
      <ConfirmationAction variant="default" onclick={handleApprove}>
        Approve
      </ConfirmationAction>
      <ConfirmationAction variant="outline" onclick={handleReject}>
        Reject
      </ConfirmationAction>
    </ConfirmationActions>
  </ConfirmationRequest>

  <ConfirmationAccepted>
    Files have been deleted successfully.
  </ConfirmationAccepted>

  <ConfirmationRejected>
    Action was rejected. Files were not deleted.
  </ConfirmationRejected>
</Confirmation>
```

### With AI SDK

```svelte
<script lang="ts">
  import { Chat } from "@ai-sdk/svelte";
  import {
    Confirmation,
    ConfirmationTitle,
    ConfirmationRequest,
    ConfirmationAccepted,
    ConfirmationRejected,
    ConfirmationActions,
    ConfirmationAction,
  } from "$lib/components/ai-elements/confirmation";

  let chat = new Chat({
    api: "/api/chat",
    maxSteps: 5,
  });

  async function handleApprove(toolCallId: string) {
    await chat.addToolResult({
      toolCallId,
      result: { approved: true },
    });
  }

  async function handleReject(toolCallId: string) {
    await chat.addToolResult({
      toolCallId,
      result: { approved: false, reason: "User declined" },
    });
  }
</script>

{#each chat.messages as message}
  {#if message.role === "assistant"}
    {#each message.toolInvocations ?? [] as toolInvocation}
      <Confirmation
        approval={{ id: toolInvocation.toolCallId, ...toolInvocation.result }}
        state={toolInvocation.state}
      >
        <ConfirmationTitle>
          {toolInvocation.toolName}: Confirm action?
        </ConfirmationTitle>

        <ConfirmationRequest>
          <ConfirmationActions>
            <ConfirmationAction
              onclick={() => handleApprove(toolInvocation.toolCallId)}
            >
              Approve
            </ConfirmationAction>
            <ConfirmationAction
              variant="outline"
              onclick={() => handleReject(toolInvocation.toolCallId)}
            >
              Reject
            </ConfirmationAction>
          </ConfirmationActions>
        </ConfirmationRequest>

        <ConfirmationAccepted>
          Action approved and executed.
        </ConfirmationAccepted>

        <ConfirmationRejected>Action was rejected.</ConfirmationRejected>
      </Confirmation>
    {/each}
  {/if}
{/each}
```

## Component API

### Confirmation

| Prop         | Type                           | Default | Description                                                                                          |
| ------------ | ------------------------------ | ------- | ---------------------------------------------------------------------------------------------------- |
| approval     | ToolUIPartApproval             | -       | Approval object containing id, approved status, and optional reason                                  |
| state        | ToolUIPartState                | -       | Current state: 'approval-requested' \| 'approval-responded' \| 'output-denied' \| 'output-available' |
| class        | string                         | -       | Additional CSS classes to apply to the alert container                                               |
| children     | Snippet                        | -       | Child components (ConfirmationTitle, ConfirmationRequest, etc.)                                      |
| ...restProps | HTMLAttributes<HTMLDivElement> | -       | All other div props are supported                                                                    |

### ConfirmationTitle

| Prop     | Type    | Default | Description                                  |
| -------- | ------- | ------- | -------------------------------------------- |
| class    | string  | -       | Additional CSS classes to apply to the title |
| children | Snippet | -       | Title content                                |

### ConfirmationRequest

| Prop     | Type    | Default | Description                                                                |
| -------- | ------- | ------- | -------------------------------------------------------------------------- |
| children | Snippet | -       | Content to show when approval is requested (typically ConfirmationActions) |

### ConfirmationAccepted

| Prop     | Type    | Default | Description                             |
| -------- | ------- | ------- | --------------------------------------- |
| children | Snippet | -       | Content to show when action is approved |

### ConfirmationRejected

| Prop     | Type    | Default | Description                             |
| -------- | ------- | ------- | --------------------------------------- |
| children | Snippet | -       | Content to show when action is rejected |

### ConfirmationActions

| Prop     | Type    | Default | Description                                              |
| -------- | ------- | ------- | -------------------------------------------------------- |
| class    | string  | -       | Additional CSS classes to apply to the actions container |
| children | Snippet | -       | Action buttons (ConfirmationAction components)           |

### ConfirmationAction

| Prop         | Type                                                                        | Default   | Description                                   |
| ------------ | --------------------------------------------------------------------------- | --------- | --------------------------------------------- |
| variant      | 'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link' | 'default' | Button variant style                          |
| size         | 'default' \| 'sm' \| 'lg' \| 'icon'                                         | 'sm'      | Button size                                   |
| class        | string                                                                      | -         | Additional CSS classes to apply to the button |
| children     | Snippet                                                                     | -         | Button content                                |
| onclick      | (e: MouseEvent) => void                                                     | -         | Click handler function                        |
| ...restProps | HTMLButtonAttributes                                                        | -         | All other button props are supported          |

## Features

- **State-based rendering** for different approval stages
- **Built on shadcn-svelte Alert** component for consistent styling
- **Flexible action buttons** with customizable variants
- **Context-based composition** for clean component structure
- **TypeScript support** with proper type definitions
- **Accessible** with proper ARIA attributes
- **Seamless AI SDK integration** with Vercel AI SDK
- **Responsive design** with mobile support

## Use Cases

- **File operations**: Confirm file deletion or modification
- **Database operations**: Approve database changes
- **API calls**: Confirm sensitive API operations
- **Code execution**: Request permission before running code
- **Payments**: Approve transactions
- **System changes**: Confirm configuration updates

---

For more information, visit: https://ai-elements.vercel.app/components/confirmation
