<script lang="ts">
  import "../app.css";
  import favicon from "$lib/assets/favicon.svg";
  import { ModeWatcher } from "mode-watcher";
  import AppNavbar from "$lib/components/layouts/app-navbar.svelte";
  let { children } = $props();
</script>

<AppNavbar />
<ModeWatcher />
<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>
{@render children?.()}
