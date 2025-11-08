<script lang="ts">
	import {
		Queue,
		QueueSection,
		QueueSectionTrigger,
		QueueSectionLabel,
		QueueSectionContent,
		QueueList,
		QueueItem,
		QueueItemIndicator,
		QueueItemContent,
		QueueItemDescription,
		QueueItemActions,
		QueueItemAction,
		QueueItemAttachment,
		QueueItemImage,
		QueueItemFile,
	} from "$lib/components/ai-elements/queue/index.js";
	import Trash2 from "@lucide/svelte/icons/trash-2";
	import Edit from "@lucide/svelte/icons/edit";

	const pendingTasks = [
		{
			id: "1",
			title: "Implement user authentication",
			description: "Add OAuth2 support with Google and GitHub providers",
		},
		{
			id: "2",
			title: "Design landing page",
			description: "Create wireframes and mockups for the homepage",
		},
		{
			id: "3",
			title: "Set up CI/CD pipeline",
			description: "Configure GitHub Actions for automated testing and deployment",
		},
	];

	const completedTasks = [
		{
			id: "4",
			title: "Initialize project repository",
			description: "Set up Git repository with initial project structure",
		},
		{
			id: "5",
			title: "Configure development environment",
			description: "Install dependencies and set up local development tools",
		},
	];

	const messagesWithAttachments = [
		{
			id: "6",
			content: "Review these design mockups",
			attachments: [
				{ type: "image", url: "https://picsum.photos/seed/design1/200/200" },
				{ type: "image", url: "https://picsum.photos/seed/design2/200/200" },
			],
		},
		{
			id: "7",
			content: "Project documentation",
			attachments: [
				{ type: "file", filename: "requirements.pdf" },
				{ type: "file", filename: "architecture.pdf" },
			],
		},
	];

	function handleEdit(id: string) {
		console.log("Edit task:", id);
	}

	function handleDelete(id: string) {
		console.log("Delete task:", id);
	}
</script>

<div class="flex w-full max-w-md items-center justify-center p-8">
	<Queue>
		<!-- Pending Tasks Section -->
		<QueueSection>
			<QueueSectionTrigger>
				<QueueSectionLabel count={pendingTasks.length} label=" Pending Tasks" />
			</QueueSectionTrigger>
			<QueueSectionContent>
				<QueueList>
					{#each pendingTasks as task (task.id)}
						<QueueItem>
							<div class="flex items-center gap-2">
								<QueueItemIndicator />
								<QueueItemContent>{task.title}</QueueItemContent>
								<QueueItemActions>
									<QueueItemAction onclick={() => handleEdit(task.id)}>
										<Edit size={12} />
									</QueueItemAction>
									<QueueItemAction onclick={() => handleDelete(task.id)}>
										<Trash2 size={12} />
									</QueueItemAction>
								</QueueItemActions>
							</div>
							{#if task.description}
								<QueueItemDescription>{task.description}</QueueItemDescription>
							{/if}
						</QueueItem>
					{/each}
				</QueueList>
			</QueueSectionContent>
		</QueueSection>

		<!-- Completed Tasks Section -->
		<QueueSection>
			<QueueSectionTrigger>
				<QueueSectionLabel count={completedTasks.length} label=" Completed Tasks" />
			</QueueSectionTrigger>
			<QueueSectionContent>
				<QueueList>
					{#each completedTasks as task (task.id)}
						<QueueItem>
							<div class="flex items-center gap-2">
								<QueueItemIndicator completed />
								<QueueItemContent completed>{task.title}</QueueItemContent>
							</div>
							{#if task.description}
								<QueueItemDescription completed
									>{task.description}</QueueItemDescription
								>
							{/if}
						</QueueItem>
					{/each}
				</QueueList>
			</QueueSectionContent>
		</QueueSection>

		<!-- Messages with Attachments Section -->
		<QueueSection>
			<QueueSectionTrigger>
				<QueueSectionLabel count={messagesWithAttachments.length} label=" Messages" />
			</QueueSectionTrigger>
			<QueueSectionContent>
				<QueueList>
					{#each messagesWithAttachments as message (message.id)}
						<QueueItem>
							<div class="flex items-center gap-2">
								<QueueItemIndicator />
								<QueueItemContent>{message.content}</QueueItemContent>
							</div>
							{#if message.attachments && message.attachments.length > 0}
								<QueueItemAttachment>
									{#each message.attachments as attachment}
										{#if attachment.type === "image" && "url" in attachment}
											<QueueItemImage src={attachment.url} alt="Attachment" />
										{:else if attachment.type === "file" && "filename" in attachment}
											<QueueItemFile>{attachment.filename}</QueueItemFile>
										{/if}
									{/each}
								</QueueItemAttachment>
							{/if}
						</QueueItem>
					{/each}
				</QueueList>
			</QueueSectionContent>
		</QueueSection>
	</Queue>
</div>
