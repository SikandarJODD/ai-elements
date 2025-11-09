import Basic from "./basic.svelte";
import basicRaw from "./basic.svelte?raw";
import ApprovalRequest from "./approval-request.svelte";
import approvalRequestRaw from "./approval-request.svelte?raw";
import Approved from "./approved.svelte";
import approvedRaw from "./approved.svelte?raw";
import Rejected from "./rejected.svelte";
import rejectedRaw from "./rejected.svelte?raw";

const examples = {
	basic: {
		code: basicRaw,
		Component: Basic,
	},
	approvalRequest: {
		code: approvalRequestRaw,
		Component: ApprovalRequest,
	},
	approved: {
		code: approvedRaw,
		Component: Approved,
	},
	rejected: {
		code: rejectedRaw,
		Component: Rejected,
	},
};

export { examples };
