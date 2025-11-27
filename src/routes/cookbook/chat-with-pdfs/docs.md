# Chat with PDFs

Build an AI assistant that can read and answer questions about PDF documents.

## Overview

Upload PDFs and ask questions about their content. The AI reads the document and provides answers based on the PDF content.

## Converting Files to Data URLs

```typescript
async function convertFilesToDataURLs(files: FileList) {
  return Promise.all(
    Array.from(files).map(
      (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve({
              type: "file",
              filename: file.name,
              mediaType: file.type,
              url: reader.result as string, // Data URL
            });
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        })
    )
  );
}
```

## Sending Files with Messages

```typescript
const fileParts = await convertFilesToDataURLs(files);

chat.sendMessage({
  role: "user",
  parts: [
    { type: "text", text: input },
    ...fileParts,
  ],
});
```

## Server Endpoint

```typescript
import { streamText, convertToModelMessages } from "ai";

export const POST = async ({ request }) => {
  const { messages } = await request.json();

  const result = streamText({
    model: openrouter("openai/gpt-5-nano"),
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
};
```

## Key Concepts

1. **FileReader API** - Convert files to base64 data URLs
2. **Multi-part Messages** - Send text and files together
3. **Vision Models** - Use models that support document understanding

