import Basic from "./basic.svelte";
import basicRaw from "./basic.svelte?raw";

import WithAttachments from "./with-attachments.svelte";
import withAttachmentsRaw from "./with-attachments.svelte?raw";

import WithBranching from "./with-branching.svelte";
import withBranchingRaw from "./with-branching.svelte?raw";

import WithActions from "./with-actions.svelte";
import withActionsRaw from "./with-actions.svelte?raw";

const examples = {
	basic: {
		code: basicRaw,
		Component: Basic,
		title: "Basic Usage",
		description: "Simple user and assistant messages with markdown content.",
	},
	withAttachments: {
		code: withAttachmentsRaw,
		Component: WithAttachments,
		title: "With Attachments",
		description: "Messages with file attachments like images and documents.",
	},
	withBranching: {
		code: withBranchingRaw,
		Component: WithBranching,
		title: "With Branching",
		description: "Navigate between multiple AI response versions using branch selector.",
	},
	withActions: {
		code: withActionsRaw,
		Component: WithActions,
		title: "With Actions",
		description: "Action buttons for copy, regenerate, like, and dislike.",
	},
};

export { examples };

