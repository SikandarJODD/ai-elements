# Inline Citation

> Display citations inline with text content, similar to academic papers or research documents, with detailed source information on hover.

## Installation

```bash
npx shadcn-svelte@latest add ${PUBLIC_WEBSITE_URL}/r/inline-citation.json
```

## Usage

### Basic Example

```svelte
<script lang="ts">
  import {
    InlineCitation,
    InlineCitationTrigger,
    InlineCitationContent,
    InlineCitationTitle,
    InlineCitationDescription,
    InlineCitationUrl,
  } from "$lib/components/ai-elements/inline-citation";
</script>

<p>
  This is a fact from a source
  <InlineCitation>
    <InlineCitationTrigger number="1" />
    <InlineCitationContent>
      <InlineCitationTitle>Source Title</InlineCitationTitle>
      <InlineCitationDescription>
        Description of the source
      </InlineCitationDescription>
      <InlineCitationUrl url="https://example.com" />
    </InlineCitationContent>
  </InlineCitation>
</p>
```

### Multiple Citations

```svelte
<script lang="ts">
  import {
    InlineCitation,
    InlineCitationTrigger,
    InlineCitationContent,
    InlineCitationTitle,
    InlineCitationDescription,
    InlineCitationUrl,
  } from "$lib/components/ai-elements/inline-citation";

  const citations = [
    {
      number: "1",
      title: "First Source",
      description: "Description of first source",
      url: "https://example.com/1",
    },
    {
      number: "2",
      title: "Second Source",
      description: "Description of second source",
      url: "https://example.com/2",
    },
  ];
</script>

<p>
  This fact is from source one
  <InlineCitation>
    <InlineCitationTrigger number={citations[0].number} />
    <InlineCitationContent>
      <InlineCitationTitle>{citations[0].title}</InlineCitationTitle>
      <InlineCitationDescription>
        {citations[0].description}
      </InlineCitationDescription>
      <InlineCitationUrl url={citations[0].url} />
    </InlineCitationContent>
  </InlineCitation>
  and this is from source two
  <InlineCitation>
    <InlineCitationTrigger number={citations[1].number} />
    <InlineCitationContent>
      <InlineCitationTitle>{citations[1].title}</InlineCitationTitle>
      <InlineCitationDescription>
        {citations[1].description}
      </InlineCitationDescription>
      <InlineCitationUrl url={citations[1].url} />
    </InlineCitationContent>
  </InlineCitation>.
</p>
```

### With AI SDK

```svelte
<script lang="ts">
  import { experimental_useObject as useObject } from "@ai-sdk/svelte";
  import {
    InlineCitation,
    InlineCitationTrigger,
    InlineCitationContent,
    InlineCitationTitle,
    InlineCitationDescription,
    InlineCitationUrl,
  } from "$lib/components/ai-elements/inline-citation";
  import { z } from "zod";

  const { object, submit } = useObject({
    api: "/api/citation",
    schema: z.object({
      content: z.string(),
      citations: z.array(
        z.object({
          number: z.string(),
          title: z.string(),
          description: z.string(),
          url: z.string(),
        })
      ),
    }),
  });

  function generateCitation() {
    submit("Explain quantum computing with citations");
  }
</script>

<button onclick={generateCitation}>Generate with Citations</button>

{#if $object?.content}
  <div class="prose">
    <p>
      {#each $object.content.split(/(\[\d+\])/) as part}
        {@const citationMatch = part.match(/\[(\d+)\]/)}
        {#if citationMatch}
          {@const citationNumber = citationMatch[1]}
          {@const citation = $object.citations?.find(
            (c) => c.number === citationNumber
          )}
          {#if citation}
            <InlineCitation>
              <InlineCitationTrigger number={citation.number} />
              <InlineCitationContent>
                <InlineCitationTitle>{citation.title}</InlineCitationTitle>
                <InlineCitationDescription>
                  {citation.description}
                </InlineCitationDescription>
                <InlineCitationUrl url={citation.url} />
              </InlineCitationContent>
            </InlineCitation>
          {/if}
        {:else}
          {part}
        {/if}
      {/each}
    </p>
  </div>
{/if}
```

## Component API

### InlineCitation

| Prop         | Type           | Default | Description                                       |
| ------------ | -------------- | ------- | ------------------------------------------------- |
| children     | Snippet        | -       | Child components to render                        |
| class        | string         | -       | Additional CSS classes to apply to the container  |
| ...restProps | HoverCardProps | -       | All other HoverCard component props are supported |

### InlineCitationTrigger

| Prop         | Type                  | Default | Description                                    |
| ------------ | --------------------- | ------- | ---------------------------------------------- |
| number       | string                | -       | Citation number to display                     |
| class        | string                | -       | Additional CSS classes to apply to the trigger |
| ...restProps | HoverCardTriggerProps | -       | All other HoverCardTrigger props are supported |

### InlineCitationContent

| Prop         | Type                  | Default | Description                                    |
| ------------ | --------------------- | ------- | ---------------------------------------------- |
| children     | Snippet               | -       | Citation details to display                    |
| class        | string                | -       | Additional CSS classes to apply to the content |
| ...restProps | HoverCardContentProps | -       | All other HoverCardContent props are supported |

### InlineCitationTitle

| Prop         | Type                               | Default | Description                      |
| ------------ | ---------------------------------- | ------- | -------------------------------- |
| children     | Snippet                            | -       | Title of the source              |
| class        | string                             | -       | Additional CSS classes to apply  |
| ...restProps | HTMLAttributes<HTMLHeadingElement> | -       | All other h4 props are supported |

### InlineCitationDescription

| Prop         | Type                                 | Default | Description                     |
| ------------ | ------------------------------------ | ------- | ------------------------------- |
| children     | Snippet                              | -       | Description of the source       |
| class        | string                               | -       | Additional CSS classes to apply |
| ...restProps | HTMLAttributes<HTMLParagraphElement> | -       | All other p props are supported |

### InlineCitationUrl

| Prop         | Type                              | Default | Description                          |
| ------------ | --------------------------------- | ------- | ------------------------------------ |
| url          | string                            | -       | URL of the source                    |
| class        | string                            | -       | Additional CSS classes to apply      |
| ...restProps | HTMLAttributes<HTMLAnchorElement> | -       | All other anchor props are supported |

## Features

- **Hover card interface**: Clean, non-intrusive citation display
- **Numbered citations**: Academic-style citation numbering
- **Source details**: Title, description, and URL for each citation
- **AI SDK integration**: Works seamlessly with AI-generated content
- **Customizable**: Easy to style and extend with custom classes
- **Accessible**: Proper ARIA labels and keyboard navigation

---

For more information, visit: https://svelte-ai-elements.vercel.app/components/inline-citation
