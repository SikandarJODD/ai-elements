<script lang="ts" module>
	import type { PropDef, PropsTable } from "$lib/types/structure";

	export type CompactPropsTableProps = {
		data: PropsTable | PropDef[];
		class?: string;
	};
</script>

<script lang="ts">
	import { H3 } from "$lib/components/docs/markdown";
	import { cn } from "$lib/utils";

	let { data, class: className }: CompactPropsTableProps = $props();

	const isPropsTable = (
		value: PropsTable | PropDef[]
	): value is PropsTable => {
		return "props" in value;
	};

	let tableData = $derived(isPropsTable(data) ? data.props : data);
</script>

{#if isPropsTable(data)}
	<div class="mb-3 space-y-2">
		{#if data.name}
			<H3 id={data.name} class="mt-0 text-lg font-semibold">
				{data.name}
			</H3>
		{/if}
		{#if data.desc}
			<p
				class="m-0 max-w-3xl text-sm leading-relaxed text-muted-foreground"
			>
				{data.desc}
			</p>
		{/if}
	</div>
{/if}

<div class={cn("overflow-hidden rounded-lg border border-border", className)}>
	<div class="overflow-x-auto">
		<table
			class="w-full table-fixed text-left text-xs sm:text-sm"
		>
			<colgroup>
				<col class="w-[20%]" />
				<col class="w-[24%]" />
				<col class="w-[20%]" />
				<col class="w-[32%]" />
			</colgroup>
			<thead class="border-b bg-muted/40 text-muted-foreground">
				<tr>
					<th class="px-3 py-2 font-medium">Prop</th>
					<th class="px-3 py-2 font-medium">Type</th>
					<th class="px-3 py-2 font-medium">Default</th>
					<th class="py-2 pl-2 font-medium">Description</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-border">
				{#each tableData as row (row.name ?? row.type)}
					<tr class="align-top">
						<td class="px-3 py-3">
							<code
								class="inline-block max-w-full rounded-md bg-muted/70 px-1.5 py-0.5 font-mono leading-5 wrap-anywhere whitespace-pre-wrap text-foreground"
							>
								{row.name}
							</code>
						</td>
						<td class="px-3 py-3">
							<code
								class="inline-block max-w-full rounded-md bg-muted/50 px-1.5 py-0.5 font-mono text-xs leading-5 wrap-anywhere whitespace-pre-wrap text-muted-foreground"
							>
								{row.type}
							</code>
						</td>
						<td class="px-3 py-3">
							<code
								class="inline-block max-w-full rounded-md bg-muted/50 px-1.5 py-0.5 font-mono text-xs leading-5 [overflow-wrap:anywhere] break-words whitespace-pre-wrap text-muted-foreground"
							>
								{row.required
									? "required"
									: (row.default ?? "-")}
							</code>
						</td>
						<td
							class="py-3 pr-3 pl-2 leading-5 [overflow-wrap:anywhere] break-words text-muted-foreground"
						>
							{row.description ?? "-"}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
