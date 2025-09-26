<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import AppSidebar from "$lib/components/app-sidebar/app-sidebar.svelte";

  let { children } = $props();
</script>

<Sidebar.Provider>
  <AppSidebar />
  <main class="px-4 md:px-6 pb-6 w-full">
    <!-- <Sidebar.Trigger /> -->

    {@render children?.()}
  </main>
</Sidebar.Provider>
