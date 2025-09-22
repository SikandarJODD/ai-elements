<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import AppSidebar from "$lib/components/app-sidebar/app-sidebar.svelte";

  let { children } = $props();
  import * as Toc from "$lib/components/docs/toc";
  import { UseToc } from "$lib/hooks/use-toc.svelte";
  const toc = new UseToc();
</script>

<Sidebar.Provider>
  <AppSidebar />
  <main class="px-4 md:px-6 pb-6 w-full">
    <!-- <Sidebar.Trigger /> -->
    {@render children?.()}
  </main>
</Sidebar.Provider>
