<script lang="ts">
  import { useConnection } from "@xyflow/svelte";

  let connection = useConnection();
  const HALF = 0.5;


  let pathD: string | null = $derived.by(() => {
    if (connection.current.inProgress) {
      const { from, to } = connection.current;
      return `M${from.x},${from.y} C ${from.x + (to.x - from.x) * HALF},${from.y} ${from.x + (to.x - from.x) * HALF},${to.y} ${to.x},${to.y}`;
    }
    return null;
  });
</script>

{#if connection.current.inProgress}
  <g>
    <path
      class="animated"
      d={pathD}
      fill="none"
      stroke="var(--color-ring)"
      stroke-width={1}
    />
    <circle
      cx={connection.current.to.x}
      cy={connection.current.to.y}
      fill="#fff"
      r={3}
      stroke="var(--color-ring)"
      stroke-width={1}
    />
  </g>
{/if}
