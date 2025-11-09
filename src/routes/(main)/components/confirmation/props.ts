// Component API Props Data
const confirmationProps = [
	{
		name: "approval",
		type: "ToolUIPartApproval",
		description: "Approval object containing id, approved status, and optional reason",
	},
	{
		name: "state",
		type: "ToolUIPartState",
		description:
			"Current state: 'approval-requested' | 'approval-responded' | 'output-denied' | 'output-available'",
	},
	{
		name: "class",
		type: "string",
		description: "Additional CSS classes to apply to the alert container",
	},
	{
		name: "children",
		type: "Snippet",
		description: "Child components (ConfirmationTitle, ConfirmationRequest, etc.)",
	},
	{
		name: "...restProps",
		type: "HTMLAttributes<HTMLDivElement>",
		description: "All other div props are supported",
	},
];

const confirmationTitleProps = [
	{
		name: "class",
		type: "string",
		description: "Additional CSS classes to apply to the title",
	},
	{
		name: "children",
		type: "Snippet",
		description: "Title content",
	},
];

const confirmationRequestProps = [
	{
		name: "children",
		type: "Snippet",
		description: "Content to show when approval is requested (typically ConfirmationActions)",
	},
];

const confirmationAcceptedProps = [
	{
		name: "children",
		type: "Snippet",
		description: "Content to show when action is approved",
	},
];

const confirmationRejectedProps = [
	{
		name: "children",
		type: "Snippet",
		description: "Content to show when action is rejected",
	},
];

const confirmationActionsProps = [
	{
		name: "class",
		type: "string",
		description: "Additional CSS classes to apply to the actions container",
	},
	{
		name: "children",
		type: "Snippet",
		description: "Action buttons (ConfirmationAction components)",
	},
];

const confirmationActionProps = [
	{
		name: "variant",
		type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'",
		default: "'default'",
		description: "Button variant style",
	},
	{
		name: "size",
		type: "'default' | 'sm' | 'lg' | 'icon'",
		default: "'sm'",
		description: "Button size",
	},
	{
		name: "class",
		type: "string",
		description: "Additional CSS classes to apply to the button",
	},
	{
		name: "children",
		type: "Snippet",
		description: "Button content",
	},
	{
		name: "onclick",
		type: "(e: MouseEvent) => void",
		description: "Click handler function",
	},
	{
		name: "...restProps",
		type: "HTMLButtonAttributes",
		description: "All other button props are supported",
	},
];

export {
	confirmationProps,
	confirmationTitleProps,
	confirmationRequestProps,
	confirmationAcceptedProps,
	confirmationRejectedProps,
	confirmationActionsProps,
	confirmationActionProps,
};
