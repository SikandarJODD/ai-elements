import Basic from "./examples/basic.svelte";
import basicRaw from "./examples/basic.svelte?raw";
import ApprovalRequest from "./examples/approval-request.svelte";
import approvalRequestRaw from "./examples/approval-request.svelte?raw";
import Approved from "./examples/approved.svelte";
import approvedRaw from "./examples/approved.svelte?raw";
import Rejected from "./examples/rejected.svelte";
import rejectedRaw from "./examples/rejected.svelte?raw";

import type { Example } from "$lib/structure/examples";
import type { SEO } from "$lib/structure/seo";
import type { ComponentDoc, ComponentMeta } from "$lib/structure/structure";

export const meta: ComponentMeta = {
	id: "confirmation",
	title: "Confirmation",
	description:
		"A component for requesting user approval before executing sensitive AI actions. Displays different states for approval requests, accepted, and rejected actions.",
};

const seo: SEO = {
	title: "Confirmation",
	description:
		"A component for requesting user approval before executing sensitive AI actions. Displays different states for approval requests, accepted, and rejected actions.",
	keywords: ["Svelte", "Confirmation", "Approval", "Svelte AI Elements"],
};

const examples: Example[] = [
	{
		name: "Approval Request State",
		preview: ApprovalRequest,
		code: {
			filename: "approval-request.svelte",
			filecode: approvalRequestRaw,
			lang: "svelte",
			isExpand: true,
		},
	},
	{
		name: "Approved State",
		preview: Approved,
		code: {
			filename: "approved.svelte",
			filecode: approvedRaw,
			lang: "svelte",
			isExpand: true,
		},
	},
	{
		name: "Rejected State",
		preview: Rejected,
		code: {
			filename: "rejected.svelte",
			filecode: rejectedRaw,
			lang: "svelte",
			isExpand: true,
		},
	},
];

export const data: ComponentDoc = {
	...meta,
	preview: Basic,
	previewCode: {
		filename: "basic.svelte",
		filecode: basicRaw,
		lang: "svelte",
		isExpand: true,
	},
	seo,
	examples,
	props: [
		{
			name: "Confirmation",
			props: [
				{
					name: "approval",
					type: "ToolUIPartApproval",
					description:
						"Approval object containing id, approved status, and optional reason",
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
			],
		},
		{
			name: "ConfirmationTitle",
			props: [
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
			],
		},
		{
			name: "ConfirmationRequest",
			props: [
				{
					name: "children",
					type: "Snippet",
					description:
						"Content to show when approval is requested (typically ConfirmationActions)",
				},
			],
		},
		{
			name: "ConfirmationAccepted",
			props: [
				{
					name: "children",
					type: "Snippet",
					description: "Content to show when action is approved",
				},
			],
		},
		{
			name: "ConfirmationRejected",
			props: [
				{
					name: "children",
					type: "Snippet",
					description: "Content to show when action is rejected",
				},
			],
		},
		{
			name: "ConfirmationActions",
			props: [
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
			],
		},
		{
			name: "ConfirmationAction",
			props: [
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
			],
		},
	],
};
