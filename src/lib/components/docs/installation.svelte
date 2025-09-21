<script lang="ts">
  import AiInstallCommand from "./ai-install-command.svelte";
  import { Subheading } from "$lib/components/docs";

  type Props = {
    specifier: string;
  };

  let { specifier }: Props = $props();
</script>

<Subheading>Installation</Subheading>
<!-- pnpm dlx shadcn-svelte@latest add http://localhost:5173/r/hello-world.json -->

<AiInstallCommand
  command="execute"
  args={["shadcn-svelte@latest", "add", specifier]}
/>
