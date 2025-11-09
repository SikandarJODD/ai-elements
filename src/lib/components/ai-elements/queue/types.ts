export type QueueMessagePart = {
	type: string;
	text?: string;
	url?: string;
	filename?: string;
	mediaType?: string;
};

export type QueueMessage = {
	id: string;
	parts: QueueMessagePart[];
};

export type QueueTodo = {
	id: string;
	title: string;
	description?: string;
	status?: "pending" | "completed";
};
