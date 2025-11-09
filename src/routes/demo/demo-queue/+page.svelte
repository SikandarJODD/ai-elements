<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";
	import {
		Queue,
		QueueItem,
		QueueItemIndicator,
		QueueItemContent,
		QueueItemDescription,
		QueueItemActions,
		QueueItemAction,
		QueueItemAttachment,
		QueueItemImage,
		QueueItemFile,
		QueueList,
		QueueSection,
		QueueSectionTrigger,
		QueueSectionLabel,
		QueueSectionContent,
		type QueueMessage,
		type QueueTodo,
	} from "$lib/components/ai-elements/queue/index.js";
	import ArrowUpIcon from "@lucide/svelte/icons/arrow-up";
	import Trash2Icon from "@lucide/svelte/icons/trash-2";

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

<MetaTags
	title="Queue Component Demo | Svelte AI Elements"
	description="Interactive demo showcasing the Queue component matching the React AI Elements example."
	openGraph={{
		title: "Queue Component Demo | Svelte AI Elements",
		description:
			"Interactive demo showcasing the Queue component matching the React AI Elements example.",
		type: "website",
		url: "https://svelte-ai-elements.vercel.app/demo-queue",
	}}
/>

<div class="container mx-auto max-w-4xl space-y-8 py-8">
	<!-- Header -->
	<div class="space-y-4">
		<h1 class="text-4xl font-bold">Queue Component Demo</h1>
		<p class="text-muted-foreground text-lg">
			This demo matches the official React AI Elements Queue example.
		</p>
	</div>

	<!-- Queue Example -->
	{#if messages.length === 0 && todos.length === 0}
		<p class="text-muted-foreground">All items cleared!</p>
	{:else}
		<Queue>
			{#if messages.length > 0}
				<QueueSection>
					<QueueSectionTrigger>
						<QueueSectionLabel count={messages.length} label="Queued" />
					</QueueSectionTrigger>
					<QueueSectionContent>
						<QueueList>
							{#each messages as message (message.id)}
								{@const summary = (() => {
									const textParts = message.parts.filter(
										(p) => p.type === "text"
									);
									const text = textParts
										.map((p) => p.text)
										.join(" ")
										.trim();
									return text || "(queued message)";
								})()}
								{@const hasFiles = message.parts.some(
									(p) => p.type === "file" && p.url
								)}
								<QueueItem>
									<div class="flex items-center gap-2">
										<QueueItemIndicator />
										<QueueItemContent>{summary}</QueueItemContent>
										<QueueItemActions>
											<QueueItemAction
												aria-label="Remove from queue"
												onclick={(e) => {
													e.preventDefault();
													e.stopPropagation();
													handleRemoveMessage(message.id);
												}}
												title="Remove from queue"
											>
												<Trash2Icon size={12} />
											</QueueItemAction>
											<QueueItemAction
												aria-label="Send now"
												onclick={(e) => {
													e.preventDefault();
													e.stopPropagation();
													handleSendNow(message.id);
												}}
											>
												<ArrowUpIcon size={14} />
											</QueueItemAction>
										</QueueItemActions>
									</div>
									{#if hasFiles}
										<QueueItemAttachment>
											{#each message.parts.filter((p) => p.type === "file" && p.url) as file (file.url)}
												{#if file.mediaType?.startsWith("image/") && file.url}
													<QueueItemImage
														alt={file.filename || "attachment"}
														src={file.url}
													/>
												{:else}
													<QueueItemFile
														>{file.filename || "file"}</QueueItemFile
													>
												{/if}
											{/each}
										</QueueItemAttachment>
									{/if}
								</QueueItem>
							{/each}
						</QueueList>
					</QueueSectionContent>
				</QueueSection>
			{/if}
			{#if todos.length > 0}
				<QueueSection>
					<QueueSectionTrigger>
						<QueueSectionLabel count={todos.length} label="Todo" />
					</QueueSectionTrigger>
					<QueueSectionContent>
						<QueueList>
							{#each todos as todo (todo.id)}
								{@const isCompleted = todo.status === "completed"}
								<QueueItem>
									<div class="flex items-center gap-2">
										<QueueItemIndicator completed={isCompleted} />
										<QueueItemContent completed={isCompleted}>
											{todo.title}
										</QueueItemContent>
										<QueueItemActions>
											<QueueItemAction
												aria-label="Remove todo"
												onclick={() => handleRemoveTodo(todo.id)}
											>
												<Trash2Icon size={12} />
											</QueueItemAction>
										</QueueItemActions>
									</div>
									{#if todo.description}
										<QueueItemDescription completed={isCompleted}>
											{todo.description}
										</QueueItemDescription>
									{/if}
								</QueueItem>
							{/each}
						</QueueList>
					</QueueSectionContent>
				</QueueSection>
			{/if}
		</Queue>
	{/if}

	<!-- Documentation Link -->
	<section class="border-border bg-muted/50 rounded-lg border p-6">
		<h3 class="mb-2 text-lg font-semibold">Want to learn more?</h3>
		<p class="text-muted-foreground mb-4">
			Check out the full documentation for the Queue component including API reference, usage
			examples, and integration guides.
		</p>
		<a
			href="/components/queue"
			class="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
		>
			View Documentation
		</a>
	</section>
</div>
