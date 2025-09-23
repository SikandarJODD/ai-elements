<script lang="ts">
	import {
		Task,
		TaskContent,
		TaskItem,
		TaskItemFile,
		TaskTrigger
	} from '$lib/components/ai-elements/task';
	import SvelteIcon from '$lib/components/ai-elements/task/SvelteIcon.svelte';

	// Using crypto.randomUUID() as requested instead of nanoid
	let tasks = [
		{ key: crypto.randomUUID(), value: 'Searching "src/routes/+page.svelte, components structure"' },
		{
			key: crypto.randomUUID(),
			value: {
				type: 'file-read',
				text: 'Read',
				fileName: '+page.svelte'
			}
		},
		{ key: crypto.randomUUID(), value: 'Scanning 47 files' },
		{ key: crypto.randomUUID(), value: 'Scanning 3 files' },
		{
			key: crypto.randomUUID(),
			value: {
				type: 'file-read',
				text: 'Reading file',
				fileName: '+layout.svelte'
			}
		}
	];
</script>

<div style="height: 200px;">
	<Task class="w-full">
		<TaskTrigger title="Found project files" />
		<TaskContent>
			{#each tasks as task (task.key)}
				<TaskItem>
					{#if typeof task.value === 'string'}
						{task.value}
					{:else if task.value.type === 'file-read'}
						<span class="inline-flex items-center gap-1">
							{task.value.text}
							<TaskItemFile>
								<SvelteIcon size={16} class="size-4" />
								<span>{task.value.fileName}</span>
							</TaskItemFile>
						</span>
					{/if}
				</TaskItem>
			{/each}
		</TaskContent>
	</Task>
</div>