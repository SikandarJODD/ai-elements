<script lang="ts">
  interface Props {
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
    fromPosition?: string;
    toPosition?: string;
    connectionStatus?: string | null;
  }

  let { fromX, fromY, toX, toY }: Props = $props();

  const HALF = 0.5;

  let pathD = $derived(
    `M${fromX},${fromY} C ${fromX + (toX - fromX) * HALF},${fromY} ${fromX + (toX - fromX) * HALF},${toY} ${toX},${toY}`
  );
</script>

<g>
  <path
    class="animated"
    d={pathD}
    fill="none"
    stroke="var(--color-ring)"
    stroke-width={1}
  />
  <circle
    cx={toX}
    cy={toY}
    fill="#fff"
    r={3}
    stroke="var(--color-ring)"
    stroke-width={1}
  />
</g>
