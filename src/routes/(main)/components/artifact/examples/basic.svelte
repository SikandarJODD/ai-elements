<script lang="ts">
  import {
    Artifact,
    ArtifactAction,
    ArtifactActions,
    ArtifactContent,
    ArtifactDescription,
    ArtifactHeader,
    ArtifactTitle,
  } from "$lib/components/ai-elements/artifact/index";
  import * as Code from "$lib/components/ai-elements/code/index";
  import {
    CopyIcon,
    DownloadIcon,
    PlayIcon,
    RefreshCwIcon,
    ShareIcon,
  } from "@lucide/svelte";

  let code = `# Dijkstra's Algorithm implementation
import heapq

def dijkstra(graph, start):
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    heap = [(0, start)]
    visited = set()

    while heap:
        current_distance, current_node = heapq.heappop(heap)
        if current_node in visited:
            continue
        visited.add(current_node)

        for neighbor, weight in graph[current_node].items():
            distance = current_distance + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(heap, (distance, neighbor))

    return distances

# Example graph
graph = {
    'A': {'B': 1, 'C': 4},
    'B': {'A': 1, 'C': 2, 'D': 5},
    'C': {'A': 4, 'B': 2, 'D': 1},
    'D': {'B': 5, 'C': 1}
}

print(dijkstra(graph, 'A'))`;

  let handleRunClick = () => {
    console.log("Run");
  };

  let handleCopyClick = () => {
    console.log("Copy");
  };

  let handleRegenerateClick = () => {
    console.log("Regenerate");
  };

  let handleDownloadClick = () => {
    console.log("Download");
  };

  let handleShareClick = () => {
    console.log("Share");
  };
</script>

<Artifact>
  <ArtifactHeader>
    <div>
      <ArtifactTitle>Dijkstra's Algorithm Implementation</ArtifactTitle>
      <ArtifactDescription>Updated 1 minute ago</ArtifactDescription>
    </div>
    <div class="flex items-center gap-2">
      <ArtifactActions>
        <ArtifactAction
          icon={PlayIcon}
          label="Run"
          onclick={handleRunClick}
          tooltip="Run code"
        />
        <ArtifactAction
          icon={CopyIcon}
          label="Copy"
          onclick={handleCopyClick}
          tooltip="Copy to clipboard"
        />
        <ArtifactAction
          icon={RefreshCwIcon}
          label="Regenerate"
          onclick={handleRegenerateClick}
          tooltip="Regenerate content"
        />
        <ArtifactAction
          icon={DownloadIcon}
          label="Download"
          onclick={handleDownloadClick}
          tooltip="Download file"
        />
        <ArtifactAction
          icon={ShareIcon}
          label="Share"
          onclick={handleShareClick}
          tooltip="Share artifact"
        />
      </ArtifactActions>
    </div>
  </ArtifactHeader>
  <ArtifactContent class="p-0">
    <Code.Root
      class="border-none"
      {code}
      lang="python"
      hideLines={false}
    >
      <Code.CopyButton />
    </Code.Root>
  </ArtifactContent>
</Artifact>