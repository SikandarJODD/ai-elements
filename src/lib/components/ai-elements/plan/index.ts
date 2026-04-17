import Plan from "./Plan.svelte";
import PlanHeader from "./PlanHeader.svelte";
import PlanTitle from "./PlanTitle.svelte";
import PlanDescription from "./PlanDescription.svelte";
import PlanAction from "./PlanAction.svelte";
import PlanContent from "./PlanContent.svelte";
import PlanFooter from "./PlanFooter.svelte";
import PlanTrigger from "./PlanTrigger.svelte";

export type {
	PlanProps,
	PlanHeaderProps,
	PlanTitleProps,
	PlanDescriptionProps,
	PlanActionProps,
	PlanContentProps,
	PlanFooterProps,
	PlanTriggerProps,
} from "./types.js";

export {
	Plan,
	PlanHeader,
	PlanTitle,
	PlanDescription,
	PlanAction,
	PlanContent,
	PlanFooter,
	PlanTrigger,
	//
	Plan as Root,
	PlanTrigger as Trigger,
	PlanContent as Content,
	PlanHeader as Header,
	PlanTitle as Title,
	PlanDescription as Description,
	PlanAction as Action,
	PlanFooter as Footer,
};
