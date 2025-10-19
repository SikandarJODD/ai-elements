<script lang="ts">
	import { H3 } from '$lib/components/docs';
  import { cn } from "$lib/utils/utils";
  import type { ComponentAPITableProps } from "./component-api-table.types";

  let { componentName, props, class: className, id }: ComponentAPITableProps = $props();
</script>

<div class="mb-8">
  <H3 class="text-lg font-semibold mb-4">{componentName}</H3>

  <div class={cn("overflow-x-auto rounded-lg border border-border", className)}>
    <table class="w-full text-sm">
      <thead>
        <tr class="bg-muted/50 border-b border-border">
          <th class="text-left py-3 px-4 font-semibold">Prop</th>
          <th class="text-left py-3 px-4 font-semibold">Type</th>
          <th class="text-left py-3 px-4 font-semibold">Default</th>
          <th class="text-left py-3 px-4 font-semibold">Description</th>
        </tr>
      </thead>
      <tbody class="bg-card">
        {#each props as prop, index}
          <tr class={index < props.length - 1 ? "border-b border-border" : ""}>
            <td class="py-3 px-4">
              <code class="text-xs bg-muted px-1.5 py-0.5 rounded">{prop.name}</code>
            </td>
            <td class="py-3 px-4">
              <code class="text-xs bg-muted px-1.5 py-0.5 rounded">{prop.type}</code>
            </td>
            <td class="py-3 px-4">
              {#if prop.default}
                <code class="text-xs bg-muted px-1.5 py-0.5 rounded">{prop.default}</code>
              {:else}
                -
              {/if}
            </td>
            <td class="py-3 px-4">{prop.description}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
