import { getContext, setContext } from "svelte";

const PLAN_CONTEXT_KEY = Symbol("plan-context");

export type PlanContextValue = {
	isStreaming: boolean;
};

export function setPlanContext(value: PlanContextValue) {
	setContext(PLAN_CONTEXT_KEY, value);
}

export function getPlanContext(): PlanContextValue {
	const context = getContext<PlanContextValue>(PLAN_CONTEXT_KEY);
	if (!context) {
		throw new Error("Plan components must be used within Plan");
	}
	return context;
}
