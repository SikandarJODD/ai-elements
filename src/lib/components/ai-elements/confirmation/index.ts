import Confirmation from "./Confirmation.svelte";
import ConfirmationTitle from "./ConfirmationTitle.svelte";
import ConfirmationRequest from "./ConfirmationRequest.svelte";
import ConfirmationAccepted from "./ConfirmationAccepted.svelte";
import ConfirmationRejected from "./ConfirmationRejected.svelte";
import ConfirmationActions from "./ConfirmationActions.svelte";
import ConfirmationAction from "./ConfirmationAction.svelte";

import { type ConfirmationProps } from "./Confirmation.svelte";
import { type ConfirmationTitleProps } from "./ConfirmationTitle.svelte";
import { type ConfirmationRequestProps } from "./ConfirmationRequest.svelte";
import { type ConfirmationAcceptedProps } from "./ConfirmationAccepted.svelte";
import { type ConfirmationRejectedProps } from "./ConfirmationRejected.svelte";
import { type ConfirmationActionsProps } from "./ConfirmationActions.svelte";
import { type ConfirmationActionProps } from "./ConfirmationAction.svelte";

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
