<script lang="ts">
	import * as Queue from "$lib/components/ai-elements/queue/index.js";
	import type { QueueMessage, QueueTodo } from "$lib/components/ai-elements/queue/index.js";

	import ArrowUp from "@lucide/svelte/icons/arrow-up";
	import Trash2 from "@lucide/svelte/icons/trash-2";

	const sampleMessages: QueueMessage[] = [
		{
			id: "msg-1",
			parts: [{ type: "text", text: "How do I set up the project?" }],
		},
		{
			id: "msg-2",
			parts: [{ type: "text", text: "What is the roadmap for Q4?" }],
		},
		{
			id: "msg-3",
			parts: [
				{ type: "text", text: "Update the default logo to this png." },
				{
					type: "file",
					url: "https://github.com/haydenbleasel.png",
					filename: "setup-guide.png",
					mediaType: "image/png",
				},
			],
		},
		{
			id: "msg-4",
			parts: [{ type: "text", text: "Please generate a changelog." }],
		},
		{
			id: "msg-5",
			parts: [{ type: "text", text: "Add dark mode support." }],
		},
		{
			id: "msg-6",
			parts: [{ type: "text", text: "Optimize database queries." }],
		},
		{
			id: "msg-7",
			parts: [{ type: "text", text: "Set up CI/CD pipeline." }],
		},
	];

	const sampleTodos: QueueTodo[] = [
		{
			id: "todo-1",
			title: "Write project documentation",
			description: "Complete the README and API docs",
			status: "completed",
		},
		{
			id: "todo-2",
			title: "Implement authentication",
			status: "pending",
		},
		{
			id: "todo-3",
			title: "Fix bug #42",
			description: "Resolve crash on settings page",
			status: "pending",
		},
		{
			id: "todo-4",
			title: "Refactor queue logic",
			description: "Unify queue and todo state management",
			status: "pending",
		},
		{
			id: "todo-5",
			title: "Add unit tests",
			description: "Increase test coverage for hooks",
			status: "pending",
		},
	];

	let messages = $state(sampleMessages);
	let todos = $state(sampleTodos);

	const handleRemoveMessage = (id: string) => {
		messages = messages.filter((msg) => msg.id !== id);
	};

	const handleRemoveTodo = (id: string) => {
		todos = todos.filter((todo) => todo.id !== id);
	};

	const handleSendNow = (id: string) => {
		console.log("Send now:", id);
		handleRemoveMessage(id);
	};
</script>

{#if messages.length > 0 || todos.length > 0}
	<div class="w-full max-w-2xl">
		<Queue.Root>
			{#if messages.length > 0}
				<Queue.Section>
					<Queue.SectionTrigger>
						<Queue.SectionLabel count={messages.length} label="Queued" />
					</Queue.SectionTrigger>
					<Queue.SectionContent>
						<Queue.List>
							{#each messages as message (message.id)}
								{@const summary = (() => {
									const textParts = message.parts.filter(
										(p) => p.type === "text"
									);
									const text = textParts
										.map((p) => (p.type === "text" ? p.text : ""))
										.join(" ")
										.trim();
									return text || "(queued message)";
								})()}
								{@const hasFiles = message.parts.some(
									(p) => p.type === "file" && p.url
								)}

								<Queue.Item>
									<div class="flex items-center gap-2">
										<Queue.ItemIndicator />
										<Queue.ItemContent>{summary}</Queue.ItemContent>
										<Queue.ItemActions>
											<Queue.ItemAction
												aria-label="Remove from queue"
												onclick={(e) => {
													e.preventDefault();
													e.stopPropagation();
													handleRemoveMessage(message.id);
												}}
												title="Remove from queue"
											>
												<Trash2 size={12} />
											</Queue.ItemAction>
											<Queue.ItemAction
												aria-label="Send now"
												onclick={(e) => {
													e.preventDefault();
													e.stopPropagation();
													handleSendNow(message.id);
												}}
											>
												<ArrowUp size={14} />
											</Queue.ItemAction>
										</Queue.ItemActions>
									</div>
									{#if hasFiles}
										<Queue.ItemAttachment>
											{#each message.parts.filter((p) => p.type === "file" && p.url) as file (file.url)}
												{#if file.mediaType?.startsWith("image/") && file.url}
													<Queue.ItemImage
														alt={file.filename || "attachment"}
														src={file.url}
													/>
												{:else}
													<Queue.ItemFile
														>{file.filename || "file"}</Queue.ItemFile
													>
												{/if}
											{/each}
										</Queue.ItemAttachment>
									{/if}
								</Queue.Item>
							{/each}
						</Queue.List>
					</Queue.SectionContent>
				</Queue.Section>
			{/if}
			{#if todos.length > 0}
				<Queue.Section>
					<Queue.SectionTrigger>
						<Queue.SectionLabel count={todos.length} label="Todo" />
					</Queue.SectionTrigger>
					<Queue.SectionContent>
						<Queue.List>
							{#each todos as todo (todo.id)}
								{@const isCompleted = todo.status === "completed"}
								<Queue.Item>
									<div class="flex items-center gap-2">
										<Queue.ItemIndicator completed={isCompleted} />
										<Queue.ItemContent completed={isCompleted}>
											{todo.title}
										</Queue.ItemContent>
										<Queue.ItemActions>
											<Queue.ItemAction>
												aria-label="Remove todo" onclick={() =>
													handleRemoveTodo(todo.id)}
												>
												<Trash2 size={12} />
											</Queue.ItemAction>
										</Queue.ItemActions>
									</div>
									{#if todo.description}
										<Queue.ItemDescription completed={isCompleted}>
											{todo.description}
										</Queue.ItemDescription>
									{/if}
								</Queue.Item>
							{/each}
						</Queue.List>
					</Queue.SectionContent>
				</Queue.Section>
			{/if}
		</Queue.Root>
	</div>
{/if}
