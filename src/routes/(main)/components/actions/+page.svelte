<script lang="ts">
  import { MetaTags } from "svelte-meta-tags";
  import { Subheading } from "$lib/components/docs";
  // import Installation from '$lib/components/installation.svelte';
  import Playground from "$lib/components/docs/playground.svelte";
  import Code from "$lib/components/docs/code.svelte";
  import { examples } from "./examples";
  import { seo } from "./seo";
  import Heading from "$lib/components/docs/heading.svelte";
  import CodeSpan from "$lib/components/docs/code-span.svelte";
</script>

<MetaTags {...seo} />
<Heading>Actions</Heading>
<p class="my-2 !text-muted-foreground text-lg">
  The <CodeSpan>Action</CodeSpan> component provides a flexible row of action buttons
  for AI responses with common actions like retry, like, dislike, copy, and share.
</p>
<Playground code={examples.basic.code} highlight={[2, [103, 114]]}>
  <examples.basic.Component />
</Playground>
<!-- <Installation specifier="ui/avatar-group" /> -->
<Subheading>Usage</Subheading>
<div>
  <Code
    lang="svelte"
    code={`\<script lang="ts"\>
	 import { Actions, Action } from "$lib/components/ai-elements/action/index";
\<\/script\>

<Actions class="mt-2">
  <Action label="Like" tooltip="Like">
    <ThumbsUpIcon class="size-4" />
  </Action>
</Actions>`}
  />
</div>
