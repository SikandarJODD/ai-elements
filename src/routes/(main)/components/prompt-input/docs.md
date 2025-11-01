# Prompt Input

> A flexible and composable prompt input component for AI chat interfaces with file upload support, drag-and-drop, and customizable actions.

## Installation

```bash
npx shadcn-svelte@latest add https://ai-elements.vercel.app/r/prompt-input.json
```

## Usage

### Basic Example

```svelte
<script lang="ts">
  import {
    PromptInput,
    PromptInputBody,
    PromptInputToolbar,
    PromptInputTextarea,
    PromptInputSubmit,
  } from "$lib/components/ai-elements/prompt-input";

  let message = "";

  function handleSubmit(data: any) {
    console.log("Submitted:", data);
    message = "";
  }
</script>

<PromptInput onSubmit={handleSubmit}>
  <PromptInputBody>
    <PromptInputTextarea
      bind:value={message}
      placeholder="Type your message..."
    />
  </PromptInputBody>
  <PromptInputToolbar>
    <PromptInputSubmit />
  </PromptInputToolbar>
</PromptInput>
```

### With File Upload

```svelte
<script lang="ts">
  import {
    PromptInput,
    PromptInputBody,
    PromptInputToolbar,
    PromptInputTextarea,
    PromptInputSubmit,
    PromptInputActionMenu,
    PromptInputActionMenuTrigger,
    PromptInputActionMenuContent,
    PromptInputActionAddAttachments,
  } from "$lib/components/ai-elements/prompt-input";

  let message = "";

  function handleSubmit(data: any) {
    console.log("Submitted:", data);
    message = "";
  }
</script>

<PromptInput onSubmit={handleSubmit} accept="image/*" multiple>
  <PromptInputBody>
    <PromptInputTextarea
      bind:value={message}
      placeholder="Type your message..."
    />
  </PromptInputBody>
  <PromptInputToolbar>
    <PromptInputActionMenu>
      <PromptInputActionMenuTrigger />
      <PromptInputActionMenuContent>
        <PromptInputActionAddAttachments />
      </PromptInputActionMenuContent>
    </PromptInputActionMenu>
    <PromptInputSubmit />
  </PromptInputToolbar>
</PromptInput>
```

## Component API

### PromptInput

| Prop            | Type                                                                                 | Default | Description                                                                                  |
| --------------- | ------------------------------------------------------------------------------------ | ------- | -------------------------------------------------------------------------------------------- |
| class           | string                                                                               | -       | Additional CSS classes to apply to the form container                                        |
| accept          | string                                                                               | -       | File types to accept (e.g., 'image/\*' or leave undefined for any)                           |
| multiple        | boolean                                                                              | -       | Whether to allow multiple file uploads                                                       |
| globalDrop      | boolean                                                                              | false   | When true, accepts drops anywhere on document                                                |
| syncHiddenInput | boolean                                                                              | false   | When true, renders a hidden input with given name and keeps it in sync for native form posts |
| clearOnSubmit   | boolean                                                                              | true    | When true, automatically clears attachments after successful submission                      |
| maxFiles        | number                                                                               | -       | Maximum number of files allowed                                                              |
| maxFileSize     | number                                                                               | -       | Maximum file size in bytes                                                                   |
| onError         | (err: { code: 'max_files' \| 'max_file_size' \| 'accept'; message: string }) => void | -       | Error handler for file validation errors                                                     |
| onSubmit        | (message: PromptInputMessage, event: SubmitEvent) => void \| Promise<void>           | -       | Submit handler called when the form is submitted                                             |
| children        | Snippet                                                                              | -       | Child components (typically PromptInputBody, PromptInputToolbar)                             |

### PromptInputBody

| Prop     | Type    | Default | Description                                           |
| -------- | ------- | ------- | ----------------------------------------------------- |
| class    | string  | -       | Additional CSS classes to apply to the body container |
| children | Snippet | -       | Child components to render                            |

### PromptInputTextarea

| Prop        | Type                   | Default | Description                            |
| ----------- | ---------------------- | ------- | -------------------------------------- |
| value       | string                 | -       | The textarea value (bindable)          |
| placeholder | string                 | -       | Placeholder text                       |
| class       | string                 | -       | Additional CSS classes                 |
| ...props    | HTMLTextareaAttributes | -       | All other textarea props are supported |

### PromptInputToolbar

| Prop     | Type    | Default | Description                                              |
| -------- | ------- | ------- | -------------------------------------------------------- |
| class    | string  | -       | Additional CSS classes to apply to the toolbar container |
| children | Snippet | -       | Child components to render                               |

### PromptInputSubmit

| Prop     | Type    | Default | Description                                          |
| -------- | ------- | ------- | ---------------------------------------------------- |
| class    | string  | -       | Additional CSS classes to apply to the submit button |
| children | Snippet | -       | Custom button content                                |

### PromptInputActionMenu

| Prop     | Type    | Default | Description                                                                            |
| -------- | ------- | ------- | -------------------------------------------------------------------------------------- |
| open     | boolean | -       | Whether the dropdown menu is open (bindable)                                           |
| children | Snippet | -       | Menu content (typically PromptInputActionMenuTrigger and PromptInputActionMenuContent) |

### PromptInputActionMenuTrigger

| Prop     | Type    | Default | Description                                            |
| -------- | ------- | ------- | ------------------------------------------------------ |
| class    | string  | -       | Additional CSS classes to apply to the trigger button  |
| children | Snippet | -       | Trigger content (defaults to PlusIcon if not provided) |

### PromptInputActionMenuContent

| Prop     | Type    | Default | Description                                                 |
| -------- | ------- | ------- | ----------------------------------------------------------- |
| class    | string  | -       | Additional CSS classes to apply to the dropdown content     |
| children | Snippet | -       | Menu items (typically PromptInputActionMenuItem components) |

### PromptInputActionMenuItem

| Prop     | Type                   | Default | Description                                      |
| -------- | ---------------------- | ------- | ------------------------------------------------ |
| class    | string                 | -       | Additional CSS classes to apply to the menu item |
| onSelect | (event: Event) => void | -       | Handler called when the menu item is selected    |
| children | Snippet                | -       | Menu item content                                |

### PromptInputActionAddAttachments

| Prop  | Type   | Default               | Description                                      |
| ----- | ------ | --------------------- | ------------------------------------------------ |
| label | string | "Add photos or files" | Label text for the menu item                     |
| class | string | -                     | Additional CSS classes to apply to the menu item |

---

For more information, visit: https://svelte-ai-elements.vercel.app/components/prompt-input
