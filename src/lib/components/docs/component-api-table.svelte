<script lang="ts">
	import { H3 } from "$lib/components/docs";
	import { cn } from "$lib/utils/utils";
	import type { ComponentAPITableProps } from "./component-api-table.types";

	let { componentName, props, class: className, id }: ComponentAPITableProps = $props();
</script>

<div class="mb-8">
	<H3 class="mb-4 text-lg font-semibold">{componentName}</H3>

	<div class={cn("border-border overflow-x-auto rounded-lg border", className)}>
		<table class="w-full text-sm">
			<thead>
				<tr class="bg-muted/50 border-border border-b">
					<th class="px-4 py-3 text-left font-semibold">Prop</th>
					<th class="px-4 py-3 text-left font-semibold">Type</th>
					<th class="px-4 py-3 text-left font-semibold">Default</th>
					<th class="px-4 py-3 text-left font-semibold">Description</th>
				</tr>
			</thead>
			<tbody class="bg-card">
				{#each props as prop, index}
					<tr class={index < props.length - 1 ? "border-border border-b" : ""}>
						<td class="px-4 py-3">
							<code class="bg-muted rounded px-1.5 py-0.5 text-xs">{prop.name}</code>
						</td>
						<td class="px-4 py-3">
							<code class="bg-muted rounded px-1.5 py-0.5 text-xs">{prop.type}</code>
						</td>
						<td class="px-4 py-3">
							{#if prop.default}
								<code class="bg-muted rounded px-1.5 py-0.5 text-xs"
									>{prop.default}</code
								>
							{:else}
								-
							{/if}
						</td>
						<td class="px-4 py-3">{prop.description}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
