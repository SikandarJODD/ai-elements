<script lang="ts">
  import {
    Node,
    NodeContent
  } from "$lib/components/ai-elements/workflow/node";
  import { Toolbar } from "$lib/components/ai-elements/workflow/toolbar";
  import { Button } from "$lib/components/ui/button";
</script>

<div class="flex justify-center items-center p-8 min-h-[300px]">
  <div class="relative">
    <Node handles={{ target: false, source: false }}>
      <NodeContent>
        <p class="text-sm">Node with Toolbar</p>
      </NodeContent>
      <Toolbar>
        <Button size="sm" variant="ghost">Edit</Button>
        <Button size="sm" variant="ghost">Delete</Button>
      </Toolbar>
    </Node>
  </div>
</div>
