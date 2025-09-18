<script lang="ts">
  import "../app.css";
  import favicon from "$lib/assets/favicon.svg";
  import { ModeWatcher } from "mode-watcher";
  let { children } = $props();
</script>

<ModeWatcher defaultMode="dark" />
<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
