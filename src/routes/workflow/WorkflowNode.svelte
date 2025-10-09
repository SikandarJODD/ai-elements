<script lang="ts">
  import {
    Node,
    NodeContent,
    NodeDescription,
    NodeFooter,
    NodeHeader,
    NodeTitle,
  } from "$lib/components/ai-elements/workflow/node";
  import type { NodeProps } from "@xyflow/svelte";

  type WorkflowNodeData = {
    label: string;
    description: string;
    handles: { target: boolean; source: boolean };
  };

  type Props = NodeProps;

  let { data, ...restProps }: Props = $props();

  // Type assertion for data since NodeProps data is unknown by default
  let workflowData = data as WorkflowNodeData;
</script>

<Node handles={workflowData.handles}>
  <NodeHeader>
    <NodeTitle>{workflowData.label}</NodeTitle>
    <NodeDescription>{workflowData.description}</NodeDescription>
  </NodeHeader>
  <NodeContent>
    <p>test</p>
  </NodeContent>
  <NodeFooter>
    <p>test</p>
  </NodeFooter>
</Node>
