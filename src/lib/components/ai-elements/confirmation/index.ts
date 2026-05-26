import Confirmation from "./confirmation.svelte";
import ConfirmationTitle from "./confirmation-title.svelte";
import ConfirmationRequest from "./confirmation-request.svelte";
import ConfirmationAccepted from "./confirmation-accepted.svelte";
import ConfirmationRejected from "./confirmation-rejected.svelte";
import ConfirmationActions from "./confirmation-actions.svelte";
import ConfirmationAction from "./confirmation-action.svelte";

import { type ConfirmationProps } from "./confirmation.svelte";
import { type ConfirmationTitleProps } from "./confirmation-title.svelte";
import { type ConfirmationRequestProps } from "./confirmation-request.svelte";
import { type ConfirmationAcceptedProps } from "./confirmation-accepted.svelte";
import { type ConfirmationRejectedProps } from "./confirmation-rejected.svelte";
import { type ConfirmationActionsProps } from "./confirmation-actions.svelte";
import { type ConfirmationActionProps } from "./confirmation-action.svelte";

export type {
	ToolUIPartApproval,
	ToolUIPartState,
	ConfirmationContextValue,
} from "./confirmation-context.svelte.js";

export {
	Confirmation,
	ConfirmationTitle,
	ConfirmationRequest,
	ConfirmationAccepted,
	ConfirmationRejected,
	ConfirmationActions,
	ConfirmationAction,
	//
	Confirmation as Root,
	ConfirmationTitle as Title,
	ConfirmationRequest as Request,
	ConfirmationAccepted as Accepted,
	ConfirmationRejected as Rejected,
	ConfirmationActions as Actions,
	ConfirmationAction as Action,
};

export type {
	ConfirmationProps,
	ConfirmationTitleProps,
	ConfirmationRequestProps,
	ConfirmationAcceptedProps,
	ConfirmationRejectedProps,
	ConfirmationActionsProps,
	ConfirmationActionProps,
};
