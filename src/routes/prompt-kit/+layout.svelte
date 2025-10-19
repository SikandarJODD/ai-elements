<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import PromptKitSidebar from "$lib/components/ui/sidebar/prompt-kit-sidebar.svelte";

  let { children } = $props();
</script>

<Sidebar.Provider>
  <PromptKitSidebar />
  <main class="px-4 md:px-6 pb-6 w-full">
    {@render children?.()}
  </main>
</Sidebar.Provider>
