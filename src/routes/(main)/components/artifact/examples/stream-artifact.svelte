<script lang="ts">
	import DownloadIcon from "@lucide/svelte/icons/download";
	import CopyIcon from "@lucide/svelte/icons/copy";
	import * as Artifact from "$lib/components/ai-elements/artifact/index.js";
	import * as Code from "$lib/components/ai-elements/code/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { Textarea } from "$lib/components/ui/textarea/index.js";
	import { Experimental_StructuredObject as useObject } from "@ai-sdk/svelte";
	import { codeSchema } from "$lib/schema/code-schema";

	let obj = new useObject({
		api: "/api/stream-artifact",
		schema: codeSchema,
	});

	let value = $state("Create 2 code snippets in different languages that do the same thing");
	let handleCopyCode = (code: string) => {
		navigator.clipboard.writeText(code);
	};
	let handleDownloadClick = (code: string) => {
		// Implement download logic here, e.g., create a blob and trigger download
		console.log("Download code:", code);
	};

	let handleSubmit = () => {
		obj.submit(value);
		value = "";
	};
</script>

<div class="flex w-full max-w-3xl flex-col gap-4">
	<div class="flex flex-col gap-2">
		<Textarea
			bind:value
			class="min-h-24 resize-none"
			placeholder="Ask for a structured code artifact"
		/>

		<div class="flex justify-end gap-2">
			{#if obj.loading}
				<Button onclick={() => obj.stop()} size="sm" variant="destructive">Stop</Button>
			{/if}
			<Button onclick={handleSubmit} disabled={!value.trim() || obj.loading} size="sm">
				{#if obj.loading}
					Generating...
				{:else}
					Generate
				{/if}
			</Button>
		</div>
	</div>

	<div class="space-y-2">
		<h3 class="text-xl font-semibold">Stream Artifact Example</h3>
		<div class="space-y-4">
			{#each obj.object?.code as item}
				<Artifact.Root class="w-full">
					<Artifact.Header>
						<div>
							<Artifact.Title>{item?.title}</Artifact.Title>
							{#if item?.description}
								<Artifact.Description>
									{item?.description}
								</Artifact.Description>
							{/if}
						</div>
						<Artifact.Actions>
							<Artifact.Action
								icon={CopyIcon}
								label="Copy"
								onclick={() => handleCopyCode(item?.content || "")}
								tooltip="Copy code to clipboard"
							/>
							<Artifact.Action
								icon={DownloadIcon}
								label="Download"
								onclick={() => handleDownloadClick(item?.content || "")}
								tooltip="Download file"
							/>
						</Artifact.Actions>
					</Artifact.Header>
					<Artifact.Content class="p-0">
						{#if item?.content}
							<Code.Root
								class="border-none"
								code={item?.content}
								lang={item?.language}
								hideLines={false}
							>
								<Code.CopyButton />
							</Code.Root>
						{/if}
					</Artifact.Content>
				</Artifact.Root>
			{:else}
				<p class="text-muted-foreground">
					No code generated yet. Enter a prompt and click "Generate" to see the streaming
					artifact in action.
				</p>
			{/each}
		</div>
	</div>
</div>
