# File Upload

> A component for creating drag-and-drop file upload interfaces with support for single or multiple files, custom triggers, and visual feedback during file dragging operations.

## Installation

```bash
npx shadcn-svelte@latest add https://svelte-ai-elements.vercel.app//p/file-upload.json
```

## Usage

### Basic Example with Prompt Input

```svelte
<script lang="ts">
  import {
    FileUpload,
    FileUploadContent,
    FileUploadTrigger,
  } from "$lib/components/prompt-kit/file-upload";
  import {
    PromptInput,
    PromptInputAction,
    PromptInputActions,
    PromptInputTextarea,
  } from "$lib/components/prompt-kit/prompt-input";
  import { Button } from "$lib/components/ui/button";
  import { ArrowUp, Paperclip } from "@lucide/svelte";

  let input = $state("");
  let isLoading = $state(false);
  let files = $state<File[]>([]);

  function handleFilesAdded(newFiles: File[]) {
    files = [...files, ...newFiles];
  }

  function handleSubmit() {
    if (input.trim() || files.length > 0) {
      isLoading = true;
      setTimeout(() => {
        isLoading = false;
        input = "";
        files = [];
      }, 2000);
    }
  }

  function handleValueChange(value: string) {
    input = value;
  }
</script>

<FileUpload
  onFilesAdded={handleFilesAdded}
  accept=".jpg,.jpeg,.png,.pdf,.docx"
>
  <PromptInput
    value={input}
    onValueChange={handleValueChange}
    {isLoading}
    onSubmit={handleSubmit}
  >
    <FileUploadContent>
      <PromptInputTextarea placeholder="Ask me anything..." />
    </FileUploadContent>
    <PromptInputActions class="justify-between pt-2">
      <FileUploadTrigger asChild>
        <Button variant="ghost" size="icon" class="h-8 w-8">
          <Paperclip class="size-4" />
        </Button>
      </FileUploadTrigger>
      <PromptInputAction>
        <Button
          variant="default"
          size="icon"
          class="h-8 w-8 rounded-full"
          onclick={handleSubmit}
        >
          <ArrowUp class="size-5" />
        </Button>
      </PromptInputAction>
    </PromptInputActions>
  </PromptInput>
</FileUpload>
```

## Component API

### FileUpload

| Prop         | Type                    | Default | Description                              |
| ------------ | ----------------------- | ------- | ---------------------------------------- |
| onFilesAdded | (files: File[]) => void | -       | Function called when files are added     |
| children     | Snippet                 | -       | Child components                         |
| multiple     | boolean                 | true    | Allow selection of multiple files        |
| accept       | string                  | -       | File types to accept (e.g., ".jpg,.png") |

### FileUploadTrigger

| Prop      | Type                              | Default | Description                      |
| --------- | --------------------------------- | ------- | -------------------------------- |
| asChild   | boolean                           | false   | Use child element as the trigger |
| className | string                            | -       | Additional CSS classes           |
| children  | Snippet                           | -       | Child components                 |
| ...props  | HTMLAttributes<HTMLButtonElement> | -       | All other button props           |

### FileUploadContent

| Prop      | Type                           | Default | Description            |
| --------- | ------------------------------ | ------- | ---------------------- |
| className | string                         | -       | Additional CSS classes |
| ...props  | HTMLAttributes<HTMLDivElement> | -       | All other div props    |

---

For more information, visit: https://svelte-ai-elements.vercel.app//prompt-kit/file-upload
