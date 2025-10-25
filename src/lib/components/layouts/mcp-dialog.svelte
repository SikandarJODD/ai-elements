<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import * as Code from "$lib/components/ai-elements/code/index.js";
  import { cn } from "$lib/utils/utils";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import CodeSpan from "$lib/components/docs/code-span.svelte";
  import * as Icons from "$lib/components/icons";
</script>

<Dialog.Root>
  <!-- I just want to gauge interest here -->
  <Dialog.Trigger
    class={cn(buttonVariants({ variant: "secondary" }), "font-normal")}
    data-umami-event="MCP button"
  >
    <Icons.MCP class="size-4" /> MCP
  </Dialog.Trigger>
  <Dialog.Content class="sm:max-w-2xl ">
    <Dialog.Title>Setup MCP</Dialog.Title>
    <Dialog.Description
      >Use the code below to setup MCP in your project.</Dialog.Description
    >
    <Tabs.Root value="cursor">
      <Tabs.List>
        <Tabs.Trigger value="cursor">Cursor</Tabs.Trigger>
        <Tabs.Trigger value="windsurf">Windsurf</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="cursor">
        Add the following code to your <CodeSpan>.cursor/mcp.json</CodeSpan> file.
      </Tabs.Content>
      <Tabs.Content value="windsurf">
        Add the following code to your <CodeSpan
          >.codeium/windsurf/mcp_config.json</CodeSpan
        > file.
      </Tabs.Content>
    </Tabs.Root>
    <div>
      <Code.Root
        lang="json"
        code={`{
  "mcpServers": {
    "jsrepo": {
      "command": "npx",
      "args": ["jsrepo", "mcp"]
    }
  }
}`}
      >
        <Code.CopyButton />
      </Code.Root>
    </div>
  </Dialog.Content>
</Dialog.Root>
