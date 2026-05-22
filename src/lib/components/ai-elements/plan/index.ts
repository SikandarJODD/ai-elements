import Plan from "./plan.svelte";
import PlanHeader from "./plan-header.svelte";
import PlanTitle from "./plan-title.svelte";
import PlanDescription from "./plan-description.svelte";
import PlanAction from "./plan-action.svelte";
import PlanContent from "./plan-content.svelte";
import PlanFooter from "./plan-footer.svelte";
import PlanTrigger from "./plan-trigger.svelte";

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
