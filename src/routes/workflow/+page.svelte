<script lang="ts">
  import Canvas from "$lib/components/ai-elements/workflow/canvas/Canvas.svelte";
  import { Edge } from "$lib/components/ai-elements/workflow/edge";
  import type { Edge as EdgeType, Node as NodeType } from "@xyflow/svelte";
  import WorkflowNode from "./WorkflowNode.svelte";
  import Connection from "$lib/components/ai-elements/workflow/connection/Connection.svelte";

  // Generate unique IDs using simple strings
  let nodeIds = {
    start: "node-1",
    process1: "node-2",
    process2: "node-6",
    decision: "node-3",
    output1: "node-4",
    output2: "node-5",
  };

  let nodes: NodeType[] = $state.raw([
    {
      id: nodeIds.start,
      type: "workflow",
      position: { x: 0, y: 0 },
      data: {
        label: "Start",
        description: "Initialize workflow",
        handles: { target: false, source: true },
        content: "Triggered by user action at 09:30 AM",
        footer: "Status: Ready",
      },
    },
    {
      id: nodeIds.process1,
      type: "workflow",
      position: { x: 500, y: 0 },
      data: {
        label: "Process Data",
        description: "Transform input",
        handles: { target: true, source: true },
        content: "Validating 1,234 records and applying business rules",
        footer: "Duration: ~2.5s",
      },
    },
    {
      id: nodeIds.decision,
      type: "workflow",
      position: { x: 1000, y: 0 },
      data: {
        label: "Decision Point",
        description: "Route based on conditions",
        handles: { target: true, source: true },
        content: "Evaluating: data.status === 'valid' && data.score > 0.8",
        footer: "Confidence: 94%",
      },
    },
    {
      id: nodeIds.output1,
      type: "workflow",
      position: { x: 1500, y: -300 },
      data: {
        label: "Success Path",
        description: "Handle success case",
        handles: { target: true, source: true },
        content: "1,156 records passed validation (93.7%)",
        footer: "Next: Send to production",
      },
    },
    {
      id: nodeIds.output2,
      type: "workflow",
      position: { x: 1500, y: 300 },
      data: {
        label: "Error Path",
        description: "Handle error case",
        handles: { target: true, source: true },
        content: "78 records failed validation (6.3%)",
        footer: "Next: Queue for review",
      },
    },
    {
      id: nodeIds.process2,
      type: "workflow",
      position: { x: 2000, y: 0 },
      data: {
        label: "Complete",
        description: "Finalize workflow",
        handles: { target: true, source: false },
        content: "All records processed and routed successfully",
        footer: "Total time: 4.2s",
      },
    },
  ]);

  let edges: EdgeType[] = $state.raw([
    {
      id: "1-2",
      source: nodeIds.start,
      target: nodeIds.process1,
      type: "animated",
    },
    {
      id: "2-3",
      source: nodeIds.process1,
      target: nodeIds.decision,
      type: "animated",
    },
    {
      id: "3-4",
      source: nodeIds.decision,
      target: nodeIds.output1,
      type: "animated",
    },
    {
      id: "3-5",
      source: nodeIds.decision,
      target: nodeIds.output2,
      type: "temporary",
    },
    {
      id: "4-6",
      source: nodeIds.output1,
      target: nodeIds.process2,
      type: "animated",
    },
    {
      id: "5-6",
      source: nodeIds.output2,
      target: nodeIds.process2,
      type: "temporary",
    },
  ]);

  let nodeTypes = {
    workflow: WorkflowNode,
  };

  let edgeTypes = {
    animated: Edge.Animated,
    temporary: Edge.Temporary,
  };
</script>

<div style="height: 400px; width: 100%;">
  <Canvas
    bind:nodes
    bind:edges
    {nodeTypes}
    {edgeTypes}
    connectionLineComponent={Connection}
  />
</div>
